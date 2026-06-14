# Gap A WXYZTI register generator derivation return 001

Status: gap_a_wxyzti_register_generator_slot_path_candidate_not_found

## Boundary

- This does not close Gap A.
- This tests a simple source slot-path generator only.
- Failure of this candidate does not rule out a source-native generator.
- Mode 2 mirror remains projection-level evidence and is not promoted here.
- No physical interpretation is claimed.

## Summary

- derivation_return_result: "slot_path_register_candidate_not_found"
- gap_a_closed: false
- source_column_count: 30
- slot_edge_column_count: 30
- row_count: 18
- path_like_rows: [0, 1, 2, 3, 4, 6, 7, 10, 12, 13, 14]
- open_path_like_rows: [0, 1, 2, 3, 4, 6, 7, 10, 12, 13, 14]
- shortest_exact_rows: [0, 1, 2, 3, 4, 6, 7, 10, 12, 13, 14]
- disconnected_rows: [5, 8, 9, 11, 15, 16, 17]
- non_path_rows: [5, 8, 9, 11, 15, 16, 17]
- cycles_with_closed_wxyzti_orientation: []
- all_rows_path_like: false
- all_rows_open_path_like: false
- all_cycles_oriented: false
- preimage_rows: [3, 16]
- stable_rows: [4, 9, 15]
- zero_rows: [3, 4, 9, 15, 16]
- claim_closes_gap_a: false

## Cycle reports

- {"all_rows_open_path_like": false, "blocking_rows": [{"columns": [1, 7], "reason": {"component_count": 2, "connected": false, "endpoints": [0, 2, 3, 4], "is_open_path_like": false, "max_degree": 1}, "role": "IW", "row_ordinal": 5}], "cycle": 0, "exact_closed_wxyzti_orientation_found": false, "row_ids": [0, 1, 2, 3, 4, 5], "solution_count": 0, "solutions": []}
- {"all_rows_open_path_like": false, "blocking_rows": [{"columns": [1, 3, 22], "reason": {"component_count": 2, "connected": false, "endpoints": [4, 7, 8, 11], "is_open_path_like": false, "max_degree": 2}, "role": "YZ", "row_ordinal": 8}, {"columns": [9, 11, 14], "reason": {"component_count": 2, "connected": false, "endpoints": [2, 3, 4, 14], "is_open_path_like": false, "max_degree": 2}, "role": "ZT", "row_ordinal": 9}, {"columns": [1, 7], "reason": {"component_count": 2, "connected": false, "endpoints": [0, 2, 3, 4], "is_open_path_like": false, "max_degree": 1}, "role": "IW", "row_ordinal": 11}], "cycle": 1, "exact_closed_wxyzti_orientation_found": false, "row_ids": [6, 7, 8, 9, 10, 11], "solution_count": 0, "solutions": []}
- {"all_rows_open_path_like": false, "blocking_rows": [{"columns": [21, 22], "reason": {"component_count": 2, "connected": false, "endpoints": [6, 7, 8, 14], "is_open_path_like": false, "max_degree": 1}, "role": "ZT", "row_ordinal": 15}, {"columns": [13, 15], "reason": {"component_count": 2, "connected": false, "endpoints": [4, 5, 6, 10], "is_open_path_like": false, "max_degree": 1}, "role": "TI", "row_ordinal": 16}, {"columns": [1, 7], "reason": {"component_count": 2, "connected": false, "endpoints": [0, 2, 3, 4], "is_open_path_like": false, "max_degree": 1}, "role": "IW", "row_ordinal": 17}], "cycle": 2, "exact_closed_wxyzti_orientation_found": false, "row_ids": [12, 13, 14, 15, 16, 17], "solution_count": 0, "solutions": []}

## Row path profiles compact

