# Observer Observatory v1.0 — Termux / Aletheos

Target: `https://aletheos.ai/observatories/thalean-observer/`.

Use the existing Termux checkout `~/dev/cori/website/aletheos.ai` and SSH alias `gurtiamy`. Deployment runs on the phone; the Work environment has no copy of that SSH configuration or its credentials.

From this release directory:

```bash
sha256sum -c SHA256SUMS && bash deploy.sh
```

The installer uses the established remote location `~/www/observatories/thalean-observer/index.html`. It preserves SSH authentication and host verification settings. Bash, OpenSSH, curl and coreutils are required locally; Bash and GNU coreutils are needed remotely, matching the previous Aletheos deployment convention. No Node or Python is required for deployment.

The app is one self-contained HTML file. CSS, exact data and browser modules are embedded. The model dataset download remains available through a browser Blob; no separate module MIME configuration, asset upload or sign-in gate is required on Aletheos.

Only the new observatory page is installed. A different existing page, a nonempty unrecognized target, symlinks or a competing deployment lock cause a stop. A complete verified upload is linked atomically into place. Repeating an identical deployment verifies it without replacing it.

The first installation records that no prior page existed. `bash deploy.sh rollback` restores that absence and retains the installed HTML in `~/.thalean-observer-backups/`. A manually copied page without that record is not silently removed. Other observatories and their index pages are not modified.

After install, the script fetches the public HTTPS response and compares its complete SHA-256 with this release. `LIVE VERIFIED` is printed only on an exact match. If Bluehost/CDN returns a stale response or HTTP error, it reports **installed on server, public verification incomplete** and exits unsuccessfully. It does not automatically undo a good server install based on a cached response. Run `bash deploy.sh verify` to retry the read-only verification later.

Source app commit: `20425893f5c233d03b01af8ea3cf704947f970c1`. The adapter only embeds assets, changes the JSON loader to read embedded data, and keeps the dataset download local. Scientific laws and numerical engine are unchanged. See `release.json` and `QA.json`.

The Return and Compare views run native finite calculations. G9000 is a three-step certified replay with an exact local rational gate check, not a live integration of the entire field. Source report links open the owner's ChatGPT Library; every viewer can download the self-contained model dataset.

Verification commands:

```bash
node --test tests/model.test.mjs
python3 tests/test-deploy.py
python3 tests/test-termux.py
```

These exercise the embedded model, the actual server installer, and the Termux wrapper with isolated SSH/HTTPS test doubles. Local installer tests make no network or real SSH connection. The user home environment is not reassigned. They do not certify that an actual Bluehost installation has occurred.

To reproduce the single-file adaptation from the retained app source at the commit above:

```bash
python3 build.py --source /absolute/path/to/source-checkout --output /tmp/observer-index.html
sha256sum /tmp/observer-index.html
```

The expected output SHA-256 is `8a54178fda15715f4d198a897b2028279e081f1f14bf2427ef1806bf978f9135`. The original source repository is separate from this Aletheos deployment package; `index.html` includes the complete runtime code and model data needed to run the app.
