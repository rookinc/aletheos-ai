# UFT4 Omega — dedicated Aletheos observatory

Dedicated route: `/observatories/uft4-omega/`

Source: `public_html/observatories/uft4-omega/index.html`

The page uses the UFT4 Omega v15.9.6 simulator with a launch popover for credits and graphics-engine readiness. The screenshot-based opening view uses Plasma / Hyperblue with Merge halves at 50%, G900 opacity at 50%, BC trails enabled at 182° and 25% opacity, native quotient fibers enabled at 25% opacity, BC dots and labels off, and a 1 Hz field-cycle setting. The opening camera uses yaw 40°, pitch 25°, roll −55°, and zoom 2.6; this approximates the screenshot rather than recovering exact angles from it. The optional Camera Orbit button turns through full yaw, pitch and roll around the shared center at 6°/s, 4°/s and 3°/s respectively. Camera Orbit changes only the camera angles; it does not animate Merge halves. Merge starts at 50% and remains at the user-selected setting during orbit. Play/Pause, launch credits and page hiding hold the camera; dragging, angle sliders, arrow keys or a camera preset stop it. Merge, zoom and opacity remain adjustable while orbiting. Camera motion is independent of field frequency, simulation speed and direction, and angular steps remain capped for continuity. Native tables and field equations are retained. The existing `/observatories/thalean-graph/` page and site homepage are not modified.

Tail opacity is adjustable from 0–100% beneath Trail length and defaults to 25%. It fades the BC tails independently of the dots, graph lines and field. Tail, dot and graph-line colors follow Nebula, Ion Fire and Hyperblue palettes; Sunlight uses contrast-appropriate variants. The former Rotisserie control is labeled Camera Orbit.

Quotient fiber opacity has its own 0–100% slider, defaulting to 25%. Its native fiber stroke alpha is multiplied by G900 opacity when the host is displayed. Tail opacity, field opacity and graph-edge appearance remain independently controlled.

The reviewed HTML checksum is recorded in `release.sha256`.

## Status

The live v15.9.2 page was independently verified over HTTPS with status 200 and a matching checksum on 30 October 2026. This update admits these exact reviewed predecessors:

- v15.9.5: `c8f6b2433bbf3193580e7771d23779a0b8e1b63c635afa5115b7af6fe8ae91b2`.
- v15.9.4: `6e07b6eff9a9790500a462c0f6a09bb7dade2beae7151631b4f1b7ab7d1db99f`.
- v15.9.3: `07c3c401fef9b7d3fdc4217c33b05135dec5c5e8f16e084da6d362686221ee26`.
- v15.9.2: `8f8f0e9df154a9871e5a7024db182d6a0d26e8c8e1a0c0bb71efd1f40aaad69d`.

The deployer checks the installed file against these exact checksums. The v15.9.6 fixed-merge update must be installed from a machine with hosting access. A GitHub commit alone is not evidence of a live update.

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

An already-installed identical page is accepted. Only the exact reviewed predecessors identified above are eligible for replacement. Before updating it, the deployer saves a verified rollback copy in `~/.uft4-omega-backups/` outside the web root, names it `pre-v15.9.6.*.html`, prints its path, and verifies the backup and installed page against the same observed predecessor checksum immediately before atomic replacement. Unknown existing pages and symlinks are rejected. Keep the printed rollback path; it identifies the original HTML that can be restored after review.

After installation, open `https://aletheos.ai/observatories/uft4-omega/` and confirm the launch popover shows both credits and the loading message, then allows entry once a frame is ready. Confirm the Plasma / Hyperblue opening view, Merge halves at 50%, G900 opacity at 50%, 182° BC trails at 25% opacity, enabled quotient fibers at 25% opacity, dots and labels off, the Camera Orbit control, 1.0 Hz field-cycle setting, and thumb margins. Check Tail opacity and Quotient fiber opacity independently at 0%, 25% and 100%, then switch among the three palettes and Sunlight mode to inspect the coordinated colors. Enable Camera Orbit and confirm Merge halves stays at 50% while the camera turns. Set Merge halves to another value during orbit and confirm it stays there. Pause and resume to check camera continuity. No homepage link is added by this narrowly scoped deployment.

## Validation and limits

The underlying v15.9 simulator passed six numerical checks and eight cloud Chromium checks. The v15.9.6 changes remove the automatic merge oscillator and set the initial merge to 50%. G900 opacity remains at 50%. The 25% tail and quotient-fiber defaults, enabled native quotient fibers, theme styling, full three-axis camera motion and 1 Hz field default are retained. Native graph tables and field equations are retained. The launch credits popover remains in place. `TEST_REPORT.md` records checks and measurements. Physical Android/Samsung stability and outdoor glare testing remain outstanding. The original v15.8 rollback and modular source remain in the standalone release package.

The deploy script passes shell syntax validation and mocked local SSH/SCP checks for new installation, admitted predecessor updates, idempotence, unknown-release rejection, symlink rejection, and a concurrent unknown edit. These tests do not establish live server access or live HTTP delivery.

## Attribution

- Thalean Graph elements: **Scott Allen Cave**, as directed by the author.
- UFT4 Omega work: **Joachim Kiseleczuk**. Spelling verified against his own byline and author statement at https://gitarrenzauberer.substack.com/p/uft4-omega-the-g30-redline-and-the on 30 October 2026. This source verifies attribution; it does not validate the physical claims in the publication.
