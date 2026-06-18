# g900-six-nine-ladder-3-6-9-12-source-provenance-audit-002

Status: `missing_usable_extracted_ladder_rows`

## Question

Can the clean ladder `[3,6,9,12]` and broken ladder `[3,9,6,12]` be extracted directly from `g900-six-nine-native-anchor-asymmetry-audit-001`, with no fallback, and can a pre-receipt source-side rule separate them?

## Result

- audit_pass: `False`
- provenance_status: `no_fallback_rows_insufficient`
- derivation_status: `no_claim_source_provenance_not_established`
- branch_row_count: `7`
- receipt_branch_count: `0`
- absent_branch_count: `3`
- exact_hold_found: `False`
- exact_rule_count: `0`
- no_leaky_features_used: `True`

## Extracted rows

- `absent_candidate` pointer `$.branches[0].features` ladder `[3, 6, 9, 12]` deltas `[3, 3, 3]` anchor `9` root `12` distance `3`
- `absent_candidate` pointer `$.branches[1].features` ladder `[3, 9, 6, 12]` deltas `[6, 12, 6]` anchor `6` root `12` distance `6`
- `absent_candidate` pointer `$.branches[1].features` ladder `[3, 6, 9, 12]` deltas `[3, 3, 3]` anchor `6` root `12` distance `6`
- `absent_candidate` pointer `$.receipt_selectors[20].selected_branches[0]` ladder `[3, 6, 9, 12]` deltas `[3, 3, 3]` anchor `9` root `None` distance `None`
- `absent_candidate` pointer `$.receipt_selectors[17]` ladder `[3, 6, 9, 12]` deltas `[3, 3, 3]` anchor `None` root `None` distance `None`
- `absent_candidate` pointer `$.absent_selectors[20].selected_branches[0]` ladder `[3, 9, 6, 12]` deltas `[6, 12, 6]` anchor `6` root `None` distance `None`
- `absent_candidate` pointer `$.absent_selectors[17]` ladder `[3, 9, 6, 12]` deltas `[6, 12, 6]` anchor `None` root `None` distance `None`

## Boundary

No fallback was used. This audit does not admit closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification claims.
