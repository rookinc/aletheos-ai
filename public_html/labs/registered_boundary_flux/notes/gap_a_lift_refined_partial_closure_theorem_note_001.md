# Gap A lift-refined partial closure theorem note 001

Status: gap_a_lift_refined_partial_closure_theorem_note_recorded

Gap: A - chamber/register map.

## Claim

- closed: false
- bounded_partial_closure: true
- lift_refined: true
- short_form: "Gap A remains open, but the obstruction is sharply bounded and lift-refined: 16/18 rows close after the W-boundary seam; the two residuals lift cleanly upstairs and split into a branch-stable ZT selected-turn residue and a branch-sensitive TI return-path residue."
- not_closed_reason: "No accepted source-derived chamber/register map or bounded anti-overfit rule closes the final two residual rows."

## Boundary

- Gap A is not closed.
- This is a bounded partial closure theorem note, not a full chamber/register map proof.
- No residual flip rule is accepted.
- The G900/P900 lift refines the obstruction but does not eliminate it.
- Future closure must come from source-derived register geometry, source transport orientation, or an independently justified chamber map.

## Closure ladder

- A0 public predicates: confirm selected WXYZTI target but do not close the register map [A0_confirms_A1_supported_A2_row_identity_null_passed]
- A1 row-aware incidence: row-aware M incidence is exact in the tested feature family [bounded_gap_a_selector_theorem_note_recorded]
- A2 row identity: row identity is load-bearing; exact row carriers exist but still require source derivation [row_identity_transport_candidates_derived_not_map_proof]
- A3 edge-column bridge: 30 M columns bind to edge/signature records with explicit indexing repair [edge_column_assignment_bridge_verified_not_map_proof]
- A4 selected WXYZTI projection: direct projection sees 8 of 18 role edges and leaves 10 direct edges missing [selected_wxyzti_projection_partial_not_map_proof]
- A5 bridge paths: all 10 missing direct WXYZTI edges have short bridge paths in the verified source layer [missing_wxyzti_edges_have_bridge_paths_not_map_proof]
- A6 boundary seam: W-boundary seam rule is geometrically justified and closes the role-level majority profile [boundary_seam_rule_geometrically_justified_not_map_proof]
- A7 row-level seam projection: W-boundary seam projection closes 16 of 18 role rows [boundary_seam_projection_role_rows_partial_not_map_proof]
- A8 anti-overfit residual search: no accepted bounded rule closes the final two residuals [no_bounded_residual_rule_found_keep_residuals_open]
- A9 uniform G900 lift: all 18 role rows lift into P900/G900 edge data, but the residuals do not form one shared class [uniform_g900_row_lift_available_residuals_not_separated]
- A10 directed P900 lift: directed lift splits the obstruction: ZT branch-stable, TI branch-sensitive, no matching row branch-sensitive [directed_p900_edge_lift_marks_TI_residual_not_gap_closure]

## Key numbers

- direct_visible_selected_wxyzti_role_edges: 8
- missing_direct_selected_wxyzti_role_edges: 10
- missing_edges_without_bridge_path: []
- role_rows_after_W_seam_matching: 16
- role_rows_after_W_seam_mismatching: 2
- matching_cycles_after_W_seam: 1
- mismatching_cycles_after_W_seam: 2
- allowed_exact_residual_rules: []
- disallowed_exact_residual_rules: ["flip_residual_rows", "flip_ZT_raw1_or_TI_raw0"]
- uniform_g900_lift_rows: 18
- uniform_g900_rows_with_combined_edge_matches: 18
- g900_class_separation_feature_count: 0
- g900_individual_anomaly_feature_count: 8
- directed_branch_sensitive_residual_count: 1
- directed_branch_sensitive_matching_count: 0
- zt_residual_branch_sensitive: false
- ti_residual_branch_sensitive: true

## Open residuals

