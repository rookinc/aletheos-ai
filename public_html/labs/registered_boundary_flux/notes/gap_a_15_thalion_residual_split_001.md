# Gap A 15-thalion residual split 001

Status: gap_a_15_thalion_residual_split_aligned_not_closed

## Boundary

- This is the first residual-aware 15-thalion pass.
- The evaluated features were created in prior residual-blind passes.
- This does not claim Gap A closure.
- A source-derived exact chamber/register map is still missing.
- Zero twisted carrier support is treated as an obstruction neighborhood, not an exact selector.

## Summary

- known_residual_row_ordinals: [3, 16]
- zero_twisted_rows: [3, 4, 9, 15, 16]
- zero_twisted_residual_recall: 1.0
- zero_twisted_false_positive_count: 3
- zt_residual_branch_stable: true
- ti_residual_branch_sensitive: true
- exact_feature_names: []

## Residual rows

- {"branch_sensitive": false, "branch_stable": true, "columns": [9], "cycle_index": 0, "edge": [3, 4], "residual": {"cycle_index": 0, "edge": [3, 4], "expected": 0, "is_selected_zt_edge": true, "path_length": 1, "projected": 1, "raw": 1, "role": "ZT", "selected_zt_edge_for_cycle": [3, 4], "transport_kind": "direct_edge_column"}, "role": "ZT", "row_ordinal": 3, "slot_pairs": [[2, 13]], "twisted_edge_count": 0, "twisted_law_hist": {}, "twisted_local_delta_mod60_hist": {}, "untwisted_edge_count": 60, "zero_twisted_carrier": true}
- {"branch_sensitive": true, "branch_stable": false, "columns": [13, 15], "cycle_index": 2, "edge": [14, 5], "residual": {"cycle_index": 2, "edge": [14, 5], "expected": 1, "is_selected_zt_edge": false, "path_length": 2, "projected": 0, "raw": 0, "role": "TI", "selected_zt_edge_for_cycle": [8, 14], "transport_kind": "bridge_path"}, "role": "TI", "row_ordinal": 16, "slot_pairs": [[4, 10], [5, 6]], "twisted_edge_count": 0, "twisted_law_hist": {}, "twisted_local_delta_mod60_hist": {}, "untwisted_edge_count": 120, "zero_twisted_carrier": true}

## Feature tests

- {"exact": false, "false_positive_count": 3, "false_positives": [4, 9, 15], "miss_count": 0, "misses": [], "name": "zero_twisted_carrier", "precision": 0.4, "recall": 1.0, "residual_hit_count": 2, "residual_hits": [3, 16], "support": [3, 4, 9, 15, 16], "support_count": 5}
- {"exact": false, "false_positive_count": 13, "false_positives": [0, 1, 2, 5, 6, 7, 8, 10, 11, 12, 13, 14, 17], "miss_count": 2, "misses": [3, 16], "name": "nonzero_twisted_carrier", "precision": 0.0, "recall": 0.0, "residual_hit_count": 0, "residual_hits": [], "support": [0, 1, 2, 5, 6, 7, 8, 10, 11, 12, 13, 14, 17], "support_count": 13}
- {"exact": false, "false_positive_count": 2, "false_positives": [9, 15], "miss_count": 1, "misses": [16], "name": "role_ZT", "precision": 0.3333333333333333, "recall": 0.5, "residual_hit_count": 1, "residual_hits": [3], "support": [3, 9, 15], "support_count": 3}
- {"exact": false, "false_positive_count": 2, "false_positives": [4, 10], "miss_count": 1, "misses": [3], "name": "role_TI", "precision": 0.3333333333333333, "recall": 0.5, "residual_hit_count": 1, "residual_hits": [16], "support": [4, 10, 16], "support_count": 3}
- {"exact": false, "false_positive_count": 2, "false_positives": [9, 15], "miss_count": 1, "misses": [16], "name": "zero_twisted_and_role_ZT", "precision": 0.3333333333333333, "recall": 0.5, "residual_hit_count": 1, "residual_hits": [3], "support": [3, 9, 15], "support_count": 3}
- {"exact": false, "false_positive_count": 1, "false_positives": [4], "miss_count": 1, "misses": [3], "name": "zero_twisted_and_role_TI", "precision": 0.5, "recall": 0.5, "residual_hit_count": 1, "residual_hits": [16], "support": [4, 16], "support_count": 2}
- {"exact": false, "false_positive_count": 0, "false_positives": [], "miss_count": 1, "misses": [3], "name": "branch_sensitive_known", "precision": 1.0, "recall": 0.5, "residual_hit_count": 1, "residual_hits": [16], "support": [16], "support_count": 1}
- {"exact": false, "false_positive_count": 16, "false_positives": [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17], "miss_count": 1, "misses": [16], "name": "branch_stable_known", "precision": 0.058823529411764705, "recall": 0.5, "residual_hit_count": 1, "residual_hits": [3], "support": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17], "support_count": 17}
- {"exact": false, "false_positive_count": 0, "false_positives": [], "miss_count": 1, "misses": [3], "name": "zero_twisted_and_branch_sensitive_known", "precision": 1.0, "recall": 0.5, "residual_hit_count": 1, "residual_hits": [16], "support": [16], "support_count": 1}
- {"exact": false, "false_positive_count": 3, "false_positives": [4, 9, 15], "miss_count": 1, "misses": [16], "name": "zero_twisted_and_branch_stable_known", "precision": 0.25, "recall": 0.5, "residual_hit_count": 1, "residual_hits": [3], "support": [3, 4, 9, 15], "support_count": 4}

