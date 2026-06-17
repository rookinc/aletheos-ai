# G900 marker debug HTTP smoke 001

Status: `g900_marker_debug_http_smoke_passed`

Base URL: `http://127.0.0.1:8000/labs/g900_observatory`

This receipt checks that the isolated marker debug page is served by the local web server without touching the live Observatory stage.

## Result

- audit_pass: `True`
- marker id: `unsupported_phase_step_6_9`
- marker edges: `60`
- marker vertices: `120`
- body vertices: `900`
- body edges: `3600`
- channel count: `0`

## Boundary

- isolated debug page only
- no live stage import
- no live stage marker renderer
- no graph marker toggle
- no channel admission
- no body mutation
- no force claim
- no physics claim
