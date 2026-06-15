# Overlay against admission-blind NRC witness 002

Status: overlay_consistent_with_admission_blind_nrc_witness

## Summary

- nrc_status: "admission_blind_nrc_witness_exact_not_g900"
- nrc_exact_resolved: true
- nrc_exactness_source: "explicit_boolean"
- nrc_explicit_exact_path: "$.summary.exact_over_120_record_carrier"
- nrc_explicit_exact_value: true
- nrc_accepted: 4
- nrc_accepted_path: "$.summary.accepted_count"
- nrc_false_pos: 0
- nrc_false_pos_path: "$.summary.false_positive_count"
- nrc_miss: 0
- nrc_miss_path: "$.summary.missing_nrc_count"
- nrc_count: 120
- nrc_count_path: "$.summary.record_count"
- wxyzti_forms_key: "wxyzti_admitted_forms"
- wxyzti_form_count: 4
- wxyzti_edge_count: 24
- wxyzti_label_counts: {"reverse_partner": 12, "shared_B": 12}
- source_native_check_counts: {"True": 24}
- overlay_status: "wxyzti_source_native_transport_overlay_classified"
- overlay_classified: true
- overlay_rule_counts: {"reverse_partner_preserves_A_and_columns": 12, "shared_B_preserves_B_and_slot": 12}
- overlay_nrc_consistent: true
- prior_v1_status: "overlay_not_yet_consistent_with_admission_blind_nrc_witness"
- prior_v1_failed_only_on_missing_exact_key: true
- gap_a_closed: false
- full_g900_admission_found: false
- next_step: "record_overlay_nrc_consistency_boundary"

## Boundary

- This is a custody/consistency check.
- Exactness is explicit if an exact boolean exists; otherwise it is resolved from accepted=4, false_pos=0, miss=0.
- This does not derive a G60-native generator.
- This does not close Gap A.
- This does not prove full G900.

## Checks

- PASS nrc_artifact_loaded: /data/data/com.termux/files/home/dev/cori/aletheos.ai/public_html/labs/registered_boundary_flux/artifacts/json/admission_blind_nearest_neighbor_reciprocal_witness_001.v1.json
- PASS nrc_exact_resolved: {'source': 'explicit_boolean', 'explicit_path': '$.summary.exact_over_120_record_carrier', 'explicit_value': True}
- PASS nrc_accepted_count_4: {'path': '$.summary.accepted_count', 'value': 4}
- PASS nrc_false_pos_zero: {'path': '$.summary.false_positive_count', 'value': 0}
- PASS nrc_miss_zero: {'path': '$.summary.missing_nrc_count', 'value': 0}
- PASS wxyzti_form_count_4: 4
- PASS wxyzti_edge_count_24: 24
- PASS wxyzti_label_split_12_12: {'reverse_partner': 12, 'shared_B': 12}
- PASS wxyzti_edges_source_native: {'True': 24}
- PASS overlay_classified: True
- PASS overlay_bad_edge_count_zero: 0
- PASS overlay_rules_12_12: {'reverse_partner_preserves_A_and_columns': 12, 'shared_B_preserves_B_and_slot': 12}