## Interpretation

- main_result: The known residual rows both land inside the precomputed zero-twisted-carrier obstruction neighborhood.
- not_closure: The zero-twisted-carrier feature is not exact; it catches five rows, not only the two residuals.
- zt_result: The ZT residual is zero-twisted-carrier and branch-stable under the directed P900 diagnostic.
- ti_result: The TI residual is zero-twisted-carrier and branch-sensitive under the directed P900 diagnostic.
- meaning: The 15-thalion ring does not solve Gap A yet, but it supplies source-derived structure that aligns with the lift-refined residual split.
- next_question: Do untwisted-ring, slot-shuffle, and edge-kind-collapse nulls destroy this alignment?

## Checks

- PASS gap_note_loaded: gap_a_lift_refined_partial_closure_theorem_note_recorded
- PASS lift_loaded: gap_a_uniform_15_thalion_row_lift_needs_inspection
- PASS inspection_loaded: uniform_15_thalion_lift_inspected_twisted_absence_feature_found
- PASS residual_count_2: count=2
- PASS residual_matches_present: []
- PASS all_residuals_zero_twisted: [{"branch_sensitive": false, "branch_stable": true, "columns": [9], "cycle_index": 0, "edge": [3, 4], "residual": {"cycle_index": 0, "edge": [3, 4], "expected": 0, "is_selected_zt_edge": true, "path_length": 1, "projected": 1, "raw": 1, "role": "ZT", "selected_zt_edge_for_cycle": [3, 4], "transport_kind": "direct_edge_column"}, "role": "ZT", "row_ordinal": 3, "slot_pairs": [[2, 13]], "twisted_edge_count": 0, "twisted_law_hist": {}, "twisted_local_delta_mod60_hist": {}, "untwisted_edge_count": 60, "zero_twisted_carrier": true}, {"branch_sensitive": true, "branch_stable": false, "columns": [13, 15], "cycle_index": 2, "edge": [14, 5], "residual": {"cycle_index": 2, "edge": [14, 5], "expected": 1, "is_selected_zt_edge": false, "path_length": 2, "projected": 0, "raw": 0, "role": "TI", "selected_zt_edge_for_cycle": [8, 14], "transport_kind": "bridge_path"}, "role": "TI", "row_ordinal": 16, "slot_pairs": [[4, 10], [5, 6]], "twisted_edge_count": 0, "twisted_law_hist": {}, "twisted_local_delta_mod60_hist": {}, "untwisted_edge_count": 120, "zero_twisted_carrier": true}]
- PASS zero_twisted_not_exact: zero twisted carrier has recall 1 but false positives
- PASS zt_residual_branch_stable_if_known: [{"branch_sensitive": false, "branch_stable": true, "columns": [9], "cycle_index": 0, "edge": [3, 4], "residual": {"cycle_index": 0, "edge": [3, 4], "expected": 0, "is_selected_zt_edge": true, "path_length": 1, "projected": 1, "raw": 1, "role": "ZT", "selected_zt_edge_for_cycle": [3, 4], "transport_kind": "direct_edge_column"}, "role": "ZT", "row_ordinal": 3, "slot_pairs": [[2, 13]], "twisted_edge_count": 0, "twisted_law_hist": {}, "twisted_local_delta_mod60_hist": {}, "untwisted_edge_count": 60, "zero_twisted_carrier": true}]
- PASS ti_residual_branch_sensitive_if_known: [{"branch_sensitive": true, "branch_stable": false, "columns": [13, 15], "cycle_index": 2, "edge": [14, 5], "residual": {"cycle_index": 2, "edge": [14, 5], "expected": 1, "is_selected_zt_edge": false, "path_length": 2, "projected": 0, "raw": 0, "role": "TI", "selected_zt_edge_for_cycle": [8, 14], "transport_kind": "bridge_path"}, "role": "TI", "row_ordinal": 16, "slot_pairs": [[4, 10], [5, 6]], "twisted_edge_count": 0, "twisted_law_hist": {}, "twisted_local_delta_mod60_hist": {}, "untwisted_edge_count": 120, "zero_twisted_carrier": true}]

## Next script

    null_gap_a_15_thalion_residual_split_001.py
