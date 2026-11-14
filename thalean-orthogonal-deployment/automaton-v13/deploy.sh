#!/usr/bin/env bash
# Run in Termux with the owner's existing gurtiamy SSH alias.
set -u
expected=570082fe2add0d10e3e2395e7d1da240277a3691b105042d6f57addf7950e302
remote=gurtiamy
url=https://aletheos.ai/observatories/thalean-orthogonal/
operation=${1:-install}
fail() { printf 'Encounter Lab deployment stopped: %s\n' "$*" >&2; exit 1; }
case "$operation" in install|rollback) ;; *) fail 'Use deploy.sh or deploy.sh rollback.' ;; esac
for tool in ssh curl sha256sum; do
  command -v "$tool" >/dev/null 2>&1 || fail "Missing $tool; in Termux install openssh curl coreutils."
done
package_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P) || fail 'Cannot locate package.'
(cd -- "$package_dir" && sha256sum --status -c SHA256SUMS) || fail 'Release package checksum differs.'
server=$(cat -- "$package_dir/server.sh") || fail 'Cannot read verified installer.'
quoted_server=${server//\'/\'\\\'\'}
if [ "$operation" = install ]; then payload=$package_dir/index.html; else payload=/dev/null; fi
printf 'Running %s through SSH alias %s…\n' "$operation" "$remote"
result=$(ssh -T "$remote" "bash -c '$quoted_server' bash '$operation'" < "$payload") || fail 'SSH action failed; see the server message above.'
printf '%s\n' "$result"
live_hash=
while IFS= read -r line; do
  case "$line" in LIVE_SHA256=*) live_hash=${line#LIVE_SHA256=} ;; esac
done <<< "$result"
case "$live_hash" in
  "$expected"|29ee7dc62e1bab177c4e2048b29868ae54831519e5764545ba3449012063a7d1) ;;
  *) fail 'Server did not return a recognized installed checksum.' ;;
esac
if [ "$operation" = install ]; then [ "$live_hash" = "$expected" ] || fail 'Server did not install this release.'; fi
served=$(mktemp) || fail 'Server action completed, but local HTTP verification could not start.'
trap 'rm -f -- "$served"' EXIT
curl -fsSL --max-time 30 --retry 1 -o "$served" "${url}?automaton-v13=${live_hash:0:12}" || fail 'Server action completed, but public fetch failed.'
actual=$(sha256sum -- "$served") || fail 'Cannot hash public response.'
[ "${actual%% *}" = "$live_hash" ] || fail 'Server action completed, but public response differs; check the host cache.'
printf 'LIVE VERIFIED: %s\nSHA256: %s\n' "$url" "$live_hash"
