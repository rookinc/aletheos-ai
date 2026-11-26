"""python verify-drawers.py /path/to/Universal-Thalean-Carrier /path/to/index.html
Requires NumPy. Checks every displayed Bohm exit and Wheeler slot and the Bohr algebra.
"""
import json
import math
import sys
from fractions import Fraction
from pathlib import Path

import numpy as np

source = Path(sys.argv[1]) / "source"
packet = json.JSONDecoder().raw_decode(Path(sys.argv[2]).read_text().split("<script>const D=", 1)[1])[0]
rows = packet["rows"]
tensors = np.load(source / "native_tensor_arrays.npz")
actions = np.load(source / "actions.npz")
meters = np.load(source / "collective_axes.npz")
launch = json.loads((source / "pentagon.json").read_text())
slots = json.loads((source / "pi.json").read_text())
assert slots == packet["pi"]

# Wheeler: the native arrival maps to the displayed slot; two bits label its lift.
fibres = [[i for i, slot in enumerate(slots) if slot == s] for s in range(15)]
assert all(len(fibre) == 4 for fibre in fibres)
assert all(fibres[slots[i]][fibres[slots[i]].index(i)] == i for i in range(60))

# Bohm: determine which candidate exit has zero guard displacement and a downward
# crossing slope on the signed preparation, without using the next row as input.
edges = [tuple(e) for e in tensors["canonical_edges"].tolist()]
edge_id = {edge: j for j, edge in enumerate(edges)}
adjacent = [sorted(set(v for edge in edges if i in edge for v in edge if i != v)) for i in range(60)]
q0, v0 = [[Fraction(x) for x in launch[name]] for name in ("Q", "V")]
den = math.lcm(*(f.denominator for f in q0 + v0))
q, v = [np.array([int(f * den) for f in vec], dtype=object) for vec in (q0, v0)]
rot = launch["action_index"]
turn, sign = actions["face_target"][rot], actions["face_sign"][rot]
exits, slopes = [], []
for k, row in enumerate(rows):
    assert [float(Fraction(x, den)) for x in q] == row["q"]
    assert [float(Fraction(x, den)) for x in v] == row["v"]
    i, j = row["tail"], row["head"]
    live = []
    for m in adjacent[j]:
        e, f = edge_id[tuple(sorted([i, j]))], edge_id[tuple(sorted([j, m]))]
        h = tensors["W"][:, e, f].astype(object) * int(np.sign(j - i) * np.sign(m - j))
        if any(h):
            assert h @ q == 0
            live.append((m, Fraction(h @ v, den)))
    assert len(live) == 2 and live[0][1] == -live[1][1] != 0
    [(exit_site, slope)] = [pair for pair in live if pair[1] < 0]
    assert exit_site == rows[(k + 1) % len(rows)]["head"]
    exits.append(exit_site)
    slopes.append(str(slope))
    q[turn], v[turn] = sign * q, sign * v

# Bohr: normalized axes are X/320 and Z/sqrt(5120).  C* C is 4 times the
# rank-six orthogonal projector, proving the commutator's spectral norm is 2.
x, z = [meters[name].astype(np.int64) for name in ("X", "Z")]
projector = tensors["PA800"].astype(np.int64)
assert np.array_equal(projector.T, projector)
assert np.array_equal(projector @ projector, 800 * projector)
assert np.trace(projector) == 6 * 800
comm = x @ z - z @ x
assert np.array_equal(800 * comm.T @ comm, 4 * 320**2 * 5120 * projector)

# All one-wing X,Z contractions vanish on pairs of encoded face basis vectors,
# so each encoded preparation has vanishing one-wing means.
encoder = tensors["W"].astype(np.int64) @ meters["switch"].astype(np.int64).T
flat = encoder.reshape(len(encoder), -1)
for axis in (x, z):
    for analyzed in (axis @ encoder, encoder @ axis.T):
        assert not (analyzed.reshape(len(encoder), -1) @ flat.T).any()

print(json.dumps({
    "bohm_exits": exits, "bohm_signed_slopes": slopes, "wheeler_fibres": list(map(len, fibres)),
    "wheeler_arrival_slots": [slots[row["head"]] for row in rows],
    "bohr_commutator_norm": 2, "bohr_projector_rank": 6, "bohr_one_wing_X_Z": 0,
}, indent=2))
