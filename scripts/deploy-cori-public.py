#!/usr/bin/env python3
"""Deploy the reviewed CoRI PHP changes on their existing host; Python 3.9+."""
import argparse
import fcntl
import hashlib
import html
import json
import os
from pathlib import Path
import re
import shutil
import stat
import subprocess
import sys
import tempfile
import time
import uuid

COMMIT = '86ad2850a5ff117a76b8a2e4dc42c32fb69ff301'
URL = 'https://aletheos.ai'
HASHES = {
    'about_cori.php': 'd7195ce689c874b5b473bc029d375df5a57e7ccf4cd1bcd260ba42f6349d7609',
    'glossary.php': 'ccc9bfad4d70adb0c1cb6c01c596f0ccb5656475ab36bd6187c48356b73dd88d',
    'includes/site_footer.php': 'ba7f36f4e0ec1cd5994ed519baf4a9fc9117eaf069c6fd594ec08a88a3139875',
    'includes/site_header.php': 'f5e687453232a837bbe7816d925a587b41cc679293131597f83dec4e6e8f1fa6',
    'index.php': '3dff3ea7dd21576ed9eb8aa90afd62876237495aba1290259581a548151e1a3f',
    'mission.php': 'c483d1e8c7194e3d82ad8882c930859971a46508b3052609420b973fc18157c9',
    'philosophy.php': '3f72c5b5b92040b50466d4deeea298987ca1d995f49f62bdce36c68ade81ccd3',
    'philosophy/consciousness-and-relation.php': 'cd9ca6af7e02da5f107633f8789004edf6b122f3e1833538784eb3a6c5d51a3e',
    'philosophy/let-my-trace-not-be-cruelty.php': '5f743b0fe0e5dc84cf8418176356134c2ab178a8edd07971c7e9b26f5745af00',
    'research.php': '9f0aeb40dc69238ed44bf9eadb932bc983ed63d20473f1e18e698d39816e2fe7',
    'research/memory-and-possibility.php': '780a8ac280a1d620823ea10c99b68cc2c2d07a22f31db9bf6cfb60171f4b2300',
    'the_thalean_graph_at4val_60_6.php': 'a4cfd23199e40bc1599c455a2bb927b9fd8a04e2cb08baccbd5b8ab0c0265ace',
}
PAGES = {
    'about_cori.php': ('About CoRI - Aletheos.ai', 'Err. Doubt. Endure. Discover.'),
    'glossary.php': ('Thalean Glossary - Aletheos.ai', 'Thalean terms, plainly defined.'),
    'index.php': ('Aletheos.ai — Findings and ideas from CoRI', 'What can memory change?'),
    'mission.php': ('Mission - Aletheos.ai', 'Deepen understanding. Steward what follows.'),
    'philosophy.php': ('Philosophy — Experience, meaning, and responsibility at CoRI', 'Experience. Meaning. Responsibility.'),
    'philosophy/consciousness-and-relation.php': ('What do we mean by conscious? — CoRI philosophy', 'What do we mean by conscious?'),
    'philosophy/let-my-trace-not-be-cruelty.php': ('Let My Trace Not Be Cruelty — Scott Allen Cave', 'Let My Trace Not Be Cruelty'),
    'research.php': ('Findings and ideas — Aletheos.ai', 'What are we learning?'),
    'research/memory-and-possibility.php': ('What can memory change? — CoRI findings', 'What can memory change?'),
    'the_thalean_graph_at4val_60_6.php': ('Research — The Thalean Graph', 'The Thalean Graph.'),
}
DEPENDENCIES = ('includes/head.php', 'includes/analytics.php')


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def safe_path(root, relative):
    """The resolved root may itself originate from ~/www; nothing below may link."""
    parts = Path(relative).parts
    if not parts or Path(relative).is_absolute() or '..' in parts:
        raise RuntimeError('Unsafe relative path: ' + relative)
    path = root
    for i, part in enumerate(parts):
        path = path / part
        if path.is_symlink():
            raise RuntimeError('Refusing symlink: ' + str(path))
        if path.exists() and i < len(parts) - 1 and not path.is_dir():
            raise RuntimeError('Parent is not a directory: ' + str(path))
    if path.exists() and not path.is_file():
        raise RuntimeError('Target is not a regular file: ' + str(path))
    return path


