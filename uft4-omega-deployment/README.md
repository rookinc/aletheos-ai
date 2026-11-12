# UFT4 Omega 16.0.0 — G1800 registration

The existing `/observatories/uft4-omega/` gains a **G1800 lift** selector beside **G900 host**. The G900 opening profile, native tables, field equation, credits, camera controls and original host view are retained. The standalone HTML contains the complete native fixture and code; it makes no new network requests.

## G1800 behavior

- Select any of the three diagonal kernels: a, b or ab.
- Inspect all 1,800 kernel classes in a two-sheet overview, or inspect a selected class's two equivalent ordered-pair representatives on two G60 factor graphs.
- Select an exact class index, native quotient G900 index, or registered sheet. State identities display one-based numbers with explicit zero-based indices; native G60 vertices are V1 through V60.
- Apply K, K inverse, the residual deck involution Δ = K², or K⁴. The selected source-registered K has 450 free four-cycles per kernel.
- Run the discrete cycle with global Play/Pause, direction and Time speed; its own rate is 0.25–4 K steps per simulation second. The G900 pulse holds while G1800 is active.
- Apply any of the 480 native diagonal automorphisms and its inverse. Kernel changes follow the native deck action. Changing kernel manually preserves the selected least ordered-pair representative and registers a new origin.
- Export a local JSON receipt identifying the selected state, source revision, projection, representatives, exact action and open boundaries.

The carrier selector remains visible while the controls panel is collapsed. Select **G1800 lift**, then **Menu** for its controls. The current G900 view remains the initial view; G1800 cycle playback starts paused. Existing settings files migrate safely. New schema-3 settings retain native carrier selection, origin, action count, selected automorphism, drawing view, rate and playback. Schema-1/2 settings restore G900 with default native registration. Invalid imports are checked before live state changes.

## What the view asserts

G1800 is the finite set `(G60 × G60) / <h,h>`; the two-to-one projection goes to the native diagonal-V4 quotient set of size 900. Each G1800 class has two ordered-pair representatives; two such classes share a quotient G900 address. These are separate two-element relationships.

The current Audit052 G900 host uses a separate registration. **No correspondence to its block/vertex indices is asserted.** This change adds no G1800 graph adjacency or field coupling. The overview's two toroidal sheets and numbering are display conventions. Projection fibers identify common quotient addresses; cycle connectors identify action steps, not graph edges. The representative view draws only the two preserved native G60 graphs. Gauge-module exactness remains unresolved. No G9000 frames or physical identification are added.

The three K permutations are extracted from frame 0 of Audit040 constructions 00, 01 and 02 and conjugated into the common native quotient coordinates. They are selected registered actions, not an assertion that one K is intrinsically preferred. Their square is independently checked against residual diagonal deck action.

## Source and build

Native sources are pinned to repository commit `bdeeb0055d1783760869e862bd02c1abec856d7c`, Project 41 revision `e1bf21ca3ab700f69432852436f092442f8b46bd`. `g1800/native-data.json` retains source hashes and the minimal deck, automorphism and turn tables. `g1800/registration.js` owns the finite engine and carrier UI; the reviewed HTML embeds both.

Rebuild after editing either embedded source:

```sh
python3 uft4-omega-deployment/tools/build-g1800.py
node uft4-omega-deployment/tests/g1800.cjs
```

The Node test harness has no package dependencies. Source-backed tests use the pinned Git objects. If those objects are absent, fetch the existing `work/aletheos-sim-001` branch before running; tests fail rather than silently omitting source comparisons.

## Verification and pending gate

**12 check groups passed in a JavaScript V8 execution isolate.** They reproduce all 14,400 product-state quotient assignments, check all 5,400 kernel states, reproduce all 5,400 selected K images, and verify quotient descent/inversion for all 480 automorphisms on all 5,400 states (2,592,000 state transports). Tests also cover rejected inputs, legacy settings migration, atomic invalid imports, receipts, controller controls, paused playback, return to G900 and finite drawing coordinates. Core and all three construction SHA-256 hashes match the pinned manifest. The complete embedded main script and test harness pass syntax compilation; all 160 static DOM IDs are unique.

The workspace disconnected during implementation. The reproducible Node CLI harness is supplied but was not itself executed after that loss. Canvas calls in controller tests are mocked. **Browser rendering, real settings-file download/import, physical Android behavior and sustained performance remain pending.** Keep this update in draft and complete those checks before deployment. The existing historical browser suites have not been rerun for this update; their earlier results apply to earlier releases.

See `g1800/test-results.json` for executed checks and limits. `TEST_REPORT.md` retains historical release evidence.

## Browser acceptance checklist

1. Open the page at desktop and narrow mobile widths. Verify launch credits, Continue, and the retained G900 opening profile.
2. Select G1800 lift and open Menu. Check the overview, each kernel, maximum class index, both sheets and G60 representative view. Verify labels remain readable, controls fit, and no JavaScript errors occur.
3. Step K forward/backward, exchange sheets, apply K⁴ and reset. Run/pause the cycle, global Pause, reverse direction, zero Time speed and page hiding. Verify no hidden catch-up steps.
4. Apply an automorphism that exchanges b/ab, then its inverse. Verify exact return.
5. Export/import schema-3 settings and a native receipt. Import the retained original schema-1 ZIP and a schema-2 file; verify G900 opening state returns. Reject invalid state indices and incompatible origin/action counts without changing live state.
6. Return to G900. Verify original host selection, pulse, field styles, orbit, camera, Sunlight and settings controls. Check both normal and Safe Sheets startup.

## Deployment after the pending checks

The guarded deployer now admits the exact v15.9.10 predecessor hash `c438128b28eec599ac895d0da3531e25406024e1a1fa040adaec88811b7a053b`, retaining its earlier checksum guards, outside-webroot rollback copy and atomic installation. It still changes only `~/www/observatories/uft4-omega/index.html`. The script changes have not been shell-executed in this disconnected environment.

Use the existing website checkout and hosting access after validation:

```sh
cd ~/dev/cori/website/aletheos.ai || exit 1
git pull --ff-only || exit 1
bash uft4-omega-deployment/deploy.sh
```

A GitHub commit is not a live deployment. No live page has been changed by this work.

## Attribution

Thalean Graph elements: **Scott Allen Cave**. UFT4 Omega work: **Joachim Kiseleczuk**. Existing publication links and credits are preserved.
