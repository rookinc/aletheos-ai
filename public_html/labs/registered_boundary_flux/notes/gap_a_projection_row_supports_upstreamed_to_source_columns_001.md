# Gap A projection row supports upstreamed to source columns 001

Status: gap_a_projection_row_supports_upstreamed_columnwise_complete_not_generator

## Boundary

- This does not close Gap A.
- This proves column-wise source availability for projected row supports, not a source-native grouping rule.
- The row grouping still comes from the projection-derived chamber/register artifact.
- The missing object remains the full 900 carrier-to-WXYZTI row generator.
- No physical interpretation is claimed.

## Summary

- upstream_result: "row_supports_columnwise_source_complete"
- gap_a_closed: false
- source_column_count: 30
- complete_source_column_count: 30
- columns_complete: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
- columns_incomplete: []
- row_count: 18
- rows_all_source_available: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
- all_rows_source_available: true
- preimage_rows_all_source_available: [3, 16]
- stable_rows_all_source_available: [4, 9, 15]
- does_this_explain_grouping_rule: false
- claim_closes_gap_a: false

## Row support records

- {"all_columns_source_available": true, "columns": [0], "cycle": 0, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "global_witness_modes": ["direct_and_indexed"], "role": "WX", "row_ordinal": 0}
- {"all_columns_source_available": true, "columns": [4], "cycle": 0, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "global_witness_modes": ["direct_and_indexed"], "role": "XY", "row_ordinal": 1}
- {"all_columns_source_available": true, "columns": [7, 10], "cycle": 0, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "global_witness_modes": ["indexed_only"], "role": "YZ", "row_ordinal": 2}
- {"all_columns_source_available": true, "columns": [9], "cycle": 0, "distilled_preimage_rule": true, "distilled_stable_complement_rule": false, "global_witness_modes": ["direct_and_indexed"], "role": "ZT", "row_ordinal": 3}
- {"all_columns_source_available": true, "columns": [13], "cycle": 0, "distilled_preimage_rule": false, "distilled_stable_complement_rule": true, "global_witness_modes": ["direct_and_indexed"], "role": "TI", "row_ordinal": 4}
- {"all_columns_source_available": true, "columns": [1, 7], "cycle": 0, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "global_witness_modes": ["indexed_only"], "role": "IW", "row_ordinal": 5}
- {"all_columns_source_available": true, "columns": [0], "cycle": 1, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "global_witness_modes": ["direct_and_indexed"], "role": "WX", "row_ordinal": 6}
- {"all_columns_source_available": true, "columns": [4], "cycle": 1, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "global_witness_modes": ["direct_and_indexed"], "role": "XY", "row_ordinal": 7}
- {"all_columns_source_available": true, "columns": [1, 3, 22], "cycle": 1, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "global_witness_modes": ["direct_and_indexed", "indexed_only"], "role": "YZ", "row_ordinal": 8}
- {"all_columns_source_available": true, "columns": [9, 11, 14], "cycle": 1, "distilled_preimage_rule": false, "distilled_stable_complement_rule": true, "global_witness_modes": ["direct_and_indexed", "indexed_only"], "role": "ZT", "row_ordinal": 9}
- {"all_columns_source_available": true, "columns": [10, 11], "cycle": 1, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "global_witness_modes": ["indexed_only"], "role": "TI", "row_ordinal": 10}
- {"all_columns_source_available": true, "columns": [1, 7], "cycle": 1, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "global_witness_modes": ["indexed_only"], "role": "IW", "row_ordinal": 11}
- {"all_columns_source_available": true, "columns": [0], "cycle": 2, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "global_witness_modes": ["direct_and_indexed"], "role": "WX", "row_ordinal": 12}
- {"all_columns_source_available": true, "columns": [4], "cycle": 2, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "global_witness_modes": ["direct_and_indexed"], "role": "XY", "row_ordinal": 13}
- {"all_columns_source_available": true, "columns": [4, 5], "cycle": 2, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "global_witness_modes": ["direct_and_indexed", "indexed_only"], "role": "YZ", "row_ordinal": 14}
- {"all_columns_source_available": true, "columns": [21, 22], "cycle": 2, "distilled_preimage_rule": false, "distilled_stable_complement_rule": true, "global_witness_modes": ["direct_and_indexed"], "role": "ZT", "row_ordinal": 15}
- {"all_columns_source_available": true, "columns": [13, 15], "cycle": 2, "distilled_preimage_rule": true, "distilled_stable_complement_rule": false, "global_witness_modes": ["direct_and_indexed"], "role": "TI", "row_ordinal": 16}
- {"all_columns_source_available": true, "columns": [1, 7], "cycle": 2, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "global_witness_modes": ["indexed_only"], "role": "IW", "row_ordinal": 17}

