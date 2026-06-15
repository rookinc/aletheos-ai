# 41-seam against nonadmitted records 001

Status: 41_seam_exact_selector_found_against_nonadmitted_not_full_lift_not_g900

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This tests 41-seam field signatures against the 120-record carrier.
- A field-signature selector is not a source-native WXYZTI generator.
- A field-signature selector is not a full 41-seam lift.
- No 120-to-900 map is constructed.
- No independent witness layer is proven.
- No physical interpretation is claimed.

## Interpretation

- main_result: An exact 41-seam field-signature selector was found against the nonadmitted records.
- meaning: The seam signature can separate the admitted four from the other 116 records under at least one tested field subset.
- why_this_matters: This is the first pressure test after the admitted-only saturation warning.
- why_not_closure: The test is still a signature selector over reconstructed records. It does not construct a source-native WXYZTI generator, a 41-seam lift, a 120-to-900 map, an independent witness, or full G900.
- next_move: Record the nonadmitted pressure-test boundary.

## Summary

- search_result: "41_seam_exact_selector_found_against_nonadmitted"
- gap_a_status: "open"
- gap_a_closed: false
- record_count: 120
- admitted_count: 4
- nonadmitted_count: 116
- field_universe: ["A_plus_1", "B_plus_1", "C_plus_1", "column_0_plus_1", "column_1_plus_1"]
- candidate_count: 31
- exact_selector_found: true
- exact_selector_count: 13
- minimum_exact_field_count: 2
- full_field_exact_selector: true
- inherited_small_41_supported: true
- inherited_saturation_warning: true
- inherited_best_fields: ["A_plus_1"]
- inherited_supported_candidate_count: 31
- inherited_candidate_count: 31
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
- terminal_reason: "The 41-seam signature was pressure-tested against all 120 reconstructed records. At least one exact signature selector exists against nonadmitted records, but this remains a field-signature selector, not a full 41-seam lift, not a 120-to-900 map, and not full G900."

## Best candidate by false positive

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

## Top candidates by false positive

- {"accepted_count": 4, "exact_selector_against_120": true, "false_positive_count": 0, "field_count": 2, "fields": ["B_plus_1", "C_plus_1"], "miss_count": 0}
- {"accepted_count": 4, "exact_selector_against_120": true, "false_positive_count": 0, "field_count": 3, "fields": ["A_plus_1", "B_plus_1", "C_plus_1"], "miss_count": 0}
- {"accepted_count": 4, "exact_selector_against_120": true, "false_positive_count": 0, "field_count": 3, "fields": ["A_plus_1", "B_plus_1", "column_0_plus_1"], "miss_count": 0}
- {"accepted_count": 4, "exact_selector_against_120": true, "false_positive_count": 0, "field_count": 3, "fields": ["B_plus_1", "C_plus_1", "column_0_plus_1"], "miss_count": 0}
- {"accepted_count": 4, "exact_selector_against_120": true, "false_positive_count": 0, "field_count": 3, "fields": ["B_plus_1", "C_plus_1", "column_1_plus_1"], "miss_count": 0}
- {"accepted_count": 4, "exact_selector_against_120": true, "false_positive_count": 0, "field_count": 3, "fields": ["B_plus_1", "column_0_plus_1", "column_1_plus_1"], "miss_count": 0}
- {"accepted_count": 4, "exact_selector_against_120": true, "false_positive_count": 0, "field_count": 3, "fields": ["C_plus_1", "column_0_plus_1", "column_1_plus_1"], "miss_count": 0}
- {"accepted_count": 4, "exact_selector_against_120": true, "false_positive_count": 0, "field_count": 4, "fields": ["A_plus_1", "B_plus_1", "C_plus_1", "column_0_plus_1"], "miss_count": 0}
- {"accepted_count": 4, "exact_selector_against_120": true, "false_positive_count": 0, "field_count": 4, "fields": ["A_plus_1", "B_plus_1", "C_plus_1", "column_1_plus_1"], "miss_count": 0}
- {"accepted_count": 4, "exact_selector_against_120": true, "false_positive_count": 0, "field_count": 4, "fields": ["A_plus_1", "B_plus_1", "column_0_plus_1", "column_1_plus_1"], "miss_count": 0}

## Checks

- PASS small_boundary_loaded: small_41_seam_model_boundary_recorded
- PASS assignment_loaded: complement_readable_assignments_supported_not_full_lift
- PASS record_count_120: 120
- PASS admitted_count_4: 4
- PASS candidate_count_31: 31
- PASS best_candidate_exists: {'fields': ['B_plus_1', 'C_plus_1'], 'field_count': 2, 'admitted_signature_count': 4, 'accepted_count': 4, 'false_positive_count': 0, 'miss_count': 0, 'exact_selector_against_120': True, 'false_positive_keys_first_25': [], 'miss_keys': [], 'admitted_signature_examples': {'[["B_plus_1", [3, 38]], ["C_plus_1", [1, 40]]]': ['2|1|0|0,4'], '[["B_plus_1", [5, 36]], ["C_plus_1", [3, 38]]]': ['4|3|2|7,10'], '[["B_plus_1", [12, 29]], ["C_plus_1", [15, 26]]]': ['11|7|14|23,24'], '[["B_plus_1", [14, 27]], ["C_plus_1", [11, 30]]]': ['13|9|10|28,29']}}
- PASS no_misses_in_best: 0
- PASS pressure_test_recorded: nonadmitted comparison completed
- PASS not_independent_witness: False
- PASS no_full_41_lift: False
- PASS no_900_map: False
- PASS full_g900_not_found: False
- PASS gap_a_not_closed: search only

## Next script

    record_41_seam_nonadmitted_boundary_001.py
