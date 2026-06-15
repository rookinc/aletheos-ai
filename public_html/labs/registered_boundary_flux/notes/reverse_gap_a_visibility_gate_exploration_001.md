# Reverse Gap A visibility gate exploration 001

Status: reverse_gap_a_visibility_gate_not_found

## Boundary

- This does not close Gap A.
- This is a reverse-maze exploration.
- Projection visibility is not automatically source-native derivation.
- A visibility gate is weaker than a WXYZTI projection-family generator.
- No physical interpretation is claimed.

## Summary

- exploration_result: "visibility_gate_not_exact"
- gap_a_closed: false
- reverse_maze_frame: true
- best_source_family_feature: ["source:p900_candidate0_edge_law:sector_delta_abs_small=True"]
- best_source_family_indices: [0, 1, 5, 6, 7]
- full_polarity_indices: [0, 1, 2, 3, 4, 5, 6, 7]
- best_family_projection_visible_gate: {"exact_on_universe": false, "false_negative_indices": [5, 7], "false_positive_indices": [], "gate": "projection_visible", "nonselected_count": 1, "selected_count": 4, "true_negative_indices": [6], "true_positive_indices": [0, 1], "universe_size": 5}
- full_polarity_projection_visible_gate: {"exact_on_universe": false, "false_negative_indices": [5, 7], "false_positive_indices": [2, 4], "gate": "projection_visible", "nonselected_count": 4, "selected_count": 4, "true_negative_indices": [3, 6], "true_positive_indices": [0, 1], "universe_size": 8}
- best_family_exact_gates: []
- full_polarity_exact_gates: []
- claim_closes_gap_a: false

## Best-family gate results

- {"exact_on_universe": false, "false_negative_indices": [5, 7], "false_positive_indices": [], "gate": "projection_visible", "nonselected_count": 1, "selected_count": 4, "true_negative_indices": [6], "true_positive_indices": [0, 1], "universe_size": 5}
- {"exact_on_universe": false, "false_negative_indices": [5, 7], "false_positive_indices": [], "gate": "both_columns_visible", "nonselected_count": 1, "selected_count": 4, "true_negative_indices": [6], "true_positive_indices": [0, 1], "universe_size": 5}
- {"exact_on_universe": false, "false_negative_indices": [5, 7], "false_positive_indices": [], "gate": "has_interior", "nonselected_count": 1, "selected_count": 4, "true_negative_indices": [6], "true_positive_indices": [0, 1], "universe_size": 5}
- {"exact_on_universe": false, "false_negative_indices": [5, 7], "false_positive_indices": [], "gate": "has_outer", "nonselected_count": 1, "selected_count": 4, "true_negative_indices": [6], "true_positive_indices": [0, 1], "universe_size": 5}
- {"exact_on_universe": false, "false_negative_indices": [5, 7], "false_positive_indices": [], "gate": "has_outer_and_interior", "nonselected_count": 1, "selected_count": 4, "true_negative_indices": [6], "true_positive_indices": [0, 1], "universe_size": 5}

## Full-polarity gate results

- {"exact_on_universe": false, "false_negative_indices": [5, 7], "false_positive_indices": [2, 4], "gate": "projection_visible", "nonselected_count": 4, "selected_count": 4, "true_negative_indices": [3, 6], "true_positive_indices": [0, 1], "universe_size": 8}
- {"exact_on_universe": false, "false_negative_indices": [5, 7], "false_positive_indices": [], "gate": "both_columns_visible", "nonselected_count": 4, "selected_count": 4, "true_negative_indices": [2, 3, 4, 6], "true_positive_indices": [0, 1], "universe_size": 8}
- {"exact_on_universe": false, "false_negative_indices": [5, 7], "false_positive_indices": [2, 4], "gate": "has_interior", "nonselected_count": 4, "selected_count": 4, "true_negative_indices": [3, 6], "true_positive_indices": [0, 1], "universe_size": 8}
- {"exact_on_universe": false, "false_negative_indices": [5, 7], "false_positive_indices": [], "gate": "has_outer", "nonselected_count": 4, "selected_count": 4, "true_negative_indices": [2, 3, 4, 6], "true_positive_indices": [0, 1], "universe_size": 8}
- {"exact_on_universe": false, "false_negative_indices": [5, 7], "false_positive_indices": [], "gate": "has_outer_and_interior", "nonselected_count": 4, "selected_count": 4, "true_negative_indices": [2, 3, 4, 6], "true_positive_indices": [0, 1], "universe_size": 8}

## Interpretation

- main_result: Projection visibility did not form an exact reverse gate in the tested family.
- why_this_matters: Reverse search asks what gate admits source-shell paths as registered trace. This tests visibility before trying another generator search.
- why_not_closure: Projection visibility is an observed gate on the current surface, not a source-native derivation of the WXYZTI register generator.
- next_move: Record reverse Gap A visibility-gate boundary and return to source-native generator search.

## Claim

- does_this_close_gap_a: false
- does_this_find_reverse_visibility_gate: false
- does_this_find_source_native_generator: false
- short_form: "Projection visibility did not form an exact reverse gate in the tested family."
- not_closed_reason: "Projection visibility is an observed gate on the current surface, not a source-native derivation of the WXYZTI register generator."
- next_problem: "Record reverse Gap A visibility-gate boundary and return to source-native generator search."

## Checks

- PASS companion_loaded: polarity_family_nonselected_companion_inspected_no_neighbor_candidate
- PASS projection_search_loaded: source_native_projection_family_generator_search_family_signal_persists_no_generator
- PASS candidate_audit_loaded: gap_a_polarity_aware_odd_hinge_candidate_survives_lookup_audit_not_generator
- PASS plateau_loaded: gap_a_open_with_source_shell_lift_conjecture_recorded
- PASS records_loaded: 8
- PASS best_family_size_5: 5
- PASS best_family_has_4_selected: {'gate': 'projection_visible', 'universe_size': 5, 'selected_count': 4, 'nonselected_count': 1, 'true_positive_indices': [0, 1], 'false_negative_indices': [5, 7], 'false_positive_indices': [], 'true_negative_indices': [6], 'exact_on_universe': False}
- PASS gap_a_not_closed: visibility gate exploration only

## Next script

    record_reverse_gap_a_visibility_gate_boundary_001.py
