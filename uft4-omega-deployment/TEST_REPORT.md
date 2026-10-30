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
