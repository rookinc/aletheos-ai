# WXYZTI endpoint wiring channel test 001

Status: wxyzti_endpoint_wiring_channel_bridge_not_resolved

## Summary

- forms_key: "wxyzti_admitted_forms"
- form_count: 4
- project16_edge_law_match: true
- previous_endpoint_wiring_status: "wxyzti_endpoint_wiring_inspection_recorded"
- tested_modes: ["key", "role", "edge_role", "index"]
- best_mode: "edge_role"
- best_resolved_edge_count: 0
- best_total_edges: 24
- best_edge_channel_counts: {"not_found_in_channel_join": 24}
- best_label_channel_counts: {"reverse_partner -> not_found_in_channel_join": 12, "shared_B -> not_found_in_channel_join": 12}
- best_expected_role_fit: false
- bridge_success: false
- gap_a_closed: false
- full_g900_admission_found: false
- next_step: "inspect_wxyzti_not_found_edge_deltas_and_source_roles"

## Modes

- key: resolved=0/24, expected_role_fit=False, channels={"not_found_in_channel_join": 24}
- role: resolved=0/24, expected_role_fit=False, channels={"not_found_in_channel_join": 24}
- edge_role: resolved=0/24, expected_role_fit=False, channels={"not_found_in_channel_join": 24}
- index: resolved=0/24, expected_role_fit=False, channels={"not_found_in_channel_join": 24}

## Checks

- PASS project16_edge_law_match_loaded: True
- PASS endpoint_wiring_loaded: wxyzti_endpoint_wiring_inspection_recorded
- PASS forms_present: 4
- PASS wiring_modes_tested: ['key', 'role', 'edge_role', 'index']
- PASS test_recorded: bridge_success=False
