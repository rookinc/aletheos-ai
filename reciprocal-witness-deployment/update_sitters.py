#!/usr/bin/env python3
"""Publish a hash-checked extension to an existing Reciprocal Witness instrument."""
import argparse
import base64
import fcntl
import gzip
import io
import json
from pathlib import Path, PurePosixPath
import re
import tarfile
import tempfile
import time
from urllib.parse import quote, urlsplit
import urllib.request

import orthogonal_menu as menu
from catalog import HERE, INSTRUMENT, ORIGIN, digest
from install import replace_bytes

SPEC = HERE / 'sitters-release.json'
PUBLIC = 'public_html/' + INSTRUMENT
SUPPORT = ('catalog.py', 'catalog-inputs.json', 'install.py', 'update_sitters.py', 'orthogonal_menu.py', 'orthogonal-menu.json', SPEC.name)
SHA = re.compile(r'[0-9a-f]{64}\Z')
AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'


def load_spec(spec_file=SPEC):
    spec = json.loads(spec_file.read_text(encoding='utf-8'))
    files, guards, public = spec['files'], spec['prerequisites'], spec['https']
    if spec['schema'] != 'aletheos.reciprocal-witness.sitters-update/2' or not {'sitters.html','app.js'} <= set(files):
        raise ValueError('Incompatible sitter release manifest')
    if 'index.html' not in guards or files.keys() & guards.keys() or not {'index.html', 'sitters.html', 'app.js'} <= set(public):
        raise ValueError('Incomplete sitter publication contract')
    for name in [*files, *guards]:
        path = PurePosixPath(name)
        if path.is_absolute() or '..' in path.parts or name != str(path) or '\\' in name or not path.parts:
            raise ValueError('Invalid release path: ' + name)
    hashes = [*guards.values(), *(x['after'] for x in files.values()),
              *(x[k] for x in files.values() for k in ('before','v2','v3') if x.get(k) is not None)]
    if not all(SHA.fullmatch(value) for value in hashes) or any(k not in files and k not in guards for k in public):
        raise ValueError('Invalid release fingerprint or HTTP check')
    for url in spec['runtime_urls']:
        parsed = urlsplit(url)
        if parsed.scheme or parsed.netloc or not parsed.query or parsed.path not in public:
            raise ValueError('Invalid versioned browser asset address')
    return spec


def target(root, name):
    """Reject linked components and non-directory parents, allowing new subdirectories."""
    path = root / name
    if path.resolve() != path:
        raise ValueError('Linked release path: ' + str(path))
    parent = path.parent
    while parent != root:
        if parent.exists() and not parent.is_dir():
            raise ValueError('Expected a directory: ' + str(parent))
        parent = parent.parent
    if path.exists() and not path.is_file():
        raise ValueError('Expected a regular file: ' + str(path))
    return path


def read_if_present(path):
    return path.read_bytes() if path.exists() else None


def checked_bytes(root, name, sha):
    data = read_if_present(target(root, name))
    if data is None or digest(data) != sha:
        raise ValueError('Missing or different SHA-256 for ' + str(root / name))
    return data


def check_files(root, expected):
    for name,sha in expected.items():
        checked_bytes(root, name, sha)


def build_archive(package, archive, spec):
    root = (package.resolve(strict=True) / PUBLIC).resolve(strict=True)
    check_files(root, spec['prerequisites'])
    members = {HERE.name+'/'+name:(HERE/name).read_bytes() for name in SUPPORT}
    for name, item in spec['files'].items():
        members[PUBLIC+'/'+name] = checked_bytes(root,name,item['after'])
    # Serialize the checked bytes as regular files with fixed metadata. The same
    # release yields the same tar digest even in another checkout or timezone.
    with archive.open('wb') as raw:
        with gzip.GzipFile(filename='',fileobj=raw,mode='wb',mtime=0) as compressed:
            with tarfile.open(fileobj=compressed,mode='w') as tar:
                for name,data in members.items():
                    info = tarfile.TarInfo(name)
                    info.size, info.mode, info.mtime = len(data), 0o644, 0
                    tar.addfile(info,io.BytesIO(data))
    return {'archive_sha256': digest(archive.read_bytes()), 'instrument_files':list(spec['files'])}


def order(name):
    # Public navigation becomes available after its dependencies and the new page.
    return ({'sitters.html':1, 'field-guide.html':2, 'replay.html':2, 'app.js':3}.get(name, 0), name)


