# g900_six_nine_shell_scale_origin_hypothesis_012

Status: `shell_scale_origin_hypothesis_selector_not_found`

## Question

Do shell-scale accounting features suggested by the sketch family select the six-nine foundation packet?

Tested sketch grammar: `60 -> 180 -> 360 -> 900`, with decomposition `360 + 180 + 360 = 900`.

Foundation fields `source_pair`, `source_root_slot`, and `source_limit_transition` are not used as selector features.

## Result

- audit_pass: `True`
- shell_status: `shell_scale_features_tested_but_do_not_select_foundation_packet`
- packet_row_count: `164`
- target_foundation_row_count: `53`
- contrast_row_count: `111`
- exact_selector_count: `0`
- theory_claim: `False`

## Selector

No exact shell-scale selector found. Selector status: `ok`.

## Top shell value gaps

- `shell.limit_start_mod15` = `8` target `23` contrast `9` gap `0.353`
- `shell.outside_anchor_distance` = `6` target `23` contrast `9` gap `0.353`
- `shell.outside_anchor_units` = `360` target `23` contrast `9` gap `0.353`
- `shell.limit_start_mod3` = `2` target `23` contrast `10` gap `0.344`
- `shell.limit_start_mod6` = `5` target `23` contrast `10` gap `0.344`
- `shell.outside_anchor_distance` = `2` target `0` contrast `38` gap `0.342`
- `shell.outside_anchor_units` = `120` target `0` contrast `38` gap `0.342`
- `shell.inside_anchor_distance` = `0` target `18` contrast `2` gap `0.322`
- `shell.inside_anchor_same` = `True` target `18` contrast `2` gap `0.322`
- `shell.inside_anchor_units` = `0` target `18` contrast `2` gap `0.322`
- `shell.phase_step_is_half_turn_units` = `False` target `17` contrast `69` gap `0.301`
- `shell.phase_step_is_full_sweep_units` = `False` target `21` contrast `75` gap `0.279`
- `shell.ladder_all_step_3` = `False` target `27` contrast `86` gap `0.265`
- `shell.ladder_delta_units` = `(360, 720, 360)` target `27` contrast `86` gap `0.265`
- `shell.ladder_deltas` = `(6, 12, 6)` target `27` contrast `86` gap `0.265`
- `shell.ladder_total_directed_span` = `24` target `27` contrast `86` gap `0.265`
- `shell.ladder_total_directed_units` = `1440` target `27` contrast `86` gap `0.265`
- `shell.ladder_total_directed_units_is_540` = `False` target `27` contrast `86` gap `0.265`
- `shell.limit_start_mod3` = `0` target `0` contrast `28` gap `0.252`
- `shell.limit_start_mod6` = `0` target `0` contrast `28` gap `0.252`

## Boundary

This is a finite shell-scale hypothesis audit only. It does not admit native derivation completion, closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification claims.

Next ascent target: inspect top shell value gaps and decide whether shell accounting needs a richer carrier variable.
