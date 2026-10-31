# UFT4 Omega v15.9.7 — screenshot defaults and portable settings

Prepared from reviewed v15.9.6.

## Changes

Opening defaults now use **100% merge**, **2.80 zoom**, **13% G900 opacity**, and Camera Orbit off. Host, field face, quotient fibers and BC trails are enabled; the other main display flags and labels remain off. Fiber opacity and tail opacity remain 25%, trail length 182°, field cycle 1 Hz, and Plasma / Hyperblue are retained. Camera angles stay at 40° yaw, 25° pitch and −55° roll: the screenshots do not expose angle readouts or an exact animation time. No merge oscillator was restored.

The **Save & load settings** section exports a ZIP containing `uft4-omega-settings.json` and imports that ZIP, a normally deflated ZIP, or plain JSON. A visible download link remains available after export for retrying the browser download. Only one object URL is retained, replaced on the next export and revoked on page exit.

Schema version 1 includes camera angles/zoom; all field appearance and display flags; BC controls; simulation parameters, time, mode, play state and direction; host display, source/neighbor selection, rate, repeat, play state, travel and lap count; independent-generator/audit parameters; Camera Orbit; and collapsible-panel state. Presets are represented by their resulting angles. Frequency is represented by omega. Native topology, generated sites/edges/audit output, diagnostics history and adaptive realized quality are not serialized. Imported controls clear previous generated results so they can be regenerated from the restored settings.

Imports validate all groups, field types, finite numeric ranges, native host-neighbor relation and source-specific pulse bounds before changing the scene. Active research jobs must finish or be cancelled before import. Existing graphics/BC failure barriers remain in force. Settings are processed locally; there is no upload or external runtime dependency.

The ZIP writer uses stored entries for reliable offline round trips. The reader accepts stored/deflate archives with exactly one JSON file, at most 16 entries, a 1 MiB archive/declared-total limit and a 256 KiB JSON limit. It checks local/central consistency, bounds, overlaps, selected JSON CRC and actual inflated length; encrypted, ZIP64 and multi-disk archives are rejected. Other entries are structurally checked and skipped without extraction. Their payload CRCs are not evaluated. Deflate import uses the browser's raw DecompressionStream; browsers without it can still import app-exported stored ZIPs or extracted JSON.

Release HTML: 226,774 bytes. SHA256 `c9af1de3565968894c23efccaaf25e9117e9f3ca25266af343914f0c086f64eb`. A verified `default-settings.zip` is included with launch settings and time zero.

## Validation

- Inline JavaScript and Bash syntax passed.
- **13/13 camera/default tests, 12/12 themed-overlay tests and 6/6 launch tests passed.** Seven mathematical-engine source hashes continue to match the inherited release. Camera-only orbit and manually fixed merge remain intact.
- **10/10 settings tests passed:** all control groups and playback positions round-trip using the real inline simulation/graph/host/BC engines; invalid schemas, missing/unknown/prototype keys, wrong types, nonfinite values, out-of-range values, bad neighbor relations, pulse bounds, malformed/oversized JSON and corrupt ZIPs leave the scene unchanged. Failure barriers and object identity are preserved. Export produces a ZIP that imports back to equivalent settings, and the retry link/URL cleanup is checked.
- **12/12 archive tests passed:** Python ZIP interoperability, Unicode, stored and deflate files, data descriptors, malformed records, encryption/ZIP64/multi-disk rejection, CRC checks, overlapping entries, declared and actual decompression limits, and the unsupported-decompression fallback. **53 application checks total.**
- **12/12 mocked SSH/SCP deployment checks passed**, accepting exact reviewed v15.9.2–v15.9.6 predecessors, preserving private backups and original Thalean sentinels, and rejecting unfamiliar files, unsafe symlinks and concurrent edits.
- Cloud Chromium: visible defaults matched 100% / 2.80 / 13%. JSON import restored a custom 37% merge, 1.73 zoom, Ion Fire, Sunlight and BC dots. Invalid zoom 99 was rejected with the prior controls retained. Stored ZIP and normal deflate ZIP imports restored the expected defaults. The mobile panel had no horizontal overflow (380 px client/scroll width). No application console errors were captured.

