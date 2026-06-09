# Constructor Lab

Browser-side D4 / Thalean constructor viewer.

## Run locally

From the site root, run:

    ./run.sh

Then open:

    http://127.0.0.1:8000/labs/constructor/lab.html

## Runtime model

This lab is intended to run client-side in the browser.

Active files:

- lab.html — main interface
- lab.css — styling
- lab_boot.js — boot/controller logic
- kernel/*.js — browser-side rendering and D4 constructor engine

No Python, FastAPI, PHP API shim, or server-side graph endpoint is required for the active constructor view.

## Pending port

Witness mode was originally backed by a server endpoint in d4lab. It is currently disabled with a browser-side fallback until the witness-state builder is ported into JavaScript.

## Current status

See `STATUS.md` for the current boundary.

Short form:

    Constructor is now a legacy D4/tetra renderer plus P900 external scaffold viewer.
    Its P900 mode currently uses Phase 17 / Phase 20 external artifacts.
    It does not yet render the Phase 30 connected body-plus-surface candidates.
    Witness/admission logic now belongs in the Relational Witness Lab.

