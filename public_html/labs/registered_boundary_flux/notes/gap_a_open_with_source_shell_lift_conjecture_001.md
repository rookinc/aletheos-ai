# Gap A open with source-shell lift conjecture 001

Status: gap_a_open_with_source_shell_lift_conjecture_recorded

## Boundary

- This does not close Gap A.
- This records the active source-shell lift conjecture.
- Single-projection WXYZTI closure remains open.
- No uniform upstairs source-shell rule has been found.
- No source-native projection-family generator has been derived.
- Mode 2 mirror remains projection-level evidence and is not promoted here.
- No physical interpretation is claimed.

## Plateau

Gap A remains open with a localized interior seam obstruction and a surviving source-shell lift conjecture.

- The seam does not close in the projection rows.
- It lifts into the source shell.
- The source shell does not yet speak one uniform upstairs law.
- Single-projection Gap A remains open.
- Source-shell lift is a conjecture, not closure.

## Summary

- gap_a_status: "open"
- record_result: "gap_a_open_with_source_shell_lift_conjecture_recorded"
- single_projection_gap_a_closed: false
- source_native_wxyzti_generator_found: false
- localized_obstruction_found: true
- outer_frame_stable: ["IW", "WX", "XY"]
- interior_turn_unstable: ["TI", "YZ", "ZT"]
- source_shell_lift_signal_survives: true
- uniform_upstairs_rule_found: false
- source_shell_lift_conjecture_active: true
- claim_closes_gap_a: false

## Source-Shell Lift Conjecture

The single WXYZTI projection does not close its interior turn seam. The obstruction lifts to a local source-neighbor shell, where every interior mismatch has a unique length-2 source-slot correction path. However, the current data do not exhibit a uniform upstairs source-shell rule, so this remains a conjecture rather than closure.

Evidence for:

- Outer frame roles WX, XY, and IW stabilize across cycles.
- Interior turn roles YZ, ZT, and TI localize the obstruction.
- All four interior mismatches are unique shortest correction paths.
- All four interior mismatches are covered by local source shell radius 1.

Evidence against closure:

- Neighbor projection rows do not cover all corrections.
- Projection rows do not cover all corrections.
- Only one correction path is support-internal.
- No uniform candidate0 or candidate1 label signature exists.
- No uniform candidate0 or candidate1 shift signature exists.
- No source-native projection-family generator has been derived.

## Closed branches

- {"branch": "simple slot-path generator", "detail": "Rows are not all path-like; non-path rows remain.", "result": "failed", "source_status": "gap_a_wxyzti_register_generator_slot_path_candidate_not_found"}
- {"branch": "simple column hypergraph generator", "detail": "No source-native column-hypergraph register generator was found.", "result": "failed", "source_status": "gap_a_column_hypergraph_register_generator_candidate_not_found"}
- {"branch": "bounded exact selector family", "detail": "All 18 rows were selected exactly, but the family was singleton-heavy and feature-heavy.", "result": "found but rejected as generator", "source_status": "gap_a_bruteforce_wxyzti_register_exact_selector_family_found_not_generator"}
- {"branch": "selector overfit audit", "detail": "IW rows were salvaged as reusable non-lookup subgrammar; selector family was not promoted.", "result": "overfit confirmed; IW hint salvaged", "source_status": "gap_a_bruteforce_selector_overfit_audited_reusable_subgrammar_salvaged_not_generator"}
- {"branch": "strict WXYZTI station variables", "detail": "No strict station-variable generator was found.", "result": "failed", "source_status": "gap_a_station_variable_strict_candidate_not_found"}
- {"branch": "localized station obstruction", "detail": "Outer frame stabilized; obstruction localized to the interior turn seam.", "result": "recorded", "source_status": "gap_a_station_variable_obstruction_recorded"}
- {"branch": "interior turn seam correction paths", "detail": "All four interior mismatches have short source-slot correction paths.", "result": "positive but not closure", "source_status": "gap_a_interior_turn_seam_short_source_correction_candidate_found_not_closure"}
- {"branch": "correction path audit", "detail": "All correction paths are unique length-2 paths, but uniform law did not survive.", "result": "projection-fit risk remains", "source_status": "gap_a_interior_turn_correction_paths_audited_projection_fit_risk_remains"}
- {"branch": "upstairs neighbor projection cover", "detail": "Neighbor projection rows cover only part of the corrections; source shell radius 1 covers all.", "result": "partial row cover; full source-shell cover", "source_status": "gap_a_upstairs_source_shell_candidate_found_not_closure"}
- {"branch": "source-shell uniformity audit", "detail": "Source-shell lift signal survives, but no uniform label or shift rule was found.", "result": "source-shell signal survives; no uniform upstairs rule", "source_status": "gap_a_upstairs_source_shell_uniformity_audited_no_uniform_rule"}

