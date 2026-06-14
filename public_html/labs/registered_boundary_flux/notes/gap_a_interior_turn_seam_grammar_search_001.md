# Gap A interior turn seam grammar search 001

Status: gap_a_interior_turn_seam_short_source_correction_candidate_found_not_closure

## Boundary

- This does not close Gap A.
- This searches correction paths for the localized interior seam obstruction.
- A correction path is weaker than a source-native generator.
- The outer frame remains protected and is not refit here.
- The IW reusable subgrammar remains a hint only.
- Mode 2 mirror remains projection-level evidence and is not promoted here.
- No physical interpretation is claimed.

## Summary

- seam_search_result: "short_source_correction_candidate_found"
- gap_a_closed: false
- outer_frame_stable: ["IW", "WX", "XY"]
- interior_turn_unstable: ["TI", "YZ", "ZT"]
- seam_count: 18
- mismatch_count: 4
- interior_mismatch_count: 4
- mismatch_by_station: {"T": 1, "Y": 1, "Z": 2}
- mismatch_by_role_pair: {"XY->YZ": 1, "YZ->ZT": 2, "ZT->TI": 1}
- mismatch_counts_by_class: {"short_source_path": 3, "short_source_path_in_support": 1}
- interior_counts_by_class: {"short_source_path": 3, "short_source_path_in_support": 1}
- mismatch_distances: [2, 2, 2, 2]
- max_mismatch_distance: 2
- all_mismatches_source_reachable: true
- all_mismatches_source_reachable_within_3: true
- all_interior_mismatches_source_reachable_within_3: true
- claim_closes_gap_a: false

## Correction summary

{
  "all_interior_mismatches_source_reachable_within_3": true,
  "all_mismatches_source_reachable": true,
  "all_mismatches_source_reachable_within_3": true,
  "counts_by_class": {
    "closed": 14,
    "short_source_path": 3,
    "short_source_path_in_support": 1
  },
  "interior_counts_by_class": {
    "short_source_path": 3,
    "short_source_path_in_support": 1
  },
  "interior_mismatch_count": 4,
  "max_mismatch_distance": 2,
  "mismatch_by_role_pair": {
    "XY->YZ": 1,
    "YZ->ZT": 2,
    "ZT->TI": 1
  },
  "mismatch_by_station": {
    "T": 1,
    "Y": 1,
    "Z": 2
  },
  "mismatch_count": 4,
  "mismatch_counts_by_class": {
    "short_source_path": 3,
    "short_source_path_in_support": 1
  },
  "mismatch_distances": [
    2,
    2,
    2,
    2
  ],
  "mismatch_records_compact": [
    {
      "correction_class": "short_source_path_in_support",
      "cycle": 0,
      "direct_columns": [],
      "left_value": 4,
      "path_columns": [
        10,
        7
      ],
      "path_distance": 2,
      "path_vertices": [
        4,
        3,
        2
      ],
      "right_value": 2,
      "role_pair": "YZ->ZT",
      "station": "Z"
    },
    {
      "correction_class": "short_source_path",
      "cycle": 0,
      "direct_columns": [],
      "left_value": 13,
      "path_columns": [
        29,
        28
      ],
      "path_distance": 2,
      "path_vertices": [
        13,
        9,
        10
      ],
      "right_value": 10,
      "role_pair": "ZT->TI",
      "station": "T"
    },
    {
      "correction_class": "short_source_path",
      "cycle": 1,
      "direct_columns": [],
      "left_value": 2,
      "path_columns": [
        4,
        0
      ],
      "path_distance": 2,
      "path_vertices": [
        2,
        1,
        0
      ],
      "right_value": 0,
      "role_pair": "XY->YZ",
      "station": "Y"
    },
    {
      "correction_class": "short_source_path",
      "cycle": 2,
      "direct_columns": [],
      "left_value": 11,
      "path_columns": [
        23,
        24
      ],
      "path_distance": 2,
      "path_vertices": [
        11,
        7,
        14
      ],
      "right_value": 14,
      "role_pair": "YZ->ZT",
      "station": "Z"
    }
  ],
  "seam_count": 18
}

## Mismatch seam records

