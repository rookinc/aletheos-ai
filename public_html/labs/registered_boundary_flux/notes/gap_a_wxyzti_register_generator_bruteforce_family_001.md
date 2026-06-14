# Gap A WXYZTI register generator brute-force family 001

Status: gap_a_bruteforce_wxyzti_register_exact_selector_family_found_not_generator

## Boundary

- This does not close Gap A.
- This searches exact selector formulas, not a source-native row/register generator.
- A successful selector family is useful only as a benchmark and overfit target.
- Singleton-heavy formulas are treated as lookup-like.
- Mode 2 mirror remains projection-level evidence and is not promoted here.
- No physical interpretation is claimed.

## Summary

- bruteforce_result: "exact_bounded_selector_family_found_not_generator"
- gap_a_closed: false
- source_column_count: 30
- row_count: 18
- non_path_rows: [5, 8, 9, 11, 15, 16, 17]
- preimage_rows: [3, 16]
- stable_rows: [4, 9, 15]
- zero_rows: [3, 4, 9, 15, 16]
- source_native_atom_count: 930
- source_native_term_support_count: 673
- source_native_all_rows_exact: true
- source_native_total_cost: 1153
- source_native_singleton_row_count: 11
- source_native_distinct_feature_count: 17
- broad_atom_count: 1099
- broad_term_support_count: 1072
- broad_all_rows_exact: true
- broad_total_cost: 1101
- primary_solution_kind: "source_native"
- primary_all_rows_exact: true
- primary_exact_rows: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
- primary_total_cost: 1153
- primary_singleton_rows: [0, 1, 3, 4, 6, 7, 8, 10, 12, 13, 14]
- primary_singleton_row_count: 11
- primary_distinct_feature_count: 17
- overfit_flags: ["many_rows_require_singleton_terms", "many_distinct_feature_families"]
- claim_closes_gap_a: false

## Primary row solutions compact

