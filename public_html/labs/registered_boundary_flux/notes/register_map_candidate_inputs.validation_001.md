# Register map candidate inputs validation 001

Status: passed

Purpose: validate Gap A candidate inputs before any register-map proof attempt.

## Boundary

- This validation does not prove the register map.
- This validation does not run selector recovery.
- This validation checks readiness and internal consistency only.
- This validator treats row_taxonomy as a class partition, not as a literal 15-row list.
- This validator reconstructs the target role pattern from top-lock tamper rows because the top-lock probe stores the aggregate signature rather than the raw target pattern.

## Summary

- check_count: 22
- passed_count: 22
- failed_error_count: 0
- failed_warning_count: 0
- matrix_M_shape: {"rows": 15, "cols": 30}
- taxonomy_row_union: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
- target_cycles: [[0, 1, 2, 3, 4, 5], [0, 1, 2, 7, 10, 5], [0, 1, 2, 8, 14, 5]]
- target_zt_edges: [[3, 4], [7, 10], [8, 14]]
- target_pattern: [1, 1, 1, 0, 1, 1]
- reconstructed_target_patterns: {"(0, 1, 2, 3, 4, 5)": [1, 1, 1, 0, 1, 1], "(0, 1, 2, 7, 10, 5)": [1, 1, 1, 0, 1, 1], "(0, 1, 2, 8, 14, 5)": [1, 1, 1, 0, 1, 1]}

## Checks

- PASS bundle_status_ready: bundle status is ready_for_candidate_input_validation
- PASS no_required_missing: required_missing=[]
- PASS no_required_bad: required_bad=[]
- PASS all_required_records_loaded: loaded_required_count=11/11
- PASS target_status_normalized: target status is normalized_target_not_proof
- PASS target_cycle_count_three: target cycle count=3
- PASS target_zt_edge_count_three: target ZT edge count=3
- PASS target_role_pattern_exact: target pattern=[1, 1, 1, 0, 1, 1]
- PASS matrix_M_shape_15x30: matrix_M shape={"rows": 15, "cols": 30}
- PASS row_taxonomy_rows_partition_0_to_14: taxonomy row union=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
- PASS row_taxonomy_has_9_classes: taxonomy class count=9
- PASS fhe_anatomy_contains_target_cycles: all target cycles found in fhe_anatomy=True
- PASS fhe_anatomy_contains_zt_edges: all target ZT edges found in fhe_anatomy=True
- PASS top_lock_probe_contains_apre_signature: apre_signature={"edge_sign_sum": 5, "even_only_slot_count": 0, "even_triangle_touch_count": 1, "odd_slot_count": 6, "odd_triangle_touch_count": 5, "residue_bit": 1}
- PASS top_lock_tamper_rows_reconstruct_target_pattern: reconstructed_patterns={"(0, 1, 2, 3, 4, 5)": [1, 1, 1, 0, 1, 1], "(0, 1, 2, 7, 10, 5)": [1, 1, 1, 0, 1, 1], "(0, 1, 2, 8, 14, 5)": [1, 1, 1, 0, 1, 1]}
- PASS zero_edge_census_contains_selected_zt_edges: selected ZT edges found in zero-edge census=True
- PASS row_aware_artifact_mentions_row_features: row-aware feature names found
- PASS exact_selector_minimizer_mentions_exact_selector_terms: exact selector terms found
- PASS register_keypair_artifact_loaded_as_candidate_evidence: register keypair artifact loaded=True
- PASS candidate_test_declared_A0_public_predicate_only: candidate id present=True
- PASS candidate_test_declared_A1_row_aware_M_incidence: candidate id present=True
- PASS candidate_test_declared_A2_row_shuffled_M_null: candidate id present=True

## Next script if passed

    run_register_map_candidate_recovery_001.py
