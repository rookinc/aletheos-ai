# Deploy from Termux

Run this package from the Android Termux environment that already has the `gurtiamy` SSH alias and key. ChatGPT's workspace does not contain that configuration. No new key or password needs to be pasted into chat.

Install missing command-line dependencies, if needed:

```bash
pkg install openssh curl coreutils unzip
```

Download the release archive and verify the archive SHA-256 supplied with the handoff before extracting it into a fresh directory. Inside the extracted directory:

```bash
sha256sum -c SHA256SUMS && bash deploy.sh
```

The script uses `ssh -T gurtiamy`, preserves the prior page, and refuses any current page whose hash differs from the recovered baseline. It finishes with `LIVE VERIFIED` only if the public HTTPS response matches the installed bytes. A failure after the SSH action can mean the page was installed but public verification failed; read that message before retrying.

If the server reports an unknown existing page, stop and retain its reported hash for source recovery. Do not edit the allowed hash or bypass the guard. The current production source must be reconciled first.

To restore the preserved prior release:

```bash
bash deploy.sh rollback
```

The host action is authorized by the user's request to deploy through Termux. Source comparison and exact-byte guards still apply. The source branch is `thalean-orthogonal-encounter-v12`; commit and release archive hashes are supplied in the handoff.
