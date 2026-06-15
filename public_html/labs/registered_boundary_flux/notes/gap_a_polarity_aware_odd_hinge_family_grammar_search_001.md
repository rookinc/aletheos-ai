# Gap A polarity-aware odd-hinge family grammar search 001

Status: gap_a_polarity_aware_odd_hinge_family_candidate_found_not_generator

## Boundary

- This does not close Gap A.
- This searches coarse polarity features, not a source-native generator.
- Exact hinge values, row selectors, cycles, and stations are not used as generator features.
- A polarity family candidate must still be audited before promotion.
- No physical interpretation is claimed.

## Summary

- search_result: "polarity_aware_odd_hinge_family_candidate_found"
- gap_a_closed: false
- background_population: "oriented_unique_shortest_length2_source_shell_paths"
- background_count: 120
- selected_count: 4
- selected_common_feature_count: 11
- selected_common_features: ["A_odd_BA_neg=True", "A_odd_C_even=True", "A_odd_C_even_BA_neg=True", "A_odd_C_even_BC_2or3=True", "A_parity=odd", "A_to_C_parity=odd_to_even", "BA_abs_small=True", "BA_sign=neg", "BC_abs_2_or_3=True", "C_parity=even", "source_shell_polarity_core=True"]
- best_candidate: {"background_fraction": 0.066666667, "background_support": 8, "background_total": 120, "feature": "A_odd_BA_neg=True AND A_odd_C_even_BC_2or3=True AND BA_abs_small=True", "hypergeom_all_selected_probability": 8.5214442e-06, "selected_support": 4}
- top_candidate_count: 20
- claim_closes_gap_a: false

## Top candidates

