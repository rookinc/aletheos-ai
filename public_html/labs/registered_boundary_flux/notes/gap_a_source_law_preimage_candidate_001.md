# Gap A source-law preimage candidate 001

Status: gap_a_source_law_preimage_candidate_found_not_closure

## Boundary

- This does not close Gap A.
- This is a source-law preimage candidate, not a full source-derived chamber/register map.
- The rule uses zero-twisted carrier support plus role/column orientation.
- No global exact selector is claimed.
- No physical interpretation is claimed.
- This candidate must be attacked by source-preimage nulls before promotion.

## Candidate rule

- name: "zero_twisted_source_law_preimage_with_role_column_orientation"
- reading: "zero-twisted carrier support AND (singleton ZT OR multi-column TI)"
- preimage_support: [3, 16]
- stable_complement_reading: "zero-twisted carrier support AND (singleton TI OR multi-column ZT)"
- stable_complement_support: [4, 9, 15]

## Source extraction

- zero_twisted_rows: [3, 4, 9, 15, 16]
- zero_twisted_source: "fallback.zero_twisted_split.zero_twisted_neighborhood"

## Summary

- row_count: 18
- match_count: 18
- mismatches: []
- exact_18_row_candidate: true
- changed_fixes: [3, 16]
- changed_breaks: []
- claim_closes_gap_a: false

## Source rows

