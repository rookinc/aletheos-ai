# Aletheos accession CORI-0089

The instrument belongs at `/observatories/reciprocal-witness/`. Its Library record is `/library/records/cori-0089/`. The website repository was checked at `fb155cf9916ab1b4e502dd6d2bffdf7d21a59dfc`. That revision contains instrument directories. The research catalog and its November 23 PHP publication wrapper are maintained on the web host.

## Install the two sitters in the Orthogonal field

Save the current single-file installer as `Update-Orthogonal-Sitters.sh` in Downloads. With the existing Bluehost SSH alias configured in Termux, run

```bash
bash Update-Orthogonal-Sitters.sh
```

The current release carries the complete update. The checkout command is `bash reciprocal-witness-deployment/update-sitters.sh`. The installer accepts the first Reciprocal Witness release, the published two-sitter release, a partial update, or the completed update. The default SSH target is `gurtiamy`. A configured alternate can be selected with `WITNESS_SSH_TARGET`. [Current phone installer](releases/Update-Orthogonal-Sitters.sh)

On a host with the pinned Orthogonal v1.8 workbench, the installer adds **Two sitters** to its seven-mode navigation. The link opens `/observatories/reciprocal-witness/sitters.html?field=orthogonal`. Opening `sitters.html` without a field parameter still selects the original sitter view. The workbench is independently installed at `/observatories/thalean-orthogonal/`. This branch carries its public menu excerpt and fingerprints. The running installer reads the actual page on the host.

The link is one 368-byte insertion at offset 24,615. The original page has 420,768 bytes and SHA-256 `53ae52f010d79e678556bce470aaaaf740249603a3c498caccd753760a90662f`. The patched page has SHA-256 `e1e7146123c670c329eba0259967c11c61ef8104ef4bff1177459b217643ace3`. The installer checks the entire original, the navigation anchor and both surrounding regions, and backs up the original privately on the server. It writes the menu after the Reciprocal files pass their on-host hash checks. A missing workbench is reported as `absent`. A different independent release is reported as `preserved-unrecognized`; the Reciprocal field installs, and that workbench keeps its own navigation. On a host with the pinned workbench, this command removes only the inserted link and verifies recovery of the exact original bytes.

```bash
bash Update-Orthogonal-Sitters.sh --remove-menu-link
```

The upload is checked before extraction. The installation verifies each changed or reused file, the versioned CSS and JavaScript URLs used by the browser, the field query URL, and the separately served workbench when present. The installer prints the filesystem result before it checks the public routes. A changed installation has a private backup journal of original and replacement hashes. A stale public response is reported separately. Recheck the public site from a full checkout with `python3 -B reciprocal-witness-deployment/update_sitters.py verify`.

## Replay the installer checks

From a complete release, run

```bash
python3 -B reciprocal-witness-deployment/test_sitters_update.py
python3 -B reciprocal-witness-deployment/test_orthogonal_update.py
```

The first command exercises the published v1 base, the SSH pipeline, the embedded phone payload and delivery checks. The second exercises the published v2 files and the public Orthogonal menu excerpt offline. It tests interrupted updates, private backups, independently edited pages, repeated installs, byte-exact link removal, and fresh accessions with and without the independent workbench. The exact historical files required for these tests live in `fixtures/v1/` and `fixtures/v2/`. The full independently built Orthogonal HTML stays on its original host.

For the full-page check, supply a local copy of the unmodified v1.8 file with the SHA printed above. With Playwright and Chromium installed, this also clicks the link at 390×844 and 1280×800. It reports hashes, viewport sizes and public paths. It operates entirely in a temporary local site.

```bash
python3 -B reciprocal-witness-deployment/test_orthogonal_update.py --orthogonal-page /path/to/orthogonal-v1.8.html --browser
```

Recreate the deterministic upload or the single-file phone installer with

```bash
python3 -B reciprocal-witness-deployment/update_sitters.py pack /tmp/reciprocal-witness-orthogonal.tar.gz
python3 -B reciprocal-witness-deployment/update_sitters.py phone /tmp/Update-Orthogonal-Sitters.sh
```

## Install the complete accession on a fresh host

After checking out the release or extracting its complete ZIP on Scott’s SSH-enabled Termux device, run

```bash
bash reciprocal-witness-deployment/deploy.sh
```

The script uses the existing `gurtiamy` alias. The remote Python installer targets `~/public_html`. It stages the complete instrument and record, checks the SHA-256 of each catalog scope, backs up the current files privately, installs the new directories, and changes six catalog files. It checks the original ten public HTTPS routes, then runs the same Orthogonal menu integration and sitter-asset verification used for upgrades. An identical installation can be rerun. A conflicting accession, changed catalog scope or different pre-existing instrument stops the installation before public writes. If the publication source changes after this release was prepared, incorporate its changes and regenerate the baseline. The runtime applies edits to each server-side publication’s existing `main` element so current headers, scripts and any site-specific outer markup survive.

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
