# Gap A Mode 2 mirror return rule audit 001

Status: gap_a_mode2_mirror_return_rule_projection_symmetric_not_source_derived

## Boundary

- This does not close Gap A.
- The mirror return rule is source-backed columnwise but not source-derived.
- Projection symmetry support is not the same as a full 900 carrier-to-WXYZTI generator.
- The audit ranks tested return rules but does not prove uniqueness outside the tested family.
- No physical interpretation is claimed.

## Summary

- audit_result: "mirror_return_projection_symmetric_source_backed_not_source_derived"
- gap_a_closed: false
- selected_return_rule: "mirror_2_minus_cycle"
- mirror_audit_score: 14
- mirror_reverse_boundary_pair: true
- mirror_central_palindrome: true
- mirror_endpoint_swap_0_2_fixed_1: true
- mirror_boundary_preimage_pair: true
- mirror_unique_reverse_boundary: true
- mirror_unique_boundary_preimage: true
- mirror_zero_turn_rows: [3, 4, 9, 15, 16]
- mirror_preimage_turn_rows: [3, 16]
- mirror_stable_turn_rows: [4, 9, 15]
- mirror_turn_rows_source_complete: true
- source_derivation_found: false
- projection_symmetry_support: true
- claim_closes_gap_a: false

## Positive evidence

- Mode 2 makes the turn block explicit as ZT, TI, IT, TZ.
- Mirror return gives endpoint swap 0 <-> 2 with fixed center 1.
- Mirror return makes the start-0 path the reverse of the start-2 path.
- Mirror return makes the start-1 path palindromic.
- Mirror return is unique among tested rules for boundary preimage pairing.
- The mirror turn union recovers zero rows [3,4,9,15,16].
- The mirror turn union recovers preimage rows [3,16].
- The mirror turn union recovers stable rows [4,9,15].
- All turn rows are source-backed columnwise.

## Blockers

- The mirror formula is still written over projection/register cycle labels.
- No source-native WXYZTI cycle label has been found in the global carrier source.
- Column-wise source backing is not the same as a source-native grouping rule.
- Row-local source selectors may still be disguised lookup selectors.
- The full 900 carrier-to-WXYZTI row generator remains missing.

## Source derivation tests

- {"interpretation": "The formula return_cycle = 2 - start_cycle is stated in projection/register cycle labels.", "result": true, "test": "mirror_rule_uses_cycle_labels"}
- {"interpretation": "The 30 source-column records contain carrier-law columns, sector pairs, slot edges, and witness modes, but not a native WXYZTI cycle label.", "result": false, "test": "cycle_labels_source_native_in_column_records"}
- {"interpretation": "WX, XY, and IW supports are constant across cycles, so the entry/exit seams do not by themselves identify start cycle.", "result": false, "test": "entry_seams_distinguish_cycles"}
- {"interpretation": "All Mode 2 turn rows have complete source-backed columns.", "result": true, "test": "turn_block_source_backed"}
- {"interpretation": "Among tested return rules, mirror uniquely gives both boundary reversal and boundary preimage pairing.", "result": true, "test": "mirror_unique_among_tested_return_rules"}
- {"interpretation": "No derivation of return_cycle = 2 - start_cycle from the full 900 carrier source is present in this artifact.", "result": false, "test": "full_source_native_derivation_found"}

## Variant audit table

