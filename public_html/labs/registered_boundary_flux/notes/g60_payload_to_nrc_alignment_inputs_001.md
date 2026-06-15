# G60 payload to NRC alignment inputs 001

Status: g60_payload_to_nrc_alignment_inputs_recorded

## Summary

- canonical_g60_payload_loaded: true
- canonical_g60_vertex_count: 60
- canonical_g60_edge_count: 120
- canonical_g60_degree_counts: {"4": 60}
- g60_local_edges_csv_exists: true
- g60_local_edges_csv_matches_imported_payload: true
- g15_slot_edges_csv_exists: true
- g15_slot_pair_count: 30
- g15_slot_vertex_count: 15
- carrier_signing_table_exists: true
- carrier_signing_table_bridge_column_hits: ["slot_u", "slot_v", "sign", "external_edge_count"]
- x_sigma_edges_exists: true
- source_counts_from_binding: {"g15_slots": 15, "g60_fiber_states": 60, "product_vertices": "15 * 60 = 900", "recorded_g15_slot_edge_rows": 30, "recorded_g60_local_edge_rows": 120, "recorded_x_sigma_edge_rows": 3600}
- wxyzti_form_count: 4
- wxyzti_station_key_count: 28
- wxyzti_edge_role_counts: {"reverse_partner": 12, "shared_B": 12}
- alignment_inputs_available: true
- gap_a_closed: false
- full_g900_admission_found: false
- next_step: "inspect_carrier_signing_table_for_g60_to_g15_join"

## CSV files

### g60_local_edges

- exists: true
- path: "/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/18-g900-kernel-admission/source/kernel_payload/g60_local_edges.csv"
- row_count: 120
- headers: ["local_u", "local_v"]
- pair_candidates_first_5: [{"columns": ["local_u", "local_v"], "degree_values": [4], "first_5_pairs": [[0, 16], [0, 19], [0, 25], [0, 55], [1, 15]], "looks_like_g15_edges": false, "looks_like_g60_edges": true, "looks_like_g900_edges": false, "max_vertex": 59, "min_vertex": 0, "row_count": 120, "unique_pair_count": 120, "vertex_count": 60}]

### g15_slot_edges

- exists: true
- path: "/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/18-g900-kernel-admission/source/kernel_payload/g15_slot_edges.csv"
- row_count: 30
- headers: ["slot_u", "slot_v"]
- pair_candidates_first_5: [{"columns": ["slot_u", "slot_v"], "degree_values": [4], "first_5_pairs": [[0, 1], [0, 4], [0, 5], [0, 6], [1, 2]], "looks_like_g15_edges": true, "looks_like_g60_edges": false, "looks_like_g900_edges": false, "max_vertex": 14, "min_vertex": 0, "row_count": 30, "unique_pair_count": 30, "vertex_count": 15}]

### carrier_signing_table

- exists: true
- path: "/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/18-g900-kernel-admission/source/kernel_payload/carrier_signing_table.csv"
- row_count: 30
- headers: ["slot_u", "slot_v", "sign", "carrier_law", "external_edge_count"]
- pair_candidates_first_5: [{"columns": ["slot_u", "external_edge_count"], "degree_values": [1, 2, 3, 4, 30], "first_5_pairs": [[0, 60], [0, 60], [0, 60], [0, 60], [1, 60]], "looks_like_g15_edges": true, "looks_like_g60_edges": false, "looks_like_g900_edges": false, "max_vertex": 60, "min_vertex": 0, "row_count": 30, "unique_pair_count": 14, "vertex_count": 15}, {"columns": ["slot_u", "slot_v"], "degree_values": [4], "first_5_pairs": [[0, 1], [0, 4], [0, 5], [0, 6], [1, 2]], "looks_like_g15_edges": true, "looks_like_g60_edges": false, "looks_like_g900_edges": false, "max_vertex": 14, "min_vertex": 0, "row_count": 30, "unique_pair_count": 30, "vertex_count": 15}, {"columns": ["slot_v", "external_edge_count"], "degree_values": [1, 2, 3, 4, 30], "first_5_pairs": [[1, 60], [4, 60], [5, 60], [6, 60], [2, 60]], "looks_like_g15_edges": true, "looks_like_g60_edges": false, "looks_like_g900_edges": false, "max_vertex": 60, "min_vertex": 1, "row_count": 30, "unique_pair_count": 14, "vertex_count": 15}, {"columns": ["slot_v", "sign"], "degree_values": [1, 2, 3, 4, 15, 16], "first_5_pairs": [[1, 1], [1, 4], [1, 5], [1, 6], [1, 2]], "looks_like_g15_edges": true, "looks_like_g60_edges": false, "looks_like_g900_edges": false, "max_vertex": 14, "min_vertex": 0, "row_count": 30, "unique_pair_count": 17, "vertex_count": 15}, {"columns": ["sign", "external_edge_count"], "degree_values": [15, 30], "first_5_pairs": [[1, 60], [1, 60], [1, 60], [1, 60], [1, 60]], "looks_like_g15_edges": false, "looks_like_g60_edges": false, "looks_like_g900_edges": false, "max_vertex": 60, "min_vertex": 0, "row_count": 30, "unique_pair_count": 2, "vertex_count": 3}]

