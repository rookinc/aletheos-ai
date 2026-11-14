# Termux installation

Use a fresh extracted v1.3 directory containing this file, deploy.sh and SHA256SUMS. Keep the existing gurtiamy SSH alias and key.

```bash
sha256sum -c SHA256SUMS && bash deploy.sh
```

The installer validates the package and current page, saves the v1.2 predecessor, installs atomically and verifies the public HTTPS response. Success ends in LIVE VERIFIED and the checksum from release.json. If it reports an unknown current page, retain that hash and recover its source before changing the allowed predecessor. If HTTP verification fails after SSH, inspect the server result; installation may already have completed.

Rollback from the same directory:

```bash
bash deploy.sh rollback
```

It restores the verified v1.2 page from index.before-automaton-v13.html. It does not remove earlier backups or alter other observatories.
