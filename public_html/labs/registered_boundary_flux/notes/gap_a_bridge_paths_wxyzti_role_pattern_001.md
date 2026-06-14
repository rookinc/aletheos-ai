# Gap A bridge paths against WXYZTI role pattern 001

Status: wxyzti_bridge_path_role_pattern_partial_not_map_proof

Gap: A - chamber/register map.

## Boundary

- This is not a chamber/register map proof.
- This does not assume cocycle sums are identical to the target pattern.
- It records whether the verified edge-column bridge and bridge paths reproduce, partially reproduce, or fail to reproduce the WXYZTI role pattern.
- A partial result is useful because it localizes which roles need a second transport or interpretation layer.

## Target pattern

- role_order: ["WX", "XY", "YZ", "ZT", "TI", "IW"]
- pattern: [1, 1, 1, 0, 1, 1]

## Summary

- role_row_count: 18
- majority_matches_target_pattern: 4
- majority_mismatches_target_pattern: 2
- stable_cocycle_roles: ["WX", "XY", "YZ", "IW"]
- mixed_cocycle_roles: ["ZT", "TI"]
- direct_role_rows: 8
- bridge_path_role_rows: 10

## Role summary

- WX: expected=1 majority=0 matches=False sums=[0, 0, 0] lengths=[1, 1, 1] direct=3 paths=0
- XY: expected=1 majority=1 matches=True sums=[1, 1, 1] lengths=[1, 1, 1] direct=3 paths=0
- YZ: expected=1 majority=1 matches=True sums=[1, 1, 1] lengths=[2, 3, 2] direct=0 paths=3
- ZT: expected=0 majority=0 matches=True sums=[1, 0, 0] lengths=[1, 3, 2] direct=1 paths=2
- TI: expected=1 majority=1 matches=True sums=[1, 1, 0] lengths=[1, 2, 2] direct=1 paths=2
- IW: expected=1 majority=0 matches=False sums=[0, 0, 0] lengths=[2, 2, 2] direct=0 paths=3

## Interpretation

- main_result: The WXYZTI role pattern has been tested against direct edge-column values plus bridge-path cocycle sums.
- observed_profile: WX and IW are stable-zero, XY and YZ are stable-one, ZT is majority-zero, and TI is mixed in this layer.
- what_this_gives: The role pattern is partly visible but not fully identical to the target pattern at the simple bridge-path cocycle-sum layer.
- what_remains_open: A second role-projection rule may be needed, especially for WX, IW, and mixed TI behavior.
- next_question: Can a bounded role-projection rule account for the partial mismatch without adding arbitrary choices?

## Checks

- PASS projection_loaded: status=selected_wxyzti_projection_partial_not_map_proof
- PASS missing_transport_loaded: status=missing_wxyzti_edges_have_bridge_paths_not_map_proof
- PASS target_loaded: status=normalized_target_not_proof
- PASS role_rows_count_18: count=18
- PASS all_roles_have_3_rows: counts={"IW": 3, "TI": 3, "WX": 3, "XY": 3, "YZ": 3, "ZT": 3}
- PASS all_role_rows_have_transport: missing_transport=[]
- PASS target_pattern_len_6: pattern=[1, 1, 1, 0, 1, 1]

## Next script

    search_gap_a_bounded_role_projection_rule_001.py
