# Gap A zero-twisted provenance 001

Status: gap_a_zero_twisted_provenance_tightened

## Boundary

- This does not close Gap A.
- This audit only addresses provenance of the zero-twisted row set.
- Direct confirmation from uniform lift or inspection would strengthen the source-law preimage candidate.
- If direct confirmation is not found, the preimage remains mixed and not promoted.
- No global chamber/register map is claimed.
- No physical interpretation is claimed.

## Summary

- direct_confirmed: true
- direct_confirmations: ["uniform_lift"]
- fallback_exact_hit_present: true
- status_reading: "Direct provenance tightened."
- claim_closes_gap_a: false

## Expected zero-twisted rows

[3, 4, 9, 15, 16]

## Source reports

### uniform_lift

{
  "direct_confirmed": true,
  "regex_candidates": [
    [
      3,
      4,
      9,
      15,
      16
    ],
    [
      0,
      1
    ],
    [
      0,
      1,
      3,
      4,
      9,
      15,
      16
    ],
    [
      0,
      4
    ],
    [
      3,
      4
    ],
    [
      0,
      1,
      3,
      4,
      9,
      10,
      11,
      15,
      16
    ],
    [
      0
    ],
    [
      4
    ],
    [
      1,
      2
    ],
    [
      7,
      10
    ],
    [
      2,
      3
    ],
    [
      9
    ],
    [
      2,
      13
    ],
    [
      13
    ],
    [
      4,
      5
    ],
    [
      4,
      10
    ],
    [
      1,
      7
    ],
    [
      0,
      5
    ],
    [
      2,
      7
    ],
    [
      0,
      11
    ]
  ],
  "regex_exact_hits": [
    [
      3,
      4,
      9,
      15,
      16
    ]
  ],
  "status": "gap_a_uniform_15_thalion_row_lift_needs_inspection",
  "strong_row_exact": false,
  "strong_row_support": [],
  "weak_count_exact": false,
  "weak_count_row_support": [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17
  ]
}

### uniform_inspection

{
  "direct_confirmed": false,
  "regex_candidates": [
    [
      5
    ],
    [
      1,
      2,
      3,
      5
    ],
    [
      0,
      1,
      2,
      3,
      5,
      6
    ],
    [
      0,
      1,
      2,
      3,
      6
    ],
    [
      0,
      1,
      2,
      6
    ],
    [
      1,
      2,
      6
    ],
    [
      0
    ],
    [
      0,
      2,
      6
    ],
    [
      0,
      1
    ],
    [
      4
    ],
    [
      1,
      2
    ],
    [
      0,
      1,
      2,
      4
    ],
    [
      0,
      1,
      2,
      4,
      7
    ],
    [
      7,
      10
    ],
    [
      0,
      1,
      2,
      4,
      7,
      10
    ],
    [
      2,
      3
    ],
    [
      3,
      4
    ],
    [
      0,
      1,
      2,
      3,
      4,
      7,
      10
    ],
    [
      1,
      7
    ],
    [
      0,
      4
    ]
  ],
  "regex_exact_hits": [],
  "status": "uniform_15_thalion_lift_inspected_twisted_absence_feature_found",
  "strong_row_exact": false,
  "strong_row_support": [],
  "weak_count_exact": true,
  "weak_count_row_support": [
    3,
    4,
    9,
    15,
    16
  ]
}

## Fallback report

{
  "zero_split_exact_hits": [
    [
      3,
      4,
      9,
      15,
      16
    ]
  ],
  "zero_split_regex_candidates": [
    [
      3,
      4,
      9,
      15,
      16
    ],
    [
      3,
      16
    ],
    [
      0,
      1,
      3,
      4,
      9,
      15,
      16
    ],
    [
      0,
      1,
      2,
      3,
      4,
      9,
      15,
      16
    ],
    [
      13
    ],
    [
      4
    ],
    [
      16
    ],
    [
      3
    ],
    [
      15
    ],
    [
      15,
      16
    ],
    [
      9
    ],
    [
      3,
      4
    ],
    [
      4,
      9,
      15
    ],
    [
      0,
      1,
      2,
      3,
      4,
      5,
      9,
      15,
      16
    ],
    [
      0,
      1,
      3,
      6,
      16
    ],
    [
      0,
      1,
      2,
      3,
      16
    ],
    [
      0,
      1,
      2,
      3,
      10,
      16
    ],
    [
      0,
      1,
      3,
      9,
      10,
      16
    ],
    [
      2,
      13
    ],
    [
      0,
      1,
      2,
      3,
      9,
      10,
      13,
      16
    ]
  ]
}

## Interpretation

- if_tightened: Zero-twisted support can now be cited from the earlier uniform lift or inspection artifact.
- if_not_tightened: The zero-twisted support is still real in the recorded chain, but the source-law preimage remains below promotion because the direct uniform provenance is not yet located.
- next: If not tightened, inspect the uniform lift schema and regenerate a direct zero-twisted row summary from the raw row records.

## Checks

- PASS uniform_lift_loaded: gap_a_uniform_15_thalion_row_lift_needs_inspection
- PASS uniform_inspection_loaded: uniform_15_thalion_lift_inspected_twisted_absence_feature_found
- PASS zero_split_loaded: gap_a_zero_twisted_neighborhood_split_candidate_found_not_closure
- PASS source_preimage_loaded: gap_a_source_law_preimage_candidate_found_not_closure
- PASS mixed_note_loaded: gap_a_source_law_preimage_mixed_note_recorded
- PASS expected_zero_rows_3_4_9_15_16: [3, 4, 9, 15, 16]
- PASS fallback_exact_hit_present: [[3, 4, 9, 15, 16]]
- PASS direct_uniform_or_inspection_confirmed: ["uniform_lift"]

## Next script

    derive_gap_a_source_preimage_with_tight_provenance_001.py
