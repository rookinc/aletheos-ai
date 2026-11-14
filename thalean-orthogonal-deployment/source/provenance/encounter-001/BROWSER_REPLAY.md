# Repeat the browser checks

Build `source/dist/index.html` and serve it through the environment's managed preview. Use the native browser controls or CUA; do not call hidden app internals as a substitute for UI behavior. The completed session is recorded in `browser-checks.json`, with tested UI hashes. `browser-replay.json` is an actual browser download, verified by the command-line replayer.

1. Open the page at desktop size. Pause, restart, pause again if needed. Confirm Assembly, Inverse cube (1,592 cells at defaults) and Sheet history work. Close history and select Encounter Lab.
2. Check all three copies, phase 0, merge 0, epsilon 0.05. Scan Spatial proximity: 21 candidates, zero native coupling events. Inspect native tuples and separate adjacency/shared-label fields.
3. Select Camera projection overlap. With the initial oblique camera the session found 1,143 pairs; count depends on camera. Inspect a candidate with projected distance below epsilon but 3D distance above epsilon. Confirm the page says no proven interaction.
4. Change one copy phase to 10. The other phase controls remain unchanged. The prior point scan must be marked stale and its markers hidden. Phase 10 at clock 0 is a different reference, not ten completed live steps.
5. Hide Y and Z, leaving X. Scan: zero cross-copy candidates. Restore all three.
6. Expand witness history. Record an F0 state. Advance ten live steps, record again, then compare using F^1. Alternatively use the explicit F0/F10 pair test. It reports equal projected inputs/outputs, different hidden bits and no established operational memory. Complete twenty live steps to inspect full registered return.
7. Expand Experimental coupling. It begins unchecked. Enabling inspection reveals assumptions, while the page continues to report “No native coupling law admitted.” It must not advance or mutate the simulation.
8. Save settings through the real browser download. Change a phase, then Load the saved file with the real file picker. The phase is restored and a fresh simulation starts; old scan/memory result is cleared, observation contexts remain captured.
9. Export the replay JSON and run `node scripts/replay-encounter.cjs DOWNLOAD.json`. Both scan and continuation recompute successfully; a changed tuple/count must fail.
10. Repeat key controls at true layout viewports 360x740 and 390x844. Our session used those iframe sizes in desktop Chrome. Check `body.scrollWidth == body.clientWidth`, readable native fields, accessible scrollable lab controls and an unobstructed chart. This does not certify physical Android performance.
11. Inspect browser console errors. The recorded session had zero application errors; 150 unrelated `chrome-extension://` metadata errors were excluded explicitly. Save a screenshot showing chart and lab controls.

Changing tested UI files makes the receipt stale. Record a new real browser session and update its UI hashes rather than treating the previous receipt as a new pass.
