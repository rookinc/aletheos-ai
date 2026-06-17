# G900 marker debug audit-gate HTTP smoke 001

Status: `g900_marker_debug_audit_gate_http_smoke_passed`

Base URL: `http://127.0.0.1:8000/labs/g900_observatory`

This receipt checks that the isolated marker debug page is served by the local web server after being gated on the marker edge-index audit.

## Result

- audit_pass: `True`
- marker id: `unsupported_phase_step_6_9`
- marker edges: `60`
- marker vertices: `120`
- edge index audit: `True`
- index range: `2180-2434`
- audit failures: `0`
- body vertices: `900`
- body edges: `3600`
- channel count: `0`

## Boundary

- isolated debug page only
- audit-gated debug view only
- no live stage import
- no live stage marker renderer
- no graph marker toggle
- no channel admission
- no body mutation
- no force claim
- no physics claim
