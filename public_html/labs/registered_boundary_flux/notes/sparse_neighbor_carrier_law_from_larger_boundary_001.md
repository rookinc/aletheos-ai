# Sparse neighbor carrier law from larger boundary 001

Status: sparse_neighbor_carrier_law_supported_not_full_g900

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This searches relation subsets inside the 120-record neighbor carrier.
- A sparse carrier law is weaker than a source-native WXYZTI generator.
- No independent witness layer is proven.

## Summary

- search_result: "sparse_neighbor_carrier_law_supported"
- gap_a_closed: false
- full_g900_admission_found: false
- record_count: 120
- admitted_count: 4
- admitted_keys: ["11|7|14|23,24", "13|9|10|28,29", "2|1|0|0,4", "4|3|2|7,10"]
- edge_record_count: 7140
- evaluated_subset_count: 2047
- sparse_success_count: 1012
- source_only_sparse_success_count: 244
- no_row_support_sparse_success_count: 244
- single_relation_sparse_success_count: 5
- best_sparse_law: {"admitted_component_ids": [0, 0, 0, 0], "admitted_in_single_component": true, "complete_edge_count": 7140, "component_count": 1, "density": 0.06722689075630252, "edge_count": 480, "is_complete": false, "is_nontrivial": true, "is_sparse_success": true, "largest_component_size": 120, "name": "shared_B+reverse_partner", "node_count": 120, "reachable_from_admitted_count": 120, "reaches_all_records": true, "relation_count": 2, "relation_edge_counts": {"reverse_partner": 60, "shared_B": 420}, "relations": ["reverse_partner", "shared_B"], "settles_all_shells_to_admitted": true, "shell_reports": [{"loose_count": 0, "node_count": 4, "radius": 0, "settled_count": 4, "settles_to_admitted": true}, {"loose_count": 31, "node_count": 35, "radius": 1, "settled_count": 4, "settles_to_admitted": true}, {"loose_count": 68, "node_count": 72, "radius": 2, "settled_count": 4, "settles_to_admitted": true}, {"loose_count": 110, "node_count": 114, "radius": 3, "settled_count": 4, "settles_to_admitted": true}, {"loose_count": 116, "node_count": 120, "radius": 4, "settled_count": 4, "settles_to_admitted": true}]}
- best_source_only_sparse_law: {"admitted_component_ids": [0, 0, 0, 0], "admitted_in_single_component": true, "complete_edge_count": 7140, "component_count": 1, "density": 0.06722689075630252, "edge_count": 480, "is_complete": false, "is_nontrivial": true, "is_sparse_success": true, "largest_component_size": 120, "name": "shared_B+reverse_partner", "node_count": 120, "reachable_from_admitted_count": 120, "reaches_all_records": true, "relation_count": 2, "relation_edge_counts": {"reverse_partner": 60, "shared_B": 420}, "relations": ["reverse_partner", "shared_B"], "settles_all_shells_to_admitted": true, "shell_reports": [{"loose_count": 0, "node_count": 4, "radius": 0, "settled_count": 4, "settles_to_admitted": true}, {"loose_count": 31, "node_count": 35, "radius": 1, "settled_count": 4, "settles_to_admitted": true}, {"loose_count": 68, "node_count": 72, "radius": 2, "settled_count": 4, "settles_to_admitted": true}, {"loose_count": 110, "node_count": 114, "radius": 3, "settled_count": 4, "settles_to_admitted": true}, {"loose_count": 116, "node_count": 120, "radius": 4, "settled_count": 4, "settles_to_admitted": true}]}
- best_no_row_support_sparse_law: {"admitted_component_ids": [0, 0, 0, 0], "admitted_in_single_component": true, "complete_edge_count": 7140, "component_count": 1, "density": 0.06722689075630252, "edge_count": 480, "is_complete": false, "is_nontrivial": true, "is_sparse_success": true, "largest_component_size": 120, "name": "shared_B+reverse_partner", "node_count": 120, "reachable_from_admitted_count": 120, "reaches_all_records": true, "relation_count": 2, "relation_edge_counts": {"reverse_partner": 60, "shared_B": 420}, "relations": ["reverse_partner", "shared_B"], "settles_all_shells_to_admitted": true, "shell_reports": [{"loose_count": 0, "node_count": 4, "radius": 0, "settled_count": 4, "settles_to_admitted": true}, {"loose_count": 31, "node_count": 35, "radius": 1, "settled_count": 4, "settles_to_admitted": true}, {"loose_count": 68, "node_count": 72, "radius": 2, "settled_count": 4, "settles_to_admitted": true}, {"loose_count": 110, "node_count": 114, "radius": 3, "settled_count": 4, "settles_to_admitted": true}, {"loose_count": 116, "node_count": 120, "radius": 4, "settled_count": 4, "settles_to_admitted": true}]}
- best_single_relation_sparse_law: {"admitted_component_ids": [0, 0, 0, 0], "admitted_in_single_component": true, "complete_edge_count": 7140, "component_count": 1, "density": 0.1092436974789916, "edge_count": 780, "is_complete": false, "is_nontrivial": true, "is_sparse_success": true, "largest_component_size": 120, "name": "shared_column", "node_count": 120, "reachable_from_admitted_count": 120, "reaches_all_records": true, "relation_count": 1, "relation_edge_counts": {"shared_column": 780}, "relations": ["shared_column"], "settles_all_shells_to_admitted": true, "shell_reports": [{"loose_count": 0, "node_count": 4, "radius": 0, "settled_count": 4, "settles_to_admitted": true}, {"loose_count": 50, "node_count": 54, "radius": 1, "settled_count": 4, "settles_to_admitted": true}, {"loose_count": 106, "node_count": 110, "radius": 2, "settled_count": 4, "settles_to_admitted": true}, {"loose_count": 116, "node_count": 120, "radius": 3, "settled_count": 4, "settles_to_admitted": true}]}
- claim_closes_gap_a: false

