# Thalean Orthogonal Observatory v1.1

Adds an **Inverse cube** view that shows only the shared X/Y/Z region of the original F paths. The full-cycle envelope is sampled in a central cube; tolerance and merge determine which cells remain. The Planck-volume / Hilbert-action interpretation is a hypothesis, not a computed physical action or scale.

## Install on aletheos.ai

Run `bash deploy.sh` from the unpacked release in Termux using your existing `gurtiamy` SSH alias. This installs into `~/www/observatories/thalean-orthogonal/index.html`. It verifies the HTML locally and on the server, installs if absent, accepts an identical retry, or upgrades only the known v1.0 page while preserving `index.v1.0.html`. Unknown content, symlink destinations and conflicting backups are refused. The public HTTP response must match the release checksum before success is reported.

Download the ZIP through `gh api` as **Base64 JSON**, then decode it. Do not request raw binary through `gh api -H 'Accept: application/vnd.github.raw+json'`: that produced the Termux `transform: short source buffer` error. Keep download commands inside a `( ... )` subshell so an error does not close the terminal session.

The installer does not modify the original Thalean Graph Explorer or the main site navigation. Source and tests are in `source/`. Build with `python build.py`; verify with `node test.cjs` and `node test-inverse.cjs`.
