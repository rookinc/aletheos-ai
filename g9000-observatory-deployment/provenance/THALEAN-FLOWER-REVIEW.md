# Thalean flower source review and spherical projection

Reviewed source: Kalachakra Thalean Observatory, project `appgprj_6af10c5a40708191bdfb82d70895c4b9`, commit `1a3d7b64246e75e9accfa5b804d250cb351d359f`.

Original observer: https://kalachakra-thalean-observatory.scott340674.chatgpt.site

Source files reviewed: `model.js`, `transport.json`, `swarm-model.js`, `swarm-ui.js`, `app.js`, `README.md`. The original project was not modified. `dist/native/kalachakra-model.js` and `kalachakra-transport.json` are byte-for-byte copies for reuse and reproducibility.

## What the original actually does

- `flowerCenters()` constructs 19 centers (1 + 6 + 12) on a triangular lattice with spacing and circle radius 0.42. Sorting by radius and angle determines route-to-center assignment.
- `flowerPoint(c,t,cycles,depth)` assigns route `c` to center `c mod 19`, angle `2π(c/450 + direction*t/20)`, alternating direction by route parity.
- The local third coordinate is `(interpolated frame − 2) * 0.26 * depth`. Frame interpolation uses smoothstep `u²(3−2u)` between consecutive exact F states, including the frame-4-to-frame-0 transition.
- `planePoint` uses the exact XY `[u,v,w]`, XZ `[u,w,v]`, YZ `[w,u,v]` coordinate permutations.
- The original Flower XYZ mode assigns each route to one of three planes. The 450 Triangles view in the user's screenshot instead draws all three copies of every route: 450 triangles and 1,350 moving corners. This complete construction is the basis of the new view.
- The triangle's three copies share one native state. Its visual edges are not native graph adjacency.
- Circle guides comprise all 19 circles in all three planes, all five bloom layers when depth is nonzero, and the original outer boundaries at 1.28 and 1.32.
- The source defaults were bloom depth 0.32, circles 0.49, and tails 0.64. Current startup values are listed in the Light view startup preset below; the circle guide strength remains 0.49.

## Identity registration

Every one of the original 1,800 carrier permutation entries equals the current G9000 `turn` entry. All 450 cycles match in order and state identity, covering every one of 9,000 states exactly once. Original route F1 is current D0; no route renumbering is required.

The native construction remains unchanged: 9,000 states, 45,000 undirected edges, 450 disjoint 20-step F cycles. A 10-step frame/G900 return retains the opposite lift; the full native return takes 20 steps.

## Spherical geometry

Radial normalization of a plane through the origin collapses the planar flower to a great circle. The new view instead uses inverse stereographic projection independently in each original local chart.

For original local point `(u,v,w)`, choose `a=0.84`, `r=1+w`, and `d=a²+u²+v²`:

`q = r * (2au, 2av, u²+v²−a²) / d`.

Apply the original `planePoint(q, plane)` permutation afterwards. Circle curves and intersections within a chart and fixed frame-depth layer are preserved as circles on a sphere. Intersections between different charts are not generally preserved. The chosen chart scale is a display parameter, not a native invariant or physical field equation.

- At bloom depth zero all curves lie on one unit sphere.
- At the current default depth 0.33, the five integer frame radii range from 0.8284 to 1.1716. Continuous native-phase display interpolation travels between these radii. At maximum bloom the range is 0.48 to 1.52, always positive.
- The wrap slider blends the original Cartesian position with the spherical position. Only the endpoints claim the exact original / exact spherical geometry. Intermediate values are an illustrative morph.
- The original continuous flower point is evaluated *before* projection. Dart travel is not replaced by shortest arcs between native endpoints.
- Geometric triangle connectors use spherical arcs at full wrap, straight segments at zero wrap; they add no graph edges.
- Readouts use north +Y, longitude zero +X increasing toward +Z, `r=norm(p)`, latitude `asin(y/r)` and longitude `atan2(z,x)`. Longitude is undefined at a pole; both angles are undefined at the origin. The optional grid is a unit-radius reference.

