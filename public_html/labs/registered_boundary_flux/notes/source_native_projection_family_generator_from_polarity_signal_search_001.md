# Source-native projection-family generator from polarity signal search 001

Status: source_native_projection_family_generator_search_family_signal_persists_no_generator

## Boundary

- This does not close Gap A.
- This searches within the lookup-safe polarity family.
- Exact subselectors are not automatically generators.
- Projection-family features are coarse role-class visibility features, not row ids.
- No physical interpretation is claimed.

## Summary

- search_result: "family_signal_persists_but_no_generator"
- gap_a_closed: false
- record_count: 8
- selected_count: 4
- nonselected_count: 4
- common_selected_feature_count: 9
- candidate_report_count: 129
- best_overall: {"covers_all_selected": true, "exact_selected": false, "features": ["source:p900_candidate0_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 4, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- best_exact_source: null
- best_exact_projection: null
- best_family_source: {"covers_all_selected": true, "exact_selected": false, "features": ["source:p900_candidate0_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 4, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- best_family_projection: null
- claim_closes_gap_a: false

## Interpretation

- main_result: The polarity family persists as a family signal, but no generator candidate was found.
- why_this_matters: The test asks whether the lookup-safe polarity family can be upgraded from classification to a projection-family generator candidate.
- why_not_closure: A subselector inside an 8-path family is still weaker than deriving the WXYZTI projection-family generator from source law.
- next_move: Record the polarity family as a strong non-generator signal.

## Top reports

- {"covers_all_selected": true, "exact_selected": false, "features": ["source:p900_candidate0_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 4, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:p900_candidate1_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 4, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:A_parity=odd", "source:p900_candidate0_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 5, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:A_parity=odd", "source:p900_candidate1_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 5, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:BA_abs_small=True", "source:p900_candidate0_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 5, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:BA_abs_small=True", "source:p900_candidate1_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 5, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:BA_sign=neg", "source:p900_candidate0_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 5, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:BA_sign=neg", "source:p900_candidate1_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 5, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:BC_abs_2_or_3=True", "source:p900_candidate0_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 5, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:BC_abs_2_or_3=True", "source:p900_candidate1_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 5, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:C_parity=even", "source:p900_candidate0_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 5, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:C_parity=even", "source:p900_candidate1_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 5, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:p900_candidate0_edge_law:sector_delta_abs_small=True", "source:p900_candidate0_edge_law:sector_delta_signs=['pos','pos']"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 5, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:p900_candidate0_edge_law:sector_delta_abs_small=True", "source:p900_candidate1_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 5, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:p900_candidate0_edge_law:sector_delta_abs_small=True", "source:p900_candidate1_edge_law:sector_delta_signs=['pos','pos']"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 5, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:p900_candidate0_edge_law:sector_delta_signs=['pos','pos']", "source:p900_candidate1_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 5, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:p900_candidate1_edge_law:sector_delta_abs_small=True", "source:p900_candidate1_edge_law:sector_delta_signs=['pos','pos']"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 5, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:A_parity=odd", "source:BA_abs_small=True", "source:p900_candidate0_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:A_parity=odd", "source:BA_abs_small=True", "source:p900_candidate1_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:A_parity=odd", "source:BA_sign=neg", "source:p900_candidate0_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:A_parity=odd", "source:BA_sign=neg", "source:p900_candidate1_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:A_parity=odd", "source:BC_abs_2_or_3=True", "source:p900_candidate0_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:A_parity=odd", "source:BC_abs_2_or_3=True", "source:p900_candidate1_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:A_parity=odd", "source:C_parity=even", "source:p900_candidate0_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:A_parity=odd", "source:C_parity=even", "source:p900_candidate1_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:A_parity=odd", "source:p900_candidate0_edge_law:sector_delta_abs_small=True", "source:p900_candidate0_edge_law:sector_delta_signs=['pos','pos']"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:A_parity=odd", "source:p900_candidate0_edge_law:sector_delta_abs_small=True", "source:p900_candidate1_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:A_parity=odd", "source:p900_candidate0_edge_law:sector_delta_abs_small=True", "source:p900_candidate1_edge_law:sector_delta_signs=['pos','pos']"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:A_parity=odd", "source:p900_candidate0_edge_law:sector_delta_signs=['pos','pos']", "source:p900_candidate1_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:A_parity=odd", "source:p900_candidate1_edge_law:sector_delta_abs_small=True", "source:p900_candidate1_edge_law:sector_delta_signs=['pos','pos']"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}

## Claim

- does_this_close_gap_a: false
- does_this_find_exact_source_subselector: false
- does_this_find_exact_projection_subselector: false
- does_this_find_generator: false
- short_form: "The polarity family persists as a family signal, but no generator candidate was found."
- not_closed_reason: "A subselector inside an 8-path family is still weaker than deriving the WXYZTI projection-family generator from source law."
- next_problem: "Record the polarity family as a strong non-generator signal."

## Checks

- PASS polarity_audit_loaded: gap_a_polarity_aware_odd_hinge_candidate_survives_lookup_audit_not_generator
- PASS polarity_search_loaded: gap_a_polarity_aware_odd_hinge_family_candidate_found_not_generator
- PASS odd_audit_loaded: gap_a_odd_hinge_source_shell_audit_enriched_not_generator
- PASS abc_loaded: source_shell_signed_abc_primitives_extracted_odd_hinge_signal_found_not_generator
- PASS branch_loaded: source_shell_projection_family_generator_branch_started
- PASS records_loaded: 8
- PASS selected_count_4: 4
- PASS nonselected_count_4: 4
- PASS no_lookup_in_common_features: ok
- PASS gap_a_not_closed: projection family search only

## Next script

    record_polarity_family_non_generator_boundary_001.py
