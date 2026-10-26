# Aletheos Native Terrain v3.1 — Living Geometry

A working experimental instrument for G60 → G900 → G1800 → G9000, the native
three-beat walker, the `123223` Waltz register, five-frame harmonics, and
history-dependent graph walks. CoRI research; Rook Services Inc. operations.

Open **`living.html` through HTTP(S)**. The existing `index.html` observatory
remains available. This application is static and buildless; it requires no
API key, backend, or package installation. Serve the `native-terrain/` directory
with a normal static HTTP server; `file://` loading is unsupported. The target
development entry is `https://dev.rook.ca/aletheos/living.html`, but this release
has not yet been deployed there. See `LIVING-REPORT.md` for verification status.

## First five minutes

1. **Waltz** opens with continuous playback. Pause, then use forward/backward
   steps. The same directed-edge event follows its unique triangle and returns
   after three steps. The six visible positions read `1 2 3 | 2 2 3`; they are
   an experimental event register, not vertex indices or recovered operations.
2. In **Geometry**, switch between left/right G60, the coupled pair, G900,
   G1800, and G9000. Click a visible state to inspect its identifiers, quotient
   pairs, neighbors, or fixed-locus status. Vertex labels are one-based;
   directed-edge storage indices are zero-based. Choose a quotient root and
   press **Use as initial root & restart** to register it for both runs.
3. In **Harmonics**, choose action **F** and press **Advance 20** from a restart.
   The registered state returns. Action **S** returns after five steps; **K**
   returns after four. Inspect any intermediate state with single steps.
   Choose common mode, individual channels, conjugate pairs, or recombination.
   The excitation control switches localized, equal common, and opposed-pair
   frame amplitudes. Energies are calculated Fourier quantities; they do not
   represent physical waves.
4. In **Memory laboratory**, use the default visible experiment: seed `41`,
   root `1`, edge `0`, strength `2`, retention `0.96`, gain `1`, depth `256`, and
   `120` encounters. Press **Run synchronized A/B**. Both trajectories start
   identically and use the same random sample at each encounter. A has zero
   feedback; B uses retained history in its next-transition probabilities.
   This configuration first differs at encounter `3` and has `118` differing
   post-step states out of `120` encounters.
5. Press **Zero coupling** to replay the same initial conditions without
   feedback. The A/B paths coincide. Open **Diagnostics & provenance**, export
   a comparison receipt, then use **Import run** to reproduce it.

## Controls and interpretation

- **Play / pause, forward, backward, restart:** simulation ticks are independent
  of rendered frames. Reverse reconstructs the preceding deterministic state,
  including history. Restart restores the selected initial conditions. Space
  toggles playback; left/right arrows step when focus is outside controls.
- **Camera:** drag to orbit, Shift-drag to pan, wheel to zoom. Two-finger touch
  supports pan/pinch. Reset view and perspective/front/top presets are provided.
- **Mobile:** Geometry & layers and Dynamics & controls open collapsible panels.
  A/B views stack on narrow screens. Reduced rendering quality and particle
  density lower drawing work without changing finite dynamics.
- **Memory strength × feedback gain:** B's feedback coefficient. Disabling
  memory, setting strength to zero, or setting gain to zero recovers A's rule.
  Both runs still collect diagnostic encounter histories so comparisons remain
  inspectable; only B feeds that history into transition selection.
- **Retention λ:** retained events are weighted by `λ^age`; `1` retains equal
  weight within the finite history window and `0` retains only the most recent
  event. **History depth** limits the number of weighted encounter events.
- **Parameter changes:** memory controls and seed changes replay both runs from
  their shared starting condition to the current encounter count. **Clear
  history** instead clears retained memory at the current finite state; the
  reset event is included in replay/export. It does not erase the trajectory.
- **Trace persistence:** limits the visible trail only. Changing it cannot
  change transition probabilities or produce memory backaction.
- **Experimental deformation and candidate interface:** visualization overlays.
  They never alter native adjacency and assert no certified defect or physical
  gravitational displacement.
- **Timeline:** the most recent 32 encounters are selectable for before/after
  state, common random sample, parameters, and metrics. Full encounter logs are
  retained in the exported run, up to the supported 10,000-encounter limit.
- **Suspension:** hiding the browser pauses playback. Press Play on return;
  there is no uncontrolled wall-clock catch-up.

## Save and reproduce

Export buttons download JSON wrapped as `aletheos.living-session.v1`. They bind
the four loaded source SHA-256 hashes, registered action, excitation, mode,
carrier, and one of these payloads:

| Export | Payload | Import behavior |
| --- | --- | --- |
| Configuration | `aletheos.living-config.v1` | Starts from the saved parameters and initial state |
| Snapshot | `aletheos.living-snapshot.v1` | Replays the log, parameter history, and resets to the saved encounter |
| Comparison receipt | `aletheos.living-comparison-receipt.v1` | Includes metrics, adjacency compliance, and the complete replayable snapshot |

Imports reject mismatched native sources, unsupported configurations, oversized
logs, and snapshots inconsistent with deterministic reconstruction. JSON files
are limited to 32 MB and runs to 10,000 encounters. Save a receipt before closing
the page: browser-local run state is not automatically stored across reloads.
The lightweight kernel topology checksum detects accidental mismatch; it is
not a cryptographic authenticity certificate. The application also records
source SHA-256 hashes.

## Headless use

The finite kernel has no renderer, browser clock, or network dependency. From
`native-terrain/`, an ES-module Node script can run the same A/B experiment:

```javascript
import {readFileSync} from 'node:fs';
import {buildGeometry} from './living-geometry.mjs';
import {createExperiment, stepExperiment, exportReceipt} from './living-kernel.mjs';

const read = name => JSON.parse(readFileSync(`./data/${name}`, 'utf8'));
const geometry = buildGeometry(read('g60.json'), read('g15-quotient.json'));
const run = createExperiment(geometry, {
  seed: 41, initialQ: 0, initialEdge: 0,
  memoryEnabled: true, memoryStrength: 2,
  retention: 0.96, historyDepth: 256, feedbackGain: 1,
});
for (let n = 0; n < 120; n++) stepExperiment(run);
console.log(JSON.stringify(exportReceipt(run), null, 2));
```

`living-harmonics.mjs` separately exports `loadRegistered`, `registeredStep`,
`projectChannels`, `recombineChannels`, `harmonicSummary`, and
`registeredReturnReceipt`. Load `data/living-registered.json` to inspect native
F/S/K/Delta actions without running an experimental trajectory.

## Validate and package

```bash
npm test || exit 1
npm run verify || exit 1
python3 -m unittest discover -s tests -p 'test_living_deployment.py' || exit 1
python3 tools/build-living-registered.py || exit 1
python3 tools/build.py || exit 1
python3 deployment/verify-files.py ../dist/living-geometry-packet/site || exit 1
```

The registered-data builder reproduces the source-defined canonical-model
portion of recovered Audit 040 against pinned evidence hashes. Static packaging
preserves the old observatory alongside Living Geometry. Deployment uses a
separate immutable release directory and atomically activates only
`/aletheos/living.html`; see `deployment/LIVING-DEPLOYMENT.md` for verification
and rollback.
