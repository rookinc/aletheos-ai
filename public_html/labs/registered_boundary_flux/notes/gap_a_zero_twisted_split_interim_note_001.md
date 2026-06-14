# Gap A zero-twisted split interim note 001

Status: gap_a_zero_twisted_split_interim_note_recorded

## Boundary

- This is an interim theorem note, not a closure proof.
- Gap A remains open.
- The exact split is restricted to the tested zero-twisted-carrier neighborhood.
- No global exact selector is claimed.
- No full source-derived chamber/register map is claimed.
- No physical interpretation is claimed.

## Claim

- does_this_close_gap_a: false
- does_this_solve_gap_a: false
- does_this_give_global_exact_selector: false
- does_this_give_exact_split_inside_zero_twisted_neighborhood: true
- does_this_survive_tested_nulls: true
- short_form: "Gap A remains open, but inside the load-bearing zero-twisted-carrier neighborhood, the tested split candidate is exact and every tested null breaks exactness."
- candidate_rule: "branch-sensitive return OR singleton ZT selected-turn"
- candidate_support: [3, 16]
- not_closed_reason: "The exact split is restricted to the tested zero-twisted-carrier neighborhood. No full source-derived chamber/register map is claimed."

## Interim theorem statement

- name: Gap A zero-twisted split interim theorem note
- statement: "Within the load-bearing zero-twisted-carrier obstruction neighborhood, the tested candidate rule branch-sensitive return OR singleton ZT selected-turn selects exactly the two known residual rows, 3 and 16. All six tested nulls break exactness. This gives bounded interim support for the 15-thalion twisted-carrier explanation, but it does not close Gap A because the result is local to the tested obstruction neighborhood and no full source-derived chamber/register map is yet known."
- admission_status: bounded_interim_support_not_gap_closure

## Evidence

### neighborhood

- zero_twisted_neighborhood: [3, 4, 9, 15, 16]
- known_residual_rows: [3, 16]
- false_positive_rows_before_split: [4, 9, 15]

### preferred_candidate

- name: "branch_sensitive_return_candidate OR singleton_ZT_selected_turn_candidate"
- support: [3, 16]
- exact: true
- precision: 1.0
- recall: 1.0
- reading: "branch-sensitive return OR singleton ZT selected-turn"

### null_summary

- baseline_exact: true
- baseline_support: [3, 16]
- broken_null_count: 6
- null_count: 6
- load_bearing: {"branch_placement_load_bearing": true, "branch_sensitivity_load_bearing": true, "column_count_alone_insufficient": true, "role_placement_load_bearing": true, "role_specificity_load_bearing": true, "singleton_ZT_selected_turn_load_bearing": true}

### null_tests

[
  {
    "exact": true,
    "false_positives": [],
    "misses": [],
    "name": "baseline_branch_sensitive_return_OR_singleton_ZT_selected_turn",
    "precision": 1.0,
    "recall": 1.0,
    "support": [
      3,
      16
    ]
  },
  {
    "exact": false,
    "false_positives": [
      4
    ],
    "misses": [],
    "name": "null_branch_blind_TI_OR_singleton_ZT",
    "precision": 0.6666666666666666,
    "recall": 1.0,
    "support": [
      3,
      4,
      16
    ]
  },
  {
    "exact": false,
    "false_positives": [
      9,
      15
    ],
    "misses": [],
    "name": "null_selected_turn_blind_branch_sensitive_OR_all_ZT",
    "precision": 0.5,
    "recall": 1.0,
    "support": [
      3,
      9,
      15,
      16
    ]
  },
  {
    "exact": false,
    "false_positives": [
      4
    ],
    "misses": [],
    "name": "null_role_blind_branch_sensitive_OR_all_singletons",
    "precision": 0.6666666666666666,
    "recall": 1.0,
    "support": [
      3,
      4,
      16
    ]
  },
  {
    "exact": false,
    "false_positives": [
      4,
      15
    ],
    "misses": [],
    "name": "null_column_count_only_1_or_2",
    "precision": 0.5,
    "recall": 1.0,
    "support": [
      3,
      4,
      15,
      16
    ]
  },
  {
    "exact": false,
    "false_positives": [],
    "misses": [
      16
    ],
    "name": "null_branch_shuffle_OR_singleton_ZT",
    "precision": 1.0,
    "recall": 0.5,
    "support": [
      3
    ]
  },
  {
    "exact": false,
    "false_positives": [
      4
    ],
    "misses": [
      3
    ],
    "name": "null_role_shuffle_branch_sensitive_OR_rotated_singleton_ZT",
    "precision": 0.5,
    "recall": 0.5,
    "support": [
      4,
      16
    ]
  }
]

