# g900_six_nine_inside6_two_faced_hinge_cell_law_026

Status: `inside6_two_faced_hinge_cell_law_candidate_recorded`

## Purpose

After 025 recorded the residual as a two-faced inside6 hinge candidate, this audit tests the internal structural law of that hinge cell.

## Result

- audit_pass: `True`
- law_status: `endpoint_chord_and_broken_ladder_fit_one_inside6_hinge_cell`
- local_hinge_law_candidate_found: `True`
- theory_claim: `False`

## Hinge reading

The endpoint-only face [6,9] is the exposed chord of the broken-ladder face [3,9,6,12]. Inside the broken ladder, the same chord appears in reverse as the central pair 9->6, with outer deltas 6 and 6. The [9,11] source gap starts at the upper chord endpoint 9, and phase 1 is compatible with the one-step interior of that two-slot gap. This records a local hinge-cell law candidate, not full native derivation.

Keeper line: The residual is not a leftover. It is a two-faced hinge.

## Faces

- endpoint face: `{'family': 'endpoint_only_family', 'inside': 6, 'limit_start': None, 'endpoints': [6, 9], 'endpoint_delta': 3, 'endpoint_distance': 3}`
- broken face: `{'family': 'broken_ladder_phase1_gap_family', 'inside': 6, 'limit_start': None, 'ladder': [3, 9, 6, 12], 'phase': 1, 'gap': [9, 11], 'ladder_deltas': [6, 12, 6], 'central_indices': {'index_9': 1, 'index_6': 2}}`

## Tests

- `broken_ladder_central_pair_is_9_to_6`: `True`
- `broken_ladder_deltas_are_6_12_6`: `True`
- `central_pair_reverses_endpoint_chord`: `True`
- `central_reverse_chord_delta_is_12`: `True`
- `chord_nodes_adjacent_in_broken_ladder`: `True`
- `endpoint_chord_contained_in_ladder`: `True`
- `expected_broken_ladder`: `True`
- `expected_endpoint_chord`: `True`
- `expected_gap`: `True`
- `expected_phase1`: `True`
- `exposed_endpoint_chord_delta_is_3`: `True`
- `gap_starts_at_upper_chord_endpoint`: `True`
- `gap_width_is_2`: `True`
- `outer_ladder_deltas_match`: `True`
- `phase1_is_one_step_inside_gap_width`: `True`
- `prior_local_cell_candidate_found`: `True`
- `shared_inside6_gate`: `True`
- `shared_null_limit_start`: `True`

## Boundary

This is a local hinge-cell law candidate only. It does not claim native derivation completion, exact selector closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification.

Next ascent target: derive why source construction produces the broken ladder face [3,9,6,12].
