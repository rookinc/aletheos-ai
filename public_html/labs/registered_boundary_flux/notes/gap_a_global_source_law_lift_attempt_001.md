# Gap A global source-law lift attempt 001

Status: gap_a_global_source_law_lift_attempt_partial_not_closure

## Boundary

- This does not close Gap A.
- This records a partial lift attempt.
- The row-level source law is exact on the tested 18 WXYZTI rows.
- A global source-law chamber/register map is not yet constructed.
- The missing object is a full-carrier bridge from global source states/edges to the 18 WXYZTI row predicates.
- No global exact selector is claimed.
- No physical interpretation is claimed.

## Claim

- does_this_close_gap_a: false
- does_this_construct_global_source_law_map: false
- does_this_give_exact_row_source_law: true
- row_source_law_support: [3, 16]
- stable_complement_support: [4, 9, 15]
- available_global_sources: ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export", "g900_vertex_register_candidate", "p900_phase30_combined_graph_export"]
- missing_global_bridge: "full-carrier bridge from global carrier source states/edges to WXYZTI row predicates"
- short_form: "The exact source law now has normalized row-level support, but the global carrier-to-register lift is still missing."
- not_closed_reason: "Gap A requires the row predicate to be lifted to a full source-derived chamber/register map over the carrier."

## Row law

{
  "domain": "tested 18-row WXYZTI chamber/register table",
  "name": "normalized_zero_twisted_role_column_source_law",
  "predicate": "normalized_zero_twisted(row) AND ((role=ZT AND shape=singleton) OR (role=TI AND shape=multi_column))",
  "stable_complement_predicate": "normalized_zero_twisted(row) AND ((role=TI AND shape=singleton) OR (role=ZT AND shape=multi_column))",
  "stable_complement_support": [
    4,
    9,
    15
  ],
  "support": [
    3,
    16
  ]
}

## Row law result

{
  "changed_breaks": [],
  "changed_fixes": [
    3,
    16
  ],
  "exact": true,
  "match_count": 18,
  "mismatches": [],
  "row_count": 18,
  "support": [
    3,
    16
  ]
}

## Global lift requirements

