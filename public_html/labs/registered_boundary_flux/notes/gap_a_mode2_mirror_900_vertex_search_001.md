# Gap A Mode 2 mirror 900-vertex search 001

Status: gap_a_mode2_mirror_900_vertex_involution_not_found

## Boundary

- This does not close Gap A.
- A 900-vertex graph involution is not by itself a WXYZTI row generator.
- Candidate transforms are tested from a finite hand-built family.
- Row induction is still scored against projection-derived row labels.
- No physical interpretation is claimed.

## Summary

- search_result: "no_exact_900_vertex_mirror_involution_found"
- gap_a_closed: false
- graph_source_count: 3
- candidate_count: 108
- exact_vertex_involution_count: 3
- exact_mirror_vertex_involution_count: 0
- exact_mirror_with_row_tests_count: 0
- best_candidate_source: "g900_candidate_graph_export"
- best_candidate_slot_transform: "identity"
- best_candidate_local_transform: "identity"
- best_candidate_edge_automorphism_exact: true
- best_candidate_is_vertex_involution: true
- best_candidate_edge_image_jaccard: 1.0
- best_candidate_row_exact_directed_test_count: 12
- best_mirror_source: null
- best_mirror_slot_transform: null
- best_mirror_local_transform: null
- best_mirror_row_exact_directed_test_count: 0
- claim_closes_gap_a: false

## Graph sources

- {"edge_count": 3600, "name": "g900_candidate_graph_export", "path": "/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/exports/g900_candidate_graph_export.json", "vertex_count": 900}
- {"edge_count": 3600, "name": "g900_twisted_ring_candidate_export", "path": "/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/exports/g900_twisted_ring_candidate_export.json", "vertex_count": 900}
- {"edge_count": 3629, "name": "g900_candidate_edges", "path": "/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/generated/g900_candidate_edges.json", "vertex_count": 900}

## Best candidate

{
  "edge_automorphism_exact": true,
  "edge_image_jaccard": 1.0,
  "is_vertex_involution": true,
  "local_transform": "identity",
  "mirror_slot_candidate": false,
  "row_boundary_exact_count": 6,
  "row_center_exact_count": 6,
  "row_exact_directed_test_count": 12,
  "row_turn_exact_count": 2,
  "slot_transform": "identity",
  "source_name": "g900_candidate_graph_export"
}

## Best mirror candidate

none

## Top candidates

