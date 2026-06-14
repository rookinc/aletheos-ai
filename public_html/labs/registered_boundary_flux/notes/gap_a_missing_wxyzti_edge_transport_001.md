# Gap A missing WXYZTI edge transport 001

Status: missing_wxyzti_edges_have_bridge_paths_not_map_proof

Gap: A - chamber/register map.

## Boundary

- This is not a chamber/register map proof.
- This does not turn missing WXYZTI edges into direct source edges.
- It checks whether missing role-edges are connected through the verified edge-column layer.
- A bridge path is a transport candidate, not proof of lawful role projection.

## Summary

- bridge_edge_count: 30
- present_edge_count: 8
- missing_edge_count: 10
- missing_edges_with_bridge_path: 10
- missing_edges_without_bridge_path: []
- role_missing_summary: {"YZ": {"count": 3, "edges": [[2, 3], [2, 7], [2, 8]], "path_lengths": [2, 3, 2], "path_cocycle_sums_mod2": [1, 1, 1], "all_have_bridge_path": true, "min_path_length": 2, "max_path_length": 3}, "IW": {"count": 3, "edges": [[5, 0], [5, 0], [5, 0]], "path_lengths": [2, 2, 2], "path_cocycle_sums_mod2": [0, 0, 0], "all_have_bridge_path": true, "min_path_length": 2, "max_path_length": 2}, "ZT": {"count": 2, "edges": [[7, 10], [8, 14]], "path_lengths": [3, 2], "path_cocycle_sums_mod2": [0, 0], "all_have_bridge_path": true, "min_path_length": 2, "max_path_length": 3}, "TI": {"count": 2, "edges": [[10, 5], [14, 5]], "path_lengths": [2, 2], "path_cocycle_sums_mod2": [1, 0], "all_have_bridge_path": true, "min_path_length": 2, "max_path_length": 2}}

## Missing edge transport candidates

- role=YZ edge=[2, 3] path=[2, 5, 3] path_edges=[[2, 5], [3, 5]] columns=[7, 10] cocycle_values=[1, 0] cocycle_sum_mod2=1
- role=IW edge=[5, 0] path=[0, 2, 5] path_edges=[[0, 2], [2, 5]] columns=[1, 7] cocycle_values=[1, 1] cocycle_sum_mod2=0
- role=YZ edge=[2, 7] path=[2, 0, 14, 7] path_edges=[[0, 2], [0, 14], [7, 14]] columns=[1, 3, 22] cocycle_values=[1, 1, 1] cocycle_sum_mod2=1
- role=ZT edge=[7, 10] path=[7, 4, 3, 10] path_edges=[[4, 7], [3, 4], [3, 10]] columns=[14, 9, 11] cocycle_values=[0, 1, 1] cocycle_sum_mod2=0
- role=TI edge=[10, 5] path=[5, 3, 10] path_edges=[[3, 5], [3, 10]] columns=[10, 11] cocycle_values=[0, 1] cocycle_sum_mod2=1
- role=IW edge=[5, 0] path=[0, 2, 5] path_edges=[[0, 2], [2, 5]] columns=[1, 7] cocycle_values=[1, 1] cocycle_sum_mod2=0
- role=YZ edge=[2, 8] path=[2, 1, 8] path_edges=[[1, 2], [1, 8]] columns=[4, 5] cocycle_values=[1, 0] cocycle_sum_mod2=1
- role=ZT edge=[8, 14] path=[8, 7, 14] path_edges=[[7, 8], [7, 14]] columns=[21, 22] cocycle_values=[1, 1] cocycle_sum_mod2=0
- role=TI edge=[14, 5] path=[5, 4, 14] path_edges=[[4, 5], [4, 14]] columns=[13, 15] cocycle_values=[1, 1] cocycle_sum_mod2=0
- role=IW edge=[5, 0] path=[0, 2, 5] path_edges=[[0, 2], [2, 5]] columns=[1, 7] cocycle_values=[1, 1] cocycle_sum_mod2=0

## Interpretation

- main_result: Missing WXYZTI direct role-edges are tested as bridge-path transport candidates in the verified edge-column layer.
- if_all_paths_exist: If all missing edges have short bridge paths, the problem shifts from edge absence to lawful role-projection/transport selection.
- what_remains_open: A full Gap A map must justify why these bridge paths realize the WXYZTI role-edges.
- next_question: Do the bridge paths reproduce the WXYZTI role pattern and selected ZT behavior?

## Checks

- PASS projection_loaded_partial: status=selected_wxyzti_projection_partial_not_map_proof
- PASS alignment_loaded: status=edge_column_transport_role_alignment_verified_not_map_proof
- PASS bridge_edge_count_30: edge_count=30
- PASS missing_edge_count_10: missing_count=10
- PASS present_edge_count_8: present_count=8
- PASS all_missing_edges_have_bridge_paths: without_path=[]

## Next script

    test_gap_a_bridge_paths_against_wxyzti_role_pattern_001.py
