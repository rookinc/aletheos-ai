# g900_six_nine_040_missing_selector_replay_056

Status: `040_missing_selector_replay_not_found`

## Purpose

055 failed because it searched only present feature-value selectors. Inspection of 040 showed the best material selector is a missing-feature rule: `context.context.ladder` missing and `context.is_target_foundation_packet` missing. This audit replays that selector inside the exact 332 path-handle shell.

## Result

- audit_pass: `False`
- replay_status: `missing_missing_selector_did_not_replay_target`
- selector_features: `['context.context.ladder', 'context.is_target_foundation_packet']`
- selector_positive_value: `['"__MISSING__"', '"__MISSING__"']`
- exact_332_shell_candidate_count: `2`
- replay_332_to_298_hit_count: `0`
- exported_target_count: `0`
- address_sample_match_count: `0` of `20`
- context_sample_exclusion_count: `20` of `20`
- csv_path: `None`
- theory_claim: `False`

## Reading

The 040 missing/missing selector could not be replayed against the visible 332 shell. This keeps the 040 target export open and points to a source encoding mismatch.

## Boundary

This exports the 040 material target rowset by replaying the 040 selector. It does not yet compare the target against the 110+122+66 unions and does not claim row-level union completion, native derivation, closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification.

Next ascent target: inspect source encoding for the 040 path-handle shell and missing selector.
