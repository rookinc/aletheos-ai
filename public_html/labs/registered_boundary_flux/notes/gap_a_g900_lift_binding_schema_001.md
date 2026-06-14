# Gap A G900 lift binding schema 001

Status: gap_a_g900_lift_binding_schema_inspected_ready_for_row_lift_attempt

Gap: A - chamber/register map.

## Boundary

- This is not a G900 lift proof.
- This does not bind WXYZTI rows to 900-level records yet.
- This inspects schemas and chooses candidate fields for the next lift attempt.
- The next pass must apply the same lift logic to all 18 role rows, not only residual rows.

## Summary

- strong_sources: ["p900_phase30_combined_graph_export"]
- metadata_sources: ["p900_phase18_component_structure", "p900_phase19_doubled_g15_sheet_audit", "p900_phase16_preferred_representative_edge_law", "g900_signature_binding", "k900_action_binding"]
- edge_column_sources: ["theorem_object"]
- primary_source: "p900_phase30_combined_graph_export"
- primary_900_list_paths: ["$.vertices"]
- primary_3600_list_paths: ["$.candidates[0].combined_edges", "$.candidates[1].combined_edges"]
- primary_30_list_paths: ["$.candidates[0].edge_law_table", "$.candidates[1].edge_law_table"]

## Source profiles

- p900_phase30_combined_graph_export: strength=strong_900_graph_export exists=True path=../json/p900/p900_phase30_combined_graph_export.json top_keys=["candidates", "checks", "first_read", "name", "phase", "purpose", "renderer_defaults", "source_artifacts", "status", "vertices", "warning"]
  - list path=$.candidates[0].combined_edges length=3600 pair=False edge_dict=True keys=["class", "edge_class", "local_a", "local_b", "residue_a", "residue_b", "sector_a", "sector_b", "shared_petersen_vertex", "shift_mod60", "source", "target"] lift_fields=["edge_class", "residue_a", "residue_b", "sector_a", "sector_b", "shared_petersen_vertex", "shift_mod60", "source", "target"]
  - list path=$.candidates[0].edge_law_table length=30 pair=False edge_dict=False keys=["label", "petersen_edge_a", "petersen_edge_b", "sector_a", "sector_b", "shared_petersen_vertex", "shift_mod60"] lift_fields=["petersen_edge_a", "petersen_edge_b", "sector_a", "sector_b", "shared_petersen_vertex", "shift_mod60"]
  - list path=$.candidates[1].combined_edges length=3600 pair=False edge_dict=True keys=["class", "edge_class", "local_a", "local_b", "residue_a", "residue_b", "sector_a", "sector_b", "shared_petersen_vertex", "shift_mod60", "source", "target"] lift_fields=["edge_class", "residue_a", "residue_b", "sector_a", "sector_b", "shared_petersen_vertex", "shift_mod60", "source", "target"]
  - list path=$.candidates[1].edge_law_table length=30 pair=False edge_dict=False keys=["label", "petersen_edge_a", "petersen_edge_b", "sector_a", "sector_b", "shared_petersen_vertex", "shift_mod60"] lift_fields=["petersen_edge_a", "petersen_edge_b", "sector_a", "sector_b", "shared_petersen_vertex", "shift_mod60"]
  - list path=$.vertices length=900 pair=False edge_dict=False keys=["bit", "id", "local", "residue_mod30", "sector"] lift_fields=["residue_mod30", "sector"]
- p900_phase18_component_structure: strength=metadata_or_binding_source exists=True path=../json/p900/p900_phase18_component_structure.json top_keys=["all_components_have_15_sectors", "all_components_single_mod30_residue", "all_components_size_30", "all_components_two_per_sector", "component_count", "component_records", "component_size_histogram", "first_read", "local_residue_mod_30_count_histogram", "name", "sector_count_pattern_histogram", "source", "status", "warning"]
  - list path=$.component_records length=30 pair=False edge_dict=False keys=["component_index", "local_max", "local_min", "local_parity_counts", "local_residue_mod_30_count", "local_residues_mod_30", "local_values", "members", "sector_count_histogram", "sectors_present", "size"] lift_fields=["component_index", "local_residue_mod_30_count", "local_residues_mod_30", "sector_count_histogram", "sectors_present"]
  - list path=$.component_records[0].local_values length=30 pair=False edge_dict=False keys=[] lift_fields=[]
  - list path=$.component_records[0].members length=30 pair=True edge_dict=False keys=[] lift_fields=[]
  - list path=$.component_records[0].sectors_present length=15 pair=False edge_dict=False keys=[] lift_fields=[]
  - list path=$.component_records[1].local_values length=30 pair=False edge_dict=False keys=[] lift_fields=[]
  - list path=$.component_records[1].members length=30 pair=True edge_dict=False keys=[] lift_fields=[]
  - list path=$.component_records[1].sectors_present length=15 pair=False edge_dict=False keys=[] lift_fields=[]
  - list path=$.component_records[2].local_values length=30 pair=False edge_dict=False keys=[] lift_fields=[]
