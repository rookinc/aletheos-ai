# Overlay against admission-blind NRC witness 001

Status: overlay_not_yet_consistent_with_admission_blind_nrc_witness

## Summary

- nrc_status: "admission_blind_nrc_witness_exact_not_g900"
- nrc_exact: null
- nrc_accepted: 4
- nrc_false_pos: 0
- nrc_miss: 0
- nrc_count: 120
- wxyzti_forms_key: "wxyzti_admitted_forms"
- wxyzti_form_count: 4
- wxyzti_edge_count: 24
- wxyzti_label_counts: {"reverse_partner": 12, "shared_B": 12}
- source_native_check_counts: {"True": 24}
- overlay_status: "wxyzti_source_native_transport_overlay_classified"
- overlay_classified: true
- overlay_rule_counts: {"reverse_partner_preserves_A_and_columns": 12, "shared_B_preserves_B_and_slot": 12}
- overlay_nrc_consistent: false
- gap_a_closed: false
- full_g900_admission_found: false
- next_step: "record_overlay_nrc_consistency_boundary"

## Boundary

- This is a custody/consistency check.
- It confirms relation-layer consistency with the admission-blind NRC witness if checks pass.
- It does not derive a G60-native generator.
- It does not close Gap A.
- It does not prove full G900.

## Checks

- PASS nrc_artifact_loaded: admission_blind_nrc_witness_exact_not_g900
- FAIL nrc_exact: None
- PASS nrc_accepted_count_4: 4
- PASS nrc_false_pos_zero: 0
- PASS nrc_miss_zero: 0
- PASS wxyzti_form_count_4: 4
- PASS wxyzti_edge_count_24: 24
- PASS wxyzti_label_split_12_12: {'reverse_partner': 12, 'shared_B': 12}
- PASS wxyzti_edges_source_native: {'True': 24}
- PASS overlay_classified: True
- PASS overlay_bad_edge_count_zero: 0
- PASS delta_labels_match_overlay: {'deltas': {'reverse_partner': 12, 'shared_B': 12}, 'overlay': {'reverse_partner': 12, 'shared_B': 12}}
