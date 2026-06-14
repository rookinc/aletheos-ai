# Gap A candidate row generator from projection artifacts 001

Status: gap_a_candidate_row_generator_from_projection_artifacts_exact_projection_candidate

## Boundary

- This does not close Gap A.
- This is projection-derived, not source-native.
- An exact derived row-support table is not the same as a full 900 carrier-to-register map.
- The target 18-row table is used for scoring candidate projection artifacts.
- No physical interpretation is claimed.

## Summary

- search_result: "projection_derived_exact_generator_found"
- gap_a_closed: false
- target_row_count: 18
- row_table_inventory_count: 72
- scored_candidate_count: 156
- exact_candidate_count: 46
- projection_exact_candidate_count: 4
- selected_candidate_source_kind: "projection_candidate_chamber_register"
- selected_candidate_source_path: "registered_boundary_flux/artifacts/json/gap_a_chamber_register_map_candidate_001.v1.json"
- selected_candidate_row_table_path: "$.candidate_rows"
- selected_candidate_column_list_path: "columns"
- selected_candidate_exact_table: true
- selected_candidate_exact_row_count: 18
- selected_candidate_exact_rows: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
- selected_candidate_average_jaccard: 1.0
- source_native: false
- claim_closes_gap_a: false

## Selected generator

{
  "average_jaccard": 1.0,
  "column_list_path": "columns",
  "definition": "Use the 18-row projection/register artifact table at row_table_path and read column supports from column_list_path. This reproduces the WXYZTI row supports but is not source-native because the artifact already contains WXYZTI row structure.",
  "exact_rows": [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17
  ],
  "exact_table": true,
  "name": "projection_artifact_row_support_generator",
  "row_table_path": "$.candidate_rows",
  "source_kind": "projection_candidate_chamber_register",
  "source_path": "registered_boundary_flux/artifacts/json/gap_a_chamber_register_map_candidate_001.v1.json"
}

## Claim

- does_this_close_gap_a: false
- does_this_find_projection_derived_generator: true
- does_this_find_source_native_generator: false
- does_this_construct_full_900_carrier_to_register_map: false
- short_form: "An exact projection-derived row-support generator was found, but it is not source-native."
- not_closed_reason: "The selected generator reads a derived/projection artifact that already contains WXYZTI row structure."

## Top exact candidates

- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "row_table_path": "$.candidate_rows", "source_kind": "projection_candidate_chamber_register", "source_path": "registered_boundary_flux/artifacts/json/gap_a_chamber_register_map_candidate_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "row_table_path": "$.projected_role_rows", "source_kind": "projection_candidate_boundary_seam", "source_path": "registered_boundary_flux/artifacts/json/gap_a_boundary_seam_projection_role_rows_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "row_table_path": "$.source_rows", "source_kind": "derived_source_preimage_table", "source_path": "registered_boundary_flux/artifacts/json/gap_a_source_preimage_from_normalized_zero_rows_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "row_table_path": "$.candidate_rows", "source_kind": "derived_source_preimage_table", "source_path": "registered_boundary_flux/artifacts/json/gap_a_source_preimage_from_normalized_zero_rows_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "row_table_path": "$.row_witnesses", "source_kind": "target_reference_or_downstream_witness", "source_path": "registered_boundary_flux/artifacts/json/gap_a_column_edge_witness_map_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "found_columns", "exact_row_count": 18, "row_table_path": "$.row_witnesses", "source_kind": "target_reference_or_downstream_witness", "source_path": "registered_boundary_flux/artifacts/json/gap_a_column_edge_witness_map_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "row_table_path": "$.row_records", "source_kind": "downstream_global_witness", "source_path": "registered_boundary_flux/artifacts/json/gap_a_global_carrier_map_with_indexed_witnesses_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "row_table_path": "$.row_patch_records", "source_kind": "downstream_global_witness", "source_path": "registered_boundary_flux/artifacts/json/gap_a_global_edge_parser_patch_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "row_table_path": "$.slot_shuffle_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_15_thalion_residual_split_nulls_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "row_table_path": "$.role_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_bridge_paths_wxyzti_role_pattern_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "row_table_path": "$.row_global_witnesses", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_column_edges_to_global_900_carrier_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "row_table_path": "$.directed_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_directed_p900_edge_lift_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "row_table_path": "$.predicate_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_indexed_global_carrier_predicate_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "row_table_path": "$.witness_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_rows_to_global_carrier_witnesses_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "row_table_path": "$.source_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_source_law_preimage_candidate_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "row_table_path": "$.candidate_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_source_law_preimage_candidate_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "row_table_path": "$.lift_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_uniform_15_thalion_row_lift_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "row_table_path": "$.role_feature_table", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_uniform_15_thalion_row_lift_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "row_table_path": "$.lift_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_uniform_g900_row_lift_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "target_columns", "exact_row_count": 18, "row_table_path": "$.target_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_wxyzti_cycle_generator_from_30_columns_test_001.v1.json"}

