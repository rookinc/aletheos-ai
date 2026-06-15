# Small 41-seam model from L/R boundary 001

Status: small_41_seam_signature_model_supported_not_full_lift_not_g900

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This searches seam-signature models only on the admitted complement records.
- A seam-signature model is not a full 41-seam lift.
- No 120-to-900 map is constructed.
- No independent witness layer is proven.
- No physical interpretation is claimed.

## Interpretation

- main_result: A small 41-seam signature model was found.
- meaning: The 41-complement atoms can encode the observed complement-pair and L/R-word split on the admitted records.
- why_this_matters: This tests whether the hand-sketch 41 rule has a finite seam-signature shadow beyond mere valid indexing.
- why_not_closure: The model is built only on admitted-record signatures and does not construct a full seam lift, full carrier map, independent witness, or return cycle.
- next_move: Record the small 41-seam model boundary, then search for a 120-to-900 lift map.

## Summary

- search_result: "small_41_seam_signature_model_supported"
- gap_a_status: "open"
- gap_a_closed: false
- field_universe: ["A_plus_1", "B_plus_1", "C_plus_1", "column_0_plus_1", "column_1_plus_1"]
- candidate_count: 31
- supported_candidate_count: 31
- best_candidate: {"directed_signature_count": 4, "directed_signature_words": {"[[[\"A_plus_1\", [10, 31]]], [[\"A_plus_1\", [2, 39]]]]": ["RR"], "[[[\"A_plus_1\", [2, 39]]], [[\"A_plus_1\", [10, 31]]]]": ["RR"], "[[[\"A_plus_1\", [4, 37]]], [[\"A_plus_1\", [8, 33]]]]": ["RL"], "[[[\"A_plus_1\", [8, 33]]], [[\"A_plus_1\", [4, 37]]]]": ["LR"]}, "directed_word_predictive": true, "field_count": 1, "fields": ["A_plus_1"], "pair_class_predictive": true, "pair_signature_classes": {"[[[\"A_plus_1\", [10, 31]]], [[\"A_plus_1\", [2, 39]]]]": ["uniform_R"], "[[[\"A_plus_1\", [4, 37]]], [[\"A_plus_1\", [8, 33]]]]": ["mixed_LR"]}, "pair_signature_count": 2, "seam_atom_count_per_record": 1, "separates_two_pairs": true, "supported_small_41_seam_signature_model": true}
- hand_rule_candidate: "i -> 41 - i"
- quotient_complement_shadow_found: true
- B_complement_boundary_K: 15
- A_complement_boundary_K: 10
- lr_word_layer_candidate_supported: true
- directed_word_counts: {"LR": 1, "RL": 1, "RR": 2}
- word_class_counts: {"mixed_LR": 1, "uniform_R": 1}
- single_global_word_class: false
- admitted_count: 4
- admitted_keys: ["11|7|14|23,24", "13|9|10|28,29", "2|1|0|0,4", "4|3|2|7,10"]
- canonical_sparse_law: "shared_B+reverse_partner"
- source_reading: "anchor-and-reverse transport on oriented length-2 source-shell records"
- all_41_assignments_valid: true
- independent_witness_layer_found: false
- full_41_lift_found: false
- anchor_reverse_to_900_map_found: false
- full_g900_admission_found: false
- source_native_wxyzti_generator_found: false
- claim_closes_gap_a: false
- terminal_reason: "A small 41-seam signature model can carry the complement-pair and L/R-word shadow, but this remains a signature model on admitted records only. It is not a full 41-seam lift, not a 120-to-900 map, not an independent witness, and not full G900."

## Top supported candidates

- {"directed_signature_count": 4, "directed_word_predictive": true, "field_count": 1, "fields": ["A_plus_1"], "pair_class_predictive": true, "pair_signature_count": 2, "separates_two_pairs": true}
- {"directed_signature_count": 4, "directed_word_predictive": true, "field_count": 1, "fields": ["B_plus_1"], "pair_class_predictive": true, "pair_signature_count": 2, "separates_two_pairs": true}
- {"directed_signature_count": 4, "directed_word_predictive": true, "field_count": 1, "fields": ["C_plus_1"], "pair_class_predictive": true, "pair_signature_count": 2, "separates_two_pairs": true}
- {"directed_signature_count": 4, "directed_word_predictive": true, "field_count": 1, "fields": ["column_0_plus_1"], "pair_class_predictive": true, "pair_signature_count": 2, "separates_two_pairs": true}
- {"directed_signature_count": 4, "directed_word_predictive": true, "field_count": 1, "fields": ["column_1_plus_1"], "pair_class_predictive": true, "pair_signature_count": 2, "separates_two_pairs": true}
- {"directed_signature_count": 4, "directed_word_predictive": true, "field_count": 2, "fields": ["A_plus_1", "B_plus_1"], "pair_class_predictive": true, "pair_signature_count": 2, "separates_two_pairs": true}
- {"directed_signature_count": 4, "directed_word_predictive": true, "field_count": 2, "fields": ["A_plus_1", "C_plus_1"], "pair_class_predictive": true, "pair_signature_count": 2, "separates_two_pairs": true}
- {"directed_signature_count": 4, "directed_word_predictive": true, "field_count": 2, "fields": ["A_plus_1", "column_0_plus_1"], "pair_class_predictive": true, "pair_signature_count": 2, "separates_two_pairs": true}
- {"directed_signature_count": 4, "directed_word_predictive": true, "field_count": 2, "fields": ["A_plus_1", "column_1_plus_1"], "pair_class_predictive": true, "pair_signature_count": 2, "separates_two_pairs": true}
- {"directed_signature_count": 4, "directed_word_predictive": true, "field_count": 2, "fields": ["B_plus_1", "C_plus_1"], "pair_class_predictive": true, "pair_signature_count": 2, "separates_two_pairs": true}

## Checks

- PASS lr_boundary_loaded: lr_return_word_boundary_recorded
- PASS lr_test_loaded: lr_return_word_classes_supported_not_independent_witness_not_full_g900
- PASS assignment_loaded: complement_readable_assignments_supported_not_full_lift
- PASS complement_boundary_loaded: complement_assignment_boundary_recorded
- PASS all_41_assignments_valid: True
- PASS candidate_family_nonempty: 31
- PASS small_model_found: supported candidates: 31
- PASS not_independent_witness: False
- PASS no_full_41_lift: False
- PASS no_900_map: False
- PASS full_g900_not_found: False
- PASS gap_a_not_closed: search only

## Next script

    record_small_41_seam_model_boundary_001.py
