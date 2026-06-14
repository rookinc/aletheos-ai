# Gap A 15-thalion ring test plan 001

Status: gap_a_15_thalion_ring_test_plan_recorded

## Boundary

- This is a test plan, not a proof.
- The 15-thalion witness ring is not claimed to solve Gap A yet.
- Construction tests must precede residual evaluation.
- Residual labels may only be used after a uniform row-to-ring lift exists.
- Nulls are required before any explanatory claim is admitted.

## Claim status

- does_15_thalion_ring_solve_gap_a_now: false
- is_15_thalion_ring_leading_candidate: true
- reason: "The inventory found explicit 15-thalion G900 and twisted-ring source materials, but no source-derived chamber/register map has yet been constructed."
- current_hypothesis: "Gap A may be a quotient of a 15-thalion oriented transport ring. The twisted ring should explain ZT as branch-stable selected-turn residue and TI as branch-sensitive return-path residue if the hypothesis is correct."

## Source records

- g900_candidate_edges: exists=True path=/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/generated/g900_candidate_edges.json keys=["summary", "vertices", "slot_edges_g15_line_petersen", "edges"]
- g900_candidate_graph_export: exists=True path=/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/exports/g900_candidate_graph_export.json keys=["status", "vertices", "edges", "fingerprint"]
- g900_twisted_ring_candidate_edges: exists=True path=/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/generated/g900_twisted_ring_candidate_edges.json keys=["summary", "edges"]
- g900_twisted_ring_candidate_export: exists=True path=/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/exports/g900_twisted_ring_candidate_export.json keys=["status", "vertices", "edges", "fingerprint"]
- proposed_g900_vertex_register_candidate: exists=True path=/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/artifacts/json/301_proposed_g900_vertex_register_candidate.json keys=["artifact", "status", "source_status", "phase", "thalean_iteration_cycle", "source_rule", "census_search_target", "construction_basis", "vertex_count", "unique_vertex_ids", "vertices", "boundary"]
- p900_external_permutation_law_audit: exists=True path=/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/audits/p900_external_permutation_law_audit.json keys=["status", "audit_count", "preferred_external_audit", "audits", "interpretation", "boundary"]
- p900_phase5_binary_half_turn_holonomy: exists=True path=/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/14-p900-consonance-surface/artifacts/json/p900_phase5_binary_half_turn_holonomy.json keys=["closure_type_histogram", "coupling_edge_count", "cycle_count", "cycle_length_histogram", "cycle_search_max_length", "external_degree_histogram", "external_degree_max", "external_degree_min", "first_read", "g15_edges", "g15_model", "g15_positions", "half_turn_closure_count", "holonomy_shift_histogram_mod_60", "identity_closure_count", "name", "orientation_drift_count", "p900_state_count", "records", "status", "warning"]
- p900_phase4_cycle_holonomy_stub: exists=True path=/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/14-p900-consonance-surface/artifacts/json/p900_phase4_cycle_holonomy_stub.json keys=["closure_type_histogram", "cycle_count", "cycle_length_histogram", "cycle_search_max_length", "first_read", "g15_edges", "g15_model", "g15_positions", "half_turn_closure_count", "holonomy_shift_histogram_mod_60", "identity_closure_count", "name", "orientation_drift_count", "records", "status", "warning"]
- gap_a_directed_p900_edge_lift: exists=True path=registered_boundary_flux/artifacts/json/gap_a_directed_p900_edge_lift_001.v1.json keys=["schema", "status", "timestamp_utc", "gap", "purpose", "boundary", "inputs", "summary", "directed_rows", "feature_tests", "interpretation", "checks", "next_script"]
- gap_a_uniform_g900_row_lift: exists=True path=registered_boundary_flux/artifacts/json/gap_a_uniform_g900_row_lift_001.v1.json keys=["schema", "status", "timestamp_utc", "gap", "purpose", "boundary", "inputs", "summary", "lift_rows", "candidate_feature_tests", "interpretation", "checks", "next_script"]

## Phase order

- schema_before_residuals: No residual labels are used. tests=["T0_source_schema_recovery", "T1_edge_kind_partition", "T2_twisted_vs_untwisted_comparison"]
- uniform_lift_before_evaluation: Apply the same source rule to all 18 rows. tests=["T3_uniform_row_to_ring_lift"]
- residual_evaluation: Only now evaluate ZT and TI residual behavior. tests=["T4_evaluate_ZT_TI_after_uniform_lift"]
- nulls: Attack the explanation with ablations. tests=["T5_null_untwisted_ring", "T6_null_slot_shuffle", "T7_null_edge_kind_collapse"]

## Tests

### T0_source_schema_recovery - Recover 15-thalion ring schemas

- question: What exact fields define thalion slot, local G60 state, internal copy edge, inter-thalion carrier edge, twist, and export identity?
- uses_residual_labels: False
- inputs: ["g900_candidate_edges", "g900_candidate_graph_export", "g900_twisted_ring_candidate_edges", "g900_twisted_ring_candidate_export", "proposed_g900_vertex_register_candidate"]
- success_criterion: A schema map is extracted for 900 vertices, 3600 edges, 15 slots, 60 local states per thalion, and the edge-kind partition.
- failure_meaning: The 15-thalion source is not yet structured enough to test Gap A.

