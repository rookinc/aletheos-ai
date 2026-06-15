# 120-to-900 lift-map search from 41-seam boundary 001

Status: 120_to_900_candidate_address_map_found_not_full_lift_not_g900

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This searches address-map candidates only.
- An address map is not a full 41-seam lift.
- An address map is not transport closure.
- No independent witness layer is proven.
- No physical interpretation is claimed.

## Interpretation

- main_result: A candidate 120-to-900 address map was found.
- meaning: The 120-record carrier can be embedded into a 900-address frame by tested finite coordinates, but this is not yet a lift with transport.
- why_this_matters: This tests whether the sharp 41-seam selector can participate in a larger 900-address frame.
- why_not_closure: An address map is not a full lift. It lacks transport closure, return cycle, source-native WXYZTI generation, and independent witness.
- next_move: Record the 120-to-900 address-map boundary, then test transport preservation on the candidate map.

## Summary

- search_result: "120_to_900_candidate_address_map_found"
- gap_a_status: "open"
- gap_a_closed: false
- record_count: 120
- admitted_count: 4
- nonadmitted_count: 116
- address_space_size: 900
- prior_900_payload_seen: true
- prior_900_payload_hit_count: 4
- sharp_41_selector_fields: ["B_plus_1", "C_plus_1"]
- sharp_41_selector_survived_nonadmitted: true
- sharp_41_selector_false_positives: 0
- sharp_41_selector_misses: 0
- candidate_map_count: 123
- injective_candidate_count: 18
- sharp_seam_injective_candidate_count: 18
- candidate_address_map_found: true
- sharp_seam_candidate_address_map_found: true
- independent_witness_layer_found: false
- full_41_lift_found: false
- anchor_reverse_to_900_map_found: true
- full_g900_admission_found: false
- source_native_wxyzti_generator_found: false
- claim_closes_gap_a: false
- terminal_reason: "A candidate address map from the 120-record carrier into a 900-address space was found. This is an address embedding candidate only. It does not construct the full 41-seam lift, does not prove transport closure, does not provide an independent witness, and does not prove full G900."

## Best candidate

{
  "address_space_size": 900,
  "admitted_address_count": 4,
  "admitted_addresses": [
    120,
    242,
    674,
    790
  ],
  "admitted_addresses_disjoint_from_nonadmitted": true,
  "admitted_nonadmitted_address_overlap": [],
  "candidate_score": [
    0,
    0,
    0,
    0,
    -120,
    1
  ],
  "collision_count": 0,
  "collision_examples_first_10": [],
  "fiber_fields": [
    "C_plus_1"
  ],
  "has_900_address_range": true,
  "injective_on_120": true,
  "mapped_record_count": 120,
  "nonadmitted_address_count": 116,
  "slot_field": "B",
  "unique_address_count": 120,
  "uses_sharp_seam_selector_fields": true
}

## Best injective candidate

{
  "address_space_size": 900,
  "admitted_address_count": 4,
  "admitted_addresses": [
    120,
    242,
    674,
    790
  ],
  "admitted_addresses_disjoint_from_nonadmitted": true,
  "admitted_nonadmitted_address_overlap": [],
  "candidate_score": [
    0,
    0,
    0,
    0,
    -120,
    1
  ],
  "collision_count": 0,
  "collision_examples_first_10": [],
  "fiber_fields": [
    "C_plus_1"
  ],
  "has_900_address_range": true,
  "injective_on_120": true,
  "mapped_record_count": 120,
  "nonadmitted_address_count": 116,
  "slot_field": "B",
  "unique_address_count": 120,
  "uses_sharp_seam_selector_fields": true
}

## Best sharp-seam injective candidate

{
  "address_space_size": 900,
  "admitted_address_count": 4,
  "admitted_addresses": [
    120,
    242,
    674,
    790
  ],
  "admitted_addresses_disjoint_from_nonadmitted": true,
  "admitted_nonadmitted_address_overlap": [],
  "candidate_score": [
    0,
    0,
    0,
    0,
    -120,
    1
  ],
  "collision_count": 0,
  "collision_examples_first_10": [],
  "fiber_fields": [
    "C_plus_1"
  ],
  "has_900_address_range": true,
  "injective_on_120": true,
  "mapped_record_count": 120,
  "nonadmitted_address_count": 116,
  "slot_field": "B",
  "unique_address_count": 120,
  "uses_sharp_seam_selector_fields": true
}

## Checks

- PASS seam_boundary_loaded: 41_seam_nonadmitted_boundary_recorded
- PASS prior_900_loaded: 900_state_lift_candidate_payload_seen_not_constructed_not_full_g900
- PASS record_count_120: 120
- PASS admitted_count_4: 4
- PASS sharp_41_selector_available: ['B_plus_1', 'C_plus_1']
- PASS candidate_family_nonempty: 123
- PASS candidate_map_found: injective candidates: 18
- PASS not_full_41_lift: False
- PASS not_full_g900: False
- PASS gap_a_not_closed: search only

## Next script

    record_120_to_900_address_map_boundary_001.py
