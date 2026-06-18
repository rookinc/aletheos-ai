# g900_six_nine_inside6_gap_phase_origin_law_028

Status: `inside6_gap_phase_origin_law_candidate_recorded`

## Purpose

After 027 recovered the broken ladder face from `inside=6`, `gap=[9,11]`, and `phase=1`, this audit tests whether `gap=[9,11]` and `phase=1` follow from `inside=6` plus a two-slot source gap.

## Candidate formula

Given `inside = I` and `gap_width = W`, test:

`gap = [I+3, I+3+W] mod 15`

`phase = W - 1`

For `I=6` and `W=2`, this gives `gap=[9,11]` and `phase=1`.

## Result

- audit_pass: `True`
- origin_status: `inside_plus_two_slot_gap_formula_recovers_gap_9_11_and_phase1`
- tested_row_count: `3`
- prediction_match_count: `3`
- prediction_fail_count: `0`
- origin_law_pass: `True`
- theory_claim: `False`

## Reading

The source inputs used by 027 reduce one level: once inside=6 and a two-slot source gap are present, the local offset rule gap=[inside+3, inside+5] and phase=gap_width-1 recovers gap=[9,11] and phase=1. This does not yet derive why source construction supplies inside=6 or a two-slot gap.

## Tested rows

### Row 1

- artifact: `g900_six_nine_foundation_packet_broader_origin_selector_009.v1.json`
- pointer: `$.contrast_rows_first_30[20].packet`
- inside: `6`
- gap_width: `2`
- actual_gap: `[9, 11]`
- predicted_gap: `[9, 11]`
- actual_phase: `1`
- predicted_phase: `1`
- combined_match: `True`

### Row 2

- artifact: `g900_six_nine_ladder_schema_microscope_003.v1.json`
- pointer: `$.source_hits[1].object_scalar_context`
- inside: `6`
- gap_width: `2`
- actual_gap: `[9, 11]`
- predicted_gap: `[9, 11]`
- actual_phase: `1`
- predicted_phase: `1`
- combined_match: `True`

### Row 3

- artifact: `g900_six_nine_return_span_carrier_variable_scout_014.v1.json`
- pointer: `$.span360_rows_first_20[4].packet`
- inside: `6`
- gap_width: `2`
- actual_gap: `[9, 11]`
- predicted_gap: `[9, 11]`
- actual_phase: `1`
- predicted_phase: `1`
- combined_match: `True`

## Boundary

This is a local origin-law candidate only. It does not derive inside=6, does not derive the two-slot gap, and does not claim native derivation completion, closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification.

Next ascent target: derive why source construction supplies inside=6 and a two-slot gap.
