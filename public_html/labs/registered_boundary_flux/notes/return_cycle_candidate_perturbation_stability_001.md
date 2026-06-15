# Return-cycle candidate perturbation stability 001

Status: return_candidate_perturbation_tested_transport_specific_not_selector_not_g900

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This tests perturbation behavior of return-cycle candidates.
- Perturbation stability is not full return-cycle validation.
- Return candidates are not an admission selector by themselves.
- No independent witness layer is proven.
- No physical interpretation is claimed.

## Interpretation

- main_result: Return evidence is transport-specific under the tested perturbations.
- meaning: The result depends on the actual B plus C_plus_1 address grammar and anchor-and-reverse relation labels.
- selector_boundary: Return candidates are not an admission selector by themselves because random admitted starts may also show return-shaped candidates.
- why_this_matters: This separates transport-specific structure from mere cycle existence.
- why_not_closure: Perturbation stability is not a validated full return cycle, independent witness, full 41-seam lift, or full G900 admission.
- next_move: Record the perturbation-stability boundary, then search for a stricter validation predicate.

## Summary

- test_result: "transport_specific_under_perturbation"
- gap_a_status: "open"
- gap_a_closed: false
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
- control_counts: {"address_shuffle": {"candidate_success": 200, "model_success": 0, "transport_success": 0}, "label_shuffle": {"candidate_success": 200, "model_success": 0, "transport_success": 0}, "random_admitted_seed": {"candidate_success": 200}, "reverse_edge_shuffle": {"candidate_success": 41, "model_success": 0, "transport_success": 0}}
- transport_specific_under_controls: true
- candidate_abundant_under_random_starts: true
- perturbation_stability_supported: true
- validated_return_cycle_found: false
- independent_witness_layer_found: false
- full_41_lift_found: false
- full_g900_admission_found: false
- source_native_wxyzti_generator_found: false
- claim_closes_gap_a: false
- terminal_reason: "The original transport-preserving address model succeeds, while address shuffles, reverse-edge shuffles, and label shuffles did not reproduce the full transport-plus-return model in the tested trials. However, random admitted starts can still have return-shaped candidates, so the return-candidate property is not a selector by itself. This supports transport-specific return evidence, not validated closure, not an independent witness, not full G900, and not Gap A closure."

## Control examples

- address_shuffle_success_first: null
- reverse_edge_shuffle_success_first: null
- label_shuffle_success_first: null
- random_admitted_seed_success_first: {"edge_counts": [6, 6, 6, 6], "starts": ["13|9|10|28,29", "4|10|5|13,17", "8|9|10|25,28", "9|8|11|25,26"], "trial": 1}

## Checks

- PASS return_boundary_loaded: return_cycle_candidate_boundary_recorded
- PASS return_candidates_loaded: return_cycle_candidates_found_not_validated_not_g900
- PASS record_count_120: 120
- PASS unique_addresses_120: 120
- PASS collision_zero: 0
- PASS original_model_success: True
- PASS original_candidates_all_admitted: {'candidate_found_for_all_admitted': True, 'candidate_count': 4, 'without_candidate': [], 'cycle_edge_counts': [6, 6, 6, 6], 'min_edge_count': 6, 'max_edge_count': 6, 'label_totals': {'reverse_partner': 12, 'shared_B': 12}, 'all_return_to_start_address': True, 'all_nonadmitted_internal': True, 'all_both_labels': True}
- PASS transport_specific_controls: {'address_shuffle': {'candidate_success': 200, 'model_success': 0, 'transport_success': 0}, 'reverse_edge_shuffle': {'candidate_success': 41, 'model_success': 0, 'transport_success': 0}, 'label_shuffle': {'candidate_success': 200, 'model_success': 0, 'transport_success': 0}, 'random_admitted_seed': {'candidate_success': 200}}
- PASS validated_return_cycle_false: False
- PASS full_g900_false: False
- PASS gap_a_not_closed: test only

## Next script

    record_return_cycle_perturbation_boundary_001.py
