# g900_six_nine_return_span_source_variable_anatomy_016

Status: `return_span_source_variable_anatomy_recorded`

## Purpose

After 015 identified `source` as the strongest return-span pressure family, this audit ranks the source variables responsible for the pressure.

## Result

- audit_pass: `True`
- source_status: `source_pressure_variable_family_identified`
- strongest_source_feature: `packet.source_limit_start`
- strongest_source_subfamily: `source_limit`
- source_gap_row_count: `18`
- source_360_only_row_count: `11`
- source_120_only_row_count: `9`
- theory_claim: `False`

## Ranked source subfamilies

- `source_limit` count `6` gap_strength_sum `2.803`
- `source_gap` count `7` gap_strength_sum `2.388`
- `source_endpoint` count `5` gap_strength_sum `1.625`

## Ranked source features

- `packet.source_limit_start` subfamily `source_limit` count `3` gap_strength_sum `1.375`
  - value `1` span360 `0` span120 `34` gap `0.567`
  - value `23` span360 `15` span120 `2` gap `0.408`
  - value `0` span360 `0` span120 `24` gap `0.400`
- `evidence_key.source_side_gap` subfamily `source_gap` count `3` gap_strength_sum `0.994`
  - value `'packet.source_side_gap'` span360 `0` span120 `26` gap `0.433`
  - value `'source_side_gap_signature'` span360 `10` span120 `0` gap `0.294`
  - value `'source_side_gap'` span360 `17` span120 `14` gap `0.267`
- `context.source_limit_start` subfamily `source_limit` count `2` gap_strength_sum `0.912`
  - value `None` span360 `16` span120 `0` gap `0.471`
  - value `23` span360 `15` span120 `0` gap `0.441`
- `context.source_endpoints` subfamily `source_endpoint` count `2` gap_strength_sum `0.691`
  - value `(6, 9)` span360 `17` span120 `7` gap `0.383`
  - value `None` span360 `15` span120 `8` gap `0.308`
- `evidence_key.source_endpoints` subfamily `source_endpoint` count `2` gap_strength_sum `0.633`
  - value `'source_endpoints'` span360 `17` span120 `7` gap `0.383`
  - value `'packet.source_endpoints'` span360 `0` span120 `15` gap `0.250`
- `context.packet.source_side_gap` subfamily `source_gap` count `1` gap_strength_sum `0.550`
  - value `(9, 11)` span360 `0` span120 `33` gap `0.550`
- `evidence_key.source_limit_start` subfamily `source_limit` count `1` gap_strength_sum `0.517`
  - value `'has_limit_start'` span360 `0` span120 `31` gap `0.517`
- `context.packet.source_endpoints` subfamily `source_endpoint` count `1` gap_strength_sum `0.300`
  - value `(6, 9)` span360 `0` span120 `18` gap `0.300`
- `context.source_side_gap_signature` subfamily `source_gap` count `1` gap_strength_sum `0.294`
  - value `(9, 11)` span360 `10` span120 `0` gap `0.294`
- `context.evidence_key.source_side_gap` subfamily `source_gap` count `1` gap_strength_sum `0.283`
  - value `'source_side_gap_signature'` span360 `0` span120 `17` gap `0.283`
- `context.source_side_gap` subfamily `source_gap` count `1` gap_strength_sum `0.267`
  - value `(9, 11)` span360 `17` span120 `14` gap `0.267`

## Boundary

This is a source-variable anatomy audit only. It does not claim an exact selector, native derivation completion, closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification.

Next ascent target: test source-limit variables against the outside-anchor 360 vs 120 return-span split.
