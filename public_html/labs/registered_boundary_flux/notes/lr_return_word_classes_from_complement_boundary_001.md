# L/R return-word classes from complement boundary 001

Status: lr_return_word_classes_supported_not_independent_witness_not_full_g900

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This tests L/R return-word shadows on the admitted complement pairs.
- L/R classes are not an independent witness layer by themselves.
- No 41-seam lift or 120-to-900 map is constructed.
- No physical interpretation is claimed.

## Interpretation

- main_result: The admitted complement pairs carry a bounded L/R return-word shadow.
- meaning: The complement assignment has a handedness layer, but it is not yet an independent witness.
- why_this_matters: This gives the complement-readable lift conjecture a second executable shadow after the B/A complement pairing.
- why_not_closure: The L/R word classes do not construct a 41-seam lift, 900-state map, return cycle, or independent witness.
- next_move: Record the L/R return-word boundary.

## Summary

- test_result: "lr_return_word_classes_supported"
- gap_a_status: "open"
- gap_a_closed: false
- hand_rule_candidate: "i -> 41 - i"
- canonical_sparse_law: "shared_B+reverse_partner"
- source_reading: "anchor-and-reverse transport on oriented length-2 source-shell records"
- admitted_count: 4
- admitted_keys: ["11|7|14|23,24", "13|9|10|28,29", "2|1|0|0,4", "4|3|2|7,10"]
- quotient_complement_shadow_found: true
- B_complement_boundary_K: 15
- A_complement_boundary_K: 10
- pair_count: 2
- reciprocal_pair_rows_ok: true
- all_return_words_nonzero: true
- directed_word_counts: {"LR": 1, "RL": 1, "RR": 2}
- word_class_counts: {"mixed_LR": 1, "uniform_R": 1}
- unique_word_classes: ["mixed_LR", "uniform_R"]
- single_global_word_class: false
- lr_word_layer_candidate_supported: true
- single_word_witness_found: false
- independent_witness_layer_found: false
- full_41_lift_found: false
- anchor_reverse_to_900_map_found: false
- full_g900_admission_found: false
- source_native_wxyzti_generator_found: false
- claim_closes_gap_a: false
- terminal_reason: "The admitted complement pairs carry L/R return-word classes, but the classes do not yet form an independent witness layer or a full lift."

## Pair reports

- {"A_pairs": [[7, 3], [3, 7]], "B_pairs": [[11, 4], [4, 11]], "C_pairs": [[14, 2], [2, 14]], "all_words_nonzero": true, "column_pair_sum_options": [[[30, 34], [31, 33]], [[30, 34], [31, 33]]], "directed_words": ["LR", "RL"], "letters": ["L", "R"], "reciprocal_rows_present": true, "row_count": 2, "unordered_pair": ["11|7|14|23,24", "4|3|2|7,10"], "word_class": "mixed_LR"}
- {"A_pairs": [[9, 1], [1, 9]], "B_pairs": [[13, 2], [2, 13]], "C_pairs": [[10, 0], [0, 10]], "all_words_nonzero": true, "column_pair_sum_options": [[[28, 33], [29, 32]], [[28, 33], [29, 32]]], "directed_words": ["RR"], "letters": ["R"], "reciprocal_rows_present": true, "row_count": 2, "unordered_pair": ["13|9|10|28,29", "2|1|0|0,4"], "word_class": "uniform_R"}

## Checks

- PASS assignment_loaded: complement_readable_assignments_supported_not_full_lift
- PASS boundary_loaded: complement_assignment_boundary_recorded
- PASS admitted_count_4: 4
- PASS pair_count_2: 2
- PASS reciprocal_pair_rows: [{'unordered_pair': ['11|7|14|23,24', '4|3|2|7,10'], 'row_count': 2, 'directed_words': ['LR', 'RL'], 'word_class': 'mixed_LR', 'letters': ['L', 'R'], 'B_pairs': [[11, 4], [4, 11]], 'A_pairs': [[7, 3], [3, 7]], 'C_pairs': [[14, 2], [2, 14]], 'column_pair_sum_options': [[[30, 34], [31, 33]], [[30, 34], [31, 33]]], 'reciprocal_rows_present': True, 'all_words_nonzero': True}, {'unordered_pair': ['13|9|10|28,29', '2|1|0|0,4'], 'row_count': 2, 'directed_words': ['RR'], 'word_class': 'uniform_R', 'letters': ['R'], 'B_pairs': [[13, 2], [2, 13]], 'A_pairs': [[9, 1], [1, 9]], 'C_pairs': [[10, 0], [0, 10]], 'column_pair_sum_options': [[[28, 33], [29, 32]], [[28, 33], [29, 32]]], 'reciprocal_rows_present': True, 'all_words_nonzero': True}]
- PASS all_words_nonzero: {'LR': 1, 'RL': 1, 'RR': 2}
- PASS lr_candidate_supported: ['mixed_LR', 'uniform_R']
- PASS not_independent_witness: False
- PASS no_full_41_lift: False
- PASS no_900_map: False
- PASS full_g900_not_found: False
- PASS gap_a_not_closed: test only

## Next script

    record_lr_return_word_boundary_001.py
