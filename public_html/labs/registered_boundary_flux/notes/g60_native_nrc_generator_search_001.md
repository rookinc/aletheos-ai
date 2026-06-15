# G60-native NRC generator search 001

Status: g60_native_nrc_generator_not_found_in_tested_family

## Keeper

No strict source-field NRC generator was found in the tested family.

## Construction template

- W: "start record"
- X: "reverse_partner(W)"
- Y: "shared_B selection from X using candidate selector"
- Z: "reverse_partner(Y)"
- T: "shared_B selection from Z using candidate selector"
- I: "reverse_partner(T)"
- closure_check: "I shared_B W"
- role_cycle: ["W", "X", "Y", "Z", "T", "I", "W"]
- edge_roles: ["reverse_partner", "shared_B", "reverse_partner", "shared_B", "reverse_partner", "shared_B"]

## Summary

- result: "g60_native_nrc_generator_not_found_in_tested_family"
- record_count: 120
- admitted_count: 4
- source_form_prior_status: "source_native_nrc_wxyzti_witness_form_found"
- strict_source_field_generator_found: false
- address_readable_generator_found: false
- winning_family: null
- winning_exact: null
- winning_accepted_count: null
- winning_false_positive_count: null
- winning_miss_count: null
- local_gap_a_nrc_generator_success: false
- source_native_wxyzti_generator_found: false
- gap_a_closed: false
- full_g900_admission_found: false
- keeper: "No strict source-field NRC generator was found in the tested family."
- next_step: "record_g60_native_nrc_generator_refutation_boundary_001"

## Strict source-field result

- exact_found: false
- selector_pair_count_tested: 2360
- best: {"accepted_count": 4, "accepted_first_20": ["11|7|14|23,24", "13|9|10|28,29", "2|1|0|0,4", "4|3|2|7,10"], "admitted_rows": [{"address_sequence": [674, 851, 853, 794, 791, 673, 674], "center_key": "11|7|14|23,24", "cycle_labels": ["reverse_partner", "shared_B", "reverse_partner", "shared_B", "reverse_partner", "shared_B"], "cycle_nodes": ["11|7|14|23,24", "14|7|11|23,24", "14|3|13|11,12", "13|3|14|11,12", "13|8|11|26,27", "11|8|13|26,27", "11|7|14|23,24"], "edge_count": 6, "is_admitted": true, "label_counts": {"reverse_partner": 3, "shared_B": 3}, "return_to_start_address": true, "return_to_start_key": true, "sharp_fiber_sequence": [14, 11, 13, 14, 11, 13, 14], "slot_sequence": [11, 14, 14, 13, 13, 11, 11]}, {"address_sequence": [790, 613, 612, 730, 733, 792, 790], "center_key": "13|9|10|28,29", "cycle_labels": ["reverse_partner", "shared_B", "reverse_partner", "shared_B", "reverse_partner", "shared_B"], "cycle_nodes": ["13|9|10|28,29", "10|9|13|28,29", "10|5|12|17,18", "12|5|10|17,18", "12|2|13|8,9", "13|2|12|8,9", "13|9|10|28,29"], "edge_count": 6, "is_admitted": true, "label_counts": {"reverse_partner": 3, "shared_B": 3}, "return_to_start_address": true, "return_to_start_key": true, "sharp_fiber_sequence": [10, 13, 12, 10, 13, 12, 10], "slot_sequence": [13, 10, 10, 12, 12, 13, 13]}, {"address_sequence": [120, 2, 5, 300, 302, 125, 120], "center_key": "2|1|0|0,4", "cycle_labels": ["reverse_partner", "shared_B", "reverse_partner", "shared_B", "reverse_partner", "shared_B"], "cycle_nodes": ["2|1|0|0,4", "0|1|2|0,4", "0|10|5|2,17", "5|10|0|2,17", "5|12|2|8,18", "2|12|5|8,18", "2|1|0|0,4"], "edge_count": 6, "is_admitted": true, "label_counts": {"reverse_partner": 3, "shared_B": 3}, "return_to_start_address": true, "return_to_start_key": true, "sharp_fiber_sequence": [0, 2, 5, 0, 2, 5, 0], "slot_sequence": [2, 0, 0, 5, 5, 2, 2]}, {"address_sequence": [242, 124, 125, 302, 304, 245, 242], "center_key": "4|3|2|7,10", "cycle_labels": ["reverse_partner", "shared_B", "reverse_partner", "shared_B", "reverse_partner", "shared_B"], "cycle_nodes": ["4|3|2|7,10", "2|3|4|7,10", "2|12|5|8,18", "5|12|2|8,18", "5|10|4|13,17", "4|10|5|13,17", "4|3|2|7,10"], "edge_count": 6, "is_admitted": true, "label_counts": {"reverse_partner": 3, "shared_B": 3}, "return_to_start_address": true, "return_to_start_key": true, "sharp_fiber_sequence": [2, 4, 5, 2, 4, 5, 2], "slot_sequence": [4, 2, 2, 5, 5, 4, 4]}], "admitted_trace_class": [[0, 2, 5, 0, 2, 5, 0], [2, 4, 5, 2, 4, 5, 2], [10, 13, 12, 10, 13, 12, 10], [14, 11, 13, 14, 11, 13, 14]], "exact": false, "false_positive_count": 0, "false_positives_first_20": [], "family": "strict_source_field", "generated_count": 80, "miss_count": 0, "misses": [], "missing_count": 40, "spec_xy": [{"direction": "desc", "field": "dA_to_start_B"}], "spec_zt": [{"direction": "asc", "field": "dC_to_start_B"}]}

