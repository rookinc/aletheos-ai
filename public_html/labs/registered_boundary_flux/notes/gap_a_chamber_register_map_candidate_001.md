# Gap A chamber/register map candidate 001

Status: gap_a_chamber_register_map_candidate_found_not_closure

## Boundary

- This does not close Gap A.
- This is a row-level candidate over the tested 18 WXYZTI role rows.
- It uses source-geometry obstruction orientation, not an accepted full chamber/register map.
- No residual flip rule is accepted as proof.
- No global exact selector is claimed.
- No physical interpretation is claimed.
- This candidate must be attacked by nulls before promotion.

## Candidate rule

- name: "W_boundary_seam_plus_role_column_obstruction_orientation"
- reading: "Use W-boundary seam projection for all rows; for rows in the source-geometry residual side, apply the obstruction-side adjustment."
- residual_side: "singleton ZT OR multi-column TI"
- residual_support: [3, 16]
- stable_complement: "singleton TI OR multi-column ZT"
- stable_complement_support: [4, 9, 15]

## Summary

- row_count: 18
- base_match_count: 16
- base_mismatches: [3, 16]
- candidate_match_count: 18
- candidate_mismatches: []
- changed_rows: [3, 16]
- stable_complement_changed: []
- stable_complement_matches: [4, 9, 15]
- claim_closes_gap_a: false

## Candidate rows

- {"base_matches_expected": true, "candidate_action": "preserve_projected", "candidate_matches_expected": true, "candidate_projected": 1, "changed_by_candidate": false, "columns": [0], "cycle_index": 0, "edge": [0, 1], "expected": 1, "projected": 1, "raw": 0, "role": "WX", "row_ordinal": 0, "source_class": "ordinary", "source_fragment": {"path_length": 1, "transport_kind": "direct_edge_column"}}
- {"base_matches_expected": true, "candidate_action": "preserve_projected", "candidate_matches_expected": true, "candidate_projected": 1, "changed_by_candidate": false, "columns": [4], "cycle_index": 0, "edge": [1, 2], "expected": 1, "projected": 1, "raw": 1, "role": "XY", "row_ordinal": 1, "source_class": "ordinary", "source_fragment": {"path_length": 1, "transport_kind": "direct_edge_column"}}
- {"base_matches_expected": true, "candidate_action": "preserve_projected", "candidate_matches_expected": true, "candidate_projected": 1, "changed_by_candidate": false, "columns": [7, 10], "cycle_index": 0, "edge": [2, 3], "expected": 1, "projected": 1, "raw": 1, "role": "YZ", "row_ordinal": 2, "source_class": "ordinary", "source_fragment": {"path_length": 2, "transport_kind": "bridge_path"}}
- {"base_matches_expected": false, "candidate_action": "source_geometry_obstruction_adjustment", "candidate_matches_expected": true, "candidate_projected": 0, "changed_by_candidate": true, "columns": [9], "cycle_index": 0, "edge": [3, 4], "expected": 0, "projected": 1, "raw": 1, "role": "ZT", "row_ordinal": 3, "source_class": "role_column_residual_side", "source_fragment": {"path_length": 1, "transport_kind": "direct_edge_column"}}
- {"base_matches_expected": true, "candidate_action": "preserve_projected_stable_complement", "candidate_matches_expected": true, "candidate_projected": 1, "changed_by_candidate": false, "columns": [13], "cycle_index": 0, "edge": [4, 5], "expected": 1, "projected": 1, "raw": 1, "role": "TI", "row_ordinal": 4, "source_class": "role_column_stable_complement", "source_fragment": {"path_length": 1, "transport_kind": "direct_edge_column"}}
- {"base_matches_expected": true, "candidate_action": "preserve_projected", "candidate_matches_expected": true, "candidate_projected": 1, "changed_by_candidate": false, "columns": [1, 7], "cycle_index": 0, "edge": [5, 0], "expected": 1, "projected": 1, "raw": 0, "role": "IW", "row_ordinal": 5, "source_class": "ordinary", "source_fragment": {"path_length": 2, "transport_kind": "bridge_path"}}
- {"base_matches_expected": true, "candidate_action": "preserve_projected", "candidate_matches_expected": true, "candidate_projected": 1, "changed_by_candidate": false, "columns": [0], "cycle_index": 1, "edge": [0, 1], "expected": 1, "projected": 1, "raw": 0, "role": "WX", "row_ordinal": 6, "source_class": "ordinary", "source_fragment": {"path_length": 1, "transport_kind": "direct_edge_column"}}
- {"base_matches_expected": true, "candidate_action": "preserve_projected", "candidate_matches_expected": true, "candidate_projected": 1, "changed_by_candidate": false, "columns": [4], "cycle_index": 1, "edge": [1, 2], "expected": 1, "projected": 1, "raw": 1, "role": "XY", "row_ordinal": 7, "source_class": "ordinary", "source_fragment": {"path_length": 1, "transport_kind": "direct_edge_column"}}
- {"base_matches_expected": true, "candidate_action": "preserve_projected", "candidate_matches_expected": true, "candidate_projected": 1, "changed_by_candidate": false, "columns": [1, 3, 22], "cycle_index": 1, "edge": [2, 7], "expected": 1, "projected": 1, "raw": 1, "role": "YZ", "row_ordinal": 8, "source_class": "ordinary", "source_fragment": {"path_length": 3, "transport_kind": "bridge_path"}}
- {"base_matches_expected": true, "candidate_action": "preserve_projected_stable_complement", "candidate_matches_expected": true, "candidate_projected": 0, "changed_by_candidate": false, "columns": [14, 9, 11], "cycle_index": 1, "edge": [7, 10], "expected": 0, "projected": 0, "raw": 0, "role": "ZT", "row_ordinal": 9, "source_class": "role_column_stable_complement", "source_fragment": {"path_length": 3, "transport_kind": "bridge_path"}}
- {"base_matches_expected": true, "candidate_action": "preserve_projected", "candidate_matches_expected": true, "candidate_projected": 1, "changed_by_candidate": false, "columns": [10, 11], "cycle_index": 1, "edge": [10, 5], "expected": 1, "projected": 1, "raw": 1, "role": "TI", "row_ordinal": 10, "source_class": "ordinary", "source_fragment": {"path_length": 2, "transport_kind": "bridge_path"}}
- {"base_matches_expected": true, "candidate_action": "preserve_projected", "candidate_matches_expected": true, "candidate_projected": 1, "changed_by_candidate": false, "columns": [1, 7], "cycle_index": 1, "edge": [5, 0], "expected": 1, "projected": 1, "raw": 0, "role": "IW", "row_ordinal": 11, "source_class": "ordinary", "source_fragment": {"path_length": 2, "transport_kind": "bridge_path"}}
- {"base_matches_expected": true, "candidate_action": "preserve_projected", "candidate_matches_expected": true, "candidate_projected": 1, "changed_by_candidate": false, "columns": [0], "cycle_index": 2, "edge": [0, 1], "expected": 1, "projected": 1, "raw": 0, "role": "WX", "row_ordinal": 12, "source_class": "ordinary", "source_fragment": {"path_length": 1, "transport_kind": "direct_edge_column"}}
- {"base_matches_expected": true, "candidate_action": "preserve_projected", "candidate_matches_expected": true, "candidate_projected": 1, "changed_by_candidate": false, "columns": [4], "cycle_index": 2, "edge": [1, 2], "expected": 1, "projected": 1, "raw": 1, "role": "XY", "row_ordinal": 13, "source_class": "ordinary", "source_fragment": {"path_length": 1, "transport_kind": "direct_edge_column"}}
- {"base_matches_expected": true, "candidate_action": "preserve_projected", "candidate_matches_expected": true, "candidate_projected": 1, "changed_by_candidate": false, "columns": [4, 5], "cycle_index": 2, "edge": [2, 8], "expected": 1, "projected": 1, "raw": 1, "role": "YZ", "row_ordinal": 14, "source_class": "ordinary", "source_fragment": {"path_length": 2, "transport_kind": "bridge_path"}}
- {"base_matches_expected": true, "candidate_action": "preserve_projected_stable_complement", "candidate_matches_expected": true, "candidate_projected": 0, "changed_by_candidate": false, "columns": [21, 22], "cycle_index": 2, "edge": [8, 14], "expected": 0, "projected": 0, "raw": 0, "role": "ZT", "row_ordinal": 15, "source_class": "role_column_stable_complement", "source_fragment": {"path_length": 2, "transport_kind": "bridge_path"}}
- {"base_matches_expected": false, "candidate_action": "source_geometry_obstruction_adjustment", "candidate_matches_expected": true, "candidate_projected": 1, "changed_by_candidate": true, "columns": [13, 15], "cycle_index": 2, "edge": [14, 5], "expected": 1, "projected": 0, "raw": 0, "role": "TI", "row_ordinal": 16, "source_class": "role_column_residual_side", "source_fragment": {"path_length": 2, "transport_kind": "bridge_path"}}
- {"base_matches_expected": true, "candidate_action": "preserve_projected", "candidate_matches_expected": true, "candidate_projected": 1, "changed_by_candidate": false, "columns": [1, 7], "cycle_index": 2, "edge": [5, 0], "expected": 1, "projected": 1, "raw": 0, "role": "IW", "row_ordinal": 17, "source_class": "ordinary", "source_fragment": {"path_length": 2, "transport_kind": "bridge_path"}}

