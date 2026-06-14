# Gap A zero-twisted neighborhood split 001

Status: gap_a_zero_twisted_neighborhood_split_candidate_found_not_closure

## Boundary

- This does not close Gap A.
- This is exact only inside the tested zero-twisted neighborhood feature family.
- No full source-derived chamber/register map is claimed.
- No residual flip rule is accepted.
- The preferred candidate must be attacked by nulls before being promoted.

## Neighborhood

- zero_twisted_neighborhood: [3, 4, 9, 15, 16]
- known_residual_rows: [3, 16]
- false_positive_rows: [4, 9, 15]

## Preferred candidate

- name: "branch_sensitive_return_candidate OR singleton_ZT_selected_turn_candidate"
- support: [3, 16]
- exact: true
- precision: 1.0
- recall: 1.0
- reading: "branch-sensitive return OR singleton ZT selected-turn"

## Zero detail

- {"branch_sensitive": false, "branch_stable": true, "column_count": 1, "columns": [9], "cycle_index": 0, "role": "ZT", "row_ordinal": 3, "slot_pair_count": 1, "slot_pairs": [[2, 13]], "twisted_edge_count": 0, "untwisted_edge_count": 60}
- {"branch_sensitive": false, "branch_stable": true, "column_count": 1, "columns": [13], "cycle_index": 0, "role": "TI", "row_ordinal": 4, "slot_pair_count": 1, "slot_pairs": [[4, 10]], "twisted_edge_count": 0, "untwisted_edge_count": 60}
- {"branch_sensitive": false, "branch_stable": true, "column_count": 3, "columns": [9, 11, 14], "cycle_index": 1, "role": "ZT", "row_ordinal": 9, "slot_pair_count": 3, "slot_pairs": [[2, 13], [3, 13], [4, 14]], "twisted_edge_count": 0, "untwisted_edge_count": 180}
- {"branch_sensitive": false, "branch_stable": true, "column_count": 2, "columns": [21, 22], "cycle_index": 2, "role": "ZT", "row_ordinal": 15, "slot_pair_count": 2, "slot_pairs": [[6, 14], [7, 8]], "twisted_edge_count": 0, "untwisted_edge_count": 120}
- {"branch_sensitive": true, "branch_stable": false, "column_count": 2, "columns": [13, 15], "cycle_index": 2, "role": "TI", "row_ordinal": 16, "slot_pair_count": 2, "slot_pairs": [[4, 10], [5, 6]], "twisted_edge_count": 0, "untwisted_edge_count": 120}

## False positive explanations

- {"branch_sensitive": false, "branch_stable": true, "candidate_explanation": "branch-stable singleton TI, not branch-sensitive return", "column_count": 1, "columns": [13], "cycle_index": 0, "role": "TI", "row_ordinal": 4}
- {"branch_sensitive": false, "branch_stable": true, "candidate_explanation": "branch-stable multi-column ZT, not singleton selected-turn", "column_count": 3, "columns": [9, 11, 14], "cycle_index": 1, "role": "ZT", "row_ordinal": 9}
- {"branch_sensitive": false, "branch_stable": true, "candidate_explanation": "branch-stable multi-column ZT, not singleton selected-turn", "column_count": 2, "columns": [21, 22], "cycle_index": 2, "role": "ZT", "row_ordinal": 15}

## Feature tests