## Address-readable result

- exact_found: false
- selector_pair_count_tested: 3128
- best: {"accepted_count": 4, "accepted_first_20": ["11|7|14|23,24", "13|9|10|28,29", "2|1|0|0,4", "4|3|2|7,10"], "admitted_rows": [{"address_sequence": [674, 851, 853, 794, 791, 673, 674], "center_key": "11|7|14|23,24", "cycle_labels": ["reverse_partner", "shared_B", "reverse_partner", "shared_B", "reverse_partner", "shared_B"], "cycle_nodes": ["11|7|14|23,24", "14|7|11|23,24", "14|3|13|11,12", "13|3|14|11,12", "13|8|11|26,27", "11|8|13|26,27", "11|7|14|23,24"], "edge_count": 6, "is_admitted": true, "label_counts": {"reverse_partner": 3, "shared_B": 3}, "return_to_start_address": true, "return_to_start_key": true, "sharp_fiber_sequence": [14, 11, 13, 14, 11, 13, 14], "slot_sequence": [11, 14, 14, 13, 13, 11, 11]}, {"address_sequence": [790, 613, 612, 730, 733, 792, 790], "center_key": "13|9|10|28,29", "cycle_labels": ["reverse_partner", "shared_B", "reverse_partner", "shared_B", "reverse_partner", "shared_B"], "cycle_nodes": ["13|9|10|28,29", "10|9|13|28,29", "10|5|12|17,18", "12|5|10|17,18", "12|2|13|8,9", "13|2|12|8,9", "13|9|10|28,29"], "edge_count": 6, "is_admitted": true, "label_counts": {"reverse_partner": 3, "shared_B": 3}, "return_to_start_address": true, "return_to_start_key": true, "sharp_fiber_sequence": [10, 13, 12, 10, 13, 12, 10], "slot_sequence": [13, 10, 10, 12, 12, 13, 13]}, {"address_sequence": [120, 2, 5, 300, 302, 125, 120], "center_key": "2|1|0|0,4", "cycle_labels": ["reverse_partner", "shared_B", "reverse_partner", "shared_B", "reverse_partner", "shared_B"], "cycle_nodes": ["2|1|0|0,4", "0|1|2|0,4", "0|10|5|2,17", "5|10|0|2,17", "5|12|2|8,18", "2|12|5|8,18", "2|1|0|0,4"], "edge_count": 6, "is_admitted": true, "label_counts": {"reverse_partner": 3, "shared_B": 3}, "return_to_start_address": true, "return_to_start_key": true, "sharp_fiber_sequence": [0, 2, 5, 0, 2, 5, 0], "slot_sequence": [2, 0, 0, 5, 5, 2, 2]}, {"address_sequence": [242, 124, 125, 302, 304, 245, 242], "center_key": "4|3|2|7,10", "cycle_labels": ["reverse_partner", "shared_B", "reverse_partner", "shared_B", "reverse_partner", "shared_B"], "cycle_nodes": ["4|3|2|7,10", "2|3|4|7,10", "2|12|5|8,18", "5|12|2|8,18", "5|10|4|13,17", "4|10|5|13,17", "4|3|2|7,10"], "edge_count": 6, "is_admitted": true, "label_counts": {"reverse_partner": 3, "shared_B": 3}, "return_to_start_address": true, "return_to_start_key": true, "sharp_fiber_sequence": [2, 4, 5, 2, 4, 5, 2], "slot_sequence": [4, 2, 2, 5, 5, 4, 4]}], "admitted_trace_class": [[0, 2, 5, 0, 2, 5, 0], [2, 4, 5, 2, 4, 5, 2], [10, 13, 12, 10, 13, 12, 10], [14, 11, 13, 14, 11, 13, 14]], "exact": false, "false_positive_count": 0, "false_positives_first_20": [], "family": "address_readable_source_field", "generated_count": 80, "miss_count": 0, "misses": [], "missing_count": 40, "spec_xy": [{"direction": "desc", "field": "dA_to_start_B"}], "spec_zt": [{"direction": "asc", "field": "dC_to_start_B"}]}

## Boundary

- This search does not use the admitted label to build candidate cycles.
- Exactness is evaluated only after generation.
- Strict source-field success is a local NRC generator milestone.
- Even strict success does not by itself prove full G900.
- Gap A full closure remains false until the generator is tied back to the canonical G60/AT4val[60,6] source object.

## Checks

- PASS source_form_loaded: source_native_nrc_wxyzti_witness_form_found
- PASS boundary_loaded: admission_blind_nrc_witness_boundary_recorded
- PASS record_count_120: 120
- PASS admitted_count_4: 4
- PASS strict_search_completed: 2360
- PASS status_consistent: g60_native_nrc_generator_not_found_in_tested_family
- PASS full_g900_false: False
