# Gap A role-column source geometry nulls 001

Status: gap_a_role_column_source_geometry_nulls_recorded

## Boundary

- This does not close Gap A.
- The result is local to the tested zero-twisted-carrier neighborhood.
- Nulls test role-only, column-shape-only, complement pairing, role rotation, shape rotation, role swap, and shape swap.
- No full chamber/register map is claimed.
- No physical interpretation is claimed.

## Summary

- baseline_support: [3, 16]
- baseline_exact: true
- broken_residual_null_count: 9
- residual_null_count: 9
- complement_support: [4, 9, 15]
- complement_selects_false_positives: true
- load_bearing: {"complement_selects_false_positives": true, "pairing_orientation_load_bearing": true, "role_only_insufficient": true, "role_placement_load_bearing": true, "role_swap_breaks_residual_exactness": true, "shape_only_insufficient": true, "shape_placement_load_bearing": true, "shape_swap_breaks_residual_exactness": true}

## Row classes

- {"column_shape": "singleton", "role": "ZT", "role_column_class": "singleton_ZT", "row_ordinal": 3, "target": "residual"}
- {"column_shape": "singleton", "role": "TI", "role_column_class": "singleton_TI", "row_ordinal": 4, "target": "stable_false_positive"}
- {"column_shape": "multi_column", "role": "ZT", "role_column_class": "multi_column_ZT", "row_ordinal": 9, "target": "stable_false_positive"}
- {"column_shape": "multi_column", "role": "ZT", "role_column_class": "multi_column_ZT", "row_ordinal": 15, "target": "stable_false_positive"}
- {"column_shape": "multi_column", "role": "TI", "role_column_class": "multi_column_TI", "row_ordinal": 16, "target": "residual"}

## Tests against residuals

- {"exact": true, "false_positives": [], "misses": [], "name": "baseline_singleton_ZT_OR_multi_column_TI", "precision": 1.0, "recall": 1.0, "support": [3, 16], "support_count": 2, "target_hits": [3, 16]}
- {"exact": false, "false_positives": [9, 15], "misses": [16], "name": "null_role_only_ZT", "precision": 0.3333333333333333, "recall": 0.5, "support": [3, 9, 15], "support_count": 3, "target_hits": [3]}
- {"exact": false, "false_positives": [4], "misses": [3], "name": "null_role_only_TI", "precision": 0.5, "recall": 0.5, "support": [4, 16], "support_count": 2, "target_hits": [16]}
- {"exact": false, "false_positives": [4], "misses": [16], "name": "null_shape_only_singleton", "precision": 0.5, "recall": 0.5, "support": [3, 4], "support_count": 2, "target_hits": [3]}
- {"exact": false, "false_positives": [9, 15], "misses": [3], "name": "null_shape_only_multi_column", "precision": 0.3333333333333333, "recall": 0.5, "support": [9, 15, 16], "support_count": 3, "target_hits": [16]}
- {"exact": false, "false_positives": [4, 9, 15], "misses": [3, 16], "name": "null_complement_pairing_singleton_TI_OR_multi_column_ZT", "precision": 0.0, "recall": 0.0, "support": [4, 9, 15], "support_count": 3, "target_hits": []}
- {"exact": false, "false_positives": [4, 15], "misses": [3, 16], "name": "null_rotated_roles_keep_shapes", "precision": 0.0, "recall": 0.0, "support": [4, 15], "support_count": 2, "target_hits": []}
- {"exact": false, "false_positives": [4], "misses": [16], "name": "null_rotated_shapes_keep_roles", "precision": 0.5, "recall": 0.5, "support": [3, 4], "support_count": 2, "target_hits": [3]}
- {"exact": false, "false_positives": [4, 9, 15], "misses": [3, 16], "name": "null_swapped_roles_keep_shapes", "precision": 0.0, "recall": 0.0, "support": [4, 9, 15], "support_count": 3, "target_hits": []}
- {"exact": false, "false_positives": [4, 9, 15], "misses": [3, 16], "name": "null_swapped_shapes_keep_roles", "precision": 0.0, "recall": 0.0, "support": [4, 9, 15], "support_count": 3, "target_hits": []}

## Tests against stable false positives

- {"exact": true, "false_positives": [], "misses": [], "name": "complement_pairing_selects_stable_false_positives", "precision": 1.0, "recall": 1.0, "support": [4, 9, 15], "support_count": 3, "target_hits": [4, 9, 15]}
- {"exact": false, "false_positives": [3, 16], "misses": [4, 9, 15], "name": "baseline_pairing_against_stable_false_positives", "precision": 0.0, "recall": 0.0, "support": [3, 16], "support_count": 2, "target_hits": []}

