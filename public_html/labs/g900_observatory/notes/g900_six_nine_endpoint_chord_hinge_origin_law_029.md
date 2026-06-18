# g900_six_nine_endpoint_chord_hinge_origin_law_029

Status: `endpoint_chord_hinge_origin_law_candidate_recorded`

## Purpose

After 028 reduced the broken face to inside=6 plus a two-slot gap, this audit tests whether those inputs are produced by the endpoint chord [6,9].

## Candidate formula

For endpoint chord `[a,b]`:

- `inside = a`
- `span = b-a mod 15`
- `gap_width = span - 1`
- `gap = [b, b+gap_width] mod 15`
- `phase = gap_width - 1`
- `broken_ladder = [a-span, b, a, a+2*span] mod 15`

For `[6,9]`, this gives `inside=6`, `gap=[9,11]`, `phase=1`, and `broken_ladder=[3,9,6,12]`.

## Result

- audit_pass: `True`
- origin_status: `endpoint_chord_6_9_recovers_inside6_two_slot_gap_phase1_and_broken_ladder`
- endpoint_chord_origin_law_pass: `True`
- theory_claim: `False`

## Reading

The open inputs from 028 reduce one level: the endpoint chord [6,9] supplies inside=6 as its lower endpoint, span=3, gap_width=span-1=2, gap=[9,11], phase=1, and the broken ladder [3,9,6,12]. This records a local endpoint-chord origin law candidate. It does not yet derive why source construction supplies the endpoint chord [6,9].

## Tests

- `central_pair_reverses_endpoint_chord`: `True`
- `endpoint_chord_is_6_9`: `True`
- `endpoint_span_is_3`: `True`
- `exposed_chord_matches_endpoint_face`: `True`
- `gap_starts_at_upper_endpoint`: `True`
- `gap_width_is_2`: `True`
- `gap_width_is_span_minus_one`: `True`
- `inside_is_lower_endpoint`: `True`
- `predicted_deltas_match_027`: `True`
- `predicted_gap_matches`: `True`
- `predicted_ladder_matches`: `True`
- `predicted_phase_matches`: `True`
- `prior_025_local_cell_candidate_found`: `True`
- `prior_026_hinge_law_found`: `True`
- `prior_027_source_law_pass`: `True`
- `prior_028_origin_law_pass`: `True`

## Boundary

This is a local endpoint-chord origin-law candidate only. It does not derive endpoint chord [6,9], and does not claim native derivation completion, closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification.

Next ascent target: derive why source construction supplies endpoint chord [6,9].
