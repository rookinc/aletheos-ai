# g900_six_nine_source_limit_strata_anatomy_018

Status: `source_limit_strata_anatomy_recorded`

## Purpose

After 017 found source-limit pressure but no exact selector, this audit records the return-span strata carried by source-limit starts.

## Result

- audit_pass: `True`
- strata_status: `limit_start_0_1_explain_major_120_strata_start_23_marks_360_pressure`
- prior_017_exact_selector_count: `0`
- has_120_start_strata: `True`
- has_360_start_23_pressure: `True`
- theory_claim: `False`

## Reading

017 shows source-limit pressure but no exact selector. The pressure splits into strata: limit starts 0 and 1 are span120-only in the observed gap rows, while limit start 23 strongly favors span360 but does not cover the whole span360 class. The remaining span360 rows require another source construction variable.

## Key strata

### span120 start not 23

- `limit.start_is_23` = `False` span360 `0` span120 `52` gap `0.981`

### span120 start 1

- `limit.start` = `1` span360 `0` span120 `31` gap `0.585`

### span120 start 0

- `limit.start` = `0` span360 `0` span120 `21` gap `0.396`

### span360 start 23 pressure

- `limit.start` = `23` span360 `17` span120 `1` gap `0.406`

### phase/start rows

- `limit.phase_minus_start_mod15` = `0` span360 `0` span120 `20` gap `0.377`
- `limit.start_minus_phase_mod15` = `0` span360 `0` span120 `20` gap `0.377`

### gap/start rows

- `limit.start_in_gap` = `False` span360 `11` span120 `46` gap `0.593`
- `limit.gap_high_minus_start_mod15` = `10` span360 `0` span120 `26` gap `0.491`
- `limit.gap_low_minus_start_mod15` = `8` span360 `0` span120 `26` gap `0.491`
- `limit.start_minus_gap_high_mod15` = `5` span360 `0` span120 `26` gap `0.491`
- `limit.start_minus_gap_low_mod15` = `7` span360 `0` span120 `26` gap `0.491`
- `limit.gap_high_minus_start_mod15` = `11` span360 `0` span120 `19` gap `0.358`

### endpoint/start rows

- `limit.endpoint_high_minus_start_mod15` = `1` span360 `17` span120 `1` gap `0.406`
- `limit.endpoint_low_minus_start_mod15` = `13` span360 `17` span120 `1` gap `0.406`
- `limit.start_minus_endpoint_high_mod15` = `14` span360 `17` span120 `1` gap `0.406`
- `limit.start_minus_endpoint_low_mod15` = `2` span360 `17` span120 `1` gap `0.406`
- `limit.endpoint_high_minus_start_mod15` = `8` span360 `0` span120 `21` gap `0.396`
- `limit.endpoint_low_minus_start_mod15` = `5` span360 `0` span120 `21` gap `0.396`
- `limit.start_minus_endpoint_high_mod15` = `7` span360 `0` span120 `21` gap `0.396`
- `limit.start_minus_endpoint_low_mod15` = `10` span360 `0` span120 `21` gap `0.396`

## Boundary

This is a strata anatomy audit only. It does not claim an exact selector, native derivation completion, closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification.

Next ascent target: identify the second source variable that explains the remaining outside-anchor 360 strata beyond source_limit_start=23.
