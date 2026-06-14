# Gap A brute-force selector overfit audit 001

Status: gap_a_bruteforce_selector_overfit_audited_reusable_subgrammar_salvaged_not_generator

## Boundary

- This does not close Gap A.
- The exact selector family is not a source-native row/register generator.
- Singleton-heavy and feature-heavy formulas are treated as overfit evidence.
- Reusable subgrammar may be kept only as a hint for the next generator search.
- Mode 2 mirror remains projection-level evidence and is not promoted here.
- No physical interpretation is claimed.

## Summary

- audit_result: "overfit_audited"
- gap_a_closed: false
- exact_selector_family_found: true
- source_native_generator_found: false
- total_rows: 18
- hard_rows: [3, 4, 5, 8, 9, 11, 15, 16, 17]
- non_path_rows: [5, 8, 9, 11, 15, 16, 17]
- preimage_rows: [3, 16]
- stable_rows: [4, 9, 15]
- zero_rows: [3, 4, 9, 15, 16]
- total_cost: 1153
- singleton_row_count: 11
- singleton_rows: [0, 1, 3, 4, 6, 7, 8, 10, 12, 13, 14]
- distinct_feature_count: 17
- exact_formula_reuse_group_count: 3
- role_cycle_invariant_group_count: 3
- role_cycle_invariant_rows: [0, 1, 5, 6, 7, 11, 12, 13, 17]
- role_cycle_invariant_nonlookup_rows: [5, 11, 17]
- role_cycle_invariant_lookup_like_rows: [0, 1, 6, 7, 12, 13]
- compact_unique_nonlookup_rows: [2, 15, 16]
- composite_unique_nonlookup_rows: [9]
- lookup_like_rows: [3, 4, 8, 10, 14]
- risk_counts: {"high": 5, "low": 3, "medium": 9, "medium_high": 1}
- classification_counts: {"compact_unique_nonlookup_selector": 3, "composite_unique_nonlookup_selector": 1, "lookup_like_selector": 5, "reusable_role_cycle_invariant_but_lookup_like": 6, "reusable_role_cycle_invariant_nonlookup": 3}
- common_features: [["g900_slot_edge.a_mod5", 8], ["g900_slot_edge.a", 4], ["g900_slot_edge.diff_mod15", 4], ["p900_candidate0_edge_law.sector.diff_mod15", 4], ["p900_candidate0_edge_law.label", 4], ["p900_candidate0_edge_law.petersen_b.endpoint", 3]]
- overfit_diagnosis: ["singleton_heavy", "feature_family_heavy", "high_cost", "small_nonlookup_reusable_core"]
- claim_closes_gap_a: false

## Salvaged role-cycle invariant groups

- {"cycles": [0, 1, 2], "formula_cost_each": [56, 56, 56], "has_singleton_terms": true, "role": "WX", "rows": [0, 6, 12], "signature": ["g900_slot_edge.a == 0 AND g900_slot_edge.diff_mod15 == 1"], "support_union": [0], "term_count": 1, "terms": [{"support": [0], "term": "g900_slot_edge.a == 0 AND g900_slot_edge.diff_mod15 == 1", "term_cost": 56}]}
- {"cycles": [0, 1, 2], "formula_cost_each": [56, 56, 56], "has_singleton_terms": true, "role": "XY", "rows": [1, 7, 13], "signature": ["g900_slot_edge.a_mod5 == 1 AND p900_candidate0_edge_law.sector.diff_mod15 == 1"], "support_union": [4], "term_count": 1, "terms": [{"support": [4], "term": "g900_slot_edge.a_mod5 == 1 AND p900_candidate0_edge_law.sector.diff_mod15 == 1", "term_cost": 56}]}
- {"cycles": [0, 1, 2], "formula_cost_each": [45, 45, 45], "has_singleton_terms": false, "role": "IW", "rows": [5, 11, 17], "signature": ["p900_candidate0_edge_law.petersen_b.endpoint == 4 AND p900_candidate0_edge_law.label == \"half_turn\""], "support_union": [1, 7], "term_count": 1, "terms": [{"support": [1, 7], "term": "p900_candidate0_edge_law.petersen_b.endpoint == 4 AND p900_candidate0_edge_law.label == \"half_turn\"", "term_cost": 45}]}

