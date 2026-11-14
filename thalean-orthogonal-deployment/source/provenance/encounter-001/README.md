# Orthogonal Encounter Lab v1.2 — research and engineering handoff

Handoff: **ORTHOGONAL-OBSERVATORY-ENCOUNTER-001**. Date: 2026-11-14.

The existing observatory now has a read-only Encounter Lab alongside Assembly, Inverse cube and Sheet history. Native data, graph construction, F transport, clock, history registration, camera and inverse-volume code retain their baseline bytes. No interaction law or effective memory register has been added. The experimental switch only reveals the recovered research and its obstruction.

## Source recovery

Repository: `rookinc/aletheos-ai`. Development branch: `thalean-orthogonal-encounter-v12`.

The recovered baseline is commit `9a1a659e8f6b1e4d83212271b7840788d1f3aa19` on `deploy/thalean-sheet-history-017v`. The repository's `main` commit `fb155cf9916ab1b4e502dd6d2bffdf7d21a59dfc` did not contain this observatory. The requested `~/dev/cori/research/mathematics/` tree is absent in this environment. Existing connected research packages supplied the missing certificates and producers.

The baseline rebuild exactly equals the tracked public page, SHA-256 `ebe248b6724f3e2727004b126b1b78f4bc6abb2670b830a4ce7a8406d573b44f`. Public retrieval returned HTTP 406; deployed bytes could not be compared. This is an unverified deployment identity, not an observed source mismatch. Production replacement is gated on resolving it.

| Responsibility | Recovered source, relative to `source/` |
| --- | --- |
| Entry and bundle | `src/ui.html`, `build.py`; tracked entry at `../../public_html/observatories/thalean-orthogonal/index.html` |
| Rendering and camera | `src/app.js`, `src/volume-camera.js`, `src/style.css` |
| Native carrier and F | `src/native-data.json`, `src/native-model.js` |
| Clock | `src/cycle-clock.js` |
| Registered sheet history | `src/paired-history.js`, `src/paired-history-data.json`, `src/paired-history-panel.js`; producer `scripts/generate-paired-history.py` |
| Inverse overlap | `src/inverse-volume.js` |
| Settings | `src/app.js`: `thalean-orthogonal-settings-1`; JSON load starts a fresh simulation |
| Original certificates | `provenance/017v/` and `provenance/017w-route-selection/` |
| Deployment | Existing SSH-wrapper convention in `../paired-sheet-history-017v/`; new guarded package in `../encounter-v12/` |

The new lab adds `src/encounter-{model.js,panel.js,panel.html,evidence.json}` and `src/encounter.css`. Integration edits are confined to `build.py`, `src/ui.html`, and `src/app.js`. The generated public page and release package reflect these changes on the development branch only.

## Required audit artifacts

Each JSON artifact identifies its inputs, executable producer, verdict, failures and interpretation limits. The in-app provenance inspector embeds all seven.

| Artifact | Verdict |
| --- | --- |
| [orthogonal_observatory_source_recovery_001](orthogonal_observatory_source_recovery_001.json) | Repository baseline recovered; live bytes unverified |
| [orthogonal_observatory_native_baseline_001](orthogonal_observatory_native_baseline_001.json) | PASS: preserved native construction and exact return law |
| [orthogonal_encounter_detector_001](orthogonal_encounter_detector_001.json) | PASS: reproducible visualization criteria, zero coupling |
| [orthogonal_registered_witness_001](orthogonal_registered_witness_001.json) | PASS: immutable observation log; dynamically ineffective |
| [orthogonal_six_channel_bridge_audit_001](orthogonal_six_channel_bridge_audit_001.json) | Field SU(6) replayed; display bridge not admitted |
| [g9000_native_operational_memory_audit_001](g9000_native_operational_memory_audit_001.json) | No distinguishing F continuation |
| [orthogonal_observatory_v12_regression_001](orthogonal_observatory_v12_regression_001.json) | Local regressions pass; production attestation pending |

## Established native results

There are 9,000 states, 45,000 undirected edges, degree 10, and 450 disjoint F cycles of least period 20. The application has one native simulation presented through three proper rotations, with independent visibility, opacity and phase offsets. It does not contain three separately evolving native organisms. Tests establish absence of feedback between these display choices and the common simulation.

The exact registered tuple is `(f, u, v, r, h)`, with frame `f mod 5`, ordered G15 pair `(u,v)`, relative V4 label `r in 0..3`, and hidden bit `h`. On every native state:

```text
F(f,u,v,r,h) = (f+1 mod 5, v,u, r XOR 3, h XOR (r >> 1))
```

For `pi=(frame,G900 quotient)`, F^10 restores pi and flips h; F^20 restores the full registered state. These statements hold for all 9,000 states. They are not statements about chart positions: at merge 0, zero of the 9,000 chart coordinates equal their F^10 coordinate within 1e-9. The lab labels quotient projection and chart XYZ separately.

The original PID plant, its continuous x/v/I arrays and imposed gains remain legacy apparatus in the old views. They do not supply a newly certified native physical law. The lab hides their amplitude readout and never treats the PID integral as native witness memory.

## Encounter and witness semantics

