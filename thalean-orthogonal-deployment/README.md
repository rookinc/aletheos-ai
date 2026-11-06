# Thalean Orthogonal Observatory v1.0

Destination: https://aletheos.ai/observatories/thalean-orthogonal/

From Termux, download this release ZIP with GitHub CLI, unzip into a temporary directory, then run `bash Thalean_Orthogonal_Observatory_v1.0/deploy.sh`. The installer uses your existing `gurtiamy` SSH alias. Required tools: gh, unzip, openssh, curl, coreutils.

The installer verifies the local HTML checksum, streams the file over SSH, checks the uploaded checksum, publishes it at `~/www/observatories/thalean-orthogonal/index.html`, and verifies the exact public response checksum. It can create the page or accept an identical existing v1.0 file. It stops if a different page is already present.

The original explorer stays available at its existing path. This release has one shared clock and camera for three proper orthogonal copies, with visibility, solo, opacity, phase, merge and JSON settings controls. All assets are embedded in index.html.

Source and geometry tests are in the repository under `thalean-orthogonal-deployment/source/`. Build with `python build.py` and verify with `node test.cjs` there.