- {"base_matches_expected": true, "column_count": 1, "column_shape": "singleton", "columns": [0], "cycle_index": 0, "edge": [0, 1], "expected_target_value": 1, "path_length": 1, "projected_value": 1, "raw_role_cocycle_sum_mod2": 0, "role": "WX", "role_column_orientation": "singleton_WX", "row_ordinal": 0, "seam_flip_applied": true, "source_law_preimage_member": false, "source_law_stable_complement_member": false, "transport_kind": "direct_edge_column", "zero_twisted_source": false}
- {"base_matches_expected": true, "column_count": 1, "column_shape": "singleton", "columns": [4], "cycle_index": 0, "edge": [1, 2], "expected_target_value": 1, "path_length": 1, "projected_value": 1, "raw_role_cocycle_sum_mod2": 1, "role": "XY", "role_column_orientation": "singleton_XY", "row_ordinal": 1, "seam_flip_applied": false, "source_law_preimage_member": false, "source_law_stable_complement_member": false, "transport_kind": "direct_edge_column", "zero_twisted_source": false}
- {"base_matches_expected": true, "column_count": 2, "column_shape": "multi_column", "columns": [7, 10], "cycle_index": 0, "edge": [2, 3], "expected_target_value": 1, "path_length": 2, "projected_value": 1, "raw_role_cocycle_sum_mod2": 1, "role": "YZ", "role_column_orientation": "multi_column_YZ", "row_ordinal": 2, "seam_flip_applied": false, "source_law_preimage_member": false, "source_law_stable_complement_member": false, "transport_kind": "bridge_path", "zero_twisted_source": false}
- {"base_matches_expected": false, "column_count": 1, "column_shape": "singleton", "columns": [9], "cycle_index": 0, "edge": [3, 4], "expected_target_value": 0, "path_length": 1, "projected_value": 1, "raw_role_cocycle_sum_mod2": 1, "role": "ZT", "role_column_orientation": "singleton_ZT", "row_ordinal": 3, "seam_flip_applied": false, "source_law_preimage_member": true, "source_law_stable_complement_member": false, "transport_kind": "direct_edge_column", "zero_twisted_source": true}
- {"base_matches_expected": true, "column_count": 1, "column_shape": "singleton", "columns": [13], "cycle_index": 0, "edge": [4, 5], "expected_target_value": 1, "path_length": 1, "projected_value": 1, "raw_role_cocycle_sum_mod2": 1, "role": "TI", "role_column_orientation": "singleton_TI", "row_ordinal": 4, "seam_flip_applied": false, "source_law_preimage_member": false, "source_law_stable_complement_member": true, "transport_kind": "direct_edge_column", "zero_twisted_source": true}
- {"base_matches_expected": true, "column_count": 2, "column_shape": "multi_column", "columns": [1, 7], "cycle_index": 0, "edge": [5, 0], "expected_target_value": 1, "path_length": 2, "projected_value": 1, "raw_role_cocycle_sum_mod2": 0, "role": "IW", "role_column_orientation": "multi_column_IW", "row_ordinal": 5, "seam_flip_applied": true, "source_law_preimage_member": false, "source_law_stable_complement_member": false, "transport_kind": "bridge_path", "zero_twisted_source": false}
- {"base_matches_expected": true, "column_count": 1, "column_shape": "singleton", "columns": [0], "cycle_index": 1, "edge": [0, 1], "expected_target_value": 1, "path_length": 1, "projected_value": 1, "raw_role_cocycle_sum_mod2": 0, "role": "WX", "role_column_orientation": "singleton_WX", "row_ordinal": 6, "seam_flip_applied": true, "source_law_preimage_member": false, "source_law_stable_complement_member": false, "transport_kind": "direct_edge_column", "zero_twisted_source": false}
- {"base_matches_expected": true, "column_count": 1, "column_shape": "singleton", "columns": [4], "cycle_index": 1, "edge": [1, 2], "expected_target_value": 1, "path_length": 1, "projected_value": 1, "raw_role_cocycle_sum_mod2": 1, "role": "XY", "role_column_orientation": "singleton_XY", "row_ordinal": 7, "seam_flip_applied": false, "source_law_preimage_member": false, "source_law_stable_complement_member": false, "transport_kind": "direct_edge_column", "zero_twisted_source": false}
- {"base_matches_expected": true, "column_count": 3, "column_shape": "multi_column", "columns": [1, 3, 22], "cycle_index": 1, "edge": [2, 7], "expected_target_value": 1, "path_length": 3, "projected_value": 1, "raw_role_cocycle_sum_mod2": 1, "role": "YZ", "role_column_orientation": "multi_column_YZ", "row_ordinal": 8, "seam_flip_applied": false, "source_law_preimage_member": false, "source_law_stable_complement_member": false, "transport_kind": "bridge_path", "zero_twisted_source": false}
- {"base_matches_expected": true, "column_count": 3, "column_shape": "multi_column", "columns": [14, 9, 11], "cycle_index": 1, "edge": [7, 10], "expected_target_value": 0, "path_length": 3, "projected_value": 0, "raw_role_cocycle_sum_mod2": 0, "role": "ZT", "role_column_orientation": "multi_column_ZT", "row_ordinal": 9, "seam_flip_applied": false, "source_law_preimage_member": false, "source_law_stable_complement_member": true, "transport_kind": "bridge_path", "zero_twisted_source": true}
- {"base_matches_expected": true, "column_count": 2, "column_shape": "multi_column", "columns": [10, 11], "cycle_index": 1, "edge": [10, 5], "expected_target_value": 1, "path_length": 2, "projected_value": 1, "raw_role_cocycle_sum_mod2": 1, "role": "TI", "role_column_orientation": "multi_column_TI", "row_ordinal": 10, "seam_flip_applied": false, "source_law_preimage_member": false, "source_law_stable_complement_member": false, "transport_kind": "bridge_path", "zero_twisted_source": false}
- {"base_matches_expected": true, "column_count": 2, "column_shape": "multi_column", "columns": [1, 7], "cycle_index": 1, "edge": [5, 0], "expected_target_value": 1, "path_length": 2, "projected_value": 1, "raw_role_cocycle_sum_mod2": 0, "role": "IW", "role_column_orientation": "multi_column_IW", "row_ordinal": 11, "seam_flip_applied": true, "source_law_preimage_member": false, "source_law_stable_complement_member": false, "transport_kind": "bridge_path", "zero_twisted_source": false}
- {"base_matches_expected": true, "column_count": 1, "column_shape": "singleton", "columns": [0], "cycle_index": 2, "edge": [0, 1], "expected_target_value": 1, "path_length": 1, "projected_value": 1, "raw_role_cocycle_sum_mod2": 0, "role": "WX", "role_column_orientation": "singleton_WX", "row_ordinal": 12, "seam_flip_applied": true, "source_law_preimage_member": false, "source_law_stable_complement_member": false, "transport_kind": "direct_edge_column", "zero_twisted_source": false}
- {"base_matches_expected": true, "column_count": 1, "column_shape": "singleton", "columns": [4], "cycle_index": 2, "edge": [1, 2], "expected_target_value": 1, "path_length": 1, "projected_value": 1, "raw_role_cocycle_sum_mod2": 1, "role": "XY", "role_column_orientation": "singleton_XY", "row_ordinal": 13, "seam_flip_applied": false, "source_law_preimage_member": false, "source_law_stable_complement_member": false, "transport_kind": "direct_edge_column", "zero_twisted_source": false}
- {"base_matches_expected": true, "column_count": 2, "column_shape": "multi_column", "columns": [4, 5], "cycle_index": 2, "edge": [2, 8], "expected_target_value": 1, "path_length": 2, "projected_value": 1, "raw_role_cocycle_sum_mod2": 1, "role": "YZ", "role_column_orientation": "multi_column_YZ", "row_ordinal": 14, "seam_flip_applied": false, "source_law_preimage_member": false, "source_law_stable_complement_member": false, "transport_kind": "bridge_path", "zero_twisted_source": false}
- {"base_matches_expected": true, "column_count": 2, "column_shape": "multi_column", "columns": [21, 22], "cycle_index": 2, "edge": [8, 14], "expected_target_value": 0, "path_length": 2, "projected_value": 0, "raw_role_cocycle_sum_mod2": 0, "role": "ZT", "role_column_orientation": "multi_column_ZT", "row_ordinal": 15, "seam_flip_applied": false, "source_law_preimage_member": false, "source_law_stable_complement_member": true, "transport_kind": "bridge_path", "zero_twisted_source": true}
- {"base_matches_expected": false, "column_count": 2, "column_shape": "multi_column", "columns": [13, 15], "cycle_index": 2, "edge": [14, 5], "expected_target_value": 1, "path_length": 2, "projected_value": 0, "raw_role_cocycle_sum_mod2": 0, "role": "TI", "role_column_orientation": "multi_column_TI", "row_ordinal": 16, "seam_flip_applied": false, "source_law_preimage_member": true, "source_law_stable_complement_member": false, "transport_kind": "bridge_path", "zero_twisted_source": true}
- {"base_matches_expected": true, "column_count": 2, "column_shape": "multi_column", "columns": [1, 7], "cycle_index": 2, "edge": [5, 0], "expected_target_value": 1, "path_length": 2, "projected_value": 1, "raw_role_cocycle_sum_mod2": 0, "role": "IW", "role_column_orientation": "multi_column_IW", "row_ordinal": 17, "seam_flip_applied": true, "source_law_preimage_member": false, "source_law_stable_complement_member": false, "transport_kind": "bridge_path", "zero_twisted_source": false}

