# UFT4 Omega — dedicated Aletheos observatory

Dedicated route: `/observatories/uft4-omega/`

Source: `public_html/observatories/uft4-omega/index.html`

The page uses the UFT4 Omega v15.9.3 simulator with a launch popover for credits and graphics-engine readiness. The screenshot-based opening view uses Plasma / Hyperblue with joined halves, BC trails enabled at 182°, BC dots and labels off, and a 1 Hz field-cycle setting. The opening camera uses yaw 40°, pitch 25°, roll −55°, and zoom 2.6; this approximates the screenshot rather than recovering exact angles from it. The optional Camera Orbit button turns through full yaw, pitch and roll around the shared center at 6°/s, 4°/s and 3°/s respectively. Play/Pause holds the orbit; dragging, angle sliders, arrow keys or a camera preset stop it. Zoom remains available while orbiting. The camera clock is independent of field frequency, simulation speed and direction. Long frame gaps are capped for continuity. Native tables and field equations are retained. The existing `/observatories/thalean-graph/` page and site homepage are not modified.

Tail opacity is adjustable from 0–100% beneath Trail length and defaults to 100%. It fades the BC tails independently of the dots, graph lines and field. Tail, dot and graph-line colors follow Nebula, Ion Fire and Hyperblue palettes; Sunlight uses contrast-appropriate variants. The former Rotisserie control is labeled Camera Orbit.

The reviewed HTML checksum is recorded in `release.sha256`.

## Status

The live v15.9.2 page was independently verified over HTTPS with status 200 and a matching checksum on 30 October 2026. The admitted predecessor for this update has SHA256 `8f8f0e9df154a9871e5a7024db182d6a0d26e8c8e1a0c0bb71efd1f40aaad69d`; the deployer checks the installed file against that exact checksum. The v15.9.3 themed-tail update must be installed from a machine with hosting access. A GitHub commit alone is not evidence of a live update.

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

An already-installed identical page is accepted. Only the exact previous release identified above is eligible for replacement. Before updating it, the deployer saves a verified rollback copy in `~/.uft4-omega-backups/` outside the web root, prints its path, and rechecks the installed predecessor immediately before atomic replacement. Unknown existing pages and symlinks are rejected. Keep the printed rollback path; it identifies the original HTML that can be restored after review.

After installation, open `https://aletheos.ai/observatories/uft4-omega/` and confirm the launch popover shows both credits and the loading message, then allows entry once a frame is ready. Confirm the Plasma / Hyperblue opening view, 182° BC trails with dots and labels off, the Camera Orbit control, 1.0 Hz field-cycle setting, and thumb margins. Check the new Tail opacity slider at 0%, 50% and 100%, then switch among the three palettes and Sunlight mode to inspect the coordinated colors. No homepage link is added by this narrowly scoped deployment.

## Validation and limits

The underlying v15.9 simulator passed six numerical checks and eight cloud Chromium checks. The v15.9.3 changes concern overlay styling, tail opacity, the Camera Orbit label and the 1 Hz opening field-cycle setting. Native graph tables and field equations are retained. The launch credits popover remains in place. `TEST_REPORT.md` records checks and measurements. Physical Android/Samsung stability and outdoor glare testing remain outstanding. The original v15.8 rollback and modular source remain in the standalone release package.

The deploy script passes shell syntax validation and mocked local SSH/SCP checks for new installation, admitted predecessor updates, idempotence, unknown-release rejection, symlink rejection, and a concurrent unknown edit. These tests do not establish live server access or live HTTP delivery.

## Attribution

- Thalean Graph elements: **Scott Allen Cave**, as directed by the author.
- UFT4 Omega work: **Joachim Kiseleczuk**. Spelling verified against his own byline and author statement at https://gitarrenzauberer.substack.com/p/uft4-omega-the-g30-redline-and-the on 30 October 2026. This source verifies attribution; it does not validate the physical claims in the publication.
