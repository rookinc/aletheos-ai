# 120-to-900 address map boundary 001

Status: 120_to_900_address_map_boundary_recorded

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This records a candidate address embedding only.
- An address embedding is not transport closure.
- An address embedding is not a full 41-seam lift.
- No independent witness layer is proven.
- No physical interpretation is claimed.

## Keeper lines

- A candidate 120-to-900 address embedding was found.
- The best injective address fields are B plus C_plus_1.
- The map gives 120 unique addresses with zero collisions.
- The sharp 41-seam selector participates in the address embedding.
- This is address evidence, not transport closure.
- An address map is not a full 41-seam lift.
- An address map is not an independent witness.
- An address map is not full G900.
- Gap A remains open.

## Positive results

- The 120-record carrier was embedded into a 900-address frame in the tested coordinate family.
- There were 18 injective candidate maps.
- There were 18 sharp-seam injective candidate maps.
- The best injective map used B and C_plus_1.
- The best injective map produced 120 unique addresses.
- The best injective map had zero collisions.
- The earlier 41-seam selector B_plus_1 plus C_plus_1 survived as part of the address-map context.

## Negative results

- No transport closure was tested or proven.
- No return cycle was tested or proven.
- No full 41-seam lift was constructed.
- No independent witness layer was found.
- No full G900 admission was found.
- No source-native WXYZTI generator was derived.
- Gap A was not closed.

## Blocked promotions

- Do not call an address embedding a transport map.
- Do not call an address embedding a full 41-seam lift.
- Do not call B plus C_plus_1 full G900.
- Do not call this an independent witness layer.
- Do not call this Gap A closure.
- Do not claim physical interpretation.

## Allowed next work

- Test transport preservation on the candidate 120-to-900 address map.
- Test whether anchor-and-reverse edges map to structured address transitions.
- Test whether admitted records form a return-compatible subcycle in the address frame.
- Search for an independent witness layer over the address embedding.
- Use the address map as a constraint, not as a conclusion.

## Interpretation

- main_result: A candidate 120-to-900 address embedding was found.
- meaning: The 120-record carrier can be placed injectively into a 900-address frame using B and C_plus_1.
- why_this_matters: The 41-seam selector is now connected to a larger 900-address frame rather than only a 120-record selector.
- why_not_closure: The result has no transport preservation test, no return cycle, no independent witness layer, and no full G900 admission.
- next_move: Test transport preservation on the candidate address map.

## Summary

- record_result: "120_to_900_address_map_boundary_recorded"
- gap_a_status: "open"
- gap_a_closed: false
- map_search_result: "120_to_900_candidate_address_map_found"
- candidate_address_map_found: true
- sharp_seam_candidate_address_map_found: true
- record_count: 120
- admitted_count: 4
- nonadmitted_count: 116
- address_space_size: 900
- candidate_map_count: 123
- injective_candidate_count: 18
- sharp_seam_injective_candidate_count: 18
- best_injective_fields: ["B", "C_plus_1"]
- best_injective_unique_address_count: 120
- best_injective_collision_count: 0
- best_injective_admitted_address_count: 4
- best_injective_admitted_nonadmitted_overlap: []
- best_sharp_seam_injective_fields: ["B", "C_plus_1"]
- best_sharp_seam_unique_address_count: 120
- best_sharp_seam_collision_count: 0
- sharp_41_selector_fields: ["B_plus_1", "C_plus_1"]
- sharp_41_selector_survived_nonadmitted: true
- sharp_41_selector_false_positives: 0
- sharp_41_selector_misses: 0
- prior_900_payload_seen: true
- prior_900_payload_hit_count: 4
- source_field_anchor_reverse_to_900_map_found: true
- naming_caution: "The source field anchor_reverse_to_900_map_found means candidate address embedding only, not transport closure."
- candidate_address_embedding_found: true
- transport_closure_found: false
- return_cycle_found: false
- independent_witness_layer_found: false
- full_41_lift_found: false
- full_g900_admission_found: false
- source_native_wxyzti_generator_found: false
- claim_closes_gap_a: false
- terminal_reason: "A candidate injective address embedding from the 120-record carrier into a 900-address frame was found. The best injective fields are B plus C_plus_1, with 120 unique addresses and zero collisions. This is address evidence only. It is not transport closure, not a full 41-seam lift, not an independent witness, not full G900, and not Gap A closure."

## Checks

- PASS map_search_loaded: 120_to_900_candidate_address_map_found_not_full_lift_not_g900
- PASS seam_boundary_loaded: 41_seam_nonadmitted_boundary_recorded
- PASS small_boundary_loaded: small_41_seam_model_boundary_recorded
- PASS lr_boundary_loaded: lr_return_word_boundary_recorded
- PASS complement_boundary_loaded: complement_assignment_boundary_recorded
- PASS candidate_address_map_found: True
- PASS injective_count_positive: 18
- PASS sharp_seam_injective_count_positive: 18
- PASS best_fields_B_Cplus1: ['B', 'C_plus_1']
- PASS best_unique_120: 120
- PASS best_collision_zero: 0
- PASS transport_closure_false: False
- PASS return_cycle_false: False
- PASS full_41_lift_false: False
- PASS full_g900_false: False
- PASS gap_a_not_closed: boundary record only

## Next script

    test_transport_preservation_on_120_to_900_address_map_001.py