- {"exact": false, "false_positives": [], "misses": [3], "name": "branch_sensitive_return_candidate", "precision": 1.0, "recall": 0.5, "residual_hits": [16], "support": [16], "support_count": 1}
- {"exact": false, "false_positives": [4, 9, 15], "misses": [16], "name": "branch_stable_candidate", "precision": 0.25, "recall": 0.5, "residual_hits": [3], "support": [3, 4, 9, 15], "support_count": 4}
- {"exact": true, "false_positives": [], "misses": [], "name": "candidate_core_branch_sensitive_or_singleton_ZT", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}
- {"exact": false, "false_positives": [4], "misses": [16], "name": "column_count_1", "precision": 0.5, "recall": 0.5, "residual_hits": [3], "support": [3, 4], "support_count": 2}
- {"exact": false, "false_positives": [15], "misses": [3], "name": "column_count_2", "precision": 0.5, "recall": 0.5, "residual_hits": [16], "support": [15, 16], "support_count": 2}
- {"exact": false, "false_positives": [9], "misses": [3, 16], "name": "column_count_3", "precision": 0.0, "recall": 0.0, "residual_hits": [], "support": [9], "support_count": 1}
- {"exact": false, "false_positives": [], "misses": [3], "name": "multi_column_TI_candidate", "precision": 1.0, "recall": 0.5, "residual_hits": [16], "support": [16], "support_count": 1}
- {"exact": false, "false_positives": [9, 15], "misses": [3, 16], "name": "multi_column_ZT_candidate", "precision": 0.0, "recall": 0.0, "residual_hits": [], "support": [9, 15], "support_count": 2}
- {"exact": false, "false_positives": [4], "misses": [3], "name": "role_TI", "precision": 0.5, "recall": 0.5, "residual_hits": [16], "support": [4, 16], "support_count": 2}
- {"exact": false, "false_positives": [9, 15], "misses": [16], "name": "role_ZT", "precision": 0.3333333333333333, "recall": 0.5, "residual_hits": [3], "support": [3, 9, 15], "support_count": 3}
- {"exact": false, "false_positives": [4], "misses": [3, 16], "name": "singleton_TI_candidate", "precision": 0.0, "recall": 0.0, "residual_hits": [], "support": [4], "support_count": 1}
- {"exact": false, "false_positives": [], "misses": [16], "name": "singleton_ZT_selected_turn_candidate", "precision": 1.0, "recall": 0.5, "residual_hits": [3], "support": [3], "support_count": 1}
- {"exact": false, "false_positives": [15], "misses": [3], "name": "untwisted_edge_count_120", "precision": 0.5, "recall": 0.5, "residual_hits": [16], "support": [15, 16], "support_count": 2}
- {"exact": false, "false_positives": [9], "misses": [3, 16], "name": "untwisted_edge_count_180", "precision": 0.0, "recall": 0.0, "residual_hits": [], "support": [9], "support_count": 1}
- {"exact": false, "false_positives": [4], "misses": [16], "name": "untwisted_edge_count_60", "precision": 0.5, "recall": 0.5, "residual_hits": [3], "support": [3, 4], "support_count": 2}
- {"exact": false, "false_positives": [4, 9, 15], "misses": [], "name": "zero_twisted_neighborhood", "precision": 0.4, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 4, 9, 15, 16], "support_count": 5}

## Pairwise exact examples

- {"exact": true, "false_positives": [], "misses": [], "name": "branch_sensitive_return_candidate OR candidate_core_branch_sensitive_or_singleton_ZT", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}
- {"exact": true, "false_positives": [], "misses": [], "name": "branch_sensitive_return_candidate OR singleton_ZT_selected_turn_candidate", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}
- {"exact": true, "false_positives": [], "misses": [], "name": "candidate_core_branch_sensitive_or_singleton_ZT OR candidate_core_branch_sensitive_or_singleton_ZT", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}
- {"exact": true, "false_positives": [], "misses": [], "name": "candidate_core_branch_sensitive_or_singleton_ZT OR multi_column_TI_candidate", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}
- {"exact": true, "false_positives": [], "misses": [], "name": "candidate_core_branch_sensitive_or_singleton_ZT OR singleton_ZT_selected_turn_candidate", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}
- {"exact": true, "false_positives": [], "misses": [], "name": "multi_column_TI_candidate OR singleton_ZT_selected_turn_candidate", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}

## Interpretation

- main_result: The five-row zero-twisted-carrier neighborhood admits an exact tested split by a simple candidate rule.
- candidate_rule: branch-sensitive return OR singleton ZT selected-turn.
- residual_rows: The rule selects rows 3 and 16, matching the known residual rows inside the tested neighborhood.
- false_positive_read: Row 4 is branch-stable singleton TI; rows 9 and 15 are branch-stable multi-column ZT rows.
- not_closure: This is not Gap A closure; it is an exact split candidate inside a restricted, already-load-bearing obstruction neighborhood.

## Checks

- PASS interim_loaded: gap_a_15_thalion_interim_theorem_note_recorded
- PASS split_loaded: gap_a_15_thalion_residual_split_aligned_not_closed
- PASS nulls_loaded: gap_a_15_thalion_residual_split_nulls_recorded
- PASS inspection_loaded: uniform_15_thalion_lift_inspected_twisted_absence_feature_found
- PASS zero_neighborhood_count_5: [3, 4, 9, 15, 16]
- PASS residuals_subset_zero: [3, 16]
- PASS preferred_candidate_exact: {"exact": true, "false_positives": [], "misses": [], "name": "branch_sensitive_return_candidate OR singleton_ZT_selected_turn_candidate", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}
- PASS preferred_candidate_not_claimed_as_closure: candidate is exact only inside tested zero-neighborhood feature family

## Next script

    null_gap_a_zero_twisted_split_candidate_001.py
