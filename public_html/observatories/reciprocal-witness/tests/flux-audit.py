#!/usr/bin/env python3
"""Re-run the two archived face-current programs and verify the native spatial frame.

Requires Python 3, NumPy, SciPy and SymPy. Works offline with the packaged files.
To regenerate the numerical reference, append --write-reference.
"""
import argparse
import hashlib
import json
import os
from collections import Counter
from pathlib import Path
import subprocess
import sys
import tempfile
import zipfile

import numpy as np
from scipy.sparse import bmat, csr_matrix, eye
from scipy.sparse.csgraph import shortest_path
from scipy.sparse.linalg import expm_multiply

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
REFERENCE = ROOT / "tests/flux-sag-reference.json"


def digest(raw):
    return hashlib.sha256(raw).hexdigest()


def fixtures():
    rows = (DATA / "flux-fixtures.js").read_text().splitlines()
    return [json.loads(line.split(" = ", 1)[1].removesuffix(";"))
            for line in rows if line.startswith("export const ")]


def full_graph(edges, fixture):
    n = 1800
    a, b = edges.T
    source, receiver = 61, 1136
    row, col = np.r_[a, b], np.r_[b, a]
    graph = csr_matrix((np.ones(len(row)), (row, col)), shape=(n, n))
    assert len(edges) == 7200 and np.all(graph.sum(axis=1) == 8)
    hop = shortest_path(graph, directed=False, indices=source, unweighted=True).astype(int)
    assert hop[receiver] == 6
    # Exact color refinement establishes that the 484-class speedup reproduces
    # the two singleton ports and the multiplicities of every retained cut edge.
    adjacency = [graph.indices[graph.indptr[i]:graph.indptr[i+1]].tolist() for i in range(n)]
    color = [2] * n
    color[source], color[receiver] = 0, 1
    while True:
        indices = {}
        nxt = [indices.setdefault((color[i],tuple(sorted(color[j] for j in adjacency[i]))),len(indices)) for i in range(n)]
        done = len(set(color)) == len(set(nxt))
        color = nxt
        if done:
            break
    compact = json.dumps(color, separators=(",", ":")).encode()
    assert digest(compact) == fixture["partitionSha256"]
    for i in range(n):
        c = color[i]
        assert sorted(Counter(color[j] for j in adjacency[i]).items()) == [tuple(pair) for pair in fixture["neighbors"][c]]
        assert hop[i] == fixture["distance"][c]
    assert color.count(color[source]) == color.count(color[receiver]) == 1

    laplacian = 8 * eye(n) - graph
    operator = bmat([[None, eye(n)], [-laplacian, None]], format="csr")
    pulse = np.zeros(2*n)
    pulse[source] = 1
    times = [0., 2., 4., 6., 8.]
    free = expm_multiply(operator, pulse, start=0, stop=8, num=5, traceA=0)
    held = free[2, receiver]
    cleared = free.copy()
    # Restart the entire 3,600-component Cauchy vector. This avoids using the
    # two-port reciprocity identity when generating the independent reference.
    cleared[2, receiver] = 0
    cleared[2:] = expm_multiply(operator, cleared[2], start=0, stop=4, num=3, traceA=0)
    samples = {}
    for radius in [1, 2, 4]:
        crossings = hop[a] <= radius
        ij = (hop[a] <= radius) ^ (hop[b] <= radius)
        i = np.where(crossings, a, b)[ij]
        j = np.where(crossings, b, a)[ij]
        branches = {}
        for arm, values in [("free", free), ("cleared", cleared)]:
            currents = .5*(values[:, i]-values[:, j])*(values[:, i+n]+values[:, j+n])
            branches[arm] = [dict(t=t, qB=x[receiver], qA=x[source], j=curr.sum())
                             for t, x, curr in zip(times, values, currents)]
        samples[str(radius)] = branches
    delta = free[-1, source] - cleared[-1, source]
    assert abs(delta - held**2) < 1e-13
    return {"method": "SciPy sparse block-matrix exponential on all 1,800 native sites; independent full-state restart at t=4.",
            "checkpoint": 4, "endTime": 8, "held": held, "return": delta, "samples": samples}


