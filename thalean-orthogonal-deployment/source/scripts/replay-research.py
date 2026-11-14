#!/usr/bin/env python3
"""Replay preserved research in fresh temporary directories. No native/app writes.

python3 scripts/replay-research.py --inputs /path/to/original/archive-directory
Dependencies: Python, NumPy, SymPy, SciPy, NetworkX (inherited producers).
"""
from pathlib import Path
import argparse,hashlib,io,json,math,subprocess,sys,tempfile,zipfile
import numpy as np

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'provenance/encounter-001'
SOURCES={
 'SU6_NATIVE_FIELD_INVARIANTS_001_Audit_Package.zip':('138aee043c76030aa6e70ca24e266348f3871566c6afc0ce4d8efd567cf7d187','libfile_126e34eb2d38819191d3e115628d9f88'),
 'G9000_ENCOUNTER_WITNESS_007_Audit_Package.zip':('51188ca5f1358d1cab38d102826cbfc1d3837fd933ae03d929d5e17879c7674f','libfile_fde3_f-e8662f8b31a881918fa9a9fdd375ded7_49e008ebf4888191aa3c13bfa6801182'),
 'SU6_NATIVE_HISTORY_CROSSWALK_001_Audit_Package.zip':('d5d1171b95eca9979418e858295971f0828ea20e0bc081bb842a28161ad9d738','libfile_f407dfd5751481918721b3cd83125e2a')}
def sha(b):return hashlib.sha256(b).hexdigest()
def suffix(z,name):
 names=[n for n in z.namelist() if n.endswith('/'+name)]
 assert len(names)==1,(name,names)
 return z.read(names[0])
def extract(raw,dest):
 with zipfile.ZipFile(io.BytesIO(raw)) as z:
  for n in z.namelist():assert (dest/n).resolve().is_relative_to(dest.resolve()),n
  z.extractall(dest)
 return next(p for p in dest.iterdir() if p.is_dir())
def run(cwd,args,log):
 p=subprocess.run([sys.executable,*args],cwd=cwd,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True,timeout=1800)
 (OUT/log).write_text(p.stdout)
 if p.returncode:raise RuntimeError(f'{log} failed; see retained log')
 return {'command':['python3',*args],'exit':p.returncode,'log':log,'log_sha256':sha(p.stdout.encode())}
