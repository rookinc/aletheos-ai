# Gap A branch-sensitive survivor equivalence note 001

Status: gap_a_branch_sensitive_survivor_equivalence_note_recorded

## Boundary

- This is an interim note, not a closure proof.
- Gap A remains open.
- The equivalence is row-level over the tested 18 WXYZTI rows.
- This reduces the independent-survivor blocker but does not produce a global source-derived chamber/register map.
- No global exact selector is claimed.
- No physical interpretation is claimed.

## Claim

- does_this_close_gap_a: false
- does_this_solve_gap_a: false
- does_this_promote_global_source_map: false
- does_this_remove_independent_survivor_at_row_level: true
- equivalence_domain: "tested 18-row WXYZTI chamber/register table"
- normalized_preimage_rule: "normalized uniform-lift zero-twisted rows AND (singleton ZT OR multi-column TI)"
- normalized_preimage_support: [3, 16]
- survivor_rule: "branch_sensitive OR singleton ZT"
- survivor_support: [3, 16]
- branch_sensitive_support: [16]
- singleton_ZT_support: [3]
- zero_AND_multi_TI_support: [16]
- zero_AND_singleton_ZT_support: [3]
- zero_twisted_rows: [3, 4, 9, 15, 16]
- strongest_current_result: "null-hardened 18-row chamber/register map candidate, now with row-equivalent normalized source-preimage support"
- short_form: "The surviving branch-sensitive selector is not independent on the tested row table; it is row-equivalent to the normalized zero-row source preimage."
- not_closed_reason: "The equivalence is row-level. Gap A still requires a global source-derived chamber/register map."

## Interim statement

- name: Gap A branch-sensitive survivor row-equivalence note
- statement: "The previously surviving selector branch_sensitive OR singleton ZT is not independent on the tested 18-row WXYZTI table. Its support [3,16] equals the support of the normalized zero-row source preimage, namely normalized uniform-lift zero-twisted rows AND singleton ZT OR multi-column TI. More specifically, branch_sensitive equals normalized zero AND multi-column TI at row 16, and singleton ZT equals normalized zero AND singleton ZT at row 3. This removes the independent-survivor objection at row level, but it does not close Gap A because no global source-derived chamber/register map has yet been constructed."
- admission_status: row_equivalence_recorded_not_gap_closure

## Evidence

### supports

{
  "branch_sensitive": [
    16
  ],
  "branch_sensitive_source": "role_geometry.source_rows.branch_sensitive",
  "normalized_expression_support": [
    3,
    16
  ],
  "preimage_support": [
    3,
    16
  ],
  "singleton_ZT": [
    3
  ],
  "survivor_support": [
    3,
    16
  ],
  "zero_AND_multi_TI": [
    16
  ],
  "zero_AND_singleton_ZT": [
    3
  ],
  "zero_twisted_rows": [
    3,
    4,
    9,
    15,
    16
  ]
}

### identity_tests

{
  "branch_sensitive_equals_zero_AND_multi_TI": true,
  "normalized_exact_18": true,
  "normalized_expression_equals_preimage_support": true,
  "singleton_ZT_equals_zero_AND_singleton_ZT": true,
  "survivor_exact_18": true,
  "survivor_support_equals_normalized_expression": true,
  "survivor_support_equals_preimage_support": true
}

### normalized_preimage_summary

{
  "changed_breaks": [],
  "changed_fixes": [
    3,
    16
  ],
  "claim_closes_gap_a": false,
  "claim_promotes_source_preimage": false,
  "exact_18_row_candidate": true,
  "match_count": 18,
  "mismatches": [],
  "row_count": 18,
  "surviving_nulls": [
    "null_branch_sensitive_OR_singleton_ZT"
  ]
}

### chamber_interim_claim