## Row audits compact

- {"classification": "reusable_role_cycle_invariant_but_lookup_like", "columns": [0], "cycle": 0, "formula_cost": 56, "hard_row": false, "overfit_risk": "medium", "role": "WX", "row_ordinal": 0, "singleton_term_count": 1, "term_count": 1, "terms": [{"support": [0], "term": "g900_slot_edge.a == 0 AND g900_slot_edge.diff_mod15 == 1", "term_cost": 56}]}
- {"classification": "reusable_role_cycle_invariant_but_lookup_like", "columns": [4], "cycle": 0, "formula_cost": 56, "hard_row": false, "overfit_risk": "medium", "role": "XY", "row_ordinal": 1, "singleton_term_count": 1, "term_count": 1, "terms": [{"support": [4], "term": "g900_slot_edge.a_mod5 == 1 AND p900_candidate0_edge_law.sector.diff_mod15 == 1", "term_cost": 56}]}
- {"classification": "compact_unique_nonlookup_selector", "columns": [7, 10], "cycle": 0, "formula_cost": 45, "hard_row": false, "overfit_risk": "medium", "role": "YZ", "row_ordinal": 2, "singleton_term_count": 0, "term_count": 1, "terms": [{"support": [7, 10], "term": "g900_slot_edge.cycle_b_5x3 == 0 AND g900_slot_edge.endpoint_mod5 == 3", "term_cost": 45}]}
- {"classification": "lookup_like_selector", "columns": [9], "cycle": 0, "formula_cost": 56, "hard_row": true, "overfit_risk": "high", "role": "ZT", "row_ordinal": 3, "singleton_term_count": 1, "term_count": 1, "terms": [{"support": [9], "term": "g900_slot_edge.a_mod5 == 2 AND p900_candidate0_edge_law.petersen_b.b_mod5 == 3", "term_cost": 56}]}
- {"classification": "lookup_like_selector", "columns": [13], "cycle": 0, "formula_cost": 56, "hard_row": true, "overfit_risk": "high", "role": "TI", "row_ordinal": 4, "singleton_term_count": 1, "term_count": 1, "terms": [{"support": [13], "term": "g900_slot_edge.a_mod5 == 4 AND p900_candidate0_edge_law.label == \"half_turn\"", "term_cost": 56}]}
- {"classification": "reusable_role_cycle_invariant_nonlookup", "columns": [1, 7], "cycle": 0, "formula_cost": 45, "hard_row": true, "overfit_risk": "low", "role": "IW", "row_ordinal": 5, "singleton_term_count": 0, "term_count": 1, "terms": [{"support": [1, 7], "term": "p900_candidate0_edge_law.petersen_b.endpoint == 4 AND p900_candidate0_edge_law.label == \"half_turn\"", "term_cost": 45}]}
- {"classification": "reusable_role_cycle_invariant_but_lookup_like", "columns": [0], "cycle": 1, "formula_cost": 56, "hard_row": false, "overfit_risk": "medium", "role": "WX", "row_ordinal": 6, "singleton_term_count": 1, "term_count": 1, "terms": [{"support": [0], "term": "g900_slot_edge.a == 0 AND g900_slot_edge.diff_mod15 == 1", "term_cost": 56}]}
- {"classification": "reusable_role_cycle_invariant_but_lookup_like", "columns": [4], "cycle": 1, "formula_cost": 56, "hard_row": false, "overfit_risk": "medium", "role": "XY", "row_ordinal": 7, "singleton_term_count": 1, "term_count": 1, "terms": [{"support": [4], "term": "g900_slot_edge.a_mod5 == 1 AND p900_candidate0_edge_law.sector.diff_mod15 == 1", "term_cost": 56}]}
- {"classification": "lookup_like_selector", "columns": [1, 3, 22], "cycle": 1, "formula_cost": 111, "hard_row": true, "overfit_risk": "high", "role": "YZ", "row_ordinal": 8, "singleton_term_count": 1, "term_count": 2, "terms": [{"support": [1, 3], "term": "g900_slot_edge.a == 0 AND g900_slot_edge.distance_mod15 == 4", "term_cost": 45}, {"support": [22], "term": "g900_slot_edge.a_mod5 == 2 AND p900_candidate0_edge_law.petersen_b.b == 5", "term_cost": 56}]}
- {"classification": "composite_unique_nonlookup_selector", "columns": [9, 11, 14], "cycle": 1, "formula_cost": 90, "hard_row": true, "overfit_risk": "medium_high", "role": "ZT", "row_ordinal": 9, "singleton_term_count": 0, "term_count": 2, "terms": [{"support": [9, 11], "term": "p900_candidate0_edge_law.petersen_b.sum_mod15 == 11", "term_cost": 35}, {"support": [11, 14], "term": "g900_slot_edge.diff_mod15 == 10 AND p900_candidate0_edge_law.petersen_a.endpoint == 4", "term_cost": 45}]}
- {"classification": "lookup_like_selector", "columns": [10, 11], "cycle": 1, "formula_cost": 122, "hard_row": false, "overfit_risk": "high", "role": "TI", "row_ordinal": 10, "singleton_term_count": 2, "term_count": 2, "terms": [{"support": [11], "term": "g900_slot_edge.a_mod5 == 3 AND p900_candidate0_edge_law.petersen_b.b_mod5 == 3", "term_cost": 56}, {"support": [10], "term": "g900_slot_edge.cycle_b_5x3 == 0 AND g900_slot_edge.a_mod5 == 3", "term_cost": 56}]}
- {"classification": "reusable_role_cycle_invariant_nonlookup", "columns": [1, 7], "cycle": 1, "formula_cost": 45, "hard_row": true, "overfit_risk": "low", "role": "IW", "row_ordinal": 11, "singleton_term_count": 0, "term_count": 1, "terms": [{"support": [1, 7], "term": "p900_candidate0_edge_law.petersen_b.endpoint == 4 AND p900_candidate0_edge_law.label == \"half_turn\"", "term_cost": 45}]}
- {"classification": "reusable_role_cycle_invariant_but_lookup_like", "columns": [0], "cycle": 2, "formula_cost": 56, "hard_row": false, "overfit_risk": "medium", "role": "WX", "row_ordinal": 12, "singleton_term_count": 1, "term_count": 1, "terms": [{"support": [0], "term": "g900_slot_edge.a == 0 AND g900_slot_edge.diff_mod15 == 1", "term_cost": 56}]}
- {"classification": "reusable_role_cycle_invariant_but_lookup_like", "columns": [4], "cycle": 2, "formula_cost": 56, "hard_row": false, "overfit_risk": "medium", "role": "XY", "row_ordinal": 13, "singleton_term_count": 1, "term_count": 1, "terms": [{"support": [4], "term": "g900_slot_edge.a_mod5 == 1 AND p900_candidate0_edge_law.sector.diff_mod15 == 1", "term_cost": 56}]}
- {"classification": "lookup_like_selector", "columns": [4, 5], "cycle": 2, "formula_cost": 122, "hard_row": false, "overfit_risk": "high", "role": "YZ", "row_ordinal": 14, "singleton_term_count": 2, "term_count": 2, "terms": [{"support": [5], "term": "g900_slot_edge.a_mod5 == 1 AND g900_slot_edge.b_mod5 == 1", "term_cost": 56}, {"support": [4], "term": "g900_slot_edge.a_mod5 == 1 AND p900_candidate0_edge_law.sector.diff_mod15 == 1", "term_cost": 56}]}
- {"classification": "compact_unique_nonlookup_selector", "columns": [21, 22], "cycle": 2, "formula_cost": 35, "hard_row": true, "overfit_risk": "medium", "role": "ZT", "row_ordinal": 15, "singleton_term_count": 0, "term_count": 1, "terms": [{"support": [21, 22], "term": "p900_candidate0_edge_law.petersen_a.sum_mod15 == 11", "term_cost": 35}]}
- {"classification": "compact_unique_nonlookup_selector", "columns": [13, 15], "cycle": 2, "formula_cost": 45, "hard_row": true, "overfit_risk": "medium", "role": "TI", "row_ordinal": 16, "singleton_term_count": 0, "term_count": 1, "terms": [{"support": [13, 15], "term": "p900_candidate0_edge_law.petersen_a.b_mod5 == 0 AND p900_candidate0_edge_law.petersen_b.a_mod5 == 0", "term_cost": 45}]}
- {"classification": "reusable_role_cycle_invariant_nonlookup", "columns": [1, 7], "cycle": 2, "formula_cost": 45, "hard_row": true, "overfit_risk": "low", "role": "IW", "row_ordinal": 17, "singleton_term_count": 0, "term_count": 1, "terms": [{"support": [1, 7], "term": "p900_candidate0_edge_law.petersen_b.endpoint == 4 AND p900_candidate0_edge_law.label == \"half_turn\"", "term_cost": 45}]}

