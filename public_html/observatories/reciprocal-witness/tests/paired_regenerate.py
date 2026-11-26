#!/usr/bin/env python3
"""Rebuild the public browser fixture from the original sealed TOM-PHY-029 bundle.

Python 3.11+. Run from anywhere:
  python paired_regenerate.py /path/to/TOM-PHY-029.zip --check
  python paired_regenerate.py /path/to/TOM-PHY-029.zip --write
"""

import argparse
import hashlib
import json
from pathlib import Path
import runpy
import subprocess
import sys
from tempfile import TemporaryDirectory
from zipfile import ZipFile

ORIGINAL = "cbc8997a55882ebc7bd6145c4cacecac137d124e01a889ebe77e5dd915a65778"
FIXTURE = Path(__file__).resolve().parents[1] / "data" / "paired-cover.js"


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def build(bundle, work):
    if digest(bundle) != ORIGINAL:
        raise ValueError("TOM-PHY-029 archive SHA-256 mismatch")
    with ZipFile(bundle) as archived:
        archived.extractall(work)
    root = work / "TOM-PHY-029"
    result = work / "029-replayed.json"
    subprocess.run([sys.executable, "-B", "audit.py", "--output", str(result)], cwd=root, check=True)
    sealed = root / "receipt.json"
    if result.read_bytes() != sealed.read_bytes():
        raise ValueError("029 upstream replay differs from sealed receipt")
    receipt = json.loads(sealed.read_bytes())
    a29 = runpy.run_path(str(root / "audit.py"))
    tmp = work / "chain"
    tmp.mkdir()
    a23, prior, source, sites, captures, cochains, compare, _ = a29["sources"](tmp)
    correct = next(c for c in receipt["effect"]["all_matched_controls"]
                   if c["fork"] == 480 and c["checkpoint"] == 420 and
                   c["test"] == c["reference"] == c["cover_triangle_sign"] == 1 and
                   c["start_sheet_labels"] == [0, 0] and not c["diagonal_a_representative"])
    ref = correct["same_reference_endpoint"]
    calibration = next(c for c in receipt["effect"]["marked_receiver_states"]
                       if c["reference_endpoint"] == ref and c["cover_triangle_sign"] == 1)
    cochain = cochains["Q8", 1]
    index, projection, deck, adj = prior["product_cover"](source, cochain)
    records, _ = a29["match_registers"](a23, source, sites, captures, compare)
    routes = {}
    for first, (route, tape) in records[480, 420].items():
        lifted = a29["lift_tape"](tape, tuple(range(60)), (0, 0), cochain, index, projection, adj)
        assert first[1] == tape[1]["G1800_vertex"]
        routes[route] = {
            "base": [p["G1800_vertex"] for p in tape],
            "ordered": [p["ordered_G60_point"] for p in tape],
            "lift": lifted,
        }
    r27 = tmp / "TOM-PHY-027" / "receipt.json"
    fork_rows = [
        {key: c[key] for key in ("checkpoint", "test_triangle_return", "reference_triangle_return",
                                 "echo", "aim", "first_edge", "continuation_end", "first_successor_common_tick")}
        for c in json.loads(r27.read_bytes())["controlled_fork_cases"] if c["fork"] == 480]
    return {
        "source": {
            "audit": "TOM-PHY-029", "receiptSHA256": digest(sealed), "bundleSHA256": ORIGINAL,
            "forkReceiptSHA256": digest(r27), "runnerSHA256": digest(root / "audit.py"),
            "parentBundleSHA256": digest(root / "sources" / "TOM-PHY-028.zip"),
            "denominator": receipt["update_denominator"], "cover": "Q8+", "fork": 480,
            "checkpoint": 420, "test": 1, "reference": 1, "fixedEcho": correct["fixed_echo"],
            "gauge": "identity", "launchSheets": [0, 0], "routeClock": list(range(14, 20))
        },
        "calibration": calibration, "routes": routes, "forkRows": fork_rows,
        "adj": [sorted(row) for row in adj], "deck": deck, "projection": projection,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("bundle", type=Path)
    output = parser.add_mutually_exclusive_group(required=True)
    output.add_argument("--check", action="store_true")
    output.add_argument("--write", action="store_true")
    args = parser.parse_args()
    with TemporaryDirectory() as temp:
        cover = build(args.bundle.resolve(), Path(temp))
    # Plain module syntax also supports file-based bundlers without requiring JSON-module imports.
    formatted = "// Generated from the sealed TOM-PHY-029 replay. See tests/paired_regenerate.py.\n"
    formatted += "export default " + json.dumps(cover, separators=(",", ":")) + ";\n"
    if args.write:
        FIXTURE.write_bytes(formatted.encode())
    elif formatted.encode() != FIXTURE.read_bytes():
        raise ValueError("Regenerated cover differs from the public fixture")
    print(f"{digest(FIXTURE)}  {FIXTURE.name} | {len(cover['adj'])} cover sites | archived 029 receipt matched")


if __name__ == "__main__":
    main()
