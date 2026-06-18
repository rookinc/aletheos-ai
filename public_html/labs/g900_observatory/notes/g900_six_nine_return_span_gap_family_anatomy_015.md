# g900_six_nine_return_span_gap_family_anatomy_015

Status: `return_span_gap_family_anatomy_recorded`

## Purpose

After 014 found no exact allowed selector between outside-anchor span `360` and outside-anchor span `120`, this audit records which feature families carry the strongest pressure.

## Result

- audit_pass: `True`
- anatomy_status: `top_return_span_pressure_family_identified`
- strongest_family: `source`
- prior_014_exact_selector_count: `0`
- prior_014_carrier_selector_count: `0`
- theory_claim: `False`

## Top gap

- feature: `evidence_key.inside_moving_endpoint`
- family: `endpoint`
- value: `'inside_moving_endpoint'`
- span360_count: `34`
- span120_count: `15`
- rate_gap: `0.75`

## Ranked families

- `source` count `18` gap_strength_sum `6.816`
- `phase` count `8` gap_strength_sum `3.456`
- `endpoint` count `8` gap_strength_sum `3.406`
- `ladder` count `9` gap_strength_sum `3.064`
- `shape` count `4` gap_strength_sum `2.214`
- `limit` count `2` gap_strength_sum `0.517`
- `gap` count `1` gap_strength_sum `0.433`

## Top value gaps

- `evidence_key.inside_moving_endpoint` = `'inside_moving_endpoint'` span360 `34` span120 `15` gap `0.750` family `endpoint`
- `context.phase_step_mod15` = `3` span360 `24` span120 `5` gap `0.623` family `phase`
- `shape.safe_packet_key_count` = `4` span360 `22` span120 `3` gap `0.597` family `shape`
- `shape.safe_packet_key_count` = `5` span360 `0` span120 `35` gap `0.583` family `shape`
- `packet.source_limit_start` = `1` span360 `0` span120 `34` gap `0.567` family `source`
- `context.inside_moving_endpoint` = `6` span360 `24` span120 `9` gap `0.556` family `endpoint`
- `context.packet.source_side_gap` = `(9, 11)` span360 `0` span120 `33` gap `0.550` family `source`
- `shape.safe_packet_keys` = `('inside_moving_endpoint', 'ladder', 'phase_step_mod15', 'source_limit_start', 'source_side_gap')` span360 `0` span120 `32` gap `0.533` family `shape`
- `packet.phase_step_mod15` = `1` span360 `5` span120 `40` gap `0.520` family `phase`
- `evidence_key.inside_moving_endpoint` = `'packet.inside_moving_endpoint'` span360 `0` span120 `31` gap `0.517` family `endpoint`
- `evidence_key.source_limit_start` = `'has_limit_start'` span360 `0` span120 `31` gap `0.517` family `source`
- `packet.phase_step_mod15` = `3` span360 `22` span120 `8` gap `0.514` family `phase`
- `evidence_key.phase_step_mod15` = `'phase_step_mod15'` span360 `25` span120 `14` gap `0.502` family `phase`
- `shape.safe_packet_keys` = `('inside_moving_endpoint', 'ladder', 'phase_step_mod15', 'source_side_gap')` span360 `17` span120 `0` gap `0.500` family `shape`
- `context.has_ladder` = `True` span360 `0` span120 `30` gap `0.500` family `ladder`
- `evidence_key.ladder` = `'packet.ladder'` span360 `0` span120 `30` gap `0.500` family `ladder`
- `context.packet.ladder` = `(3, 9, 6, 12)` span360 `0` span120 `29` gap `0.483` family `ladder`
- `context.source_limit_start` = `None` span360 `16` span120 `0` gap `0.471` family `source`
- `context.source_limit_start` = `23` span360 `15` span120 `0` gap `0.441` family `source`
- `context.evidence_key.inside_moving_endpoint` = `'inside_moving_endpoint'` span360 `0` span120 `26` gap `0.433` family `endpoint`

## Boundary

This is an anatomy audit only. It does not claim an exact selector, native derivation completion, closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification.

Next ascent target: inspect source construction variables behind the top return-span gap family.
