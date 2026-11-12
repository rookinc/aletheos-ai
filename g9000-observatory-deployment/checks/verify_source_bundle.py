import hashlib
import io
import json
import sys
from collections import Counter
from pathlib import Path
from zipfile import ZipFile

import numpy as np

with ZipFile(Path(sys.argv[1])) as archive:
    source = archive.read("sources/native.json")
    chapter = archive.read("sources/constructor_chapter4.json")
    registration = archive.read("registration.npz")
assert hashlib.sha256(source).hexdigest() == (
    "9d7729b179da8919d2713701a8e4ef4eebc77c9baef4c0051a1bcf5327ba40e6"
)
assert hashlib.sha256(chapter).hexdigest() == (
    "d7064673a65771bfae67af418314a7316473cbf042583b5600a67cab6e95555d"
)
native, chapter = json.loads(source), json.loads(chapter)
n = 60
vertices = np.arange(n)
names = ("identity", "a", "b", "ab")
identity, a, b, ab = (np.array(native["deck"][key]) for key in names)
deck = (identity, a, b, ab)
assert np.array_equal(identity, vertices)
edges = {tuple(sorted(pair)) for pair in native["edges"]}
assert len(edges) == 120

A = np.zeros((n, n), dtype=np.int64)
for u, v in edges:
    assert u != v
    A[u, v] = A[v, u] = 1
assert np.all(A.sum(axis=1) == 4)
assert np.array_equal(a[b], b[a]) and np.array_equal(a[b], ab)
for d in deck:
    assert np.array_equal(d[d], vertices)
    assert np.array_equal(A[d][:, d], A)
assert all(len({d[v] for d in deck}) == 4 for v in vertices)

neighbors = [set(np.flatnonzero(row)) for row in A]
seen, pending = {0}, [0]
while pending:
    vertex = pending.pop()
    new = neighbors[vertex] - seen
    seen.update(new)
    pending.extend(new)
assert len(seen) == 60

triangles = [(u, v, w) for u in vertices for v in neighbors[u]
             for w in neighbors[u] & neighbors[v] if u < v < w]
triangle_edge_counts = Counter(edge for u, v, w in triangles
                               for edge in ((u, v), (u, w), (v, w)))
assert len(triangles) == 40
assert set(triangle_edge_counts) == edges
assert set(triangle_edge_counts.values()) == {1}

def has_simple_cycle(start, path, length):
    if len(path) == length:
        return start in neighbors[path[-1]]
    return any(has_simple_cycle(start, path + [v], length)
               for v in neighbors[path[-1]] if v > start and v not in path)

assert not any(has_simple_cycle(v, [v], 5) for v in vertices)
walk = [0, 25, 2, 45, 4, 15]
assert all(v in neighbors[u] for u, v in zip(walk, walk[1:]))
assert walk[-1] == b[walk[0]]

def quotient(size, orbit):
    ids = np.full(size, -1, dtype=int)
    representatives = []
    for z in range(size):
        if ids[z] < 0:
            fiber = sorted(set(orbit(z)))
            assert min(fiber) == z and np.all(ids[fiber] < 0)
            ids[fiber] = len(representatives)
            representatives.append(z)
    return ids, np.array(representatives)

base, reps15 = quotient(n, lambda z: [d[z] for d in deck])
assert np.all(np.bincount(base) == 4)
assert len(set(base[walk[:-1]])) == 5 and base[walk[0]] == base[walk[-1]]
A15 = np.zeros((15, 15), dtype=np.int64)
for u in vertices:
    ns = sorted(base[list(neighbors[u])])
    assert len(set(ns)) == 4 and base[u] not in ns
    assert ns == sorted(base[list(neighbors[reps15[base[u]]])])
    A15[base[u], ns] = 1
assert np.array_equal(A15, A15.T)

