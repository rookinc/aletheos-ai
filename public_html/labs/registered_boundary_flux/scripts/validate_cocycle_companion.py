#!/usr/bin/env python3
from pathlib import Path
import hashlib
import json
import subprocess
import sys

script = Path(__file__).resolve()
rbf = script.parents[1]
labs = script.parents[2]
public_html = labs.parent
aletheos = public_html.parent
cori = aletheos.parent

out = rbf / "artifacts" / "json"
out.mkdir(parents=True, exist_ok=True)

theorem_path = "public_html/json/gram_Q.json"
cocycle_path = "theorem/cocycle_data_aligned.json"

payloads = [
    "public_html/json/transport_cocycle.json",
    "public_html/json/gram_Q.json",
    "theorem/cocycle_data_aligned.json",
    "theorem/cocycle_status.json",
    "../research/thalean-graph-theory/05-thalean-stress-testing/artifacts/json/transport_cocycle_edges.json",
    "../research/thalean-graph-theory/05-thalean-stress-testing/artifacts/json/transport_cocycle_edges_validation_report.json",
    "../research/thalean-graph-theory/11-thalean-unification/lifts/g15_candidate_cocycle_edges.json",
    "../research/thalean-graph-theory/11-thalean-unification/artifacts/json/030_validate_candidate_cocycle_lift_against_old_checkers.json",
    "../research/thalean-graph-theory/11-thalean-unification/artifacts/json/038_strict_cocycle_data_origin_gap.json",
]

checker_jobs = [
    {
        "path": "checkers/check_cocycle_data.py",
        "args": [theorem_path, cocycle_path],
        "claim": "C1/C2 edge set and sign count",
    },
    {
        "path": "checkers/check_cocycle_holonomy.py",
        "args": [cocycle_path],
        "claim": "C4 odd holonomy exists",
    },
    {
        "path": "checkers/check_cocycle_min_support.py",
        "args": [cocycle_path],
        "claim": "C3 minimal support size",
    },
]

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def load_json(path):
    return json.loads(path.read_text(encoding="utf-8"))

def payload_record(rel):
    p = (aletheos / rel).resolve()
    rec = {"path": rel, "exists": p.exists()}
    if not p.exists():
        return rec

    rec["bytes"] = p.stat().st_size
    rec["sha256"] = sha(p)

    try:
        obj = load_json(p)
        rec["json_valid"] = True
        if isinstance(obj, dict):
            rec["keys"] = list(obj.keys())[:30]
            if isinstance(obj.get("edge_cocycle"), list):
                rec["edge_cocycle_count"] = len(obj["edge_cocycle"])
            if isinstance(obj.get("edge_records"), list):
                rec["edge_records_count"] = len(obj["edge_records"])
            if "valid" in obj:
                rec["valid"] = obj["valid"]
            if "ok" in obj:
                rec["ok"] = obj["ok"]
            if "verdict" in obj:
                rec["verdict"] = obj["verdict"]
    except Exception as exc:
        rec["json_valid"] = False
        rec["json_error"] = str(exc)

    return rec

payload_records = [payload_record(x) for x in payloads]

checker_records = []
for job in checker_jobs:
    rel = job["path"]
    p = aletheos / rel
    rec = {
        "path": rel,
        "claim": job["claim"],
        "args": job["args"],
        "exists": p.exists(),
    }

    if not p.exists():
        checker_records.append(rec)
        continue

    rec["sha256"] = sha(p)
    proc = subprocess.run(
        [sys.executable, rel] + job["args"],
        cwd=aletheos,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )

    rec["returncode"] = proc.returncode
    rec["passed"] = proc.returncode == 0
    rec["stdout"] = proc.stdout[-4000:]
    rec["stderr"] = proc.stderr[-4000:]

    try:
        parsed = json.loads(proc.stdout)
        rec["parsed"] = parsed
        if isinstance(parsed, dict) and "claims" in parsed:
            rec["claim_statuses"] = [c.get("status") for c in parsed["claims"]]
            rec["passed"] = rec["passed"] and all(c.get("status") == "pass" for c in parsed["claims"])
        elif isinstance(parsed, dict) and parsed.get("status"):
            rec["passed"] = rec["passed"] and parsed.get("status") == "pass"
    except Exception as exc:
        rec["parse_error"] = str(exc)

    checker_records.append(rec)

edge_validation = load_json(cori / "research/thalean-graph-theory/05-thalean-stress-testing/artifacts/json/transport_cocycle_edges_validation_report.json")
old_lift = load_json(cori / "research/thalean-graph-theory/11-thalean-unification/artifacts/json/030_validate_candidate_cocycle_lift_against_old_checkers.json")
origin_gap = load_json(cori / "research/thalean-graph-theory/11-thalean-unification/artifacts/json/038_strict_cocycle_data_origin_gap.json")

passed = (
    all(r.get("passed") for r in checker_records if r.get("exists"))
    and edge_validation.get("valid") is True
    and old_lift.get("ok") is True
)

receipt = {
    "schema": "cocycle_companion_validation_receipt.v1",
    "status": "verified_with_origin_gap_boundary" if passed else "failed",
    "passed": passed,
    "role": "companion memory layer for G60 projection work",
    "core_boundary": {
        "q_role": "Q sees overlap.",
        "cocycle_role": "The cocycle sees return memory / signed-lift holonomy.",
        "not_substitutes": True,
        "strict_origin_gap_closed": False,
        "origin_gap_verdict": origin_gap.get("verdict"),
        "honesty_rule": "Use the active aligned cocycle as a validated companion payload, but do not claim a fully closed strict source derivation while the origin-gap audit remains open."
    },
    "active_inputs": {
        "theorem_path": theorem_path,
        "cocycle_path": cocycle_path
    },
    "payloads": payload_records,
    "checker_runs": checker_records,
    "known_validations": {
        "transport_cocycle_edges_validation_valid": edge_validation.get("valid"),
        "transport_cocycle_edges_count": edge_validation.get("edge_record_count"),
        "transport_cocycle_unique_directed_edges": edge_validation.get("unique_directed_edge_count"),
        "candidate_lift_old_checker_ok": old_lift.get("ok"),
        "candidate_lift_edge_count": old_lift.get("edge_count"),
        "candidate_lift_sign_count": old_lift.get("sign_count"),
        "candidate_lift_minimal_support_size": old_lift.get("minimal_support_size"),
        "strict_origin_gap_real_writer_count": origin_gap.get("real_strict_writer_count")
    }
}

dest = out / "cocycle_companion.validation.v1.json"
dest.write_text(json.dumps(receipt, indent=2) + "\n", encoding="utf-8")

print("wrote", dest)
print("status", receipt["status"])
print("passed", receipt["passed"])
for r in checker_records:
    print("checker", r["path"], "passed", r.get("passed"), "rc", r.get("returncode"))

sys.exit(0 if passed else 1)
