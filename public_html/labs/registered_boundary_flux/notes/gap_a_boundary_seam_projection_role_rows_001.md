# Gap A boundary seam projection role rows 001

Status: boundary_seam_projection_role_rows_partial_not_map_proof

Gap: A - chamber/register map.

## Boundary

- This is not a chamber/register map proof.
- This applies the seam rule row-by-row rather than by role majority.
- A partial result is not a failure; it localizes residual cycle-role rows.
- No extra role choices are added in this pass.

## Summary

- total_role_rows: 18
- matching_role_rows: 16
- mismatching_role_rows: 2
- cycle_count: 3
- matching_cycles: 1
- mismatching_cycles: 2
- mismatch_cycle_indices: [0, 2]
- mismatch_roles_by_cycle: {"0": ["ZT"], "2": ["TI"]}

## Cycle results

- cycle 0: raw=[0, 1, 1, 1, 1, 0] projected=[1, 1, 1, 1, 1, 1] target=[1, 1, 1, 0, 1, 1] distance=1 mismatch_roles=["ZT"]
- cycle 1: raw=[0, 1, 1, 0, 1, 0] projected=[1, 1, 1, 0, 1, 1] target=[1, 1, 1, 0, 1, 1] distance=0 mismatch_roles=[]
- cycle 2: raw=[0, 1, 1, 0, 0, 0] projected=[1, 1, 1, 0, 0, 1] target=[1, 1, 1, 0, 1, 1] distance=1 mismatch_roles=["TI"]

## Role summary

- WX: projected=[1, 1, 1] expected=1 matches=3 mismatches=0 mismatch_rows=[]
- XY: projected=[1, 1, 1] expected=1 matches=3 mismatches=0 mismatch_rows=[]
- YZ: projected=[1, 1, 1] expected=1 matches=3 mismatches=0 mismatch_rows=[]
- ZT: projected=[1, 0, 0] expected=0 matches=2 mismatches=1 mismatch_rows=[{"cycle_index": 0, "edge": [3, 4], "transport_kind": "direct_edge_column", "path_length": 1, "raw": 1, "projected": 1, "expected": 0}]
- TI: projected=[1, 1, 0] expected=1 matches=2 mismatches=1 mismatch_rows=[{"cycle_index": 2, "edge": [14, 5], "transport_kind": "bridge_path", "path_length": 2, "raw": 0, "projected": 0, "expected": 1}]
- IW: projected=[1, 1, 1] expected=1 matches=3 mismatches=0 mismatch_rows=[]

## Interpretation

- main_result: The W-boundary seam projection has been applied to every selected WXYZTI role row without adding new choices.
- if_partial: If partial, the seam rule explains the boundary roles but leaves cycle-specific residuals in non-boundary roles.
- what_this_gives: The row-level residuals are now explicit and finite.
- what_remains_open: Gap A still requires explaining any residual rows by source transport, selected ZT behavior, or another bounded register rule.
- next_question: Do the residual rows cluster around selected ZT/TI behavior in a way that can be explained without overfitting?

## Checks

- PASS geometry_loaded: status=boundary_seam_rule_geometrically_justified_not_map_proof
- PASS role_pattern_loaded: status=wxyzti_bridge_path_role_pattern_partial_not_map_proof
- PASS target_loaded: status=normalized_target_not_proof
- PASS role_order_len_6: role_order=["WX", "XY", "YZ", "ZT", "TI", "IW"]
- PASS target_pattern_len_6: target=[1, 1, 1, 0, 1, 1]
- PASS seam_mask_is_W_incident: mask=[true, false, false, false, false, true]
- PASS role_rows_count_18: count=18
- PASS cycle_count_3: cycle_count=3
- PASS all_cycles_have_all_roles: missing={"0": [], "1": [], "2": []}

## Next script

    analyze_gap_a_row_level_seam_projection_residuals_001.py
