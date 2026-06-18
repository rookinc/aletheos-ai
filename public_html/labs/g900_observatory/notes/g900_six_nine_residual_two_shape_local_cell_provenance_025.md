# g900_six_nine_residual_two_shape_local_cell_provenance_025

Status: `residual_two_shape_local_cell_candidate_recorded`

## Purpose

After 024 showed that the two residual packet-shape families have repeated upstream provenance, this audit tests the bounded local-cell hypothesis suggested by the sketch.

Hypothesis: the residual is one inside=6 hinge cell with two exposed faces: a diagonal/gap face and a chord/endpoint face.

## Result

- audit_pass: `True`
- cell_status: `two_residual_shapes_fit_one_inside6_hinge_cell_candidate`
- local_cell_candidate_found: `True`
- shared_inside6_gate: `True`
- shared_null_limit_start: `True`
- broken_is_diagonal_gap_projection: `True`
- endpoint_is_chord_projection: `True`
- complementary_projection_split: `True`
- cross_artifact_repeated: `True`
- theory_claim: `False`

## Reading

The two residual packet-shape families satisfy the tested local-cell candidate conditions: they share the inside=6 gate and null source-limit start, while splitting into complementary exposed faces. The broken-ladder/phase1/[9,11] family behaves like a diagonal/gap projection. The endpoint-only [6,9] family behaves like a chord projection. This records a candidate local hinge cell, not a native derivation.

Keeper line: The residual is not a leftover. It is a two-faced hinge.

## Family summaries

### broken_ladder_phase1_gap_family

- common: `{'inside': 6, 'limit_start': None, 'has_ladder': True, 'has_phase': True, 'has_gap': True, 'has_endpoints': False, 'ladder': [3, 9, 6, 12], 'phase': 1, 'gap': [9, 11], 'endpoints': None}`
- artifact_kind_counts: `{'009_broader_origin_selector': 1, '003_ladder_schema_microscope': 1, '014_return_span_scout': 1}`

### endpoint_only_family

- common: `{'inside': 6, 'limit_start': None, 'has_ladder': False, 'has_phase': False, 'has_gap': False, 'has_endpoints': True, 'ladder': None, 'phase': None, 'gap': None, 'endpoints': [6, 9]}`
- artifact_kind_counts: `{'009_broader_origin_selector': 1, '014_return_span_scout': 1}`

## Boundary

This is a local-cell candidate audit only. It does not claim an exact selector, native derivation completion, closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification.

Next ascent target: derive the inside6 two-faced hinge cell from source construction.
