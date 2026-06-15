# Polarity family nonselected companion inspection 001

Status: polarity_family_nonselected_companion_inspected_no_neighbor_candidate

## Boundary

- This does not close Gap A.
- This inspects the extra companion path left by the non-generator boundary.
- A candidate neighbouring projection-family clue is weaker than a generator.
- No physical interpretation is claimed.

## Summary

- inspection_result: "nonselected_companion_not_enough_for_neighbor_candidate"
- gap_a_closed: false
- best_family_features: ["source:p900_candidate0_edge_law:sector_delta_abs_small=True"]
- best_family_support_count: 5
- selected_count: 4
- companion_count: 1
- companion_indices: [6]
- companion_projection_visible: false
- companion_projection_roles: []
- companion_projection_role_classes: []
- companion_projection_cycles: []
- candidate_neighbor_projection_member: false
- nearest_selected_by_feature: {"6": {"a_index": 6, "b_index": 7, "feature_overlap_count": 30, "feature_overlap_ratio": 0.7142857142857143, "feature_union_count": 42, "same_A": true, "same_B": false, "same_C": false, "same_path_shape": true, "shared_column_count": 1, "shared_columns": [28], "shared_projection_role_classes": [], "shared_projection_roles": []}}
- claim_closes_gap_a: false

## Companion records

- {"candidate0_laws": [{"label": "identity", "petersen_edge_a": [5, 7], "petersen_edge_b": [7, 9], "sector_pair": [10, 11], "shared_petersen_vertex": 7, "shift_mod60": 0}, {"label": "identity", "petersen_edge_a": [9, 6], "petersen_edge_b": [6, 8], "sector_pair": [12, 13], "shared_petersen_vertex": 6, "shift_mod60": 0}], "candidate1_laws": [{"label": "identity", "petersen_edge_a": [5, 7], "petersen_edge_b": [7, 9], "sector_pair": [10, 11], "shared_petersen_vertex": 7, "shift_mod60": 0}, {"label": "identity", "petersen_edge_a": [9, 6], "petersen_edge_b": [6, 8], "sector_pair": [12, 13], "shared_petersen_vertex": 6, "shift_mod60": 0}], "columns": [25, 28], "features": ["proj:any_col_unseen=True", "proj:both_cols_visible=False", "proj:cycle_span_count=0", "proj:has_interior_role_class=False", "proj:has_outer_and_interior=False", "proj:has_outer_role_class=False", "proj:nohit_col_count=2", "proj:role_class_sig=[]", "proj:visible_col_count=0", "source:AC_abs_small=True", "source:AC_sign=neg", "source:A_parity=odd", "source:BA_AC_signs=neg_to_neg", "source:BA_abs_small=True", "source:BA_sign=neg", "source:BC_abs_2_or_3=True", "source:BC_sign=neg", "source:B_parity=even", "source:C_parity=even", "source:endpoint_parity=even_to_even", "source:p900_candidate0_edge_law:label_sig=['identity','identity']", "source:p900_candidate0_edge_law:same_label=True", "source:p900_candidate0_edge_law:same_shift=True", "source:p900_candidate0_edge_law:sector_delta_abs_small=True", "source:p900_candidate0_edge_law:sector_delta_signs=['pos','pos']", "source:p900_candidate0_edge_law:shared_parity_sig=['odd','even']", "source:p900_candidate0_edge_law:shared_same=False", "source:p900_candidate0_edge_law:shift_sig=[0,0]", "source:p900_candidate1_edge_law:label_sig=['identity','identity']", "source:p900_candidate1_edge_law:same_label=True", "source:p900_candidate1_edge_law:same_shift=True", "source:p900_candidate1_edge_law:sector_delta_abs_small=True", "source:p900_candidate1_edge_law:sector_delta_signs=['pos','pos']", "source:p900_candidate1_edge_law:shared_parity_sig=['odd','even']", "source:p900_candidate1_edge_law:shared_same=False", "source:p900_candidate1_edge_law:shift_sig=[0,0]"], "index": 6, "path_shape": {"A": 9, "AC_delta": -1, "AC_sign": "neg", "A_parity": "odd", "B": 10, "BA_abs_small": true, "BA_delta": -1, "BA_sign": "neg", "BC_abs_2_or_3": true, "BC_delta": -2, "BC_sign": "neg", "B_parity": "even", "C": 8, "C_parity": "even", "path": [10, 9, 8]}, "projection_cycles": [], "projection_hit_count": 0, "projection_hits": [], "projection_role_classes": [], "projection_roles": [], "selected": false}

