# Development deployment packet

Release is held. Do not promote this candidate until the manuscript correspondence and browser gates have passed and a new gate receipt is issued. No cutover script is supplied for a held release.

On the authenticated Termux system, extract the ZIP into a new directory, then run from it:

```
python deployment/verify-files.py site
bash deployment/stage.sh
```

Requires Python, ssh, scp, an authenticated `gurtiamy` alias and remote python3/diff. No `set -e` is used. The script verifies local inventory/hashes, stages in a new timestamped sibling directory, verifies remote bytes, and makes a complete copy of the current live directory outside the public web root with `diff -qr` comparison. On failure it stops; inspect and retain partial staging and backup state. It never deletes or replaces the live application. A staging URL can be read from the returned stage directory basename. Staging inside the web root makes the candidate publicly reachable at that unlinked path.

After all gates pass, the release owner must record backup and build hashes, use same-filesystem directory renames with an immediate restoration trap for failed promotion, and verify served manifest, index, all module/data hashes, and browser behavior at https://dev.rook.ca/aletheos/. Verify that retired files are unreachable. Retain the rollback directory. No such operations occurred in this execution environment.
