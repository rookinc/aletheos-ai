#!/usr/bin/env python3
"""Install against the real publication sources; verify public HTTPS separately."""
import argparse
import fcntl
import json
import os
from pathlib import Path
import shutil
import tempfile
import time
import urllib.request
from zipfile import ZipFile

from catalog import BASES, GUIDE, HERE, ID, INSTRUMENT, ORIGIN, RECORD, SLUG, TITLE, build_catalogs, digest

DIRECTORIES = [INSTRUMENT, RECORD]


def file_inventory(path):
    if path.is_symlink() or not path.is_dir():
        raise ValueError('Expected directory: ' + str(path))
    hashes = {}
    for item in sorted(path.rglob('*')):
        if item.is_symlink() or not (item.is_dir() or item.is_file()):
            raise ValueError('Unexpected linked or special path: ' + str(item))
        if item.is_file():
            hashes[item.relative_to(path).as_posix()] = digest(item.read_bytes())
    return hashes


def replace_bytes(path, data, mode):
    handle, name = tempfile.mkstemp(prefix='.witness-stage-', dir=path.parent)
    try:
        with os.fdopen(handle, 'wb') as stream:
            stream.write(data)
            stream.flush()
            os.fsync(stream.fileno())
        os.chmod(name, mode)
        os.replace(name, path)
    finally:
        if os.path.exists(name):
            os.unlink(name)


def safe_target(root, path):
    dest = root / path
    if dest.resolve() != dest:
        raise ValueError('Linked destination: ' + str(dest))
    if not dest.parent.is_dir():
        raise ValueError('Missing parent of ' + str(dest))
    return dest


def install(webroot, package, state):
    root = webroot.resolve(strict=True)
    state = state.resolve()
    if state == root or root in state.parents:
        raise ValueError('Private backup directory must be outside the web root')
    state.mkdir(mode=0o700, parents=True, exist_ok=True)
    src = package.resolve(strict=True) / 'public_html'
    with (state / 'install.lock').open('a+') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        targets = {rel: safe_target(root, rel) for rel in [*DIRECTORIES, *BASES]}
        inventory = {rel: file_inventory(src / rel) for rel in DIRECTORIES}
        for rel in DIRECTORIES:
            if targets[rel].exists() and file_inventory(targets[rel]) != inventory[rel]:
                raise ValueError('Existing public content differs; inspect before updating: ' + rel)
        if 'index.html' not in inventory[INSTRUMENT] or 'field-guide.html' not in inventory[INSTRUMENT]:
            raise ValueError('Missing instrument entry or field guide')
        # Detect a release assembled with a registry from a different interface build.
        rows = json.loads((src / 'observatories/registry.json').read_text())['instruments']
        row, = [r for r in rows if r['id'] == SLUG]
        if row['artifact_sha256'] != inventory[INSTRUMENT]['index.html']:
            raise ValueError('Refresh the catalog overlay for this instrument index before publishing.')
        with ZipFile(HERE / 'catalog-baseline.zip') as baseline:
            pages = build_catalogs(root, (src / INSTRUMENT / 'index.html').read_bytes(), baseline)
        new_dirs = [rel for rel in DIRECTORIES if not targets[rel].exists()]
        changed = {rel: (before, after) for rel, (before, after) in pages.items() if before != after}
        if not changed and not new_dirs:
            return {'installed': True, 'already_current': True}
        backup = Path(tempfile.mkdtemp(prefix='release-', dir=state))
        for rel, (before, after) in changed.items():
            copy = backup / rel
            copy.parent.mkdir(parents=True, exist_ok=True)
            copy.write_bytes(before)
        journal = {'created_directories': new_dirs, 'original': {k: digest(v[0]) for k,v in changed.items()},
                   'replacement': {k: digest(v[1]) for k,v in changed.items()}}
        (backup / 'changes.json').write_text(json.dumps(journal, indent=2) + '\n')
        installed_dirs, written = [], []
        try:
            for rel in new_dirs:
                dest = targets[rel]
                # Same-filesystem rename exposes a complete new directory together.
                with tempfile.TemporaryDirectory(prefix='.witness-stage-', dir=dest.parent) as tmp:
                    ready = Path(tmp) / 'payload'
                    shutil.copytree(src / rel, ready)
                    # Remote staging uses a private umask; the web server must read public files.
                    for entry in [ready, *ready.rglob('*')]:
                        entry.chmod(0o755 if entry.is_dir() else 0o644)
                    if file_inventory(ready) != inventory[rel] or dest.exists():
                        raise ValueError('Changed while staging: ' + rel)
                    ready.rename(dest)
                installed_dirs.append(rel)
            for rel, (before, after) in changed.items():
                dest = targets[rel]
                if dest.read_bytes() != before:
                    raise ValueError('File changed since preflight: ' + rel)
                replace_bytes(dest, after, dest.stat().st_mode & 0o777)
                written.append(rel)
        except BaseException:
            for rel in reversed(written):
                dest = targets[rel]
                before, after = changed[rel]
                if dest.read_bytes() == after:
                    replace_bytes(dest, before, dest.stat().st_mode & 0o777)
            for rel in reversed(installed_dirs):
                if file_inventory(targets[rel]) == inventory[rel]:
                    shutil.rmtree(targets[rel])
            raise
        return {'installed': True, 'already_current': False, 'backup': str(backup),
                'updated_catalogs': list(changed), 'installed_directories': new_dirs}


def verify_live(package):
    src = package / 'public_html' / INSTRUMENT
    nonce = str(int(time.time() * 1_000_000))
    expected = {
        '/'+INSTRUMENT+'/': ('digest', digest((src/'index.html').read_bytes())),
        '/'+INSTRUMENT+'/field-guide.html': ('digest', digest((src/'field-guide.html').read_bytes())),
        '/'+RECORD+'/': ('contains', '/'+INSTRUMENT+'/'),
        '/library/': ('contains', 'records/'+ID+'/'),
        '/library/catalog.json': ('contains', '"'+ID+'"'),
        '/library/collections/': ('contains', '../records/'+ID+'/'),
        '/library/observatories/': ('contains', '/'+INSTRUMENT+'/'),
        '/observatories/': ('contains', '/'+INSTRUMENT+'/'),
        '/observatories/index.php': ('contains', '/'+INSTRUMENT+'/'),
        '/observatories/registry.json': ('contains', digest((src/'index.html').read_bytes()))}
    for rel,(rule,value) in expected.items():
        req = urllib.request.Request(ORIGIN + rel + '?release=witness-' + nonce,
            headers={'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
                     'Cache-Control':'no-cache', 'Accept':'*/*'})
        with urllib.request.urlopen(req, timeout=20) as response:
            data = response.read()
        success = digest(data) == value if rule == 'digest' else value.encode() in data
        if not success:
            raise ValueError('Unexpected content at '+ORIGIN+rel)
    return list(expected)


if __name__ == '__main__':
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--webroot', type=Path, default=Path.home() / 'public_html')
    p.add_argument('--package', type=Path, default=HERE.parent)
    p.add_argument('--state', type=Path, default=Path.home() / '.aletheos-witness-backups')
    p.add_argument('--verify-https', action='store_true')
    a = p.parse_args()
    print(json.dumps(install(a.webroot, a.package, a.state)), flush=True)
    if a.verify_https:
        try:
            print(json.dumps({'verified_https': verify_live(a.package)}))
        except Exception as e:
            p.exit(1, 'Installed, but public verification is incomplete: '+str(e)+'\n')
