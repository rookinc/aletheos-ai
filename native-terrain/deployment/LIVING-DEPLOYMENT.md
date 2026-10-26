# SIM-003 additive development deployment

Target: `https://dev.rook.ca/aletheos/living.html`.
The existing `https://dev.rook.ca/aletheos/` observatory stays in place. The new
entry loads assets from its own immutable `living-release-<manifest hash>/`
directory. No existing `index.html`, script, stylesheet, or data file is
replaced. The release includes a frozen copy of the old observatory for
self-contained local evaluation and reference.

## Current access limit

During SIM-003 inspection on 2026-10-26, the public development site responded
HTTP 200 and identified itself as Native Terrain v3.0. The executor had no
configured authenticated `gurtiamy` SSH alias. Packaging does not establish a
remote backup, successful deployment, passing browser test, or physical result.
The old SIM-002 `DEPLOYMENT.md` and `RELEASE.md` remain historical records.

## Package and test

From `native-terrain/`:

```bash
npm test || exit 1
npm run verify || exit 1
python3 -m unittest discover -s tests -p 'test_living_deployment.py' || exit 1
python3 tools/build.py || exit 1
python3 deployment/verify-files.py ../dist/living-geometry-packet/site || exit 1
```

Output: `dist/Aletheos-Native-Terrain-v3.1-Living-Geometry.zip` and its SHA-256
file. Commit intended source before the final build. `release-info.json`
records the actual Git commit/branch and whether source edits remain; it does
not infer test or deployment success. The manifest hashes every static asset.
Repeated packaging of unchanged source and Git state gives identical ZIP bytes.

## Already logged into Bluehost

From a fresh feature-branch checkout on the authenticated host, run:

```bash
bash native-terrain/deployment/deploy-on-host.sh "$HOME/www/dev.rook.ca/aletheos" || exit 1
```

This resolves the symlink to the existing web root, finds Python 3.9+, builds
and checks the packet, backs up any prior Living Geometry entry, activates it,
and checks the public HTTP bytes. It requires Git for build provenance and
outbound HTTPS for the final served-byte check. Keep the printed activation
receipt. Failure of a post-activation HTTP check does not undo activation;
inspect the receipt and use the documented rollback if needed.

## Stage and activate on the authenticated machine

Extract the packet into a fresh directory. Run:

```bash
python3 deployment/verify-files.py site || exit 1
bash deployment/stage-living.sh || exit 1
```

This stages the self-contained release on the host and leaves the entry point
unchanged. The unlinked immutable release directory is publicly reachable.
When ready to expose the new entry:

```bash
bash deployment/stage-living.sh --activate || exit 1
```

The optional final argument changes the SSH alias (default `gurtiamy`). The
host account/web-root layout remains explicit in the script; adjust it only
for a different confirmed host arrangement. Python 3.9+, `ssh`, `scp`, and
existing write access to the Aletheos directory are required.

Activation copies any prior `living.html` outside the web root, verifies its
bytes, writes an activation receipt, and atomically replaces only the new
entry point. It injects a base URL into `living.html`, binding relative assets
to the immutable release. Every staged file is rehashed remotely. Source HTML
must have an explicit `<head>` and no existing `<base>` element.

The script prints the release path, activation receipt, and retained remote
installer path. Retain all three. It does not delete previous releases or
private upload directories. A network or verification failure stops the script;
inspect partial staging before retrying.

## Verify the deployed bytes and behavior

Use the exact returned release directory basename:

```bash
python3 deployment/verify-served.py site \
  https://dev.rook.ca/aletheos/living-release-EXACT_RETURNED_HASH/ \
  --entry-url https://dev.rook.ca/aletheos/living.html || exit 1
```

This verifies all served assets and the public entry against local bytes.
Separately open both `/aletheos/` and `/aletheos/living.html` and check:

- Existing observatory navigation and inspections still work.
- Living geometry loads without missing assets or console errors.
- Play, pause, step, reverse, restart, and camera controls work.
- The native return and experimental A/B trajectory comparison execute.
- Exported receipts contain the chosen seed, parameters, state, and history.
- A real Android browser has usable drawers, touch controls, and playback.

Record actual results and tested devices; do not substitute HTTP success for
execution or mobile testing.

## Roll back only the additive entry

Use the exact installer and activation receipt paths printed by activation:

```bash
ssh gurtiamy "python3 'EXACT_REMOTE_INSTALLER_PATH' rollback --live '/home2/gurtiamy/public_html/dev.rook.ca/aletheos' --receipt 'EXACT_ACTIVATION_RECEIPT_PATH'" || exit 1
```

Rollback refuses if `living.html` changed after that activation. Otherwise it
atomically restores the preceding entry, or removes the entry if none existed
before. It preserves the immutable release assets and all original observatory
files. Verify the served entry afterward; retain rollback material until the
release owner deliberately retires it.
