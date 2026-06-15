# Proper internalization gate exploration 001

Status: proper_internalization_gate_candidate_found_inside_best_family_not_generator

## Boundary

- This does not close Gap A.
- This tests internal support/return absorption, not direct visibility.
- A gate candidate is weaker than a WXYZTI projection-family generator.
- Neighborhood support features are hypothesis probes and require audit before promotion.
- No physical interpretation is claimed.

## Summary

- exploration_result: "proper_internalization_gate_candidate_found_inside_best_family"
- gap_a_closed: false
- record_count: 8
- best_family_indices: [0, 1, 5, 6, 7]
- common_selected_internal_feature_count: 58
- candidate_report_count: 456837
- best_exact_low_inside_best_family: {"covers_all_selected": true, "exact_selected": true, "features": ["internal:r1:row_hit_count_ge5=True"], "nonselected_indices": [], "nonselected_support_count": 0, "risk_classes": ["low"], "score": 1, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 4, "support_indices": [0, 1, 5, 7], "universe_size": 5}
- best_exact_low_full_universe: {"covers_all_selected": true, "exact_selected": true, "features": ["internal:r1:row_hit_count_ge5=True"], "nonselected_indices": [], "nonselected_support_count": 0, "risk_classes": ["low"], "score": 1, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 4, "support_indices": [0, 1, 5, 7], "universe_size": 8}
- best_exact_any_inside_best_family: {"covers_all_selected": true, "exact_selected": true, "features": ["internal:r1:row_hit_count_ge5=True"], "nonselected_indices": [], "nonselected_support_count": 0, "risk_classes": ["low"], "score": 1, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 4, "support_indices": [0, 1, 5, 7], "universe_size": 5}
- best_exact_any_full_universe: {"covers_all_selected": true, "exact_selected": true, "features": ["internal:r1:row_hit_count_ge5=True"], "nonselected_indices": [], "nonselected_support_count": 0, "risk_classes": ["low"], "score": 1, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 4, "support_indices": [0, 1, 5, 7], "universe_size": 8}
- best_family_low_inside_best_family: {"covers_all_selected": true, "exact_selected": false, "features": ["internal:path_columns_are_A_incident=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- best_family_low_full_universe: {"covers_all_selected": true, "exact_selected": false, "features": ["internal:path_columns_are_A_incident=True"], "nonselected_indices": [2, 3, 4, 6], "nonselected_support_count": 4, "risk_classes": ["low"], "score": 21, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 8, "support_indices": [0, 1, 2, 3, 4, 5, 6, 7], "universe_size": 8}
- best_overall_inside_best_family: {"covers_all_selected": true, "exact_selected": true, "features": ["internal:r1:row_hit_count_ge5=True"], "nonselected_indices": [], "nonselected_support_count": 0, "risk_classes": ["low"], "score": 1, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 4, "support_indices": [0, 1, 5, 7], "universe_size": 5}
- claim_closes_gap_a: false

## Interpretation

- main_result: A low-risk proper-internalization gate candidate was found inside the persistent source/lift family, but it is not yet a generator.
- why_this_matters: This tests the new hypothesis that closure depends on internal absorption into return/support structure rather than direct visibility.
- why_not_closure: An internalization gate candidate inside a five-path family is weaker than a source-native WXYZTI projection-family generator.
- next_move: Audit the proper-internalization gate candidate for lookup risk and source-native meaning.

## Top reports inside best family

- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:path_columns_are_A_incident=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:path_columns_touch_A_incident=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:path_columns_touch_B_incident=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:path_columns_touch_C_incident=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:path_columns_touch_all_BAC=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r0:neighborhood_column_count_ge2=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:B_incident_absorbed=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:B_incident_hit_count_ge1=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:B_incident_hit_count_ge2=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:C_incident_absorbed=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:C_incident_hit_count_ge1=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:C_incident_hit_count_ge2=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:any_support_absorption=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:both_path_columns_reach_support=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:has_interior_support=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:neighborhood_column_count_ge2=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:neighborhood_column_count_ge3=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:neighborhood_column_count_ge4=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:neighborhood_column_count_ge5=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:neighborhood_column_count_ge6=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:neighborhood_column_count_ge8=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:row_hit_count_ge1=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:row_hit_count_ge2=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:row_hit_count_ge3=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:row_hit_count_ge4=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": true, "features": ["internal:r1:row_hit_count_ge5=True"], "nonselected_indices": [], "nonselected_support_count": 0, "risk_classes": ["low"], "score": 1, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 4, "support_indices": [0, 1, 5, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": true, "features": ["internal:r1:row_hit_count_ge6=True"], "nonselected_indices": [], "nonselected_support_count": 0, "risk_classes": ["low"], "score": 1, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 4, "support_indices": [0, 1, 5, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:visible_column_count_ge1=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r1:visible_column_count_ge2=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": true, "features": ["internal:r1:visible_column_count_ge3=True"], "nonselected_indices": [], "nonselected_support_count": 0, "risk_classes": ["low"], "score": 1, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 4, "support_indices": [0, 1, 5, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r2:B_incident_absorbed=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r2:B_incident_hit_count_ge1=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r2:B_incident_hit_count_ge2=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r2:C_incident_absorbed=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r2:C_incident_hit_count_ge1=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r2:C_incident_hit_count_ge2=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r2:any_support_absorption=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r2:both_path_columns_reach_support=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r2:has_interior_support=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}
- {"covers_all_selected": true, "exact_selected": false, "features": ["internal:r2:has_outer_and_interior_support=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "universe_size": 5}

## Claim

- does_this_close_gap_a: false
- does_this_find_proper_internalization_candidate: true
- does_this_find_source_native_generator: false
- short_form: "A low-risk proper-internalization gate candidate was found inside the persistent source/lift family, but it is not yet a generator."
- not_closed_reason: "An internalization gate candidate inside a five-path family is weaker than a source-native WXYZTI projection-family generator."
- next_problem: "Audit the proper-internalization gate candidate for lookup risk and source-native meaning."

## Checks

- PASS marked_boundary_loaded: marked_port_lift_gate_boundary_recorded
- PASS marked_loaded: marked_port_lift_family_signal_persists_no_gate
- PASS projection_search_loaded: source_native_projection_family_generator_search_family_signal_persists_no_generator
- PASS candidate_audit_loaded: gap_a_polarity_aware_odd_hinge_candidate_survives_lookup_audit_not_generator
- PASS plateau_loaded: gap_a_open_with_source_shell_lift_conjecture_recorded
- PASS records_loaded: 8
- PASS best_family_size_5: 5
- PASS selected_in_best_count_4: 4
- PASS gap_a_not_closed: proper internalization exploration only

## Next script

    audit_proper_internalization_gate_candidate_001.py
