# Gap A unmatched global column edges inspection 001

Status: gap_a_unmatched_global_column_edges_inspected_no_broader_exact_hits

## Boundary

- This does not close Gap A.
- This is an unmatched-edge schema inspection.
- Text hits and broader parser hits indicate possible parser/schema gaps, not proof of a global carrier predicate.
- No physical interpretation is claimed.

## Summary

- unmatched_column_count: 12
- unmatched_columns: [1, 3, 5, 6, 7, 10, 11, 14, 18, 19, 28, 29]
- columns_with_broader_exact_hits: []
- columns_with_text_hits: [1, 3, 5, 6, 7, 10, 11, 14, 18, 19, 28, 29]
- row_missing_count: 8
- row9_missing_columns: [14, 11]
- preimage_rows_complete_in_prior_map: true
- stable_rows_complete_in_prior_map: false
- claim_closes_gap_a: false

## Claim

- does_this_close_gap_a: false
- does_this_identify_parser_gap: true
- unmatched_columns: [1, 3, 5, 6, 7, 10, 11, 14, 18, 19, 28, 29]
- row9_missing_columns: [14, 11]
- columns_with_broader_exact_hits: []
- columns_with_text_hits: [1, 3, 5, 6, 7, 10, 11, 14, 18, 19, 28, 29]
- short_form: "Unmatched global column edges were inspected to separate parser/schema gaps from apparent source absence."
- not_closed_reason: "This inspection does not evaluate a full global carrier predicate."

## Unmatched columns

- {"canonical_cocycle_value": 1, "canonical_edge": [0, 2], "column": 1}
- {"canonical_cocycle_value": 1, "canonical_edge": [0, 14], "column": 3}
- {"canonical_cocycle_value": 0, "canonical_edge": [1, 8], "column": 5}
- {"canonical_cocycle_value": 1, "canonical_edge": [1, 13], "column": 6}
- {"canonical_cocycle_value": 1, "canonical_edge": [2, 5], "column": 7}
- {"canonical_cocycle_value": 0, "canonical_edge": [3, 5], "column": 10}
- {"canonical_cocycle_value": 1, "canonical_edge": [3, 10], "column": 11}
- {"canonical_cocycle_value": 0, "canonical_edge": [4, 7], "column": 14}
- {"canonical_cocycle_value": 1, "canonical_edge": [6, 8], "column": 18}
- {"canonical_cocycle_value": 1, "canonical_edge": [6, 9], "column": 19}
- {"canonical_cocycle_value": 1, "canonical_edge": [10, 13], "column": 28}
- {"canonical_cocycle_value": 1, "canonical_edge": [11, 14], "column": 29}

## Rows with missing global hits

- {"columns": [7, 10], "missing_global_hit_columns": [7, 10], "preimage": false, "role": "YZ", "row_ordinal": 2, "stable": false, "zero": false}
- {"columns": [1, 7], "missing_global_hit_columns": [1, 7], "preimage": false, "role": "IW", "row_ordinal": 5, "stable": false, "zero": false}
- {"columns": [1, 3, 22], "missing_global_hit_columns": [1, 3], "preimage": false, "role": "YZ", "row_ordinal": 8, "stable": false, "zero": false}
- {"columns": [14, 9, 11], "missing_global_hit_columns": [14, 11], "preimage": false, "role": "ZT", "row_ordinal": 9, "stable": true, "zero": true}
- {"columns": [10, 11], "missing_global_hit_columns": [10, 11], "preimage": false, "role": "TI", "row_ordinal": 10, "stable": false, "zero": false}
- {"columns": [1, 7], "missing_global_hit_columns": [1, 7], "preimage": false, "role": "IW", "row_ordinal": 11, "stable": false, "zero": false}
- {"columns": [4, 5], "missing_global_hit_columns": [5], "preimage": false, "role": "YZ", "row_ordinal": 14, "stable": false, "zero": false}
- {"columns": [1, 7], "missing_global_hit_columns": [1, 7], "preimage": false, "role": "IW", "row_ordinal": 17, "stable": false, "zero": false}

## Source summaries

### p900_phase30_combined_graph_export