- {"audit_score": 14, "boundary_preimage_pair": true, "central_palindrome": true, "endpoint_swap_0_2_fixed_1": true, "preimage_pair_start_cycles": [0, 2], "preimage_turn_rows": [3, 16], "return_map": {"0": 2, "1": 1, "2": 0}, "return_rule": "mirror_2_minus_cycle", "reverse_boundary_pair": true, "stable_turn_rows": [4, 9, 15], "turn_rows": [3, 4, 9, 10, 15, 16], "turn_rows_source_complete": true, "zero_turn_rows": [3, 4, 9, 15, 16]}
- {"audit_score": 6, "boundary_preimage_pair": false, "central_palindrome": true, "endpoint_swap_0_2_fixed_1": false, "preimage_pair_start_cycles": [], "preimage_turn_rows": [3, 16], "return_map": {"0": 0, "1": 1, "2": 2}, "return_rule": "same_cycle", "reverse_boundary_pair": false, "stable_turn_rows": [4, 9, 15], "turn_rows": [3, 4, 9, 10, 15, 16], "turn_rows_source_complete": true, "zero_turn_rows": [3, 4, 9, 15, 16]}
- {"audit_score": 4, "boundary_preimage_pair": false, "central_palindrome": false, "endpoint_swap_0_2_fixed_1": false, "preimage_pair_start_cycles": [2], "preimage_turn_rows": [3, 16], "return_map": {"0": 1, "1": 2, "2": 0}, "return_rule": "next_cycle_mod3", "reverse_boundary_pair": false, "stable_turn_rows": [4, 9, 15], "turn_rows": [3, 4, 9, 10, 15, 16], "turn_rows_source_complete": true, "zero_turn_rows": [3, 4, 9, 15, 16]}
- {"audit_score": 4, "boundary_preimage_pair": false, "central_palindrome": false, "endpoint_swap_0_2_fixed_1": false, "preimage_pair_start_cycles": [0], "preimage_turn_rows": [3, 16], "return_map": {"0": 2, "1": 0, "2": 1}, "return_rule": "prev_cycle_mod3", "reverse_boundary_pair": false, "stable_turn_rows": [4, 9, 15], "turn_rows": [3, 4, 9, 10, 15, 16], "turn_rows_source_complete": true, "zero_turn_rows": [3, 4, 9, 15, 16]}

## Claim

- does_this_close_gap_a: false
- does_this_support_mode2_mirror_return: true
- does_this_source_derive_mirror_return: false
- does_this_construct_full_900_carrier_to_register_map: false
- short_form: "Mode 2 mirror return is strongly supported as projection symmetry with source-backed turn rows, but it is not yet source-derived."
- not_closed_reason: "The formula return_cycle = 2 - start_cycle still depends on projection/register cycle labels."

## Interpretation

- main_result: The mirror rule is the best tested Mode 2 return candidate, but it remains projection-level.
- why_it_matters: It explains why the boundary starts 0 and 2 carry the full preimage pair while start 1 folds through the central hinge.
- row10_signal: Row 10 remains the central nonzero TI hinge inside the Mode 2 turn neighborhood.
- remaining_gap: Derive the mirror cycle relation from source carrier structure, not from row labels.
- next_move: Search for a source-side involution or reflection on carrier columns that induces cycle map 0 <-> 2 and fixes 1.

## Checks

- PASS mode2_exploration_loaded: gap_a_mode2_wxyztitzyxw_return_path_candidate_found_not_closure
- PASS row_grouping_inference_loaded: gap_a_row_grouping_rule_inference_row_local_selectors_complete_not_global
- PASS upstreamed_supports_loaded: gap_a_projection_row_supports_upstreamed_columnwise_complete_not_generator
- PASS distilled_rule_loaded: gap_a_projection_row_generator_rule_distilled_not_source_native
- PASS boundary_theorem_loaded: gap_a_boundary_theorem_note_recorded
- PASS mirror_is_top_scored_variant: mirror_2_minus_cycle
- PASS mirror_reverse_boundary_pair: [0, 1, 2, 3, 4, 16, 15, 14, 13, 12]
- PASS mirror_central_palindrome: [6, 7, 8, 9, 10, 10, 9, 8, 7, 6]
- PASS mirror_unique_boundary_preimage: ["mirror_2_minus_cycle"]
- PASS mirror_turn_rows_source_complete: [3, 4, 9, 10, 15, 16]
- PASS source_derivation_not_claimed: no source-native derivation found
- PASS gap_a_not_closed: audit only

## Next script

    search_gap_a_source_side_involution_for_mode2_mirror_001.py
