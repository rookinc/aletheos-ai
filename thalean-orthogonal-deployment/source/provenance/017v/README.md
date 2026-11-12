# 017V — Paired Sheet History implementation

The original F procession has a provenance-supported paired-state readout. This change exposes it in a reversible, opt-in panel without changing the native engine, source data, clock, camera or inverse-volume calculation. It does not establish the obstructed single-G60 path interpretation.

## What the panel means

Choose **Sheet history**, pause, restart, and use **Step F**. On cycle 1, ten advances display **Projected return · hidden bit flipped**; twenty display **Complete native return**. All 450 native F cycles obey this 10/20 distinction. The ordered G15 pair and frame can return after five advances when its two positions coincide; otherwise their first return is ten.

The relative sheet is `s XOR t` for the two native G60 factors. The hidden bit is the second factor's b coordinate. These labels use the minimum-native-index fiber frames from 017O, in order `[1,a,b,ab]`. Frame-dependent labels are not geometric rotations; return equality is independent of relabeling.

The registered reference is the selected cycle at phase zero plus the tracked copy's existing offset. Changing cycle or copy changes the reference, without resetting the clock. Clock phase and copy phase are displayed separately. The trail shows completed native transitions and includes both endpoints at a completed twenty-step boundary. It does not record interpolation samples. At advance zero the panel says **Start reference**, rather than claiming a historical return.

In inverse-cube mode, the panel still follows the native clock. The inverse cube remains the full-cycle envelope, independent of animation phase. The display frequency remains a display rate.

## Evidence and classification

| Result | Classification | Boundary |
|---|---|---|
| Coordinates recovered from original native pairing, deck maps and quotient | Provenance-supported construction | Uses the paired carrier, not a newly invented F operator |
| Exhaustive state/transition/return checks | Exact finite theorem, implemented as executable checks | Finite registered objects only |
| 017O and 017S inputs | Prior independently replayed certificates, bundled unchanged | This panel generator checks their coordinates; it is not a replacement for their original audit producers |
| Unchanged original engine and inverse-volume tests | Independently replayed certificate | Existing finite/numerical checks retain their stated scopes |
| Browser controls and responsive layouts | Software verification | Desktop browser and portrait/landscape viewport checks; physical Android touch hardware was not tested |
| Single-G60 edge-walk identification | Failed or unsupported identification | No invented shortest paths, edge-lift selection or loop holonomy is displayed |
| Original paired route selection | Open provenance question | See 017W; endpoint agreement does not identify a route |
| Four geometric dodecahedral cells around an edge; physical timing/coupling | Open conjecture | Not established by these finite-state results |

## Validation

`implementation_audit.json` and the four adjacent test logs record the completed run:

- 9,000 native state checks and 9,000 actual F transition checks.
- 180,000 cycle/phase/copy-offset snapshots.
- 1,890,000 trail entries and 27,000 return comparisons.
- 25 panel/settings integration checks executing the actual panel and settings validator.
- Both original test suites passed; their recorded scope is retained in their logs.
- All five canonical engine/data/clock/camera/inverse-volume files match the recovered baseline bytes.
- Metadata regeneration from the bundled inputs matches the shipped file byte-for-byte.

Browser checks covered default-off behavior, opening/closing/Escape, start/10/20 return states, off-diagonal cycle selection, copy offsets, hidden-copy notice, inverse mode, and 390×844 and 844×390 layouts. These are manual browser observations, distinct from the automated integration count.

No current verification check failed. During development, cycle selection originally waited for blur and the phase label did not distinguish copy offset from clock phase. Both were corrected and covered by the final tests. The unsupported native-route identification remains an explicit research obstruction.

## Reproduce

Run from `thalean-orthogonal-deployment/source` with Python 3 and Node.js:

```bash
python scripts/generate-paired-history.py --native-source provenance/017v/native.json --cover-certificate provenance/017v/017o.json --paired-certificate provenance/017v/017s.json
node test.cjs
node test-inverse.cjs
node test-paired-history.cjs
node test-paired-history-panel.cjs
python build.py
```

The generator reads the bundled evidence and writes only `src/paired-history-data.json`. The build emits a self-contained `dist/index.html`; no external requests or packages are needed to run it. `source_hashes.json` records SHA-256 values of changed source, test, producer, evidence and built HTML files at release preparation.

## Source and reversibility

Repository: `rookinc/aletheos-ai`. Recovered source baseline: `7abb1c6681879db06a292952d0fc4b0440c206de`, on `deploy/thalean-orthogonal-v1.1`. Implementation branch: `research/017v-paired-sheet-history`.

The panel is disabled by default; closing it immediately removes its readout. Settings retain an optional `pairedHistory` object; older settings remain valid and disable the panel. Existing X/Y/Z/O views and geometry are retained. Reverting the implementation commit removes the enhancement completely.

No deployment was performed. The repository's deployed/public HTML was not replaced. Any future release requires a separate deployment decision after review of this source change and its built artifact.