def archived_replay(folder, face):
    runner = folder / "cochain/face_current.py"
    inputs = folder / "inputs"
    env = dict(os.environ, OPENBLAS_NUM_THREADS="1", OMP_NUM_THREADS="1")
    def run(*args):
        return json.loads(subprocess.check_output([sys.executable, "-B", *args], env=env))
    cochain = run(runner, inputs/"native_tensor_arrays.npz")
    assert cochain["face_sites"] == 20 and cochain["face_graph_weight"] == 2
    assert cochain["angular_area_current_rank"] == 6
    replay = run(folder/"storage/loop_memory.py", inputs/"chart.npz", inputs/"native_tensor_arrays.npz",
                 inputs/"native_g60_cross_flux_energy_coupling_021.npz", inputs/"registered/results.json",
                 inputs/"native_g60_signed_cochain_actions_005.npz", inputs/"g60_native_generator_input_bundle_001.v1.json")["fine"]
    recorded = json.loads((folder/"storage/results.json").read_text())["fine"]
    assert abs(replay["write_duration"] - recorded["write_duration"]) < 5e-13
    assert np.allclose(replay["circulation_records"][0], face["archivedCycle"], rtol=0, atol=2e-13)
    assert abs(replay["signed_probe_source_difference"][-1] - recorded["signed_probe_source_difference"][-1]) < 1e-12
    with np.load(inputs/"native_g60_cross_flux_energy_coupling_021.npz") as z:
        U = z["four_flux_basis"]
    assert np.max(np.abs(U@replay["matched_flux_positions"][0] - face["position"])) < 2e-13
    assert np.max(np.abs(U@replay["matched_flux_momenta"][0] - face["velocity"])) < 2e-13
    print("PASS original face/writer runners; 7→15 cycle mean %.12f, t_write %.12f, probe %.12g" %
          (replay["maximum_current_witness"]["two_signed_currents"][0], replay["write_duration"], replay["signed_probe_source_difference"][-1]))


def main():
    opts = argparse.ArgumentParser(description=__doc__)
    opts.add_argument("--write-reference", action="store_true")
    args = opts.parse_args()
    face, exterior = fixtures()
    provenance = json.loads((DATA/"flux-provenance.json").read_text())
    zip_path = DATA/"flux-upstream.zip"
    assert digest(zip_path.read_bytes()) == provenance["publicSubsetSha256"]
    assert digest((DATA/"flux-fixtures.js").read_bytes()) == provenance["fixtureSha256"]
    with tempfile.TemporaryDirectory() as temp:
        folder = Path(temp)
        with zipfile.ZipFile(zip_path) as z:
            for row in z.read("SHA256SUMS").decode().splitlines():
                pin, name = row.split("  ", 1)
                assert not Path(name).is_absolute() and ".." not in Path(name).parts
                content = z.read(name)
                assert digest(content) == pin
                target = folder / name
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(content)
        archived_replay(folder, face)
        edge_bytes = (folder/"g1800_edges.json").read_bytes()
        assert digest(edge_bytes) == provenance["extractedNativeEdgesSha256"] == exterior["edgesSha256"]
        numerical = full_graph(np.asarray(json.loads(edge_bytes)), exterior)
    if args.write_reference:
        REFERENCE.write_text(json.dumps(numerical, indent=2, allow_nan=False)+"\n")
    else:
        recorded = json.loads(REFERENCE.read_text())
        for cut, branches in numerical["samples"].items():
            for arm, rows in branches.items():
                for seen, reference in zip(rows, recorded["samples"][cut][arm], strict=True):
                    assert all(abs(x-reference[k])<2e-13 for k,x in seen.items())
    print("PASS native G1800 full frame, 484-class quotient and source return; B(4) %.12g, ΔA(8) %.12g" %
          (numerical["held"], numerical["return"]))


if __name__ == "__main__":
    main()
