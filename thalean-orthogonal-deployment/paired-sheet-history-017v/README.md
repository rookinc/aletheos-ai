# Paired Sheet History — verified Termux release

Run `bash deploy.sh` from this directory in Termux. It uses the existing SSH alias `gurtiamy` and updates only `~/www/observatories/thalean-orthogonal/index.html`.

The build is byte-identical to the reviewed 017V offline observatory. Sheet history remains opt-in. The existing X/Y/Z/O geometry, original F operator and display clock are retained.

The installer accepts the known v1.1 page with or without its default-view preset, preserves `index.before-sheet-history-017v.html`, then atomically installs the verified upload. Unknown content, symlinks, deployment locks and conflicting backups are refused. An identical retry is accepted. Local files, received HTML and public HTTPS bytes are checked before reporting success.

Rollback through the same SSH alias:

```bash
bash deploy.sh rollback
```

Rollback accepts only this release as the current page and a known previous-release backup. The backup remains preserved. A failed public fetch does not imply that the SSH installation failed; read the server message before retrying.

Success ends with `LIVE VERIFIED:` and SHA-256 `ebe248b6724f3e2727004b126b1b78f4bc6abb2670b830a4ce7a8406d573b44f`.

The actual installer and wrapper pass 17 local deployment tests, covering installation, retry, rollback, conflicting content, symlinks, locks, corrupt input and failed public verification. These tests use temporary directories and local SSH/HTTP adapters; they do not claim a live deployment.
