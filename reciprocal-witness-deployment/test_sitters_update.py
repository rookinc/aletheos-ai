#!/usr/bin/env python3
"""Replay the published-v1 update, interruption, collision and delivered asset checks."""
import base64
import contextlib
import functools
from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import os
from pathlib import Path, PurePosixPath
import posixpath
import re
import shutil
import subprocess
import tarfile
import tempfile
import threading
from urllib.parse import urlsplit
from unittest.mock import patch

import update_sitters as updater
from catalog import HERE, INSTRUMENT, digest
from install import replace_bytes


class Assets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []
        self.linked = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'a' and a.get('href'):
            self.linked.append(a['href'])
        if tag in ('script','img','source','audio','video') and a.get('src'):
            self.urls.append(a['src'])
        if tag == 'link' and a.get('href') and set(a.get('rel','').split()) & {'stylesheet','preload','modulepreload','icon'}:
            self.urls.append(a['href'])
        if tag == 'video' and a.get('poster'):
            self.urls.append(a['poster'])


def page_assets(root):
    """Find the static module, stylesheet, image, font, and data dependencies of the new page."""
    seen, linked, pending = set(), set(), ['sitters.html']
    while pending:
        name = pending.pop()
        if name in seen:
            continue
        seen.add(name)
        ext = Path(name).suffix
        if ext not in ('.html','.css','.js','.mjs'):
            continue
        text = (root / name).read_text(encoding='utf-8')
        if ext == '.html':
            parser = Assets()
            parser.feed(text)
            for href in parser.linked:
                dest = urlsplit(href)
                if not dest.scheme and not dest.netloc and dest.path and not dest.path.startswith('/'):
                    linked.add(posixpath.normpath((PurePosixPath(name).parent / dest.path).as_posix()))
            paths = parser.urls
        elif ext == '.css':
            paths = re.findall(r'url\(\s*["\']?([^"\')\s]+)', text)
            paths += re.findall(r'@import\s+["\']([^"\']+)', text)
        else:
            paths = re.findall(r'(?:\bfrom\s*|\bimport\s*\(?\s*|\bfetch\(\s*|\bnew URL\(\s*)["\'](\.{1,2}/[^"\']+)["\']', text)
        for path in paths:
            url = urlsplit(path)
            if url.scheme or url.netloc or not url.path:
                continue
            if url.path.startswith('/'):
                prefix = '/' + INSTRUMENT + '/'
                if not url.path.startswith(prefix):
                    continue
                rel = url.path[len(prefix):]
            else:
                rel = posixpath.normpath((PurePosixPath(name).parent / url.path).as_posix())
            if rel.startswith('../'):
                raise ValueError('Page dependency outside instrument: ' + rel)
            pending.append(rel)
    return seen | linked


@contextlib.contextmanager
def response_server(webroot):
    class Handler(SimpleHTTPRequestHandler):
        def log_message(self, fmt, *args):
            pass
    server = ThreadingHTTPServer(('127.0.0.1',0), functools.partial(Handler,directory=str(webroot)))
    thread = threading.Thread(target=server.serve_forever,daemon=True)
    thread.start()
    try:
        yield 'http://127.0.0.1:'+str(server.server_port)
    finally:
        server.shutdown()
        server.server_close()
        thread.join()


def must_fail(action, text):
    try:
        action()
    except (OSError,ValueError) as err:
        assert text in str(err), str(err)
    else:
        raise AssertionError('Expected failure containing '+text)


