# Channel-aware G60-G15 join for NRC alignment 001

Status: channel_aware_g60_g15_join_constructed

## Carrier rule

- product_vertex_formula: "vertex = slot * 60 + local"
- slot_range: [0, 14]
- local_range: [0, 59]
- vertex_range: [0, 899]
- internal_channel: "same slot, canonical G60 local edge"
- external_channel: "signed G15 slot edge, 60-state local bijection"

## Summary

- join_constructed: true
- product_vertex_count: 900
- internal_edge_count: 1800
- external_map_count: 30
- external_edge_row_count: 1800
- g60_edge_count: 120
- g15_slot_edge_count: 30
- product_formula_bad_count: 0
- internal_ok: true
- external_ok: true
- external_profile_counts: {"sign_0_bijection_True_identity_rows_60": 15, "sign_1_bijection_True_identity_rows_0": 15}
- wxyzti_form_count_available: 4
- gap_a_closed: false
- full_g900_admission_found: false
- next_step: "align_source_native_nrc_wxyzti_forms_to_channel_aware_join"

## Boundary

- This constructs the channel-aware product join.
- This does not yet align the NRC/WXYZTI forms.
- This does not derive a G60-native NRC generator.
- This does not close Gap A.
- This does not prove full G900.

## Checks

- PASS channel_split_confirmed_input: True
- PASS canonical_payload_matches_g60_csv: edge set match
- PASS product_vertex_formula_all_rows: 0
- PASS product_vertex_count_900: 900
- PASS internal_channel_ok: {'0': {'row_count': 120, 'local_edge_count': 120, 'contains_all_g60_edges': True, 'bad_rows_first_5': []}, '1': {'row_count': 120, 'local_edge_count': 120, 'contains_all_g60_edges': True, 'bad_rows_first_5': []}, '2': {'row_count': 120, 'local_edge_count': 120, 'contains_all_g60_edges': True, 'bad_rows_first_5': []}, '3': {'row_count': 120, 'local_edge_count': 120, 'contains_all_g60_edges': True, 'bad_rows_first_5': []}, '4': {'row_count': 120, 'local_edge_count': 120, 'contains_all_g60_edges': True, 'bad_rows_first_5': []}, '5': {'row_count': 120, 'local_edge_count': 120, 'contains_all_g60_edges': True, 'bad_rows_first_5': []}, '6': {'row_count': 120, 'local_edge_count': 120, 'contains_all_g60_edges': True, 'bad_rows_first_5': []}, '7': {'row_count': 120, 'local_edge_count': 120, 'contains_all_g60_edges': True, 'bad_rows_first_5': []}, '8': {'row_count': 120, 'local_edge_count': 120, 'contains_all_g60_edges': True, 'bad_rows_first_5': []}, '9': {'row_count': 120, 'local_edge_count': 120, 'contains_all_g60_edges': True, 'bad_rows_first_5': []}, '10': {'row_count': 120, 'local_edge_count': 120, 'contains_all_g60_edges': True, 'bad_rows_first_5': []}, '11': {'row_count': 120, 'local_edge_count': 120, 'contains_all_g60_edges': True, 'bad_rows_first_5': []}, '12': {'row_count': 120, 'local_edge_count': 120, 'contains_all_g60_edges': True, 'bad_rows_first_5': []}, '13': {'row_count': 120, 'local_edge_count': 120, 'contains_all_g60_edges': True, 'bad_rows_first_5': []}, '14': {'row_count': 120, 'local_edge_count': 120, 'contains_all_g60_edges': True, 'bad_rows_first_5': []}}
- PASS external_channel_ok: {'sign_0_bijection_True_identity_rows_60': 15, 'sign_1_bijection_True_identity_rows_0': 15}
- PASS join_constructed: True
- PASS no_nrc_alignment_claim_made: join object only
