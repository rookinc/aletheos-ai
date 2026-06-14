# Gap A interior turn correction paths audit 001

Status: gap_a_interior_turn_correction_paths_audited_projection_fit_risk_remains

## Boundary

- This does not close Gap A.
- This audits correction paths, not a source-native generator.
- Distance-2 reachability is necessary evidence only.
- Uniqueness, support-internality, and signature uniformity determine projection-fit risk.
- The outer frame remains protected and is not refit here.
- Mode 2 mirror remains projection-level evidence and is not promoted here.
- No physical interpretation is claimed.

## Summary

- audit_result: "correction_candidate_has_projection_fit_risk"
- gap_a_closed: false
- mismatch_count: 4
- all_length_2: true
- unique_shortest_column_path_count: 4
- all_unique_shortest_column_paths: true
- support_internal_count: 1
- all_support_internal: false
- uniqueness_counts: {"unique_vertex_and_column_path": 4}
- station_counts: {"T": 1, "Y": 1, "Z": 2}
- role_pair_counts: {"XY->YZ": 1, "YZ->ZT": 2, "ZT->TI": 1}
- candidate0_label_signatures: {"half_turn->half_turn": 1, "identity->half_turn": 1, "identity->identity": 2}
- candidate1_label_signatures: {"half_turn->half_turn": 2, "identity->half_turn": 1, "identity->identity": 1}
- candidate0_shift_signatures: {"0->0": 2, "0->30": 1, "30->30": 1}
- candidate1_shift_signatures: {"0->0": 1, "0->30": 1, "30->30": 2}
- all_same_candidate0_label_signature: false
- all_same_candidate1_label_signature: false
- outer_frame_stable: ["IW", "WX", "XY"]
- interior_turn_unstable: ["TI", "YZ", "ZT"]
- claim_closes_gap_a: false

## Classification

- survives_as: "short correction evidence with projection-fit risk"
- risk_factors: ["not all selected correction paths are internal to row supports", "candidate0 label signatures are not uniform", "candidate1 label signatures are not uniform"]
- safe_claims: ["all localized interior mismatches are length-2 source-slot reachable", "outer frame remains fixed", "correction paths are candidate mechanisms, not generators"]
- forbidden_claims: ["do not call this Gap A closure", "do not call the correction paths source-derived law", "do not use the correction paths as physical interpretation"]

## Audit records

