"""Verify every packaged byte over HTTP; this does not replace browser QA."""
import argparse
import hashlib
import json
from pathlib import Path
import re
from urllib.parse import quote
from urllib.request import Request, urlopen

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('site', type=Path)
parser.add_argument('release_url', help='Exact immutable living-release URL')
parser.add_argument('--entry-url', help='Public /aletheos/living.html URL')
args = parser.parse_args()
manifest = json.loads((args.site / 'manifest.json').read_text())
expected = dict(manifest['files'])
expected['manifest.json'] = hashlib.sha256((args.site / 'manifest.json').read_bytes()).hexdigest()
failures = []

def fetch(url):
    with urlopen(Request(url, headers={'Cache-Control': 'no-cache'}), timeout=30) as response:
        if response.status != 200:
            raise ValueError('HTTP ' + str(response.status))
        return response.read()

for name, digest in expected.items():
    try:
        actual = hashlib.sha256(fetch(args.release_url.rstrip('/') + '/' + quote(name))).hexdigest()
        if actual != digest:
            failures.append({'file': name, 'reason': 'SHA-256 mismatch'})
    except Exception as error:
        failures.append({'file': name, 'reason': str(error)})
if args.entry_url:
    try:
        release_name = args.release_url.rstrip('/').rsplit('/', 1)[-1]
        source = (args.site / 'living.html').read_text()
        activated, count = re.subn(r'(<head\b[^>]*>)',
                                  lambda m: m.group(1) + '<base href="./' + release_name + '/">',
                                  source, count=1, flags=re.I)
        if count != 1 or fetch(args.entry_url) != activated.encode():
            failures.append({'file': 'public living.html', 'reason': 'Entry bytes/base URL mismatch'})
    except Exception as error:
        failures.append({'file': 'public living.html', 'reason': str(error)})
print(json.dumps({'schema': 'aletheos.served-verification.v1',
                  'release_url': args.release_url, 'files_checked': len(expected),
                  'entry_checked': bool(args.entry_url), 'failures': failures,
                  'browser_verified': False, 'passed': not failures}, indent=2))
raise SystemExit(1 if failures else 0)
