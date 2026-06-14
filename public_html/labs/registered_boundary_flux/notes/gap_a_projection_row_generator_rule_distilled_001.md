# Gap A projection row generator rule distilled 001

Status: gap_a_projection_row_generator_rule_distilled_not_source_native

## Boundary

- This does not close Gap A.
- The distilled rule is projection-derived, not source-native.
- The rule imports an artifact that already contains WXYZTI row structure.
- The purpose is to identify which ingredients must still be moved upstream.
- No physical interpretation is claimed.

## Distilled rule

- name: projection_chamber_register_row_generator_rule
- status: projection_derived_not_source_native
- input_artifact: registered_boundary_flux/artifacts/json/gap_a_chamber_register_map_candidate_001.v1.json
- row_table_path: $.candidate_rows
- column_support_path: columns

Algorithm:
- Read the 18-row chamber/register candidate table.
- Use row_ordinal to assign cycle=floor(row_ordinal/6) and role_index=row_ordinal mod 6.
- Use WXYZTI role order [WX, XY, YZ, ZT, TI, IW].
- Read the row support from candidate_rows[*].columns.
- Mark the residual preimage side by zero_twisted_source_row AND (singleton_ZT OR multi_column_TI).
- Mark the stable complement by zero_twisted_source_row AND (singleton_TI OR multi_column_ZT).

## Summary

- distillation_result: "projection_rule_distilled_not_source_native"
- gap_a_closed: false
- selected_input_artifact: "registered_boundary_flux/artifacts/json/gap_a_chamber_register_map_candidate_001.v1.json"
- selected_row_table_path: "$.candidate_rows"
- selected_column_support_path: "columns"
- row_count: 18
- row_supports_exact: true
- exact_rows: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
- preimage_support: [3, 16]
- preimage_exact: true
- stable_complement_support: [4, 9, 15]
- stable_complement_exact: true
- residual_rows_reported: [3, 16]
- source_native_components: ["30 indexed carrier-law columns"]
- projection_derived_components: ["WXYZTI role order and 18-row register frame", "row support table columns"]
- still_missing_components: ["full 900 carrier-to-WXYZTI row generator"]
- claim_closes_gap_a: false

## Ingredient provenance

- {"classification": "source_native_global", "evidence": "p900 edge_law_table and g900 slot_edges_g15_line_petersen", "ingredient": "30 indexed carrier-law columns", "status": "available"}
- {"classification": "source_anchored_witness_layer", "evidence": "gap_a_global_carrier_map_with_indexed_witnesses_001", "ingredient": "global direct-or-indexed witness coverage", "status": "complete_30_columns_18_rows"}
- {"classification": "projection_derived", "evidence": "gap_a_chamber_register_map_candidate_001 and boundary seam projection artifacts", "ingredient": "WXYZTI role order and 18-row register frame", "status": "available_downstream_not_source_native"}
- {"classification": "projection_derived", "evidence": "gap_a_chamber_register_map_candidate_001 $.candidate_rows[*].columns", "ingredient": "row support table columns", "status": "exact_against_target"}
- {"classification": "source_anchored_but_row_table_dependent", "evidence": "normalized zero rows and 15-thalion uniform lift lineage", "ingredient": "zero-twisted row neighborhood", "status": "exact_on_18_row_table"}
- {"classification": "bounded_indexed_predicate", "evidence": "zero_twisted_source_row AND (singleton_ZT OR multi_column_TI)", "ingredient": "residual preimage selector", "status": "selects_rows_3_16"}
- {"classification": "bounded_indexed_predicate", "evidence": "zero_twisted_source_row AND (singleton_TI OR multi_column_ZT)", "ingredient": "stable complement selector", "status": "selects_rows_4_9_15"}
- {"classification": "missing", "evidence": "source-native search and full-map attempt", "ingredient": "full 900 carrier-to-WXYZTI row generator", "status": "not_constructed"}

## Distilled rows