### x_sigma_edges

- exists: true
- path: "/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/18-g900-kernel-admission/source/kernel_payload/x_sigma_edges.csv"
- row_count: 3600
- headers: ["u_vertex", "v_vertex", "u_slot", "u_local", "v_slot", "v_local", "kind"]
- pair_candidates_first_5: [{"columns": ["u_vertex", "v_vertex"], "degree_values": [8], "first_5_pairs": [[0, 16], [0, 19], [0, 25], [0, 55], [0, 90]], "looks_like_g15_edges": false, "looks_like_g60_edges": false, "looks_like_g900_edges": true, "max_vertex": 899, "min_vertex": 0, "row_count": 3600, "unique_pair_count": 3600, "vertex_count": 900}, {"columns": ["v_vertex", "u_local"], "degree_values": [1, 2, 3, 4, 5, 6, 7, 8, 34, 48, 62, 76, 90], "first_5_pairs": [[0, 16], [0, 19], [0, 25], [0, 55], [0, 90]], "looks_like_g15_edges": false, "looks_like_g60_edges": false, "looks_like_g900_edges": true, "max_vertex": 899, "min_vertex": 0, "row_count": 3600, "unique_pair_count": 2820, "vertex_count": 900}, {"columns": ["v_vertex", "u_slot"], "degree_values": [1, 2, 3, 4, 5, 6, 7, 8, 121, 180, 181, 240, 242, 300, 360], "first_5_pairs": [[0, 16], [0, 19], [0, 25], [0, 55], [0, 90]], "looks_like_g15_edges": false, "looks_like_g60_edges": false, "looks_like_g900_edges": true, "max_vertex": 899, "min_vertex": 0, "row_count": 3600, "unique_pair_count": 2520, "vertex_count": 900}, {"columns": ["v_vertex", "v_local"], "degree_values": [1, 2, 3, 4, 5, 6, 7, 8, 30, 46, 62, 78, 94], "first_5_pairs": [[16, 16], [19, 19], [25, 25], [55, 55], [30, 90]], "looks_like_g15_edges": false, "looks_like_g60_edges": false, "looks_like_g900_edges": true, "max_vertex": 899, "min_vertex": 0, "row_count": 3600, "unique_pair_count": 888, "vertex_count": 900}, {"columns": ["v_vertex", "v_slot"], "degree_values": [1, 2, 3, 4, 5, 6, 7, 8, 120, 180, 240, 242, 300, 301, 361], "first_5_pairs": [[0, 16], [0, 19], [0, 25], [0, 55], [1, 90]], "looks_like_g15_edges": false, "looks_like_g60_edges": false, "looks_like_g900_edges": true, "max_vertex": 899, "min_vertex": 0, "row_count": 3600, "unique_pair_count": 888, "vertex_count": 900}]

## Boundary

- This is an alignment-input inspection, not an NRC generator.
- This does not close Gap A.
- This does not prove full G900.
- The next alignment step must identify join columns from carrier_signing_table or related kernel payloads.

## Checks

- PASS canonical_g60_payload_loaded: canonical_g60_payload_imported
- PASS g60_csv_matches_payload: exact edge set match
- PASS g15_slot_edges_exists: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/18-g900-kernel-admission/source/kernel_payload/g15_slot_edges.csv
- PASS carrier_signing_table_exists: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/18-g900-kernel-admission/source/kernel_payload/carrier_signing_table.csv
- PASS x_sigma_edges_exists: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/18-g900-kernel-admission/source/kernel_payload/x_sigma_edges.csv
- PASS wxyzti_forms_present: 4
- PASS no_generator_claim_made: alignment input inspection only