## Verification limits and acceptance

The cloud browser displayed the export-ready state and retry link, but its download event/file-delivery API timed out, so the completed browser download was **not verified**. The exported bytes and standard ZIP compatibility are verified separately. Physical Android/Samsung file-picker/download handling and sustained performance remain untested. Existing finite-field/graph qualifications and high-zoom framing limits remain unchanged; no new physical claim is made.

On the phone: reload and confirm defaults; open Save & load settings; export and confirm a `.zip` appears in Downloads; change several controls; import that ZIP and confirm restoration; unzip it and repeat with JSON; check Play/Pause and Camera Orbit; verify a malformed file reports an error without altering the scene. If a download does not appear, use the displayed Download ZIP again link. Existing rendering quality and memory caps remain unchanged.

## Installation

Run the README's Termux commands. The deployer backs up the admitted installed predecessor as `~/.uft4-omega-backups/pre-v15.9.7.*.html` and replaces only the dedicated UFT4 page. GitHub publication does not install the Bluehost page. Live v15.9.7 delivery has not been verified.

---

# UFT4 Omega v15.9.6 — manual merge, default 50%

Prepared from reviewed v15.9.5.

## Changes

Removed the merge oscillator and its phase state. **Merge halves defaults to 50%** and stays at the selected value. Camera Orbit again changes only yaw, pitch and roll. Manual merge adjustments retain orbit, just like zoom and opacity. The obsolete merge-cycle help and diagnostic entry have been removed.

G900 opacity stays at 50%; BC trails stay at 25%; native quotient fibers stay enabled at 25%; field frequency stays at 1 Hz. Camera starting angles and zoom, rendering budgets, mathematical engines and native graph/quotient tables are unchanged.

Release HTML: 207,990 bytes. SHA256 `4ec2daf2b024c00746c27e2f09be518aa87d3de5c8939cc3c8a53613f76c8658`.

## Validation

- Inline JavaScript and deployment Bash syntax passed.
- **13/13 orbit/manual-merge checks passed:** 50% opening merge and G900 opacity, fixed merge throughout 20 simulated seconds at 1/10/30/60/120 Hz scheduling, manual 0/25/50/75/100% settings retained through orbit toggles, pause and host-view changes, and manual merge/zoom/opacity input retaining camera orbit. Existing camera motion, pause/visibility, quality cadence and native checks pass; all seven mathematical-engine source hashes remain unchanged.
- **12/12 themed-overlay and 6/6 launch-popover checks passed** (31 application checks).
- **11/11 mocked SSH/SCP deployment checks passed**, admitting exact v15.9.2 through v15.9.5 releases, verifying private rollback contents/permissions and repeat installs, and rejecting unknown files, unsafe symlinks and concurrent changes. Original Thalean page protection is retained.
- Cloud Chromium at 390×844: opening merge 50% and G900 opacity 50%; enabling Camera Orbit changed all three angles while merge stayed at 50%. A manual change to 20% retained Camera Orbit. The selected value persisted while the camera continued rotating, then was restored to 50% for the preview. No application errors were captured.

These checks do not establish physical Android/Samsung stability or sustained rendering performance. Existing framing limits at high zoom remain; zoom is manually adjustable. On-device acceptance: reload, confirm 50% merge, enable Camera Orbit and verify merge stays fixed, change Merge manually, and pause/resume. Native structures and field claims are unchanged.

## Installation

Use the README's Termux commands. The installer preserves the actual admitted predecessor as `~/.uft4-omega-backups/pre-v15.9.6.*.html` and replaces only the dedicated UFT4 page. GitHub publication does not install the Bluehost page. Live v15.9.6 delivery has not been verified.

---

# UFT4 Omega v15.9.5 — 50% G900 default and merge cycling

30 October 2026. Prepared from reviewed v15.9.4.

## Changes

**G900 opacity starts at 50%.** Camera Orbit now also oscillates Merge halves using a cosine: 100% joined at 0 seconds, 0% at 5 seconds, and 100% at 10 seconds, repeating with smooth turnarounds. The merge clock uses elapsed active wall time, independent of field frequency, simulation speed and direction. Sparse frames sample that same phase; no catch-up rendering loop or new buffer is introduced. Camera angular motion retains its existing 100 ms elapsed-step cap and full three-axis rotations.

