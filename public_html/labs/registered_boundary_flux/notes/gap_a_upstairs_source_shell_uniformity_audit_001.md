# Gap A upstairs source-shell uniformity audit 001

Status: gap_a_upstairs_source_shell_uniformity_audited_no_uniform_rule

## Boundary

- This does not close Gap A.
- This audits source-shell coverage, not a source-native generator.
- A source-shell lift signal is weaker than upstairs closure.
- Single-projection WXYZTI closure remains open.
- Mode 2 mirror remains projection-level evidence and is not promoted here.
- No physical interpretation is claimed.

## Summary

- uniformity_audit_result: "source_shell_lift_signal_without_uniform_rule"
- gap_a_closed: false
- source_shell_signal: true
- uniform_upstairs_rule_found: false
- counts: {"all_length_2_count": 4, "all_projection_row_cover_count": 2, "external_column_record_count": 3, "local_source_shell_1_cover_count": 4, "local_source_shell_2_cover_count": 4, "neighbor_projection_cover_count": 2, "outer_frame_cover_count": 2, "record_count": 4, "same_role_neighbor_cover_count": 1, "support_internal_count": 1, "unique_shortest_count": 4}
- station_counts: {"T": 1, "Y": 1, "Z": 2}
- role_pair_counts: {"XY->YZ": 1, "YZ->ZT": 2, "ZT->TI": 1}
- candidate0_label_counts: {"half_turn->half_turn": 1, "identity->half_turn": 1, "identity->identity": 2}
- candidate1_label_counts: {"half_turn->half_turn": 2, "identity->half_turn": 1, "identity->identity": 1}
- candidate0_shift_counts: {"0->0": 2, "0->30": 1, "30->30": 1}
- candidate1_shift_counts: {"0->0": 1, "0->30": 1, "30->30": 2}
- shell1_size_counts: {"12": 1, "14": 1, "20": 2}
- external_count_counts: {"0": 1, "1": 1, "2": 2}
- all_length_2: true
- all_unique_shortest: true
- all_local_source_shell_1_cover: true
- all_neighbor_projection_cover: false
- all_projection_row_cover: false
- all_support_internal: false
- uniformity_failures: ["not_all_neighbor_projection_covered", "not_all_projection_row_covered", "not_all_support_internal", "candidate0_label_signature_not_uniform", "candidate1_label_signature_not_uniform", "candidate0_shift_signature_not_uniform", "candidate1_shift_signature_not_uniform", "external_column_count_not_uniform", "station_not_uniform", "role_pair_not_uniform"]
- outer_frame_stable: ["IW", "WX", "XY"]
- interior_turn_unstable: ["TI", "YZ", "ZT"]
- claim_closes_gap_a: false

## Classification

- survives_as: "source-shell lift signal without uniform rule"
- safe_claims: ["all correction paths are unique shortest paths", "all correction paths are length 2", "all correction paths are covered by local source shell radius 1", "single-projection Gap A remains open"]
- blocked_claims: ["neighboring projection rows do not cover all corrections", "projection rows do not cover all corrections", "source-shell coverage has no uniform label or shift signature", "source-shell coverage is not a source-native projection-family generator"]
- forbidden_promotions: ["do not close Gap A", "do not call source-shell coverage a generator", "do not call upstairs closure proved", "do not attach physical interpretation"]

## Records

