#!/usr/bin/env python3
"""Exercise PHP catalog discovery without changing a real document root."""
import argparse,json,shutil,subprocess,tempfile
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--php',default='php');p.add_argument('--render');args=p.parse_args()
source=Path(__file__).parent/'site/observatories/index.php'
if not source.is_file():source=Path(__file__).parent.parent/'public_html/observatories/index.php'
subprocess.run([args.php,'-l',str(source.resolve())],check=True)
with tempfile.TemporaryDirectory() as tmp:
 root=Path(tmp);obs=root/'observatories';obs.mkdir();shutil.copy2(source,obs/'index.php')
 def render():return subprocess.check_output([args.php,str(obs/'index.php')],text=True)
 html=render();assert 'library is being prepared' in html;assert 'href="/observatories/jupiter/"' not in html
 slugs=['jupiter','sonoluminescence','thalean-orthogonal','thalean-graph-explorer','thalean-graph','b32k','water','uft4-omega','new-experiment']
 for slug in slugs:
  (obs/slug).mkdir();(obs/slug/'index.html').write_text('<title>Fixture</title>')
 (obs/'not-published').mkdir();(obs/'.private').mkdir();(obs/'.private/index.html').write_text('private')
 (obs/'symlink-dir').symlink_to(obs/'jupiter',target_is_directory=True)
 (obs/'symlink-file').mkdir();(obs/'symlink-file/index.html').symlink_to(obs/'jupiter/index.html')
 for rel in ['labs/p900_observatory/lab.html','labs/informative_action/index.php','labs/g900_observatory/lab.html']:
  f=root/rel;f.parent.mkdir(parents=True,exist_ok=True);f.write_text('<title>Fixture lab</title>')
 html=render();assert html.count('<article class="card"')==12
 for slug in slugs:assert 'href="/observatories/'+slug+'/"' in html
 for slug in ['not-published','.private','symlink-dir','symlink-file']:assert 'href="/observatories/'+slug+'/' not in html
 assert 'UFT4 Omega — Legacy' in html and 'aletheos-observatory-library-001' in html
 assert '<?php' not in html
 if args.render:Path(args.render).write_text(html)
report={'all_passed':True,'checks':['PHP syntax','empty state','known entries require files','new directories are discovered','unpublished and hidden directories excluded','symlink directories and entries excluded','related lab entry checks','legacy label','no raw PHP in rendered HTML'],'fixture_entries':12}
(Path(__file__).parent/'catalog_validation.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report))