- {"columns": [0], "cycle": 0, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "needs_residual_side_adjustment": false, "preimage_truth": false, "role": "WX", "row_ordinal": 0, "stable_complement_truth": false, "zero_twisted_source_row": false}
- {"columns": [4], "cycle": 0, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "needs_residual_side_adjustment": false, "preimage_truth": false, "role": "XY", "row_ordinal": 1, "stable_complement_truth": false, "zero_twisted_source_row": false}
- {"columns": [7, 10], "cycle": 0, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "needs_residual_side_adjustment": false, "preimage_truth": false, "role": "YZ", "row_ordinal": 2, "stable_complement_truth": false, "zero_twisted_source_row": false}
- {"columns": [9], "cycle": 0, "distilled_preimage_rule": true, "distilled_stable_complement_rule": false, "needs_residual_side_adjustment": true, "preimage_truth": true, "role": "ZT", "row_ordinal": 3, "stable_complement_truth": false, "zero_twisted_source_row": true}
- {"columns": [13], "cycle": 0, "distilled_preimage_rule": false, "distilled_stable_complement_rule": true, "needs_residual_side_adjustment": false, "preimage_truth": false, "role": "TI", "row_ordinal": 4, "stable_complement_truth": true, "zero_twisted_source_row": true}
- {"columns": [1, 7], "cycle": 0, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "needs_residual_side_adjustment": false, "preimage_truth": false, "role": "IW", "row_ordinal": 5, "stable_complement_truth": false, "zero_twisted_source_row": false}
- {"columns": [0], "cycle": 1, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "needs_residual_side_adjustment": false, "preimage_truth": false, "role": "WX", "row_ordinal": 6, "stable_complement_truth": false, "zero_twisted_source_row": false}
- {"columns": [4], "cycle": 1, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "needs_residual_side_adjustment": false, "preimage_truth": false, "role": "XY", "row_ordinal": 7, "stable_complement_truth": false, "zero_twisted_source_row": false}
- {"columns": [1, 3, 22], "cycle": 1, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "needs_residual_side_adjustment": false, "preimage_truth": false, "role": "YZ", "row_ordinal": 8, "stable_complement_truth": false, "zero_twisted_source_row": false}
- {"columns": [9, 11, 14], "cycle": 1, "distilled_preimage_rule": false, "distilled_stable_complement_rule": true, "needs_residual_side_adjustment": false, "preimage_truth": false, "role": "ZT", "row_ordinal": 9, "stable_complement_truth": true, "zero_twisted_source_row": true}
- {"columns": [10, 11], "cycle": 1, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "needs_residual_side_adjustment": false, "preimage_truth": false, "role": "TI", "row_ordinal": 10, "stable_complement_truth": false, "zero_twisted_source_row": false}
- {"columns": [1, 7], "cycle": 1, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "needs_residual_side_adjustment": false, "preimage_truth": false, "role": "IW", "row_ordinal": 11, "stable_complement_truth": false, "zero_twisted_source_row": false}
- {"columns": [0], "cycle": 2, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "needs_residual_side_adjustment": false, "preimage_truth": false, "role": "WX", "row_ordinal": 12, "stable_complement_truth": false, "zero_twisted_source_row": false}
- {"columns": [4], "cycle": 2, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "needs_residual_side_adjustment": false, "preimage_truth": false, "role": "XY", "row_ordinal": 13, "stable_complement_truth": false, "zero_twisted_source_row": false}
- {"columns": [4, 5], "cycle": 2, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "needs_residual_side_adjustment": false, "preimage_truth": false, "role": "YZ", "row_ordinal": 14, "stable_complement_truth": false, "zero_twisted_source_row": false}
- {"columns": [21, 22], "cycle": 2, "distilled_preimage_rule": false, "distilled_stable_complement_rule": true, "needs_residual_side_adjustment": false, "preimage_truth": false, "role": "ZT", "row_ordinal": 15, "stable_complement_truth": true, "zero_twisted_source_row": true}
- {"columns": [13, 15], "cycle": 2, "distilled_preimage_rule": true, "distilled_stable_complement_rule": false, "needs_residual_side_adjustment": true, "preimage_truth": true, "role": "TI", "row_ordinal": 16, "stable_complement_truth": false, "zero_twisted_source_row": true}
- {"columns": [1, 7], "cycle": 2, "distilled_preimage_rule": false, "distilled_stable_complement_rule": false, "needs_residual_side_adjustment": false, "preimage_truth": false, "role": "IW", "row_ordinal": 17, "stable_complement_truth": false, "zero_twisted_source_row": false}

## Claim

- does_this_close_gap_a: false
- does_this_distill_projection_row_generator: true
- does_this_find_source_native_generator: false
- does_this_construct_full_900_carrier_to_register_map: false
- short_form: "The WXYZTI row generator can be stated exactly from the chamber/register projection artifact, but the full source-native generator remains missing."
- not_closed_reason: "The rule still imports WXYZTI row structure from a projection artifact."

## Interpretation

- main_result: The downstream generator is now explicit: read chamber candidate rows and classify zero-twisted ZT/TI orientation for preimage and stable complement.
- what_is_source_native: The 30-column carrier-law indexing is source-native.
- what_is_not_source_native: The grouping of those columns into 18 WXYZTI rows is still imported from projection/register artifacts.
- next_move: Try to upstream the projection row supports by explaining each candidate_rows[*].columns support from source carrier-law records.

## Checks

- PASS projection_generator_loaded: gap_a_candidate_row_generator_from_projection_artifacts_exact_projection_candidate
- PASS cycle_generator_test_loaded: gap_a_wxyzti_cycle_generator_from_30_columns_no_exact_candidate
- PASS source_native_search_loaded: gap_a_source_native_row_generator_search_no_source_native_generator
- PASS full_map_attempt_loaded: gap_a_full_carrier_to_wxyzti_register_map_attempt_source_map_missing
- PASS boundary_theorem_loaded: gap_a_boundary_theorem_note_recorded
- PASS indexed_predicate_loaded: gap_a_indexed_global_carrier_predicate_exact
- PASS global_indexed_map_loaded: gap_a_global_carrier_map_with_indexed_witnesses_complete
- PASS chamber_candidate_loaded: gap_a_chamber_register_map_candidate_found_not_closure
- PASS column_edge_map_loaded: gap_a_column_edge_witness_map_extracted
- PASS chamber_rows_18: 18
- PASS target_rows_18: 18
- PASS row_supports_exact: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
- PASS preimage_exact: [3, 16]
- PASS stable_complement_exact: [4, 9, 15]
- PASS missing_full_source_generator_recorded: ["full 900 carrier-to-WXYZTI row generator"]
- PASS gap_a_not_closed: projection-derived rule only

## Next script

    upstream_gap_a_projection_row_supports_to_source_columns_001.py
