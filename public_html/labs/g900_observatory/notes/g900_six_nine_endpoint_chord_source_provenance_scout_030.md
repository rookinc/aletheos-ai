# g900_six_nine_endpoint_chord_source_provenance_scout_030

Status: `endpoint_chord_source_provenance_contrast_missing`

## Purpose

After 029 reduced the hinge stack to endpoint chord `[6,9]`, this audit tests whether exposed source-construction context distinguishes that chord without using the endpoint value as a selector feature.

## Result

- audit_pass: `True`
- provenance_status: `endpoint_chord_6_9_present_but_no_endpoint_contrast_rows_found`
- endpoint_scan_row_count: `242`
- target_chord_row_count: `242`
- contrast_chord_row_count: `0`
- exact_selector_count: `0`
- theory_claim: `False`

## Selector

No exact selector was found in the tested exposed source-context features.

## Top value gaps

- `packet.source_side_gap` = `(9, 11)` target `199` contrast `0` gap `0.822`
- `shape.has_gap` = `True` target `199` contrast `0` gap `0.822`
- `shape.has_inside` = `True` target `178` contrast `0` gap `0.736`
- `shape.has_limit_start` = `True` target `171` contrast `0` gap `0.707`
- `shape.has_ladder` = `True` target `160` contrast `0` gap `0.661`
- `shape.has_phase` = `True` target `150` contrast `0` gap `0.620`
- `packet.ladder` = `(3, 9, 6, 12)` target `136` contrast `0` gap `0.562`
- `shape.safe_present_packet_key_count` = `5` target `136` contrast `0` gap `0.562`
- `shape.safe_present_packet_keys` = `('inside_moving_endpoint', 'ladder', 'phase_step_mod15', 'source_limit_start', 'source_side_gap')` target `136` contrast `0` gap `0.562`
- `packet.inside_moving_endpoint` = `6` target `98` contrast `0` gap `0.405`
- `packet.source_limit_start` = `23` target `98` contrast `0` gap `0.405`
- `shape.has_phase` = `False` target `92` contrast `0` gap `0.380`
- `shape.has_ladder` = `False` target `82` contrast `0` gap `0.339`
- `packet.inside_moving_endpoint` = `9` target `80` contrast `0` gap `0.331`
- `shape.has_limit_start` = `False` target `71` contrast `0` gap `0.293`
- `shape.safe_present_packet_key_count` = `1` target `70` contrast `0` gap `0.289`
- `shape.has_inside` = `False` target `64` contrast `0` gap `0.264`
- `packet.source_limit_start` = `1` target `63` contrast `0` gap `0.260`
- `context.source_side_gap_signature` = `(9, 11)` target `59` contrast `0` gap `0.244`
- `context.source_limit_start` = `23` target `58` contrast `0` gap `0.240`

## Boundary

This is an endpoint-chord source-provenance scout only. It does not claim native derivation completion, closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification.

Next ascent target: inspect endpoint chord [6,9] contrast gaps or move upstream beyond exposed packet context.