- {"cycle": 0, "left_value": 4, "right_value": 2, "role_pair": "YZ->ZT", "selected_path": {"column_records": [{"column": 10, "g900_slot_edge": [3, 4], "p900_candidate0_edge_law": {"label": "identity", "petersen_edge_a": [3, 4], "petersen_edge_b": [4, 0], "sector_pair": [3, 4], "shared_petersen_vertex": 4, "shift_mod60": 0}, "p900_candidate1_edge_law": {"label": "identity", "petersen_edge_a": [3, 4], "petersen_edge_b": [4, 0], "sector_pair": [3, 4], "shared_petersen_vertex": 4, "shift_mod60": 0}}, {"column": 7, "g900_slot_edge": [2, 3], "p900_candidate0_edge_law": {"label": "half_turn", "petersen_edge_a": [2, 3], "petersen_edge_b": [3, 4], "sector_pair": [2, 3], "shared_petersen_vertex": 3, "shift_mod60": 30}, "p900_candidate1_edge_law": {"label": "half_turn", "petersen_edge_a": [2, 3], "petersen_edge_b": [3, 4], "sector_pair": [2, 3], "shared_petersen_vertex": 3, "shift_mod60": 30}}], "columns": [10, 7], "distance": 2, "in_support_union": true, "signatures": [{"candidate": "p900_candidate0_edge_law", "columns": [10, 7], "label_signature": "identity->half_turn", "labels": ["identity", "half_turn"], "petersen_edge_a": [[3, 4], [2, 3]], "petersen_edge_b": [[4, 0], [3, 4]], "sector_pairs": [[3, 4], [2, 3]], "shared_petersen_vertices": [4, 3], "shift_signature": "0->30", "shifts": [0, 30]}, {"candidate": "p900_candidate1_edge_law", "columns": [10, 7], "label_signature": "identity->half_turn", "labels": ["identity", "half_turn"], "petersen_edge_a": [[3, 4], [2, 3]], "petersen_edge_b": [[4, 0], [3, 4]], "sector_pairs": [[3, 4], [2, 3]], "shared_petersen_vertices": [4, 3], "shift_signature": "0->30", "shifts": [0, 30]}], "support_union": [7, 9, 10], "vertices": [4, 3, 2]}, "selected_path_is_unique_shortest_column_path": true, "shortest_column_path_count": 1, "shortest_vertex_path_count": 1, "station": "Z", "support_internal": true, "uniqueness_class": "unique_vertex_and_column_path"}
- {"cycle": 0, "left_value": 13, "right_value": 10, "role_pair": "ZT->TI", "selected_path": {"column_records": [{"column": 29, "g900_slot_edge": [9, 13], "p900_candidate0_edge_law": {"label": "identity", "petersen_edge_a": [6, 8], "petersen_edge_b": [8, 5], "sector_pair": [13, 14], "shared_petersen_vertex": 8, "shift_mod60": 0}, "p900_candidate1_edge_law": {"label": "identity", "petersen_edge_a": [6, 8], "petersen_edge_b": [8, 5], "sector_pair": [13, 14], "shared_petersen_vertex": 8, "shift_mod60": 0}}, {"column": 28, "g900_slot_edge": [9, 10], "p900_candidate0_edge_law": {"label": "identity", "petersen_edge_a": [9, 6], "petersen_edge_b": [6, 8], "sector_pair": [12, 13], "shared_petersen_vertex": 6, "shift_mod60": 0}, "p900_candidate1_edge_law": {"label": "identity", "petersen_edge_a": [9, 6], "petersen_edge_b": [6, 8], "sector_pair": [12, 13], "shared_petersen_vertex": 6, "shift_mod60": 0}}], "columns": [29, 28], "distance": 2, "in_support_union": false, "signatures": [{"candidate": "p900_candidate0_edge_law", "columns": [29, 28], "label_signature": "identity->identity", "labels": ["identity", "identity"], "petersen_edge_a": [[6, 8], [9, 6]], "petersen_edge_b": [[8, 5], [6, 8]], "sector_pairs": [[13, 14], [12, 13]], "shared_petersen_vertices": [8, 6], "shift_signature": "0->0", "shifts": [0, 0]}, {"candidate": "p900_candidate1_edge_law", "columns": [29, 28], "label_signature": "identity->identity", "labels": ["identity", "identity"], "petersen_edge_a": [[6, 8], [9, 6]], "petersen_edge_b": [[8, 5], [6, 8]], "sector_pairs": [[13, 14], [12, 13]], "shared_petersen_vertices": [8, 6], "shift_signature": "0->0", "shifts": [0, 0]}], "support_union": [9, 13], "vertices": [13, 9, 10]}, "selected_path_is_unique_shortest_column_path": true, "shortest_column_path_count": 1, "shortest_vertex_path_count": 1, "station": "T", "support_internal": false, "uniqueness_class": "unique_vertex_and_column_path"}
- {"cycle": 1, "left_value": 2, "right_value": 0, "role_pair": "XY->YZ", "selected_path": {"column_records": [{"column": 4, "g900_slot_edge": [1, 2], "p900_candidate0_edge_law": {"label": "half_turn", "petersen_edge_a": [1, 2], "petersen_edge_b": [2, 3], "sector_pair": [1, 2], "shared_petersen_vertex": 2, "shift_mod60": 30}, "p900_candidate1_edge_law": {"label": "half_turn", "petersen_edge_a": [1, 2], "petersen_edge_b": [2, 3], "sector_pair": [1, 2], "shared_petersen_vertex": 2, "shift_mod60": 30}}, {"column": 0, "g900_slot_edge": [0, 1], "p900_candidate0_edge_law": {"label": "half_turn", "petersen_edge_a": [0, 1], "petersen_edge_b": [1, 2], "sector_pair": [0, 1], "shared_petersen_vertex": 1, "shift_mod60": 30}, "p900_candidate1_edge_law": {"label": "half_turn", "petersen_edge_a": [0, 1], "petersen_edge_b": [1, 2], "sector_pair": [0, 1], "shared_petersen_vertex": 1, "shift_mod60": 30}}], "columns": [4, 0], "distance": 2, "in_support_union": false, "signatures": [{"candidate": "p900_candidate0_edge_law", "columns": [4, 0], "label_signature": "half_turn->half_turn", "labels": ["half_turn", "half_turn"], "petersen_edge_a": [[1, 2], [0, 1]], "petersen_edge_b": [[2, 3], [1, 2]], "sector_pairs": [[1, 2], [0, 1]], "shared_petersen_vertices": [2, 1], "shift_signature": "30->30", "shifts": [30, 30]}, {"candidate": "p900_candidate1_edge_law", "columns": [4, 0], "label_signature": "half_turn->half_turn", "labels": ["half_turn", "half_turn"], "petersen_edge_a": [[1, 2], [0, 1]], "petersen_edge_b": [[2, 3], [1, 2]], "sector_pairs": [[1, 2], [0, 1]], "shared_petersen_vertices": [2, 1], "shift_signature": "30->30", "shifts": [30, 30]}], "support_union": [1, 3, 4, 22], "vertices": [2, 1, 0]}, "selected_path_is_unique_shortest_column_path": true, "shortest_column_path_count": 1, "shortest_vertex_path_count": 1, "station": "Y", "support_internal": false, "uniqueness_class": "unique_vertex_and_column_path"}
- {"cycle": 2, "left_value": 11, "right_value": 14, "role_pair": "YZ->ZT", "selected_path": {"column_records": [{"column": 23, "g900_slot_edge": [7, 11], "p900_candidate0_edge_law": {"label": "identity", "petersen_edge_a": [4, 9], "petersen_edge_b": [7, 9], "sector_pair": [9, 11], "shared_petersen_vertex": 9, "shift_mod60": 0}, "p900_candidate1_edge_law": {"label": "half_turn", "petersen_edge_a": [4, 9], "petersen_edge_b": [7, 9], "sector_pair": [9, 11], "shared_petersen_vertex": 9, "shift_mod60": 30}}, {"column": 24, "g900_slot_edge": [7, 14], "p900_candidate0_edge_law": {"label": "identity", "petersen_edge_a": [4, 9], "petersen_edge_b": [9, 6], "sector_pair": [9, 12], "shared_petersen_vertex": 9, "shift_mod60": 0}, "p900_candidate1_edge_law": {"label": "half_turn", "petersen_edge_a": [4, 9], "petersen_edge_b": [9, 6], "sector_pair": [9, 12], "shared_petersen_vertex": 9, "shift_mod60": 30}}], "columns": [23, 24], "distance": 2, "in_support_union": false, "signatures": [{"candidate": "p900_candidate0_edge_law", "columns": [23, 24], "label_signature": "identity->identity", "labels": ["identity", "identity"], "petersen_edge_a": [[4, 9], [4, 9]], "petersen_edge_b": [[7, 9], [9, 6]], "sector_pairs": [[9, 11], [9, 12]], "shared_petersen_vertices": [9, 9], "shift_signature": "0->0", "shifts": [0, 0]}, {"candidate": "p900_candidate1_edge_law", "columns": [23, 24], "label_signature": "half_turn->half_turn", "labels": ["half_turn", "half_turn"], "petersen_edge_a": [[4, 9], [4, 9]], "petersen_edge_b": [[7, 9], [9, 6]], "sector_pairs": [[9, 11], [9, 12]], "shared_petersen_vertices": [9, 9], "shift_signature": "30->30", "shifts": [30, 30]}], "support_union": [4, 5, 21, 22], "vertices": [11, 7, 14]}, "selected_path_is_unique_shortest_column_path": true, "shortest_column_path_count": 1, "shortest_vertex_path_count": 1, "station": "Z", "support_internal": false, "uniqueness_class": "unique_vertex_and_column_path"}