Merge cycling runs only in Mirrored towers with the host visible. Pause, credits and hidden pages hold the cycle; overview and hidden-host views hold merge while camera motion can continue. Changing Merge halves manually stops Camera Orbit, as do existing manual camera controls. Zoom and opacity changes retain orbit. Enabling orbit derives its phase from the current merge position to avoid snapping; from an intermediate position it begins toward separation. The initial Camera Orbit state remains off. Diagnostics and the help text describe the 10-second cycle.

Tail opacity remains 25%, quotient fibers remain on at 25%, and the field remains 1 Hz. G900 master opacity still multiplies native fiber alpha, so the initial fiber line alpha is 0.25 × 0.50 = 0.125 before overlaps. No field equation, native graph table, quotient incidence, independent generator or BC path was changed.

Release HTML: 208,844 bytes. SHA256 `c8f6b2433bbf3193580e7771d23779a0b8e1b63c635afa5115b7af6fe8ae91b2`.

## Validation

- Inline JavaScript and deployment Bash syntax passed.
- **15/15 camera/merge checks passed:** 50% G900 constructor default; 100/0/100 merge positions over 10 seconds; 1/10/30/60/120 Hz scheduling; restart from current position; finite/clamped inputs; pause, launch and hidden-page holds; overview and hidden-host holds; manual merge takeover; zoom/opacity retaining orbit; existing camera rates, quality cadence and topology checks.
- **12/12 themed-overlay and 6/6 launch-popover checks passed** (33 application checks). Seven mathematical-engine source hashes continue to match the inherited release.
- **10/10 mocked SSH/SCP deployment checks passed**, including all three reviewed predecessors, rollback byte and permission checks, repeat installation, unknown-content and symlink rejection, and concurrent-edit refusal. The original Thalean sentinel remained unchanged.
- Cloud Chromium at 390×844: launch showed G900 50%, merge 100%, both trail/fiber opacity sliders 25%, fibers checked, and field frequency 1 Hz. Camera Orbit changed yaw, pitch, roll and the merge readout. Pause held the merge value across subsequent observations. Manual Merge input set 0% and turned orbit off; returning to 100% and enabling orbit resumed motion. No application errors were captured in browser logs.

Timing tests are numerical checks of the actual inline classes, not a physical-device benchmark. Cloud Chromium confirms interaction and rendering, not Android/Samsung stability or sustained 30 FPS. The existing quality cadence and buffer budgets are retained. Physical device acceptance: confirm the defaults, enable Camera Orbit, time one full merge round trip, pause/resume, adjust Merge manually, and check both Sheets and Plasma. Very sparse rendering can skip visible intermediate positions even though the phase retains the 10-second period. At the inherited 2.6 zoom, separated halves can extend beyond the stage in some orientations; zoom remains manually adjustable. The preview image shows the paused 48% merge state at a manually reduced 1.6 zoom; the launch zoom is unchanged. The mobile panel had no horizontal overflow (380 px client and scroll width).

## Installation

The installer accepts exact reviewed v15.9.2, v15.9.3 or v15.9.4 predecessors, preserves the installed predecessor as `~/.uft4-omega-backups/pre-v15.9.5.*.html`, and atomically replaces only the dedicated UFT4 page. GitHub publication does not update Bluehost; run the README's Termux commands. Live delivery of v15.9.5 has not been verified.

---

# UFT4 Omega v15.9.4 — independent 25% opacity defaults

30 October 2026. Prepared from reviewed v15.9.3.

## Changes

BC trails now start at **25% opacity**. Native **Quotient fibers start enabled**, with a new **Quotient fiber opacity** slider directly below the display flags. Its range is 0–100%, in 1% steps, default 25%. Zero skips native fiber strokes. The visibility flag retains the chosen opacity when toggled.