## Interpretation

- main_result: The exact selector family is overfit as a generator, but it contains a reusable role-cycle invariant subgrammar.
- salvaged_core: The strongest reusable non-lookup core is the IW row selector repeated across cycles: columns [1,7] from half_turn with petersen_b endpoint 4.
- lookup_like_core: WX and XY repeat across cycles, but the formulas are singleton-like and must remain quarantined unless a separate role generator explains them.
- unique_nonlookup_residue: Rows with compact non-lookup selectors may guide the next station-variable grammar, but they are not a generator by themselves.
- why_not_closure: A row-local exact selector can choose the right columns without explaining why those columns are arranged as WXYZTI roles across cycles.
- next_move: Search station-variable grammars that generate roles and cycles together, using the salvaged reusable subgrammar as hints only.

## Claim

- does_this_close_gap_a: false
- does_this_validate_exact_selector_as_generator: false
- does_this_salvage_reusable_subgrammar: true
- does_this_find_iw_nonlookup_core: true
- short_form: "The exact selector family is overfit as a generator, but it contains a reusable role-cycle invariant subgrammar."
- not_closed_reason: "A row-local exact selector can choose the right columns without explaining why those columns are arranged as WXYZTI roles across cycles."
- next_problem: "Search station-variable grammars that generate roles and cycles together, using the salvaged reusable subgrammar as hints only."

## Checks

- PASS bruteforce_loaded: gap_a_bruteforce_wxyzti_register_exact_selector_family_found_not_generator
- PASS column_hypergraph_loaded: gap_a_column_hypergraph_register_generator_candidate_not_found
- PASS derivation_return_loaded: gap_a_wxyzti_register_generator_slot_path_candidate_not_found
- PASS mode2_boundary_loaded: gap_a_mode2_projection_mirror_boundary_note_recorded
- PASS boundary_theorem_loaded: gap_a_boundary_theorem_note_recorded
- PASS all_rows_exact_selector_loaded: True
- PASS overfit_detected: ["singleton_heavy", "feature_family_heavy", "high_cost", "small_nonlookup_reusable_core"]
- PASS reusable_role_cycle_groups_found: 3
- PASS iw_nonlookup_core_found: [5, 11, 17]
- PASS gap_a_not_closed: overfit audit only

## Next script

    sat_gap_a_wxyzti_register_generator_with_station_variables_001.py