- {"columns": [0], "cycle": 0, "exact_formula_found": true, "features": ["g900_slot_edge.a", "g900_slot_edge.diff_mod15"], "formula_cost": 56, "preimage": false, "role": "WX", "row_ordinal": 0, "singleton_term_count": 1, "stable_complement": false, "term_count": 1, "terms": [{"support": [0], "term": "g900_slot_edge.a == 0 AND g900_slot_edge.diff_mod15 == 1", "term_cost": 56}], "zero_twisted_source_row": false}
- {"columns": [4], "cycle": 0, "exact_formula_found": true, "features": ["g900_slot_edge.a_mod5", "p900_candidate0_edge_law.sector.diff_mod15"], "formula_cost": 56, "preimage": false, "role": "XY", "row_ordinal": 1, "singleton_term_count": 1, "stable_complement": false, "term_count": 1, "terms": [{"support": [4], "term": "g900_slot_edge.a_mod5 == 1 AND p900_candidate0_edge_law.sector.diff_mod15 == 1", "term_cost": 56}], "zero_twisted_source_row": false}
- {"columns": [7, 10], "cycle": 0, "exact_formula_found": true, "features": ["g900_slot_edge.cycle_b_5x3", "g900_slot_edge.endpoint_mod5"], "formula_cost": 45, "preimage": false, "role": "YZ", "row_ordinal": 2, "singleton_term_count": 0, "stable_complement": false, "term_count": 1, "terms": [{"support": [7, 10], "term": "g900_slot_edge.cycle_b_5x3 == 0 AND g900_slot_edge.endpoint_mod5 == 3", "term_cost": 45}], "zero_twisted_source_row": false}
- {"columns": [9], "cycle": 0, "exact_formula_found": true, "features": ["g900_slot_edge.a_mod5", "p900_candidate0_edge_law.petersen_b.b_mod5"], "formula_cost": 56, "preimage": true, "role": "ZT", "row_ordinal": 3, "singleton_term_count": 1, "stable_complement": false, "term_count": 1, "terms": [{"support": [9], "term": "g900_slot_edge.a_mod5 == 2 AND p900_candidate0_edge_law.petersen_b.b_mod5 == 3", "term_cost": 56}], "zero_twisted_source_row": true}
- {"columns": [13], "cycle": 0, "exact_formula_found": true, "features": ["g900_slot_edge.a_mod5", "p900_candidate0_edge_law.label"], "formula_cost": 56, "preimage": false, "role": "TI", "row_ordinal": 4, "singleton_term_count": 1, "stable_complement": true, "term_count": 1, "terms": [{"support": [13], "term": "g900_slot_edge.a_mod5 == 4 AND p900_candidate0_edge_law.label == \"half_turn\"", "term_cost": 56}], "zero_twisted_source_row": true}
- {"columns": [1, 7], "cycle": 0, "exact_formula_found": true, "features": ["p900_candidate0_edge_law.label", "p900_candidate0_edge_law.petersen_b.endpoint"], "formula_cost": 45, "preimage": false, "role": "IW", "row_ordinal": 5, "singleton_term_count": 0, "stable_complement": false, "term_count": 1, "terms": [{"support": [1, 7], "term": "p900_candidate0_edge_law.petersen_b.endpoint == 4 AND p900_candidate0_edge_law.label == \"half_turn\"", "term_cost": 45}], "zero_twisted_source_row": false}
- {"columns": [0], "cycle": 1, "exact_formula_found": true, "features": ["g900_slot_edge.a", "g900_slot_edge.diff_mod15"], "formula_cost": 56, "preimage": false, "role": "WX", "row_ordinal": 6, "singleton_term_count": 1, "stable_complement": false, "term_count": 1, "terms": [{"support": [0], "term": "g900_slot_edge.a == 0 AND g900_slot_edge.diff_mod15 == 1", "term_cost": 56}], "zero_twisted_source_row": false}
- {"columns": [4], "cycle": 1, "exact_formula_found": true, "features": ["g900_slot_edge.a_mod5", "p900_candidate0_edge_law.sector.diff_mod15"], "formula_cost": 56, "preimage": false, "role": "XY", "row_ordinal": 7, "singleton_term_count": 1, "stable_complement": false, "term_count": 1, "terms": [{"support": [4], "term": "g900_slot_edge.a_mod5 == 1 AND p900_candidate0_edge_law.sector.diff_mod15 == 1", "term_cost": 56}], "zero_twisted_source_row": false}
- {"columns": [1, 3, 22], "cycle": 1, "exact_formula_found": true, "features": ["g900_slot_edge.a", "g900_slot_edge.a_mod5", "g900_slot_edge.distance_mod15", "p900_candidate0_edge_law.petersen_b.b"], "formula_cost": 111, "preimage": false, "role": "YZ", "row_ordinal": 8, "singleton_term_count": 1, "stable_complement": false, "term_count": 2, "terms": [{"support": [1, 3], "term": "g900_slot_edge.a == 0 AND g900_slot_edge.distance_mod15 == 4", "term_cost": 45}, {"support": [22], "term": "g900_slot_edge.a_mod5 == 2 AND p900_candidate0_edge_law.petersen_b.b == 5", "term_cost": 56}], "zero_twisted_source_row": false}
- {"columns": [9, 11, 14], "cycle": 1, "exact_formula_found": true, "features": ["g900_slot_edge.diff_mod15", "p900_candidate0_edge_law.petersen_a.endpoint", "p900_candidate0_edge_law.petersen_b.sum_mod15"], "formula_cost": 90, "preimage": false, "role": "ZT", "row_ordinal": 9, "singleton_term_count": 0, "stable_complement": true, "term_count": 2, "terms": [{"support": [9, 11], "term": "p900_candidate0_edge_law.petersen_b.sum_mod15 == 11", "term_cost": 35}, {"support": [11, 14], "term": "g900_slot_edge.diff_mod15 == 10 AND p900_candidate0_edge_law.petersen_a.endpoint == 4", "term_cost": 45}], "zero_twisted_source_row": true}
- {"columns": [10, 11], "cycle": 1, "exact_formula_found": true, "features": ["g900_slot_edge.a_mod5", "g900_slot_edge.cycle_b_5x3", "p900_candidate0_edge_law.petersen_b.b_mod5"], "formula_cost": 122, "preimage": false, "role": "TI", "row_ordinal": 10, "singleton_term_count": 2, "stable_complement": false, "term_count": 2, "terms": [{"support": [11], "term": "g900_slot_edge.a_mod5 == 3 AND p900_candidate0_edge_law.petersen_b.b_mod5 == 3", "term_cost": 56}, {"support": [10], "term": "g900_slot_edge.cycle_b_5x3 == 0 AND g900_slot_edge.a_mod5 == 3", "term_cost": 56}], "zero_twisted_source_row": false}
- {"columns": [1, 7], "cycle": 1, "exact_formula_found": true, "features": ["p900_candidate0_edge_law.label", "p900_candidate0_edge_law.petersen_b.endpoint"], "formula_cost": 45, "preimage": false, "role": "IW", "row_ordinal": 11, "singleton_term_count": 0, "stable_complement": false, "term_count": 1, "terms": [{"support": [1, 7], "term": "p900_candidate0_edge_law.petersen_b.endpoint == 4 AND p900_candidate0_edge_law.label == \"half_turn\"", "term_cost": 45}], "zero_twisted_source_row": false}
- {"columns": [0], "cycle": 2, "exact_formula_found": true, "features": ["g900_slot_edge.a", "g900_slot_edge.diff_mod15"], "formula_cost": 56, "preimage": false, "role": "WX", "row_ordinal": 12, "singleton_term_count": 1, "stable_complement": false, "term_count": 1, "terms": [{"support": [0], "term": "g900_slot_edge.a == 0 AND g900_slot_edge.diff_mod15 == 1", "term_cost": 56}], "zero_twisted_source_row": false}
- {"columns": [4], "cycle": 2, "exact_formula_found": true, "features": ["g900_slot_edge.a_mod5", "p900_candidate0_edge_law.sector.diff_mod15"], "formula_cost": 56, "preimage": false, "role": "XY", "row_ordinal": 13, "singleton_term_count": 1, "stable_complement": false, "term_count": 1, "terms": [{"support": [4], "term": "g900_slot_edge.a_mod5 == 1 AND p900_candidate0_edge_law.sector.diff_mod15 == 1", "term_cost": 56}], "zero_twisted_source_row": false}
- {"columns": [4, 5], "cycle": 2, "exact_formula_found": true, "features": ["g900_slot_edge.a_mod5", "g900_slot_edge.b_mod5", "p900_candidate0_edge_law.sector.diff_mod15"], "formula_cost": 122, "preimage": false, "role": "YZ", "row_ordinal": 14, "singleton_term_count": 2, "stable_complement": false, "term_count": 2, "terms": [{"support": [5], "term": "g900_slot_edge.a_mod5 == 1 AND g900_slot_edge.b_mod5 == 1", "term_cost": 56}, {"support": [4], "term": "g900_slot_edge.a_mod5 == 1 AND p900_candidate0_edge_law.sector.diff_mod15 == 1", "term_cost": 56}], "zero_twisted_source_row": false}
- {"columns": [21, 22], "cycle": 2, "exact_formula_found": true, "features": ["p900_candidate0_edge_law.petersen_a.sum_mod15"], "formula_cost": 35, "preimage": false, "role": "ZT", "row_ordinal": 15, "singleton_term_count": 0, "stable_complement": true, "term_count": 1, "terms": [{"support": [21, 22], "term": "p900_candidate0_edge_law.petersen_a.sum_mod15 == 11", "term_cost": 35}], "zero_twisted_source_row": true}
- {"columns": [13, 15], "cycle": 2, "exact_formula_found": true, "features": ["p900_candidate0_edge_law.petersen_a.b_mod5", "p900_candidate0_edge_law.petersen_b.a_mod5"], "formula_cost": 45, "preimage": true, "role": "TI", "row_ordinal": 16, "singleton_term_count": 0, "stable_complement": false, "term_count": 1, "terms": [{"support": [13, 15], "term": "p900_candidate0_edge_law.petersen_a.b_mod5 == 0 AND p900_candidate0_edge_law.petersen_b.a_mod5 == 0", "term_cost": 45}], "zero_twisted_source_row": true}
- {"columns": [1, 7], "cycle": 2, "exact_formula_found": true, "features": ["p900_candidate0_edge_law.label", "p900_candidate0_edge_law.petersen_b.endpoint"], "formula_cost": 45, "preimage": false, "role": "IW", "row_ordinal": 17, "singleton_term_count": 0, "stable_complement": false, "term_count": 1, "terms": [{"support": [1, 7], "term": "p900_candidate0_edge_law.petersen_b.endpoint == 4 AND p900_candidate0_edge_law.label == \"half_turn\"", "term_cost": 45}], "zero_twisted_source_row": false}