Fiber opacity directly sets native G60 → G15 line alpha and is multiplied by G900 opacity when the host is visible. It applies to both mirrored towers, the overview and the host-hidden view. A duplicated native reference-ray pass was consolidated so enabling both native visibility flags draws each incidence once. Generated four-state audit rays, G60 → G30 pair lines, graph edges, BC dots/tails and field opacity retain their independent controls. The slider's percentage is announced for accessibility and appears in diagnostics.

No field equations, graph tables, camera motion, buffer limits or generator logic changed. The 1 Hz field default, Camera Orbit, theme styling, launch credits and 182° trail length are retained.

Release HTML: 207,954 bytes. SHA256 `6e07b6eff9a9790500a462c0f6a09bb7dade2beae7151631b4f1b7ab7d1db99f`.

## Validation

- Inline JavaScript and deployment Bash syntax passed.
- **12/12 themed-overlay checks passed:** default/clamped fiber and tail opacity; 0%, 25% and 100% native fiber alpha in Sheets, Plasma, Hybrid and Sunlight; 120 mirrored rays or 60 single-view rays; no double drawing when both native visibility flags are enabled; other graph lines, generated audit rays and BC tails/dots unchanged. Existing theme/resource checks also pass.
- **10/10 camera/native checks and 6/6 launch-popover checks passed** (28 total). Actual application constructor defaults are asserted. Seven mathematical-engine source hashes continue to match the inherited release.
- **9/9 mocked SSH/SCP deployment checks passed**, including both admitted predecessors, private rollback copies, repeated installation, unknown-content and symlink rejection, and concurrent-edit refusal. The original Thalean page sentinel remained unchanged.
- Cloud Chromium at 390×844: launch and Continue succeeded; the UI showed quotient fibers checked, both opacity sliders at 25%, and frequency 1 Hz. Fiber slider keyboard changes reached 0% and 100% with correct outputs while tail opacity stayed at 25%. Toggling fibers off/on retained the value. Both sliders were restored to 25% for the captured preview. The scrolling panel measured 380 px client width and 380 px scroll width; no horizontal overflow. No application errors were captured in browser logs.

The Node tests use a recording Canvas and do not benchmark GPU work. No new sustained-performance or physical Android/Samsung test was performed for this small display update. Historical timings below describe earlier releases. On-device acceptance: reload, continue past credits, confirm both 25% defaults and fibers on, independently sweep each slider to 0/100%, toggle fibers, and check Plasma/Sheets/Hybrid plus Sunlight.

## Installation

The installer accepts exact reviewed v15.9.2 or v15.9.3 predecessors, preserves the installed predecessor as `~/.uft4-omega-backups/pre-v15.9.4.*.html`, and atomically replaces only the dedicated UFT4 page. GitHub publication does not update Bluehost; run the README's Termux commands. Live delivery of v15.9.4 has not been verified.

---

# UFT4 Omega v15.9.3 — themed overlays, tail opacity and 1 Hz default

30 October 2026. Prepared against the verified live v15.9.2 release.

## Changes

A **Tail opacity** slider now follows Trail length under BC dots & trails. Range 0–100%, step 1%, default 100%. It multiplies only the BC trail strokes; zero skips those strokes while dots, selected source/partner markers, graph connections and the field retain their separate controls. Trail length remains 182°.

BC tails/dots, native graph vertices/edges, quotient fibers, G30/G15 references, local/external host edges, pulse marks, selection markers and generated-graph overlays use shared cached colors for Nebula, Ion Fire and Hyperblue. Each palette has dark strokes for Sunlight mode. The local/external legend swatches update with the selected theme. Sheets, Plasma and Hybrid use modest BC stroke-width/alpha differences; native graph edges remain sharp. No extra glow pass, blur pipeline, canvas or image buffer was added.

The visible orbit control and accessibility labels now say **Camera Orbit**. Its motion and manual takeover behavior are retained. Default field frequency is now **1 Hz**, represented by the existing omega parameter as 2π radians per simulation second. Frequency slider range stays 0–20 Hz. Existing mathematical equations and native graph/fiber tables are preserved.

Release HTML: 206,819 bytes. SHA256 `07c3c401fef9b7d3fdc4217c33b05135dec5c5e8f16e084da6d362686221ee26`.

## Validation

