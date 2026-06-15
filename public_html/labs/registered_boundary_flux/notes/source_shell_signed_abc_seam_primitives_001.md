# Source-shell signed A/B/C seam primitives 001

Status: source_shell_signed_abc_primitives_extracted_odd_hinge_signal_found_not_generator

## Boundary

- This does not close Gap A.
- This extracts primitives for the new projection-family branch.
- A/B/C labels are hypothesis grammar, not proof.
- An odd-hinge signal is not a generator.
- No physical interpretation is claimed.

## Summary

- primitive_result: "odd_hinge_abc_signal_found"
- gap_a_closed: false
- record_count: 4
- all_length_2: true
- all_unique_shortest: true
- all_odd_hinge: true
- odd_hinge_signal: true
- all_support_internal: false
- counts: {"all_length_2_count": 4, "odd_hinge_count": 4, "record_count": 4, "support_internal_count": 1, "unique_shortest_count": 4}
- station_counts: {"T": 1, "Y": 1, "Z": 2}
- role_pair_counts: {"XY->YZ": 1, "YZ->ZT": 2, "ZT->TI": 1}
- hinge_values: {"1": 1, "3": 1, "7": 1, "9": 1}
- hinge_parity: {"odd": 4}
- endpoint_parity: {"even->even": 2, "odd->even": 2}
- delta_pairs: {"[-1, -1]": 2, "[-4, 1]": 1, "[-4, 7]": 1}
- candidate0_label_counts: {"half_turn->half_turn": 1, "identity->half_turn": 1, "identity->identity": 2}
- candidate1_label_counts: {"half_turn->half_turn": 2, "identity->half_turn": 1, "identity->identity": 1}
- candidate0_shift_counts: {"0->0": 2, "0->30": 1, "30->30": 1}
- candidate1_shift_counts: {"0->0": 1, "0->30": 1, "30->30": 2}
- uniform_hinge_value: false
- uniform_endpoint_parity: false
- uniform_delta_pair: false
- uniform_candidate0_label: false
- uniform_candidate1_label: false
- uniform_candidate0_shift: false
- uniform_candidate1_shift: false
- claim_closes_gap_a: false

## A/B/C convention

- A: source-shell hinge, the middle vertex of the length-2 correction path
- B: left projection endpoint
- C: right projection endpoint

## Records

