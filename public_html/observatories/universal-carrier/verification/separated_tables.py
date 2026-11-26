"""Rebuild 4x4 all-launch joint tables on the frozen separated apparatus."""
import sys,json,math,tempfile,zipfile
from itertools import product
from pathlib import Path
import numpy as np
root=Path(__file__).resolve().parent
def score(psi,settings):
    z,x=settings[0];l=.49276265594741286;m=1-2*l
    tables=np.zeros((2,2,2,2))
    off=0
    for k in range(4):
        d=math.comb(k+5,5);block=psi[off:off+d*d].reshape(d,d,-1);off+=d*d
        weight=norm2(block);n=2*k
        if not k:
            tables[:,:,0,0]+=weight
            continue
        base=moments(block,(z,x),k)
        diag=moments(block,((z+x)/math.sqrt(2),x),k)
        zz,xx=[base[t]['two_ordered_distinct_mean'] for t in ('Z','X')]
        zx=diag['Z']['two_ordered_distinct_mean']-(zz+xx)/2
        one=np.array([base[t]['mean_of_a_uniform_singleton'] for t in ('Z','X')])
        pair=np.array([[zz,zx],[zx,xx]])
        p1=n*l*(1-l)**(n-1);p11=n*(n-1)*l*l*m**(n-2)
        p10=p1-p11;p00=1-p11-2*p10
        for i,A in enumerate(np.eye(2)):
            for j,B in enumerate((np.array([-.8,-.6]),np.array([-.8,.6]))):
                mu,nu=A@one,B@one
                a=1-p1+p1*mu;b=1-p1+p1*nu
                ab=p00+p10*(mu+nu)+p11*(A@pair@B)
                for ia,s in enumerate((1,-1)):
                    for ib,t in enumerate((1,-1)):
                        tables[i,j,ia,ib]+=weight*(1+s*a+t*b+s*t*ab)/4
    assert off==len(psi)
    assert np.max(abs(tables.sum((2,3))-1))<1e-10 and tables.min()>0
    ea=tables.sum(3);eb=tables.sum(2)
    error=max(np.max(abs(ea[:,0]-ea[:,1])),np.max(abs(eb[0]-eb[1])))
    assert error<5e-15
    E=tables[:,:,0,0]+tables[:,:,1,1]-tables[:,:,1,0]-tables[:,:,0,1]
    return dict(joint=tables.reshape(4,4).tolist(),E=E.ravel().tolist(),S=float(E.sum()-2*E[1,1]),max_remote_marginal_change=float(error))
with tempfile.TemporaryDirectory() as folder:
    with zipfile.ZipFile(root/'upstream/Thalean-Waltz-Separated-Receiver-Test.zip') as z:z.extractall(folder)
    sys.path.insert(0,str(Path(folder)/'source'))
    from exact_spatial import moments,norm2
    from receiver import run
    data=run(3,3,score)['records']
    old=json.loads((Path(folder)/'source/exact_spatial_K3F3.json').read_text())['records']
    for name,row in data.items():
        assert abs(row['S']-old[name]['spatial_scores']['time_500']['S_all'])<1e-11
(root/'results/separated-tables.json').write_text(json.dumps(data,indent=2)+'\n')
print({k:(v['S'],v['max_remote_marginal_change']) for k,v in data.items()})
