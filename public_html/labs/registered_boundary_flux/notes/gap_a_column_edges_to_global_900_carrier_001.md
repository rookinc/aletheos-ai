# Gap A column edges to global 900 carrier 001

Status: gap_a_column_edges_to_global_900_carrier_partial

## Boundary

- This does not close Gap A.
- This maps column-edge witnesses into global carrier sources.
- This is still not a full global source-law predicate evaluation.
- A global hit records schema-level carrier evidence, not a closure proof.
- No physical interpretation is claimed.

## Summary

- global_source_record_counts: {"g900_candidate_edges": 3630, "g900_candidate_graph_export": 3600, "g900_twisted_ring_candidate_edges": 3600, "g900_twisted_ring_candidate_export": 3600, "g900_vertex_register_candidate": 0, "p900_phase30_combined_graph_export": 14400}
- global_source_column_hit_counts: {"g900_candidate_edges": 14, "g900_candidate_graph_export": 14, "g900_twisted_ring_candidate_edges": 10, "g900_twisted_ring_candidate_export": 10, "g900_vertex_register_candidate": 0, "p900_phase30_combined_graph_export": 1}
- column_count: 30
- columns_with_global_hits: [0, 2, 4, 8, 9, 12, 13, 15, 16, 17, 20, 21, 22, 23, 24, 25, 26, 27]
- all_columns_have_global_hits: false
- row_count: 18
- rows_with_all_column_global_hits: [0, 1, 3, 4, 6, 7, 12, 13, 15, 16]
- all_rows_have_all_column_global_hits: false
- preimage_rows_with_all_column_global_hits: [3, 16]
- preimage_rows_complete: true
- stable_rows_with_all_column_global_hits: [4, 15]
- stable_rows_complete: false
- claim_closes_gap_a: false

## Claim

- does_this_close_gap_a: false
- does_this_construct_global_source_law_map: false
- does_this_map_column_edges_to_global_carrier: false
- all_columns_have_global_hits: false
- all_rows_have_all_column_global_hits: false
- preimage_rows_complete: true
- stable_rows_complete: false
- short_form: "Column-edge witnesses have been checked against the global 900-carrier sources."
- not_closed_reason: "Global carrier hits are still witness evidence, not a full global source-law predicate evaluation."

## Global inputs

{
  "g900_candidate_edges": {
    "edge_records_extracted": 3630,
    "exists": true,
    "loaded": true,
    "path": "/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/generated/g900_candidate_edges.json",
    "sha256": "1fad85393b160e5f15c71815a82120577fc2463e708d15b67d712b17654c686f"
  },
  "g900_candidate_graph_export": {
    "edge_records_extracted": 3600,
    "exists": true,
    "loaded": true,
    "path": "/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/exports/g900_candidate_graph_export.json",
    "sha256": "26592a04f1f49a63746e9190a9a5c0c3bb96a219882bdd59cacf6b16c22c0951"
  },
  "g900_twisted_ring_candidate_edges": {
    "edge_records_extracted": 3600,
    "exists": true,
    "loaded": true,
    "path": "/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/generated/g900_twisted_ring_candidate_edges.json",
    "sha256": "e8ae983acccb8102261bde73cca6493d9a13958edfacad0a2cb6b3e24f4398ef"
  },
  "g900_twisted_ring_candidate_export": {
    "edge_records_extracted": 3600,
    "exists": true,
    "loaded": true,
    "path": "/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/exports/g900_twisted_ring_candidate_export.json",
    "sha256": "bce9c8841c6b568fdd5f9469ef33079085f0729a6c32960b8930cf42dff3b9d3"
  },
  "g900_vertex_register_candidate": {
    "edge_records_extracted": 0,
    "exists": true,
    "loaded": true,
    "path": "/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/artifacts/json/301_proposed_g900_vertex_register_candidate.json",
    "sha256": "cfb06b672c18cddb97c482e62af9c1b49ceab0a7d028aa2cbc23cafbcbe47d20"
  },
  "p900_phase30_combined_graph_export": {
    "edge_records_extracted": 14400,
    "exists": true,
    "loaded": true,
    "path": "../json/p900/p900_phase30_combined_graph_export.json",
    "sha256": "609720792931d5e90fb9d49d12fd2c5390e02afcc1a19976fd95c119ae95d900"
  }
}

## Column global hit compact table

