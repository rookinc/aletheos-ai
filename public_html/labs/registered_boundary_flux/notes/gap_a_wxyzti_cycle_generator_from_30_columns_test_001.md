# Gap A WXYZTI cycle generator from 30 columns test 001

Status: gap_a_wxyzti_cycle_generator_from_30_columns_no_exact_candidate

## Boundary

- This does not close Gap A.
- The 18-row table is used only as a scoring target.
- The tested candidate family is simple and incomplete.
- A negative result does not prove no source-native generator exists.
- No physical interpretation is claimed.

## Summary

- test_result: "no_exact_generator_in_tested_family"
- gap_a_closed: false
- target_row_count: 18
- source_column_count: 30
- fixed_candidate_count: 21
- tested_affine_candidate_count: 143990
- retained_affine_candidate_count: 40
- total_reported_candidate_count: 61
- exact_candidate_count: 0
- best_candidate_name: "affine_law0_sector_b_m14_a1_b0_c1"
- best_candidate_exact_row_count: 6
- best_candidate_exact_rows: [0, 1, 6, 7, 12, 13]
- best_candidate_average_jaccard: 0.4074074074074074
- preimage_target: [3, 16]
- stable_target: [4, 9, 15]
- preimage_rows_exact_under_best: []
- stable_rows_exact_under_best: []
- claim_closes_gap_a: false

## Claim

- does_this_close_gap_a: false
- does_this_find_exact_generator_in_tested_family: false
- does_this_construct_source_native_generator: false
- short_form: "No exact WXYZTI row generator from the 30 columns was found in the tested simple cycle/affine family."
- not_closed_reason: "The generator is either absent from this tested family or still not source-native proof."

## Best candidate

{
  "average_jaccard": 0.4074074074074074,
  "description": "Affine scalar rule: law0_sector_b mod m equals a*role_index + b*cycle + c mod m.",
  "exact_row_count": 6,
  "exact_rows": [
    0,
    1,
    6,
    7,
    12,
    13
  ],
  "exact_table": false,
  "name": "affine_law0_sector_b_m14_a1_b0_c1"
}

## Top candidates

- {"average_jaccard": 0.4074074074074074, "description": "Affine scalar rule: law0_sector_b mod m equals a*role_index + b*cycle + c mod m.", "exact_row_count": 6, "exact_rows": [0, 1, 6, 7, 12, 13], "exact_table": false, "name": "affine_law0_sector_b_m14_a1_b0_c1"}
- {"average_jaccard": 0.4074074074074074, "description": "Affine scalar rule: law0_sector_b mod m equals a*role_index + b*cycle + c mod m.", "exact_row_count": 6, "exact_rows": [0, 1, 6, 7, 12, 13], "exact_table": false, "name": "affine_law0_sector_b_m15_a1_b0_c1"}
- {"average_jaccard": 0.4074074074074074, "description": "Affine scalar rule: law1_sector_b mod m equals a*role_index + b*cycle + c mod m.", "exact_row_count": 6, "exact_rows": [0, 1, 6, 7, 12, 13], "exact_table": false, "name": "affine_law1_sector_b_m14_a1_b0_c1"}
- {"average_jaccard": 0.4074074074074074, "description": "Affine scalar rule: law1_sector_b mod m equals a*role_index + b*cycle + c mod m.", "exact_row_count": 6, "exact_rows": [0, 1, 6, 7, 12, 13], "exact_table": false, "name": "affine_law1_sector_b_m15_a1_b0_c1"}
- {"average_jaccard": 0.3611111111111111, "description": "Affine scalar rule: slot_edge_b mod m equals a*role_index + b*cycle + c mod m.", "exact_row_count": 6, "exact_rows": [0, 1, 6, 7, 12, 13], "exact_table": false, "name": "affine_slot_edge_b_m14_a1_b0_c1"}
- {"average_jaccard": 0.3611111111111111, "description": "Affine scalar rule: slot_edge_b mod m equals a*role_index + b*cycle + c mod m.", "exact_row_count": 6, "exact_rows": [0, 1, 6, 7, 12, 13], "exact_table": false, "name": "affine_slot_edge_b_m15_a1_b0_c1"}
- {"average_jaccard": 0.2962962962962963, "description": "Affine scalar rule: law0_sector_b mod m equals a*role_index + b*cycle + c mod m.", "exact_row_count": 4, "exact_rows": [0, 1, 12, 13], "exact_table": false, "name": "affine_law0_sector_b_m14_a1_b7_c1"}
- {"average_jaccard": 0.2962962962962963, "description": "Affine scalar rule: law1_sector_b mod m equals a*role_index + b*cycle + c mod m.", "exact_row_count": 4, "exact_rows": [0, 1, 12, 13], "exact_table": false, "name": "affine_law1_sector_b_m14_a1_b7_c1"}
- {"average_jaccard": 0.25, "description": "Affine scalar rule: slot_edge_b mod m equals a*role_index + b*cycle + c mod m.", "exact_row_count": 4, "exact_rows": [0, 1, 12, 13], "exact_table": false, "name": "affine_slot_edge_b_m14_a1_b7_c1"}
- {"average_jaccard": 0.2824074074074074, "description": "Affine scalar rule: law0_sector_b mod m equals a*role_index + b*cycle + c mod m.", "exact_row_count": 3, "exact_rows": [1, 7, 13], "exact_table": false, "name": "affine_law0_sector_b_m15_a4_b0_c13"}
- {"average_jaccard": 0.2824074074074074, "description": "Affine scalar rule: law1_sector_b mod m equals a*role_index + b*cycle + c mod m.", "exact_row_count": 3, "exact_rows": [1, 7, 13], "exact_table": false, "name": "affine_law1_sector_b_m15_a4_b0_c13"}
- {"average_jaccard": 0.2777777777777778, "description": "Affine scalar rule: slot_edge_b mod m equals a*role_index + b*cycle + c mod m.", "exact_row_count": 3, "exact_rows": [1, 7, 13], "exact_table": false, "name": "affine_slot_edge_b_m13_a10_b0_c5"}
- {"average_jaccard": 0.2740740740740741, "description": "Affine scalar rule: law0_sector_b mod m equals a*role_index + b*cycle + c mod m.", "exact_row_count": 3, "exact_rows": [1, 7, 13], "exact_table": false, "name": "affine_law0_sector_b_m13_a1_b0_c1"}
- {"average_jaccard": 0.2740740740740741, "description": "Affine scalar rule: law1_sector_b mod m equals a*role_index + b*cycle + c mod m.", "exact_row_count": 3, "exact_rows": [1, 7, 13], "exact_table": false, "name": "affine_law1_sector_b_m13_a1_b0_c1"}
- {"average_jaccard": 0.2638888888888889, "description": "Affine scalar rule: law0_sector_b mod m equals a*role_index + b*cycle + c mod m.", "exact_row_count": 3, "exact_rows": [1, 7, 13], "exact_table": false, "name": "affine_law0_sector_b_m13_a10_b0_c5"}

