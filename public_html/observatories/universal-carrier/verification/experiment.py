"""Native contact to endpoint field and collective pair instrumentation."""
from pathlib import Path
from fractions import Fraction as F
from itertools import combinations_with_replacement, permutations, product
import json
import math
import numpy as np
import sympy as sp

ROOT = Path(__file__).resolve().parent
S = ROOT / "source"
def read(name):
    return json.loads((S / name).read_text())

def run():
    t = np.load(S / "native_tensor_arrays.npz")
    grav = np.load(S / "geometry.npz")
    kernels = np.load(S / "rational.npz")
    sym = np.load(S / "actions.npz")
    axes = np.load(S / "collective_axes.npz")
    w = read("pentagon.json")
    incidence = abs(t['B1']).astype(int)
    base = read("graph.json")
    A = np.zeros((15,15),int)
    for u,v in base:
        A[u,v] = A[v,u] = 1
    adj = (incidence @ incidence.T == 1).astype(int)
    assert np.array_equal(adj, grav['D']==1)
    pi = np.array(read("pi.json"))
    U = np.eye(15,dtype=int)[pi]
    assert np.array_equal(adj @ U, U @ A)
    assert np.array_equal(U@U.T, (grav['slot'][:,None]==grav['slot']))
    d = read("native.json")['deck']
    a,b = [np.array(d[k]) for k in ['a','b']]
    assert np.array_equal(a[b],b[a]) and np.array_equal(a[b],d['ab'])
    assert all(len({j,a[j],b[j],a[b[j]]})==4 for j in range(60))
    pairs = {min((x,y),(a[x],a[y]),(b[x],b[y]),(a[b[x]],a[b[y]])) for x,y in product(range(60),repeat=2)}
    assert len(pairs)==900
    M = np.array(read('matrix_M.json')['M'])
    L = (np.array(read('theorem_object.json')['g15_distance_matrix'])==1).astype(int)
    assert np.array_equal(M@M.T,L@L@L+2*L@L+2*np.eye(15))
    P = sp.Matrix(t['PC30'].tolist())
    basis = list(P.rref()[1])
    B = t['B2'].astype(int) @ t['PC30'][:,basis]
    pairs4 = list(combinations_with_replacement(range(4),2))
    W = incidence @ np.column_stack([B[:,i]*B[:,j] for i,j in pairs4])
    assert all(np.ptp(W[pi==j],axis=0).max()==0 for j in range(15))
    C = kernels['C'].astype(object)
    assert not (C @ U).any() and not (C @ W.astype(object)).any()
    rank = sp.Matrix(W.tolist()).rank()
    assert rank==10
    zparts = [[F(x) for x in w[k]] for k in ('Q','V')]
    den = math.lcm(*(x.denominator for row in zparts for x in row))
    q,v = [np.array([int(x*den) for x in row],dtype=object) for row in zparts]
    def turn(vec):
        new = np.empty_like(vec)
        new[sym['face_target'][447]] = vec*sym['face_sign'][447]
        return new
    # Reuse fixed settings and the Gram readout of fork/collective.py.
    raw = t['W'].astype(int) @ axes['switch'].astype(int).T
    enc = raw // np.gcd.reduce(raw.ravel())
    gram = enc.reshape(20,-1) @ enc.reshape(20,-1).T
    X = axes['X'].astype(int)
    xx = (X@enc@X).reshape(20,-1) @ enc.reshape(20,-1).T
    assert 120**4 * max(abs(int(X.max())),abs(int(X.min())))**2 * int(abs(enc).max())**2 < 2**63
    trace = []
    q0=q.copy()
    for k in range(10):
        eq,ev=[t['B2'].astype(object)@x for x in (q,v)]
        density=incidence.astype(object)@(eq**2+ev**2)
        total=sum(density)
        rho=[F(n,total) for n in density]
        potential=kernels['G'].astype(object)@density
        xx_mean=F(q@xx@q+v@xx@v,320**2*(q@gram@q+v@gram@v))
        corr=[F(4,5),F(4,5),-F(3,5)*xx_mean,F(3,5)*xx_mean]
        score=sum(corr[:3])-corr[3]
        assert not (C@density).any()
        trace.append(dict(step=k,tail=w['cycle'][k],head=w['cycle'][(k+1)%10],rho=[float(x) for x in rho],
                          q=[float(F(x,den)) for x in q],v=[float(F(x,den)) for x in v],
                          coarse_span=str(F(max(potential)-min(potential),int(kernels['Gden'])*total)),
                          E=[str(x) for x in corr],CHSH=str(score),chsh=float(score)))
        q,v=turn(q),turn(v)
        if k==4: assert np.array_equal(q,-q0)
    assert np.array_equal(q,q0)
    refcount=0
    for ref in read('observer.json')['g60']['references']:
        ports={v:(l,r) for v,l,r in ref['ports']}
        for u in ports:
            for bit in (0,1):
                x,p=u,bit
                for k in range(1,9):
                    x,p=ports[x][p],1-p
                    if k==4: assert (x,p)==(ref['tau'][u],bit) and x!=u and ref['pi'][x]==ref['pi'][u]
                    if k<8: assert (x,p)!=(u,bit)
                assert (x,p)==(u,bit)
                refcount+=1
    cf=np.array(read('conference.json')); assert np.array_equal(cf@cf,5*np.eye(6))
    gram6=np.eye(6)+cf/math.sqrt(5)
    census=[]
    for i,j in permutations(range(6),2):
        for k,l in permutations(range(6),2):
            sub=gram6[np.ix_([i,j],[k,l])]
            census.append(max(abs((h*sub*np.outer(s[:2],s[2:])).sum()) for s in product((-1,1),repeat=4) for h in [np.array([[1,1],[1,-1]])]))
    assert sum(x>2+1e-10 for x in census)==240
    return dict(pivots=basis,energy_map_rank=rank,registered_states=refcount,pair_orbits=len(pairs),
                point_control_max=str(F(max(abs(C[:,4]-C[:,59])),int(kernels['Cden']))),
                gram_max=max(census),violating_quartets=240,contact_trace=trace)
if __name__=='__main__':
    (ROOT/'results'/'experiment.json').write_text(json.dumps(run(),indent=2)+'\n')
