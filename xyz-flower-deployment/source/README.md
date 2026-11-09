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
