#!/usr/bin/env bash
# Run in Termux; keep the owner's existing SSH authentication and host checks.
set -u
expected=8a54178fda15715f4d198a897b2028279e081f1f14bf2427ef1806bf978f9135
remote=gurtiamy
url=https://aletheos.ai/observatories/thalean-observer/
operation=${1:-install}
fail() { printf 'Observer deployment stopped: %s\n' "$*" >&2; exit 1; }
case "$operation" in install|verify|rollback) ;; *) fail 'Use deploy.sh, deploy.sh verify, or deploy.sh rollback.' ;; esac
for tool in ssh curl sha256sum; do
  command -v "$tool" >/dev/null 2>&1 || fail "Missing $tool; Termux package names: openssh curl coreutils."
done
package_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P) || fail 'Cannot locate this release.'
(cd -- "$package_dir" && sha256sum --status -c SHA256SUMS) || fail 'Release integrity check failed; no SSH action attempted.'
server=$(cat -- "$package_dir/server.sh") || fail 'Cannot read verified installer.'
quoted_server=${server//\'/\'\\\'\'}
if [ "$operation" = install ]; then payload=$package_dir/index.html; else payload=/dev/null; fi
printf 'Running %s through SSH alias %s…\n' "$operation" "$remote"
result=$(ssh -T "$remote" "bash -c '$quoted_server' bash '$operation'" < "$payload") || fail 'SSH action failed; see the server message above.'
printf '%s\n' "$result"
live_hash=
absent=0
while IFS= read -r line; do
  case "$line" in LIVE_SHA256=*) live_hash=${line#LIVE_SHA256=} ;; LIVE_ABSENT=1) absent=1 ;; esac
done <<< "$result"
served=$(mktemp) || fail 'Remote action completed, but HTTP verification could not start.'
trap 'rm -f -- "$served"' EXIT
if [ "$operation" = rollback ]; then
  [ "$absent" = 1 ] || fail 'Server did not confirm the original absent-page state.'
  code=$(curl -sSL --max-time 30 -o "$served" -w '%{http_code}' "${url}index.html?observer-rollback=${expected:0:12}") || fail 'Rollback completed on the server; public absence could not be checked.'
  case "$code" in 404|403) printf 'ROLLBACK VERIFIED: prior absent-page state restored.\n' ;; *) fail "Rollback completed on the server; public absence remains unverified (HTTP $code)." ;; esac
  exit 0
fi
[ "$live_hash" = "$expected" ] || fail 'Server did not return this release checksum.'
curl -fsSL --max-time 30 --retry 1 -o "$served" "${url}?observer-release=${expected:0:12}" || fail 'Installed on server, but public HTTPS verification failed. Do not assume LIVE VERIFIED.'
actual=$(sha256sum -- "$served") || fail 'Cannot hash the public response.'
[ "${actual%% *}" = "$expected" ] || fail 'Installed on server, but the public response differs. Check host/CDN caching; no success claimed.'
printf 'LIVE VERIFIED: %s\nSHA256: %s\n' "$url" "$expected"
