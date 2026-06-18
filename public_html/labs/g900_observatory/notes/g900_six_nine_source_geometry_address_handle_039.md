# g900_six_nine_source_geometry_address_handle_039

Status: `source_geometry_address_handle_core_law_recorded`

## Purpose

038 found that the source_geometry path handle is target-only but too broad. This audit tests whether the exact 298-row core is the address-level source_geometry handle, while surplus rows are context-only inherited handles.

## Result

- audit_pass: `True`
- handle_status: `address_level_source_geometry_handle_recovers_298_row_core`
- true_source_row_count: `702`
- path_handle_row_count: `332`
- address_handle_row_count: `298`
- context_only_handle_row_count: `34`
- address_handle_contrast_count: `0`
- context_only_handle_contrast_count: `0`
- address_exact_core: `True`
- context_only_is_surplus: `True`
- path_decomposes_cleanly: `True`
- theory_claim: `False`

## Reading

The overbroad source_geometry path handle from 038 decomposes cleanly. The address-level handle, where source_geometry appears in the artifact or row address, recovers the 298-row target core with zero contrasts. The remaining path-handle rows are context-only surplus targets, not contrast rows. This derives the 037 selector one layer lower as an address-level source_geometry provenance handle, but does not yet derive why source construction creates that address handle.

## Boundary

This is a source_geometry address-handle audit only. It does not claim native derivation completion, closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification.

Next ascent target: derive why source construction creates the address-level source_geometry handle.
