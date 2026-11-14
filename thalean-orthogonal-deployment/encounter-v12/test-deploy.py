#!/usr/bin/env python3
"""Exercise real installer/wrapper in temporary directories, with no SSH/network."""
from pathlib import Path
import argparse, hashlib, json, os, shutil, subprocess, tempfile

HERE = Path(__file__).resolve().parent

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--previous', type=Path, required=True)
    ap.add_argument('--output', type=Path, required=True)
    args = ap.parse_args()
    old = args.previous.read_bytes()
    new = (HERE/'index.html').read_bytes()
    assert hashlib.sha256(old).hexdigest() == 'ebe248b6724f3e2727004b126b1b78f4bc6abb2670b830a4ce7a8406d573b44f'
    checks = []
    with tempfile.TemporaryDirectory(prefix='thalean-deploy-test-') as temporary:
        base = Path(temporary)
        def fixture(name, data=old):
            target = base/name/'observatories/thalean-orthogonal'
            target.mkdir(parents=True)
            (target/'index.html').write_bytes(data)
            return target
        def server(target, operation='install', payload=new):
            return subprocess.run(['bash', str(HERE/'server.sh'), operation, str(target)], input=payload, capture_output=True)
        def check(name, condition):
            assert condition, name
            checks.append(name)

        target = fixture('normal')
        r = server(target)
        backup = target/'index.before-encounter-v12.html'
        check('install_preserves_old_and_installs_exact_build', r.returncode==0 and (target/'index.html').read_bytes()==new and backup.read_bytes()==old)
        check('install_cleans_lock_and_staging', not (target/'.orthogonal-deploy-lock').exists() and not list(target.glob('.encounter-v12-*')))
        r = server(target)
        check('identical_retry_is_safe', r.returncode==0 and backup.read_bytes()==old and (target/'index.html').read_bytes()==new)
        r = server(target, 'rollback', b'')
        check('rollback_restores_exact_previous_bytes', r.returncode==0 and (target/'index.html').read_bytes()==old and backup.read_bytes()==old)
        r = server(target, 'rollback', b'')
        check('rollback_retry_is_safe', r.returncode==0 and (target/'index.html').read_bytes()==old)
        r = server(target, payload=b'corrupted')
        check('bad_upload_preserves_current_page', r.returncode!=0 and (target/'index.html').read_bytes()==old)
        unknown = fixture('unknown', b'owner edit')
        r = server(unknown)
        check('unknown_page_refused_without_backup', r.returncode!=0 and (unknown/'index.html').read_bytes()==b'owner edit' and not (unknown/backup.name).exists())
        conflict = fixture('conflict')
        (conflict/backup.name).write_bytes(b'other backup')
        r = server(conflict)
        check('conflicting_backup_preserved', r.returncode!=0 and (conflict/'index.html').read_bytes()==old and (conflict/backup.name).read_bytes()==b'other backup')
        linked = fixture('linked')
        (linked/'index.html').unlink()
        (linked/'actual.html').write_bytes(old)
        (linked/'index.html').symlink_to('actual.html')
        r = server(linked)
        check('symlink_index_refused', r.returncode!=0 and (linked/'index.html').is_symlink() and (linked/'actual.html').read_bytes()==old)
        link_target = base/'target-link'
        link_target.symlink_to(target, target_is_directory=True)
        r = server(link_target)
        check('symlink_destination_refused', r.returncode!=0 and (target/'index.html').read_bytes()==old)
        locked = fixture('locked')
        (locked/'.orthogonal-deploy-lock').mkdir()
        r = server(locked)
        check('existing_lock_preserved', r.returncode!=0 and (locked/'.orthogonal-deploy-lock').is_dir() and (locked/'index.html').read_bytes()==old)
        bad_restore = fixture('bad-restore', new)
        (bad_restore/backup.name).write_bytes(b'unknown')
        r = server(bad_restore, 'rollback', b'')
        check('unknown_rollback_backup_refused', r.returncode!=0 and (bad_restore/'index.html').read_bytes()==new)
        absent_backup = fixture('no-backup', new)
        r = server(absent_backup, 'rollback', b'')
        check('missing_rollback_backup_refused', r.returncode!=0 and (absent_backup/'index.html').read_bytes()==new)

        # Exercise the wrapper's actual remote-shell quoting and HTTPS checksum
        # handling using local adapters. HOME and real SSH settings are untouched.
        adapters = base/'adapters'
        adapters.mkdir()
        (adapters/'ssh').write_text('''#!/usr/bin/env python3
import os,shlex,subprocess,sys
assert sys.argv[1:3]==['-T','gurtiamy']
command=shlex.split(sys.argv[3])+[os.environ['THALEAN_TEST_TARGET']]
r=subprocess.run(command,input=sys.stdin.buffer.read())
raise SystemExit(r.returncode)
''')
        (adapters/'curl').write_text('''#!/usr/bin/env python3
import os,sys
from pathlib import Path
if os.environ.get('THALEAN_TEST_HTTP_FAIL'):raise SystemExit(22)
destination=sys.argv[sys.argv.index('-o')+1]
Path(destination).write_bytes((Path(os.environ['THALEAN_TEST_TARGET'])/'index.html').read_bytes())
''')
        for p in adapters.iterdir():p.chmod(0o755)
        wrapped = fixture('wrapper')
        env = dict(os.environ, PATH=str(adapters)+os.pathsep+os.environ['PATH'], THALEAN_TEST_TARGET=str(wrapped))
        def wrapper(package=HERE, operation='install', environment=env):
            return subprocess.run(['bash',str(package/'deploy.sh'),operation],capture_output=True,env=environment)
        r = wrapper()
        check('wrapper_streams_and_quotes_real_server_script', r.returncode==0 and b'LIVE VERIFIED:' in r.stdout and (wrapped/'index.html').read_bytes()==new)
        r = wrapper(operation='rollback')
        check('wrapper_rollback_verifies_previous_public_bytes', r.returncode==0 and b'LIVE VERIFIED:' in r.stdout and (wrapped/'index.html').read_bytes()==old)
        r = wrapper(environment=dict(env, THALEAN_TEST_HTTP_FAIL='1'))
        check('public_fetch_failure_is_not_reported_as_live_success', r.returncode!=0 and b'LIVE VERIFIED:' not in r.stdout and (wrapped/'index.html').read_bytes()==new and b'Server action completed' in r.stderr)
        tampered = base/'tampered-package'
        shutil.copytree(HERE,tampered)
        (tampered/'index.html').write_bytes(b'changed')
        r = wrapper(package=tampered)
        check('tampered_package_stops_before_ssh', r.returncode!=0 and b'Running install' not in r.stdout and (wrapped/'index.html').read_bytes()==new)

    payload = {'verification_pass':True,'checks':len(checks),'passed':checks,'failed':[],
               'actual_installer_and_wrapper_executed':True,'network_used':False,'live_deployment_performed':False}
    args.output.write_text(json.dumps(payload,indent=2)+'\n')
    print(json.dumps(payload,indent=2))

if __name__=='__main__':main()
