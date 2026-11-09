#!/usr/bin/env bash
# Publish via the existing Termux -> Bluehost connection.
set -u
fail() { printf 'XYZ flower deployment stopped: %s\n' "$*" >&2; exit 1; }
remote=${OBSERVATORY_SSH_TARGET:-gurtiamy}
case "$remote" in ''|-*|*[!A-Za-z0-9_@.:-]*) fail 'Invalid SSH target.';; esac
[ "$#" -eq 0 ] || fail 'Run without arguments.'
for tool in python3 ssh curl; do
  command -v "$tool" >/dev/null 2>&1 || fail "Missing $tool. Termux: pkg install python openssh curl"
done
release_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P) || fail 'Cannot locate release.'
work=$(mktemp -d) || fail 'Cannot create staging directory.'
trap 'rm -rf -- "$work"' EXIT
python3 "$release_dir/remote_install.py" pack "$release_dir" "$work/payload.tar.gz" || fail 'Release validation failed.'
installer=$(cat "$release_dir/remote_install.py") || fail 'Cannot read installer.'
quoted_installer=${installer//\'/\'\\\'\'}
printf 'Uploading XYZ Flower v0.10.3 via %s…\n' "$remote"
ssh -T "$remote" "python3 -c '$quoted_installer' install" < "$work/payload.tar.gz" || fail 'SSH installation failed; see server message above.'
for file in index.html pilot002-evidence.json; do
  curl -fsSL --max-time 40 --retry 2 -o "$work/$file" "https://aletheos.ai/observatories/xyz-flower/$file?release=v0.10.3" || fail "Installed, but public fetch failed for $file."
  python3 - "$release_dir/manifest.json" "$work/$file" "$file" <<'PY'
import hashlib,json,sys
expected=json.load(open(sys.argv[1]))['files']['observatories/xyz-flower/'+sys.argv[3]]['sha256']
if hashlib.sha256(open(sys.argv[2],'rb').read()).hexdigest()!=expected:
    raise SystemExit('Public response differs from installed release: '+sys.argv[3])
PY
  [ "$?" -eq 0 ] || fail 'Public checksum verification failed.'
done
curl -fsSL --max-time 40 --retry 2 -o "$work/catalog.html" 'https://aletheos.ai/observatories/?release=xyz-flower-v0.10.3' || fail 'Installed, but catalog fetch failed.'
python3 - "$work/catalog.html" <<'PY'
from html.parser import HTMLParser
import sys
class Check(HTMLParser):
    def __init__(self): super().__init__(); self.links=set()
    def handle_starttag(self,tag,attrs):
        if tag=='a': self.links.add(dict(attrs).get('href',''))
s=open(sys.argv[1],encoding='utf-8').read();p=Check();p.feed(s)
if '<?php' in s or '<?=' in s: raise SystemExit('PHP source was served instead of the catalog')
if '/observatories/xyz-flower/' not in p.links: raise SystemExit('Catalog does not list the XYZ flower')
if 'XYZ Flower · Thalean Observatory' not in s: raise SystemExit('Catalog title missing')
PY
[ "$?" -eq 0 ] || fail 'Catalog verification failed.'
printf 'Live verified: https://aletheos.ai/observatories/xyz-flower/\nLibrary verified: https://aletheos.ai/observatories/\n'