def check_shell_transport(tmp, site, state, origin, menu_restore=False):
    shim = tmp/'transport'
    shim.mkdir()
    ssh = shim/'ssh'
    # Exercise the shipped shell pipeline and both sides of its transfer digest with
    # a local SSH stand-in. Redirect only its destination and public verification origin.
    ssh.write_text("""#!/usr/bin/env python3
import os, shlex, subprocess, sys
if sys.argv[1] != 'fixture-sitters-host':
    sys.exit(82)
cmd = sys.argv[2].replace('update_sitters.py apply', 'update_sitters.py apply --webroot "$WITNESS_TEST_WEBROOT" --state "$WITNESS_TEST_STATE"')
cmd = cmd.replace('update_sitters.py restore-menu', 'update_sitters.py restore-menu --webroot "$WITNESS_TEST_WEBROOT" --state "$WITNESS_TEST_STATE"')
verify = 'import json,os,sys;sys.path.insert(0,"reciprocal-witness-deployment");import update_sitters as u;r=json.load(open("install-result.json"));print(u.public_checks(u.load_spec(),os.environ["WITNESS_TEST_ORIGIN"],receipt=r["orthogonal_menu"],menu_only=r.get("scope")=="orthogonal-menu-only"))'
cmd = cmd.replace('python3 -B reciprocal-witness-deployment/update_sitters.py verify', 'python3 -B -c '+shlex.quote(verify))
payload = sys.stdin.buffer.read()
if os.environ.get('WITNESS_TEST_CORRUPT') == '1':
    payload += b'x'
sys.exit(subprocess.run(['bash','-c',cmd],input=payload).returncode)
""")
    ssh.chmod(0o755)
    env = dict(os.environ, PATH=str(shim)+os.pathsep+os.environ['PATH'],
               WITNESS_SSH_TARGET='fixture-sitters-host', WITNESS_TEST_WEBROOT=str(site),
               WITNESS_TEST_STATE=str(state), WITNESS_TEST_ORIGIN=origin)
    for script in (HERE/'update-sitters.sh', HERE/'releases/Update-Sitter-Layers.sh'):
        cmd = ['bash',str(script)]
        ok = subprocess.run(cmd,env=env,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
        assert ok.returncode == 0, ok.stderr.decode()
        assert b'"already_current": true' in ok.stdout and b'verified_https' in ok.stdout
        corrupt = subprocess.run(cmd,env=dict(env,WITNESS_TEST_CORRUPT='1'),capture_output=True)
        assert corrupt.returncode != 0 and b'"already_current"' not in corrupt.stdout
        if menu_restore:
            menu_cmd = cmd + ['--remove-menu-link']
            rolled = subprocess.run(menu_cmd,env=env,capture_output=True)
            assert rolled.returncode==0 and b'"status": "removed"' in rolled.stdout,rolled.stderr
            restored = subprocess.run(cmd,env=env,capture_output=True)
            assert restored.returncode==0 and b'"status": "installed"' in restored.stdout,restored.stderr


def run():
    spec = updater.load_spec()
    package = HERE.parent
    source = package/updater.PUBLIC
    body_paths = page_assets(source)
    assert body_paths <= set(spec['https']), 'Missing browser asset checks: '+str(body_paths - set(spec['https']))
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        webroot, stage, archive, state = root/'webroot',root/'unpacked',root/'extension.tar.gz',root/'private'
        webroot.mkdir()
        dest = webroot/INSTRUMENT
        pack = updater.build_archive(package,archive,spec)
        phone_installer = (HERE/'releases/Update-Sitter-Layers.sh').read_bytes()
        encoded = re.search(rb'base64\.b64decode\("""(.*?)"""\)', phone_installer, re.S)
        assert encoded and base64.b64decode(encoded.group(1)) == archive.read_bytes()
        twin = root/'copy.tar.gz'
        assert updater.build_archive(package,twin,spec)['archive_sha256'] == pack['archive_sha256']
        expected = [*(HERE.name+'/'+n for n in updater.SUPPORT), *(updater.PUBLIC+'/'+n for n in spec['files'])]
        with tarfile.open(archive) as tar:
            assert tar.getnames() == expected
            for member in tar:
                assert member.isfile() and not member.name.startswith('/') and '..' not in Path(member.name).parts
                p = stage/member.name
                p.parent.mkdir(parents=True,exist_ok=True)
                p.write_bytes(tar.extractfile(member).read())
            assert digest(archive.read_bytes()) == pack['archive_sha256']
        apply = lambda: updater.update(webroot,stage,state,spec)
        must_fail(apply,'Existing CORI-0089 installation required')
        # Use the original public bytes for every replaced file. Untouched dependencies
        # are identical to v1 by fingerprint and come from the release checkout.
        dest.mkdir(parents=True)
        fixture = HERE/'fixtures/v1'
        previous = {k:v['before'] for k,v in spec['files'].items() if v['before'] is not None}
        assert {p.relative_to(fixture).as_posix() for p in fixture.rglob('*') if p.is_file()} == set(previous)
        for name, sha in previous.items():
            p = dest/name
            p.parent.mkdir(parents=True,exist_ok=True)
            shutil.copyfile(fixture/name, p)
            assert digest(p.read_bytes()) == sha
        for name in spec['prerequisites']:
            p = dest/name
            p.parent.mkdir(parents=True,exist_ok=True)
            shutil.copyfile(source/name,p)
        # A local note, a hand-edited unrelated instrument file and current site catalogs survive.
        protected = {dest/'operator-note.txt':b'local note', webroot/'library/catalog.json':b'new accession on same server'}
        unrelated = 'notes/heart.md'
        if unrelated not in spec['files'] and unrelated not in spec['prerequisites']:
            protected[dest/unrelated] = b'locally edited heart notes'
        for p,data in protected.items():
            p.parent.mkdir(parents=True,exist_ok=True)
            p.write_bytes(data)
        site_before = {p.relative_to(webroot).as_posix():p.read_bytes() for p in webroot.rglob('*') if p.is_file()}
        old_app = (dest/'app.js').read_bytes()
        (dest/'app.js').write_bytes(b'local interface customization')
        must_fail(apply,'Existing bytes differ')
        assert not (dest/'sitters.html').exists()
        (dest/'app.js').write_bytes(old_app)
        (dest/'sitters.html').write_bytes(b'previously occupied path')
        must_fail(apply,'Existing bytes differ')
        (dest/'sitters.html').unlink()
        # Validate the local packager in an isolated copy before exercising the server.
        local_copy = root/'local-input'
        for name in {**spec['files'],**spec['prerequisites']}:
            p = local_copy/updater.PUBLIC/name
            p.parent.mkdir(parents=True,exist_ok=True)
            shutil.copyfile(source/name,p)
        (local_copy/updater.PUBLIC/'sitters.html').write_bytes(b'altered local build')
        must_fail(lambda:updater.build_archive(local_copy,root/'bad.tar.gz',spec),'SHA-256')
        original_index = (dest/'index.html').read_bytes()
        (dest/'index.html').write_bytes(b'different instrument')
        must_fail(apply,'SHA-256')
        (dest/'index.html').write_bytes(original_index)
        # A corrupt transfer must stop before any site changes, even on the first run.
        payload = stage/updater.PUBLIC/'sitters.html'
        clean = payload.read_bytes()
        payload.write_bytes(clean+b'!')
        must_fail(apply,'SHA-256')
        payload.write_bytes(clean)
        # Simulate an I/O failure when the existing navigation would be switched.
        def fail_on_app(path, data, mode):
            if path == dest/'app.js':
                raise OSError('simulated navigation switch failure')
            replace_bytes(path,data,mode)
        with patch('update_sitters.replace_bytes',side_effect=fail_on_app):
            must_fail(apply,'navigation switch failure')
        assert site_before == {p.relative_to(webroot).as_posix():p.read_bytes() for p in webroot.rglob('*') if p.is_file()}
        # Exercise a supported partial upload: one exact new file is already in place.
        existing_new = next(n for n,item in spec['files'].items() if item['before'] is None and n.endswith('.js'))
        present = dest/existing_new
        present.parent.mkdir(parents=True,exist_ok=True)
        present.write_bytes((source/existing_new).read_bytes())
        touched = apply()
        assert touched['installed'] and touched['updated'][-1] == 'app.js'
        assert existing_new not in touched['updated']
        assert (Path(touched['backup'])/'original/app.js').read_bytes() == old_app
        for p,data in protected.items():
            assert p.read_bytes() == data
        stamps = {n:(dest/n).stat().st_mtime_ns for n in {**spec['files'],**spec['prerequisites']}}
        assert apply()['already_current']
        assert stamps == {n:(dest/n).stat().st_mtime_ns for n in stamps}
        with response_server(webroot) as origin:
            assert updater.public_checks(spec,origin)['verified_https'] == spec['https']
            check_shell_transport(root,webroot,state,origin)
            (dest/'sitters.html').write_bytes(b'stale cached page')
            must_fail(lambda:updater.public_checks(spec,origin),'sitters.html')
    return {'base_commit':spec['base_commit'], 'original_sha256':previous,
            'archive_sha256':pack['archive_sha256'],'standalone_installer_sha256':digest(phone_installer),'deterministic_archive':True,
            'archive_members':expected,'browser_dependencies':sorted(body_paths),'verified_response_paths':spec['https'],
            'remote_fixture':'local HTTP server serving installed public paths', 'existing_install':True,
            'fresh_site_directed_to_full_installer':True,'backs_up_replaced_files':True,
            'preserves_unrelated_files_and_catalogs':True,'refuses_local_overrides_and_collisions':True,
            'refuses_wrong_source_release':True,'refuses_corrupt_local_build':True,
            'shell_ssh_target_override_tested':True,'rejects_corrupted_ssh_stream':True,
            'refuses_corrupt_upload_before_writes':True,'rollback_after_partial_write':True,
            'completes_partial_prior_upload':True,'idempotent_second_run':True,'rejects_stale_public_bytes':True}


if __name__ == '__main__':
    print(json.dumps(run(),indent=2))
