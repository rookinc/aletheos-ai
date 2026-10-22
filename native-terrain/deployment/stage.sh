#!/usr/bin/env bash
# Termux-compatible staging only. Run from the extracted release directory.
packet_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd) || exit 1
python "$packet_root/deployment/verify-files.py" "$packet_root/site" || exit 1
stamp=$(date -u +%Y%m%dT%H%M%SZ) || exit 1
release_parent=/home2/gurtiamy/public_html/dev.rook.ca
stage_dir="$release_parent/aletheos-stage-$stamp"
backup_dir="/home2/gurtiamy/aletheos-rollback-$stamp"
ssh gurtiamy "test -d '$release_parent/aletheos' && test ! -e '$stage_dir' && test ! -e '$backup_dir' && mkdir '$stage_dir'" || exit 1
scp -r "$packet_root/site/." "gurtiamy:$stage_dir/" || exit 1
scp "$packet_root/deployment/verify-files.py" "gurtiamy:/home2/gurtiamy/aletheos-verify-$stamp.py" || exit 1
ssh gurtiamy "python3 '/home2/gurtiamy/aletheos-verify-$stamp.py' '$stage_dir'" || exit 1
# Copy the complete deployed directory outside the public web root, then compare every file.
ssh gurtiamy "cp -a '$release_parent/aletheos' '$backup_dir' && diff -qr '$release_parent/aletheos' '$backup_dir'" || exit 1
printf '%s\n' "Staged and hash-verified: $stage_dir" "Rollback copy compared: $backup_dir" "HOLD: manuscript and browser release gates remain open. Live directory was not replaced."
