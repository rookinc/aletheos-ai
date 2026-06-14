# Gap A WXYZTI station-variable search 001

Status: gap_a_station_variable_strict_candidate_not_found

## Boundary

- This does not close Gap A.
- This searches station-variable consistency over projected row supports.
- Candidate station assignments are not source derivations.
- The salvaged IW subgrammar is used only as a hint, not proof.
- Mode 2 mirror remains projection-level evidence and is not promoted here.
- No physical interpretation is claimed.

## Summary

- station_search_result: "strict_station_candidate_not_found"
- gap_a_closed: false
- row_count: 18
- hard_rows: [3, 4, 5, 8, 9, 11, 15, 16, 17]
- non_path_rows: [5, 8, 9, 11, 15, 16, 17]
- preimage_rows: [3, 16]
- stable_rows: [4, 9, 15]
- zero_rows: [3, 4, 9, 15, 16]
- strict_cycles: []
- all_cycles_strict: false
- best_mismatch_by_cycle: {"0": 2, "1": 1, "2": 1}
- all_cycles_with_best_leq1: false
- iw_reusable_nonlookup_core_present: true
- obstruction_by_station: {"T": 1, "Y": 1, "Z": 2}
- obstruction_by_role_pair: {"XY->YZ": 1, "YZ->ZT": 2, "ZT->TI": 1}
- claim_closes_gap_a: false

## Candidate pairs by row

