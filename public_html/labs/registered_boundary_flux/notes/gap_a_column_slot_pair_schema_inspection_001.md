# Gap A column slot-pair schema inspection 001

Status: gap_a_column_slot_pair_schema_candidate_found

## Boundary

- This does not close Gap A.
- This is a schema inspection only.
- A candidate schema location is not yet a validated global carrier bridge.
- No physical interpretation is claimed.

## Summary

{
  "best_candidate": {
    "kind": "list30",
    "length": 30,
    "path": "$.indexing_repair.normalized_columns",
    "sample": "[0, 1, 2, 3, 4, 5, 6, 7]",
    "score": 11,
    "source": "edge_column_assignment_bridge"
  },
  "candidate_source_count": 11,
  "claim_closes_gap_a": false,
  "has_exact_pair_list_30": false
}

## Claim

- does_this_close_gap_a: false
- does_this_find_candidate_column_slot_schema: true
- does_this_validate_global_bridge: false
- short_form: "A candidate column/slot schema location was found."
- not_closed_reason: "This only locates schema candidates; the bridge still needs extraction and validation."

## Candidate sources

- {"kind": "list30", "length": 30, "path": "$.indexing_repair.normalized_columns", "sample": "[0, 1, 2, 3, 4, 5, 6, 7]", "score": 11, "source": "edge_column_assignment_bridge"}
- {"kind": "list30", "length": 30, "path": "$.indexing_repair.raw_columns", "sample": "[1, 2, 3, 4, 5, 6, 7, 8]", "score": 11, "source": "edge_column_assignment_bridge"}
- {"kind": "list30", "length": 30, "path": "$.layer_reports.colored_columns.ids", "sample": "[0, 1, 2, 3, 4, 5, 6, 7]", "score": 7, "source": "edge_column_assignment_bridge"}
- {"kind": "list30", "length": 30, "path": "$.layer_reports.signatures_columns.ids", "sample": "[0, 1, 2, 3, 4, 5, 6, 7]", "score": 7, "source": "edge_column_assignment_bridge"}
- {"kind": "list30", "length": 30, "path": "$.bridge_records", "sample": "[{\"M_row_support\": [6, 7, 8, 9, 10, 11, 12], \"M_row_support_hash\": \"dc602fb702a3ad6cb8a486bb9a5c2eda7d5727aea513c314c7302b6262387639\", \"assignment\": {\"cocycle_value\": 0, \"column\": 1, \"edge\": [0, 1], \"support\": [6, 7, 8, 9, 10, 11, 12]}, \"bridge_hash\": \"37c5d170b7eb0e7d57354978651d28bc0b4f924b53064b074ee32775462e0af4\", \"colored_column\": {\"hist\": [[1, 1], [2, 10], [3, 8], [4, 4], [5, 6]], \"idx\": 0, \"support\": [6, 7, 8, 9, 10, 11, 12]}, \"colored_edge\": {\"edge\": [0, 1], \"hist\": [[[0, 0, [0, [1, 1, 2, 2]]], 1], [[0, 0, [0, [1, 2, 2, 3]]], 2], [[0, 0, [0, [2, 2, 2, 3]]], 4], [[0, 0, [1, [0, 1, 1, 2]]], 2], [[0, 1, [0, [1, 1, 2, 2]]], 3], [[0, 1, [0, [1, 2, 2, 2]]], 4], [[0, 1, [0, [1, 2, 2, 3]]], 2], [[0, 1, [0, [2, 2, 2, 2]]], 1], [[0, 1, [0, [2, 2, 2, 3]]], 4], [[0, 1, [0, [2, 2, 3, 3]]], 2], [[0, 1, [1, [0, 1, 1, 1]]], 2], [[0, 1, [1, [0, 1, 1, 2]]], 2]], \"idx\": 0, \"value\": 0}, \"column\": 0,...", "score": 3, "source": "edge_column_assignment_bridge"}
- {"kind": "list30", "length": 30, "path": "$.layer_reports.assignment.ids", "sample": "[1, 2, 3, 4, 5, 6, 7, 8]", "score": 3, "source": "edge_column_assignment_bridge"}
- {"kind": "list30", "length": 30, "path": "$.layer_reports.assignment.normalized_ids", "sample": "[0, 1, 2, 3, 4, 5, 6, 7]", "score": 3, "source": "edge_column_assignment_bridge"}
- {"kind": "list30", "length": 30, "path": "$.layer_reports.colored_edges.ids", "sample": "[0, 1, 2, 3, 4, 5, 6, 7]", "score": 3, "source": "edge_column_assignment_bridge"}
- {"kind": "list30", "length": 30, "path": "$.layer_reports.petrie_edges.ids", "sample": "[0, 1, 2, 3, 4, 5, 6, 7]", "score": 3, "source": "edge_column_assignment_bridge"}
- {"kind": "list30", "length": 30, "path": "$.layer_reports.signatures_edges.ids", "sample": "[0, 1, 2, 3, 4, 5, 6, 7]", "score": 3, "source": "edge_column_assignment_bridge"}
- {"kind": "list30", "length": 30, "path": "$.alignment_rows", "sample": "[{\"M_row_support\": [6, 7, 8, 9, 10, 11, 12], \"alignment_hash\": \"50da1342f0a922f4995b70a106c9ee41d4bbae660b426f56fa597a302fe7adf5\", \"all_local_checks_pass\": true, \"assignment_cocycle_value\": 0, \"assignment_edge\": [0, 1], \"assignment_support\": [6, 7, 8, 9, 10, 11, 12], \"checks\": {\"cocycle_value_agrees_colored_value\": true, \"column_index_agrees\": true, \"edge_agrees_assignment_colored\": true, \"edge_agrees_assignment_petrie\": true, \"edge_agrees_assignment_signature\": true, \"support_agrees_assignment\": true, \"support_agrees_colored_column\": true, \"support_agrees_signature_column\": true}, \"colored_column_support\": [6, 7, 8, 9, 10, 11, 12], \"colored_edge\": [0, 1], \"colored_edge_value\": 0, \"column\": 0, \"normalized_assignment_column\": 0, \"petrie_edge\": [0, 1], \"signature_column_support\": [6, 7, 8, 9, 10, 11, 12], \"signature_edge\": [0, 1]}, {\"M_row_support\": [4, 6, 7, 9, 11, 12, 14], \"alignment_has...", "score": 3, "source": "edge_column_transport_role_alignment"}