## Source column compact table

- {"canonical_edge": [0, 1], "cocycle": 0, "column": 0, "complete": true, "g900_slot_edge": [0, 1], "global_witness_mode": "direct_and_indexed", "p900_petersen_edge_a": [0, 1], "p900_petersen_edge_b": [1, 2], "p900_sector_pair": [0, 1], "shared": 1, "shift": 30}
- {"canonical_edge": [0, 2], "cocycle": 1, "column": 1, "complete": true, "g900_slot_edge": [0, 4], "global_witness_mode": "indexed_only", "p900_petersen_edge_a": [0, 1], "p900_petersen_edge_b": [4, 0], "p900_sector_pair": [0, 4], "shared": 0, "shift": 30}
- {"canonical_edge": [0, 11], "cocycle": 0, "column": 2, "complete": true, "g900_slot_edge": [0, 10], "global_witness_mode": "direct_and_indexed", "p900_petersen_edge_a": [0, 1], "p900_petersen_edge_b": [0, 5], "p900_sector_pair": [0, 5], "shared": 0, "shift": 30}
- {"canonical_edge": [0, 14], "cocycle": 1, "column": 3, "complete": true, "g900_slot_edge": [0, 11], "global_witness_mode": "indexed_only", "p900_petersen_edge_a": [0, 1], "p900_petersen_edge_b": [1, 6], "p900_sector_pair": [0, 6], "shared": 1, "shift": 30}
- {"canonical_edge": [1, 2], "cocycle": 1, "column": 4, "complete": true, "g900_slot_edge": [1, 2], "global_witness_mode": "direct_and_indexed", "p900_petersen_edge_a": [1, 2], "p900_petersen_edge_b": [2, 3], "p900_sector_pair": [1, 2], "shared": 2, "shift": 30}
- {"canonical_edge": [1, 8], "cocycle": 0, "column": 5, "complete": true, "g900_slot_edge": [1, 11], "global_witness_mode": "indexed_only", "p900_petersen_edge_a": [1, 2], "p900_petersen_edge_b": [1, 6], "p900_sector_pair": [1, 6], "shared": 1, "shift": 30}
- {"canonical_edge": [1, 13], "cocycle": 1, "column": 6, "complete": true, "g900_slot_edge": [1, 12], "global_witness_mode": "indexed_only", "p900_petersen_edge_a": [1, 2], "p900_petersen_edge_b": [2, 7], "p900_sector_pair": [1, 7], "shared": 2, "shift": 30}
- {"canonical_edge": [2, 5], "cocycle": 1, "column": 7, "complete": true, "g900_slot_edge": [2, 3], "global_witness_mode": "indexed_only", "p900_petersen_edge_a": [2, 3], "p900_petersen_edge_b": [3, 4], "p900_sector_pair": [2, 3], "shared": 3, "shift": 30}
- {"canonical_edge": [2, 12], "cocycle": 0, "column": 8, "complete": true, "g900_slot_edge": [2, 12], "global_witness_mode": "direct_and_indexed", "p900_petersen_edge_a": [2, 3], "p900_petersen_edge_b": [2, 7], "p900_sector_pair": [2, 7], "shared": 2, "shift": 30}
- {"canonical_edge": [3, 4], "cocycle": 1, "column": 9, "complete": true, "g900_slot_edge": [2, 13], "global_witness_mode": "direct_and_indexed", "p900_petersen_edge_a": [2, 3], "p900_petersen_edge_b": [3, 8], "p900_sector_pair": [2, 8], "shared": 3, "shift": 30}
- {"canonical_edge": [3, 5], "cocycle": 0, "column": 10, "complete": true, "g900_slot_edge": [3, 4], "global_witness_mode": "indexed_only", "p900_petersen_edge_a": [3, 4], "p900_petersen_edge_b": [4, 0], "p900_sector_pair": [3, 4], "shared": 4, "shift": 0}
- {"canonical_edge": [3, 10], "cocycle": 1, "column": 11, "complete": true, "g900_slot_edge": [3, 13], "global_witness_mode": "indexed_only", "p900_petersen_edge_a": [3, 4], "p900_petersen_edge_b": [3, 8], "p900_sector_pair": [3, 8], "shared": 3, "shift": 30}
- {"canonical_edge": [3, 13], "cocycle": 0, "column": 12, "complete": true, "g900_slot_edge": [3, 14], "global_witness_mode": "direct_and_indexed", "p900_petersen_edge_a": [3, 4], "p900_petersen_edge_b": [4, 9], "p900_sector_pair": [3, 9], "shared": 4, "shift": 0}
- {"canonical_edge": [4, 5], "cocycle": 1, "column": 13, "complete": true, "g900_slot_edge": [4, 10], "global_witness_mode": "direct_and_indexed", "p900_petersen_edge_a": [4, 0], "p900_petersen_edge_b": [0, 5], "p900_sector_pair": [4, 5], "shared": 0, "shift": 30}
- {"canonical_edge": [4, 7], "cocycle": 0, "column": 14, "complete": true, "g900_slot_edge": [4, 14], "global_witness_mode": "indexed_only", "p900_petersen_edge_a": [4, 0], "p900_petersen_edge_b": [4, 9], "p900_sector_pair": [4, 9], "shared": 4, "shift": 0}
- {"canonical_edge": [4, 14], "cocycle": 1, "column": 15, "complete": true, "g900_slot_edge": [5, 6], "global_witness_mode": "direct_and_indexed", "p900_petersen_edge_a": [0, 5], "p900_petersen_edge_b": [5, 7], "p900_sector_pair": [5, 10], "shared": 5, "shift": 30}
- {"canonical_edge": [5, 12], "cocycle": 1, "column": 16, "complete": true, "g900_slot_edge": [5, 9], "global_witness_mode": "direct_and_indexed", "p900_petersen_edge_a": [0, 5], "p900_petersen_edge_b": [8, 5], "p900_sector_pair": [5, 14], "shared": 5, "shift": 30}
- {"canonical_edge": [6, 7], "cocycle": 0, "column": 17, "complete": true, "g900_slot_edge": [5, 10], "global_witness_mode": "direct_and_indexed", "p900_petersen_edge_a": [1, 6], "p900_petersen_edge_b": [9, 6], "p900_sector_pair": [6, 12], "shared": 6, "shift": 0}
- {"canonical_edge": [6, 8], "cocycle": 1, "column": 18, "complete": true, "g900_slot_edge": [5, 12], "global_witness_mode": "indexed_only", "p900_petersen_edge_a": [1, 6], "p900_petersen_edge_b": [6, 8], "p900_sector_pair": [6, 13], "shared": 6, "shift": 0}
- {"canonical_edge": [6, 9], "cocycle": 1, "column": 19, "complete": true, "g900_slot_edge": [6, 7], "global_witness_mode": "indexed_only", "p900_petersen_edge_a": [2, 7], "p900_petersen_edge_b": [5, 7], "p900_sector_pair": [7, 10], "shared": 7, "shift": 0}
- {"canonical_edge": [6, 12], "cocycle": 1, "column": 20, "complete": true, "g900_slot_edge": [6, 12], "global_witness_mode": "direct_and_indexed", "p900_petersen_edge_a": [2, 7], "p900_petersen_edge_b": [7, 9], "p900_sector_pair": [7, 11], "shared": 7, "shift": 0}
- {"canonical_edge": [7, 8], "cocycle": 1, "column": 21, "complete": true, "g900_slot_edge": [6, 14], "global_witness_mode": "direct_and_indexed", "p900_petersen_edge_a": [3, 8], "p900_petersen_edge_b": [6, 8], "p900_sector_pair": [8, 13], "shared": 8, "shift": 0}
- {"canonical_edge": [7, 14], "cocycle": 1, "column": 22, "complete": true, "g900_slot_edge": [7, 8], "global_witness_mode": "direct_and_indexed", "p900_petersen_edge_a": [3, 8], "p900_petersen_edge_b": [8, 5], "p900_sector_pair": [8, 14], "shared": 8, "shift": 0}
- {"canonical_edge": [8, 13], "cocycle": 1, "column": 23, "complete": true, "g900_slot_edge": [7, 11], "global_witness_mode": "direct_and_indexed", "p900_petersen_edge_a": [4, 9], "p900_petersen_edge_b": [7, 9], "p900_sector_pair": [9, 11], "shared": 9, "shift": 0}
- {"canonical_edge": [9, 10], "cocycle": 1, "column": 24, "complete": true, "g900_slot_edge": [7, 14], "global_witness_mode": "direct_and_indexed", "p900_petersen_edge_a": [4, 9], "p900_petersen_edge_b": [9, 6], "p900_sector_pair": [9, 12], "shared": 9, "shift": 0}
- {"canonical_edge": [9, 11], "cocycle": 0, "column": 25, "complete": true, "g900_slot_edge": [8, 9], "global_witness_mode": "direct_and_indexed", "p900_petersen_edge_a": [5, 7], "p900_petersen_edge_b": [7, 9], "p900_sector_pair": [10, 11], "shared": 7, "shift": 0}
- {"canonical_edge": [9, 12], "cocycle": 0, "column": 26, "complete": true, "g900_slot_edge": [8, 11], "global_witness_mode": "direct_and_indexed", "p900_petersen_edge_a": [5, 7], "p900_petersen_edge_b": [8, 5], "p900_sector_pair": [10, 14], "shared": 5, "shift": 30}
- {"canonical_edge": [10, 11], "cocycle": 1, "column": 27, "complete": true, "g900_slot_edge": [8, 13], "global_witness_mode": "direct_and_indexed", "p900_petersen_edge_a": [7, 9], "p900_petersen_edge_b": [9, 6], "p900_sector_pair": [11, 12], "shared": 9, "shift": 0}
- {"canonical_edge": [10, 13], "cocycle": 1, "column": 28, "complete": true, "g900_slot_edge": [9, 10], "global_witness_mode": "indexed_only", "p900_petersen_edge_a": [9, 6], "p900_petersen_edge_b": [6, 8], "p900_sector_pair": [12, 13], "shared": 6, "shift": 0}
- {"canonical_edge": [11, 14], "cocycle": 1, "column": 29, "complete": true, "g900_slot_edge": [9, 13], "global_witness_mode": "indexed_only", "p900_petersen_edge_a": [6, 8], "p900_petersen_edge_b": [8, 5], "p900_sector_pair": [13, 14], "shared": 8, "shift": 0}