- {"correction_class": "short_source_path_in_support", "cycle": 0, "direct_correction_columns": [], "direct_correction_in_support_union": false, "left_row": {"columns": [7, 10], "role": "YZ", "row_ordinal": 2}, "left_value": 4, "right_row": {"columns": [9], "role": "ZT", "row_ordinal": 3}, "right_value": 2, "role_pair": "YZ->ZT", "shortest_path": {"columns": [10, 7], "distance": 2, "edges": [[4, 3], [3, 2]], "reachable": true, "vertices": [4, 3, 2]}, "shortest_path_column_records": [{"column": 10, "g900_slot_edge": [3, 4], "p900_candidate0_edge_law": {"label": "identity", "petersen_edge_a": [3, 4], "petersen_edge_b": [4, 0], "sector_pair": [3, 4], "shared_petersen_vertex": 4, "shift_mod60": 0}, "p900_candidate1_edge_law": {"label": "identity", "petersen_edge_a": [3, 4], "petersen_edge_b": [4, 0], "sector_pair": [3, 4], "shared_petersen_vertex": 4, "shift_mod60": 0}}, {"column": 7, "g900_slot_edge": [2, 3], "p900_candidate0_edge_law": {"label": "half_turn", "petersen_edge_a": [2, 3], "petersen_edge_b": [3, 4], "sector_pair": [2, 3], "shared_petersen_vertex": 3, "shift_mod60": 30}, "p900_candidate1_edge_law": {"label": "half_turn", "petersen_edge_a": [2, 3], "petersen_edge_b": [3, 4], "sector_pair": [2, 3], "shared_petersen_vertex": 3, "shift_mod60": 30}}], "shortest_path_in_support_union": true, "station": "Z", "support_union": [7, 9, 10]}
- {"correction_class": "short_source_path", "cycle": 0, "direct_correction_columns": [], "direct_correction_in_support_union": false, "left_row": {"columns": [9], "role": "ZT", "row_ordinal": 3}, "left_value": 13, "right_row": {"columns": [13], "role": "TI", "row_ordinal": 4}, "right_value": 10, "role_pair": "ZT->TI", "shortest_path": {"columns": [29, 28], "distance": 2, "edges": [[13, 9], [9, 10]], "reachable": true, "vertices": [13, 9, 10]}, "shortest_path_column_records": [{"column": 29, "g900_slot_edge": [9, 13], "p900_candidate0_edge_law": {"label": "identity", "petersen_edge_a": [6, 8], "petersen_edge_b": [8, 5], "sector_pair": [13, 14], "shared_petersen_vertex": 8, "shift_mod60": 0}, "p900_candidate1_edge_law": {"label": "identity", "petersen_edge_a": [6, 8], "petersen_edge_b": [8, 5], "sector_pair": [13, 14], "shared_petersen_vertex": 8, "shift_mod60": 0}}, {"column": 28, "g900_slot_edge": [9, 10], "p900_candidate0_edge_law": {"label": "identity", "petersen_edge_a": [9, 6], "petersen_edge_b": [6, 8], "sector_pair": [12, 13], "shared_petersen_vertex": 6, "shift_mod60": 0}, "p900_candidate1_edge_law": {"label": "identity", "petersen_edge_a": [9, 6], "petersen_edge_b": [6, 8], "sector_pair": [12, 13], "shared_petersen_vertex": 6, "shift_mod60": 0}}], "shortest_path_in_support_union": false, "station": "T", "support_union": [9, 13]}
- {"correction_class": "short_source_path", "cycle": 1, "direct_correction_columns": [], "direct_correction_in_support_union": false, "left_row": {"columns": [4], "role": "XY", "row_ordinal": 7}, "left_value": 2, "right_row": {"columns": [1, 3, 22], "role": "YZ", "row_ordinal": 8}, "right_value": 0, "role_pair": "XY->YZ", "shortest_path": {"columns": [4, 0], "distance": 2, "edges": [[2, 1], [1, 0]], "reachable": true, "vertices": [2, 1, 0]}, "shortest_path_column_records": [{"column": 4, "g900_slot_edge": [1, 2], "p900_candidate0_edge_law": {"label": "half_turn", "petersen_edge_a": [1, 2], "petersen_edge_b": [2, 3], "sector_pair": [1, 2], "shared_petersen_vertex": 2, "shift_mod60": 30}, "p900_candidate1_edge_law": {"label": "half_turn", "petersen_edge_a": [1, 2], "petersen_edge_b": [2, 3], "sector_pair": [1, 2], "shared_petersen_vertex": 2, "shift_mod60": 30}}, {"column": 0, "g900_slot_edge": [0, 1], "p900_candidate0_edge_law": {"label": "half_turn", "petersen_edge_a": [0, 1], "petersen_edge_b": [1, 2], "sector_pair": [0, 1], "shared_petersen_vertex": 1, "shift_mod60": 30}, "p900_candidate1_edge_law": {"label": "half_turn", "petersen_edge_a": [0, 1], "petersen_edge_b": [1, 2], "sector_pair": [0, 1], "shared_petersen_vertex": 1, "shift_mod60": 30}}], "shortest_path_in_support_union": false, "station": "Y", "support_union": [1, 3, 4, 22]}
- {"correction_class": "short_source_path", "cycle": 2, "direct_correction_columns": [], "direct_correction_in_support_union": false, "left_row": {"columns": [4, 5], "role": "YZ", "row_ordinal": 14}, "left_value": 11, "right_row": {"columns": [21, 22], "role": "ZT", "row_ordinal": 15}, "right_value": 14, "role_pair": "YZ->ZT", "shortest_path": {"columns": [23, 24], "distance": 2, "edges": [[11, 7], [7, 14]], "reachable": true, "vertices": [11, 7, 14]}, "shortest_path_column_records": [{"column": 23, "g900_slot_edge": [7, 11], "p900_candidate0_edge_law": {"label": "identity", "petersen_edge_a": [4, 9], "petersen_edge_b": [7, 9], "sector_pair": [9, 11], "shared_petersen_vertex": 9, "shift_mod60": 0}, "p900_candidate1_edge_law": {"label": "half_turn", "petersen_edge_a": [4, 9], "petersen_edge_b": [7, 9], "sector_pair": [9, 11], "shared_petersen_vertex": 9, "shift_mod60": 30}}, {"column": 24, "g900_slot_edge": [7, 14], "p900_candidate0_edge_law": {"label": "identity", "petersen_edge_a": [4, 9], "petersen_edge_b": [9, 6], "sector_pair": [9, 12], "shared_petersen_vertex": 9, "shift_mod60": 0}, "p900_candidate1_edge_law": {"label": "half_turn", "petersen_edge_a": [4, 9], "petersen_edge_b": [9, 6], "sector_pair": [9, 12], "shared_petersen_vertex": 9, "shift_mod60": 30}}], "shortest_path_in_support_union": false, "station": "Z", "support_union": [4, 5, 21, 22]}

