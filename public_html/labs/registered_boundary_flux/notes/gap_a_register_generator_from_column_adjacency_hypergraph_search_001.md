# Gap A register generator from column adjacency hypergraph search 001

Status: gap_a_column_hypergraph_register_generator_candidate_not_found

## Boundary

- This does not close Gap A.
- This searches a bounded family of source-native column hypergraph rules.
- Connectivity is weaker than exact generation.
- Exact components are stronger but still require source derivation of the chosen family.
- Mode 2 mirror remains projection-level evidence and is not promoted here.
- No physical interpretation is claimed.

## Summary

- search_result: "hypergraph_register_candidate_not_found"
- gap_a_closed: false
- source_column_count: 30
- row_count: 18
- non_path_rows: [5, 8, 9, 11, 15, 16, 17]
- preimage_rows: [3, 16]
- stable_rows: [4, 9, 15]
- zero_rows: [3, 4, 9, 15, 16]
- source_native_feature_family_count: 102
- source_native_value_hyperedge_count: 633
- exact_value_hit_count: 8
- exact_value_hit_rows: [15]
- evaluated_candidate_count: 15282
- family_pool_count: 45
- all_rows_exact_component_candidate_count: 0
- all_rows_induced_candidate_count: 0
- all_nonpath_exact_candidate_count: 0
- all_nonpath_induced_candidate_count: 0
- best_candidate: {"active_hyperedge_count": 1, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 8, "families": ["p900_candidate0_edge_law.petersen_a.cycle_a_5x3"], "family_count": 1, "induced_connected_count": 8, "leakage_total": 0, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 8795}
- claim_closes_gap_a: false

## Exact feature-value hits

- {"columns": [21, 22], "cycle": 2, "feature": "p900_candidate0_edge_law.sector.a", "role": "ZT", "row_ordinal": 15, "value_key": "8"}
- {"columns": [21, 22], "cycle": 2, "feature": "p900_candidate0_edge_law.petersen_a.pair_direct", "role": "ZT", "row_ordinal": 15, "value_key": "[3, 8]"}
- {"columns": [21, 22], "cycle": 2, "feature": "p900_candidate0_edge_law.petersen_a.pair_undir", "role": "ZT", "row_ordinal": 15, "value_key": "[3, 8]"}
- {"columns": [21, 22], "cycle": 2, "feature": "p900_candidate0_edge_law.petersen_a.sum_mod15", "role": "ZT", "row_ordinal": 15, "value_key": "11"}
- {"columns": [21, 22], "cycle": 2, "feature": "p900_candidate1_edge_law.sector.a", "role": "ZT", "row_ordinal": 15, "value_key": "8"}
- {"columns": [21, 22], "cycle": 2, "feature": "p900_candidate1_edge_law.petersen_a.pair_direct", "role": "ZT", "row_ordinal": 15, "value_key": "[3, 8]"}
- {"columns": [21, 22], "cycle": 2, "feature": "p900_candidate1_edge_law.petersen_a.pair_undir", "role": "ZT", "row_ordinal": 15, "value_key": "[3, 8]"}
- {"columns": [21, 22], "cycle": 2, "feature": "p900_candidate1_edge_law.petersen_a.sum_mod15", "role": "ZT", "row_ordinal": 15, "value_key": "11"}

## Best candidate compact

{
  "active_hyperedge_count": 1,
  "all_non_path_rows_exact_components": false,
  "all_non_path_rows_induced_connected": false,
  "all_rows_exact_components": false,
  "all_rows_induced_connected": false,
  "exact_component_count": 8,
  "families": [
    "p900_candidate0_edge_law.petersen_a.cycle_a_5x3"
  ],
  "family_count": 1,
  "induced_connected_count": 8,
  "leakage_total": 0,
  "non_path_exact_component_count": 0,
  "non_path_induced_connected_count": 0,
  "score": 8795
}

## Best candidate row results