## Interpretation

- main_result: The role-column source-geometry split turns the previous 16/18 row-level projection into an 18/18 row-level chamber/register map candidate.
- not_closure: This is not Gap A closure because it is still a candidate map over the tested row table, not a source-derived global chamber/register map.
- stable_side: The stable complement rows remain unchanged and continue to match.
- next_question: Do nulls break the candidate when the role-column orientation is swapped, rotated, or replaced by role-only/shape-only substitutes?

## Checks

- PASS role_column_interim_loaded: gap_a_role_column_interim_note_recorded
- PASS geometry_loaded: gap_a_role_column_source_geometry_candidate_found_not_closure
- PASS nulls_loaded: gap_a_role_column_source_geometry_nulls_recorded
- PASS boundary_projection_loaded: boundary_seam_projection_role_rows_partial_not_map_proof
- PASS projection_rows_18: count=18
- PASS base_match_count_16: base_match_count=16 base_mismatches=[3, 16]
- PASS changed_rows_equal_residual_support: changed=[3, 16] residual_support=[3, 16]
- PASS candidate_match_count_18: candidate_match_count=18 candidate_mismatches=[]
- PASS stable_complement_preserved: stable_complement_changed=[]
- PASS stable_complement_matches: stable_complement_matches=[4, 9, 15]

## Next script

    null_gap_a_chamber_register_map_candidate_001.py
