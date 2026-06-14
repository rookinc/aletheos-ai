# Gap A 15-thalion ring schema 001

Status: gap_a_15_thalion_ring_schema_recovered_residual_blind

## Boundary

- Residual labels are not used in this pass.
- This is schema recovery, not Gap A closure.
- The 15-thalion ring is still a leading candidate, not a proved source map.
- Later residual evaluation must use only features derived here or in a uniform lift.

## Schema map

- vertex_id_pattern: "Tss_Sll where ss is thalion slot 0..14 and ll is local G60 state 0..59"
- expected_slot_count: 15
- expected_local_state_count_per_slot: 60
- expected_vertex_count: 900
- expected_edge_count: 3600
- source_edge_kind_names: ["external_signed_carrier", "inter_thalion_diagonal_carrier", "internal_thalion_copy"]
- twisted_edge_law_names: ["g60_internal", "half_flip_x_plus_30", "identity"]
- untwisted_edge_law_names: ["g15_line_petersen_slot_adjacency", "g60_edge_list"]
- field_basis: {"vertex": ["id parsed by Tss_Sll"], "edge": ["kind", "law", "source", "u", "v"], "twist_candidates": ["law", "kind", "source", "slot_delta_mod15", "local_delta_mod60"]}

## Source summaries

### g900_candidate_edges

- path: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/generated/g900_candidate_edges.json
- top_keys: ["summary", "vertices", "slot_edges_g15_line_petersen", "edges"]
- vertex_summary: {"local_max": 59, "local_min": 0, "local_state_count": 60, "pair_count": 900, "parsed_vertex_count": 900, "per_local_hist": {"15": 60}, "per_slot_hist": {"60": 15}, "sample_vertices": ["T00_S00", "T00_S01", "T00_S02", "T00_S03", "T00_S04", "T00_S05", "T00_S06", "T00_S07"], "slot_count": 15, "slot_max": 14, "slot_min": 0, "unique_raw_id_count": 900, "vertex_count": 900}
- edge_summary: {"different_slot_edge_count": 1800, "edge_count": 3600, "field_union": ["kind", "source", "u", "v"], "kind_hist": {"inter_thalion_diagonal_carrier": 1800, "internal_thalion_copy": 1800}, "law_hist": {"g15_line_petersen_slot_adjacency": 1800, "g60_edge_list": 1800}, "local_delta_mod60_hist": {"0": 1800, "1": 15, "11": 75, "12": 120, "13": 15, "14": 75, "15": 30, "16": 15, "18": 15, "19": 15, "22": 15, "23": 15, "24": 30, "25": 30, "27": 15, "28": 15, "31": 15, "32": 15, "33": 30, "34": 30, "36": 30, "37": 15, "38": 30, "39": 15, "4": 285, "41": 30, "42": 60, "43": 30, "44": 45, "45": 30, "46": 45, "52": 30, "55": 30, "6": 345, "8": 120, "9": 75}, "same_slot_edge_count": 1800, "slot_delta_mod15_hist": {"0": 1800, "1": 540, "10": 300, "11": 240, "3": 60, "4": 240, "5": 120, "6": 120, "7": 120, "8": 60}}

### g900_candidate_graph_export

- path: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/exports/g900_candidate_graph_export.json
- top_keys: ["status", "vertices", "edges", "fingerprint"]
- vertex_summary: {"local_max": 59, "local_min": 0, "local_state_count": 60, "pair_count": 900, "parsed_vertex_count": 900, "per_local_hist": {"15": 60}, "per_slot_hist": {"60": 15}, "sample_vertices": ["T00_S00", "T00_S01", "T00_S02", "T00_S03", "T00_S04", "T00_S05", "T00_S06", "T00_S07"], "slot_count": 15, "slot_max": 14, "slot_min": 0, "unique_raw_id_count": 900, "vertex_count": 900}
- edge_summary: {"different_slot_edge_count": 1800, "edge_count": 3600, "field_union": ["kind", "source", "u", "v"], "kind_hist": {"inter_thalion_diagonal_carrier": 1800, "internal_thalion_copy": 1800}, "law_hist": {"g15_line_petersen_slot_adjacency": 1800, "g60_edge_list": 1800}, "local_delta_mod60_hist": {"0": 1800, "1": 15, "11": 75, "12": 120, "13": 15, "14": 75, "15": 30, "16": 15, "18": 15, "19": 15, "22": 15, "23": 15, "24": 30, "25": 30, "27": 15, "28": 15, "31": 15, "32": 15, "33": 30, "34": 30, "36": 30, "37": 15, "38": 30, "39": 15, "4": 285, "41": 30, "42": 60, "43": 30, "44": 45, "45": 30, "46": 45, "52": 30, "55": 30, "6": 345, "8": 120, "9": 75}, "same_slot_edge_count": 1800, "slot_delta_mod15_hist": {"0": 1800, "1": 540, "10": 300, "11": 240, "3": 60, "4": 240, "5": 120, "6": 120, "7": 120, "8": 60}}

