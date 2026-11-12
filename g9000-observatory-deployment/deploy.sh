#!/usr/bin/env bash
# Termux/macOS/Linux driver. Authentication stays in the user's existing SSH setup.
set -u
remote=${G9000_SSH_TARGET:-gurtiamy}
fail() { printf 'G9000 deployment stopped: %s\n' "$*" >&2; exit 1; }
[ "$#" -eq 0 ] || fail 'Run deploy.sh without arguments.'
case "$remote" in ''|-*|*[!A-Za-z0-9_@.:-]*) fail 'Invalid SSH target.';; esac
repo=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P) || fail 'Cannot locate repository.'
for tool in python3 ssh scp curl; do command -v "$tool" >/dev/null 2>&1 || fail "Missing $tool (Termux: pkg install python openssh curl)."; done
local_stage=$(mktemp -d "${TMPDIR:-/tmp}/g9000-observatory.XXXXXXXX") || fail 'Cannot create local staging directory.'
stage=
cleanup() {
  if [ -n "$stage" ]; then
    if ! ssh "$remote" "python3 - '$stage'" <<'REMOTE_CLEANUP'
import os, pathlib, shutil, stat, sys
home = pathlib.Path.home()
stage = pathlib.Path(sys.argv[1])
lock = home / '.g9000-observatory-install.lock'
if stage.parent != home or not stage.name.startswith('.g9000-observatory-upload.'):
    raise SystemExit('Unsafe cleanup path')
owner = lock / 'owner'
if owner.is_file() and not owner.is_symlink() and owner.read_text() == stage.name:
    if stage.exists():
        if stage.is_symlink() or not stage.is_dir():
            raise SystemExit('Unsafe staging cleanup')
        shutil.rmtree(str(stage))
    owner.unlink()
    lock.rmdir()
else:
    raise SystemExit('Lock ownership changed; cleanup stopped')
REMOTE_CLEANUP
    then printf 'Remote staging cleanup needs attention: %s\n' "$stage" >&2; fi
  fi
  rm -rf -- "$local_stage"
}
trap cleanup EXIT
trap 'printf "Deployment interrupted.\n" >&2; exit 130' INT
trap 'printf "Deployment terminated.\n" >&2; exit 143' TERM
python3 "$repo/g9000-observatory-deployment/build-release.py" --output "$local_stage" > "$local_stage/build.json" || fail 'Local release build failed.'
field() { python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))[sys.argv[2]])' "$local_stage/build.json" "$1"; }
archive_sha=$(field archive_sha256) || fail 'Cannot read archive hash.'
manifest_sha=$(field manifest_sha256) || fail 'Cannot read manifest hash.'
index_sha=$(field index_sha256) || fail 'Cannot read index hash.'
release_id=$(field release_id) || fail 'Cannot read release identity.'

printf 'Checking the existing G9000 destination on %s…\n' "$remote"
prepared=$(ssh "$remote" "python3 -" <<'REMOTE_PREPARE'
import os, pathlib, stat, sys, tempfile
if sys.version_info < (3, 6):
    raise SystemExit('Remote Python 3.6 or newer is required; nothing was changed')
home = pathlib.Path.home()
parent = home / 'www' / 'observatories'
if not (home / 'www').is_dir() or parent.is_symlink() or not parent.is_dir():
    raise SystemExit('Existing ~/www/observatories directory required')
target = parent / 'g9000'
if target.is_symlink() or (target.exists() and not target.is_dir()):
    raise SystemExit('G9000 target is unsafe')
index = target / 'index.html'
if index.is_symlink() or (index.exists() and not index.is_file()):
    raise SystemExit('G9000 index is unsafe')
lock = home / '.g9000-observatory-install.lock'
try:
    lock.mkdir(mode=0o700)
except FileExistsError:
    raise SystemExit('Another G9000 installation holds the lock; inspect it before retrying')
stage = None
try:
    stage = pathlib.Path(tempfile.mkdtemp(prefix='.g9000-observatory-upload.', dir=str(home)))
    (lock / 'owner').write_text(stage.name)
except BaseException:
    if stage is not None:
        stage.rmdir()
    lock.rmdir()
    raise
print('STAGE:' + str(stage))
REMOTE_PREPARE
) || fail 'Remote preflight failed; no page was replaced.'
case "$prepared" in STAGE:/*) stage=${prepared#STAGE:};; *) fail 'Unexpected staging response.';; esac
case "$stage" in *[!A-Za-z0-9_./-]*|*/../*|*/./*) stage=; fail 'Unsafe staging response.';; esac
case "$stage" in */.g9000-observatory-upload.*) :;; *) stage=; fail 'Unexpected staging path.';; esac
printf 'Uploading the verified immutable release…\n'
scp "$local_stage/release.tar" "$remote:$stage/release.tar" || fail 'Upload failed; the installed page was not changed.'