- {"edge_automorphism_exact": true, "edge_image_jaccard": 1.0, "is_vertex_involution": true, "local_transform": "identity", "mirror_slot_candidate": false, "missing_image_edge_count": 0, "row_boundary_exact_count": 6, "row_exact_directed_test_count": 12, "row_turn_exact_count": 2, "slot_transform": "identity", "source_name": "g900_candidate_graph_export"}
- {"edge_automorphism_exact": true, "edge_image_jaccard": 1.0, "is_vertex_involution": true, "local_transform": "identity", "mirror_slot_candidate": false, "missing_image_edge_count": 0, "row_boundary_exact_count": 6, "row_exact_directed_test_count": 12, "row_turn_exact_count": 2, "slot_transform": "identity", "source_name": "g900_twisted_ring_candidate_export"}
- {"edge_automorphism_exact": true, "edge_image_jaccard": 1.0, "is_vertex_involution": true, "local_transform": "identity", "mirror_slot_candidate": false, "missing_image_edge_count": 0, "row_boundary_exact_count": 6, "row_exact_directed_test_count": 12, "row_turn_exact_count": 2, "slot_transform": "identity", "source_name": "g900_candidate_edges"}
- {"edge_automorphism_exact": false, "edge_image_jaccard": 0.6, "is_vertex_involution": true, "local_transform": "identity", "mirror_slot_candidate": true, "missing_image_edge_count": 900, "row_boundary_exact_count": 0, "row_exact_directed_test_count": 0, "row_turn_exact_count": 0, "slot_transform": "reflect_14_minus_s", "source_name": "g900_candidate_graph_export"}
- {"edge_automorphism_exact": false, "edge_image_jaccard": 0.6, "is_vertex_involution": true, "local_transform": "identity", "mirror_slot_candidate": true, "missing_image_edge_count": 900, "row_boundary_exact_count": 0, "row_exact_directed_test_count": 0, "row_turn_exact_count": 0, "slot_transform": "cycle_mirror_reverse_local_5x3", "source_name": "g900_candidate_graph_export"}
- {"edge_automorphism_exact": false, "edge_image_jaccard": 0.5923650724001756, "is_vertex_involution": true, "local_transform": "identity", "mirror_slot_candidate": true, "missing_image_edge_count": 929, "row_boundary_exact_count": 0, "row_exact_directed_test_count": 0, "row_turn_exact_count": 0, "slot_transform": "reflect_14_minus_s", "source_name": "g900_candidate_edges"}
- {"edge_automorphism_exact": false, "edge_image_jaccard": 0.5923650724001756, "is_vertex_involution": true, "local_transform": "identity", "mirror_slot_candidate": true, "missing_image_edge_count": 929, "row_boundary_exact_count": 0, "row_exact_directed_test_count": 0, "row_turn_exact_count": 0, "slot_transform": "cycle_mirror_reverse_local_5x3", "source_name": "g900_candidate_edges"}
- {"edge_automorphism_exact": false, "edge_image_jaccard": 0.5, "is_vertex_involution": true, "local_transform": "identity", "mirror_slot_candidate": true, "missing_image_edge_count": 1200, "row_boundary_exact_count": 0, "row_exact_directed_test_count": 0, "row_turn_exact_count": 0, "slot_transform": "cycle_mirror_keep_local_5x3", "source_name": "g900_candidate_graph_export"}
- {"edge_automorphism_exact": false, "edge_image_jaccard": 0.49403046521202143, "is_vertex_involution": true, "local_transform": "identity", "mirror_slot_candidate": true, "missing_image_edge_count": 1229, "row_boundary_exact_count": 0, "row_exact_directed_test_count": 0, "row_turn_exact_count": 0, "slot_transform": "cycle_mirror_keep_local_5x3", "source_name": "g900_candidate_edges"}
- {"edge_automorphism_exact": false, "edge_image_jaccard": 0.4634146341463415, "is_vertex_involution": true, "local_transform": "identity", "mirror_slot_candidate": true, "missing_image_edge_count": 1320, "row_boundary_exact_count": 0, "row_exact_directed_test_count": 0, "row_turn_exact_count": 0, "slot_transform": "cycle_mirror_keep_local_5x3", "source_name": "g900_twisted_ring_candidate_export"}
- {"edge_automorphism_exact": false, "edge_image_jaccard": 0.3953488372093023, "is_vertex_involution": true, "local_transform": "identity", "mirror_slot_candidate": true, "missing_image_edge_count": 1560, "row_boundary_exact_count": 0, "row_exact_directed_test_count": 0, "row_turn_exact_count": 0, "slot_transform": "reflect_14_minus_s", "source_name": "g900_twisted_ring_candidate_export"}
- {"edge_automorphism_exact": false, "edge_image_jaccard": 0.3953488372093023, "is_vertex_involution": true, "local_transform": "identity", "mirror_slot_candidate": true, "missing_image_edge_count": 1560, "row_boundary_exact_count": 0, "row_exact_directed_test_count": 0, "row_turn_exact_count": 0, "slot_transform": "cycle_mirror_reverse_local_5x3", "source_name": "g900_twisted_ring_candidate_export"}
- {"edge_automorphism_exact": false, "edge_image_jaccard": 0.2631578947368421, "is_vertex_involution": true, "local_transform": "plus30_mod60", "mirror_slot_candidate": true, "missing_image_edge_count": 2100, "row_boundary_exact_count": 0, "row_exact_directed_test_count": 0, "row_turn_exact_count": 0, "slot_transform": "reflect_14_minus_s", "source_name": "g900_candidate_graph_export"}
- {"edge_automorphism_exact": false, "edge_image_jaccard": 0.2631578947368421, "is_vertex_involution": true, "local_transform": "plus30_mod60", "mirror_slot_candidate": true, "missing_image_edge_count": 2100, "row_boundary_exact_count": 0, "row_exact_directed_test_count": 0, "row_turn_exact_count": 0, "slot_transform": "cycle_mirror_reverse_local_5x3", "source_name": "g900_candidate_graph_export"}
- {"edge_automorphism_exact": false, "edge_image_jaccard": 0.26094510076441974, "is_vertex_involution": true, "local_transform": "plus30_mod60", "mirror_slot_candidate": true, "missing_image_edge_count": 2127, "row_boundary_exact_count": 0, "row_exact_directed_test_count": 0, "row_turn_exact_count": 0, "slot_transform": "reflect_14_minus_s", "source_name": "g900_candidate_edges"}
- {"edge_automorphism_exact": false, "edge_image_jaccard": 0.26094510076441974, "is_vertex_involution": true, "local_transform": "plus30_mod60", "mirror_slot_candidate": true, "missing_image_edge_count": 2127, "row_boundary_exact_count": 0, "row_exact_directed_test_count": 0, "row_turn_exact_count": 0, "slot_transform": "cycle_mirror_reverse_local_5x3", "source_name": "g900_candidate_edges"}
- {"edge_automorphism_exact": false, "edge_image_jaccard": 0.22448979591836735, "is_vertex_involution": true, "local_transform": "reflect_59_minus_l", "mirror_slot_candidate": true, "missing_image_edge_count": 2280, "row_boundary_exact_count": 0, "row_exact_directed_test_count": 0, "row_turn_exact_count": 0, "slot_transform": "reflect_14_minus_s", "source_name": "g900_candidate_graph_export"}
- {"edge_automorphism_exact": false, "edge_image_jaccard": 0.22448979591836735, "is_vertex_involution": true, "local_transform": "reflect_59_minus_l", "mirror_slot_candidate": true, "missing_image_edge_count": 2280, "row_boundary_exact_count": 0, "row_exact_directed_test_count": 0, "row_turn_exact_count": 0, "slot_transform": "cycle_mirror_reverse_local_5x3", "source_name": "g900_candidate_graph_export"}
- {"edge_automorphism_exact": false, "edge_image_jaccard": 0.2239460370994941, "is_vertex_involution": true, "local_transform": "reflect_59_minus_l", "mirror_slot_candidate": true, "missing_image_edge_count": 2301, "row_boundary_exact_count": 0, "row_exact_directed_test_count": 0, "row_turn_exact_count": 0, "slot_transform": "reflect_14_minus_s", "source_name": "g900_candidate_edges"}
- {"edge_automorphism_exact": false, "edge_image_jaccard": 0.2239460370994941, "is_vertex_involution": true, "local_transform": "reflect_59_minus_l", "mirror_slot_candidate": true, "missing_image_edge_count": 2301, "row_boundary_exact_count": 0, "row_exact_directed_test_count": 0, "row_turn_exact_count": 0, "slot_transform": "cycle_mirror_reverse_local_5x3", "source_name": "g900_candidate_edges"}