### g900_twisted_ring_candidate_edges

- path: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/generated/g900_twisted_ring_candidate_edges.json
- top_keys: ["summary", "edges"]
- vertex_summary: {"local_max": null, "local_min": null, "local_state_count": 0, "pair_count": 0, "parsed_vertex_count": 0, "per_local_hist": {}, "per_slot_hist": {}, "sample_vertices": [], "slot_count": 0, "slot_max": null, "slot_min": null, "unique_raw_id_count": 0, "vertex_count": 0}
- edge_summary: {"different_slot_edge_count": 1800, "edge_count": 3600, "field_union": ["kind", "law", "source", "u", "v"], "kind_hist": {"external_signed_carrier": 1800, "internal_thalion_copy": 1800}, "law_hist": {"g60_internal": 1800, "half_flip_x_plus_30": 900, "identity": 900}, "local_delta_mod60_hist": {"0": 900, "1": 15, "11": 75, "12": 120, "13": 15, "14": 75, "15": 30, "16": 15, "18": 15, "19": 15, "22": 15, "23": 15, "24": 30, "25": 30, "27": 15, "28": 15, "30": 900, "31": 15, "32": 15, "33": 30, "34": 30, "36": 30, "37": 15, "38": 30, "39": 15, "4": 285, "41": 30, "42": 60, "43": 30, "44": 45, "45": 30, "46": 45, "52": 30, "55": 30, "6": 345, "8": 120, "9": 75}, "same_slot_edge_count": 1800, "slot_delta_mod15_hist": {"0": 1800, "1": 540, "2": 60, "3": 120, "4": 180, "5": 420, "6": 360, "7": 60, "9": 60}}

### g900_twisted_ring_candidate_export

- path: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/exports/g900_twisted_ring_candidate_export.json
- top_keys: ["status", "vertices", "edges", "fingerprint"]
- vertex_summary: {"local_max": 59, "local_min": 0, "local_state_count": 60, "pair_count": 900, "parsed_vertex_count": 900, "per_local_hist": {"15": 60}, "per_slot_hist": {"60": 15}, "sample_vertices": ["T00_S00", "T00_S01", "T00_S02", "T00_S03", "T00_S04", "T00_S05", "T00_S06", "T00_S07"], "slot_count": 15, "slot_max": 14, "slot_min": 0, "unique_raw_id_count": 900, "vertex_count": 900}
- edge_summary: {"different_slot_edge_count": 1800, "edge_count": 3600, "field_union": ["kind", "law", "source", "u", "v"], "kind_hist": {"external_signed_carrier": 1800, "internal_thalion_copy": 1800}, "law_hist": {"g60_internal": 1800, "half_flip_x_plus_30": 900, "identity": 900}, "local_delta_mod60_hist": {"0": 900, "1": 15, "11": 75, "12": 120, "13": 15, "14": 75, "15": 30, "16": 15, "18": 15, "19": 15, "22": 15, "23": 15, "24": 30, "25": 30, "27": 15, "28": 15, "30": 900, "31": 15, "32": 15, "33": 30, "34": 30, "36": 30, "37": 15, "38": 30, "39": 15, "4": 285, "41": 30, "42": 60, "43": 30, "44": 45, "45": 30, "46": 45, "52": 30, "55": 30, "6": 345, "8": 120, "9": 75}, "same_slot_edge_count": 1800, "slot_delta_mod15_hist": {"0": 1800, "1": 540, "2": 60, "3": 120, "4": 180, "5": 420, "6": 360, "7": 60, "9": 60}}

