# Gap A source-law preimage candidate nulls 001

Status: gap_a_source_law_preimage_candidate_nulls_mixed_not_promoted

## Boundary

- This does not close Gap A.
- The tested object is a source-law preimage candidate, not a full source-derived chamber/register map.
- The zero-twisted source currently uses the recorded zero-split fallback unless direct lift provenance is found.
- Surviving exact substitutes, if any, prevent promotion.
- No global exact selector is claimed.
- No physical interpretation is claimed.

## Provenance

- zero_twisted_rows: [3, 4, 9, 15, 16]
- zero_twisted_source: "fallback.zero_twisted_split.zero_twisted_neighborhood"
- direct_zero_hits: {"uniform_inspection": [], "uniform_lift": [], "zero_split": ["$.zero_twisted_neighborhood", "$.feature_tests[15].support"]}
- direct_zero_source_confirmed_from_uniform_artifact: false
- fallback_zero_source_used: true

## Baseline

- rule: "zero-twisted AND (singleton ZT OR multi-column TI)"
- support: [3, 16]

## Summary

- baseline_exact: true
- baseline_match_count: 18
- row_count: 18
- null_count: 12
- broken_null_count: 11
- broken_nulls: ["null_no_change", "null_zero_twisted_alone", "null_residual_orientation_alone", "null_stable_orientation_alone", "null_zero_twisted_AND_stable_orientation", "null_zero_twisted_AND_role_ZT", "null_zero_twisted_AND_role_TI", "null_zero_twisted_AND_singleton", "null_zero_twisted_AND_multi_column", "null_zero_source_shift_plus_one_AND_residual_orientation", "null_zero_source_shift_minus_one_AND_residual_orientation"]
- surviving_nulls: ["null_branch_sensitive_OR_singleton_ZT"]
- load_bearing: {"all_nonbranch_nulls_break": true, "branch_sensitive_substitute_survives": true, "direct_zero_source_confirmed_from_uniform_artifact": false, "fallback_zero_source_used": true, "residual_orientation_alone_insufficient": true, "role_only_inside_zero_insufficient": true, "shape_only_inside_zero_insufficient": true, "stable_orientation_breaks": true, "zero_source_placement_load_bearing": true, "zero_twisted_alone_insufficient": true}
- claim_closes_gap_a: false

## Null tests

- {"changed_breaks": [], "changed_fixes": [3, 16], "changed_rows": [3, 16], "exact": true, "match_count": 18, "mismatches": [], "name": "baseline_zero_twisted_AND_residual_orientation", "row_count": 18}
- {"changed_breaks": [], "changed_fixes": [], "changed_rows": [], "exact": false, "match_count": 16, "mismatches": [3, 16], "name": "null_no_change", "row_count": 18}
- {"changed_breaks": [4, 9, 15], "changed_fixes": [3, 16], "changed_rows": [3, 4, 9, 15, 16], "exact": false, "match_count": 15, "mismatches": [4, 9, 15], "name": "null_zero_twisted_alone", "row_count": 18}
- {"changed_breaks": [10], "changed_fixes": [3, 16], "changed_rows": [3, 10, 16], "exact": false, "match_count": 17, "mismatches": [10], "name": "null_residual_orientation_alone", "row_count": 18}
- {"changed_breaks": [4, 9, 15], "changed_fixes": [], "changed_rows": [4, 9, 15], "exact": false, "match_count": 13, "mismatches": [3, 4, 9, 15, 16], "name": "null_stable_orientation_alone", "row_count": 18}
- {"changed_breaks": [4, 9, 15], "changed_fixes": [], "changed_rows": [4, 9, 15], "exact": false, "match_count": 13, "mismatches": [3, 4, 9, 15, 16], "name": "null_zero_twisted_AND_stable_orientation", "row_count": 18}
- {"changed_breaks": [9, 15], "changed_fixes": [3], "changed_rows": [3, 9, 15], "exact": false, "match_count": 15, "mismatches": [9, 15, 16], "name": "null_zero_twisted_AND_role_ZT", "row_count": 18}
- {"changed_breaks": [4], "changed_fixes": [16], "changed_rows": [4, 16], "exact": false, "match_count": 16, "mismatches": [3, 4], "name": "null_zero_twisted_AND_role_TI", "row_count": 18}
- {"changed_breaks": [4], "changed_fixes": [3], "changed_rows": [3, 4], "exact": false, "match_count": 16, "mismatches": [4, 16], "name": "null_zero_twisted_AND_singleton", "row_count": 18}
- {"changed_breaks": [9, 15], "changed_fixes": [16], "changed_rows": [9, 15, 16], "exact": false, "match_count": 15, "mismatches": [3, 9, 15], "name": "null_zero_twisted_AND_multi_column", "row_count": 18}
- {"changed_breaks": [10], "changed_fixes": [16], "changed_rows": [10, 16], "exact": false, "match_count": 16, "mismatches": [3, 10], "name": "null_zero_source_shift_plus_one_AND_residual_orientation", "row_count": 18}
- {"changed_breaks": [], "changed_fixes": [3], "changed_rows": [3], "exact": false, "match_count": 17, "mismatches": [16], "name": "null_zero_source_shift_minus_one_AND_residual_orientation", "row_count": 18}
- {"changed_breaks": [], "changed_fixes": [3, 16], "changed_rows": [3, 16], "exact": true, "match_count": 18, "mismatches": [], "name": "null_branch_sensitive_OR_singleton_ZT", "row_count": 18}

