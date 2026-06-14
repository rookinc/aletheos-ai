# Gap A row-level seam projection residuals 001

Status: row_level_seam_projection_residuals_localized_not_map_proof

Gap: A - chamber/register map.

## Boundary

- This is not a chamber/register map proof.
- This does not introduce a new correction rule.
- This pass only localizes residuals by role, cycle, transport kind, selected ZT behavior, and path data.
- A later rule must be justified independently and must not simply flip the residual rows.

## Summary

- matching_role_rows: 16
- residual_role_rows: 2
- residual_roles: ["TI", "ZT"]
- residual_cycles: [0, 2]
- residual_transport_kinds: ["bridge_path", "direct_edge_column"]
- residual_path_lengths: ["1", "2"]
- ZT_residual_count: 1
- TI_residual_count: 1
- non_ZT_TI_residual_count: 0

## Residual details

- cycle=0 role=ZT edge=[3, 4] transport=direct_edge_column path_length=1 raw=1 projected=1 expected=0 selected_zt_edge_for_cycle=[3, 4] is_selected_zt_edge=True
- cycle=2 role=TI edge=[14, 5] transport=bridge_path path_length=2 raw=0 projected=0 expected=1 selected_zt_edge_for_cycle=[8, 14] is_selected_zt_edge=False

## Cycle profiles

- cycle 0: residual_roles=["ZT"] selected_ZT=[3, 4] ZT={"edge": [3, 4], "transport_kind": "direct_edge_column", "path_length": 1, "raw": 1, "projected": 1, "expected": 0, "matches": false} TI={"edge": [4, 5], "transport_kind": "direct_edge_column", "path_length": 1, "raw": 1, "projected": 1, "expected": 1, "matches": true}
- cycle 1: residual_roles=[] selected_ZT=[7, 10] ZT={"edge": [7, 10], "transport_kind": "bridge_path", "path_length": 3, "raw": 0, "projected": 0, "expected": 0, "matches": true} TI={"edge": [10, 5], "transport_kind": "bridge_path", "path_length": 2, "raw": 1, "projected": 1, "expected": 1, "matches": true}
- cycle 2: residual_roles=["TI"] selected_ZT=[8, 14] ZT={"edge": [8, 14], "transport_kind": "bridge_path", "path_length": 2, "raw": 0, "projected": 0, "expected": 0, "matches": true} TI={"edge": [14, 5], "transport_kind": "bridge_path", "path_length": 2, "raw": 0, "projected": 0, "expected": 1, "matches": false}

## Interpretation

- main_result: After W-boundary seam projection, only two residual rows remain and both lie in the ZT/TI interior-turn neighborhood.
- what_this_gives: The remaining Gap A obstruction is finite, row-level, and localized rather than global.
- important_caution: The residuals are not closed by this artifact. No new flip or correction rule is asserted.
- what_remains_open: A lawful source/register explanation must account for the cycle-0 ZT direct residual and the cycle-2 TI bridge-path residual.
- next_question: Do the residual rows correspond to a selected-turn endpoint rule, a direct/path asymmetry, or a source transport orientation feature?

## Checks

- PASS row_projection_loaded: status=boundary_seam_projection_role_rows_partial_not_map_proof
- PASS target_loaded: status=normalized_target_not_proof
- PASS missing_transport_loaded: status=missing_wxyzti_edges_have_bridge_paths_not_map_proof
- PASS residual_count_2: residual_count=2
- PASS matching_count_16: matching_count=16
- PASS residuals_only_ZT_TI: residual_roles=["TI", "ZT"]
- PASS cycle_profiles_count_3: cycle_profiles=3
- PASS all_selected_ZT_edges_declared: selected_zt_edges=[[3, 4], [7, 10], [8, 14]]

## Next script

    search_gap_a_residual_rule_without_overfit_001.py
