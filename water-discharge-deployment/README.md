# Water discharge observatory 001

A self-contained, mobile-responsive observatory for Thalean discharge construction 002, at `public_html/observatories/water/discharge/index.html`. Adds a dedicated view alongside the existing Water v32 and B32K pages. Committing it does not publish it to Bluehost.

- G60: registered preparation profile on the native fixed layout.
- Paired G900: projected surface amplitude and surface-tension energy.
- Native G9000: full or hidden field on the B32K torus chart; all 9,000 states and 45,000 native edges.
- Native-only (g=0) / coupled-release (g=1) runs, 201 computed snapshots from t=0 to 40, step/scrub/play, camera rotation and zoom, vertex inspector.
- Conserved energy ledger, comparison chart, CSV export and numerical audit download.
- Starts paused; stops at the endpoint and when the document becomes hidden. No external assets, trackers, requests or runtime dependencies. Requires a modern browser with `DecompressionStream('gzip')`.

## Model and provenance

This is a dimensionless linear graph-wave construction, not calibrated molecular water. Unit inertia and the positive rank-one transfer coupling are imposed. Each run starts from the same prepared profile, separately normalized to total energy one. The coupling is not switched during playback. Native-only hidden energy remains at roundoff; coupled hidden energy reaches 0.9790647885933741 at t=40. The transfer is reversible, not permanent radiation. Native F's period 20, the prior controller's period 18, and continuous simulation time remain distinct.

Data come from `Thalean_Discharge_Construction_002` (the previously audited construction). The 201 full states were recomputed with the same sparse matrix-exponential operator; every energy term was compared with the original ledger to <1e-11. All 18,000 position/velocity coordinates participate in propagation. The browser ships displacement q, projected h and hidden chi; it does not integrate a new approximate dynamics. Signed display amplitudes use gzip-compressed little-endian int16, with recorded error bounds. Fixed visual scales are shared across the two runs for each displayed field. Full-precision energy data are separate and never reconstructed from quantized display values.

G60 layout and G900 anchors come from the registered Motiph engine. G900's 15-per-anchor local offsets are display positions, not a graph quotient to a preferred G60 vertex. Native G9000 F was compared exactly with B32K's registered F at commit `ee6d2baff9fd97c80cd68cad95c5957e8719e673`; the same torus coordinate formula is used. Geometry is fixed and does not affect operators or imply a droplet shape. Native fixture hash and numerical checks are embedded under `water-data.audit`.

Thalean Graph: S. A. Cave. UFT4: J. Kiseleczuk.

## Edit and test

Edit `observatory.template.html`, then run from the repository root:

```bash
python3 water-discharge-deployment/build.py
python3 water-discharge-deployment/tests/model-package.py
python3 water-discharge-deployment/tests/deploy-package.py
```

The builder preserves the canonical dataset embedded in the current release; an optional JSON argument can replace it deliberately. Numerical package checks validate the shipped topology, quotient, all compressed array sizes, quantization bounds, sampled projection identities, energy partition, control and endpoint. Deployment checks use local SSH/SCP stand-ins and do not connect to a server.

Browser validation: loaded in Chrome; endpoint/control comparison, all layers, hidden/full selection, playback, reset, step, keyboard slider and 390px responsive layout checked. No production publication is implied by local preview.

## Deploy from the existing Termux checkout after review/merge

```bash
cd ~/dev/cori/website/aletheos.ai || exit 1
git pull --ff-only origin main || exit 1
WATER_DISCHARGE_SSH_TARGET=gurtiamy bash water-discharge-deployment/deploy.sh
```

Requires the existing `~/www/observatories/water` directory. Publishes only `~/www/observatories/water/discharge/index.html`, with a verified checksum, atomic installation and private rollback copy when replacing an existing discharge page. Existing `water/index.html` and B32K are preserved. Live delivery is separate: fetch `https://aletheos.ai/observatories/water/discharge/` and compare its SHA-256 with `release.sha256` after installation.
