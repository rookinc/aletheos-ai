# XYZ Flower · Thalean Observatory v0.10.3

Default: 450 Triangles, screenshot-matched camera, 0.05 Hz, F1, synchronized.
Reset view restores the fitted angle. Camera opens a live rotation (W X Y Z),
zoom and pixel pan readout. Copy coordinates captures the full-precision
JSON camera state.
Faces 0%, edges 9%, vertices 0%, flower 49%, tails 64%, depth 32%; labels and white arrows off.
The 450 geometric triangles join three drawings of each F route, not native graph edges.

Public route: https://aletheos.ai/observatories/xyz-flower/
Catalog: https://aletheos.ai/observatories/
3D Fourier view: append #fourier3d to the flower route.
Triangle view: append #triangles to the flower route.
Cycle analysis: append #triangle-spectrum to open the Fourier readout.
Hydrogen view: append #hydrogen to the flower route.

Run `bash xyz-flower-deployment/deploy.sh` from this extracted release on
Termux using the existing `gurtiamy` SSH alias. The package installs the
flower HTML, mathematical evidence JSON, and existing catalog entry only.
No external runtime or ChatGPT sign-in is required by the public flavor.

The 3D Fourier overlay reconstructs the nine XYZ corner-coordinate signals
over the native triangle. Gold shows the mean plus one harmonic, or the
mean plus harmonics 1 through k. The full cumulative set, k = 10, reproduces
all twenty native samples to numerical precision. Between samples, the
trigonometric interpolation can differ from the native drawing interpolation.
The overlay has its own opacity fader, path switch and native-reference
switch. Its JSON receipt includes all complex coordinate coefficients,
native samples and reconstruction errors. Gold edges are drawing geometry;
they introduce no native graph edges or Hamiltonian terms. Coordinate modes
are separate from the scalar-area spectrum. #fourier3d starts at 80% bloom
depth to expose additional drawing harmonics beyond the flat circle motion.

Cycle & Fourier analyzes 20 discrete native F samples for drawing area,
squared side length, centroid coordinates, oriented area components and
graph distance. Current-depth and flat-reference signals share chart scales.
The single-sided DFT exposes bins 1-10 with optional mean/DC; its inverse
reconstructs the samples. JSON exports retain all complex coefficients;
CSV exports retain twenty samples and their native state IDs. Frequencies
are cycles per F return, not physical Hz. This observable analysis does not
assert a new native operator bridge or a hydrogen energy spectrum.

The native triangle overlay selects among 41 equal-phase, cross-plane F
orbits. All 820 discrete triangles retain graph distances 1, 1, 1 through
20 steps. The example starts at native IDs 3, 35, 46 on displayed routes
4, 35, 45. Selected darts share the F phase while other darts retain their
optional display staggering. Face/edge faders, single-step controls,
area and state readouts, and a JSON receipt are included. The filled face,
interpolation and area in drawing units do not modify the graph or Hamiltonian.

The Hydrogen tab reuses Hydrogen Motiph 1.0's graph, spectrum and engine;
all 9,000 states and 45,000 edges remain computed. Independent edge, vertex
and flower faders and signed-current flow tracers are retained. This is a
dimensionless graph hydrogen analogue, not calibrated physical hydrogen.

Inside `source/`, run `python build.py`, `node verify.cjs`,
`node verify-triangles.cjs`, `node verify-triangle-spectrum.cjs`,
`node verify-triangle-spatial.cjs`, and `node verify-hydrogen.cjs`.
The self-contained build uses Python's standard library with the shipped data.

The installer verifies SHA-256 and runs PHP lint on Bluehost before writes.
It backs up changed files outside the webroot and rolls back installation
errors. It accepts absent files, the known original catalog, exact v0.3,
v0.4, v0.5, v0.6, v0.7, v0.8, v0.10.1 or v0.10.2 releases, or the current release. Other changes block
writes. The deployment script checks public file hashes and the catalog link
afterward. Live Bluehost publication still requires the existing Termux SSH
connection.
