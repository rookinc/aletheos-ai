# Gap A branch-sensitive survivor comparison 001

Status: gap_a_branch_sensitive_survivor_row_equivalent_to_normalized_preimage

## Boundary

- This does not close Gap A.
- This compares row-level expressions only.
- A row-equivalence result does not by itself produce a full source-derived chamber/register map.
- No global exact selector is claimed.
- No physical interpretation is claimed.

## Supports

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

## Identity tests

{
  "branch_sensitive_equals_zero_AND_multi_TI": true,
  "normalized_exact_18": true,
  "normalized_expression_equals_preimage_support": true,
  "singleton_ZT_equals_zero_AND_singleton_ZT": true,
  "survivor_exact_18": true,
  "survivor_support_equals_normalized_expression": true,
  "survivor_support_equals_preimage_support": true
}

## Results

- normalized_result: {"changed_breaks": [], "changed_fixes": [3, 16], "exact": true, "match_count": 18, "mismatches": [], "row_count": 18, "support": [3, 16]}
- survivor_result: {"changed_breaks": [], "changed_fixes": [3, 16], "exact": true, "match_count": 18, "mismatches": [], "row_count": 18, "support": [3, 16]}

## Claim

- does_this_close_gap_a: false
- does_this_promote_global_source_map: false
- does_this_remove_independent_survivor_at_row_level: true
- short_form: "The surviving selector branch_sensitive OR singleton ZT is row-equivalent to the normalized zero-row source preimage on the tested 18-row table."
- not_closed_reason: "The equivalence is row-level. Gap A still needs a global source-derived chamber/register map."

## Interpretation

- main_result: The survivor is not independent on the tested row table: branch_sensitive equals normalized zero AND multi-column TI, while singleton ZT equals normalized zero AND singleton ZT.
- effect: The previous promotion blocker is reduced from an independent rival selector to a row-equivalent expression, but only at the row-table level.
- still_open: The next step is to record this as a bounded equivalence and then attempt a global source-law lift.

## Row comparison