- Inline JavaScript and Bash syntax passed.
- **8/8 themed-tail checks passed:** trail alpha multiplication and unchanged path positions, opacity zero with BC dots and graph overlays retained, input clamping, all six palette/Sunlight combinations across actual rendering paths, Canvas state restoration, resource identity across 90 style switches, 1 Hz periodicity and finite field evaluation, and Camera Orbit labels/rates.
- The Sunlight palette's solid overlay colors passed a 4.5:1 contrast check against the stage background. Fading tails and translucent graph layers intentionally have lower effective contrast; this is not a claim that every composited pixel meets that ratio.
- **10/10 orbit/native checks and 6/6 launch-popover checks passed.** Seven mathematical-engine source receipts still match the inherited release. The two display-renderer hash receipts were replaced by the new functional theme tests because those renderers intentionally changed.
- **8/8 mocked SSH/SCP deployment checks passed:** new/repeated installs, verified predecessor update, unknown-content and symlink refusal, rollback preservation and concurrent-edit refusal. No production server writes were performed by these checks.
- Cloud Chromium at 390×844: observed the 1 Hz field default, Camera Orbit label, 100% initial tail opacity, and working 0%, 50% and 100% slider positions. At 0%, visible BC dots and quotient lines remained while tails disappeared. Ion Fire, Nebula, Hyperblue and Sunlight were visually inspected with dots and fibers enabled. Theme legend colors changed correctly. The control panel had no horizontal overflow. Captured browser logs contained no application errors; extension-generated metadata errors were excluded.

Run the three Node files in `uft4-omega-deployment/tests/`: `themed-tails.cjs`, `rotisserie.cjs`, and `launch-popover.cjs`. Node rendering tests use a recording Canvas stub and do not measure GPU work. No fresh sustained performance or physical Android/Samsung test was performed for this appearance update. Prior diagnostic samples below remain historical. Fixed rendering budgets are retained.

## Installation

The current production predecessor was fetched over HTTPS with status 200 and SHA256 `8f8f0e9df154a9871e5a7024db182d6a0d26e8c8e1a0c0bb71efd1f40aaad69d`. The installer admits that exact version, saves `v15.9.2-pre-themed-tails.*.html` outside the web root, then atomically installs this release. GitHub publication alone does not update Bluehost; use the README's Termux deployment command.

---

# UFT4 Omega v15.9.2 — BC trail default and three-axis Rotisserie

30 October 2026. Update prepared against the verified live v15.9.1 page.

## Changes

The default view now includes BC trails at 182°, with dots, selected-vertex connections and labels off. Plasma / Hyperblue, 100% merge, field opacity 0.9, zoom 2.6 and the 10 Hz field setting remain. The opening camera is yaw 40°, pitch 25°, roll −55°, chosen to approximate the reference image's diagonal torus. A screenshot cannot provide exact original camera values or animation phase.

Rotisserie is an optional on/off button immediately after Merge, Zoom and G900 opacity. It starts off so the opening composition is retained. It rotates **all three axes fully**: yaw 6°/s, pitch 4°/s, roll 3°/s, wrapping angles continuously across ±180°. The later request for front, side, top and underside views supersedes the earlier fixed-pitch request; 25° is the starting tilt, not a lock. Manual pitch now spans ±180° and vertical dragging can pass the poles.

Play/Pause and the launch credits hold the orbit. Hidden-page timing resets avoid catch-up jumps. Drag/touch, angle sliders, angle keys and presets hand control back to the user; zoom retains the automatic orbit. Camera motion does not use field Hz, simulation speed or direction. Each accepted elapsed step is capped at 100 ms, so long scheduling gaps slow the displayed orbit instead of jumping.

Automatic camera projection updates are bounded by the existing plasma quality period (50/67/100 ms for High/Balanced/Low) or 1/30 s in Sheets/field-hidden views. The existing renderer and adaptive quality policy remain in control. The orbit reuses the camera object and adds no canvas or rendering buffer. Camera slider DOM synchronization runs at the existing 200 ms host-UI cadence.

Release HTML: 203,829 bytes. SHA256 `8f8f0e9df154a9871e5a7024db182d6a0d26e8c8e1a0c0bb71efd1f40aaad69d`.

