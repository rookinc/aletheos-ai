#!/usr/bin/env python3
"""Rebuild the self-contained release from its editable UI and embedded data.
Optional argument: a replacement JSON dataset, independently verified before release.
"""
from pathlib import Path
import hashlib,json,re,sys
root=Path(__file__).resolve().parents[1];package=root/'water-discharge-deployment';page=root/'public_html/observatories/water/discharge/index.html'
data=Path(sys.argv[1]).read_text() if len(sys.argv)>1 else re.search(r'<script id="water-data"[^>]*>(.*?)</script>',page.read_text(),re.S)[1]
assert json.loads(data)['schema']=='water-observatory.discharge.v1'
html=(package/'observatory.template.html').read_text().replace('__WATER_DATA__',data)
assert '__WATER_DATA__' not in html
page.parent.mkdir(parents=True,exist_ok=True);page.write_text(html)
(package/'release.sha256').write_text(hashlib.sha256(page.read_bytes()).hexdigest()+'\n')
print('Built',page)
