# g900_six_nine_ladder_schema_guided_source_derivation_audit_004

Status: `schema_guided_order_rule_found_geometry_generator_open`

## Question

Using the schema microscope result, can the no-fallback extracted rows from provenance audit 002 be reclassified by actual ladder value and tested for a pre-receipt source-side rule that selects `[3,6,9,12]` over `[3,9,6,12]`?

## Result

- audit_pass: `True`
- derivation_status: `ladder_order_rule_selects_clean_ladder_but_source_geometry_generator_remains_open`
- uses_fallback: `False`
- normalized_branch_row_count: `7`
- target_extracted_row_count: `4`
- broken_extracted_row_count: `3`
- source_geometry_hold_found: `False`
- source_geometry_rule_count: `0`
- order_hold_found: `True`
- order_rule_count: `7`
- no_leaky_features_used: `True`

## Best ladder-order rule

- features: `['constant_linear_step_3']`
- target_value: `[True]`
- broken_values: `[[False]]`

## Extracted row packet

- `clean_target_ladder` ladder `[3, 6, 9, 12]` deltas `[3, 3, 3]` anchor `9` root `12` distance `3` phase_step `3` pointer `$.branches[0].features`
- `broken_ladder` ladder `[3, 9, 6, 12]` deltas `[6, 12, 6]` anchor `6` root `12` distance `6` phase_step `6` pointer `$.branches[1].features`
- `clean_target_ladder` ladder `[3, 6, 9, 12]` deltas `[3, 3, 3]` anchor `6` root `12` distance `6` phase_step `6` pointer `$.branches[1].features`
- `clean_target_ladder` ladder `[3, 6, 9, 12]` deltas `[3, 3, 3]` anchor `9` root `None` distance `None` phase_step `3` pointer `$.receipt_selectors[20].selected_branches[0]`
- `clean_target_ladder` ladder `[3, 6, 9, 12]` deltas `[3, 3, 3]` anchor `None` root `None` distance `None` phase_step `None` pointer `$.receipt_selectors[17]`
- `broken_ladder` ladder `[3, 9, 6, 12]` deltas `[6, 12, 6]` anchor `6` root `None` distance `None` phase_step `6` pointer `$.absent_selectors[20].selected_branches[0]`
- `broken_ladder` ladder `[3, 9, 6, 12]` deltas `[6, 12, 6]` anchor `None` root `None` distance `None` phase_step `None` pointer `$.absent_selectors[17]`

## Boundary

This audit uses no fallback and excludes forbidden fields as selector features. It does not admit closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification claims. Even if the source-geometry hold passes, native derivation is not complete.

Next ascent target: derive source geometry fields directly from carrier incidence or source construction.
