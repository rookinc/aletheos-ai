# Sparse law shared_B + reverse_partner source meaning audit 001

Status: sparse_law_shared_B_reverse_partner_source_meaning_supported_not_full_g900

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This audits source-facing meaning for a 120-record sparse carrier law.
- Source-facing meaning is not the same as a source-native WXYZTI generator.
- No independent witness layer is proven.
- No physical interpretation is claimed.

## Source meaning

- law_name: "shared_B+reverse_partner"
- relations: ["shared_B", "reverse_partner"]
- source_native_reading: "anchor-and-reverse transport on oriented length-2 source-shell records"
- shared_B_meaning: "same oriented source endpoint B; records live in the same source-anchor bucket"
- reverse_partner_meaning: "same length-2 path with B and C exchanged; orientation flips across the same hinge A and same two columns"
- combined_meaning: "within an anchor bucket, vary outgoing two-step records; by reversal, move the anchor to the opposite endpoint; repeat"
- quotient_meaning: "shared_B creates local cliques over each B anchor, while reverse_partner supplies the inter-bucket transport on B labels"
- why_sparse: "The law uses 480 edges instead of the 7140-edge complete carrier."
- why_source_facing: "The law is defined from B,C,A orientation and reversal structure, not row/support roles or radius-1 register rows."
- why_not_generator: "It is a carrier law on the 120-record source-shell background, not a derivation of the WXYZTI projection-family generator from G60."

## Summary

- audit_result: "sparse_law_source_meaning_supported"
- gap_a_status: "open"
- gap_a_closed: false
- law_name: "shared_B+reverse_partner"
- best_sparse_law_relations: ["reverse_partner", "shared_B"]
- source_only: true
- row_support_free: true
- uses_only_oriented_record_data: true
- record_count: 120
- admitted_count: 4
- admitted_keys: ["11|7|14|23,24", "13|9|10|28,29", "2|1|0|0,4", "4|3|2|7,10"]
- B_bucket_count: 15
- B_bucket_sizes: {"0": 8, "1": 8, "10": 8, "11": 8, "12": 8, "13": 8, "14": 8, "2": 8, "3": 8, "4": 8, "5": 8, "6": 8, "7": 8, "8": 8, "9": 8}
- B_bucket_size_values: [8]
- all_B_buckets_same_size: true
- shared_B_edges: 420
- reverse_partner_edges: 60
- union_edges: 480
- complete_graph_edges: 7140
- union_density: 0.06722689075630252
- shared_B_component_count: 15
- shared_B_largest_component_size: 8
- reverse_partner_component_count: 60
- reverse_partner_largest_component_size: 2
- union_component_count: 1
- union_largest_component_size: 120
- union_reaches_all_records_from_admitted: true
- union_settles_all_shells_to_admitted: true
- quotient_B_node_count: 15
- quotient_B_edge_count: 60
- quotient_B_component_count: 1
- quotient_B_largest_component_size: 15
- quotient_B_degrees: {"0": 8, "1": 8, "10": 8, "11": 8, "12": 8, "13": 8, "14": 8, "2": 8, "3": 8, "4": 8, "5": 8, "6": 8, "7": 8, "8": 8, "9": 8}
- quotient_B_connected: true
- admitted_B_labels: [2, 4, 11, 13]
- full_g900_admission_found: false
- independent_witness_layer_found: false
- source_native_wxyzti_generator_found: false
- claim_closes_gap_a: false

## Admitted source patterns

- {"A": 7, "B": 11, "C": 14, "bucket_size_for_B": 8, "columns": [23, 24], "key": "11|7|14|23,24", "reverse_key": "14|7|11|23,24", "reverse_partner_B": 14}
- {"A": 9, "B": 13, "C": 10, "bucket_size_for_B": 8, "columns": [28, 29], "key": "13|9|10|28,29", "reverse_key": "10|9|13|28,29", "reverse_partner_B": 10}
- {"A": 1, "B": 2, "C": 0, "bucket_size_for_B": 8, "columns": [0, 4], "key": "2|1|0|0,4", "reverse_key": "0|1|2|0,4", "reverse_partner_B": 0}
- {"A": 3, "B": 4, "C": 2, "bucket_size_for_B": 8, "columns": [7, 10], "key": "4|3|2|7,10", "reverse_key": "2|3|4|7,10", "reverse_partner_B": 2}

## Shell reports

- {"loose_count": 0, "node_count": 4, "radius": 0, "settled_count": 4, "settles_to_admitted": true}
- {"loose_count": 31, "node_count": 35, "radius": 1, "settled_count": 4, "settles_to_admitted": true}
- {"loose_count": 68, "node_count": 72, "radius": 2, "settled_count": 4, "settles_to_admitted": true}
- {"loose_count": 110, "node_count": 114, "radius": 3, "settled_count": 4, "settles_to_admitted": true}
- {"loose_count": 116, "node_count": 120, "radius": 4, "settled_count": 4, "settles_to_admitted": true}

## Interpretation

- main_result: The sparse law has a clean source-facing meaning: anchor-and-reverse transport.
- why_this_matters: The winning sparse law is not a row/support artifact. It can be read directly from oriented source-shell records.
- why_not_gap_a_closure: It still acts on the 120-record background and does not derive the WXYZTI generator or a full 900-state evaluator.
- next_move: Record this source-meaning boundary, then compare it against shared_column or search for an independent witness layer.

## Checks

- PASS sparse_boundary_loaded: sparse_neighbor_carrier_boundary_recorded
- PASS sparse_search_loaded: sparse_neighbor_carrier_law_supported_not_full_g900
- PASS larger_boundary_loaded: larger_neighbor_carrier_boundary_recorded
- PASS neighbor_boundary_loaded: neighbor_induced_overdrive_boundary_recorded
- PASS local_boundary_loaded: local_g900_shaped_admission_boundary_recorded
- PASS law_is_expected: ['reverse_partner', 'shared_B']
- PASS source_only: ['reverse_partner', 'shared_B']
- PASS row_support_free: ['reverse_partner', 'shared_B']
- PASS record_count_120: 120
- PASS admitted_count_4: 4
- PASS bucket_count_15: 15
- PASS uniform_bucket_size: [8]
- PASS shared_B_edges_420: 420
- PASS reverse_edges_60: 60
- PASS union_edges_480: 480
- PASS union_connected: 1
- PASS union_reaches_all: 120
- PASS union_settles: [{'radius': 0, 'node_count': 4, 'loose_count': 0, 'settled_count': 4, 'settles_to_admitted': True}, {'radius': 1, 'node_count': 35, 'loose_count': 31, 'settled_count': 4, 'settles_to_admitted': True}, {'radius': 2, 'node_count': 72, 'loose_count': 68, 'settled_count': 4, 'settles_to_admitted': True}, {'radius': 3, 'node_count': 114, 'loose_count': 110, 'settled_count': 4, 'settles_to_admitted': True}, {'radius': 4, 'node_count': 120, 'loose_count': 116, 'settled_count': 4, 'settles_to_admitted': True}]
- PASS quotient_B_connected: 1
- PASS not_full_g900: False
- PASS gap_a_not_closed: audit only

## Next script

    record_sparse_law_source_meaning_boundary_001.py
