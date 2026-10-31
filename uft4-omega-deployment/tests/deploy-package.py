#!/usr/bin/env python3
"""Exercise the shipped deployment package with local SSH/SCP stand-ins.

Run with Python 3 on Linux. No network calls or changes to HOME are made.
Copy release.sha256 verbatim: regenerating it would mask packaging defects.
"""

import hashlib
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest


REPO = Path(__file__).resolve().parents[2]
HTML = Path("public_html/observatories/uft4-omega/index.html")
DEPLOY = Path("uft4-omega-deployment/deploy.sh")
MANIFEST = Path("uft4-omega-deployment/release.sha256")


class DeploymentPackageTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="uft4-package-")
        self.addCleanup(self.temp.cleanup)
        root = Path(self.temp.name)
        self.repo, self.remote, commands = root / "repo", root / "host", root / "bin"
        self.remote.mkdir()
        commands.mkdir()
        # These three files are the release artifacts, not reconstructed fixtures.
        for path in (DEPLOY, MANIFEST, HTML):
            destination = self.repo / path
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(REPO / path, destination)
            self.assertEqual(destination.read_bytes(), (REPO / path).read_bytes())
        self.html = (self.repo / HTML).read_bytes()
        self.calls = root / "calls.log"
        self.calls.write_text("")
        common = """import os, pathlib, sys
assert sys.argv[1] != ''
with open(os.environ['UFT4_PACKAGE_CALLS'], 'a') as log:
    log.write(pathlib.Path(sys.argv[0]).name + '\\n')
"""
        (commands / "ssh").write_text("#!/usr/bin/env python3\n" + common + """
import subprocess
assert sys.argv[1] == 'package-test', 'Unexpected SSH target'
assert len(sys.argv) == 3
code = sys.stdin.read().replace('$HOME', '$UFT4_PACKAGE_HOST_ROOT')
command = sys.argv[2].replace('$HOME', '$UFT4_PACKAGE_HOST_ROOT')
result = subprocess.run(['bash', '-c', command], input=code, text=True,
                        cwd=os.environ['UFT4_PACKAGE_HOST_ROOT'])
sys.exit(result.returncode)
""")
        (commands / "scp").write_text("#!/usr/bin/env python3\n" + common + """
import shutil
assert len(sys.argv) == 3
target, destination = sys.argv[2].split(':', 1)
assert target == 'package-test', 'Unexpected SCP target'
host = pathlib.Path(os.environ['UFT4_PACKAGE_HOST_ROOT']).resolve()
assert host in pathlib.Path(destination).resolve().parents
shutil.copyfile(sys.argv[1], destination)
""")
        for command in commands.iterdir():
            command.chmod(0o755)
        self.env = dict(os.environ, PATH=str(commands) + os.pathsep + os.environ['PATH'],
                        UFT4_SSH_TARGET='package-test', UFT4_PACKAGE_HOST_ROOT=str(self.remote),
                        UFT4_PACKAGE_CALLS=str(self.calls))
        self.original = self.remote / 'www/observatories/thalean-graph/index.html'
        self.original.parent.mkdir(parents=True)
        self.original.write_bytes(b'ORIGINAL THALEAN PAGE\n')
        self.target = self.remote / 'www/observatories/uft4-omega/index.html'

    def run_deploy(self):
        result = subprocess.run(['bash', str(self.repo / DEPLOY)], env=self.env,
                                cwd=self.temp.name, capture_output=True, text=True, timeout=20)
        self.assertEqual(self.original.read_bytes(), b'ORIGINAL THALEAN PAGE\n')
        self.assertFalse(list(self.remote.glob('.uft4-omega-upload.*')))
        self.assertFalse(list(self.target.parent.glob('.uft4-omega-install.*')))
        return result

    def assert_local_rejection(self, message):
        result = self.run_deploy()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn(message, result.stderr)
        self.assertEqual(self.calls.read_text(), '', 'Local validation must precede SSH/SCP')
        self.assertFalse(self.target.exists())

    def test_exact_shipped_package_installs(self):
        result = self.run_deploy()
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual(self.target.read_bytes(), self.html)
        self.assertEqual(self.calls.read_text().splitlines(), ['ssh', 'scp', 'ssh'])
        self.assertFalse((self.remote / '.uft4-omega-backups').exists())

    def test_exact_shipped_package_is_idempotent(self):
        self.target.parent.mkdir()
        self.target.write_bytes(self.html)
        result = self.run_deploy()
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn('already installed', result.stdout)
        self.assertEqual(self.target.read_bytes(), self.html)
        self.assertEqual(self.calls.read_text().splitlines(), ['ssh'])

    def test_filename_bearing_manifest_rejected_before_remote_access(self):
        digest = hashlib.sha256(self.html).hexdigest()
        (self.repo / MANIFEST).write_text(digest + '  ' + str(HTML) + '\n')
        self.assert_local_rejection('Invalid release checksum.')

    def test_modified_html_rejected_before_remote_access(self):
        (self.repo / HTML).write_bytes(self.html + b'\n<!-- altered after review -->\n')
        self.assert_local_rejection('Local HTML differs from the reviewed')

    def test_incorrect_digest_rejected_before_remote_access(self):
        (self.repo / MANIFEST).write_text('0' * 64 + '\n')
        self.assert_local_rejection('Local HTML differs from the reviewed')

    def test_empty_manifest_rejected_before_remote_access(self):
        (self.repo / MANIFEST).write_bytes(b'')
        self.assert_local_rejection('Invalid release checksum.')


if __name__ == '__main__':
    unittest.main(verbosity=2)
