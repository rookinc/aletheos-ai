"""Second implementation: direct projectors, basis-independent deck test, sampled trials."""
from pathlib import Path
from itertools import product
import json, math
from fractions import Fraction
import numpy as np

root=Path(__file__).resolve().parent
src=root/'source'
get=lambda f:json.loads((src/f).read_text())
saved=json.loads((root/'results/experiment.json').read_text())
t=np.load(src/'native_tensor_arrays.npz')
meters=np.load(src/'collective_axes.npz')
cal=np.load(src/'geometry.npz')
kernel=np.load(src/'rational.npz')
# The character on the entire rank-four face band forces unsigned energy invariance.
actions=np.load(src/'actions.npz')
decks=get('native.json')['deck']
characters={}
for name,perm in decks.items():
    idx,=np.where(np.all(actions['vertex_target']==perm,axis=1))[0]
    image=np.zeros((20,20),int)
    image[actions['face_target'][idx]]=actions['face_sign'][idx,:,None]*t['PC30']
    character=1 if np.array_equal(image,t['PC30']) else -1
    assert np.array_equal(image,character*t['PC30'])
    characters[name]=character
    # Check signed edge-face equivariance on all columns.
    F=np.zeros((20,20),int); F[actions['face_target'][idx],np.arange(20)]=actions['face_sign'][idx]
    E=np.zeros((120,120),int); E[actions['edge_target'][idx],np.arange(120)]=actions['edge_sign'][idx]
    assert np.array_equal(E@t['B2'],t['B2']@F)
    assert np.array_equal(abs(t['B1'])[perm,:][:,actions['edge_target'][idx]],abs(t['B1']))
for fibre in range(15):
    assert np.all(kernel['C'][:,cal['slot']==fibre].sum(axis=1)==0)
I=t['PA800']/800
x=meters['X']/320
z=meters['Z']/math.sqrt(5120)
enc=t['W']@meters['switch'].T
errs=[]
for r in saved['contact_trace']:
    wave=np.array(r['q'])+1j*np.array(r['v'])
    amp=np.tensordot(wave,enc,axes=1)
    amp/=np.linalg.norm(amp)
    for j,(left,right) in enumerate(product((z,x),(-(4*z+3*x)/5,-(4*z-3*x)/5))):
        table=np.array([[np.linalg.norm((I+a*left)@amp@(I+b*right).T/4)**2 for b in (1,-1)] for a in (1,-1)])
        e=float(Fraction(r['E'][j]))
        err=np.max(abs(table-(1+e*np.array([[1,-1],[-1,1]]))/4))
        assert err<2e-13 and max(abs(table.sum(0)-.5))<2e-13 and max(abs(table.sum(1)-.5))<2e-13
        errs.append(float(err))
# Standard two-qubit analyzer bench. Independent settings streams and recorded signs.
singlet=np.array([0,1,-1,0])/math.sqrt(2)
pure=np.outer(singlet,singlet)
zz=np.diag([1,-1]);xx=np.array([[0,1],[1,0]])
controls={'singlet':pure,'independent_histories':np.eye(4)/4,
          'phase_erased_shared_bit':np.diag([0,.5,.5,0])}
def obs(deg):
    a=math.radians(deg)
    return math.cos(a)*zz+math.sin(a)*xx
def probabilities(state,l,r):
    return np.array([np.trace(state@np.kron((np.eye(2)+a*obs(l))/2,(np.eye(2)+b*obs(r))/2)) for a,b in product((1,-1),repeat=2)])
tables={}
for name,state in controls.items():
    tab=[probabilities(state,l,r) for l,r in product([90,0],[45,135])]
    cor=[float(v@[1,-1,-1,1]) for v in tab]
    for p in tab:
        T=p.reshape(2,2)
        assert np.allclose(T.sum(0),.5) and np.allclose(T.sum(1),.5)
    tables[name]=dict(correlations=cor,CHSH=abs(sum(cor[:3])-cor[3]),joint=[v.tolist() for v in tab])
assert np.isclose(tables['singlet']['CHSH'],2*math.sqrt(2))
assert max(abs(a*(b+c)+d*(b-c)) for a,b,c,d in product((1,-1),repeat=4))==2
angles={}
for deg in (0,45,90,135):
    p=probabilities(pure,0,deg)
    angles[deg]=dict(joint=p.tolist(),E=float(p@[1,-1,-1,1]))
    assert math.isclose(angles[deg]['E'],-math.cos(math.radians(deg)),abs_tol=1e-15)
rngs=[np.random.default_rng(s) for s in (139,229,321)]
n=100000; settings=[r.integers(2,size=n) for r in rngs[:2]]
counts=np.zeros((4,4),int)
for j,p in enumerate(tables['singlet']['joint']):
    mask=(2*settings[0]+settings[1]==j)
    counts[j]=np.bincount(rngs[2].choice(4,size=int(mask.sum()),p=p),minlength=4)
# No remote change of detector setting is conveyed by the CHSH scorer.
# Check first nonzero path count for continuous-time point-flight amplitude.
A=(cal['D']==1).astype(int);N=A.copy()
paths=[]
for k in range(1,5):
    paths.append(int(N[2,8])); N=N@A
assert paths[:3]==[0,0,0] and paths[3]>0
assert not np.allclose(x@z,z@x)
result=dict(deck_characters=characters,max_projector_table_error=max(errs),angular_bench=angles,
    controls=tables,all_local_deterministic_max=2,sample_counts=counts.tolist(),sample_trials=n,seeds=[139,229,321],
    path_coefficient_counts=paths,commutator_spectral_norm=float(np.linalg.norm(x@z-z@x,2)))
(root/'results/independent.json').write_text(json.dumps(result,indent=2)+'\n')
print('PASS',characters,max(errs),paths,tables['phase_erased_shared_bit']['CHSH'])
# Test the new three-chamber identity directly on a spanning set of real
# covariance probes and a complex input. No use of reconstruction weights.
band=t['PC30'][:,[0,1,2,5]].astype(float)
probes=list(band.T)+[band[:,i]+band[:,j] for i in range(4) for j in range(i)]+[band[:,0]+1j*band[:,3]]
pi=np.array(get('pi.json'))
for wave in probes:
    amp=np.tensordot(wave,enc,axes=1)
    amp/=np.linalg.norm(amp)
    means=[np.vdot(amp,l@amp@r.T).real for l,r in product((z,x),(-(4*z+3*x)/5,-(4*z-3*x)/5))]
    rho=abs(t['B1'])@abs(t['B2']@wave)**2
    frac=rho[np.isin(pi,[1,6,12])].sum()/rho.sum()
    assert abs(sum(means[:3])-means[3]-(2.8-1.5*frac))<1e-13
print('PASS direct charge contractions versus three-chamber theorem on 11 probes')