## Per-source counts

- row_to_global_attempt: {"key_hits": 116, "list30_hits": 0, "pair_list_hits": 0, "row_records": 59, "string_hits": 4}
- uniform_lift: {"key_hits": 110, "list30_hits": 0, "pair_list_hits": 0, "row_records": 36, "string_hits": 2}
- uniform_lift_inspection: {"key_hits": 18, "list30_hits": 0, "pair_list_hits": 0, "row_records": 18, "string_hits": 0}
- edge_column_assignment_bridge: {"key_hits": 64, "list30_hits": 10, "pair_list_hits": 0, "row_records": 0, "string_hits": 0}
- edge_column_transport_role_alignment: {"key_hits": 61, "list30_hits": 1, "pair_list_hits": 0, "row_records": 0, "string_hits": 0}
- role_geometry: {"key_hits": 10, "list30_hits": 0, "pair_list_hits": 0, "row_records": 5, "string_hits": 0}
- normalized_preimage: {"key_hits": 36, "list30_hits": 0, "pair_list_hits": 0, "row_records": 36, "string_hits": 0}
- surrounding_cell_context: {"key_hits": 30, "list30_hits": 0, "pair_list_hits": 0, "row_records": 5, "string_hits": 0}
- neighbor_port_rule: {"key_hits": 5, "list30_hits": 0, "pair_list_hits": 0, "row_records": 5, "string_hits": 0}

## Best candidate

{
  "kind": "list30",
  "length": 30,
  "path": "$.indexing_repair.normalized_columns",
  "sample": "[0, 1, 2, 3, 4, 5, 6, 7]",
  "score": 11,
  "source": "edge_column_assignment_bridge"
}

## Interpretation

- main_result: The previous row-to-global attempt failed because the adapter did not find the column-to-slot-pair map.
- next_move: Use the best candidate source to build an explicit column-to-slot-pair extraction adapter, then rerun the row-to-global witness map.

