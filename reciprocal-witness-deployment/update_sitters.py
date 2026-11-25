#!/usr/bin/env python3
"""Publish a hash-checked extension to an existing Reciprocal Witness instrument."""
import argparse
import fcntl
import gzip
import io
import json
from pathlib import Path, PurePosixPath
import re
import tarfile
import tempfile
import time
from urllib.parse import quote
import urllib.request

from catalog import HERE, INSTRUMENT, ORIGIN, digest
from install import replace_bytes

SPEC = HERE / 'sitters-release.json'
PUBLIC = 'public_html/' + INSTRUMENT
SUPPORT = ('catalog.py', 'catalog-inputs.json', 'install.py', 'update_sitters.py', SPEC.name)
SHA = re.compile(r'[0-9a-f]{64}\Z')
AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'


def load_spec(spec_file=SPEC):
    spec = json.loads(spec_file.read_text(encoding='utf-8'))
    files, guards, public = spec['files'], spec['prerequisites'], spec['https']
    if spec['schema'] != 'aletheos.reciprocal-witness.sitters-update/1' or not {'sitters.html','app.js'} <= set(files):
        raise ValueError('Incompatible sitter release manifest')
    if 'index.html' not in guards or files.keys() & guards.keys() or not {'index.html', 'sitters.html', 'app.js'} <= set(public):
        raise ValueError('Incomplete sitter publication contract')
    for name in [*files, *guards]:
        path = PurePosixPath(name)
        if path.is_absolute() or '..' in path.parts or name != str(path) or '\\' in name or not path.parts:
            raise ValueError('Invalid release path: ' + name)
    hashes = [*guards.values(), *(x['after'] for x in files.values()),
              *(x['before'] for x in files.values() if x['before'] is not None)]
    if not all(SHA.fullmatch(value) for value in hashes) or any(k not in files and k not in guards for k in public):
        raise ValueError('Invalid release fingerprint or HTTP check')
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


def update(webroot, package, private, spec):
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
        changes = {}
        for name in sorted(desired, key=order):
            path = target(dest, name)
            old = read_if_present(path)
            old_sha = None if old is None else digest(old)
            if old_sha == desired[name]:
                continue
            if old_sha != spec['files'][name]['before']:
                raise ValueError('Existing bytes differ from both supported versions: ' + str(path))
            mode = 0o644 if old is None else path.stat().st_mode & 0o777
            changes[name] = old, mode
        if not changes:
            return {'installed':True, 'already_current':True}
        backup = Path(tempfile.mkdtemp(prefix='sitters-', dir=private))
        journal = {}
        for name,(old,mode) in changes.items():
            if old is not None:
                previous = backup/'original'/name
                previous.parent.mkdir(parents=True, exist_ok=True)
                previous.write_bytes(old)
            journal[name] = {'mode': mode, 'before': None if old is None else digest(old), 'after': desired[name]}
        (backup/'changes.json').write_text(json.dumps(journal,indent=2)+'\n')
        written, created_dirs = [], []
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
        except BaseException:
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
        return {'installed':True, 'already_current':False, 'backup':str(backup), 'updated':list(changes)}


def public_checks(spec, origin=ORIGIN):
    nonce = str(int(time.time()*1_000_000))
    hashes = {**spec['prerequisites'], **{k:v['after'] for k,v in spec['files'].items()}}
    for name in spec['https']:
        url = origin.rstrip('/')+'/'+INSTRUMENT+'/'+quote(name, safe='/')+'?release=sitters-'+nonce
        req = urllib.request.Request(url, headers={'User-Agent':AGENT,'Cache-Control':'no-cache','Accept':'*/*','Accept-Encoding':'identity'})
        with urllib.request.urlopen(req, timeout=20) as response:
            data = response.read()
            status = response.status
        if status != 200 or digest(data) != hashes[name]:
            raise ValueError('Public response did not match release bytes: ' + name)
    return {'verified_https':spec['https']}


if __name__ == '__main__':
    p = argparse.ArgumentParser(description=__doc__)
    sub = p.add_subparsers(dest='command')
    pack = sub.add_parser('pack')
    pack.add_argument('archive',type=Path)
    pack.add_argument('--package',type=Path,default=HERE.parent)
    apply = sub.add_parser('apply')
    apply.add_argument('--webroot',type=Path,default=Path.home()/'public_html')
    apply.add_argument('--package',type=Path,default=HERE.parent)
    apply.add_argument('--state',type=Path,default=Path.home()/'.aletheos-witness-backups')
    sub.add_parser('verify')
    args = p.parse_args()
    try:
        spec = load_spec()
        if args.command == 'pack':
            print(json.dumps(build_archive(args.package,args.archive,spec)))
        elif args.command == 'apply':
            print(json.dumps(update(args.webroot,args.package,args.state,spec)))
        elif args.command == 'verify':
            print(json.dumps(public_checks(spec)))
        else:
            p.error('Choose pack, apply, or verify')
    except (OSError,RuntimeError,ValueError) as err:
        prefix = 'Public verification incomplete: ' if args.command == 'verify' else ''
        p.exit(1,prefix+str(err)+'\n')
