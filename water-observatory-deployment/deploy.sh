#!/usr/bin/env bash
# Run from any directory after cloning the repository. No remote login is saved.
# Local Bash works on Termux/macOS/Linux; Bluehost supplies Linux ln -T.
set -u
remote=${WATER_SSH_TARGET:-gurtiamy}
fail() { printf 'WATER deployment stopped: %s\n' "$*" >&2; exit 1; }
if [ "$#" -ne 0 ]; then fail 'Run deploy.sh without arguments.'; fi
case "$remote" in ''|-*|*[!A-Za-z0-9_@.:-]*) fail 'Invalid SSH target.';; esac
repo=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P) || fail 'Cannot locate repository.'
expected=$(cat "$repo/water-observatory-deployment/release.sha256") || fail "Missing release.sha256"
case "$expected" in *[!0-9a-f]*|'') fail "Invalid release checksum.";; esac
[ "${#expected}" -eq 64 ] || fail "Invalid release checksum length."
source_file=$repo/public_html/observatories/water/index.html
[ -f "$source_file" ] || fail "Missing $source_file"
for tool in ssh scp; do command -v "$tool" >/dev/null 2>&1 || fail "Install $tool first (Termux: pkg install openssh)."; done
hash_file() {
  if command -v sha256sum >/dev/null 2>&1; then sha256sum "$1";
  elif command -v shasum >/dev/null 2>&1; then shasum -a 256 "$1";
  else return 1; fi
}
digest=$(hash_file "$source_file") || fail 'SHA-256 verification unavailable.'
[ "${digest%% *}" = "$expected" ] || fail 'Local HTML differs from the reviewed v32 release.'
bytes=$(wc -c < "$source_file") || fail 'Cannot measure local HTML.'
bytes=${bytes//[[:space:]]/}
case "$bytes" in ''|*[!0-9]*) fail 'Invalid local file size.';; esac
[ "$bytes" -le 8388608 ] || fail 'HTML exceeds the 8 MiB upload limit.'
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
prepared=$(ssh "$remote" "bash -s -- '$expected'" <<'REMOTE_PREPARE'
set -u
expected=$1
stop() { printf 'Remote check: %s\n' "$*" >&2; exit 1; }
hash_file() {
  if command -v sha256sum >/dev/null 2>&1; then sha256sum "$1";
  elif command -v shasum >/dev/null 2>&1; then shasum -a 256 "$1";
  else return 1; fi
}
parent=$HOME/www/observatories
[ -d "$HOME/www" ] && [ -d "$parent" ] && [ ! -L "$parent" ] || stop 'Existing www/observatories directory required.'
target=$parent/water
[ ! -L "$target" ] || stop 'Target directory is a symlink.'
if [ -e "$target" ] && [ ! -d "$target" ]; then stop 'Target path is not a directory.'; fi
index=$target/index.html
if [ -e "$index" ] || [ -L "$index" ]; then
  [ -f "$index" ] && [ ! -L "$index" ] || stop 'Existing index is not a regular, unlinked file.'
  digest=$(hash_file "$index") || stop 'Cannot hash existing index.'
  current=${digest%% *}
  if [ "$current" = "$expected" ]; then printf 'UNCHANGED\n'; exit 0; fi
fi
stage=$(mktemp "$HOME/.water-observatory-upload.XXXXXXXX") || stop 'Cannot create upload staging file.'
printf 'STAGE:%s\n' "$stage"
REMOTE_PREPARE
) || fail 'Remote preflight failed; no page was replaced.'
if [ "$prepared" = UNCHANGED ]; then
  printf 'Reviewed v32 is already installed at ~/www/observatories/water/index.html.\n'
  printf 'Live HTTP delivery was not checked.\n'; exit 0
fi
case "$prepared" in STAGE:/*) stage=${prepared#STAGE:};; *) fail 'Unexpected remote staging response.';; esac
case "$stage" in *[!A-Za-z0-9_./-]*|*/../*|*/./*) stage=; fail 'Unsafe remote staging path.';; esac
case "$stage" in */.water-observatory-upload.*) :;; *) stage=; fail 'Unexpected remote staging path.';; esac
printf 'Uploading verified HTML…\n'
if ! scp "$source_file" "$remote:$stage"; then fail 'Upload failed; destination page was not changed.'; fi

