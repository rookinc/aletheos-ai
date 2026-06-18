# g900_six_nine_source_geometry_field_origin_inventory_005

Status: `source_geometry_field_origin_candidates_found`

## Question

Do existing G900 Observatory artifacts contain native/source/carrier rows that can explain where the six-nine source geometry fields come from?

Target fields: source pair `06_09`, endpoints `[6,9]`, source root `12`, limit transition `23->24`, limit start `23`, source gap `[9,11]`, outside endpoint `3`, inside endpoint `6/9`, anchor `6/9`, phase step `3/6`, and the clean/broken ladders.

## Result

- audit_pass: `True`
- origin_status: `candidate_native_source_or_carrier_rows_available_for_next_derivation`
- artifact_scan_count: `71`
- inventory_row_count: `5888`
- full_packet_row_count: `441`
- nonleaky_full_packet_row_count: `84`
- strong_source_packet_row_count: `122`
- carrier_incidence_candidate_row_count: `0`
- source_geometry_origin_candidate_found: `True`

## Field counts

- `anchor_6_or_9`: `526`
- `clean_or_broken_ladder`: `623`
- `inside_moving_endpoint_6_or_9`: `365`
- `outside_moving_endpoint_3`: `365`
- `phase_step_3_or_6`: `469`
- `source_endpoints_6_9`: `311`
- `source_limit_start_23`: `2256`
- `source_limit_transition_23_24`: `658`
- `source_pair_06_09`: `481`
- `source_root_slot_12`: `4073`
- `source_side_gap_9_11`: `124`

## Best nonleaky full packet rows

- `g900-six-nine-ladder-3-6-9-12-source-derivation-audit-001.v1.json` pointer `$.branch_rows_for_audit[0]` fields `['anchor_6_or_9', 'clean_or_broken_ladder', 'inside_moving_endpoint_6_or_9', 'outside_moving_endpoint_3', 'phase_step_3_or_6', 'source_endpoints_6_9', 'source_limit_start_23', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`
- `g900-six-nine-ladder-3-6-9-12-source-derivation-audit-001.v1.json` pointer `$.branch_rows_for_audit[0].derived_source_features` fields `['anchor_6_or_9', 'clean_or_broken_ladder', 'inside_moving_endpoint_6_or_9', 'outside_moving_endpoint_3', 'phase_step_3_or_6', 'source_endpoints_6_9', 'source_limit_start_23', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`
- `g900-six-nine-ladder-3-6-9-12-source-derivation-audit-001.v1.json` pointer `$.branch_rows_for_audit[1]` fields `['anchor_6_or_9', 'clean_or_broken_ladder', 'inside_moving_endpoint_6_or_9', 'outside_moving_endpoint_3', 'phase_step_3_or_6', 'source_endpoints_6_9', 'source_limit_start_23', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`
- `g900-six-nine-ladder-3-6-9-12-source-derivation-audit-001.v1.json` pointer `$.branch_rows_for_audit[1].derived_source_features` fields `['anchor_6_or_9', 'clean_or_broken_ladder', 'inside_moving_endpoint_6_or_9', 'outside_moving_endpoint_3', 'phase_step_3_or_6', 'source_endpoints_6_9', 'source_limit_start_23', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`
- `g900_nearest_anchor_rule_all_source_gap_forks_audit_001.v1.json` pointer `$.target_fork` fields `['source_endpoints_6_9', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`
- `g900_nearest_anchor_rule_all_source_gap_forks_audit_001.v1.json` pointer `$.target_fork.anchor_counts` fields `['source_endpoints_6_9', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`
- `g900_nearest_anchor_rule_all_source_gap_forks_audit_001.v1.json` pointer `$.target_fork.anchor_distance_counts` fields `['source_endpoints_6_9', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`
- `g900_nearest_anchor_rule_all_source_gap_forks_audit_001.v1.json` pointer `$.target_fork.phase_counts` fields `['source_endpoints_6_9', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`
- `g900_nearest_anchor_rule_all_source_gap_forks_audit_001.v1.json` pointer `$.target_fork.predicted_frame_counts` fields `['source_endpoints_6_9', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`
- `g900_nearest_anchor_rule_all_source_gap_forks_audit_001.v1.json` pointer `$.two_branch_forks[0]` fields `['source_endpoints_6_9', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`
- `g900_nearest_anchor_rule_all_source_gap_forks_audit_001.v1.json` pointer `$.two_branch_forks[0].anchor_counts` fields `['source_endpoints_6_9', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`
- `g900_nearest_anchor_rule_all_source_gap_forks_audit_001.v1.json` pointer `$.two_branch_forks[0].anchor_distance_counts` fields `['source_endpoints_6_9', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`
- `g900_nearest_anchor_rule_all_source_gap_forks_audit_001.v1.json` pointer `$.two_branch_forks[0].phase_counts` fields `['source_endpoints_6_9', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`
- `g900_nearest_anchor_rule_all_source_gap_forks_audit_001.v1.json` pointer `$.two_branch_forks[0].predicted_frame_counts` fields `['source_endpoints_6_9', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`
- `g900_nearest_anchor_rule_all_source_gap_forks_audit_001.v1.json` pointer `$.applicable_forks[0]` fields `['source_endpoints_6_9', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`
- `g900_nearest_anchor_rule_all_source_gap_forks_audit_001.v1.json` pointer `$.applicable_forks[0].anchor_counts` fields `['source_endpoints_6_9', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`
- `g900_nearest_anchor_rule_all_source_gap_forks_audit_001.v1.json` pointer `$.applicable_forks[0].anchor_distance_counts` fields `['source_endpoints_6_9', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`
- `g900_nearest_anchor_rule_all_source_gap_forks_audit_001.v1.json` pointer `$.applicable_forks[0].phase_counts` fields `['source_endpoints_6_9', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`
- `g900_nearest_anchor_rule_all_source_gap_forks_audit_001.v1.json` pointer `$.applicable_forks[0].predicted_frame_counts` fields `['source_endpoints_6_9', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`
- `g900_nearest_anchor_rule_all_source_gap_forks_audit_001.v1.json` pointer `$.nearest_rule_forks[0]` fields `['source_endpoints_6_9', 'source_limit_transition_23_24', 'source_pair_06_09', 'source_root_slot_12', 'source_side_gap_9_11']`

## Carrier/incidence candidate rows

- none

## Boundary

This is an inventory only. It does not derive the source geometry fields and does not admit closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification claims.

Next ascent target: run a focused carrier/source derivation on the best nonleaky origin candidate rows.
