#!/usr/bin/env bash
# Run from any directory after cloning the repository. No remote login is saved.
# Local Bash works on Termux/macOS/Linux; Bluehost supplies Linux ln -T.
set -u
remote=${UFT4_SSH_TARGET:-gurtiamy}
previous=6e07b6eff9a9790500a462c0f6a09bb7dade2beae7151631b4f1b7ab7d1db99f
older=07c3c401fef9b7d3fdc4217c33b05135dec5c5e8f16e084da6d362686221ee26
oldest=8f8f0e9df154a9871e5a7024db182d6a0d26e8c8e1a0c0bb71efd1f40aaad69d
fail() { printf 'UFT4 deployment stopped: %s\n' "$*" >&2; exit 1; }
if [ "$#" -ne 0 ]; then fail 'Run deploy.sh without arguments.'; fi
case "$remote" in ''|-*|*[!A-Za-z0-9_@.:-]*) fail 'Invalid SSH target.';; esac
repo=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P) || fail 'Cannot locate repository.'
expected=$(cat "$repo/uft4-omega-deployment/release.sha256") || fail "Missing release.sha256"
case "$expected" in *[!0-9a-f]*|'') fail "Invalid release checksum.";; esac
[ "${#expected}" -eq 64 ] || fail "Invalid release checksum length."
source_file=$repo/public_html/observatories/uft4-omega/index.html
[ -f "$source_file" ] || fail "Missing $source_file"
for tool in ssh scp; do command -v "$tool" >/dev/null 2>&1 || fail "Install $tool first (Termux: pkg install openssh)."; done
hash_file() {
  if command -v sha256sum >/dev/null 2>&1; then sha256sum "$1";
  elif command -v shasum >/dev/null 2>&1; then shasum -a 256 "$1";
  else return 1; fi
}
digest=$(hash_file "$source_file") || fail 'SHA-256 verification unavailable.'
[ "${digest%% *}" = "$expected" ] || fail 'Local HTML differs from the reviewed v15.9.5 release.'
bytes=$(wc -c < "$source_file") || fail 'Cannot measure local HTML.'
bytes=${bytes//[[:space:]]/}
case "$bytes" in ''|*[!0-9]*) fail 'Invalid local file size.';; esac
[ "$bytes" -le 1048576 ] || fail 'HTML exceeds the 1 MiB upload limit.'
stage=
cleanup() {
  if [ -n "$stage" ]; then
    if ! ssh "$remote" "rm -f -- '$stage'"; then
      printf 'Temporary upload cleanup failed: %s\n' "$stage" >&2
    fi
  fi
}
trap cleanup EXIT
trap 'printf "Deployment interrupted.\n" >&2; exit 130' INT
trap 'printf "Deployment terminated.\n" >&2; exit 143' TERM

printf 'Checking reviewed release on %s…\n' "$remote"
prepared=$(ssh "$remote" "bash -s -- '$expected' '$previous' '$older' '$oldest'" <<'REMOTE_PREPARE'
set -u
expected=$1; previous=$2; older=$3; oldest=$4
stop() { printf 'Remote check: %s\n' "$*" >&2; exit 1; }
hash_file() {
  if command -v sha256sum >/dev/null 2>&1; then sha256sum "$1";
  elif command -v shasum >/dev/null 2>&1; then shasum -a 256 "$1";
  else return 1; fi
}
parent=$HOME/www/observatories
[ -d "$HOME/www" ] && [ -d "$parent" ] && [ ! -L "$parent" ] || stop 'Existing www/observatories directory required.'
target=$parent/uft4-omega
[ ! -L "$target" ] || stop 'Target directory is a symlink.'
if [ -e "$target" ] && [ ! -d "$target" ]; then stop 'Target path is not a directory.'; fi
index=$target/index.html
if [ -e "$index" ] || [ -L "$index" ]; then
  [ -f "$index" ] && [ ! -L "$index" ] || stop 'Existing index is not a regular, unlinked file.'
  digest=$(hash_file "$index") || stop 'Cannot hash existing index.'
  current=${digest%% *}
  if [ "$current" = "$expected" ]; then printf 'UNCHANGED\n'; exit 0; fi
  [ "$current" = "$previous" ] || [ "$current" = "$older" ] || [ "$current" = "$oldest" ] || stop 'An unfamiliar index already exists; nothing was overwritten.'
fi
stage=$(mktemp "$HOME/.uft4-omega-upload.XXXXXXXX") || stop 'Cannot create upload staging file.'
printf 'STAGE:%s\n' "$stage"
REMOTE_PREPARE
) || fail 'Remote preflight failed; no page was replaced.'
if [ "$prepared" = UNCHANGED ]; then
  printf 'Reviewed v15.9.5 is already installed at ~/www/observatories/uft4-omega/index.html.\n'
  printf 'Live HTTP delivery was not checked.\n'; exit 0
fi
case "$prepared" in STAGE:/*) stage=${prepared#STAGE:};; *) fail 'Unexpected remote staging response.';; esac
case "$stage" in *[!A-Za-z0-9_./-]*|*/../*|*/./*) stage=; fail 'Unsafe remote staging path.';; esac
case "$stage" in */.uft4-omega-upload.*) :;; *) stage=; fail 'Unexpected remote staging path.';; esac
printf 'Uploading verified HTML…\n'
if ! scp "$source_file" "$remote:$stage"; then fail 'Upload failed; destination page was not changed.'; fi

