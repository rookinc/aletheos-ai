# Complement-readable assignments for admitted four 001

Status: complement_readable_assignments_supported_not_full_lift

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This tests complement-readable assignment shadows on the admitted four.
- A quotient complement shadow is not the same as a full 41-seam lift.
- No independent witness layer is proven.
- No physical interpretation is claimed.

## Interpretation

- main_result: The admitted four support a quotient complement-readable assignment.
- meaning: The B labels pair as 2<->13 and 4<->11 under i -> 15-i, while the A labels pair as 1<->9 and 3<->7 under i -> 10-i.
- why_this_matters: The hand-sketch complement idea has an executable shadow inside the admitted four.
- why_not_closure: This only proves a quotient complement shadow on the admitted records. It does not construct the 41-seam lift, the 120-to-900 map, a full return cycle, or an independent witness layer.
- next_move: Record the complement assignment boundary, then test L/R return-word classes.

## Summary

- test_result: "complement_readable_assignment_candidate_supported"
- gap_a_status: "open"
- gap_a_closed: false
- conjecture_name: "Complement-Readable Lift Conjecture"
- hand_rule_candidate: "i -> 41 - i"
- canonical_sparse_law: "shared_B+reverse_partner"
- source_reading: "anchor-and-reverse transport on oriented length-2 source-shell records"
- record_count: 120
- admitted_count: 4
- admitted_keys: ["11|7|14|23,24", "13|9|10|28,29", "2|1|0|0,4", "4|3|2|7,10"]
- B_complement_boundary_K: 15
- A_complement_boundary_K: 10
- quotient_complement_shadow_found: true
- pair_errors: []
- unique_unordered_admitted_pairs: [["11|7|14|23,24", "4|3|2|7,10"], ["13|9|10|28,29", "2|1|0|0,4"]]
- hand_41_assignments_all_valid: true
- full_41_lift_found: false
- anchor_reverse_to_900_map_found: false
- full_g900_admission_found: false
- independent_witness_layer_found: false
- source_native_wxyzti_generator_found: false
- claim_closes_gap_a: false
- terminal_reason: "The admitted four have a quotient complement shadow: B closes under K=15 and A closes under K=10. This supports a complement-readable assignment shadow, not a full 41-seam lift or 900-state map."

## Pair map

- {"A_pair": [7, 3], "B_pair": [11, 4], "C_boundary_sum": 16, "C_pair": [14, 2], "column_pair_sum_options": [[30, 34], [31, 33]], "columns": [23, 24], "handedness_word": "L", "key": "11|7|14|23,24", "partner_columns": [7, 10], "partner_handedness_word": "R", "partner_key": "4|3|2|7,10", "reverse_key_exists": true, "reverse_key_is_admitted": false}
- {"A_pair": [9, 1], "B_pair": [13, 2], "C_boundary_sum": 10, "C_pair": [10, 0], "column_pair_sum_options": [[28, 33], [29, 32]], "columns": [28, 29], "handedness_word": "R", "key": "13|9|10|28,29", "partner_columns": [0, 4], "partner_handedness_word": "R", "partner_key": "2|1|0|0,4", "reverse_key_exists": true, "reverse_key_is_admitted": false}
- {"A_pair": [1, 9], "B_pair": [2, 13], "C_boundary_sum": 10, "C_pair": [0, 10], "column_pair_sum_options": [[28, 33], [29, 32]], "columns": [0, 4], "handedness_word": "R", "key": "2|1|0|0,4", "partner_columns": [28, 29], "partner_handedness_word": "R", "partner_key": "13|9|10|28,29", "reverse_key_exists": true, "reverse_key_is_admitted": false}
- {"A_pair": [3, 7], "B_pair": [4, 11], "C_boundary_sum": 16, "C_pair": [2, 14], "column_pair_sum_options": [[30, 34], [31, 33]], "columns": [7, 10], "handedness_word": "R", "key": "4|3|2|7,10", "partner_columns": [23, 24], "partner_handedness_word": "L", "partner_key": "11|7|14|23,24", "reverse_key_exists": true, "reverse_key_is_admitted": false}

## Checks

- PASS conjecture_loaded: complement_readable_lift_conjecture_recorded
- PASS source_meaning_loaded: sparse_law_source_meaning_boundary_recorded
- PASS anchor_boundary_loaded: anchor_reverse_vs_shared_column_boundary_recorded
- PASS record_count_120: 120
- PASS admitted_count_4: 4
- PASS B_K_15_found: 15
- PASS A_K_10_found: 10
- PASS pairing_no_errors: []
- PASS two_unordered_pairs: [['11|7|14|23,24', '4|3|2|7,10'], ['13|9|10|28,29', '2|1|0|0,4']]
- PASS hand_41_valid: all visible/complement indices in 1..40
- PASS no_full_41_lift: False
- PASS no_900_map: False
- PASS gap_a_not_closed: test only

## Next script

    record_complement_assignment_boundary_001.py
