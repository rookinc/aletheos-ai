# Gap A row grouping rule inference from source column records 001

Status: gap_a_row_grouping_rule_inference_row_local_selectors_complete_not_global

## Boundary

- This does not close Gap A.
- Row-local source selectors are weaker than a compact source-native row generator.
- A DNF selector per row may explain column support membership but can still be a disguised lookup.
- No compact global grouping rule is claimed in this artifact.
- No physical interpretation is claimed.

## Summary

- inference_result: "row_local_source_selectors_found"
- gap_a_closed: false
- source_column_count: 30
- atom_count: 769
- primary_atom_count: 739
- row_count: 18
- rows_with_exact_atomic_selectors: [0, 1, 3, 4, 6, 7, 12, 13, 15]
- rows_with_exact_conjunction_selectors: [0, 1, 3, 4, 6, 7, 10, 12, 13, 15, 16]
- rows_with_exact_primary_dnf_selectors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
- rows_requiring_column_lookup_fallback: []
- all_rows_have_exact_atomic_selector: false
- all_rows_have_exact_conjunction_selector: false
- all_rows_have_exact_primary_dnf_selector: true
- compact_global_grouping_rule_found: false
- claim_closes_gap_a: false

## Role pattern summary

- {"constant_support_across_cycles": true, "role": "WX", "support_set_count": 1, "supports": [[0]]}
- {"constant_support_across_cycles": true, "role": "XY", "support_set_count": 1, "supports": [[4]]}
- {"constant_support_across_cycles": false, "role": "YZ", "support_set_count": 3, "supports": [[1, 3, 22], [4, 5], [7, 10]]}
- {"constant_support_across_cycles": false, "role": "ZT", "support_set_count": 3, "supports": [[9], [9, 11, 14], [21, 22]]}
- {"constant_support_across_cycles": false, "role": "TI", "support_set_count": 3, "supports": [[10, 11], [13], [13, 15]]}
- {"constant_support_across_cycles": true, "role": "IW", "support_set_count": 1, "supports": [[1, 7]]}

## Row inference compact table