- {"branch_sensitive": false, "column_shape": "singleton", "normalized_preimage_member": false, "normalized_zero_twisted_source": false, "role": "WX", "row_ordinal": 0, "singleton_ZT": false, "survivor_member": false, "zero_AND_multi_TI": false, "zero_AND_singleton_ZT": false}
- {"branch_sensitive": false, "column_shape": "singleton", "normalized_preimage_member": false, "normalized_zero_twisted_source": false, "role": "XY", "row_ordinal": 1, "singleton_ZT": false, "survivor_member": false, "zero_AND_multi_TI": false, "zero_AND_singleton_ZT": false}
- {"branch_sensitive": false, "column_shape": "multi_column", "normalized_preimage_member": false, "normalized_zero_twisted_source": false, "role": "YZ", "row_ordinal": 2, "singleton_ZT": false, "survivor_member": false, "zero_AND_multi_TI": false, "zero_AND_singleton_ZT": false}
- {"branch_sensitive": false, "column_shape": "singleton", "normalized_preimage_member": true, "normalized_zero_twisted_source": true, "role": "ZT", "row_ordinal": 3, "singleton_ZT": true, "survivor_member": true, "zero_AND_multi_TI": false, "zero_AND_singleton_ZT": true}
- {"branch_sensitive": false, "column_shape": "singleton", "normalized_preimage_member": false, "normalized_zero_twisted_source": true, "role": "TI", "row_ordinal": 4, "singleton_ZT": false, "survivor_member": false, "zero_AND_multi_TI": false, "zero_AND_singleton_ZT": false}
- {"branch_sensitive": false, "column_shape": "multi_column", "normalized_preimage_member": false, "normalized_zero_twisted_source": false, "role": "IW", "row_ordinal": 5, "singleton_ZT": false, "survivor_member": false, "zero_AND_multi_TI": false, "zero_AND_singleton_ZT": false}
- {"branch_sensitive": false, "column_shape": "singleton", "normalized_preimage_member": false, "normalized_zero_twisted_source": false, "role": "WX", "row_ordinal": 6, "singleton_ZT": false, "survivor_member": false, "zero_AND_multi_TI": false, "zero_AND_singleton_ZT": false}
- {"branch_sensitive": false, "column_shape": "singleton", "normalized_preimage_member": false, "normalized_zero_twisted_source": false, "role": "XY", "row_ordinal": 7, "singleton_ZT": false, "survivor_member": false, "zero_AND_multi_TI": false, "zero_AND_singleton_ZT": false}
- {"branch_sensitive": false, "column_shape": "multi_column", "normalized_preimage_member": false, "normalized_zero_twisted_source": false, "role": "YZ", "row_ordinal": 8, "singleton_ZT": false, "survivor_member": false, "zero_AND_multi_TI": false, "zero_AND_singleton_ZT": false}
- {"branch_sensitive": false, "column_shape": "multi_column", "normalized_preimage_member": false, "normalized_zero_twisted_source": true, "role": "ZT", "row_ordinal": 9, "singleton_ZT": false, "survivor_member": false, "zero_AND_multi_TI": false, "zero_AND_singleton_ZT": false}
- {"branch_sensitive": false, "column_shape": "multi_column", "normalized_preimage_member": false, "normalized_zero_twisted_source": false, "role": "TI", "row_ordinal": 10, "singleton_ZT": false, "survivor_member": false, "zero_AND_multi_TI": false, "zero_AND_singleton_ZT": false}
- {"branch_sensitive": false, "column_shape": "multi_column", "normalized_preimage_member": false, "normalized_zero_twisted_source": false, "role": "IW", "row_ordinal": 11, "singleton_ZT": false, "survivor_member": false, "zero_AND_multi_TI": false, "zero_AND_singleton_ZT": false}
- {"branch_sensitive": false, "column_shape": "singleton", "normalized_preimage_member": false, "normalized_zero_twisted_source": false, "role": "WX", "row_ordinal": 12, "singleton_ZT": false, "survivor_member": false, "zero_AND_multi_TI": false, "zero_AND_singleton_ZT": false}
- {"branch_sensitive": false, "column_shape": "singleton", "normalized_preimage_member": false, "normalized_zero_twisted_source": false, "role": "XY", "row_ordinal": 13, "singleton_ZT": false, "survivor_member": false, "zero_AND_multi_TI": false, "zero_AND_singleton_ZT": false}
- {"branch_sensitive": false, "column_shape": "multi_column", "normalized_preimage_member": false, "normalized_zero_twisted_source": false, "role": "YZ", "row_ordinal": 14, "singleton_ZT": false, "survivor_member": false, "zero_AND_multi_TI": false, "zero_AND_singleton_ZT": false}
- {"branch_sensitive": false, "column_shape": "multi_column", "normalized_preimage_member": false, "normalized_zero_twisted_source": true, "role": "ZT", "row_ordinal": 15, "singleton_ZT": false, "survivor_member": false, "zero_AND_multi_TI": false, "zero_AND_singleton_ZT": false}
- {"branch_sensitive": true, "column_shape": "multi_column", "normalized_preimage_member": true, "normalized_zero_twisted_source": true, "role": "TI", "row_ordinal": 16, "singleton_ZT": false, "survivor_member": true, "zero_AND_multi_TI": true, "zero_AND_singleton_ZT": false}
- {"branch_sensitive": false, "column_shape": "multi_column", "normalized_preimage_member": false, "normalized_zero_twisted_source": false, "role": "IW", "row_ordinal": 17, "singleton_ZT": false, "survivor_member": false, "zero_AND_multi_TI": false, "zero_AND_singleton_ZT": false}

## Checks

- PASS normalized_preimage_loaded: gap_a_source_preimage_from_normalized_zero_rows_recorded_not_promoted
- PASS preimage_nulls_loaded: gap_a_source_law_preimage_candidate_nulls_mixed_not_promoted
- PASS role_geometry_loaded: gap_a_role_column_source_geometry_candidate_found_not_closure
- PASS zero_rows_loaded: gap_a_uniform_lift_zero_twisted_rows_normalized
- PASS chamber_loaded: gap_a_chamber_register_candidate_interim_note_recorded
- PASS branch_sensitive_support_16: [16]
- PASS singleton_ZT_support_3: [3]
- PASS zero_and_multi_TI_16: [16]
- PASS zero_and_singleton_ZT_3: [3]
- PASS survivor_equals_normalized: {"normalized": [3, 16], "survivor": [3, 16]}
- PASS identity_tests_all_pass: {"branch_sensitive_equals_zero_AND_multi_TI": true, "normalized_exact_18": true, "normalized_expression_equals_preimage_support": true, "singleton_ZT_equals_zero_AND_singleton_ZT": true, "survivor_exact_18": true, "survivor_support_equals_normalized_expression": true, "survivor_support_equals_preimage_support": true}
- PASS not_gap_closure: row-level equivalence only

## Next script

    record_gap_a_branch_sensitive_survivor_equivalence_note_001.py
