# G9000 Paired Field Observatory — Aletheos deployment

Dedicated destination: **https://aletheos.ai/observatories/g9000/**.

This is the six-view paired-field app with the Return, Absence and Response lenses. Its source is `public_html/observatories/g9000/`. It is separate from the B32K, Water, graph explorer and Omega observatories.

## Deploy from the existing Termux checkout

Use the branch and commit supplied with this release, then run:

```bash
cd ~/dev/cori/website/aletheos.ai || exit 1
G9000_SSH_TARGET=gurtiamy bash g9000-observatory-deployment/deploy.sh
```

Local requirements: Bash, Python 3.6 or newer, OpenSSH and curl. On Termux, missing dependencies can be installed with `pkg install python openssh curl`. The existing `gurtiamy` SSH alias and account supply authentication; the installer neither saves credentials nor changes SSH configuration.

The Bluehost account must already expose `~/www` and `~/www/observatories`, and provide Python 3.6 or newer. Preflight checks this before creating installation state. The installer does not install software remotely or alter server configuration.

## Release and publication contract

`build-release.py` uses only the Python standard library. It reads the static source without modifying it, hashes a canonical inventory, copies every source file into `releases/<content-hash>/`, and rewrites only relative `href` and `src` references in the root entry to that prefix. External links, root-relative links, queries and hash navigation retain their meaning. No `<base>` element is introduced. The resulting tar contains a SHA-256 manifest for every deployed file. Rebuilding unchanged source produces the same release and archive bytes.

The driver creates a private upload directory outside the webroot under the existing account, acquires an installation lock, uploads the tar with SCP, and checks the tar hash, exact member list, manifest identity and every extracted file hash. Archive paths, links, duplicate members and size limits are checked before installation.

Assets are installed once under `~/www/observatories/g9000/releases/<content-hash>/`. An existing release must match the complete manifest; it is never repaired or overwritten silently. Older release directories remain in place so an older open page continues to find its matching assets. Only the root `index.html` switches atomically. Uploaded staging data is removed and the lock released on exit.

The first installation requires no existing root index. A later update accepts only an index whose exact digest has a private installation receipt under `~/.g9000-observatory-receipts/`. It backs up that index under `~/.g9000-observatory-backups/` before replacing it. An unknown page, symlink, conflicting receipt, corrupt immutable release or concurrent installation stops the operation. The app's release marker alone is not sufficient authorization to replace a page.

After installation, curl fetches the public HTTPS index with a release query and no-cache request and compares it to the installed index digest. A failed or stale public response reports **installed, but unverified** and exits unsuccessfully. It does not misreport publication success or automatically roll back based on a possibly cached response. A repeat install verifies both the complete installed asset set and public index; it leaves an identical root index unchanged.

The final HTTPS check verifies the served entry. It does not prove that every CDN location or browser cache has refreshed, or independently fetch every asset. Immutable asset URLs prevent a new index from mixing with assets from an older release.

## Offline checks

```bash
bash -n g9000-observatory-deployment/deploy.sh
python3 g9000-observatory-deployment/tests/deploy-package.py
```

The test suite runs the shipped installer and builder with local SSH/SCP/HTTPS stand-ins. It makes no network calls and does not change the operator's home directory. Cases cover first and repeated installation, recognized updates and private backups, unknown pages, corrupted uploads, symlink targets, lock contention, damaged immutable assets, deterministic packaging and failed or stale HTTPS delivery.

Stale locks are deliberately not removed automatically. If deployment was interrupted, inspect the private lock and its named upload directory on the server before removing only that abandoned installation's state. Existing indices, backups and immutable releases remain available for inspection and rollback.