- {"cycle": 0, "exact_atomic_count": 16, "exact_conjunction_count": 1350, "exact_primary_dnf_found": true, "preimage": false, "role": "WX", "row_ordinal": 0, "selected_dnf_atoms": [{"atom": "g900_slot_edge == [0, 1]", "class": "source_native", "support": [0]}], "selected_dnf_class": "source_native", "stable_complement": false, "target_columns": [0]}
- {"cycle": 0, "exact_atomic_count": 16, "exact_conjunction_count": 1355, "exact_primary_dnf_found": true, "preimage": false, "role": "XY", "row_ordinal": 1, "selected_dnf_atoms": [{"atom": "g900_slot_edge == [1, 2]", "class": "source_native", "support": [4]}], "selected_dnf_class": "source_native", "stable_complement": false, "target_columns": [4]}
- {"cycle": 0, "exact_atomic_count": 0, "exact_conjunction_count": 0, "exact_primary_dnf_found": true, "preimage": false, "role": "YZ", "row_ordinal": 2, "selected_dnf_atoms": [{"atom": "g900_slot_edge == [2, 3]", "class": "source_native", "support": [7]}, {"atom": "g900_slot_edge == [3, 4]", "class": "source_native", "support": [10]}], "selected_dnf_class": "source_native", "stable_complement": false, "target_columns": [7, 10]}
- {"cycle": 0, "exact_atomic_count": 7, "exact_conjunction_count": 1095, "exact_primary_dnf_found": true, "preimage": true, "role": "ZT", "row_ordinal": 3, "selected_dnf_atoms": [{"atom": "g900_slot_edge == [2, 13]", "class": "source_native", "support": [9]}], "selected_dnf_class": "source_native", "stable_complement": false, "target_columns": [9]}
- {"cycle": 0, "exact_atomic_count": 8, "exact_conjunction_count": 1421, "exact_primary_dnf_found": true, "preimage": false, "role": "TI", "row_ordinal": 4, "selected_dnf_atoms": [{"atom": "g900_slot_edge == [4, 10]", "class": "source_native", "support": [13]}], "selected_dnf_class": "source_native", "stable_complement": true, "target_columns": [13]}
- {"cycle": 0, "exact_atomic_count": 0, "exact_conjunction_count": 0, "exact_primary_dnf_found": true, "preimage": false, "role": "IW", "row_ordinal": 5, "selected_dnf_atoms": [{"atom": "g900_slot_edge == [0, 4]", "class": "source_native", "support": [1]}, {"atom": "g900_slot_edge == [2, 3]", "class": "source_native", "support": [7]}], "selected_dnf_class": "source_native", "stable_complement": false, "target_columns": [1, 7]}
- {"cycle": 1, "exact_atomic_count": 16, "exact_conjunction_count": 1350, "exact_primary_dnf_found": true, "preimage": false, "role": "WX", "row_ordinal": 6, "selected_dnf_atoms": [{"atom": "g900_slot_edge == [0, 1]", "class": "source_native", "support": [0]}], "selected_dnf_class": "source_native", "stable_complement": false, "target_columns": [0]}
- {"cycle": 1, "exact_atomic_count": 16, "exact_conjunction_count": 1355, "exact_primary_dnf_found": true, "preimage": false, "role": "XY", "row_ordinal": 7, "selected_dnf_atoms": [{"atom": "g900_slot_edge == [1, 2]", "class": "source_native", "support": [4]}], "selected_dnf_class": "source_native", "stable_complement": false, "target_columns": [4]}
- {"cycle": 1, "exact_atomic_count": 0, "exact_conjunction_count": 0, "exact_primary_dnf_found": true, "preimage": false, "role": "YZ", "row_ordinal": 8, "selected_dnf_atoms": [{"atom": "g900_slot_edge == [0, 11]", "class": "source_native", "support": [3]}, {"atom": "g900_slot_edge == [0, 4]", "class": "source_native", "support": [1]}, {"atom": "g900_slot_edge == [7, 8]", "class": "source_native", "support": [22]}], "selected_dnf_class": "source_native", "stable_complement": false, "target_columns": [1, 3, 22]}
- {"cycle": 1, "exact_atomic_count": 0, "exact_conjunction_count": 0, "exact_primary_dnf_found": true, "preimage": false, "role": "ZT", "row_ordinal": 9, "selected_dnf_atoms": [{"atom": "p900_candidate0_edge_law.petersen_edge_b == [3, 8]", "class": "source_native", "support": [9, 11]}, {"atom": "g900_slot_edge == [4, 14]", "class": "source_native", "support": [14]}], "selected_dnf_class": "source_native", "stable_complement": true, "target_columns": [9, 11, 14]}
- {"cycle": 1, "exact_atomic_count": 0, "exact_conjunction_count": 34, "exact_primary_dnf_found": true, "preimage": false, "role": "TI", "row_ordinal": 10, "selected_dnf_atoms": [{"atom": "g900_slot_edge == [3, 13]", "class": "source_native", "support": [11]}, {"atom": "g900_slot_edge == [3, 4]", "class": "source_native", "support": [10]}], "selected_dnf_class": "source_native", "stable_complement": false, "target_columns": [10, 11]}
- {"cycle": 1, "exact_atomic_count": 0, "exact_conjunction_count": 0, "exact_primary_dnf_found": true, "preimage": false, "role": "IW", "row_ordinal": 11, "selected_dnf_atoms": [{"atom": "g900_slot_edge == [0, 4]", "class": "source_native", "support": [1]}, {"atom": "g900_slot_edge == [2, 3]", "class": "source_native", "support": [7]}], "selected_dnf_class": "source_native", "stable_complement": false, "target_columns": [1, 7]}
- {"cycle": 2, "exact_atomic_count": 16, "exact_conjunction_count": 1350, "exact_primary_dnf_found": true, "preimage": false, "role": "WX", "row_ordinal": 12, "selected_dnf_atoms": [{"atom": "g900_slot_edge == [0, 1]", "class": "source_native", "support": [0]}], "selected_dnf_class": "source_native", "stable_complement": false, "target_columns": [0]}
- {"cycle": 2, "exact_atomic_count": 16, "exact_conjunction_count": 1355, "exact_primary_dnf_found": true, "preimage": false, "role": "XY", "row_ordinal": 13, "selected_dnf_atoms": [{"atom": "g900_slot_edge == [1, 2]", "class": "source_native", "support": [4]}], "selected_dnf_class": "source_native", "stable_complement": false, "target_columns": [4]}
- {"cycle": 2, "exact_atomic_count": 0, "exact_conjunction_count": 0, "exact_primary_dnf_found": true, "preimage": false, "role": "YZ", "row_ordinal": 14, "selected_dnf_atoms": [{"atom": "g900_slot_edge == [1, 11]", "class": "source_native", "support": [5]}, {"atom": "g900_slot_edge == [1, 2]", "class": "source_native", "support": [4]}], "selected_dnf_class": "source_native", "stable_complement": false, "target_columns": [4, 5]}
- {"cycle": 2, "exact_atomic_count": 6, "exact_conjunction_count": 289, "exact_primary_dnf_found": true, "preimage": false, "role": "ZT", "row_ordinal": 15, "selected_dnf_atoms": [{"atom": "p900_candidate0_edge_law.petersen_edge_a == [3, 8]", "class": "source_native", "support": [21, 22]}], "selected_dnf_class": "source_native", "stable_complement": true, "target_columns": [21, 22]}
- {"cycle": 2, "exact_atomic_count": 0, "exact_conjunction_count": 8, "exact_primary_dnf_found": true, "preimage": true, "role": "TI", "row_ordinal": 16, "selected_dnf_atoms": [{"atom": "g900_slot_edge == [4, 10]", "class": "source_native", "support": [13]}, {"atom": "g900_slot_edge == [5, 6]", "class": "source_native", "support": [15]}], "selected_dnf_class": "source_native", "stable_complement": false, "target_columns": [13, 15]}
- {"cycle": 2, "exact_atomic_count": 0, "exact_conjunction_count": 0, "exact_primary_dnf_found": true, "preimage": false, "role": "IW", "row_ordinal": 17, "selected_dnf_atoms": [{"atom": "g900_slot_edge == [0, 4]", "class": "source_native", "support": [1]}, {"atom": "g900_slot_edge == [2, 3]", "class": "source_native", "support": [7]}], "selected_dnf_class": "source_native", "stable_complement": false, "target_columns": [1, 7]}