### residual_alignment

- status: "gap_a_15_thalion_residual_split_aligned_not_closed"
- known_residual_row_ordinals: [3, 16]
- zt_residual_branch_stable: true
- ti_residual_branch_sensitive: true
- exact_feature_names: []

### previous_obstruction_note

- status: "gap_a_15_thalion_interim_theorem_note_recorded"
- claim: {"does_15_thalion_ring_close_gap_a": false, "does_15_thalion_ring_solve_gap_a": false, "does_15_thalion_ring_supply_exact_selector": false, "does_15_thalion_ring_supply_source_derived_structure": true, "interim_result": "The 15-thalion twisted ring supplies a load-bearing source-derived obstruction neighborhood for Gap A, but it does not close Gap A.", "not_closed_reason": "The obstruction neighborhood is not exact: zero-twisted-carrier support catches five rows, not only the two residual rows, and no source-derived chamber/register map has closed the final residuals.", "short_form": "Gap A remains open. The 15-thalion twisted carrier explains where to look: both known residuals lie in the zero-twisted-carrier obstruction neighborhood, with ZT branch-stable and TI branch-sensitive."}

### residual_nulls

- status: "gap_a_15_thalion_residual_split_nulls_recorded"
- baseline_support: [3, 4, 9, 15, 16]
- baseline_recall: 1.0
- baseline_precision: 0.4

## Next questions

- Can the candidate rule be derived directly from the twisted carrier source, rather than described after neighborhood formation?
- Can the same split be reproduced under allowed slot automorphisms rather than one derangement null?
- Can a chamber/register map be constructed that makes the zero-twisted neighborhood and split appear as consequences?
- Can the rule be lifted from row-level support to path-level or edge-law-level transport?

## Checks

- PASS fifteen_thalion_interim_loaded: gap_a_15_thalion_interim_theorem_note_recorded
- PASS zero_twisted_split_loaded: gap_a_zero_twisted_neighborhood_split_candidate_found_not_closure
- PASS zero_twisted_split_nulls_loaded: gap_a_zero_twisted_split_candidate_nulls_recorded
- PASS residual_split_loaded: gap_a_15_thalion_residual_split_aligned_not_closed
- PASS residual_nulls_loaded: gap_a_15_thalion_residual_split_nulls_recorded
- PASS preferred_candidate_exact: {"exact": true, "name": "branch_sensitive_return_candidate OR singleton_ZT_selected_turn_candidate", "precision": 1.0, "reading": "branch-sensitive return OR singleton ZT selected-turn", "recall": 1.0, "support": [3, 16]}
- PASS preferred_candidate_support_3_16: [3, 16]
- PASS all_tested_nulls_broken: {"baseline_exact": true, "baseline_support": [3, 16], "broken_null_count": 6, "load_bearing": {"branch_placement_load_bearing": true, "branch_sensitivity_load_bearing": true, "column_count_alone_insufficient": true, "role_placement_load_bearing": true, "role_specificity_load_bearing": true, "singleton_ZT_selected_turn_load_bearing": true}, "null_count": 6}
- PASS branch_sensitivity_load_bearing: {"branch_placement_load_bearing": true, "branch_sensitivity_load_bearing": true, "column_count_alone_insufficient": true, "role_placement_load_bearing": true, "role_specificity_load_bearing": true, "singleton_ZT_selected_turn_load_bearing": true}
- PASS singleton_zt_load_bearing: {"branch_placement_load_bearing": true, "branch_sensitivity_load_bearing": true, "column_count_alone_insufficient": true, "role_placement_load_bearing": true, "role_specificity_load_bearing": true, "singleton_ZT_selected_turn_load_bearing": true}
- PASS column_count_alone_insufficient: {"branch_placement_load_bearing": true, "branch_sensitivity_load_bearing": true, "column_count_alone_insufficient": true, "role_placement_load_bearing": true, "role_specificity_load_bearing": true, "singleton_ZT_selected_turn_load_bearing": true}
- PASS gap_a_not_closed: closure claim false

## Next script

    derive_gap_a_source_rule_from_zero_twisted_split_001.py
