# UFT4 Omega — dedicated Aletheos observatory

Dedicated route: `/observatories/uft4-omega/`

Source: `public_html/observatories/uft4-omega/index.html`

The page uses the UFT4 Omega v15.9.9 simulator with a launch popover for credits and graphics-engine readiness. Its opening state comes from the complete validated settings profile in the user-supplied `uft4-omega-settings-2026-10-31T00-43-22-978Z.zip`, applied before the first rendered frame. This uses Hybrid / Hyperblue, Merge halves at 100%, G900 opacity at 100%, BC trails enabled at 182° and 25% opacity, native quotient fibers enabled at 11% opacity, BC dots and labels off, zoom 2.8 and a 1 Hz field cycle. The exact opening angles are yaw 98.91722499999025°, pitch −126.38005312499388° and roll −10.986700000012206°. Simulation time starts at the saved 215.92550000000682 seconds, with forward playback and Camera Orbit enabled. **Save & load settings** starts expanded; other collapsible sections start closed, as recorded in the profile. Host source/neighbor and pulse settings, research settings and remaining controls are also restored from that profile.

The launch credits hold both simulation and camera motion until Continue. Camera Orbit then turns through full yaw, pitch and roll around the shared center at 6°/s, 4°/s and 3°/s respectively. It changes only the camera angles and does not animate Merge halves. Merge remains at the user-selected setting during orbit. Play/Pause, launch credits and page hiding hold the camera; dragging, angle sliders, arrow keys or a camera preset stop it. Merge, zoom and opacity remain adjustable while orbiting. Camera motion is independent of field frequency, simulation speed and direction, and angular steps remain capped for continuity. Native tables and field equations are retained. The existing `/observatories/thalean-graph/` page and site homepage are not modified.

Tail opacity is adjustable from 0–100% beneath Trail length and defaults to 25%. It fades the BC tails independently of the dots, graph lines and field. Tail, dot and graph-line colors follow Nebula, Ion Fire and Hyperblue palettes; Sunlight uses contrast-appropriate variants. The former Rotisserie control is labeled Camera Orbit.

Quotient fiber opacity has its own 0–100% slider, defaulting to 11% from the saved profile. Its native fiber stroke alpha is multiplied by G900 opacity when the host is displayed. Tail opacity, field opacity and graph-edge appearance remain independently controlled.

The reviewed HTML checksum is recorded in `release.sha256` as exactly one 64-character lowercase SHA-256 digest plus a newline, with no filename. The installer intentionally rejects other formats. The exact supplied ZIP is retained as `default-settings.zip` with SHA256 `8765d9c6e1abe375cd6af5ee4148fe4caad16df91c3aa067e3f3652a01d24086`. Its validated settings are embedded in the standalone HTML; launching the page does not fetch the ZIP.

## Controls panel

A persistent bottom button reads **Hide controls** while the controls panel is open and **☰ Menu** while it is closed. Hiding controls lets the canvas fill the freed space. Reopening restores the panel’s scroll position without changing settings, simulation playback or Camera Orbit. The initial panel is open, retaining the supplied startup profile. This toggle hides the controls panel, not the field or graph layers.

## Settings files

Open **Save & load settings** and choose **Export settings ZIP** to save a portable snapshot. The app writes an uncompressed ZIP containing one schema-2 settings JSON file. Schema 2 adds `layout.controlsCollapsed` to preserve the panel’s open/closed state. Import remains compatible with schema-1 files, which open the panel; the supplied original ZIP is unchanged. **Import ZIP / JSON** accepts that ZIP, a plain settings JSON file, or a normal stored/deflated ZIP containing exactly one JSON file. Deflated ZIP import uses the browser’s DecompressionStream support; the app’s own uncompressed export avoids that dependency. Files are processed locally, work offline and are not uploaded.

The snapshot includes camera orientation and zoom; appearance and layer controls; BC settings; simulation parameters, time, playback and direction; host selection, pulse settings, travel position and lap count; research parameters; Camera Orbit state; collapsible-section preferences; and the controls-panel open/closed state. Generated graph and audit results are not included. Import validates the file schema and values before changing application state. Invalid files leave the current settings in place. Finish or cancel any active generator job before importing. The import limits are 1 MiB per file/archive, 256 KiB for JSON and 16 ZIP entries. Encrypted and ZIP64 archives are not accepted.

Export a snapshot, change Merge halves or a palette, then import the saved file and confirm the saved settings return. Check both ZIP and plain-JSON import. Files save simulator settings, not a certified physical state or new graph topology.

## Status

The live v15.9.2 page was independently verified over HTTPS with status 200 and a matching checksum on 30 October 2026. This update admits these exact reviewed predecessors:

