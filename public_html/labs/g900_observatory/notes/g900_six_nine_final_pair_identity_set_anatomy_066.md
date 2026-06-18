# g900_six_nine_final_pair_identity_set_anatomy_066

Status: `final_pair_identity_set_anatomy_recorded`

## Purpose

065 showed that neither admitting nor excluding the two orphan rows closed pair identity. This audit extracts the actual pair-id sets for target and union branches and lists the rows producing the remaining target-only or union-only pair IDs.

## Result

- audit_pass: `True`
- pair_set_status: `only_union_none_pair_id_remains`
- target_058_count: `298`
- candidate_122_count: `122`
- union_candidate_count: `26`
- best_branch: `orphan_exclude`
- best_pair_id_symdiff_count: `1`
- best_target_only_pair_ids: `[]`
- best_union_only_pair_ids: `[None]`
- theory_claim: `False`

## Reading

The best branch leaves only a union-side null pair identity. This means the final obstruction is not the six-nine pair itself but an unpaired/null component row still entering the union.

## Boundary

This is pair-identity set anatomy only. It does not repair the union, complete row-level derivation, or claim native derivation, closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification.

Next ascent target: inspect the unpaired/null union component and derive a stricter union component filter.
