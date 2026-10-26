"""Real temporary-file deployment/rollback tests; HTTP/PHP are simulated explicitly."""
import importlib.util
import json
import os
from pathlib import Path
import shutil
import stat
import subprocess
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('cori_deploy', ROOT / 'scripts/deploy-cori-public.py')
deploy = importlib.util.module_from_spec(spec)
spec.loader.exec_module(deploy)


class DeploymentTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        base = Path(self.temp.name)
        self.live, self.stage, self.run = [base / name for name in ('live', 'stage', 'backup')]
        for path in (self.live, self.stage, self.run):
            path.mkdir()
        self.original = {}
        for relative in deploy.HASHES:
            target = self.stage / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(ROOT / 'public_html' / relative, target)
            if relative not in {'philosophy.php', 'philosophy/consciousness-and-relation.php', 'philosophy/let-my-trace-not-be-cruelty.php', 'research/memory-and-possibility.php'}:
                target = self.live / relative
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(('ORIGINAL ' + relative).encode())
                target.chmod(0o640)
                os.utime(target, ns=(1700000000000000000, 1700000000000000000))
                self.original[relative] = target.read_bytes()
        self.receipt = deploy.prepare_receipt(self.live, self.run)

    def assert_restored(self):
        for relative in deploy.HASHES:
            target = self.live / relative
            if relative in self.original:
                self.assertEqual(target.read_bytes(), self.original[relative])
                self.assertEqual(stat.S_IMODE(target.stat().st_mode), 0o640)
                self.assertEqual(target.stat().st_mtime_ns, 1700000000000000000)
            else:
                self.assertFalse(target.exists())
        self.assertFalse((self.live / 'philosophy').exists())
        self.assertEqual(json.loads(self.receipt.read_text())['status'], 'rolled_back')

    def test_apply_and_restore_actual_bytes_and_metadata(self):
        deploy.activate(self.live, self.stage, self.receipt, verifier=lambda: None)
        for relative, expected in deploy.HASHES.items():
            self.assertEqual(deploy.digest(self.live / relative), expected)
        deploy.rollback(self.receipt)
        self.assert_restored()

    def test_failure_after_atomic_replace_before_receipt_update_recovers(self):
        original_copy = deploy.atomic_copy
        count = 0
        def interrupted_copy(*args, **kwargs):
            nonlocal count
            original_copy(*args, **kwargs)
            count += 1
            if count == 3:
                raise OSError('Simulated disk interruption after rename')
        with patch.object(deploy, 'atomic_copy', side_effect=interrupted_copy):
            with self.assertRaisesRegex(OSError, 'Simulated disk'):
                deploy.activate(self.live, self.stage, self.receipt, verifier=lambda: None)
        self.assert_restored()

    def test_failed_served_checks_restore_everything(self):
        def failed_http():
            raise RuntimeError('Simulated HTTP failure')
        with self.assertRaisesRegex(RuntimeError, 'Simulated HTTP'):
            deploy.activate(self.live, self.stage, self.receipt, verifier=failed_http)
        self.assert_restored()

    def test_rollback_preserves_subsequent_changes(self):
        deploy.activate(self.live, self.stage, self.receipt, verifier=lambda: None)
        (self.live / 'index.php').write_text('Newer independent edit')
        with self.assertRaisesRegex(RuntimeError, 'subsequent changes'):
            deploy.rollback(self.receipt)
        self.assertEqual((self.live / 'index.php').read_text(), 'Newer independent edit')
        self.assertEqual(deploy.digest(self.live / 'about_cori.php'), deploy.HASHES['about_cori.php'])

    def test_symlink_parent_is_rejected(self):
        (self.live / 'philosophy').symlink_to(self.stage, target_is_directory=True)
        with self.assertRaisesRegex(RuntimeError, 'symlink'):
            deploy.safe_path(self.live, 'philosophy/consciousness-and-relation.php')

    def test_domain_failure_removes_transient_marker(self):
        with patch.object(deploy, 'fetch', side_effect=RuntimeError('Simulated network failure')):
            with self.assertRaisesRegex(RuntimeError, 'Simulated network'):
                deploy.verify_domain(self.live)
        self.assertEqual(list(self.live.glob('cori-domain-check-*')), [])

    def test_staged_hash_and_render_checks_with_simulated_php(self):
        for relative in deploy.DEPENDENCIES:
            (self.live / relative).write_text('<?php ?>')
        fresh = Path(self.temp.name) / 'php-stage'
        fresh.mkdir()
        calls = []
        def simulated_php(args, **kwargs):
            calls.append(args)
            if '-l' in args:
                return subprocess.CompletedProcess(args, 0, b'No syntax errors detected', b'')
            relative = Path(args[-1]).relative_to(fresh).as_posix()
            title, heading = deploy.PAGES[relative]
            output = ('<title>' + title + '</title><h1>' + heading + '</h1>'
                      '<a href="/philosophy.php">Philosophy</a>'
                      'Center of Recursive Inquiry — a Rook Services Inc. initiative.').encode()
            return subprocess.CompletedProcess(args, 0, output, b'')
        with patch.object(deploy, 'discover_php', return_value='simulated-php'), patch.object(deploy.subprocess, 'run', side_effect=simulated_php):
            deploy.stage_and_check(ROOT / 'public_html', self.live, fresh)
        self.assertEqual(len(calls), 24)
        for relative, expected in deploy.HASHES.items():
            self.assertEqual(deploy.digest(fresh / relative), expected)


if __name__ == '__main__':
    unittest.main()
