# Source-native NRC WXYZTI to channel join alignment 001

Status: source_native_nrc_wxyzti_channel_alignment_needs_bridge

## Summary

- join_loaded: "channel_aware_g60_g15_join_constructed"
- forms_loaded_from_key: "wxyzti_admitted_forms"
- form_count: 4
- station_total: 28
- edge_total: 24
- fully_addressed_station_count: 0
- edge_resolved_count: 0
- direct_forms_aligned_count: 0
- direct_alignment_possible: false
- edge_channel_counts: {"unresolved": 24}
- label_channel_counts: {"reverse_partner -> unresolved": 12, "shared_B -> unresolved": 12}
- station_key_inventory_top_40: {"A": 28, "B": 28, "C": 28, "C_plus_1": 28, "address_pair_source": 56, "columns": 56, "fiber": 28, "handedness_word": 28, "key": 28, "role": 28, "slot": 28}
- expected_label_channels: {"reverse_partner": "internal_or_local_reciprocal_candidate", "shared_B": "external_or_shared_boundary_candidate"}
- bridge_needed: true
- bridge_reason: "WXYZTI station records do not yet expose a complete direct slot/local or 900-vertex address"
- gap_a_closed: false
- full_g900_admission_found: false
- next_step: "derive_120_record_to_channel_join_bridge"

## Form direct alignment

- form 0: stations=7, addressed=0, edges=6, direct=False
- form 1: stations=7, addressed=0, edges=6, direct=False
- form 2: stations=7, addressed=0, edges=6, direct=False
- form 3: stations=7, addressed=0, edges=6, direct=False

## Boundary

- This attempts WXYZTI-to-channel alignment.
- This does not claim a G60-native NRC generator.
- This does not close Gap A.
- This does not prove full G900.
- If direct alignment is not possible, the next required object is a 120-record-to-(slot,local) bridge.

## Checks

- PASS channel_join_loaded: channel_aware_g60_g15_join_constructed
- PASS source_forms_present: 4
- PASS join_constructed_input: True
- PASS alignment_attempt_recorded: direct_alignment_possible=False
- PASS no_generator_claim_made: alignment inspection only
