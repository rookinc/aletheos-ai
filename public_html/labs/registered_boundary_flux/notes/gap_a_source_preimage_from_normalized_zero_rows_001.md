# Gap A source preimage from normalized zero rows 001

Status: gap_a_source_preimage_from_normalized_zero_rows_recorded_not_promoted

## Boundary

- This does not close Gap A.
- This does not promote the source-law preimage.
- The candidate now uses normalized uniform-lift zero-twisted rows rather than fallback zero-split rows.
- The branch_sensitive OR singleton ZT substitute still survives exactly.
- The strongest current result remains the null-hardened 18-row chamber/register map candidate.
- No full source-derived chamber/register map is claimed.
- No physical interpretation is claimed.

## Candidate rule

- name: "normalized_zero_twisted_rows_AND_role_column_residual_orientation"
- reading: "normalized uniform-lift zero-twisted rows AND (singleton ZT OR multi-column TI)"
- zero_twisted_rows: [3, 4, 9, 15, 16]
- preimage_support: [3, 16]
- stable_complement_reading: "normalized uniform-lift zero-twisted rows AND (singleton TI OR multi-column ZT)"
- stable_complement_support: [4, 9, 15]

## Summary

- row_count: 18
- match_count: 18
- mismatches: []
- exact_18_row_candidate: true
- changed_fixes: [3, 16]
- changed_breaks: []
- surviving_nulls: ["null_branch_sensitive_OR_singleton_ZT"]
- claim_closes_gap_a: false
- claim_promotes_source_preimage: false

## Source rows

