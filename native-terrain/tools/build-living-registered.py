"""Reconstruct one native Project 41 axis registration in common coordinates.

This reproduces the canonical-model portion of preserved Audit 040, rather than
substituting an abstract C5 x C4 carrier. No intrinsic axis choice is asserted.
"""
import hashlib
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
def read(name): return json.loads((ROOT / name).read_text())
def digest(name): return hashlib.sha256((ROOT / name).read_bytes()).hexdigest()
SOURCE = 'evidence/living/audit_transported_g1800_c5_c4_groupoid_040.py'
RECEIPT = 'evidence/living/transported_g1800_c5_c4_groupoid_audit_040.json'
assert digest(SOURCE) == 'ee12ef66c5ac2e71dd5c31996bbee4979266cbf72fb1c01400153a44913bfca5'
assert digest(RECEIPT) == '2c8be2cfa828639cf31ebf7c57aecd3726e55dcce7b55a25f033dfe8c86cd409'
g = read('data/g60.json')
bundle = read('data/project41-bundle.json')
q15 = read('data/g15-quotient.json')
a, b = q15['deck_generators']
assert a == [int(bundle['relabeled_involution_a_current_labels'][str(i)]) for i in range(60)]
assert b == [int(bundle['relabeled_involution_b_current_labels'][str(i)]) for i in range(60)]
assert sorted(map(sorted, g['edges'])) == sorted(map(sorted, bundle['current_edges']))
ab = [a[b[i]] for i in range(60)]
deck = [list(range(60)), a, b, ab]
def diag(p, state):
    u, v = divmod(state, 60)
    return p[u] * 60 + p[v]
def quotient(actions):
    fibers, mapping = [], [-1] * 3600
    for state in range(3600):
        if mapping[state] >= 0: continue
        fiber = sorted(set(diag(p, state) for p in actions))
        for x in fiber: mapping[x] = len(fibers)
        fibers.append(fiber)
    return fibers, mapping
fibers, mapping = quotient([deck[0], b])
q900, map900 = quotient(deck)
assert len(fibers) == 1800 and all(len(f) == 2 for f in fibers)
assert len(q900) == 900 and all(len(f) == 4 for f in q900)
edges = set()
for u, v in g['edges']:
    for fixed in range(60):
        for left, right in [(u*60+fixed,v*60+fixed),(fixed*60+u,fixed*60+v)]:
            x, y = mapping[left], mapping[right]
            assert x != y
            edges.add(tuple(sorted((x,y))))
edges = sorted(edges)
K, delta, to900 = [], [], []
for fiber in fibers:
    images, delta_images, projection = set(), set(), set()
    for state in fiber:
        u, v = divmod(state,60)
        images.add(mapping[ab[v]*60+b[u]])
        delta_images.add(mapping[diag(a,state)])
        projection.add(map900[state])
    assert len(images) == len(delta_images) == len(projection) == 1
    K.append(images.pop()); delta.append(delta_images.pop()); to900.append(projection.pop())
assert set(K) == set(range(1800))
assert all(K[K[i]] == delta[i] and delta[delta[i]] == i and delta[i] != i for i in range(1800))
assert {tuple(sorted((K[u],K[v]))) for u,v in edges} == set(edges)
degree = Counter(x for edge in edges for x in edge)
assert len(edges) == 7200 and set(degree.values()) == {8}
assert set(Counter(to900).values()) == {2}
seen, cycles = set(), []
for x in range(1800):
    if x in seen: continue
    cycle = [x]; y = K[x]
    while y != x: cycle.append(y); y=K[y]
    seen.update(cycle); cycles.append(cycle)
assert len(cycles)==450 and all(len(c)==4 for c in cycles)
payload = {
 'schema':'aletheos.living-registered.v1', 'classification':'native',
 'representation':'One native ordered axis registration (a,b); common coordinates for five transported frames',
 'source':{'repository':'rookinc/order-4-dodecahedral-residue','archive':'The_Graviton_on_Graph_HOG52002_GRA004_Overleaf.zip','path':'scripts/audit_transported_g1800_c5_c4_groupoid_040.py','sha256':digest(SOURCE),'receipt_sha256':digest(RECEIPT),'native_bundle_sha256':digest('data/project41-bundle.json'),'graph_sha256':digest('data/g60.json')},
 'formula':{'quotient':'G60 square Cartesian product / diagonal b','K':'[(u,v)] -> [(ab(v),b(u))]','delta':'[(u,v)] -> [(a(u),a(v))]','F':'(f,x) -> ((f+1) mod 5,K[x])','S':'(f,x) -> ((f+1) mod 5,x)'},
 'limits':['Axis registration (a,b) is a reproducible convention, not intrinsic selection.','Five frames are shown in common native coordinates; no physical spatial embedding or propagation is asserted.'],
 'vertices':1800,'edges':edges,'fibers':fibers,'productMap':mapping,'K':K,'delta':delta,'toG900':to900,'cycles':cycles,
 'verification':{'vertices':1800,'edges':7200,'degree':8,'K_cycles':450,'K_cycle_length':4,'K_preserves_edges':True,'K_squared_equals_delta':True,'F_cycles':450,'F_cycle_length':20,'real_sector_dimensions':[1800,3600,3600]}
}
(ROOT/'data/living-registered.json').write_text(json.dumps(payload,separators=(',',':'))+'\n')
print(json.dumps(payload['verification']))
