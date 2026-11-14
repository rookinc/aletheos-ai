#!/usr/bin/env python3
"""Build the reviewed v1.3 bundle and guarded Termux package; never deploy."""
from pathlib import Path
import hashlib,json,re,subprocess,zipfile
ROOT=Path(__file__).resolve().parents[1];RELEASE=ROOT.parent/'automaton-v13';OUT=ROOT/'provenance/automaton-ui-001'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
audit=json.loads((OUT/'audit.json').read_text());assert audit['verdict']=='PASS_LOCAL_VALIDATION_READY_FOR_GUARDED_TERMUX_INSTALL'
for name,expected in audit['ui_source_sha256'].items():assert sha(ROOT/name)==expected, 'Stale browser receipt: '+name
subprocess.run(['python3','build.py'],cwd=ROOT,check=True)
html=(ROOT/'dist/index.html').read_bytes();digest=hashlib.sha256(html).hexdigest()
(RELEASE/'index.html').write_bytes(html);(ROOT.parents[1]/'public_html/observatories/thalean-orthogonal/index.html').write_bytes(html)
for name in ['server.sh','deploy.sh']:
    p=RELEASE/name;s,n=re.subn(r'^expected=[0-9a-f]{64}$','expected='+digest,p.read_text(),flags=re.M);assert n==1;p.write_text(s)
source=[*sorted((ROOT/'src').glob('*')),*sorted((ROOT/'scripts').glob('*')),*sorted(ROOT.glob('test*.cjs')),ROOT/'build.py']
release={'release':'G9000 Automaton Observatory v1.3','repository':'rookinc/aletheos-ai','branch':'thalean-orthogonal-encounter-v12','base_commit':audit['base_commit'],'html_sha256':digest,'html_bytes':len(html),'previous_html_sha256':audit['previous_production_html_sha256'],'source_files_sha256':{p.relative_to(ROOT).as_posix():sha(p) for p in source if p.is_file()},'production_deployed':False,'deployment':'Owner Termux using existing gurtiamy SSH alias; exact previous-hash guard, atomic installation and retained backup.','rollback':'bash deploy.sh rollback restores v1.2 exactly.'}
(RELEASE/'release.json').write_text(json.dumps(release,indent=2)+'\n')
names=['README.md','TERMUX.md','index.html','server.sh','deploy.sh','test-deploy.py','release.json']
(RELEASE/'SHA256SUMS').write_text(''.join(sha(RELEASE/n)+'  '+n+'\n' for n in names))
subprocess.run(['python3',str(RELEASE/'test-deploy.py'),'--previous',str(ROOT.parent/'encounter-v12/index.html'),'--output',str(OUT/'deployment-checks.json')],check=True)
subprocess.run(['sha256sum','-c','SHA256SUMS'],cwd=RELEASE,check=True)
archive=ROOT.parent/'g9000-automaton-v13.zip'
with zipfile.ZipFile(archive,'w',compression=zipfile.ZIP_DEFLATED) as z:
    for name in [*names,'SHA256SUMS']:
        info=zipfile.ZipInfo(name,date_time=(2026,11,14,0,0,0));info.external_attr=(0o100755 if name.endswith('.sh') else 0o100644)<<16;info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,(RELEASE/name).read_bytes())
archive.with_suffix('.zip.sha256').write_text(sha(archive)+'  '+archive.name+'\n')
print(json.dumps({'prepared':True,'html_sha256':digest,'archive_sha256':sha(archive),'deployed':False}))
