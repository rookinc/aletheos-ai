# Gap A uniform G900 row lift 001

Status: uniform_g900_row_lift_available_residuals_not_separated

Gap: A - chamber/register map.

## Boundary

- This is not a G900 lift proof.
- The same lift logic is applied to all 18 role rows.
- Residual rows are not targeted during lift construction.
- Any separation found here is a candidate diagnostic, not a closure rule.

## Summary

- role_rows: 18
- residual_rows: 2
- matching_rows: 16
- p900_vertices: 900
- p900_candidates: 2
- rows_with_combined_edge_matches: 18
- separating_feature_count: 0
- disjoint_feature_count: 8
- separating_features: []
- disjoint_features: [{"candidate_index": 0, "feature": "lift_signature", "residual_value_count": 2, "matching_value_count": 10, "residual_values": ["87005b957a90aeda05de446f157150739c27a9b50ca784cade8ea6826a227727", "f25a155e492740d1aa6f4ce0f95b44423f91015309ceb84c1c7ce6340aa04024"], "residual_values_disjoint_from_matching": true, "residuals_share_single_value": false, "separates_residuals_as_class": false}, {"candidate_index": 0, "feature": "law_sector_pair_sequence", "residual_value_count": 2, "matching_value_count": 10, "residual_values": ["[[2, 8]]", "[[4, 5], [5, 10]]"], "residual_values_disjoint_from_matching": true, "residuals_share_single_value": false, "separates_residuals_as_class": false}, {"candidate_index": 0, "feature": "law_shared_vertex_sequence", "residual_value_count": 2, "matching_value_count": 10, "residual_values": ["[0, 5]", "[3]"], "residual_values_disjoint_from_matching": true, "residuals_share_single_value": false, "separates_residuals_as_class": false}, {"candidate_index": 0, "feature": "shared_petersen_vertex_hist", "residual_value_count": 2, "matching_value_count": 9, "residual_values": ["{\"0\": 60, \"5\": 60}", "{\"3\": 60}"], "residual_values_disjoint_from_matching": true, "residuals_share_single_value": false, "separates_residuals_as_class": false}, {"candidate_index": 1, "feature": "lift_signature", "residual_value_count": 2, "matching_value_count": 10, "residual_values": ["87005b957a90aeda05de446f157150739c27a9b50ca784cade8ea6826a227727", "c9b43fc146c0dd42b59de3ebf4bdcaaf55cdb1a0276f75ed06d6df2ab357cfab"], "residual_values_disjoint_from_matching": true, "residuals_share_single_value": false, "separates_residuals_as_class": false}, {"candidate_index": 1, "feature": "law_sector_pair_sequence", "residual_value_count": 2, "matching_value_count": 10, "residual_values": ["[[2, 8]]", "[[4, 5], [5, 10]]"], "residual_values_disjoint_from_matching": true, "residuals_share_single_value": false, "separates_residuals_as_class": false}, {"candidate_index": 1, "feature": "law_shared_vertex_sequence", "residual_value_count": 2, "matching_value_count": 10, "residual_values": ["[0, 5]", "[3]"], "residual_values_disjoint_from_matching": true, "residuals_share_single_value": false, "separates_residuals_as_class": false}, {"candidate_index": 1, "feature": "shared_petersen_vertex_hist", "residual_value_count": 2, "matching_value_count": 9, "residual_values": ["{\"0\": 60, \"5\": 60}", "{\"3\": 60}"], "residual_values_disjoint_from_matching": true, "residuals_share_single_value": false, "separates_residuals_as_class": false}]

## Row lift compact table

