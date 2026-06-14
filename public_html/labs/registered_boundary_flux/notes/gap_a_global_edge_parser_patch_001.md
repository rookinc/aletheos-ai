# Gap A global edge parser patch 001

Status: gap_a_global_edge_parser_patch_indexed_witness_complete

## Boundary

- This does not close Gap A.
- This patches the witness parser, not the theorem.
- Indexed global witnesses show that a column is represented in a 30-entry global law table.
- Indexed witnesses are weaker than direct endpoint agreement.
- No physical interpretation is claimed.

## Summary

- indexed_table_count: 3
- column_count: 30
- columns_with_indexed_witnesses: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
- all_columns_have_indexed_witnesses: true
- columns_with_direct_or_indexed_witnesses: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
- all_columns_have_direct_or_indexed_witnesses: true
- columns_with_indexed_endpoint_agreement: [0, 4, 8, 18, 20]
- indexed_endpoint_agreement_count: 5
- row_count: 18
- rows_with_all_indexed_witnesses: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
- all_rows_have_indexed_witnesses: true
- rows_with_all_direct_or_indexed_witnesses: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
- all_rows_have_direct_or_indexed_witnesses: true
- preimage_rows_with_all_direct_or_indexed: [3, 16]
- preimage_rows_complete: true
- stable_rows_with_all_direct_or_indexed: [4, 9, 15]
- stable_rows_complete: true
- claim_closes_gap_a: false

## Indexed tables

- {"kind": "edge_law_table", "length": 30, "path": "$.candidates[0].edge_law_table", "sample": "[{\"label\": \"half_turn\", \"petersen_edge_a\": [0, 1], \"petersen_edge_b\": [1, 2], \"sector_a\": 0, \"sector_b\": 1, \"shared_petersen_vertex\": 1, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [0, 1], \"petersen_edge_b\": [4, 0], \"sector_a\": 0, \"sector_b\": 4, \"shared_petersen_vertex\": 0, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [0, 1], \"petersen_edge_b\": [0, 5], \"sector_a\": 0, \"sector_b\": 5, \"shared_petersen_vertex\": 0, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [0, 1], \"petersen_edge_b\": [1, 6], \"sector_a\": 0, \"sector_b\": 6, \"shared_petersen_vertex\": 1, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [1, 2], \"petersen_edge_b\": [2, 3], \"sector_a\": 1, \"sector_b\": 2, \"shared_petersen_vertex\": 2, \"shift_mod60\": 30}]", "source": "p900_phase30_combined_graph_export"}
- {"kind": "edge_law_table", "length": 30, "path": "$.candidates[1].edge_law_table", "sample": "[{\"label\": \"half_turn\", \"petersen_edge_a\": [0, 1], \"petersen_edge_b\": [1, 2], \"sector_a\": 0, \"sector_b\": 1, \"shared_petersen_vertex\": 1, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [0, 1], \"petersen_edge_b\": [4, 0], \"sector_a\": 0, \"sector_b\": 4, \"shared_petersen_vertex\": 0, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [0, 1], \"petersen_edge_b\": [0, 5], \"sector_a\": 0, \"sector_b\": 5, \"shared_petersen_vertex\": 0, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [0, 1], \"petersen_edge_b\": [1, 6], \"sector_a\": 0, \"sector_b\": 6, \"shared_petersen_vertex\": 1, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [1, 2], \"petersen_edge_b\": [2, 3], \"sector_a\": 1, \"sector_b\": 2, \"shared_petersen_vertex\": 2, \"shift_mod60\": 30}]", "source": "p900_phase30_combined_graph_export"}
- {"kind": "slot_edges_g15_line_petersen", "length": 30, "path": "$.slot_edges_g15_line_petersen", "sample": "[[0, 1], [0, 4], [0, 10], [0, 11], [1, 2]]", "source": "g900_candidate_edges"}

## Claim

- does_this_close_gap_a: false
- does_this_patch_global_edge_parser: true
- does_this_construct_global_source_law_map: false
- all_columns_have_direct_or_indexed_witnesses: true
- all_rows_have_direct_or_indexed_witnesses: true
- preimage_rows_complete: true
- stable_rows_complete: true
- indexed_endpoint_agreement_count: 5
- short_form: "The parser patch adds indexed 30-entry global law-table witnesses, separating representation by index from direct endpoint agreement."
- not_closed_reason: "Indexed carrier witnesses are still not a full global source-law predicate evaluation."

## Column patch compact table

