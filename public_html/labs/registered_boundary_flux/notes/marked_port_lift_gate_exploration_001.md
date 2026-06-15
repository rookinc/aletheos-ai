# Marked-port lift gate exploration 001

Status: marked_port_lift_family_signal_persists_no_gate

## Boundary

- This does not close Gap A.
- This is a drawing-inspired marked-port/lift exploration.
- Port residue features are scratch hypotheses, not proof.
- Projection-dependent candidates are not source-native.
- A gate candidate is weaker than a WXYZTI projection-family generator.
- No physical interpretation is claimed.

## Summary

- exploration_result: "marked_port_lift_family_signal_persists_no_gate"
- gap_a_closed: false
- record_count: 8
- selected_count: 4
- nonselected_count: 4
- common_selected_feature_count: 13
- candidate_report_count: 1092
- best_overall: {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_abs_small=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "uses_projection_feature": false}
- best_exact_low_no_projection: null
- best_exact_no_projection: null
- best_exact_with_projection: null
- best_family_low_no_projection: {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_abs_small=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "uses_projection_feature": false}
- claim_closes_gap_a: false

## Interpretation

- main_result: A marked-port/lift family signal persists, but no exact gate was found.
- why_this_matters: This tests the drawing-inspired idea that admission depends on port alignment plus lift/twist state, not visibility alone.
- why_not_closure: A gate candidate or family signal is still weaker than deriving the source-native WXYZTI projection-family generator.
- next_move: Record the marked-port/lift boundary and return to a broader source-native generator hypothesis.

## Top reports

- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_abs_small=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_same_sign=True"], "nonselected_indices": [4, 6], "nonselected_support_count": 2, "risk_classes": ["low"], "score": 11, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 6, "support_indices": [0, 1, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_sign_sig=['pos','pos']"], "nonselected_indices": [4, 6], "nonselected_support_count": 2, "risk_classes": ["low"], "score": 11, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 6, "support_indices": [0, 1, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate1_edge_law:sector_delta_abs_small=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate1_edge_law:sector_delta_same_sign=True"], "nonselected_indices": [4, 6], "nonselected_support_count": 2, "risk_classes": ["low"], "score": 11, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 6, "support_indices": [0, 1, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate1_edge_law:sector_delta_sign_sig=['pos','pos']"], "nonselected_indices": [4, 6], "nonselected_support_count": 2, "risk_classes": ["low"], "score": 11, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 6, "support_indices": [0, 1, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["port:AC_abs_is_1_or_7=True"], "nonselected_indices": [2, 3, 4, 6], "nonselected_support_count": 4, "risk_classes": ["low"], "score": 21, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 8, "support_indices": [0, 1, 2, 3, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["port:BA_abs_is_1_or_4=True"], "nonselected_indices": [2, 3, 4, 6], "nonselected_support_count": 4, "risk_classes": ["low"], "score": 21, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 8, "support_indices": [0, 1, 2, 3, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:A_odd=True"], "nonselected_indices": [2, 3, 4, 6], "nonselected_support_count": 4, "risk_classes": ["low"], "score": 21, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 8, "support_indices": [0, 1, 2, 3, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:BA_abs_small=True"], "nonselected_indices": [2, 3, 4, 6], "nonselected_support_count": 4, "risk_classes": ["low"], "score": 21, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 8, "support_indices": [0, 1, 2, 3, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:BA_neg=True"], "nonselected_indices": [2, 3, 4, 6], "nonselected_support_count": 4, "risk_classes": ["low"], "score": 21, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 8, "support_indices": [0, 1, 2, 3, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:BC_abs_2_or_3=True"], "nonselected_indices": [2, 3, 4, 6], "nonselected_support_count": 4, "risk_classes": ["low"], "score": 21, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 8, "support_indices": [0, 1, 2, 3, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["source:C_even=True"], "nonselected_indices": [2, 3, 4, 6], "nonselected_support_count": 4, "risk_classes": ["low"], "score": 21, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 8, "support_indices": [0, 1, 2, 3, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_abs_small=True", "lift:p900_candidate0_edge_law:sector_delta_same_sign=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 7, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_abs_small=True", "lift:p900_candidate0_edge_law:sector_delta_sign_sig=['pos','pos']"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 7, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_abs_small=True", "lift:p900_candidate1_edge_law:sector_delta_abs_small=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 7, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_abs_small=True", "lift:p900_candidate1_edge_law:sector_delta_same_sign=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 7, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_abs_small=True", "lift:p900_candidate1_edge_law:sector_delta_sign_sig=['pos','pos']"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 7, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_abs_small=True", "port:AC_abs_is_1_or_7=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 7, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_abs_small=True", "port:BA_abs_is_1_or_4=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 7, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_abs_small=True", "source:A_odd=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 7, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_abs_small=True", "source:BA_abs_small=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 7, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_abs_small=True", "source:BA_neg=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 7, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_abs_small=True", "source:BC_abs_2_or_3=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 7, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_abs_small=True", "source:C_even=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 7, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_same_sign=True", "lift:p900_candidate0_edge_law:sector_delta_sign_sig=['pos','pos']"], "nonselected_indices": [4, 6], "nonselected_support_count": 2, "risk_classes": ["low"], "score": 12, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 6, "support_indices": [0, 1, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_same_sign=True", "lift:p900_candidate1_edge_law:sector_delta_abs_small=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 7, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_same_sign=True", "lift:p900_candidate1_edge_law:sector_delta_same_sign=True"], "nonselected_indices": [4, 6], "nonselected_support_count": 2, "risk_classes": ["low"], "score": 12, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 6, "support_indices": [0, 1, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_same_sign=True", "lift:p900_candidate1_edge_law:sector_delta_sign_sig=['pos','pos']"], "nonselected_indices": [4, 6], "nonselected_support_count": 2, "risk_classes": ["low"], "score": 12, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 6, "support_indices": [0, 1, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_same_sign=True", "port:AC_abs_is_1_or_7=True"], "nonselected_indices": [4, 6], "nonselected_support_count": 2, "risk_classes": ["low"], "score": 12, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 6, "support_indices": [0, 1, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_same_sign=True", "port:BA_abs_is_1_or_4=True"], "nonselected_indices": [4, 6], "nonselected_support_count": 2, "risk_classes": ["low"], "score": 12, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 6, "support_indices": [0, 1, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_same_sign=True", "source:A_odd=True"], "nonselected_indices": [4, 6], "nonselected_support_count": 2, "risk_classes": ["low"], "score": 12, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 6, "support_indices": [0, 1, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_same_sign=True", "source:BA_abs_small=True"], "nonselected_indices": [4, 6], "nonselected_support_count": 2, "risk_classes": ["low"], "score": 12, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 6, "support_indices": [0, 1, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_same_sign=True", "source:BA_neg=True"], "nonselected_indices": [4, 6], "nonselected_support_count": 2, "risk_classes": ["low"], "score": 12, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 6, "support_indices": [0, 1, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_same_sign=True", "source:BC_abs_2_or_3=True"], "nonselected_indices": [4, 6], "nonselected_support_count": 2, "risk_classes": ["low"], "score": 12, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 6, "support_indices": [0, 1, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_same_sign=True", "source:C_even=True"], "nonselected_indices": [4, 6], "nonselected_support_count": 2, "risk_classes": ["low"], "score": 12, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 6, "support_indices": [0, 1, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_sign_sig=['pos','pos']", "lift:p900_candidate1_edge_law:sector_delta_abs_small=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 7, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_sign_sig=['pos','pos']", "lift:p900_candidate1_edge_law:sector_delta_same_sign=True"], "nonselected_indices": [4, 6], "nonselected_support_count": 2, "risk_classes": ["low"], "score": 12, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 6, "support_indices": [0, 1, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_sign_sig=['pos','pos']", "lift:p900_candidate1_edge_law:sector_delta_sign_sig=['pos','pos']"], "nonselected_indices": [4, 6], "nonselected_support_count": 2, "risk_classes": ["low"], "score": 12, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 6, "support_indices": [0, 1, 4, 5, 6, 7], "uses_projection_feature": false}
- {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_sign_sig=['pos','pos']", "port:AC_abs_is_1_or_7=True"], "nonselected_indices": [4, 6], "nonselected_support_count": 2, "risk_classes": ["low"], "score": 12, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 6, "support_indices": [0, 1, 4, 5, 6, 7], "uses_projection_feature": false}

## Claim

- does_this_close_gap_a: false
- does_this_find_marked_port_lift_candidate: false
- does_this_find_source_native_generator: false
- short_form: "A marked-port/lift family signal persists, but no exact gate was found."
- not_closed_reason: "A gate candidate or family signal is still weaker than deriving the source-native WXYZTI projection-family generator."
- next_problem: "Record the marked-port/lift boundary and return to a broader source-native generator hypothesis."

## Checks

- PASS reverse_visibility_loaded: reverse_gap_a_visibility_gate_not_found
- PASS companion_loaded: polarity_family_nonselected_companion_inspected_no_neighbor_candidate
- PASS projection_search_loaded: source_native_projection_family_generator_search_family_signal_persists_no_generator
- PASS candidate_audit_loaded: gap_a_polarity_aware_odd_hinge_candidate_survives_lookup_audit_not_generator
- PASS plateau_loaded: gap_a_open_with_source_shell_lift_conjecture_recorded
- PASS records_loaded: 8
- PASS selected_count_4: 4
- PASS nonselected_count_4: 4
- PASS gap_a_not_closed: marked-port lift exploration only

## Next script

    record_marked_port_lift_gate_boundary_001.py