### proposed_g900_vertex_register_candidate

- path: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/artifacts/json/301_proposed_g900_vertex_register_candidate.json
- top_keys: ["artifact", "status", "source_status", "phase", "thalean_iteration_cycle", "source_rule", "census_search_target", "construction_basis", "vertex_count", "unique_vertex_ids", "vertices", "boundary"]
- vertex_summary: {"local_max": 59, "local_min": 0, "local_state_count": 60, "pair_count": 900, "parsed_vertex_count": 900, "per_local_hist": {"15": 60}, "per_slot_hist": {"60": 15}, "sample_vertices": ["T00_S00", "T00_S01", "T00_S02", "T00_S03", "T00_S04", "T00_S05", "T00_S06", "T00_S07"], "slot_count": 15, "slot_max": 14, "slot_min": 0, "unique_raw_id_count": 900, "vertex_count": 900}
- edge_summary: {"different_slot_edge_count": 0, "edge_count": 0, "field_union": [], "kind_hist": {}, "law_hist": {}, "local_delta_mod60_hist": {}, "same_slot_edge_count": 0, "slot_delta_mod15_hist": {}}

### p900_external_permutation_law_audit

- path: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/audits/p900_external_permutation_law_audit.json
- top_keys: ["status", "audit_count", "preferred_external_audit", "audits", "interpretation", "boundary"]
- vertex_summary: {"local_max": null, "local_min": null, "local_state_count": 0, "pair_count": 0, "parsed_vertex_count": 0, "per_local_hist": {}, "per_slot_hist": {}, "sample_vertices": [], "slot_count": 0, "slot_max": null, "slot_min": null, "unique_raw_id_count": 0, "vertex_count": 0}
- edge_summary: {"different_slot_edge_count": 0, "edge_count": 0, "field_union": [], "kind_hist": {}, "law_hist": {}, "local_delta_mod60_hist": {}, "same_slot_edge_count": 0, "slot_delta_mod15_hist": {}}

### p900_phase5_binary_half_turn_holonomy

- path: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/14-p900-consonance-surface/artifacts/json/p900_phase5_binary_half_turn_holonomy.json
- top_keys: ["closure_type_histogram", "coupling_edge_count", "cycle_count", "cycle_length_histogram", "cycle_search_max_length", "external_degree_histogram", "external_degree_max", "external_degree_min", "first_read", "g15_edges", "g15_model", "g15_positions", "half_turn_closure_count", "holonomy_shift_histogram_mod_60", "identity_closure_count", "name", "orientation_drift_count", "p900_state_count", "records", "status", "warning"]
- vertex_summary: {"local_max": null, "local_min": null, "local_state_count": 0, "pair_count": 0, "parsed_vertex_count": 0, "per_local_hist": {}, "per_slot_hist": {}, "sample_vertices": [], "slot_count": 0, "slot_max": null, "slot_min": null, "unique_raw_id_count": 0, "vertex_count": 0}
- edge_summary: {"different_slot_edge_count": 0, "edge_count": 0, "field_union": [], "kind_hist": {}, "law_hist": {}, "local_delta_mod60_hist": {}, "same_slot_edge_count": 0, "slot_delta_mod15_hist": {}}

### p900_phase4_cycle_holonomy_stub

- path: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/14-p900-consonance-surface/artifacts/json/p900_phase4_cycle_holonomy_stub.json
- top_keys: ["closure_type_histogram", "cycle_count", "cycle_length_histogram", "cycle_search_max_length", "first_read", "g15_edges", "g15_model", "g15_positions", "half_turn_closure_count", "holonomy_shift_histogram_mod_60", "identity_closure_count", "name", "orientation_drift_count", "records", "status", "warning"]
- vertex_summary: {"local_max": null, "local_min": null, "local_state_count": 0, "pair_count": 0, "parsed_vertex_count": 0, "per_local_hist": {}, "per_slot_hist": {}, "sample_vertices": [], "slot_count": 0, "slot_max": null, "slot_min": null, "unique_raw_id_count": 0, "vertex_count": 0}
- edge_summary: {"different_slot_edge_count": 0, "edge_count": 0, "field_union": [], "kind_hist": {}, "law_hist": {}, "local_delta_mod60_hist": {}, "same_slot_edge_count": 0, "slot_delta_mod15_hist": {}}