## Hard row solutions

- {"columns": [9], "cycle": 0, "features": ["g900_slot_edge.a_mod5", "p900_candidate0_edge_law.petersen_b.b_mod5"], "formula_cost": 56, "role": "ZT", "row_ordinal": 3, "singleton_term_count": 1, "term_count": 1, "terms": [{"support": [9], "term": "g900_slot_edge.a_mod5 == 2 AND p900_candidate0_edge_law.petersen_b.b_mod5 == 3", "term_cost": 56}]}
- {"columns": [13], "cycle": 0, "features": ["g900_slot_edge.a_mod5", "p900_candidate0_edge_law.label"], "formula_cost": 56, "role": "TI", "row_ordinal": 4, "singleton_term_count": 1, "term_count": 1, "terms": [{"support": [13], "term": "g900_slot_edge.a_mod5 == 4 AND p900_candidate0_edge_law.label == \"half_turn\"", "term_cost": 56}]}
- {"columns": [1, 7], "cycle": 0, "features": ["p900_candidate0_edge_law.label", "p900_candidate0_edge_law.petersen_b.endpoint"], "formula_cost": 45, "role": "IW", "row_ordinal": 5, "singleton_term_count": 0, "term_count": 1, "terms": [{"support": [1, 7], "term": "p900_candidate0_edge_law.petersen_b.endpoint == 4 AND p900_candidate0_edge_law.label == \"half_turn\"", "term_cost": 45}]}
- {"columns": [1, 3, 22], "cycle": 1, "features": ["g900_slot_edge.a", "g900_slot_edge.a_mod5", "g900_slot_edge.distance_mod15", "p900_candidate0_edge_law.petersen_b.b"], "formula_cost": 111, "role": "YZ", "row_ordinal": 8, "singleton_term_count": 1, "term_count": 2, "terms": [{"support": [1, 3], "term": "g900_slot_edge.a == 0 AND g900_slot_edge.distance_mod15 == 4", "term_cost": 45}, {"support": [22], "term": "g900_slot_edge.a_mod5 == 2 AND p900_candidate0_edge_law.petersen_b.b == 5", "term_cost": 56}]}
- {"columns": [9, 11, 14], "cycle": 1, "features": ["g900_slot_edge.diff_mod15", "p900_candidate0_edge_law.petersen_a.endpoint", "p900_candidate0_edge_law.petersen_b.sum_mod15"], "formula_cost": 90, "role": "ZT", "row_ordinal": 9, "singleton_term_count": 0, "term_count": 2, "terms": [{"support": [9, 11], "term": "p900_candidate0_edge_law.petersen_b.sum_mod15 == 11", "term_cost": 35}, {"support": [11, 14], "term": "g900_slot_edge.diff_mod15 == 10 AND p900_candidate0_edge_law.petersen_a.endpoint == 4", "term_cost": 45}]}
- {"columns": [1, 7], "cycle": 1, "features": ["p900_candidate0_edge_law.label", "p900_candidate0_edge_law.petersen_b.endpoint"], "formula_cost": 45, "role": "IW", "row_ordinal": 11, "singleton_term_count": 0, "term_count": 1, "terms": [{"support": [1, 7], "term": "p900_candidate0_edge_law.petersen_b.endpoint == 4 AND p900_candidate0_edge_law.label == \"half_turn\"", "term_cost": 45}]}
- {"columns": [21, 22], "cycle": 2, "features": ["p900_candidate0_edge_law.petersen_a.sum_mod15"], "formula_cost": 35, "role": "ZT", "row_ordinal": 15, "singleton_term_count": 0, "term_count": 1, "terms": [{"support": [21, 22], "term": "p900_candidate0_edge_law.petersen_a.sum_mod15 == 11", "term_cost": 35}]}
- {"columns": [13, 15], "cycle": 2, "features": ["p900_candidate0_edge_law.petersen_a.b_mod5", "p900_candidate0_edge_law.petersen_b.a_mod5"], "formula_cost": 45, "role": "TI", "row_ordinal": 16, "singleton_term_count": 0, "term_count": 1, "terms": [{"support": [13, 15], "term": "p900_candidate0_edge_law.petersen_a.b_mod5 == 0 AND p900_candidate0_edge_law.petersen_b.a_mod5 == 0", "term_cost": 45}]}
- {"columns": [1, 7], "cycle": 2, "features": ["p900_candidate0_edge_law.label", "p900_candidate0_edge_law.petersen_b.endpoint"], "formula_cost": 45, "role": "IW", "row_ordinal": 17, "singleton_term_count": 0, "term_count": 1, "terms": [{"support": [1, 7], "term": "p900_candidate0_edge_law.petersen_b.endpoint == 4 AND p900_candidate0_edge_law.label == \"half_turn\"", "term_cost": 45}]}

