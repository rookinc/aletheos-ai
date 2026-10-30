#!/usr/bin/env bash
# Run from any directory after cloning the repository. No remote login is saved.
# Local Bash works on Termux/macOS/Linux; Bluehost supplies Linux ln -T.
set -u
remote=${UFT4_SSH_TARGET:-gurtiamy@gur.tia.mybluehost.me}
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
[ "${digest%% *}" = "$expected" ] || fail 'Local HTML differs from the reviewed v15.9 release.'
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
trap 'exit 130' INT
trap 'exit 143' TERM

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
target=$parent/uft4-omega
[ ! -L "$target" ] || stop 'Target directory is a symlink.'
if [ -e "$target" ] && [ ! -d "$target" ]; then stop 'Target path is not a directory.'; fi
index=$target/index.html
if [ -e "$index" ] || [ -L "$index" ]; then
  [ -f "$index" ] && [ ! -L "$index" ] || stop 'Existing index is not a regular, unlinked file.'
  digest=$(hash_file "$index") || stop 'Cannot hash existing index.'
  [ "${digest%% *}" = "$expected" ] || stop 'An unfamiliar index already exists; nothing was overwritten.'
  printf 'UNCHANGED\n'; exit 0
fi
stage=$(mktemp "$HOME/.uft4-omega-upload.XXXXXXXX") || stop 'Cannot create upload staging file.'
printf 'STAGE:%s\n' "$stage"
REMOTE_PREPARE
) || fail 'Remote preflight failed; no page was replaced.'
if [ "$prepared" = UNCHANGED ]; then
  printf 'Reviewed v15.9 is already installed at ~/www/observatories/uft4-omega/index.html.\n'
  printf 'Live HTTP delivery was not checked.\n'; exit 0
fi
case "$prepared" in STAGE:/*) stage=${prepared#STAGE:};; *) fail 'Unexpected remote staging response.';; esac
case "$stage" in *[!A-Za-z0-9_./-]*|*/../*|*/./*) stage=; fail 'Unsafe remote staging path.';; esac
case "$stage" in */.uft4-omega-upload.*) :;; *) stage=; fail 'Unexpected remote staging path.';; esac
if ! scp "$source_file" "$remote:$stage"; then fail 'Upload failed; destination page was not changed.'; fi

if ! ssh "$remote" "bash -s -- '$stage' '$expected' '$bytes'" <<'REMOTE_INSTALL'
set -u
stage=$1; expected=$2; expected_bytes=$3
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
if [ -e index.html ] || [ -L index.html ]; then
  [ -f index.html ] && [ ! -L index.html ] || stop 'Existing index is unsafe.'
  digest=$(hash_file index.html) || stop 'Cannot hash existing index.'
  [ "${digest%% *}" = "$expected" ] || stop 'An unfamiliar index appeared; nothing was overwritten.'
else
  chmod 644 "$stage" || stop 'Cannot set HTML permissions.'
  # Linux ln -T publishes the complete file atomically and never overwrites.
  ln -T -- "$stage" index.html || stop 'Atomic no-clobber installation failed.'
fi
rm -f -- "$stage" || stop 'Installed, but staging cleanup failed.'
printf 'Reviewed v15.9 installed at ~/www/observatories/uft4-omega/index.html.\n'
REMOTE_INSTALL
then fail 'Remote install failed; inspect the message above before retrying.'; fi
stage=
printf 'Live HTTP delivery was not checked.\n'