## Edge comparisons

- generated_untwisted_vs_twisted: {"directed_kind_intersection": 0, "directed_kind_only_a": 3600, "directed_kind_only_b": 3600, "directed_plain_intersection": 2040, "directed_plain_only_a": 1560, "directed_plain_only_b": 1560, "sample_directed_only_a": [["T00_S00", "T01_S00"], ["T00_S00", "T04_S00"], ["T00_S00", "T10_S00"], ["T00_S00", "T11_S00"], ["T00_S01", "T01_S01"], ["T00_S01", "T04_S01"], ["T00_S01", "T10_S01"], ["T00_S01", "T11_S01"]], "sample_directed_only_b": [["T00_S00", "T01_S30"], ["T00_S00", "T04_S30"], ["T00_S00", "T05_S30"], ["T00_S00", "T06_S30"], ["T00_S01", "T01_S31"], ["T00_S01", "T04_S31"], ["T00_S01", "T05_S31"], ["T00_S01", "T06_S31"]], "undirected_plain_intersection": 2040, "undirected_plain_only_a": 1560, "undirected_plain_only_b": 1560}
- export_untwisted_vs_twisted: {"directed_kind_intersection": 0, "directed_kind_only_a": 3600, "directed_kind_only_b": 3600, "directed_plain_intersection": 2040, "directed_plain_only_a": 1560, "directed_plain_only_b": 1560, "sample_directed_only_a": [["T00_S00", "T01_S00"], ["T00_S00", "T04_S00"], ["T00_S00", "T10_S00"], ["T00_S00", "T11_S00"], ["T00_S01", "T01_S01"], ["T00_S01", "T04_S01"], ["T00_S01", "T10_S01"], ["T00_S01", "T11_S01"]], "sample_directed_only_b": [["T00_S00", "T01_S30"], ["T00_S00", "T04_S30"], ["T00_S00", "T05_S30"], ["T00_S00", "T06_S30"], ["T00_S01", "T01_S31"], ["T00_S01", "T04_S31"], ["T00_S01", "T05_S31"], ["T00_S01", "T06_S31"]], "undirected_plain_intersection": 2040, "undirected_plain_only_a": 1560, "undirected_plain_only_b": 1560}
- generated_vs_export_untwisted: {"directed_kind_intersection": 3600, "directed_kind_only_a": 0, "directed_kind_only_b": 0, "directed_plain_intersection": 3600, "directed_plain_only_a": 0, "directed_plain_only_b": 0, "sample_directed_only_a": [], "sample_directed_only_b": [], "undirected_plain_intersection": 3600, "undirected_plain_only_a": 0, "undirected_plain_only_b": 0}
- generated_vs_export_twisted: {"directed_kind_intersection": 3600, "directed_kind_only_a": 0, "directed_kind_only_b": 0, "directed_plain_intersection": 3600, "directed_plain_only_a": 0, "directed_plain_only_b": 0, "sample_directed_only_a": [], "sample_directed_only_b": [], "undirected_plain_intersection": 3600, "undirected_plain_only_a": 0, "undirected_plain_only_b": 0}

## Interpretation

- main_result: The 15-thalion ring schema is recoverable without using Gap A residual labels.
- vertex_result: The source uses the product register Tss_Sll, giving 15 thalion slots and 60 local states per slot.
- edge_result: The candidate ring sources expose 3600 edges and an edge-kind/law basis suitable for internal-versus-carrier testing.
- twist_result: Untwisted and twisted candidates can be compared at the directed edge-set and edge-law level.
- next_question: Can all 18 WXYZTI role rows be lifted uniformly into this recovered ring schema?

## Checks

