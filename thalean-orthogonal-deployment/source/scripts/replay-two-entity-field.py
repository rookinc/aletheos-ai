#!/usr/bin/env python3
"""Test the product baseline and replay the pinned declared joint-field models.

No browser code, graph data or deployment is changed. Source archives stay
outside the repository. The recorded command uses --reuse-010 only for the
fresh source replay already executed in this request; omit it to rerun all.
"""
from pathlib import Path
import argparse, hashlib, io, json, shutil, subprocess, sys, tempfile, zipfile

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'provenance/two-entity-field-001'
PIN='509e639c915c22c4bfa95af3adcf74998e887886cb65cad54c448d08879d5852'
def sha(b):return hashlib.sha256(b).hexdigest()
def unpack(raw,dest):
    with zipfile.ZipFile(io.BytesIO(raw)) as z:
        for name in z.namelist():assert (dest/name).resolve().is_relative_to(dest.resolve())
        z.extractall(dest)
    return next(p for p in dest.iterdir() if p.is_dir())
def child(root,name):
    paths=list(root.glob('sources/'+name));assert len(paths)==1;return paths[0].read_bytes()
def load(p):return json.loads(p.read_text())
def main():
    ap=argparse.ArgumentParser();ap.add_argument('--archive',type=Path,required=True);ap.add_argument('--reuse-010',type=Path);args=ap.parse_args()
    raw=args.archive.read_bytes();assert sha(raw)==PIN
    OUT.mkdir(parents=True,exist_ok=True);receipts=[]
    def run(cwd,command,label):
        p=subprocess.run(command,cwd=cwd,capture_output=True,text=True,timeout=1800)
        log=label+'.txt';(OUT/log).write_text(p.stdout+p.stderr)
        receipts.append({'stage':label,'command':command,'exit':p.returncode,'log':log,'log_sha256':sha((p.stdout+p.stderr).encode())})
        print(f'{label}: exit {p.returncode}',flush=True)
        if p.returncode:raise RuntimeError(p.stdout+p.stderr)
    run(ROOT,['node','scripts/test-two-entity-field.cjs'],'native-product')
    with tempfile.TemporaryDirectory(prefix='two-entity-field-') as td:
        temp=Path(td);ten=unpack(raw,temp/'ten');nine_raw=child(ten,'G9000_ENCOUNTER_WITNESS_009_Audit_Package.zip');nine=unpack(nine_raw,temp/'nine');eight_raw=child(nine,'G9000_ENCOUNTER_WITNESS_008_Audit_Package.zip');eight=unpack(eight_raw,temp/'eight')
        for root,number,producer in [(eight,'008','derive.py'),(nine,'009','reconcile.py')]:
            run(root,[sys.executable,'verify_manifest.py'],number+'-manifest')
            run(root,[sys.executable,producer],number+'-producer')
            run(root,[sys.executable,'verify_independently.py'],number+'-independent')
        if args.reuse_010:
            tenout=args.reuse_010.resolve();execution=load(tenout/'execution.json');assert len(execution)==4 and all(x['returncode']==0 for x in execution)
            (OUT/'010-execution.json').write_text(json.dumps(execution,indent=2)+'\n')
            receipts.append({'stage':'010-fresh-replay-earlier-in-this-request','command':['python3','replay.py','--output',str(tenout)],'exit':0,'log':'010-execution.json','log_sha256':sha((OUT/'010-execution.json').read_bytes())})
        else:
            tenout=temp/'010-replay';run(ten,[sys.executable,'verify_manifest.py'],'010-manifest');run(ten,[sys.executable,'replay.py','--output',str(tenout)],'010-replay')
        # Retain complete new composition/independent results; omit only the
        # long census listing from the summary, retaining its full digest.
        composition=load(tenout/'composition/composition_certificate.json');gate=load(tenout/'native_gate/native_gate_certificate.json');ind10=load(tenout/'independent.json')
        assert composition['all_passed'] and gate['status']=='PASS' and ind10['all_passed']
        for name,p in [('008-certificate.json',eight/'results/certificate.json'),('008-independent.json',eight/'results/independent_verification.json'),('008-numerical.json',eight/'results/numerical_diagnostics.json'),('009-certificate.json',nine/'results/certificate.json'),('009-independent.json',nine/'results/independent_verification.json'),('009-numerical.json',nine/'results/numerical_diagnostics.json'),('010-composition.json',tenout/'composition/composition_certificate.json'),('010-independent.json',tenout/'independent.json')]:shutil.copyfile(p,OUT/name)
        gate_digest=sha((tenout/'native_gate/native_gate_certificate.json').read_bytes());gate.pop('joint_stabilizers');(OUT/'010-native-gate-summary.json').write_text(json.dumps({'complete_certificate_sha256':gate_digest,**gate},indent=2)+'\n')
        # Recompute the declared008 counterfactual from actual global terms.
        sys.path.insert(0,str(eight));import derive as d
        model=load(eight/'results/model_data.json');terms=model['terms'] if 'terms' in model else model['local_terms'];history=model['history'];start=tuple(history[0]);end=tuple(history[-1])
        seen,diag,links=d.discover(start,terms);assert len(seen)==31 and end in seen
        fork=[t for t in terms if t['kind']=='probe' and 0 in t['witness_absent']];assert len(fork)==1
        changed=json.loads(json.dumps(terms));[t['witness_absent'].remove(0) for t in changed if 0 in t['witness_absent']]
        changed_states,_,_=d.discover(start,changed);assert len(changed_states)==39
        counterfactual={'normal_component':len(seen),'without_source_vacancy_condition':len(changed_states),'meaning':'Declared local contact conditions change joint evolution; the coefficient/program is not selected by the graph.'}
        report={'audit':'G9000_TWO_ENTITY_FIELD_TEST_001','producer':'python3 scripts/replay-two-entity-field.py --archive ORIGINAL_010.zip','verdict':'NATIVE_KINEMATICS_PASS_DECLARED_LOCAL_MODEL_PASS_AUTONOMOUS_NATIVE_FIELD_LAW_OPEN','status':'Certified derived / Experimental (separate scopes)',
          'inputs':{'G9000_ENCOUNTER_WITNESS_010_Audit_Package.zip':{'sha256':PIN,'library_file_id':'libfile_fde3_f-63eb7bc053108191afe6100a5addccd9_49e008ebf4888191aa3c13bfa6801182'},'nested009_sha256':sha(nine_raw),'nested008_sha256':sha(eight_raw)},'receipts':receipts,
          'native':load(OUT/'native-test.json')['results'],'declared_coupling':{'carrier':'Psi(A,W) in (C6 tensor C2) over X_A x X_W, one field fiber per JOINT configuration; two address sectors, not three independent role fields.','base_graph':'The recovered reciprocal b-quotient registration, not the observatory a-quotient.','field_on_single_G9000_recovered':False,'source_reference':0,'source_backreaction':False,'selected_native_physical_law':False,'terms':25,'prepared_component_states':31,'transfer_at_T':{'before':list(start),'after':list(end),'T':'pi/kappa'},'return_at_2T':'Identity on the complete prepared component; no permanent autonomous record.','product_restriction':'Independent product fields cannot write W488; exact invariant-support theorem in009.','counterfactual':counterfactual},
          'readout':{'010_composition_checks':composition['check_count'],'010_native_gate_checks':gate['check_count'],'010_independent_checks':len(ind10['checks']),'echo':composition['readouts'],'native_t_witness_scope':gate['scope']},
          'failures':[],'unresolved':['No source-selected joint transition law for two extended G9000 bodies in a dynamical field on one G9000 carrier.','Identity registration of point-supported native configurations is the tested baseline, not a derived body-to-field placement.','Native adjacency supplies eligibility; it does not select a force, transfer rate or field response.','The declared successful coupling lives on joint configuration space and requires correlations; it is not the independent product baseline.','Observable readout depends on the declared projection and source-supported controls.','010 native t witness has no certified G9000 encounter crosswalk.','Reciprocal b and observatory a registrations remain distinct.'],'deployment_changed':False}
        (OUT/'audit.json').write_text(json.dumps(report,indent=2)+'\n')
        print(json.dumps({'pass':True,'verdict':report['verdict'],'joint_transfer':report['declared_coupling']['transfer_at_T'],'counterfactual':counterfactual,'010_checks':[composition['check_count'],gate['check_count'],len(ind10['checks'])]}),flush=True)
if __name__=='__main__':main()