- row=0 cycle=0 role=WX residual=False columns=[0] lifts=[{"candidate": 0, "edge_matches": 60, "signature": "80f5ccc3298e", "law_shifts": [30], "law_shared": [1]}, {"candidate": 1, "edge_matches": 60, "signature": "80f5ccc3298e", "law_shifts": [30], "law_shared": [1]}]
- row=1 cycle=0 role=XY residual=False columns=[4] lifts=[{"candidate": 0, "edge_matches": 60, "signature": "88fa5f7bff20", "law_shifts": [30], "law_shared": [2]}, {"candidate": 1, "edge_matches": 60, "signature": "88fa5f7bff20", "law_shifts": [30], "law_shared": [2]}]
- row=2 cycle=0 role=YZ residual=False columns=[7, 10] lifts=[{"candidate": 0, "edge_matches": 120, "signature": "98c2cd53a5be", "law_shifts": [30, 0], "law_shared": [3, 4]}, {"candidate": 1, "edge_matches": 120, "signature": "98c2cd53a5be", "law_shifts": [30, 0], "law_shared": [3, 4]}]
- row=3 cycle=0 role=ZT residual=True columns=[9] lifts=[{"candidate": 0, "edge_matches": 60, "signature": "87005b957a90", "law_shifts": [30], "law_shared": [3]}, {"candidate": 1, "edge_matches": 60, "signature": "87005b957a90", "law_shifts": [30], "law_shared": [3]}]
- row=4 cycle=0 role=TI residual=False columns=[13] lifts=[{"candidate": 0, "edge_matches": 60, "signature": "70c43e383e6d", "law_shifts": [30], "law_shared": [0]}, {"candidate": 1, "edge_matches": 60, "signature": "70c43e383e6d", "law_shifts": [30], "law_shared": [0]}]
- row=5 cycle=0 role=IW residual=False columns=[1, 7] lifts=[{"candidate": 0, "edge_matches": 120, "signature": "a771eb4776d5", "law_shifts": [30, 30], "law_shared": [0, 3]}, {"candidate": 1, "edge_matches": 120, "signature": "a771eb4776d5", "law_shifts": [30, 30], "law_shared": [0, 3]}]
- row=6 cycle=1 role=WX residual=False columns=[0] lifts=[{"candidate": 0, "edge_matches": 60, "signature": "80f5ccc3298e", "law_shifts": [30], "law_shared": [1]}, {"candidate": 1, "edge_matches": 60, "signature": "80f5ccc3298e", "law_shifts": [30], "law_shared": [1]}]
- row=7 cycle=1 role=XY residual=False columns=[4] lifts=[{"candidate": 0, "edge_matches": 60, "signature": "88fa5f7bff20", "law_shifts": [30], "law_shared": [2]}, {"candidate": 1, "edge_matches": 60, "signature": "88fa5f7bff20", "law_shifts": [30], "law_shared": [2]}]
- row=8 cycle=1 role=YZ residual=False columns=[1, 3, 22] lifts=[{"candidate": 0, "edge_matches": 180, "signature": "624ae23d7327", "law_shifts": [30, 30, 0], "law_shared": [0, 1, 8]}, {"candidate": 1, "edge_matches": 180, "signature": "624ae23d7327", "law_shifts": [30, 30, 0], "law_shared": [0, 1, 8]}]
- row=9 cycle=1 role=ZT residual=False columns=[14, 9, 11] lifts=[{"candidate": 0, "edge_matches": 180, "signature": "b84a3870c819", "law_shifts": [0, 30, 30], "law_shared": [4, 3, 3]}, {"candidate": 1, "edge_matches": 180, "signature": "b84a3870c819", "law_shifts": [0, 30, 30], "law_shared": [4, 3, 3]}]
- row=10 cycle=1 role=TI residual=False columns=[10, 11] lifts=[{"candidate": 0, "edge_matches": 120, "signature": "485194b03ca1", "law_shifts": [0, 30], "law_shared": [4, 3]}, {"candidate": 1, "edge_matches": 120, "signature": "485194b03ca1", "law_shifts": [0, 30], "law_shared": [4, 3]}]
- row=11 cycle=1 role=IW residual=False columns=[1, 7] lifts=[{"candidate": 0, "edge_matches": 120, "signature": "a771eb4776d5", "law_shifts": [30, 30], "law_shared": [0, 3]}, {"candidate": 1, "edge_matches": 120, "signature": "a771eb4776d5", "law_shifts": [30, 30], "law_shared": [0, 3]}]
- row=12 cycle=2 role=WX residual=False columns=[0] lifts=[{"candidate": 0, "edge_matches": 60, "signature": "80f5ccc3298e", "law_shifts": [30], "law_shared": [1]}, {"candidate": 1, "edge_matches": 60, "signature": "80f5ccc3298e", "law_shifts": [30], "law_shared": [1]}]
- row=13 cycle=2 role=XY residual=False columns=[4] lifts=[{"candidate": 0, "edge_matches": 60, "signature": "88fa5f7bff20", "law_shifts": [30], "law_shared": [2]}, {"candidate": 1, "edge_matches": 60, "signature": "88fa5f7bff20", "law_shifts": [30], "law_shared": [2]}]
- row=14 cycle=2 role=YZ residual=False columns=[4, 5] lifts=[{"candidate": 0, "edge_matches": 120, "signature": "d2acdf66e4df", "law_shifts": [30, 30], "law_shared": [2, 1]}, {"candidate": 1, "edge_matches": 120, "signature": "d2acdf66e4df", "law_shifts": [30, 30], "law_shared": [2, 1]}]
- row=15 cycle=2 role=ZT residual=False columns=[21, 22] lifts=[{"candidate": 0, "edge_matches": 120, "signature": "c9a4dbb1ee42", "law_shifts": [0, 0], "law_shared": [8, 8]}, {"candidate": 1, "edge_matches": 120, "signature": "c9a4dbb1ee42", "law_shifts": [0, 0], "law_shared": [8, 8]}]
- row=16 cycle=2 role=TI residual=True columns=[13, 15] lifts=[{"candidate": 0, "edge_matches": 120, "signature": "f25a155e4927", "law_shifts": [30, 30], "law_shared": [0, 5]}, {"candidate": 1, "edge_matches": 120, "signature": "c9b43fc146c0", "law_shifts": [30, 0], "law_shared": [0, 5]}]
- row=17 cycle=2 role=IW residual=False columns=[1, 7] lifts=[{"candidate": 0, "edge_matches": 120, "signature": "a771eb4776d5", "law_shifts": [30, 30], "law_shared": [0, 3]}, {"candidate": 1, "edge_matches": 120, "signature": "a771eb4776d5", "law_shifts": [30, 30], "law_shared": [0, 3]}]