- {"candidate_pair_count": 4, "candidate_pairs_preview": [{"cost": 0, "evidence": {"endpoints": [0, 1]}, "from": 0, "source": "open_path_endpoint", "to": 1}, {"cost": 0, "evidence": {"endpoints": [0, 1]}, "from": 1, "source": "open_path_endpoint", "to": 0}, {"cost": 2, "evidence": {"slot_edge": [0, 1]}, "from": 0, "source": "support_slot_edge", "to": 1}, {"cost": 2, "evidence": {"slot_edge": [0, 1]}, "from": 1, "source": "support_slot_edge", "to": 0}], "candidate_sources": {"open_path_endpoint": 2, "support_slot_edge": 2}, "columns": [0], "cycle": 0, "path_like": true, "role": "WX", "row_ordinal": 0}
- {"candidate_pair_count": 4, "candidate_pairs_preview": [{"cost": 0, "evidence": {"endpoints": [1, 2]}, "from": 1, "source": "open_path_endpoint", "to": 2}, {"cost": 0, "evidence": {"endpoints": [1, 2]}, "from": 2, "source": "open_path_endpoint", "to": 1}, {"cost": 2, "evidence": {"slot_edge": [1, 2]}, "from": 1, "source": "support_slot_edge", "to": 2}, {"cost": 2, "evidence": {"slot_edge": [1, 2]}, "from": 2, "source": "support_slot_edge", "to": 1}], "candidate_sources": {"open_path_endpoint": 2, "support_slot_edge": 2}, "columns": [4], "cycle": 0, "path_like": true, "role": "XY", "row_ordinal": 1}
- {"candidate_pair_count": 6, "candidate_pairs_preview": [{"cost": 0, "evidence": {"endpoints": [2, 4]}, "from": 2, "source": "open_path_endpoint", "to": 4}, {"cost": 0, "evidence": {"endpoints": [2, 4]}, "from": 4, "source": "open_path_endpoint", "to": 2}, {"cost": 2, "evidence": {"slot_edge": [2, 3]}, "from": 2, "source": "support_slot_edge", "to": 3}, {"cost": 2, "evidence": {"slot_edge": [2, 3]}, "from": 3, "source": "support_slot_edge", "to": 2}, {"cost": 2, "evidence": {"slot_edge": [3, 4]}, "from": 3, "source": "support_slot_edge", "to": 4}, {"cost": 2, "evidence": {"slot_edge": [3, 4]}, "from": 4, "source": "support_slot_edge", "to": 3}], "candidate_sources": {"open_path_endpoint": 2, "support_slot_edge": 4}, "columns": [7, 10], "cycle": 0, "path_like": true, "role": "YZ", "row_ordinal": 2}
- {"candidate_pair_count": 4, "candidate_pairs_preview": [{"cost": 0, "evidence": {"endpoints": [2, 13]}, "from": 2, "source": "open_path_endpoint", "to": 13}, {"cost": 0, "evidence": {"endpoints": [2, 13]}, "from": 13, "source": "open_path_endpoint", "to": 2}, {"cost": 2, "evidence": {"slot_edge": [2, 13]}, "from": 2, "source": "support_slot_edge", "to": 13}, {"cost": 2, "evidence": {"slot_edge": [2, 13]}, "from": 13, "source": "support_slot_edge", "to": 2}], "candidate_sources": {"open_path_endpoint": 2, "support_slot_edge": 2}, "columns": [9], "cycle": 0, "path_like": true, "role": "ZT", "row_ordinal": 3}
- {"candidate_pair_count": 4, "candidate_pairs_preview": [{"cost": 0, "evidence": {"endpoints": [4, 10]}, "from": 4, "source": "open_path_endpoint", "to": 10}, {"cost": 0, "evidence": {"endpoints": [4, 10]}, "from": 10, "source": "open_path_endpoint", "to": 4}, {"cost": 2, "evidence": {"slot_edge": [4, 10]}, "from": 4, "source": "support_slot_edge", "to": 10}, {"cost": 2, "evidence": {"slot_edge": [4, 10]}, "from": 10, "source": "support_slot_edge", "to": 4}], "candidate_sources": {"open_path_endpoint": 2, "support_slot_edge": 2}, "columns": [13], "cycle": 0, "path_like": true, "role": "TI", "row_ordinal": 4}
- {"candidate_pair_count": 16, "candidate_pairs_preview": [{"cost": 2, "evidence": {"slot_edge": [0, 4]}, "from": 0, "source": "support_slot_edge", "to": 4}, {"cost": 2, "evidence": {"slot_edge": [2, 3]}, "from": 2, "source": "support_slot_edge", "to": 3}, {"cost": 2, "evidence": {"slot_edge": [2, 3]}, "from": 3, "source": "support_slot_edge", "to": 2}, {"cost": 2, "evidence": {"slot_edge": [0, 4]}, "from": 4, "source": "support_slot_edge", "to": 0}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 0, "source": "disconnected_endpoint_join", "to": 2}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 0, "source": "disconnected_endpoint_join", "to": 3}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 0, "source": "disconnected_endpoint_join", "to": 4}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 2, "source": "disconnected_endpoint_join", "to": 0}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 2, "source": "disconnected_endpoint_join", "to": 3}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 2, "source": "disconnected_endpoint_join", "to": 4}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 3, "source": "disconnected_endpoint_join", "to": 0}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 3, "source": "disconnected_endpoint_join", "to": 2}], "candidate_sources": {"disconnected_endpoint_join": 12, "support_slot_edge": 4}, "columns": [1, 7], "cycle": 0, "path_like": false, "role": "IW", "row_ordinal": 5}
- {"candidate_pair_count": 4, "candidate_pairs_preview": [{"cost": 0, "evidence": {"endpoints": [0, 1]}, "from": 0, "source": "open_path_endpoint", "to": 1}, {"cost": 0, "evidence": {"endpoints": [0, 1]}, "from": 1, "source": "open_path_endpoint", "to": 0}, {"cost": 2, "evidence": {"slot_edge": [0, 1]}, "from": 0, "source": "support_slot_edge", "to": 1}, {"cost": 2, "evidence": {"slot_edge": [0, 1]}, "from": 1, "source": "support_slot_edge", "to": 0}], "candidate_sources": {"open_path_endpoint": 2, "support_slot_edge": 2}, "columns": [0], "cycle": 1, "path_like": true, "role": "WX", "row_ordinal": 6}
- {"candidate_pair_count": 4, "candidate_pairs_preview": [{"cost": 0, "evidence": {"endpoints": [1, 2]}, "from": 1, "source": "open_path_endpoint", "to": 2}, {"cost": 0, "evidence": {"endpoints": [1, 2]}, "from": 2, "source": "open_path_endpoint", "to": 1}, {"cost": 2, "evidence": {"slot_edge": [1, 2]}, "from": 1, "source": "support_slot_edge", "to": 2}, {"cost": 2, "evidence": {"slot_edge": [1, 2]}, "from": 2, "source": "support_slot_edge", "to": 1}], "candidate_sources": {"open_path_endpoint": 2, "support_slot_edge": 2}, "columns": [4], "cycle": 1, "path_like": true, "role": "XY", "row_ordinal": 7}
- {"candidate_pair_count": 18, "candidate_pairs_preview": [{"cost": 2, "evidence": {"slot_edge": [0, 4]}, "from": 0, "source": "support_slot_edge", "to": 4}, {"cost": 2, "evidence": {"slot_edge": [0, 11]}, "from": 0, "source": "support_slot_edge", "to": 11}, {"cost": 2, "evidence": {"slot_edge": [0, 4]}, "from": 4, "source": "support_slot_edge", "to": 0}, {"cost": 2, "evidence": {"slot_edge": [7, 8]}, "from": 7, "source": "support_slot_edge", "to": 8}, {"cost": 2, "evidence": {"slot_edge": [7, 8]}, "from": 8, "source": "support_slot_edge", "to": 7}, {"cost": 2, "evidence": {"slot_edge": [0, 11]}, "from": 11, "source": "support_slot_edge", "to": 0}, {"cost": 5, "evidence": {"endpoints": [4, 7, 8, 11]}, "from": 4, "source": "disconnected_endpoint_join", "to": 7}, {"cost": 5, "evidence": {"endpoints": [4, 7, 8, 11]}, "from": 4, "source": "disconnected_endpoint_join", "to": 8}, {"cost": 5, "evidence": {"endpoints": [4, 7, 8, 11]}, "from": 4, "source": "disconnected_endpoint_join", "to": 11}, {"cost": 5, "evidence": {"endpoints": [4, 7, 8, 11]}, "from": 7, "source": "disconnected_endpoint_join", "to": 4}, {"cost": 5, "evidence": {"endpoints": [4, 7, 8, 11]}, "from": 7, "source": "disconnected_endpoint_join", "to": 8}, {"cost": 5, "evidence": {"endpoints": [4, 7, 8, 11]}, "from": 7, "source": "disconnected_endpoint_join", "to": 11}], "candidate_sources": {"disconnected_endpoint_join": 12, "support_slot_edge": 6}, "columns": [1, 3, 22], "cycle": 1, "path_like": false, "role": "YZ", "row_ordinal": 8}
- {"candidate_pair_count": 18, "candidate_pairs_preview": [{"cost": 2, "evidence": {"slot_edge": [2, 13]}, "from": 2, "source": "support_slot_edge", "to": 13}, {"cost": 2, "evidence": {"slot_edge": [3, 13]}, "from": 3, "source": "support_slot_edge", "to": 13}, {"cost": 2, "evidence": {"slot_edge": [4, 14]}, "from": 4, "source": "support_slot_edge", "to": 14}, {"cost": 2, "evidence": {"slot_edge": [2, 13]}, "from": 13, "source": "support_slot_edge", "to": 2}, {"cost": 2, "evidence": {"slot_edge": [3, 13]}, "from": 13, "source": "support_slot_edge", "to": 3}, {"cost": 2, "evidence": {"slot_edge": [4, 14]}, "from": 14, "source": "support_slot_edge", "to": 4}, {"cost": 5, "evidence": {"endpoints": [2, 3, 4, 14]}, "from": 2, "source": "disconnected_endpoint_join", "to": 3}, {"cost": 5, "evidence": {"endpoints": [2, 3, 4, 14]}, "from": 2, "source": "disconnected_endpoint_join", "to": 4}, {"cost": 5, "evidence": {"endpoints": [2, 3, 4, 14]}, "from": 2, "source": "disconnected_endpoint_join", "to": 14}, {"cost": 5, "evidence": {"endpoints": [2, 3, 4, 14]}, "from": 3, "source": "disconnected_endpoint_join", "to": 2}, {"cost": 5, "evidence": {"endpoints": [2, 3, 4, 14]}, "from": 3, "source": "disconnected_endpoint_join", "to": 4}, {"cost": 5, "evidence": {"endpoints": [2, 3, 4, 14]}, "from": 3, "source": "disconnected_endpoint_join", "to": 14}], "candidate_sources": {"disconnected_endpoint_join": 12, "support_slot_edge": 6}, "columns": [9, 11, 14], "cycle": 1, "path_like": false, "role": "ZT", "row_ordinal": 9}
- {"candidate_pair_count": 6, "candidate_pairs_preview": [{"cost": 0, "evidence": {"endpoints": [4, 13]}, "from": 4, "source": "open_path_endpoint", "to": 13}, {"cost": 0, "evidence": {"endpoints": [4, 13]}, "from": 13, "source": "open_path_endpoint", "to": 4}, {"cost": 2, "evidence": {"slot_edge": [3, 4]}, "from": 3, "source": "support_slot_edge", "to": 4}, {"cost": 2, "evidence": {"slot_edge": [3, 13]}, "from": 3, "source": "support_slot_edge", "to": 13}, {"cost": 2, "evidence": {"slot_edge": [3, 4]}, "from": 4, "source": "support_slot_edge", "to": 3}, {"cost": 2, "evidence": {"slot_edge": [3, 13]}, "from": 13, "source": "support_slot_edge", "to": 3}], "candidate_sources": {"open_path_endpoint": 2, "support_slot_edge": 4}, "columns": [10, 11], "cycle": 1, "path_like": true, "role": "TI", "row_ordinal": 10}
- {"candidate_pair_count": 16, "candidate_pairs_preview": [{"cost": 2, "evidence": {"slot_edge": [0, 4]}, "from": 0, "source": "support_slot_edge", "to": 4}, {"cost": 2, "evidence": {"slot_edge": [2, 3]}, "from": 2, "source": "support_slot_edge", "to": 3}, {"cost": 2, "evidence": {"slot_edge": [2, 3]}, "from": 3, "source": "support_slot_edge", "to": 2}, {"cost": 2, "evidence": {"slot_edge": [0, 4]}, "from": 4, "source": "support_slot_edge", "to": 0}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 0, "source": "disconnected_endpoint_join", "to": 2}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 0, "source": "disconnected_endpoint_join", "to": 3}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 0, "source": "disconnected_endpoint_join", "to": 4}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 2, "source": "disconnected_endpoint_join", "to": 0}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 2, "source": "disconnected_endpoint_join", "to": 3}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 2, "source": "disconnected_endpoint_join", "to": 4}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 3, "source": "disconnected_endpoint_join", "to": 0}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 3, "source": "disconnected_endpoint_join", "to": 2}], "candidate_sources": {"disconnected_endpoint_join": 12, "support_slot_edge": 4}, "columns": [1, 7], "cycle": 1, "path_like": false, "role": "IW", "row_ordinal": 11}
- {"candidate_pair_count": 4, "candidate_pairs_preview": [{"cost": 0, "evidence": {"endpoints": [0, 1]}, "from": 0, "source": "open_path_endpoint", "to": 1}, {"cost": 0, "evidence": {"endpoints": [0, 1]}, "from": 1, "source": "open_path_endpoint", "to": 0}, {"cost": 2, "evidence": {"slot_edge": [0, 1]}, "from": 0, "source": "support_slot_edge", "to": 1}, {"cost": 2, "evidence": {"slot_edge": [0, 1]}, "from": 1, "source": "support_slot_edge", "to": 0}], "candidate_sources": {"open_path_endpoint": 2, "support_slot_edge": 2}, "columns": [0], "cycle": 2, "path_like": true, "role": "WX", "row_ordinal": 12}
- {"candidate_pair_count": 4, "candidate_pairs_preview": [{"cost": 0, "evidence": {"endpoints": [1, 2]}, "from": 1, "source": "open_path_endpoint", "to": 2}, {"cost": 0, "evidence": {"endpoints": [1, 2]}, "from": 2, "source": "open_path_endpoint", "to": 1}, {"cost": 2, "evidence": {"slot_edge": [1, 2]}, "from": 1, "source": "support_slot_edge", "to": 2}, {"cost": 2, "evidence": {"slot_edge": [1, 2]}, "from": 2, "source": "support_slot_edge", "to": 1}], "candidate_sources": {"open_path_endpoint": 2, "support_slot_edge": 2}, "columns": [4], "cycle": 2, "path_like": true, "role": "XY", "row_ordinal": 13}
- {"candidate_pair_count": 6, "candidate_pairs_preview": [{"cost": 0, "evidence": {"endpoints": [2, 11]}, "from": 2, "source": "open_path_endpoint", "to": 11}, {"cost": 0, "evidence": {"endpoints": [2, 11]}, "from": 11, "source": "open_path_endpoint", "to": 2}, {"cost": 2, "evidence": {"slot_edge": [1, 2]}, "from": 1, "source": "support_slot_edge", "to": 2}, {"cost": 2, "evidence": {"slot_edge": [1, 11]}, "from": 1, "source": "support_slot_edge", "to": 11}, {"cost": 2, "evidence": {"slot_edge": [1, 2]}, "from": 2, "source": "support_slot_edge", "to": 1}, {"cost": 2, "evidence": {"slot_edge": [1, 11]}, "from": 11, "source": "support_slot_edge", "to": 1}], "candidate_sources": {"open_path_endpoint": 2, "support_slot_edge": 4}, "columns": [4, 5], "cycle": 2, "path_like": true, "role": "YZ", "row_ordinal": 14}
- {"candidate_pair_count": 16, "candidate_pairs_preview": [{"cost": 2, "evidence": {"slot_edge": [6, 14]}, "from": 6, "source": "support_slot_edge", "to": 14}, {"cost": 2, "evidence": {"slot_edge": [7, 8]}, "from": 7, "source": "support_slot_edge", "to": 8}, {"cost": 2, "evidence": {"slot_edge": [7, 8]}, "from": 8, "source": "support_slot_edge", "to": 7}, {"cost": 2, "evidence": {"slot_edge": [6, 14]}, "from": 14, "source": "support_slot_edge", "to": 6}, {"cost": 5, "evidence": {"endpoints": [6, 7, 8, 14]}, "from": 6, "source": "disconnected_endpoint_join", "to": 7}, {"cost": 5, "evidence": {"endpoints": [6, 7, 8, 14]}, "from": 6, "source": "disconnected_endpoint_join", "to": 8}, {"cost": 5, "evidence": {"endpoints": [6, 7, 8, 14]}, "from": 6, "source": "disconnected_endpoint_join", "to": 14}, {"cost": 5, "evidence": {"endpoints": [6, 7, 8, 14]}, "from": 7, "source": "disconnected_endpoint_join", "to": 6}, {"cost": 5, "evidence": {"endpoints": [6, 7, 8, 14]}, "from": 7, "source": "disconnected_endpoint_join", "to": 8}, {"cost": 5, "evidence": {"endpoints": [6, 7, 8, 14]}, "from": 7, "source": "disconnected_endpoint_join", "to": 14}, {"cost": 5, "evidence": {"endpoints": [6, 7, 8, 14]}, "from": 8, "source": "disconnected_endpoint_join", "to": 6}, {"cost": 5, "evidence": {"endpoints": [6, 7, 8, 14]}, "from": 8, "source": "disconnected_endpoint_join", "to": 7}], "candidate_sources": {"disconnected_endpoint_join": 12, "support_slot_edge": 4}, "columns": [21, 22], "cycle": 2, "path_like": false, "role": "ZT", "row_ordinal": 15}
- {"candidate_pair_count": 16, "candidate_pairs_preview": [{"cost": 2, "evidence": {"slot_edge": [4, 10]}, "from": 4, "source": "support_slot_edge", "to": 10}, {"cost": 2, "evidence": {"slot_edge": [5, 6]}, "from": 5, "source": "support_slot_edge", "to": 6}, {"cost": 2, "evidence": {"slot_edge": [5, 6]}, "from": 6, "source": "support_slot_edge", "to": 5}, {"cost": 2, "evidence": {"slot_edge": [4, 10]}, "from": 10, "source": "support_slot_edge", "to": 4}, {"cost": 5, "evidence": {"endpoints": [4, 5, 6, 10]}, "from": 4, "source": "disconnected_endpoint_join", "to": 5}, {"cost": 5, "evidence": {"endpoints": [4, 5, 6, 10]}, "from": 4, "source": "disconnected_endpoint_join", "to": 6}, {"cost": 5, "evidence": {"endpoints": [4, 5, 6, 10]}, "from": 4, "source": "disconnected_endpoint_join", "to": 10}, {"cost": 5, "evidence": {"endpoints": [4, 5, 6, 10]}, "from": 5, "source": "disconnected_endpoint_join", "to": 4}, {"cost": 5, "evidence": {"endpoints": [4, 5, 6, 10]}, "from": 5, "source": "disconnected_endpoint_join", "to": 6}, {"cost": 5, "evidence": {"endpoints": [4, 5, 6, 10]}, "from": 5, "source": "disconnected_endpoint_join", "to": 10}, {"cost": 5, "evidence": {"endpoints": [4, 5, 6, 10]}, "from": 6, "source": "disconnected_endpoint_join", "to": 4}, {"cost": 5, "evidence": {"endpoints": [4, 5, 6, 10]}, "from": 6, "source": "disconnected_endpoint_join", "to": 5}], "candidate_sources": {"disconnected_endpoint_join": 12, "support_slot_edge": 4}, "columns": [13, 15], "cycle": 2, "path_like": false, "role": "TI", "row_ordinal": 16}
- {"candidate_pair_count": 16, "candidate_pairs_preview": [{"cost": 2, "evidence": {"slot_edge": [0, 4]}, "from": 0, "source": "support_slot_edge", "to": 4}, {"cost": 2, "evidence": {"slot_edge": [2, 3]}, "from": 2, "source": "support_slot_edge", "to": 3}, {"cost": 2, "evidence": {"slot_edge": [2, 3]}, "from": 3, "source": "support_slot_edge", "to": 2}, {"cost": 2, "evidence": {"slot_edge": [0, 4]}, "from": 4, "source": "support_slot_edge", "to": 0}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 0, "source": "disconnected_endpoint_join", "to": 2}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 0, "source": "disconnected_endpoint_join", "to": 3}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 0, "source": "disconnected_endpoint_join", "to": 4}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 2, "source": "disconnected_endpoint_join", "to": 0}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 2, "source": "disconnected_endpoint_join", "to": 3}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 2, "source": "disconnected_endpoint_join", "to": 4}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 3, "source": "disconnected_endpoint_join", "to": 0}, {"cost": 5, "evidence": {"endpoints": [0, 2, 3, 4]}, "from": 3, "source": "disconnected_endpoint_join", "to": 2}], "candidate_sources": {"disconnected_endpoint_join": 12, "support_slot_edge": 4}, "columns": [1, 7], "cycle": 2, "path_like": false, "role": "IW", "row_ordinal": 17}

