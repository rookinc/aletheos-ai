#!/usr/bin/env python3
"""Validate v1.3 source and source-pinned browser evidence; never deploy."""
from pathlib import Path
import hashlib,json,subprocess
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'provenance/automaton-ui-001'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
commands=[['node','test.cjs'],['node','test-inverse.cjs'],['node','test-paired-history.cjs'],['node','test-paired-history-panel.cjs'],['node','test-automaton.cjs'],['node','test-encounter-app.cjs'],['node','test-encounter-replay.cjs'],['node','scripts/replay-automaton.cjs','provenance/automaton-ui-001/browser-replay.json'],['python3','scripts/verify-automaton-evolution.py']]
receipts=[]
for i,command in enumerate(commands):
    r=subprocess.run(command,cwd=ROOT,capture_output=True,text=True,timeout=600);name=f'check-{i+1:02}.txt';(OUT/name).write_text(r.stdout+r.stderr);receipts.append({'command':command,'exit':r.returncode,'log':name});print(r.returncode,' '.join(command),flush=True)
    if r.returncode:raise RuntimeError(name)
baseline=json.loads((ROOT/'provenance/encounter-001/orthogonal_observatory_source_recovery_001.json').read_text())
for name in ['native-data.json','native-model.js','volume-camera.js','cycle-clock.js','paired-history.js','paired-history-data.json','inverse-volume.js']:
    assert sha(ROOT/'src'/name)==baseline['input_hashes']['src/'+name]
browser=json.loads((OUT/'browser-checks.json').read_text());assert browser['pass'] and not browser['applicationErrors']
for name,expected in browser['ui_source_sha256'].items():assert sha(ROOT/name)==expected, 'Stale browser receipt: '+name
report={'audit':'G9000_AUTOMATON_OBSERVATORY_UI_001','status':'Certified derived / Experimental (declared separately)','verdict':'PASS_LOCAL_VALIDATION_READY_FOR_GUARDED_TERMUX_INSTALL',
 'producer':'python3 scripts/check-automaton-release.py','base_commit':'94cecc53ddbb45ef3c697be20184d9bdec5d3971','previous_production_html_sha256':'29ee7dc62e1bab177c4e2048b29868ae54831519e5764545ba3449012063a7d1','previous_production_verification':'User-provided Termux SSH/public LIVE VERIFIED output in this conversation.',
 'native_result':'Two independent native F automata on a static shared registered graph; exact state, adjacency and co-location inspection. No admitted native coupling or field backreaction.',
 'experimental_result':'Isolated source008 joint-configuration field. 25 declared global local terms discover the certified31-state component; analytic field-norm evolution in normalized time is checked against an independent matrix exponential.',
 'source':json.loads((ROOT/'src/automaton-joint-data.json').read_text())['provenance'],
 'preserved_native_source_hashes':{n:baseline['input_hashes']['src/'+n] for n in ['native-data.json','native-model.js','paired-history.js','paired-history-data.json','cycle-clock.js','volume-camera.js','inverse-volume.js']},
 'ui_source_sha256':browser['ui_source_sha256'],'commands':receipts,'model_checks':json.loads((OUT/'model-checks.json').read_text()),'application_checks':json.loads((OUT/'app-regression.json').read_text()),'evolution_oracle':json.loads((OUT/'evolution-oracle.json').read_text()),'browser_checks':browser['checks'],
 'deployment_validation':'prepare-automaton-release.py runs the real guarded server/wrapper through17 isolated installer/rollback checks; see deployment-checks.json.',
 'failures':[],'production_deployed':False,'boundaries':['Point-supported preparations, not a certified placement law for extended G9000 bodies.','Experimental b-registration is separate from native observatory a-registration.','No native interaction, memory theorem, physical time or detector probability is inferred.','Mobile QA uses360x740 and390x844 iframe viewports in Chrome; physical Android validation remains for the deployed update.','Historical v1.2 evidence retains its original scope; this audit records the current UI changes.']}
(OUT/'audit.json').write_text(json.dumps(report,indent=2)+'\n')
p=ROOT/'src/encounter-evidence.json';e=json.loads(p.read_text());e['automaton_ui']=report;p.write_text(json.dumps(e,indent=2)+'\n')
print(json.dumps({'pass':True,'commands':len(commands),'native_source_unchanged':True,'browser_receipt_current':True,'deployed':False}))