- cycle=0 role=ZT edge=[3, 4] transport=direct_edge_column path_length=1 raw=1 projected=1 expected=0 is_selected_zt_edge=True
- cycle=2 role=TI edge=[14, 5] transport=bridge_path path_length=2 raw=0 projected=0 expected=1 is_selected_zt_edge=False

## Directed residuals

- row=3 cycle=0 role=ZT edge=[3, 4] columns=[9] branch_sensitive=False branch_difference_fields=[]
  - candidate=0 edges=60 sig=545a35b121ea3d18 shift={"30": 60} residue_delta={"0": 60} bit_transition={"[0, 1]": 30, "[1, 0]": 30}
  - candidate=1 edges=60 sig=545a35b121ea3d18 shift={"30": 60} residue_delta={"0": 60} bit_transition={"[0, 1]": 30, "[1, 0]": 30}
- row=16 cycle=2 role=TI edge=[14, 5] columns=[13, 15] branch_sensitive=True branch_difference_fields=["directed_signature", "bit_transition_hist", "shift_mod60_hist"]
  - candidate=0 edges=120 sig=94f2cc694ce4f652 shift={"30": 120} residue_delta={"0": 120} bit_transition={"[0, 1]": 60, "[1, 0]": 60}
  - candidate=1 edges=120 sig=4fe193663401084e shift={"0": 60, "30": 60} residue_delta={"0": 120} bit_transition={"[0, 0]": 30, "[0, 1]": 30, "[1, 0]": 30, "[1, 1]": 30}

## Interpretation

- main_result: Gap A is open but no longer vague.
- bounded_result: The register-map obstruction is reduced to two row-level residuals after row-aware incidence, edge-column transport, bridge paths, and W-boundary seam projection.
- lift_result: Both residuals lift into the G900/P900 layer, but they do not form one common lifted residual class.
- directed_result: The directed P900 lift splits the residuals: ZT is branch-stable, while TI is branch-sensitive and no matching row shares that branch sensitivity.
- working_meaning: The two residuals are two different upstairs events, not one generic failure.
- next_question: Either freeze this as the current Gap A theorem-note endpoint or begin a new phase seeking a source-derived oriented chamber/register map.

## Checks

