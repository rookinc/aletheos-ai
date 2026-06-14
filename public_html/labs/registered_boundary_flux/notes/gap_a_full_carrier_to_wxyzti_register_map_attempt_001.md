# Gap A full carrier to WXYZTI register map attempt 001

Status: gap_a_full_carrier_to_wxyzti_register_map_attempt_source_map_missing

## Boundary

- This does not close Gap A.
- This is a source-map attempt, not a theorem proof.
- The audit distinguishes indexed carrier witness coverage from a source-native register-row generator.
- A negative result here is useful because it identifies the missing source-map ingredient.
- No physical interpretation is claimed.

## Summary

- attempt_result: "not_closed_source_map_missing"
- gap_a_closed: false
- source_only_can_derive_column_index_universe: true
- source_only_can_derive_wxyzti_rows: false
- source_only_can_derive_preimage: false
- source_only_can_derive_stable_complement: false
- missing_requirements: ["native WXYZTI station/role labels in global carrier sources", "source-native 18-row register list or row generator", "rule grouping 30 indexed carrier-law columns into 18 WXYZTI role rows"]
- global_files_loaded: ["p900_phase30_combined_graph_export", "g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export", "g900_vertex_register_candidate"]
- indexed_30_entry_table_count: 3
- station_hit_sources: {"g900_candidate_edges": {"T": 8100}, "g900_candidate_graph_export": {"T": 8100}, "g900_twisted_ring_candidate_edges": {"T": 7200}, "g900_twisted_ring_candidate_export": {"T": 8100}, "g900_vertex_register_candidate": {"T": 900}, "p900_phase30_combined_graph_export": {"I": 1, "T": 2}}
- has_native_wxyzti_tokens: false
- has_register_key_material: true
- has_candidate_18_row_list: false
- table_derived_preimage_support: [3, 16]
- table_derived_stable_complement_support: [4, 9, 15]
- claim_closes_gap_a: false

## Source-only attempt

- can_derive_column_index_universe: true
- can_derive_wxyzti_register_rows_without_row_table: false
- can_derive_preimage_without_row_table: false
- can_derive_stable_complement_without_row_table: false
- reason: "The global sources expose indexed 30-entry carrier-law tables, but this audit did not find a source-native WXYZTI row generator or a source-native grouping of 30 columns into 18 WXYZTI rows."

## What is available

- indexed_30_entry_table_count: 3
- {"kind": "edge_law_table", "length": 30, "path": "$.candidates[0].edge_law_table", "source": "p900_phase30_combined_graph_export"}
- {"kind": "edge_law_table", "length": 30, "path": "$.candidates[1].edge_law_table", "source": "p900_phase30_combined_graph_export"}
- {"kind": "slot_edges_g15_line_petersen", "length": 30, "path": "$.slot_edges_g15_line_petersen", "source": "g900_candidate_edges"}

## Missing requirements

- native WXYZTI station/role labels in global carrier sources
- source-native 18-row register list or row generator
- rule grouping 30 indexed carrier-law columns into 18 WXYZTI role rows

## Table-derived reference

- row_count: 18
- column_count: 30
- preimage_support: [3, 16]
- stable_complement_support: [4, 9, 15]
- all_rows_witnessed: true
- all_columns_witnessed: true

## Claim

- does_this_close_gap_a: false
- does_this_construct_full_900_carrier_to_wxyzti_register_map: false
- does_this_find_indexed_carrier_source: true
- does_this_find_source_native_wxyzti_row_generator: false
- short_form: "The 900 sources provide indexed carrier-law tables, but this audit did not find a source-native WXYZTI row generator."
- not_closed_reason: "The map from 900 carrier sources to the 18 WXYZTI register rows remains external to the global source files."

## Interpretation

- main_result: The bounded predicate plateau is real, but full Gap A closure still needs a source-derived row generator.
- what_is_available: The global source files expose indexed 30-entry carrier-law structure.
- what_is_missing: A native rule that groups or transports those source columns into the 18 WXYZTI role rows.
- next_move: Define or discover a candidate source-native row generator, then test whether it reproduces the 18 WXYZTI rows.