## Verification

`node --test scripts/spherical.test.cjs scripts/flower.test.cjs` verifies exact source registration; unwrapped equality to original coordinates for all routes and planes; correct spherical radius for every native state at three bloom depths; continuous 20-step closure; invertibility and circle-plane identities for all 19 circles; preserved neighboring circle intersections; and existing spherical interpolation behavior.

Browser checks: desktop and 390 × 844 phone layouts, plane visibility and copy counts, coordinate chart selection, wrap/depth endpoint controls, F10 opposite lift and F20 full return, shared state across views, and play/pause. Only browser extension metadata warnings were observed, unrelated to site code.

## RGB / CMYK screen comparison

The flower menu now selects RGB additive light (default), CMYK subtractive ink, or the original XYZ palette. XY/XZ/YZ map respectively to R/G/B or C/M/Y. Each mode evaluates the same flower point and preserves the native state, phase, camera and geometry.

The color layer uses Canvas `lighter` addition for RGB and `multiply` on white for CMYK. RGB has intensity 0.1–3.0 and an optional downsampled blur glow. CMYK's K control scales the reflected channels of each ink mark by `1−K`; K=1 makes the colored marks black. This is a screen-space illustration, not a spectral renderer, printer profile or derived physical emission law. Marker labels and neutral triangle guides remain annotations. The optional sphere grid is overlaid after the color layer.

Browser validation covers RGB/CMYK/original switching, K extremes, intensity adjustment, unchanged F10 state across modes, playback through a mode switch, and a 390 × 844 phone layout. Existing geometry/native-cycle tests still pass.

## Full-cycle gradient tail

Each visible route now draws its previous 20 F steps in every enabled plane. The slider specifies a linear age gradient over those 20 steps (newest first, oldest last). At slider `s` in [0,1], first-step alpha is `min(1,2s)` and last-step alpha is `max(0,2s−1)`. At 0% all tails are hidden; at 50% the first step is opaque and the last transparent; at 100% every step is opaque. Neither the selected route nor background routes receive an extra opacity reduction.

The gradient is evaluated at each of the 20 F-step ages, while each step is drawn along the original continuous flower path with intermediate samples. Equal-age paths are batched for responsive playback. The selected route is wider and uses the same gradient. Its separate solid orbit overlay is omitted while tails are visible, so it cannot mask the fade; the orbit option still works when tails are at 0%.

RGB intensity is applied as additive exposure to the completed color layer, after trail alpha is set. This keeps light intensity independent of the tail's requested gradient. Geometry, native cycles, current phase and three-plane registration are unchanged. `scripts/flower-tail.test.cjs` verifies both requested anchors, hidden tails, intermediate values and monotonic fading across the whole cycle.

## Interior components and white spherical projection

The new `#light` view gives a concrete meaning to “nontrivial”: the nonconstant part of each native 20-step coordinate signal. For each route, the mean of its 20 fully wrapped native flower positions is removed: `q(t)=p(t)−(Σ p(j))/20`. The finite sequence of native residuals has zero mean and repeats after F20. Continuous travel follows the existing flower phase law relative to that native-position mean. This is a decomposition of the F-cycle coordinate signal, not a claim to classify all irreducible representations of G9000.

Colored positions are contracted into the sphere by `ρ q / max(1,norm(q))`, where the default interior radius ρ is 0.85 (allowed 0.25–0.85). Their directions feed a model-space angular field with 72 longitude and 36 latitude cells. Full-cycle tail weights and the enabled RGB channels determine contributions, with bilinear deposition and a small conservative angular smoothing kernel. Cell area is included in the displayed directional density.

