#!/usr/bin/env python3
"""Refresh embedded G1800 source blocks and the release digest; no network."""
from pathlib import Path
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[2]
PACKAGE = ROOT / 'uft4-omega-deployment'
PAGE = ROOT / 'public_html/observatories/uft4-omega/index.html'
text = PAGE.read_text()
data = (PACKAGE / 'g1800/native-data.json').read_text().strip()
json.loads(data)
replacements = [
    (r'<!-- BEGIN G1800_DATA -->.*?<!-- END G1800_DATA -->',
     '<!-- BEGIN G1800_DATA -->\n<script id="g1800NativeData" type="application/json">\n' + data + '\n</script>\n<!-- END G1800_DATA -->'),
    (r'/\* BEGIN G1800_CODE \*/.*?/\* END G1800_CODE \*/',
     '/* BEGIN G1800_CODE */\n' + (PACKAGE / 'g1800/registration.js').read_text() + '\n/* END G1800_CODE */')
]
for pattern, replacement in replacements:
    if len(re.findall(pattern, text, flags=re.S)) != 1:
        raise SystemExit('Missing or duplicate source marker: ' + pattern)
    text = re.sub(pattern, lambda _: replacement, text, flags=re.S)
PAGE.write_text(text)
digest = hashlib.sha256(text.encode()).hexdigest()
(PACKAGE / 'release.sha256').write_text(digest + '\n')
print('Built G1800 page:', digest)
