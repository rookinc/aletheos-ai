# G900 P7 transition-weight rhythm audit 001

Status: `p7_transition_weight_rhythm_audit_passed`

This audit tests the user-spotted P7 rhythm: `360 / 180 / 360`.

## P7 path

`['08', '02', '03', '09', '12', '06', '13']`

Pairs:

`['02_08', '02_03', '03_09', '09_12', '06_12', '06_13']`

Weights:

`[180, 180, 180, 60, 120, 180]`

## Rhythm

- left wing: `['02_08', '02_03']` -> `360`
- hinge: `['03_09']` -> `180`
- right wing: `['09_12', '06_12', '06_13']` -> `360`

Total P7 weight: `900`

## Interpretation

The P7 path supports a `360 / 180 / 360` transition-weight rhythm. The central hinge is `03_09`. The right wing contains the nonclean pocket.

## Boundary

This is a rhythm audit only. It admits no channels, renders no channels, mutates no body, lights no marker, and makes no force or physics claim.