## Feature reuse

- source_native: [["g900_slot_edge.a_mod5", 8], ["g900_slot_edge.a", 4], ["g900_slot_edge.diff_mod15", 4], ["p900_candidate0_edge_law.sector.diff_mod15", 4], ["p900_candidate0_edge_law.label", 4], ["p900_candidate0_edge_law.petersen_b.endpoint", 3], ["g900_slot_edge.cycle_b_5x3", 2], ["p900_candidate0_edge_law.petersen_b.b_mod5", 2], ["g900_slot_edge.endpoint_mod5", 1], ["g900_slot_edge.distance_mod15", 1], ["p900_candidate0_edge_law.petersen_b.b", 1], ["p900_candidate0_edge_law.petersen_a.endpoint", 1], ["p900_candidate0_edge_law.petersen_b.sum_mod15", 1], ["g900_slot_edge.b_mod5", 1], ["p900_candidate0_edge_law.petersen_a.sum_mod15", 1], ["p900_candidate0_edge_law.petersen_a.b_mod5", 1], ["p900_candidate0_edge_law.petersen_b.a_mod5", 1]]
- broad: [["g900_slot_edge.a_mod5", 8], ["g900_slot_edge.a", 4], ["g900_slot_edge.diff_mod15", 4], ["p900_candidate0_edge_law.sector.diff_mod15", 4], ["p900_candidate0_edge_law.label", 4], ["p900_candidate0_edge_law.petersen_b.endpoint", 3], ["g900_slot_edge.cycle_b_5x3", 1], ["g900_slot_edge.endpoint_mod5", 1], ["p900_candidate0_edge_law.petersen_b.b_mod5", 1], ["g900_slot_edge.distance_mod15", 1], ["p900_candidate0_edge_law.petersen_b.b", 1], ["p900_candidate0_edge_law.petersen_a.endpoint", 1], ["p900_candidate0_edge_law.petersen_b.sum_mod15", 1], ["global_witness_mode", 1], ["g900_slot_edge.b_mod5", 1], ["p900_candidate0_edge_law.petersen_a.sum_mod15", 1], ["p900_candidate0_edge_law.petersen_a.b_mod5", 1], ["p900_candidate0_edge_law.petersen_b.a_mod5", 1]]