## Claim

- does_this_close_gap_a: false
- does_this_upstream_row_supports_columnwise: true
- does_this_explain_row_grouping_rule: false
- does_this_construct_full_900_carrier_to_register_map: false
- short_form: "Every projected WXYZTI row support is column-wise upstreamed to source carrier-law records, but the row grouping rule remains projection-derived."
- not_closed_reason: "Column-wise source availability does not explain why those columns form those WXYZTI rows."

## Interpretation

- main_result: All 18 projected row supports are source-backed column by column.
- what_moved_upstream: The column identities inside every WXYZTI row now have g900 and p900 source-law records.
- what_did_not_move_upstream: The grouping of columns into WXYZTI rows.
- next_move: Try to infer a grouping rule from the source-column records for each row support.

## Checks

- PASS distilled_rule_loaded: gap_a_projection_row_generator_rule_distilled_not_source_native
- PASS projection_generator_loaded: gap_a_candidate_row_generator_from_projection_artifacts_exact_projection_candidate
- PASS global_indexed_map_loaded: gap_a_global_carrier_map_with_indexed_witnesses_complete
- PASS parser_patch_loaded: gap_a_global_edge_parser_patch_indexed_witness_complete
- PASS column_edge_map_loaded: gap_a_column_edge_witness_map_extracted
- PASS boundary_theorem_loaded: gap_a_boundary_theorem_note_recorded
- PASS g900_source_loaded: 30
- PASS p900_edge_law_tables_loaded: 2
- PASS source_columns_30: 30
- PASS all_source_columns_complete: []
- PASS distilled_rows_18: 18
- PASS all_rows_columnwise_source_available: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
- PASS preimage_rows_source_available: [3, 16]
- PASS stable_rows_source_available: [4, 9, 15]
- PASS grouping_rule_not_explained: column-wise upstream only
- PASS gap_a_not_closed: not a row grouping generator

## Next script

    infer_gap_a_row_grouping_rule_from_source_column_records_001.py
