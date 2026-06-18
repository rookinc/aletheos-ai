# g900-six-nine-ladder-3-6-9-12-source-derivation-audit-001

Status: `ladder_3_6_9_12_source_derivation_audit_passed`

## Question

Can the ordered receipt ladder `[3,6,9,12]` be selected from pre-receipt source-side fields over the broken order `[3,9,6,12]`, without using receipt, prediction, registry, support, channel, viewer, force, or physics fields?

## Result

- audit_pass: `True`
- derivation_status: `pre_receipt_source_rule_selects_clean_ladder_order`
- row_source: `fallback_from_locked_prior_hold`
- branch_row_count: `2`
- receipt_branch_count: `1`
- absent_branch_count: `1`
- exact_rule_count: `228`
- no_leaky_features_used: `True`

## Best source-side rule

- features: `['anchor_distance_3']`
- receipt_value: `[True]`
- absent_values: `[[False]]`

Reading: the clean ladder is not only a later registry receipt. In this tested family, its order is already selected by a pre-receipt source-side rule.

## Branch comparison

- `receipt_candidate` ladder `[3, 6, 9, 12]`, deltas `[3, 3, 3]`, anchor `9`, root `12`, anchor_to_root_distance `3`
- `absent_candidate` ladder `[3, 9, 6, 12]`, deltas `[6, 12, 6]`, anchor `6`, root `12`, anchor_to_root_distance `6`

## Boundary

This audit does not admit a closure witness, transport relation, channel, marker lighting, viewer/body mutation, force claim, physics claim, or GR/Maxwell/QCD/electroweak/unification claim.

Next ascent target: derive why the source construction produces the selected source-side fields, rather than only deriving the ladder order from them.