## Positive residue

{
  "correction_path_survival": {
    "all_length_2": true,
    "all_unique_shortest": true,
    "mismatch_count": 4,
    "unique_shortest_column_path_count": 4
  },
  "interior_turn_unstable": [
    "TI",
    "YZ",
    "ZT"
  ],
  "localized_obstruction": {
    "best_mismatch_by_cycle": {
      "0": 2,
      "1": 1,
      "2": 1
    },
    "mismatch_by_role_pair": {
      "XY->YZ": 1,
      "YZ->ZT": 2,
      "ZT->TI": 1
    },
    "mismatch_by_station": {
      "T": 1,
      "Y": 1,
      "Z": 2
    }
  },
  "outer_frame_stable": [
    "IW",
    "WX",
    "XY"
  ],
  "source_shell_lift_signal": {
    "all_length_2": true,
    "all_local_source_shell_1_cover": true,
    "all_unique_shortest": true,
    "source_shell_signal": true
  }
}

## Blocked promotions

- Do not call Gap A closed.
- Do not call the exact selector family a generator.
- Do not call the correction paths a source-native seam law.
- Do not call source-shell coverage upstairs closure.
- Do not promote Mode 2 mirror to source law.
- Do not attach physical interpretation.

## Allowed next work

- Treat source-shell lift as an explicit conjecture.
- Search for a richer source-native projection-family generator later.
- Use the stable outer frame as partial register structure.
- Use the interior turn seam as the next target.
- Use this record as the plateau boundary for the current Gap A branch.

## Interpretation

- main_result: Gap A remains open, but now with a precise source-shell lift conjecture.
- what_we_learned: The obstruction is not global confusion; it is localized at the interior turn seam and source-shell reachable.
- why_not_closure: Source-shell reachability is weaker than a source-native register generator.
- why_this_is_useful: The next search can target a projection-family/source-shell generator instead of refighting local selectors.
- next_move: Stop this branch as an open plateau, or begin a new branch dedicated to source-shell projection-family generation.

## Claim

- does_this_close_gap_a: false
- does_this_record_gap_a_open: true
- does_this_record_source_shell_lift_conjecture: true
- does_this_find_uniform_upstairs_rule: false
- does_this_find_source_native_generator: false
- short_form: "Gap A remains open with a localized interior seam obstruction and a surviving source-shell lift conjecture."
- not_closed_reason: "Source-shell reachability is weaker than a source-native register generator."
- next_problem: "Stop this branch as an open plateau, or begin a new branch dedicated to source-shell projection-family generation."

## Checks

- PASS uniformity_loaded: gap_a_upstairs_source_shell_uniformity_audited_no_uniform_rule
- PASS upstairs_loaded: gap_a_upstairs_source_shell_candidate_found_not_closure
- PASS correction_audit_loaded: gap_a_interior_turn_correction_paths_audited_projection_fit_risk_remains
- PASS interior_seam_loaded: gap_a_interior_turn_seam_short_source_correction_candidate_found_not_closure
- PASS station_obstruction_loaded: gap_a_station_variable_obstruction_recorded
- PASS station_search_loaded: gap_a_station_variable_strict_candidate_not_found
- PASS overfit_audit_loaded: gap_a_bruteforce_selector_overfit_audited_reusable_subgrammar_salvaged_not_generator
- PASS bruteforce_loaded: gap_a_bruteforce_wxyzti_register_exact_selector_family_found_not_generator
- PASS column_hypergraph_loaded: gap_a_column_hypergraph_register_generator_candidate_not_found
- PASS derivation_return_loaded: gap_a_wxyzti_register_generator_slot_path_candidate_not_found
- PASS boundary_theorem_loaded: gap_a_boundary_theorem_note_recorded
- PASS gap_a_open: open
- PASS source_shell_signal_survives: True
- PASS uniform_rule_not_found: False
- PASS no_closure_claim: plateau record only

## Next script

    start_source_shell_projection_family_generator_branch_001.py
