# Larger neighbor carrier from overdrive boundary 001

Status: larger_neighbor_carrier_signal_supported_not_full_g900

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This builds a 120-record source-shell/register neighbor carrier, not a 900-state evaluator.
- Neighbor-carrier expansion is finite relational exposure, not physical expansion.
- No independent witness layer is proven.

## Summary

- search_result: "larger_neighbor_carrier_signal_supported"
- gap_a_closed: false
- full_g900_admission_found: false
- larger_neighbor_carrier_built: true
- carrier_node_count: 120
- admitted_count: 4
- admitted_keys: ["11|7|14|23,24", "13|9|10|28,29", "2|1|0|0,4", "4|3|2|7,10"]
- combined_carrier_edge_count: 7140
- combined_carrier_component_count: 1
- combined_carrier_largest_component_size: 120
- combined_admitted_in_single_component: true
- combined_reachable_from_admitted_count: 120
- combined_reaches_all_records: true
- combined_settles_all_shells_to_admitted: true
- source_neighbor_carrier_edge_count: 6306
- source_neighbor_reachable_from_admitted_count: 120
- source_neighbor_carrier_nontrivial: true
- claim_closes_gap_a: false

## Carrier reports

- {"admitted_in_single_component": true, "carrier_name": "source_neighbor", "component_count": 1, "edge_count": 6306, "largest_component_size": 120, "node_count": 120, "reachable_from_admitted_count": 120, "shell_reports": [{"admitted_preserved": true, "loose_count": 0, "node_count": 4, "radius": 0, "settled_count": 4, "settles_to_admitted": true}, {"admitted_preserved": true, "loose_count": 116, "node_count": 120, "radius": 1, "settled_count": 4, "settles_to_admitted": true}, {"admitted_preserved": true, "loose_count": 116, "node_count": 120, "radius": 2, "settled_count": 4, "settles_to_admitted": true}, {"admitted_preserved": true, "loose_count": 116, "node_count": 120, "radius": 3, "settled_count": 4, "settles_to_admitted": true}, {"admitted_preserved": true, "loose_count": 116, "node_count": 120, "radius": 4, "settled_count": 4, "settles_to_admitted": true}, {"admitted_preserved": true, "loose_count": 116, "node_count": 120, "radius": 5, "settled_count": 4, "settles_to_admitted": true}, {"admitted_preserved": true, "loose_count": 116, "node_count": 120, "radius": 6, "settled_count": 4, "settles_to_admitted": true}]}
- {"admitted_in_single_component": true, "carrier_name": "support_neighbor", "component_count": 1, "edge_count": 7140, "largest_component_size": 120, "node_count": 120, "reachable_from_admitted_count": 120, "shell_reports": [{"admitted_preserved": true, "loose_count": 0, "node_count": 4, "radius": 0, "settled_count": 4, "settles_to_admitted": true}, {"admitted_preserved": true, "loose_count": 116, "node_count": 120, "radius": 1, "settled_count": 4, "settles_to_admitted": true}, {"admitted_preserved": true, "loose_count": 116, "node_count": 120, "radius": 2, "settled_count": 4, "settles_to_admitted": true}, {"admitted_preserved": true, "loose_count": 116, "node_count": 120, "radius": 3, "settled_count": 4, "settles_to_admitted": true}, {"admitted_preserved": true, "loose_count": 116, "node_count": 120, "radius": 4, "settled_count": 4, "settles_to_admitted": true}, {"admitted_preserved": true, "loose_count": 116, "node_count": 120, "radius": 5, "settled_count": 4, "settles_to_admitted": true}, {"admitted_preserved": true, "loose_count": 116, "node_count": 120, "radius": 6, "settled_count": 4, "settles_to_admitted": true}]}
- {"admitted_in_single_component": true, "carrier_name": "combined_neighbor", "component_count": 1, "edge_count": 7140, "largest_component_size": 120, "node_count": 120, "reachable_from_admitted_count": 120, "shell_reports": [{"admitted_preserved": true, "loose_count": 0, "node_count": 4, "radius": 0, "settled_count": 4, "settles_to_admitted": true}, {"admitted_preserved": true, "loose_count": 116, "node_count": 120, "radius": 1, "settled_count": 4, "settles_to_admitted": true}, {"admitted_preserved": true, "loose_count": 116, "node_count": 120, "radius": 2, "settled_count": 4, "settles_to_admitted": true}, {"admitted_preserved": true, "loose_count": 116, "node_count": 120, "radius": 3, "settled_count": 4, "settles_to_admitted": true}, {"admitted_preserved": true, "loose_count": 116, "node_count": 120, "radius": 4, "settled_count": 4, "settles_to_admitted": true}, {"admitted_preserved": true, "loose_count": 116, "node_count": 120, "radius": 5, "settled_count": 4, "settles_to_admitted": true}, {"admitted_preserved": true, "loose_count": 116, "node_count": 120, "radius": 6, "settled_count": 4, "settles_to_admitted": true}]}