def pair_quotient(group):
    return quotient(n*n, lambda z: [n*d[z//n] + d[z%n] for d in group])

q900, r900 = pair_quotient(deck)
q1800, r1800 = pair_quotient(deck[:2])
x, y = np.divmod(r900, n)
u, v = np.divmod(r1800, n)
assert np.all(np.bincount(q900) == 4)
assert np.all(np.bincount(q1800) == 2)
assert Counter(zip(base[x], base[y])) == Counter({
    (i, j): 4 for i in range(15) for j in range(15)
})

def families(q, reps):
    first = [(i, q[n*x1 + y0]) for i, (x0, y0) in enumerate(
             map(lambda z: divmod(z, n), reps)) for x1 in neighbors[x0]]
    second = [(i, q[n*x0 + y1]) for i, (x0, y0) in enumerate(
              map(lambda z: divmod(z, n), reps)) for y1 in neighbors[y0]]
    for directed in (first, second):
        assert len(directed) == len(set(directed))
        assert set(directed) == {(j, i) for i, j in directed}
        assert all(i != j for i, j in directed)
    return [{(i, j) for i, j in directed if i < j}
            for directed in (first, second)]

X, Y = families(q900, r900)
assert len(X) == len(Y) == 1800 and not X & Y
assert X | Y == {tuple(e) for e in chapter["edges900"]}
X2, Y2 = families(q1800, r1800)
assert len(X2) == len(Y2) == 3600 and not X2 & Y2
pi = q900[r1800]
assert np.array_equal(pi, chapter["projection"])
assert np.all(np.bincount(pi) == 2)
S = q900[n*y + x]
assert np.array_equal(S[S], np.arange(900))
assert np.sum(S == np.arange(900)) == 60
assert {(min(S[i], S[j]), max(S[i], S[j])) for i, j in X} == Y
B = q1800[n*b[u] + b[v]]
T = q1800[n*ab[v] + u]
assert np.array_equal(T, native["turns"]["a"])
assert np.array_equal(T[T], B)
assert np.all(B != np.arange(1800)) and np.array_equal(B[B], np.arange(1800))
tau = q900[n*ab[y] + x]
assert np.array_equal(pi[T], tau[pi])
assert np.all(tau != np.arange(900)) and np.array_equal(tau[tau], np.arange(900))
assert np.array_equal(tau[S], S[tau])
F = np.array([nxt*1800 + T[i] for nxt in (1, 2, 3, 4, 0)
              for i in range(1800)])
with np.load(io.BytesIO(registration)) as reg:
    assert np.array_equal(F, reg["native_return_F"])
    assert np.array_equal(np.tile(pi, 5), reg["quotient9000_to900"])
    assert np.array_equal(tau, reg["quotient_turn_tau"])
w = np.arange(9000)
observed = [0]
for step in range(1, 21):
    w = F[w]
    if step < 20:
        assert np.all(w != np.arange(9000))
    else:
        assert np.array_equal(w, np.arange(9000))
    if step % 5 == 0:
        observed.append(w[0])
assert observed == [0, 480, 488, 8, 0]
assert [pi[w % 1800] for w in observed] == [0, 8, 0, 8, 0]

I = np.eye(60, dtype=np.int64)
L = 4*I - A
g = I
for j in range(7):
    g = g @ (L - j*I)
Q = L @ L - 6*L + 4*I
assert not np.any(g @ Q)
N = g @ (3*I - L)
assert [int(np.trace(N[d])) for d in deck] == [960, -960, 0, 0]
N1 = Q
for j in (0, 2, 3, 4, 5, 6):
    N1 = N1 @ (L - j*I)
assert [int(np.trace(N1[d])) for d in deck] == [480, 480, -480, -480]
J = np.eye(15, dtype=np.int64)
L15 = 4*J - A15
p = J
for j in (0, 2, 5, 6):
    p = p @ (L15 - j*J)
assert not np.any(p)
print("All exact structural, registration, and spectral certificate checks passed.")