- p900_phase19_doubled_g15_sheet_audit: strength=metadata_or_binding_source exists=True path=../json/p900/p900_phase19_doubled_g15_sheet_audit.json top_keys=["all_sheets_2_lifts_of_g15", "all_sheets_4_regular", "all_sheets_have_60_edges", "all_sheets_same_type", "first_read", "name", "preferred_half_turn_set", "preferred_identity_set", "sheet_count", "sheet_records", "sheet_type_histogram", "source", "status", "warning"]
  - list path=$.sheet_records length=30 pair=False edge_dict=False keys=["bit_edge_counts", "degree_histogram", "edge_count", "is_2_lift_of_g15", "sample_edges", "sheet_residue_mod_30", "vertex_count"] lift_fields=["bit_edge_counts", "edge_count", "is_2_lift_of_g15", "sample_edges", "sheet_residue_mod_30", "vertex_count"]
- p900_phase16_preferred_representative_edge_law: strength=metadata_or_binding_source exists=True path=../json/p900/p900_phase16_preferred_representative_edge_law.json top_keys=["edge_label_counts", "edge_records", "g15_edges", "generated_utc", "name", "next_tests", "phase15_support", "preferred_family", "preferred_half_turn_set", "preferred_identity_set", "rule", "source", "status", "surface_counts", "warning", "working_position"]
  - list path=$.edge_records length=30 pair=False edge_dict=False keys=["g15_edge", "interface_label", "petersen_edge_a", "petersen_edge_b", "shared_petersen_vertex", "shift_mod_60"] lift_fields=["g15_edge", "petersen_edge_a", "petersen_edge_b", "shared_petersen_vertex", "shift_mod_60"]
- g900_signature_binding: strength=metadata_or_binding_source exists=True path=registered_boundary_flux/data/g900_signature_binding.v1.json top_keys=["id", "status", "kind", "role", "candidate", "identity_boundary", "admission_signature", "theorem_claims_from_main_section", "source_files", "source_file_count", "render_boundary"]
- k900_action_binding: strength=metadata_or_binding_source exists=True path=registered_boundary_flux/data/k900_action_binding.v1.json top_keys=["schema", "status", "boundary", "source_files", "action_bindings", "rendering_policy"]
- g60_source_binding: strength=g60_source_candidate exists=True path=registered_boundary_flux/data/g60_source_binding.v1.json top_keys=["id", "status", "canonical_source", "source_files", "source_file_count", "source_boundary", "active_projection", "available_next_projection", "render_contract"]
- kernel: strength=none exists=True path=registered_boundary_flux/data/kernel.v1.json top_keys=["schema", "title", "status", "source_project", "boundary", "kernel_claim", "phases", "channels", "presets", "evidence_hooks", "evidence_index", "register_body", "sheet_clock", "regime_calibration", "k900_action_layer", "ui"]
- theorem_object: strength=column_or_edge_bridge_source exists=True path=../json/theorem_object.json top_keys=["name", "shape_M", "shape_Q", "matrix_M", "gram_Q", "columns", "row_sums", "col_sums", "score_sq", "stats", "distance_expression", "adjacency_polynomial", "g15_distance_matrix", "petersen_edges_indexing", "source_artifact", "source_artifact_status", "source_artifact_note"]
  - list path=$.matrix_M length=15 pair=False edge_dict=False keys=[] lift_fields=[]
  - list path=$.matrix_M[0] length=30 pair=False edge_dict=False keys=[] lift_fields=[]
  - list path=$.matrix_M[1] length=30 pair=False edge_dict=False keys=[] lift_fields=[]
  - list path=$.matrix_M[2] length=30 pair=False edge_dict=False keys=[] lift_fields=[]
  - list path=$.matrix_M[3] length=30 pair=False edge_dict=False keys=[] lift_fields=[]
  - list path=$.matrix_M[4] length=30 pair=False edge_dict=False keys=[] lift_fields=[]
  - list path=$.matrix_M[5] length=30 pair=False edge_dict=False keys=[] lift_fields=[]
  - list path=$.matrix_M[6] length=30 pair=False edge_dict=False keys=[] lift_fields=[]