## Cycle reports compact

- {"best_assignment": {"assignment": {"I": 4, "T": 13, "W": 0, "X": 1, "Y": 2, "Z": 4}, "cycle": 0, "mismatch_count": 2, "mismatches": [{"left_role": "YZ", "left_value": 4, "right_role": "ZT", "right_value": 2, "station": "Z"}, {"left_role": "ZT", "left_value": 13, "right_role": "TI", "right_value": 10, "station": "T"}], "pair_cost": 2, "role_pairs": {"IW": {"cost": 2, "evidence": {"slot_edge": [0, 4]}, "from": 4, "source": "support_slot_edge", "to": 0}, "TI": {"cost": 0, "evidence": {"endpoints": [4, 10]}, "from": 10, "source": "open_path_endpoint", "to": 4}, "WX": {"cost": 0, "evidence": {"endpoints": [0, 1]}, "from": 0, "source": "open_path_endpoint", "to": 1}, "XY": {"cost": 0, "evidence": {"endpoints": [1, 2]}, "from": 1, "source": "open_path_endpoint", "to": 2}, "YZ": {"cost": 0, "evidence": {"endpoints": [2, 4]}, "from": 2, "source": "open_path_endpoint", "to": 4}, "ZT": {"cost": 0, "evidence": {"endpoints": [2, 13]}, "from": 2, "source": "open_path_endpoint", "to": 13}}, "total_score": 2022, "weak_pair_count": 0}, "best_mismatch_count": 2, "checked_assignments": 24576, "cycle": 0, "strict_solution_count": 0}
- {"best_assignment": {"assignment": {"I": 4, "T": 3, "W": 0, "X": 1, "Y": 2, "Z": 4}, "cycle": 1, "mismatch_count": 1, "mismatches": [{"left_role": "XY", "left_value": 2, "right_role": "YZ", "right_value": 0, "station": "Y"}], "pair_cost": 11, "role_pairs": {"IW": {"cost": 2, "evidence": {"slot_edge": [0, 4]}, "from": 4, "source": "support_slot_edge", "to": 0}, "TI": {"cost": 2, "evidence": {"slot_edge": [3, 4]}, "from": 3, "source": "support_slot_edge", "to": 4}, "WX": {"cost": 0, "evidence": {"endpoints": [0, 1]}, "from": 0, "source": "open_path_endpoint", "to": 1}, "XY": {"cost": 0, "evidence": {"endpoints": [1, 2]}, "from": 1, "source": "open_path_endpoint", "to": 2}, "YZ": {"cost": 2, "evidence": {"slot_edge": [0, 4]}, "from": 0, "source": "support_slot_edge", "to": 4}, "ZT": {"cost": 5, "evidence": {"endpoints": [2, 3, 4, 14]}, "from": 4, "source": "disconnected_endpoint_join", "to": 3}}, "total_score": 1187, "weak_pair_count": 1}, "best_mismatch_count": 1, "checked_assignments": 497664, "cycle": 1, "strict_solution_count": 0}
- {"best_assignment": {"assignment": {"I": 4, "T": 6, "W": 0, "X": 1, "Y": 2, "Z": 11}, "cycle": 2, "mismatch_count": 1, "mismatches": [{"left_role": "YZ", "left_value": 11, "right_role": "ZT", "right_value": 14, "station": "Z"}], "pair_cost": 9, "role_pairs": {"IW": {"cost": 2, "evidence": {"slot_edge": [0, 4]}, "from": 4, "source": "support_slot_edge", "to": 0}, "TI": {"cost": 5, "evidence": {"endpoints": [4, 5, 6, 10]}, "from": 6, "source": "disconnected_endpoint_join", "to": 4}, "WX": {"cost": 0, "evidence": {"endpoints": [0, 1]}, "from": 0, "source": "open_path_endpoint", "to": 1}, "XY": {"cost": 0, "evidence": {"endpoints": [1, 2]}, "from": 1, "source": "open_path_endpoint", "to": 2}, "YZ": {"cost": 0, "evidence": {"endpoints": [2, 11]}, "from": 2, "source": "open_path_endpoint", "to": 11}, "ZT": {"cost": 2, "evidence": {"slot_edge": [6, 14]}, "from": 14, "source": "support_slot_edge", "to": 6}}, "total_score": 1153, "weak_pair_count": 1}, "best_mismatch_count": 1, "checked_assignments": 393216, "cycle": 2, "strict_solution_count": 0}

