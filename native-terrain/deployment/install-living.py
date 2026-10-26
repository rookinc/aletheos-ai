"""Additive Living Geometry installer, executed on the deployment host.

Stage immutable release assets, atomically switch only living.html, or restore
that entry from an activation receipt. Existing index/app/data stay untouched.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import tempfile
import time


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def verify(root: Path) -> dict:
    manifest = json.loads((root / 'manifest.json').read_text())
    expected = set(manifest['files']) | {'manifest.json'}
    actual = {str(path.relative_to(root)) for path in root.rglob('*') if path.is_file()}
    if actual != expected:
        raise ValueError('Static file inventory mismatch')
    for name, expected_hash in manifest['files'].items():
        path = root / name
        if path.is_symlink() or not path.resolve().is_relative_to(root.resolve()):
            raise ValueError('Unsafe manifest file: ' + name)
        if sha(path) != expected_hash:
            raise ValueError('Static hash mismatch: ' + name)
    return manifest


def atomic_write(path: Path, data: bytes) -> None:
    fd, temporary = tempfile.mkstemp(prefix='.' + path.name + '-', dir=path.parent)
    try:
        with os.fdopen(fd, 'wb') as stream:
            stream.write(data)
            stream.flush()
            os.fsync(stream.fileno())
        os.chmod(temporary, 0o644)
        os.replace(temporary, path)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def stage(source: Path, live: Path) -> Path:
    verify(source)
    if not live.is_dir():
        raise ValueError('Existing Aletheos web root must be present')
    release = live / ('living-release-' + sha(source / 'manifest.json')[:20])
    if release.exists():
        verify(release)
        if (source / 'manifest.json').read_bytes() != (release / 'manifest.json').read_bytes():
            raise ValueError('Release identifier collision')
    else:
        temporary = Path(tempfile.mkdtemp(prefix='.living-stage-', dir=live))
        try:
            shutil.copytree(source, temporary, dirs_exist_ok=True)
            verify(temporary)
            os.rename(temporary, release)
        finally:
            if temporary.exists():
                shutil.rmtree(temporary)
    return release


def activate(release: Path, live: Path, backups: Path) -> dict:
    verify(release)
    if release.parent.resolve() != live.resolve():
        raise ValueError('Release must be an immediate child of the live directory')
    entry = live / 'living.html'
    if entry.is_symlink():
        raise ValueError('Refusing to replace a symbolic-link entry point')
    html = (release / 'living.html').read_text()
    if re.search(r'<base\b', html, re.I):
        raise ValueError('Source entry already declares a base URL')
    # Relative assets/fetches bind to the immutable release, preserving old files.
    base = '<base href="./' + release.name + '/">'
    html, count = re.subn(r'(<head\b[^>]*>)', lambda m: m.group(1) + base, html, count=1, flags=re.I)
    if count != 1:
        raise ValueError('Living entry requires an explicit head element')
    backups.mkdir(parents=True, exist_ok=True)
    backup = backups / ('activation-' + str(time.time_ns()))
    backup.mkdir()
    previous = entry.exists()
    previous_hash = None
    if previous:
        previous_hash = sha(entry)
        shutil.copyfile(entry, backup / 'living.html')
        if sha(backup / 'living.html') != previous_hash:
            raise ValueError('Backup byte verification failed')
    receipt = {'schema': 'aletheos.living-activation.v1', 'live': str(live.resolve()),
               'release': str(release.resolve()), 'previous_entry_existed': previous,
               'previous_entry_sha256': previous_hash,
               'activated_entry_sha256': hashlib.sha256(html.encode()).hexdigest(),
               'remote_browser_verified': False}
    (backup / 'activation.json').write_text(json.dumps(receipt, indent=2) + '\n')
    atomic_write(entry, html.encode())
    if sha(entry) != receipt['activated_entry_sha256']:
        raise ValueError('Activated entry byte verification failed')
    return {'release': str(release), 'activation_receipt': str(backup / 'activation.json'),
            'entry': str(entry), 'disposition': 'activated; served/browser checks still required'}


def rollback(receipt_path: Path, live: Path) -> dict:
    receipt = json.loads(receipt_path.read_text())
    if receipt['live'] != str(live.resolve()):
        raise ValueError('Rollback receipt names a different live directory')
    entry = live / 'living.html'
    if entry.is_symlink() or not entry.exists() or sha(entry) != receipt['activated_entry_sha256']:
        raise ValueError('Entry has changed since this activation; refusing rollback')
    if receipt['previous_entry_existed']:
        previous = receipt_path.parent / 'living.html'
        if sha(previous) != receipt['previous_entry_sha256']:
            raise ValueError('Rollback backup hash mismatch')
        atomic_write(entry, previous.read_bytes())
    else:
        entry.unlink()
    return {'disposition': 'entry restored; immutable release retained', 'entry': str(entry)}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('action', choices=['stage', 'activate', 'rollback'])
    parser.add_argument('--source', type=Path)
    parser.add_argument('--live', type=Path, required=True)
    parser.add_argument('--backups', type=Path)
    parser.add_argument('--receipt', type=Path)
    args = parser.parse_args()
    if args.action == 'rollback':
        if args.receipt is None:
            parser.error('rollback requires --receipt')
        result = rollback(args.receipt, args.live)
    else:
        if args.source is None:
            parser.error('stage/activate requires --source')
        release = stage(args.source, args.live)
        if args.action == 'activate':
            if args.backups is None:
                parser.error('activate requires --backups')
            result = activate(release, args.live, args.backups)
        else:
            result = {'release': str(release), 'disposition': 'staged; entry unchanged'}
    print(json.dumps(result))


if __name__ == '__main__':
    main()
