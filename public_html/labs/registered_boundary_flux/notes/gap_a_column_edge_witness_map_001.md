# Gap A column edge witness map 001

Status: gap_a_column_edge_witness_map_extracted

## Boundary

- This does not close Gap A.
- This extracts column-to-edge witnesses, not a full global carrier predicate.
- The available schema is column-to-edge, not column-to-slot-pair.
- No physical interpretation is claimed.

## Summary

- column_record_count: 30
- bridge_records_found: 30
- alignment_rows_found: 30
- column_records_complete: true
- column_cross_checks_all_pass: true
- row_count: 18
- rows_with_all_column_edge_witnesses: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
- rows_with_row_edge_match: [0, 1, 3, 4, 6, 7, 12, 13]
- all_rows_have_column_edge_witnesses: true
- preimage_rows_with_all_column_edge_witnesses: [3, 16]
- stable_rows_with_all_column_edge_witnesses: [4, 9, 15]
- preimage_rows_complete: true
- stable_rows_complete: true
- claim_closes_gap_a: false

## Claim

- does_this_close_gap_a: false
- does_this_extract_column_edge_witness_map: true
- does_this_construct_global_source_law_map: false
- all_rows_have_column_edge_witnesses: true
- preimage_rows_complete: true
- stable_rows_complete: true
- short_form: "The row-to-column layer now has a column-to-edge witness map; this replaces the failed column-to-slot-pair search."
- not_closed_reason: "A column-edge witness map is still not a full global carrier predicate evaluation."

## Row witness compact table

- {"all_columns_have_edge_witness": true, "column_edges": [[0, 1]], "columns": [0], "preimage": false, "role": "WX", "row_edge": [0, 1], "row_edge_match": true, "row_ordinal": 0, "stable": false, "zero": false}
- {"all_columns_have_edge_witness": true, "column_edges": [[1, 2]], "columns": [4], "preimage": false, "role": "XY", "row_edge": [1, 2], "row_edge_match": true, "row_ordinal": 1, "stable": false, "zero": false}
- {"all_columns_have_edge_witness": true, "column_edges": [[2, 5], [3, 5]], "columns": [7, 10], "preimage": false, "role": "YZ", "row_edge": [2, 3], "row_edge_match": false, "row_ordinal": 2, "stable": false, "zero": false}
- {"all_columns_have_edge_witness": true, "column_edges": [[3, 4]], "columns": [9], "preimage": true, "role": "ZT", "row_edge": [3, 4], "row_edge_match": true, "row_ordinal": 3, "stable": false, "zero": true}
- {"all_columns_have_edge_witness": true, "column_edges": [[4, 5]], "columns": [13], "preimage": false, "role": "TI", "row_edge": [4, 5], "row_edge_match": true, "row_ordinal": 4, "stable": true, "zero": true}
- {"all_columns_have_edge_witness": true, "column_edges": [[0, 2], [2, 5]], "columns": [1, 7], "preimage": false, "role": "IW", "row_edge": [5, 0], "row_edge_match": false, "row_ordinal": 5, "stable": false, "zero": false}
- {"all_columns_have_edge_witness": true, "column_edges": [[0, 1]], "columns": [0], "preimage": false, "role": "WX", "row_edge": [0, 1], "row_edge_match": true, "row_ordinal": 6, "stable": false, "zero": false}
- {"all_columns_have_edge_witness": true, "column_edges": [[1, 2]], "columns": [4], "preimage": false, "role": "XY", "row_edge": [1, 2], "row_edge_match": true, "row_ordinal": 7, "stable": false, "zero": false}
- {"all_columns_have_edge_witness": true, "column_edges": [[0, 2], [0, 14], [7, 14]], "columns": [1, 3, 22], "preimage": false, "role": "YZ", "row_edge": [2, 7], "row_edge_match": false, "row_ordinal": 8, "stable": false, "zero": false}
- {"all_columns_have_edge_witness": true, "column_edges": [[4, 7], [3, 4], [3, 10]], "columns": [14, 9, 11], "preimage": false, "role": "ZT", "row_edge": [7, 10], "row_edge_match": false, "row_ordinal": 9, "stable": true, "zero": true}
- {"all_columns_have_edge_witness": true, "column_edges": [[3, 5], [3, 10]], "columns": [10, 11], "preimage": false, "role": "TI", "row_edge": [10, 5], "row_edge_match": false, "row_ordinal": 10, "stable": false, "zero": false}
- {"all_columns_have_edge_witness": true, "column_edges": [[0, 2], [2, 5]], "columns": [1, 7], "preimage": false, "role": "IW", "row_edge": [5, 0], "row_edge_match": false, "row_ordinal": 11, "stable": false, "zero": false}
- {"all_columns_have_edge_witness": true, "column_edges": [[0, 1]], "columns": [0], "preimage": false, "role": "WX", "row_edge": [0, 1], "row_edge_match": true, "row_ordinal": 12, "stable": false, "zero": false}
- {"all_columns_have_edge_witness": true, "column_edges": [[1, 2]], "columns": [4], "preimage": false, "role": "XY", "row_edge": [1, 2], "row_edge_match": true, "row_ordinal": 13, "stable": false, "zero": false}
- {"all_columns_have_edge_witness": true, "column_edges": [[1, 2], [1, 8]], "columns": [4, 5], "preimage": false, "role": "YZ", "row_edge": [2, 8], "row_edge_match": false, "row_ordinal": 14, "stable": false, "zero": false}
- {"all_columns_have_edge_witness": true, "column_edges": [[7, 8], [7, 14]], "columns": [21, 22], "preimage": false, "role": "ZT", "row_edge": [8, 14], "row_edge_match": false, "row_ordinal": 15, "stable": true, "zero": true}
- {"all_columns_have_edge_witness": true, "column_edges": [[4, 5], [4, 14]], "columns": [13, 15], "preimage": true, "role": "TI", "row_edge": [14, 5], "row_edge_match": false, "row_ordinal": 16, "stable": false, "zero": true}
- {"all_columns_have_edge_witness": true, "column_edges": [[0, 2], [2, 5]], "columns": [1, 7], "preimage": false, "role": "IW", "row_edge": [5, 0], "row_edge_match": false, "row_ordinal": 17, "stable": false, "zero": false}

