# Aletheos Observatory Library 001

Publishes the existing Jupiter Vortex Lab and Sonoluminescence Boundary Lab at:

- https://aletheos.ai/observatories/jupiter/
- https://aletheos.ai/observatories/sonoluminescence/
- https://aletheos.ai/observatories/ (public library)

The simulators retain their validated numerical engines. The hosted copies add a library backlink and canonical URL. Jupiter contains a regional fluid benchmark and separate native graph experiment. Sonoluminescence contains radial bubble dynamics and illustrative gate scores; it does not predict photon yield or spectrum.

The PHP library discovers immediate child directories with regular `index.html` or `index.php` files. It gives known observatories curated descriptions, includes unrecognized published directories with a neutral label, and excludes hidden directories and symlinks. It also lists the P900, G900 Witness, and Informative Action labs when their known entry files exist. Omega is marked as legacy. An observatory absent from the server is omitted. The page remains usable without JavaScript; search and filters enhance the full listing.

## Deploy from Termux

Use the existing Bluehost SSH alias `gurtiamy`:

```sh
bash deploy.sh
```

Requires `python3` (3.8+), `ssh`, and `curl` in Termux, and Python 3.8+ and PHP CLI on Bluehost. Installs only the three paths declared in `manifest.json` below `~/www/`. It verifies all bytes, syntax-checks the PHP page, preserves existing targets in `~/.aletheos-observatory-releases/`, installs the catalog last, and rolls back a failed installation. A pre-existing `observatories/index.html` or `index.htm` is preserved in the private backup and removed so the PHP catalog can serve. Incompatible DirectoryIndex settings or symlink destinations stop before installation. Existing observatory content elsewhere is unchanged.

On success the command verifies public responses: exact hashes for both simulators and the catalog release marker plus its new links. A completed GitHub push is not a live Bluehost deployment. This release must be run from the user's existing SSH-enabled Termux environment.

## Checks

```sh
python3 test_deploy.py
python3 verify_catalog.py --php php
bash -n deploy.sh
```

Twelve deployment tests cover installation, idempotence, backups, rollback, checksums, archive scope, symlinks, PHP lint failures, and DirectoryIndex conflicts. Catalog checks exercise empty, known, unknown, unpublished, hidden, symlinked, and related-lab entries using actual PHP. UI checks covered search, category filtering, both simulators, return navigation, and layouts at 320/390 pixels.

The QA catalog used synthetic directory fixtures; its count is not a claim about the live server. No fixtures, screenshots, dependencies, credentials, or existing remote site files are included in the release payload.
