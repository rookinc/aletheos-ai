# Gap A global carrier map with indexed witnesses 001

Status: gap_a_global_carrier_map_with_indexed_witnesses_complete

## Boundary

- This does not close Gap A.
- This completes the global witness map under the direct-or-indexed witness rule.
- Indexed 30-entry carrier-law witnesses are representation evidence, not direct endpoint equality.
- This is not yet a full global source-law predicate evaluation.
- No physical interpretation is claimed.

## Witness rule

- name: "direct_or_indexed_global_witness"
- definition: "A column has a global witness if it has either a direct endpoint hit in global carrier records or an indexed witness in a 30-entry global carrier-law table."
- direct_mode: "direct endpoint hit"
- indexed_mode: "same column index represented in a 30-entry carrier-law table"
- caution: "Indexed witness mode is weaker than direct endpoint agreement."

## Summary

- column_count: 30
- columns_with_global_witnesses: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
- all_columns_have_global_witnesses: true
- columns_direct_only: []
- columns_indexed_only: [1, 3, 5, 6, 7, 10, 11, 14, 18, 19, 28, 29]
- columns_direct_and_indexed: [0, 2, 4, 8, 9, 12, 13, 15, 16, 17, 20, 21, 22, 23, 24, 25, 26, 27]
- columns_missing: []
- columns_with_indexed_endpoint_agreement: [0, 4, 8, 18, 20]
- indexed_endpoint_agreement_count: 5
- row_count: 18
- rows_with_all_global_witnesses: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
- all_rows_have_global_witnesses: true
- preimage_rows_with_all_global_witnesses: [3, 16]
- preimage_rows_complete: true
- stable_rows_with_all_global_witnesses: [4, 9, 15]
- stable_rows_complete: true
- row_mode_summary: {"direct_and_indexed": [0, 1, 3, 4, 6, 7, 12, 13, 15, 16], "direct_and_indexed+indexed_only": [8, 9, 14], "indexed_only": [2, 5, 10, 11, 17]}
- claim_closes_gap_a: false

## Claim

- does_this_close_gap_a: false
- does_this_construct_global_source_law_map: false
- does_this_complete_global_witness_map: true
- all_columns_have_global_witnesses: true
- all_rows_have_global_witnesses: true
- preimage_rows_complete: true
- stable_rows_complete: true
- short_form: "Under direct-or-indexed witness mode, all 30 columns and all 18 WXYZTI rows have global carrier witnesses."
- not_closed_reason: "A complete global witness map is still not a full global source-law predicate evaluation."

## Column compact table

