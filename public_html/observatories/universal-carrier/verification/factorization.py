"""Eliminate the common four-flux covariance exactly, without any trajectory samples."""
from pathlib import Path
from itertools import combinations_with_replacement
import json
import sympy as s
import numpy as np
from fractions import Fraction
root=Path(__file__).resolve().parent
src=root/'source'
T=np.load(src/'native_tensor_arrays.npz')
Z=np.load(src/'collective_axes.npz')
pi=np.array(json.loads((src/'pi.json').read_text()))
P=T['PC30'][:,[0,1,2,5]].astype(int); H=T['B2'].astype(int)@P
inc=abs(T['B1']).astype(int)
emb=T['W'].astype(int)@Z['switch'].astype(int).T
emb//=np.gcd.reduce(emb.ravel())
# Small integer band basis, unbounded integers for the two reduced forms.
flat=emb.reshape(20,-1)
X=Z['X'].astype(int)
trans=(X@emb@X).reshape(20,-1)
G=P.T.astype(object)@(flat@flat.T).astype(object)@P
K=P.T.astype(object)@(trans@flat.T).astype(object)@P
pairs=list(combinations_with_replacement(range(4),2))
def coords(m):return s.Matrix([int(m[i,j])*(1 if i==j else 2) for i,j in pairs])
V=inc@np.column_stack([(1 if i==j else 2)*H[:,i]*H[:,j] for i,j in pairs])
D=s.Matrix([V[pi==i].sum(axis=0).tolist() for i in range(15)])
total=D.T*s.ones(15,1)
g=coords(G)
scale=g[0]/total[0]
assert g==scale*total and D.rank()==10
# E(XX)=K/(320² G); signed S=8/5−6 E(XX)/5 for the archived quartet.
target=s.Rational(8,5)*total-s.Rational(6,5)*coords(K)/(320**2*scale)
weights=D*(D.T*D).inv()*target
assert D.T*weights==target
exp=json.loads((root/'results/experiment.json').read_text())
for r in exp['contact_trace']:
    predicted=sum(float(weights[i])*sum(np.array(r['rho'])[pi==i]) for i in range(15))
    assert abs(predicted-float(Fraction(r['CHSH'])))<1e-13
# Complement: can this same score be obtained from the calibrated full field?
# Restricted G on coarse inputs; take one output per fibre on a uniform fibre density.
grav=np.load(src/'rational.npz')
R=s.Matrix([[sum(map(int,grav['G'][np.flatnonzero(pi==i)[0],pi==j])) for j in range(15)] for i in range(15)])/(4*int(grav['Gden']))
assert R.rank()==15
field_weights=R.T.inv()*weights
assert D.T*R.T*field_weights==target
A=s.Rational(8,5)*s.Matrix(G.tolist())-s.Rational(6,5*320**2)*s.Matrix(K.tolist())
lam=s.symbols('lambda')
char=(s.Matrix(G.tolist()).inv()*A).charpoly(lam).as_expr()
assert s.simplify(char-(lam-s.Rational(14,5))*(lam-s.Rational(12,5))**3)==0
out=dict(spectrum=['12/5','12/5','12/5','14/5'],chamber_order='pi.json',rank_energy_map=10,rank_coarse_green=15,gram_to_total=str(scale),
         chamber_score_weights=list(map(str,weights)),coarse_field_score_weights=list(map(str,field_weights)),
         exact_identity=True)
(root/'results/factorization.json').write_text(json.dumps(out,indent=2)+'\n')
print(out)