- PASS test_plan_loaded: status=gap_a_15_thalion_ring_test_plan_recorded
- PASS source_exists_g900_candidate_edges: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/generated/g900_candidate_edges.json
- PASS source_no_error_g900_candidate_edges: None
- PASS source_exists_g900_candidate_graph_export: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/exports/g900_candidate_graph_export.json
- PASS source_no_error_g900_candidate_graph_export: None
- PASS source_exists_g900_twisted_ring_candidate_edges: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/generated/g900_twisted_ring_candidate_edges.json
- PASS source_no_error_g900_twisted_ring_candidate_edges: None
- PASS source_exists_g900_twisted_ring_candidate_export: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/exports/g900_twisted_ring_candidate_export.json
- PASS source_no_error_g900_twisted_ring_candidate_export: None
- PASS source_exists_proposed_g900_vertex_register_candidate: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/artifacts/json/301_proposed_g900_vertex_register_candidate.json
- PASS source_no_error_proposed_g900_vertex_register_candidate: None
- PASS source_exists_p900_external_permutation_law_audit: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/audits/p900_external_permutation_law_audit.json
- PASS source_no_error_p900_external_permutation_law_audit: None
- PASS source_exists_p900_phase5_binary_half_turn_holonomy: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/14-p900-consonance-surface/artifacts/json/p900_phase5_binary_half_turn_holonomy.json
- PASS source_no_error_p900_phase5_binary_half_turn_holonomy: None
- PASS source_exists_p900_phase4_cycle_holonomy_stub: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/14-p900-consonance-surface/artifacts/json/p900_phase4_cycle_holonomy_stub.json
- PASS source_no_error_p900_phase4_cycle_holonomy_stub: None
- PASS g900_candidate_graph_export_has_900_vertices: {"local_max": 59, "local_min": 0, "local_state_count": 60, "pair_count": 900, "parsed_vertex_count": 900, "per_local_hist": {"15": 60}, "per_slot_hist": {"60": 15}, "sample_vertices": ["T00_S00", "T00_S01", "T00_S02", "T00_S03", "T00_S04", "T00_S05", "T00_S06", "T00_S07"], "slot_count": 15, "slot_max": 14, "slot_min": 0, "unique_raw_id_count": 900, "vertex_count": 900}
- PASS g900_candidate_graph_export_has_15_slots: {"local_max": 59, "local_min": 0, "local_state_count": 60, "pair_count": 900, "parsed_vertex_count": 900, "per_local_hist": {"15": 60}, "per_slot_hist": {"60": 15}, "sample_vertices": ["T00_S00", "T00_S01", "T00_S02", "T00_S03", "T00_S04", "T00_S05", "T00_S06", "T00_S07"], "slot_count": 15, "slot_max": 14, "slot_min": 0, "unique_raw_id_count": 900, "vertex_count": 900}
- PASS g900_candidate_graph_export_has_60_locals: {"local_max": 59, "local_min": 0, "local_state_count": 60, "pair_count": 900, "parsed_vertex_count": 900, "per_local_hist": {"15": 60}, "per_slot_hist": {"60": 15}, "sample_vertices": ["T00_S00", "T00_S01", "T00_S02", "T00_S03", "T00_S04", "T00_S05", "T00_S06", "T00_S07"], "slot_count": 15, "slot_max": 14, "slot_min": 0, "unique_raw_id_count": 900, "vertex_count": 900}
- PASS g900_twisted_ring_candidate_export_has_900_vertices: {"local_max": 59, "local_min": 0, "local_state_count": 60, "pair_count": 900, "parsed_vertex_count": 900, "per_local_hist": {"15": 60}, "per_slot_hist": {"60": 15}, "sample_vertices": ["T00_S00", "T00_S01", "T00_S02", "T00_S03", "T00_S04", "T00_S05", "T00_S06", "T00_S07"], "slot_count": 15, "slot_max": 14, "slot_min": 0, "unique_raw_id_count": 900, "vertex_count": 900}
- PASS g900_twisted_ring_candidate_export_has_15_slots: {"local_max": 59, "local_min": 0, "local_state_count": 60, "pair_count": 900, "parsed_vertex_count": 900, "per_local_hist": {"15": 60}, "per_slot_hist": {"60": 15}, "sample_vertices": ["T00_S00", "T00_S01", "T00_S02", "T00_S03", "T00_S04", "T00_S05", "T00_S06", "T00_S07"], "slot_count": 15, "slot_max": 14, "slot_min": 0, "unique_raw_id_count": 900, "vertex_count": 900}
- PASS g900_twisted_ring_candidate_export_has_60_locals: {"local_max": 59, "local_min": 0, "local_state_count": 60, "pair_count": 900, "parsed_vertex_count": 900, "per_local_hist": {"15": 60}, "per_slot_hist": {"60": 15}, "sample_vertices": ["T00_S00", "T00_S01", "T00_S02", "T00_S03", "T00_S04", "T00_S05", "T00_S06", "T00_S07"], "slot_count": 15, "slot_max": 14, "slot_min": 0, "unique_raw_id_count": 900, "vertex_count": 900}
- PASS proposed_g900_vertex_register_candidate_has_900_vertices: {"local_max": 59, "local_min": 0, "local_state_count": 60, "pair_count": 900, "parsed_vertex_count": 900, "per_local_hist": {"15": 60}, "per_slot_hist": {"60": 15}, "sample_vertices": ["T00_S00", "T00_S01", "T00_S02", "T00_S03", "T00_S04", "T00_S05", "T00_S06", "T00_S07"], "slot_count": 15, "slot_max": 14, "slot_min": 0, "unique_raw_id_count": 900, "vertex_count": 900}
- PASS proposed_g900_vertex_register_candidate_has_15_slots: {"local_max": 59, "local_min": 0, "local_state_count": 60, "pair_count": 900, "parsed_vertex_count": 900, "per_local_hist": {"15": 60}, "per_slot_hist": {"60": 15}, "sample_vertices": ["T00_S00", "T00_S01", "T00_S02", "T00_S03", "T00_S04", "T00_S05", "T00_S06", "T00_S07"], "slot_count": 15, "slot_max": 14, "slot_min": 0, "unique_raw_id_count": 900, "vertex_count": 900}
- PASS proposed_g900_vertex_register_candidate_has_60_locals: {"local_max": 59, "local_min": 0, "local_state_count": 60, "pair_count": 900, "parsed_vertex_count": 900, "per_local_hist": {"15": 60}, "per_slot_hist": {"60": 15}, "sample_vertices": ["T00_S00", "T00_S01", "T00_S02", "T00_S03", "T00_S04", "T00_S05", "T00_S06", "T00_S07"], "slot_count": 15, "slot_max": 14, "slot_min": 0, "unique_raw_id_count": 900, "vertex_count": 900}
- PASS g900_candidate_edges_has_3600_edges: edge_count=3600
- PASS g900_candidate_edges_has_parsed_endpoints: parsed=3600
- PASS g900_candidate_graph_export_has_3600_edges: edge_count=3600
- PASS g900_candidate_graph_export_has_parsed_endpoints: parsed=3600
- PASS g900_twisted_ring_candidate_edges_has_3600_edges: edge_count=3600
- PASS g900_twisted_ring_candidate_edges_has_parsed_endpoints: parsed=3600
- PASS g900_twisted_ring_candidate_export_has_3600_edges: edge_count=3600
- PASS g900_twisted_ring_candidate_export_has_parsed_endpoints: parsed=3600
- PASS untwisted_has_internal_edges: {"inter_thalion_diagonal_carrier": 1800, "internal_thalion_copy": 1800}
- PASS twisted_has_internal_edges: {"external_signed_carrier": 1800, "internal_thalion_copy": 1800}
- PASS twisted_vs_untwisted_not_identical_directed: {"directed_kind_intersection": 0, "directed_kind_only_a": 3600, "directed_kind_only_b": 3600, "directed_plain_intersection": 2040, "directed_plain_only_a": 1560, "directed_plain_only_b": 1560, "sample_directed_only_a": [["T00_S00", "T01_S00"], ["T00_S00", "T04_S00"], ["T00_S00", "T10_S00"], ["T00_S00", "T11_S00"], ["T00_S01", "T01_S01"], ["T00_S01", "T04_S01"], ["T00_S01", "T10_S01"], ["T00_S01", "T11_S01"]], "sample_directed_only_b": [["T00_S00", "T01_S30"], ["T00_S00", "T04_S30"], ["T00_S00", "T05_S30"], ["T00_S00", "T06_S30"], ["T00_S01", "T01_S31"], ["T00_S01", "T04_S31"], ["T00_S01", "T05_S31"], ["T00_S01", "T06_S31"]], "undirected_plain_intersection": 2040, "undirected_plain_only_a": 1560, "undirected_plain_only_b": 1560}

## Next script

    attempt_gap_a_uniform_15_thalion_row_lift_001.py