- {"columns": [0], "cycle": 0, "extra_columns": [], "full_component_exact": true, "induced_connected": true, "missing_columns": [], "role": "WX", "row_ordinal": 0}
- {"columns": [4], "cycle": 0, "extra_columns": [], "full_component_exact": true, "induced_connected": true, "missing_columns": [], "role": "XY", "row_ordinal": 1}
- {"columns": [7, 10], "cycle": 0, "extra_columns": [], "full_component_exact": false, "induced_connected": false, "missing_columns": [10], "role": "YZ", "row_ordinal": 2}
- {"columns": [9], "cycle": 0, "extra_columns": [], "full_component_exact": true, "induced_connected": true, "missing_columns": [], "role": "ZT", "row_ordinal": 3}
- {"columns": [13], "cycle": 0, "extra_columns": [], "full_component_exact": true, "induced_connected": true, "missing_columns": [], "role": "TI", "row_ordinal": 4}
- {"columns": [1, 7], "cycle": 0, "extra_columns": [], "full_component_exact": false, "induced_connected": false, "missing_columns": [7], "role": "IW", "row_ordinal": 5}
- {"columns": [0], "cycle": 1, "extra_columns": [], "full_component_exact": true, "induced_connected": true, "missing_columns": [], "role": "WX", "row_ordinal": 6}
- {"columns": [4], "cycle": 1, "extra_columns": [], "full_component_exact": true, "induced_connected": true, "missing_columns": [], "role": "XY", "row_ordinal": 7}
- {"columns": [1, 3, 22], "cycle": 1, "extra_columns": [], "full_component_exact": false, "induced_connected": false, "missing_columns": [3, 22], "role": "YZ", "row_ordinal": 8}
- {"columns": [9, 11, 14], "cycle": 1, "extra_columns": [], "full_component_exact": false, "induced_connected": false, "missing_columns": [11, 14], "role": "ZT", "row_ordinal": 9}
- {"columns": [10, 11], "cycle": 1, "extra_columns": [], "full_component_exact": false, "induced_connected": false, "missing_columns": [11], "role": "TI", "row_ordinal": 10}
- {"columns": [1, 7], "cycle": 1, "extra_columns": [], "full_component_exact": false, "induced_connected": false, "missing_columns": [7], "role": "IW", "row_ordinal": 11}
- {"columns": [0], "cycle": 2, "extra_columns": [], "full_component_exact": true, "induced_connected": true, "missing_columns": [], "role": "WX", "row_ordinal": 12}
- {"columns": [4], "cycle": 2, "extra_columns": [], "full_component_exact": true, "induced_connected": true, "missing_columns": [], "role": "XY", "row_ordinal": 13}
- {"columns": [4, 5], "cycle": 2, "extra_columns": [], "full_component_exact": false, "induced_connected": false, "missing_columns": [5], "role": "YZ", "row_ordinal": 14}
- {"columns": [21, 22], "cycle": 2, "extra_columns": [], "full_component_exact": false, "induced_connected": false, "missing_columns": [22], "role": "ZT", "row_ordinal": 15}
- {"columns": [13, 15], "cycle": 2, "extra_columns": [], "full_component_exact": false, "induced_connected": false, "missing_columns": [15], "role": "TI", "row_ordinal": 16}
- {"columns": [1, 7], "cycle": 2, "extra_columns": [], "full_component_exact": false, "induced_connected": false, "missing_columns": [7], "role": "IW", "row_ordinal": 17}

## Top candidates