def update(webroot, package, private, spec, menu_rule=menu.RULE):
    webroot = webroot.resolve(strict=True)
    dest = webroot / INSTRUMENT
    if not dest.is_dir():
        raise ValueError('Existing CORI-0089 installation required. Use deploy.sh for a fresh site.')
    if dest.resolve() != dest:
        raise ValueError('Linked instrument root: ' + str(dest))
    src = (package.resolve(strict=True)/PUBLIC).resolve(strict=True)
    desired = {name: item['after'] for name,item in spec['files'].items()}
    payload = {name:checked_bytes(src,name,sha) for name,sha in desired.items()}
    private = private.resolve()
    if private == webroot or webroot in private.parents:
        raise ValueError('Backup directory must be outside the document root')
    private.mkdir(mode=0o700, parents=True, exist_ok=True)
    with (private/'install.lock').open('a+') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        check_files(dest, spec['prerequisites'])
        menu_result, external = menu.plan(webroot,rule=menu_rule)
        changes = {}
        for name in sorted(desired, key=order):
            path = target(dest, name)
            old = read_if_present(path)
            old_sha = None if old is None else digest(old)
            if old_sha == desired[name]:
                continue
            if old_sha not in (spec['files'][name]['before'], spec['files'][name]['v2'], spec['files'][name].get('v3',spec['files'][name]['after'])):
                raise ValueError('Existing bytes differ from both supported versions: ' + str(path))
            mode = 0o644 if old is None else path.stat().st_mode & 0o777
            changes[name] = old, mode
        if not changes and external is None:
            return {'installed':True, 'already_current':True, 'orthogonal_menu':menu_result}
        backup = Path(tempfile.mkdtemp(prefix='sitters-', dir=private))
        journal = {}
        for name,(old,mode) in changes.items():
            if old is not None:
                previous = backup/'original'/name
                previous.parent.mkdir(parents=True, exist_ok=True)
                previous.write_bytes(old)
            journal[name] = {'mode': mode, 'before': None if old is None else digest(old), 'after': desired[name]}
        if external is not None:
            ext_path, ext_before, ext_after, ext_mode = external
            original = backup/'external-original'/menu_rule['server_path']
            original.parent.mkdir(parents=True,exist_ok=True)
            original.write_bytes(ext_before)
            journal['external_menu'] = {'path':menu_rule['server_path'],'mode':ext_mode,
                                        'before':digest(ext_before),'after':digest(ext_after)}
        (backup/'changes.json').write_text(json.dumps(journal,indent=2)+'\n')
        written, created_dirs = [], []
        external_written = False
        try:
            for name,(old,mode) in changes.items():
                path = target(dest, name)
                if read_if_present(path) != old:
                    raise ValueError('File changed after preflight: ' + str(path))
                missing = []
                parent = path.parent
                while not parent.exists():
                    missing.append(parent)
                    parent = parent.parent
                for parent in reversed(missing):
                    parent.mkdir()
                    parent.chmod(0o755)
                    created_dirs.append(parent)
                replace_bytes(path, payload[name], mode)
                written.append(name)
            check_files(dest, {**desired, **spec['prerequisites']})
            if external is not None:
                menu.apply(external)
                external_written = True
                menu.verify_change(external)
        except BaseException:
            if external_written and ext_path.resolve() == ext_path and ext_path.read_bytes() == ext_after:
                replace_bytes(ext_path,ext_before,ext_mode)
            for name in reversed(written):
                path = target(dest, name)
                data = read_if_present(path)
                if data is not None and digest(data) == desired[name]:
                    old, mode = changes[name]
                    if old is None:
                        path.unlink()
                    else:
                        replace_bytes(path, old, mode)
            for path in reversed(created_dirs):
                if path.is_dir() and not any(path.iterdir()):
                    path.rmdir()
            raise
        return {'installed':True, 'already_current':False, 'backup':str(backup), 'updated':list(changes), 'orthogonal_menu':menu_result}


def restore_menu(webroot, private, rule=menu.RULE):
    root = webroot.resolve(strict=True)
    private = private.resolve()
    if private == root or root in private.parents:
        raise ValueError('Backup directory must be outside the document root')
    private.mkdir(mode=0o700, parents=True, exist_ok=True)
    with (private/'install.lock').open('a+') as lock:
        fcntl.flock(lock,fcntl.LOCK_EX)
        result, change = menu.plan(root,remove=True,rule=rule)
        if change is not None:
            backup = Path(tempfile.mkdtemp(prefix='orthogonal-menu-',dir=private))
            (backup/'prior-index.html').write_bytes(change[1])
            menu.apply(change)
            try:
                menu.verify_change(change)
            except BaseException:
                path, before, after, mode = change
                if path.resolve() == path and path.read_bytes() == after:
                    replace_bytes(path,before,mode)
                raise
            result['backup'] = str(backup)
        return {'scope':'orthogonal-menu-only','orthogonal_menu':result}


