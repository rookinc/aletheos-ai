#!/usr/bin/env python3
"""Exercise the actual server installer using isolated paths, without SSH."""
from pathlib import Path
import hashlib,json,subprocess,tempfile
from html.parser import HTMLParser

R=Path(__file__).resolve().parents[1]
page=(R/'index.html').read_bytes();expected=json.loads((R/'release.json').read_text())['index_sha256'];checks=[]
def ck(name,value):
 checks.append({'name':name,'passed':bool(value)})
 if not value:raise AssertionError(name)
def run(op,target,backups,payload=b''):
 return subprocess.run(['bash',str(R/'server.sh'),op,str(target),str(backups)],input=payload,capture_output=True)
def fixture(root,name):
 p=root/name/'www/observatories';p.mkdir(parents=True);return p/'thalean-observer',root/name/'backups'
with tempfile.TemporaryDirectory(prefix='observer-installer-test-') as tmp:
 root=Path(tmp);target,backups=fixture(root,'normal')
 p=run('install',target,backups,page);ck('First installation',p.returncode==0 and (target/'index.html').read_bytes()==page)
 ck('Installed permissions', (target/'index.html').stat().st_mode&0o777==0o644)
 ck('Private absence record',len(list(backups.glob('before-*.absent')))==1)
 ck('Idempotent installation',run('install',target,backups,page).returncode==0)
 ck('Read-only server verification',run('verify',target,backups).returncode==0)
 ck('Rollback restores absence',run('rollback',target,backups).returncode==0 and not (target/'index.html').exists())
 ck('Rollback retains installed release',next(backups.glob('rolled-back-*.html')).read_bytes()==page)
 ck('Idempotent rollback',run('rollback',target,backups).returncode==0)
 ck('Reinstall after rollback',run('install',target,backups,page).returncode==0)
 (target/'index.html').write_text('unknown change')
 ck('Changed page not overwritten',run('install',target,backups,page).returncode!=0 and (target/'index.html').read_text()=='unknown change')
 ck('Changed page not rolled back',run('rollback',target,backups).returncode!=0)
 target,backups=fixture(root,'corrupt')
 ck('Corrupt upload rejected before publication',run('install',target,backups,b'corrupt').returncode!=0 and not target.exists())
 target,backups=fixture(root,'symlink');other=root/'other';other.mkdir();target.symlink_to(other,target_is_directory=True)
 ck('Target symlink rejected',run('install',target,backups,page).returncode!=0 and not (other/'index.html').exists())
 target,backups=fixture(root,'content');target.mkdir();(target/'existing.txt').write_text('retain')
 ck('Unrecognized target contents retained',run('install',target,backups,page).returncode!=0 and (target/'existing.txt').read_text()=='retain')
 target,backups=fixture(root,'lock');(target.parent/'.thalean-observer-deploy-lock').mkdir()
 ck('Existing lock retained',run('install',target,backups,page).returncode!=0 and (target.parent/'.thalean-observer-deploy-lock').exists())
 target,backups=fixture(root,'index-link');target.mkdir();foreign=root/'foreign';foreign.write_text('retain');(target/'index.html').symlink_to(foreign)
 ck('Index symlink rejected',run('install',target,backups,page).returncode!=0 and foreign.read_text()=='retain')

class Inspector(HTMLParser):
 def __init__(self):super().__init__();self.external=[];self.in_data=False;self.payload=[]
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='script' and 'src' in a:self.external.append(a['src'])
  if t=='link' and a.get('rel')=='stylesheet':self.external.append(a.get('href'))
  if t=='script' and a.get('id')=='native-dataset':self.in_data=True
 def handle_endtag(self,t):
  if t=='script':self.in_data=False
 def handle_data(self,s):
  if self.in_data:self.payload.append(s)
p=Inspector();p.feed(page.decode());d=json.loads(''.join(p.payload))
ck('HTML hash matches pinned release',hashlib.sha256(page).hexdigest()==expected)
ck('No separately loaded scripts or styles',not p.external)
ck('Complete exact data retained',len(d['g60']['references'])==15 and len(d['g60']['automorphisms'])==480 and d['g9000']['horizon']==3)
print(json.dumps({'status':'PASS','check_count':len(checks),'checks':checks},indent=2))
