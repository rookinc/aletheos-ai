#!/usr/bin/env python3
"""Bundle the retained static source without changing its numerical engine."""
import argparse, hashlib, json, re
from pathlib import Path

p = argparse.ArgumentParser()
p.add_argument('--source', type=Path, required=True)
p.add_argument('--output', type=Path, required=True)
a = p.parse_args()
d = a.source / 'dist'
html = (d / 'index.html').read_text()
css = (d / 'style.css').read_text()
engine = (d / 'engine.mjs').read_text()
app = (d / 'app.mjs').read_text()
data = (d / 'data.json').read_text()
json.loads(data)

def replace_once(text, old, new):
    if text.count(old) != 1:
        raise ValueError('Source contract changed: ' + old[:100])
    return text.replace(old, new, 1)

html = replace_once(html, '<link rel="stylesheet" href="style.css">', '<style>' + css + '</style>')
app, count = re.subn(r"^import .*? from './engine.mjs';\n", '', app, count=1)
if count != 1:
    raise ValueError('Expected one local engine import')
engine = re.sub(r'^export ', '', engine, flags=re.M)
app = replace_once(app, "const response=await fetch(new URL('./data.json',import.meta.url));if(!response.ok)throw new Error('The model dataset could not be loaded.');data=await response.json();", "data=JSON.parse(document.getElementById('native-dataset').textContent);")
html = replace_once(html, '<a class="button secondary" href="data.json" download="Thalean_Observer_Observatory_Model_Data.json">', '<button class="button secondary" id="download-model-data">')
html = replace_once(html, 'Download model dataset</a>', 'Download model dataset</button>')
app = replace_once(app, "$('source-links').innerHTML=", "$('download-model-data').onclick=()=>downloadJSON(data,'Thalean_Observer_Observatory_Model_Data.json');$('source-links').innerHTML=")
module = (engine + '\n' + app).replace('</script', '<\\/script')
payload = data.replace('</', '<\\/')
html = replace_once(html, '<script type="module" src="app.mjs"></script>', '<script type="application/json" id="native-dataset">' + payload + '</script>\n<script type="module">' + module + '</script>')
a.output.write_text(html)
print(json.dumps({'output': str(a.output), 'sha256': hashlib.sha256(a.output.read_bytes()).hexdigest()}))
