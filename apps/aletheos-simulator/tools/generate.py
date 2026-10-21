#!/usr/bin/env python3
"""Deterministic fixture export from unmodified, hash-pinned Audit 040.
The AST hook observes each construction; it does not alter its mathematics.
"""
import ast, hashlib, json, re
from pathlib import Path
import numpy as np
import networkx as nx
ROOT=Path(__file__).resolve().parents[1]
V=ROOT/'vendor/project41'; OUT=ROOT/'webroot/native/data'
def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def write(name,obj):
 p=OUT/name; p.write_text(json.dumps(obj,sort_keys=True,separators=(',',':'),allow_nan=False)+'\n');return digest(p)
source=V/'scripts/audit_transported_g1800_c5_c4_groupoid_040.py'
assert digest(source)=='ee12ef66c5ac2e71dd5c31996bbee4979266cbf72fb1c01400153a44913bfca5'
original=json.loads((V/'artifacts/json/transported_g1800_c5_c4_groupoid_audit_040.json').read_text())
construction_files=[]
def capture(g):
 row=g['construction_rows'][-1];i=len(construction_files)
 assert json.loads(json.dumps(row))==original['measurements']['construction_rows'][i], ('certificate mismatch',i)
 obj={'id':i,'certificate':row,'F':g['F'],'K':g['local_K_actions'],'T':g['transport_maps'],'nativeMaps':g['frame_native_maps'],'frameRepresentatives':[[f[0] for f in m['fibers']] for m in g['frame_models']],'framePartners':[[f[1] for f in m['fibers']] for m in g['frame_models']]}
 name=f'construction-{i:02d}.json';sha=write(name,obj)
 construction_files.append({'id':i,'file':name,'sha256':sha,'transport':row['transport_label'],'axes':row['image_axes'],'labeling':row['labeling_index']})
class Observe(ast.NodeTransformer):
 def visit_Expr(self,node):
  if isinstance(node.value,ast.Call) and isinstance(node.value.func,ast.Attribute):
   f=node.value.func
   if isinstance(f.value,ast.Name) and f.value.id=='OUTPUT_PATH' and f.attr=='write_text': return None
   if isinstance(f.value,ast.Name) and f.value.id=='construction_rows' and f.attr=='append':
    return [node,ast.parse('capture(globals())').body[0]]
  if isinstance(node.value,ast.Call) and isinstance(node.value.func,ast.Name) and node.value.func.id=='print':return ast.Pass()
  return node
code=ast.fix_missing_locations(Observe().visit(ast.parse(source.read_text())))
g={'__file__':str(source),'capture':capture};exec(compile(code,str(source),'exec'),g)
assert g['audit_pass'] and g['checks']==original['checks']
b=g['bundle'];edges=sorted(g['native_edges']);adj=[sorted(v for e in edges if u in e for v in e if v!=u) for u in range(60)]
cache=json.loads((V/'artifacts/json/native_g60_automorphism_deck_cache.v1.json').read_text())
autos=cache['measurements']['automorphism_rows'];E=set(map(tuple,edges))
for a in autos:
 p=a['permutation'];assert sorted(p)==list(range(60));assert {tuple(sorted((p[x],p[y]))) for x,y in edges}==E
assert len(autos)==480
five=[r['automorphism_index'] for r in autos if r['permutation_order']==5];groups={}
for i in five:
 p=tuple(autos[i]['permutation']);powers=[g['power'](p,k) for k in range(5)];key=tuple(sorted(powers));groups.setdefault(key,[]).append(i)
assert len(five)==24 and len(groups)==6
legacy=json.loads(re.search(r'<script id="fixture"[^>]*>(.*?)</script>',(ROOT/'baseline/index.html').read_text(),re.S)[1])['graphs']['6']
matcher=nx.algorithms.isomorphism.GraphMatcher(nx.Graph(legacy['edges']),nx.Graph(edges));assert matcher.is_isomorphic()
m=matcher.mapping; coords=[None]*60
for old,new in m.items():coords[new]=legacy['vertices'][old]
assert {tuple(sorted((m[x],m[y]))) for x,y in legacy['edges']}==E
# Registered diagonal V4 quotient SET. Pair adjacency is not promoted as canonical G900.
fibers=[];qid=[None]*3600;lookup={}
for s in range(3600):
 f=tuple(sorted({g['diagonal_action'](p,s) for p in g['native_deck'].values()}));assert len(f)==4
 if f not in lookup:lookup[f]=len(fibers);fibers.append(f)
 qid[s]=lookup[f]
assert len(fibers)==900
# Numerical Laplacian eigensystem: residuals are explicit, not an exact certificate.
L=4*np.eye(60)
for u,v in edges:L[u,v]=L[v,u]=-1
values,vectors=np.linalg.eigh(L);residual=float(np.max(np.abs(L@vectors-vectors*values)))
assert residual<1e-10
triangles=[(a,b,c) for a in range(60) for b in adj[a] for c in adj[b] if a<b<c and c in adj[a]];assert len(triangles)==40
status={}
for n in ['g1800_normalization_transport_covariance_065.v1.json','g1800_section_defect_cocycle_066.v1.json']:
 d=json.loads((V/'artifacts/json'/n).read_text());status[n]={'sha256':digest(V/'artifacts/json'/n),'checks':d['checks'],'boundary':d['boundary'],'measurements':{k:v for k,v in d['measurements'].items() if not isinstance(v,(dict,list)) and k!='defect_is_exact_one_cocycle'}}
core={'schema':'aletheos.native.fixture.v1','revision':'e1bf21ca3ab700f69432852436f092442f8b46bd','edges':edges,'adjacency':adj,'triangles':triangles,'automorphisms':autos,'fivefoldSubgroups':list(groups.values()),'deck':g['native_deck'],'coordinates':coords,'displayRegistration':{'kind':'derived_graph_isomorphism_not_intrinsic_geometry','legacyToNative':[m[i] for i in range(60)]},'g900':{'fibers':fibers,'qid':qid,'adjacencyStatus':'unavailable: canonical G900 adjacency not recovered; quotient set only'},'g1800':{k:{'fibers':v['fibers'],'qid':v['qid']} for k,v in g['native_models'].items()},'laplacian':{'eigenvalues':values.tolist(),'eigenvectors':vectors.T.tolist(),'maxResidual':residual,'status':'derived numerical eigensystem'},'gauge':status,'constructions':construction_files,'audit040Checks':g['checks']}
core_sha=write('core.json',core)
manifest={'schema':'aletheos.sources.v1','baselineSha256':digest(ROOT/'baseline/index.html'),'researchRevision':core['revision'],'pinned040GitBlob':'a1ee3e6340c65a601f12af2bd6ad961f7f797deb','coreSha256':core_sha,'files':[{'path':str(p.relative_to(ROOT)),'sha256':digest(p)} for p in sorted(V.rglob('*')) if p.is_file()], 'constructions':construction_files}
(ROOT/'source-manifest.json').write_text(json.dumps(manifest,indent=2,sort_keys=True)+'\n')
print(f'Exported {len(construction_files)} certified constructions; core {core_sha}; Laplacian residual {residual:.3g}')
