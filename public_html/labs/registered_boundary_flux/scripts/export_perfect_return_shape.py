from __future__ import annotations

import hashlib
import json
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "artifacts" / "json" / "perfect_return_shape.v1.json"

CELL_PATH = ROOT / "data" / "perfect_return_cell.v1.json"
BINDING_PATH = ROOT / "data" / "g60_source_binding.v1.json"


def read_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def sha256_file(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def edge_label(a: str, b: str) -> str:
    return a + b


def main() -> None:
    cell = read_json(CELL_PATH)
    binding = read_json(BINDING_PATH)

    cycle = cell["cycle"]
    path = cycle["closed_path"]
    declared_edges = cycle["edges"]

    derived_edges = []
    for i in range(len(path) - 1):
        a = path[i]
        b = path[i + 1]
        label = edge_label(a, b)

        match = [e for e in declared_edges if e["label"] == label]
        if len(match) != 1:
            raise SystemExit("missing or duplicate declared edge: " + label)

        e = match[0]
        derived_edges.append({
            "index": i,
            "from": a,
            "to": b,
            "label": label,
            "kind": e["kind"],
            "closes_return": bool(a == "I" and b == "W"),
        })

    payload = {
        "schema": "perfect_return_shape.v1",
        "status": "exported",
        "source_object": binding["canonical_source"],
        "projection": {
            "id": "triad_of_diads_cyclic_return",
            "status": "projection_of_G60",
            "path": path,
            "path_string": "-".join(path),
            "projection_of": "G60 / AT4val[60,6] / 5,3,4 scaffolding",
            "boundary": "This shape is a projection witness, not the canonical source object."
        },
        "shape": {
            "kind": "perfect_return_cell",
            "station_order": cycle["stations"],
            "closed_path": path,
            "edges": derived_edges,
            "triad_of_diads": cell.get("triad_of_diads", {}),
        },
        "render_contract": cell.get("render_contract", {}),
        "provenance": {
            "generated_by": "registered_boundary_flux/scripts/export_perfect_return_shape.py",
            "inputs": [
                {
                    "path": "registered_boundary_flux/data/perfect_return_cell.v1.json",
                    "sha256": sha256_file(CELL_PATH),
                },
                {
                    "path": "registered_boundary_flux/data/g60_source_binding.v1.json",
                    "sha256": sha256_file(BINDING_PATH),
                },
            ],
        },
    }

    OUT.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print("wrote", OUT)


if __name__ == "__main__":
    main()
