# Internalization ratchet overdrive-settle 001

Status: internalization_ratchet_overdrive_settle_signal_supported_not_full_g900

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This tests a source-shell/register ratchet signal, not a full 900-state evaluator.
- Overdrive shell counts are finite proxies, not physical expansion.
- No physical interpretation is claimed.

## Summary

- search_result: "internalization_ratchet_overdrive_settle_signal_supported_not_full_g900"
- gap_a_closed: false
- full_g900_admission_found: false
- background_count: 120
- admitted_count: 4
- admitted_keys: ["11|7|14|23,24", "13|9|10|28,29", "2|1|0|0,4", "4|3|2|7,10"]
- admitted_columns: [0, 4, 7, 10, 23, 24, 28, 29]
- ratchet_blocks_reversal: true
- reverse_report_count: 4
- overshoot_seen: true
- touch_stable_all_radii: true
- contained_stable_after_r0: true
- trace_preserved_all_radii: true
- overdrive_shells: [{"contained_loose_count": 6, "contained_path_count": 10, "contained_settles_to_admitted": true, "radius": 0, "settled_contained_count": 4, "settled_touch_count": 4, "shell_column_count": 8, "touch_loose_count": 50, "touch_path_count": 54, "touch_settles_to_admitted": true}, {"contained_loose_count": 92, "contained_path_count": 96, "contained_settles_to_admitted": true, "radius": 1, "settled_contained_count": 4, "settled_touch_count": 4, "shell_column_count": 27, "touch_loose_count": 116, "touch_path_count": 120, "touch_settles_to_admitted": true}, {"contained_loose_count": 116, "contained_path_count": 120, "contained_settles_to_admitted": true, "radius": 2, "settled_contained_count": 4, "settled_touch_count": 4, "shell_column_count": 30, "touch_loose_count": 116, "touch_path_count": 120, "touch_settles_to_admitted": true}, {"contained_loose_count": 116, "contained_path_count": 120, "contained_settles_to_admitted": true, "radius": 3, "settled_contained_count": 4, "settled_touch_count": 4, "shell_column_count": 30, "touch_loose_count": 116, "touch_path_count": 120, "touch_settles_to_admitted": true}, {"contained_loose_count": 116, "contained_path_count": 120, "contained_settles_to_admitted": true, "radius": 4, "settled_contained_count": 4, "settled_touch_count": 4, "shell_column_count": 30, "touch_loose_count": 116, "touch_path_count": 120, "touch_settles_to_admitted": true}]
- claim_closes_gap_a: false

## Interpretation

- main_result: The internalization ratchet signal is supported: admitted traces pass, reversals are blocked, overdrive expands, and settling preserves the admitted residue.
- why_this_matters: This tests the idea that closure is not simple reversal at 900, but return after trace-preserving overdrive and settling.
- why_not_full_g900: This is a source-shell/register overdrive-settle signal. It does not prove a full 900-state return cycle or an independent witness layer.
- next_move: Record the internalization ratchet boundary, then decide whether to build a larger overdrive carrier model.

## Reverse reports

- {"forward_key": "2|1|0|0,4", "forward_row_hit_count_r1": 19, "reverse_admitted": false, "reverse_exists": true, "reverse_key": "0|1|2|0,4", "reverse_proper_internalization": true, "reverse_row_hit_count_r1": 19, "reverse_source_shell_polarity": false}
- {"forward_key": "4|3|2|7,10", "forward_row_hit_count_r1": 21, "reverse_admitted": false, "reverse_exists": true, "reverse_key": "2|3|4|7,10", "reverse_proper_internalization": true, "reverse_row_hit_count_r1": 21, "reverse_source_shell_polarity": false}
- {"forward_key": "11|7|14|23,24", "forward_row_hit_count_r1": 6, "reverse_admitted": false, "reverse_exists": true, "reverse_key": "14|7|11|23,24", "reverse_proper_internalization": true, "reverse_row_hit_count_r1": 6, "reverse_source_shell_polarity": false}
- {"forward_key": "13|9|10|28,29", "forward_row_hit_count_r1": 6, "reverse_admitted": false, "reverse_exists": true, "reverse_key": "10|9|13|28,29", "reverse_proper_internalization": true, "reverse_row_hit_count_r1": 6, "reverse_source_shell_polarity": false}

