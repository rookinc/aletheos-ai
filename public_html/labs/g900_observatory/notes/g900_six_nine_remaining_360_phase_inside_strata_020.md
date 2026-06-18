# g900_six_nine_remaining_360_phase_inside_strata_020

Status: `remaining_360_phase_inside_strata_recorded`

## Purpose

After 019 found no exact second source variable, this audit records the phase/inside strata visible in the remaining-360 pressure rows.

## Result

- audit_pass: `True`
- strata_status: `inside6_gate_phase3_core_residual_open`
- remaining360_count: `22`
- span120_count: `53`
- inside6_necessary_for_remaining360: `True`
- inside9_excluded_from_remaining360: `True`
- phase3_core_fraction_of_remaining360: `0.7727272727272727`
- residual_remaining360_after_phase3: `5`
- theory_claim: `False`

## Reading

The remaining 360 stratum is gated by inside=6 in the observed rows. Inside=9 is excluded from remaining360. Phase=3 marks the main remaining360 core, but a residual remaining360 subset is not explained by phase=3 and requires another variable.

## Key rows

- inside=6: `inside.value` = `6` remaining360 `22` negative `33` gap `0.377`
- inside=9: `inside.value` = `9` remaining360 `0` negative `20` gap `0.377`
- phase=3: `phase.value` = `3` remaining360 `17` negative `11` gap `0.565`
- phase=1: `phase.value` = `1` remaining360 `3` negative `28` gap `0.392`
- clean ladder: `ladder.value` = `(3, 6, 9, 12)` remaining360 `6` negative `11` gap `0.065`
- broken ladder: `ladder.value` = `(3, 9, 6, 12)` remaining360 `14` negative `40` gap `0.118`

## Boundary

This is a strata anatomy audit only. It does not claim an exact selector, native derivation completion, closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification.

Next ascent target: identify the residual remaining360 variable after the inside6 gate and phase3 core.
