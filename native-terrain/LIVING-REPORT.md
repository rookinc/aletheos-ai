# ALETHEOS-SIM-003 implementation and evaluation report

**Status, 2026-10-26:** the Living Geometry application executes locally and has
been exercised in cloud Chrome. Native finite actions, harmonic projections,
and a reproducible memory-backaction experiment are implemented. The intended
`dev.rook.ca/aletheos/living.html` deployment is **pending**, because this
executor lacks authenticated host access. Real Android-device testing is also
pending. This is an evaluation candidate, not a declaration that every release
acceptance criterion is complete.

## Implementation

| Module | Responsibility and classification |
| --- | --- |
| `kernel.mjs` and existing data | Preserved native G60 loader, exact topology/symmetry/cover checks, existing observatory |
| `living-geometry.mjs` | Native G60 and unique-triangle successor; derived Cartesian diagonal-V4 quotient, fibers, adjacency, exchange-fixed locus |
| `data/living-registered.json`, `tools/build-living-registered.py` | Source-defined native registered G1800, K, Delta, and common-coordinate five-frame representation |
| `living-harmonics.mjs` | Native registered F/S/K/Delta actions; derived complex Fourier projectors, recombination, channel energies, exhaustive return receipt |
| `living-kernel.mjs` | Experimental graph-local memory field, stable-softmax feedback, deterministic A/B stepping, metrics, replay, reverse, reset, import/export |
| `living-renderer.mjs` | Perspective 3D display coordinates projected into Canvas 2D, cached carriers, batched lines, progressive density, picking, camera/touch controls |
| `living-app.mjs`, `living.html`, `living.css` | Four operating modes, independent simulation/render scheduling, controls, source-hash binding, diagnostics, timeline, file exchange, responsive panels |
| `deployment/` | Verified static packaging; additive release staging, atomic new-entry activation, guarded rollback, served-byte checks |

The old `index.html`, `app.mjs`, `style.css`, `kernel.mjs`, and established data
remain intact. The new entry is `living.html`. No dependency on a remote CDN,
cloud model, or application backend was added.

## Native and derived construction

The admitted G60 fixture provides 60 vertices, 120 undirected edges, degree
four, and 40 triangles. Existing independent evidence retains the 480-element
automorphism set. V4 deck permutations come from the pinned Project 41 inputs,
not a procedural replacement graph. Source display coordinates are reused
and explicitly treated as drawing coordinates.

The native successor takes `(u,v)` to `(v,w)`, where `w` is the unique common
neighbor of the endpoints. It permutes 240 directed edges into 80 cycles of
length three. The Waltz's six positions advance alongside this action; a
complete digit-to-operation semantics is not asserted.

The G900 graph is constructed explicitly as the **Cartesian-product graph**
`G60 × G60` modulo simultaneous diagonal V4 action. Its 3,600 ordered pairs
form 900 free four-element orbits; quotient adjacency has degree eight and
3,600 undirected edges. Factor exchange has 60 fixed quotient states. This
construction is identified precisely rather than silently equated with any
unbound historical G900 viewer candidate.

The supplied GRA004 Overleaf archive was recovered. Its Audit 040 script and
receipt are preserved byte-for-byte under `evidence/living/`; their SHA-256
hashes are pinned in `tools/build-living-registered.py` and the generated
carrier metadata. One reproducible native ordered axis registration `(a,b)`
is used. The registered carrier is the Cartesian product modulo diagonal `b`,
with 1,800 states, degree eight, and 7,200 edges. The recovered source operation
is `K([(u,v)]) = [(ab(v),b(u))]`; its square equals `Delta`, with 450 free
four-cycles. Its two-to-one projection is checked against the live G900
ordering. The five-frame action is `F(f,x)=(f+1,Kx)`, giving 9,000 states and
450 twenty-cycles. Exhaustive code checks establish `F^5=K`, `F^10=Delta`, and
`F^20=I` for this loaded representation. They do not select an intrinsic axis
or establish a physical spacetime interpretation.

The Fourier implementation evaluates all five complex projectors, retains
complex values, and recombines their outputs. It reports the real sector
sizes `1800 + 3600 + 3600`. The UI offers individual channels, common mode,
conjugate pairs, and recombination. Native frame harmonic energies are kept
separate from the optional experimental history spectrum, which groups history
by the display convention `q mod 5`; that latter diagnostic is not a native
frame-harmonic identification.

Targeted searches did not recover the separately named Bridge 001–008
artifacts. No missing certificates were invented. A certified perfect-defect
interface remains unavailable; its displayed seam is a labeled candidate
visualization. Existing manuscript/evidence limitations are retained where
they apply, without blocking execution of explicitly experimental dynamics.

## Experimental rule and measurements

A and B share geometry, initial quotient root, walker edge, parameters, and a
counter-based random sample keyed by seed and encounter number. At each step,
only admitted quotient neighbors are eligible. History is the sum of the most
recent `D` arrival events weighted by `lambda^age`. Scores are
`alpha * (h(u) - h(v))`; subtracting the maximum before exponentiation gives a
stable softmax. Sorted neighbor order and the shared sample determine the
selected transition. A always uses `alpha=0`; B uses `strength * gain` only
when memory coupling is enabled. This changes actual subsequent quotient
states; it does not merely brighten a trail.