## Column record compact table

- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 0, "canonical_edge": [0, 1], "column": 0, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [0, 2], "column": 1, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 0, "canonical_edge": [0, 11], "column": 2, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [0, 14], "column": 3, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [1, 2], "column": 4, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 0, "canonical_edge": [1, 8], "column": 5, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [1, 13], "column": 6, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [2, 5], "column": 7, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 0, "canonical_edge": [2, 12], "column": 8, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [3, 4], "column": 9, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 0, "canonical_edge": [3, 5], "column": 10, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [3, 10], "column": 11, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 0, "canonical_edge": [3, 13], "column": 12, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [4, 5], "column": 13, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 0, "canonical_edge": [4, 7], "column": 14, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [4, 14], "column": 15, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [5, 12], "column": 16, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 0, "canonical_edge": [6, 7], "column": 17, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [6, 8], "column": 18, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [6, 9], "column": 19, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [6, 12], "column": 20, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [7, 8], "column": 21, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [7, 14], "column": 22, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [8, 13], "column": 23, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [9, 10], "column": 24, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 0, "canonical_edge": [9, 11], "column": 25, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 0, "canonical_edge": [9, 12], "column": 26, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [10, 11], "column": 27, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [10, 13], "column": 28, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}
- {"alignment_record_found": true, "bridge_record_found": true, "canonical_cocycle_value": 1, "canonical_edge": [11, 14], "column": 29, "cross_checks": {"M_row_support_agrees": true, "alignment_local_checks_pass": true, "assignment_edge_agrees": true, "assignment_support_agrees": true, "colored_edge_agrees": true, "petrie_edge_agrees": true, "signature_edge_agrees": true}}

## Interpretation

- main_result: The bridge should be column-to-edge, not column-to-slot-pair.
- next_move: Use column-edge witnesses to query or evaluate the global 900 carrier edge records.

## Checks

- PASS schema_inspection_loaded: gap_a_column_slot_pair_schema_candidate_found
- PASS assignment_bridge_loaded: edge_column_assignment_bridge_verified_not_map_proof
- PASS alignment_loaded: edge_column_transport_role_alignment_verified_not_map_proof
- PASS normalized_preimage_loaded: gap_a_source_preimage_from_normalized_zero_rows_recorded_not_promoted
- PASS bridge_records_30: 30
- PASS alignment_rows_30: 30
- PASS column_records_30: 30
- PASS column_cross_checks_all_pass: {"alignment_rows_found": 30, "all_rows_have_column_edge_witnesses": true, "bridge_records_found": 30, "claim_closes_gap_a": false, "column_cross_checks_all_pass": true, "column_record_count": 30, "column_records_complete": true, "preimage_rows_complete": true, "preimage_rows_with_all_column_edge_witnesses": [3, 16], "row_count": 18, "rows_with_all_column_edge_witnesses": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "rows_with_row_edge_match": [0, 1, 3, 4, 6, 7, 12, 13], "stable_rows_complete": true, "stable_rows_with_all_column_edge_witnesses": [4, 9, 15]}
- PASS row_witnesses_18: 18
- PASS all_rows_have_column_edge_witnesses: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
- PASS preimage_rows_complete: [3, 16]
- PASS stable_rows_complete: [4, 9, 15]
- PASS gap_a_not_closed: column-edge bridge only

## Next script

    map_gap_a_column_edges_to_global_900_carrier_001.py