printf 'Installing dedicated page…\n'
if ! ssh "$remote" "bash -s -- '$stage' '$expected' '$bytes' '$previous' '$older' '$oldest'" <<'REMOTE_INSTALL'
set -u
stage=$1; expected=$2; expected_bytes=$3; previous=$4; older=$5; oldest=$6
publish_stage=
trap 'if [ -n "$publish_stage" ]; then rm -f -- "$publish_stage"; fi' EXIT
stop() { printf 'Remote install: %s\n' "$*" >&2; exit 1; }
hash_file() {
  if command -v sha256sum >/dev/null 2>&1; then sha256sum "$1";
  elif command -v shasum >/dev/null 2>&1; then shasum -a 256 "$1";
  else return 1; fi
}
parent=$HOME/www/observatories
[ -d "$HOME/www" ] && [ -d "$parent" ] && [ ! -L "$parent" ] || stop 'Document root changed.'
case "$stage" in "$HOME"/.uft4-omega-upload.*) :;; *) stop 'Staging path mismatch.';; esac
[ -f "$stage" ] && [ ! -L "$stage" ] || stop 'Staging file is missing or unsafe.'
bytes=$(wc -c < "$stage") || stop 'Cannot measure upload.'
[ "$bytes" -eq "$expected_bytes" ] && [ "$bytes" -le 1048576 ] || stop 'Upload size mismatch.'
digest=$(hash_file "$stage") || stop 'Cannot hash upload.'
[ "${digest%% *}" = "$expected" ] || stop 'Uploaded HTML hash mismatch.'
target=$parent/uft4-omega
[ ! -L "$target" ] || stop 'Target directory is a symlink.'
if [ ! -d "$target" ]; then mkdir "$target" || stop 'Cannot create dedicated directory.'; fi
[ ! -L "$target" ] || stop 'Target directory changed.'
canonical_parent=$(cd -P -- "$parent" && pwd -P) || stop 'Cannot resolve parent.'
cd -P -- "$target" || stop 'Cannot enter dedicated directory.'
[ "$(pwd -P)" = "$canonical_parent/uft4-omega" ] || stop 'Dedicated directory resolves outside its parent.'
current=missing
if [ -e index.html ] || [ -L index.html ]; then
  [ -f index.html ] && [ ! -L index.html ] || stop 'Existing index is unsafe.'
  digest=$(hash_file index.html) || stop 'Cannot hash existing index.'
  current=${digest%% *}
  [ "$current" = "$expected" ] || [ "$current" = "$previous" ] || [ "$current" = "$older" ] || [ "$current" = "$oldest" ] || stop 'An unfamiliar index appeared; nothing was overwritten.'
fi
if [ "$current" != "$expected" ]; then
  # Stage beside the destination so publication is an atomic same-filesystem operation.
  publish_stage=$(mktemp "$PWD/.uft4-omega-install.XXXXXXXX") || stop 'Cannot stage installation.'
  cp -- "$stage" "$publish_stage" || stop 'Cannot copy verified upload.'
  digest=$(hash_file "$publish_stage") || stop 'Cannot verify installation copy.'
  [ "${digest%% *}" = "$expected" ] || stop 'Installation copy hash mismatch.'
  chmod 644 "$publish_stage" || stop 'Cannot set HTML permissions.'
  if [ "$current" = missing ]; then
    ln -T -- "$publish_stage" index.html || stop 'Atomic no-clobber installation failed.'
    rm -f -- "$publish_stage" || stop 'Cannot remove installation staging file.'
  else
    backups=$HOME/.uft4-omega-backups
    [ ! -L "$backups" ] || stop 'Backup directory is a symlink.'
    if [ ! -d "$backups" ]; then mkdir -m 700 -- "$backups" || stop 'Cannot create backup directory.'; fi
    backup=$(mktemp "$backups/pre-v15.9.5.XXXXXXXX.html") || stop 'Cannot create rollback file.'
    cp -- index.html "$backup" || stop 'Cannot back up the previous page.'
    digest=$(hash_file "$backup") || stop 'Cannot verify rollback file.'
    [ "${digest%% *}" = "$current" ] || stop 'Rollback hash mismatch; page was not replaced.'
    printf 'Rollback copy: %s\n' "$backup"
    # Recheck immediately before replacing only the admitted predecessor.
    [ -f index.html ] && [ ! -L index.html ] || stop 'Existing index changed.'
    digest=$(hash_file index.html) || stop 'Cannot recheck existing index.'
    [ "${digest%% *}" = "$current" ] || stop 'Existing page changed; nothing was overwritten.'
    mv -Tf -- "$publish_stage" index.html || stop 'Atomic update failed.'
  fi
  publish_stage=
fi
rm -f -- "$stage" || stop 'Installed, but staging cleanup failed.'
printf 'Reviewed v15.9.5 installed at ~/www/observatories/uft4-omega/index.html.\n'
REMOTE_INSTALL
then fail 'Remote install failed; inspect the message above before retrying.'; fi
stage=
printf 'Live HTTP delivery was not checked.\n'
