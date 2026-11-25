#!/usr/bin/env python3
"""Independent Fraction replay. Requires Python 3.11+ and Node 22+; no dependencies."""
from collections import defaultdict
from fractions import Fraction as F
from hashlib import sha256
import json
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
RAW = (ROOT / "data/paired-cover.js").read_bytes()
assert sha256(RAW).hexdigest() == "6839508aeacf33154b75515a0b0ebaf85c896c376abc947898a7c625858b9ef1"
cover = json.loads(RAW.decode().split("export default ", 1)[1].removesuffix(";\n"))
adj, deck, projection = (cover[k] for k in ("adj", "deck", "projection"))
D = 24_000
marks = cover["calibration"]
r, zr = marks["reference_endpoint"], marks["other_sheet"]
calibrated = [(j, deck[j]) for j in marks["receiver_ports"]]

for i, n in enumerate(adj):
    assert len(set(n)) == 8 and i not in n and deck[i] not in n
    assert all(i in adj[j] for j in n) and deck[deck[i]] == i
    assert set(adj[deck[i]]) == {deck[j] for j in n}
    assert projection[i] == projection[deck[i]] and len({projection[j] for j in n}) == 8
assert len(adj) == 3600 and len(set(projection)) == 1800

JS = """
import {paired,fork} from './paired.js';
const runs = [], forks = [];
for (const route of ['preserve','swap']) for (const pairs of [1,8]) for(const readout of ['signed','sum'])
  runs.push(paired({route,pairs,readout}));
for (const checkpoint of [420,540]) for(const test of [1,-1]) for(const reference of [1,-1])
  forks.push(fork({checkpoint,test,reference}));
console.log(JSON.stringify({runs,forks}));
"""
browser = json.loads(subprocess.check_output(
    ["node", "--input-type=module", "-e", JS], cwd=ROOT))


def push(state):
    x, u = state
    lap = defaultdict(F)
    for i, v in x.items():
        lap[i] += 8 * v
        for j in adj[i]:
            lap[j] -= v
    w = defaultdict(F, u)
    for j, v in lap.items():
        w[j] -= v / D
    y = defaultdict(F, x)
    for j, v in w.items():
        y[j] += v
    return y, w


def energy(state, region):
    x, u = state
    def at(s, i):
        return s.get(i, F())
    total = F()
    for i in region:
        vi, xi = at(u, i), at(x, i)
        total += D * vi**2
        for j in adj[i]:
            d = xi - at(x, j)
            total += d * (d - vi + at(u, j)) / 2
    return total


def comparison(vals, ids):
    plus = sum((vals.get(i, F()) for i, _ in ids), F())
    minus = sum((vals.get(i, F()) for _, i in ids), F())
    return dict(zip(("plus", "minus", "contrast", "sum"), map(str, (plus, minus, plus - minus, plus + minus))))


def check_flux(payload, first, last, region):
    x, v = first
    _, w = last
    edges = {}
    for j in region:
        for i in adj[j]:
            if i in region:
                continue
            edges[i, j] = (x.get(i, 0) - x.get(j, 0)) * F(v.get(i, 0) + v.get(j, 0) + w.get(i, 0) + w.get(j, 0), 2)
    assert {(e["from"], e["to"]): F(e["transfer"]) for e in payload["edges"]} == edges
    into, out = sum(v for v in edges.values() if v > 0), -sum(v for v in edges.values() if v < 0)
    net = into - out
    before, after = energy(first, region), energy(last, region)
    assert net == after - before
    for key, x in zip(("netIntoB", "intoB", "outOfB", "before", "after"), (net, into, out, before, after)):
        assert F(payload[key]) == x
    return net


for p in browser["runs"]:
    q = marks[p["route"]]["launched_at"]
    selected = calibrated[:p["pairs"]]
    region = {s for pair in selected for s in pair}
    start = {q: F(1)}, {}
    first = push(start)
    x, u = first
    cleared = dict(x)
    for i, j in selected:
        cleared[i] = cleared[j] = (x.get(i, 0) + x.get(j, 0)) / 2
    nets = {}
    for arm, middle in (("free", first), ("cleared", (cleared, u))):
        last = push(middle)
        for tick, state in enumerate((start, middle, last)):
            frame = p["frames"][arm][tick]
            if arm == "free":
                assert energy(state, set(state[0]) | {j for i in state[0] for j in adj[i]}) == 8
            for register, vals in zip(("x", "u"), state):
                assert frame["source"][register] == comparison(vals, [(r, zr)])
                assert frame["receiver"][register] == comparison(vals, selected)
                for item, (i, j) in zip(frame["portReadings"], calibrated):
                    assert item[register] == [str(vals.get(i, 0)), str(vals.get(j, 0))]
        nets[arm] = check_flux(p["flux"][arm], middle, last, region)
    multiplier = 1 if p["route"] == "preserve" else -1
    assert F(p["return"]["signedDelta"]) == F(multiplier * p["pairs"], D*D)
    assert F(p["first"]["contrast"]) == F(multiplier * p["pairs"], D)
    assert F(p["first"]["sum"]) == F(p["pairs"], D)
    assert p["return"]["sumDelta"] == "0"
    assert F(p["flux"]["delta"]) == nets["free"] - nets["cleared"]
    assert nets["free"] < 0 and nets["cleared"] < 0 and p["flux"]["reversed"] is False
    assert len(p["flux"]["free"]["edges"]) == (16 if p["pairs"] == 1 else 112)
# The same live graph and physical launch under a different readout must give identical frames and cuts.
for a, b in zip(browser["runs"][::2], browser["runs"][1::2]):
    assert a["frames"] == b["frames"] and a["flux"] == b["flux"]
# Reference-fork comparator against all eight native 480-fork cases.
for result in browser["forks"]:
    row, = [c for c in cover["forkRows"] if (c["checkpoint"], c["test_triangle_return"], c["reference_triangle_return"]) ==
            (result["checkpoint"], result["test"], result["reference"])]
    assert result["firstEdge"] == row["first_edge"] and result["firstEdgeHop"] == row["first_successor_common_tick"]
    assert result["echoHop"] == row["echo"]["detected_hop"]
    assert result["echoAmplitude"] == row["echo"]["arrival_mode_amplitude"]
    assert result["bit"] == row["echo"]["retained_bit"] and result["relation"] == row["aim"]
print("PASS: 3,600 vertices / 28,800 directed contacts; every recorded port and source register at ticks 0–2; "
      "8 route/pair/readout settings; free Q = 8; 16 and 112 cut-edge balances; 8 fork-480 echo controls.")
