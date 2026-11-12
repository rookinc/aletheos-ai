#!/usr/bin/env python3
"""Run offline deployment checks with local SSH/SCP/HTTPS stand-ins."""
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import tarfile
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]
PACKAGE = Path("g9000-observatory-deployment")
APP = Path("public_html/observatories/g9000")


class DeploymentTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="g9000-package-test-")
        self.addCleanup(self.temp.cleanup)
        self.base = Path(self.temp.name)
        self.repo, self.remote, commands = self.base / "repo", self.base / "host", self.base / "bin"
        commands.mkdir()
        (self.remote / "www/observatories").mkdir(parents=True)
        for name in ("deploy.sh", "build-release.py"):
            destination = self.repo / PACKAGE / name
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(ROOT / PACKAGE / name, destination)
        shutil.copytree(ROOT / APP, self.repo / APP)
        self.calls = self.base / "calls.log"
        self.calls.write_text("")
        common = """import os, pathlib, shutil, subprocess, sys
with open(os.environ['G9000_TEST_CALLS'], 'a') as log:
    log.write(pathlib.Path(sys.argv[0]).name + '\\n')
host = pathlib.Path(os.environ['G9000_TEST_HOST'])
"""
        (commands / "ssh").write_text("#!/usr/bin/env python3\n" + common + """
assert sys.argv[1] == 'package-test'
assert len(sys.argv) == 3
import shlex
command = shlex.split(sys.argv[2])
assert command[:2] == ['python3', '-']
if os.environ.get('G9000_TEST_PRIVATE_UMASK'):
    os.umask(0o077)
code = sys.stdin.read().replace('home = pathlib.Path.home()', 'home = pathlib.Path(os.environ["G9000_TEST_HOST"])')
result = subprocess.run(command, input=code, universal_newlines=True)
sys.exit(result.returncode)
""")
        (commands / "scp").write_text("#!/usr/bin/env python3\n" + common + """
assert len(sys.argv) == 3
assert sys.argv[2].startswith('package-test:')
destination = pathlib.Path(sys.argv[2].split(':', 1)[1])
assert destination.name == 'release.tar'
assert destination.parent.parent == host
shutil.copyfile(sys.argv[1], str(destination))
if os.environ.get('G9000_TEST_CORRUPT'):
    with destination.open('ab') as file:
        file.write(b'corrupted upload')
""")
        (commands / "curl").write_text("#!/usr/bin/env python3\n" + common + """
assert sys.argv[-1].startswith('https://aletheos.ai/observatories/g9000/?release=')
if os.environ.get('G9000_TEST_HTTP_FAIL'):
    sys.exit(22)
output = pathlib.Path(sys.argv[sys.argv.index('--output') + 1])
if os.environ.get('G9000_TEST_HTTP_MISMATCH'):
    output.write_bytes(b'stale served page')
else:
    shutil.copyfile(str(host / 'www/observatories/g9000/index.html'), str(output))
""")
        for command in commands.iterdir():
            command.chmod(0o755)
        self.env = dict(os.environ, PATH=str(commands) + os.pathsep + os.environ["PATH"],
                        G9000_SSH_TARGET="package-test", G9000_TEST_HOST=str(self.remote),
                        G9000_TEST_CALLS=str(self.calls))
        self.target = self.remote / "www/observatories/g9000/index.html"

    def run_deploy(self, **options):
        env = dict(self.env, **options)
        return subprocess.run(["bash", str(self.repo / PACKAGE / "deploy.sh")], env=env,
                              stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)

    def assert_success(self, result):
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("Verified live:", result.stdout)

    def assert_cleaned(self):
        self.assertFalse((self.remote / ".g9000-observatory-install.lock").exists())
        self.assertEqual(list(self.remote.glob(".g9000-observatory-upload.*")), [])

    def test_first_install_and_repeat_are_verified_and_idempotent(self):
        self.assert_success(self.run_deploy())
        original, before = self.target.read_bytes(), self.target.stat().st_mtime_ns
        self.assertIn(b"<!-- G9000-OBSERVATORY-RELEASE ", original)
        self.assertIn(b"releases/", original)
        self.assert_success(self.run_deploy())
        self.assertEqual(self.target.read_bytes(), original)
        self.assertEqual(self.target.stat().st_mtime_ns, before)
        self.assertEqual(len(list(self.target.parent.joinpath("releases").iterdir())), 1)
        self.assertEqual(len(list(self.remote.joinpath(".g9000-observatory-receipts").glob("*.json"))), 1)
        self.assert_cleaned()

    def test_recognized_update_preserves_old_assets_and_private_backup(self):
        self.assert_success(self.run_deploy())
        previous = self.target.read_bytes()
        source = self.repo / APP / "index.html"
        source.write_bytes(source.read_bytes() + b"\n<!-- reviewed next release -->\n")
        self.assert_success(self.run_deploy())
        self.assertNotEqual(self.target.read_bytes(), previous)
        backups = list(self.remote.joinpath(".g9000-observatory-backups").glob("*.html"))
        self.assertEqual(len(backups), 1)
        self.assertEqual(backups[0].read_bytes(), previous)
        self.assertEqual(len(list(self.target.parent.joinpath("releases").iterdir())), 2)
        self.assert_cleaned()

    def test_unknown_existing_page_is_preserved(self):
        self.target.parent.mkdir()
        self.target.write_bytes(b"unrecognized existing G9000 page")
        result = self.run_deploy()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Unrecognized existing G9000 page", result.stderr)
        self.assertEqual(self.target.read_bytes(), b"unrecognized existing G9000 page")
        self.assertFalse(self.target.parent.joinpath("releases").exists())
        self.assert_cleaned()

    def test_corrupt_upload_cannot_publish(self):
        result = self.run_deploy(G9000_TEST_CORRUPT="1")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Uploaded archive hash mismatch", result.stderr)
        self.assertFalse(self.target.exists())
        self.assert_cleaned()

    def test_symlink_target_is_rejected_before_upload(self):
        elsewhere = self.remote / "elsewhere"
        elsewhere.mkdir()
        (elsewhere / "index.html").write_bytes(b"keep")
        self.target.parent.symlink_to(elsewhere, target_is_directory=True)
        result = self.run_deploy()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("target is unsafe", result.stderr)
        self.assertEqual((elsewhere / "index.html").read_bytes(), b"keep")
        self.assertNotIn("scp", self.calls.read_text())
        self.assert_cleaned()

    def test_symlink_index_is_rejected(self):
        self.target.parent.mkdir()
        original = self.remote / "keep.html"
        original.write_bytes(b"keep")
        self.target.symlink_to(original)
        result = self.run_deploy()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("index is unsafe", result.stderr)
        self.assertEqual(original.read_bytes(), b"keep")
        self.assert_cleaned()

    def test_failed_public_https_check_reports_installed_but_unverified(self):
        result = self.run_deploy(G9000_TEST_HTTP_FAIL="1")
        self.assertNotEqual(result.returncode, 0)
        self.assertTrue(self.target.is_file())
        self.assertIn("Release installed, but public HTTPS", result.stderr)
        self.assertNotIn("Verified live:", result.stdout)
        self.assert_cleaned()
        self.assert_success(self.run_deploy())

    def test_stale_public_https_index_is_detected(self):
        result = self.run_deploy(G9000_TEST_HTTP_MISMATCH="1")
        self.assertNotEqual(result.returncode, 0)
        self.assertTrue(self.target.is_file())
        self.assertIn("public HTTPS returned a different index", result.stderr)
        self.assertNotIn("Verified live:", result.stdout)
        self.assert_cleaned()

    def test_installation_lock_is_not_stolen(self):
        lock = self.remote / ".g9000-observatory-install.lock"
        lock.mkdir()
        result = self.run_deploy()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("holds the lock", result.stderr)
        self.assertTrue(lock.is_dir())
        self.assertFalse(self.target.exists())

    def test_immutable_asset_corruption_is_preserved_as_a_failure(self):
        self.assert_success(self.run_deploy())
        original = self.target.read_bytes()
        asset = next(self.target.parent.joinpath("releases").glob("*/observatory.js"))
        asset.write_bytes(b"damaged immutable asset")
        result = self.run_deploy()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Immutable release differs", result.stderr)
        self.assertEqual(self.target.read_bytes(), original)
        self.assertEqual(asset.read_bytes(), b"damaged immutable asset")
        self.assert_cleaned()

    def test_restrictive_server_umask_keeps_new_public_directories_readable(self):
        self.assert_success(self.run_deploy(G9000_TEST_PRIVATE_UMASK="1"))
        public = self.target.parent
        for path in [public, public / 'releases', *public.joinpath('releases').rglob('*')]:
            if path.is_dir():
                self.assertEqual(path.stat().st_mode & 0o777, 0o755)
        self.assertEqual(self.target.stat().st_mode & 0o777, 0o644)
        for name in ('.g9000-observatory-receipts',):
            self.assertEqual(self.remote.joinpath(name).stat().st_mode & 0o777, 0o700)
        self.assert_cleaned()

    def test_shipped_source_build_is_deterministic_and_keeps_hash_navigation(self):
        results = []
        for name in ("build-a", "build-b"):
            result = subprocess.run(["python3", str(self.repo / PACKAGE / "build-release.py"),
                                     "--output", str(self.base / name)], stdout=subprocess.PIPE,
                                    stderr=subprocess.PIPE, universal_newlines=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            results.append(json.loads(result.stdout))
        self.assertEqual(results[0]["archive_sha256"], results[1]["archive_sha256"])
        with tarfile.open(results[0]["archive"], "r:") as tar:
            entry = tar.extractfile("index.html").read().decode()
            self.assertNotIn("<base", entry.lower())
            self.assertIn('src="releases/' + results[0]["release_id"] + '/observatory.js"', entry)
            manifest = json.load(tar.extractfile("manifest.json"))
            self.assertEqual(set(tar.getnames()), {row["path"] for row in manifest["files"]} | {"manifest.json"})
            for row in manifest["files"]:
                data = tar.extractfile(row["path"]).read()
                self.assertEqual(len(data), row["size"])
                self.assertEqual(hashlib.sha256(data).hexdigest(), row["sha256"])


if __name__ == "__main__":
    unittest.main(verbosity=2)
