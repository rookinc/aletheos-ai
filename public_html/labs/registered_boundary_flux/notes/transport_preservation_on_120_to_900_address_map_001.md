# Transport preservation on 120-to-900 address map 001

Status: transport_preservation_supported_not_closure_not_g900

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This tests transport preservation for source-facing relation classes.
- Transport preservation is not a full return cycle.
- Transport preservation is not an independent witness layer.
- Transport preservation is not a full 41-seam lift.
- No physical interpretation is claimed.

## Interpretation

- main_result: Transport preservation is supported for the 120-to-900 address embedding.
- meaning: The address embedding is no longer just injective: it preserves the two source-facing relation types tested.
- why_this_matters: This is the first test connecting the 900-address frame to anchor-and-reverse transport behavior.
- why_not_closure: Preservation of relation types is not a full return cycle, not an independent witness, not a full 41-seam lift, and not full G900.
- next_move: Record the transport-preservation boundary, then test for return-cycle candidates.

## Summary

- test_result: "transport_preservation_supported"
- gap_a_status: "open"
- gap_a_closed: false
- record_count: 120
- admitted_count: 4
- nonadmitted_count: 116
- address_space_size: 900
- address_fields: ["B", "C_plus_1"]
- unique_address_count: 120
- collision_count: 0
- collision_examples: []
- shared_B_edge_count: 420
- reverse_partner_edge_count: 60
- anchor_reverse_union_edge_count: 480
- shared_B_slot_preserved: true
- reverse_partner_coordinate_swap_preserved: true
- union_connected_from_admitted: true
- admitted_reach_count: 120
- admitted_subgraph_closed: false
- admitted_boundary_edge_count: 32
- address_delta_counts: {"-1": 21, "-10": 8, "-11": 6, "-118": 2, "-12": 1, "-13": 1, "-177": 1, "-2": 24, "-236": 1, "-295": 2, "-3": 17, "-354": 2, "-4": 17, "-413": 2, "-472": 1, "-5": 19, "-531": 5, "-6": 15, "-7": 12, "-708": 2, "-8": 11, "-9": 6, "1": 35, "10": 12, "11": 10, "118": 10, "12": 11, "13": 7, "14": 4, "177": 9, "2": 28, "236": 4, "295": 4, "3": 31, "354": 3, "4": 27, "413": 3, "472": 1, "5": 21, "531": 1, "59": 5, "6": 21, "7": 20, "708": 1, "8": 17, "826": 1, "9": 18}
- transport_preservation_supported: true
- full_transport_closure_found: false
- return_cycle_found: false
- independent_witness_layer_found: false
- full_41_lift_found: false
- full_g900_admission_found: false
- source_native_wxyzti_generator_found: false
- claim_closes_gap_a: false
- terminal_reason: "The B plus C_plus_1 address embedding preserves the sparse anchor-and-reverse transport classes: shared_B preserves address slot and reverse_partner swaps slot/fiber coordinates. The admitted records also expose the whole 120-record carrier through the anchor-and-reverse graph. However, the admitted subgraph is not closed, no return cycle is proven, no independent witness is proven, and full G900 is not proven."

## Checks

- PASS address_boundary_loaded: 120_to_900_address_map_boundary_recorded
- PASS record_count_120: 120
- PASS unique_address_count_120: 120
- PASS collision_count_zero: 0
- PASS shared_B_edges_420: 420
- PASS reverse_edges_60: 60
- PASS union_edges_480: 480
- PASS shared_B_slot_preserved: []
- PASS reverse_swap_preserved: []
- PASS union_connected_from_admitted: 120
- PASS admitted_subgraph_not_closed: 32
- PASS transport_supported: True
- PASS full_transport_closure_false: False
- PASS return_cycle_false: False
- PASS full_g900_false: False
- PASS gap_a_not_closed: test only

## Next script

    record_transport_preservation_boundary_001.py