printf 'Installing dedicated page…\n'
if ! ssh "$remote" "bash -s -- '$stage' '$expected' '$bytes'" <<'REMOTE_INSTALL'
set -u
stage=$1; expected=$2; expected_bytes=$3
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
case "$stage" in "$HOME"/.water-observatory-upload.*) :;; *) stop 'Staging path mismatch.';; esac
[ -f "$stage" ] && [ ! -L "$stage" ] || stop 'Staging file is missing or unsafe.'
bytes=$(wc -c < "$stage") || stop 'Cannot measure upload.'
[ "$bytes" -eq "$expected_bytes" ] && [ "$bytes" -le 8388608 ] || stop 'Upload size mismatch.'
digest=$(hash_file "$stage") || stop 'Cannot hash upload.'
[ "${digest%% *}" = "$expected" ] || stop 'Uploaded HTML hash mismatch.'
target=$parent/water
[ ! -L "$target" ] || stop 'Target directory is a symlink.'
if [ ! -d "$target" ]; then mkdir "$target" || stop 'Cannot create dedicated directory.'; fi
[ ! -L "$target" ] || stop 'Target directory changed.'
canonical_parent=$(cd -P -- "$parent" && pwd -P) || stop 'Cannot resolve parent.'
cd -P -- "$target" || stop 'Cannot enter dedicated directory.'
[ "$(pwd -P)" = "$canonical_parent/water" ] || stop 'Dedicated directory resolves outside its parent.'
current=missing
if [ -e index.html ] || [ -L index.html ]; then
  [ -f index.html ] && [ ! -L index.html ] || stop 'Existing index is unsafe.'
  digest=$(hash_file index.html) || stop 'Cannot hash existing index.'
  current=${digest%% *}
fi
if [ "$current" != "$expected" ]; then
  # Stage beside the destination so publication is an atomic same-filesystem operation.
  publish_stage=$(mktemp "$PWD/.water-observatory-install.XXXXXXXX") || stop 'Cannot stage installation.'
  cp -- "$stage" "$publish_stage" || stop 'Cannot copy verified upload.'
  digest=$(hash_file "$publish_stage") || stop 'Cannot verify installation copy.'
  [ "${digest%% *}" = "$expected" ] || stop 'Installation copy hash mismatch.'
  chmod 644 "$publish_stage" || stop 'Cannot set HTML permissions.'
  if [ "$current" = missing ]; then
    ln -T -- "$publish_stage" index.html || stop 'Atomic no-clobber installation failed.'
    rm -f -- "$publish_stage" || stop 'Cannot remove installation staging file.'
  else
    backups=$HOME/.water-observatory-backups
    [ ! -L "$backups" ] || stop 'Backup directory is a symlink.'
    if [ ! -d "$backups" ]; then mkdir -m 700 -- "$backups" || stop 'Cannot create backup directory.'; fi
    backup=$(mktemp "$backups/pre-v32.XXXXXXXX.html") || stop 'Cannot create rollback file.'
    cp -- index.html "$backup" || stop 'Cannot back up the previous page.'
    digest=$(hash_file "$backup") || stop 'Cannot verify rollback file.'
    [ "${digest%% *}" = "$current" ] || stop 'Rollback hash mismatch; page was not replaced.'
    printf 'Rollback copy: %s\n' "$backup"
    # Recheck immediately before replacing the inspected predecessor.
    [ -f index.html ] && [ ! -L index.html ] || stop 'Existing index changed.'
    digest=$(hash_file index.html) || stop 'Cannot recheck existing index.'
    [ "${digest%% *}" = "$current" ] || stop 'Existing page changed; nothing was overwritten.'
    mv -Tf -- "$publish_stage" index.html || stop 'Atomic update failed.'
  fi
  publish_stage=
fi
rm -f -- "$stage" || stop 'Installed, but staging cleanup failed.'
printf 'Reviewed v32 installed at ~/www/observatories/water/index.html.\n'
REMOTE_INSTALL
then fail 'Remote install failed; inspect the message above before retrying.'; fi
stage=
printf 'Live HTTP delivery was not checked.\n'
