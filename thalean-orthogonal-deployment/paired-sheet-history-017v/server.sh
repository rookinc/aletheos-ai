#!/usr/bin/env bash
# Executed over the owner's existing SSH session. HTML arrives on stdin.
set -u
operation=${1:-install}
target=${2:-"$HOME/www/observatories/thalean-orthogonal"}
expected=ebe248b6724f3e2727004b126b1b78f4bc6abb2670b830a4ce7a8406d573b44f
previous_preset=e4c7a3dea532919fa33021ea2233d3a5e203479e72c1b26e21883ba5d6408f54
previous_v11=08f203d1377e5c50a71b6f7d61f5c0771c660d2188a8726347e9a9cf41bd78db
stop() { printf 'Orthogonal server: %s\n' "$*" >&2; exit 1; }
digest() { local result; result=$(sha256sum -- "$1") || return 1; printf '%s' "${result%% *}"; }
known_previous() { [ "$1" = "$previous_preset" ] || [ "$1" = "$previous_v11" ]; }
case "$operation" in install|rollback) ;; *) stop 'Use install or rollback.' ;; esac
parent=${target%/*}
[ -d "$parent" ] && [ ! -L "$parent" ] || stop 'Existing regular observatories directory required.'
[ -d "$target" ] && [ ! -L "$target" ] || stop 'Existing regular observatory directory required.'
index=$target/index.html
backup=$target/index.before-sheet-history-017v.html
[ -f "$index" ] && [ ! -L "$index" ] || stop 'Existing regular index.html required.'
lock=$target/.orthogonal-deploy-lock
mkdir -m 700 -- "$lock" || stop 'Deployment lock exists; no changes made.'
stage=
cleanup() { if [ -n "$stage" ]; then rm -f -- "$stage"; fi; rmdir -- "$lock"; }
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM HUP
current=$(digest "$index") || stop 'Cannot hash current page.'

if [ "$operation" = rollback ]; then
  [ -f "$backup" ] && [ ! -L "$backup" ] || stop 'Verified backup is unavailable.'
  restore=$(digest "$backup") || stop 'Cannot hash backup.'
  known_previous "$restore" || stop 'Backup is not a known previous release.'
  if [ "$current" = "$restore" ]; then
    printf 'Previous page is already restored.\nLIVE_SHA256=%s\n' "$restore"
    exit 0
  fi
  [ "$current" = "$expected" ] || stop 'Current page differs from this release; rollback refused.'
  stage=$(mktemp "$target/.sheet-history-rollback.XXXXXXXX") || stop 'Cannot stage rollback.'
  cp -- "$backup" "$stage" || stop 'Cannot copy backup.'
  [ "$(digest "$stage")" = "$restore" ] || stop 'Staged rollback differs.'
  chmod 644 -- "$stage" || stop 'Cannot set permissions.'
  [ "$(digest "$index")" = "$expected" ] && [ ! -L "$index" ] || stop 'Page changed during rollback.'
  mv -T -- "$stage" "$index" || stop 'Cannot restore previous page.'
  printf 'Previous page restored; backup retained.\nLIVE_SHA256=%s\n' "$restore"
  exit 0
fi

stage=$(mktemp "$target/.sheet-history-upload.XXXXXXXX") || stop 'Cannot stage upload.'
cat > "$stage" || stop 'Cannot receive upload.'
[ "$(digest "$stage")" = "$expected" ] || stop 'Upload checksum differs; no replacement made.'
if [ "$current" = "$expected" ]; then
  printf 'Paired Sheet History is already installed.\nLIVE_SHA256=%s\n' "$expected"
  exit 0
fi
known_previous "$current" || stop "Unknown existing page ($current); no replacement made."
if [ -e "$backup" ] || [ -L "$backup" ]; then
  [ -f "$backup" ] && [ ! -L "$backup" ] || stop 'Backup path is not a regular file.'
  [ "$(digest "$backup")" = "$current" ] || stop 'Existing backup differs; no replacement made.'
else
  ln -T -- "$index" "$backup" || stop 'Cannot preserve the previous page.'
fi
chmod 644 -- "$stage" || stop 'Cannot set page permissions.'
[ "$(digest "$index")" = "$current" ] && [ ! -L "$index" ] || stop 'Page changed during upload.'
mv -T -- "$stage" "$index" || stop 'Cannot install release.'
printf 'Paired Sheet History installed; previous page preserved.\nLIVE_SHA256=%s\n' "$expected"