- {"columns": [0], "component_count": 1, "connected": true, "cycle": 0, "endpoints": [0, 1], "is_open_path_like": true, "preimage": false, "role": "WX", "row_ordinal": 0, "shortest_distance": 1, "shortest_distance_matches_support_size": true, "slot_edges": [[0, 1]], "stable_complement": false, "zero_twisted_source_row": false}
- {"columns": [4], "component_count": 1, "connected": true, "cycle": 0, "endpoints": [1, 2], "is_open_path_like": true, "preimage": false, "role": "XY", "row_ordinal": 1, "shortest_distance": 1, "shortest_distance_matches_support_size": true, "slot_edges": [[1, 2]], "stable_complement": false, "zero_twisted_source_row": false}
- {"columns": [7, 10], "component_count": 1, "connected": true, "cycle": 0, "endpoints": [2, 4], "is_open_path_like": true, "preimage": false, "role": "YZ", "row_ordinal": 2, "shortest_distance": 2, "shortest_distance_matches_support_size": true, "slot_edges": [[2, 3], [3, 4]], "stable_complement": false, "zero_twisted_source_row": false}
- {"columns": [9], "component_count": 1, "connected": true, "cycle": 0, "endpoints": [2, 13], "is_open_path_like": true, "preimage": true, "role": "ZT", "row_ordinal": 3, "shortest_distance": 1, "shortest_distance_matches_support_size": true, "slot_edges": [[2, 13]], "stable_complement": false, "zero_twisted_source_row": true}
- {"columns": [13], "component_count": 1, "connected": true, "cycle": 0, "endpoints": [4, 10], "is_open_path_like": true, "preimage": false, "role": "TI", "row_ordinal": 4, "shortest_distance": 1, "shortest_distance_matches_support_size": true, "slot_edges": [[4, 10]], "stable_complement": true, "zero_twisted_source_row": true}
- {"columns": [1, 7], "component_count": 2, "connected": false, "cycle": 0, "endpoints": [0, 2, 3, 4], "is_open_path_like": false, "preimage": false, "role": "IW", "row_ordinal": 5, "shortest_distance": null, "shortest_distance_matches_support_size": false, "slot_edges": [[0, 4], [2, 3]], "stable_complement": false, "zero_twisted_source_row": false}
- {"columns": [0], "component_count": 1, "connected": true, "cycle": 1, "endpoints": [0, 1], "is_open_path_like": true, "preimage": false, "role": "WX", "row_ordinal": 6, "shortest_distance": 1, "shortest_distance_matches_support_size": true, "slot_edges": [[0, 1]], "stable_complement": false, "zero_twisted_source_row": false}
- {"columns": [4], "component_count": 1, "connected": true, "cycle": 1, "endpoints": [1, 2], "is_open_path_like": true, "preimage": false, "role": "XY", "row_ordinal": 7, "shortest_distance": 1, "shortest_distance_matches_support_size": true, "slot_edges": [[1, 2]], "stable_complement": false, "zero_twisted_source_row": false}
- {"columns": [1, 3, 22], "component_count": 2, "connected": false, "cycle": 1, "endpoints": [4, 7, 8, 11], "is_open_path_like": false, "preimage": false, "role": "YZ", "row_ordinal": 8, "shortest_distance": null, "shortest_distance_matches_support_size": false, "slot_edges": [[0, 4], [0, 11], [7, 8]], "stable_complement": false, "zero_twisted_source_row": false}
- {"columns": [9, 11, 14], "component_count": 2, "connected": false, "cycle": 1, "endpoints": [2, 3, 4, 14], "is_open_path_like": false, "preimage": false, "role": "ZT", "row_ordinal": 9, "shortest_distance": null, "shortest_distance_matches_support_size": false, "slot_edges": [[2, 13], [3, 13], [4, 14]], "stable_complement": true, "zero_twisted_source_row": true}
- {"columns": [10, 11], "component_count": 1, "connected": true, "cycle": 1, "endpoints": [4, 13], "is_open_path_like": true, "preimage": false, "role": "TI", "row_ordinal": 10, "shortest_distance": 2, "shortest_distance_matches_support_size": true, "slot_edges": [[3, 4], [3, 13]], "stable_complement": false, "zero_twisted_source_row": false}
- {"columns": [1, 7], "component_count": 2, "connected": false, "cycle": 1, "endpoints": [0, 2, 3, 4], "is_open_path_like": false, "preimage": false, "role": "IW", "row_ordinal": 11, "shortest_distance": null, "shortest_distance_matches_support_size": false, "slot_edges": [[0, 4], [2, 3]], "stable_complement": false, "zero_twisted_source_row": false}
- {"columns": [0], "component_count": 1, "connected": true, "cycle": 2, "endpoints": [0, 1], "is_open_path_like": true, "preimage": false, "role": "WX", "row_ordinal": 12, "shortest_distance": 1, "shortest_distance_matches_support_size": true, "slot_edges": [[0, 1]], "stable_complement": false, "zero_twisted_source_row": false}
- {"columns": [4], "component_count": 1, "connected": true, "cycle": 2, "endpoints": [1, 2], "is_open_path_like": true, "preimage": false, "role": "XY", "row_ordinal": 13, "shortest_distance": 1, "shortest_distance_matches_support_size": true, "slot_edges": [[1, 2]], "stable_complement": false, "zero_twisted_source_row": false}
- {"columns": [4, 5], "component_count": 1, "connected": true, "cycle": 2, "endpoints": [2, 11], "is_open_path_like": true, "preimage": false, "role": "YZ", "row_ordinal": 14, "shortest_distance": 2, "shortest_distance_matches_support_size": true, "slot_edges": [[1, 2], [1, 11]], "stable_complement": false, "zero_twisted_source_row": false}
- {"columns": [21, 22], "component_count": 2, "connected": false, "cycle": 2, "endpoints": [6, 7, 8, 14], "is_open_path_like": false, "preimage": false, "role": "ZT", "row_ordinal": 15, "shortest_distance": null, "shortest_distance_matches_support_size": false, "slot_edges": [[6, 14], [7, 8]], "stable_complement": true, "zero_twisted_source_row": true}
- {"columns": [13, 15], "component_count": 2, "connected": false, "cycle": 2, "endpoints": [4, 5, 6, 10], "is_open_path_like": false, "preimage": true, "role": "TI", "row_ordinal": 16, "shortest_distance": null, "shortest_distance_matches_support_size": false, "slot_edges": [[4, 10], [5, 6]], "stable_complement": false, "zero_twisted_source_row": true}
- {"columns": [1, 7], "component_count": 2, "connected": false, "cycle": 2, "endpoints": [0, 2, 3, 4], "is_open_path_like": false, "preimage": false, "role": "IW", "row_ordinal": 17, "shortest_distance": null, "shortest_distance_matches_support_size": false, "slot_edges": [[0, 4], [2, 3]], "stable_complement": false, "zero_twisted_source_row": false}