## Overdrive shell summaries

- {"contained_loose_count": 6, "contained_path_count": 10, "contained_settles_to_admitted": true, "radius": 0, "settled_contained_count": 4, "settled_touch_count": 4, "shell_column_count": 8, "touch_loose_count": 50, "touch_path_count": 54, "touch_settles_to_admitted": true}
- {"contained_loose_count": 92, "contained_path_count": 96, "contained_settles_to_admitted": true, "radius": 1, "settled_contained_count": 4, "settled_touch_count": 4, "shell_column_count": 27, "touch_loose_count": 116, "touch_path_count": 120, "touch_settles_to_admitted": true}
- {"contained_loose_count": 116, "contained_path_count": 120, "contained_settles_to_admitted": true, "radius": 2, "settled_contained_count": 4, "settled_touch_count": 4, "shell_column_count": 30, "touch_loose_count": 116, "touch_path_count": 120, "touch_settles_to_admitted": true}
- {"contained_loose_count": 116, "contained_path_count": 120, "contained_settles_to_admitted": true, "radius": 3, "settled_contained_count": 4, "settled_touch_count": 4, "shell_column_count": 30, "touch_loose_count": 116, "touch_path_count": 120, "touch_settles_to_admitted": true}
- {"contained_loose_count": 116, "contained_path_count": 120, "contained_settles_to_admitted": true, "radius": 4, "settled_contained_count": 4, "settled_touch_count": 4, "shell_column_count": 30, "touch_loose_count": 116, "touch_path_count": 120, "touch_settles_to_admitted": true}

## Claim

- does_this_close_gap_a: false
- does_this_support_internalization_ratchet_signal: true
- does_this_find_full_g900_admission: false
- short_form: "The internalization ratchet signal is supported: admitted traces pass, reversals are blocked, overdrive expands, and settling preserves the admitted residue."
- not_closed_reason: "This is a source-shell/register overdrive-settle signal. It does not prove a full 900-state return cycle or an independent witness layer."
- next_problem: "Record the internalization ratchet boundary, then decide whether to build a larger overdrive carrier model."

## Checks

- PASS local_boundary_loaded: local_g900_shaped_admission_boundary_recorded
- PASS return_trace_loaded: local_admission_predicate_return_trace_witness_proxy_supported_not_full_g900
- PASS g900_local_loaded: g900_admission_predicate_local_candidate_exact_background_not_full_g900
- PASS internal_audit_loaded: proper_internalization_gate_survives_audit_register_internal_not_generator
- PASS background_count_120: 120
- PASS admitted_count_4: 4
- PASS ratchet_blocks_reversal: [{'forward_key': '2|1|0|0,4', 'reverse_key': '0|1|2|0,4', 'reverse_exists': True, 'reverse_admitted': False, 'reverse_source_shell_polarity': False, 'reverse_proper_internalization': True, 'forward_row_hit_count_r1': 19, 'reverse_row_hit_count_r1': 19}, {'forward_key': '4|3|2|7,10', 'reverse_key': '2|3|4|7,10', 'reverse_exists': True, 'reverse_admitted': False, 'reverse_source_shell_polarity': False, 'reverse_proper_internalization': True, 'forward_row_hit_count_r1': 21, 'reverse_row_hit_count_r1': 21}, {'forward_key': '11|7|14|23,24', 'reverse_key': '14|7|11|23,24', 'reverse_exists': True, 'reverse_admitted': False, 'reverse_source_shell_polarity': False, 'reverse_proper_internalization': True, 'forward_row_hit_count_r1': 6, 'reverse_row_hit_count_r1': 6}, {'forward_key': '13|9|10|28,29', 'reverse_key': '10|9|13|28,29', 'reverse_exists': True, 'reverse_admitted': False, 'reverse_source_shell_polarity': False, 'reverse_proper_internalization': True, 'forward_row_hit_count_r1': 6, 'reverse_row_hit_count_r1': 6}]
- PASS overshoot_seen: touch shell expands beyond admitted
- PASS touch_stable_all_radii: settled touch keys stay admitted
- PASS trace_preserved_all_radii: admitted keys preserved
- PASS not_full_g900: False
- PASS gap_a_not_closed: ratchet search only

## Next script

    record_internalization_ratchet_boundary_001.py
