# g900_six_nine_one_row_correction_probe_058

Status: `one_row_correction_candidate_exported`

## Purpose

057 showed that the visible pair=[6,9] shell gives a near replay of the 040 target split: 297 target-like rows and 35 surplus rows, instead of 298 and 34. This audit looks for a one-row surplus promotion that turns 297+35 into 298+34.

## Result

- audit_pass: `True`
- correction_status: `visible_297_35_shell_has_one_row_promotion_to_298_34`
- shell_count: `332`
- one_row_correction_candidate_count: `12`
- chosen corrected_target_count: `298`
- chosen corrected_surplus_count: `34`
- promotion_reason: `unique_surplus_foundation_value`
- promotion_feature: `{'feature': 'context_summary.nonfoundation_packet_keys', 'value': '["anchor", "source_endpoints", "source_limit_start", "source_side_gap"]'}`
- candidate_target_csv_path: `public_html/labs/g900_observatory/artifacts/csv/g900_six_nine_one_row_correction_probe_058_candidate_target_rows.v1.csv`
- theory_claim: `False`

## Reading

The visible pair=[6,9] shell contains a stable 297/35 split. A one-row correction candidate promotes one surplus row into the target, yielding 298 target rows and 34 surplus rows. This matches the 040 target count but remains a candidate until compared against source-native 040 export or the 110+122+66 union.

## Boundary

This is a one-row correction candidate only. It does not prove the corrected row belongs to the 040 target, does not compare against the 110+122+66 union, and does not claim row-level union completion, native derivation, closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification.

Next ascent target: compare the 058 corrected 298 target candidate against the 053/052 110+122+66 row-level unions.
