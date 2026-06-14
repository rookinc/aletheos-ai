# Gap A role-column source geometry 001

Status: gap_a_role_column_source_geometry_candidate_found_not_closure

## Boundary

- This does not close Gap A.
- This is exact only inside the tested zero-twisted-carrier neighborhood.
- This is a source-geometry candidate, not a full chamber/register map.
- No residual flip rule is accepted.
- No physical interpretation is claimed.
- The rule must be attacked by source-geometry nulls before promotion.

## Preferred candidate

- name: "source_geometry_singleton_ZT_OR_multi_column_TI"
- reading: "inside zero-twisted carrier, residual support is singleton ZT OR multi-column TI"
- support: [3, 16]
- precision: 1.0
- recall: 1.0
- exact_inside_neighborhood: true

## Complement candidate

- name: "source_geometry_singleton_TI_OR_multi_column_ZT"
- reading: "inside zero-twisted carrier, stable false-positive support is singleton TI OR multi-column ZT"
- support: [4, 9, 15]
- precision_against_false_positives: 1.0
- recall_against_false_positives: 1.0
- exact_against_false_positives: true

## Class summary

### multi_column_TI

- rows: [16]
- count: 1
- residual_rows: [16]
- false_positive_rows: []
- roles: ["TI"]
- column_counts: [2]
- slot_pair_spans: [[1, 6]]
- branch_sensitive_rows: [16]
- branch_stable_rows: []

### multi_column_ZT

- rows: [9, 15]
- count: 2
- residual_rows: []
- false_positive_rows: [9, 15]
- roles: ["ZT"]
- column_counts: [2, 3]
- slot_pair_spans: [[4, 5, 5], [1, 7]]
- branch_sensitive_rows: []
- branch_stable_rows: [9, 15]

### singleton_TI

- rows: [4]
- count: 1
- residual_rows: []
- false_positive_rows: [4]
- roles: ["TI"]
- column_counts: [1]
- slot_pair_spans: [[6]]
- branch_sensitive_rows: []
- branch_stable_rows: [4]

### singleton_ZT

- rows: [3]
- count: 1
- residual_rows: [3]
- false_positive_rows: []
- roles: ["ZT"]
- column_counts: [1]
- slot_pair_spans: [[4]]
- branch_sensitive_rows: []
- branch_stable_rows: [3]

## Source rows

- {"balanced_singleton_radius_1": true, "branch_sensitive": false, "branch_stable": true, "column_count": 1, "column_shape": "singleton", "columns": [9], "cycle_index": 0, "dead_endpoint_count_radius_1": 0, "is_false_positive_before_split": false, "is_known_residual": true, "pair_degrees_radius_1": [[2, 2]], "role": "ZT", "role_column_class": "singleton_ZT", "row_ordinal": 3, "slot_pair_spans": [4], "slot_pairs": [[2, 13]]}
- {"balanced_singleton_radius_1": false, "branch_sensitive": false, "branch_stable": true, "column_count": 1, "column_shape": "singleton", "columns": [13], "cycle_index": 0, "dead_endpoint_count_radius_1": 0, "is_false_positive_before_split": true, "is_known_residual": false, "pair_degrees_radius_1": [[3, 2]], "role": "TI", "role_column_class": "singleton_TI", "row_ordinal": 4, "slot_pair_spans": [6], "slot_pairs": [[4, 10]]}
- {"balanced_singleton_radius_1": false, "branch_sensitive": false, "branch_stable": true, "column_count": 3, "column_shape": "multi_column", "columns": [9, 11, 14], "cycle_index": 1, "dead_endpoint_count_radius_1": 0, "is_false_positive_before_split": true, "is_known_residual": false, "pair_degrees_radius_1": [[2, 2], [2, 2], [3, 2]], "role": "ZT", "role_column_class": "multi_column_ZT", "row_ordinal": 9, "slot_pair_spans": [4, 5, 5], "slot_pairs": [[2, 13], [3, 13], [4, 14]]}
- {"balanced_singleton_radius_1": false, "branch_sensitive": false, "branch_stable": true, "column_count": 2, "column_shape": "multi_column", "columns": [21, 22], "cycle_index": 2, "dead_endpoint_count_radius_1": 1, "is_false_positive_before_split": true, "is_known_residual": false, "pair_degrees_radius_1": [[2, 3], [0, 2]], "role": "ZT", "role_column_class": "multi_column_ZT", "row_ordinal": 15, "slot_pair_spans": [1, 7], "slot_pairs": [[6, 14], [7, 8]]}
- {"balanced_singleton_radius_1": false, "branch_sensitive": true, "branch_stable": false, "column_count": 2, "column_shape": "multi_column", "columns": [13, 15], "cycle_index": 2, "dead_endpoint_count_radius_1": 1, "is_false_positive_before_split": false, "is_known_residual": true, "pair_degrees_radius_1": [[3, 3], [2, 0]], "role": "TI", "role_column_class": "multi_column_TI", "row_ordinal": 16, "slot_pair_spans": [1, 6], "slot_pairs": [[4, 10], [5, 6]]}

