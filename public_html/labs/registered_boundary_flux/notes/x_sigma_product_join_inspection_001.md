# X sigma product join inspection 001

Status: x_sigma_product_join_inspection_recorded

## Summary

- x_sigma_row_count: 3600
- x_sigma_headers: ["u_vertex", "v_vertex", "u_slot", "u_local", "v_slot", "v_local", "kind"]
- kind_counts: {"external_signed_carrier": 1800, "internal_thalion_copy": 1800}
- product_vertex_formula: "vertex = slot * 60 + local"
- product_vertex_ok_count: 3600
- product_vertex_ok_all_rows: true
- g15_slot_edge_columns: ["slot_u", "slot_v"]
- g15_slot_edge_count: 30
- g60_local_edge_count: 120
- slot_pair_is_g15_edge_count: 1800
- slot_pair_all_rows_are_g15_edges: false
- local_pair_is_g60_edge_count: 1800
- local_pair_all_rows_are_g60_edges: false
- unique_slot_pair_count_in_x_sigma: 45
- slot_edge_row_count_values: [60, 120]
- slot_edges_all_have_120_local_pairs: false
- unique_local_pair_count_in_x_sigma: 210
- local_edge_row_count_values: [15, 30]
- each_g60_edge_appears_for_all_30_slot_edges: false
- fiber_same_count: 900
- slot_same_count: 1800
- row_class_counts: {"across_slot_same_fiber": 900, "other": 900, "within_slot_g60_edge": 1800}
- sign_kind_counts: {"0": {"external_signed_carrier": 900}, "1": {"external_signed_carrier": 900}, "missing": {"internal_thalion_copy": 1800}}
- join_confirmed: false
- gap_a_closed: false
- full_g900_admission_found: false
- next_step: "construct_g60_g15_product_join_for_nrc_alignment"

## Boundary

- This confirms or refutes product join structure only.
- This does not yet construct an NRC generator.
- This does not close Gap A.
- This does not prove full G900.

## Checks

- PASS carrier_join_loaded: carrier_signing_table_join_inspection_recorded
- PASS canonical_payload_loaded: canonical_g60_payload_imported
- PASS x_sigma_rows_3600: 3600
- PASS product_vertex_formula_all_rows: 3600
- FAIL slot_pairs_are_g15_edges_all_rows: 1800
- FAIL local_pairs_are_g60_edges_all_rows: 1800
- FAIL slot_edges_all_have_120_local_pairs: [60, 120]
- FAIL g60_edges_all_have_30_slot_edges: [15, 30]
- FAIL join_confirmed: False
- PASS no_generator_claim_made: product join inspection only
