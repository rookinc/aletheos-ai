# Gap A uniform lift zero-twisted rows 001

Status: gap_a_uniform_lift_zero_twisted_rows_normalized

## Boundary

- This does not close Gap A.
- This normalizes provenance for the zero-twisted row set only.
- The source-law preimage remains mixed because branch_sensitive OR singleton ZT still survives.
- No full source-derived chamber/register map is claimed.
- No physical interpretation is claimed.

## Normalized zero-twisted rows

[3, 4, 9, 15, 16]

## Source extraction

{
  "all_candidate_hits": [
    {
      "detail": "zero=[3, 4, 9, 15, 16]",
      "id": "all_rows_have_twisted_edges",
      "path": "$.checks[8]",
      "source_kind": "uniform_lift_check_detail",
      "status": false,
      "zero_rows": [
        3,
        4,
        9,
        15,
        16
      ]
    },
    {
      "detail": "zero=[]",
      "id": "all_rows_have_untwisted_edges",
      "path": "$.checks[9]",
      "source_kind": "uniform_lift_check_detail",
      "status": true,
      "zero_rows": []
    }
  ],
  "artifact": "registered_boundary_flux/artifacts/json/gap_a_uniform_15_thalion_row_lift_001.v1.json",
  "exact_hits": [
    {
      "detail": "zero=[3, 4, 9, 15, 16]",
      "id": "all_rows_have_twisted_edges",
      "path": "$.checks[8]",
      "source_kind": "uniform_lift_check_detail",
      "status": false,
      "zero_rows": [
        3,
        4,
        9,
        15,
        16
      ]
    }
  ],
  "method": "parse uniform_lift check id all_rows_have_twisted_edges detail zero=[...]"
}

## Cross checks

{
  "expected": [
    3,
    4,
    9,
    15,
    16
  ],
  "improved_note_zero_twisted_rows": [
    3,
    4,
    9,
    15,
    16
  ],
  "provenance_expected_zero_twisted_rows": [
    3,
    4,
    9,
    15,
    16
  ],
  "source_preimage_zero_twisted_rows": [
    3,
    4,
    9,
    15,
    16
  ]
}

## Claim

- does_this_close_gap_a: false
- does_this_promote_source_law_preimage: false
- does_this_normalize_zero_twisted_provenance: true
- zero_twisted_rows: [3, 4, 9, 15, 16]
- short_form: "The zero-twisted row set [3,4,9,15,16] is now normalized from the uniform_lift check all_rows_have_twisted_edges."
- not_promoted_reason: "The source-law preimage still has a surviving exact substitute: branch_sensitive OR singleton ZT."

## Interpretation

- main_result: The zero-twisted row set is no longer merely a regex discovery or zero-split fallback; it is normalized from the uniform_lift check record.
- still_open: This improves provenance but does not eliminate the surviving substitute or produce a global chamber/register map.

## Checks

- PASS uniform_lift_loaded: gap_a_uniform_15_thalion_row_lift_needs_inspection
- PASS candidate_hit_found: [{"detail": "zero=[3, 4, 9, 15, 16]", "id": "all_rows_have_twisted_edges", "path": "$.checks[8]", "source_kind": "uniform_lift_check_detail", "status": false, "zero_rows": [3, 4, 9, 15, 16]}, {"detail": "zero=[]", "id": "all_rows_have_untwisted_edges", "path": "$.checks[9]", "source_kind": "uniform_lift_check_detail", "status": true, "zero_rows": []}]
- PASS exact_uniform_check_hit_found: [{"detail": "zero=[3, 4, 9, 15, 16]", "id": "all_rows_have_twisted_edges", "path": "$.checks[8]", "source_kind": "uniform_lift_check_detail", "status": false, "zero_rows": [3, 4, 9, 15, 16]}]
- PASS normalized_rows_expected: [3, 4, 9, 15, 16]
- PASS matches_source_preimage_zero: [3, 4, 9, 15, 16]
- PASS matches_provenance_expected: [3, 4, 9, 15, 16]
- PASS matches_improved_note_zero: [3, 4, 9, 15, 16]
- PASS source_preimage_still_mixed: gap_a_source_law_preimage_candidate_nulls_mixed_not_promoted
- PASS not_gap_closure: normalization only

## Next script

    derive_gap_a_source_preimage_from_normalized_zero_rows_001.py
