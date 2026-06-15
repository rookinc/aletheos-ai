# Return-cycle candidates in 900-address frame 001

Status: return_cycle_candidates_found_not_validated_not_g900

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This searches return-cycle candidates only.
- A candidate closed walk is not a validated return cycle.
- A candidate closed walk is not an independent witness layer.
- A candidate closed walk is not a full 41-seam lift.
- No physical interpretation is claimed.

## Interpretation

- main_result: Return-cycle candidates were found for the admitted records.
- meaning: The 900-address frame supports closed candidate walks that leave the admitted record, pass through the carrier, and return to the same address.
- why_this_matters: This is the first return-shaped test after transport preservation.
- why_not_closure: A candidate closed walk is not a validated return cycle, independent witness, full 41-seam lift, or full G900 admission.
- next_move: Record the return-cycle candidate boundary, then test whether the candidates are stable under perturbation.

## Summary

- search_result: "return_cycle_candidates_found"
- gap_a_status: "open"
- gap_a_closed: false
- record_count: 120
- admitted_count: 4
- nonadmitted_count: 116
- address_fields: ["B", "C_plus_1"]
- unique_address_count: 120
- collision_count: 0
- shared_B_edge_count: 420
- reverse_partner_edge_count: 60
- anchor_reverse_union_edge_count: 480
- return_cycle_candidate_found: true
- candidate_found_for_all_admitted: true
- candidate_count: 4
- admitted_without_candidate: []
- cycle_edge_counts: [6, 6, 6, 6]
- min_cycle_edge_count: 6
- max_cycle_edge_count: 6
- cycle_label_count_totals: {"reverse_partner": 12, "shared_B": 12}
- all_candidates_return_to_start_address: true
- all_candidates_contain_nonadmitted_internal_node: true
- all_candidates_contain_both_transport_labels: true
- transport_preservation_supported: true
- admitted_subgraph_closed: false
- validated_return_cycle_found: false
- independent_witness_layer_found: false
- full_41_lift_found: false
- full_g900_admission_found: false
- source_native_wxyzti_generator_found: false
- claim_closes_gap_a: false
- terminal_reason: "Return-cycle candidates were found for all admitted records in the 900-address frame. Each candidate returns to the starting address and uses both shared_B and reverse_partner transport, with at least one nonadmitted internal node. These are candidate cycles only: they are not validated full return cycles, not an independent witness, not full 41-seam lift, and not full G900."

## Best by admitted

- 11|7|14|23,24: {"address_sequence": [674, 851, 853, 794, 791, 673, 674], "contains_both_transport_labels": true, "contains_nonadmitted_internal_node": true, "contains_reverse_partner": true, "contains_shared_B": true, "edge_count": 6, "fiber_sequence": [14, 11, 13, 14, 11, 13, 14], "label_counts": {"reverse_partner": 3, "shared_B": 3}, "labels": ["reverse_partner", "shared_B", "reverse_partner", "shared_B", "reverse_partner", "shared_B"], "net_address_delta": 0, "node_count_with_return": 7, "nodes": ["11|7|14|23,24", "14|7|11|23,24", "14|3|13|11,12", "13|3|14|11,12", "13|8|11|26,27", "11|8|13|26,27", "11|7|14|23,24"], "returns_to_start_address": true, "returns_to_start_key": true, "slot_sequence": [11, 14, 14, 13, 13, 11, 11], "start_key": "11|7|14|23,24"}
- 13|9|10|28,29: {"address_sequence": [790, 613, 611, 670, 673, 791, 790], "contains_both_transport_labels": true, "contains_nonadmitted_internal_node": true, "contains_reverse_partner": true, "contains_shared_B": true, "edge_count": 6, "fiber_sequence": [10, 13, 11, 10, 13, 11, 10], "label_counts": {"reverse_partner": 3, "shared_B": 3}, "labels": ["reverse_partner", "shared_B", "reverse_partner", "shared_B", "reverse_partner", "shared_B"], "net_address_delta": 0, "node_count_with_return": 7, "nodes": ["13|9|10|28,29", "10|9|13|28,29", "10|0|11|2,3", "11|0|10|2,3", "11|8|13|26,27", "13|8|11|26,27", "13|9|10|28,29"], "returns_to_start_address": true, "returns_to_start_key": true, "slot_sequence": [13, 10, 10, 11, 11, 13, 13], "start_key": "13|9|10|28,29"}
- 2|1|0|0,4: {"address_sequence": [120, 2, 5, 300, 302, 125, 120], "contains_both_transport_labels": true, "contains_nonadmitted_internal_node": true, "contains_reverse_partner": true, "contains_shared_B": true, "edge_count": 6, "fiber_sequence": [0, 2, 5, 0, 2, 5, 0], "label_counts": {"reverse_partner": 3, "shared_B": 3}, "labels": ["reverse_partner", "shared_B", "reverse_partner", "shared_B", "reverse_partner", "shared_B"], "net_address_delta": 0, "node_count_with_return": 7, "nodes": ["2|1|0|0,4", "0|1|2|0,4", "0|10|5|2,17", "5|10|0|2,17", "5|12|2|8,18", "2|12|5|8,18", "2|1|0|0,4"], "returns_to_start_address": true, "returns_to_start_key": true, "slot_sequence": [2, 0, 0, 5, 5, 2, 2], "start_key": "2|1|0|0,4"}
- 4|3|2|7,10: {"address_sequence": [242, 124, 125, 302, 304, 245, 242], "contains_both_transport_labels": true, "contains_nonadmitted_internal_node": true, "contains_reverse_partner": true, "contains_shared_B": true, "edge_count": 6, "fiber_sequence": [2, 4, 5, 2, 4, 5, 2], "label_counts": {"reverse_partner": 3, "shared_B": 3}, "labels": ["reverse_partner", "shared_B", "reverse_partner", "shared_B", "reverse_partner", "shared_B"], "net_address_delta": 0, "node_count_with_return": 7, "nodes": ["4|3|2|7,10", "2|3|4|7,10", "2|12|5|8,18", "5|12|2|8,18", "5|10|4|13,17", "4|10|5|13,17", "4|3|2|7,10"], "returns_to_start_address": true, "returns_to_start_key": true, "slot_sequence": [4, 2, 2, 5, 5, 4, 4], "start_key": "4|3|2|7,10"}

## Checks

- PASS transport_boundary_loaded: transport_preservation_boundary_recorded
- PASS record_count_120: 120
- PASS unique_addresses_120: 120
- PASS collision_zero: 0
- PASS shared_B_edges_420: 420
- PASS reverse_edges_60: 60
- PASS union_edges_480: 480
- PASS candidate_found_for_all_admitted: []
- PASS all_return_to_start_address: True
- PASS all_contain_nonadmitted_internal: True
- PASS all_contain_both_transport_labels: True
- PASS validated_return_cycle_false: False
- PASS full_g900_false: False
- PASS gap_a_not_closed: search only

## Next script

    record_return_cycle_candidate_boundary_001.py
