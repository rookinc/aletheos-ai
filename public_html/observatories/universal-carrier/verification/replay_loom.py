#!/usr/bin/env python3
"""Regenerate the Light Loom's finite contact experiment and compare a saved page."""
import argparse
import json
import math
import os
import re
import shutil
import subprocess
import sys
import tempfile
from fractions import Fraction
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "source"


class Scripts(HTMLParser):
    def __init__(self):
        super().__init__()
        self.scripts = []
        self.current = None

    def handle_starttag(self, tag, attrs):
        if tag == "script":
            self.current = []

    def handle_data(self, text):
        if self.current is not None:
            self.current.append(text)

    def handle_endtag(self, tag):
        if tag == "script" and self.current is not None:
            self.scripts.append("".join(self.current))
            self.current = None


def read_page(path):
    scripts = Scripts()
    scripts.feed(path.read_text(encoding="utf-8"))
    decoder = json.JSONDecoder()
    packet = probe = None
    for script in scripts.scripts:
        text = script.lstrip()
        if text.startswith("{"):
            data, _ = decoder.raw_decode(text)
            if isinstance(data, dict) and "rows" in data and "edges" in data:
                packet = data
        for name in ("D", "probe26"):
            match = re.search(r"\bconst\s+" + name + r"\s*=\s*(?=[\[{])", script)
            if match:
                value, _ = decoder.raw_decode(script[match.end():])
                if name == "D":
                    packet = value
                else:
                    probe = value
    if packet is None or probe is None:
        raise ValueError("Cannot find the contact packet and site-26 probe in " + str(path))
    return packet, probe


def equal(label, actual, expected):
    if actual != expected:
        raise ValueError(f"{label} differs from the released value")


def close_tree(label, actual, expected, tolerance):
    if isinstance(actual, dict) and isinstance(expected, dict):
        equal(label + ".keys", set(actual), set(expected))
        for key in expected:
            close_tree(label + "." + key, actual[key], expected[key], tolerance)
    elif isinstance(actual, list) and isinstance(expected, list):
        equal(label + ".length", len(actual), len(expected))
        for i, (a, b) in enumerate(zip(actual, expected)):
            close_tree(f"{label}[{i}]", a, b, tolerance)
    elif not math.isclose(actual, expected, rel_tol=0, abs_tol=tolerance):
        raise ValueError(f"{label}: {actual} vs {expected}; tolerance {tolerance}")


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def run(args):
    import numpy as np

    page_packet, page_probe = read_page(args.page)
    with tempfile.TemporaryDirectory(prefix="light-loom-") as path:
        tmp = Path(path)
        shutil.copytree(SOURCE, tmp / "source")
        (tmp / "results").mkdir()
        programs = ["pentagon.py", "experiment.py", "reciprokum.py", "verify.py", "factorization.py"]
        if args.separated:
            programs.append("separated_tables.py")
            archive = Path("upstream/Thalean-Waltz-Separated-Receiver-Test.zip")
            (tmp / "upstream").mkdir()
            shutil.copyfile(ROOT / archive, tmp / archive)
        for name in programs:
            shutil.copyfile(ROOT / name, tmp / name)
        env = dict(os.environ, OPENBLAS_NUM_THREADS="1", OMP_NUM_THREADS="1", PYTHONOPTIMIZE="")
        def execute(name, *arguments):
            return subprocess.run([sys.executable, name, *arguments], cwd=tmp, env=env,
                                  stdout=subprocess.PIPE, check=True, text=True).stdout

        # Rebuild the chosen exact seed before the contact experiment reads it.
        built = json.loads(execute("pentagon.py", "source"))
        seed_path = tmp / "source/pentagon.json"
        seed = read_json(seed_path)
        fields = {"action_index": "native_action_index", "cycle": "cycle", "Q": "Q0",
                  "V": "V0", "T": "rational_parameter", "c": "c", "period_in_contacts": "native_period",
                  "energy": "energy", **{k: k for k in ("cos_hold","sin_hold","cos_free","sin_free")}}
        for target, generated in fields.items():
            equal("pentagon." + target, built[generated], seed[target])
            seed[target] = built[generated]
        seed_path.write_text(json.dumps(seed) + "\n", encoding="utf-8")
        print("PASS rational launch, ten-site itinerary and first-zero held/free update from native tensors", flush=True)
        execute("experiment.py")
        rows = read_json(tmp / "results/experiment.json")["contact_trace"]
        equal("row count", len(rows), len(page_packet["rows"]))
        for i, (actual, published) in enumerate(zip(rows, page_packet["rows"])):
            equal(f"row {i}.keys", set(actual), set(published))
            for key in actual:
                equal(f"row {i}.{key}", actual[key], published[key])
        print(f"PASS {len(rows)} complete rows, including q, v, rho, rational span, E and CHSH", flush=True)
        with np.load(SOURCE / "native_tensor_arrays.npz", allow_pickle=False) as arrays:
            equal("edges", arrays["canonical_edges"].tolist(), page_packet["edges"])
        equal("pi", read_json(SOURCE / "pi.json"), page_packet["pi"])
        equal("C (six-axis conference matrix)", read_json(SOURCE / "conference.json"), page_packet["C"])
        with np.load(SOURCE / "rational.npz", allow_pickle=False) as kernels:
            probes = [float((kernels["G"] @ row["rho"])[26] / kernels["Gden"]) for row in rows]
        close_tree("site-26 probe", probes, page_probe, 1e-14)
        print(f"PASS edges, quotient map, conference matrix and ten site-26 Green probes (absolute tolerance 1e-14)", flush=True)
        execute("reciprokum.py")
        equal("reciprocal", read_json(tmp / "results/reciprokum.json"), page_packet["recip"])
        print("PASS ten exact h·v values and both receiver-to-source interventions", flush=True)
        execute("factorization.py")
        factorization = read_json(tmp / "results/factorization.json")
        equal("chamber score weights", list(map(Fraction, factorization["chamber_score_weights"])),
              [Fraction(13, 10) if i in (1, 6, 12) else Fraction(14, 5) for i in range(15)])
        execute("verify.py")
        direct = read_json(tmp / "results/independent.json")
        close_tree("Bohr commutator norm", direct["commutator_spectral_norm"], 2, 2e-13)
        print("PASS exact three-chamber factorization, 40 projector tables, 11 polarization probes "
              f"and commutator norm 2 (maximum table error {direct['max_projector_table_error']:.3g})", flush=True)
        if args.separated:
            print("Running the separate K=3, F=3, all-launch receiver solver…", flush=True)
            execute("separated_tables.py")
            separated = read_json(tmp / "results/separated-tables.json")
            close_tree("separated", separated, page_packet["separated"], 1e-11)
            print(f"PASS {len(separated)} all-launch preparations, joint tables, E, S and marginal changes (absolute tolerance 1e-11)")
        else:
            print("Skipped the separate all-launch receiver solver. Add --separated to include it.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("page", type=Path, nargs="?", default=ROOT / "index.html",
                        help="Light Loom HTML to verify (default: index.html beside this script)")
    parser.add_argument("--separated", action="store_true", help="also regenerate independent all-launch receiver tables (requires SciPy)")
    run(parser.parse_args())