- {"all_projection_row_cover": true, "candidate0_label_signature": "identity->half_turn", "candidate0_sector_pairs": [[3, 4], [2, 3]], "candidate0_shared_vertices": [4, 3], "candidate0_shift_signature": "0->30", "candidate1_label_signature": "identity->half_turn", "candidate1_sector_pairs": [[3, 4], [2, 3]], "candidate1_shared_vertices": [4, 3], "candidate1_shift_signature": "0->30", "correction_columns": [7, 10], "correction_vertices": [4, 3, 2], "cycle": 0, "external_column_count": 0, "external_column_source_records": [], "external_columns": [], "local_source_shell_1_cover": true, "local_source_shell_1_new_columns": [1, 4, 8, 11, 12, 13, 14, 27, 29], "local_source_shell_1_size": 12, "local_source_shell_2_cover": true, "local_source_shell_2_new_columns": [0, 1, 2, 3, 4, 5, 6, 8, 11, 12, 13, 14, 16, 17, 18, 20, 21, 22, 24, 25, 26, 27, 28, 29], "local_source_shell_2_size": 27, "neighbor_projection_cover": true, "outer_frame_cover": true, "path_distance": 2, "role_pair": "YZ->ZT", "row_hits_for_correction_columns": {"10": [{"columns": [7, 10], "cycle": 0, "role": "YZ", "row_ordinal": 2}, {"columns": [10, 11], "cycle": 1, "role": "TI", "row_ordinal": 10}], "7": [{"columns": [7, 10], "cycle": 0, "role": "YZ", "row_ordinal": 2}, {"columns": [1, 7], "cycle": 0, "role": "IW", "row_ordinal": 5}, {"columns": [1, 7], "cycle": 1, "role": "IW", "row_ordinal": 11}, {"columns": [1, 7], "cycle": 2, "role": "IW", "row_ordinal": 17}]}, "same_role_neighbor_cover": true, "station": "Z", "support_internal": true, "support_union": [7, 9, 10], "unique_shortest_column_path": true}
- {"all_projection_row_cover": false, "candidate0_label_signature": "identity->identity", "candidate0_sector_pairs": [[13, 14], [12, 13]], "candidate0_shared_vertices": [8, 6], "candidate0_shift_signature": "0->0", "candidate1_label_signature": "identity->identity", "candidate1_sector_pairs": [[13, 14], [12, 13]], "candidate1_shared_vertices": [8, 6], "candidate1_shift_signature": "0->0", "correction_columns": [28, 29], "correction_vertices": [13, 9, 10], "cycle": 0, "external_column_count": 2, "external_column_source_records": [{"candidate0": {"label": "identity", "petersen_edge_a": [9, 6], "petersen_edge_b": [6, 8], "sector_pair": [12, 13], "shared_petersen_vertex": 6, "shift_mod60": 0}, "candidate1": {"label": "identity", "petersen_edge_a": [9, 6], "petersen_edge_b": [6, 8], "sector_pair": [12, 13], "shared_petersen_vertex": 6, "shift_mod60": 0}, "column": 28, "g900_slot_edge": [9, 10]}, {"candidate0": {"label": "identity", "petersen_edge_a": [6, 8], "petersen_edge_b": [8, 5], "sector_pair": [13, 14], "shared_petersen_vertex": 8, "shift_mod60": 0}, "candidate1": {"label": "identity", "petersen_edge_a": [6, 8], "petersen_edge_b": [8, 5], "sector_pair": [13, 14], "shared_petersen_vertex": 8, "shift_mod60": 0}, "column": 29, "g900_slot_edge": [9, 13]}], "external_columns": [28, 29], "local_source_shell_1_cover": true, "local_source_shell_1_new_columns": [1, 2, 4, 7, 8, 10, 11, 14, 17, 27, 28, 29], "local_source_shell_1_size": 14, "local_source_shell_2_cover": true, "local_source_shell_2_new_columns": [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 14, 15, 16, 17, 18, 20, 21, 22, 24, 25, 26, 27, 28, 29], "local_source_shell_2_size": 28, "neighbor_projection_cover": false, "outer_frame_cover": false, "path_distance": 2, "role_pair": "ZT->TI", "row_hits_for_correction_columns": {"28": [], "29": []}, "same_role_neighbor_cover": false, "station": "T", "support_internal": false, "support_union": [9, 13], "unique_shortest_column_path": true}
- {"all_projection_row_cover": true, "candidate0_label_signature": "half_turn->half_turn", "candidate0_sector_pairs": [[1, 2], [0, 1]], "candidate0_shared_vertices": [2, 1], "candidate0_shift_signature": "30->30", "candidate1_label_signature": "half_turn->half_turn", "candidate1_sector_pairs": [[1, 2], [0, 1]], "candidate1_shared_vertices": [2, 1], "candidate1_shift_signature": "30->30", "correction_columns": [0, 4], "correction_vertices": [2, 1, 0], "cycle": 1, "external_column_count": 1, "external_column_source_records": [{"candidate0": {"label": "half_turn", "petersen_edge_a": [0, 1], "petersen_edge_b": [1, 2], "sector_pair": [0, 1], "shared_petersen_vertex": 1, "shift_mod60": 30}, "candidate1": {"label": "half_turn", "petersen_edge_a": [0, 1], "petersen_edge_b": [1, 2], "sector_pair": [0, 1], "shared_petersen_vertex": 1, "shift_mod60": 30}, "column": 0, "g900_slot_edge": [0, 1]}], "external_columns": [0], "local_source_shell_1_cover": true, "local_source_shell_1_new_columns": [0, 2, 5, 6, 7, 8, 9, 10, 13, 14, 19, 23, 24, 25, 26, 27], "local_source_shell_1_size": 20, "local_source_shell_2_cover": true, "local_source_shell_2_new_columns": [0, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29], "local_source_shell_2_size": 30, "neighbor_projection_cover": true, "outer_frame_cover": true, "path_distance": 2, "role_pair": "XY->YZ", "row_hits_for_correction_columns": {"0": [{"columns": [0], "cycle": 0, "role": "WX", "row_ordinal": 0}, {"columns": [0], "cycle": 1, "role": "WX", "row_ordinal": 6}, {"columns": [0], "cycle": 2, "role": "WX", "row_ordinal": 12}], "4": [{"columns": [4], "cycle": 0, "role": "XY", "row_ordinal": 1}, {"columns": [4], "cycle": 1, "role": "XY", "row_ordinal": 7}, {"columns": [4], "cycle": 2, "role": "XY", "row_ordinal": 13}, {"columns": [4, 5], "cycle": 2, "role": "YZ", "row_ordinal": 14}]}, "same_role_neighbor_cover": false, "station": "Y", "support_internal": false, "support_union": [1, 3, 4, 22], "unique_shortest_column_path": true}
- {"all_projection_row_cover": false, "candidate0_label_signature": "identity->identity", "candidate0_sector_pairs": [[9, 11], [9, 12]], "candidate0_shared_vertices": [9, 9], "candidate0_shift_signature": "0->0", "candidate1_label_signature": "half_turn->half_turn", "candidate1_sector_pairs": [[9, 11], [9, 12]], "candidate1_shared_vertices": [9, 9], "candidate1_shift_signature": "30->30", "correction_columns": [23, 24], "correction_vertices": [11, 7, 14], "cycle": 2, "external_column_count": 2, "external_column_source_records": [{"candidate0": {"label": "identity", "petersen_edge_a": [4, 9], "petersen_edge_b": [7, 9], "sector_pair": [9, 11], "shared_petersen_vertex": 9, "shift_mod60": 0}, "candidate1": {"label": "half_turn", "petersen_edge_a": [4, 9], "petersen_edge_b": [7, 9], "sector_pair": [9, 11], "shared_petersen_vertex": 9, "shift_mod60": 30}, "column": 23, "g900_slot_edge": [7, 11]}, {"candidate0": {"label": "identity", "petersen_edge_a": [4, 9], "petersen_edge_b": [9, 6], "sector_pair": [9, 12], "shared_petersen_vertex": 9, "shift_mod60": 0}, "candidate1": {"label": "half_turn", "petersen_edge_a": [4, 9], "petersen_edge_b": [9, 6], "sector_pair": [9, 12], "shared_petersen_vertex": 9, "shift_mod60": 30}, "column": 24, "g900_slot_edge": [7, 14]}], "external_columns": [23, 24], "local_source_shell_1_cover": true, "local_source_shell_1_new_columns": [0, 3, 6, 7, 8, 9, 12, 14, 15, 19, 20, 23, 24, 25, 26, 27], "local_source_shell_1_size": 20, "local_source_shell_2_cover": true, "local_source_shell_2_new_columns": [0, 1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 23, 24, 25, 26, 27, 28, 29], "local_source_shell_2_size": 30, "neighbor_projection_cover": false, "outer_frame_cover": false, "path_distance": 2, "role_pair": "YZ->ZT", "row_hits_for_correction_columns": {"23": [], "24": []}, "same_role_neighbor_cover": false, "station": "Z", "support_internal": false, "support_union": [4, 5, 21, 22], "unique_shortest_column_path": true}