- edge_column_alignment: strength=none exists=True path=registered_boundary_flux/artifacts/json/gap_a_edge_column_transport_role_alignment_001.v1.json top_keys=["schema", "status", "timestamp_utc", "gap", "purpose", "boundary", "inputs", "summary", "alignment_rows", "interpretation", "checks", "next_script"]
  - list path=$.alignment_rows length=30 pair=False edge_dict=False keys=["M_row_support", "alignment_hash", "all_local_checks_pass", "assignment_cocycle_value", "assignment_edge", "assignment_support", "checks", "colored_column_support", "colored_edge", "colored_edge_value", "column", "normalized_assignment_column", "petrie_edge", "signature_column_support", "signature_edge"] lift_fields=["M_row_support", "assignment_cocycle_value", "assignment_edge", "assignment_support", "colored_column_support", "colored_edge", "colored_edge_value", "column", "normalized_assignment_column", "petrie_edge", "signature_column_support", "signature_edge"]

## Proposed next lift attempt

- primary_900_source: "../json/p900/p900_phase30_combined_graph_export.json"
- candidate_vertex_lists: ["$.vertices"]
- candidate_edge_lists: ["$.candidates[0].combined_edges", "$.candidates[1].combined_edges"]
- candidate_phase_lists: ["$.candidates[0].edge_law_table", "$.candidates[1].edge_law_table"]
- binding_strategy: "Try to bind all 18 WXYZTI role rows through shared edge, column, phase, component, sector, or vertex fields exposed by the inspected schemas."
- anti_overfit_rule: "Do not target residual cycle-role rows. Apply candidate lift functions uniformly to all 18 role rows."

## Interpretation

- main_result: The P900 phase-30 combined graph export is the primary lift source because it exposes 900- and 3600-sized graph layers.
- what_this_gives: A row-to-G900 lift attempt can now target concrete schema paths rather than free-form assumptions.
- what_remains_open: No actual WXYZTI row has been lifted yet.
- next_question: Can a uniform lift function attach G900/P900 vertex, edge, phase, component, or sheet signatures to all 18 role rows?

## Checks

- PASS inventory_loaded: status=gap_a_g900_lift_sources_inventoried_ready_for_schema_inspection
- PASS role_rows_loaded: status=boundary_seam_projection_role_rows_partial_not_map_proof
- PASS residuals_loaded: status=row_level_seam_projection_residuals_localized_not_map_proof
- PASS source_exists_p900_phase30_combined_graph_export: ../json/p900/p900_phase30_combined_graph_export.json
- PASS source_exists_p900_phase18_component_structure: ../json/p900/p900_phase18_component_structure.json
- PASS source_exists_p900_phase19_doubled_g15_sheet_audit: ../json/p900/p900_phase19_doubled_g15_sheet_audit.json
- PASS source_exists_p900_phase16_preferred_representative_edge_law: ../json/p900/p900_phase16_preferred_representative_edge_law.json
- PASS source_exists_g900_signature_binding: registered_boundary_flux/data/g900_signature_binding.v1.json
- PASS source_exists_k900_action_binding: registered_boundary_flux/data/k900_action_binding.v1.json
- PASS source_exists_g60_source_binding: registered_boundary_flux/data/g60_source_binding.v1.json
- PASS source_exists_kernel: registered_boundary_flux/data/kernel.v1.json
- PASS source_exists_theorem_object: ../json/theorem_object.json
- PASS source_exists_edge_column_alignment: registered_boundary_flux/artifacts/json/gap_a_edge_column_transport_role_alignment_001.v1.json
- PASS primary_has_900_vertex_list: count=1
- PASS primary_has_3600_edge_lists: count=2
- PASS primary_has_30_phase_lists: count=2
- PASS strong_lift_source_found: count=1

## Next script

    attempt_gap_a_uniform_g900_row_lift_001.py