## Cross-cycle best assignment summary

{
  "obstruction_by_role_pair": {
    "XY->YZ": 1,
    "YZ->ZT": 2,
    "ZT->TI": 1
  },
  "obstruction_by_station": {
    "T": 1,
    "Y": 1,
    "Z": 2
  },
  "role_stability": {
    "IW": {
      "cycle_invariant_pair": true,
      "distinct_oriented_pair_count": 1,
      "distinct_oriented_pairs": [
        {
          "from": 4,
          "to": 0
        }
      ],
      "pairs_by_cycle": [
        {
          "cycle": 0,
          "from": 4,
          "source": "support_slot_edge",
          "to": 0
        },
        {
          "cycle": 1,
          "from": 4,
          "source": "support_slot_edge",
          "to": 0
        },
        {
          "cycle": 2,
          "from": 4,
          "source": "support_slot_edge",
          "to": 0
        }
      ],
      "sources": [
        "support_slot_edge"
      ]
    },
    "TI": {
      "cycle_invariant_pair": false,
      "distinct_oriented_pair_count": 3,
      "distinct_oriented_pairs": [
        {
          "from": 3,
          "to": 4
        },
        {
          "from": 6,
          "to": 4
        },
        {
          "from": 10,
          "to": 4
        }
      ],
      "pairs_by_cycle": [
        {
          "cycle": 0,
          "from": 10,
          "source": "open_path_endpoint",
          "to": 4
        },
        {
          "cycle": 1,
          "from": 3,
          "source": "support_slot_edge",
          "to": 4
        },
        {
          "cycle": 2,
          "from": 6,
          "source": "disconnected_endpoint_join",
          "to": 4
        }
      ],
      "sources": [
        "disconnected_endpoint_join",
        "open_path_endpoint",
        "support_slot_edge"
      ]
    },
    "WX": {
      "cycle_invariant_pair": true,
      "distinct_oriented_pair_count": 1,
      "distinct_oriented_pairs": [
        {
          "from": 0,
          "to": 1
        }
      ],
      "pairs_by_cycle": [
        {
          "cycle": 0,
          "from": 0,
          "source": "open_path_endpoint",
          "to": 1
        },
        {
          "cycle": 1,
          "from": 0,
          "source": "open_path_endpoint",
          "to": 1
        },
        {
          "cycle": 2,
          "from": 0,
          "source": "open_path_endpoint",
          "to": 1
        }
      ],
      "sources": [
        "open_path_endpoint"
      ]
    },
    "XY": {
      "cycle_invariant_pair": true,
      "distinct_oriented_pair_count": 1,
      "distinct_oriented_pairs": [
        {
          "from": 1,
          "to": 2
        }
      ],
      "pairs_by_cycle": [
        {
          "cycle": 0,
          "from": 1,
          "source": "open_path_endpoint",
          "to": 2
        },
        {
          "cycle": 1,
          "from": 1,
          "source": "open_path_endpoint",
          "to": 2
        },
        {
          "cycle": 2,
          "from": 1,
          "source": "open_path_endpoint",
          "to": 2
        }
      ],
      "sources": [
        "open_path_endpoint"
      ]
    },
    "YZ": {
      "cycle_invariant_pair": false,
      "distinct_oriented_pair_count": 3,
      "distinct_oriented_pairs": [
        {
          "from": 0,
          "to": 4
        },
        {
          "from": 2,
          "to": 4
        },
        {
          "from": 2,
          "to": 11
        }
      ],
      "pairs_by_cycle": [
        {
          "cycle": 0,
          "from": 2,
          "source": "open_path_endpoint",
          "to": 4
        },
        {
          "cycle": 1,
          "from": 0,
          "source": "support_slot_edge",
          "to": 4
        },
        {
          "cycle": 2,
          "from": 2,
          "source": "open_path_endpoint",
          "to": 11
        }
      ],
      "sources": [
        "open_path_endpoint",
        "support_slot_edge"
      ]
    },
    "ZT": {
      "cycle_invariant_pair": false,
      "distinct_oriented_pair_count": 3,
      "distinct_oriented_pairs": [
        {
          "from": 2,
          "to": 13
        },
        {
          "from": 4,
          "to": 3
        },
        {
          "from": 14,
          "to": 6
        }
      ],
      "pairs_by_cycle": [
        {
          "cycle": 0,
          "from": 2,
          "source": "open_path_endpoint",
          "to": 13
        },
        {
          "cycle": 1,
          "from": 4,
          "source": "disconnected_endpoint_join",
          "to": 3
        },
        {
          "cycle": 2,
          "from": 14,
          "source": "support_slot_edge",
          "to": 6
        }
      ],
      "sources": [
        "disconnected_endpoint_join",
        "open_path_endpoint",
        "support_slot_edge"
      ]
    }
  }
}

