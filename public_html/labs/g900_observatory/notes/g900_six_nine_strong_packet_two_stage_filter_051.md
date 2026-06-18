# g900_six_nine_strong_packet_two_stage_filter_051

Status: `strong_packet_two_stage_filter_candidate_found`

## Purpose

050 failed to recover the expected 140 proposal surface because the broader predicate returned 158 rows. However, it exposed multiple 18-row exclusions whose complements were 140 and retained all 20 source-005 sample rows. This audit tests that as a two-stage filter.

## Result

- audit_pass: `True`
- stage_status: `158_to_140_failure_filter_and_140_to_122_candidate_found`
- raw_surface_count: `158`
- stage_a_rejected_count: `18`
- scaffold_140_count: `140`
- sample_in_scaffold_count: `7`
- stage_b_candidate_found: `True`
- theory_claim: `False`

## Reading

The first-stage reflection filter is recovered: a 158-row raw proposal surface loses an 18-row source_inside_failure_proxy family, leaving the 140-row scaffold seen in 049. A second-stage 140-to-122 filter candidate was also found and should be exported next.

## Boundary

This is a two-stage filter audit only. It does not export the full 122 rowset and does not claim row-level derivation completion, native derivation completion, closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification.

Next ascent target: export the candidate retained 122 rowset and test disjointness with the 110 seed and 66 contrast residue.
