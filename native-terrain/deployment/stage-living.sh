#!/usr/bin/env bash
# Additive SIM-003 staging; pass --activate to switch only /aletheos/living.html.
# This file uses explicit error checks and is compatible with Termux bash.
packet_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd) || exit 1
mode=stage
if [ "${1:-}" = "--activate" ]; then
  mode=activate
  shift
fi
if [ "$#" -gt 1 ]; then
  printf '%s\n' 'Usage: bash deployment/stage-living.sh [--activate] [ssh-alias]' >&2
  exit 1
fi
host=${1:-gurtiamy}
case "$host" in
  ''|-*|*[!a-zA-Z0-9_.@-]*) printf '%s\n' 'Invalid SSH alias' >&2; exit 1 ;;
esac
python3 "$packet_root/deployment/verify-files.py" "$packet_root/site" || exit 1
stamp=$(date -u +%Y%m%dT%H%M%SZ) || exit 1
upload_dir="/home2/gurtiamy/aletheos-living-upload-$stamp-$$"
live_dir=/home2/gurtiamy/public_html/dev.rook.ca/aletheos
backup_dir=/home2/gurtiamy/aletheos-living-backups
ssh "$host" "test -d '$live_dir' && test ! -e '$upload_dir' && mkdir -m 700 '$upload_dir'" || exit 1
scp -r "$packet_root/site" "$host:$upload_dir/" || exit 1
scp "$packet_root/deployment/install-living.py" "$host:$upload_dir/install-living.py" || exit 1
ssh "$host" "python3 '$upload_dir/install-living.py' '$mode' --source '$upload_dir/site' --live '$live_dir' --backups '$backup_dir'" || exit 1
printf '%s\n' "Remote installer retained at $upload_dir/install-living.py" \
  'Verify served hashes and browser behavior before recording deployment success.'
