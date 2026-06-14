# Gap A upstairs neighbor projection closure search 001

Status: gap_a_upstairs_source_shell_candidate_found_not_closure

## Boundary

- This does not close Gap A.
- This explores upstairs neighbor-projection closure as a conjecture.
- Single-projection WXYZTI closure remains open.
- Source-shell coverage is not a source-native projection-family generator.
- Mode 2 mirror remains projection-level evidence and is not promoted here.
- No physical interpretation is claimed.

## Summary

- upstairs_search_result: "source_shell_1_upstairs_candidate_found"
- gap_a_closed: false
- correction_record_count: 4
- station_counts: {"T": 1, "Y": 1, "Z": 2}
- role_pair_counts: {"XY->YZ": 1, "YZ->ZT": 2, "ZT->TI": 1}
- outer_frame_stable: ["IW", "WX", "XY"]
- interior_turn_unstable: ["TI", "YZ", "ZT"]
- counts: {"all_projection_row_cover_count": 2, "local_source_shell_1_cover_count": 4, "local_source_shell_2_cover_count": 4, "neighbor_projection_cover_count": 2, "outer_frame_cover_count": 2, "record_count": 4, "same_role_neighbor_cover_count": 1, "support_internal_count": 1, "unique_shortest_count": 4}
- all_unique_shortest_column_paths: true
- all_neighbor_projection_cover: false
- all_local_source_shell_1_cover: true
- all_local_source_shell_2_cover: true
- claim_closes_gap_a: false

## Closure records

- {"all_projection_row_cover": true, "correction_columns": [7, 10], "cycle": 0, "external_column_source_records": [], "external_columns": [], "local_source_shell_1_cover": true, "local_source_shell_2_cover": true, "neighbor_projection_cover": true, "outer_frame_cover": true, "role_pair": "YZ->ZT", "row_hits_for_correction_columns": {"10": [{"columns": [7, 10], "cycle": 0, "role": "YZ", "row_ordinal": 2}, {"columns": [10, 11], "cycle": 1, "role": "TI", "row_ordinal": 10}], "7": [{"columns": [7, 10], "cycle": 0, "role": "YZ", "row_ordinal": 2}, {"columns": [1, 7], "cycle": 0, "role": "IW", "row_ordinal": 5}, {"columns": [1, 7], "cycle": 1, "role": "IW", "row_ordinal": 11}, {"columns": [1, 7], "cycle": 2, "role": "IW", "row_ordinal": 17}]}, "same_role_neighbor_cover": true, "station": "Z", "support_internal": true, "support_union": [7, 9, 10]}
- {"all_projection_row_cover": false, "correction_columns": [28, 29], "cycle": 0, "external_column_source_records": [{"candidate0": {"label": "identity", "petersen_edge_a": [9, 6], "petersen_edge_b": [6, 8], "sector_pair": [12, 13], "shared_petersen_vertex": 6, "shift_mod60": 0}, "candidate1": {"label": "identity", "petersen_edge_a": [9, 6], "petersen_edge_b": [6, 8], "sector_pair": [12, 13], "shared_petersen_vertex": 6, "shift_mod60": 0}, "column": 28, "g900_slot_edge": [9, 10]}, {"candidate0": {"label": "identity", "petersen_edge_a": [6, 8], "petersen_edge_b": [8, 5], "sector_pair": [13, 14], "shared_petersen_vertex": 8, "shift_mod60": 0}, "candidate1": {"label": "identity", "petersen_edge_a": [6, 8], "petersen_edge_b": [8, 5], "sector_pair": [13, 14], "shared_petersen_vertex": 8, "shift_mod60": 0}, "column": 29, "g900_slot_edge": [9, 13]}], "external_columns": [28, 29], "local_source_shell_1_cover": true, "local_source_shell_2_cover": true, "neighbor_projection_cover": false, "outer_frame_cover": false, "role_pair": "ZT->TI", "row_hits_for_correction_columns": {"28": [], "29": []}, "same_role_neighbor_cover": false, "station": "T", "support_internal": false, "support_union": [9, 13]}
- {"all_projection_row_cover": true, "correction_columns": [0, 4], "cycle": 1, "external_column_source_records": [{"candidate0": {"label": "half_turn", "petersen_edge_a": [0, 1], "petersen_edge_b": [1, 2], "sector_pair": [0, 1], "shared_petersen_vertex": 1, "shift_mod60": 30}, "candidate1": {"label": "half_turn", "petersen_edge_a": [0, 1], "petersen_edge_b": [1, 2], "sector_pair": [0, 1], "shared_petersen_vertex": 1, "shift_mod60": 30}, "column": 0, "g900_slot_edge": [0, 1]}], "external_columns": [0], "local_source_shell_1_cover": true, "local_source_shell_2_cover": true, "neighbor_projection_cover": true, "outer_frame_cover": true, "role_pair": "XY->YZ", "row_hits_for_correction_columns": {"0": [{"columns": [0], "cycle": 0, "role": "WX", "row_ordinal": 0}, {"columns": [0], "cycle": 1, "role": "WX", "row_ordinal": 6}, {"columns": [0], "cycle": 2, "role": "WX", "row_ordinal": 12}], "4": [{"columns": [4], "cycle": 0, "role": "XY", "row_ordinal": 1}, {"columns": [4], "cycle": 1, "role": "XY", "row_ordinal": 7}, {"columns": [4], "cycle": 2, "role": "XY", "row_ordinal": 13}, {"columns": [4, 5], "cycle": 2, "role": "YZ", "row_ordinal": 14}]}, "same_role_neighbor_cover": false, "station": "Y", "support_internal": false, "support_union": [1, 3, 4, 22]}
- {"all_projection_row_cover": false, "correction_columns": [23, 24], "cycle": 2, "external_column_source_records": [{"candidate0": {"label": "identity", "petersen_edge_a": [4, 9], "petersen_edge_b": [7, 9], "sector_pair": [9, 11], "shared_petersen_vertex": 9, "shift_mod60": 0}, "candidate1": {"label": "half_turn", "petersen_edge_a": [4, 9], "petersen_edge_b": [7, 9], "sector_pair": [9, 11], "shared_petersen_vertex": 9, "shift_mod60": 30}, "column": 23, "g900_slot_edge": [7, 11]}, {"candidate0": {"label": "identity", "petersen_edge_a": [4, 9], "petersen_edge_b": [9, 6], "sector_pair": [9, 12], "shared_petersen_vertex": 9, "shift_mod60": 0}, "candidate1": {"label": "half_turn", "petersen_edge_a": [4, 9], "petersen_edge_b": [9, 6], "sector_pair": [9, 12], "shared_petersen_vertex": 9, "shift_mod60": 30}, "column": 24, "g900_slot_edge": [7, 14]}], "external_columns": [23, 24], "local_source_shell_1_cover": true, "local_source_shell_2_cover": true, "neighbor_projection_cover": false, "outer_frame_cover": false, "role_pair": "YZ->ZT", "row_hits_for_correction_columns": {"23": [], "24": []}, "same_role_neighbor_cover": false, "station": "Z", "support_internal": false, "support_union": [4, 5, 21, 22]}