## Interpretation

- main_result: A larger 120-record neighbor carrier is supported: admitted traces induce a connected overdrive carrier whose expansion settles back to the admitted residue.
- why_this_matters: The neighbor-overdrive mechanism is no longer only a column-shell proxy; it can be represented as a path-neighbor carrier.
- why_not_full_g900: This is still a 120-record source-shell/register carrier, not a full 900-state evaluator with independent witness.
- next_move: Record the larger neighbor-carrier boundary, then search for an independent witness layer or a 900-state lift.

## Claim

- does_this_close_gap_a: false
- does_this_support_larger_neighbor_carrier: true
- does_this_find_full_g900_admission: false
- short_form: "A larger 120-record neighbor carrier is supported: admitted traces induce a connected overdrive carrier whose expansion settles back to the admitted residue."
- not_closed_reason: "This is still a 120-record source-shell/register carrier, not a full 900-state evaluator with independent witness."
- next_problem: "Record the larger neighbor-carrier boundary, then search for an independent witness layer or a 900-state lift."

## Checks

- PASS neighbor_summary_loaded: gap_a_neighbor_overdrive_branch_summary_recorded
- PASS neighbor_boundary_loaded: neighbor_induced_overdrive_boundary_recorded
- PASS neighbor_search_loaded: neighbor_induced_overdrive_signal_supported_not_full_g900
- PASS ratchet_boundary_loaded: internalization_ratchet_boundary_recorded
- PASS local_boundary_loaded: local_g900_shaped_admission_boundary_recorded
- PASS node_count_120: 120
- PASS larger_carrier_built: 7140
- PASS admitted_connected: [0, 0, 0, 0]
- PASS carrier_reaches_all: 120
- PASS settles_all_shells: [{'radius': 0, 'node_count': 4, 'settled_count': 4, 'loose_count': 0, 'settles_to_admitted': True, 'admitted_preserved': True}, {'radius': 1, 'node_count': 120, 'settled_count': 4, 'loose_count': 116, 'settles_to_admitted': True, 'admitted_preserved': True}, {'radius': 2, 'node_count': 120, 'settled_count': 4, 'loose_count': 116, 'settles_to_admitted': True, 'admitted_preserved': True}, {'radius': 3, 'node_count': 120, 'settled_count': 4, 'loose_count': 116, 'settles_to_admitted': True, 'admitted_preserved': True}, {'radius': 4, 'node_count': 120, 'settled_count': 4, 'loose_count': 116, 'settles_to_admitted': True, 'admitted_preserved': True}, {'radius': 5, 'node_count': 120, 'settled_count': 4, 'loose_count': 116, 'settles_to_admitted': True, 'admitted_preserved': True}, {'radius': 6, 'node_count': 120, 'settled_count': 4, 'loose_count': 116, 'settles_to_admitted': True, 'admitted_preserved': True}]
- PASS source_carrier_nontrivial: 120
- PASS not_full_g900: False
- PASS gap_a_not_closed: search only

## Next script

    record_larger_neighbor_carrier_boundary_001.py
