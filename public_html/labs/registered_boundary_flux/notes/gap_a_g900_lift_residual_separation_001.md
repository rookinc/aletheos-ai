# Gap A G900 lift residual separation 001

Status: g900_lift_residuals_upstairs_distinct_not_class_separated

Gap: A - chamber/register map.

## Boundary

- This is not a Gap A closure proof.
- This does not accept a residual flip rule.
- The uniform lift was applied to all 18 rows before this analysis.
- The analysis distinguishes class separation from individual upstairs distinctness.

## Summary

- row_count: 18
- residual_count: 2
- matching_count: 16
- residual_roles: ["TI", "ZT"]
- residual_cycles: ["0", "2"]
- residual_columns: [[9], [13, 15]]
- class_separation_feature_count: 0
- individual_anomaly_feature_count: 8
- candidate_divergence_row_count: 1
- candidate_branch_sensitive_residual_count: 1
- candidate_branch_sensitive_matching_count: 0
- residual_edge_counts: [{"row_index": 3, "role": "ZT", "candidate0_edge_count": 60, "candidate1_edge_count": 60}, {"row_index": 16, "role": "TI", "candidate0_edge_count": 120, "candidate1_edge_count": 120}]

## Residual diagnostics

- row=3 cycle=0 role=ZT edge=[3, 4] columns=[9] candidate_signature_same=True c0={"signature": "87005b957a90aeda", "edge_count": 60, "shift_sequence": [30], "shared_sequence": [3]} c1={"signature": "87005b957a90aeda", "edge_count": 60, "shift_sequence": [30], "shared_sequence": [3]}
- row=16 cycle=2 role=TI edge=[14, 5] columns=[13, 15] candidate_signature_same=False c0={"signature": "f25a155e492740d1", "edge_count": 120, "shift_sequence": [30, 30], "shared_sequence": [0, 5]} c1={"signature": "c9b43fc146c0dd42", "edge_count": 120, "shift_sequence": [30, 0], "shared_sequence": [0, 5]}

## Candidate divergence rows

- row=16 cycle=2 role=TI residual=True columns=[13, 15] c0={"signature": "f25a155e492740d1", "edge_count": 120, "shift_sequence": [30, 30], "shared_sequence": [0, 5]} c1={"signature": "c9b43fc146c0dd42", "edge_count": 120, "shift_sequence": [30, 0], "shared_sequence": [0, 5]}

## Individual anomaly features

- candidate=0 feature=lift_signature residual_value_count=2 residual_values=["87005b957a90aeda05de446f157150739c27a9b50ca784cade8ea6826a227727", "f25a155e492740d1aa6f4ce0f95b44423f91015309ceb84c1c7ce6340aa04024"]
- candidate=0 feature=law_sector_pair_sequence residual_value_count=2 residual_values=["[[2, 8]]", "[[4, 5], [5, 10]]"]
- candidate=0 feature=law_shared_vertex_sequence residual_value_count=2 residual_values=["[0, 5]", "[3]"]
- candidate=0 feature=shared_petersen_vertex_hist residual_value_count=2 residual_values=["{\"0\": 60, \"5\": 60}", "{\"3\": 60}"]
- candidate=1 feature=lift_signature residual_value_count=2 residual_values=["87005b957a90aeda05de446f157150739c27a9b50ca784cade8ea6826a227727", "c9b43fc146c0dd42b59de3ebf4bdcaaf55cdb1a0276f75ed06d6df2ab357cfab"]
- candidate=1 feature=law_sector_pair_sequence residual_value_count=2 residual_values=["[[2, 8]]", "[[4, 5], [5, 10]]"]
- candidate=1 feature=law_shared_vertex_sequence residual_value_count=2 residual_values=["[0, 5]", "[3]"]
- candidate=1 feature=shared_petersen_vertex_hist residual_value_count=2 residual_values=["{\"0\": 60, \"5\": 60}", "{\"3\": 60}"]

## Interpretation

- main_result: The uniform G900 lift succeeds for all rows but does not make the two residual rows one shared lifted class.
- positive_result: The residual rows are individually upstairs-distinct: several lifted feature values are disjoint from the matching-row values.
- negative_result: There is no accepted lifted feature that both residual rows share while matching rows lack.
- orientation_pressure: At least one residual may be sensitive to the candidate branch / directed lift choice; this points toward an oriented P900 edge-lift test rather than a scalar residual rule.
- plain_language: The lift says the two residuals are not one bug. They are two different upstairs events.
- next_question: Should we attempt a directed/oriented P900 edge lift, or freeze Gap A as bounded partial with this failed class-separation result?

## Checks

- PASS lift_loaded: status=uniform_g900_row_lift_available_residuals_not_separated
- PASS schema_loaded: status=gap_a_g900_lift_binding_schema_inspected_ready_for_row_lift_attempt
- PASS residual_rule_loaded: status=no_bounded_residual_rule_found_keep_residuals_open
- PASS row_count_18: row_count=18
- PASS residual_count_2: residual_count=2
- PASS no_class_separation: separating_feature_count=0
- PASS has_individual_anomaly_features: count=8
- PASS candidate_branch_sensitive_rows_recorded: count=1

## Next script

    attempt_gap_a_directed_p900_edge_lift_001.py