- {"detail": ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export", "g900_vertex_register_candidate", "p900_phase30_combined_graph_export"], "id": "source_carrier_available", "met": true}
- {"detail": {"changed_breaks": [], "changed_fixes": [3, 16], "exact": true, "match_count": 18, "mismatches": [], "row_count": 18, "support": [3, 16]}, "id": "row_law_exact_on_18_rows", "met": true}
- {"detail": [3, 4, 9, 15, 16], "id": "normalized_zero_rows_source_anchored", "met": true}
- {"detail": "No artifact yet maps the 18 WXYZTI row predicates into a full global carrier predicate over the 900-source/ring graph.", "id": "global_row_embedding_available", "met": false}
- {"detail": "No full-carrier predicate evaluation has been constructed in this attempt.", "id": "global_predicate_evaluated_on_full_carrier", "met": false}
- {"detail": "Stable complement rows [4,9,15] are row-derived here, not globally derived.", "id": "stable_complement_global_derivation_available", "met": false}

## Available global sources

[
  "g900_candidate_edges",
  "g900_candidate_graph_export",
  "g900_twisted_ring_candidate_edges",
  "g900_twisted_ring_candidate_export",
  "g900_vertex_register_candidate",
  "p900_phase30_combined_graph_export"
]

## Global source summaries

### p900_phase30_combined_graph_export

{
  "counts": {
    "candidate_counts": [
      {
        "combined_edges": 3600,
        "index": 0
      },
      {
        "combined_edges": 3600,
        "index": 1
      }
    ],
    "candidates": 2,
    "vertices": 900
  },
  "exists": true,
  "kind": "dict",
  "load_status": "loaded",
  "path": "../json/p900/p900_phase30_combined_graph_export.json",
  "sha256": "609720792931d5e90fb9d49d12fd2c5390e02afcc1a19976fd95c119ae95d900",
  "top_keys": [
    "candidates",
    "checks",
    "first_read",
    "name",
    "phase",
    "purpose",
    "renderer_defaults",
    "source_artifacts",
    "status",
    "vertices",
    "warning"
  ]
}

### g900_candidate_edges

{
  "counts": {
    "edges": 3600,
    "vertices": 900
  },
  "exists": true,
  "kind": "dict",
  "load_status": "loaded",
  "path": "/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/generated/g900_candidate_edges.json",
  "sha256": "1fad85393b160e5f15c71815a82120577fc2463e708d15b67d712b17654c686f",
  "top_keys": [
    "edges",
    "slot_edges_g15_line_petersen",
    "summary",
    "vertices"
  ]
}

### g900_candidate_graph_export

{
  "counts": {
    "edges": 3600,
    "vertices": 900
  },
  "exists": true,
  "kind": "dict",
  "load_status": "loaded",
  "path": "/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/exports/g900_candidate_graph_export.json",
  "sha256": "26592a04f1f49a63746e9190a9a5c0c3bb96a219882bdd59cacf6b16c22c0951",
  "top_keys": [
    "edges",
    "fingerprint",
    "status",
    "vertices"
  ]
}

### g900_twisted_ring_candidate_edges

{
  "counts": {
    "edges": 3600
  },
  "exists": true,
  "kind": "dict",
  "load_status": "loaded",
  "path": "/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/generated/g900_twisted_ring_candidate_edges.json",
  "sha256": "e8ae983acccb8102261bde73cca6493d9a13958edfacad0a2cb6b3e24f4398ef",
  "top_keys": [
    "edges",
    "summary"
  ]
}

### g900_twisted_ring_candidate_export

{
  "counts": {
    "edges": 3600,
    "vertices": 900
  },
  "exists": true,
  "kind": "dict",
  "load_status": "loaded",
  "path": "/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/exports/g900_twisted_ring_candidate_export.json",
  "sha256": "bce9c8841c6b568fdd5f9469ef33079085f0729a6c32960b8930cf42dff3b9d3",
  "top_keys": [
    "edges",
    "fingerprint",
    "status",
    "vertices"
  ]
}

### g900_vertex_register_candidate

{
  "counts": {
    "vertices": 900
  },
  "exists": true,
  "kind": "dict",
  "load_status": "loaded",
  "path": "/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/artifacts/json/301_proposed_g900_vertex_register_candidate.json",
  "sha256": "cfb06b672c18cddb97c482e62af9c1b49ceab0a7d028aa2cbc23cafbcbe47d20",
  "top_keys": [
    "artifact",
    "boundary",
    "census_search_target",
    "construction_basis",
    "phase",
    "source_rule",
    "source_status",
    "status",
    "thalean_iteration_cycle",
    "unique_vertex_ids",
    "vertex_count",
    "vertices"
  ]
}

## Interpretation

- main_result: The row-level law is now clean: normalized zero-twisted rows plus role-column orientation selects [3,16] and gives 18/18.
- global_status: The global source files are locatable, but this attempt does not yet build the global row embedding or full-carrier predicate.
- next_move: Build a carrier-to-row witness table linking each of the 18 WXYZTI rows to global source carrier evidence.

## Checks

- PASS equivalence_note_loaded: gap_a_branch_sensitive_survivor_equivalence_note_recorded
- PASS branch_comparison_loaded: gap_a_branch_sensitive_survivor_row_equivalent_to_normalized_preimage
- PASS normalized_preimage_loaded: gap_a_source_preimage_from_normalized_zero_rows_recorded_not_promoted
- PASS zero_rows_loaded: gap_a_uniform_lift_zero_twisted_rows_normalized
- PASS boundary_loaded: boundary_seam_projection_role_rows_partial_not_map_proof
- PASS role_geometry_loaded: gap_a_role_column_source_geometry_candidate_found_not_closure
- PASS global_sources_found: ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export", "g900_vertex_register_candidate", "p900_phase30_combined_graph_export"]
- PASS row_law_support_3_16: [3, 16]
- PASS stable_support_4_9_15: [4, 9, 15]
- PASS row_law_exact_18: {"changed_breaks": [], "changed_fixes": [3, 16], "exact": true, "match_count": 18, "mismatches": [], "row_count": 18, "support": [3, 16]}
- PASS global_lift_not_constructed: expected partial attempt
- PASS gap_a_not_closed: partial lift attempt only

## Next script

    map_gap_a_rows_to_global_carrier_witnesses_001.py
