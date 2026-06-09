#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "finite_witnesses.json"

def evaluate(record):
    f = record["finite"]
    v = f.get("selected") or f["V"][0]

    projected_from = [
        a for a in f["A_I"]
        if f.get("pi", {}).get(a) == v
    ]

    matching = [
        a for a in projected_from
        if f["O"].get(v) == f["tau_A"].get(a)
    ]

    surface_coherent = bool(f["surface_coherent"].get(v))
    projected = bool(projected_from)
    observed_closed = bool(matching)
    witnessed = bool(f["W"].get(v))
    admitted = observed_closed and witnessed

    return {
        "surface_coherent": surface_coherent,
        "projected": projected,
        "observed_closed": observed_closed,
        "witnessed": witnessed,
        "admitted": admitted,
        "projected_from": projected_from,
        "matching_ambient": matching,
    }

def require(name, cond, detail):
    if not cond:
        raise SystemExit("FAIL " + name + ": " + detail)

def main():
    data = json.loads(DATA.read_text())
    systems = data["systems"]

    results = {}
    for name, record in systems.items():
        results[name] = evaluate(record)

    require(
        "surface_without_projection",
        results["surface_without_projection"]["surface_coherent"]
        and not results["surface_without_projection"]["projected"],
        str(results["surface_without_projection"]),
    )

    require(
        "projection_without_observed_closure",
        results["projection_without_observed_closure"]["projected"]
        and not results["projection_without_observed_closure"]["observed_closed"],
        str(results["projection_without_observed_closure"]),
    )

    require(
        "closed_without_admission",
        results["closed_without_admission"]["observed_closed"]
        and not results["closed_without_admission"]["admitted"],
        str(results["closed_without_admission"]),
    )

    require(
        "admitted_projection",
        results["admitted_projection"]["admitted"],
        str(results["admitted_projection"]),
    )

    print("finite_witnesses_ok=True")
    for name in systems:
        print("")
        print(name)
        for k, v in results[name].items():
            print("  " + k + "=" + str(v))

if __name__ == "__main__":
    main()