## Interpretation

- main_result: No strict station-variable generator was found in this bounded SAT-like search.
- why_it_matters: This search tests whether WXYZTI roles can be generated by station variables and chain closure, rather than by row-local selectors.
- salvaged_hint: The IW non-lookup core remains useful as a hint, not as proof.
- why_not_closure: Even a station assignment is only a candidate unless the station variables are derived from the source carrier rather than fit to the projection rows.
- next_move: Record the station-variable obstruction and decide whether to search a richer grammar or stop Gap A as open.

## Claim

- does_this_close_gap_a: false
- does_this_find_strict_station_variable_candidate: false
- does_this_validate_source_native_generator: false
- does_this_use_iw_core_only_as_hint: true
- short_form: "No strict station-variable generator was found in this bounded SAT-like search."
- not_closed_reason: "Even a station assignment is only a candidate unless the station variables are derived from the source carrier rather than fit to the projection rows."
- next_problem: "Record the station-variable obstruction and decide whether to search a richer grammar or stop Gap A as open."

## Checks

- PASS overfit_audit_loaded: gap_a_bruteforce_selector_overfit_audited_reusable_subgrammar_salvaged_not_generator
- PASS bruteforce_loaded: gap_a_bruteforce_wxyzti_register_exact_selector_family_found_not_generator
- PASS derivation_return_loaded: gap_a_wxyzti_register_generator_slot_path_candidate_not_found
- PASS mode2_boundary_loaded: gap_a_mode2_projection_mirror_boundary_note_recorded
- PASS boundary_theorem_loaded: gap_a_boundary_theorem_note_recorded
- PASS row_profiles_loaded: 18
- PASS cycle_reports_completed: 3
- PASS iw_salvaged_hint_loaded: [5, 11, 17]
- PASS gap_a_not_closed: station search only

## Next script

    record_gap_a_station_variable_obstruction_001.py