## Interpretation

- main_result: The 18 WXYZTI row supports are not explained by the simple source slot-path generator.
- what_was_tested: Each projected row support was treated as a set of source columns, translated to g900 slot edges, and tested as a path in the 15-slot source graph.
- why_it_matters: If the rows are slot paths, the register might be generated from source graph path structure rather than projection lookup.
- remaining_gap: A source-native WXYZTI row/register generator remains required.
- next_move: Broaden from simple paths to source column adjacency/hypergraph generators.

## Claim

- does_this_close_gap_a: false
- does_this_find_simple_slot_path_register_candidate: false
- does_this_construct_full_900_carrier_to_register_map: false
- short_form: "The WXYZTI rows are not generated by the simple source slot-path rule."
- next_problem: "Broaden from simple paths to source column adjacency/hypergraph generators."

## Checks

- PASS mode2_boundary_loaded: gap_a_mode2_projection_mirror_boundary_note_recorded
- PASS upstreamed_supports_loaded: gap_a_projection_row_supports_upstreamed_columnwise_complete_not_generator
- PASS row_grouping_inference_loaded: gap_a_row_grouping_rule_inference_row_local_selectors_complete_not_global
- PASS boundary_theorem_loaded: gap_a_boundary_theorem_note_recorded
- PASS source_columns_loaded: 30
- PASS slot_edges_loaded: 30
- PASS row_profiles_completed: 18
- PASS gap_a_not_closed: derivation return probe only

## Next script

    search_gap_a_register_generator_from_column_adjacency_hypergraph_001.py
