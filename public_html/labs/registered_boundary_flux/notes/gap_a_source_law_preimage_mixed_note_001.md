# Gap A source-law preimage mixed note 001

Status: gap_a_source_law_preimage_mixed_note_recorded

## Boundary

- This is an interim note, not a closure proof.
- Gap A remains open.
- The source-law preimage candidate is exact as baseline but is not promoted.
- A surviving exact substitute prevents uniqueness.
- Zero-twisted provenance still needs direct uniform-lift confirmation.
- The strongest current result remains the null-hardened 18-row chamber/register map candidate.
- No full source-derived chamber/register map is claimed.
- No physical interpretation is claimed.

## Claim

- does_this_close_gap_a: false
- does_this_solve_gap_a: false
- does_this_promote_source_law_preimage: false
- source_preimage_baseline_exact: true
- source_preimage_support: [3, 16]
- source_preimage_rule: "zero-twisted carrier support AND (singleton ZT OR multi-column TI)"
- source_preimage_surviving_nulls: ["null_branch_sensitive_OR_singleton_ZT"]
- zero_twisted_direct_uniform_provenance_confirmed: false
- zero_twisted_fallback_used: true
- strongest_current_result: "null-hardened 18-row chamber/register map candidate"
- short_form: "The source-law preimage is promising but not promoted. The row-level chamber/register candidate remains the strongest current Gap A result."
- not_promoted_reason: "The branch-sensitive OR singleton ZT substitute still survives exactly, and the zero-twisted source rows are still recovered through the recorded zero-split fallback rather than direct uniform-lift provenance."
- not_closed_reason: "Gap A requires a full source-derived chamber/register map or stronger source-law provenance, not only an exact row-level or mixed preimage candidate."

## Interim statement

- name: Gap A source-law preimage mixed checkpoint
- statement: "The candidate source-law preimage, zero-twisted carrier support AND singleton ZT OR multi-column TI, recovers rows 3 and 16 and gives an exact 18 of 18 row-level map when applied to the W-boundary seam table. However, it is not promoted because the older substitute branch-sensitive OR singleton ZT also remains exact, and the zero-twisted source rows are currently recovered through the recorded zero-split fallback rather than direct uniform-lift provenance. Therefore the strongest current Gap A result is still the null-hardened 18-row chamber/register map candidate, not a closed source-law map."
- admission_status: mixed_source_preimage_not_promoted_not_gap_closure

## Evidence

### source_preimage_candidate

{
  "candidate_rule": {
    "name": "zero_twisted_source_law_preimage_with_role_column_orientation",
    "preimage_support": [
      3,
      16
    ],
    "reading": "zero-twisted carrier support AND (singleton ZT OR multi-column TI)",
    "stable_complement_reading": "zero-twisted carrier support AND (singleton TI OR multi-column ZT)",
    "stable_complement_support": [
      4,
      9,
      15
    ]
  },
  "status": "gap_a_source_law_preimage_candidate_found_not_closure",
  "summary": {
    "changed_breaks": [],
    "changed_fixes": [
      3,
      16
    ],
    "claim_closes_gap_a": false,
    "exact_18_row_candidate": true,
    "match_count": 18,
    "mismatches": [],
    "row_count": 18
  }
}

### source_preimage_nulls

{
  "provenance": {
    "direct_zero_hits": {
      "uniform_inspection": [],
      "uniform_lift": [],
      "zero_split": [
        "$.zero_twisted_neighborhood",
        "$.feature_tests[15].support"
      ]
    },
    "direct_zero_source_confirmed_from_uniform_artifact": false,
    "fallback_zero_source_used": true,
    "zero_twisted_rows": [
      3,
      4,
      9,
      15,
      16
    ],
    "zero_twisted_source": "fallback.zero_twisted_split.zero_twisted_neighborhood"
  },
  "status": "gap_a_source_law_preimage_candidate_nulls_mixed_not_promoted",
  "summary": {
    "baseline_exact": true,
    "baseline_match_count": 18,
    "broken_null_count": 11,
    "broken_nulls": [
      "null_no_change",
      "null_zero_twisted_alone",
      "null_residual_orientation_alone",
      "null_stable_orientation_alone",
      "null_zero_twisted_AND_stable_orientation",
      "null_zero_twisted_AND_role_ZT",
      "null_zero_twisted_AND_role_TI",
      "null_zero_twisted_AND_singleton",
      "null_zero_twisted_AND_multi_column",
      "null_zero_source_shift_plus_one_AND_residual_orientation",
      "null_zero_source_shift_minus_one_AND_residual_orientation"
    ],
    "claim_closes_gap_a": false,
    "load_bearing": {
      "all_nonbranch_nulls_break": true,
      "branch_sensitive_substitute_survives": true,
      "direct_zero_source_confirmed_from_uniform_artifact": false,
      "fallback_zero_source_used": true,
      "residual_orientation_alone_insufficient": true,
      "role_only_inside_zero_insufficient": true,
      "shape_only_inside_zero_insufficient": true,
      "stable_orientation_breaks": true,
      "zero_source_placement_load_bearing": true,
      "zero_twisted_alone_insufficient": true
    },
    "null_count": 12,
    "row_count": 18,
    "surviving_nulls": [
      "null_branch_sensitive_OR_singleton_ZT"
    ]
  }
}

