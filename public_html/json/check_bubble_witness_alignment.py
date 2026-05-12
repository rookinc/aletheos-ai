#!/usr/bin/env python3

import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent

FILES = {
    "bubble": ROOT / "bubble_witness_lens.json",
    "theorem": ROOT / "theorem_object.json",
    "matrix": ROOT / "matrix_M.json",
    "gram": ROOT / "gram_Q.json",
    "metadata": ROOT / "metadata.json",
    "verify": ROOT / "verify_report.json",
    "cocycle": ROOT / "transport_cocycle.json",
}

def load_json(path):
    if not path.exists():
        return None
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)

def fail(msg):
    print("[fail]", msg)
    return 1

def warn(msg):
    print("[warn]", msg)

def ok(msg):
    print("[ok]", msg)

def get_matrix(obj):
    if isinstance(obj, list):
        return obj

    if isinstance(obj, dict):
        for key in [
            "matrix_M",
            "gram_Q",
            "Q",
            "M",
            "matrix",
            "data",
            "rows",
            "values",
        ]:
            value = obj.get(key)
            if isinstance(value, list):
                return value

    return None

def get_square_matrix(obj):
    mat = get_matrix(obj)
    if mat is None:
        return None
    if not mat:
        return mat
    if all(isinstance(row, list) for row in mat):
        return mat
    return None

def main():
    errors = []

    print("Bubble witness alignment check")
    print("=" * 48)

    loaded = {}
    for name, path in FILES.items():
        loaded[name] = load_json(path)
        if loaded[name] is None:
            warn("missing " + str(path))
        else:
            ok("loaded " + str(path))

    bubble = loaded["bubble"]
    if bubble is None:
        return fail("bubble_witness_lens.json is required")

    name = bubble.get("name")
    status = bubble.get("status")
    base_object = bubble.get("base_object")
    not_theorem_object = bubble.get("not_theorem_object")
    stations = bubble.get("stations")
    phase_sequence = bubble.get("phase_sequence")
    anti_drift = bubble.get("anti_drift")

    print()
    print("Bubble lens header")
    print("name:", name)
    print("status:", status)
    print("base_object:", base_object)
    print("not_theorem_object:", not_theorem_object)

    if name != "bubble_collapse_witness_lens":
        errors.append("unexpected lens name")

    if status != "exploratory_lens":
        errors.append("status should be exploratory_lens")

    if not_theorem_object is not True:
        errors.append("not_theorem_object should be true")

    if not isinstance(stations, dict) or not stations:
        errors.append("stations must be a non-empty object")
        stations = {}

    if not isinstance(phase_sequence, list) or not phase_sequence:
        errors.append("phase_sequence must be a non-empty list")
        phase_sequence = []

    if not isinstance(anti_drift, list) or not anti_drift:
        errors.append("anti_drift must be a non-empty list")
        anti_drift = []

    print()
    print("Stations")
    all_station_indices = []
    for label in sorted(stations):
        vals = stations[label]
        print(label + ":", vals)

        if not isinstance(vals, list):
            errors.append("station " + label + " is not a list")
            continue

        for v in vals:
            if not isinstance(v, int):
                errors.append("station " + label + " contains non-int value")
            else:
                all_station_indices.append(v)

    duplicate_indices = sorted(
        x for x in set(all_station_indices)
        if all_station_indices.count(x) > 1
    )
    if duplicate_indices:
        errors.append("duplicate station indices: " + repr(duplicate_indices))

    if any(i < 0 for i in all_station_indices):
        errors.append("station index below zero")

    print()
    print("Station index count:", len(all_station_indices))
    print("Station indices:", sorted(all_station_indices))

    print()
    print("Phase sequence")
    for i, phase in enumerate(phase_sequence, start=1):
        print(str(i) + ":", phase)

    if len(phase_sequence) != len(stations):
        warn("phase count does not equal station count")

    expected_phases = [
        "latent_round",
        "defect_selection",
        "cup_fold",
        "throat_bridge",
        "rebound_jet",
        "relaxation",
    ]

    if phase_sequence != expected_phases:
        errors.append("phase_sequence differs from expected six-phase witness sequence")

    print()
    print("Anti-drift clauses:", len(anti_drift))
    for item in anti_drift:
        print("-", item)

    required_anti_drift_terms = [
        "does not change the theorem object",
        "exploratory analog",
        "Changing lens does not change transport identity",
    ]

    anti_text = "\n".join(str(x) for x in anti_drift)
    for term in required_anti_drift_terms:
        if term not in anti_text:
            errors.append("missing anti-drift term: " + term)

    matrix = get_matrix(loaded["matrix"])
    gram = get_square_matrix(loaded["gram"])

    print()
    print("Canonical data checks")

    if matrix is not None:
        row_count = len(matrix)
        col_count = len(matrix[0]) if row_count and isinstance(matrix[0], list) else None
        print("matrix_M shape:", row_count, "x", col_count)

        if row_count != 15:
            warn("matrix_M row count is not 15")

        if col_count != 30:
            warn("matrix_M column count is not 30")

        if all_station_indices:
            max_i = max(all_station_indices)
            if max_i >= row_count:
                errors.append("station index outside matrix_M rows")
            else:
                ok("all station indices fit matrix_M rows")
    else:
        warn("could not read matrix_M as a matrix")

    if gram is not None:
        n = len(gram)
        m = len(gram[0]) if n and isinstance(gram[0], list) else None
        print("gram_Q shape:", n, "x", m)

        if n != m:
            errors.append("gram_Q is not square")

        if all_station_indices:
            max_i = max(all_station_indices)
            if max_i >= n:
                errors.append("station index outside gram_Q rows")
            else:
                ok("all station indices fit gram_Q rows")
    else:
        warn("could not read gram_Q as a square matrix")

    theorem = loaded["theorem"]
    if theorem is not None:
        theorem_text = json.dumps(theorem, sort_keys=True)
        if "matrix_M" in theorem_text or "gram_Q" in theorem_text:
            ok("theorem_object appears to reference canonical theorem data")
        else:
            warn("theorem_object did not obviously expose matrix_M or gram_Q keys")
    else:
        warn("theorem_object.json not loaded")

    verify = loaded["verify"]
    if isinstance(verify, dict):
        verify_text = json.dumps(verify, sort_keys=True).lower()
        if "pass" in verify_text or "true" in verify_text:
            ok("verify_report contains pass/true-like values")
        else:
            warn("verify_report did not show obvious pass/true values")

    print()
    print("=" * 48)

    if errors:
        print("Alignment check failed")
        for e in errors:
            print(" -", e)
        return 1

    print("Alignment check passed")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
