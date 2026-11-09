import io,json,tarfile,tempfile,unittest
from pathlib import Path
import remote_install as I
D=Path(__file__).resolve().parent
class Tests(unittest.TestCase):
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();self.base=Path(self.tmp.name);self.root=self.base/'www';self.obs=self.root/'observatories';self.obs.mkdir(parents=True)
  (self.obs/'existing').mkdir();(self.obs/'existing/index.html').write_text('Keep me')
  self.archive=self.base/'release.tar.gz';I.pack(D,self.archive)
  self.php=self.base/'php';self.php.write_text('#!/bin/sh\nexit 0\n');self.php.chmod(0o755)
 def tearDown(self): self.tmp.cleanup()
 def install(self,**kw):
  with self.archive.open('rb') as f:return I.install_archive(f,root=self.root,php_binary=str(self.php),**kw)
 def test_install_retry_and_scope(self):
  self.assertEqual(self.install()['changed'][-1],'observatories/index.php');self.assertEqual(self.install()['status'],'unchanged');self.assertEqual((self.obs/'existing/index.html').read_text(),'Keep me')
 def test_preserves_known_catalog_backup(self):
  old=b'Known previous catalog';original=I.BASE_INDEX_HASH;I.BASE_INDEX_HASH=I.digest(old)
  try:
   (self.obs/'index.php').write_bytes(old);result=self.install();self.assertEqual((Path(result['backup_directory'])/'observatories/index.php').read_bytes(),old)
  finally:I.BASE_INDEX_HASH=original
 def test_upgrade_previous_release(self):
  originals={name:('Previous release: '+name).encode() for name in I.REQUIRED};old=I.PREVIOUS_HASHES
  I.PREVIOUS_HASHES={name:I.digest(data) for name,data in originals.items()}
  try:
   for name,data in originals.items():
    path=self.root/name;path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(data)
   result=self.install();self.assertEqual(len(result['changed']),3)
   for name,data in originals.items():self.assertEqual((Path(result['backup_directory'])/name).read_bytes(),data)
  finally:I.PREVIOUS_HASHES=old
 def test_changed_catalog_blocks_all_writes(self):
  (self.obs/'index.php').write_text('Later catalog edits')
  with self.assertRaisesRegex(ValueError,'unreviewed'):self.install()
  self.assertFalse((self.obs/'xyz-flower').exists())
 def test_other_destination_blocks(self):
  (self.obs/'xyz-flower').mkdir();(self.obs/'xyz-flower/index.html').write_text('Other work')
  with self.assertRaisesRegex(ValueError,'unreviewed'):self.install()
 def test_rollback_after_each_file(self):
  for step in [1,2,3]:
   with self.assertRaisesRegex(RuntimeError,'Injected'):self.install(fail_after=step)
   self.assertFalse((self.obs/'xyz-flower').exists());self.assertFalse((self.obs/'index.php').exists())
 def test_symlink_refused(self):
  outside=self.base/'outside';outside.mkdir();(self.obs/'xyz-flower').symlink_to(outside,target_is_directory=True)
  with self.assertRaisesRegex(ValueError,'Symlink'):self.install()
  self.assertEqual(list(outside.iterdir()),[])
 def test_php_lint_blocks(self):
  self.php.write_text('#!/bin/sh\nexit 1\n')
  with self.assertRaisesRegex(ValueError,'PHP syntax'):self.install()
  self.assertFalse((self.obs/'xyz-flower').exists())
 def test_out_of_scope_rejected(self):
  self.assertFalse(I.allowed_path('index.php'));self.assertFalse(I.allowed_path('observatories/xyz-flower/../../index.php'));self.assertFalse(I.allowed_path('observatories/water/index.html'))
 def test_tampered_bytes_rejected(self):
  with self.archive.open('rb') as f:m,c=I.read_archive(f)
  with tarfile.open(self.archive,'w') as tar:
   for name,data in [('manifest.json',json.dumps(m).encode())]+[('site/'+n,b'bad' if n.endswith('index.html') else d) for n,d in c.items()]:
    info=tarfile.TarInfo(name);info.size=len(data);tar.addfile(info,io.BytesIO(data))
  with self.assertRaisesRegex(ValueError,'differ'):self.install()
  self.assertFalse((self.obs/'xyz-flower').exists())
if __name__=='__main__':unittest.main(verbosity=2)
