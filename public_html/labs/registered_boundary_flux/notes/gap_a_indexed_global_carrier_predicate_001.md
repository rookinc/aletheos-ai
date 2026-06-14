# Gap A indexed global carrier predicate 001

Status: gap_a_indexed_global_carrier_predicate_exact

## Boundary

- This does not close Gap A.
- This evaluates an indexed global-carrier predicate over the witness table.
- The predicate uses completed direct-or-indexed witness coverage.
- Indexed witness mode is weaker than direct endpoint equality.
- This is still not a full source-derived chamber/register map from the 900 carrier.
- No physical interpretation is claimed.

## Predicate

- name: "global_indexed_source_preimage_predicate"
- formula: "all_global_witnesses AND zero_twisted_source_row AND (singleton_ZT OR multi_column_TI)"
- stable_complement_formula: "all_global_witnesses AND zero_twisted_source_row AND (singleton_TI OR multi_column_ZT)"
- witness_rule: {"caution": "Indexed witness mode is weaker than direct endpoint agreement.", "definition": "A column has a global witness if it has either a direct endpoint hit in global carrier records or an indexed witness in a 30-entry global carrier-law table.", "direct_mode": "direct endpoint hit", "indexed_mode": "same column index represented in a 30-entry carrier-law table", "name": "direct_or_indexed_global_witness"}
- caution: "The predicate is exact over the 18-row indexed witness table, not over an independently enumerated full 900-carrier predicate domain."

## Summary

- row_count: 18
- truth_preimage_support: [3, 16]
- global_indexed_preimage_support: [3, 16]
- global_indexed_preimage_exact: true
- truth_stable_complement_support: [4, 9, 15]
- global_indexed_stable_complement_support: [4, 9, 15]
- global_indexed_stable_complement_exact: true
- direct_supported_preimage_support: [3, 16]
- direct_supported_preimage_exact: true
- false_positive_preimage: []
- false_negative_preimage: []
- false_positive_stable: []
- false_negative_stable: []
- all_rows_have_global_witnesses: true
- all_columns_have_global_witnesses: true
- indexed_endpoint_agreement_count: 5
- claim_closes_gap_a: false

## Claim

- does_this_close_gap_a: false
- does_this_evaluate_indexed_global_carrier_predicate: true
- does_this_construct_full_global_source_law_map: false
- global_indexed_preimage_exact: true
- global_indexed_stable_complement_exact: true
- preimage_support: [3, 16]
- stable_complement_support: [4, 9, 15]
- short_form: "The normalized source law is exact over the completed indexed global-carrier witness table."
- not_closed_reason: "The predicate is exact on the 18-row indexed witness table, but a full source-derived carrier-to-register map has not yet been constructed."

## Predicate row compact table

