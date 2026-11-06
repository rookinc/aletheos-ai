#!/usr/bin/env bash
# Publish this pinned release using the existing Termux -> Bluehost SSH bridge.
set -u
remote=gurtiamy
release_url=https://aletheos.ai/observatories/thalean-orthogonal/
expected=08f203d1377e5c50a71b6f7d61f5c0771c660d2188a8726347e9a9cf41bd78db
fail() { printf 'Orthogonal deployment stopped: %s\n' "$*" >&2; exit 1; }
for tool in ssh curl sha256sum; do
  command -v "$tool" >/dev/null 2>&1 || fail "Missing $tool. In Termux: pkg install openssh curl coreutils"
done
package_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P) || fail 'Cannot locate release.'
html=$package_dir/index.html
if [ ! -f "$html" ]; then html=$package_dir/../public_html/observatories/thalean-orthogonal/index.html; fi
local_hash=$(sha256sum -- "$html") || fail 'Cannot read release HTML.'
[ "${local_hash%% *}" = "$expected" ] || fail 'HTML differs from the reviewed v1.1 release.'

remote_install=$(cat <<'REMOTE'
set -u
expected=$1
previous=8fbcf4ea51e0d122f21b1015d967df3faf2562057fd0cce3ed9b43e0fad8bd87
stop() { printf 'Aletheos server: %s\n' "$*" >&2; exit 1; }
parent=$HOME/www/observatories
[ -d "$parent" ] && [ ! -L "$parent" ] || stop 'Existing www/observatories directory required.'
target=$parent/thalean-orthogonal
[ ! -L "$target" ] || stop 'Destination is a symlink.'
if [ ! -d "$target" ]; then mkdir -m 755 -- "$target" || stop 'Cannot create destination.'; fi
index=$target/index.html
lock=$target/.orthogonal-deploy-lock
mkdir -m 700 -- "$lock" || stop 'Another deployment may be active; deployment lock exists.'
stage=
trap 'if [ -n "$stage" ]; then rm -f -- "$stage"; fi; rmdir -- "$lock"' EXIT
stage=$(mktemp "$target/.orthogonal-upload.XXXXXXXX") || stop 'Cannot stage upload.'
cat > "$stage" || stop 'Cannot receive upload.'
digest=$(sha256sum -- "$stage") || stop 'Cannot check upload.'
[ "${digest%% *}" = "$expected" ] || stop 'Uploaded HTML checksum differs.'
if [ -e "$index" ] || [ -L "$index" ]; then
  [ -f "$index" ] && [ ! -L "$index" ] || stop 'Existing index is not a regular file.'
  digest=$(sha256sum -- "$index") || stop 'Cannot check existing page.'
  if [ "${digest%% *}" = "$expected" ]; then
    printf 'Orthogonal Observatory v1.1 is already installed.\n'
  elif [ "${digest%% *}" = "$previous" ]; then
    backup=$target/index.v1.0.html
    if [ -e "$backup" ] || [ -L "$backup" ]; then
      [ -f "$backup" ] && [ ! -L "$backup" ] || stop 'Backup path is not a regular file.'
      backup_hash=$(sha256sum -- "$backup") || stop 'Cannot check backup.'
      [ "${backup_hash%% *}" = "$previous" ] || stop 'Existing backup differs; no changes made.'
    else
      ln -T -- "$index" "$backup" || stop 'Cannot preserve v1.0 before upgrading.'
    fi
    chmod 644 -- "$stage" || stop 'Cannot set page permissions.'
    digest=$(sha256sum -- "$index") || stop 'Cannot recheck page before upgrade.'
    [ "${digest%% *}" = "$previous" ] || stop 'Page changed during upload; no replacement made.'
    mv -T -- "$stage" "$index" || stop 'Cannot install v1.1.'
    printf 'Orthogonal Observatory upgraded to v1.1; v1.0 preserved as index.v1.0.html.\n'
  else
    stop 'A different page exists here; no changes made.'
  fi
else
  chmod 644 -- "$stage" || stop 'Cannot set page permissions.'
  ln -T -- "$stage" "$index" || stop 'Could not publish without replacing another file.'
  printf 'Orthogonal Observatory v1.1 installed.\n'
fi
REMOTE
) || fail 'Cannot prepare installation.'
quoted_install=${remote_install//\'/\'\\\'\'}
printf 'Uploading Orthogonal Observatory v1.1 via %s…\n' "$remote"
ssh -T "$remote" "bash -c '$quoted_install' bash '$expected'" < "$html" || fail 'SSH installation failed; check the server message above.'
served=$(mktemp) || fail 'Installed, but HTTP verification could not start.'
trap 'rm -f -- "$served"' EXIT
curl -fsSL --max-time 40 --retry 2 -o "$served" "${release_url}?release=v1.1-${expected:0:12}" || fail "Installed, but public fetch failed: $release_url"
served_hash=$(sha256sum -- "$served") || fail 'Cannot hash public response.'
[ "${served_hash%% *}" = "$expected" ] || fail "Installed, but public response differs: $release_url"
printf 'Live v1.1 verified: %s\n' "$release_url"
