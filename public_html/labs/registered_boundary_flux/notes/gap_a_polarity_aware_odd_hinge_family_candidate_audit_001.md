# Gap A polarity-aware odd-hinge family candidate audit 001

Status: gap_a_polarity_aware_odd_hinge_candidate_survives_lookup_audit_not_generator

## Boundary

- This does not close Gap A.
- This audits a polarity family candidate, not a generator.
- Surviving lookup audit is weaker than source-native projection-family derivation.
- The candidate is allowed to have nonselected background support; that makes it a family rather than exact lookup.
- No physical interpretation is claimed.

## Summary

- audit_result: "polarity_candidate_survives_lookup_audit_as_family_not_generator"
- gap_a_closed: false
- best_feature: "A_odd_BA_neg=True AND A_odd_C_even_BC_2or3=True AND BA_abs_small=True"
- best_feature_parts: ["A_odd_BA_neg=True", "A_odd_C_even_BC_2or3=True", "BA_abs_small=True"]
- background_count: 120
- candidate_support_count: 8
- candidate_selected_support_count: 4
- candidate_nonselected_support_count: 4
- candidate_support_fraction: 0.06666666666666667
- precision_within_background: 0.5
- recall_selected: 1.0
- hypergeom_probability: 8.5214442e-06
- feature_lookup_violations: []
- survives_lookup_audit: true
- support_hinges: {"1": 1, "3": 1, "5": 2, "7": 2, "9": 2}
- support_endpoint_parity: {"even->even": 4, "odd->even": 4}
- selected_station_counts: {"T": 1, "Y": 1, "Z": 2}
- selected_role_pair_counts: {"XY->YZ": 1, "YZ->ZT": 2, "ZT->TI": 1}
- claim_closes_gap_a: false

## Interpretation

- main_result: The polarity-aware odd-hinge candidate survives lookup audit as a genuine family signal, but not as a generator.
- what_survived: The candidate covers all four selected correction paths using coarse polarity features and no row/cycle/station/role lookup terms.
- what_prevents_closure: The candidate also covers nonselected background paths and does not derive a projection-family generator.
- why_this_matters: The signal is now stronger than reachability: it is a small polarity family in the source-shell background.
- next_move: Try to derive a source-native projection-family generator from the polarity family.

## Candidate selected support

- {"A": 1, "AC_delta": -1, "AC_sign": "neg", "A_parity": "odd", "B": 2, "BA_abs_small": true, "BA_delta": -1, "BA_sign": "neg", "BC_abs_2_or_3": true, "BC_delta": -2, "BC_sign": "neg", "B_parity": "even", "C": 0, "C_parity": "even", "columns": [0, 4], "selected": true}
- {"A": 3, "AC_delta": -1, "AC_sign": "neg", "A_parity": "odd", "B": 4, "BA_abs_small": true, "BA_delta": -1, "BA_sign": "neg", "BC_abs_2_or_3": true, "BC_delta": -2, "BC_sign": "neg", "B_parity": "even", "C": 2, "C_parity": "even", "columns": [7, 10], "selected": true}
- {"A": 7, "AC_delta": 7, "AC_sign": "pos", "A_parity": "odd", "B": 11, "BA_abs_small": true, "BA_delta": -4, "BA_sign": "neg", "BC_abs_2_or_3": true, "BC_delta": 3, "BC_sign": "pos", "B_parity": "odd", "C": 14, "C_parity": "even", "columns": [23, 24], "selected": true}
- {"A": 9, "AC_delta": 1, "AC_sign": "pos", "A_parity": "odd", "B": 13, "BA_abs_small": true, "BA_delta": -4, "BA_sign": "neg", "BC_abs_2_or_3": true, "BC_delta": -3, "BC_sign": "neg", "B_parity": "odd", "C": 10, "C_parity": "even", "columns": [28, 29], "selected": true}

## Candidate nonselected support

- {"A": 5, "AC_delta": 1, "AC_sign": "pos", "A_parity": "odd", "B": 9, "BA_abs_small": true, "BA_delta": -4, "BA_sign": "neg", "BC_abs_2_or_3": true, "BC_delta": -3, "BC_sign": "neg", "B_parity": "odd", "C": 6, "C_parity": "even", "columns": [15, 16], "selected": false}
- {"A": 5, "AC_delta": 7, "AC_sign": "pos", "A_parity": "odd", "B": 9, "BA_abs_small": true, "BA_delta": -4, "BA_sign": "neg", "BC_abs_2_or_3": true, "BC_delta": 3, "BC_sign": "pos", "B_parity": "odd", "C": 12, "C_parity": "even", "columns": [16, 18], "selected": false}
- {"A": 7, "AC_delta": -1, "AC_sign": "neg", "A_parity": "odd", "B": 8, "BA_abs_small": true, "BA_delta": -1, "BA_sign": "neg", "BC_abs_2_or_3": true, "BC_delta": -2, "BC_sign": "neg", "B_parity": "even", "C": 6, "C_parity": "even", "columns": [19, 22], "selected": false}
- {"A": 9, "AC_delta": -1, "AC_sign": "neg", "A_parity": "odd", "B": 10, "BA_abs_small": true, "BA_delta": -1, "BA_sign": "neg", "BC_abs_2_or_3": true, "BC_delta": -2, "BC_sign": "neg", "B_parity": "even", "C": 8, "C_parity": "even", "columns": [25, 28], "selected": false}

## Claim

- does_this_close_gap_a: false
- does_this_find_lookup_safe_family_signal: true
- does_this_find_generator: false
- short_form: "The polarity-aware odd-hinge candidate survives lookup audit as a genuine family signal, but not as a generator."
- not_closed_reason: "The candidate also covers nonselected background paths and does not derive a projection-family generator."
- next_problem: "Try to derive a source-native projection-family generator from the polarity family."

## Checks

- PASS polarity_loaded: gap_a_polarity_aware_odd_hinge_family_candidate_found_not_generator
- PASS odd_audit_loaded: gap_a_odd_hinge_source_shell_audit_enriched_not_generator
- PASS abc_loaded: source_shell_signed_abc_primitives_extracted_odd_hinge_signal_found_not_generator
- PASS branch_loaded: source_shell_projection_family_generator_branch_started
- PASS selected_covered: 4/4
- PASS no_lookup_features: []
- PASS family_not_exact_lookup: 8
- PASS nonselected_support_exists: 4
- PASS gap_a_not_closed: candidate audit only

## Next script

    search_source_native_projection_family_generator_from_polarity_signal_001.py