### T1_edge_kind_partition - Audit internal versus carrier edge partition

- question: Does the ring split into internal_thalion_copy and inter_thalion_diagonal_carrier layers with stable counts and fields?
- uses_residual_labels: False
- inputs: ["g900_candidate_edges", "g900_twisted_ring_candidate_edges"]
- success_criterion: The edge-kind partition is explicit, count-stable, and source-recorded before Gap A residual evaluation.
- failure_meaning: The ring does not yet provide a reliable source-layer distinction.

### T2_twisted_vs_untwisted_comparison - Compare untwisted and twisted ring candidates

- question: What structural difference does the twisted ring introduce relative to the untwisted ring?
- uses_residual_labels: False
- inputs: ["g900_candidate_graph_export", "g900_twisted_ring_candidate_export", "p900_external_permutation_law_audit"]
- success_criterion: A twist feature is extracted independently of Gap A row labels.
- failure_meaning: Twist cannot yet serve as source-derived orientation.

### T3_uniform_row_to_ring_lift - Lift all 18 WXYZTI role rows into the 15-thalion ring

- question: Can every WXYZTI role row be assigned thalion slot, local state, edge kind, and twist/carrier features by a uniform source rule?
- uses_residual_labels: False
- inputs: ["gap_a_uniform_g900_row_lift", "g900_twisted_ring_candidate_edges", "proposed_g900_vertex_register_candidate"]
- success_criterion: All 18 role rows receive source-derived ring features without using residual labels.
- failure_meaning: The 15-thalion ring does not yet provide the missing chamber/register map.

### T4_evaluate_ZT_TI_after_uniform_lift - Evaluate residual split only after uniform ring lift

- question: After the uniform ring lift, do ZT and TI residuals match the predicted selected-turn and return-path categories?
- uses_residual_labels: True
- inputs: ["gap_a_lift_refined_partial_closure_theorem_note", "gap_a_directed_p900_edge_lift", "T3_uniform_row_to_ring_lift_output"]
- success_criterion: ZT is predicted as branch-stable selected-turn residue and TI as branch-sensitive return-path residue by features derived before residual evaluation.
- failure_meaning: The ring lift does not explain the two residuals.

### T5_null_untwisted_ring - Untwisted-ring null

- question: Does the untwisted ring fail to reproduce the same residual split that the twisted ring predicts?
- uses_residual_labels: True
- inputs: ["g900_candidate_edges", "g900_twisted_ring_candidate_edges", "T3_uniform_row_to_ring_lift_output"]
- success_criterion: Twist contributes load-bearing explanatory power beyond generic 15-thalion product structure.
- failure_meaning: The residual split may not require the twisted ring.

### T6_null_slot_shuffle - Thalion-slot shuffle null

- question: Does shuffling thalion slot identity destroy the source-derived prediction?
- uses_residual_labels: True
- inputs: ["T3_uniform_row_to_ring_lift_output"]
- success_criterion: Slot identity is load-bearing; shuffled slots degrade or destroy the predicted split.
- failure_meaning: The explanation may be generic or overfit.

### T7_null_edge_kind_collapse - Edge-kind collapse null

- question: Does collapsing internal and carrier edge kinds destroy the selected-turn versus return-path distinction?
- uses_residual_labels: True
- inputs: ["T3_uniform_row_to_ring_lift_output"]
- success_criterion: Internal/carry distinction is load-bearing for the residual split.
- failure_meaning: The ring explanation does not depend on the expected edge-kind structure.

## Checks

- PASS inventory_loaded: status=gap_a_15_thalion_ring_sources_inventoried
- PASS gap_note_loaded: status=gap_a_lift_refined_partial_closure_theorem_note_recorded
- PASS source_exists_g900_candidate_edges: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/generated/g900_candidate_edges.json
- PASS source_exists_g900_candidate_graph_export: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/exports/g900_candidate_graph_export.json
- PASS source_exists_g900_twisted_ring_candidate_edges: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/generated/g900_twisted_ring_candidate_edges.json
- PASS source_exists_g900_twisted_ring_candidate_export: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/exports/g900_twisted_ring_candidate_export.json
- PASS source_exists_proposed_g900_vertex_register_candidate: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/artifacts/json/301_proposed_g900_vertex_register_candidate.json
- PASS source_exists_p900_external_permutation_law_audit: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/16-fifteen-thalion-ring/support/audits/p900_external_permutation_law_audit.json
- PASS test_plan_has_no_residual_first: first four tests residual-free
- PASS test_plan_has_nulls: null tests present

## Next scripts

- inspect_gap_a_15_thalion_ring_schema_001.py
- attempt_gap_a_uniform_15_thalion_row_lift_001.py
- evaluate_gap_a_15_thalion_residual_split_001.py
