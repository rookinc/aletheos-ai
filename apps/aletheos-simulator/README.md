# ALETHEOS-SIM-001 — Native Thalean Observatory

An additive extension of the actual **Thalean Atomic Helix v2.0** deployment at
https://dev.rook.ca/aletheos/. CoRI research; Rook Services Inc. operations.

## Source and deployment identity

This app previously existed as release assets in `rookinc/aletheos-ai`, release
`dev-thalean-atom-v2.0`, rather than a tracked simulator directory. This directory
admits that exact deployed source into the same repository and extends it.
`baseline/index.html` is byte-identical to the live page retrieved on 2026-10-21.
The unrelated `rookinc/aletheos` B32K apparatus and RookOS are not modified.

## Run and verify

Python 3.11+, Node 18+; runtime is static HTML/CSS/JavaScript with no npm dependencies.

```sh
python3 -m pip install -r requirements-dev.txt
npm install
python3 tools/generate.py
python3 tools/build.py
npm run test:dom
npm test
python3 -m http.server 8765 --directory webroot
# In another terminal, after installing Playwright Chromium:
npx playwright install chromium
npm run test:browser
```

Use HTTPS or localhost: SHA-256 fixture validation and receipts require Web Crypto.
Do not open `index.html` as a file URL: fixtures load using fetch.
`TEST_URL` selects a test server; `BROWSER_EXECUTABLE` can select an installed
Chromium binary. Browser tests default to `http://127.0.0.1:8765/`.

Only the core (~388 KB) and one construction (~244 KB) load initially. Selecting
another construction replaces the single-construction cache. The UI renders one
20-state orbit, never 9,000 graphical nodes. Fixtures are frozen after hash checks.

## Implemented

- G60 native vertex/edge/triangle inspection, encounter root and BFS distances,
  all 480 automorphisms, six C5 subgroup selections, exact permutation readout.
- G900 diagonal V4 quotient **set**, four representatives, ordered factor selection
  and verified quotient-compatible native graph distance. Adjacency unavailable.
- Three G1800 kernel quotients, canonical representative conventions, native
  automorphism transport between sectors, explicit projection to G900.
- All 24 Audit 040 constructions: frame/quotient selection, exact forward/reverse,
  five-step and twenty-step actions, native coordinate maps, selected return orbit.
- Numerical native Laplacian modes and separate five-frame spectral projectors.
  Scalar and both real pairs are displayed; zero sectors are supported.
- Deterministic SHA-256 receipts: exact input/output, classification, source hash,
  revision and invariant checks; local copy/JSON export.
- Original Explore/Research, H/He/O, helical controls, candidate assemblies,
  histories, branches, convergence and original receipts remain present.

## Deliberate mathematical boundaries

G900 adjacency, pair perturbation and native tensor response are unavailable.
G1800 normalization corrections are archived evidence inspection only; executable
normalization is a continuation item. Cocycle validity, ambient section exactness,
gauge-valuedness and tested inverse-loop residuals are reported separately.
**Gauge-module exactness is unresolved.** Audit 066's historical exactness Boolean
is not used as proof of that stronger claim.

Laplacian modes, frame characters and candidate tensor polarization are distinct.
The conventional tensor character pair is k=2,3 for generator angle 2π/5;
labels depend on registration. No physical identification or intertwiner is claimed.

## Verification status

33 mathematical/source/receipt tests and the DOM integration suite pass.
All 24 full construction certificates reproduce, covering 216,000 registered states.
DOM tests exercise all five views, construction 0/23, exact round trips,
source-to-target maps, receipts and legacy Helium/Step controls without JS errors.
Canvas/animation are stubbed in that suite; it is **not rendering evidence**.

Desktop/mobile Playwright tests are supplied but **not passed in this environment**:
Chromium's required socket creation was denied. Cloud Browser also rejected file
previews under its URL security policy. No new desktop/mobile screenshot or physical
Android test is claimed. Do not deploy before completing that gate.

See `docs/RECONNAISSANCE.md`, `docs/HANDOFF.md`, `source-manifest.json`,
`docs/pinned-source-verification.json` and the machine-readable test results.
