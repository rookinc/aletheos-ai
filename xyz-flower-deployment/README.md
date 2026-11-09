# XYZ Flower · Thalean Observatory v0.6

Public route: https://aletheos.ai/observatories/xyz-flower/
Catalog: https://aletheos.ai/observatories/
Triangle view: append #triangles to the flower route.
Hydrogen view: append #hydrogen to the flower route.

Run `bash xyz-flower-deployment/deploy.sh` from this extracted release on
Termux using the existing `gurtiamy` SSH alias. The package installs the
flower HTML, mathematical evidence JSON, and existing catalog entry only.
No external runtime or ChatGPT sign-in is required by the public flavor.

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
`node verify-triangles.cjs`, and `node verify-hydrogen.cjs`.
The self-contained build uses Python's standard library with the shipped data.

The installer verifies SHA-256 and runs PHP lint on Bluehost before writes.
It backs up changed files outside the webroot and rolls back installation
errors. It accepts absent files, the known original catalog, exact v0.3,
v0.4 or v0.5 releases, or the current release. Other changes block writes.
The deployment script checks public file hashes and the catalog link afterward.
Live Bluehost publication still requires the existing Termux SSH connection.
