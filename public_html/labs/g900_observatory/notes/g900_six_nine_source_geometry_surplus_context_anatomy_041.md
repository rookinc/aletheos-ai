# g900_six_nine_source_geometry_surplus_context_anatomy_041

Status: `source_geometry_surplus_context_anatomy_recorded`

## Purpose

039 separated the source_geometry path handle into a 298-row address core and 34 context-only surplus rows. This audit inspects the stored row samples while 040 runs a heavier material selector search.

## Result

- audit_pass: `True`
- anatomy_status: `address_core_and_context_surplus_show_context_differences`
- stored_address_sample_count: `30`
- stored_surplus_sample_count: `30`
- surplus_only_context_keys: `['evidence_key.inside_moving_endpoint', 'evidence_key.ladder', 'evidence_key.phase_step_mod15', 'evidence_key.source_endpoints', 'evidence_key.source_limit_start', 'evidence_key.source_side_gap', 'has_ladder', 'has_limit_start', 'is_target_foundation_packet', 'ladder', 'nonfoundation_packet_keys', 'packet.inside_moving_endpoint', 'packet.ladder', 'packet.phase_step_mod15', 'packet.source_endpoints', 'packet.source_limit_start', 'packet.source_side_gap', 'packet_field_count', 'prior_007_base_source_geometry_packet_hold_found', 'source_side_gap']`
- address_only_context_keys: `['broken_ladder', 'full_packet_row_count', 'is_target_source_gap', 'ladder_approaches_root_by_step_3', 'nonleaky_full_packet_row_count', 'phase_ladder_distinct', 'phase_ladder_values', 'source_geometry_origin_candidate_found', 'source_side_gap_signature', 'source_side_gaps', 'strictly_increasing_ladder', 'strong_source_packet_row_count', 'target_ladder']`
- strong_anatomy_signal: `True`
- theory_claim: `False`

## Reading

The stored 039 samples show contextual differences between the 298-row address core and the 34-row context-only surplus shell. This gives a targeted clue for refining 040 if the brute-force material selector misses.

## Boundary

This is a stored-sample surplus context anatomy audit only. It does not claim native derivation completion, exact selector closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification.

Next ascent target: use surplus context anatomy to refine the address-core material selector.