- v15.9.8: `c93e96e7ee2c7512d1f4ec87c063e0effc0ec5896dc54b366f8b5cc3f0e68d99`.
- v15.9.7: `c9af1de3565968894c23efccaaf25e9117e9f3ca25266af343914f0c086f64eb`.
- v15.9.6: `4ec2daf2b024c00746c27e2f09be518aa87d3de5c8939cc3c8a53613f76c8658`.
- v15.9.5: `c8f6b2433bbf3193580e7771d23779a0b8e1b63c635afa5115b7af6fe8ae91b2`.
- v15.9.4: `6e07b6eff9a9790500a462c0f6a09bb7dade2beae7151631b4f1b7ab7d1db99f`.
- v15.9.3: `07c3c401fef9b7d3fdc4217c33b05135dec5c5e8f16e084da6d362686221ee26`.
- v15.9.2: `8f8f0e9df154a9871e5a7024db182d6a0d26e8c8e1a0c0bb71efd1f40aaad69d`.

The deployer checks the installed file against these exact checksums. The v15.9.9 controls-panel update must be installed from a machine with hosting access. A GitHub commit alone is not evidence of a live update.

## Publish from Termux or your Mac

Use the existing website checkout and SSH access:

```sh
cd ~/dev/cori/website/aletheos.ai || exit 1
git pull --ff-only || exit 1
bash uft4-omega-deployment/deploy.sh
printf 'Deploy exit status: %s\n' "$?"
```

The script defaults to the working SSH alias `gurtiamy`. Override it with `UFT4_SSH_TARGET` if another host entry is required. No credentials or host-key trust are configured by the script.

The deployer verifies the exact HTML checksum, uploads outside the web root, and installs only `~/www/observatories/uft4-omega/index.html`. A final copy beside the destination allows atomic publication on the same filesystem. It leaves the original Thalean Observatory and homepage alone.

An already-installed identical page is accepted. Only the exact reviewed predecessors identified above are eligible for replacement. Before updating it, the deployer saves a verified rollback copy in `~/.uft4-omega-backups/` outside the web root, names it `pre-v15.9.9.*.html`, prints its path, and verifies the backup and installed page against the same observed predecessor checksum immediately before atomic replacement. Unknown existing pages and symlinks are rejected. Keep the printed rollback path; it identifies the original HTML that can be restored after review.

After installation, open `https://aletheos.ai/observatories/uft4-omega/` and confirm the launch popover shows both credits and the loading message, then allows entry once a frame is ready. Confirm the Hybrid / Hyperblue opening view, Merge halves at 100%, zoom 2.8, G900 opacity at 100%, 182° BC trails at 25% opacity, enabled quotient fibers at 11% opacity, dots and labels off, 1.0 Hz field-cycle setting, and expanded Save & load settings. Simulation time and camera must remain held during the launch dialog, then resume from the saved state with Camera Orbit on after Continue. Confirm Merge halves stays at 100% while the camera turns; changing Merge manually must retain the chosen value. Use Hide controls and confirm the canvas expands; use Menu to restore the controls and their prior scroll position. Settings and playback must stay unchanged. Confirm a schema-2 import honors its saved `layout.controlsCollapsed` preference, then import the original schema-1 ZIP and confirm the panel opens. Pause/resume, settings export/import and palette/Sunlight controls remain available. No homepage link is added by this narrowly scoped deployment.

## Validation and limits

The underlying v15.9 simulator passed six numerical checks and eight cloud Chromium checks. The v15.9.9 changes add the persistent controls-panel toggle and schema-2 layout preference. The full supplied settings profile remains the startup default, with the controls panel open. The profile is preserved as display and simulation configuration; it does not alter native graph tables, field equations or independent-generation logic. Camera Orbit remains camera-only with no merge oscillator. The launch credits popover and offline settings import/export remain in place. `TEST_REPORT.md` records checks and measurements. The uploaded ZIP provides an actual user-exported settings artifact; it does not establish independent physical Android/Samsung stability, sustained performance or outdoor glare testing. Those device checks remain outstanding. The original v15.8 rollback and modular source remain in the standalone release package.

The deploy script passes shell syntax validation and mocked local SSH/SCP checks for new installation, admitted predecessor updates, idempotence, unknown-release rejection, symlink rejection, and a concurrent unknown edit. These tests do not establish live server access or live HTTP delivery.

## Attribution

- Thalean Graph elements: **Scott Allen Cave**, as directed by the author.
- UFT4 Omega work: **Joachim Kiseleczuk**. Spelling verified against his own byline and author statement at https://gitarrenzauberer.substack.com/p/uft4-omega-the-g30-redline-and-the on 30 October 2026. This source verifies attribution; it does not validate the physical claims in the publication.
