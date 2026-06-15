# Independent witness layer search boundary 001

Status: independent_witness_layer_search_boundary_recorded

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This records a negative witness-layer search result.
- Source-shell polarity is a family detector, not independent admission.
- No independent witness layer is proven.
- No physical interpretation is claimed.

## Keeper lines

- Anchor-and-reverse gives a source-facing carrier.
- Source-shell polarity sees the correct eight-record family.
- Source-shell polarity does not independently select the admitted four.
- Proper internalization is still required.
- No strict exact source witness was found.
- No clean independent witness layer was found.
- Full G900 remains unproven.
- Gap A remains open.

## Positive results

- The witness search was recorded.
- The tested family produced zero exact candidates.
- The tested family produced zero strict exact candidates.
- The tested family produced zero clean strict candidates.
- The best near miss was source_shell_polarity=True.
- The best near miss covered all four admitted records.
- The best near miss had four false positives.
- This confirms that polarity alone sees the family but does not close admission.

## Negative results

- No independent witness layer was found.
- No candidate independent witness layer was found.
- No clean source witness was found.
- No full 900-state return cycle was found.
- No full G900 admission was found.
- No source-native WXYZTI generator was derived.
- Gap A was not closed.

## Blocked promotions

- Do not call source-shell polarity an independent witness.
- Do not call proper internalization an independent witness.
- Do not call this full G900.
- Do not call Gap A closed.
- Do not claim physical interpretation.

## Allowed next work

- Search for a 900-state lift from anchor-and-reverse transport.
- Return to WXYZTI generator derivation with anchor-and-reverse as a constraint.
- Search for an external witness layer not based on the same source-shell features.
- Use source-shell polarity as a family detector, not as final admission.

## Interpretation

- main_result: The independent witness layer search failed in the tested source-feature family.
- near_miss: source_shell_polarity=True sees eight records, including the four admitted records, but leaves four false positives.
- meaning: Polarity detects the family. Proper internalization performs the final admission. That is not independent witness.
- why_not_closure: A full G900-style admission still needs an independent witness layer or full 900-state return cycle.
- next_move: Search for a 900-state lift from anchor-and-reverse transport, or return to WXYZTI generator derivation.

## Summary

- record_result: "independent_witness_layer_search_boundary_recorded"
- gap_a_status: "open"
- gap_a_closed: false
- witness_search_result: "no_exact_candidate_found"
- independent_witness_layer_found: false
- candidate_independent_witness_layer_found: false
- candidate_clean_source_witness_found: false
- candidate_atom_count: 4
- exact_candidate_count: 0
- strict_exact_candidate_count: 0
- strict_clean_exact_candidate_count: 0
- source_shell_exact_candidate_count: 0
- best_exact_candidate: null
- best_strict_exact_candidate: null
- best_strict_clean_exact_candidate: null
- best_near_candidate: {"exact_admitted": false, "false_positive_count": 4, "families": ["source_shell"], "feature_count": 1, "features": ["source_shell_polarity=True"], "missed_admitted_count": 0, "quality": "source_shell_dependent_candidate", "strict_allowed": false, "support_count": 8, "support_keys": ["10|9|8|25,28", "11|7|14|23,24", "13|9|10|28,29", "2|1|0|0,4", "4|3|2|7,10", "8|7|6|19,22", "9|5|12|16,18", "9|5|6|15,16"], "uses_modular": false, "uses_source_shell": true}
- best_near_feature: ["source_shell_polarity=True"]
- best_near_support_count: 8
- best_near_false_positive_count: 4
- best_near_missed_admitted_count: 0
- best_near_uses_source_shell: true
- best_near_strict_allowed: false
- canonical_sparse_law: "shared_B+reverse_partner"
- alternate_single_relation_witness: "shared_column"
- anchor_reverse_source_reading: "anchor-and-reverse transport on oriented length-2 source-shell records"
- anchor_reverse_combined_meaning: "within an anchor bucket, vary outgoing two-step records; by reversal, move the anchor to the opposite endpoint; repeat"
- sparse_neighbor_carrier_law_supported: true
- local_g900_shaped_boundary_reached: true
- record_count: 120
- admitted_count: 4
- admitted_keys: ["11|7|14|23,24", "13|9|10|28,29", "2|1|0|0,4", "4|3|2|7,10"]
- full_900_state_return_cycle_found: false
- heuristic_900_return_signal_found: false
- full_g900_admission_found: false
- source_native_wxyzti_generator_found: false
- terminal_reason: "No independent witness layer was found in the tested source-feature family. Source-shell polarity sees the correct eight-record family but does not independently select the admitted four."
- claim_closes_gap_a: false

## Checks

- PASS witness_search_loaded: independent_witness_layer_not_found_source_feature_search_recorded
- PASS comparison_boundary_loaded: anchor_reverse_vs_shared_column_boundary_recorded
- PASS source_meaning_boundary_loaded: sparse_law_source_meaning_boundary_recorded
- PASS sparse_boundary_loaded: sparse_neighbor_carrier_boundary_recorded
- PASS local_boundary_loaded: local_g900_shaped_admission_boundary_recorded
- PASS full_return_search_loaded: full_g900_return_cycle_not_found
- PASS no_exact_candidates: 0
- PASS no_strict_exact_candidates: 0
- PASS no_clean_strict_candidates: 0
- PASS independent_not_found: False
- PASS best_near_source_shell: ['source_shell_polarity=True']
- PASS best_near_support_8: 8
- PASS best_near_false_positive_4: 4
- PASS full_g900_not_found: False
- PASS gap_a_not_closed: boundary record only

## Next script

    search_900_state_lift_from_anchor_reverse_boundary_001.py
