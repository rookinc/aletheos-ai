#!/usr/bin/env bash
# Run inside the authenticated Bluehost session. Explicit checks; no set -e.
source_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd) || exit 1
repo_root=$(CDPATH= cd -- "$source_root/.." && pwd) || exit 1
live_input=${1:-"$HOME/www/dev.rook.ca/aletheos"}
live_root=$(CDPATH= cd -- "$live_input" && pwd -P) || exit 1
if [ ! -f "$live_root/index.html" ] || [ ! -f "$live_root/data/g60.json" ]; then
  printf '%s\n' 'STOP: existing Native Terrain index and G60 fixture were not found.' >&2
  exit 1
fi
python_bin=
for candidate in python3 python3.13 python3.12 python3.11 python3.10 python3.9; do
  if command -v "$candidate" >/dev/null 2>&1 && "$candidate" -c 'import sys; sys.exit(0 if sys.version_info >= (3,9) else 1)' 2>/dev/null; then
    python_bin=$candidate
    break
  fi
done
if [ -z "$python_bin" ]; then
  printf '%s\n' 'STOP: Python 3.9+ is required. No deployment changes made.' >&2
  exit 1
fi
printf 'Live directory: %s\nPython: %s\n' "$live_root" "$python_bin"
"$python_bin" "$source_root/tools/build.py" || exit 1
packet="$repo_root/dist/living-geometry-packet"
"$python_bin" "$source_root/deployment/verify-files.py" "$packet/site" || exit 1
# One receipt is retained in this fresh source checkout. Reuse by rerunning the
# installer directly with its printed receipt; do not overwrite this record.
receipt="$repo_root/sim003-host-activation.json"
if [ -e "$receipt" ]; then
  printf 'STOP: existing activation record at %s; inspect before another activation.\n' "$receipt" >&2
  exit 1
fi
"$python_bin" "$source_root/deployment/install-living.py" activate \
  --source "$packet/site" --live "$live_root" \
  --backups "$HOME/aletheos-living-backups" > "$receipt" || exit 1
cat "$receipt" || exit 1
release_name=$("$python_bin" -c 'import json,pathlib,sys; print(pathlib.Path(json.load(open(sys.argv[1]))["release"]).name)' "$receipt") || exit 1
"$python_bin" "$source_root/deployment/verify-served.py" "$packet/site" \
  "https://dev.rook.ca/aletheos/$release_name/" \
  --entry-url https://dev.rook.ca/aletheos/living.html || exit 1
printf '%s\n' 'DEPLOYMENT BYTES VERIFIED — browser execution still needs checking.' \
  'Open https://dev.rook.ca/aletheos/living.html' \
  "Keep $receipt and the printed activation_receipt for rollback."