- {"columns": [0], "global_indexed_preimage_predicate": false, "global_indexed_stable_complement_predicate": false, "multi_column_TI": false, "multi_column_ZT": false, "preimage_truth": false, "role": "WX", "row_ordinal": 0, "singleton_TI": false, "singleton_ZT": false, "stable_truth": false, "witness_modes": ["direct_and_indexed"], "zero": false}
- {"columns": [4], "global_indexed_preimage_predicate": false, "global_indexed_stable_complement_predicate": false, "multi_column_TI": false, "multi_column_ZT": false, "preimage_truth": false, "role": "XY", "row_ordinal": 1, "singleton_TI": false, "singleton_ZT": false, "stable_truth": false, "witness_modes": ["direct_and_indexed"], "zero": false}
- {"columns": [7, 10], "global_indexed_preimage_predicate": false, "global_indexed_stable_complement_predicate": false, "multi_column_TI": false, "multi_column_ZT": false, "preimage_truth": false, "role": "YZ", "row_ordinal": 2, "singleton_TI": false, "singleton_ZT": false, "stable_truth": false, "witness_modes": ["indexed_only"], "zero": false}
- {"columns": [9], "global_indexed_preimage_predicate": true, "global_indexed_stable_complement_predicate": false, "multi_column_TI": false, "multi_column_ZT": false, "preimage_truth": true, "role": "ZT", "row_ordinal": 3, "singleton_TI": false, "singleton_ZT": true, "stable_truth": false, "witness_modes": ["direct_and_indexed"], "zero": true}
- {"columns": [13], "global_indexed_preimage_predicate": false, "global_indexed_stable_complement_predicate": true, "multi_column_TI": false, "multi_column_ZT": false, "preimage_truth": false, "role": "TI", "row_ordinal": 4, "singleton_TI": true, "singleton_ZT": false, "stable_truth": true, "witness_modes": ["direct_and_indexed"], "zero": true}
- {"columns": [1, 7], "global_indexed_preimage_predicate": false, "global_indexed_stable_complement_predicate": false, "multi_column_TI": false, "multi_column_ZT": false, "preimage_truth": false, "role": "IW", "row_ordinal": 5, "singleton_TI": false, "singleton_ZT": false, "stable_truth": false, "witness_modes": ["indexed_only"], "zero": false}
- {"columns": [0], "global_indexed_preimage_predicate": false, "global_indexed_stable_complement_predicate": false, "multi_column_TI": false, "multi_column_ZT": false, "preimage_truth": false, "role": "WX", "row_ordinal": 6, "singleton_TI": false, "singleton_ZT": false, "stable_truth": false, "witness_modes": ["direct_and_indexed"], "zero": false}
- {"columns": [4], "global_indexed_preimage_predicate": false, "global_indexed_stable_complement_predicate": false, "multi_column_TI": false, "multi_column_ZT": false, "preimage_truth": false, "role": "XY", "row_ordinal": 7, "singleton_TI": false, "singleton_ZT": false, "stable_truth": false, "witness_modes": ["direct_and_indexed"], "zero": false}
- {"columns": [1, 3, 22], "global_indexed_preimage_predicate": false, "global_indexed_stable_complement_predicate": false, "multi_column_TI": false, "multi_column_ZT": false, "preimage_truth": false, "role": "YZ", "row_ordinal": 8, "singleton_TI": false, "singleton_ZT": false, "stable_truth": false, "witness_modes": ["direct_and_indexed", "indexed_only"], "zero": false}
- {"columns": [14, 9, 11], "global_indexed_preimage_predicate": false, "global_indexed_stable_complement_predicate": true, "multi_column_TI": false, "multi_column_ZT": true, "preimage_truth": false, "role": "ZT", "row_ordinal": 9, "singleton_TI": false, "singleton_ZT": false, "stable_truth": true, "witness_modes": ["direct_and_indexed", "indexed_only"], "zero": true}
- {"columns": [10, 11], "global_indexed_preimage_predicate": false, "global_indexed_stable_complement_predicate": false, "multi_column_TI": true, "multi_column_ZT": false, "preimage_truth": false, "role": "TI", "row_ordinal": 10, "singleton_TI": false, "singleton_ZT": false, "stable_truth": false, "witness_modes": ["indexed_only"], "zero": false}
- {"columns": [1, 7], "global_indexed_preimage_predicate": false, "global_indexed_stable_complement_predicate": false, "multi_column_TI": false, "multi_column_ZT": false, "preimage_truth": false, "role": "IW", "row_ordinal": 11, "singleton_TI": false, "singleton_ZT": false, "stable_truth": false, "witness_modes": ["indexed_only"], "zero": false}
- {"columns": [0], "global_indexed_preimage_predicate": false, "global_indexed_stable_complement_predicate": false, "multi_column_TI": false, "multi_column_ZT": false, "preimage_truth": false, "role": "WX", "row_ordinal": 12, "singleton_TI": false, "singleton_ZT": false, "stable_truth": false, "witness_modes": ["direct_and_indexed"], "zero": false}
- {"columns": [4], "global_indexed_preimage_predicate": false, "global_indexed_stable_complement_predicate": false, "multi_column_TI": false, "multi_column_ZT": false, "preimage_truth": false, "role": "XY", "row_ordinal": 13, "singleton_TI": false, "singleton_ZT": false, "stable_truth": false, "witness_modes": ["direct_and_indexed"], "zero": false}
- {"columns": [4, 5], "global_indexed_preimage_predicate": false, "global_indexed_stable_complement_predicate": false, "multi_column_TI": false, "multi_column_ZT": false, "preimage_truth": false, "role": "YZ", "row_ordinal": 14, "singleton_TI": false, "singleton_ZT": false, "stable_truth": false, "witness_modes": ["direct_and_indexed", "indexed_only"], "zero": false}
- {"columns": [21, 22], "global_indexed_preimage_predicate": false, "global_indexed_stable_complement_predicate": true, "multi_column_TI": false, "multi_column_ZT": true, "preimage_truth": false, "role": "ZT", "row_ordinal": 15, "singleton_TI": false, "singleton_ZT": false, "stable_truth": true, "witness_modes": ["direct_and_indexed"], "zero": true}
- {"columns": [13, 15], "global_indexed_preimage_predicate": true, "global_indexed_stable_complement_predicate": false, "multi_column_TI": true, "multi_column_ZT": false, "preimage_truth": true, "role": "TI", "row_ordinal": 16, "singleton_TI": false, "singleton_ZT": false, "stable_truth": false, "witness_modes": ["direct_and_indexed"], "zero": true}
- {"columns": [1, 7], "global_indexed_preimage_predicate": false, "global_indexed_stable_complement_predicate": false, "multi_column_TI": false, "multi_column_ZT": false, "preimage_truth": false, "role": "IW", "row_ordinal": 17, "singleton_TI": false, "singleton_ZT": false, "stable_truth": false, "witness_modes": ["indexed_only"], "zero": false}

## Interpretation

- main_result: The normalized source preimage [3,16] and stable complement [4,9,15] are exactly recovered under the completed direct-or-indexed global witness rule.
- why_this_matters: The prior row-local source law now has a global indexed-carrier witness formulation.
- remaining_gap: Gap A still requires a full source-derived chamber/register map, not just an exact predicate over the 18-row witness table.
- next_move: Record an indexed global predicate theorem note and then decide whether to attempt full carrier-domain enumeration or write the Gap A boundary theorem.

## Checks

- PASS global_indexed_map_loaded: gap_a_global_carrier_map_with_indexed_witnesses_complete
- PASS normalized_preimage_loaded: gap_a_source_preimage_from_normalized_zero_rows_recorded_not_promoted
- PASS parser_patch_loaded: gap_a_global_edge_parser_patch_indexed_witness_complete
- PASS row_records_18: 18
- PASS all_rows_have_global_witnesses: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
- PASS all_columns_have_global_witnesses: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
- PASS preimage_predicate_exact: [3, 16]
- PASS stable_complement_predicate_exact: [4, 9, 15]
- PASS gap_a_not_closed: indexed predicate only, not full closure

## Next script

    record_gap_a_indexed_global_predicate_theorem_note_001.py
