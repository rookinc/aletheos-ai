# Gap A surrounding cell context probe 001

Status: gap_a_surrounding_cell_context_probe_recorded

## Boundary

- This does not close Gap A.
- This is a source-rule probe, not a proof.
- Surrounding cells are treated as neighbor boundary conditions, not arbitrary extra data.
- The current exact rule remains local to the zero-twisted neighborhood unless a direct source derivation is found.
- No physical interpretation is claimed.

## Working conjecture

- statement: "Surrounding perfect cells supply neighbor boundary conditions for the local WXYZTI register."
- meaning: "A single Perfect Return Cell displays the local witness, while the 15-thalion ring supplies the environment that distinguishes selected-turn residue from return-path residue."
- current_status: "plausible_source_rule_vector_not_closure"

## Neighborhood

- zero_twisted_neighborhood: [3, 4, 9, 15, 16]
- known_residual_rows: [3, 16]
- candidate_support: [3, 16]

## Context rows

- {"branch_sensitive": false, "branch_stable": true, "columns": [9], "cycle_index": 0, "is_candidate_support": true, "radius_1_twisted_active_context_pairs": [[1, 2], [2, 3], [12, 13], [13, 14]], "radius_1_twisted_context": {"edge_count": 240, "kind_hist": {"external_signed_carrier": 240}, "law_hist": {"half_flip_x_plus_30": 120, "identity": 120}, "local_delta_mod60_hist": {"0": 120, "30": 120}}, "role": "ZT", "row_ordinal": 3, "slot_pair_spans": [4], "slot_pairs": [[2, 13]]}
- {"branch_sensitive": false, "branch_stable": true, "columns": [13], "cycle_index": 0, "is_candidate_support": false, "radius_1_twisted_active_context_pairs": [[3, 4], [4, 5], [4, 9], [5, 10], [10, 11]], "radius_1_twisted_context": {"edge_count": 300, "kind_hist": {"external_signed_carrier": 300}, "law_hist": {"half_flip_x_plus_30": 120, "identity": 180}, "local_delta_mod60_hist": {"0": 180, "30": 120}}, "role": "TI", "row_ordinal": 4, "slot_pair_spans": [6], "slot_pairs": [[4, 10]]}
- {"branch_sensitive": false, "branch_stable": true, "columns": [9, 11, 14], "cycle_index": 1, "is_candidate_support": false, "radius_1_twisted_active_context_pairs": [[0, 4], [1, 2], [2, 3], [3, 4], [4, 5], [5, 14], [12, 13], [13, 14]], "radius_1_twisted_context": {"edge_count": 480, "kind_hist": {"external_signed_carrier": 480}, "law_hist": {"half_flip_x_plus_30": 300, "identity": 180}, "local_delta_mod60_hist": {"0": 180, "30": 300}}, "role": "ZT", "row_ordinal": 9, "slot_pair_spans": [4, 5, 5], "slot_pairs": [[2, 13], [3, 13], [4, 14]]}
- {"branch_sensitive": false, "branch_stable": true, "columns": [21, 22], "cycle_index": 2, "is_candidate_support": false, "radius_1_twisted_active_context_pairs": [[0, 6], [5, 14], [6, 13], [8, 13], [8, 14], [13, 14]], "radius_1_twisted_context": {"edge_count": 360, "kind_hist": {"external_signed_carrier": 360}, "law_hist": {"half_flip_x_plus_30": 120, "identity": 240}, "local_delta_mod60_hist": {"0": 240, "30": 120}}, "role": "ZT", "row_ordinal": 15, "slot_pair_spans": [1, 7], "slot_pairs": [[6, 14], [7, 8]]}
- {"branch_sensitive": true, "branch_stable": false, "columns": [13, 15], "cycle_index": 2, "is_candidate_support": true, "radius_1_twisted_active_context_pairs": [[3, 4], [4, 5], [4, 9], [5, 10], [7, 10], [10, 11]], "radius_1_twisted_context": {"edge_count": 360, "kind_hist": {"external_signed_carrier": 360}, "law_hist": {"half_flip_x_plus_30": 120, "identity": 240}, "local_delta_mod60_hist": {"0": 240, "30": 120}}, "role": "TI", "row_ordinal": 16, "slot_pair_spans": [1, 6], "slot_pairs": [[4, 10], [5, 6]]}

## Exact features

- {"exact": true, "false_positives": [], "misses": [], "name": "source_candidate_rule_branch_sensitive_return_OR_singleton_ZT", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}

## High precision features

- {"exact": false, "false_positives": [], "misses": [3], "name": "branch_sensitive_inside_zero", "precision": 1.0, "recall": 0.5, "residual_hits": [16], "support": [16], "support_count": 1}
- {"exact": false, "false_positives": [], "misses": [16], "name": "singleton_ZT_inside_zero", "precision": 1.0, "recall": 0.5, "residual_hits": [3], "support": [3], "support_count": 1}
- {"exact": true, "false_positives": [], "misses": [], "name": "source_candidate_rule_branch_sensitive_return_OR_singleton_ZT", "precision": 1.0, "recall": 1.0, "residual_hits": [3, 16], "support": [3, 16], "support_count": 2}

## Interpretation

- main_result: The surrounding-cell context probe records the local neighbor environment of the five zero-twisted rows.
- candidate_read: The supported candidate remains branch-sensitive return OR singleton ZT selected-turn.
- neighbor_read: Surrounding cells are now represented as slot-neighborhood context around each zero-twisted row.
- not_closure: This pass does not yet derive the rule directly from neighbor context; it prepares the data needed to try that next.
- next_question: Can a source-derived neighbor-port rule reproduce branch-sensitive return and singleton ZT selected-turn without using residual labels?

## Checks

- PASS interim_loaded: gap_a_zero_twisted_split_interim_note_recorded
- PASS split_loaded: gap_a_zero_twisted_neighborhood_split_candidate_found_not_closure
- PASS nulls_loaded: gap_a_zero_twisted_split_candidate_nulls_recorded
- PASS schema_loaded: gap_a_15_thalion_ring_schema_recovered_residual_blind
- PASS zero_count_5: [3, 4, 9, 15, 16]
- PASS candidate_support_3_16: [3, 16]
- PASS context_rows_5: 5
- PASS twisted_external_index_nonempty: 30
- PASS source_candidate_exact: candidate exact in context probe

## Next script

    derive_gap_a_neighbor_port_rule_001.py