- {"canonical_edge": [0, 1], "cocycle": 0, "column": 0, "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_any_global_hit": true}
- {"canonical_edge": [0, 2], "cocycle": 1, "column": 1, "global_hit_sources": [], "has_any_global_hit": false}
- {"canonical_edge": [0, 11], "cocycle": 0, "column": 2, "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export"], "has_any_global_hit": true}
- {"canonical_edge": [0, 14], "cocycle": 1, "column": 3, "global_hit_sources": [], "has_any_global_hit": false}
- {"canonical_edge": [1, 2], "cocycle": 1, "column": 4, "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_any_global_hit": true}
- {"canonical_edge": [1, 8], "cocycle": 0, "column": 5, "global_hit_sources": [], "has_any_global_hit": false}
- {"canonical_edge": [1, 13], "cocycle": 1, "column": 6, "global_hit_sources": [], "has_any_global_hit": false}
- {"canonical_edge": [2, 5], "cocycle": 1, "column": 7, "global_hit_sources": [], "has_any_global_hit": false}
- {"canonical_edge": [2, 12], "cocycle": 0, "column": 8, "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export"], "has_any_global_hit": true}
- {"canonical_edge": [3, 4], "cocycle": 1, "column": 9, "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_any_global_hit": true}
- {"canonical_edge": [3, 5], "cocycle": 0, "column": 10, "global_hit_sources": [], "has_any_global_hit": false}
- {"canonical_edge": [3, 10], "cocycle": 1, "column": 11, "global_hit_sources": [], "has_any_global_hit": false}
- {"canonical_edge": [3, 13], "cocycle": 0, "column": 12, "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export"], "has_any_global_hit": true}
- {"canonical_edge": [4, 5], "cocycle": 1, "column": 13, "global_hit_sources": ["g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_any_global_hit": true}
- {"canonical_edge": [4, 7], "cocycle": 0, "column": 14, "global_hit_sources": [], "has_any_global_hit": false}
- {"canonical_edge": [4, 14], "cocycle": 1, "column": 15, "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export"], "has_any_global_hit": true}
- {"canonical_edge": [5, 12], "cocycle": 1, "column": 16, "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export"], "has_any_global_hit": true}
- {"canonical_edge": [6, 7], "cocycle": 0, "column": 17, "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export"], "has_any_global_hit": true}
- {"canonical_edge": [6, 8], "cocycle": 1, "column": 18, "global_hit_sources": [], "has_any_global_hit": false}
- {"canonical_edge": [6, 9], "cocycle": 1, "column": 19, "global_hit_sources": [], "has_any_global_hit": false}
- {"canonical_edge": [6, 12], "cocycle": 1, "column": 20, "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_any_global_hit": true}
- {"canonical_edge": [7, 8], "cocycle": 1, "column": 21, "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export"], "has_any_global_hit": true}
- {"canonical_edge": [7, 14], "cocycle": 1, "column": 22, "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export"], "has_any_global_hit": true}
- {"canonical_edge": [8, 13], "cocycle": 1, "column": 23, "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_any_global_hit": true}
- {"canonical_edge": [9, 10], "cocycle": 1, "column": 24, "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export", "p900_phase30_combined_graph_export"], "has_any_global_hit": true}
- {"canonical_edge": [9, 11], "cocycle": 0, "column": 25, "global_hit_sources": ["g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_any_global_hit": true}
- {"canonical_edge": [9, 12], "cocycle": 0, "column": 26, "global_hit_sources": ["g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_any_global_hit": true}
- {"canonical_edge": [10, 11], "cocycle": 1, "column": 27, "global_hit_sources": ["g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_any_global_hit": true}
- {"canonical_edge": [10, 13], "cocycle": 1, "column": 28, "global_hit_sources": [], "has_any_global_hit": false}
- {"canonical_edge": [11, 14], "cocycle": 1, "column": 29, "global_hit_sources": [], "has_any_global_hit": false}

## Row global witness compact table

- {"columns": [0], "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_all_column_global_hits": true, "missing_global_hit_columns": [], "preimage": false, "role": "WX", "row_ordinal": 0, "stable": false, "zero": false}
- {"columns": [4], "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_all_column_global_hits": true, "missing_global_hit_columns": [], "preimage": false, "role": "XY", "row_ordinal": 1, "stable": false, "zero": false}
- {"columns": [7, 10], "global_hit_sources": [], "has_all_column_global_hits": false, "missing_global_hit_columns": [7, 10], "preimage": false, "role": "YZ", "row_ordinal": 2, "stable": false, "zero": false}
- {"columns": [9], "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_all_column_global_hits": true, "missing_global_hit_columns": [], "preimage": true, "role": "ZT", "row_ordinal": 3, "stable": false, "zero": true}
- {"columns": [13], "global_hit_sources": ["g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_all_column_global_hits": true, "missing_global_hit_columns": [], "preimage": false, "role": "TI", "row_ordinal": 4, "stable": true, "zero": true}
- {"columns": [1, 7], "global_hit_sources": [], "has_all_column_global_hits": false, "missing_global_hit_columns": [1, 7], "preimage": false, "role": "IW", "row_ordinal": 5, "stable": false, "zero": false}
- {"columns": [0], "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_all_column_global_hits": true, "missing_global_hit_columns": [], "preimage": false, "role": "WX", "row_ordinal": 6, "stable": false, "zero": false}
- {"columns": [4], "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_all_column_global_hits": true, "missing_global_hit_columns": [], "preimage": false, "role": "XY", "row_ordinal": 7, "stable": false, "zero": false}
- {"columns": [1, 3, 22], "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export"], "has_all_column_global_hits": false, "missing_global_hit_columns": [1, 3], "preimage": false, "role": "YZ", "row_ordinal": 8, "stable": false, "zero": false}
- {"columns": [14, 9, 11], "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_all_column_global_hits": false, "missing_global_hit_columns": [14, 11], "preimage": false, "role": "ZT", "row_ordinal": 9, "stable": true, "zero": true}
- {"columns": [10, 11], "global_hit_sources": [], "has_all_column_global_hits": false, "missing_global_hit_columns": [10, 11], "preimage": false, "role": "TI", "row_ordinal": 10, "stable": false, "zero": false}
- {"columns": [1, 7], "global_hit_sources": [], "has_all_column_global_hits": false, "missing_global_hit_columns": [1, 7], "preimage": false, "role": "IW", "row_ordinal": 11, "stable": false, "zero": false}
- {"columns": [0], "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_all_column_global_hits": true, "missing_global_hit_columns": [], "preimage": false, "role": "WX", "row_ordinal": 12, "stable": false, "zero": false}
- {"columns": [4], "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_all_column_global_hits": true, "missing_global_hit_columns": [], "preimage": false, "role": "XY", "row_ordinal": 13, "stable": false, "zero": false}
- {"columns": [4, 5], "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_all_column_global_hits": false, "missing_global_hit_columns": [5], "preimage": false, "role": "YZ", "row_ordinal": 14, "stable": false, "zero": false}
- {"columns": [21, 22], "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export"], "has_all_column_global_hits": true, "missing_global_hit_columns": [], "preimage": false, "role": "ZT", "row_ordinal": 15, "stable": true, "zero": true}
- {"columns": [13, 15], "global_hit_sources": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export"], "has_all_column_global_hits": true, "missing_global_hit_columns": [], "preimage": true, "role": "TI", "row_ordinal": 16, "stable": false, "zero": true}
- {"columns": [1, 7], "global_hit_sources": [], "has_all_column_global_hits": false, "missing_global_hit_columns": [1, 7], "preimage": false, "role": "IW", "row_ordinal": 17, "stable": false, "zero": false}

## Interpretation

- main_result: The verified column-edge witnesses are now tested against the global carrier schemas.
- next_move_if_complete: Evaluate the normalized row source law as a carrier predicate over the mapped global evidence.
- next_move_if_partial: Inspect unmatched column edges and strengthen the global edge parser.

## Checks

- PASS column_edge_map_loaded: gap_a_column_edge_witness_map_extracted
- PASS normalized_preimage_loaded: gap_a_source_preimage_from_normalized_zero_rows_recorded_not_promoted
- PASS global_docs_loaded: ["p900_phase30_combined_graph_export", "g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export", "g900_vertex_register_candidate"]
- PASS global_records_extracted: {"g900_candidate_edges": 3630, "g900_candidate_graph_export": 3600, "g900_twisted_ring_candidate_edges": 3600, "g900_twisted_ring_candidate_export": 3600, "g900_vertex_register_candidate": 0, "p900_phase30_combined_graph_export": 14400}
- PASS columns_30: 30
- PASS rows_18: 18
- PASS preimage_rows_complete: [3, 16]
- FAIL stable_rows_complete: [4, 15]
- PASS gap_a_not_closed: global carrier evidence map only

## Next script

    inspect_gap_a_unmatched_global_column_edges_001.py
