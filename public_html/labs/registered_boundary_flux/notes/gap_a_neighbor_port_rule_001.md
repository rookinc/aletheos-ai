# Gap A neighbor-port rule 001

Status: gap_a_neighbor_port_rule_candidate_found_not_closure

## Boundary

- This does not close Gap A.
- This is exact only inside the tested zero-twisted-carrier neighborhood.
- The rule uses surrounding-cell port context, but no full chamber/register map is claimed.
- No residual flip rule is accepted.
- The rule must be attacked by nulls before promotion.

## Rule

- name: "neighbor_port_rule_balanced_singleton_ZT_OR_TI_dead_port"
- reading: "balanced singleton ZT port OR multi-column TI return with a dead neighbor port"
- support: [3, 16]
- components: {"TI_dead_neighbor_port": [16], "balanced_singleton_ZT_port": [3]}
- exact_inside_neighborhood: true

## Comparison to previous rule

- old_reading: "branch-sensitive return OR singleton ZT selected-turn"
- old_support: [3, 16]
- new_reading: "balanced singleton ZT port OR multi-column TI return with a dead neighbor port"
- new_support: [3, 16]
- same_support: true

## Port rows

- {"active_pairs_by_slot_radius_1": {"2": [[1, 2], [2, 3]], "13": [[12, 13], [13, 14]]}, "balanced_singleton_radius_1": true, "branch_sensitive": false, "branch_stable": true, "column_count": 1, "columns": [9], "cycle_index": 0, "dead_endpoint_count_radius_1": 0, "is_TI_dead_neighbor_port": false, "is_balanced_singleton_ZT_port": true, "is_known_residual": true, "is_neighbor_port_candidate": true, "pair_degrees_radius_1": [[2, 2]], "role": "ZT", "row_ordinal": 3, "slot_degrees_radius_1": {"2": 2, "13": 2}, "slot_pair_spans": [4], "slot_pairs": [[2, 13]]}
- {"active_pairs_by_slot_radius_1": {"4": [[3, 4], [4, 5], [4, 9]], "10": [[5, 10], [10, 11]]}, "balanced_singleton_radius_1": false, "branch_sensitive": false, "branch_stable": true, "column_count": 1, "columns": [13], "cycle_index": 0, "dead_endpoint_count_radius_1": 0, "is_TI_dead_neighbor_port": false, "is_balanced_singleton_ZT_port": false, "is_known_residual": false, "is_neighbor_port_candidate": false, "pair_degrees_radius_1": [[3, 2]], "role": "TI", "row_ordinal": 4, "slot_degrees_radius_1": {"4": 3, "10": 2}, "slot_pair_spans": [6], "slot_pairs": [[4, 10]]}
- {"active_pairs_by_slot_radius_1": {"2": [[1, 2], [2, 3]], "3": [[2, 3], [3, 4]], "4": [[0, 4], [3, 4], [4, 5]], "13": [[12, 13], [13, 14]], "14": [[5, 14], [13, 14]]}, "balanced_singleton_radius_1": false, "branch_sensitive": false, "branch_stable": true, "column_count": 3, "columns": [9, 11, 14], "cycle_index": 1, "dead_endpoint_count_radius_1": 0, "is_TI_dead_neighbor_port": false, "is_balanced_singleton_ZT_port": false, "is_known_residual": false, "is_neighbor_port_candidate": false, "pair_degrees_radius_1": [[2, 2], [2, 2], [3, 2]], "role": "ZT", "row_ordinal": 9, "slot_degrees_radius_1": {"2": 2, "3": 2, "4": 3, "13": 2, "14": 2}, "slot_pair_spans": [4, 5, 5], "slot_pairs": [[2, 13], [3, 13], [4, 14]]}
- {"active_pairs_by_slot_radius_1": {"6": [[0, 6], [6, 13]], "7": [], "8": [[8, 13], [8, 14]], "14": [[5, 14], [8, 14], [13, 14]]}, "balanced_singleton_radius_1": false, "branch_sensitive": false, "branch_stable": true, "column_count": 2, "columns": [21, 22], "cycle_index": 2, "dead_endpoint_count_radius_1": 1, "is_TI_dead_neighbor_port": false, "is_balanced_singleton_ZT_port": false, "is_known_residual": false, "is_neighbor_port_candidate": false, "pair_degrees_radius_1": [[2, 3], [0, 2]], "role": "ZT", "row_ordinal": 15, "slot_degrees_radius_1": {"6": 2, "7": 0, "8": 2, "14": 3}, "slot_pair_spans": [1, 7], "slot_pairs": [[6, 14], [7, 8]]}
- {"active_pairs_by_slot_radius_1": {"4": [[3, 4], [4, 5], [4, 9]], "5": [[4, 5], [5, 10]], "6": [], "10": [[5, 10], [7, 10], [10, 11]]}, "balanced_singleton_radius_1": false, "branch_sensitive": true, "branch_stable": false, "column_count": 2, "columns": [13, 15], "cycle_index": 2, "dead_endpoint_count_radius_1": 1, "is_TI_dead_neighbor_port": true, "is_balanced_singleton_ZT_port": false, "is_known_residual": true, "is_neighbor_port_candidate": true, "pair_degrees_radius_1": [[3, 3], [2, 0]], "role": "TI", "row_ordinal": 16, "slot_degrees_radius_1": {"4": 3, "5": 2, "6": 0, "10": 3}, "slot_pair_spans": [1, 6], "slot_pairs": [[4, 10], [5, 6]]}

## Feature tests

- {"exact": false, "false_positives": [], "misses": [16], "name": "balanced_singleton_ZT_port", "precision": 1.0, "recall": 0.5, "residual_hits": [3], "support": [3], "support_count": 1}
- {"exact": false, "false_positives": [], "misses": [3], "name": "TI_dead_neighbor_port", "precision": 1.0, "recall": 0.5, "residual_hits": [16], "support": [16], "support_count": 1}
- {"exact": true, "false_positives": [], "misses": [], "name": "neighbor_port_rule_balanced_singleton_ZT_OR_TI_dead_port", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}
- {"exact": true, "false_positives": [], "misses": [], "name": "old_rule_branch_sensitive_return_OR_singleton_ZT", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}

## Interpretation

- main_result: The exact split can be rewritten as a neighbor-port condition inside the zero-twisted neighborhood.
- zt_read: Row 3 is the only balanced singleton ZT port: both endpoints are served symmetrically by radius-1 twisted neighbor context.
- ti_read: Row 16 is the only multi-column TI row with a dead neighbor port in radius-1 twisted context.
- surrounding_cell_read: Surrounding cells appear to supply the boundary-port information needed to distinguish true residual rows from stable zero-twisted false positives.
- not_closure: This remains a local split candidate, not a full source-derived chamber/register map.

## Checks

- PASS context_loaded: gap_a_surrounding_cell_context_probe_recorded
- PASS split_loaded: gap_a_zero_twisted_neighborhood_split_candidate_found_not_closure
- PASS interim_loaded: gap_a_zero_twisted_split_interim_note_recorded
- PASS zero_rows_expected: [3, 4, 9, 15, 16]
- PASS port_rows_5: 5
- PASS balanced_singleton_zt_selects_3: [3]
- PASS ti_dead_neighbor_port_selects_16: [16]
- PASS neighbor_port_rule_exact: [3, 16]

## Next script

    null_gap_a_neighbor_port_rule_001.py
