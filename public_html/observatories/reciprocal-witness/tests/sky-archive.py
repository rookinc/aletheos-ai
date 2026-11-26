"""Verify the browser's four local contractions against the unmodified paper attachment."""
from hashlib import sha256
import importlib.util
import json
from pathlib import Path
import subprocess
import tempfile
import zipfile

ROOT = Path(__file__).resolve().parents[1]
PIN = "0180cf7c95c07dbce5dff772a327822357dccbc316d8eb0cf377a3aa12bd3bfa"


def main():
    original = ROOT / "data" / "sky-triad-comparator.zip"
    assert sha256(original.read_bytes()).hexdigest() == PIN
    with tempfile.TemporaryDirectory() as tmp:
        directory = Path(tmp)
        with zipfile.ZipFile(original) as z:
            for name in z.namelist():
                if Path(name).is_absolute() or ".." in Path(name).parts:
                    raise ValueError(name)
            z.extractall(directory)
        spec = importlib.util.spec_from_file_location("native_triad",directory/"triad_comparator.py")
        audit = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(audit)
        actual = audit.check(directory/"inputs")
        assert actual == json.loads((directory/"results.json").read_bytes())
        assert (actual["directed_edges"],actual["lawful_windows"]) == (240,960)
        assert (actual["positive_alignments"],actual["negative_alignments"]) == (480,480)

    js = """
      import {sky} from './sky.js';
      console.log(JSON.stringify([1,-1].flatMap(reference => {
        const {fork} = sky({reference});
        return fork.candidates.map(c => ({
          previous_site:fork.reference.triad[0], next_site:c.exit,
          reference:fork.reference.vector, candidate:c.vector,
          normalized_contrast:c.normalizedOverlap
        }));
      })));
    """
    observed = json.loads(subprocess.check_output(["node","--input-type=module","-e",js],cwd=ROOT))
    order = lambda row: (row["previous_site"],row["next_site"])
    assert sorted(observed,key=order) == sorted(actual["fork_59_to_17"],key=order)
    print("Archive SHA-256; 240 edges; 960 windows; 480 signs each; browser agrees on every 59→17 overlap.")


if __name__ == "__main__":
    main()