### chamber_register_candidate

{
  "claim": {
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
  },
  "status": "gap_a_chamber_register_candidate_interim_note_recorded"
}

### chamber_nulls

{
  "status": "gap_a_chamber_register_map_candidate_nulls_recorded",
  "summary": {
    "baseline_exact": true,
    "baseline_match_count": 18,
    "broken_null_count": 10,
    "broken_nulls": [
      "null_no_change_w_boundary_only",
      "null_role_only_ZT",
      "null_role_only_TI",
      "null_shape_only_singleton",
      "null_shape_only_multi_column",
      "null_complement_pairing_singleton_TI_OR_multi_column_ZT",
      "null_rotated_roles_keep_shapes",
      "null_rotated_shapes_keep_roles",
      "null_swapped_roles_keep_shapes",
      "null_swapped_shapes_keep_roles"
    ],
    "claim_closes_gap_a": false,
    "load_bearing": {
      "all_nulls_break_exactness": true,
      "complement_pairing_breaks": true,
      "role_only_insufficient": true,
      "role_rotation_breaks": true,
      "role_swap_breaks": true,
      "shape_only_insufficient": true,
      "shape_rotation_breaks": true,
      "shape_swap_breaks": true,
      "w_boundary_only_insufficient": true
    },
    "null_count": 10,
    "row_count": 18,
    "surviving_nulls": []
  }
}

## Next questions

- Can zero-twisted rows be recovered directly from the uniform lift or inspection artifacts without fallback?
- Can branch-sensitive OR singleton ZT be shown to be a derived expression of the zero-twisted role-column preimage, rather than an independent survivor?
- Can the preimage be lifted from row-level support to a full source-law chamber/register map?
- Can the stable complement rows be derived as lawful stable support rather than merely non-residual rows?

## Checks

- PASS source_preimage_loaded: gap_a_source_law_preimage_candidate_found_not_closure
- PASS source_preimage_nulls_loaded: gap_a_source_law_preimage_candidate_nulls_mixed_not_promoted
- PASS chamber_interim_loaded: gap_a_chamber_register_candidate_interim_note_recorded
- PASS chamber_candidate_loaded: gap_a_chamber_register_map_candidate_found_not_closure
- PASS chamber_nulls_loaded: gap_a_chamber_register_map_candidate_nulls_recorded
- PASS role_interim_loaded: gap_a_role_column_interim_note_recorded
- PASS source_preimage_exact: {"changed_breaks": [], "changed_fixes": [3, 16], "claim_closes_gap_a": false, "exact_18_row_candidate": true, "match_count": 18, "mismatches": [], "row_count": 18}
- PASS surviving_null_recorded: ["null_branch_sensitive_OR_singleton_ZT"]
- PASS fallback_recorded: {"direct_zero_hits": {"uniform_inspection": [], "uniform_lift": [], "zero_split": ["$.zero_twisted_neighborhood", "$.feature_tests[15].support"]}, "direct_zero_source_confirmed_from_uniform_artifact": false, "fallback_zero_source_used": true, "zero_twisted_rows": [3, 4, 9, 15, 16], "zero_twisted_source": "fallback.zero_twisted_split.zero_twisted_neighborhood"}
- PASS direct_uniform_not_confirmed: {"direct_zero_hits": {"uniform_inspection": [], "uniform_lift": [], "zero_split": ["$.zero_twisted_neighborhood", "$.feature_tests[15].support"]}, "direct_zero_source_confirmed_from_uniform_artifact": false, "fallback_zero_source_used": true, "zero_twisted_rows": [3, 4, 9, 15, 16], "zero_twisted_source": "fallback.zero_twisted_split.zero_twisted_neighborhood"}
- PASS not_promoted: promotion false
- PASS gap_a_not_closed: closure false

## Next script

    tighten_gap_a_zero_twisted_provenance_001.py
