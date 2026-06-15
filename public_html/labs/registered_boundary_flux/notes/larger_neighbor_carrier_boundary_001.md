# Larger neighbor carrier boundary 001

Status: larger_neighbor_carrier_boundary_recorded

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This records a larger 120-record neighbor-carrier signal.
- The combined carrier saturates to a complete graph, so it is not a sharp generator.
- No independent witness layer is proven.
- No physical interpretation is claimed.

## Keeper lines

- The overdrive comes from the neighbors.
- Neighbor exposure reaches the whole 120-record background.
- Settling still preserves only the four admitted traces.
- The larger neighbor carrier supports global exposure and stable settling.
- The combined carrier is complete and therefore too saturated to be a sharp generator law.
- This supports neighbor accounting, not source-native closure.
- Full G900 remains unproven.
- Gap A remains open.

## Positive results

- A 120-record neighbor carrier was built.
- The admitted traces lie in a connected larger carrier.
- The combined carrier reaches all 120 records from the admitted residue.
- Every tested shell settles back to the admitted four.
- The source-neighbor carrier is nontrivial.
- Neighbor-induced overdrive remains supported.

## Negative results

- The combined carrier is complete with 7140 edges for 120 nodes.
- A complete combined graph is too dense to serve as a discriminating generator.
- No full 900-state return cycle was found.
- No independent witness layer was found.
- No source-native WXYZTI generator was derived.
- Full G900 was not reached.
- Gap A was not closed.

## Blocked promotions

- Do not call this a sharp source-native generator.
- Do not call this full G900.
- Do not call Gap A closed.
- Do not treat complete-graph reachability as explanatory by itself.
- Do not claim physical interpretation.

## Allowed next work

- Prune the neighbor relation family to find a sharper carrier law.
- Search relation subsets that still reach all records but are not complete.
- Search for an independent witness layer over the settled admitted residue.
- Return to source-native WXYZTI generator derivation using neighbor-accounting as a constraint.

## Summary

- record_result: "larger_neighbor_carrier_boundary_recorded"
- gap_a_status: "open"
- gap_a_closed: false
- larger_neighbor_carrier_supported: true
- carrier_node_count: 120
- admitted_count: 4
- admitted_keys: ["11|7|14|23,24", "13|9|10|28,29", "2|1|0|0,4", "4|3|2|7,10"]
- combined_carrier_edge_count: 7140
- complete_graph_edge_count: 7140
- combined_carrier_is_complete_graph: true
- combined_carrier_component_count: 1
- combined_carrier_largest_component_size: 120
- combined_reaches_all_records: true
- combined_settles_all_shells_to_admitted: true
- source_neighbor_carrier_edge_count: 6306
- source_neighbor_reachable_from_admitted_count: 120
- source_neighbor_carrier_nontrivial: true
- neighbor_induced_overdrive_supported: true
- overdrive_source: "neighbor_exposure"
- all_loose_paths_explained_as_neighbors: true
- all_shells_settle_to_admitted: true
- local_g900_shaped_boundary_reached: true
- local_admission_predicate: "source_shell_polarity_condition AND proper_internalization_gate_r1_row_hit_count_ge5"
- return_trace_witness_proxy_supported: true
- full_900_state_return_cycle_found: false
- heuristic_900_return_signal_found: false
- full_g900_admission_found: false
- independent_witness_layer_found: false
- source_native_generator_found: false
- terminal_reason: "The larger 120-record neighbor carrier supports global exposure and stable settling, but the combined relation saturates to a complete graph. This supports neighbor accounting, not a sharp source-native generator."
- claim_closes_gap_a: false

## Checks

- PASS larger_loaded: larger_neighbor_carrier_signal_supported_not_full_g900
- PASS neighbor_boundary_loaded: neighbor_induced_overdrive_boundary_recorded
- PASS neighbor_summary_loaded: gap_a_neighbor_overdrive_branch_summary_recorded
- PASS local_boundary_loaded: local_g900_shaped_admission_boundary_recorded
- PASS full_return_search_loaded: full_g900_return_cycle_not_found
- PASS larger_supported: True
- PASS node_count_120: 120
- PASS combined_complete_graph: 7140
- PASS combined_reaches_all: True
- PASS settles_to_admitted: True
- PASS full_g900_not_found: False
- PASS gap_a_not_closed: boundary record only

## Next script

    search_sparse_neighbor_carrier_law_from_larger_boundary_001.py