## Target rows

- {"cycle": 0, "preimage": false, "role": "WX", "row_ordinal": 0, "stable": false, "target_columns": [0], "zero": false}
- {"cycle": 0, "preimage": false, "role": "XY", "row_ordinal": 1, "stable": false, "target_columns": [4], "zero": false}
- {"cycle": 0, "preimage": false, "role": "YZ", "row_ordinal": 2, "stable": false, "target_columns": [7, 10], "zero": false}
- {"cycle": 0, "preimage": true, "role": "ZT", "row_ordinal": 3, "stable": false, "target_columns": [9], "zero": true}
- {"cycle": 0, "preimage": false, "role": "TI", "row_ordinal": 4, "stable": true, "target_columns": [13], "zero": true}
- {"cycle": 0, "preimage": false, "role": "IW", "row_ordinal": 5, "stable": false, "target_columns": [1, 7], "zero": false}
- {"cycle": 1, "preimage": false, "role": "WX", "row_ordinal": 6, "stable": false, "target_columns": [0], "zero": false}
- {"cycle": 1, "preimage": false, "role": "XY", "row_ordinal": 7, "stable": false, "target_columns": [4], "zero": false}
- {"cycle": 1, "preimage": false, "role": "YZ", "row_ordinal": 8, "stable": false, "target_columns": [1, 3, 22], "zero": false}
- {"cycle": 1, "preimage": false, "role": "ZT", "row_ordinal": 9, "stable": true, "target_columns": [9, 11, 14], "zero": true}
- {"cycle": 1, "preimage": false, "role": "TI", "row_ordinal": 10, "stable": false, "target_columns": [10, 11], "zero": false}
- {"cycle": 1, "preimage": false, "role": "IW", "row_ordinal": 11, "stable": false, "target_columns": [1, 7], "zero": false}
- {"cycle": 2, "preimage": false, "role": "WX", "row_ordinal": 12, "stable": false, "target_columns": [0], "zero": false}
- {"cycle": 2, "preimage": false, "role": "XY", "row_ordinal": 13, "stable": false, "target_columns": [4], "zero": false}
- {"cycle": 2, "preimage": false, "role": "YZ", "row_ordinal": 14, "stable": false, "target_columns": [4, 5], "zero": false}
- {"cycle": 2, "preimage": false, "role": "ZT", "row_ordinal": 15, "stable": true, "target_columns": [21, 22], "zero": true}
- {"cycle": 2, "preimage": true, "role": "TI", "row_ordinal": 16, "stable": false, "target_columns": [13, 15], "zero": true}
- {"cycle": 2, "preimage": false, "role": "IW", "row_ordinal": 17, "stable": false, "target_columns": [1, 7], "zero": false}

## Interpretation

- main_result: The missing generator is not a simple column-index, mod-6 role-pair, or affine scalar rule in this tested family.
- what_this_rules_out: Simple cycle generators using column index, source slot edges, p900 sector pairs, petersen edge pairs, shared vertices, shifts, and affine scalar mod rules.
- remaining_path: Use derived/projection artifacts to infer a less trivial row generator, then re-test it source-first.
- next_move: Derive a candidate row generator from projection/register artifacts rather than from simple 30-column features alone.

## Checks

- PASS source_native_search_loaded: gap_a_source_native_row_generator_search_no_source_native_generator
- PASS full_map_attempt_loaded: gap_a_full_carrier_to_wxyzti_register_map_attempt_source_map_missing
- PASS column_edge_map_loaded: gap_a_column_edge_witness_map_extracted
- PASS target_rows_18: 18
- PASS source_columns_30: 30
- PASS candidate_family_tested: 61
- PASS gap_a_not_closed: candidate generator test only

## Next script

    derive_gap_a_candidate_row_generator_from_projection_artifacts_001.py