## Interpretation

- main_result: The source-law preimage candidate remains exact as baseline.
- weaker_nulls: Zero-twisted alone, residual orientation alone, stable orientation, role-only, shape-only, and shifted zero-source nulls are tested.
- survivor_warning: If branch-sensitive OR singleton ZT survives, the source-law preimage is not uniquely promoted yet.
- provenance_warning: If zero-twisted rows are still only recovered from fallback zero-split, provenance must be tightened before closure.
- not_closure: This remains below Gap A closure until source-law provenance and global chamber/register lift are established.

## Checks

- PASS preimage_loaded: gap_a_source_law_preimage_candidate_found_not_closure
- PASS chamber_candidate_loaded: gap_a_chamber_register_map_candidate_found_not_closure
- PASS chamber_nulls_loaded: gap_a_chamber_register_map_candidate_nulls_recorded
- PASS role_geometry_loaded: gap_a_role_column_source_geometry_candidate_found_not_closure
- PASS role_nulls_loaded: gap_a_role_column_source_geometry_nulls_recorded
- PASS baseline_exact: {"changed_breaks": [], "changed_fixes": [3, 16], "changed_rows": [3, 16], "exact": true, "match_count": 18, "mismatches": [], "name": "baseline_zero_twisted_AND_residual_orientation", "row_count": 18}
- PASS preimage_support_3_16: [3, 16]
- PASS stable_support_4_9_15: [4, 9, 15]
- PASS zero_alone_breaks: {"changed_breaks": [4, 9, 15], "changed_fixes": [3, 16], "changed_rows": [3, 4, 9, 15, 16], "exact": false, "match_count": 15, "mismatches": [4, 9, 15], "name": "null_zero_twisted_alone", "row_count": 18}
- PASS orientation_alone_breaks: {"changed_breaks": [10], "changed_fixes": [3, 16], "changed_rows": [3, 10, 16], "exact": false, "match_count": 17, "mismatches": [10], "name": "null_residual_orientation_alone", "row_count": 18}
- PASS stable_orientation_breaks: [{"changed_breaks": [4, 9, 15], "changed_fixes": [], "changed_rows": [4, 9, 15], "exact": false, "match_count": 13, "mismatches": [3, 4, 9, 15, 16], "name": "null_stable_orientation_alone", "row_count": 18}, {"changed_breaks": [4, 9, 15], "changed_fixes": [], "changed_rows": [4, 9, 15], "exact": false, "match_count": 13, "mismatches": [3, 4, 9, 15, 16], "name": "null_zero_twisted_AND_stable_orientation", "row_count": 18}]
- PASS zero_source_placement_load_bearing: [{"changed_breaks": [10], "changed_fixes": [16], "changed_rows": [10, 16], "exact": false, "match_count": 16, "mismatches": [3, 10], "name": "null_zero_source_shift_plus_one_AND_residual_orientation", "row_count": 18}, {"changed_breaks": [], "changed_fixes": [3], "changed_rows": [3], "exact": false, "match_count": 17, "mismatches": [16], "name": "null_zero_source_shift_minus_one_AND_residual_orientation", "row_count": 18}]
- PASS not_gap_closure: source preimage candidate only

## Next script

    record_gap_a_source_law_preimage_mixed_or_promoted_note_001.py