def atomic_copy(source, target, mode, owner=None, restore_times=None):
    target.parent.mkdir(parents=True, exist_ok=True)
    fd, name = tempfile.mkstemp(prefix='.cori-', dir=str(target.parent))
    os.close(fd)
    tmp = Path(name)
    try:
        shutil.copy2(source, tmp)
        os.chmod(tmp, mode)
        if owner and (tmp.stat().st_uid, tmp.stat().st_gid) != tuple(owner):
            os.chown(tmp, *owner)
        if restore_times:
            os.utime(tmp, ns=tuple(restore_times))
        with tmp.open('rb') as handle:
            os.fsync(handle.fileno())
        os.replace(tmp, target)
    finally:
        tmp.unlink(missing_ok=True)


def write_receipt(path, data):
    fd, name = tempfile.mkstemp(prefix='.receipt-', dir=str(path.parent))
    try:
        with os.fdopen(fd, 'w') as handle:
            json.dump(data, handle, indent=2)
            handle.write('\n')
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(name, path)
    finally:
        Path(name).unlink(missing_ok=True)


def fetch(relative):
    result = subprocess.run([
        'curl', '--fail', '--silent', '--show-error', '--max-time', '25',
        '--proto', '=https', '--user-agent',
        'Mozilla/5.0 (compatible; CoRI-Deployment-Verification/1.0)',
        '--header', 'Cache-Control: no-cache',
        URL + '/' + relative + '?cori_check=' + uuid.uuid4().hex,
    ], capture_output=True, timeout=30)
    if result.returncode:
        raise RuntimeError('HTTP check failed for ' + relative + ': ' + result.stderr.decode(errors='replace').strip())
    return result.stdout


def verify_domain(live):
    name = 'cori-domain-check-' + uuid.uuid4().hex + '.txt'
    marker = safe_path(live, name)
    token = ('aletheos.ai ' + uuid.uuid4().hex + '\n').encode()
    try:
        with marker.open('xb') as handle:
            handle.write(token)
        marker.chmod(0o644)
        if fetch(name) != token:
            raise RuntimeError('Live directory does not serve the expected aletheos.ai marker')
    finally:
        marker.unlink(missing_ok=True)


def validate_html(relative, data):
    text = data.decode('utf-8')
    if '<?php' in text.lower() or re.search(r'(?:Fatal error|Parse error|Warning|Notice|Deprecated)\s*:', text, re.I):
        raise RuntimeError('PHP source or runtime error in ' + relative)
    title, heading = PAGES[relative]
    for tag, expected in [('title', title), ('h1', heading)]:
        found = re.findall(r'<' + tag + r'\b[^>]*>(.*?)</' + tag + r'>', text, re.S | re.I)
        values = [' '.join(html.unescape(re.sub('<[^>]+>', '', item)).split()) for item in found]
        if values != [expected]:
            raise RuntimeError('Unexpected ' + tag + ' in ' + relative)
    if 'Center of Recursive Inquiry — a Rook Services Inc. initiative.' not in text or 'href="/philosophy.php"' not in text:
        raise RuntimeError('Shared navigation/footer missing in ' + relative)


def discover_php():
    candidates = [shutil.which('php'), '/usr/local/bin/php', '/usr/bin/php']
    candidates += [str(p) for p in sorted(Path('/opt/cpanel').glob('ea-php*/root/usr/bin/php'), reverse=True)]
    for candidate in dict.fromkeys(p for p in candidates if p):
        try:
            result = subprocess.run([candidate, '-r', 'echo PHP_SAPI;'], capture_output=True, timeout=10)
            if result.returncode == 0 and result.stdout == b'cli':
                return candidate
        except (OSError, subprocess.TimeoutExpired):
            pass
    raise RuntimeError('PHP CLI unavailable; no live files changed')