{
  "edge_like_list_count": 128,
  "edge_like_lists": [
    {
      "first_sample": "[{\"class\": \"internal_g60\", \"edge_class\": \"internal_same_sector\", \"local_a\": 0, \"local_b\": 16, \"residue_a\": 0, \"residue_b\": 16, \"sector_a\": 0, \"sector_b\": 0, \"shared_petersen_vertex\": null, \"shift_mod60\": null, \"source\": 0, \"target\": 16}, {\"class\": \"internal_g60\", \"edge_class\": \"internal_same_sector\", \"local_a\": 0, \"local_b\": 19, \"residue_a\": 0, \"residue_b\": 19, \"sector_a\": 0, \"sector_b\": 0, \"shared_petersen_vertex\": null, \"shift_mod60\": null, \"source\": 0, \"target\": 19}, {\"class\": \"internal_g60\",",
      "length": 3600,
      "path": "$.candidates[0].combined_edges"
    },
    {
      "first_sample": "[{\"label\": \"half_turn\", \"petersen_edge_a\": [0, 1], \"petersen_edge_b\": [1, 2], \"sector_a\": 0, \"sector_b\": 1, \"shared_petersen_vertex\": 1, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [0, 1], \"petersen_edge_b\": [4, 0], \"sector_a\": 0, \"sector_b\": 4, \"shared_petersen_vertex\": 0, \"shift_mod60\": 30}, {\"label\": \"half_turn\", \"petersen_edge_a\": [0, 1], \"petersen_edge_b\": [0, 5], \"sector_a\": 0, \"sector_b\": 5, \"shared_petersen_vertex\": 0, \"shift_mod60\": 30}]",
      "length": 30,
      "path": "$.candidates[0].edge_law_table"
    },
    {
      "first_sample": "[0, 1]",
      "length": 2,
      "path": "$.candidates[0].edge_law_table[0].petersen_edge_a"
    },
    {
      "first_sample": "[1, 2]",
      "length": 2,
      "path": "$.candidates[0].edge_law_table[0].petersen_edge_b"
    },
    {
      "first_sample": "[0, 1]",
      "length": 2,
      "path": "$.candidates[0].edge_law_table[1].petersen_edge_a"
    }
  ],
  "local_pair_count": 0,
  "raw_pair_count": 14400,
  "record_count": 14400,
  "slot_pair_count": 0
}

### g900_candidate_edges

{
  "edge_like_list_count": 32,
  "edge_like_lists": [
    {
      "first_sample": "[[0, 1], [0, 4], [0, 10]]",
      "length": 30,
      "path": "$.slot_edges_g15_line_petersen"
    },
    {
      "first_sample": "[0, 1]",
      "length": 2,
      "path": "$.slot_edges_g15_line_petersen[0]"
    },
    {
      "first_sample": "[0, 4]",
      "length": 2,
      "path": "$.slot_edges_g15_line_petersen[1]"
    },
    {
      "first_sample": "[0, 10]",
      "length": 2,
      "path": "$.slot_edges_g15_line_petersen[2]"
    },
    {
      "first_sample": "[0, 11]",
      "length": 2,
      "path": "$.slot_edges_g15_line_petersen[3]"
    }
  ],
  "local_pair_count": 3600,
  "raw_pair_count": 30,
  "record_count": 3630,
  "slot_pair_count": 3600
}

### g900_candidate_graph_export

{
  "edge_like_list_count": 1,
  "edge_like_lists": [
    {
      "first_sample": "[{\"kind\": \"internal_thalion_copy\", \"source\": \"g60_edge_list\", \"u\": \"T00_S00\", \"v\": \"T00_S16\"}, {\"kind\": \"internal_thalion_copy\", \"source\": \"g60_edge_list\", \"u\": \"T00_S00\", \"v\": \"T00_S19\"}, {\"kind\": \"internal_thalion_copy\", \"source\": \"g60_edge_list\", \"u\": \"T00_S00\", \"v\": \"T00_S25\"}]",
      "length": 3600,
      "path": "$.edges"
    }
  ],
  "local_pair_count": 3600,
  "raw_pair_count": 0,
  "record_count": 3600,
  "slot_pair_count": 3600
}

### g900_twisted_ring_candidate_edges

