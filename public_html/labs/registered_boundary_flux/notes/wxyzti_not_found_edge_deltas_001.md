# WXYZTI not-found edge deltas 001

Status: wxyzti_not_found_edge_deltas_recorded

## Summary

- forms_key: "wxyzti_admitted_forms"
- form_count: 4
- edge_count: 24
- label_counts: {"reverse_partner": 12, "shared_B": 12}
- pattern_counts: {"same_A|same_edge_columns|same_station_columns": 12, "same_B|same_slot": 12}
- role_pattern_counts: {"reverse_partner :: same_A|same_edge_columns|same_station_columns": 12, "shared_B :: same_B|same_slot": 12}
- project16_edge_law_match: true
- previous_wiring_bridge_success: false
- interpretation: "WXYZTI edges are not literal X_sigma carrier edges. They appear to be source-native transport relations over station provenance fields."
- gap_a_closed: false
- full_g900_admission_found: false
- next_step: "classify_wxyzti_relations_as_source_native_transport_overlay"

## Edge compact

- form 0 edge 0 WX reverse_partner: slot_delta=3, local_delta=57, pattern=same_A|same_edge_columns|same_station_columns
- form 0 edge 1 XY shared_B: slot_delta=0, local_delta=51, pattern=same_B|same_slot
- form 0 edge 2 YZ reverse_partner: slot_delta=3, local_delta=12, pattern=same_A|same_edge_columns|same_station_columns
- form 0 edge 3 ZT shared_B: slot_delta=0, local_delta=57, pattern=same_B|same_slot
- form 0 edge 4 TI reverse_partner: slot_delta=9, local_delta=51, pattern=same_A|same_edge_columns|same_station_columns
- form 0 edge 5 IW shared_B: slot_delta=0, local_delta=12, pattern=same_B|same_slot
- form 1 edge 0 WX reverse_partner: slot_delta=12, local_delta=3, pattern=same_A|same_edge_columns|same_station_columns
- form 1 edge 1 XY shared_B: slot_delta=0, local_delta=48, pattern=same_B|same_slot
- form 1 edge 2 YZ reverse_partner: slot_delta=6, local_delta=9, pattern=same_A|same_edge_columns|same_station_columns
- form 1 edge 3 ZT shared_B: slot_delta=0, local_delta=3, pattern=same_B|same_slot
- form 1 edge 4 TI reverse_partner: slot_delta=12, local_delta=48, pattern=same_A|same_edge_columns|same_station_columns
- form 1 edge 5 IW shared_B: slot_delta=0, local_delta=9, pattern=same_B|same_slot
- form 2 edge 0 WX reverse_partner: slot_delta=13, local_delta=2, pattern=same_A|same_edge_columns|same_station_columns
- form 2 edge 1 XY shared_B: slot_delta=0, local_delta=3, pattern=same_B|same_slot
- form 2 edge 2 YZ reverse_partner: slot_delta=5, local_delta=55, pattern=same_A|same_edge_columns|same_station_columns
- form 2 edge 3 ZT shared_B: slot_delta=0, local_delta=2, pattern=same_B|same_slot
- form 2 edge 4 TI reverse_partner: slot_delta=12, local_delta=3, pattern=same_A|same_edge_columns|same_station_columns
- form 2 edge 5 IW shared_B: slot_delta=0, local_delta=55, pattern=same_B|same_slot
- form 3 edge 0 WX reverse_partner: slot_delta=13, local_delta=2, pattern=same_A|same_edge_columns|same_station_columns
- form 3 edge 1 XY shared_B: slot_delta=0, local_delta=1, pattern=same_B|same_slot
- form 3 edge 2 YZ reverse_partner: slot_delta=3, local_delta=57, pattern=same_A|same_edge_columns|same_station_columns
- form 3 edge 3 ZT shared_B: slot_delta=0, local_delta=2, pattern=same_B|same_slot
- form 3 edge 4 TI reverse_partner: slot_delta=14, local_delta=1, pattern=same_A|same_edge_columns|same_station_columns
- form 3 edge 5 IW shared_B: slot_delta=0, local_delta=57, pattern=same_B|same_slot

## Checks

- PASS forms_present: 4
- PASS edge_reports_present: 24
- PASS labels_split_12_12: {'reverse_partner': 12, 'shared_B': 12}
- PASS project16_edge_law_match_loaded: True
- PASS wiring_bridge_failed_as_expected: False
- PASS delta_inspection_recorded: inspection only