## Checks

- PASS row_to_global_attempt_loaded: registered_boundary_flux/artifacts/json/gap_a_rows_to_global_carrier_witnesses_001.v1.json
- PASS uniform_lift_loaded: registered_boundary_flux/artifacts/json/gap_a_uniform_15_thalion_row_lift_001.v1.json
- PASS normalized_preimage_loaded: registered_boundary_flux/artifacts/json/gap_a_source_preimage_from_normalized_zero_rows_001.v1.json
- PASS schema_reports_created: 9
- PASS candidate_sources_found: [{"kind": "list30", "length": 30, "path": "$.indexing_repair.normalized_columns", "sample": "[0, 1, 2, 3, 4, 5, 6, 7]", "score": 11, "source": "edge_column_assignment_bridge"}, {"kind": "list30", "length": 30, "path": "$.indexing_repair.raw_columns", "sample": "[1, 2, 3, 4, 5, 6, 7, 8]", "score": 11, "source": "edge_column_assignment_bridge"}, {"kind": "list30", "length": 30, "path": "$.layer_reports.colored_columns.ids", "sample": "[0, 1, 2, 3, 4, 5, 6, 7]", "score": 7, "source": "edge_column_assignment_bridge"}, {"kind": "list30", "length": 30, "path": "$.layer_reports.signatures_columns.ids", "sample": "[0, 1, 2, 3, 4, 5, 6, 7]", "score": 7, "source": "edge_column_assignment_bridge"}, {"kind": "list30", "length": 30, "path": "$.bridge_records", "sample": "[{\"M_row_support\": [6, 7, 8, 9, 10, 11, 12], \"M_row_support_hash\": \"dc602fb702a3ad6cb8a486bb9a5c2eda7d5727aea513c314c7302b6262387639\", \"assignment\": {\"cocycle_value\": 0, \"column\": 1, \"edge\": [0, 1], \"support\": [6, 7, 8, 9, 10, 11, 12]}, \"bridge_hash\": \"37c5d170b7eb0e7d57354978651d28bc0b4f924b53064b074ee32775462e0af4\", \"colored_column\": {\"hist\": [[1, 1], [2, 10], [3, 8], [4, 4], [5, 6]], \"idx\": 0, \"support\": [6, 7, 8, 9, 10, 11, 12]}, \"colored_edge\": {\"edge\": [0, 1], \"hist\": [[[0, 0, [0, [1, 1, 2, 2]]], 1], [[0, 0, [0, [1, 2, 2, 3]]], 2], [[0, 0, [0, [2, 2, 2, 3]]], 4], [[0, 0, [1, [0, 1, 1, 2]]], 2], [[0, 1, [0, [1, 1, 2, 2]]], 3], [[0, 1, [0, [1, 2, 2, 2]]], 4], [[0, 1, [0, [1, 2, 2, 3]]], 2], [[0, 1, [0, [2, 2, 2, 2]]], 1], [[0, 1, [0, [2, 2, 2, 3]]], 4], [[0, 1, [0, [2, 2, 3, 3]]], 2], [[0, 1, [1, [0, 1, 1, 1]]], 2], [[0, 1, [1, [0, 1, 1, 2]]], 2]], \"idx\": 0, \"value\": 0}, \"column\": 0,...", "score": 3, "source": "edge_column_assignment_bridge"}, {"kind": "list30", "length": 30, "path": "$.layer_reports.assignment.ids", "sample": "[1, 2, 3, 4, 5, 6, 7, 8]", "score": 3, "source": "edge_column_assignment_bridge"}, {"kind": "list30", "length": 30, "path": "$.layer_reports.assignment.normalized_ids", "sample": "[0, 1, 2, 3, 4, 5, 6, 7]", "score": 3, "source": "edge_column_assignment_bridge"}, {"kind": "list30", "length": 30, "path": "$.layer_reports.colored_edges.ids", "sample": "[0, 1, 2, 3, 4, 5, 6, 7]", "score": 3, "source": "edge_column_assignment_bridge"}]
- PASS gap_a_not_closed: schema inspection only

## Next script

    extract_gap_a_column_slot_pair_map_001.py