## Comparisons to selected

- {"a_index": 6, "b_index": 0, "feature_overlap_count": 23, "feature_overlap_ratio": 0.46938775510204084, "feature_union_count": 49, "same_A": false, "same_B": false, "same_C": false, "same_path_shape": true, "shared_column_count": 0, "shared_columns": [], "shared_projection_role_classes": [], "shared_projection_roles": []}
- {"a_index": 6, "b_index": 1, "feature_overlap_count": 19, "feature_overlap_ratio": 0.3584905660377358, "feature_union_count": 53, "same_A": false, "same_B": false, "same_C": false, "same_path_shape": true, "shared_column_count": 0, "shared_columns": [], "shared_projection_role_classes": [], "shared_projection_roles": []}
- {"a_index": 6, "b_index": 5, "feature_overlap_count": 24, "feature_overlap_ratio": 0.5, "feature_union_count": 48, "same_A": false, "same_B": false, "same_C": false, "same_path_shape": true, "shared_column_count": 0, "shared_columns": [], "shared_projection_role_classes": [], "shared_projection_roles": []}
- {"a_index": 6, "b_index": 7, "feature_overlap_count": 30, "feature_overlap_ratio": 0.7142857142857143, "feature_union_count": 42, "same_A": true, "same_B": false, "same_C": false, "same_path_shape": true, "shared_column_count": 1, "shared_columns": [28], "shared_projection_role_classes": [], "shared_projection_roles": []}

## Boundary record

The extra companion path was inspected but did not qualify as a neighbouring projection-family clue.

What this inspects:

- The single nonselected companion inside the best persistent source-only family.
- Whether the companion is projection-visible.
- Whether the companion shares source/projection features with the four selected correction paths.

What this does not do:

- It does not close Gap A.
- It does not derive the WXYZTI generator.
- It does not promote the companion to a proven projection member.
- It does not attach physical interpretation.

Next question:

The polarity branch should remain bounded unless another source-side object is found.

## Claim

- does_this_close_gap_a: false
- does_this_inspect_companion: true
- does_this_identify_neighbor_candidate: false
- does_this_find_generator: false
- short_form: "The extra companion path was inspected but did not qualify as a neighbouring projection-family clue."
- not_closed_reason: "Projection visibility and feature similarity are not enough to derive the full source-native WXYZTI projection-family generator."
- next_problem: "The polarity branch should remain bounded unless another source-side object is found."

## Checks

- PASS boundary_loaded: polarity_family_non_generator_boundary_recorded
- PASS projection_search_loaded: source_native_projection_family_generator_search_family_signal_persists_no_generator
- PASS candidate_audit_loaded: gap_a_polarity_aware_odd_hinge_candidate_survives_lookup_audit_not_generator
- PASS best_family_loaded: ['source:p900_candidate0_edge_law:sector_delta_abs_small=True']
- PASS selected_count_4: 4
- PASS single_companion: 1
- PASS source_only_no_lookup: {'features': ['source:p900_candidate0_edge_law:sector_delta_abs_small=True'], 'mode': 'source_only', 'support_count': 5, 'selected_support_count': 4, 'nonselected_support_count': 1, 'support_indices': [0, 1, 5, 6, 7], 'selected_indices': [0, 1, 5, 7], 'nonselected_indices': [6], 'exact_selected': False, 'covers_all_selected': True, 'has_nonselected_family': True, 'lookup_terms': [], 'score': 4}
- PASS gap_a_not_closed: inspection only

## Next script

    record_polarity_branch_terminal_boundary_001.py
