# ALETHEOS-SIM-003 architecture and access inventory

Inspection and integration date: 2026-10-26. This inventory records the source
starting point and recovered integration assets. See
`native-terrain/LIVING-REPORT.md` for executed behavior and acceptance status.

## Source and rollback boundary

Base: `rookinc/aletheos-ai`, branch
`feature/aletheos-sim-002-native-terrain`, commit
`399e294808b231ca69f2a3bc0de2701b3be16e22`. The remote head matched the local
source at inspection. A separate SIM-003 feature checkout preserves this
rollback point and unrelated edits in the earlier checkout. No repository
`AGENTS.md` or GitHub deployment workflow was found.

## Reusable infrastructure

| Source | Existing capability | Integration treatment |
| --- | --- | --- |
| `native-terrain/kernel.mjs` | Exact adjacency, paths, finite permutation/cover verification | Reuse as the native G60 foundation; keep rendering separate |
| `native-terrain/data/g60.json` | 60-state graph, exact edge set, source display layout | Load exact native data; display coordinates are not intrinsic geometry |
| `native-terrain/data/symmetry.json` | Exhaustive 480-element symmetry data and derived generators | Preserve as existing computational reference |
| `native-terrain/data/project41-bundle.json` | Pinned Project 41 G60/deck source | Reuse explicit native V4 permutations for coupled construction |
| `native-terrain/data/project41-automorphism-cache.json` | Project 41 full permutation cache | Preserve reference data |
| `native-terrain/data/project41-g15-audit.json`, `g15-quotient.json`, `g30-quotient.json` | Explicit quotient/fiber witnesses | Preserve old inspector and reuse construction evidence |
| `native-terrain/app.mjs`, `style.css`, `index.html` | Static ES-module observatory, camera input, selections, receipts | Preserve old entry and controls; add `living.html` alongside it |
| `public_html/json/p900/` and legacy viewers | Historical G900 Observatory artifacts | Research/reference inputs; do not silently replace bound carriers with legacy candidates |
| `native-terrain/tests/`, `tools/verify.mjs` | Headless finite checks | Run alongside new dynamics tests |
| `native-terrain/deployment/` | Static hash verification and old staging plan | Extend with isolated release directories and reversible entry activation |

The initial SIM-002 kernel did not load G1800/G9000 or implement history-dependent
dynamics. SIM-003 now adds `living-geometry.mjs`, `living-harmonics.mjs`,
`living-kernel.mjs`, `living-renderer.mjs`, and `living-app.mjs`, with the
`living.html`/`living.css` interface. The render-independent deterministic kernel,
walker/Waltz playback, registered transport, Fourier projection, memory feedback,
A/B comparison, and scientific diagnostics execute together. Their
native/derived/experimental boundaries remain visible in diagnostics. The
uncertified defect seam remains a candidate overlay.

The supplied HOG52002/GRA004 archive was recovered. Audit 040 source
`audit_transported_g1800_c5_c4_groupoid_040.py` and its JSON receipt are preserved
under `native-terrain/evidence/living/`. Their SHA-256 hashes are pinned by
`tools/build-living-registered.py` and recorded in `data/living-registered.json`.
That builder reproduces one native ordered axis registration, yielding 1,800
states, 7,200 edges, source-defined K/Delta actions, and the two-to-one G900
projection. The five-frame F action and Fourier projectors are implemented
and checked in JavaScript. Separately named Bridge 001–008 artifacts were not
recovered after targeted Library searches; no missing certificates were invented.
The older source inventory's unavailable-manuscript and live-title statements
remain historical, not current deployment evidence.

## Live deployment and access

Read-only HTTP inspection of `https://dev.rook.ca/aletheos/` returned 200 with
page title “Aletheos — Native Thalean Graph Observatory,” identifying Native
Terrain v3.0. Its HTML uses `app.mjs`, `style.css`, and the expected canonical
data links. This establishes the observed public entry, not complete asset or
browser verification.

The connected GitHub account reports push/admin permission, and remote Git
read access works. Direct host deployment is blocked in this executor: SSH
alias `gurtiamy` is not configured and authenticated host access was not
available. No remote staging, backup, cutover, or browser success is claimed.
The intended additive deployment is `/aletheos/living.html`; existing
`/aletheos/` remains available. See
`native-terrain/deployment/LIVING-DEPLOYMENT.md` for the concrete staging,
activation, served-byte verification, and rollback procedure.