## Top candidates overall

- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.candidate_rows", "source_kind": "projection_candidate_chamber_register", "source_path": "registered_boundary_flux/artifacts/json/gap_a_chamber_register_map_candidate_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.projected_role_rows", "source_kind": "projection_candidate_boundary_seam", "source_path": "registered_boundary_flux/artifacts/json/gap_a_boundary_seam_projection_role_rows_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.source_rows", "source_kind": "derived_source_preimage_table", "source_path": "registered_boundary_flux/artifacts/json/gap_a_source_preimage_from_normalized_zero_rows_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.candidate_rows", "source_kind": "derived_source_preimage_table", "source_path": "registered_boundary_flux/artifacts/json/gap_a_source_preimage_from_normalized_zero_rows_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.row_witnesses", "source_kind": "target_reference_or_downstream_witness", "source_path": "registered_boundary_flux/artifacts/json/gap_a_column_edge_witness_map_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "found_columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.row_witnesses", "source_kind": "target_reference_or_downstream_witness", "source_path": "registered_boundary_flux/artifacts/json/gap_a_column_edge_witness_map_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.row_records", "source_kind": "downstream_global_witness", "source_path": "registered_boundary_flux/artifacts/json/gap_a_global_carrier_map_with_indexed_witnesses_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.row_patch_records", "source_kind": "downstream_global_witness", "source_path": "registered_boundary_flux/artifacts/json/gap_a_global_edge_parser_patch_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.slot_shuffle_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_15_thalion_residual_split_nulls_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.role_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_bridge_paths_wxyzti_role_pattern_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.row_global_witnesses", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_column_edges_to_global_900_carrier_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.directed_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_directed_p900_edge_lift_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.predicate_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_indexed_global_carrier_predicate_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.witness_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_rows_to_global_carrier_witnesses_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.source_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_source_law_preimage_candidate_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.candidate_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_source_law_preimage_candidate_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.lift_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_uniform_15_thalion_row_lift_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.role_feature_table", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_uniform_15_thalion_row_lift_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.lift_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_uniform_g900_row_lift_001.v1.json"}
- {"average_jaccard": 1.0, "column_list_path": "target_columns", "exact_row_count": 18, "exact_rows": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "exact_table": true, "row_table_path": "$.target_rows", "source_kind": "downstream_note_or_predicate", "source_path": "registered_boundary_flux/artifacts/json/gap_a_wxyzti_cycle_generator_from_30_columns_test_001.v1.json"}

## Interpretation

- main_result: Projection/register artifacts contain exact WXYZTI row-support structure.
- what_this_means: The row generator exists downstream as projection/register structure, but has not been derived directly from the 900 source carrier.
- why_simple_source_test_failed: The WXYZTI row supports include interior-turn and residual structure not captured by simple scalar or mod-cycle rules.
- next_move: Distill the selected projection artifact into an explicit candidate rule, then test whether each ingredient can be sourced upstream.

## Checks

- PASS cycle_generator_test_loaded: gap_a_wxyzti_cycle_generator_from_30_columns_no_exact_candidate
- PASS source_native_search_loaded: gap_a_source_native_row_generator_search_no_source_native_generator
- PASS full_map_attempt_loaded: gap_a_full_carrier_to_wxyzti_register_map_attempt_source_map_missing
- PASS boundary_theorem_loaded: gap_a_boundary_theorem_note_recorded
- PASS column_edge_map_loaded: gap_a_column_edge_witness_map_extracted
- PASS target_rows_18: 18
- PASS row_tables_found: 72
- PASS candidate_scores_found: 156
- PASS projection_exact_candidate_found: 4
- PASS selected_candidate_exact: 18
- PASS gap_a_not_closed: projection-derived generator only

## Next script

    distill_gap_a_projection_row_generator_rule_001.py