## Top sparse laws

- {"density": 0.06722689075630252, "edge_count": 480, "reachable_from_admitted_count": 120, "relations": ["reverse_partner", "shared_B"], "settles_all_shells_to_admitted": true}
- {"density": 0.06722689075630252, "edge_count": 480, "reachable_from_admitted_count": 120, "relations": ["reverse_partner", "shared_C"], "settles_all_shells_to_admitted": true}
- {"density": 0.07100840336134454, "edge_count": 507, "reachable_from_admitted_count": 120, "relations": ["reverse_partner", "same_source_polarity_family", "shared_B"], "settles_all_shells_to_admitted": true}
- {"density": 0.07100840336134454, "edge_count": 507, "reachable_from_admitted_count": 120, "relations": ["reverse_partner", "same_source_polarity_family", "shared_C"], "settles_all_shells_to_admitted": true}
- {"density": 0.1092436974789916, "edge_count": 780, "reachable_from_admitted_count": 120, "relations": ["shared_column"], "settles_all_shells_to_admitted": true}
- {"density": 0.1092436974789916, "edge_count": 780, "reachable_from_admitted_count": 120, "relations": ["reverse_partner", "shared_column"], "settles_all_shells_to_admitted": true}
- {"density": 0.1092436974789916, "edge_count": 780, "reachable_from_admitted_count": 120, "relations": ["shared_B", "shared_source_hinge_A"], "settles_all_shells_to_admitted": true}
- {"density": 0.1092436974789916, "edge_count": 780, "reachable_from_admitted_count": 120, "relations": ["shared_C", "shared_source_hinge_A"], "settles_all_shells_to_admitted": true}
- {"density": 0.1092436974789916, "edge_count": 780, "reachable_from_admitted_count": 120, "relations": ["reverse_partner", "shared_B", "shared_source_hinge_A"], "settles_all_shells_to_admitted": true}
- {"density": 0.1092436974789916, "edge_count": 780, "reachable_from_admitted_count": 120, "relations": ["reverse_partner", "shared_C", "shared_source_hinge_A"], "settles_all_shells_to_admitted": true}
- {"density": 0.11260504201680673, "edge_count": 804, "reachable_from_admitted_count": 120, "relations": ["same_source_polarity_family", "shared_C", "shared_source_hinge_A"], "settles_all_shells_to_admitted": true}
- {"density": 0.11260504201680673, "edge_count": 804, "reachable_from_admitted_count": 120, "relations": ["reverse_partner", "same_source_polarity_family", "shared_C", "shared_source_hinge_A"], "settles_all_shells_to_admitted": true}
- {"density": 0.11274509803921569, "edge_count": 805, "reachable_from_admitted_count": 120, "relations": ["same_source_polarity_family", "shared_B", "shared_source_hinge_A"], "settles_all_shells_to_admitted": true}
- {"density": 0.11274509803921569, "edge_count": 805, "reachable_from_admitted_count": 120, "relations": ["reverse_partner", "same_source_polarity_family", "shared_B", "shared_source_hinge_A"], "settles_all_shells_to_admitted": true}
- {"density": 0.11288515406162465, "edge_count": 806, "reachable_from_admitted_count": 120, "relations": ["same_source_polarity_family", "shared_column"], "settles_all_shells_to_admitted": true}
- {"density": 0.11288515406162465, "edge_count": 806, "reachable_from_admitted_count": 120, "relations": ["reverse_partner", "same_source_polarity_family", "shared_column"], "settles_all_shells_to_admitted": true}
- {"density": 0.11764705882352941, "edge_count": 840, "reachable_from_admitted_count": 120, "relations": ["shared_B", "shared_C"], "settles_all_shells_to_admitted": true}
- {"density": 0.12128851540616246, "edge_count": 866, "reachable_from_admitted_count": 120, "relations": ["same_source_polarity_family", "shared_B", "shared_C"], "settles_all_shells_to_admitted": true}
- {"density": 0.12605042016806722, "edge_count": 900, "reachable_from_admitted_count": 120, "relations": ["shared_column", "shared_source_hinge_A"], "settles_all_shells_to_admitted": true}
- {"density": 0.12605042016806722, "edge_count": 900, "reachable_from_admitted_count": 120, "relations": ["reverse_partner", "shared_B", "shared_C"], "settles_all_shells_to_admitted": true}

