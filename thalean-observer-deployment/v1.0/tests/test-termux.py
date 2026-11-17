#!/usr/bin/env python3
"""Run the actual Termux wrapper against isolated SSH/HTTPS test doubles."""
from pathlib import Path
import hashlib, json, os, shutil, subprocess, sys, tempfile

R = Path(__file__).resolve().parents[1]
checks = []

def check(name, passed):
    checks.append({'name': name, 'passed': bool(passed)})
    if not passed:
        raise AssertionError(name)

with tempfile.TemporaryDirectory(prefix='observer-termux-test-') as tmp:
    root = Path(tmp)
    release = root / 'release'
    release.mkdir()
    for name in ['index.html', 'server.sh', 'deploy.sh']:
        shutil.copyfile(R / name, release / name)
    manifest = ''.join(hashlib.sha256(p.read_bytes()).hexdigest() + '  ' + p.name + '\n'
                       for p in sorted(release.iterdir()))
    (release / 'SHA256SUMS').write_text(manifest)
    commands = root / 'bin'
    commands.mkdir()
    ssh = r'''
import hashlib, os, shlex, sys
from pathlib import Path
r = Path(os.environ['OBSERVER_TEST_RELEASE'])
args = sys.argv[1:]
assert args[:2] == ['-T', 'gurtiamy'], args
cmd = shlex.split(args[2])
assert cmd[:2] == ['bash', '-c'] and cmd[3] == 'bash', cmd[:2]
assert cmd[2] == (r/'server.sh').read_text().rstrip('\n'), 'Remote shell quoting changed script bytes'
payload = sys.stdin.buffer.read()
if cmd[4] == 'install': assert payload == (r/'index.html').read_bytes()
else: assert payload == b''
Path(os.environ['OBSERVER_TEST_TRACE']).write_text(cmd[4])
if os.environ['OBSERVER_TEST_MODE'] == 'ssh-fail': sys.exit(1)
if cmd[4] == 'rollback': print('LIVE_ABSENT=1')
else: print('LIVE_SHA256=' + hashlib.sha256((r/'index.html').read_bytes()).hexdigest())
'''
    curl = r'''
import os, sys
from pathlib import Path
args = sys.argv[1:]
if os.environ['OBSERVER_TEST_MODE'] == 'http-fail': sys.exit(22)
out = Path(args[args.index('-o')+1])
payload = (Path(os.environ['OBSERVER_TEST_RELEASE'])/'index.html').read_bytes()
out.write_bytes(b'wrong response' if os.environ['OBSERVER_TEST_MODE'] == 'stale' else payload)
if '-w' in args: print('404', end='')
'''
    for name, code in [('ssh', ssh), ('curl', curl)]:
        p = commands / name
        p.write_text('#!' + sys.executable + '\n' + code)
        p.chmod(0o755)
    trace = root / 'ssh-called'
    def run(mode='good', operation='install'):
        trace.unlink(missing_ok=True)
        env = dict(os.environ, PATH=str(commands) + os.pathsep + os.environ['PATH'],
                   OBSERVER_TEST_RELEASE=str(release), OBSERVER_TEST_TRACE=str(trace),
                   OBSERVER_TEST_MODE=mode)
        return subprocess.run(['bash', str(release/'deploy.sh'), operation],
                              capture_output=True, text=True, env=env)
    p = run()
    check('SSH quoting, HTML payload and exact HTTPS success', p.returncode == 0 and 'LIVE VERIFIED:' in p.stdout and trace.read_text() == 'install')
    p = run(operation='verify')
    check('Read-only verify sends no HTML payload', p.returncode == 0 and trace.read_text() == 'verify')
    p = run(operation='rollback')
    check('Rollback requires server absence and checks public absence', p.returncode == 0 and 'ROLLBACK VERIFIED:' in p.stdout)
    p = run('stale')
    check('Stale public bytes never claim live success', p.returncode != 0 and 'LIVE VERIFIED:' not in p.stdout)
    p = run('http-fail')
    check('HTTP failure reports unverified installation', p.returncode != 0 and 'Installed on server' in p.stderr)
    p = run('ssh-fail')
    check('SSH failure stops public verification', p.returncode != 0 and 'SSH action failed' in p.stderr)
    with (release/'server.sh').open('a') as f:
        f.write('# tampered\n')
    p = run()
    check('Integrity failure stops before SSH', p.returncode != 0 and not trace.exists())
print(json.dumps({'status': 'PASS', 'check_count': len(checks), 'checks': checks}, indent=2))
