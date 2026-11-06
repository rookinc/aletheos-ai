#!/usr/bin/env bash
# Run in Termux using the existing Bluehost SSH alias. No credentials are stored.
set -euo pipefail
remote=${OBSERVATORY_SSH_TARGET:-gurtiamy}
case "$remote" in ''|-*|*[!A-Za-z0-9_@.:-]*) printf 'Invalid SSH target.\n' >&2; exit 1;; esac
if [ "$#" -ne 0 ]; then printf 'Run deploy.sh without arguments.\n' >&2; exit 1; fi
for tool in python3 ssh curl; do
  command -v "$tool" >/dev/null 2>&1 || { printf 'Missing %s. Termux: pkg install python openssh curl\n' "$tool" >&2; exit 1; }
done
release_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
work=$(mktemp -d)
trap 'rm -rf -- "$work"' EXIT
python3 "$release_dir/remote_install.py" pack "$release_dir" "$work/payload.tar.gz"
installer=$(cat "$release_dir/remote_install.py")
quoted_installer=${installer//\'/\'\\\'\'}
printf 'Uploading verified observatory release via %s…\n' "$remote"
ssh -T "$remote" "python3 -c '$quoted_installer' install" < "$work/payload.tar.gz"
printf 'Checking public pages…\n'
for slug in jupiter sonoluminescence; do
  expected=$(python3 - "$release_dir/manifest.json" "$slug" <<'PY'
import json,sys
print(json.load(open(sys.argv[1]))['files']['observatories/'+sys.argv[2]+'/index.html']['sha256'])
PY
)
  curl -fsSL --max-time 40 --retry 2 -o "$work/$slug.html" "https://aletheos.ai/observatories/$slug/?release=${expected:0:16}"
  python3 - "$work/$slug.html" "$expected" <<'PY'
import hashlib,sys
if hashlib.sha256(open(sys.argv[1],'rb').read()).hexdigest()!=sys.argv[2]:
    raise SystemExit('Installed, but public response differs from the release: '+sys.argv[1])
PY
  printf 'Live verified: https://aletheos.ai/observatories/%s/\n' "$slug"
done
curl -fsSL --max-time 40 --retry 2 -o "$work/index.html" "https://aletheos.ai/observatories/?release=aletheos-observatory-library-001"
python3 - "$work/index.html" <<'PY'
from html.parser import HTMLParser
import sys
class Check(HTMLParser):
    def __init__(self): super().__init__(); self.marker=False; self.links=set()
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='meta' and a.get('name')=='observatory-library-release' and a.get('content')=='aletheos-observatory-library-001': self.marker=True
        if tag=='a': self.links.add(a.get('href',''))
text=open(sys.argv[1],encoding='utf-8').read(); p=Check(); p.feed(text)
if '<?php' in text or '<?=' in text: raise SystemExit('PHP source was served; the index is not executing')
if not p.marker: raise SystemExit('Public index does not match this release')
if not {'/observatories/jupiter/','/observatories/sonoluminescence/'}<=p.links: raise SystemExit('Public index is missing the new observatories')
print('Live verified: https://aletheos.ai/observatories/')
PY