## Claim

- does_this_close_gap_a: false
- does_this_find_900_vertex_mirror_involution: false
- does_this_find_full_row_generator: false
- does_this_source_derive_wxyzti_register: false
- short_form: "No exact 900-vertex mirror involution was found in the tested transform family."
- not_closed_reason: "The tested vertex transforms do not derive the full WXYZTI row grouping from source."

## Interpretation

- main_result: The tested 900-vertex transform family does not reveal a source-side mirror involution.
- remaining_gap: Even with a vertex involution, we still need a source-derived map from 900 carrier structure to WXYZTI rows.
- next_move: Broaden from hand-built transforms to source-discovered automorphism orbits.

## Checks

- PASS column_involution_search_loaded: gap_a_source_side_involution_for_mode2_mirror_not_found
- PASS mode2_audit_loaded: gap_a_mode2_mirror_return_rule_projection_symmetric_not_source_derived
- PASS mode2_exploration_loaded: gap_a_mode2_wxyztitzyxw_return_path_candidate_found_not_closure
- PASS upstreamed_supports_loaded: gap_a_projection_row_supports_upstreamed_columnwise_complete_not_generator
- PASS boundary_theorem_loaded: gap_a_boundary_theorem_note_recorded
- PASS graph_sources_loaded: 3
- PASS candidate_transforms_tested: 108
- PASS best_candidate_recorded: g900_candidate_graph_export identity identity
- PASS gap_a_not_closed: 900 vertex search only

## Next script

    discover_gap_a_900_vertex_automorphism_orbits_001.py