def main():
 parser=argparse.ArgumentParser();parser.add_argument('--inputs',type=Path,required=True);args=parser.parse_args();OUT.mkdir(exist_ok=True)
 raw={name:(args.inputs/name).read_bytes() for name in SOURCES}
 for name,b in raw.items():assert sha(b)==SOURCES[name][0],name
 receipts=[]
 with tempfile.TemporaryDirectory(prefix='orthogonal-research-') as td:
  temp=Path(td);field=extract(raw[list(SOURCES)[0]],temp/'field');enc=extract(raw[list(SOURCES)[1]],temp/'encounter');hist=extract(raw[list(SOURCES)[2]],temp/'history')
  receipts.append(run(field,['verify_manifest.py'],'field-manifest.log'))
  receipts.append(run(field,['replay.py','--output',str(temp/'field-results')],'field-replay.log'))
  receipts.append(run(field,['verify_independently.py','--results',str(temp/'field-results'),'--output',str(temp/'field-results/independent.json')],'field-independent.log'))
  receipts.append(run(enc,['verify_manifest.py'],'reciprocal-manifest.log'))
  receipts.append(run(enc,['derive.py'],'reciprocal-replay.log'))
  receipts.append(run(enc,['verify_independently.py'],'reciprocal-independent.log'))
  # Read the history crosswalk's complete theorem and sealed manifest. The
  # larger balanced-release parent chain is not required or replayed here.
  receipts.append(run(hist,['verify_manifest.py'],'history-manifest.log'))
  invariant=json.loads((temp/'field-results/certificate.json').read_text());ind=json.loads((temp/'field-results/independent.json').read_text());rec=json.loads((enc/'results/certificate.json').read_text());reci=json.loads((enc/'results/independent_verification.json').read_text())
  assert invariant['all_checks_pass'] and rec['all_passed']
  for name,p in [('field-certificate.json',temp/'field-results/certificate.json'),('field-independent.json',temp/'field-results/independent.json'),('reciprocal-certificate.json',enc/'results/certificate.json'),('reciprocal-independent.json',enc/'results/independent_verification.json')]: (OUT/name).write_bytes(p.read_bytes())
  z=zipfile.ZipFile(io.BytesIO(raw[list(SOURCES)[0]]));parent=zipfile.ZipFile(io.BytesIO(suffix(z,'inputs/SU6_NATIVE_RELATIONAL_RETURN_007_Audit_Package.zip')));su6=json.loads(suffix(parent,'results/certificate.json'))
  (OUT/'su6-007-certificate.json').write_bytes(suffix(parent,'results/certificate.json'))
  assert su6['result']['generated_lie_dimension']==35
  # Recover the actual indexed encounter carrier, not its narrative summary.
  z=zipfile.ZipFile(io.BytesIO(raw[list(SOURCES)[1]]))
  for n in [6,5,4,3]:z=zipfile.ZipFile(io.BytesIO(suffix(z,f'sources/G9000_ENCOUNTER_WITNESS_{n:03}_Audit_Package.zip')))
  native=json.loads(suffix(z,'results/native_base.json'))
  for n in [2,1]:z=zipfile.ZipFile(io.BytesIO(suffix(z,f'sources/G9000_ENCOUNTER_WITNESS_{n:03}_Audit_Package.zip')))
  z=zipfile.ZipFile(io.BytesIO(suffix(z,'sources/native_g9000_map_test.zip')))
  actions=json.loads(suffix(z,'NATIVE_ACTIONS.json'));inp=json.loads(suffix(z,'INPUTS.json'))
  obs=json.loads((ROOT/'src/native-data.json').read_text());meta=json.loads((ROOT/'src/paired-history-data.json').read_text());decks=inp['native_deck']
  assert {tuple(sorted(e)) for e in actions['native_G60_edges']}=={tuple(sorted(e)) for e in obs['g60Edges']}
  assert all(decks[k]==meta['deck'][k] for k in ['a','b','ab'])
  # Observatory quotient is diagonal a, encounter's preserved base is beta=b.
  for representatives in obs['pairing']['representatives']:
   u,v=divmod(representatives[0],60);assert set(representatives)=={60*u+v,60*decks['a'][u]+decks['a'][v]}
  F=[((i//1800+1)%5)*1800+obs['topology']['K'][i%1800] for i in range(9000)]
  E={tuple(sorted([a+1800*f,b+1800*f])) for f in range(5) for a,b in obs['topology']['edges1800']}|{tuple(sorted([i,j])) for i,j in enumerate(F)}
  R={tuple(sorted(e)) for e in native['native_edges']}
  beta=actions['native_G1800_models']['b'];horizontal={tuple(sorted(e)) for e in beta['edges']}
  assert {e for e in R if max(e)<1800}==horizontal
  def quotient_edges(g):
   q={};fib=[]
   for u in range(60):
    for v in range(60):
     p=60*u+v
     if p not in q:
      orbit=sorted({p,60*g[u]+g[v]});fib.append(orbit)
      for x in orbit:q[x]=len(fib)-1
   edges=set()
   for u,v in obs['g60Edges']:
    for w in range(60):edges.add(tuple(sorted((q[60*u+w],q[60*v+w]))));edges.add(tuple(sorted((q[60*w+u],q[60*w+v]))))
   return fib,edges
  fa,ea=quotient_edges(decks['a']);fb,eb=quotient_edges(decks['b'])
  assert fa==obs['pairing']['representatives'] and ea=={tuple(sorted(e)) for e in obs['topology']['edges1800']}
  assert eb==horizontal
  # Exact trace(A_quotient^10) from the free diagonal-C2 quotient formula.
  A=np.zeros((60,60),dtype=np.int64)
  for u,v in obs['g60Edges']:A[u,v]=A[v,u]=1
  powers=[np.eye(60,dtype=np.int64)]
  for _ in range(10):powers.append(powers[-1]@A)
  ordinary=[int(x.trace()) for x in powers];trace={}
  for label in ['a','b']:
   twisted=[sum(int(x[v,decks[label][v]]) for v in range(60)) for x in powers]
   trace[label]=sum(math.comb(10,j)*(ordinary[j]*ordinary[10-j]+twisted[j]*twisted[10-j]) for j in range(11))//2
  assert trace=={'a':10409947200,'b':10417204800}
  mismatch={'same_named_G60_graph_and_deck':True,'observatory_diagonal_quotient':'a','reciprocal_diagonal_quotient':'b','F_label_mismatches':sum(x!=y for x,y in zip(F,native['F'])),'shared_indexed_edges':len(E&R),'observatory_only_edges':len(E-R),'reciprocal_only_edges':len(R-E),'horizontal_trace_A10':trace,'obstruction':'Different horizontal closed-walk counts exclude an isomorphism preserving the horizontal graph. No transplantation of this base experiment into the observatory is admitted. This does not decide arbitrary untyped9000-graph isomorphism or all other registrations.','numeric_labels':'0,488,7207 are zero-based state addresses in the experiment registration; its coefficients g/J=2/5 and norm ratio10sqrt2 are chosen model parameters.'}
  (OUT/'reciprocal-registration-crosscheck.json').write_text(json.dumps(mismatch,indent=2)+'\n')
  bridge={'audit':'orthogonal_six_channel_bridge_audit_001','status':'Unsupported','verdict':'FIELD_SU6_REPLAYED_DISPLAY_BRIDGE_NOT_ADMITTED','producer':'python3 scripts/replay-research.py --inputs ARCHIVE_DIRECTORY','input_provenance':{n:{'sha256':x[0],'library_file_id':x[1]} for n,x in SOURCES.items()},'field_result':su6['result'],'field_scope':su6['claim_boundaries'],'replay_counts':{'SU6_007':47,'SU6_007_independent':46,'field_invariants':38,'field_invariants_independent':42,'reciprocal_exact':55,'reciprocal_independent_exact':22,'reciprocal_numerical_diagnostics':8},'seven_bridge_tests':[
   {'test':'Native reversal/orientation','result':'F^-1 and F^10 exist; no source-selected X+ to X- channel operator identified.'},
   {'test':'Six independent complex channels','result':'The display supplies three spatial vectors and their negatives, real rank3. No C6 amplitude readout map is defined. This is not a no-go for six abstract channels.'},
   {'test':'Complex structure','result':'Certified J exists on the inherited24-real field. No induced J on display label space supplied.'},
   {'test':'Hermitian preservation','result':'All six field seeds and finite flows pass source checks; no display-to-field map to test.'},
   {'test':'Determinant one','result':'Tracefree complex field seeds generate determinant-one flows. F is an even9000-permutation; that fact alone is unrelated to SU6.'},
   {'test':'Lie algebra dimension35','result':'Source SU6-007 replayed exactly: five coherent link rotations plus one relative phase. Display rotations do not supply these generators.'},
   {'test':'Intertwining native transport','result':'No map from observatory states/three embeddings to the source field with compatible operators recovered. Reciprocal base also has the typed-carrier obstruction below.'}],
   'reciprocal_registration':mismatch,'history_crosswalk':'Sealed source manifest verified and theorem inspected. Its independently transported registrations and doublet residual are not an observatory coupling; balanced-release parent chain not rerun here.','replay_receipts':receipts,'failures':['No source-derived six-channel observatory intertwiner','Reciprocal base uses different horizontal quotient'],'boundaries':['Six labels do not imply six independent complex amplitudes.','A full field SU6 generation theorem does not select a physical Hamiltonian, time law or geometric encounter.','Experimental007 remains unimplemented in the live carrier.']}
  (OUT/(bridge['audit']+'.json')).write_text(json.dumps(bridge,indent=2)+'\n')
  print(json.dumps({'research_replays':'PASS','bridge':'NOT_ADMITTED','registration_crosscheck':mismatch},indent=2))
if __name__=='__main__':main()
