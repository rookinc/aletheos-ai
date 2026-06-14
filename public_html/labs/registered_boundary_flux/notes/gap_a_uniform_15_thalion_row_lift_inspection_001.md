# Gap A uniform 15-thalion row lift inspection 001

Status: uniform_15_thalion_lift_inspected_twisted_absence_feature_found

## Boundary

- This does not use residual or mismatch labels.
- This does not claim Gap A closure.
- This treats twisted carrier absence as a candidate source-derived feature.
- Residual evaluation remains deferred to the next pass.

## Summary

- row_count: 18
- zero_twisted_carrier_row_count: 5
- nonzero_twisted_carrier_row_count: 13
- role_counts: {"IW": 3, "TI": 3, "WX": 3, "XY": 3, "YZ": 3, "ZT": 3}
- zero_role_counts: {"TI": 2, "ZT": 3}
- nonzero_role_counts: {"IW": 3, "TI": 1, "WX": 3, "XY": 3, "YZ": 3}
- cycle_counts: {"0": 6, "1": 6, "2": 6}
- zero_cycle_counts: {"0": 2, "1": 1, "2": 2}

## Role table

- {"nonzero_twisted_carrier": 3, "role": "IW", "total": 3, "zero_twisted_carrier": 0}
- {"nonzero_twisted_carrier": 1, "role": "TI", "total": 3, "zero_twisted_carrier": 2}
- {"nonzero_twisted_carrier": 3, "role": "WX", "total": 3, "zero_twisted_carrier": 0}
- {"nonzero_twisted_carrier": 3, "role": "XY", "total": 3, "zero_twisted_carrier": 0}
- {"nonzero_twisted_carrier": 3, "role": "YZ", "total": 3, "zero_twisted_carrier": 0}
- {"nonzero_twisted_carrier": 0, "role": "ZT", "total": 3, "zero_twisted_carrier": 3}

## Zero twisted carrier rows

- {"columns": [9], "cycle_index": 0, "role": "ZT", "row_ordinal": 3, "slot_pairs": [[2, 13]], "twisted_edge_count": 0, "untwisted_edge_count": 60}
- {"columns": [13], "cycle_index": 0, "role": "TI", "row_ordinal": 4, "slot_pairs": [[4, 10]], "twisted_edge_count": 0, "untwisted_edge_count": 60}
- {"columns": [9, 11, 14], "cycle_index": 1, "role": "ZT", "row_ordinal": 9, "slot_pairs": [[2, 13], [3, 13], [4, 14]], "twisted_edge_count": 0, "untwisted_edge_count": 180}
- {"columns": [21, 22], "cycle_index": 2, "role": "ZT", "row_ordinal": 15, "slot_pairs": [[6, 14], [7, 8]], "twisted_edge_count": 0, "untwisted_edge_count": 120}
- {"columns": [13, 15], "cycle_index": 2, "role": "TI", "row_ordinal": 16, "slot_pairs": [[4, 10], [5, 6]], "twisted_edge_count": 0, "untwisted_edge_count": 120}

## Interpretation

- main_result: The failed twisted-edge check is structured, not random.
- zt_result: All ZT rows are twisted-carrier absent under the uniform source rule.
- ti_result: TI splits: one TI row has identity twisted carrier support and two TI rows are twisted-carrier absent.
- next_question: When residual labels are evaluated, do the known residuals align with this precomputed twisted-absence / identity split?

## Checks

- PASS source_lift_loaded: gap_a_uniform_15_thalion_row_lift_needs_inspection
- PASS zero_rows_present: zero row count=5
- PASS all_zt_zero: ZT zero=3 of 3
- PASS ti_split: TI zero=2 nonzero=1
- PASS no_residual_labels_used: Inspection uses only row role/cycle labels and precomputed twisted carrier presence.

## Next script

    evaluate_gap_a_15_thalion_residual_split_001.py
