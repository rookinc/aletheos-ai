# Gap A neighbor-port rule nulls 001

Status: gap_a_neighbor_port_rule_nulls_mixed_not_promoted

## Boundary

- This does not close Gap A.
- The neighbor-port rule remains local to the tested zero-twisted-carrier neighborhood.
- This null pass is mixed, not a clean promotion.
- Some structural nulls break exactness, but weaker role/column substitutes remain exact.
- No full chamber/register map is claimed.
- No physical interpretation is claimed.

## Baseline

- rule: "balanced singleton ZT port OR multi-column TI return with a dead neighbor port"
- support: [3, 16]

## Summary

- baseline_exact: true
- baseline_support: [3, 16]
- broken_null_count: 5
- null_count: 8
- load_bearing: {"balanced_singleton_placement_load_bearing": true, "dead_port_placement_load_bearing": false, "dead_port_role_specificity_load_bearing": true, "radius1_locality_load_bearing": true, "role_placement_load_bearing": true, "role_specificity_load_bearing": true}
- review_result: "mixed_not_promoted"
- exact_surviving_nulls: ["null_balance_blind_singleton_ZT_OR_TI_dead_port", "null_column_role_only_singleton_ZT_OR_multi_TI", "null_shift_dead_port_placement"]
- broken_nulls: ["null_role_blind_balanced_singleton_OR_any_dead_port", "null_dead_role_blind_balanced_ZT_OR_any_dead_port", "null_radius2_neighbor_port_rule", "null_shift_balanced_singleton_placement", "null_role_rotation_neighbor_port_rule"]

## Null tests

- {"exact": true, "false_positives": [], "misses": [], "name": "baseline_neighbor_port_rule", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}
- {"exact": false, "false_positives": [15], "misses": [], "name": "null_role_blind_balanced_singleton_OR_any_dead_port", "precision": 0.6666666666666666, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 15, 16], "support_count": 3}
- {"exact": false, "false_positives": [15], "misses": [], "name": "null_dead_role_blind_balanced_ZT_OR_any_dead_port", "precision": 0.6666666666666666, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 15, 16], "support_count": 3}
- {"exact": true, "false_positives": [], "misses": [], "name": "null_balance_blind_singleton_ZT_OR_TI_dead_port", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}
- {"exact": true, "false_positives": [], "misses": [], "name": "null_column_role_only_singleton_ZT_OR_multi_TI", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}
- {"exact": false, "false_positives": [], "misses": [16], "name": "null_radius2_neighbor_port_rule", "precision": 1.0, "recall": 0.5, "residual_hits": [3], "support": [3], "support_count": 1}
- {"exact": true, "false_positives": [], "misses": [], "name": "null_shift_dead_port_placement", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}
- {"exact": false, "false_positives": [4], "misses": [3], "name": "null_shift_balanced_singleton_placement", "precision": 0.5, "recall": 0.5, "residual_hits": [16], "support": [4, 16], "support_count": 2}
- {"exact": false, "false_positives": [15], "misses": [3, 16], "name": "null_role_rotation_neighbor_port_rule", "precision": 0.0, "recall": 0.0, "residual_hits": [], "support": [15], "support_count": 1}

## Load-bearing

- role_specificity_load_bearing: true
- dead_port_role_specificity_load_bearing: true
- radius1_locality_load_bearing: true
- dead_port_placement_load_bearing: false
- balanced_singleton_placement_load_bearing: true
- role_placement_load_bearing: true

## Interpretation

- main_result: The neighbor-port rule is exact as a baseline, but this null pass does not justify promoting it as independently load-bearing.
- surviving_substitutes: Two weaker substitutes remain exact: balance-blind singleton ZT OR TI dead port, and column/role-only singleton ZT OR multi-column TI.
- dead_port_placement: The dead-port placement shift also remains exact, so dead-port placement is not load-bearing in this test.
- what_breaks: Role-blind, dead-port-role-blind, radius-2, balanced-singleton placement, and role-rotation variants break exactness.
- meaning: The exact support may be coming from a simpler role/column pattern inside the zero-twisted neighborhood rather than from the full neighbor-port rule.
- not_closure: This remains useful evidence about surrounding-cell context, but it is not a clean source-rule derivation and does not close Gap A.

## Checks

- PASS rule_loaded: gap_a_neighbor_port_rule_candidate_found_not_closure
- PASS context_loaded: gap_a_surrounding_cell_context_probe_recorded
- PASS split_loaded: gap_a_zero_twisted_neighborhood_split_candidate_found_not_closure
- PASS split_nulls_loaded: gap_a_zero_twisted_split_candidate_nulls_recorded
- PASS baseline_exact: {"exact": true, "false_positives": [], "misses": [], "name": "baseline_neighbor_port_rule", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}
- PASS role_blind_breaks_exact: {"exact": false, "false_positives": [15], "misses": [], "name": "null_role_blind_balanced_singleton_OR_any_dead_port", "precision": 0.6666666666666666, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 15, 16], "support_count": 3}
- PASS dead_role_blind_breaks_exact: {"exact": false, "false_positives": [15], "misses": [], "name": "null_dead_role_blind_balanced_ZT_OR_any_dead_port", "precision": 0.6666666666666666, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 15, 16], "support_count": 3}
- PASS radius2_breaks_exact: {"exact": false, "false_positives": [], "misses": [16], "name": "null_radius2_neighbor_port_rule", "precision": 1.0, "recall": 0.5, "residual_hits": [3], "support": [3], "support_count": 1}
- FAIL dead_shift_breaks_exact: expected mixed result: dead-port placement shift did not break exactness
- PASS balanced_shift_breaks_exact: {"exact": false, "false_positives": [4], "misses": [3], "name": "null_shift_balanced_singleton_placement", "precision": 0.5, "recall": 0.5, "residual_hits": [16], "support": [4, 16], "support_count": 2}
- PASS role_rotation_breaks_exact: {"exact": false, "false_positives": [15], "misses": [3, 16], "name": "null_role_rotation_neighbor_port_rule", "precision": 0.0, "recall": 0.0, "residual_hits": [], "support": [15], "support_count": 1}

## Next script

    record_gap_a_neighbor_port_mixed_note_001.py
