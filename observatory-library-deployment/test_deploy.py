#!/usr/bin/env python3
"""Filesystem transaction tests. PHP lint is stubbed; real lint runs on Bluehost."""
import io
import json
from pathlib import Path
import tarfile
import tempfile
import unittest
import remote_install as installer


class DeploymentTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.base = Path(self.tmp.name)
        self.root = self.base / 'www'
        (self.root / 'observatories' / 'existing').mkdir(parents=True)
        (self.root / 'observatories' / 'existing' / 'index.html').write_text('Untouched observatory')
        self.release = self.base / 'release'
        self.files = {'observatories/index.php': b'<?php echo "Library"; ?>',
                      'observatories/jupiter/index.html': b'<title>Jupiter</title>',
                      'observatories/sonoluminescence/index.html': b'<title>Sonoluminescence</title>'}
        for name, data in self.files.items():
            path = self.release / 'site' / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(data)
        self.manifest = {'release': installer.RELEASE, 'files': {name: {'sha256': installer.digest(data), 'size': len(data)} for name, data in self.files.items()}}
        (self.release / 'manifest.json').write_text(json.dumps(self.manifest))
        self.archive = self.base / 'payload.tar.gz'
        installer.pack(self.release, self.archive)
        self.php = self.base / 'php'
        self.php.write_text('#!/bin/sh\nexit 0\n')
        self.php.chmod(0o755)

    def tearDown(self):
        self.tmp.cleanup()

    def install(self, **kw):
        with self.archive.open('rb') as stream:
            return installer.install_archive(stream, root=self.root, php_binary=str(self.php), **kw)

    def assert_untouched(self):
        self.assertEqual((self.root / 'observatories/existing/index.html').read_text(), 'Untouched observatory')

    def test_install_and_idempotent_retry(self):
        result = self.install()
        self.assertEqual(result['changed'][-1], 'observatories/index.php')
        for name, data in self.files.items(): self.assertEqual((self.root / name).read_bytes(), data)
        self.assertEqual(self.install()['status'], 'unchanged')
        self.assert_untouched()

    def test_backup_previous_targets_and_static_index(self):
        (self.root / 'observatories/index.html').write_bytes(b'Old static directory')
        (self.root / 'observatories/index.php').write_bytes(b'Old PHP directory')
        (self.root / 'observatories/jupiter').mkdir()
        (self.root / 'observatories/jupiter/index.html').write_bytes(b'Old Jupiter')
        result = self.install()
        backup = Path(result['backup_directory'])
        self.assertEqual((backup / 'observatories/index.html').read_bytes(), b'Old static directory')
        self.assertEqual((backup / 'observatories/index.php').read_bytes(), b'Old PHP directory')
        self.assertEqual((backup / 'observatories/jupiter/index.html').read_bytes(), b'Old Jupiter')
        self.assertFalse((self.root / 'observatories/index.html').exists())
        self.assert_untouched()

    def test_rollback_before_index(self):
        (self.root / 'observatories/jupiter').mkdir()
        (self.root / 'observatories/jupiter/index.html').write_bytes(b'Old Jupiter')
        with self.assertRaisesRegex(RuntimeError, 'Injected'):
            self.install(fail_after=1)
        self.assertEqual((self.root / 'observatories/jupiter/index.html').read_bytes(), b'Old Jupiter')
        self.assertFalse((self.root / 'observatories/sonoluminescence/index.html').exists())
        self.assertFalse((self.root / 'observatories/index.php').exists())
        self.assert_untouched()

    def test_rollback_restores_index_shadow(self):
        (self.root / 'observatories/index.html').write_bytes(b'Old static directory')
        with self.assertRaisesRegex(RuntimeError, 'Injected'):
            self.install(fail_after=3)
        self.assertEqual((self.root / 'observatories/index.html').read_bytes(), b'Old static directory')
        for name in self.files: self.assertFalse((self.root / name).exists())
        self.assert_untouched()

    def test_symlink_destination_is_refused(self):
        outside = self.base / 'outside'
        outside.mkdir()
        (self.root / 'observatories/jupiter').symlink_to(outside, target_is_directory=True)
        with self.assertRaisesRegex(ValueError, 'Symlink'):
            self.install()
        self.assertEqual(list(outside.iterdir()), [])
        self.assert_untouched()

    def test_symlink_entry_is_refused(self):
        (self.root / 'observatories/index.php').symlink_to(self.base / 'missing')
        with self.assertRaisesRegex(ValueError, 'Symlink'):
            self.install()
        self.assert_untouched()

    def test_local_checksum_mismatch_is_refused(self):
        (self.release / 'site/observatories/jupiter/index.html').write_text('tampered')
        with self.assertRaisesRegex(ValueError, 'differs'):
            installer.pack(self.release, self.base / 'bad.tar')

    def test_remote_checksum_mismatch_is_refused(self):
        with tarfile.open(self.archive, 'w') as archive:
            for name, data in [('manifest.json', json.dumps(self.manifest).encode())]+[('site/'+n, b'bad' if 'jupiter' in n else d) for n, d in self.files.items()]:
                member = tarfile.TarInfo(name); member.size = len(data)
                archive.addfile(member, io.BytesIO(data))
        with self.assertRaisesRegex(ValueError, 'differ'):
            self.install()
        for name in self.files: self.assertFalse((self.root / name).exists())

    def test_out_of_scope_manifest_is_refused(self):
        self.manifest['files']['index.php'] = {'sha256': '0'*64, 'size': 1}
        with self.assertRaisesRegex(ValueError, 'Out-of-scope'):
            installer.validate_manifest(self.manifest)

    def test_php_lint_failure_prevents_writes(self):
        self.php.write_text('#!/bin/sh\necho syntax failure\nexit 1\n')
        with self.assertRaisesRegex(ValueError, 'PHP syntax'):
            self.install()
        for name in self.files: self.assertFalse((self.root / name).exists())
        self.assert_untouched()

    def test_incompatible_directory_index_is_refused(self):
        (self.root / '.htaccess').write_text('DirectoryIndex home.php\n')
        with self.assertRaisesRegex(ValueError, 'DirectoryIndex'):
            self.install()
        self.assert_untouched()

    def test_symlink_archive_member_is_refused(self):
        with tarfile.open(self.archive, 'w') as archive:
            member = tarfile.TarInfo('site/observatories/jupiter/index.html'); member.type = tarfile.SYMTYPE; member.linkname = '/tmp/elsewhere'
            archive.addfile(member)
        with self.assertRaisesRegex(ValueError, 'non-regular'):
            self.install()


if __name__ == '__main__':
    unittest.main(verbosity=2)
