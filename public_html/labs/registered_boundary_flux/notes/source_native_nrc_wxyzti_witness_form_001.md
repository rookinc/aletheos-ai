# Source-native NRC WXYZTI witness form 001

Status: source_native_nrc_wxyzti_witness_form_found

## Keeper

The admission-blind reciprocal trace has a WXYZTI witness form over source fields.

## Claim

The admitted admission-blind NRC cycles are six-edge WXYZTI witness forms whose transitions are source-field checks: shared_B preserves source anchor B, and reverse_partner reciprocates the oriented record.

## Summary

- result: "source_native_nrc_wxyzti_witness_form_found"
- source_field_record_count: 120
- nrc_constructed_count: 120
- missing_nrc_count: 0
- admitted_count: 4
- wxyzti_forms_for_admitted_count: 4
- all_admitted_forms_are_six_edge_hex_witnesses: true
- all_wxyzti_forms_source_native: true
- exact_over_120_record_carrier: true
- accepted_count: 4
- false_positive_count: 0
- miss_count: 0
- admitted_trace_class: [[0, 2, 5, 0, 2, 5, 0], [2, 4, 5, 2, 4, 5, 2], [10, 13, 1, 10, 13, 1, 10], [14, 11, 2, 14, 11, 2, 14]]
- diad_label_totals: {"reverse_partner": 12}
- coupler_label_totals: {"shared_B": 12}
- source_native_wxyzti_witness_form_found: true
- source_native_wxyzti_generator_found: false
- gap_a_closed: false
- full_g900_admission_found: false
- keeper: "The admission-blind reciprocal trace has a WXYZTI witness form over source fields."
- next_step: "derive_or_refute_g60_native_nrc_generator"

## Construction inputs

- record_language: "oriented length-2 source records B-A-C with source column pair"
- relations: ["shared_B", "reverse_partner"]
- address_readout: "B + C_plus_1"
- role_cycle: ["W", "X", "Y", "Z", "T", "I", "W"]
- edge_roles: ["WX", "XY", "YZ", "ZT", "TI", "IW"]

## Boundary

- This is a source-field WXYZTI witness form, not yet a G60-native generator.
- This does not close Gap A.
- This does not prove full G900.
- This does not claim physical interpretation.

## Admitted WXYZTI forms

- center: 11|7|14|23,24
  sharp_fiber_sequence: [14, 11, 2, 14, 11, 2, 14]
  slot_sequence: [11, 14, 14, 2, 2, 11, 11]
  label_counts: {"reverse_partner": 3, "shared_B": 3}
  station_keys: ["11|7|14|23,24", "14|7|11|23,24", "14|3|2|7,12", "2|3|14|7,12", "2|1|11|4,5", "11|1|2|4,5", "11|7|14|23,24"]
  edge_labels: ["reverse_partner", "shared_B", "reverse_partner", "shared_B", "reverse_partner", "shared_B"]
- center: 13|9|10|28,29
  sharp_fiber_sequence: [10, 13, 1, 10, 13, 1, 10]
  slot_sequence: [13, 10, 10, 1, 1, 13, 13]
  label_counts: {"reverse_partner": 3, "shared_B": 3}
  station_keys: ["13|9|10|28,29", "10|9|13|28,29", "10|0|1|0,2", "1|0|10|0,2", "1|2|13|4,9", "13|2|1|4,9", "13|9|10|28,29"]
  edge_labels: ["reverse_partner", "shared_B", "reverse_partner", "shared_B", "reverse_partner", "shared_B"]
- center: 2|1|0|0,4
  sharp_fiber_sequence: [0, 2, 5, 0, 2, 5, 0]
  slot_sequence: [2, 0, 0, 5, 5, 2, 2]
  label_counts: {"reverse_partner": 3, "shared_B": 3}
  station_keys: ["2|1|0|0,4", "0|1|2|0,4", "0|10|5|2,17", "5|10|0|2,17", "5|12|2|8,18", "2|12|5|8,18", "2|1|0|0,4"]
  edge_labels: ["reverse_partner", "shared_B", "reverse_partner", "shared_B", "reverse_partner", "shared_B"]
- center: 4|3|2|7,10
  sharp_fiber_sequence: [2, 4, 5, 2, 4, 5, 2]
  slot_sequence: [4, 2, 2, 5, 5, 4, 4]
  label_counts: {"reverse_partner": 3, "shared_B": 3}
  station_keys: ["4|3|2|7,10", "2|3|4|7,10", "2|12|5|8,18", "5|12|2|8,18", "5|10|4|13,17", "4|10|5|13,17", "4|3|2|7,10"]
  edge_labels: ["reverse_partner", "shared_B", "reverse_partner", "shared_B", "reverse_partner", "shared_B"]

## Checks

- PASS boundary_loaded: admission_blind_nrc_witness_boundary_recorded
- PASS prior_nrc_exact: True
- PASS source_field_record_count_120: 120
- PASS nrc_for_all_120: [120, 0]
- PASS admitted_forms_4: 4
- PASS admitted_edge_counts_all_6: [6, 6, 6, 6]
- PASS wxyzti_forms_valid: True
- PASS source_transitions_valid: [True, True, True, True]
- PASS exact_true: True
- PASS false_pos_zero: []
- PASS miss_zero: []
- PASS gap_a_open: False
