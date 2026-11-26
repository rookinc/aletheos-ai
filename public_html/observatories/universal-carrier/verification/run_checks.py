"""Verify the supplied observatory against the frozen Light Loom experiment."""
import argparse
import json
from pathlib import Path
import subprocess
import sys

from check_packet import read_packet, verify
from verify_graph import verify_graph

ROOT = Path(__file__).resolve().parent


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("page", nargs="?", type=Path, default=ROOT / "index.html",
                        help="A saved Light Loom HTML page (default: the bundled reference page)")
    parser.add_argument("--separated", action="store_true", help="include the separate all-launch receiver solver")
    args = parser.parse_args()
    page = args.page.resolve()
    packet = read_packet(page)
    if packet != read_packet(ROOT / "packet.json"):
        raise ValueError("The supplied HTML packet differs from this release's packet.json")
    print(json.dumps(verify(packet)), flush=True)
    graph = verify_graph(packet, json.loads((ROOT / "identity.json").read_text()),
                         (ROOT / "AT_4valent_60.s6").read_text(),
                         json.loads((ROOT / "source/theorem_object.json").read_text()))
    print(json.dumps(graph), flush=True)
    replay = [sys.executable, str(ROOT / "replay_loom.py"), str(page)]
    if args.separated:
        replay.append("--separated")
    subprocess.run(replay, check=True)
    subprocess.run([sys.executable, str(ROOT / "verify-drawers.py"), str(ROOT), str(page)], check=True)
    print("PASS all requested numerical checks. Run verify-optics.js in the page for the browser checks.")


if __name__ == "__main__":
    if not __debug__:
        raise SystemExit("Run Python without -O so that the original generator assertions execute.")
    main()