## Feature tests

- {"exact": false, "false_positives": [9, 15], "misses": [3], "name": "column_shape_multi_column", "precision": 0.3333333333333333, "recall": 0.5, "residual_hits": [16], "support": [9, 15, 16], "support_count": 3}
- {"exact": false, "false_positives": [4], "misses": [16], "name": "column_shape_singleton", "precision": 0.5, "recall": 0.5, "residual_hits": [3], "support": [3, 4], "support_count": 2}
- {"exact": false, "false_positives": [4], "misses": [3], "name": "role_TI", "precision": 0.5, "recall": 0.5, "residual_hits": [16], "support": [4, 16], "support_count": 2}
- {"exact": false, "false_positives": [9, 15], "misses": [16], "name": "role_ZT", "precision": 0.3333333333333333, "recall": 0.5, "residual_hits": [3], "support": [3, 9, 15], "support_count": 3}
- {"exact": false, "false_positives": [], "misses": [3], "name": "role_column_class_multi_column_TI", "precision": 1.0, "recall": 0.5, "residual_hits": [16], "support": [16], "support_count": 1}
- {"exact": false, "false_positives": [9, 15], "misses": [3, 16], "name": "role_column_class_multi_column_ZT", "precision": 0.0, "recall": 0.0, "residual_hits": [], "support": [9, 15], "support_count": 2}
- {"exact": false, "false_positives": [4], "misses": [3, 16], "name": "role_column_class_singleton_TI", "precision": 0.0, "recall": 0.0, "residual_hits": [], "support": [4], "support_count": 1}
- {"exact": false, "false_positives": [], "misses": [16], "name": "role_column_class_singleton_ZT", "precision": 1.0, "recall": 0.5, "residual_hits": [3], "support": [3], "support_count": 1}
- {"exact": true, "false_positives": [], "misses": [], "name": "source_geometry_branch_sensitive_OR_singleton_ZT", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}
- {"exact": true, "false_positives": [], "misses": [], "name": "source_geometry_neighbor_port_rule", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}
- {"exact": false, "false_positives": [4, 9, 15], "misses": [3, 16], "name": "source_geometry_singleton_TI_OR_multi_column_ZT", "precision": 0.0, "recall": 0.0, "residual_hits": [], "support": [4, 9, 15], "support_count": 3}
- {"exact": true, "false_positives": [], "misses": [], "name": "source_geometry_singleton_ZT_OR_multi_column_TI", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}

## Interpretation

- main_result: Inside the zero-twisted-carrier neighborhood, the residual split is exactly singleton ZT OR multi-column TI.
- complement_result: The stable false positives are exactly the complementary role-column pattern: singleton TI OR multi-column ZT.
- source_geometry_read: The obstruction is not merely neighbor-port balance; it appears to split by how role and column multiplicity interact inside the zero-twisted carrier.
- not_closure: This remains local to the zero-twisted neighborhood and does not supply the full chamber/register map.

## Checks

- PASS mixed_note_loaded: gap_a_neighbor_port_mixed_note_recorded
- PASS neighbor_rule_loaded: gap_a_neighbor_port_rule_candidate_found_not_closure
- PASS neighbor_nulls_mixed: gap_a_neighbor_port_rule_nulls_mixed_not_promoted
- PASS zero_split_loaded: gap_a_zero_twisted_neighborhood_split_candidate_found_not_closure
- PASS context_loaded: gap_a_surrounding_cell_context_probe_recorded
- PASS zero_rows_expected: [3, 4, 9, 15, 16]
- PASS preferred_exact: {"exact": true, "false_positives": [], "misses": [], "name": "source_geometry_singleton_ZT_OR_multi_column_TI", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}
- PASS complement_selects_false_positives: {"exact": true, "false_positives": [], "misses": [], "name": "complement_singleton_TI_OR_multi_column_ZT_selects_false_positives", "precision": 1.0, "recall": 1.0, "residual_hits": [4, 9, 15], "support": [4, 9, 15], "support_count": 3}
- PASS gap_a_not_closed: this is local to zero-twisted neighborhood

## Next script

    null_gap_a_role_column_source_geometry_001.py