## Validation

- JavaScript syntax and Bash syntax passed.
- **10/10 rotisserie checks passed:** defaults, independent camera state, scheduling partitions, full three-axis coverage, invalid/large elapsed time, real frame-loop pause/visibility/launch gating, quality throttling, manual controls, and native structures. Run `node uft4-omega-deployment/tests/rotisserie.cjs`.
- A simulated 360-second orbit sampled at 0.1 seconds returned to its starting orientation and reached view-direction components below −0.9 and above +0.9 on each axis. This confirms front/back, side and pole coverage; it is a numerical test, not six minutes of browser runtime.
- Native G60/G15 and G900 validation passed. Nine inherited engine source hashes match v15.9.1, including field evaluation, native graph, geometry, independent generation, host transport, BC paths and host rendering.
- **6/6 launch-popover checks passed** again: first-frame readiness, paused startup, Continue, preserved playback, fallback and context errors.
- Cloud Chromium at 390×844: 182° trails enabled, dots off, 40°/25°/−55° defaults, no horizontal control-panel overflow (client and scroll width both 380 px). Rotisserie enabled and changed all three angle readouts. Pause stopped playback; drag stopped orbit; the Top preset stopped orbit and restored its 0°/89°/0° values. Credits remained functional. No rendering errors were reported.
- **8/8 mocked deployment checks passed:** new install, identical repeat, verified predecessor update, updated repeat, refusal of unknown content, refusal of a symlinked index or backup directory, and refusal of a concurrent unknown edit. Original Thalean sentinels remained unchanged.

## Observed browser diagnostics

One rolling window while orbiting in Plasma/Balanced reported **1.0 rendering FPS** and **1.0 plasma refreshes/s**, with 1016.50 ms average delivered frame time. The last JavaScript draw took **11.40 ms**: geometry/lookup 3.50 ms, field/graph response 0.40 ms, plasma/software blur 7.30 ms, compositing submission 0.10 ms and graph overlay 0.10 ms. These values are not direct GPU timings.

The display was 390×376 at DPR 1, the plasma buffer 259×250, and the mesh 476 surface faces. Diagnostics showed **one buffer allocation**, 336 BC trail segments, zero BC heads, no context loss and zero rendering errors at 100 total rendered frames (82 plasma updates, including pre-orbit activity). Known pixel/array budget was 4.32 MiB, excluding browser copies.

This is an observed diagnostic snapshot, not a sustained throughput benchmark or a 30 FPS claim. Cloud scheduling was sparse. Physical Android/Samsung testing, prolonged thermal behavior and outdoor glare remain untested by the agent. Initial orientation is an approximation of the supplied screenshot. Existing field/graph qualifications and aliasing limits remain unchanged.

## Installation

Deploy from the existing Termux checkout with the README commands. The installer accepts the exact verified v15.9.1 predecessor (`53d841359bdc30b4d3d89efa9b54efa38a342960c0a038a48fb9e16120b121e3`), saves it outside the web root as `v15.9.1-pre-rotisserie.*.html`, then atomically installs v15.9.2. The release has been prepared and tested; GitHub alone does not update Bluehost.

---

Historical reports follow; their release status and measurements describe those versions, not v15.9.2.

# UFT4 Omega v15.9.1 — launch credits popover

30 October 2026. Website update prepared against the verified live v15.9 page.

## Changes

Credits for Scott Allen Cave and Joachim Kiseleczuk now appear in a modal popover on every page load instead of the permanent header strip. The launch instruction reads: “Please pause while the simulator loads the graphics engine.” The page yields two animation frames before initializing the engine so the browser can paint the message first. There is no artificial countdown or network dependency.

Playback is held at time zero during startup. Continue becomes available after the renderer records a successful frame, including a successful Safe Sheets recovery. Continue or Escape then restores playback. A stopped/lost context or initialization exception presents a reload action rather than claiming readiness. The Credits & sources button at the foot of the controls reopens the popover and preserves whether playback was running or paused.

