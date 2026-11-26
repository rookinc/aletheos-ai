"""Fixed guard on the contact orbit and an independent two-step TOM-PHY-029 replay."""
from fractions import Fraction as F
from pathlib import Path
import json
import numpy as np

root=Path(__file__).resolve().parent
src=root/'source'
cover=json.loads((src/'reciprocal/paired-cover.js').read_text().split('export default ')[1].strip().rstrip(';'))
adj=np.array(cover['adj']); D=int(cover['source']['denominator'])
r=cover['routes']['preserve']['lift'][-1]; s=cover['deck'][r]
j=int(min(adj[r])); l=cover['deck'][j]
assert (r,s,j,l)==(990,991,136,137)
def replay(route):
    # First positions and velocities in units of 1/D.
    x=np.zeros(3600,dtype=int);x[cover['routes'][route]['lift'][-1]]=1
    u= x[adj].sum(1)-8*x
    pos=D*x+u
    ans={}
    for name in ('retained','cleared'):
        y=2*pos.copy()  # positions in units of 1/(2D)
        if name=='cleared': y[j]=y[l]=pos[j]+pos[l]
        acc=y[adj].sum(1)-8*y
        vel2=2*D*u+acc  # units of 1/(2D²)
        def current(a,b):
            mean=(2*D*int(u[a]+u[b])+int(vel2[a]+vel2[b]))
            return F(int(y[a]-y[b])*mean,8*D**3)
        flux=sum(current(int(nb),i) for i in [j,l] for nb in adj[i] if nb not in [j,l])
        ans[name]=dict(receiver=str(F(int(y[j]-y[l]),2*D)),source=str(F(int(vel2[r]-vel2[s]),2*D**2)),
            source_sum=str(F(int(vel2[r]+vel2[s]),2*D**2)),net_in=str(flux))
    delta=F(ans['retained']['source'])-F(ans['cleared']['source'])
    assert abs(delta)==F(1,D**2) and ans['retained']['source_sum']==ans['cleared']['source_sum']
    assert all(F(row['net_in'])<0 for row in ans.values())
    ans['delta']=str(delta)
    return ans
t=np.load(src/'native_tensor_arrays.npz'); actions=np.load(src/'actions.npz')
edges={tuple(e):i for i,e in enumerate(t['canonical_edges'])}
h=t['W'][:,edges[15,26],edges[4,15]].astype(int) # both directed edges descend
seed=json.loads((src/'pentagon.json').read_text());v=np.array(list(map(F,seed['V'])),object)
read=[]
for _ in range(10):
    read.append(str(sum(int(a)*b for a,b in zip(h,v))))
    v1=np.empty_like(v);v1[actions['face_target'][447]]=v*actions['face_sign'][447];v=v1
assert all(F(read[i])==-F(read[i+5]) for i in range(5)) and F(read[0])!=0
out=dict(guard=read,preserve=replay('preserve'),swap=replay('swap'))
assert F(out['preserve']['delta'])==-F(out['swap']['delta'])
(root/'results/reciprokum.json').write_text(json.dumps(out,indent=2)+'\n')
print(out)
