# Return-cycle perturbation boundary 001

Status: return_cycle_perturbation_boundary_recorded

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This records perturbation support for transport-specific return evidence.
- Perturbation support is not validated closure.
- Return-candidate existence is not an admission selector by itself.
- No independent witness layer is proven.
- No physical interpretation is claimed.

## Keeper lines

- The return pattern is transport-specific, not selector-specific.
- The grammar matters.
- The admitted starts are not yet independently certified.
- Address shuffles did not reproduce the full model.
- Reverse-edge shuffles did not reproduce the full model.
- Label shuffles did not reproduce the full model.
- Random starts can still have return candidates.
- Return-candidate existence is not an admission selector by itself.
- Transport-specific return evidence is supported.
- Validated closure is still missing.
- No independent witness layer is proven.
- Full G900 remains unproven.
- Gap A remains open.

## Positive results

- The original transport-plus-return model succeeded.
- The result survived as transport-specific under the tested controls.
- Address shuffles had zero full model successes.
- Reverse-edge shuffles had zero full model successes.
- Label shuffles had zero full model successes.
- The tested perturbation run used 200 trials.
- The original model retained 120 unique addresses and zero collisions.

## Negative results

- Random admitted starts were abundant for return candidates.
- Return candidates are not an admission selector by themselves.
- No validated return cycle was found.
- No independent witness layer was found.
- No full 41-seam lift was constructed.
- No full G900 admission was found.
- No source-native WXYZTI generator was derived.
- Gap A was not closed.

## Blocked promotions

- Do not call perturbation support validated closure.
- Do not call return-candidate abundance an admission selector.
- Do not call transport-specific return evidence an independent witness.
- Do not call this full G900.
- Do not call this Gap A closure.
- Do not claim physical interpretation.

## Allowed next work

- Search for a stricter validation predicate.
- Test which features separate admitted return candidates from random-start return candidates.
- Test uniqueness or rarity of the admitted six-edge candidates.
- Search for an independent witness layer over the transport-specific return evidence.
- Search for source-native WXYZTI derivation constrained by the return evidence.

## Interpretation

- main_result: Transport-specific return evidence is supported.
- meaning: The full transport-plus-return model depends on the actual address grammar and anchor-and-reverse labels.
- selector_boundary: Return-candidate existence is not an admission selector by itself because random starts also show return candidates.
- why_this_matters: This separates structured transport-plus-return behavior from generic cycle existence.
- why_not_closure: Perturbation support is not validated closure, not an independent witness, not full 41-seam lift, and not full G900 admission.
- next_move: Search for a stricter validation predicate that separates admitted returns from random-start returns.

## Summary

- record_result: "return_cycle_perturbation_boundary_recorded"
- gap_a_status: "open"
- gap_a_closed: false
- perturbation_test_result: "transport_specific_under_perturbation"
- perturbation_stability_supported: true
- transport_specific_under_controls: true
- candidate_abundant_under_random_starts: true
- trial_count: 200
- random_seed: 410900
- record_count: 120
- admitted_count: 4
- nonadmitted_count: 116
- address_fields: ["B", "C_plus_1"]
- unique_address_count: 120
- collision_count: 0
- shared_B_edge_count: 420
- reverse_partner_edge_count: 60
- anchor_reverse_union_edge_count: 480
- original_model_success: true
- original_transport: {"reverse_partner_coordinate_swap_preserved": true, "reverse_partner_edge_count": 60, "reverse_swap_failure_count": 0, "shared_B_edge_count": 420, "shared_B_failure_count": 0, "shared_B_slot_preserved": true, "transport_preserved": true, "union_edge_count": 480}
- original_candidates: {"all_both_labels": true, "all_nonadmitted_internal": true, "all_return_to_start_address": true, "candidate_count": 4, "candidate_found_for_all_admitted": true, "cycle_edge_counts": [6, 6, 6, 6], "label_totals": {"reverse_partner": 12, "shared_B": 12}, "max_edge_count": 6, "min_edge_count": 6, "without_candidate": []}
- address_shuffle_transport_success: 0
- address_shuffle_candidate_success: 200
- address_shuffle_model_success: 0
- reverse_edge_shuffle_transport_success: 0
- reverse_edge_shuffle_candidate_success: 41
- reverse_edge_shuffle_model_success: 0
- label_shuffle_transport_success: 0
- label_shuffle_candidate_success: 200
- label_shuffle_model_success: 0
- random_admitted_seed_candidate_success: 200
- return_cycle_candidates_found: true
- return_cycle_candidate_count: 4
- return_cycle_candidate_edge_counts: [6, 6, 6, 6]
- transport_preservation_supported: true
- address_embedding_found: true
- address_embedding_best_fields: ["B", "C_plus_1"]
- validated_return_cycle_found: false
- independent_witness_layer_found: false
- full_41_lift_found: false
- full_g900_admission_found: false
- source_native_wxyzti_generator_found: false
- claim_closes_gap_a: false
- terminal_reason: "The return pattern is transport-specific under the tested controls. The original B plus C_plus_1 address model with anchor-and-reverse transport succeeds, while address shuffles, reverse-edge shuffles, and label shuffles do not reproduce the full transport-plus-return model. However, random admitted starts also show abundant return candidates, so return-candidate existence is not an admission selector by itself. This supports transport-specific return evidence, not validated closure, not an independent witness, not full 41-seam lift, not full G900, and not Gap A closure."

## Checks

- PASS perturbation_loaded: return_candidate_perturbation_tested_transport_specific_not_selector_not_g900
- PASS return_boundary_loaded: return_cycle_candidate_boundary_recorded
- PASS transport_boundary_loaded: transport_preservation_boundary_recorded
- PASS original_model_success: True
- PASS perturbation_supported: True
- PASS transport_specific_controls: True
- PASS address_shuffle_model_zero: 0
- PASS reverse_edge_shuffle_model_zero: 0
- PASS label_shuffle_model_zero: 0
- PASS random_start_abundant_true: True
- PASS random_start_candidate_success_positive: 200
- PASS validated_return_false: False
- PASS full_g900_false: False
- PASS gap_a_not_closed: boundary record only

## Next script

    search_strict_return_validation_predicate_001.py
