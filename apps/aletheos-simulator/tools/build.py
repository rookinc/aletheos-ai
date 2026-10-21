from pathlib import Path
import hashlib,json
R=Path(__file__).resolve().parents[1]
s=(R/'baseline/index.html').read_text()
assert hashlib.sha256(s.encode()).hexdigest()=='ae3cc5bc9f9952a55b40f8db482f00283a812fd161776ad25dcfbd51efefd0bf'
s=s.replace('</head>','<link rel="stylesheet" href="native/observatory.css">\n</head>')
section='''<section id="native-observatory" aria-label="Native Thalean Observatory">
<div class="brand">CoRI / NATIVE MATHEMATICAL OBSERVATORY</div><h2>Let the graph determine the action.</h2>
<p>Exact finite states, registered transport, inspectable evidence. The Thalion is distinct from its display geometry.</p>
<nav class="no-nav" aria-label="Native carrier views">
<button data-native-view="g60" aria-pressed="true">G60 · Native Geometry</button><button data-native-view="g900" aria-pressed="false">G900 · Relational Quotient</button><button data-native-view="g1800" aria-pressed="false">G1800 · Gauge &amp; Transport</button><button data-native-view="g9000" aria-pressed="false">G9000 · Spectral Closure</button><button data-native-view="tensor" aria-pressed="false">Tensor Laboratory</button>
</nav><p id="no-status" class="no-status" role="status">Loading hash-pinned native fixtures…</p>
<div class="no-grid"><div><svg id="no-svg" viewBox="0 0 620 420" aria-label="Native mathematical state visualization" role="img"></svg><p id="no-caption" class="no-caption"></p><div id="no-sectors" class="no-sectors"></div></div><div id="no-controls" class="no-controls"></div></div>
<pre id="no-readout" class="no-readout" tabindex="0" aria-label="Native coordinate and invariant readout"></pre>
<details><summary>Mathematical receipts · deterministic JSON</summary><p>Checks describe computation, not animation or physical proof. Receipts are content-addressed, not signed or notarized.</p><label for="no-receipts">Recorded operations</label><select id="no-receipts"><option>No operations yet</option></select><div class="no-buttons"><button id="no-copy">Copy receipt</button><button id="no-export">Export receipt JSON</button></div><pre id="no-receipt" class="no-readout" aria-label="Selected mathematical receipt"></pre></details>
<p class="no-foot">CoRI research · Rook Services Inc. operations · ALETHEOS-SIM-001 · Native / derived / registered / interpretive statuses remain distinct. Existing illustrative workspaces continue below.</p>
</section>'''
s=s.replace('<section class="selectors"', '<section class="selectors"',1)
# Add before existing app; no existing handlers or mathematical state are replaced.
s=s.replace('</header>','</header>\n'+section,1)
if 'id="native-observatory"' not in s: raise RuntimeError('Baseline insertion anchor missing')
manifest=json.loads((R/'source-manifest.json').read_text())
s=s.replace('</body>',f'<script>window.TH_NATIVE_CORE_SHA="{manifest["coreSha256"]}";</script>\n<script src="native/math.js"></script>\n<script src="native/observatory.js"></script>\n</body>')
(R/'webroot/index.html').write_text(s)
(R/'webroot/release.json').write_text(json.dumps({'app':'Thalean Atomic Helix + Native Observatory','version':'2.1-native-001','target':'https://dev.rook.ca/aletheos/','artifact_sha256':hashlib.sha256(s.encode()).hexdigest(),'baseline_sha256':manifest['baselineSha256'],'deploy_status':'prepared_not_uploaded','source':'apps/aletheos-simulator'},indent=2)+'\n')
print('Built webroot/index.html; original application preserved')
