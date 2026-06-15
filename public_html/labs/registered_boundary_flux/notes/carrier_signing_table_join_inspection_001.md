# Carrier signing table join inspection 001

Status: carrier_signing_table_join_inspection_recorded

## Summary

- carrier_signing_table_rows: 30
- g15_slot_edges_rows: 30
- g60_local_edges_rows: 120
- x_sigma_edges_rows: 3600
- carrier_signing_headers: ["slot_u", "slot_v", "sign", "carrier_law", "external_edge_count"]
- g15_headers: ["slot_u", "slot_v"]
- x_sigma_headers: ["u_vertex", "v_vertex", "u_slot", "u_local", "v_slot", "v_local", "kind"]
- missing_required_sign_cols: []
- signing_slot_edge_count: 30
- g15_slot_edge_count: 30
- signing_slot_edges_match_g15_edges: true
- slot_edge_count_values_in_signing_table: [1]
- sign_counts: {"0": 15, "1": 15}
- external_edge_count_values: [60]
- expected_g15_edges_times_120: 3600
- x_sigma_rows_match_30_times_120: true
- best_g15_pair_candidate: {"cols": ["slot_u", "slot_v"], "first_5_pairs": [[0, 1], [0, 4], [0, 5], [0, 6], [1, 2]], "matches_signing_slot_edges": true, "max_vertex": 14, "min_vertex": 0, "row_count": 30, "unique_pair_count": 30, "vertex_count": 15}
- sample_signing_rows_by_slot_edge_first_5: [{"count": 1, "sample_rows": [{"carrier_law": "half_flip_x_plus_30_mod_60", "external_edge_count": "60", "sign": "1", "slot_u": "0", "slot_v": "1"}], "sign_counts": {"1": 1}, "slot_edge": [0, 1]}, {"count": 1, "sample_rows": [{"carrier_law": "half_flip_x_plus_30_mod_60", "external_edge_count": "60", "sign": "1", "slot_u": "0", "slot_v": "4"}], "sign_counts": {"1": 1}, "slot_edge": [0, 4]}, {"count": 1, "sample_rows": [{"carrier_law": "half_flip_x_plus_30_mod_60", "external_edge_count": "60", "sign": "1", "slot_u": "0", "slot_v": "5"}], "sign_counts": {"1": 1}, "slot_edge": [0, 5]}, {"count": 1, "sample_rows": [{"carrier_law": "half_flip_x_plus_30_mod_60", "external_edge_count": "60", "sign": "1", "slot_u": "0", "slot_v": "6"}], "sign_counts": {"1": 1}, "slot_edge": [0, 6]}, {"count": 1, "sample_rows": [{"carrier_law": "half_flip_x_plus_30_mod_60", "external_edge_count": "60", "sign": "1", "slot_u": "1", "slot_v": "2"}], "sign_counts": {"1": 1}, "slot_edge": [1, 2]}]
- join_hypothesis_supported: true
- gap_a_closed: false
- full_g900_admission_found: false
- next_step: "inspect_x_sigma_edges_for_slot_edge_and_g60_edge_join"

## X sigma column profiles

- {"column": "u_vertex", "looks_like_g15_slot": false, "looks_like_g60_vertex": false, "looks_like_g900_vertex": true, "max": 893, "min": 0, "numeric_count": 3600, "row_count": 3600, "sample": ["0", "0", "0", "0", "0"], "unique_count": 887}
- {"column": "v_vertex", "looks_like_g15_slot": false, "looks_like_g60_vertex": false, "looks_like_g900_vertex": true, "max": 899, "min": 10, "numeric_count": 3600, "row_count": 3600, "sample": ["16", "19", "25", "55", "90"], "unique_count": 888}
- {"column": "u_slot", "looks_like_g15_slot": true, "looks_like_g60_vertex": true, "looks_like_g900_vertex": true, "max": 14, "min": 0, "numeric_count": 3600, "row_count": 3600, "sample": ["0", "0", "0", "0", "0"], "unique_count": 15}
- {"column": "u_local", "looks_like_g15_slot": false, "looks_like_g60_vertex": true, "looks_like_g900_vertex": true, "max": 59, "min": 0, "numeric_count": 3600, "row_count": 3600, "sample": ["0", "0", "0", "0", "0"], "unique_count": 60}
- {"column": "v_slot", "looks_like_g15_slot": true, "looks_like_g60_vertex": true, "looks_like_g900_vertex": true, "max": 14, "min": 0, "numeric_count": 3600, "row_count": 3600, "sample": ["0", "0", "0", "0", "1"], "unique_count": 15}
- {"column": "v_local", "looks_like_g15_slot": false, "looks_like_g60_vertex": true, "looks_like_g900_vertex": true, "max": 59, "min": 0, "numeric_count": 3600, "row_count": 3600, "sample": ["16", "19", "25", "55", "30"], "unique_count": 60}
- {"column": "kind", "numeric_count": 0, "row_count": 3600, "sample": ["internal_thalion_copy", "internal_thalion_copy", "internal_thalion_copy", "internal_thalion_copy", "external_signed_carrier"]}

## Boundary

- This inspects join structure only.
- This does not derive the G60-native NRC generator.
- This does not close Gap A.
- The next step should inspect x_sigma_edges for columns joining slot edges to G60 local edges.

## Checks

- PASS alignment_inputs_loaded: g60_payload_to_nrc_alignment_inputs_recorded
- PASS canonical_payload_loaded: canonical_g60_payload_imported
- PASS required_sign_cols_present: []
- PASS g15_pair_candidate_found: {'cols': ['slot_u', 'slot_v'], 'row_count': 30, 'unique_pair_count': 30, 'vertex_count': 15, 'min_vertex': 0, 'max_vertex': 14, 'matches_signing_slot_edges': True, 'first_5_pairs': [[0, 1], [0, 4], [0, 5], [0, 6], [1, 2]]}
- PASS signing_slot_edges_30: 30
- PASS signing_matches_g15: slot edge sets equal
- PASS g60_rows_120: 120
- PASS x_sigma_rows_3600: 3600
- PASS no_generator_claim_made: join inspection only
