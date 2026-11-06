#!/usr/bin/env bash
set -u
expected=e4c7a3dea532919fa33021ea2233d3a5e203479e72c1b26e21883ba5d6408f54
fail(){ printf 'Default-view update stopped: %s\n' "$*" >&2; exit 1; }
for tool in ssh curl sha256sum; do command -v "$tool" >/dev/null 2>&1 || fail "Missing $tool"; done
ssh -T gurtiamy 'bash -s' <<'REMOTE'
set -u
previous=08f203d1377e5c50a71b6f7d61f5c0771c660d2188a8726347e9a9cf41bd78db
expected=e4c7a3dea532919fa33021ea2233d3a5e203479e72c1b26e21883ba5d6408f54
stop(){ printf 'Aletheos server: %s\n' "$*" >&2; exit 1; }
parent=$HOME/www/observatories
target=$parent/thalean-orthogonal
index=$target/index.html
[ -d "$parent" ] && [ ! -L "$parent" ] && [ -d "$target" ] && [ ! -L "$target" ] && [ -f "$index" ] && [ ! -L "$index" ] || stop 'Expected regular Observatory page required.'
lock=$target/.orthogonal-deploy-lock
mkdir -m 700 -- "$lock" || stop 'Deployment lock exists.'
stage=
trap 'if [ -n "$stage" ]; then rm -f -- "$stage"; fi; rmdir -- "$lock"' EXIT
digest=$(sha256sum -- "$index") || stop 'Cannot hash page.'
if [ "${digest%% *}" = "$expected" ]; then printf 'Default view already installed.\n'; exit 0; fi
[ "${digest%% *}" = "$previous" ] || stop 'Page differs from reviewed v1.1; no replacement made.'
stage=$(mktemp "$target/.default-view.XXXXXXXX") || stop 'Cannot stage update.'
sed -e 's/edgeOpacity=1,vertexOpacity=0/edgeOpacity=.13,vertexOpacity=.62/' \
 -e 's/id="edgesValue">100%/id="edgesValue">13%/' \
 -e 's/id="edges" aria-label="Edge opacity" type="range" min="0" max="100" value="100"/id="edges" aria-label="Edge opacity" type="range" min="0" max="100" value="13"/' \
 -e 's/id="verticesValue">0%/id="verticesValue">62%/' \
 -e 's/id="vertices" aria-label="Vertex opacity" type="range" min="0" max="100" value="0"/id="vertices" aria-label="Vertex opacity" type="range" min="0" max="100" value="62"/' "$index" > "$stage" || stop 'Cannot prepare preset.'
digest=$(sha256sum -- "$stage") || stop 'Cannot hash update.'
[ "${digest%% *}" = "$expected" ] || stop 'Updated page checksum differs.'
backup=$target/index.before-default-view.html
if [ -e "$backup" ] || [ -L "$backup" ]; then
 [ -f "$backup" ] && [ ! -L "$backup" ] || stop 'Backup is not a regular file.'
 digest=$(sha256sum -- "$backup") || stop 'Cannot hash backup.'
 [ "${digest%% *}" = "$previous" ] || stop 'Backup differs.'
else
 ln -T -- "$index" "$backup" || stop 'Cannot preserve current page.'
fi
chmod 644 -- "$stage" || stop 'Cannot set permissions.'
digest=$(sha256sum -- "$index") || stop 'Cannot recheck current page.'
[ "${digest%% *}" = "$previous" ] || stop 'Page changed during update.'
mv -T -- "$stage" "$index" || stop 'Cannot install preset.'
printf 'Default Assembly preset installed; previous page preserved.\n'
REMOTE
[ "$?" = 0 ] || fail 'SSH update failed.'
served=$(mktemp) || fail 'Cannot verify public response.'
trap 'rm -f -- "$served"' EXIT
url=https://aletheos.ai/observatories/thalean-orthogonal/
curl -fsSL --max-time 40 -o "$served" "${url}?preset=${expected:0:12}" || fail 'Public fetch failed.'
digest=$(sha256sum -- "$served") || fail 'Cannot hash public response.'
[ "${digest%% *}" = "$expected" ] || fail 'Public response differs; refresh and check server cache.'
printf 'Live default view verified: %s\n' "$url"
