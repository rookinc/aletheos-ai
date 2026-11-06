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

## v1.1 — inverse cube

The **Inverse cube** tab isolates triple spatial coincidence of the complete native F polylines, including the original split-sheet bridges. It samples a 50³ grid in the central chart cube [−0.5, 0.5]³. A cell is occupied exactly when the distance from its centre to each rotated path set is no greater than the tolerance (default 0.05 chart units, adjustable 0.01–0.12). All 450 twenty-step cycles are included, rather than the sparse assembly display sample. Phase offsets and animation time do not change a full-cycle envelope.

The exposed voxel faces form the display mesh. The volume is occupied-cell count × 0.02³, a resolution-dependent estimate in chart units cubed. The optional wire cube marks the observation window; it is not a derived physical boundary. All three copies must be enabled at nonzero opacity. Inverse mode omits the source toroids, factor links and PID markers. Geometry recomputes when merge or tolerance changes, and settings files retain the view, tolerance and frame. v1.0 settings remain compatible. Use `#inverse` to open directly in this view.

The proposed Planck-volume / Hilbert-action interpretation remains a hypothesis: this implementation does not define an action, assign a physical scale, or implement an inverse-cube force law.

`node test-inverse.cjs` verifies the accelerated distance grid against independent brute-force distances to three rotated path sets, checks tolerance monotonicity, validates nonempty and empty native cases, and checks the mesh and volume. At merge 0 and tolerance 0.05, 1,592 cells are retained (0.012736 chart³); no sample at the origin is invented. At merge 100 with the same tolerance, no grid sample meets all three path sets.
