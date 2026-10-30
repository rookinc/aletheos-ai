# UFT4 Omega — dedicated Aletheos observatory

Dedicated route: `/observatories/uft4-omega/`

Source: `public_html/observatories/uft4-omega/index.html`

The page uses the tested standalone UFT4 Omega v15.9 simulator, with an added visible credit bar and source links. Its inline JavaScript is byte-identical to that release. It starts in Plasma / Hyperblue with joined halves, field-only display flags, and a 10 Hz field-cycle setting. Its native tables and field equations are retained. The existing `/observatories/thalean-graph/` page and site homepage are not modified.

HTML SHA256: `4ee86fa9227545ed0f01d5a8261fca5e8bf2f0d5d9bbe03df332e45d09a8dbf7`

## Status

The page is prepared in source. Bluehost deployment and public verification must be completed from a machine with access to the hosting account. This development environment could not resolve the Bluehost SSH hostname; a GitHub commit is not evidence of a live deployment.

## Publish from Termux or your Mac

Use the existing website checkout and SSH access:

```sh
cd ~/dev/cori/website/aletheos.ai || exit 1
git pull --ff-only || exit 1
bash uft4-omega-deployment/deploy.sh
```

The deployer verifies the exact HTML checksum, stages it outside the web root, and installs only `~/www/observatories/uft4-omega/index.html`. It leaves the original Thalean Observatory and homepage alone. An already-installed identical page is accepted; a different existing page is preserved and causes the deployer to stop for review. No new credentials or host-key trust are configured by the script.

After installation, open `https://aletheos.ai/observatories/uft4-omega/` and confirm v15.9, Plasma / Hyperblue, a 10.0 Hz slider above Display flags, and the two thumb margins. Then confirm the existing Thalean URL still opens. No homepage link is added by this narrowly scoped deployment.

If this first installation needs to be withdrawn, rename only the new UFT4 directory outside the public web root. Do not touch `observatories/thalean-graph`. An existing different UFT4 page is never overwritten by this installer.

## Validation and limits

The v15.9 simulator passed six numerical checks and eight cloud Chromium checks. The dedicated page changes only metadata, attribution HTML and credit styling; its executable JavaScript is unchanged. `TEST_REPORT.md` records the actual measurements, including sparse cloud scheduling and the distinction between simulated frequency and visible refresh rate. Physical Android/Samsung stability and outdoor glare testing remain outstanding. The original v15.8 rollback and modular source remain in the standalone release package.

## Attribution

- Thalean Graph elements: **Scott Allen Cave**, as directed by the author.
- UFT4 Omega work: **Joachim Kiseleczuk**. Spelling verified against his own byline and author statement at https://gitarrenzauberer.substack.com/p/uft4-omega-the-g30-redline-and-the on 30 October 2026. This source verifies attribution; it does not validate the physical claims in the publication.
