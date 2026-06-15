# Strict return validation predicate 001

Status: sharp_return_signature_selector_found_basic_not_found_not_g900

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This searches finite validation predicates only.
- Basic return-only predicates are separated from sharp return signatures and source/context selectors.
- A source/context selector is not an independent return validation predicate.
- No physical interpretation is claimed.

## Interpretation

- main_result: sharp_return_signature_selector_found_basic_not_found_not_g900
- meaning: No basic return-only validation predicate was found.
- why_this_matters: This tests whether return evidence can become a stricter validation predicate rather than merely showing abundant return candidates.
- selector_boundary: If a selector is found only in sharp or context features, it is evidence for structure but not yet an independent return validation predicate.
- why_not_closure: Even an exact finite selector here is not full G900 unless it is independently witnessed and tied to a validated return cycle.
- next_move: Record the strict return validation predicate boundary.

## Selector summary

- strict_basic_return_predicate_found: False
- sharp_return_signature_selector_found: True
- context_selector_found: True
- mixed_selector_found: True

## Best exact selectors

- basic_return: null
- sharp_return: {"accepted_count": 4, "admitted_tuple_count": 4, "admitted_tuples": [["[0, 2, 5, 0, 2, 5, 0]"], ["[10, 13, 11, 10, 13, 11, 10]"], ["[14, 11, 13, 14, 11, 13, 14]"], ["[2, 4, 5, 2, 4, 5, 2]"]], "exact": true, "false_positive_count": 0, "false_positives_first_20": [], "features": ["sharp_fiber_sequence"], "miss_count": 0, "misses": []}
- context: {"accepted_count": 4, "admitted_tuple_count": 4, "admitted_tuples": [["[1, 2, 0]"], ["[3, 4, 2]"], ["[7, 11, 14]"], ["[9, 13, 10]"]], "exact": true, "false_positive_count": 0, "false_positives_first_20": [], "features": ["context_A_B_C"], "miss_count": 0, "misses": []}
- mixed_basic_plus_context: {"accepted_count": 4, "admitted_tuple_count": 4, "admitted_tuples": [["[1, 2, 0]"], ["[3, 4, 2]"], ["[7, 11, 14]"], ["[9, 13, 10]"]], "exact": true, "false_positive_count": 0, "false_positives_first_20": [], "features": ["context_A_B_C"], "miss_count": 0, "misses": []}

## Best near selectors

- basic_return: {"accepted_count": 98, "admitted_tuple_count": 1, "admitted_tuples": [["0"]], "exact": false, "false_positive_count": 94, "false_positives_first_20": ["0|11|7|3,23", "0|1|12|0,6", "0|4|3|1,10", "10|0|11|2,3", "10|0|1|0,2", "10|4|3|10,13", "10|5|12|17,18", "10|5|6|15,17", "10|9|8|25,28", "11|0|4|1,3", "11|1|12|5,6", "11|1|2|4,5", "11|7|6|19,23", "11|8|13|26,27", "11|8|9|25,26", "12|1|0|0,6", "12|1|11|5,6", "12|2|13|8,9", "12|2|3|7,8", "12|5|10|17,18"], "features": ["basic_internal_admitted_count"], "miss_count": 0, "misses": []}
- sharp_return: {"accepted_count": 4, "admitted_tuple_count": 4, "admitted_tuples": [["[0, 2, 5, 0, 2, 5, 0]"], ["[10, 13, 11, 10, 13, 11, 10]"], ["[14, 11, 13, 14, 11, 13, 14]"], ["[2, 4, 5, 2, 4, 5, 2]"]], "exact": true, "false_positive_count": 0, "false_positives_first_20": [], "features": ["sharp_fiber_sequence"], "miss_count": 0, "misses": []}
- context: {"accepted_count": 4, "admitted_tuple_count": 4, "admitted_tuples": [["[1, 2, 0]"], ["[3, 4, 2]"], ["[7, 11, 14]"], ["[9, 13, 10]"]], "exact": true, "false_positive_count": 0, "false_positives_first_20": [], "features": ["context_A_B_C"], "miss_count": 0, "misses": []}
- mixed_basic_plus_context: {"accepted_count": 4, "admitted_tuple_count": 4, "admitted_tuples": [["[1, 2, 0]"], ["[3, 4, 2]"], ["[7, 11, 14]"], ["[9, 13, 10]"]], "exact": true, "false_positive_count": 0, "false_positives_first_20": [], "features": ["context_A_B_C"], "miss_count": 0, "misses": []}

## Checks

- PASS perturbation_boundary_loaded: return_cycle_perturbation_boundary_recorded
- PASS record_count_120: 120
- PASS candidate_for_all_records: 120
- PASS searches_completed: completed
- PASS validated_return_cycle_false: False
- PASS full_g900_false: False
- PASS gap_a_not_closed: search only

## Next script

    record_strict_return_validation_predicate_boundary_001.py