## Interpretation

- main_result: The localized interior turn obstruction admits short source-slot correction paths.
- what_this_tests: Whether station mismatches at the interior seam can be treated as source-reachable correction transitions while preserving the stable outer frame.
- why_not_closure: A short correction path is not a source-native generator. It is only a candidate mechanism for the missing interior seam law.
- useful_next_focus: Audit whether the correction paths are unique, source-derived, and reusable across cycles, or whether they are another projection-fit artifact.
- plateau_line: Outer frame stable; interior seam correctable only if a richer source correction law is admitted.

## Claim

- does_this_close_gap_a: false
- does_this_keep_outer_frame_fixed: true
- does_this_find_short_source_correction_candidate: true
- does_this_find_source_native_generator: false
- short_form: "The localized interior turn obstruction admits short source-slot correction paths."
- not_closed_reason: "A short correction path is not a source-native generator. It is only a candidate mechanism for the missing interior seam law."
- next_problem: "Audit whether the correction paths are unique, source-derived, and reusable across cycles, or whether they are another projection-fit artifact."

## Checks

- PASS station_obstruction_loaded: gap_a_station_variable_obstruction_recorded
- PASS station_search_loaded: gap_a_station_variable_strict_candidate_not_found
- PASS overfit_audit_loaded: gap_a_bruteforce_selector_overfit_audited_reusable_subgrammar_salvaged_not_generator
- PASS derivation_return_loaded: gap_a_wxyzti_register_generator_slot_path_candidate_not_found
- PASS upstreamed_supports_loaded: gap_a_projection_row_supports_upstreamed_columnwise_complete_not_generator
- PASS mode2_boundary_loaded: gap_a_mode2_projection_mirror_boundary_note_recorded
- PASS boundary_theorem_loaded: gap_a_boundary_theorem_note_recorded
- PASS slot_graph_loaded: 30
- PASS seams_evaluated: 18
- PASS outer_frame_still_stable: ["IW", "WX", "XY"]
- PASS interior_turn_still_target: ["TI", "YZ", "ZT"]
- PASS gap_a_not_closed: interior seam correction search only

## Next script

    audit_gap_a_interior_turn_correction_paths_001.py