## Checks

- PASS boundary_theorem_loaded: gap_a_boundary_theorem_note_recorded
- PASS indexed_predicate_loaded: gap_a_indexed_global_carrier_predicate_exact
- PASS global_indexed_map_loaded: gap_a_global_carrier_map_with_indexed_witnesses_complete
- PASS parser_patch_loaded: gap_a_global_edge_parser_patch_indexed_witness_complete
- PASS global_sources_loaded: ["p900_phase30_combined_graph_export", "g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export", "g900_vertex_register_candidate"]
- PASS indexed_tables_found: [{"kind": "edge_law_table", "length": 30, "path": "$.candidates[0].edge_law_table", "sample": "[{\"label\": \"half_turn\", \"petersen_edge_a\": [0, 1], \"petersen_edge_b\": [1, 2], \"sector_a\": 0, \"sector_b\": 1, \"shared_petersen_vertex\": 1, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [0, 1], \"petersen_edge_b\": [4, 0], \"sector_a\": 0, \"sector_b\": 4, \"shared_petersen_vertex\": 0, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [0, 1], \"petersen_edge_b\": [0, 5], \"sector_a\": 0, \"sector_b\": 5, \"shared_petersen_vertex\": 0, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [0, 1], \"petersen_edge_b\": [1, 6], \"sector_a\": 0, \"sector_b\": 6, \"shared_petersen_vertex\": 1, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [1, 2], \"petersen_edge_b\": [2, 3], \"sector_a\": 1, \"sector_b\": 2, \"shared_petersen_vertex\": 2, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [1, 2], \"petersen_edge_b\": [1, 6], \"sector_a\": 1, \"sector_b\": 6, \"shared_petersen_vertex\": 1, \"shift_mod60\": 30}]", "source": "p900_phase30_combined_graph_export"}, {"kind": "edge_law_table", "length": 30, "path": "$.candidates[1].edge_law_table", "sample": "[{\"label\": \"half_turn\", \"petersen_edge_a\": [0, 1], \"petersen_edge_b\": [1, 2], \"sector_a\": 0, \"sector_b\": 1, \"shared_petersen_vertex\": 1, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [0, 1], \"petersen_edge_b\": [4, 0], \"sector_a\": 0, \"sector_b\": 4, \"shared_petersen_vertex\": 0, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [0, 1], \"petersen_edge_b\": [0, 5], \"sector_a\": 0, \"sector_b\": 5, \"shared_petersen_vertex\": 0, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [0, 1], \"petersen_edge_b\": [1, 6], \"sector_a\": 0, \"sector_b\": 6, \"shared_petersen_vertex\": 1, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [1, 2], \"petersen_edge_b\": [2, 3], \"sector_a\": 1, \"sector_b\": 2, \"shared_petersen_vertex\": 2, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [1, 2], \"petersen_edge_b\": [1, 6], \"sector_a\": 1, \"sector_b\": 6, \"shared_petersen_vertex\": 1, \"shift_mod60\": 30}]", "source": "p900_phase30_combined_graph_export"}, {"kind": "slot_edges_g15_line_petersen", "length": 30, "path": "$.slot_edges_g15_line_petersen", "sample": "[[0, 1], [0, 4], [0, 10], [0, 11], [1, 2], [1, 11]]", "source": "g900_candidate_edges"}]
- FAIL source_native_18_row_generator_found: {}
- FAIL source_native_wxyzti_tokens_found: {"g900_candidate_edges": {"T": 8100}, "g900_candidate_graph_export": {"T": 8100}, "g900_twisted_ring_candidate_edges": {"T": 7200}, "g900_twisted_ring_candidate_export": {"T": 8100}, "g900_vertex_register_candidate": {"T": 900}, "p900_phase30_combined_graph_export": {"I": 1, "T": 2}}
- PASS gap_a_not_closed: source-derived map not constructed

## Next script

    search_gap_a_source_native_row_generator_001.py
