# L/R return-word boundary 001

Status: lr_return_word_boundary_recorded

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This records an L/R return-word shadow on the admitted complement pairs.
- The L/R layer is not an independent witness layer.
- No 41-seam lift or 120-to-900 map is constructed.
- No physical interpretation is claimed.

## Keeper lines

- The complement-readable shadow has a handedness layer.
- The handedness layer splits into mixed_LR and uniform_R.
- That is structure, not closure.
- The L/R return-word layer is supported as a shadow.
- The L/R layer is not an independent witness.
- No full 41-seam lift is constructed.
- No 120-to-900 map is constructed.
- Full G900 remains unproven.
- Gap A remains open.

## Positive results

- The L/R return-word test was recorded.
- The admitted complement pairs produce two pair classes.
- All return words are nonzero.
- The L/R word layer candidate is supported.
- The directed word counts were LR=1, RL=1, RR=2.
- The word class counts were mixed_LR=1 and uniform_R=1.

## Negative results

- No single global L/R word class was found.
- No single-word witness was found.
- No independent witness layer was found.
- No full 41-seam lift was constructed.
- No 120-to-900 map was constructed.
- No full G900 admission was found.
- Gap A was not closed.

## Blocked promotions

- Do not call the L/R word layer an independent witness.
- Do not call mixed handedness closure.
- Do not call this a full 41-seam lift.
- Do not call this full G900.
- Do not call this Gap A closure.
- Do not claim physical interpretation.

## Allowed next work

- Search a small 41-seam model from the complement and L/R boundary.
- Search a 120-to-900 lift map using anchor, complement side, and L/R word fields.
- Return to WXYZTI generator derivation with complement-readability and L/R handedness as constraints.

## Interpretation

- main_result: The admitted complement pairs carry a bounded L/R return-word shadow.
- meaning: The complement-readable assignment has handedness structure, but it splits into mixed_LR and uniform_R.
- why_this_matters: This gives the complement-readable lift conjecture a second executable shadow after the quotient complement pairing.
- why_not_closure: The L/R layer does not produce a single independent witness word, a full 41-seam lift, a 120-to-900 map, or full G900.
- next_move: Search a small 41-seam model, or search a 120-to-900 lift map.

## Summary

- record_result: "lr_return_word_boundary_recorded"
- gap_a_status: "open"
- gap_a_closed: false
- lr_test_result: "lr_return_word_classes_supported"
- lr_word_layer_candidate_supported: true
- pair_count: 2
- directed_word_counts: {"LR": 1, "RL": 1, "RR": 2}
- word_class_counts: {"mixed_LR": 1, "uniform_R": 1}
- unique_word_classes: ["mixed_LR", "uniform_R"]
- single_global_word_class: false
- single_word_witness_found: false
- quotient_complement_shadow_found: true
- B_complement_boundary_K: 15
- A_complement_boundary_K: 10
- hand_rule_candidate: "i -> 41 - i"
- canonical_sparse_law: "shared_B+reverse_partner"
- source_reading: "anchor-and-reverse transport on oriented length-2 source-shell records"
- admitted_count: 4
- admitted_keys: ["11|7|14|23,24", "13|9|10|28,29", "2|1|0|0,4", "4|3|2|7,10"]
- conjecture_name: "Complement-Readable Lift Conjecture"
- conjecture_short_form: "The lift is not from 120 to 900 by counting. The lift is through complement-readable return."
- independent_witness_layer_found: false
- full_41_lift_found: false
- anchor_reverse_to_900_map_found: false
- full_g900_admission_found: false
- source_native_wxyzti_generator_found: false
- terminal_reason: "The admitted complement pairs carry L/R return-word classes, but the handedness layer splits into mixed_LR and uniform_R. This is structure, not closure."
- claim_closes_gap_a: false

## Pair reports

- {"A_pairs": [[7, 3], [3, 7]], "B_pairs": [[11, 4], [4, 11]], "C_pairs": [[14, 2], [2, 14]], "all_words_nonzero": true, "column_pair_sum_options": [[[30, 34], [31, 33]], [[30, 34], [31, 33]]], "directed_words": ["LR", "RL"], "letters": ["L", "R"], "reciprocal_rows_present": true, "row_count": 2, "unordered_pair": ["11|7|14|23,24", "4|3|2|7,10"], "word_class": "mixed_LR"}
- {"A_pairs": [[9, 1], [1, 9]], "B_pairs": [[13, 2], [2, 13]], "C_pairs": [[10, 0], [0, 10]], "all_words_nonzero": true, "column_pair_sum_options": [[[28, 33], [29, 32]], [[28, 33], [29, 32]]], "directed_words": ["RR"], "letters": ["R"], "reciprocal_rows_present": true, "row_count": 2, "unordered_pair": ["13|9|10|28,29", "2|1|0|0,4"], "word_class": "uniform_R"}

## Checks

- PASS lr_loaded: lr_return_word_classes_supported_not_independent_witness_not_full_g900
- PASS complement_boundary_loaded: complement_assignment_boundary_recorded
- PASS assignment_loaded: complement_readable_assignments_supported_not_full_lift
- PASS conjecture_loaded: complement_readable_lift_conjecture_recorded
- PASS pair_count_2: 2
- PASS lr_candidate_supported: True
- PASS single_global_false: False
- PASS single_word_witness_false: False
- PASS independent_witness_false: False
- PASS full_41_lift_false: False
- PASS no_900_map: False
- PASS full_g900_not_found: False
- PASS gap_a_not_closed: boundary record only

## Next script

    search_small_41_seam_model_from_lr_boundary_001.py
