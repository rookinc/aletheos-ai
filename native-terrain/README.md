# Aletheos — Native Thalean Graph Observatory

Native Terrain v3.0 · CoRI, a Rook Services Inc. initiative.

This is the SIM-002 replacement application source. It is a buildless, static ES-module application: serve this directory through HTTP(S). Do not open index.html through file://. No package installation, API key, cloud service, or application server is required in production. Python/NetworkX are verification-time dependencies only.

## Reproduce

Use Node 22+ and Python 3 with NetworkX 3.7. From this directory:

```
python tools/recover.py
python tools/recover-derived.py
npm test
npm run verify
python tools/build.py
```

`recover.py` uses the pinned repository payloads at specification commit 18542c1a0a759b99a99478b17f5212dc5b84a434. Run at this implementation checkout; it does not fetch or guess adjacency. `recover-derived.py` binds checked-in Project 41 input bytes, verifies the bundle dependency hash, exact edge and automorphism-set equality, the explicit covering, and L(Petersen) isomorphism. `verify.mjs` performs the independent JavaScript check without the renderer. `build.py` produces a static allowlist and SHA-256 manifest, rejecting legacy simulator files by construction.

## Data contracts

All vertex indices in data are integers 0…n−1. Display labels are index+1. There is no canonical root. Edges are unordered pairs of distinct indices; each appears exactly once. The loader rejects loops, duplicates, malformed endpoints, and unsupported schemas; it constructs symmetric adjacency. Coordinates are separately named display layouts and never define edges.

- `aletheos.graph.v1`: id, vertices, edges, source, layout.
- `aletheos.symmetry.v1`: graph hash, independently derived generators, exhaustive elements, method and version.
- `aletheos.quotient.v1`: domain, codomain, explicit vertices/edges/map, deck permutation, optional deck generators and fiber size, pinned source metadata.
- `aletheos.receipt.v1`: input hash, algorithm, calculated invariants, witnesses, and independent agreement. Browser receipts additionally include explicit cover receipts.
- `aletheos.claim-index.v1`: stable instrument claim IDs, evidence status, view, manuscript boundary, and unimplemented carriers. Links use `?claim=SIM002-G60-001#terrain`.

Graph and symmetry data are shared by the renderer and verification kernel. Independent NetworkX enumeration supplies all self-isomorphisms, while JavaScript checks generators and computes closure; their exact sets agree. Project 41's full cached permutation set also agrees exactly. These checks certify finite combinatorics, without a physical interpretation.

## Source recovery and limits

See data/source-inventory.json and RELEASE.md. Project 41 is available through the connected GitHub account; direct cloning of that private repository was unavailable. Its three admitted source artifacts are copied byte-for-byte with pinned hashes. Native deck a and b are imported and checked; generators g1…g4 are deterministic choices from independent enumeration, not claimed historical generator names.

G30 and G15 fibers and quotient adjacency are inspectable over the G60 viewport. This release does not yet offer standalone rendered quotient carriers. Ordinary shortest paths are not admitted histories or transport. G1800, G9000, and HOG52002 are not loaded. The companion manuscript could not be recovered, and gauge-module exactness remains unresolved. These limits are visible in the interface.

Production output contains only the new observatory, with no links or scripts reaching the retired simulator. Legacy public_html is retained in Git as research input and rollback history, and is excluded from the production artifact. Remote replacement is held until all acceptance gates pass and a complete remote rollback copy is verified.