def stage_and_check(source, live, stage):
    for relative, expected in HASHES.items():
        src = safe_path(source, relative)
        if not src.is_file() or digest(src) != expected:
            raise RuntimeError('Source does not match reviewed commit: ' + relative)
        dst = stage / relative
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
        if digest(dst) != expected:
            raise RuntimeError('Staged hash mismatch: ' + relative)
    for relative in DEPENDENCIES:
        src = safe_path(live, relative)
        if not src.is_file():
            raise RuntimeError('Missing live dependency: ' + relative)
        shutil.copy2(src, stage / relative)
    php = discover_php()
    opts = [php, '-d', 'error_reporting=-1', '-d', 'display_errors=stderr', '-d', 'log_errors=0']
    for relative in list(HASHES) + list(DEPENDENCIES):
        result = subprocess.run(opts + ['-l', str(stage / relative)], capture_output=True, timeout=20)
        if result.returncode or result.stderr:
            raise RuntimeError('PHP lint failed: ' + relative + '\n' + (result.stderr + result.stdout).decode(errors='replace'))
    for relative in PAGES:
        result = subprocess.run(opts + [str(stage / relative)], cwd=str(stage), capture_output=True, timeout=20)
        if result.returncode or result.stderr:
            raise RuntimeError('PHP render failed: ' + relative + '\n' + result.stderr.decode(errors='replace'))
        validate_html(relative, result.stdout)
    print('PASS: reviewed hashes, PHP lint and ten rendered pages')


def prepare_receipt(live, run):
    records = {}
    absent_dirs = set()
    for relative in HASHES:
        path = safe_path(live, relative)
        parent = path.parent
        while parent != live and not parent.exists():
            absent_dirs.add(parent.relative_to(live).as_posix())
            parent = parent.parent
        if not path.exists():
            records[relative] = {'existed': False}
            continue
        info = path.stat()
        backup = run / 'originals' / relative
        backup.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, backup)
        value = digest(backup)
        if digest(path) != value:
            raise RuntimeError('Live file changed during backup: ' + relative)
        records[relative] = {'existed': True, 'sha256': value,
                             'mode': stat.S_IMODE(info.st_mode), 'uid': info.st_uid,
                             'gid': info.st_gid, 'atime_ns': info.st_atime_ns,
                             'mtime_ns': info.st_mtime_ns}
    receipt = {'schema': 'cori.public-deployment.v1', 'source_commit': COMMIT,
               'url': URL, 'live': str(live), 'status': 'pending', 'files': records,
               'created_dirs': sorted(absent_dirs), 'installed': [],
               'browser_verified': False}
    path = run / 'receipt.json'
    write_receipt(path, receipt)
    return path


def rollback(receipt_path):
    receipt = json.loads(receipt_path.read_text())
    if receipt.get('schema') != 'cori.public-deployment.v1' or receipt.get('source_commit') != COMMIT or set(receipt['files']) != set(HASHES):
        raise RuntimeError('Unrecognized deployment receipt')
    live = Path(receipt['live']).resolve(strict=True)
    if receipt_path.resolve().is_relative_to(live):
        raise RuntimeError('Backup receipt must be outside live root')
    conflicts = []
    actions = []
    for relative, record in receipt['files'].items():
        target = safe_path(live, relative)
        current = digest(target) if target.exists() else None
        original = record.get('sha256')
        if current == original:
            continue
        if current != HASHES[relative]:
            conflicts.append(relative)
            continue
        backup = safe_path(receipt_path.parent / 'originals', relative)
        if record['existed'] and (not backup.exists() or digest(backup) != original):
            raise RuntimeError('Backup hash mismatch: ' + relative)
        actions.append((target, backup, record))
    if conflicts:
        receipt['status'] = 'rollback_conflict'
        receipt['conflicts'] = conflicts
        write_receipt(receipt_path, receipt)
        raise RuntimeError('Rollback refuses to overwrite subsequent changes: ' + ', '.join(conflicts))
    for target, backup, record in reversed(actions):
        if record['existed']:
            atomic_copy(backup, target, record['mode'], (record['uid'], record['gid']), (record['atime_ns'], record['mtime_ns']))
        else:
            target.unlink()
    for relative in sorted(receipt.get('created_dirs', []), key=len, reverse=True):
        if relative not in {'includes', 'philosophy', 'research'}:
            raise RuntimeError('Unexpected created directory in receipt')
        directory = live / relative
        if directory.is_symlink():
            raise RuntimeError('Refusing linked directory during rollback')
        try:
            directory.rmdir()
        except (FileNotFoundError, OSError):
            pass
    receipt['status'] = 'rolled_back'
    write_receipt(receipt_path, receipt)
    print('ROLLBACK COMPLETE: ' + str(receipt_path))


