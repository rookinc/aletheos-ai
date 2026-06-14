# Gap A zero-twisted split candidate nulls 001

Status: gap_a_zero_twisted_split_candidate_nulls_recorded

## Boundary

- This does not close Gap A.
- The baseline split is still restricted to the tested zero-twisted neighborhood.
- No full source-derived chamber/register map is claimed.
- These nulls test whether the split depends on branch sensitivity, singleton ZT selected-turn structure, role specificity, and placement.
- The candidate may be promoted only to interim support, not proof.

## Baseline components

- branch_sensitive_rows: [16]
- singleton_ZT_selected_turn_rows: [3]
- baseline_support: [3, 16]

## Null tests

- {"exact": true, "false_positives": [], "misses": [], "name": "baseline_branch_sensitive_return_OR_singleton_ZT_selected_turn", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}
- {"exact": false, "false_positives": [4], "misses": [], "name": "null_branch_blind_TI_OR_singleton_ZT", "precision": 0.6666666666666666, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 4, 16], "support_count": 3}
- {"exact": false, "false_positives": [9, 15], "misses": [], "name": "null_selected_turn_blind_branch_sensitive_OR_all_ZT", "precision": 0.5, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 9, 15, 16], "support_count": 4}
- {"exact": false, "false_positives": [4], "misses": [], "name": "null_role_blind_branch_sensitive_OR_all_singletons", "precision": 0.6666666666666666, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 4, 16], "support_count": 3}
- {"exact": false, "false_positives": [4, 15], "misses": [], "name": "null_column_count_only_1_or_2", "precision": 0.5, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 4, 15, 16], "support_count": 4}
- {"exact": false, "false_positives": [], "misses": [16], "name": "null_branch_shuffle_OR_singleton_ZT", "precision": 1.0, "recall": 0.5, "residual_hits": [3], "support": [3], "support_count": 1}
- {"exact": false, "false_positives": [4], "misses": [3], "name": "null_role_shuffle_branch_sensitive_OR_rotated_singleton_ZT", "precision": 0.5, "recall": 0.5, "residual_hits": [16], "support": [4, 16], "support_count": 2}

## Load-bearing

- branch_sensitivity_load_bearing: true
- singleton_ZT_selected_turn_load_bearing: true
- role_specificity_load_bearing: true
- column_count_alone_insufficient: true
- branch_placement_load_bearing: true
- role_placement_load_bearing: true

## Interpretation

- main_result: Every tested null breaks the exact split candidate.
- branch_result: Replacing branch-sensitive return with all TI rows introduces row 4 as a false positive.
- selected_turn_result: Replacing singleton ZT selected-turn with all ZT rows introduces rows 9 and 15 as false positives.
- placement_result: Branch and role shuffles break the exact support.
- not_closure: The result supports the candidate inside the zero-twisted neighborhood but does not close Gap A.

## Checks

- PASS split_candidate_loaded: gap_a_zero_twisted_neighborhood_split_candidate_found_not_closure
- PASS residual_nulls_loaded: gap_a_15_thalion_residual_split_nulls_recorded
- PASS interim_loaded: gap_a_15_thalion_interim_theorem_note_recorded
- PASS baseline_exact: {"exact": true, "false_positives": [], "misses": [], "name": "baseline_branch_sensitive_return_OR_singleton_ZT_selected_turn", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}
- PASS branch_blind_breaks_exact: {"exact": false, "false_positives": [4], "misses": [], "precision": 0.6666666666666666, "recall": 1.0, "support": [3, 4, 16]}
- PASS selected_turn_blind_breaks_exact: {"exact": false, "false_positives": [9, 15], "misses": [], "precision": 0.5, "recall": 1.0, "support": [3, 9, 15, 16]}
- PASS role_blind_breaks_exact: {"exact": false, "false_positives": [4], "misses": [], "precision": 0.6666666666666666, "recall": 1.0, "support": [3, 4, 16]}
- PASS column_count_only_breaks_exact: {"exact": false, "false_positives": [4, 15], "misses": [], "precision": 0.5, "recall": 1.0, "support": [3, 4, 15, 16]}
- PASS branch_shuffle_breaks_exact: {"exact": false, "false_positives": [], "misses": [16], "precision": 1.0, "recall": 0.5, "support": [3]}
- PASS role_shuffle_breaks_exact: {"exact": false, "false_positives": [4], "misses": [3], "precision": 0.5, "recall": 0.5, "support": [4, 16]}

## Next script

    record_gap_a_zero_twisted_split_interim_note_001.py
