# Complement assignment boundary 001

Status: complement_assignment_boundary_recorded

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This records a quotient complement-readable shadow on the admitted four.
- A quotient complement shadow is not a full 41-seam lift.
- No 120-to-900 map is constructed.
- No independent witness layer is proven.
- No physical interpretation is claimed.

## Keeper lines

- The lift is not from 120 to 900 by counting.
- The lift is through complement-readable return.
- The admitted four already show a quotient complement shadow.
- B labels close under i -> 15 - i.
- A labels close under i -> 10 - i.
- The hand-sketch rule i -> 41 - i remains an indexing conjecture.
- A quotient complement shadow is not a full 41-seam lift.
- No 120-to-900 map has been constructed.
- Full G900 remains unproven.
- Gap A remains open.

## Positive results

- The complement-assignment test was recorded.
- The admitted four pair into two complement-readable pairs.
- B complement boundary K=15 was found.
- A complement boundary K=10 was found.
- No pair errors were recorded.
- The hand 41 assignments were valid as index assignments.
- The result gives an executable shadow of the hand-sketch conjecture.

## Negative results

- No full 41-seam lift was constructed.
- No 120-to-900 lift map was constructed.
- No full 900-state return cycle was found.
- No independent witness layer was found.
- No full G900 admission was found.
- No source-native WXYZTI generator was derived.
- Gap A was not closed.

## Blocked promotions

- Do not call a quotient complement shadow a full lift.
- Do not call hand 41 validity a 900-state map.
- Do not call this full G900.
- Do not call this Gap A closure.
- Do not claim physical interpretation.

## Allowed next work

- Test L/R return-word classes on the admitted records.
- Build a small complement-seam model using i -> 41 - i.
- Search for a 120-to-900 map using anchor, complement side, and L/R word fields.
- Return to WXYZTI generator derivation with complement-readability as a constraint.

## Summary

- record_result: "complement_assignment_boundary_recorded"
- gap_a_status: "open"
- gap_a_closed: false
- assignment_test_result: "complement_readable_assignment_candidate_supported"
- quotient_complement_shadow_found: true
- hand_rule_candidate: "i -> 41 - i"
- B_complement_boundary_K: 15
- A_complement_boundary_K: 10
- unique_unordered_admitted_pairs: [["11|7|14|23,24", "4|3|2|7,10"], ["13|9|10|28,29", "2|1|0|0,4"]]
- pair_errors: []
- hand_41_assignments_all_valid: true
- canonical_sparse_law: "shared_B+reverse_partner"
- source_reading: "anchor-and-reverse transport on oriented length-2 source-shell records"
- admitted_count: 4
- admitted_keys: ["11|7|14|23,24", "13|9|10|28,29", "2|1|0|0,4", "4|3|2|7,10"]
- full_41_lift_found: false
- anchor_reverse_to_900_map_found: false
- full_g900_admission_found: false
- independent_witness_layer_found: false
- source_native_wxyzti_generator_found: false
- claim_closes_gap_a: false
- terminal_reason: "The admitted four support a quotient complement shadow, but no full 41-seam lift, 120-to-900 map, independent witness layer, or full G900 admission has been constructed."

## Checks

- PASS assignment_loaded: complement_readable_assignments_supported_not_full_lift
- PASS quotient_shadow_supported: True
- PASS B_K_15: 15
- PASS A_K_10: 10
- PASS pair_errors_empty: []
- PASS hand_41_valid: True
- PASS no_full_41_lift: False
- PASS no_900_map: False
- PASS full_g900_not_found: False
- PASS gap_a_not_closed: boundary record only

## Next script

    test_lr_return_word_classes_from_complement_boundary_001.py
