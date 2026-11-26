#!/usr/bin/env python3
"""Run the independent checks from the unzipped experiment directory, without network access."""
from pathlib import Path
import os
import subprocess
import sys

root = Path(__file__).resolve().parents[1]
steps = [
    [sys.executable, "-B", "tests/paired_check.py"],
    ["node", "--test", "tests/flux.test.mjs"],
    [sys.executable, "-B", "tests/flux-audit.py"],
    ["node", "tests/sky-check.mjs"],
    [sys.executable, "-B", "tests/sky-archive.py"],
    ["node", "tests/heart-check.mjs"],
]
env = dict(os.environ, OPENBLAS_NUM_THREADS="1", OMP_NUM_THREADS="1")
for command in steps:
    print("Running", " ".join(command[1:]), flush=True)
    subprocess.run(command, check=True, env=env, cwd=root)
print("Passed all six check programs.")