- {"base_matches_expected": true, "column_count": 1, "column_shape": "singleton", "columns": [0], "cycle_index": 0, "edge": [0, 1], "expected_target_value": 1, "normalized_source_preimage_member": false, "normalized_stable_complement_member": false, "normalized_zero_twisted_source": false, "path_length": 1, "projected_value": 1, "role": "WX", "role_column_orientation": "singleton_WX", "row_ordinal": 0, "seam_flip_applied": true, "transport_kind": "direct_edge_column"}
- {"base_matches_expected": true, "column_count": 1, "column_shape": "singleton", "columns": [4], "cycle_index": 0, "edge": [1, 2], "expected_target_value": 1, "normalized_source_preimage_member": false, "normalized_stable_complement_member": false, "normalized_zero_twisted_source": false, "path_length": 1, "projected_value": 1, "role": "XY", "role_column_orientation": "singleton_XY", "row_ordinal": 1, "seam_flip_applied": false, "transport_kind": "direct_edge_column"}
- {"base_matches_expected": true, "column_count": 2, "column_shape": "multi_column", "columns": [7, 10], "cycle_index": 0, "edge": [2, 3], "expected_target_value": 1, "normalized_source_preimage_member": false, "normalized_stable_complement_member": false, "normalized_zero_twisted_source": false, "path_length": 2, "projected_value": 1, "role": "YZ", "role_column_orientation": "multi_column_YZ", "row_ordinal": 2, "seam_flip_applied": false, "transport_kind": "bridge_path"}
- {"base_matches_expected": false, "column_count": 1, "column_shape": "singleton", "columns": [9], "cycle_index": 0, "edge": [3, 4], "expected_target_value": 0, "normalized_source_preimage_member": true, "normalized_stable_complement_member": false, "normalized_zero_twisted_source": true, "path_length": 1, "projected_value": 1, "role": "ZT", "role_column_orientation": "singleton_ZT", "row_ordinal": 3, "seam_flip_applied": false, "transport_kind": "direct_edge_column"}
- {"base_matches_expected": true, "column_count": 1, "column_shape": "singleton", "columns": [13], "cycle_index": 0, "edge": [4, 5], "expected_target_value": 1, "normalized_source_preimage_member": false, "normalized_stable_complement_member": true, "normalized_zero_twisted_source": true, "path_length": 1, "projected_value": 1, "role": "TI", "role_column_orientation": "singleton_TI", "row_ordinal": 4, "seam_flip_applied": false, "transport_kind": "direct_edge_column"}
- {"base_matches_expected": true, "column_count": 2, "column_shape": "multi_column", "columns": [1, 7], "cycle_index": 0, "edge": [5, 0], "expected_target_value": 1, "normalized_source_preimage_member": false, "normalized_stable_complement_member": false, "normalized_zero_twisted_source": false, "path_length": 2, "projected_value": 1, "role": "IW", "role_column_orientation": "multi_column_IW", "row_ordinal": 5, "seam_flip_applied": true, "transport_kind": "bridge_path"}
- {"base_matches_expected": true, "column_count": 1, "column_shape": "singleton", "columns": [0], "cycle_index": 1, "edge": [0, 1], "expected_target_value": 1, "normalized_source_preimage_member": false, "normalized_stable_complement_member": false, "normalized_zero_twisted_source": false, "path_length": 1, "projected_value": 1, "role": "WX", "role_column_orientation": "singleton_WX", "row_ordinal": 6, "seam_flip_applied": true, "transport_kind": "direct_edge_column"}
- {"base_matches_expected": true, "column_count": 1, "column_shape": "singleton", "columns": [4], "cycle_index": 1, "edge": [1, 2], "expected_target_value": 1, "normalized_source_preimage_member": false, "normalized_stable_complement_member": false, "normalized_zero_twisted_source": false, "path_length": 1, "projected_value": 1, "role": "XY", "role_column_orientation": "singleton_XY", "row_ordinal": 7, "seam_flip_applied": false, "transport_kind": "direct_edge_column"}
- {"base_matches_expected": true, "column_count": 3, "column_shape": "multi_column", "columns": [1, 3, 22], "cycle_index": 1, "edge": [2, 7], "expected_target_value": 1, "normalized_source_preimage_member": false, "normalized_stable_complement_member": false, "normalized_zero_twisted_source": false, "path_length": 3, "projected_value": 1, "role": "YZ", "role_column_orientation": "multi_column_YZ", "row_ordinal": 8, "seam_flip_applied": false, "transport_kind": "bridge_path"}
- {"base_matches_expected": true, "column_count": 3, "column_shape": "multi_column", "columns": [14, 9, 11], "cycle_index": 1, "edge": [7, 10], "expected_target_value": 0, "normalized_source_preimage_member": false, "normalized_stable_complement_member": true, "normalized_zero_twisted_source": true, "path_length": 3, "projected_value": 0, "role": "ZT", "role_column_orientation": "multi_column_ZT", "row_ordinal": 9, "seam_flip_applied": false, "transport_kind": "bridge_path"}
- {"base_matches_expected": true, "column_count": 2, "column_shape": "multi_column", "columns": [10, 11], "cycle_index": 1, "edge": [10, 5], "expected_target_value": 1, "normalized_source_preimage_member": false, "normalized_stable_complement_member": false, "normalized_zero_twisted_source": false, "path_length": 2, "projected_value": 1, "role": "TI", "role_column_orientation": "multi_column_TI", "row_ordinal": 10, "seam_flip_applied": false, "transport_kind": "bridge_path"}
- {"base_matches_expected": true, "column_count": 2, "column_shape": "multi_column", "columns": [1, 7], "cycle_index": 1, "edge": [5, 0], "expected_target_value": 1, "normalized_source_preimage_member": false, "normalized_stable_complement_member": false, "normalized_zero_twisted_source": false, "path_length": 2, "projected_value": 1, "role": "IW", "role_column_orientation": "multi_column_IW", "row_ordinal": 11, "seam_flip_applied": true, "transport_kind": "bridge_path"}
- {"base_matches_expected": true, "column_count": 1, "column_shape": "singleton", "columns": [0], "cycle_index": 2, "edge": [0, 1], "expected_target_value": 1, "normalized_source_preimage_member": false, "normalized_stable_complement_member": false, "normalized_zero_twisted_source": false, "path_length": 1, "projected_value": 1, "role": "WX", "role_column_orientation": "singleton_WX", "row_ordinal": 12, "seam_flip_applied": true, "transport_kind": "direct_edge_column"}
- {"base_matches_expected": true, "column_count": 1, "column_shape": "singleton", "columns": [4], "cycle_index": 2, "edge": [1, 2], "expected_target_value": 1, "normalized_source_preimage_member": false, "normalized_stable_complement_member": false, "normalized_zero_twisted_source": false, "path_length": 1, "projected_value": 1, "role": "XY", "role_column_orientation": "singleton_XY", "row_ordinal": 13, "seam_flip_applied": false, "transport_kind": "direct_edge_column"}
- {"base_matches_expected": true, "column_count": 2, "column_shape": "multi_column", "columns": [4, 5], "cycle_index": 2, "edge": [2, 8], "expected_target_value": 1, "normalized_source_preimage_member": false, "normalized_stable_complement_member": false, "normalized_zero_twisted_source": false, "path_length": 2, "projected_value": 1, "role": "YZ", "role_column_orientation": "multi_column_YZ", "row_ordinal": 14, "seam_flip_applied": false, "transport_kind": "bridge_path"}
- {"base_matches_expected": true, "column_count": 2, "column_shape": "multi_column", "columns": [21, 22], "cycle_index": 2, "edge": [8, 14], "expected_target_value": 0, "normalized_source_preimage_member": false, "normalized_stable_complement_member": true, "normalized_zero_twisted_source": true, "path_length": 2, "projected_value": 0, "role": "ZT", "role_column_orientation": "multi_column_ZT", "row_ordinal": 15, "seam_flip_applied": false, "transport_kind": "bridge_path"}
- {"base_matches_expected": false, "column_count": 2, "column_shape": "multi_column", "columns": [13, 15], "cycle_index": 2, "edge": [14, 5], "expected_target_value": 1, "normalized_source_preimage_member": true, "normalized_stable_complement_member": false, "normalized_zero_twisted_source": true, "path_length": 2, "projected_value": 0, "role": "TI", "role_column_orientation": "multi_column_TI", "row_ordinal": 16, "seam_flip_applied": false, "transport_kind": "bridge_path"}
- {"base_matches_expected": true, "column_count": 2, "column_shape": "multi_column", "columns": [1, 7], "cycle_index": 2, "edge": [5, 0], "expected_target_value": 1, "normalized_source_preimage_member": false, "normalized_stable_complement_member": false, "normalized_zero_twisted_source": false, "path_length": 2, "projected_value": 1, "role": "IW", "role_column_orientation": "multi_column_IW", "row_ordinal": 17, "seam_flip_applied": true, "transport_kind": "bridge_path"}

