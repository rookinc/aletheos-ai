# Gap A Mode 2 WXYZTITZYXW return path exploration 001

Status: gap_a_mode2_wxyztitzyxw_return_path_candidate_found_not_closure

## Boundary

- This does not close Gap A.
- Mode 2 is explored as a projection/register return-path candidate, not a source-native generator.
- The zero/preimage/stable labels are inherited from prior artifacts.
- The result is a candidate explanation for the residual/turn structure, not a proof of the full 900 carrier-to-register map.
- No physical interpretation is claimed.

## Summary

- exploration_result: "mode2_mirror_return_candidate_found_not_closure"
- gap_a_closed: false
- mode2_path: "W-X-Y-Z-T-I-T-Z-Y-X-W"
- turn_leg_indices: [3, 4, 5, 6]
- zero_rows: [3, 4, 9, 15, 16]
- preimage_rows: [3, 16]
- stable_rows: [4, 9, 15]
- selected_return_rule: "mirror_2_minus_cycle"
- selected_all_turn_rows: [3, 4, 9, 10, 15, 16]
- selected_zero_turn_rows: [3, 4, 9, 15, 16]
- selected_preimage_turn_rows: [3, 16]
- selected_stable_turn_rows: [4, 9, 15]
- selected_zero_turn_rows_exact: true
- selected_preimage_turn_rows_exact: true
- selected_stable_turn_rows_exact: true
- selected_preimage_pair_start_cycles: [0, 2]
- selected_boundary_preimage_pair: true
- claim_closes_gap_a: false

## Selected candidate

- name: mode2_mirror_return_candidate
- path: W-X-Y-Z-T-I-T-Z-Y-X-W
- return_rule: return_cycle = 2 - start_cycle
- status: candidate_not_closure
- Mode 2 makes the inscription turn explicit as ZT, TI, IT, TZ.
- Under mirror return, boundary starts 0 and 2 each contain both preimage rows in the turn block.
- The union of Mode 2 turn rows contains exactly the zero/preimage/stable partition after applying the known zero flag.

## Mirror path records

- {"contains_full_preimage_pair": true, "path_rows": [0, 1, 2, 3, 4, 16, 15, 14, 13, 12], "preimage_turn_rows": [3, 16], "return_cycle": 2, "stable_turn_rows": [4, 15], "start_cycle": 0, "turn_rows": [3, 4, 15, 16], "zero_turn_rows": [3, 4, 15, 16]}
- {"contains_full_preimage_pair": false, "path_rows": [6, 7, 8, 9, 10, 10, 9, 8, 7, 6], "preimage_turn_rows": [], "return_cycle": 1, "stable_turn_rows": [9], "start_cycle": 1, "turn_rows": [9, 10], "zero_turn_rows": [9]}
- {"contains_full_preimage_pair": true, "path_rows": [12, 13, 14, 15, 16, 4, 3, 2, 1, 0], "preimage_turn_rows": [3, 16], "return_cycle": 0, "stable_turn_rows": [4, 15], "start_cycle": 2, "turn_rows": [3, 4, 15, 16], "zero_turn_rows": [3, 4, 15, 16]}

## Variant summary

- {"all_turn_rows": [3, 4, 9, 10, 15, 16], "boundary_preimage_pair": false, "preimage_pair_start_cycles": [], "preimage_turn_rows": [3, 16], "return_rule": "same_cycle", "stable_turn_rows": [4, 9, 15], "zero_turn_rows": [3, 4, 9, 15, 16]}
- {"all_turn_rows": [3, 4, 9, 10, 15, 16], "boundary_preimage_pair": false, "preimage_pair_start_cycles": [2], "preimage_turn_rows": [3, 16], "return_rule": "next_cycle_mod3", "stable_turn_rows": [4, 9, 15], "zero_turn_rows": [3, 4, 9, 15, 16]}
- {"all_turn_rows": [3, 4, 9, 10, 15, 16], "boundary_preimage_pair": false, "preimage_pair_start_cycles": [0], "preimage_turn_rows": [3, 16], "return_rule": "prev_cycle_mod3", "stable_turn_rows": [4, 9, 15], "zero_turn_rows": [3, 4, 9, 15, 16]}
- {"all_turn_rows": [3, 4, 9, 10, 15, 16], "boundary_preimage_pair": true, "preimage_pair_start_cycles": [0, 2], "preimage_turn_rows": [3, 16], "return_rule": "mirror_2_minus_cycle", "stable_turn_rows": [4, 9, 15], "zero_turn_rows": [3, 4, 9, 15, 16]}

## Claim

- does_this_close_gap_a: false
- does_this_test_wxyztitzyxw: true
- does_this_find_mode2_candidate: true
- does_this_construct_source_native_generator: false
- short_form: "Mode 2 W-X-Y-Z-T-I-T-Z-Y-X-W with mirror return organizes the ZT/TI turn block and recovers the known zero, preimage, and stable partitions, but it remains a candidate, not closure."
- not_closed_reason: "The return-cycle mirror rule has not yet been derived from the full 900 carrier source."

## Interpretation

- main_result: The Mode 2 turn block ZT, TI, IT, TZ is exactly where the zero/preimage/stable structure lives.
- selected_signal: Mirror return cycle 2 - start_cycle places both preimage rows [3,16] in the same boundary turn block for starts 0 and 2.
- row10_signal: Row 10 is the central TI turn row that lies in the Mode 2 turn neighborhood but is not zero-twisted.
- next_move: Audit whether the mirror return rule can be derived from source-column features or whether it is another projection-level fit.

## Checks

- PASS upstreamed_supports_loaded: gap_a_projection_row_supports_upstreamed_columnwise_complete_not_generator
- PASS row_grouping_inference_loaded: gap_a_row_grouping_rule_inference_row_local_selectors_complete_not_global
- PASS distilled_rule_loaded: gap_a_projection_row_generator_rule_distilled_not_source_native
- PASS boundary_theorem_loaded: gap_a_boundary_theorem_note_recorded
- PASS mode2_path_length_10: 10
- PASS row_table_18: 18
- PASS selected_is_mirror: mirror_2_minus_cycle
- PASS selected_zero_turn_exact: [3, 4, 9, 15, 16]
- PASS selected_preimage_turn_exact: [3, 16]
- PASS selected_stable_turn_exact: [4, 9, 15]
- PASS selected_boundary_preimage_pair: [0, 2]
- PASS gap_a_not_closed: mode2 exploration only

## Next script

    audit_gap_a_mode2_mirror_return_rule_001.py
