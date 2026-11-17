#!/usr/bin/env bash
# One verified HTML file arrives on stdin. No global server configuration changes.
set -u
operation=${1:-install}
target=${2:-"$HOME/www/observatories/thalean-observer"}
backup_root=${3:-"$HOME/.thalean-observer-backups"}
expected=8a54178fda15715f4d198a897b2028279e081f1f14bf2427ef1806bf978f9135
stop() { printf 'Observer server: %s\n' "$*" >&2; exit 1; }
digest() { local r; r=$(sha256sum -- "$1") || return 1; printf '%s' "${r%% *}"; }
case "$operation" in install|verify|rollback) ;; *) stop 'Unknown operation.' ;; esac
parent=${target%/*}
index=$target/index.html
[ -d "$parent" ] && [ ! -L "$parent" ] || stop 'Existing regular observatories directory required; expected ~/www/observatories.'
if [ -e "$target" ] || [ -L "$target" ]; then
  [ -d "$target" ] && [ ! -L "$target" ] || stop 'Target is not a regular directory; no changes made.'
fi
if [ -e "$index" ] || [ -L "$index" ]; then
  [ -f "$index" ] && [ ! -L "$index" ] || stop 'Target index is not a regular file.'
  current=$(digest "$index") || stop 'Cannot hash current page.'
  [ "$current" = "$expected" ] || stop "Unknown existing page ($current); replacement refused."
else
  current=absent
fi
if [ "$operation" = verify ]; then
  [ "$current" = "$expected" ] || stop 'This release is not installed.'
  printf 'Installed release verified on server.\nLIVE_SHA256=%s\n' "$expected"
  exit 0
fi
lock=$parent/.thalean-observer-deploy-lock
mkdir -m 700 -- "$lock" || stop 'Deployment lock exists; no changes made.'
stage=
cleanup() { if [ -n "$stage" ]; then rm -f -- "$stage"; fi; rmdir -- "$lock"; }
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM HUP
if [ -e "$backup_root" ] || [ -L "$backup_root" ]; then
  [ -d "$backup_root" ] && [ ! -L "$backup_root" ] || stop 'Backup directory is not a regular directory.'
else
  mkdir -m 700 -- "$backup_root" || stop 'Cannot create private backup directory.'
fi
marker=$backup_root/before-${expected}.absent
saved=$backup_root/rolled-back-${expected}.html
if [ -e "$marker" ] || [ -L "$marker" ]; then
  [ -f "$marker" ] && [ ! -L "$marker" ] && [ "$(cat -- "$marker")" = absent ] || stop 'Absence record is invalid.'
fi
if [ "$operation" = rollback ]; then
  [ -f "$marker" ] && [ ! -L "$marker" ] || stop 'No recorded absent-page state; rollback refused.'
  if [ "$current" = absent ]; then
    printf 'Original absent-page state is already restored.\nLIVE_ABSENT=1\n'
    exit 0
  fi
  [ "$(digest "$index")" = "$expected" ] && [ ! -L "$index" ] || stop 'Page changed before rollback.'
  if [ -e "$saved" ] || [ -L "$saved" ]; then
    [ -f "$saved" ] && [ ! -L "$saved" ] && [ "$(digest "$saved")" = "$expected" ] || stop 'Existing retained release differs.'
  fi
  mv -T -- "$index" "$saved" || stop 'Cannot retain release outside the webroot.'
  [ "$(digest "$saved")" = "$expected" ] || stop 'Retained release verification failed.'
  printf 'Prior absence restored; release retained at %s\nLIVE_ABSENT=1\n' "$saved"
  exit 0
fi
stage=$(mktemp "$parent/.thalean-observer-upload.XXXXXXXX") || stop 'Cannot stage upload.'
cat > "$stage" || stop 'Cannot receive upload.'
[ "$(digest "$stage")" = "$expected" ] || stop 'Upload checksum differs; no page installed.'
if [ "$current" = "$expected" ]; then
  [ "$(digest "$index")" = "$expected" ] && [ ! -L "$index" ] || stop 'Page changed during verification.'
  printf 'Observer Observatory v1.0.0 is already installed.\nLIVE_SHA256=%s\n' "$expected"
  exit 0
fi
if [ -d "$target" ]; then
  entry=$(find "$target" -mindepth 1 -maxdepth 1 -print -quit) || stop 'Cannot inspect target directory.'
  [ -z "$entry" ] || stop 'Nonempty unrecognized target directory; no changes made.'
else
  mkdir -m 755 -- "$target" || stop 'Cannot create new observatory directory.'
fi
if [ ! -e "$marker" ]; then
  (umask 077; printf 'absent\n' > "$marker") || stop 'Cannot record the pre-install absent-page state.'
fi
chmod 644 -- "$stage" || stop 'Cannot set page permissions.'
# A hard link publishes one complete file atomically and refuses any existing path.
ln -T -- "$stage" "$index" || stop 'Target appeared during upload; no replacement made.'
[ "$(digest "$index")" = "$expected" ] || stop 'Installed page checksum differs.'
printf 'Observer Observatory v1.0.0 installed; prior absence recorded for rollback.\nLIVE_SHA256=%s\n' "$expected"