{
  "base_projection_match_count": 16,
  "base_projection_mismatches": [
    3,
    16
  ],
  "broken_null_count": 10,
  "candidate_match_count": 18,
  "candidate_mismatches": [],
  "changed_rows": [
    3,
    16
  ],
  "does_this_candidate_match_all_18_rows": true,
  "does_this_candidate_survive_tested_nulls": true,
  "does_this_close_gap_a": false,
  "does_this_give_full_source_derived_chamber_register_map": false,
  "does_this_give_row_level_chamber_register_map_candidate": true,
  "does_this_solve_gap_a": false,
  "not_closed_reason": "The result is still row-table-level. It has not yet been derived as a full source-law chamber/register map from the global carrier construction.",
  "null_count": 10,
  "residual_side": "singleton ZT OR multi-column TI",
  "short_form": "Gap A remains open, but the tested 18-row WXYZTI chamber/register table now has a null-hardened row-level map candidate: W-boundary seam projection plus role-column residual-side adjustment on rows 3 and 16.",
  "stable_complement": "singleton TI OR multi-column ZT",
  "surviving_nulls": []
}

## Next questions

- Can this row-equivalence be lifted into a global source-law chamber/register map?
- Can branch_sensitive be derived from normalized zero-twisted role-column structure rather than carried as a separate label?
- Can the stable complement rows [4,9,15] be derived as lawful stable support in the same global map?
- Can the row-level map be expressed as a source preimage over the full carrier instead of only over the 18 WXYZTI rows?

## Checks

- PASS branch_comparison_loaded: gap_a_branch_sensitive_survivor_row_equivalent_to_normalized_preimage
- PASS normalized_preimage_loaded: gap_a_source_preimage_from_normalized_zero_rows_recorded_not_promoted
- PASS zero_rows_loaded: gap_a_uniform_lift_zero_twisted_rows_normalized
- PASS source_preimage_nulls_loaded: gap_a_source_law_preimage_candidate_nulls_mixed_not_promoted
- PASS chamber_interim_loaded: gap_a_chamber_register_candidate_interim_note_recorded
- PASS identity_all_true: {"branch_sensitive_equals_zero_AND_multi_TI": true, "normalized_exact_18": true, "normalized_expression_equals_preimage_support": true, "singleton_ZT_equals_zero_AND_singleton_ZT": true, "survivor_exact_18": true, "survivor_support_equals_normalized_expression": true, "survivor_support_equals_preimage_support": true}
- PASS survivor_support_3_16: {"branch_sensitive": [16], "branch_sensitive_source": "role_geometry.source_rows.branch_sensitive", "normalized_expression_support": [3, 16], "preimage_support": [3, 16], "singleton_ZT": [3], "survivor_support": [3, 16], "zero_AND_multi_TI": [16], "zero_AND_singleton_ZT": [3], "zero_twisted_rows": [3, 4, 9, 15, 16]}
- PASS normalized_support_3_16: {"branch_sensitive": [16], "branch_sensitive_source": "role_geometry.source_rows.branch_sensitive", "normalized_expression_support": [3, 16], "preimage_support": [3, 16], "singleton_ZT": [3], "survivor_support": [3, 16], "zero_AND_multi_TI": [16], "zero_AND_singleton_ZT": [3], "zero_twisted_rows": [3, 4, 9, 15, 16]}
- PASS branch_sensitive_equals_zero_AND_multi_TI: {"branch_sensitive_equals_zero_AND_multi_TI": true, "normalized_exact_18": true, "normalized_expression_equals_preimage_support": true, "singleton_ZT_equals_zero_AND_singleton_ZT": true, "survivor_exact_18": true, "survivor_support_equals_normalized_expression": true, "survivor_support_equals_preimage_support": true}
- PASS singleton_ZT_equals_zero_AND_singleton_ZT: {"branch_sensitive_equals_zero_AND_multi_TI": true, "normalized_exact_18": true, "normalized_expression_equals_preimage_support": true, "singleton_ZT_equals_zero_AND_singleton_ZT": true, "survivor_exact_18": true, "survivor_support_equals_normalized_expression": true, "survivor_support_equals_preimage_support": true}
- PASS row_level_not_global: {"does_this_close_gap_a": false, "does_this_promote_global_source_map": false, "does_this_remove_independent_survivor_at_row_level": true, "not_closed_reason": "The equivalence is row-level. Gap A still needs a global source-derived chamber/register map.", "short_form": "The surviving selector branch_sensitive OR singleton ZT is row-equivalent to the normalized zero-row source preimage on the tested 18-row table."}
- PASS gap_a_not_closed: closure false

## Next script

    attempt_gap_a_global_source_law_lift_001.py
