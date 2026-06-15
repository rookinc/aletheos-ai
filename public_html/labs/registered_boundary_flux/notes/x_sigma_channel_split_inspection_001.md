# X sigma channel split inspection 001

Status: x_sigma_channel_split_inspection_recorded

## Claim

The naive all-rows product join is false because x_sigma has two channels. The internal_thalion_copy channel copies canonical G60 edges inside each of the 15 G15 slots. The external_signed_carrier channel carries 60 local-state rows across each of the 30 signed G15 slot edges.

## Summary

- previous_naive_join_confirmed: false
- x_sigma_rows: 3600
- kind_counts: {"external_signed_carrier": 1800, "internal_thalion_copy": 1800}
- product_vertex_formula: "vertex = slot * 60 + local"
- product_vertex_formula_all_rows: true
- internal_channel: {"bad_rows_first_10": [], "confirmed": true, "each_slot_has_all_g60_edges": true, "expected_row_count": 1800, "meaning": "within each G15 slot, copy the canonical G60 local edge graph", "row_count": 1800, "slot_count": 15, "slot_count_values": [120]}
- external_channel: {"bad_slot_rows_first_10": [], "confirmed": true, "expected_row_count": 1800, "meaning": "across each signed G15 slot edge, carry 60 local-state rows", "row_count": 1800, "sign0_identity_all": true, "sign1_bijection_all": true, "sign1_nonidentity_any": true, "sign_bijection_bad": {}, "sign_bijection_good": {"0": 15, "1": 15}, "sign_identity_row_counts": {"0": 900, "1": 0}, "sign_nonidentity_row_counts": {"0": 0, "1": 900}, "slot_edge_count": 30, "slot_edge_count_values": [60], "slot_edge_sign_counts": {"0": 15, "1": 15}, "slot_edges_match_g15": true, "unique_mapping_fingerprint_count_by_sign": {"0": 1, "1": 1}}
- channel_split_confirmed: true
- gap_a_closed: false
- full_g900_admission_found: false
- next_step: "construct_channel_aware_g60_g15_join_for_nrc_alignment"

## Boundary

- This confirms channel-aware product structure.
- This does not yet derive an NRC generator.
- This does not close Gap A.
- This does not prove full G900.

## Checks

- PASS previous_naive_join_was_false: False
- PASS product_vertex_formula_all_rows: 0
- PASS kind_counts_1800_1800: {'internal_thalion_copy': 1800, 'external_signed_carrier': 1800}
- PASS internal_channel_confirmed: {'meaning': 'within each G15 slot, copy the canonical G60 local edge graph', 'row_count': 1800, 'expected_row_count': 1800, 'slot_count': 15, 'slot_count_values': [120], 'each_slot_has_all_g60_edges': True, 'bad_rows_first_10': [], 'confirmed': True}
- PASS external_channel_confirmed: {'meaning': 'across each signed G15 slot edge, carry 60 local-state rows', 'row_count': 1800, 'expected_row_count': 1800, 'slot_edge_count': 30, 'slot_edge_count_values': [60], 'slot_edges_match_g15': True, 'slot_edge_sign_counts': {'0': 15, '1': 15}, 'sign_identity_row_counts': {'0': 900, '1': 0}, 'sign_nonidentity_row_counts': {'0': 0, '1': 900}, 'sign_bijection_good': {'0': 15, '1': 15}, 'sign_bijection_bad': {}, 'sign0_identity_all': True, 'sign1_bijection_all': True, 'sign1_nonidentity_any': True, 'unique_mapping_fingerprint_count_by_sign': {'0': 1, '1': 1}, 'bad_slot_rows_first_10': [], 'confirmed': True}
- PASS channel_split_confirmed: True
- PASS no_generator_claim_made: channel split inspection only