* **Spatial proximity:** all 450 by 450 completed-step chart vertices for each visible copy pair; Euclidean distance at most epsilon. Default F0, merge0, epsilon0.05 yields 21 candidate pairs.
* **Projection overlap:** the same comparison after the captured orthonormal camera projection, discarding depth. The identity projection test has 430 pairs; the browser's oblique camera has 1,143. These different counts are expected. The inspector also shows 3D separation.
* **Full envelopes:** the inherited 50^3 central-cube sampling and full F polylines. Default overlap has 1,592 occupied cells. Select a cell to recover the nearest source interval in each copy, including both native endpoints, segment number and interpolation fraction. These intervals need not occur simultaneously.

Point scans report the complete count and retain the nearest 200 candidates. Scans capture their configuration; changing controls marks a snapshot stale and removes its current-scene markers. Native label adjacency, shared registered label, cross-copy edge and proven interaction are separate outputs. Every scan has zero native coupling events. Coordinates and envelope interpolation have Visualization status.

The witness inspector appends up to 100 read-only observations. It keeps exact current/next tuples and scan context, supports record comparison and exports a replay certificate. Settings load starts a fresh simulation; earlier observations retain their captured contexts. The log does not feed evolution. Exported evidence is checked against the current source by `scripts/replay-encounter.cjs`; altered tuples and scan counts are negative controls.

## Operational memory and encounter order

All 9,000 pairs `(x,F^10 x)` have equal pi and different hidden bits. All 20 continuation classes F^n were tested, for 180,000 comparisons: projected outputs always agree. Example: native labels `0 / 488` continue to `2280 / 1808`, still with equal pi. Before/after tuples and replay inputs are retained.

Because F has order 20, this excludes a distinguishing continuation in any word in F and F^-1 for this projection. It does not exclude all future source-authorized operations. Different observations of a hidden bit alone do not establish that recorded history changes a response.

Let D=F^10. `[F,D]=0` on every label. A diagonal adjacency observation selector S_C can distinguish the D-related labels; the explicit `[S_C,D]` test has support 20. S_C is a readout projector, not a dynamical encounter. No admitted joint encounter operators C1 and C2 were recovered, so their dynamical commutator is not defined. No curvature or gauge-field conclusion is made.

## SU(6) and reciprocal witness recovery

The pinned Field Invariants 001 package contains the SU6 Native Relational Return 007 producer. Fresh replay and independent verification pass 47+46 SU6 checks and 38+42 field-invariant checks. Five coherent link rotations and one relative phase generate dimension 35 on the registered field, with representation `U tensor I2` and 24 real dimensions. The certificates preserve their assumptions: orientation and common registration are inherited, mixing flows are explicit field constructions, and a unique physical time law or connection is not selected.

The seven bridge questions are individually recorded in the bridge audit. No source-derived complex C6 readout or intertwiner connects the observatory's three embeddings to that field. Six signed normals have real rank three; this does not rule out an independently defined six-channel amplitude representation. The display identification remains Unsupported.

Reciprocal Witness 007 replay passes 55 exact checks, 22 independent exact checks and 8 numerical diagnostics (maximum numerical diagnostic error about 1.64e-10). The numbers 0, 488 and 7207 are zero-based labels in its own native registration; g/J=2/5 and the norm ratio 10 sqrt(2) are chosen parameters. The engineered mirror path, role fields and contact kernel are explicit model assumptions. Probe density returns and contact energy vanishes at return, but coherent phases differ; contact reactivates and the witness returns at 2T. This is a temporary distinction, not a permanent native latch.

The source comparison finds the observatory uses diagonal quotient **a**, while the reciprocal model uses **b** in the same named G60/deck construction. All 9,000 indexed F entries differ. The horizontal graphs have different exact trace(A^10): **10409947200** versus **10417204800**. This excludes a horizontal-graph-preserving identification, without claiming to classify arbitrary untyped graph isomorphisms. The experiment is documented but not transplanted or executed in the lab.

The History Crosswalk 001 sealed manifest was verified and its theorem inspected. Its larger balanced-release ancestor replay was not repeated here. Original package SHA-256 values and retained source file identifiers are in the bridge audit. `replay-research.py` accepts those original archives and rejects any hash mismatch; the archives are not duplicated in this repository.

## Reproduce and review

From `thalean-orthogonal-deployment/source`:

```bash
python3 scripts/run-encounter-regressions.py
python3 scripts/prepare-encounter-release.py
node scripts/replay-encounter.cjs provenance/encounter-001/browser-replay.json
```

To regenerate the research independently, supply the three original archives named in the bridge audit:

```bash
python3 scripts/replay-research.py --inputs /path/to/original-archives
python3 scripts/run-encounter-regressions.py
python3 scripts/prepare-encounter-release.py
```

The research producers need NumPy, SymPy, SciPy and NetworkX. Browser UI evidence is a separate CUA session receipt with pinned UI hashes; the local regression runner verifies its custody and does not pretend to rerun a browser. See [BROWSER_REPLAY.md](BROWSER_REPLAY.md) for the repeat procedure. Native/controller tests, invalid-input controls, export replay and the real guarded installer run locally. The installer tests mock SSH/HTTP and never deploy.

Desktop Chrome and 360x740/390x844 viewport layouts were exercised without application errors or horizontal overflow. Physical Android/touch-hardware testing remains outstanding. The narrow layout keeps an independently scrollable lab below the chart, with appearance controls in a disclosure.

Deployment and rollback instructions are in [the release plan](../../../encounter-v12/README.md). **This is a tested development release, not a production deployment.** Live-source byte comparison and owner review remain required. The absence of a native operational-memory theorem does not block a read-only release; absent production attestation does.