## Interpretation

- main_result: The correction paths are not covered by neighboring projection rows, but they are covered by the local source shell.
- why_this_matters: This tests whether the nonlocal correction paths are evidence of upstairs closure with neighboring projections rather than local WXYZTI closure.
- safe_claim: Single-projection Gap A remains open; upstairs source-neighbor closure is a live conjectural direction only if coverage is structured.
- why_not_closure: Source-shell coverage is weaker than a source-native projection-family generator.
- next_move: Audit whether the source-shell coverage has a uniform upstairs rule.

## Claim

- does_this_close_gap_a: false
- does_this_preserve_single_projection_gap_a_open: true
- does_this_find_neighbor_projection_cover: false
- does_this_find_source_shell_cover: true
- does_this_find_source_native_projection_family_generator: false
- short_form: "The correction paths are not covered by neighboring projection rows, but they are covered by the local source shell."
- not_closed_reason: "Source-shell coverage is weaker than a source-native projection-family generator."
- next_problem: "Audit whether the source-shell coverage has a uniform upstairs rule."

## Checks

- PASS correction_audit_loaded: gap_a_interior_turn_correction_paths_audited_projection_fit_risk_remains
- PASS interior_seam_loaded: gap_a_interior_turn_seam_short_source_correction_candidate_found_not_closure
- PASS station_obstruction_loaded: gap_a_station_variable_obstruction_recorded
- PASS upstreamed_supports_loaded: gap_a_projection_row_supports_upstreamed_columnwise_complete_not_generator
- PASS boundary_theorem_loaded: gap_a_boundary_theorem_note_recorded
- PASS correction_records_loaded: 4
- PASS source_columns_loaded: 30
- PASS row_supports_loaded: 18
- PASS all_unique_shortest_paths_preserved: True
- PASS gap_a_not_closed: upstairs neighbor exploration only

## Next script

    audit_gap_a_upstairs_source_shell_uniformity_001.py
