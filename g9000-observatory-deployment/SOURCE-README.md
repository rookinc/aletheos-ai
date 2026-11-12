> Retained README from source commit `07e9048586f50382f0dd263b8f86f5b414caec06`. Its `dist/` and `scripts/` paths describe that upstream checkout. In this repository, the app is `public_html/observatories/g9000/` and adapted checks are `g9000-observatory-deployment/checks/`. Use the adjacent `README.md` for Termux deployment.

# G9000 Paired Field Observatory

A buildless HTML/CSS/Canvas observatory. `dist/` is the deployed output. The previous signed G60 observatory remains at `/g60.html`.

## Registered construction

The current model reconstructs the native paired quotient from `dist/native/native.json` and cross-checks its registered numbering against `constructor_chapter4.json`:

- G60: 60 vertices, 120 edges, degree 4. Free deck group D = {1,a,b,ab}.
- G900 = (G60 square G60) / diag D: 900 states, 3,600 edges, degree 8. Each edge changes one factor.
- G1800 = (G60 square G60) / diag {1,a}: 1,800 states, 7,200 edges and two lifts per G900 state.
- T[x,y] = [ab y,x], T^2 = B (lift exchange), T^4 = I.
- G9000 = five G1800 frames, with F(k,z) = (k+1 mod 5,Tz). Its 36,000 intra-frame and 9,000 undirected F edges give 45,000 unique edges, degree 10 and a connected graph. F preserves its edges.
- F has exactly 450 disjoint cycles of length 20. The bare G900 projection repeats after 2 steps, the frame + G900 projection after 10, and the full state after 20.

For native zero, five-step checkpoints are `0, 480, 488, 8, 0`. At step 10, native state 488 has the original G900 projection and the opposite lift. This is also cross-checked against Advanced Transport Observer v34 (identical K and projection arrays).

Sources: *Thalean G900 Surface / G9000 Field 001*, *Thalean G900 Sheets and Proofs*. The native source SHA-256 is `9d7729b179da8919d2713701a8e4ef4eebc77c9baef4c0051a1bcf5327ba40e6`.

## Views and controls

Four linked views show the complete field, the unit-sphere radial projection, the G900 quotient, and two G60 carriers drawn as eight-sector bars. Selecting a dart preserves its native identity across views. Play/pause, single-step and 0/5/10/15/20 checkpoints reveal the return structure. The inspector shows native state, frame, lift, G900 projection and canonical factor pair with zero-based indices.

All 450 moving darts follow actual F successors. Straight line interpolation is purely visual between native states. A selected dart's 20-state orbit is gold. Optional staggered starts offset other darts by their cycle index modulo 20; the selected dart remains at the shown phase.

Camera orbit, pan and zoom are independent of native transport. Controls offer all vertices, sampled or full intra-frame edges, all F edges, PNG export and focus mode. The default samples 1/12 of intra-frame edges and labels that sampling explicitly; it retains all topology and renders all 450 darts.

## Scope

Bar sectors, toroidal coordinates, distances, speed and interpolation are drawing choices. The model is exact native graph connectivity and permutation transport; it does not assert magnetic field strengths, a metric embedding, calibrated physical dynamics or a 720-degree rigid-body rotation law.

The earlier signed register `E[1,a,b,ab] | [ba,b,a,1]E^-1` remains in the original G60 view. Signs there are traversal display codes and ordered word histories. In the native construction here the deck endpoint permutations satisfy ab = ba. The original atlas G60 numbering is separate from this native registration and is never mixed into the paired constructor.

## Validation

Run `python scripts/build-native.py` to reconstruct and validate all quotient states, registered G900 edges and projection, exact turn map, 450 disjoint 20-cycles, lift flip, 45,000 unique edges, degree 10, connectedness and F edge preservation. This writes `dist/native-model.js` deterministically.

The independent supplied proof checker, retained in `scripts/verify_source_bundle.py`, passed all exact structural, registration and spectral certificate checks against the original ZIP. Run it with the ZIP path if available; NumPy is required for that independent checker. The model builder needs only the Python standard library.

The browser checks the complete cycle partition against F on load. UI checks covered the 10/20 return checkpoints, all three views, playback, full edge rendering, dart selection and a 390 × 844 layout. No external scripts, packages, analytics or services are used by the app.

## Spherical view

Open `/#sphere`, or choose Sphere. A G9000 point p in the existing chosen field embedding maps to u = p / ||p||. The drawing uses radius 5 for screen scale; reported spherical radius is exactly 1. Latitude is asin(u_y); longitude is atan2(u_z,u_x), in degrees. North is +Y, longitude zero +X, and positive longitude turns toward +Z. These coordinates depend on the chosen embedding; radial distance is discarded and distinct native states may overlap.

F successors and all native indices remain unchanged. The selected dart's live readout follows shortest great-circle interpolation at the current fractional phase. Back-facing paths are dimmed, the graticule is spaced by 30 degrees and can be hidden, and all 450 darts and the selected 20-state orbit remain available. A stable plane is chosen for exactly antipodal endpoints. The native 10-step lift flip and 20-step full return remain visible.

View buttons preserve selected dart and phase; URL hashes select the initial view. Native topology data is unchanged. `node --test scripts/spherical.test.cjs` verifies coordinate conventions, unit radius, angular speed and robustness at coincident and antipodal endpoints. Browser checks cover playback, the 10/20 checkpoints, view switching, grid controls, and a 390 × 844 phone layout.

## Explore: return, absence and response

The Explore button opens three linked inspection lenses while preserving the six original field views. Native animation and camera orbit pause while the workspace is open and resume on ordinary close. Highlighting a return intentionally leaves the field paused.

- **Return:** replay the actual ten-edge closed history and its reverse on four receipt backgrounds; inspect one through four returns, switch between receipt-character and kinetic-coupling readouts, and compare the unchanged support Gram. “Highlight on G9000” draws the verified native route in Field/Sphere; the receipt backgrounds remain an additional cover. F playback or choosing a dart clears this overlay.
- **Absence:** the current Frank-linked Gate014 construction on independently generated L(Petersen). Choose any pentagon and inspect its one disjoint mate, five vertex-touch neighbors and five edge-sharing neighbors. Its source numbering is not used as a G9000 stage crosswalk.
- **Response:** the exact 12-energy native character response, with Sum/Difference/Both controls, retained cancellation states and exact radical/fraction labels. The 16/72 comparison is for L alone.

The current Site's indexed G9000 base was verified against the sealed 013 fixture: identical G60 edges, deck maps, ordered-pair representatives, selected turn and 7,200 internal edges. This authorizes the return-route overlay only, and does not identify the different G900 quotients, four-sheet receipts, water modes or physical fields. See `docs/research-registration.json` and replay:

```sh
python3 scripts/verify-research-registration.py /path/to/THALEAN-NATIVE-LOOP-ENVELOPE-013.zip
node --test scripts/return-lens.test.cjs scripts/absence-lens.test.cjs scripts/response-lens.test.cjs
```

Source and interpretation notes are in `docs/frank-scan.md` and `docs/research-lens-provenance.md`. The full Frank transcript could not be retrieved in this conversation; the explicitly identified current Gate014 certificate and producer were read and replayed. CMB packet orders and spinor questions are not converted into physical claims.
