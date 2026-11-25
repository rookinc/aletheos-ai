# Aletheos accession CORI-0089

The instrument belongs at `/observatories/reciprocal-witness/`. Its Library record is `/library/records/cori-0089/`. The website repository was checked at `fb155cf9916ab1b4e502dd6d2bffdf7d21a59dfc`. That revision contains instrument directories. The research catalog and its November 23 PHP publication wrapper are maintained on the web host.

## Add the two-sitter loop to the published observatory

The single-file phone installer is [Update-Two-Sitters.sh](releases/Update-Two-Sitters.sh). Download it to Termux and run `bash Update-Two-Sitters.sh` from that directory. It carries the complete update and uses the configured `gurtiamy` SSH alias.

From a checkout of this revision, the equivalent command is

```bash
bash reciprocal-witness-deployment/update-sitters.sh
```

The update verifies the installed entry page and every reused asset declared in `sitters-release.json`. It accepts the recorded original or updated SHA-256 for each replaced file. New asset paths must be available or already contain the expected bytes. The command checks the transfer digest on Bluehost, makes a private backup of overwritten files, installs the new assets, switches the link in `app.js`, and checks the served bytes of the sitter page and its browser dependencies. It uses the existing `gurtiamy` SSH alias. `WITNESS_SSH_TARGET` can select another configured SSH target.

The update touches only the instrument files named in its manifest. The entry page retains the hash registered under CORI-0089. A rerun can finish a partially installed release. If the public-byte checks fail after the filesystem installation, repeat the following read-only check after the host or cache becomes available.

```bash
python3 -B reciprocal-witness-deployment/update_sitters.py verify
```

To inspect the exact archive or reproduce the installation checks locally, run

```bash
python3 -B reciprocal-witness-deployment/update_sitters.py pack /tmp/reciprocal-witness-sitters.tar.gz
tar -tzf /tmp/reciprocal-witness-sitters.tar.gz
python3 -B reciprocal-witness-deployment/test_sitters_update.py
```

`fixtures/v1/` contains the exact previous versions of the replaced files from commit `dfe977f66d57ed34d61d42c6221378cbd819f9d1`. The integration test uses these bytes to exercise restoration after an interrupted switch, reruns, preservation of independent site edits, and HTTP responses from a temporary local server.

## Install the complete accession on a fresh host

After checking out the release or extracting its complete ZIP on Scott’s SSH-enabled Termux device, run

```bash
bash reciprocal-witness-deployment/deploy.sh
```

The script uses the existing `gurtiamy` alias. The remote Python installer targets `~/public_html`. It stages the complete instrument and record, checks the SHA-256 of each catalog scope, backs up the current files privately, installs the new directories, and changes six catalog files. It then checks the original ten public HTTPS routes and the sitter release’s public assets, including the complete instrument entry and guide digests. An identical installation can be rerun. A conflicting accession, changed catalog scope or different pre-existing instrument stops the installation before public writes. If the publication source changes after this release was prepared, incorporate its changes and regenerate the baseline. The runtime applies edits to each server-side publication’s existing `main` element so current headers, scripts and any site-specific outer markup survive.

| Public route | Integration |
| --- | --- |
| `/library/` | Searchable, dated software record in the existing catalog. The PDF filter excludes the instrument. |
| `/library/records/cori-0089/` | Individual record opening the instrument and its field guide. |
| `/library/catalog.json` | One software record with its instrument and guide addresses. |
| `/library/collections/` | Geometry and Thalean mechanics list and subject count. |
| `/library/observatories/` | Curated Observer mechanics and registration entry and index count. |
| `/observatories/` | Static directory card, entry count and registry date. |
| `/observatories/registry.json` | Machine record containing the installed entry file’s SHA-256. |
| `/observatories/index.php` | The existing publisher discovers the new child directory and its regular index file. |

The directory serving `/observatories/` had twelve cards on November 25, including Golden Drift, and introductory copy counting eleven. The updated text counts thirteen. The independently curated Observatory Index moves from thirteen to fourteen. The research catalog moves from seventy-five to seventy-six records.

## Regenerate and check the accession

Run these from the repository or release root. The script reuses the exact captured public catalog scopes. It regenerates the registry entry digest after any change to the instrument index.

```bash
python3 reciprocal-witness-deployment/catalog.py --overlay . --instrument-index public_html/observatories/reciprocal-witness/index.html
python3 reciprocal-witness-deployment/test_catalog.py
bash -n reciprocal-witness-deployment/deploy.sh
```

`catalog-baseline.zip` contains only the six public catalog responses, captured November 25. `catalog-inputs.json` gives the individual hashes, relevant scope, and checked revisions. The prepared Library HTML pages use the original publication-source shell. Their `main` elements match the tested edited outputs. PHP renders the current Aletheos masthead when deployed. The release includes byte-identical copies of the current catalog search script and stylesheet so the updated catalog can be exercised locally. The installer reuses the server’s existing copies. Photos, other records, paper files, and site PHP remain on the existing website.

To repeat PHP discovery, obtain the catalog source from repository commit `6ab606b40346eb0175ad70fed34900c2ab6aa673`, then run

```bash
git show 6ab606b40346eb0175ad70fed34900c2ab6aa673:public_html/observatories/index.php > /tmp/aletheos-observatory-index.php
python3 reciprocal-witness-deployment/test_catalog.py --php "$(command -v php)" --auto-index /tmp/aletheos-observatory-index.php
```

The optional `--publisher PATH` check accepts the unpacked November 23 publication PHP source and renders both Library indexes and the new record. Publication requires a reachable Bluehost account even after a repository merge.

## Open an offline copy

From this checkout, build a single HTML file that includes the five experiments, the field guide, fonts, the Planck rendering and downloadable replay evidence. Open the resulting file in a modern browser.

```sh
python3 reciprocal-witness-deployment/build_portable.py public_html/observatories/reciprocal-witness Reciprocal-Witness-Observatory.html
```

The instrument’s replay evidence page links the scientific kit and browser test receipt. The narrow-viewport checks use touch emulation in Chromium.

## Reproduce the two-sitter loop

Build the standalone HTML from the repository root. It embeds the clocks, native dart orbits, fonts, model notes and scientific checks.

```bash
python3 reciprocal-witness-deployment/build_portable.py --sitters public_html/observatories/reciprocal-witness Two-Sitter-Field-Loop.html
```

To replay the clock and orbit checks, run these in the instrument directory.

```bash
node tests/loop-clock.mjs
node tests/dart-orbits.mjs
node tests/sitters-loop.mjs
```

With Python Playwright and Chromium installed, run the checkout browser checks from the repository root. `CHROMIUM_BIN` can select a Chromium executable.

```bash
python3 public_html/observatories/reciprocal-witness/tests/sitters-browser.py http://rwo.test/observatories/reciprocal-witness/sitters.html --root public_html
```
