#!/usr/bin/env python3
"""Verified, scoped deployment for the Aletheos observatory library.

Local: python3 remote_install.py pack RELEASE_DIRECTORY ARCHIVE
Remote: python3 remote_install.py install < ARCHIVE
Tests may call install_archive with an explicit document root.
"""
import argparse
import hashlib
import io
import json
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import subprocess
import sys
import tarfile
import tempfile
import time
import uuid

RELEASE = 'aletheos-xyz-flower-v0.3'
BASE_INDEX_HASH = '26647d2203ea1571cb990ee04017c29201a57bb7518345495e60eca295c963a2'
MAX_BYTES = 32 * 1024 * 1024
MAX_FILE_BYTES = 8 * 1024 * 1024
REQUIRED = {'observatories/index.php', 'observatories/xyz-flower/index.html', 'observatories/xyz-flower/pilot002-evidence.json'}


def digest(data):
    return hashlib.sha256(data).hexdigest()


def allowed_path(name):
    return name in REQUIRED


def validate_manifest(manifest):
    if not isinstance(manifest, dict) or manifest.get('release') != RELEASE:
        raise ValueError('Unrecognized release manifest')
    files = manifest.get('files')
    if not isinstance(files, dict) or not REQUIRED <= set(files) or len(files) > 50:
        raise ValueError('Manifest must include the three expected release files')
    total = 0
    for name, entry in files.items():
        if not allowed_path(name) or not isinstance(entry, dict):
            raise ValueError('Out-of-scope manifest path: ' + str(name))
        if not re.fullmatch(r'[0-9a-f]{64}', str(entry.get('sha256', ''))):
            raise ValueError('Invalid SHA-256 for ' + name)
        size = entry.get('size')
        if not isinstance(size, int) or not 0 < size <= MAX_FILE_BYTES:
            raise ValueError('Invalid size for ' + name)
        total += size
    if total > MAX_BYTES:
        raise ValueError('Payload exceeds release size limit')
    return files


def no_symlink_path(root, relative):
    current = root
    for part in PurePosixPath(relative).parts:
        current = current / part
        if current.is_symlink():
            raise ValueError('Symlink destination refused: ' + str(current))
        if current.exists() and current != root / relative and not current.is_dir():
            raise ValueError('Destination parent is not a directory: ' + str(current))
    return current


def pack(release_dir, output):
    release_dir = Path(release_dir).resolve()
    raw = (release_dir / 'manifest.json').read_bytes()
    manifest = json.loads(raw)
    files = validate_manifest(manifest)
    content = {}
    site_path = release_dir / 'site'
    if not site_path.is_dir():
        site_path = release_dir.parent / 'public_html'
    site = site_path.resolve(strict=True)
    for name, entry in files.items():
        path = no_symlink_path(site, name)
        if not path.is_file():
            raise ValueError('Missing release file: ' + name)
        data = path.read_bytes()
        if len(data) != entry['size'] or digest(data) != entry['sha256']:
            raise ValueError('Release file differs from manifest: ' + name)
        content['site/' + name] = data
    with tarfile.open(output, 'w:gz') as archive:
        for name, data in [('manifest.json', raw)] + sorted(content.items()):
            member = tarfile.TarInfo(name)
            member.size = len(data)
            member.mode = 0o600
            member.mtime = 0
            archive.addfile(member, io.BytesIO(data))
    return {'status': 'verified', 'files': len(files), 'archive': str(output)}


def read_archive(stream):
    received = {}
    total = 0
    with tarfile.open(fileobj=stream, mode='r|*') as archive:
        for member in archive:
            if not member.isfile() or member.name in received:
                raise ValueError('Archive contains a duplicate or non-regular member')
            if member.name != 'manifest.json' and not (member.name.startswith('site/') and allowed_path(member.name[5:])):
                raise ValueError('Out-of-scope archive member')
            if member.size < 1 or member.size > MAX_FILE_BYTES:
                raise ValueError('Invalid archive member size')
            total += member.size
            if total > MAX_BYTES + 65536 or len(received) > 50:
                raise ValueError('Archive is too large')
            received[member.name] = archive.extractfile(member).read()
    if 'manifest.json' not in received:
        raise ValueError('Archive manifest missing')
    manifest = json.loads(received.pop('manifest.json'))
    files = validate_manifest(manifest)
    if set(received) != {'site/' + name for name in files}:
        raise ValueError('Archive members do not match manifest')
    for name, entry in files.items():
        data = received['site/' + name]
        if len(data) != entry['size'] or digest(data) != entry['sha256']:
            raise ValueError('Uploaded bytes differ from manifest: ' + name)
    return manifest, {name: received['site/' + name] for name in files}