- {"active_hyperedge_count": 1, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 8, "families": ["p900_candidate0_edge_law.petersen_a.cycle_a_5x3"], "family_count": 1, "induced_connected_count": 8, "leakage_total": 0, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 8795}
- {"active_hyperedge_count": 1, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 8, "families": ["p900_candidate1_edge_law.petersen_a.cycle_a_5x3"], "family_count": 1, "induced_connected_count": 8, "leakage_total": 0, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 8795}
- {"active_hyperedge_count": 2, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 8, "families": ["p900_candidate0_edge_law.petersen_a.cycle_a_5x3", "p900_candidate1_edge_law.petersen_a.cycle_a_5x3"], "family_count": 2, "induced_connected_count": 8, "leakage_total": 0, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 8790}
- {"active_hyperedge_count": 11, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 6, "families": ["p900_candidate0_edge_law.petersen_b.pair_direct"], "family_count": 1, "induced_connected_count": 8, "leakage_total": 10, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 6765}
- {"active_hyperedge_count": 11, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 6, "families": ["p900_candidate0_edge_law.petersen_b.pair_undir"], "family_count": 1, "induced_connected_count": 8, "leakage_total": 10, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 6765}
- {"active_hyperedge_count": 11, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 6, "families": ["p900_candidate0_edge_law.sector.b"], "family_count": 1, "induced_connected_count": 8, "leakage_total": 10, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 6765}
- {"active_hyperedge_count": 11, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 6, "families": ["p900_candidate1_edge_law.petersen_b.pair_direct"], "family_count": 1, "induced_connected_count": 8, "leakage_total": 10, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 6765}
- {"active_hyperedge_count": 11, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 6, "families": ["p900_candidate1_edge_law.petersen_b.pair_undir"], "family_count": 1, "induced_connected_count": 8, "leakage_total": 10, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 6765}
- {"active_hyperedge_count": 11, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 6, "families": ["p900_candidate1_edge_law.sector.b"], "family_count": 1, "induced_connected_count": 8, "leakage_total": 10, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 6765}
- {"active_hyperedge_count": 22, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 6, "families": ["p900_candidate0_edge_law.petersen_b.pair_direct", "p900_candidate0_edge_law.petersen_b.pair_undir"], "family_count": 2, "induced_connected_count": 8, "leakage_total": 10, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 6760}
- {"active_hyperedge_count": 22, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 6, "families": ["p900_candidate0_edge_law.petersen_b.pair_direct", "p900_candidate0_edge_law.sector.b"], "family_count": 2, "induced_connected_count": 8, "leakage_total": 10, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 6760}
- {"active_hyperedge_count": 22, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 6, "families": ["p900_candidate0_edge_law.petersen_b.pair_direct", "p900_candidate1_edge_law.petersen_b.pair_direct"], "family_count": 2, "induced_connected_count": 8, "leakage_total": 10, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 6760}
- {"active_hyperedge_count": 22, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 6, "families": ["p900_candidate0_edge_law.petersen_b.pair_direct", "p900_candidate1_edge_law.petersen_b.pair_undir"], "family_count": 2, "induced_connected_count": 8, "leakage_total": 10, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 6760}
- {"active_hyperedge_count": 22, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 6, "families": ["p900_candidate0_edge_law.petersen_b.pair_direct", "p900_candidate1_edge_law.sector.b"], "family_count": 2, "induced_connected_count": 8, "leakage_total": 10, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 6760}
- {"active_hyperedge_count": 22, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 6, "families": ["p900_candidate0_edge_law.petersen_b.pair_undir", "p900_candidate0_edge_law.sector.b"], "family_count": 2, "induced_connected_count": 8, "leakage_total": 10, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 6760}
- {"active_hyperedge_count": 22, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 6, "families": ["p900_candidate0_edge_law.petersen_b.pair_undir", "p900_candidate1_edge_law.petersen_b.pair_direct"], "family_count": 2, "induced_connected_count": 8, "leakage_total": 10, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 6760}
- {"active_hyperedge_count": 22, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 6, "families": ["p900_candidate0_edge_law.petersen_b.pair_undir", "p900_candidate1_edge_law.petersen_b.pair_undir"], "family_count": 2, "induced_connected_count": 8, "leakage_total": 10, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 6760}
- {"active_hyperedge_count": 22, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 6, "families": ["p900_candidate0_edge_law.petersen_b.pair_undir", "p900_candidate1_edge_law.sector.b"], "family_count": 2, "induced_connected_count": 8, "leakage_total": 10, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 6760}
- {"active_hyperedge_count": 22, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 6, "families": ["p900_candidate0_edge_law.sector.b", "p900_candidate1_edge_law.petersen_b.pair_direct"], "family_count": 2, "induced_connected_count": 8, "leakage_total": 10, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 6760}
- {"active_hyperedge_count": 22, "all_non_path_rows_exact_components": false, "all_non_path_rows_induced_connected": false, "all_rows_exact_components": false, "all_rows_induced_connected": false, "exact_component_count": 6, "families": ["p900_candidate0_edge_law.sector.b", "p900_candidate1_edge_law.petersen_b.pair_undir"], "family_count": 2, "induced_connected_count": 8, "leakage_total": 10, "non_path_exact_component_count": 0, "non_path_induced_connected_count": 0, "score": 6760}

## Interpretation

- main_result: The tested source-native column hypergraph relations did not generate the row supports.
- what_was_tested: Source-native feature values were treated as hyperedges over the 30 source columns. Family combinations were tested for row-support connectivity and exact component recovery.
- why_it_matters: The failed slot-path rows are disconnected in the slot graph, so the next possible source-native mechanism is a seam-join relation over richer column features.
- remaining_gap: A compact source-native WXYZTI row/register generator remains required.
- next_move: Move to a heavier Mac-side bounded grammar/SAT search.

## Claim

- does_this_close_gap_a: false
- does_this_find_exact_component_hypergraph_candidate: false
- does_this_find_induced_connectivity_hypergraph_candidate: false
- does_this_join_all_nonpath_rows: false
- does_this_construct_full_900_carrier_to_register_map: false
- short_form: "The tested source-native column hypergraph relations did not generate the row supports."
- next_problem: "Move to a heavier Mac-side bounded grammar/SAT search."

## Checks

- PASS derivation_return_loaded: gap_a_wxyzti_register_generator_slot_path_candidate_not_found
- PASS mode2_boundary_loaded: gap_a_mode2_projection_mirror_boundary_note_recorded
- PASS upstreamed_supports_loaded: gap_a_projection_row_supports_upstreamed_columnwise_complete_not_generator
- PASS row_grouping_inference_loaded: gap_a_row_grouping_rule_inference_row_local_selectors_complete_not_global
- PASS boundary_theorem_loaded: gap_a_boundary_theorem_note_recorded
- PASS source_columns_loaded: 30
- PASS row_records_loaded: 18
- PASS source_native_hyperedges_found: 633
- PASS candidate_search_completed: 15282
- PASS gap_a_not_closed: hypergraph search only

## Next script

    bruteforce_gap_a_wxyzti_register_generator_family_001.py