The native mathematical classes, graph tables, field evaluation, geometry, host transport and independent generator are byte-identical to the verified predecessor. Render calculations and buffer limits are unchanged; the frame loop gains a temporary startup observer removed at readiness. The simulator remains a self-contained HTML file. No changes to the original Thalean Observatory or homepage.

Release SHA256: `53d841359bdc30b4d3d89efa9b54efa38a342960c0a038a48fb9e16120b121e3`.

## Validation

- Inline JavaScript syntax: passed (`node --check`).
- Six Node lifecycle/native checks: passed. Run `node uft4-omega-deployment/tests/launch-popover.cjs`. Covers paused time at startup, readiness gating, Continue, restored play/pause state, safe-renderer recovery, fatal context states, and native G60/G15 validation. Lifecycle tests use a minimal DOM stub; they are not browser tests.
- Cloud desktop Chromium: observed the initial disabled loading button, then ready status; Continue, reopen and Escape worked. Reopening from a paused Sunlight view retained paused playback after closing. Reload showed the launch dialog again. Captured page logs contained no application errors; unrelated browser-extension metadata errors were present.
- Mobile CSS layouts in desktop Chromium: 390×844 dialog was 356×582.31 px with no horizontal overflow. At 320×568 it was 286×536 px with internal vertical scrolling (614 px content); Continue remained reachable and worked. These are desktop iframe checks, not physical Android tests.
- Bash syntax: passed. Eight mocked SSH/SCP scenarios passed: new install; repeat; admitted predecessor update with verified private rollback; updated-release repeat; unfamiliar page refusal; symlinked index refusal; symlinked backup-directory refusal; concurrent unknown edit refusal. Original Thalean sentinels were preserved. No live server writes were performed by these tests.

The deployer now uses the verified working SSH alias `gurtiamy`, accepts only the exact previous live checksum for an upgrade, saves a verified rollback file outside the web root, and atomically replaces the page from a staging file on the same filesystem. A repeated identical deployment is accepted. The rollback path is printed during installation.

## Verification limits and install status

The previous v15.9 release was independently fetched over HTTPS with status 200 and matching SHA256 `4ee86fa9227545ed0f01d5a8261fca5e8bf2f0d5d9bbe03df332e45d09a8dbf7`. This v15.9.1 update still requires the Termux deployment command. A GitHub commit does not itself update Bluehost.

Readiness means the Canvas rendering code completed a frame; it is not a GPU completion fence or a device-stability certificate. No Android device, fresh sustained performance benchmark or thermal test was available for this UI patch. The historical v15.9 measurements below were not rerun and are retained as baseline evidence.

---

# UFT4 Omega v15.9 — default Plasma view and field frequency

30 October 2026. Standalone offline HTML based on v15.8; no public deployment or changes to the separate Thalean Observatory.

## Changes

The opening view is **Plasma / Hyperblue**, with field opacity 0.9, joined halves (100% merge), yaw 15°, pitch 0°, roll −25°, and zoom 2.6. This framing approximates the screenshot; its exact camera values cannot be recovered from the image. Show host and UFT4 field face are the only enabled main display flags. Native/reference layers, fibers, local/external edges, moving marks, BC dots/trails and labels start off. BC tail length remains 90° for later use. The existing research-display preferences are retained, with no generated data at startup.

Merge, Zoom and G900 opacity remain first. **Field style & cycle** now follows, containing Sheets / Plasma / Hybrid, palettes, and the new **Field cycle · Hz** slider above Display flags. The 30 CSS-pixel mobile margins and independent scroller are unchanged.

The new slider ranges from **0–20 Hz in 0.1 Hz steps**, default **10 Hz**. It converts to the existing field angular-frequency parameter with **ω = 2πf**; initial Time speed is 1. This sets cycles per simulation second, not render FPS or a physical measured frequency. Native field equations are unchanged. Frequency changes can change the current phase without resetting time. At 0 Hz the mathematical field is stationary, while other animation and visual modulation may still move. BC orbit and graph-spin parameters remain independent.

Developer diagnostics now distinguish rendering FPS, completed **Plasma refreshes/s**, and field-cycle frequency. No rendering cadence, quality threshold, pixel budget or blur resource limit was increased.

## Validation

