# g900_six_nine_return_span_class_audit_013

Status: `return_span_class_pressure_recorded`

## Question

After shell-scale features failed to exactly select the foundation packet in 012, which shell feature family carries the strongest pressure?

## Result

- audit_pass: `True`
- span_status: `outside_anchor_360_pressure_and_120_contrast_exclusion_found`
- has_return_span_pressure: `True`
- prior_012_exact_selector_count: `0`
- theory_claim: `False`

## Reading

The shell-scale selector did not close, but the strongest pressure is not the broad 360+180+360 decomposition. It is the outside-anchor return span class: target rows lean toward outside-anchor 360 and exclude outside-anchor 120, while contrast rows contain the 120 span.

## Outside-anchor rows

- `shell.outside_anchor_distance` = `6` target `23` contrast `9` gap `0.353`
- `shell.outside_anchor_units` = `360` target `23` contrast `9` gap `0.353`
- `shell.outside_anchor_distance` = `2` target `0` contrast `38` gap `0.342`
- `shell.outside_anchor_units` = `120` target `0` contrast `38` gap `0.342`

## Limit residue rows

- `shell.limit_start_mod15` = `8` target `23` contrast `9` gap `0.353`
- `shell.limit_start_mod3` = `2` target `23` contrast `10` gap `0.344`
- `shell.limit_start_mod6` = `5` target `23` contrast `10` gap `0.344`
- `shell.limit_start_mod3` = `0` target `0` contrast `28` gap `0.252`
- `shell.limit_start_mod6` = `0` target `0` contrast `28` gap `0.252`
- `shell.limit_start_mod15` = `0` target `0` contrast `26` gap `0.234`
- `shell.limit_start_mod15` = `1` target `0` contrast `26` gap `0.234`
- `shell.limit_start_mod3` = `1` target `0` contrast `26` gap `0.234`
- `shell.limit_start_mod6` = `1` target `0` contrast `26` gap `0.234`

## Boundary

This is an anatomy-pressure audit only. It does not claim an exact selector, native derivation completion, closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification.

Next ascent target: add carrier/source construction variables that distinguish outside-anchor 360 from outside-anchor 120.