def activate(live, stage, receipt_path, verifier=None):
    receipt = json.loads(receipt_path.read_text())
    order = sorted(HASHES, key=lambda rel: (rel.startswith('includes/'), receipt['files'][rel]['existed'], rel))
    try:
        for relative in order:
            target = safe_path(live, relative)
            record = receipt['files'][relative]
            current = digest(target) if target.exists() else None
            if current != record.get('sha256'):
                raise RuntimeError('Live file changed since backup: ' + relative)
            if digest(stage / relative) != HASHES[relative]:
                raise RuntimeError('Staged file changed: ' + relative)
            owner = (record['uid'], record['gid']) if record['existed'] else None
            atomic_copy(stage / relative, target, record.get('mode', 0o644), owner)
            receipt['installed'].append(relative)
            write_receipt(receipt_path, receipt)
        if verifier:
            verifier()
        else:
            validate_html('index.php', fetch(''))
            for relative in PAGES:
                validate_html(relative, fetch(relative))
            for relative in ('labs.php', 'papers.php', 'evidence.php'):
                body = fetch(relative).decode('utf-8')
                if '<?php' in body.lower() or re.search(r'(?:Fatal error|Parse error|Warning|Notice|Deprecated)\s*:', body, re.I) or 'href="/philosophy.php"' not in body:
                    raise RuntimeError('Existing resource page failed: ' + relative)
        receipt['status'] = 'http_verified'
        write_receipt(receipt_path, receipt)
    except BaseException as error:
        print('Activation failed; rolling back: ' + str(error), file=sys.stderr)
        rollback(receipt_path)
        raise


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--live', default='~/www')
    parser.add_argument('--backups', default='~/aletheos-cori-backups')
    parser.add_argument('--check-only', action='store_true')
    parser.add_argument('--rollback', type=Path)
    args = parser.parse_args()
    if args.rollback:
        receipt = args.rollback.expanduser().resolve(strict=True)
        with (receipt.parent.parent / '.deploy.lock').open('a') as lock:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
            rollback(receipt)
        return
    live = Path(args.live).expanduser().resolve(strict=True)
    if not live.is_dir() or live == Path('/'):
        raise RuntimeError('Invalid live document root')
    backups = Path(args.backups).expanduser().resolve()
    if backups == live or backups.is_relative_to(live):
        raise RuntimeError('Backups must be outside the live document root')
    backups.mkdir(parents=True, exist_ok=True, mode=0o700)
    with (backups / '.deploy.lock').open('a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        verify_domain(live)
        print('PASS: document root verified through ' + URL)
        with tempfile.TemporaryDirectory(prefix='cori-stage-', dir=str(backups)) as temp:
            stage = Path(temp)
            source = Path(__file__).resolve().parent.parent / 'public_html'
            stage_and_check(source, live, stage)
            if args.check_only:
                print('CHECK ONLY: no production pages changed')
                return
            run = backups / ('activation-' + time.strftime('%Y%m%d-%H%M%S') + '-' + uuid.uuid4().hex[:8])
            run.mkdir(mode=0o700)
            receipt = prepare_receipt(live, run)
            import shlex
            print('Rollback: ' + shlex.join([sys.executable, str(Path(__file__).resolve()), '--rollback', str(receipt)]), flush=True)
            activate(live, stage, receipt)
            print('PUBLISHED: homepage, ten PHP pages and three resource pages passed HTTP checks; browser verification pending')
            print('Receipt: ' + str(receipt))


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        print('ERROR: ' + str(error), file=sys.stderr)
        sys.exit(1)