- PASS input_exists_selector_theorem_note: registered_boundary_flux/artifacts/json/gap_a_selector_theorem_note_001.v1.json
- PASS input_exists_candidate_recovery: registered_boundary_flux/artifacts/json/register_map_candidate_recovery_002.v1.json
- PASS input_exists_row_identity_carriers: registered_boundary_flux/artifacts/json/gap_a_row_identity_carrier_audit_001.v1.json
- PASS input_exists_row_identity_transport_candidates: registered_boundary_flux/artifacts/json/gap_a_row_identity_transport_candidates_001.v1.json
- PASS input_exists_column_source_links: registered_boundary_flux/artifacts/json/gap_a_column_identity_source_links_001.v1.json
- PASS input_exists_edge_column_assignment_bridge: registered_boundary_flux/artifacts/json/gap_a_edge_column_assignment_bridge_001.v1.json
- PASS input_exists_edge_column_transport_alignment: registered_boundary_flux/artifacts/json/gap_a_edge_column_transport_role_alignment_001.v1.json
- PASS input_exists_selected_wxyzti_projection: registered_boundary_flux/artifacts/json/selected_wxyzti_edge_column_projection_001.v1.json
- PASS input_exists_missing_edge_transport: registered_boundary_flux/artifacts/json/gap_a_missing_wxyzti_edge_transport_001.v1.json
- PASS input_exists_bridge_path_role_pattern: registered_boundary_flux/artifacts/json/gap_a_bridge_paths_wxyzti_role_pattern_001.v1.json
- PASS input_exists_bounded_role_projection_rule: registered_boundary_flux/artifacts/json/gap_a_bounded_role_projection_rule_001.v1.json
- PASS input_exists_boundary_seam_geometry: registered_boundary_flux/artifacts/json/gap_a_boundary_seam_rule_geometry_001.v1.json
- PASS input_exists_boundary_seam_projection_role_rows: registered_boundary_flux/artifacts/json/gap_a_boundary_seam_projection_role_rows_001.v1.json
- PASS input_exists_row_level_residuals: registered_boundary_flux/artifacts/json/gap_a_row_level_seam_projection_residuals_001.v1.json
- PASS input_exists_residual_rule_search: registered_boundary_flux/artifacts/json/gap_a_residual_rule_search_001.v1.json
- PASS input_exists_g900_lift_source_inventory: registered_boundary_flux/artifacts/json/gap_a_g900_lift_source_inventory_001.v1.json
- PASS input_exists_g900_lift_binding_schema: registered_boundary_flux/artifacts/json/gap_a_g900_lift_binding_schema_001.v1.json
- PASS input_exists_uniform_g900_row_lift: registered_boundary_flux/artifacts/json/gap_a_uniform_g900_row_lift_001.v1.json
- PASS input_exists_g900_lift_residual_separation: registered_boundary_flux/artifacts/json/gap_a_g900_lift_residual_separation_001.v1.json
- PASS input_exists_directed_p900_edge_lift: registered_boundary_flux/artifacts/json/gap_a_directed_p900_edge_lift_001.v1.json
- PASS status_selector_theorem_note: expected=bounded_gap_a_selector_theorem_note_recorded got=bounded_gap_a_selector_theorem_note_recorded
- PASS status_candidate_recovery: expected=A0_confirms_A1_supported_A2_row_identity_null_passed got=A0_confirms_A1_supported_A2_row_identity_null_passed
- PASS status_row_identity_carriers: expected=row_identity_carriers_extracted_not_map_proof got=row_identity_carriers_extracted_not_map_proof
- PASS status_row_identity_transport_candidates: expected=row_identity_transport_candidates_derived_not_map_proof got=row_identity_transport_candidates_derived_not_map_proof
- PASS status_column_source_links: expected=column_identity_source_links_audited_not_map_proof got=column_identity_source_links_audited_not_map_proof
- PASS status_edge_column_assignment_bridge: expected=edge_column_assignment_bridge_verified_not_map_proof got=edge_column_assignment_bridge_verified_not_map_proof
- PASS status_edge_column_transport_alignment: expected=edge_column_transport_role_alignment_verified_not_map_proof got=edge_column_transport_role_alignment_verified_not_map_proof
- PASS status_selected_wxyzti_projection: expected=selected_wxyzti_projection_partial_not_map_proof got=selected_wxyzti_projection_partial_not_map_proof
- PASS status_missing_edge_transport: expected=missing_wxyzti_edges_have_bridge_paths_not_map_proof got=missing_wxyzti_edges_have_bridge_paths_not_map_proof
- PASS status_bridge_path_role_pattern: expected=wxyzti_bridge_path_role_pattern_partial_not_map_proof got=wxyzti_bridge_path_role_pattern_partial_not_map_proof
- PASS status_bounded_role_projection_rule: expected=bounded_boundary_seam_projection_candidate_found_not_map_proof got=bounded_boundary_seam_projection_candidate_found_not_map_proof
- PASS status_boundary_seam_geometry: expected=boundary_seam_rule_geometrically_justified_not_map_proof got=boundary_seam_rule_geometrically_justified_not_map_proof
- PASS status_boundary_seam_projection_role_rows: expected=boundary_seam_projection_role_rows_partial_not_map_proof got=boundary_seam_projection_role_rows_partial_not_map_proof
- PASS status_row_level_residuals: expected=row_level_seam_projection_residuals_localized_not_map_proof got=row_level_seam_projection_residuals_localized_not_map_proof
- PASS status_residual_rule_search: expected=no_bounded_residual_rule_found_keep_residuals_open got=no_bounded_residual_rule_found_keep_residuals_open
- PASS status_g900_lift_source_inventory: expected=gap_a_g900_lift_sources_inventoried_ready_for_schema_inspection got=gap_a_g900_lift_sources_inventoried_ready_for_schema_inspection
- PASS status_g900_lift_binding_schema: expected=gap_a_g900_lift_binding_schema_inspected_ready_for_row_lift_attempt got=gap_a_g900_lift_binding_schema_inspected_ready_for_row_lift_attempt
- PASS status_uniform_g900_row_lift: expected=uniform_g900_row_lift_available_residuals_not_separated got=uniform_g900_row_lift_available_residuals_not_separated
- PASS status_g900_lift_residual_separation: expected=g900_lift_residuals_upstairs_distinct_not_class_separated got=g900_lift_residuals_upstairs_distinct_not_class_separated
- PASS status_directed_p900_edge_lift: expected=directed_p900_edge_lift_marks_TI_residual_not_gap_closure got=directed_p900_edge_lift_marks_TI_residual_not_gap_closure
- PASS role_rows_16_of_18_match: {"cycle_count": 3, "matching_cycles": 1, "matching_role_rows": 16, "mismatch_cycle_indices": [0, 2], "mismatch_roles_by_cycle": {"0": ["ZT"], "2": ["TI"]}, "mismatching_cycles": 2, "mismatching_role_rows": 2, "total_role_rows": 18}
- PASS residual_count_2: {"TI_residual_count": 1, "ZT_residual_count": 1, "matching_role_rows": 16, "non_ZT_TI_residual_count": 0, "residual_cycles": [0, 2], "residual_path_lengths": ["1", "2"], "residual_role_rows": 2, "residual_roles": ["TI", "ZT"], "residual_transport_kinds": ["bridge_path", "direct_edge_column"]}
- PASS residual_roles_TI_ZT: residual_roles=["TI", "ZT"]
- PASS no_allowed_exact_residual_rule: allowed_exact=[]
- PASS uniform_g900_lifts_all_18: {"disjoint_feature_count": 8, "disjoint_features": [{"candidate_index": 0, "feature": "lift_signature", "matching_value_count": 10, "residual_value_count": 2, "residual_values": ["87005b957a90aeda05de446f157150739c27a9b50ca784cade8ea6826a227727", "f25a155e492740d1aa6f4ce0f95b44423f91015309ceb84c1c7ce6340aa04024"], "residual_values_disjoint_from_matching": true, "residuals_share_single_value": false, "separates_residuals_as_class": false}, {"candidate_index": 0, "feature": "law_sector_pair_sequence", "matching_value_count": 10, "residual_value_count": 2, "residual_values": ["[[2, 8]]", "[[4, 5], [5, 10]]"], "residual_values_disjoint_from_matching": true, "residuals_share_single_value": false, "separates_residuals_as_class": false}, {"candidate_index": 0, "feature": "law_shared_vertex_sequence", "matching_value_count": 10, "residual_value_count": 2, "residual_values": ["[0, 5]", "[3]"], "residual_values_disjoint_from_matching": true, "residuals_share_single_value": false, "separates_residuals_as_class": false}, {"candidate_index": 0, "feature": "shared_petersen_vertex_hist", "matching_value_count": 9, "residual_value_count": 2, "residual_values": ["{\"0\": 60, \"5\": 60}", "{\"3\": 60}"], "residual_values_disjoint_from_matching": true, "residuals_share_single_value": false, "separates_residuals_as_class": false}, {"candidate_index": 1, "feature": "lift_signature", "matching_value_count": 10, "residual_value_count": 2, "residual_values": ["87005b957a90aeda05de446f157150739c27a9b50ca784cade8ea6826a227727", "c9b43fc146c0dd42b59de3ebf4bdcaaf55cdb1a0276f75ed06d6df2ab357cfab"], "residual_values_disjoint_from_matching": true, "residuals_share_single_value": false, "separates_residuals_as_class": false}, {"candidate_index": 1, "feature": "law_sector_pair_sequence", "matching_value_count": 10, "residual_value_count": 2, "residual_values": ["[[2, 8]]", "[[4, 5], [5, 10]]"], "residual_values_disjoint_from_matching": true, "residuals_share_single_value": false, "separates_residuals_as_class": false}, {"candidate_index": 1, "feature": "law_shared_vertex_sequence", "matching_value_count": 10, "residual_value_count": 2, "residual_values": ["[0, 5]", "[3]"], "residual_values_disjoint_from_matching": true, "residuals_share_single_value": false, "separates_residuals_as_class": false}, {"candidate_index": 1, "feature": "shared_petersen_vertex_hist", "matching_value_count": 9, "residual_value_count": 2, "residual_values": ["{\"0\": 60, \"5\": 60}", "{\"3\": 60}"], "residual_values_disjoint_from_matching": true, "residuals_share_single_value": false, "separates_residuals_as_class": false}], "matching_rows": 16, "p900_candidates": 2, "p900_vertices": 900, "residual_rows": 2, "role_rows": 18, "rows_with_combined_edge_matches": 18, "separating_feature_count": 0, "separating_features": []}
- PASS g900_no_class_separation: {"candidate_branch_sensitive_matching_count": 0, "candidate_branch_sensitive_residual_count": 1, "candidate_divergence_row_count": 1, "class_separation_feature_count": 0, "individual_anomaly_feature_count": 8, "matching_count": 16, "residual_columns": [[9], [13, 15]], "residual_count": 2, "residual_cycles": ["0", "2"], "residual_edge_counts": [{"candidate0_edge_count": 60, "candidate1_edge_count": 60, "role": "ZT", "row_index": 3}, {"candidate0_edge_count": 120, "candidate1_edge_count": 120, "role": "TI", "row_index": 16}], "residual_roles": ["TI", "ZT"], "row_count": 18}
- PASS g900_individual_anomaly_features: {"candidate_branch_sensitive_matching_count": 0, "candidate_branch_sensitive_residual_count": 1, "candidate_divergence_row_count": 1, "class_separation_feature_count": 0, "individual_anomaly_feature_count": 8, "matching_count": 16, "residual_columns": [[9], [13, 15]], "residual_count": 2, "residual_cycles": ["0", "2"], "residual_edge_counts": [{"candidate0_edge_count": 60, "candidate1_edge_count": 60, "role": "ZT", "row_index": 3}, {"candidate0_edge_count": 120, "candidate1_edge_count": 120, "role": "TI", "row_index": 16}], "residual_roles": ["TI", "ZT"], "row_count": 18}
- PASS directed_marks_TI_only: {"both_residual_class_feature_count": 0, "branch_sensitive_matching_count": 0, "branch_sensitive_matching_rows": [], "branch_sensitive_residual_count": 1, "branch_sensitive_residual_rows": [{"branch_difference_fields": ["directed_signature", "bit_transition_hist", "shift_mod60_hist"], "columns": [13, 15], "cycle_index": 2, "role": "TI", "row_index": 16}], "matching_count": 16, "one_residual_marker_count": 1, "residual_count": 2, "row_count": 18, "ti_residual_branch_sensitive": true, "zt_residual_branch_sensitive": false}
- PASS no_matching_branch_sensitive: {"both_residual_class_feature_count": 0, "branch_sensitive_matching_count": 0, "branch_sensitive_matching_rows": [], "branch_sensitive_residual_count": 1, "branch_sensitive_residual_rows": [{"branch_difference_fields": ["directed_signature", "bit_transition_hist", "shift_mod60_hist"], "columns": [13, 15], "cycle_index": 2, "role": "TI", "row_index": 16}], "matching_count": 16, "one_residual_marker_count": 1, "residual_count": 2, "row_count": 18, "ti_residual_branch_sensitive": true, "zt_residual_branch_sensitive": false}

## Next script

    wire_gap_a_lift_refined_status_into_perfect_return_cell_001.py