## Interpretation

- main_result: A source-shell lift signal survives, but no uniform upstairs source-shell rule was found.
- what_survived: The nonlocal corrections are all unique, length-2, source-shell-radius-1 reachable paths.
- what_failed: The paths do not share a uniform candidate label or shift signature, and neighboring projection rows do not cover all corrections.
- why_not_closure: Source-shell reachability is weaker than a source-native projection-family generator.
- next_move: Record Gap A as open with a source-shell lift conjecture and localized obstruction.

## Claim

- does_this_close_gap_a: false
- does_this_preserve_single_projection_gap_a_open: true
- does_source_shell_lift_signal_survive: true
- does_this_find_uniform_upstairs_rule: false
- does_this_find_source_native_projection_family_generator: false
- short_form: "A source-shell lift signal survives, but no uniform upstairs source-shell rule was found."
- not_closed_reason: "Source-shell reachability is weaker than a source-native projection-family generator."
- next_problem: "Record Gap A as open with a source-shell lift conjecture and localized obstruction."

## Checks

- PASS upstairs_loaded: gap_a_upstairs_source_shell_candidate_found_not_closure
- PASS correction_audit_loaded: gap_a_interior_turn_correction_paths_audited_projection_fit_risk_remains
- PASS interior_seam_loaded: gap_a_interior_turn_seam_short_source_correction_candidate_found_not_closure
- PASS station_obstruction_loaded: gap_a_station_variable_obstruction_recorded
- PASS upstreamed_supports_loaded: gap_a_projection_row_supports_upstreamed_columnwise_complete_not_generator
- PASS boundary_theorem_loaded: gap_a_boundary_theorem_note_recorded
- PASS records_loaded: 4
- PASS source_shell_signal_present: True
- PASS no_uniform_rule_claimed_if_absent: source_shell_lift_signal_without_uniform_rule
- PASS gap_a_not_closed: source-shell uniformity audit only

## Next script

    record_gap_a_open_with_source_shell_lift_conjecture_001.py