{
  "edge_like_list_count": 1,
  "edge_like_lists": [
    {
      "first_sample": "[{\"kind\": \"internal_thalion_copy\", \"law\": \"g60_internal\", \"source\": \"g60_local_edges_from_aletheos\", \"u\": \"T00_S00\", \"v\": \"T00_S16\"}, {\"kind\": \"internal_thalion_copy\", \"law\": \"g60_internal\", \"source\": \"g60_local_edges_from_aletheos\", \"u\": \"T00_S00\", \"v\": \"T00_S19\"}, {\"kind\": \"internal_thalion_copy\", \"law\": \"g60_internal\", \"source\": \"g60_local_edges_from_aletheos\", \"u\": \"T00_S00\", \"v\": \"T00_S25\"}]",
      "length": 3600,
      "path": "$.edges"
    }
  ],
  "local_pair_count": 3600,
  "raw_pair_count": 0,
  "record_count": 3600,
  "slot_pair_count": 3600
}

### g900_twisted_ring_candidate_export

{
  "edge_like_list_count": 1,
  "edge_like_lists": [
    {
      "first_sample": "[{\"kind\": \"internal_thalion_copy\", \"law\": \"g60_internal\", \"source\": \"g60_local_edges_from_aletheos\", \"u\": \"T00_S00\", \"v\": \"T00_S16\"}, {\"kind\": \"internal_thalion_copy\", \"law\": \"g60_internal\", \"source\": \"g60_local_edges_from_aletheos\", \"u\": \"T00_S00\", \"v\": \"T00_S19\"}, {\"kind\": \"internal_thalion_copy\", \"law\": \"g60_internal\", \"source\": \"g60_local_edges_from_aletheos\", \"u\": \"T00_S00\", \"v\": \"T00_S25\"}]",
      "length": 3600,
      "path": "$.edges"
    }
  ],
  "local_pair_count": 3600,
  "raw_pair_count": 0,
  "record_count": 3600,
  "slot_pair_count": 3600
}

### g900_vertex_register_candidate

{
  "edge_like_list_count": 0,
  "edge_like_lists": [],
  "local_pair_count": 0,
  "raw_pair_count": 0,
  "record_count": 0,
  "slot_pair_count": 0
}

## Per-column inspection compact