- {"abc_hinge_model": {"A_parity": "odd", "A_source_shell_hinge": 3, "A_to_C_delta_mod15_signed": -1, "B_left_projection_endpoint": 4, "B_parity": "even", "B_to_A_delta_mod15_signed": -1, "B_to_C_delta_mod15_signed": -2, "C_parity": "even", "C_right_projection_endpoint": 2, "endpoint_pair_parity": "even->even"}, "candidate0_signature": {"candidate": "p900_candidate0_edge_law", "label_signature": "identity->half_turn", "label_signs": ["+", "-"], "petersen_edge_a": [[3, 4], [2, 3]], "petersen_edge_b": [[4, 0], [3, 4]], "sector_pairs": [[3, 4], [2, 3]], "shared_petersen_vertices": [4, 3], "shift_signature": "0->30", "shift_signs": ["+", "-"]}, "candidate1_signature": {"candidate": "p900_candidate1_edge_law", "label_signature": "identity->half_turn", "label_signs": ["+", "-"], "petersen_edge_a": [[3, 4], [2, 3]], "petersen_edge_b": [[4, 0], [3, 4]], "sector_pairs": [[3, 4], [2, 3]], "shared_petersen_vertices": [4, 3], "shift_signature": "0->30", "shift_signs": ["+", "-"]}, "cycle": 0, "path_columns": [10, 7], "path_distance": 2, "path_vertices": [4, 3, 2], "role_pair": "YZ->ZT", "station": "Z", "support_internal": true, "unique_shortest_column_path": true}
- {"abc_hinge_model": {"A_parity": "odd", "A_source_shell_hinge": 9, "A_to_C_delta_mod15_signed": 1, "B_left_projection_endpoint": 13, "B_parity": "odd", "B_to_A_delta_mod15_signed": -4, "B_to_C_delta_mod15_signed": -3, "C_parity": "even", "C_right_projection_endpoint": 10, "endpoint_pair_parity": "odd->even"}, "candidate0_signature": {"candidate": "p900_candidate0_edge_law", "label_signature": "identity->identity", "label_signs": ["+", "+"], "petersen_edge_a": [[6, 8], [9, 6]], "petersen_edge_b": [[8, 5], [6, 8]], "sector_pairs": [[13, 14], [12, 13]], "shared_petersen_vertices": [8, 6], "shift_signature": "0->0", "shift_signs": ["+", "+"]}, "candidate1_signature": {"candidate": "p900_candidate1_edge_law", "label_signature": "identity->identity", "label_signs": ["+", "+"], "petersen_edge_a": [[6, 8], [9, 6]], "petersen_edge_b": [[8, 5], [6, 8]], "sector_pairs": [[13, 14], [12, 13]], "shared_petersen_vertices": [8, 6], "shift_signature": "0->0", "shift_signs": ["+", "+"]}, "cycle": 0, "path_columns": [29, 28], "path_distance": 2, "path_vertices": [13, 9, 10], "role_pair": "ZT->TI", "station": "T", "support_internal": false, "unique_shortest_column_path": true}
- {"abc_hinge_model": {"A_parity": "odd", "A_source_shell_hinge": 1, "A_to_C_delta_mod15_signed": -1, "B_left_projection_endpoint": 2, "B_parity": "even", "B_to_A_delta_mod15_signed": -1, "B_to_C_delta_mod15_signed": -2, "C_parity": "even", "C_right_projection_endpoint": 0, "endpoint_pair_parity": "even->even"}, "candidate0_signature": {"candidate": "p900_candidate0_edge_law", "label_signature": "half_turn->half_turn", "label_signs": ["-", "-"], "petersen_edge_a": [[1, 2], [0, 1]], "petersen_edge_b": [[2, 3], [1, 2]], "sector_pairs": [[1, 2], [0, 1]], "shared_petersen_vertices": [2, 1], "shift_signature": "30->30", "shift_signs": ["-", "-"]}, "candidate1_signature": {"candidate": "p900_candidate1_edge_law", "label_signature": "half_turn->half_turn", "label_signs": ["-", "-"], "petersen_edge_a": [[1, 2], [0, 1]], "petersen_edge_b": [[2, 3], [1, 2]], "sector_pairs": [[1, 2], [0, 1]], "shared_petersen_vertices": [2, 1], "shift_signature": "30->30", "shift_signs": ["-", "-"]}, "cycle": 1, "path_columns": [4, 0], "path_distance": 2, "path_vertices": [2, 1, 0], "role_pair": "XY->YZ", "station": "Y", "support_internal": false, "unique_shortest_column_path": true}
- {"abc_hinge_model": {"A_parity": "odd", "A_source_shell_hinge": 7, "A_to_C_delta_mod15_signed": 7, "B_left_projection_endpoint": 11, "B_parity": "odd", "B_to_A_delta_mod15_signed": -4, "B_to_C_delta_mod15_signed": 3, "C_parity": "even", "C_right_projection_endpoint": 14, "endpoint_pair_parity": "odd->even"}, "candidate0_signature": {"candidate": "p900_candidate0_edge_law", "label_signature": "identity->identity", "label_signs": ["+", "+"], "petersen_edge_a": [[4, 9], [4, 9]], "petersen_edge_b": [[7, 9], [9, 6]], "sector_pairs": [[9, 11], [9, 12]], "shared_petersen_vertices": [9, 9], "shift_signature": "0->0", "shift_signs": ["+", "+"]}, "candidate1_signature": {"candidate": "p900_candidate1_edge_law", "label_signature": "half_turn->half_turn", "label_signs": ["-", "-"], "petersen_edge_a": [[4, 9], [4, 9]], "petersen_edge_b": [[7, 9], [9, 6]], "sector_pairs": [[9, 11], [9, 12]], "shared_petersen_vertices": [9, 9], "shift_signature": "30->30", "shift_signs": ["-", "-"]}, "cycle": 2, "path_columns": [23, 24], "path_distance": 2, "path_vertices": [11, 7, 14], "role_pair": "YZ->ZT", "station": "Z", "support_internal": false, "unique_shortest_column_path": true}

## Interpretation

- main_result: A signed A/B/C primitive was extracted with a common odd source-shell hinge signal.
- what_A_B_C_mean_here: A is the source-shell hinge; B and C are the two projection endpoints joined by the length-2 correction path.
- what_survived: All four correction paths are unique, length-2, and pass through an odd hinge.
- what_did_not_survive: The exact hinge value, endpoint parity, delta pair, and label/shift signatures are not uniform.
- why_not_closure: An odd-hinge primitive is weaker than a source-native projection-family generator.
- next_move: Audit whether the odd-hinge signal is special against all possible length-2 source-shell paths.

## Claim

- does_this_close_gap_a: false
- does_this_extract_abc_primitives: true
- does_this_find_odd_hinge_signal: true
- does_this_find_generator: false
- short_form: "A signed A/B/C primitive was extracted with a common odd source-shell hinge signal."
- not_closed_reason: "An odd-hinge primitive is weaker than a source-native projection-family generator."
- next_problem: "Audit whether the odd-hinge signal is special against all possible length-2 source-shell paths."

## Checks

- PASS branch_seed_loaded: source_shell_projection_family_generator_branch_started
- PASS plateau_loaded: gap_a_open_with_source_shell_lift_conjecture_recorded
- PASS uniformity_loaded: gap_a_upstairs_source_shell_uniformity_audited_no_uniform_rule
- PASS upstairs_loaded: gap_a_upstairs_source_shell_candidate_found_not_closure
- PASS correction_audit_loaded: gap_a_interior_turn_correction_paths_audited_projection_fit_risk_remains
- PASS records_loaded: 4
- PASS gap_a_not_closed: primitive extraction only
- PASS odd_hinge_signal_recorded: True

## Next script

    audit_gap_a_odd_hinge_source_shell_grammar_001.py
