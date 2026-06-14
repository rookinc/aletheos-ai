# Gap A 15-thalion interim theorem note 001

Status: gap_a_15_thalion_interim_theorem_note_recorded

## Boundary

- This is an interim theorem note, not a closure proof.
- Gap A remains open.
- No exact chamber/register map is claimed.
- No residual flip rule is accepted.
- No physical interpretation is claimed.
- The 15-thalion twisted carrier is treated as a source-derived obstruction neighborhood, not an exact selector.

## Claim

- does_15_thalion_ring_close_gap_a: false
- does_15_thalion_ring_solve_gap_a: false
- does_15_thalion_ring_supply_source_derived_structure: true
- does_15_thalion_ring_supply_exact_selector: false
- interim_result: "The 15-thalion twisted ring supplies a load-bearing source-derived obstruction neighborhood for Gap A, but it does not close Gap A."
- short_form: "Gap A remains open. The 15-thalion twisted carrier explains where to look: both known residuals lie in the zero-twisted-carrier obstruction neighborhood, with ZT branch-stable and TI branch-sensitive."
- not_closed_reason: "The obstruction neighborhood is not exact: zero-twisted-carrier support catches five rows, not only the two residual rows, and no source-derived chamber/register map has closed the final residuals."

## Interim theorem statement

- name: Gap A 15-thalion obstruction-neighborhood theorem note
- statement: "Within the tested artifact chain, the 15-thalion twisted ring does not close Gap A, but it supplies a source-derived obstruction neighborhood. The zero-twisted-carrier feature catches both known residual rows, has recall 1.0 and precision 0.4, is not exact, and is destroyed by untwisted/generic carrier nulls while slot shuffling damages specificity. The lift-refined residual split is preserved: the ZT residual is branch-stable and the TI residual is branch-sensitive."
- admission_status: bounded_interim_support_not_gap_closure

## Evidence

### source_inventory

- status: "gap_a_15_thalion_ring_sources_inventoried"
- record_count: 1531

### test_plan

- status: "gap_a_15_thalion_ring_test_plan_recorded"
- test_count: 8

### schema

- status: "gap_a_15_thalion_ring_schema_recovered_residual_blind"
- vertex_pattern: "Tss_Sll where ss is thalion slot 0..14 and ll is local G60 state 0..59"
- expected_vertex_count: 900
- expected_edge_count: 3600
- twisted_edge_law_names: ["g60_internal", "half_flip_x_plus_30", "identity"]

### uniform_lift

- status: "gap_a_uniform_15_thalion_row_lift_needs_inspection"
- row_count: 18
- rows_with_uniform_ring_lift: 13
- feature_signature_count: 12

### uniform_lift_inspection

- status: "uniform_15_thalion_lift_inspected_twisted_absence_feature_found"
- zero_twisted_carrier_row_count: 5
- zero_role_counts: {"TI": 2, "ZT": 3}
- nonzero_role_counts: {"IW": 3, "TI": 1, "WX": 3, "XY": 3, "YZ": 3}

### residual_split

- status: "gap_a_15_thalion_residual_split_aligned_not_closed"
- known_residual_row_ordinals: [3, 16]
- zero_twisted_rows: [3, 4, 9, 15, 16]
- zero_twisted_residual_recall: 1.0
- zero_twisted_false_positive_count: 3
- zt_residual_branch_stable: true
- ti_residual_branch_sensitive: true
- exact_feature_names: []

### residual_nulls

- status: "gap_a_15_thalion_residual_split_nulls_recorded"
- baseline_support: [3, 4, 9, 15, 16]
- baseline_recall: 1.0
- baseline_precision: 0.4
- untwisted_null_support: []
- untwisted_null_recall: 0.0
- generic_union_null_support: []
- generic_union_null_recall: 0.0
- slot_shuffle_null_support: [0, 1, 2, 3, 4, 6, 7, 9, 10, 12, 13, 14, 16]
- slot_shuffle_null_recall: 1.0
- load_bearing: {"generic_carrier_union_null_destroys_alignment": true, "slot_shuffle_null_destroys_or_changes_alignment": true, "untwisted_carrier_null_destroys_alignment": true}

## Next questions

- Can the five-row zero-twisted-carrier neighborhood be split by a source-derived rule that is not residual-targeted?
- Can the three false positives 4, 9, and 15 be explained by ring position, cycle phase, or selected-turn/return-path geometry?
- Can a source-derived chamber/register map be constructed from twisted carrier law plus slot identity?
- Do additional nulls over slot automorphisms preserve or destroy the same obstruction neighborhood?

## Checks

- PASS gap_note_loaded: gap_a_lift_refined_partial_closure_theorem_note_recorded
- PASS inventory_loaded: gap_a_15_thalion_ring_sources_inventoried
- PASS test_plan_loaded: gap_a_15_thalion_ring_test_plan_recorded
- PASS schema_loaded: gap_a_15_thalion_ring_schema_recovered_residual_blind
- PASS uniform_lift_loaded: gap_a_uniform_15_thalion_row_lift_needs_inspection
- PASS inspection_loaded: uniform_15_thalion_lift_inspected_twisted_absence_feature_found
- PASS split_loaded: gap_a_15_thalion_residual_split_aligned_not_closed
- PASS nulls_loaded: gap_a_15_thalion_residual_split_nulls_recorded
- PASS baseline_recall_1: 1.0
- PASS baseline_not_exact: 0.4
- PASS exact_feature_names_empty: []
- PASS zt_branch_stable: True
- PASS ti_branch_sensitive: True
- PASS untwisted_null_destroys_alignment: {"generic_carrier_union_null_destroys_alignment": true, "slot_shuffle_null_destroys_or_changes_alignment": true, "untwisted_carrier_null_destroys_alignment": true}
- PASS generic_union_null_destroys_alignment: {"generic_carrier_union_null_destroys_alignment": true, "slot_shuffle_null_destroys_or_changes_alignment": true, "untwisted_carrier_null_destroys_alignment": true}
- PASS slot_shuffle_changes_alignment: {"generic_carrier_union_null_destroys_alignment": true, "slot_shuffle_null_destroys_or_changes_alignment": true, "untwisted_carrier_null_destroys_alignment": true}

## Next script

    split_gap_a_zero_twisted_neighborhood_001.py
