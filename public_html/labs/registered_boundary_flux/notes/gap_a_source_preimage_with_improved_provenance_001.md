# Gap A source preimage with improved provenance 001

Status: gap_a_source_preimage_with_improved_provenance_recorded_not_promoted

## Boundary

- This does not close Gap A.
- This does not promote the source-law preimage.
- The zero-twisted row set now has direct uniform_lift evidence by exact text/regex hit.
- The evidence is improved but not fully canonical because it is not a strong row-support field.
- The branch_sensitive OR singleton ZT substitute still survives exactly.
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
- zero_twisted_rows: [3, 4, 9, 15, 16]
- zero_twisted_direct_confirmed: true
- zero_twisted_direct_sources: ["uniform_lift"]
- uniform_lift_exact_text_hit: true
- uniform_lift_strong_row_field: false
- uniform_inspection_weak_row_support: true
- provenance_status: "improved_regex_confirmed_not_canonical_field"
- strongest_current_result: "null-hardened 18-row chamber/register map candidate"
- short_form: "Zero-twisted provenance improved via direct uniform_lift exact hit, but source-law preimage is still mixed and not promoted."
- not_promoted_reason: "The zero-twisted row set is now directly seen in uniform_lift, but only as an exact text/regex hit rather than a canonical strong row-support field; also branch_sensitive OR singleton ZT still survives exactly."
- not_closed_reason: "Gap A still requires a full source-derived chamber/register map or elimination/derivation of the surviving branch-sensitive substitute."

## Interim statement

- name: Gap A source preimage with improved provenance
- statement: "The zero-twisted row set [3,4,9,15,16] is now directly visible in the uniform_lift artifact by exact text/regex hit, so the source-law preimage no longer rests only on the later zero-split fallback. However, this is improved provenance, not canonical provenance, because the row set is not yet exposed as a strong row-support field. The source-law preimage also remains mixed because branch_sensitive OR singleton ZT still survives as an exact substitute. Therefore the source-law preimage remains promising but not promoted; the strongest current Gap A result is still the null-hardened 18-row chamber/register map candidate."
- admission_status: improved_provenance_not_promoted_not_gap_closure

## Evidence

### source_preimage

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

### zero_twisted_provenance

{
  "status": "gap_a_zero_twisted_provenance_tightened",
  "summary": {
    "claim_closes_gap_a": false,
    "direct_confirmations": [
      "uniform_lift"
    ],
    "direct_confirmed": true,
    "fallback_exact_hit_present": true,
    "status_reading": "Direct provenance tightened."
  },
  "uniform_inspection_compact": {
    "direct_confirmed": false,
    "strong_row_exact": false,
    "weak_count_exact": true,
    "weak_count_row_support": [
      3,
      4,
      9,
      15,
      16
    ]
  },
  "uniform_lift_compact": {
    "direct_confirmed": true,
    "regex_exact_hits": [
      [
        3,
        4,
        9,
        15,
        16
      ]
    ],
    "strong_row_exact": false,
    "weak_count_exact": false
  }
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

- Can uniform_lift be normalized to expose zero_twisted_rows as a canonical row-support field?
- Can branch_sensitive OR singleton ZT be derived from the zero-twisted role-column preimage instead of surviving independently?
- Can the improved provenance be used to regenerate the source preimage without regex discovery?
- Can the row-level chamber/register candidate be lifted to a global source-law map?

## Checks

- PASS source_preimage_loaded: gap_a_source_law_preimage_candidate_found_not_closure
- PASS source_preimage_nulls_loaded: gap_a_source_law_preimage_candidate_nulls_mixed_not_promoted
- PASS mixed_note_loaded: gap_a_source_law_preimage_mixed_note_recorded
- PASS zero_provenance_loaded: gap_a_zero_twisted_provenance_tightened
- PASS chamber_interim_loaded: gap_a_chamber_register_candidate_interim_note_recorded
- PASS direct_confirmed: {"claim_closes_gap_a": false, "direct_confirmations": ["uniform_lift"], "direct_confirmed": true, "fallback_exact_hit_present": true, "status_reading": "Direct provenance tightened."}
- PASS uniform_lift_exact_hit: [[3, 4, 9, 15, 16]]
- PASS not_strong_field: {"direct_confirmed": true, "regex_candidates": [[3, 4, 9, 15, 16], [0, 1], [0, 1, 3, 4, 9, 15, 16], [0, 4], [3, 4], [0, 1, 3, 4, 9, 10, 11, 15, 16], [0], [4], [1, 2], [7, 10], [2, 3], [9], [2, 13], [13], [4, 5], [4, 10], [1, 7], [0, 5], [2, 7], [0, 11], [7, 8], [9, 11, 14], [3, 13], [4, 14], [10, 11], [5, 10], [2, 8], [1, 11], [8, 14], [6, 14], [13, 15], [5, 14], [5, 6], [0, 1, 5, 6, 7, 8, 11, 12, 13, 14, 17], [10], [2]], "regex_exact_hits": [[3, 4, 9, 15, 16]], "regex_windows": [{"candidate": [3, 4, 9, 15, 16], "window": "_30\", \"status\": true}, {\"detail\": \"len=30\", \"id\": \"column_slot_pairs_30\", \"status\": true}, {\"detail\": \"len=18\", \"id\": \"role_row_count_18\", \"status\": true}, {\"detail\": \"empty_rows=[]\", \"id\": \"all_rows_have_columns\", \"status\": true}, {\"detail\": \"missing=[]\", \"id\": \"all_rows_have_slot_pairs\", \"status\": true}, {\"detail\": \"zero=[3, 4, 9, 15, 16]\", \"id\": \"all_rows_have_twisted_edges\", \"status\": false}, {\"detail\": \"zero=[]\", \"id\": \"all_rows_have_untwisted_edges\", \"status\": true}, {\"detail\": \"script reads prior lift rows, columns, role/cycle labels, and ring source edges; it does not read residual/mismatch
- PASS branch_survivor_recorded: ["null_branch_sensitive_OR_singleton_ZT"]
- PASS not_promoted: promotion false
- PASS gap_a_not_closed: closure false

## Next script

    normalize_gap_a_uniform_lift_zero_twisted_rows_001.py
