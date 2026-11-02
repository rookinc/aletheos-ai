# Source and deployment reconnaissance — 2026-10-21

## Confirmed deployment chain

- Live: https://dev.rook.ca/aletheos/ — HTTP 200, 142,837-byte HTML.
- Title: Thalean Lab · Atomic Helix v2.0 · Explore & Research.
- Live `release.json`: source `thalean_atomic_helix_v2_0/thalean_atomic_helix.html`.
  Its stale `prepared_not_uploaded` field is informational, not current deployment proof.
- HTML SHA-256: `ae3cc5bc9f9952a55b40f8db482f00283a812fd161776ad25dcfbd51efefd0bf`.
- Release: https://github.com/rookinc/aletheos-ai/releases/tag/dev-thalean-atom-v2.0
- Release asset: `thalean_dev_rook_ca_deploy_v2_0.zip`; SHA-256
  `6e5d5c62bf56d4c974574db25abc80d1745f0aed00f4f06fa6a4540cb580cb8b`.
- Retrieved Library package matches the GitHub asset digest; its webroot HTML
  matches live HTML byte-for-byte. Thus repository selection is evidence-based.
- Git base: `7ed670d60596d011404f217ef1d3ddb858541066`, main.
  Recent changes publish/style the static PAN kiosk; the simulator itself was
  previously release-asset-only. No applicable AGENTS.md was present.
- Work branch: `work/aletheos-sim-001`; added directory `apps/aletheos-simulator`.
  Existing repository labs and deployment files are untouched.

## Existing architecture and functional inventory

Standalone HTML with inline CSS, embedded JSON fixture/manifest and independent
JavaScript closures. Canvas 2D draws projected graph and assembly scenes. No build,
CDN or backend is required by this application. HTTPS supports its Web Crypto
receipts. Static hosting is on dev.rook.ca; prior deployment records name
`~/www/dev.rook.ca/aletheos/`, but that path was not authenticated in this session.
The archived installer requires an explicit verified document root and refuses
replacement. No DNS, identity, server configuration or production service was changed.

Explore mode: H/He/O selection, source sphere, camera rotation/zoom, play/step/reset,
route scrubbing and speed. Research additionally exposes graph [60,6]/[60,4], cube/
sphere layouts, V4 actions, helical lift, paired strands, atomic site and connection
registries, molecular candidate assemblies, assembly encounters, sampled history,
branching, synchronized comparison, convergence and local content-hashed receipts.
Illustrations consistently disclaim atomic trajectories, forces and bond admission.
The prior G900 adapter was explicitly disconnected.

Live Cloud Browser reconnaissance exercised Research and inspected its controls.
Baseline screenshot is supplied separately where available. New UI screenshots
are blocked by the execution environment and are not fabricated.

`rookinc/aletheos` contains the B32K witness apparatus, not this deployed HTML.
RookOS is a separate organizational operating surface; its APIs are not needed.
`rookinc/aletheos-ai` hosts the CoRI research web labs and the verified deployment
release. This change follows its static web approach without replacing its stack.

## Mathematical provenance

All 49 file hash entries across the four recovered archive manifests pass
(duplicates across bundles are counted separately). ZIP SHA-256 values:

- graviton_native_evidence.zip: `6dad04188a742adc5585fe8422f4ca73322d5ce3c804f7defc243f17f893c980`
- gra003_coboundary_sources.zip: `44fa77bfb2b753bbc36a2807bff793078e22ac6a21c94d2abf039d531b55b283`
- gra003b_upstream.zip: `ba3af1bcd73e7a40f068bd57a4d275e7d3337b2c59b63eacd9121a47c225010f`
- The_Graviton_on_Graph_HOG52002_Verified_Evidence_Overleaf.zip: `63c58f8d10cfcc6b2215fe0f2a6fe1932e98cb6b7bdb9b599aa455478e860545`

Every one of the eight vendored research files matches its Git blob at Project 41
revision `e1bf21ca3ab700f69432852436f092442f8b46bd`, checked against the full Git tree.
See `pinned-source-verification.json`. The cited DOI
https://doi.org/10.5281/zenodo.23535267 could not be retrieved by the web tool;
no claim of independently verifying the DOI landing record is made.

The generator executes the unmodified hash-pinned Audit 040 AST with an observation
hook after each construction. It suppresses writing the archived certificate,
exports exact permutations and maps, and compares every reproduced row and check
with the immutable certificate. It does not hand-transcribe permutation tables.

Live display IDs differ from the native bundle. A NetworkX graph-isomorphism
witness is explicitly recorded and checked on all edges before borrowing display
coordinates. This is a derived display registration, not an intrinsic geometric
embedding or a physical correspondence. The legacy workspace is not silently
relabelled. Native state and encounter root labels are kept distinct.