**6/6 Node checks passed** against the exact release HTML:

- Inline JavaScript parsing; 10 Hz default, 0–20 limits and nonfinite handling.
- Exact G60/G15/G900 adjacency, quotient fibers and G30 pair comparison with v15.8.
- 10 Hz has a 0.1 simulation-second period and correct quarter-cycle phase in scalar and chiral modes.
- 2,400 comparisons with the inherited radial and three-source field equations at 0, 0.1, 3.7, 10 and 20 Hz.
- 240 cached-coefficient values agree with direct field evaluation; lookup arrays unchanged.
- Zero-frequency static field, continued clock advancement, play/pause, reverse, and no time reset from frequency changes.

**8/8 browser checks passed**, with zero uncaught or rendering errors, in cloud desktop Chromium. Opening defaults and control order matched; the slider writes the same omega used in generator snapshots and marks existing snapshots stale. Twenty-four rapid inputs retained ten rendering resources with **zero extra plasma-buffer allocations**. Six style/theme combinations and both field modes retained frequency and time. Widths 320, 390 and 844 px retained 30 px margins, no horizontal overflow, and 54 clear-margin hit tests.

The native-data table, host engine, G30 engine, independent generator, BC engine, host renderer and CSS are byte-identical to v15.8. GraphEngine and GeometryEngine source is also unchanged. SimulationEngine changes are limited to the frequency-unit accessor and initial omega/speed parameters. Startup topology validation remains active.

## Measured short animation samples

These are actual measurements of the available remote desktop browser. They are short scheduling samples, not sustained device benchmarks.

| Configured field rate | Sample | Delivered frames | Observed FPS | Plasma updates | Simulation time advanced |
|---|---:|---:|---:|---:|---:|
| 0 Hz | 3.1022 s | 7 | 2.256 | 4 | 0.3266 s |
| 10 Hz | 3.1023 s | 6 | 1.934 | 4 | 0.2400 s |

At 10 Hz, mean JavaScript draw CPU was **10.82 ms** across six rendered frames; the plasma buffer was **259×250**. Aggregate plasma refresh rate was **1.289 updates/s** in that sample. The diagnostic's latest rolling window reported 1.800 updates/s; these cover different intervals. Sparse delivered frames and the existing elapsed-step cap slowed simulated time relative to wall time. These results do not demonstrate 10 visibly resolved cycles per wall-clock second or 30 FPS. No rendering errors occurred.

Reproducible checks and recorded results are in `tests/frequency-defaults.cjs`, `tests/frequency-defaults-results.json`, `tests/frequency-qa.html`, `tests/frequency-browser.js`, and `tests/frequency-browser-results.json`. Earlier performance and regression results are retained as historical evidence and are not represented as rerun for this update.

## Remaining limitations

A 10–20 Hz mathematical oscillation can appear slow, stationary or reversed when sampled below a sufficient visual refresh rate. The existing High/Balanced/Low plasma intervals remain 50/67/100 ms before frame scheduling; actual refresh can be lower. Intensity modulation can contain higher-frequency components. The UI identifies this aliasing limitation rather than increasing resource budgets. Time speed and the elapsed-step cap also affect wall-time playback.

Physical Android/Samsung testing, outdoor glare and long-running thermal/stability testing remain outstanding. A phone-sized desktop iframe does not certify Android behavior. A process killed by the operating system cannot run the JavaScript fallback.

Existing mathematical qualifications remain: 24 of 30 certified G30 pairs cross the preserved G15 fibers, so no serial G30→G15 quotient is asserted; G900 pulses are unweighted graph-hop diagnostics; BC motion is illustrative; merging changes display positions only. No new physical or transport claim is introduced.

## Package

The ZIP contains the standalone application, source, tests, reports, Android checklist, checksums and exact prior releases. Immediate rollback is `UFT4_Omega_v15_8_G900_Rollback.html`, SHA256 `1d6c1aacd0583a5c617b97fa4c92222cc7f7916b5ed5bbea48a3c6209543d1e7`.

Release HTML: **195,386 bytes**, SHA256 `cd3dc6cb8001d50933a1f846c41a509aef90397994411219d07c3787dceaef51`.