ssh "$remote" "python3 - '$stage' '$archive_sha' '$manifest_sha' '$index_sha' '$release_id'" <<'REMOTE_INSTALL'
import hashlib, json, os, pathlib, re, shutil, stat, sys, tarfile, tempfile

def stop(message):
    raise SystemExit('Remote install: ' + message)

def digest(data):
    return hashlib.sha256(data).hexdigest()

def regular(path):
    return path.is_file() and not path.is_symlink()

def directory(path, create=False, private=False):
    if path.is_symlink() or (path.exists() and not path.is_dir()):
        stop('Unsafe directory: ' + str(path))
    if not path.exists():
        if not create:
            stop('Missing directory: ' + str(path))
        path.mkdir(mode=0o700 if private else 0o755)
        # A restrictive server umask must not make a new public directory unreadable.
        os.chmod(str(path), 0o700 if private else 0o755)
    if private:
        os.chmod(str(path), 0o700)

home = pathlib.Path.home()
stage = pathlib.Path(sys.argv[1])
archive_sha, manifest_sha, index_sha, release_id = sys.argv[2:]
if any(re.fullmatch('[0-9a-f]{64}', value) is None for value in (archive_sha, manifest_sha, index_sha, release_id)):
    stop('Malformed release hash')
if stage.parent != home or not stage.name.startswith('.g9000-observatory-upload.'):
    stop('Staging path mismatch')
directory(stage)
lock = home / '.g9000-observatory-install.lock'
directory(lock)
if not regular(lock / 'owner') or (lock / 'owner').read_text() != stage.name:
    stop('Installation lock ownership changed')
archive = stage / 'release.tar'
if not regular(archive) or archive.stat().st_size > 24 * 1024 * 1024:
    stop('Unsafe or oversized upload')
if digest(archive.read_bytes()) != archive_sha:
    stop('Uploaded archive hash mismatch')

with tarfile.open(str(archive), 'r:') as tar:
    members = tar.getmembers()
    names = [member.name for member in members]
    if len(names) != len(set(names)) or len(names) > 202:
        stop('Duplicate or excessive archive members')
    for member in members:
        path = pathlib.PurePosixPath(member.name)
        if not member.isfile() or member.name.startswith('/') or '\\' in member.name or any(part in ('', '.', '..') for part in path.parts):
            stop('Unsafe archive member')
        if member.size < 0 or member.size > 20 * 1024 * 1024:
            stop('Oversized archive member')
    if sum(member.size for member in members) > 21 * 1024 * 1024:
        stop('Oversized extracted release')
    if 'manifest.json' not in names:
        stop('Missing manifest')
    manifest_bytes = tar.extractfile('manifest.json').read()
    if digest(manifest_bytes) != manifest_sha:
        stop('Manifest hash mismatch')
    manifest = json.loads(manifest_bytes.decode('utf-8'))
    if manifest.get('schema') != 'g9000-observatory-release/1' or manifest.get('release_id') != release_id or manifest.get('index_sha256') != index_sha:
        stop('Manifest identity mismatch')
    rows = manifest.get('files', [])
    expected = {row['path']: row for row in rows}
    if len(expected) != len(rows) or set(names) != set(expected) | {'manifest.json'}:
        stop('Archive differs from the exact manifest')
    prefix = 'releases/' + release_id + '/'
    if 'index.html' not in expected or any(name != 'index.html' and not name.startswith(prefix) for name in expected):
        stop('Manifest paths escape this release')
    extracted = stage / 'extracted'
    extracted.mkdir(mode=0o700)
    for name, row in expected.items():
        data = tar.extractfile(name).read()
        if len(data) != row['size'] or digest(data) != row['sha256']:
            stop('Manifest file verification failed: ' + name)
        destination = extracted / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(data)
    entry = (extracted / 'index.html').read_bytes()
    if digest(entry) != index_sha or not entry.startswith(('<!-- G9000-OBSERVATORY-RELEASE ' + release_id + ' -->\n').encode()):
        stop('Entry index identity mismatch')

parent = home / 'www' / 'observatories'
directory(parent)
target = parent / 'g9000'
directory(target, create=True)
receipts = home / '.g9000-observatory-receipts'
directory(receipts, create=True, private=True)
index = target / 'index.html'
current = None
if index.exists() or index.is_symlink():
    if not regular(index):
        stop('Existing index is unsafe')
    current = digest(index.read_bytes())
    receipt = receipts / (current + '.json')
    if not regular(receipt):
        stop('Unrecognized existing G9000 page; nothing was overwritten')
    known = json.loads(receipt.read_text())
    if known.get('schema') != 'g9000-observatory-installed/1' or known.get('index_sha256') != current:
        stop('Existing page receipt is invalid')

