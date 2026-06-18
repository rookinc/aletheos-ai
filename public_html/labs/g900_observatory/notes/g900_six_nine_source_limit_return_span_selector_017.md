# g900_six_nine_source_limit_return_span_selector_017

Status: `source_limit_return_span_selector_not_found`

## Question

Can source-limit variables distinguish outside-anchor span `360` from outside-anchor span `120`, after 016 identified `packet.source_limit_start` as the strongest source pressure feature?

Outside/anchor fields, foundation fields, forbidden fields, and fallback are excluded as selector features.

## Result

- audit_pass: `True`
- limit_status: `source_limit_features_have_pressure_but_no_exact_selector`
- return_span_row_count: `93`
- outside_anchor_360_row_count: `40`
- outside_anchor_120_row_count: `53`
- exact_selector_count: `0`
- theory_claim: `False`

## Selector

No exact source-limit selector found. Selector status: `ok`.

## Top source-limit value gaps

- `limit.start_is_23` = `False` span360 `0` span120 `52` gap `0.981`
- `limit.start_in_gap` = `False` span360 `11` span120 `46` gap `0.593`
- `limit.start` = `1` span360 `0` span120 `31` gap `0.585`
- `limit.start_distance_to_23` = `8` span360 `0` span120 `31` gap `0.585`
- `limit.start_distance_to_24` = `23` span360 `0` span120 `31` gap `0.585`
- `limit.start_mod15` = `1` span360 `0` span120 `31` gap `0.585`
- `limit.start_mod3` = `1` span360 `0` span120 `31` gap `0.585`
- `limit.start_mod4` = `1` span360 `0` span120 `31` gap `0.585`
- `limit.start_mod5` = `1` span360 `0` span120 `31` gap `0.585`
- `limit.start_mod6` = `1` span360 `0` span120 `31` gap `0.585`
- `limit.start_to_ladder_first_mod15` = `2` span360 `0` span120 `31` gap `0.585`
- `limit.start_to_ladder_last_mod15` = `11` span360 `0` span120 `31` gap `0.585`
- `limit.start_is_24` = `False` span360 `17` span120 `53` gap `0.575`
- `limit.start_equals_ladder_first` = `False` span360 `17` span120 `51` gap `0.537`
- `limit.start_equals_ladder_last` = `False` span360 `17` span120 `51` gap `0.537`
- `limit.gap_high_minus_start_mod15` = `10` span360 `0` span120 `26` gap `0.491`
- `limit.gap_low_minus_start_mod15` = `8` span360 `0` span120 `26` gap `0.491`
- `limit.start_minus_gap_high_mod15` = `5` span360 `0` span120 `26` gap `0.491`
- `limit.start_minus_gap_low_mod15` = `7` span360 `0` span120 `26` gap `0.491`
- `limit.endpoint_high_minus_start_mod15` = `1` span360 `17` span120 `1` gap `0.406`

## Boundary

This is a source-limit selector audit only. It does not admit native derivation completion, closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification claims.

Next ascent target: inspect top source-limit gap rows and add the next source construction variable.