## Interpretation

- main_result: A uniform G900/P900 row lift was attempted for all 18 WXYZTI role rows.
- if_separated: If residual rows separate by a lifted feature, that supports the quotient-artifact hypothesis but does not close Gap A.
- if_not_separated: If residual rows do not separate, the G900 lift attempt does not explain the two residuals at this schema level.
- what_remains_open: A stronger lift may require orientation, directed edge identity, or source-side K900 transport not exposed by this schema.
- next_question: Should we test directed/oriented P900 edge lifts, or freeze Gap A as bounded partial with a failed first G900-lift explanation?

## Checks

- PASS schema_loaded: status=gap_a_g900_lift_binding_schema_inspected_ready_for_row_lift_attempt
- PASS role_rows_loaded: status=boundary_seam_projection_role_rows_partial_not_map_proof
- PASS residuals_loaded: status=row_level_seam_projection_residuals_localized_not_map_proof
- PASS role_row_count_18: count=18
- PASS p900_vertices_900: vertex_count=900
- PASS p900_candidate_count_ge_2: candidate_count=2
- PASS each_candidate_has_30_laws: law_lengths=[30, 30]
- PASS each_candidate_has_3600_edges: edge_lengths=[3600, 3600]
- PASS all_rows_have_law_lifts: lift_rows=18
- PASS some_rows_have_combined_edge_matches: rows_with_combined_edges=18

## Next script

    analyze_gap_a_g900_lift_residual_separation_001.py
