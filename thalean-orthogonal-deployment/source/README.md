# Thalean Orthogonal Observatory

Three synchronized copies of the Thalean Graph Explorer v0.34.0 Data chart, rotated about a shared origin. Native graph and PID implementation are preserved byte-for-byte (hashes in `source-provenance.json`).

- X copy: YZ plane; normal +X; native coordinates `[x,y,z] → [y,z,x]`.
- Y copy: ZX plane; normal +Y; native coordinates unchanged.
- Z copy: XY plane; normal +Z; native coordinates `[x,y,z] → [z,x,y]`.

These proper rotations preserve geometry and handedness. There are no cross-copy edges, forces or coupling laws. A common native simulation evaluates identical synchronized copies without redundant integration. Phase offsets change displayed F-cycle registration only.

## Build and verify

`python build.py` assembles a single offline-capable `dist/index.html` with no dependencies or external requests.

`node test.cjs` checks native incidence, F^20, orthogonal normals, determinants, distance and endpoint preservation, PID conservation, pause behavior, and original engine hashes.

The page supports full quaternion orbit, two-finger pan/pinch/roll, axis and oblique camera presets, per-copy isolation/opacity/phase, native/plane coloring, merge, edge and vertex opacity, play/pause/single step, and JSON settings export/import. Loaded settings start a fresh simulation.

`dist/index.html` may also be copied to a static observatory host or opened locally. The original Aletheos explorer is not modified by this project.

Copyright © 2026 CoRI Publishing. A Rook Services Inc. initiative. Original credits are retained in the interface.
