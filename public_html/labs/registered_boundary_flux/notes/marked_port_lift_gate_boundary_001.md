# Marked-port lift gate boundary 001

Status: marked_port_lift_gate_boundary_recorded

## Boundary

- This does not close Gap A.
- This records a marked-port/lift branch boundary.
- The marked-port/lift test preserves a real source/lift family signal.
- No exact marked-port/lift gate was found.
- No source-native WXYZTI projection-family generator was derived.
- No physical interpretation is claimed.

## Summary

- record_result: "marked_port_lift_gate_boundary_recorded"
- gap_a_status: "open"
- gap_a_closed: false
- marked_port_lift_gate_found: false
- marked_port_lift_family_signal_persists: true
- best_family: {"covers_all_selected": true, "exact_selected": false, "features": ["lift:p900_candidate0_edge_law:sector_delta_abs_small=True"], "nonselected_indices": [6], "nonselected_support_count": 1, "risk_classes": ["low"], "score": 6, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7], "uses_projection_feature": false}
- best_exact_low_no_projection: null
- best_exact_no_projection: null
- best_exact_with_projection: null
- reverse_visibility_gate_found: false
- polarity_family_survives_lookup_audit: true
- odd_hinge_enriched: true
- companion_projection_visible: false
- companion_neighbor_candidate: false
- terminal_reason: "Marked-port and lift/twist probes preserve the same source/lift family signal, but no exact gate is found."
- claim_closes_gap_a: false

## Boundary record

Marked-port lift preserves the seam-family signal, but does not produce the admission gate.

Keeper lines:

- The gate is not simple projection visibility.
- The gate is not the tested marked-port lift rule.
- The source-shell seam remains structured.
- The same low-risk source/lift family persists.
- The obstruction is real, but the admission predicate is still missing.
- Gap A remains open.

Positive results:

- The drawing-inspired marked-port/lift hypothesis was tested.
- The low-risk lift family signal persisted.
- The best persistent family covers all four selected paths.
- The best persistent family is source/lift-side and does not use projection features.

Negative results:

- No exact low-risk marked-port gate was found.
- No exact no-projection marked-port gate was found.
- No exact projection-dependent marked-port gate was found.
- The best family still includes the same nonselected companion index 6.
- The companion remains projection-invisible.
- No source-native WXYZTI generator was derived.

Blocked promotions:

- Do not call Gap A closed.
- Do not call marked-port lift a gate.
- Do not call the persistent family a generator.
- Do not treat the companion as visible registered trace.
- Do not attach physical interpretation.

Allowed next work:

- Record a broader Gap A branch summary.
- Search for a richer admissibility predicate beyond visibility and marked-port lift.
- Return to source-native WXYZTI generator search with the polarity/lift family as evidence.
- Treat the persistent family as structured obstruction evidence, not closure.

## Interpretation

- main_result: The marked-port lift branch terminates as a real family signal without an admission gate.
- why_this_matters: The sketch-inspired hypothesis was useful because it asked a better reverse question, but the finite test says the tested gate is still too weak.
- why_not_closure: A persistent source/lift family with one nonselected companion is not a source-native WXYZTI projection-family generator.
- next_move: Write a Gap A source-shell polarity and lift branch summary, then choose whether to search for a richer admissibility predicate or return to generator derivation.

## Claim

- does_this_close_gap_a: false
- does_this_record_branch_boundary: true
- does_this_preserve_real_family_signal: true
- does_this_find_marked_port_lift_gate: false
- does_this_find_generator: false
- short_form: "Marked-port lift preserves the seam-family signal, but does not produce the admission gate."
- not_closed_reason: "A persistent source/lift family with one nonselected companion is not a source-native WXYZTI projection-family generator."
- next_problem: "Write a Gap A source-shell polarity and lift branch summary, then choose whether to search for a richer admissibility predicate or return to generator derivation."

## Checks

- PASS marked_loaded: marked_port_lift_family_signal_persists_no_gate
- PASS reverse_loaded: reverse_gap_a_visibility_gate_not_found
- PASS companion_loaded: polarity_family_nonselected_companion_inspected_no_neighbor_candidate
- PASS polarity_boundary_loaded: polarity_family_non_generator_boundary_recorded
- PASS projection_search_loaded: source_native_projection_family_generator_search_family_signal_persists_no_generator
- PASS candidate_audit_loaded: gap_a_polarity_aware_odd_hinge_candidate_survives_lookup_audit_not_generator
- PASS polarity_search_loaded: gap_a_polarity_aware_odd_hinge_family_candidate_found_not_generator
- PASS odd_audit_loaded: gap_a_odd_hinge_source_shell_audit_enriched_not_generator
- PASS abc_loaded: source_shell_signed_abc_primitives_extracted_odd_hinge_signal_found_not_generator
- PASS plateau_loaded: gap_a_open_with_source_shell_lift_conjecture_recorded
- PASS marked_gate_not_found: False
- PASS family_signal_persists: True
- PASS odd_hinge_enriched: True
- PASS polarity_lookup_safe: True
- PASS companion_not_visible: False
- PASS gap_a_not_closed: boundary record only

## Next script

    write_gap_a_source_shell_polarity_lift_branch_summary_001.py
