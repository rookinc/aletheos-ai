# WXYZTI source-native transport overlay classification 001

Status: wxyzti_source_native_transport_overlay_classified

## Claim

The WXYZTI witness is a source-native transport overlay. reverse_partner edges preserve A and columns. shared_B edges preserve B and slot. The overlay lives over station provenance fields rather than as literal adjacency in the Project16/X_sigma carrier.

## Summary

- edge_count: 24
- label_counts: {"reverse_partner": 12, "shared_B": 12}
- overlay_rule_counts: {"reverse_partner_preserves_A_and_columns": 12, "shared_B_preserves_B_and_slot": 12}
- role_rule_counts: {"reverse_partner -> reverse_partner_preserves_A_and_columns": 12, "shared_B -> shared_B_preserves_B_and_slot": 12}
- reverse_partner_exact: true
- shared_B_exact: true
- labels_exact: true
- bad_edge_count: 0
- project16_edge_law_match: true
- literal_carrier_wiring_success: false
- overlay_classified: true
- classification: {"reverse_partner": "source-native relation preserving A and preserving station/edge columns", "shared_B": "source-native relation preserving B and staying in the same slot", "wxyzti": "six-edge alternating source-native transport overlay, not literal X_sigma adjacency"}
- gap_a_closed: false
- full_g900_admission_found: false
- next_step: "test_overlay_against_admission_blind_nrc_witness"

## Boundary

- This classifies the WXYZTI relation layer.
- This does not claim the WXYZTI edges are literal X_sigma carrier edges.
- This does not derive a G60-native generator.
- This does not close Gap A.
- This does not prove full G900.

## Checks

- PASS deltas_loaded: wxyzti_not_found_edge_deltas_recorded
- PASS edge_count_24: 24
- PASS labels_exact_12_12: {'reverse_partner': 12, 'shared_B': 12}
- PASS reverse_partner_exact: {'reverse_partner_preserves_A_and_columns': 12, 'shared_B_preserves_B_and_slot': 12}
- PASS shared_B_exact: {'reverse_partner_preserves_A_and_columns': 12, 'shared_B_preserves_B_and_slot': 12}
- PASS literal_carrier_wiring_failed: False
- PASS project16_edge_law_match: True
- PASS overlay_classified: True
- PASS no_gap_a_claim_made: classification only
