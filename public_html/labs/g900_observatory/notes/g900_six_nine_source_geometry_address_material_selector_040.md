# g900_six_nine_source_geometry_address_material_selector_040

Status: `address_handle_material_selector_found`

## Purpose

039 showed that the source_geometry path handle decomposes into a 298-row address core and 34 context-only surplus rows. This audit tests whether safe non-address material fields separate the address core from the surplus shell.

## Result

- audit_pass: `True`
- material_status: `safe_material_features_separate_address_core_from_context_surplus`
- true_source_row_count: `702`
- path_handle_row_count: `332`
- address_handle_row_count: `298`
- context_only_handle_row_count: `34`
- selector_hit_count_vs_path_handle_shell: `45`
- exact_material_selector_vs_path_handle_shell: `True`
- theory_claim: `False`

## Boundary

This is an address-material selector audit only. It does not claim native derivation completion, closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification.

Next ascent target: derive the material selector that creates the source_geometry address core.
