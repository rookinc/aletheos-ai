"""Deterministic production allowlist and deployment archive (no legacy public_html)."""
import pathlib,hashlib,json,zipfile,shutil,subprocess
root=pathlib.Path(__file__).resolve().parents[1];dest=root.parent/'dist-native-terrain';site=dest/'site'
if dest.exists():shutil.rmtree(dest)
site.mkdir(parents=True)
files=[root/n for n in ['index.html','style.css','app.mjs','kernel.mjs']]+sorted((root/'data').glob('*.json'))
for p in files:
 target=site/p.relative_to(root);target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(p,target)
commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip()
(site/'release-info.json').write_text(json.dumps({'schema':'aletheos.release-info.v1','source_commit':commit,'branch':'feature/aletheos-sim-002-native-terrain','version':'Native Terrain v3.0 RC','release_held':True,'blocked_gates':['manuscript','browser (real mobile / additional browsers)','deployment']},indent=2)+'\n')
manifest={str(p.relative_to(site)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(site.rglob('*')) if p.is_file()}
(site/'manifest.json').write_text(json.dumps({'schema':'aletheos.release-manifest.v1','files':manifest},indent=2)+'\n')
for n in ['RELEASE.md','README.md']:shutil.copyfile(root/n,dest/n)
shutil.copytree(root/'deployment',dest/'deployment')
archive=root.parent/'Aletheos-Native-Terrain-v3.0-RC.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(dest.rglob('*')):
  if p.is_file():
   info=zipfile.ZipInfo(str(p.relative_to(dest)),date_time=(2026,1,1,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16;z.writestr(info,p.read_bytes())
(archive.with_suffix('.zip.sha256')).write_text(hashlib.sha256(archive.read_bytes()).hexdigest()+'  '+archive.name+'\n')
print(json.dumps({'archive':str(archive),'production_files':len(manifest),'sha256':hashlib.sha256(archive.read_bytes()).hexdigest(),'disposition':'staging-ready; release gates block cutover'}))
