# G900 marker edge index audit 001

Status: `g900_marker_edge_index_audit_passed`

This audit checks the isolated debug renderer contract:

`tuple_edge_N` means `body.edges[N]`.

## Result

- audit_pass: `True`
- marker id: `unsupported_phase_step_6_9`
- marker edges: `60`
- marker vertices: `120`
- body vertices: `900`
- body edges: `3600`
- derived endpoint references: `120`
- derived endpoint set size: `120`
- channel count: `0`

## Interpretation

Every marker edge id parses to a body edge index, every referenced body edge exists, every endpoint exists in the G900 body vertex set, and the derived endpoint set matches the marker registry vertex set.

## Boundary

- audit only
- debug renderer contract only
- existing body edges only
- no live stage change
- no UI change
- no channel admission
- no body mutation
- no force claim
- no physics claim
