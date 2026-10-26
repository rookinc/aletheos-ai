"""Exercise additive activation/rollback using isolated temporary web roots."""
import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

MODULE = Path(__file__).resolve().parents[1] / 'deployment' / 'install-living.py'
SPEC = importlib.util.spec_from_file_location('install_living', MODULE)
INSTALL = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(INSTALL)


class AdditiveDeploymentTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        root = Path(self.temp.name)
        self.source = root / 'source'
        self.live = root / 'live'
        self.backups = root / 'backups'
        self.source.mkdir()
        self.live.mkdir()
        (self.live / 'index.html').write_text('existing observatory')
        (self.live / 'data').mkdir()
        (self.live / 'data' / 'g60.json').write_text('existing graph bytes')
        (self.source / 'living.html').write_text('<!doctype html><html><head><title>Living</title></head><body></body></html>')
        (self.source / 'kernel.mjs').write_text('export const version = 3.1;')
        self.manifest()

    def manifest(self):
        files = {str(path.relative_to(self.source)): hashlib.sha256(path.read_bytes()).hexdigest()
                 for path in self.source.rglob('*') if path.is_file() and path.name != 'manifest.json'}
        (self.source / 'manifest.json').write_text(json.dumps({'files': files}))

    def assert_observatory_unchanged(self):
        self.assertEqual((self.live / 'index.html').read_text(), 'existing observatory')
        self.assertEqual((self.live / 'data' / 'g60.json').read_text(), 'existing graph bytes')

    def test_stage_reuses_verified_release_and_does_not_activate(self):
        release = INSTALL.stage(self.source, self.live)
        self.assertEqual(INSTALL.stage(self.source, self.live), release)
        self.assertFalse((self.live / 'living.html').exists())
        self.assert_observatory_unchanged()

    def test_activate_then_rollback_first_entry(self):
        release = INSTALL.stage(self.source, self.live)
        result = INSTALL.activate(release, self.live, self.backups)
        self.assertIn('<base href="./' + release.name + '/">', (self.live / 'living.html').read_text())
        INSTALL.rollback(Path(result['activation_receipt']), self.live)
        self.assertFalse((self.live / 'living.html').exists())
        self.assertTrue(release.exists())
        self.assert_observatory_unchanged()

    def test_existing_entry_restored_byte_for_byte(self):
        prior = b'<html>prior living entry\x00</html>'
        (self.live / 'living.html').write_bytes(prior)
        release = INSTALL.stage(self.source, self.live)
        result = INSTALL.activate(release, self.live, self.backups)
        INSTALL.rollback(Path(result['activation_receipt']), self.live)
        self.assertEqual((self.live / 'living.html').read_bytes(), prior)
        self.assert_observatory_unchanged()

    def test_tampered_sources_fail_before_activation(self):
        (self.source / 'kernel.mjs').write_text('changed after manifest')
        with self.assertRaisesRegex(ValueError, 'hash mismatch'):
            INSTALL.stage(self.source, self.live)
        self.assertFalse((self.live / 'living.html').exists())
        self.assert_observatory_unchanged()

    def test_rollback_refuses_later_entry_changes(self):
        release = INSTALL.stage(self.source, self.live)
        result = INSTALL.activate(release, self.live, self.backups)
        (self.live / 'living.html').write_text('later work')
        with self.assertRaisesRegex(ValueError, 'changed since'):
            INSTALL.rollback(Path(result['activation_receipt']), self.live)
        self.assertEqual((self.live / 'living.html').read_text(), 'later work')
        self.assert_observatory_unchanged()

    def test_unsafe_manifest_path_rejected(self):
        (self.source / 'manifest.json').write_text(json.dumps({'files': {'../secret': 'invalid'}}))
        with self.assertRaises(ValueError):
            INSTALL.stage(self.source, self.live)
        self.assert_observatory_unchanged()


if __name__ == '__main__':
    unittest.main()
