# g900_six_nine_broken_ladder_face_source_law_027

Status: `broken_ladder_face_source_law_candidate_recorded`

## Purpose

After 026 recorded the inside6 two-faced hinge cell, this audit tests a compact source-cell formula for the broken ladder face.

## Candidate formula

Given `inside = I`, `gap = [G,H]`, and `phase = p`, test:

`ladder = [I-3, G, I, I+6] mod 15`

with `p = gap_width - 1`.

For the observed hinge:

`I=6`, `gap=[9,11]`, `phase=1`, so `ladder=[3,9,6,12]`.

## Result

- audit_pass: `True`
- law_status: `inside_gap_phase_formula_recovers_broken_ladder_face`
- tested_broken_family_row_count: `3`
- prediction_match_count: `3`
- prediction_fail_count: `0`
- source_law_pass: `True`
- theory_claim: `False`

## Reading

The broken-ladder face is recovered by a compact source-cell formula from inside=6, gap=[9,11], and phase=1. The formula predicts [3,9,6,12], with deltas [6,12,6]. The central pair 9->6 reverses the exposed endpoint chord [6,9]. This records a local source-law candidate for the broken face. It does not yet derive why source construction supplies inside=6, gap=[9,11], or phase=1.

## Tested rows

### Row 1

- artifact: `g900_six_nine_foundation_packet_broader_origin_selector_009.v1.json`
- pointer: `$.contrast_rows_first_30[20].packet`
- actual_ladder: `[3, 9, 6, 12]`
- predicted_ladder: `[3, 9, 6, 12]`
- prediction_match: `True`

### Row 2

- artifact: `g900_six_nine_ladder_schema_microscope_003.v1.json`
- pointer: `$.source_hits[1].object_scalar_context`
- actual_ladder: `[3, 9, 6, 12]`
- predicted_ladder: `[3, 9, 6, 12]`
- prediction_match: `True`

### Row 3

- artifact: `g900_six_nine_return_span_carrier_variable_scout_014.v1.json`
- pointer: `$.span360_rows_first_20[4].packet`
- actual_ladder: `[3, 9, 6, 12]`
- predicted_ladder: `[3, 9, 6, 12]`
- prediction_match: `True`

## Boundary

This is a local source-law candidate only. It does not claim native derivation completion, exact selector closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification.

Next ascent target: derive why source construction supplies inside=6 gap=[9,11] phase=1.
