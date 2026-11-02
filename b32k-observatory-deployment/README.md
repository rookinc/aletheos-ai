# B32K / G9000 Observatory — v1.3

Dedicated observatory target: `https://aletheos.ai/observatories/b32k/`.

Source: `public_html/observatories/b32k/index.html`. This release adds independent box/vertex visibility and energy-prioritized labels to B32K
Stage, including the linked native quotient tower. It is a self-contained static HTML page; no build or runtime dependencies
are required. Committing this package does not itself publish it to Bluehost.

## Deploy from the existing Termux checkout

```bash
cd ~/dev/cori/website/aletheos.ai || exit 1
git pull --ff-only || exit 1
B32K_SSH_TARGET=gurtiamy bash b32k-observatory-deployment/deploy.sh
```

The SSH alias is the same one used by the existing Omega and Water installers.
The destination is `~/www/observatories/b32k/index.html`. This installer changes
no homepage, navigation, other observatory, or server configuration.

The installer checks `release.sha256` before connecting, verifies upload size and
hash, and publishes atomically. An identical installed release is a no-op.
Any exact v1.0, v1.1, or v1.2 predecessor is backed up outside the document root before updating.
Any other existing B32K page stops installation. Temporary uploads are cleaned up.
The installer reports whether installation succeeded, but does not claim that
public HTTPS delivery was verified.

## Features

- Opens with UI hidden and darts playing: Torus, 100% split, 1.5% edges,
  vertices and all 450 darts on; box, F indicators, labels and linked tower off.
- The clean header retains Thalean G9000, Play/Pause, and Show UI.
  Play/Pause controls the current view: darts, pairing cycle, or wave.


- Hamburger switches independently hide the box frame (and face labels) and vertex dots.
  Hide vertices, set Edges to 0%, and disable F indicators for a clear 450-dart view.
- Vertex labels prioritize raw local wave energy, with short connectors to their dots.
  Hiding vertices also hides their labels; playback and the underlying graph remain intact.

- Header Hide UI / Show UI pill in all four views; playback, camera, and options survive hiding.
  The title, playback and restore pills remain over 3D scenes; Pairings keeps its central graph.
  The linked tower panel and its connector hide together.

- 9,000 native states and 45,000 native connections.
- 450 closed F cycles with independent high-contrast fiber darts and focused F
  indicators; play, pause, step, and reset.
- Split torus, B32K address space, Pairings, and Omega reference views.
- One-finger rotation; two-finger pan/twist; pinch travel without motion limits.
- Native quotient inspector linked to the selected fiber: frame/G1800 state,
  registered G900 projection, four correlated G60 pairs, two G30 pairs, and one
  G15 address pair.
- Cyan/amber dart color follows positive/negative local split-axis Z travel.

## Registration and attribution

Thalean Graph: S. A. Cave. UFT4: J. Kiseleczuk. Source attribution and exact
registration data remain embedded in the HTML (`omega-provenance`,
`native-darts`, `pairing-data`, and `quotient-link`). The Omega 15.9.10 reference
tower is kept distinct from the constructor's native quotient registration.

The toroidal chart, split distance, and between-state animation are display
choices. They do not derive a physical flow or coupling law. Dart playback is
independent of the optional scalar graph-wave probe. G9000 to frame/G1800 is a
state decomposition; G900 to the four G60 pairs is a lift, not a projection to a
preferred individual G60 vertex.

## Validation

```bash
python3 b32k-observatory-deployment/tests/deploy-package.py
node b32k-observatory-deployment/tests/stage.cjs
```

The deployment tests use local SSH/SCP stand-ins and make no network calls.
They exercise the shipped HTML and checksum, first install, repeat install,
refusal to overwrite, symlink rejection, corrupted uploads, and invalid local
manifests. Stage checks cover native incidence, cycles, navigation, split paths,
dart moves, pulse isolation, and all 9,000 linked state decompositions.