def public_checks(spec, origin=ORIGIN, receipt=None, menu_rule=menu.RULE, menu_only=False):
    nonce = str(int(time.time()*1_000_000))
    def fetch(path, cache_bust=True):
        url = origin.rstrip('/') + path
        if cache_bust:
            sep = '&' if '?' in path else '?'
            url += sep + 'release=orthogonal-sitters-' + nonce
        req = urllib.request.Request(url,headers={'User-Agent':AGENT,'Cache-Control':'no-cache','Accept':'*/*','Accept-Encoding':'identity'})
        with urllib.request.urlopen(req,timeout=20) as response:
            if response.status != 200:
                raise ValueError('Unexpected status at ' + path)
            return response.read()
    if menu_only:
        return {'orthogonal_menu':menu.remote_check(fetch,receipt,menu_rule)}
    hashes = {**spec['prerequisites'], **{k:v['after'] for k,v in spec['files'].items()}}
    for name in spec['https']:
        if digest(fetch('/'+INSTRUMENT+'/'+quote(name,safe='/'))) != hashes[name]:
            raise ValueError('Public response did not match release bytes: '+name)
    for url in spec['runtime_urls']:
        name = urlsplit(url).path
        if digest(fetch('/'+INSTRUMENT+'/'+url,False)) != hashes[name]:
            raise ValueError('Versioned browser asset differs from release: '+url)
    if digest(fetch(menu.FIELD_PATH,False)) != hashes['sitters.html']:
        raise ValueError('Public Orthogonal field route differs from the released sitter page.')
    external = menu.remote_check(fetch,receipt,menu_rule)
    return {'verified_https':spec['https'],'versioned_assets':spec['runtime_urls'],
            'verified_field_route':menu.FIELD_PATH,'orthogonal_menu':external}


def make_phone(package, output):
    with tempfile.TemporaryDirectory() as tmp:
        archive = Path(tmp)/'extension.tar.gz'
        pack = build_archive(package,archive,load_spec())
        shell = (HERE/'update-sitters.sh').read_text(encoding='utf-8')
        head, tail = shell.split('# PREPARE RELEASE BYTES',1)
        dispatch = tail[tail.index('# Only an exact copy'):]
        head = '\n'.join(line for line in head.splitlines() if not line.startswith('tools_dir='))+'\n'
        encoded = base64.b64encode(archive.read_bytes()).decode()
        payload = '\n'.join(encoded[i:i+90] for i in range(0,len(encoded),90))
        decode = ('digest=' + repr(pack['archive_sha256']) + '\n'
                  'python3 - "$tmp/extension.tar.gz" "$digest" <<\'SITTERS_ARCHIVE\'\n'
                  'import base64, hashlib, pathlib, sys\n'
                  'data = base64.b64decode("""\n'+payload+'\n""")\n'
                  'if hashlib.sha256(data).hexdigest() != sys.argv[2]:\n'
                  '    raise SystemExit("The embedded release differs from its checksum.")\n'
                  'pathlib.Path(sys.argv[1]).write_bytes(data)\nSITTERS_ARCHIVE\n')
        output.parent.mkdir(parents=True,exist_ok=True)
        output.write_bytes((head+decode+dispatch).encode())
        output.chmod(0o755)
        return {'archive_sha256':pack['archive_sha256'],'standalone_sha256':digest(output.read_bytes())}


if __name__ == '__main__':
    p = argparse.ArgumentParser(description=__doc__)
    sub = p.add_subparsers(dest='command')
    pack = sub.add_parser('pack')
    pack.add_argument('archive',type=Path)
    pack.add_argument('--package',type=Path,default=HERE.parent)
    phone = sub.add_parser('phone')
    phone.add_argument('output',type=Path)
    phone.add_argument('--package',type=Path,default=HERE.parent)
    apply = sub.add_parser('apply')
    apply.add_argument('--package',type=Path,default=HERE.parent)
    restore = sub.add_parser('restore-menu')
    for cmd in (apply,restore):
        cmd.add_argument('--webroot',type=Path,default=Path.home()/'public_html')
        cmd.add_argument('--state',type=Path,default=Path.home()/'.aletheos-witness-backups')
        cmd.add_argument('--receipt',type=Path)
    verify = sub.add_parser('verify')
    verify.add_argument('--receipt',type=Path)
    args = p.parse_args()
    try:
        spec = load_spec()
        if args.command == 'pack':
            result = build_archive(args.package,args.archive,spec)
        elif args.command == 'phone':
            result = make_phone(args.package,args.output)
        elif args.command in ('apply','restore-menu'):
            result = update(args.webroot,args.package,args.state,spec) if args.command == 'apply' else restore_menu(args.webroot,args.state)
            if args.receipt:
                args.receipt.write_text(json.dumps(result)+'\n',encoding='utf-8')
        elif args.command == 'verify':
            prior = json.loads(args.receipt.read_text()) if args.receipt else {}
            result = public_checks(spec,receipt=prior.get('orthogonal_menu'),menu_only=prior.get('scope')=='orthogonal-menu-only')
        else:
            p.error('Choose pack, phone, apply, restore-menu or verify')
        print(json.dumps(result))
    except (OSError,RuntimeError,ValueError) as err:
        prefix = 'Public verification incomplete: ' if args.command == 'verify' else ''
        p.exit(1,prefix+str(err)+'\n')
