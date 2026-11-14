# Encounter Lab v1.2 — deployment and rollback plan

For the requested Android workflow, use [TERMUX.md](TERMUX.md).

Target: `https://aletheos.ai/observatories/thalean-orthogonal/`.
Development branch: `thalean-orthogonal-encounter-v12` in `rookinc/aletheos-ai`.

**Prepared and tested locally; not deployed.** The production GET returned HTTP 406, so the live source identity is unresolved. This package follows the existing owner-operated SSH deployment convention, with alias `gurtiamy` and target `~/www/observatories/thalean-orthogonal/index.html`. It does not alter other observatories.

Host access was not established here: the read-only `ssh -G gurtiamy` check failed before alias resolution with `Bad owner or permissions on /etc/ssh/ssh_config.d/20-systemd-ssh-proxy.conf`. No remote SSH action was attempted. Use the owner's already configured environment; this package does not change system SSH permissions or credentials.

## Review gates

1. Review the changes against base commit `9a1a659e8f6b1e4d83212271b7840788d1f3aa19`, especially the detector definitions and the lack of a coupling executor. Read `../source/provenance/encounter-001/README.md` and all seven audits.
2. Run `python3 scripts/run-encounter-regressions.py` in `../source`. Repeat browser checks if UI sources change. Test a physical Android browser before claiming device validation.
3. Through the owner's existing host access, inspect and hash the actual current production page. It must equal the recovered previous page:

   `ebe248b6724f3e2727004b126b1b78f4bc6abb2670b830a4ce7a8406d573b44f`

   If it differs, stop, recover that source and review the discrepancy. Do not update the allowed hash merely to bypass the check.
4. Confirm the release's exact output hash in `release.json`, and verify `sha256sum -c SHA256SUMS`. Review and approve production deployment only after the earlier gates are satisfied.

## Install after review

From this release directory, using the owner's configured SSH environment:

```bash
bash deploy.sh
```

The wrapper validates the package, streams the verified HTML through SSH, and verifies the returned page over HTTPS. The server rejects an unknown current page, corrupted upload, symlink destination, existing deployment lock, or conflicting backup. It stages within the target directory and performs an atomic replacement only after rechecking the current hash. An identical release retry is safe.

The exact prior page is preserved as `index.before-encounter-v12.html`. The repository baseline commit and the original `paired-sheet-history-017v/index.html` are additional recovery references. Do not delete or replace the preserved host backup during review.

An HTTP verification failure after SSH **does not mean the server action was undone**. The wrapper reports that distinction. Inspect the installed hash and public cache before retrying or rolling back. Never claim successful production verification from SSH alone.

## Roll back

```bash
bash deploy.sh rollback
```

Rollback accepts only this release as the current page and only the known prior hash in its backup. It restores that exact prior content atomically and keeps the backup. If the page has changed since deployment, rollback refuses to overwrite those later changes. An already-restored retry is safe.

## Package validation

From `../source`:

```bash
python3 ../encounter-v12/test-deploy.py --previous ../paired-sheet-history-017v/index.html --output provenance/encounter-001/deployment-checks.json
```

This executes the real server and wrapper scripts in temporary directories with local SSH/HTTP adapters. Seventeen checks cover normal install, backup, repeat install, rollback, repeat rollback, corrupt upload, unknown page, conflicting backup, symlink paths, lock handling, missing/bad rollback backup, wrapper quoting, HTTP failure and tampered-package refusal. It uses no network and makes no deployment.

`index.html` is a self-contained offline build. `release.json` records the baseline and new page hashes. `SHA256SUMS` covers the release files. After any source change, regenerate the bundle and package, rerun validation and review the new diff before installation.