- {"canonical_edge": [0, 2], "cocycle": 1, "column": 1, "has_any_exact_hit_after_broader_parser": false, "has_any_text_hit": true, "per_source_counts": {"g900_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T00_S": 540, "T02_S": 540, "_S0": 1350, "_S00": 135, "_S02": 135, "_S2": 1350}}, "g900_candidate_graph_export": {"exact": 0, "shared": 10, "text_hits": {"T00_S": 540, "T02_S": 540, "_S0": 1350, "_S00": 135, "_S02": 135, "_S2": 1350}}, "g900_twisted_ring_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T00_S": 480, "T02_S": 480, "_S0": 1200, "_S00": 120, "_S02": 120, "_S2": 1200}}, "g900_twisted_ring_candidate_export": {"exact": 0, "shared": 10, "text_hits": {"T00_S": 540, "T02_S": 540, "_S0": 1350, "_S00": 135, "_S02": 135, "_S2": 1350}}, "g900_vertex_register_candidate": {"exact": 0, "shared": 0, "text_hits": {"T00_S": 60, "T02_S": 60, "_S0": 150, "_S00": 15, "_S02": 15, "_S2": 150}}, "p900_phase30_combined_graph_export": {"exact": 0, "shared": 10, "text_hits": {}}}}
- {"canonical_edge": [0, 14], "cocycle": 1, "column": 3, "has_any_exact_hit_after_broader_parser": false, "has_any_text_hit": true, "per_source_counts": {"g900_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T00_S": 540, "T14_S": 540, "_S0": 1350, "_S00": 135, "_S14": 135}}, "g900_candidate_graph_export": {"exact": 0, "shared": 10, "text_hits": {"T00_S": 540, "T14_S": 540, "_S0": 1350, "_S00": 135, "_S14": 135}}, "g900_twisted_ring_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T00_S": 480, "T14_S": 480, "_S0": 1200, "_S00": 120, "_S14": 120}}, "g900_twisted_ring_candidate_export": {"exact": 0, "shared": 10, "text_hits": {"T00_S": 540, "T14_S": 540, "_S0": 1350, "_S00": 135, "_S14": 135}}, "g900_vertex_register_candidate": {"exact": 0, "shared": 0, "text_hits": {"T00_S": 60, "T14_S": 60, "_S0": 150, "_S00": 15, "_S14": 15}}, "p900_phase30_combined_graph_export": {"exact": 0, "shared": 10, "text_hits": {}}}}
- {"canonical_edge": [1, 8], "cocycle": 0, "column": 5, "has_any_exact_hit_after_broader_parser": false, "has_any_text_hit": true, "per_source_counts": {"g900_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T01_S": 540, "T08_S": 540, "_S01": 135, "_S08": 135, "_S1": 1350}}, "g900_candidate_graph_export": {"exact": 0, "shared": 10, "text_hits": {"T01_S": 540, "T08_S": 540, "_S01": 135, "_S08": 135, "_S1": 1350}}, "g900_twisted_ring_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T01_S": 480, "T08_S": 480, "_S01": 120, "_S08": 120, "_S1": 1200}}, "g900_twisted_ring_candidate_export": {"exact": 0, "shared": 10, "text_hits": {"T01_S": 540, "T08_S": 540, "_S01": 135, "_S08": 135, "_S1": 1350}}, "g900_vertex_register_candidate": {"exact": 0, "shared": 0, "text_hits": {"T01_S": 60, "T08_S": 60, "_S01": 15, "_S08": 15, "_S1": 150}}, "p900_phase30_combined_graph_export": {"exact": 0, "shared": 10, "text_hits": {}}}}
- {"canonical_edge": [1, 13], "cocycle": 1, "column": 6, "has_any_exact_hit_after_broader_parser": false, "has_any_text_hit": true, "per_source_counts": {"g900_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T01_S": 540, "T13_S": 540, "_S01": 135, "_S1": 1350, "_S13": 135}}, "g900_candidate_graph_export": {"exact": 0, "shared": 10, "text_hits": {"T01_S": 540, "T13_S": 540, "_S01": 135, "_S1": 1350, "_S13": 135}}, "g900_twisted_ring_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T01_S": 480, "T13_S": 480, "_S01": 120, "_S1": 1200, "_S13": 120}}, "g900_twisted_ring_candidate_export": {"exact": 0, "shared": 10, "text_hits": {"T01_S": 540, "T13_S": 540, "_S01": 135, "_S1": 1350, "_S13": 135}}, "g900_vertex_register_candidate": {"exact": 0, "shared": 0, "text_hits": {"T01_S": 60, "T13_S": 60, "_S01": 15, "_S1": 150, "_S13": 15}}, "p900_phase30_combined_graph_export": {"exact": 0, "shared": 10, "text_hits": {}}}}
- {"canonical_edge": [2, 5], "cocycle": 1, "column": 7, "has_any_exact_hit_after_broader_parser": false, "has_any_text_hit": true, "per_source_counts": {"g900_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T02_S": 540, "T05_S": 540, "_S02": 135, "_S05": 135, "_S2": 1350, "_S5": 1350}}, "g900_candidate_graph_export": {"exact": 0, "shared": 10, "text_hits": {"T02_S": 540, "T05_S": 540, "_S02": 135, "_S05": 135, "_S2": 1350, "_S5": 1350}}, "g900_twisted_ring_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T02_S": 480, "T05_S": 480, "_S02": 120, "_S05": 120, "_S2": 1200, "_S5": 1200}}, "g900_twisted_ring_candidate_export": {"exact": 0, "shared": 10, "text_hits": {"T02_S": 540, "T05_S": 540, "_S02": 135, "_S05": 135, "_S2": 1350, "_S5": 1350}}, "g900_vertex_register_candidate": {"exact": 0, "shared": 0, "text_hits": {"T02_S": 60, "T05_S": 60, "_S02": 15, "_S05": 15, "_S2": 150, "_S5": 150}}, "p900_phase30_combined_graph_export": {"exact": 0, "shared": 10, "text_hits": {}}}}
- {"canonical_edge": [3, 5], "cocycle": 0, "column": 10, "has_any_exact_hit_after_broader_parser": false, "has_any_text_hit": true, "per_source_counts": {"g900_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T03_S": 540, "T05_S": 540, "_S03": 135, "_S05": 135, "_S3": 1350, "_S5": 1350}}, "g900_candidate_graph_export": {"exact": 0, "shared": 10, "text_hits": {"T03_S": 540, "T05_S": 540, "_S03": 135, "_S05": 135, "_S3": 1350, "_S5": 1350}}, "g900_twisted_ring_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T03_S": 480, "T05_S": 480, "_S03": 120, "_S05": 120, "_S3": 1200, "_S5": 1200}}, "g900_twisted_ring_candidate_export": {"exact": 0, "shared": 10, "text_hits": {"T03_S": 540, "T05_S": 540, "_S03": 135, "_S05": 135, "_S3": 1350, "_S5": 1350}}, "g900_vertex_register_candidate": {"exact": 0, "shared": 0, "text_hits": {"T03_S": 60, "T05_S": 60, "_S03": 15, "_S05": 15, "_S3": 150, "_S5": 150}}, "p900_phase30_combined_graph_export": {"exact": 0, "shared": 10, "text_hits": {}}}}
- {"canonical_edge": [3, 10], "cocycle": 1, "column": 11, "has_any_exact_hit_after_broader_parser": false, "has_any_text_hit": true, "per_source_counts": {"g900_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T03_S": 540, "T10_S": 540, "_S03": 135, "_S10": 135, "_S3": 1350}}, "g900_candidate_graph_export": {"exact": 0, "shared": 10, "text_hits": {"T03_S": 540, "T10_S": 540, "_S03": 135, "_S10": 135, "_S3": 1350}}, "g900_twisted_ring_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T03_S": 480, "T10_S": 480, "_S03": 120, "_S10": 120, "_S3": 1200}}, "g900_twisted_ring_candidate_export": {"exact": 0, "shared": 10, "text_hits": {"T03_S": 540, "T10_S": 540, "_S03": 135, "_S10": 135, "_S3": 1350}}, "g900_vertex_register_candidate": {"exact": 0, "shared": 0, "text_hits": {"T03_S": 60, "T10_S": 60, "_S03": 15, "_S10": 15, "_S3": 150}}, "p900_phase30_combined_graph_export": {"exact": 0, "shared": 10, "text_hits": {}}}}
- {"canonical_edge": [4, 7], "cocycle": 0, "column": 14, "has_any_exact_hit_after_broader_parser": false, "has_any_text_hit": true, "per_source_counts": {"g900_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T04_S": 540, "T07_S": 540, "_S04": 135, "_S07": 135, "_S4": 1350}}, "g900_candidate_graph_export": {"exact": 0, "shared": 10, "text_hits": {"T04_S": 540, "T07_S": 540, "_S04": 135, "_S07": 135, "_S4": 1350}}, "g900_twisted_ring_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T04_S": 480, "T07_S": 480, "_S04": 120, "_S07": 120, "_S4": 1200}}, "g900_twisted_ring_candidate_export": {"exact": 0, "shared": 10, "text_hits": {"T04_S": 540, "T07_S": 540, "_S04": 135, "_S07": 135, "_S4": 1350}}, "g900_vertex_register_candidate": {"exact": 0, "shared": 0, "text_hits": {"T04_S": 60, "T07_S": 60, "_S04": 15, "_S07": 15, "_S4": 150}}, "p900_phase30_combined_graph_export": {"exact": 0, "shared": 10, "text_hits": {}}}}
- {"canonical_edge": [6, 8], "cocycle": 1, "column": 18, "has_any_exact_hit_after_broader_parser": false, "has_any_text_hit": true, "per_source_counts": {"g900_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T06_S": 540, "T08_S": 540, "_S06": 135, "_S08": 135}}, "g900_candidate_graph_export": {"exact": 0, "shared": 10, "text_hits": {"T06_S": 540, "T08_S": 540, "_S06": 135, "_S08": 135}}, "g900_twisted_ring_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T06_S": 480, "T08_S": 480, "_S06": 120, "_S08": 120}}, "g900_twisted_ring_candidate_export": {"exact": 0, "shared": 10, "text_hits": {"T06_S": 540, "T08_S": 540, "_S06": 135, "_S08": 135}}, "g900_vertex_register_candidate": {"exact": 0, "shared": 0, "text_hits": {"T06_S": 60, "T08_S": 60, "_S06": 15, "_S08": 15}}, "p900_phase30_combined_graph_export": {"exact": 0, "shared": 10, "text_hits": {"[6, 8]": 8}}}}
- {"canonical_edge": [6, 9], "cocycle": 1, "column": 19, "has_any_exact_hit_after_broader_parser": false, "has_any_text_hit": true, "per_source_counts": {"g900_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T06_S": 540, "T09_S": 540, "_S06": 135, "_S09": 135}}, "g900_candidate_graph_export": {"exact": 0, "shared": 10, "text_hits": {"T06_S": 540, "T09_S": 540, "_S06": 135, "_S09": 135}}, "g900_twisted_ring_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T06_S": 480, "T09_S": 480, "_S06": 120, "_S09": 120}}, "g900_twisted_ring_candidate_export": {"exact": 0, "shared": 10, "text_hits": {"T06_S": 540, "T09_S": 540, "_S06": 135, "_S09": 135}}, "g900_vertex_register_candidate": {"exact": 0, "shared": 0, "text_hits": {"T06_S": 60, "T09_S": 60, "_S06": 15, "_S09": 15}}, "p900_phase30_combined_graph_export": {"exact": 0, "shared": 10, "text_hits": {"[9, 6]": 8}}}}
- {"canonical_edge": [10, 13], "cocycle": 1, "column": 28, "has_any_exact_hit_after_broader_parser": false, "has_any_text_hit": true, "per_source_counts": {"g900_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T10_S": 540, "T13_S": 540, "_S10": 135, "_S13": 135}}, "g900_candidate_graph_export": {"exact": 0, "shared": 10, "text_hits": {"T10_S": 540, "T13_S": 540, "_S10": 135, "_S13": 135}}, "g900_twisted_ring_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T10_S": 480, "T13_S": 480, "_S10": 120, "_S13": 120}}, "g900_twisted_ring_candidate_export": {"exact": 0, "shared": 10, "text_hits": {"T10_S": 540, "T13_S": 540, "_S10": 135, "_S13": 135}}, "g900_vertex_register_candidate": {"exact": 0, "shared": 0, "text_hits": {"T10_S": 60, "T13_S": 60, "_S10": 15, "_S13": 15}}, "p900_phase30_combined_graph_export": {"exact": 0, "shared": 10, "text_hits": {}}}}
- {"canonical_edge": [11, 14], "cocycle": 1, "column": 29, "has_any_exact_hit_after_broader_parser": false, "has_any_text_hit": true, "per_source_counts": {"g900_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T11_S": 540, "T14_S": 540, "_S11": 135, "_S14": 135}}, "g900_candidate_graph_export": {"exact": 0, "shared": 10, "text_hits": {"T11_S": 540, "T14_S": 540, "_S11": 135, "_S14": 135}}, "g900_twisted_ring_candidate_edges": {"exact": 0, "shared": 10, "text_hits": {"T11_S": 480, "T14_S": 480, "_S11": 120, "_S14": 120}}, "g900_twisted_ring_candidate_export": {"exact": 0, "shared": 10, "text_hits": {"T11_S": 540, "T14_S": 540, "_S11": 135, "_S14": 135}}, "g900_vertex_register_candidate": {"exact": 0, "shared": 0, "text_hits": {"T11_S": 60, "T14_S": 60, "_S11": 15, "_S14": 15}}, "p900_phase30_combined_graph_export": {"exact": 0, "shared": 10, "text_hits": {}}}}

## Interpretation

- main_result: The global carrier evidence map is partial; this inspection identifies whether unmatched canonical edges are visible under broader parsing or only by text traces.
- next_if_parser_gap: Patch the global edge parser and rerun the column-edge to global carrier map.
- next_if_no_parser_gap: Treat unmatched columns as a real schema/source boundary and record the partial global witness theorem.

## Checks

- PASS column_edges_to_global_loaded: gap_a_column_edges_to_global_900_carrier_partial
- PASS column_edge_map_loaded: gap_a_column_edge_witness_map_extracted
- PASS unmatched_columns_present: [1, 3, 5, 6, 7, 10, 11, 14, 18, 19, 28, 29]
- PASS row9_missing_11_14: [14, 11]
- PASS global_sources_loaded: ["p900_phase30_combined_graph_export", "g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export", "g900_vertex_register_candidate"]
- PASS inspection_records_created: 12
- PASS gap_a_not_closed: inspection only

## Next script

    patch_gap_a_global_edge_parser_001.py