- {"canonical_edge": [0, 1], "cocycle": 0, "column": 0, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"]}
- {"canonical_edge": [0, 2], "cocycle": 1, "column": 1, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": []}
- {"canonical_edge": [0, 11], "cocycle": 0, "column": 2, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export"]}
- {"canonical_edge": [0, 14], "cocycle": 1, "column": 3, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": []}
- {"canonical_edge": [1, 2], "cocycle": 1, "column": 4, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"]}
- {"canonical_edge": [1, 8], "cocycle": 0, "column": 5, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": []}
- {"canonical_edge": [1, 13], "cocycle": 1, "column": 6, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": []}
- {"canonical_edge": [2, 5], "cocycle": 1, "column": 7, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": []}
- {"canonical_edge": [2, 12], "cocycle": 0, "column": 8, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": ["g900_candidate_edges"], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export"]}
- {"canonical_edge": [3, 4], "cocycle": 1, "column": 9, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"]}
- {"canonical_edge": [3, 5], "cocycle": 0, "column": 10, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": []}
- {"canonical_edge": [3, 10], "cocycle": 1, "column": 11, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": []}
- {"canonical_edge": [3, 13], "cocycle": 0, "column": 12, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export"]}
- {"canonical_edge": [4, 5], "cocycle": 1, "column": 13, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": ["g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"]}
- {"canonical_edge": [4, 7], "cocycle": 0, "column": 14, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": []}
- {"canonical_edge": [4, 14], "cocycle": 1, "column": 15, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export"]}
- {"canonical_edge": [5, 12], "cocycle": 1, "column": 16, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export"]}
- {"canonical_edge": [6, 7], "cocycle": 0, "column": 17, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export"]}
- {"canonical_edge": [6, 8], "cocycle": 1, "column": 18, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": ["p900_phase30_combined_graph_export"], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": []}
- {"canonical_edge": [6, 9], "cocycle": 1, "column": 19, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": []}
- {"canonical_edge": [6, 12], "cocycle": 1, "column": 20, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": ["g900_candidate_edges"], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"]}
- {"canonical_edge": [7, 8], "cocycle": 1, "column": 21, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export"]}
- {"canonical_edge": [7, 14], "cocycle": 1, "column": 22, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export"]}
- {"canonical_edge": [8, 13], "cocycle": 1, "column": 23, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"]}
- {"canonical_edge": [9, 10], "cocycle": 1, "column": 24, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export", "p900_phase30_combined_graph_export"]}
- {"canonical_edge": [9, 11], "cocycle": 0, "column": 25, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": ["g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"]}
- {"canonical_edge": [9, 12], "cocycle": 0, "column": 26, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": ["g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"]}
- {"canonical_edge": [10, 11], "cocycle": 1, "column": 27, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": ["g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"]}
- {"canonical_edge": [10, 13], "cocycle": 1, "column": 28, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": []}
- {"canonical_edge": [11, 14], "cocycle": 1, "column": 29, "has_direct_or_indexed_global_witness": true, "indexed_endpoint_agreement_sources": [], "indexed_witness_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "prior_direct_global_hit_sources": []}

## Row patch compact table

- {"columns": [0], "has_all_direct_or_indexed_global_witnesses": true, "missing_direct_or_indexed_global_witness_columns": [], "missing_prior_direct_global_hit_columns": [], "preimage": false, "role": "WX", "row_ordinal": 0, "stable": false, "zero": false}
- {"columns": [4], "has_all_direct_or_indexed_global_witnesses": true, "missing_direct_or_indexed_global_witness_columns": [], "missing_prior_direct_global_hit_columns": [], "preimage": false, "role": "XY", "row_ordinal": 1, "stable": false, "zero": false}
- {"columns": [7, 10], "has_all_direct_or_indexed_global_witnesses": true, "missing_direct_or_indexed_global_witness_columns": [], "missing_prior_direct_global_hit_columns": [7, 10], "preimage": false, "role": "YZ", "row_ordinal": 2, "stable": false, "zero": false}
- {"columns": [9], "has_all_direct_or_indexed_global_witnesses": true, "missing_direct_or_indexed_global_witness_columns": [], "missing_prior_direct_global_hit_columns": [], "preimage": true, "role": "ZT", "row_ordinal": 3, "stable": false, "zero": true}
- {"columns": [13], "has_all_direct_or_indexed_global_witnesses": true, "missing_direct_or_indexed_global_witness_columns": [], "missing_prior_direct_global_hit_columns": [], "preimage": false, "role": "TI", "row_ordinal": 4, "stable": true, "zero": true}
- {"columns": [1, 7], "has_all_direct_or_indexed_global_witnesses": true, "missing_direct_or_indexed_global_witness_columns": [], "missing_prior_direct_global_hit_columns": [1, 7], "preimage": false, "role": "IW", "row_ordinal": 5, "stable": false, "zero": false}
- {"columns": [0], "has_all_direct_or_indexed_global_witnesses": true, "missing_direct_or_indexed_global_witness_columns": [], "missing_prior_direct_global_hit_columns": [], "preimage": false, "role": "WX", "row_ordinal": 6, "stable": false, "zero": false}
- {"columns": [4], "has_all_direct_or_indexed_global_witnesses": true, "missing_direct_or_indexed_global_witness_columns": [], "missing_prior_direct_global_hit_columns": [], "preimage": false, "role": "XY", "row_ordinal": 7, "stable": false, "zero": false}
- {"columns": [1, 3, 22], "has_all_direct_or_indexed_global_witnesses": true, "missing_direct_or_indexed_global_witness_columns": [], "missing_prior_direct_global_hit_columns": [1, 3], "preimage": false, "role": "YZ", "row_ordinal": 8, "stable": false, "zero": false}
- {"columns": [14, 9, 11], "has_all_direct_or_indexed_global_witnesses": true, "missing_direct_or_indexed_global_witness_columns": [], "missing_prior_direct_global_hit_columns": [14, 11], "preimage": false, "role": "ZT", "row_ordinal": 9, "stable": true, "zero": true}
- {"columns": [10, 11], "has_all_direct_or_indexed_global_witnesses": true, "missing_direct_or_indexed_global_witness_columns": [], "missing_prior_direct_global_hit_columns": [10, 11], "preimage": false, "role": "TI", "row_ordinal": 10, "stable": false, "zero": false}
- {"columns": [1, 7], "has_all_direct_or_indexed_global_witnesses": true, "missing_direct_or_indexed_global_witness_columns": [], "missing_prior_direct_global_hit_columns": [1, 7], "preimage": false, "role": "IW", "row_ordinal": 11, "stable": false, "zero": false}
- {"columns": [0], "has_all_direct_or_indexed_global_witnesses": true, "missing_direct_or_indexed_global_witness_columns": [], "missing_prior_direct_global_hit_columns": [], "preimage": false, "role": "WX", "row_ordinal": 12, "stable": false, "zero": false}
- {"columns": [4], "has_all_direct_or_indexed_global_witnesses": true, "missing_direct_or_indexed_global_witness_columns": [], "missing_prior_direct_global_hit_columns": [], "preimage": false, "role": "XY", "row_ordinal": 13, "stable": false, "zero": false}
- {"columns": [4, 5], "has_all_direct_or_indexed_global_witnesses": true, "missing_direct_or_indexed_global_witness_columns": [], "missing_prior_direct_global_hit_columns": [5], "preimage": false, "role": "YZ", "row_ordinal": 14, "stable": false, "zero": false}
- {"columns": [21, 22], "has_all_direct_or_indexed_global_witnesses": true, "missing_direct_or_indexed_global_witness_columns": [], "missing_prior_direct_global_hit_columns": [], "preimage": false, "role": "ZT", "row_ordinal": 15, "stable": true, "zero": true}
- {"columns": [13, 15], "has_all_direct_or_indexed_global_witnesses": true, "missing_direct_or_indexed_global_witness_columns": [], "missing_prior_direct_global_hit_columns": [], "preimage": true, "role": "TI", "row_ordinal": 16, "stable": false, "zero": true}
- {"columns": [1, 7], "has_all_direct_or_indexed_global_witnesses": true, "missing_direct_or_indexed_global_witness_columns": [], "missing_prior_direct_global_hit_columns": [1, 7], "preimage": false, "role": "IW", "row_ordinal": 17, "stable": false, "zero": false}

## Interpretation

- main_result: The missing direct edge hits are covered by indexed global law-table witnesses if the 30-entry tables are accepted as column-indexed carrier witnesses.
- important_caution: Direct endpoint agreement remains weaker than indexed coverage; this is a parser bridge, not a proof closure.
- next_move: Rerun the global carrier map using direct-or-indexed witness modes and then evaluate whether the normalized source law can be stated as a global indexed-carrier predicate.

## Checks

- PASS prior_global_map_loaded: gap_a_column_edges_to_global_900_carrier_partial
- PASS unmatched_inspection_loaded: gap_a_unmatched_global_column_edges_inspected_no_broader_exact_hits
- PASS column_edge_map_loaded: gap_a_column_edge_witness_map_extracted
- PASS indexed_tables_found: [{"kind": "edge_law_table", "length": 30, "path": "$.candidates[0].edge_law_table", "source": "p900_phase30_combined_graph_export"}, {"kind": "edge_law_table", "length": 30, "path": "$.candidates[1].edge_law_table", "source": "p900_phase30_combined_graph_export"}, {"kind": "slot_edges_g15_line_petersen", "length": 30, "path": "$.slot_edges_g15_line_petersen", "source": "g900_candidate_edges"}]
- PASS columns_30: 30
- PASS rows_18: 18
- PASS all_columns_have_direct_or_indexed_witnesses: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
- PASS all_rows_have_direct_or_indexed_witnesses: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
- PASS preimage_rows_complete: [3, 16]
- PASS stable_rows_complete: [4, 9, 15]
- PASS gap_a_not_closed: parser patch gives indexed witnesses, not global predicate proof

## Next script

    rerun_gap_a_global_carrier_map_with_indexed_witnesses_001.py