## Interpretation

- main_result: The bounded brute-force family found exact row selectors, but this is not a source-native generator.
- why_not_closure: Exact row-local selectors can still be disguised lookup. Gap A needs a generator that produces WXYZTI row/register structure from source, not one formula per row.
- hard_rows: The decisive rows remain the non-path and zero/preimage/stable rows.
- next_move: Audit the exact selector family for overfit, then isolate reusable subgrammar if any survives.

## Claim

- does_this_close_gap_a: false
- does_this_find_exact_bounded_selector_family: true
- does_this_find_source_native_generator: false
- does_this_construct_full_900_carrier_to_register_map: false
- short_form: "The bounded brute-force family found exact row selectors, but this is not a source-native generator."
- not_closed_reason: "Exact row-local selectors can still be disguised lookup. Gap A needs a generator that produces WXYZTI row/register structure from source, not one formula per row."
- next_problem: "Audit the exact selector family for overfit, then isolate reusable subgrammar if any survives."

## Checks

- PASS column_hypergraph_loaded: gap_a_column_hypergraph_register_generator_candidate_not_found
- PASS derivation_return_loaded: gap_a_wxyzti_register_generator_slot_path_candidate_not_found
- PASS mode2_boundary_loaded: gap_a_mode2_projection_mirror_boundary_note_recorded
- PASS upstreamed_supports_loaded: gap_a_projection_row_supports_upstreamed_columnwise_complete_not_generator
- PASS row_grouping_inference_loaded: gap_a_row_grouping_rule_inference_row_local_selectors_complete_not_global
- PASS boundary_theorem_loaded: gap_a_boundary_theorem_note_recorded
- PASS source_columns_loaded: 30
- PASS rows_loaded: 18
- PASS source_native_atoms_built: 930
- PASS source_native_term_catalog_built: 673
- PASS broad_term_catalog_built: 1072
- PASS gap_a_not_closed: bounded selector search only

## Next script

    audit_gap_a_bruteforce_selector_overfit_001.py