release_parent = target / 'releases'
directory(release_parent, create=True)
release_path = release_parent / release_id
release_rows = {name[len(prefix):]: row for name, row in expected.items() if name.startswith(prefix)}

def verify_release(path):
    directory(path)
    found = set()
    for item in path.rglob('*'):
        if item.is_symlink():
            stop('Immutable release contains a symlink')
        if item.is_file():
            name = item.relative_to(path).as_posix()
            found.add(name)
            row = release_rows.get(name)
            if row is None or item.stat().st_size != row['size'] or digest(item.read_bytes()) != row['sha256']:
                stop('Immutable release differs from manifest')
        elif not item.is_dir():
            stop('Immutable release contains a nonregular entry')
    if found != set(release_rows):
        stop('Immutable release is incomplete')

if release_path.exists() or release_path.is_symlink():
    verify_release(release_path)
else:
    incoming = pathlib.Path(tempfile.mkdtemp(prefix='.g9000-install.', dir=str(release_parent)))
    try:
        for name in release_rows:
            destination = incoming / name
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(str(extracted / prefix / name), str(destination))
            os.chmod(str(destination), 0o644)
        for item in incoming.rglob('*'):
            if item.is_dir():
                os.chmod(str(item), 0o755)
        os.chmod(str(incoming), 0o755)
        verify_release(incoming)
        if release_path.exists() or release_path.is_symlink():
            stop('Release destination appeared during installation')
        os.rename(str(incoming), str(release_path))
    finally:
        if incoming.exists():
            shutil.rmtree(str(incoming))

if current != index_sha:
    if current is not None:
        backups = home / '.g9000-observatory-backups'
        directory(backups, create=True, private=True)
        backup = backups / (current + '.html')
        if backup.exists() or backup.is_symlink():
            if not regular(backup) or digest(backup.read_bytes()) != current:
                stop('Unsafe or mismatched backup')
        else:
            with backup.open('xb') as file:
                file.write(index.read_bytes())
            os.chmod(str(backup), 0o600)
        if digest(backup.read_bytes()) != current:
            stop('Backup verification failed')
        print('Rollback copy: ' + str(backup))
    receipt = receipts / (index_sha + '.json')
    new_receipt = {'schema': 'g9000-observatory-installed/1', 'index_sha256': index_sha,
                   'release_id': release_id, 'manifest_sha256': manifest_sha}
    if receipt.exists() or receipt.is_symlink():
        if not regular(receipt) or json.loads(receipt.read_text()) != new_receipt:
            stop('Receipt conflicts with this release')
    else:
        with receipt.open('x') as file:
            json.dump(new_receipt, file, sort_keys=True)
            file.write('\n')
        os.chmod(str(receipt), 0o600)
    handle, temporary = tempfile.mkstemp(prefix='.g9000-index.', dir=str(target))
    try:
        with os.fdopen(handle, 'wb') as file:
            file.write(entry)
            file.flush()
            os.fsync(file.fileno())
        os.chmod(temporary, 0o644)
        if current is None:
            if index.exists() or index.is_symlink():
                stop('Index appeared before publication')
            # link is atomic and refuses to clobber a concurrently created first index.
            os.link(temporary, str(index))
        else:
            if not regular(index) or digest(index.read_bytes()) != current:
                stop('Existing index changed before publication')
            os.replace(temporary, str(index))
        if digest(index.read_bytes()) != index_sha:
            stop('Installed index verification failed')
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)
    print('Installed /observatories/g9000/ release ' + release_id)
else:
    print('Identical G9000 release is already installed')
REMOTE_INSTALL
result=$?
[ "$result" -eq 0 ] || fail 'Remote install failed; inspect the message above before retrying.'
printf 'Checking public HTTPS delivery…\n'
url="https://aletheos.ai/observatories/g9000/?release=$release_id"
curl --fail --silent --show-error --location --max-time 60 --header 'Cache-Control: no-cache' --output "$local_stage/live-index.html" "$url" || fail 'Release installed, but public HTTPS delivery could not be verified.'
python3 -c 'import hashlib,sys; actual=hashlib.sha256(open(sys.argv[1],"rb").read()).hexdigest(); sys.exit(0 if actual==sys.argv[2] else "Served index differs from the installed release")' "$local_stage/live-index.html" "$index_sha" || fail 'Release installed, but public HTTPS returned a different index.'
printf 'Verified live: https://aletheos.ai/observatories/g9000/\n'