def file_state(path):
    if path.is_symlink():
        raise ValueError('Symlink file refused: ' + str(path))
    if not path.exists():
        return None
    if not path.is_file():
        raise ValueError('Target is not a regular file: ' + str(path))
    return digest(path.read_bytes())


def index_shadows(root):
    obs = root / 'observatories'
    shadows = []
    for name in ['index.html', 'index.htm']:
        p = no_symlink_path(root, 'observatories/' + name)
        if file_state(p) is not None:
            shadows.append(p)
    for conf in [root / '.htaccess', obs / '.htaccess']:
        if conf.is_symlink():
            raise ValueError('Cannot inspect symlink .htaccess')
        if not conf.is_file():
            continue
        for line in conf.read_text(errors='replace').splitlines():
            if re.match(r'^\s*DirectoryIndex\s+', line, re.I):
                entries = line.split('#', 1)[0].split()[1:]
                if 'index.php' not in entries or 'index.html' not in entries:
                    raise ValueError('DirectoryIndex must allow index.php and index.html; update that server rule before deployment')
                for item in entries[:entries.index('index.php')]:
                    if item not in ['index.html', 'index.htm'] and (obs / item).exists():
                        raise ValueError('Another DirectoryIndex page would shadow the new library: ' + item)
    for slug in ['xyz-flower']:
        for name in ['index.php', 'index.htm', 'index.shtml', 'index.phtml']:
            p = no_symlink_path(root, 'observatories/' + slug + '/' + name)
            if p.exists():
                raise ValueError('Another entry page exists in ' + slug + ': ' + name)
    return shadows


