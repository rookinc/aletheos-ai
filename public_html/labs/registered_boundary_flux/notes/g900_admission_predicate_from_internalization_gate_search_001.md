# G900 admission predicate from internalization gate search 001

Status: g900_admission_predicate_local_candidate_exact_background_not_full_g900

## Boundary

- This does not close Gap A.
- This does not prove full G900 admission.
- This tests a local admission-predicate shape only.
- A local predicate is weaker than a full 900-state return-with-trace evaluator.
- No physical interpretation is claimed.

## Summary

- search_result: "local_g900_admission_predicate_exact_on_background_not_full_g900"
- gap_a_closed: false
- full_g900_admission_found: false
- local_admission_predicate_found: true
- exact_on_polarity_universe: true
- exact_on_oriented_unique_len2_background: true
- admission_layer: {"admission_predicate": "source_shell_polarity_condition AND r1_row_hit_count_ge5", "admitted_indices": [0, 1, 5, 7], "environment_source_condition": "source_shell_polarity_condition", "registered_trace_condition": "proper_internalization_gate_r1_row_hit_count_ge5", "selected_indices": [0, 1, 5, 7], "witness_proxy": "row/support absorption in radius-1 neighborhood"}
- support_counts: {"background_total": 120, "combined_admission_support": 4, "combined_fraction": 0.033333333, "internalization_fraction": 0.76666667, "p_all_selected_under_combined_hypergeom": 1.2173492e-07, "proper_internalization_support": 92, "selected_count": 4, "source_fraction": 0.066666667, "source_polarity_support": 8}
- claim_closes_gap_a: false

## Interpretation

- main_result: A local G900-shaped admission predicate was found: source-shell polarity plus proper internalization.
- why_this_matters: The predicate has the right local grammar: source condition plus internalized registered trace proxy.
- why_not_full_g900: This is local and register-internal. It does not prove a full 900-state admission/evaluation cycle with independent witness.
- next_move: Audit whether the local admission predicate can support a return-with-trace witness layer.

## Claim

- does_this_close_gap_a: false
- does_this_find_local_g900_shaped_admission_predicate: true
- does_this_find_full_g900_admission: false
- short_form: "A local G900-shaped admission predicate was found: source-shell polarity plus proper internalization."
- not_closed_reason: "This is local and register-internal. It does not prove a full 900-state admission/evaluation cycle with independent witness."
- next_problem: "Audit whether the local admission predicate can support a return-with-trace witness layer."

## Checks

- PASS internal_audit_loaded: proper_internalization_gate_survives_audit_register_internal_not_generator
- PASS internal_explore_loaded: proper_internalization_gate_candidate_found_inside_best_family_not_generator
- PASS projection_search_loaded: source_native_projection_family_generator_search_family_signal_persists_no_generator
- PASS polarity_search_loaded: gap_a_polarity_aware_odd_hinge_family_candidate_found_not_generator
- PASS plateau_loaded: gap_a_open_with_source_shell_lift_conjecture_recorded
- PASS background_available: 120
- PASS selected_records_loaded: 4
- PASS polarity_exact: {'environment_source_condition': 'source_shell_polarity_condition', 'registered_trace_condition': 'proper_internalization_gate_r1_row_hit_count_ge5', 'witness_proxy': 'row/support absorption in radius-1 neighborhood', 'admission_predicate': 'source_shell_polarity_condition AND r1_row_hit_count_ge5', 'selected_indices': [0, 1, 5, 7], 'admitted_indices': [0, 1, 5, 7]}
- PASS gap_a_not_closed: local admission search only
- PASS not_full_g900: False

## Next script

    audit_local_admission_predicate_return_trace_witness_001.py