In each angular cell, `W=min(R,G,B)` is the common neutral amount, and the chromatic remainder is `(R−W,G−W,B−W)`. Interior traces are weighted by their channel's residual fraction. The outer sphere draws only W in grayscale; neutral static circle guides and the removed orbit mean do not contribute. The field is calculated before the camera projection. Camera rotation therefore changes the view, not which directions share RGB. The display uses exposure, translucency and slight blur; it is an explicitly chosen visualization, not an independently derived physical emission model.

Controls include interior radius, interior color strength (zero isolates the white shell), white projection strength, the shared full-cycle tail slider, bloom depth, RGB channel switches, sphere grid and selected projection rays. Native selected state, playback phase and plane registration are shared with the other views. The inspector reports the selected residual's direction on the unit shell.

Verification: zero mean for all 450 cycles at three depths, continuous F20 closure, bounded interior points, unit shell directions, exact RGB reconstruction after white extraction, conservation through angular sampling/smoothing (including seam and poles), full sphere cell area, no white with any channel absent, and a positive white contribution for coincident RGB. Browser checks cover channel removal, white-only display, F10/F20 checkpoints, shared selection across views, phone layout and playback.

## Default view, translucent menu and free camera

The main URL now opens Light when no valid view hash is supplied; explicit links to other views still work. The settings drawer has adjustable background opacity (45% by default), with fully opaque text and controls and no backdrop blur, so the model stays visible while editing.

Camera orientation now uses a unit quaternion. Dragging can continue through either pole and around every axis without the former pitch clamp. Rotation updates are normalized, preserving geometry under repeated gestures. Panning has no stage bounds. Zoom spans 0.0001–10,000× (numerical stability limits), replacing the old 0.3–5× range. This is camera framing/zoom, not a change to the native coordinate model.

Desktop controls: drag to orbit, Shift/right/middle drag to pan, Alt-drag to roll, wheel to zoom; Q/E roll, WASD pan, +/− zoom and R resets. The menu includes roll buttons. Touch controls retain one-finger orbit and combine two-finger pan, pinch zoom and twist roll. Gesture angle differences wrap across ±π to avoid jumps.

Checks cover initial framing parity, full rotations through the poles, roll, repeated rotation stability, twist angle wrapping and zoom beyond the former limits. Browser verification confirms default Light, menu background alpha with foreground opacity 1, orbit past a pole, roll/pan/reset and mobile control layout. Multi-touch gesture math is covered by tests; simultaneous finger input is not available in this browser test harness.

## Stage text and live menu preview

The first menu section now contains an opacity slider and a global `hideStageText` flag. The menu defaults to 45% background opacity, removes the previous 20px backdrop blur and uses a lighter shadow so changes to the model can be seen sharply behind the controls. Opacity affects only the menu background.

The global text flag suppresses all shared canvas label calls across the six views, including model/dart labels and axis annotations. It also hides the title/info/inspector panel, scene legend/notes and playback text readouts/checkpoints. The menu, view navigation and icon playback/scrub controls remain accessible. Saved images respect the flag and omit added captions. Both display preferences persist locally and restore on reload.

## Clean startup and header faders

Light now opens with stage text hidden by default and playback running. An explicit saved choice to show text is still respected. The menu remains closed at startup. Header speed and white-light faders sit in a row directly below the view tabs. Both are synchronized bidirectionally with their corresponding menu sliders. Speed retains its 0.1–6 F-steps/second range; white light controls the existing 0–3× shell projection strength. White light is disabled outside the Light view.

Clean-stage framing centers the model and fits it between the measured header and compact playback controls. Header measurements also position the menu and optional stage information below the faders, including after resize or leaving focus mode.


## Light view startup preset

The startup preset now matches the selected reference settings: 5.0 F steps per second, white projection 2.2×, interior radius 85%, interior color 100%, dart tail gradient 27% (newest 54% → oldest 0%), and bloom depth 33%. The Light sphere coordinate grid starts off; RGB channels and selected projection rays stay enabled. The shared Flower tail and bloom controls use the same initial values. Light view, playback running, hidden stage text, 45% menu background opacity, all 450 darts, and unspread starting phases remain the defaults; the menu starts closed.
