#!/usr/bin/env bash
# Publish this pinned release using the existing Termux -> Bluehost SSH bridge.
set -u
remote=gurtiamy
release_url=https://aletheos.ai/observatories/thalean-orthogonal/
expected=8fbcf4ea51e0d122f21b1015d967df3faf2562057fd0cce3ed9b43e0fad8bd87
fail() { printf 'Orthogonal deployment stopped: %s\n' "$*" >&2; exit 1; }
for tool in ssh curl sha256sum; do
  command -v "$tool" >/dev/null 2>&1 || fail "Missing $tool. In Termux: pkg install openssh curl coreutils"
done
package_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P) || fail 'Cannot locate release.'
html=$package_dir/index.html
if [ ! -f "$html" ]; then html=$package_dir/../public_html/observatories/thalean-orthogonal/index.html; fi
local_hash=$(sha256sum -- "$html") || fail 'Cannot read release HTML.'
[ "${local_hash%% *}" = "$expected" ] || fail 'HTML differs from the reviewed v1.0 release.'

remote_install=$(cat <<'REMOTE'
set -u
expected=$1
stop() { printf 'Aletheos server: %s\n' "$*" >&2; exit 1; }
parent=$HOME/www/observatories
[ -d "$parent" ] && [ ! -L "$parent" ] || stop 'Existing www/observatories directory required.'
target=$parent/thalean-orthogonal
[ ! -L "$target" ] || stop 'Destination is a symlink.'
if [ ! -d "$target" ]; then mkdir -m 755 -- "$target" || stop 'Cannot create destination.'; fi
index=$target/index.html
stage=$(mktemp "$target/.orthogonal-upload.XXXXXXXX") || stop 'Cannot stage upload.'
trap 'rm -f -- "$stage"' EXIT
cat > "$stage" || stop 'Cannot receive upload.'
digest=$(sha256sum -- "$stage") || stop 'Cannot check upload.'
[ "${digest%% *}" = "$expected" ] || stop 'Uploaded HTML checksum differs.'
if [ -e "$index" ] || [ -L "$index" ]; then
  [ -f "$index" ] && [ ! -L "$index" ] || stop 'Existing index is not a regular file.'
  digest=$(sha256sum -- "$index") || stop 'Cannot check existing page.'
  [ "${digest%% *}" = "$expected" ] || stop 'A different page exists here; no changes made.'
  printf 'Orthogonal Observatory v1.0 is already installed.\n'
else
  chmod 644 -- "$stage" || stop 'Cannot set page permissions.'
  ln -T -- "$stage" "$index" || stop 'Could not publish without replacing another file.'
  printf 'Orthogonal Observatory v1.0 installed.\n'
fi
REMOTE
) || fail 'Cannot prepare installation.'
quoted_install=${remote_install//\'/\'\\\'\'}
printf 'Uploading Orthogonal Observatory v1.0 via %s…\n' "$remote"
ssh -T "$remote" "bash -c '$quoted_install' bash '$expected'" < "$html" || fail 'SSH installation failed; check the server message above.'
served=$(mktemp) || fail 'Installed, but HTTP verification could not start.'
trap 'rm -f -- "$served"' EXIT
curl -fsSL --max-time 40 --retry 2 -o "$served" "${release_url}?release=v1.0-${expected:0:12}" || fail "Installed, but public fetch failed: $release_url"
served_hash=$(sha256sum -- "$served") || fail 'Cannot hash public response.'
[ "${served_hash%% *}" = "$expected" ] || fail "Installed, but public response differs: $release_url"
printf 'Live v1.0 verified: %s\n' "$release_url"