def install_archive(stream, root=None, php_binary='php', fail_after=None):
    """Install only declared paths. fail_after is a local-test hook, not a CLI option."""
    manifest, contents = read_archive(stream)
    explicit_root = root is not None
    root = Path(root or Path.home() / 'www').resolve(strict=True)
    if not root.is_dir():
        raise ValueError('Existing website document root required')
    no_symlink_path(root, 'observatories')
    targets = {name: no_symlink_path(root, name) for name in contents}
    states = {name: file_state(path) for name, path in targets.items()}
    # Refuse to replace edits made since the known catalog release.
    for name, current in states.items():
        accepted = {None, manifest['files'][name]['sha256']}
        if name == 'observatories/index.php': accepted.add(BASE_INDEX_HASH)
        if current not in accepted:
            raise ValueError('Destination has unreviewed changes; no files replaced: ' + name)
    shadows = index_shadows(root)
    shadow_states = {str(p.relative_to(root)): file_state(p) for p in shadows}
    private = (root.parent if explicit_root else Path.home()) / '.aletheos-observatory-releases'
    if private.is_symlink():
        raise ValueError('Backup root is a symlink')
    private.mkdir(mode=0o700, exist_ok=True)
    if not private.is_dir():
        raise ValueError('Backup root is not a directory')
    lock = private / 'deployment.lock'
    try:
        lock.mkdir(mode=0o700)
    except FileExistsError:
        raise ValueError('Another deployment may be active; private deployment lock exists')
    stage_dir = None
    backup_dir = None
    adjacent = {}
    changed = []
    removed = []
    created_dirs = []
    try:
        stage_dir = Path(tempfile.mkdtemp(prefix='upload-', dir=private))
        for name, data in contents.items():
            p = stage_dir / name
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_bytes(data)
            if p.suffix == '.php':
                check = subprocess.run([php_binary, '-l', str(p)], text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
                if check.returncode:
                    raise ValueError('PHP syntax validation failed: ' + check.stdout.strip())
        changed_names = [name for name in contents if states[name] != manifest['files'][name]['sha256']]
        if not changed_names and not shadows:
            return {'status': 'unchanged', 'release': RELEASE, 'files': len(contents)}
        backup_dir = private / (time.strftime('%Y%m%d-%H%M%S', time.gmtime()) + '-' + uuid.uuid4().hex[:10])
        backup_dir.mkdir(mode=0o700)
        originals = {**{name: states[name] for name in changed_names}, **shadow_states}
        for name, original_hash in originals.items():
            if original_hash is None:
                continue
            source = no_symlink_path(root, name)
            if file_state(source) != original_hash:
                raise ValueError('Destination changed before backup: ' + name)
            backup = backup_dir / name
            backup.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, backup)
            if digest(backup.read_bytes()) != original_hash:
                raise ValueError('Backup verification failed: ' + name)
        (backup_dir / 'receipt.json').write_text(json.dumps({'release': RELEASE, 'originals': originals, 'manifest': manifest}, indent=2) + '\n')
        for name in changed_names:
            target = targets[name]
            ancestors = []
            parent = target.parent
            while not parent.exists():
                ancestors.append(parent)
                parent = parent.parent
            for directory in reversed(ancestors):
                directory.mkdir(mode=0o755)
                created_dirs.append(directory)
            no_symlink_path(root, name)
            fd, tmpname = tempfile.mkstemp(prefix='.observatory-install-', dir=target.parent)
            with os.fdopen(fd, 'wb') as out:
                out.write(contents[name])
                out.flush()
                os.fsync(out.fileno())
            tmp = Path(tmpname)
            tmp.chmod(0o644)
            if digest(tmp.read_bytes()) != manifest['files'][name]['sha256']:
                raise ValueError('Staged destination checksum mismatch')
            adjacent[name] = tmp
        ordered = sorted(changed_names, key=lambda name: (name == 'observatories/index.php', name))
        for name in ordered:
            if name == 'observatories/index.php':
                for shadow in shadows:
                    rel = str(shadow.relative_to(root))
                    if file_state(shadow) != shadow_states[rel]:
                        raise ValueError('Old library entry page changed during deployment')
                    shadow.unlink()
                    removed.append(rel)
            target = no_symlink_path(root, name)
            if file_state(target) != states[name]:
                raise ValueError('Destination changed during deployment: ' + name)
            os.replace(adjacent[name], target)
            adjacent.pop(name)
            changed.append(name)
            if fail_after is not None and len(changed) == fail_after:
                raise RuntimeError('Injected installation failure')
        # An unchanged PHP index can still be shadowed by a previous static index.
        for shadow in shadows:
            rel = str(shadow.relative_to(root))
            if rel not in removed:
                if file_state(shadow) != shadow_states[rel]:
                    raise ValueError('Old library entry page changed during deployment')
                shadow.unlink()
                removed.append(rel)
        return {'status': 'installed', 'release': RELEASE, 'changed': changed, 'preserved_static_index': removed, 'backup_directory': str(backup_dir)}
    except Exception as error:
        rollback_errors = []
        if backup_dir is not None:
            for name in reversed(changed):
                target = targets[name]
                try:
                    if file_state(target) != manifest['files'][name]['sha256']:
                        raise ValueError('file changed after installation')
                    if states[name] is None:
                        target.unlink()
                    else:
                        fd, tmpname = tempfile.mkstemp(prefix='.observatory-restore-', dir=target.parent)
                        os.close(fd)
                        shutil.copy2(backup_dir / name, tmpname)
                        os.replace(tmpname, target)
                except Exception as rollback_error:
                    rollback_errors.append(name + ': ' + str(rollback_error))
            for name in removed:
                try:
                    target = no_symlink_path(root, name)
                    if target.exists():
                        raise ValueError('shadow path was recreated')
                    shutil.copy2(backup_dir / name, target)
                except Exception as rollback_error:
                    rollback_errors.append(name + ': ' + str(rollback_error))
        if rollback_errors:
            raise RuntimeError(str(error) + '; rollback needs attention: ' + '; '.join(rollback_errors)) from error
        raise
    finally:
        for path in adjacent.values():
            path.unlink(missing_ok=True)
        for directory in reversed(created_dirs):
            try:
                directory.rmdir()
            except OSError:
                pass
        if stage_dir is not None:
            shutil.rmtree(stage_dir)
        lock.rmdir()


def main():
    if sys.version_info < (3, 8):
        raise RuntimeError('Python 3.8 or newer is required; no site files changed')
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    p = sub.add_parser('pack')
    p.add_argument('release_dir')
    p.add_argument('archive')
    sub.add_parser('install')
    args = parser.parse_args()
    if args.command == 'pack':
        result = pack(args.release_dir, args.archive)
    else:
        result = install_archive(sys.stdin.buffer)
    print(json.dumps(result, separators=(',', ':')))


if __name__ == '__main__':
    try:
        main()
    except Exception as exc:
        print('Observatory deployment stopped: ' + str(exc), file=sys.stderr)
        sys.exit(1)
