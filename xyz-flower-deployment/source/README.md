# Kalachakra · Thalean Observatory

Self-contained Canvas observatory with four views: five-level mandala chart,
native F split torus, eight-role ring/cube, and Pilot 002 Fourier transfer.

Build: `python build.py`. Verify: `node verify.cjs`.
The shipped `dist/index.html` has no remote runtime dependencies.

The exact registered K permutation was read from the public Thalean Graph
Explorer v0.34.0 inline data. Its compact representation was compared against
all 1,800 original values in that page. F(frame,local) = (frame+1 mod 5,K(local)).
Generated routes use the same increasing-minimum start convention as the
explorer. All 9,000 states are covered by 450 disjoint cycles of length 20.
The first complete route is checked against the source.

The mandala geometry is an analyst-selected drawing: five transport frames
are placed at five palace levels; cycle-stage modulo four is placed around
the directional plane. It is not a traditional semantic mapping. Interpolation
between states is display geometry and does not change F.

Native transport is distinct from G60 adjacency and from the role-cube
Laplacian bridge. No claim is made that F intertwines with P. No PID, water,
or physical field solver is included.

Pilot 002 P, Q and H are shipped as floating-point representations of exact
rational witnesses. Startup checks verify LG P = P LC and QP = I to numerical
precision. The original exact study is linked in the app. Native G60 positions
are a spring layout with a fixed seed, independent of its 120 graph edges.

Controls: playback, full-cycle Hz, frame separation, selected route trail,
edge/vertex/palace fades, split-torus merge, ring/cube morph, route and Fourier
mode selection, free orbit/pan/zoom/roll, camera presets, state save/load and
offline HTML download. State IDs are zero-based source indices; route labels
are one-based display numbers. No intrinsic root is asserted.

Sources:
- https://aletheos.ai/observatories/thalean-graph-explorer/
- Detri Rinpoche, Abridged Kalachakra Mind Mandala Sadhana, Study Buddhism
- Kalachakra G60 Pilot 002, 8 November 2026

Source data provenance is retained in transport.json and pilot-data.json.
Research prepared for Scott Cave / CoRI. Hosting is a separate private
prototype; no changes have been made to the existing aletheos.ai explorer.

## Flower of Life (v0.2)

Adds a 19-circle triangular-lattice chart. Route c uses circle c modulo 19;
alternating routes have opposite angular directions. Each route's 20 F states
are displayed around its assigned circle; intersections do not change routes.
Bloom depth separates transport frames vertically. Default depth is zero.
The #flower URL fragment opens this view directly. Old v1 state files load
with default flower depth when that field is absent. No new operator
correspondence is asserted.

## XYZ flower (v0.3)

The Flower layout selector adds three perpendicular XY/XZ/YZ flowers.
Each of the 450 routes is assigned to exactly one plane by c mod 3,
so there are 150 routes per plane. This is a coordinate embedding only.
The #xyz fragment opens the 3D layout. Plane visibility, XYZ axes and
existing depth/trail/camera controls are supported. Older state files
receive defaults for new settings.

## Hydrogen flower (v0.4)

Reuses Hydrogen Motiph 1.0's registered G9000 engine, graph and three
precomputed spectral presets without changing its Hamiltonian. All 1,800
K entries and quotient addresses match. The #hydrogen fragment opens
probability, relative-phase and signed-current visualization on fixed
XYZ flower state coordinates. All 9,000 states and 45,000 edges are computed;
the 160 largest two-mode current coefficients are displayed. Plane visibility
and bloom depth affect drawing only. Optional F darts use a separate clock.
Ground/excited/coherent modes, attraction g=0/1/4, mixing, phase, measurements,
state save/load and full JSON receipts are supported.

This is a dimensionless graph hydrogen analogue with two retained spectral
modes, not calibrated physical hydrogen. Attraction does not commute with F.
No physical electron orbit or proton at the flower center is asserted.

Verify with `node verify.cjs` and `node verify-hydrogen.cjs`. The latter writes
`hydrogen-verification.json`, including independently recomputed eigenvector
residuals, graph edge registration, current continuity and stationary checks.

## Flow visibility (v0.5)

Hydrogen's layer faders are grouped at the top of its controls: Edges controls
current chords and flow tracers; Vertices controls probability dots; Flower
drawings controls the geometric circles and plane labels. All reach zero
independently. Axis guides and F darts retain separate switches.
Flow tracers use the analytic integral of signed two-mode edge current,
with a display speed scale and edge wrapping. Their direction reverses with
current, brightness tracks its magnitude, and pause freezes their positions.
They do not depict electron paths. Stationary modes show no current tracers.
Existing state files load defaults for the new controls.