## Interpretation

- main_result: The correction paths remain useful evidence, but projection-fit risk remains.
- what_survived: Every interior mismatch remains source-slot reachable at distance 2.
- what_failed_or_remains_risky: Uniform reusable law has not been established; uniqueness and signature uniformity must be treated conservatively.
- why_not_closure: A path audit can show reachability and pattern, but not source derivation of the register generator.
- next_move: Record the correction-path boundary and keep Gap A open unless a stronger source-derived seam law is found.

## Claim

- does_this_close_gap_a: false
- does_this_audit_all_correction_paths: true
- does_this_preserve_outer_frame: true
- does_this_find_reusable_correction_candidate: false
- does_projection_fit_risk_remain: true
- does_this_find_source_native_generator: false
- short_form: "The correction paths remain useful evidence, but projection-fit risk remains."
- not_closed_reason: "A path audit can show reachability and pattern, but not source derivation of the register generator."
- next_problem: "Record the correction-path boundary and keep Gap A open unless a stronger source-derived seam law is found."

## Checks

- PASS interior_seam_loaded: gap_a_interior_turn_seam_short_source_correction_candidate_found_not_closure
- PASS station_obstruction_loaded: gap_a_station_variable_obstruction_recorded
- PASS station_search_loaded: gap_a_station_variable_strict_candidate_not_found
- PASS overfit_audit_loaded: gap_a_bruteforce_selector_overfit_audited_reusable_subgrammar_salvaged_not_generator
- PASS derivation_return_loaded: gap_a_wxyzti_register_generator_slot_path_candidate_not_found
- PASS upstreamed_supports_loaded: gap_a_projection_row_supports_upstreamed_columnwise_complete_not_generator
- PASS mode2_boundary_loaded: gap_a_mode2_projection_mirror_boundary_note_recorded
- PASS boundary_theorem_loaded: gap_a_boundary_theorem_note_recorded
- PASS mismatch_records_loaded: 4
- PASS all_length_2: [2, 2, 2, 2]
- PASS source_slot_graph_loaded: 30
- PASS gap_a_not_closed: correction path audit only

## Next script

    record_gap_a_open_with_localized_obstruction_001.py