## Load-bearing

- role_only_insufficient: true
- shape_only_insufficient: true
- pairing_orientation_load_bearing: true
- role_placement_load_bearing: true
- shape_placement_load_bearing: true
- role_swap_breaks_residual_exactness: true
- shape_swap_breaks_residual_exactness: true
- complement_selects_false_positives: true

## Interpretation

- main_result: All tested residual nulls break exactness while the complement pairing exactly selects the stable false positives.
- role_result: Role alone is insufficient.
- shape_result: Column shape alone is insufficient.
- pairing_result: The orientation of the role-column pairing is load-bearing: singleton ZT plus multi-column TI selects residuals, while singleton TI plus multi-column ZT selects stable false positives.
- not_closure: This supports a sharper source-geometry split but still does not close Gap A.

## Checks

- PASS geometry_loaded: gap_a_role_column_source_geometry_candidate_found_not_closure
- PASS mixed_note_loaded: gap_a_neighbor_port_mixed_note_recorded
- PASS zero_split_loaded: gap_a_zero_twisted_neighborhood_split_candidate_found_not_closure
- PASS zero_rows_expected: [3, 4, 9, 15, 16]
- PASS residual_rows_expected: [3, 16]
- PASS baseline_exact: {"exact": true, "false_positives": [], "misses": [], "name": "baseline_singleton_ZT_OR_multi_column_TI", "precision": 1.0, "recall": 1.0, "support": [3, 16], "support_count": 2, "target_hits": [3, 16]}
- PASS role_only_insufficient: [{"exact": false, "false_positives": [9, 15], "misses": [16], "name": "null_role_only_ZT", "precision": 0.3333333333333333, "recall": 0.5, "support": [3, 9, 15], "support_count": 3, "target_hits": [3]}, {"exact": false, "false_positives": [4], "misses": [3], "name": "null_role_only_TI", "precision": 0.5, "recall": 0.5, "support": [4, 16], "support_count": 2, "target_hits": [16]}]
- PASS shape_only_insufficient: [{"exact": false, "false_positives": [4], "misses": [16], "name": "null_shape_only_singleton", "precision": 0.5, "recall": 0.5, "support": [3, 4], "support_count": 2, "target_hits": [3]}, {"exact": false, "false_positives": [9, 15], "misses": [3], "name": "null_shape_only_multi_column", "precision": 0.3333333333333333, "recall": 0.5, "support": [9, 15, 16], "support_count": 3, "target_hits": [16]}]
- PASS complement_not_residual_exact: {"exact": false, "false_positives": [4, 9, 15], "misses": [3, 16], "name": "null_complement_pairing_singleton_TI_OR_multi_column_ZT", "precision": 0.0, "recall": 0.0, "support": [4, 9, 15], "support_count": 3, "target_hits": []}
- PASS role_rotation_breaks_exact: {"exact": false, "false_positives": [4, 15], "misses": [3, 16], "name": "null_rotated_roles_keep_shapes", "precision": 0.0, "recall": 0.0, "support": [4, 15], "support_count": 2, "target_hits": []}
- PASS shape_rotation_breaks_exact: {"exact": false, "false_positives": [4], "misses": [16], "name": "null_rotated_shapes_keep_roles", "precision": 0.5, "recall": 0.5, "support": [3, 4], "support_count": 2, "target_hits": [3]}
- PASS role_swap_breaks_exact: {"exact": false, "false_positives": [4, 9, 15], "misses": [3, 16], "name": "null_swapped_roles_keep_shapes", "precision": 0.0, "recall": 0.0, "support": [4, 9, 15], "support_count": 3, "target_hits": []}
- PASS shape_swap_breaks_exact: {"exact": false, "false_positives": [4, 9, 15], "misses": [3, 16], "name": "null_swapped_shapes_keep_roles", "precision": 0.0, "recall": 0.0, "support": [4, 9, 15], "support_count": 3, "target_hits": []}
- PASS complement_selects_false_positives: {"exact": true, "false_positives": [], "misses": [], "name": "complement_pairing_selects_stable_false_positives", "precision": 1.0, "recall": 1.0, "support": [4, 9, 15], "support_count": 3, "target_hits": [4, 9, 15]}

## Next script

    record_gap_a_role_column_interim_note_001.py
