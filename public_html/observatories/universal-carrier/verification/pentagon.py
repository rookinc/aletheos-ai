#!/usr/bin/env python3
"""Exact rational travelling pentagon for the archived live first-contact dynamics.

    python pentagon.py

NumPy and SymPy are required. The exact certificate uses native integer matrices,
rational oscillator rotations, and a Sturm check for a continuous parameter family.
"""
import argparse
import json
from hashlib import sha256
from pathlib import Path

import numpy as np
import sympy as sp


def dihedral_key(vertices):
    n = len(vertices)
    return min(tuple((order+order)[i:i+n]) for order in (vertices,vertices[::-1]) for i in range(n))


def orbit(path):
    # Original integer arrays and the published Project 41 four-point quotient.
    def arrays(filename, names, fingerprint):
        file = path / filename
        assert sha256(file.read_bytes()).hexdigest() == fingerprint
        with np.load(file, allow_pickle=False) as data:
            return [data[name].astype('int64') for name in names]
    W, B, edges, P30 = arrays('native_tensor_arrays.npz', ['W','B2','canonical_edges','PC30'],
        'c2393278b1014c59798dc0b47c597a12f31c1c4a56d75d4872770278da98ef28')
    vt, ft, fs = arrays('actions.npz', ['vertex_target','face_target','face_sign'],
        'dc7eafc829d31d64182cca9c209e0929dbb20e8f65ee64d1595a237eaf3cd402')
    proj = np.array(json.loads((path/'pi.json').read_text()))
    assert np.array_equal(np.bincount(proj),np.full(15,4))
    edge_id = {tuple(e):i for i,e in enumerate(edges)}
    neighbors = [sorted({v for e in edges if i in e for v in e if v!=i}) for i in range(60)]

    def guard(i,j,k):
        ij, jk = edge_id[tuple(sorted((i,j)))], edge_id[tuple(sorted((j,k)))]
        return np.sign(j-i)*np.sign(k-j)*W[:,ij,jk]

    # Recover each lifted step from the lawful base pentagon; covering projection
    # makes the neighbor at the requested slot unique.
    pentagon = [11,0,4,12,13]
    cycle = [26]
    for slot in (pentagon*3)[1:11]:
        v, = [j for j in neighbors[cycle[-1]] if proj[j]==slot]
        cycle.append(int(v))
    assert cycle[-1] == cycle[0]
    cycle.pop()
    rotation, = np.flatnonzero((vt[:,cycle] == cycle[1:]+cycle[:1]).all(1))
    size = len(cycle)
    assert size==10
    gs = np.zeros((20,20), dtype=int)
    gs[ft[rotation],np.arange(20)] = fs[rotation]
    guards = []
    for step in range(size):
        i,j,k = (cycle+cycle)[step:step+3]
        u = guard(i,j,k)
        live = [guard(i,j,l) for l in neighbors[j] if guard(i,j,l).any()]
        assert len(live)==2 and np.array_equal(live[0],-live[1]) and u.any()
        guards.append(u)
    h = guards[0]
    assert all(np.array_equal(np.linalg.matrix_power(gs,i)@h,k) for i,k in enumerate(guards))
    assert np.array_equal(np.linalg.matrix_power(gs,5)@P30,-P30)
    assert np.array_equal(np.linalg.matrix_power(gs,10)@P30,P30)
    assert all(int(k@k)==1380 for k in guards)
    autocor = [int(h@k) for k in guards]
    alternatives = set()
    diagrams = set()
    lifted_histories = set()
    base_histories = set()
    for f,s,v in zip(ft,fs,vt):
        transform = np.zeros((20,20), dtype=int)
        transform[f,np.arange(20)]=s
        lift = v[cycle].tolist()
        letters = proj[lift].tolist()
        transformed = np.array(guards)@transform.T
        assert all(np.array_equal(transformed[i],guard(*(lift*2)[i:i+3])) for i in range(size))
        lifted_histories.add(tuple(lift))
        base_histories.add(tuple(letters[:5]))
        alternatives.add(dihedral_key(letters[:5]))
        diagrams.add(dihedral_key(lift))
    assert (len(lifted_histories),len(base_histories),len(diagrams),len(alternatives))==(480,120,24,12)

    # z=Q+iV in oscillator units. Let lambda=exp(-i psi),
    # t=tan(psi/2). On this cyclic subspace G^5=-I. The expression below is
    # lambda*(G-lambda I)^-1 h applied to the guard cyclic basis.
    t=sp.Symbol('t',real=True)
    I=sp.I
    den=sp.expand((1+I*t)**5+(1-I*t)**5)
    raw_poly=[sp.expand(-(1-I*t)**(5-j)*(1+I*t)**j) for j in range(5)]
    scalar=sp.expand(sum(w*b for w,b in zip(autocor,raw_poly)))
    c=sp.factor(-2*sp.im(scalar)/(1380*den))
    cb=(1-c*c)/(1+c*c)
    sb=-2*c/(1+c*c)
    cospsi=(1-t*t)/(1+t*t)
    sinpsi=2*t/(1+t*t)
    cf=sp.factor(cospsi*cb+sinpsi*sb)
    sf=sp.factor(sinpsi*cb-cospsi*sb)
    left=sp.Rational(-1,5)
    # c and sin(f) have the sign at the rational witness throughout [−1/5,0).
    for value in (c,sf):
        n,d=sp.fraction(sp.cancel(value/t))
        assert all(sp.Poly(p,t).count_roots(left,0)==0 for p in (n,d))
        assert value.subs(t,left)>0
    assert sp.Poly(den,t).count_roots(left,0)==0

    def at(value):
        return sp.simplify(value.subs(t,left))

    ph = sp.Matrix(h)
    gg = sp.Matrix(gs)
    cyclic = sp.Matrix(np.array(guards[:5]).T)
    rr = cyclic*sp.Matrix([at(v/den) for v in raw_poly])
    lam = at(cospsi-I*sinpsi)
    assert ((gg-lam*sp.eye(20))*rr-lam*ph).applyfunc(sp.simplify)==sp.zeros(20,1)
    cosb,sinb,cosf,sinf = map(at,[cb,sb,cf,sf])
    zz=rr*(1-cosb-I*sinb)
    q=zz.applyfunc(sp.re);v=zz.applyfunc(sp.im)
    assert sp.Matrix(P30)*q==30*q and sp.Matrix(P30)*v==30*v
    # r has a finite limit at t=0 from G^5 h=-h; |1-exp(ib)|^2=4c^2/(1+c^2).
    r0=cyclic*sp.Matrix([(v/den).subs(t,0) for v in raw_poly])
    weak_energy_coefficient=sp.factor(4*sp.limit(c/t,t,0)**2*r0.dot(r0)/(20*6912000))
    half_hold_weak_energy_limit=sp.Rational(4*int(h@h),20*6912000)
    assert weak_energy_coefficient==sp.Rational(20577,2116000)
    assert half_hold_weak_energy_limit==sp.Rational(23,576000)
    qr=cosb*(q+ph)+sinb*v-ph
    vr=cosb*v-sinb*(q+ph)
    assert ph.dot(q)==ph.dot(qr)==0
    assert ph.dot(v)==-at(c)*ph.dot(ph)<0 and ph.dot(vr)==at(c)*ph.dot(ph)>0
    assert (gg*ph).dot(qr)>0 and (gg*ph).dot(gg*v)<0
    assert gg*q==qr*cosf+vr*sinf and gg*v==vr*cosf-qr*sinf
    assert at(c)>0 and sinf>0  # hold b in (pi,2pi), free f in (0,pi)
    assert ph.dot(q)==0 and sinb<0
    # The release is the first positive zero since its nontrivial roots obey
    # tan(b/2) = −c. The first next free zero follows from 0<f<pi and simple
    # free-harmonic zeros separated by pi. At both switches the sign selects h.
    Bsym=sp.Matrix(B)
    base=proj[edges]

    def profile(a,b):
        es=[x*x+y*y for x,y in zip(Bsym*a,Bsym*b)]
        return sp.Matrix([sum(es[k] for k in np.flatnonzero((base==j).any(1))) for j in range(15)])/(2*sum(es))

    profiles = []
    for i in range(size):
        step=gg**i
        profiles.append(profile(step*q,step*v))
    first=profiles[0]
    centered=first-sp.ones(15,1)/15
    assert len({tuple(w) for w in profiles})==5
    assert profiles[:5]==profiles[5:]
    assert all((w-sp.ones(15,1)/15).norm()**2==centered.dot(centered) for w in profiles)
    assert gg**5*q==-q and gg**5*v==-v and gg**10*q==q and gg**10*v==v
    normalized_energy=(q.dot(q)+v.dot(v))/(2*10*6912000)
    return {
        'basis_order':'Project 41 fibre order by first native vertex',
        'projection': proj.tolist(),
        
        'native_action_index':int(rotation),'native_period':size,'cycle':cycle,
        'base_period':5,'oriented_base_cycle':pentagon,'guard_autocorrelations':autocor,
        'cyclic_guard_rank':sp.Matrix(guards).rank(),
        'actions_exactly_covariant_on_all_ten_guards':len(vt),
        'distinct_rooted_directed_lifts':len(lifted_histories),'distinct_rooted_directed_base_words':len(base_histories),
        'unrooted_undirected_lifts':len(diagrams),'unrooted_undirected_base_words':len(alternatives),
        'parameter_interval':'[-1/5,0)','c_formula':str(c),'free_sine_formula':str(sf),
        'rational_parameter':str(left),'c':str(at(c)),'cos_hold':str(cosb),'sin_hold':str(sinb),
        'cos_free':str(cosf),'sin_free':str(sinf),'full_period_in_free_flux_periods':float(
            size*(1-sp.atan(at(c))/sp.pi+sp.atan2(sinf,cosf)/(2*sp.pi))),
        'Q0':list(map(str,q)), 'V0':list(map(str,v)),'energy':str(normalized_energy),
        'entry_energy_over_t_squared_limit':str(weak_energy_coefficient),
        'half_oscillator_period_into_hold_weak_entry_energy_limit':str(half_hold_weak_energy_limit),
        'one_step_held_and_free_update_equals_native_action':True,'field_antiperiod_in_contacts':5,
        'field_period_in_contacts':10,'energy_profile_period_in_contacts':5,
        'slot_fraction_at_hold_entry':list(map(str,first)),
        'squared_centered_norm_at_every_hold_entry':str(centered.dot(centered)),
        'routed_pentagon_energy_fraction_at_entry':str(sum(first[i] for i in pentagon)),
        'largest_entry_energy_fraction_slots':[i for i in range(15) if first[i]==max(first)],
        'actors':'zero positions and velocities; invariant subspace',
    }


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('inputs',type=Path,nargs='?',default=Path(__file__).resolve().parent/'inputs')
    print(json.dumps(orbit(parser.parse_args().inputs),indent=2))