## Native triangles (v0.6)

The #triangles link opens one verified triangular 3-cycle in the XYZ flower.
41 common-phase triangle orbits are selectable; these are a subset of 134
cross-plane orbits under the current display assignment. The selected three
darts share the F phase; the other darts keep their usual staggered offsets.
Only triangle darts is enabled by default. Face and edge opacity are separate.
Step buttons pause and advance one native step. Readouts distinguish invariant
graph distances (1,1,1) from interpolated drawing area; IDs are zero-based,
route labels one-based. A hidden plane suppresses the face. Receipt export
includes the full twenty-step state sequence and source provenance. No graph
edges or Hamiltonian terms are added. Verify with `node verify-triangles.cjs`.

Corrected source-version text to registered Explorer v0.34.0; earlier display
version edits had inadvertently modified this citation. Transport data unchanged.

## Triangle Fourier study (v0.7)

Cycle & Fourier analyzes 20 discrete native samples for the selected orbit
and bloom depth. It exposes area, squared side, centroid coordinates, oriented
area components, and graph distance. The chart compares current depth to flat
geometry on the same scale; camera and visibility never alter measurements.
Normalized DFT coefficients, single-sided amplitudes, mean, dominant non-DC
bin, and inverse reconstruction error are included in JSON export. CSV exports
all signals for current and flat drawings. Step buttons select native samples.
This is an observable spectrum, distinct from the Pilot002 operator witness.
Twenty samples only resolve bins0–10; higher continuous frequencies may alias.
The #triangle-spectrum link opens this analysis directly. Verify with
`node verify-triangle-spectrum.cjs`.

## Spatial Fourier overlay (v0.8)

#fourier3d opens gold Fourier-coordinate triangles over the cyan native
reference, with depth .8 to expose more than the flat first harmonic.
The overlay transforms the nine corner-coordinate signals independently.
Choose mean plus one harmonic or mean plus harmonics1..k, k0..10; fade the
overlay, toggle its full-cycle paths, or hide the native reference. k0 is
the three mean positions. Cumulativek10 reconstructs all20 native samples;
fractional phases use trigonometric interpolation and need not match the
native display interpolation. Readouts report current corner separation
and maximum native-sample gap for the selected reconstruction. These are
coordinate modes, separate from scalar-area modes and native graph edges.
Exports include coordinate coefficients and all native samples.
Verify with `node verify-triangle-spatial.cjs`.


## v0.9 — 450 route triangles

The `450 Triangles` tab and `#all-triangles` entry show one geometric triangle for each of the 450 native F routes. Each route position is drawn in XY, XZ and YZ, producing 1,350 corner markers. These three corners represent one native state, not three distinct adjacent vertices. This construction is separate from the 41 selectable verified native triangle orbits. Connecting edges are drawing geometry.

The view uses its own face, edge, corner, flower and depth controls; isolate any F1–F450, synchronize or stagger phases, pause or step, rotate, zoom and toggle planes. Hidden planes suppress complete faces. Hydrogen evolution and probability/current rendering are inactive here. JSON state and offline export retain the new controls.

Validation: `node verify-swarm.cjs` checks 10,800 route configurations, F advancement, all three coordinate mappings, 20-step closure and 450 distinct active state IDs at every integer phase.


## v0.10 — front camera and dart tails

XYZ Front uses X up, Y right, and Z into the screen, matching the supplied reference. The 450 Triangles view opens and resets to this preset. White selection arrows toggles the selected route's white outline, halo and white edge emphasis while retaining its ordinary colored darts. Dart tails controls opacity of the preceding three F steps, with fading toward the oldest sample; zero hides all tails. Both controls persist in JSON state and offline exports.


## v0.10.1 — preferred starting settings

Start in 450 Triangles at 4 Hz, Front camera, faces 17%, edges 0%, vertices 0%, tails 16%, flower 0%, depth 20%, F21 selected, all routes shown and phases synchronized. White selection arrows are off. All three planes and axes remain enabled; labels and auto orbit default off. Saved state/offline settings continue to override the defaults when restored.


## v0.10.2 — slower synchronized default

450 Triangles now starts at 0.05 Hz with F1 selected. Faces 0%, edges 9%, vertices 0%, tails 64%, flower drawings 49%, bloom depth 32%. All routes remain active and synchronized; labels, white selection arrows and auto orbit remain off. All three planes and axes remain enabled. Front camera remains the established X-up/Y-right preset.