## Interpretation

- main_result: The source preimage regenerates cleanly from normalized uniform-lift zero-twisted rows.
- provenance_result: The fallback zero-split dependency has been removed for the zero-row input.
- promotion_blocker: The source preimage is still not promoted because branch_sensitive OR singleton ZT remains an exact substitute.
- not_closure: Gap A still requires a global source-law chamber/register map or elimination/derivation of the surviving substitute.

## Checks

- PASS normalized_zero_loaded: gap_a_uniform_lift_zero_twisted_rows_normalized
- PASS boundary_loaded: boundary_seam_projection_role_rows_partial_not_map_proof
- PASS original_preimage_loaded: gap_a_source_law_preimage_candidate_found_not_closure
- PASS nulls_loaded: gap_a_source_law_preimage_candidate_nulls_mixed_not_promoted
- PASS improved_loaded: gap_a_source_preimage_with_improved_provenance_recorded_not_promoted
- PASS chamber_loaded: gap_a_chamber_register_candidate_interim_note_recorded
- PASS projection_rows_18: count=18
- PASS zero_rows_3_4_9_15_16: [3, 4, 9, 15, 16]
- PASS preimage_support_3_16: [3, 16]
- PASS stable_support_4_9_15: [4, 9, 15]
- PASS exact_18: {"changed_breaks": [], "changed_fixes": [3, 16], "exact": true, "match_count": 18, "mismatches": [], "row_count": 18, "support": [3, 16]}
- PASS changed_fixes_3_16: [3, 16]
- PASS changed_breaks_none: []
- PASS branch_survivor_still_blocks_promotion: ["null_branch_sensitive_OR_singleton_ZT"]
- PASS not_gap_closure: still candidate only

## Next script

    compare_gap_a_branch_sensitive_survivor_to_normalized_preimage_001.py
