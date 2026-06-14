# Gap A residual rule search 001

Status: no_bounded_residual_rule_found_keep_residuals_open

Gap: A - chamber/register map.

## Boundary

- This is not a chamber/register map proof.
- This pass must not accept a rule selected by mismatch identity alone.
- Allowed rules are small structural predicates: selected ZT, role, transport kind, path length, or cycle index.
- Forbidden rules are recorded separately when they use residual/mismatch/output-value information.

## Summary

- base_distance_after_W_seam: 2
- allowed_exact_rules: []
- disallowed_exact_rules: ["flip_residual_rows", "flip_ZT_raw1_or_TI_raw0"]
- best_allowed_distance: 1
- best_allowed_rules: ["flip_selected_ZT_direct_edges"]
- candidate_count: 19

## Candidate results

- identity: allowed=True distance=2 improvement=0 matches=False flipped_count=0 basis=baseline
- flip_selected_ZT_edges: allowed=True distance=3 improvement=-1 matches=False flipped_count=3 basis=selected ZT edge set from target
- flip_selected_ZT_direct_edges: allowed=True distance=1 improvement=1 matches=False flipped_count=1 basis=selected ZT plus direct visibility
- flip_selected_ZT_bridge_paths: allowed=True distance=4 improvement=-2 matches=False flipped_count=2 basis=selected ZT plus bridge-path visibility
- flip_ZT_role: allowed=True distance=3 improvement=-1 matches=False flipped_count=3 basis=role name ZT
- flip_TI_role: allowed=True distance=3 improvement=-1 matches=False flipped_count=3 basis=role name TI
- flip_ZT_or_TI_roles: allowed=True distance=4 improvement=-2 matches=False flipped_count=6 basis=interior-turn role neighborhood
- flip_direct_edge_column_rows: allowed=True distance=8 improvement=-6 matches=False flipped_count=8 basis=transport kind direct
- flip_bridge_path_rows: allowed=True distance=10 improvement=-8 matches=False flipped_count=10 basis=transport kind bridge path
- flip_path_length_1: allowed=True distance=8 improvement=-6 matches=False flipped_count=8 basis=path length 1
- flip_path_length_2: allowed=True distance=8 improvement=-6 matches=False flipped_count=8 basis=path length 2
- flip_path_length_3: allowed=True distance=4 improvement=-2 matches=False flipped_count=2 basis=path length 3
- flip_cycle_0: allowed=True distance=6 improvement=-4 matches=False flipped_count=6 basis=cycle index 0
- flip_cycle_1: allowed=True distance=8 improvement=-6 matches=False flipped_count=6 basis=cycle index 1
- flip_cycle_2: allowed=True distance=6 improvement=-4 matches=False flipped_count=6 basis=cycle index 2
- flip_raw_0_rows: allowed=False distance=9 improvement=-7 matches=False flipped_count=9 basis=post-hoc output value class
- flip_raw_1_rows: allowed=False distance=9 improvement=-7 matches=False flipped_count=9 basis=post-hoc output value class
- flip_residual_rows: allowed=False distance=0 improvement=2 matches=True flipped_count=2 basis=forbidden mismatch-selected rule
- flip_ZT_raw1_or_TI_raw0: allowed=False distance=0 improvement=2 matches=True flipped_count=2 basis=forbidden role/output-targeted residual descriptor

## Interpretation

- main_result: The residual rows were tested against bounded structural predicates without accepting mismatch-selected rules.
- if_no_allowed_exact: If no allowed exact rule appears, the honest result is that the two residuals remain open.
- what_this_gives: The search prevents an overfit closure of Gap A.
- what_remains_open: A future rule must come from a stronger source-side orientation, selected-turn, or register-geometry derivation.
- next_question: Should the current Gap A result be frozen as a bounded partial theorem with two residual rows?

## Checks

- PASS row_projection_loaded: status=boundary_seam_projection_role_rows_partial_not_map_proof
- PASS residuals_loaded: status=row_level_seam_projection_residuals_localized_not_map_proof
- PASS target_loaded: status=normalized_target_not_proof
- PASS row_count_18: count=18
- PASS base_distance_2: base_distance=2
- PASS candidate_count_ge_15: count=19
- PASS records_forbidden_exact_rule: disallowed_exact=["flip_residual_rows", "flip_ZT_raw1_or_TI_raw0"]

## Next script

    record_gap_a_partial_closure_theorem_note_001.py
