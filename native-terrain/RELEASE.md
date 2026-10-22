# ALETHEOS-SIM-002 — Native Terrain v3.0 release candidate

Disposition: verified native core; **release held, no live cutover**.

Specification baseline: `18542c1a0a759b99a99478b17f5212dc5b84a434`.
Implementation branch: `feature/aletheos-sim-002-native-terrain`.

## Implemented and independently verified

- Exact pinned G60 adjacency; 60 vertices, 120 edges, degree 4, connected, diameter 6, 40 enumerated triangles. All roots have shells [1,4,8,16,24,6,1].
- Exhaustive NetworkX self-isomorphism enumeration: 480. JavaScript generator closure and Project 41 native permutation cache agree on the exact element set. Vertex orbit size 60; stabilizer order 8.
- Native deck a/b imported from Project 41. Explicit G60→G30/a and G60→G15/V4 maps pass edge-image equality, local neighbor bijection, and regular deck-orbit checks. G15 is independently isomorphic to L(Petersen).
- Responsive G60 canvas explorer; rotation/pan/zoom, keyboard vertex controls, neighbors, shortest paths, shells, triangle witnesses, permutations/orders/composition, fixed points/orbits/stabilizers, quotient fibers and adjacency, provenance, executable and exportable receipts.
- Deterministic static production allowlist, content manifest and reproducible verification commands. No production external scripts, API, or legacy physics simulator.

## Acceptance gates

| Gate | Status | Evidence / missing requirement |
| --- | --- | --- |
| Mathematical | PASS | Python and JavaScript calculations agree; exact Project 41 source cross-checks |
| Interaction | PASS | Browser paths, shells, native a action, quotient fibers, verification; all-pair path tests |
| Provenance | PASS | Pinned source revisions, byte hashes, input copies, receipts and source inventory |
| Manuscript | BLOCKED | DOI HTTP request returned 404; exact title/DOI searches returned no result; paper text, revision and theorem identifiers unavailable. Instrument claim index explicitly unbound |
| Interpretation | PASS | Production application is graph-intrinsic; physical models absent |
| Browser | PARTIAL | Desktop Chromium and 390×844 iframe responsive layout/control checks passed; no horizontal body overflow (375px content width). No real Android touch, Safari, or Firefox check performed |
| Deployment | BLOCKED | SSH alias gurtiamy cannot resolve; no remote backup, staging or cutover performed |

Tests include all 3,600 shortest paths, all 60 distance-shell profiles, exact group closure, corrupted graph/map/deck rejection, standard SHA-256 vectors and fixture bytes. Browser initially exposed an HTTP-only WebCrypto issue; a tested FIPS 180-4 SHA-256 fallback fixed it. No blocking application error remained in inspected browser flows. Observed extension metadata errors belong to the browser extension, not the observatory.

## Remaining research and engineering

Recover the manuscript and versioned theorem correspondence; retain gauge-module exactness as unresolved until independently calculated. Bind admitted histories, orientation cocycles and obstruction witnesses before implementing transport. Verify construction chains before loading G1800/G9000/HOG52002. Standalone quotient rendering remains future work. Complete real mobile/browser checks. Recover authenticated deployment access and identify the exact Atomic Helix v2.0 build source.

The live HTTP page was fetched read-only and identifies itself as “Thalean Lab · Atomic Helix v2.0 · Explore & Research.” That title was not found in the pinned application checkout. The remote deployment source remains unresolved. No old directory was altered; no rollback archive is falsely claimed. The deployment packet can stage and verify a build and preserve the existing directory once SSH access is available; it cannot authorize cutover while gates remain open.
