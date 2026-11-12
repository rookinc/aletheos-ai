"""Reconstruct registered paired quotients. No guessed or sampled topology."""
import hashlib
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
APP = ROOT / "public_html/observatories/g9000"
SOURCE = APP / 'native'
n = json.loads((SOURCE / 'native.json').read_text())
chapter = json.loads((SOURCE / 'constructor_chapter4.json').read_text())
deck = [n['deck'][k] for k in ['identity', 'a', 'b', 'ab']]
neighbors = [[] for _ in range(60)]
for x, y in n['edges']:
    neighbors[x].append(y)
    neighbors[y].append(x)
assert all(len(v) == 4 for v in neighbors)

def quotient(size, orbit):
    ids, reps = [-1] * size, []
    for v in range(size):
        if ids[v] < 0:
            fiber = sorted(set(orbit(v)))
            assert min(fiber) == v
            for w in fiber:
                assert ids[w] < 0
                ids[w] = len(reps)
            reps.append(v)
    return ids, reps

base, reps15 = quotient(60, lambda v: [d[v] for d in deck])
deckAt = [next(i for i, d in enumerate(deck) if d[reps15[base[v]]] == v) for v in range(60)]
q900, reps900 = quotient(3600, lambda v: [60*d[v//60]+d[v%60] for d in deck])
q1800, reps1800 = quotient(3600, lambda v: [60*d[v//60]+d[v%60] for d in deck[:2]])
assert len(reps900) == 900 and len(reps1800) == 1800

def edge_families(ids, reps):
    X, Y = set(), set()
    for i, z in enumerate(reps):
        x, y = divmod(z, 60)
        X.update(tuple(sorted((i, ids[60*w+y]))) for w in neighbors[x])
        Y.update(tuple(sorted((i, ids[60*x+w]))) for w in neighbors[y])
    assert not X & Y
    return sorted(X), sorted(Y)

X, Y = edge_families(q900, reps900)
X2, Y2 = edge_families(q1800, reps1800)
assert sorted(X+Y) == sorted(map(tuple, chapter['edges900']))
pi = [q900[v] for v in reps1800]
assert pi == chapter['projection']
T = [q1800[60*deck[3][z%60]+z//60] for z in reps1800]
assert T == n['turns']['a']
F = [((i//1800+1)%5)*1800+T[i%1800] for i in range(9000)]
seen, cycles = set(), []
for i in range(9000):
    if i in seen:
        continue
    c, z = [], i
    while z not in seen:
        seen.add(z)
        c.append(z)
        z = F[z]
    assert z == i and len(c) == 20
    cycles.append(c)
assert len(cycles) == 450
assert [cycles[0][i] for i in (0,5,10,15)] == [0,480,488,8]
assert all(pi[c[0]%1800] == pi[c[10]%1800] and c[0] != c[10] for c in cycles)
fibers = [[] for _ in range(900)]
for i,p in enumerate(pi):
    fibers[p].append(i)
assert all(len(f) == 2 for f in fibers)
lift = [int(i == fibers[p][1]) for i,p in enumerate(pi)]
assert all(lift[T[T[i]]] != lift[i] for i in range(1800))
addresses = [[base[z//60],base[z%60],deckAt[z//60]^deckAt[z%60]] for z in reps900]
assert len(set(map(tuple,addresses))) == 900
edges9000 = [(k*1800+u,k*1800+v) for k in range(5) for u,v in X2+Y2]
edges9000 += [tuple(sorted((i,F[i]))) for i in range(9000)]
edge_set = set(edges9000)
assert len(edge_set) == 45000
assert {tuple(sorted((F[u],F[v]))) for u,v in edges9000} == edge_set
adj = [[] for _ in range(9000)]
for u,v in edges9000:
    adj[u].append(v)
    adj[v].append(u)
connected, pending = {0}, [0]
while pending:
    for v in adj[pending.pop()]:
        if v not in connected:
            connected.add(v)
            pending.append(v)
assert len(connected) == 9000
assert set(Counter(v for e in edges9000 for v in e).values()) == {10}
data = dict(edges60=n['edges'],deck=deck,base60=base,deck60=deckAt,
            edges900X=X,edges900Y=Y,edges1800X=X2,edges1800Y=Y2,
            pairs1800=[divmod(z,60) for z in reps1800],projection=pi,lift=lift,
            addresses=addresses,turn=T,cycles=cycles,
            sourceSHA256=hashlib.sha256((SOURCE/'native.json').read_bytes()).hexdigest(),
            audit=dict(vertices=9000,edges=45000,degree=10,cycles=450,period=20,framedProjectionPeriod=10,surfacePeriod=2))
(APP/'native-model.js').write_text('window.NATIVE_MODEL='+json.dumps(data,separators=(',',':'))+';\n')
print('Verified G60 → G900 → G1800 → G9000; 45,000 unique edges, degree 10, 450 disjoint F20 cycles.')