## Claim

- does_this_close_gap_a: false
- does_this_find_row_local_source_selectors: true
- does_this_find_compact_global_grouping_rule: false
- does_this_construct_full_900_carrier_to_register_map: false
- short_form: "Every WXYZTI row support has an exact row-local source-feature selector, but no compact global grouping rule is claimed."
- not_closed_reason: "Row-local selectors do not yet explain the global rule grouping 30 source columns into 18 WXYZTI rows."

## Interpretation

- main_result: The grouping problem has been reduced to row-local source-feature selectors.
- role_pattern_signal: WX, XY, and IW are expected to be more regular; YZ, ZT, and TI carry interior-turn structure.
- remaining_gap: Find a compact, uniform source-native rule that generates the 18 row supports without per-row DNF lookup.
- next_move: Audit the row-local selectors for overfit and identify which source features recur across roles and cycles.

## Checks

- PASS upstreamed_supports_loaded: gap_a_projection_row_supports_upstreamed_columnwise_complete_not_generator
- PASS distilled_rule_loaded: gap_a_projection_row_generator_rule_distilled_not_source_native
- PASS cycle_generator_test_loaded: gap_a_wxyzti_cycle_generator_from_30_columns_no_exact_candidate
- PASS boundary_theorem_loaded: gap_a_boundary_theorem_note_recorded
- PASS source_columns_30: 30
- PASS row_supports_18: 18
- PASS primary_atoms_exist: 739
- PASS row_inference_completed: 18
- PASS compact_global_rule_not_claimed: no compact global generator claimed
- PASS gap_a_not_closed: row-local selector inference only

## Next script

    audit_gap_a_row_local_source_selectors_001.py