## Interpretation

- main_result: A sparse neighbor-carrier law was found: the saturated complete carrier can be pruned while preserving global exposure and admitted-residue settling.
- why_this_matters: This answers the saturation caveat by finding whether a non-complete relation subset can carry the neighbor-accounting mechanism.
- why_not_full_g900: The carrier is still a 120-record source-shell/register carrier, not a full 900-state evaluator with independent witness.
- next_move: Record the sparse neighbor-carrier boundary, then audit the best sparse law for source-native meaning.

## Claim

- does_this_close_gap_a: false
- does_this_find_sparse_neighbor_carrier_law: true
- does_this_find_full_g900_admission: false
- short_form: "A sparse neighbor-carrier law was found: the saturated complete carrier can be pruned while preserving global exposure and admitted-residue settling."
- not_closed_reason: "The carrier is still a 120-record source-shell/register carrier, not a full 900-state evaluator with independent witness."
- next_problem: "Record the sparse neighbor-carrier boundary, then audit the best sparse law for source-native meaning."

## Checks

- PASS larger_boundary_loaded: larger_neighbor_carrier_boundary_recorded
- PASS larger_search_loaded: larger_neighbor_carrier_signal_supported_not_full_g900
- PASS neighbor_boundary_loaded: neighbor_induced_overdrive_boundary_recorded
- PASS local_boundary_loaded: local_g900_shaped_admission_boundary_recorded
- PASS record_count_120: 120
- PASS admitted_count_4: 4
- PASS sparse_law_found: count=1012
- PASS best_not_complete: 480
- PASS best_reaches_all: 120
- PASS best_settles: [{'radius': 0, 'node_count': 4, 'settled_count': 4, 'loose_count': 0, 'settles_to_admitted': True}, {'radius': 1, 'node_count': 35, 'settled_count': 4, 'loose_count': 31, 'settles_to_admitted': True}, {'radius': 2, 'node_count': 72, 'settled_count': 4, 'loose_count': 68, 'settles_to_admitted': True}, {'radius': 3, 'node_count': 114, 'settled_count': 4, 'loose_count': 110, 'settles_to_admitted': True}, {'radius': 4, 'node_count': 120, 'settled_count': 4, 'loose_count': 116, 'settles_to_admitted': True}]
- PASS not_full_g900: False
- PASS gap_a_not_closed: search only

## Next script

    record_sparse_neighbor_carrier_boundary_001.py
