# XYZ Flower · Thalean Observatory v0.3

Public route: https://aletheos.ai/observatories/xyz-flower/
Catalog: https://aletheos.ai/observatories/

Run `bash xyz-flower-deployment/deploy.sh` from this extracted release on
Termux, using the existing `gurtiamy` SSH alias. It installs only the flower,
its exact mathematical evidence JSON, and the catalog entry. Existing
observatories remain untouched. The flower opens in XYZ mode; other views
remain available. No ChatGPT sign-in or external runtime is required.

The installer checks SHA-256, performs PHP lint on Bluehost before writes,
backs up modified files outside the webroot, and rolls back installation
errors. It refuses an unexpectedly edited catalog or destination. Public
HTML/evidence hashes and the catalog link are verified after upload.

Source: `source/`; build with Python 3 (standard library only), test with
`node source/verify.cjs` from this directory. Native F and Fourier tests are
preserved. Source data provenance is in transport.json and pilot-data.json.
The public evidence JSON includes exact rational matrices and source G60.

Three planes carry 150 distinct routes each. All 450 native routes retain
20-step returns. This is a display embedding, not a new graph equivalence.