Both runs retain diagnostic histories. Native walker and registered actions
advance separately and remain unchanged by experimental feedback. Their
finite returns therefore do not reset encounter history or require the
experimental paths to close. Trace persistence and displayed deformation
never alter transition eligibility or native adjacency.

The default UI comparison was exercised for **120 encounters**, with seed
`41`, initial quotient index `0`, directed edge `0`, B strength `2`, retention
`0.96`, gain `1`, and history depth `256`:

| Measurement | Observed result |
| --- | --- |
| First differing post-step state | Encounter 3 |
| Differing post-step states | 118 of 120 encounters |
| Visit-density difference | 0.975 in the UI, rounded |
| Zero-coupling replay | 0 differing states; A/B trajectories coincide |
| Admissible transitions | Tested against quotient adjacency |

Visit-density difference is half the L1 distance between normalized visit
histograms, including the initial state. Instantaneous state divergence is a
binary inequality, while path divergence counts unequal post-step states.
The diagnostics also expose encounter count, occupied-state counts, local
visit fractions, memory magnitude, field divergence, and experimental return
errors. These are finite simulation measurements, not gravitational claims.

## Verification and acceptance

Automated validation includes **29 JavaScript tests** across the preserved
kernel and new geometry, harmonics, memory, replay, and input-validation
coverage, plus **6 Python deployment tests**. The existing independent native
verification command also passed. The deployment tests exercise
staging without activation, repeat staging, first-entry rollback, byte-exact
previous-entry restoration, tamper rejection, and refusal to overwrite later
entry changes. Shell syntax and Python compilation were checked. Test counts
refer to this implementation revision; final release packaging must use the
intended committed source and retain its actual results.

Cloud Chrome verification used a local HTTP preview. It is browser execution
of this candidate, not verification of the remote target. Recorded checks:

| Acceptance item | Status and evidence |
| --- | --- |
| Native G60 source and coupled geometry load | Passed locally; source hash checks and browser viewport |
| G900 inspection and fixed locus | Implemented; quotient/fiber invariants tested |
| Three-beat directed-edge motion | Implemented and tested; visible continuous motion |
| Six-position Waltz | Implemented; experimental register shown independently of edge indices |
| Pause, step, reverse, restart | Exercised locally; reverse from tick 20 to 19 and forward to 20 restored state |
| Five harmonic components and recombination | Implemented and tested; common excitation gave energy 1 in k=0 and approximately zero elsewhere |
| Twenty-step registered return | Exhaustive finite test and browser F20 return; browser S5 return also checked |
| History independent of finite returns | Tested; native walker/clock return leaves retained encounter history |
| Memory off and measurable backaction | A/B120 experiment above; zero-coupling replay coincides |
| Repeatable results and state export | Deterministic tests; browser snapshot export/import round-trip at tick 20 |
| Existing observatory remains functional | Existing entry loaded in browser; its source files preserved |
| Narrow layout | Chrome 390×844 layout and screenshot inspected; stacked A/B and accessible control panels |
| Physical Android usability/performance | **Pending:** no physical Android-device run |
| Cross-browser and sustained performance | **Pending:** no Safari/Firefox or long-device benchmark claimed |
| Development deployment accessible with new simulator | **Blocked:** authenticated host access absent; existing v3.0 entry is reachable |
| Remote served-byte and deployed-browser verification | **Pending deployment** |

The renderer uses a perspective projection drawn with Canvas 2D, not GPU
instancing. It caches topology/layout work, batches edge drawing, and reduces
visible detail for large carriers. Simulation stepping is separate from
`requestAnimationFrame`; browser suspension pauses playback rather than
attempting an unbounded catch-up. These design choices were exercised locally;
no unmeasured Android frame-rate guarantee is made. Runs are capped at 10,000
encounters; reverse/import reconstruct state from logs and can cost more time
on long runs. Browser reload persistence requires explicit JSON export/import.

## Delivery and remaining gate

Source is prepared on a dedicated SIM-003 feature branch with the SIM-002
commit retained as the rollback base. `tools/build.py` emits the static packet,
manifest, ZIP, and SHA-256 sidecar, recording the actual source commit/branch
and dirty state. Packaging never claims deployment or test success.

`deployment/stage-living.sh` stages an isolated immutable release. With
`--activate`, it backs up and atomically changes only `/aletheos/living.html`,
leaving the original application intact. `verify-served.py` checks every
served byte; `install-living.py rollback` restores the prior entry with hash
guards. The exact procedure is in `deployment/LIVING-DEPLOYMENT.md`.

A supplementary private review-site deployment is being prepared; its URL
and final deployment result must be appended after the host confirms success.
It does not substitute for the requested dev.rook.ca deployment.

No dev.rook.ca remote staging, rollback copy, activation, or deployed-browser
validation was performed by this implementation. The remaining release gate is to run
the prepared procedure from the authenticated host environment, verify the
served files and both applications, and exercise the new entry on a physical
Android browser. The candidate is ready for that evaluation; full acceptance
remains open until those checks succeed.