- {"background_fraction": 0.066666667, "background_support": 8, "background_total": 120, "feature": "A_odd_BA_neg=True AND A_odd_C_even_BC_2or3=True AND BA_abs_small=True", "hypergeom_all_selected_probability": 8.5214442e-06, "selected_support": 4}
- {"background_fraction": 0.066666667, "background_support": 8, "background_total": 120, "feature": "A_odd_BA_neg=True AND BA_abs_small=True AND source_shell_polarity_core=True", "hypergeom_all_selected_probability": 8.5214442e-06, "selected_support": 4}
- {"background_fraction": 0.066666667, "background_support": 8, "background_total": 120, "feature": "A_odd_C_even=True AND BA_abs_small=True AND source_shell_polarity_core=True", "hypergeom_all_selected_probability": 8.5214442e-06, "selected_support": 4}
- {"background_fraction": 0.066666667, "background_support": 8, "background_total": 120, "feature": "A_odd_C_even_BA_neg=True AND A_odd_C_even_BC_2or3=True AND BA_abs_small=True", "hypergeom_all_selected_probability": 8.5214442e-06, "selected_support": 4}
- {"background_fraction": 0.066666667, "background_support": 8, "background_total": 120, "feature": "A_odd_C_even_BA_neg=True AND BA_abs_small=True AND BC_abs_2_or_3=True", "hypergeom_all_selected_probability": 8.5214442e-06, "selected_support": 4}
- {"background_fraction": 0.066666667, "background_support": 8, "background_total": 120, "feature": "A_odd_C_even_BA_neg=True AND BA_abs_small=True AND source_shell_polarity_core=True", "hypergeom_all_selected_probability": 8.5214442e-06, "selected_support": 4}
- {"background_fraction": 0.066666667, "background_support": 8, "background_total": 120, "feature": "A_odd_C_even_BC_2or3=True AND BA_abs_small=True AND BA_sign=neg", "hypergeom_all_selected_probability": 8.5214442e-06, "selected_support": 4}
- {"background_fraction": 0.066666667, "background_support": 8, "background_total": 120, "feature": "A_odd_C_even_BC_2or3=True AND BA_abs_small=True AND source_shell_polarity_core=True", "hypergeom_all_selected_probability": 8.5214442e-06, "selected_support": 4}
- {"background_fraction": 0.066666667, "background_support": 8, "background_total": 120, "feature": "A_parity=odd AND BA_abs_small=True AND source_shell_polarity_core=True", "hypergeom_all_selected_probability": 8.5214442e-06, "selected_support": 4}
- {"background_fraction": 0.066666667, "background_support": 8, "background_total": 120, "feature": "A_to_C_parity=odd_to_even AND BA_abs_small=True AND source_shell_polarity_core=True", "hypergeom_all_selected_probability": 8.5214442e-06, "selected_support": 4}
- {"background_fraction": 0.066666667, "background_support": 8, "background_total": 120, "feature": "BA_abs_small=True AND BA_sign=neg AND source_shell_polarity_core=True", "hypergeom_all_selected_probability": 8.5214442e-06, "selected_support": 4}
- {"background_fraction": 0.066666667, "background_support": 8, "background_total": 120, "feature": "BA_abs_small=True AND BC_abs_2_or_3=True AND source_shell_polarity_core=True", "hypergeom_all_selected_probability": 8.5214442e-06, "selected_support": 4}
- {"background_fraction": 0.066666667, "background_support": 8, "background_total": 120, "feature": "BA_abs_small=True AND C_parity=even AND source_shell_polarity_core=True", "hypergeom_all_selected_probability": 8.5214442e-06, "selected_support": 4}
- {"background_fraction": 0.066666667, "background_support": 8, "background_total": 120, "feature": "BA_abs_small=True AND source_shell_polarity_core=True", "hypergeom_all_selected_probability": 8.5214442e-06, "selected_support": 4}
- {"background_fraction": 0.083333333, "background_support": 10, "background_total": 120, "feature": "A_odd_BA_neg=True AND A_odd_C_even=True AND A_odd_C_even_BC_2or3=True", "hypergeom_all_selected_probability": 2.5564333e-05, "selected_support": 4}
- {"background_fraction": 0.083333333, "background_support": 10, "background_total": 120, "feature": "A_odd_BA_neg=True AND A_odd_C_even=True AND BC_abs_2_or_3=True", "hypergeom_all_selected_probability": 2.5564333e-05, "selected_support": 4}
- {"background_fraction": 0.083333333, "background_support": 10, "background_total": 120, "feature": "A_odd_BA_neg=True AND A_odd_C_even=True AND source_shell_polarity_core=True", "hypergeom_all_selected_probability": 2.5564333e-05, "selected_support": 4}
- {"background_fraction": 0.083333333, "background_support": 10, "background_total": 120, "feature": "A_odd_BA_neg=True AND A_odd_C_even_BA_neg=True AND A_odd_C_even_BC_2or3=True", "hypergeom_all_selected_probability": 2.5564333e-05, "selected_support": 4}
- {"background_fraction": 0.083333333, "background_support": 10, "background_total": 120, "feature": "A_odd_BA_neg=True AND A_odd_C_even_BA_neg=True AND BC_abs_2_or_3=True", "hypergeom_all_selected_probability": 2.5564333e-05, "selected_support": 4}
- {"background_fraction": 0.083333333, "background_support": 10, "background_total": 120, "feature": "A_odd_BA_neg=True AND A_odd_C_even_BA_neg=True AND source_shell_polarity_core=True", "hypergeom_all_selected_probability": 2.5564333e-05, "selected_support": 4}

## Interpretation

- main_result: A polarity-aware odd-hinge family candidate was found, but it is not a generator.
- why_this_matters: This tests whether the odd hinge becomes more structured when orientation and coarse polarity are allowed.
- why_not_closure: A polarity feature family is still weaker than a source-native projection-family generator.
- next_move: Audit the candidate against lookup risk and projection-family generation.

## Claim

- does_this_close_gap_a: false
- does_this_find_polarity_candidate: true
- does_this_find_generator: false
- short_form: "A polarity-aware odd-hinge family candidate was found, but it is not a generator."
- not_closed_reason: "A polarity feature family is still weaker than a source-native projection-family generator."
- next_problem: "Audit the candidate against lookup risk and projection-family generation."

## Checks

- PASS odd_audit_loaded: gap_a_odd_hinge_source_shell_audit_enriched_not_generator
- PASS abc_loaded: source_shell_signed_abc_primitives_extracted_odd_hinge_signal_found_not_generator
- PASS branch_loaded: source_shell_projection_family_generator_branch_started
- PASS background_available: 120
- PASS selected_loaded: 4
- PASS best_candidate_exists: A_odd_BA_neg=True AND A_odd_C_even_BC_2or3=True AND BA_abs_small=True
- PASS gap_a_not_closed: polarity search only

## Next script

    audit_gap_a_polarity_aware_odd_hinge_family_candidate_001.py
