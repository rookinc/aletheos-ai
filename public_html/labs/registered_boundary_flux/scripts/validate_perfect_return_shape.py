from __future__ import annotations

import hashlib
import json
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
SHAPE_PATH = ROOT / "artifacts" / "json" / "perfect_return_shape.v1.json"
RECEIPT_PATH = ROOT / "artifacts" / "json" / "perfect_return_shape.validation.v1.json"


EXPECTED_PATH = ["W", "X", "Y", "Z", "T", "I", "W"]
EXPECTED_STATIONS = ["W", "X", "Y", "Z", "T", "I"]
EXPECTED_EDGE_LABELS = ["WX", "XY", "YZ", "ZT", "TI", "IW"]
EXPECTED_KINDS = ["diad", "coupler", "diad", "coupler", "diad", "coupler"]
EXPECTED_DIADS = ["WX", "YZ", "TI"]
EXPECTED_COUPLERS = ["XY", "ZT", "IW"]


def read_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def sha256_file(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def ok(name: str, passed: bool, detail: str) -> dict[str, Any]:
    return {
        "name": name,
        "passed": bool(passed),
        "detail": detail,
    }


def main() -> None:
    shape = read_json(SHAPE_PATH)
    checks = []

    source = shape.get("source_object", {})
    projection = shape.get("projection", {})
    body = shape.get("shape", {})
    contract = shape.get("render_contract", {})

    path = body.get("closed_path", [])
    stations = body.get("station_order", [])
    edges = body.get("edges", [])
    triad = body.get("triad_of_diads", {})

    labels = [e.get("label") for e in edges]
    kinds = [e.get("kind") for e in edges]
    derived = [str(e.get("from", "")) + str(e.get("to", "")) for e in edges]

    checks.append(ok(
        "source_graph_is_g60",
        source.get("graph_id") == "AT4val[60,6]",
        "Canonical source graph id must be AT4val[60,6].",
    ))

    checks.append(ok(
        "source_scaffolding_is_5_3_4",
        source.get("scaffolding") == "5,3,4",
        "Canonical scaffolding must be 5,3,4.",
    ))

    checks.append(ok(
        "projection_declares_g60",
        "G60" in projection.get("projection_of", ""),
        "Projection must explicitly declare G60 source.",
    ))

    checks.append(ok(
        "path_exact",
        path == EXPECTED_PATH,
        "Closed path must be W-X-Y-Z-T-I-W.",
    ))

    checks.append(ok(
        "stations_exact",
        stations == EXPECTED_STATIONS,
        "Station order must be W,X,Y,Z,T,I.",
    ))

    checks.append(ok(
        "edge_labels_exact",
        labels == EXPECTED_EDGE_LABELS,
        "Edge labels must be WX,XY,YZ,ZT,TI,IW.",
    ))

    checks.append(ok(
        "edge_labels_derived_from_path",
        derived == EXPECTED_EDGE_LABELS,
        "Each edge label must equal from+to from the closed path.",
    ))

    checks.append(ok(
        "edge_kinds_alternate",
        kinds == EXPECTED_KINDS,
        "Edge kinds must alternate diad,coupler,diad,coupler,diad,coupler.",
    ))

    checks.append(ok(
        "triad_of_diads_exact",
        [d.get("label") for d in triad.get("diads", [])] == EXPECTED_DIADS,
        "Triad of diads must be WX,YZ,TI.",
    ))

    checks.append(ok(
        "couplers_exact",
        [c.get("label") for c in triad.get("couplers", [])] == EXPECTED_COUPLERS,
        "Couplers must be XY,ZT,IW.",
    ))

    checks.append(ok(
        "return_closes_on_IW",
        bool(edges[-1].get("closes_return")) and edges[-1].get("label") == "IW",
        "The final edge must be IW and must close return to W.",
    ))

    checks.append(ok(
        "observer_only",
        contract.get("no_user_attempted_coupling") is True,
        "This MVP must remain observer-only.",
    ))

    checks.append(ok(
        "no_motion_without_cycle_edge",
        contract.get("no_motion_without_cycle_edge") is True,
        "Motion must be restricted to declared cycle edges.",
    ))

    checks.append(ok(
        "projection_not_canonical_object",
        projection.get("status") == "projection_of_G60",
        "Shape must identify itself as a projection, not the canonical object.",
    ))

    passed = all(c["passed"] for c in checks)

    receipt = {
        "schema": "perfect_return_shape.validation.v1",
        "status": "verified" if passed else "failed",
        "passed": passed,
        "validator": "registered_boundary_flux/scripts/validate_perfect_return_shape.py",
        "shape": {
            "path": "registered_boundary_flux/artifacts/json/perfect_return_shape.v1.json",
            "sha256": sha256_file(SHAPE_PATH),
        },
        "checks": checks,
        "summary": {
            "check_count": len(checks),
            "passed_count": sum(1 for c in checks if c["passed"]),
            "failed_count": sum(1 for c in checks if not c["passed"]),
        },
    }

    RECEIPT_PATH.write_text(json.dumps(receipt, indent=2) + "\n", encoding="utf-8")
    print("wrote", RECEIPT_PATH)
    print("status", receipt["status"])
    print("passed", receipt["summary"]["passed_count"], "of", receipt["summary"]["check_count"])

    if not passed:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