- {"canonical_edge": [0, 1], "cocycle": 0, "column": 0, "direct_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "endpoint_agreement_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "direct_and_indexed"}
- {"canonical_edge": [0, 2], "cocycle": 1, "column": 1, "direct_sources": [], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "indexed_only"}
- {"canonical_edge": [0, 11], "cocycle": 0, "column": 2, "direct_sources": ["g900_candidate_edges", "g900_candidate_graph_export"], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "direct_and_indexed"}
- {"canonical_edge": [0, 14], "cocycle": 1, "column": 3, "direct_sources": [], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "indexed_only"}
- {"canonical_edge": [1, 2], "cocycle": 1, "column": 4, "direct_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "endpoint_agreement_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "direct_and_indexed"}
- {"canonical_edge": [1, 8], "cocycle": 0, "column": 5, "direct_sources": [], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "indexed_only"}
- {"canonical_edge": [1, 13], "cocycle": 1, "column": 6, "direct_sources": [], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "indexed_only"}
- {"canonical_edge": [2, 5], "cocycle": 1, "column": 7, "direct_sources": [], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "indexed_only"}
- {"canonical_edge": [2, 12], "cocycle": 0, "column": 8, "direct_sources": ["g900_candidate_edges", "g900_candidate_graph_export"], "endpoint_agreement_sources": ["g900_candidate_edges"], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "direct_and_indexed"}
- {"canonical_edge": [3, 4], "cocycle": 1, "column": 9, "direct_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "direct_and_indexed"}
- {"canonical_edge": [3, 5], "cocycle": 0, "column": 10, "direct_sources": [], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "indexed_only"}
- {"canonical_edge": [3, 10], "cocycle": 1, "column": 11, "direct_sources": [], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "indexed_only"}
- {"canonical_edge": [3, 13], "cocycle": 0, "column": 12, "direct_sources": ["g900_candidate_edges", "g900_candidate_graph_export"], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "direct_and_indexed"}
- {"canonical_edge": [4, 5], "cocycle": 1, "column": 13, "direct_sources": ["g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "direct_and_indexed"}
- {"canonical_edge": [4, 7], "cocycle": 0, "column": 14, "direct_sources": [], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "indexed_only"}
- {"canonical_edge": [4, 14], "cocycle": 1, "column": 15, "direct_sources": ["g900_candidate_edges", "g900_candidate_graph_export"], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "direct_and_indexed"}
- {"canonical_edge": [5, 12], "cocycle": 1, "column": 16, "direct_sources": ["g900_candidate_edges", "g900_candidate_graph_export"], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "direct_and_indexed"}
- {"canonical_edge": [6, 7], "cocycle": 0, "column": 17, "direct_sources": ["g900_candidate_edges", "g900_candidate_graph_export"], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "direct_and_indexed"}
- {"canonical_edge": [6, 8], "cocycle": 1, "column": 18, "direct_sources": [], "endpoint_agreement_sources": ["p900_phase30_combined_graph_export"], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "indexed_only"}
- {"canonical_edge": [6, 9], "cocycle": 1, "column": 19, "direct_sources": [], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "indexed_only"}
- {"canonical_edge": [6, 12], "cocycle": 1, "column": 20, "direct_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "endpoint_agreement_sources": ["g900_candidate_edges"], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "direct_and_indexed"}
- {"canonical_edge": [7, 8], "cocycle": 1, "column": 21, "direct_sources": ["g900_candidate_edges", "g900_candidate_graph_export"], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "direct_and_indexed"}
- {"canonical_edge": [7, 14], "cocycle": 1, "column": 22, "direct_sources": ["g900_candidate_edges", "g900_candidate_graph_export"], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "direct_and_indexed"}
- {"canonical_edge": [8, 13], "cocycle": 1, "column": 23, "direct_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "direct_and_indexed"}
- {"canonical_edge": [9, 10], "cocycle": 1, "column": 24, "direct_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export", "p900_phase30_combined_graph_export"], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "direct_and_indexed"}
- {"canonical_edge": [9, 11], "cocycle": 0, "column": 25, "direct_sources": ["g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "direct_and_indexed"}
- {"canonical_edge": [9, 12], "cocycle": 0, "column": 26, "direct_sources": ["g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "direct_and_indexed"}
- {"canonical_edge": [10, 11], "cocycle": 1, "column": 27, "direct_sources": ["g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "direct_and_indexed"}
- {"canonical_edge": [10, 13], "cocycle": 1, "column": 28, "direct_sources": [], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "indexed_only"}
- {"canonical_edge": [11, 14], "cocycle": 1, "column": 29, "direct_sources": [], "endpoint_agreement_sources": [], "has_global_witness": true, "indexed_sources": ["g900_candidate_edges", "p900_phase30_combined_graph_export"], "witness_mode": "indexed_only"}

## Row compact table

- {"columns": [0], "direct_endpoint_hit_columns": [0], "has_all_global_witnesses": true, "indexed_only_columns": [], "preimage": false, "role": "WX", "row_ordinal": 0, "stable": false, "witness_modes": ["direct_and_indexed"], "zero": false}
- {"columns": [4], "direct_endpoint_hit_columns": [4], "has_all_global_witnesses": true, "indexed_only_columns": [], "preimage": false, "role": "XY", "row_ordinal": 1, "stable": false, "witness_modes": ["direct_and_indexed"], "zero": false}
- {"columns": [7, 10], "direct_endpoint_hit_columns": [], "has_all_global_witnesses": true, "indexed_only_columns": [7, 10], "preimage": false, "role": "YZ", "row_ordinal": 2, "stable": false, "witness_modes": ["indexed_only"], "zero": false}
- {"columns": [9], "direct_endpoint_hit_columns": [9], "has_all_global_witnesses": true, "indexed_only_columns": [], "preimage": true, "role": "ZT", "row_ordinal": 3, "stable": false, "witness_modes": ["direct_and_indexed"], "zero": true}
- {"columns": [13], "direct_endpoint_hit_columns": [13], "has_all_global_witnesses": true, "indexed_only_columns": [], "preimage": false, "role": "TI", "row_ordinal": 4, "stable": true, "witness_modes": ["direct_and_indexed"], "zero": true}
- {"columns": [1, 7], "direct_endpoint_hit_columns": [], "has_all_global_witnesses": true, "indexed_only_columns": [1, 7], "preimage": false, "role": "IW", "row_ordinal": 5, "stable": false, "witness_modes": ["indexed_only"], "zero": false}
- {"columns": [0], "direct_endpoint_hit_columns": [0], "has_all_global_witnesses": true, "indexed_only_columns": [], "preimage": false, "role": "WX", "row_ordinal": 6, "stable": false, "witness_modes": ["direct_and_indexed"], "zero": false}
- {"columns": [4], "direct_endpoint_hit_columns": [4], "has_all_global_witnesses": true, "indexed_only_columns": [], "preimage": false, "role": "XY", "row_ordinal": 7, "stable": false, "witness_modes": ["direct_and_indexed"], "zero": false}
- {"columns": [1, 3, 22], "direct_endpoint_hit_columns": [22], "has_all_global_witnesses": true, "indexed_only_columns": [1, 3], "preimage": false, "role": "YZ", "row_ordinal": 8, "stable": false, "witness_modes": ["direct_and_indexed", "indexed_only"], "zero": false}
- {"columns": [14, 9, 11], "direct_endpoint_hit_columns": [9], "has_all_global_witnesses": true, "indexed_only_columns": [14, 11], "preimage": false, "role": "ZT", "row_ordinal": 9, "stable": true, "witness_modes": ["direct_and_indexed", "indexed_only"], "zero": true}
- {"columns": [10, 11], "direct_endpoint_hit_columns": [], "has_all_global_witnesses": true, "indexed_only_columns": [10, 11], "preimage": false, "role": "TI", "row_ordinal": 10, "stable": false, "witness_modes": ["indexed_only"], "zero": false}
- {"columns": [1, 7], "direct_endpoint_hit_columns": [], "has_all_global_witnesses": true, "indexed_only_columns": [1, 7], "preimage": false, "role": "IW", "row_ordinal": 11, "stable": false, "witness_modes": ["indexed_only"], "zero": false}
- {"columns": [0], "direct_endpoint_hit_columns": [0], "has_all_global_witnesses": true, "indexed_only_columns": [], "preimage": false, "role": "WX", "row_ordinal": 12, "stable": false, "witness_modes": ["direct_and_indexed"], "zero": false}
- {"columns": [4], "direct_endpoint_hit_columns": [4], "has_all_global_witnesses": true, "indexed_only_columns": [], "preimage": false, "role": "XY", "row_ordinal": 13, "stable": false, "witness_modes": ["direct_and_indexed"], "zero": false}
- {"columns": [4, 5], "direct_endpoint_hit_columns": [4], "has_all_global_witnesses": true, "indexed_only_columns": [5], "preimage": false, "role": "YZ", "row_ordinal": 14, "stable": false, "witness_modes": ["direct_and_indexed", "indexed_only"], "zero": false}
- {"columns": [21, 22], "direct_endpoint_hit_columns": [21, 22], "has_all_global_witnesses": true, "indexed_only_columns": [], "preimage": false, "role": "ZT", "row_ordinal": 15, "stable": true, "witness_modes": ["direct_and_indexed"], "zero": true}
- {"columns": [13, 15], "direct_endpoint_hit_columns": [13, 15], "has_all_global_witnesses": true, "indexed_only_columns": [], "preimage": true, "role": "TI", "row_ordinal": 16, "stable": false, "witness_modes": ["direct_and_indexed"], "zero": true}
- {"columns": [1, 7], "direct_endpoint_hit_columns": [], "has_all_global_witnesses": true, "indexed_only_columns": [1, 7], "preimage": false, "role": "IW", "row_ordinal": 17, "stable": false, "witness_modes": ["indexed_only"], "zero": false}

## Interpretation

- main_result: The global carrier witness table is complete once indexed 30-entry carrier-law witnesses are admitted as representation evidence.
- important_caution: Only 5 columns show indexed endpoint agreement; the rest rely on indexed representation, so this is not endpoint-level proof.
- next_move: Evaluate whether the normalized source law can be stated as a global indexed-carrier predicate over this complete witness table.

## Checks

- PASS parser_patch_loaded: gap_a_global_edge_parser_patch_indexed_witness_complete
- PASS prior_global_map_loaded: gap_a_column_edges_to_global_900_carrier_partial
- PASS column_edge_map_loaded: gap_a_column_edge_witness_map_extracted
- PASS normalized_preimage_loaded: gap_a_source_preimage_from_normalized_zero_rows_recorded_not_promoted
- PASS columns_30: 30
- PASS rows_18: 18
- PASS all_columns_have_global_witnesses: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
- PASS all_rows_have_global_witnesses: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
- PASS preimage_rows_complete: [3, 16]
- PASS stable_rows_complete: [4, 9, 15]
- PASS gap_a_not_closed: complete witness map only, not predicate proof

## Next script

    evaluate_gap_a_indexed_global_carrier_predicate_001.py