## Interpretation

- main_result: Rows [3, 16] are recovered as a source-law preimage candidate: zero-twisted carrier support plus the residual-side role/column orientation.
- stable_result: Rows [4, 9, 15] are recovered as the complementary stable zero-twisted orientation.
- not_correction: The row-level adjustment can now be described without referencing mismatch labels: it is the preimage of a source-side zero-twisted role/column condition.
- not_closure: This still does not close Gap A because the candidate has not yet been lifted to a full global source-derived chamber/register map.

## Checks

- PASS chamber_interim_loaded: gap_a_chamber_register_candidate_interim_note_recorded
- PASS chamber_candidate_loaded: gap_a_chamber_register_map_candidate_found_not_closure
- PASS chamber_nulls_loaded: gap_a_chamber_register_map_candidate_nulls_recorded
- PASS boundary_loaded: boundary_seam_projection_role_rows_partial_not_map_proof
- PASS projection_rows_18: count=18
- PASS zero_twisted_rows_3_4_9_15_16: source=fallback.zero_twisted_split.zero_twisted_neighborhood rows=[3, 4, 9, 15, 16]
- PASS preimage_support_3_16: [3, 16]
- PASS stable_complement_4_9_15: [4, 9, 15]
- PASS preimage_candidate_exact_18: {"changed_breaks": [], "changed_fixes": [3, 16], "exact": true, "match_count": 18, "mismatches": [], "row_count": 18, "support": [3, 16]}
- PASS changed_rows_fix_3_16: [3, 16]
- PASS changed_rows_break_none: []
- PASS not_gap_closure: still source-law preimage candidate only

## Next script

    null_gap_a_source_law_preimage_candidate_001.py
