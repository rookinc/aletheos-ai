# 41-seam nonadmitted boundary 001

Status: 41_seam_nonadmitted_boundary_recorded

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This records an exact 41-seam field-signature selector against the 120-record carrier.
- A field-signature selector is not a source-native WXYZTI generator.
- A field-signature selector is not a full 41-seam lift.
- No 120-to-900 map is constructed.
- No independent witness layer is proven.
- No physical interpretation is claimed.

## Keeper lines

- The 41-seam signature survives nonadmitted pressure.
- The sharp selector is B_plus_1 plus C_plus_1.
- The selector accepts the admitted four.
- The selector has zero false positives against the other 116 reconstructed records.
- The admitted-only A_plus_1 result was saturated and local.
- The nonadmitted pressure test sharpens the signal to B_plus_1 plus C_plus_1.
- This is selector evidence, not lift construction.
- No full 41-seam lift is constructed.
- No 120-to-900 map is constructed.
- No independent witness layer is found.
- Full G900 remains unproven.
- Gap A remains open.

## Positive results

- The nonadmitted pressure test was recorded.
- All 120 reconstructed records were tested.
- The admitted four were tested against 116 nonadmitted records.
- An exact 41-seam field-signature selector was found.
- There were 13 exact candidates in the tested field family.
- The minimum exact field count was 2.
- The best exact fields were B_plus_1 and C_plus_1.
- The best selector accepted 4 records with 0 false positives and 0 misses.

## Negative results

- No full 41-seam lift was constructed.
- No 120-to-900 map was constructed.
- No independent witness layer was found.
- No full G900 admission was found.
- No source-native WXYZTI generator was derived.
- Gap A was not closed.

## Blocked promotions

- Do not call a field-signature selector a full lift.
- Do not call B_plus_1 plus C_plus_1 a source-native WXYZTI generator.
- Do not call this a 120-to-900 map.
- Do not call this an independent witness layer.
- Do not call this full G900.
- Do not call this Gap A closure.
- Do not claim physical interpretation.

## Allowed next work

- Search a 120-to-900 lift map using B_plus_1, C_plus_1, complement side, and L/R word fields.
- Stress-test B_plus_1 plus C_plus_1 against shuffled or alternate admitted sets.
- Test whether the selector can be derived from source-native WXYZTI role generation.
- Use the selector as a constraint, not as a conclusion.

## Interpretation

- main_result: An exact 41-seam selector survived the nonadmitted pressure test.
- meaning: B_plus_1 plus C_plus_1 separates the admitted four from all other reconstructed records in the tested 120-record carrier.
- why_this_matters: The seam signal is no longer merely an admitted-only readability artifact.
- why_not_closure: The result is still a field-signature selector. It does not construct the full 41-seam lift, a 120-to-900 map, an independent witness, a source-native WXYZTI generator, or full G900.
- next_move: Search a 120-to-900 lift map using the sharpened seam selector as a constraint.

## Summary

- record_result: "41_seam_nonadmitted_boundary_recorded"
- gap_a_status: "open"
- gap_a_closed: false
- nonadmitted_search_result: "41_seam_exact_selector_found_against_nonadmitted"
- exact_selector_found: true
- exact_selector_count: 13
- minimum_exact_field_count: 2
- record_count: 120
- admitted_count: 4
- nonadmitted_count: 116
- candidate_count: 31
- best_fields: ["B_plus_1", "C_plus_1"]
- best_false_positive_count: 0
- best_miss_count: 0
- best_accepted_count: 4
- best_exact_fields: ["B_plus_1", "C_plus_1"]
- best_exact_field_count: 2
- inherited_admitted_only_saturation_warning: true
- inherited_admitted_only_best_fields: ["A_plus_1"]
- inherited_admitted_only_supported_count: 31
- inherited_admitted_only_candidate_count: 31
- hand_rule_candidate: "i -> 41 - i"
- quotient_complement_shadow_found: true
- B_complement_boundary_K: 15
- A_complement_boundary_K: 10
- lr_word_layer_candidate_supported: true
- directed_word_counts: {"LR": 1, "RL": 1, "RR": 2}
- word_class_counts: {"mixed_LR": 1, "uniform_R": 1}
- independent_witness_layer_found: false
- full_41_lift_found: false
- anchor_reverse_to_900_map_found: false
- full_g900_admission_found: false
- source_native_wxyzti_generator_found: false
- claim_closes_gap_a: false
- terminal_reason: "The 41-seam signature survived nonadmitted pressure: an exact field-signature selector separates the admitted four from the other 116 reconstructed records. The sharp two-field selector is B_plus_1 plus C_plus_1. This is selector evidence, not full 41-seam lift construction, not a 120-to-900 map, not an independent witness, and not full G900."

## Best exact candidate

{
  "accepted_count": 4,
  "admitted_signature_count": 4,
  "admitted_signature_examples": {
    "[[\"B_plus_1\", [12, 29]], [\"C_plus_1\", [15, 26]]]": [
      "11|7|14|23,24"
    ],
    "[[\"B_plus_1\", [14, 27]], [\"C_plus_1\", [11, 30]]]": [
      "13|9|10|28,29"
    ],
    "[[\"B_plus_1\", [3, 38]], [\"C_plus_1\", [1, 40]]]": [
      "2|1|0|0,4"
    ],
    "[[\"B_plus_1\", [5, 36]], [\"C_plus_1\", [3, 38]]]": [
      "4|3|2|7,10"
    ]
  },
  "exact_selector_against_120": true,
  "false_positive_count": 0,
  "false_positive_keys_first_25": [],
  "field_count": 2,
  "fields": [
    "B_plus_1",
    "C_plus_1"
  ],
  "miss_count": 0,
  "miss_keys": []
}

## Checks

- PASS nonadmitted_search_loaded: 41_seam_exact_selector_found_against_nonadmitted_not_full_lift_not_g900
- PASS small_boundary_loaded: small_41_seam_model_boundary_recorded
- PASS lr_boundary_loaded: lr_return_word_boundary_recorded
- PASS complement_boundary_loaded: complement_assignment_boundary_recorded
- PASS assignment_loaded: complement_readable_assignments_supported_not_full_lift
- PASS record_count_120: 120
- PASS admitted_count_4: 4
- PASS nonadmitted_count_116: 116
- PASS exact_selector_found: True
- PASS minimum_exact_field_count_2: 2
- PASS best_fields_BC: ['B_plus_1', 'C_plus_1']
- PASS best_false_positive_zero: 0
- PASS best_miss_zero: 0
- PASS best_accepted_four: 4
- PASS not_independent_witness: False
- PASS no_full_41_lift: False
- PASS no_900_map: False
- PASS full_g900_not_found: False
- PASS gap_a_not_closed: boundary record only

## Next script

    search_120_to_900_lift_map_from_41_seam_boundary_001.py
