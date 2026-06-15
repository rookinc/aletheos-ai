# Proper internalization gate candidate audit 001

Status: proper_internalization_gate_survives_audit_register_internal_not_generator

## Boundary

- This does not close Gap A.
- This audits internalization as register support absorption.
- Register-internal admission is weaker than source-native generator derivation.
- The candidate uses row/support absorption, so it is not pure source law.
- No physical interpretation is claimed.

## Summary

- audit_result: "proper_internalization_gate_survives_audit_register_internal_not_generator"
- gap_a_closed: false
- candidate_feature: "internal:r1:row_hit_count_ge5=True"
- candidate_meaning: "radius-1 column neighborhood has at least five row/support hits"
- exact_on_polarity_universe: true
- polarity_universe_size: 8
- selected_indices: [0, 1, 5, 7]
- gate_indices: [0, 1, 5, 7]
- selected_gate_indices: [0, 1, 5, 7]
- nonselected_gate_indices: []
- false_negative_indices: []
- selected_r1_row_hit_counts: [19, 21, 6, 6]
- nonselected_r1_row_hit_counts: [2, 1, 4, 4]
- selected_min: 6
- nonselected_max: 4
- separation_margin: 2
- exact_thresholds: [{"background_fraction": 0.76666667, "background_support": 92, "exact_on_polarity": true, "false_negative_count": 0, "hypergeom_all_selected_probability": 0.34014623, "nonselected_support": 0, "selected_support": 4, "threshold": 5}, {"background_fraction": 0.75, "background_support": 90, "exact_on_polarity": true, "false_negative_count": 0, "hypergeom_all_selected_probability": 0.31105584, "nonselected_support": 0, "selected_support": 4, "threshold": 6}]
- background_oriented_unique_len2_count: 120
- background_gate_ge5_support: 92
- background_gate_ge5_fraction: 0.76666667
- background_hypergeom_all_selected_ge5_probability: 0.34014623
- background_binomial_all_selected_ge5_probability: 0.34548272
- register_internal_gate: true
- source_native_generator_found: false
- claim_closes_gap_a: false

## Interpretation

- main_result: The proper-internalization gate survives audit as a register-internal admission candidate, but not as a source-native generator.
- why_this_matters: The selected paths are separated by support absorption, not by direct visibility. This matches the hypothesis that closure comes from proper internalization.
- why_not_closure: The gate uses register support absorption and does not derive the source-native WXYZTI projection-family generator.
- next_move: Search whether this register-internal gate can be promoted into an admission predicate linked to G900-style return with trace.

## Cutoff scan

- {"background_fraction": 1.0, "background_support": 120, "exact_on_polarity": false, "false_negative_count": 0, "hypergeom_all_selected_probability": 1.0, "nonselected_support": 4, "selected_support": 4, "threshold": 0}
- {"background_fraction": 1.0, "background_support": 120, "exact_on_polarity": false, "false_negative_count": 0, "hypergeom_all_selected_probability": 1.0, "nonselected_support": 4, "selected_support": 4, "threshold": 1}
- {"background_fraction": 0.98333333, "background_support": 118, "exact_on_polarity": false, "false_negative_count": 0, "hypergeom_all_selected_probability": 0.93417367, "nonselected_support": 3, "selected_support": 4, "threshold": 2}
- {"background_fraction": 0.95, "background_support": 114, "exact_on_polarity": false, "false_negative_count": 0, "hypergeom_all_selected_probability": 0.81232201, "nonselected_support": 2, "selected_support": 4, "threshold": 3}
- {"background_fraction": 0.88333333, "background_support": 106, "exact_on_polarity": false, "false_negative_count": 0, "hypergeom_all_selected_probability": 0.60474133, "nonselected_support": 2, "selected_support": 4, "threshold": 4}
- {"background_fraction": 0.76666667, "background_support": 92, "exact_on_polarity": true, "false_negative_count": 0, "hypergeom_all_selected_probability": 0.34014623, "nonselected_support": 0, "selected_support": 4, "threshold": 5}
- {"background_fraction": 0.75, "background_support": 90, "exact_on_polarity": true, "false_negative_count": 0, "hypergeom_all_selected_probability": 0.31105584, "nonselected_support": 0, "selected_support": 4, "threshold": 6}
- {"background_fraction": 0.68333333, "background_support": 82, "exact_on_polarity": false, "false_negative_count": 2, "hypergeom_all_selected_probability": 0.21292167, "nonselected_support": 0, "selected_support": 2, "threshold": 7}
- {"background_fraction": 0.68333333, "background_support": 82, "exact_on_polarity": false, "false_negative_count": 2, "hypergeom_all_selected_probability": 0.21292167, "nonselected_support": 0, "selected_support": 2, "threshold": 8}
- {"background_fraction": 0.66666667, "background_support": 80, "exact_on_polarity": false, "false_negative_count": 2, "hypergeom_all_selected_probability": 0.19253351, "nonselected_support": 0, "selected_support": 2, "threshold": 9}
- {"background_fraction": 0.61666667, "background_support": 74, "exact_on_polarity": false, "false_negative_count": 2, "hypergeom_all_selected_probability": 0.14007136, "nonselected_support": 0, "selected_support": 2, "threshold": 10}
- {"background_fraction": 0.53333333, "background_support": 64, "exact_on_polarity": false, "false_negative_count": 2, "hypergeom_all_selected_probability": 0.077347445, "nonselected_support": 0, "selected_support": 2, "threshold": 11}
- {"background_fraction": 0.38333333, "background_support": 46, "exact_on_polarity": false, "false_negative_count": 2, "hypergeom_all_selected_probability": 0.019865312, "nonselected_support": 0, "selected_support": 2, "threshold": 12}
- {"background_fraction": 0.26666667, "background_support": 32, "exact_on_polarity": false, "false_negative_count": 2, "hypergeom_all_selected_probability": 0.0043775876, "nonselected_support": 0, "selected_support": 2, "threshold": 13}
- {"background_fraction": 0.25, "background_support": 30, "exact_on_polarity": false, "false_negative_count": 2, "hypergeom_all_selected_probability": 0.0033361454, "nonselected_support": 0, "selected_support": 2, "threshold": 14}
- {"background_fraction": 0.18333333, "background_support": 22, "exact_on_polarity": false, "false_negative_count": 2, "hypergeom_all_selected_probability": 0.00089049092, "nonselected_support": 0, "selected_support": 2, "threshold": 15}
- {"background_fraction": 0.13333333, "background_support": 16, "exact_on_polarity": false, "false_negative_count": 2, "hypergeom_all_selected_probability": 0.00022155755, "nonselected_support": 0, "selected_support": 2, "threshold": 16}
- {"background_fraction": 0.1, "background_support": 12, "exact_on_polarity": false, "false_negative_count": 2, "hypergeom_all_selected_probability": 6.0258784e-05, "nonselected_support": 0, "selected_support": 2, "threshold": 17}
- {"background_fraction": 0.083333333, "background_support": 10, "exact_on_polarity": false, "false_negative_count": 2, "hypergeom_all_selected_probability": 2.5564333e-05, "nonselected_support": 0, "selected_support": 2, "threshold": 18}
- {"background_fraction": 0.05, "background_support": 6, "exact_on_polarity": false, "false_negative_count": 2, "hypergeom_all_selected_probability": 1.8260238e-06, "nonselected_support": 0, "selected_support": 2, "threshold": 19}
- {"background_fraction": 0.016666667, "background_support": 2, "exact_on_polarity": false, "false_negative_count": 3, "hypergeom_all_selected_probability": null, "nonselected_support": 0, "selected_support": 1, "threshold": 20}
- {"background_fraction": 0.016666667, "background_support": 2, "exact_on_polarity": false, "false_negative_count": 3, "hypergeom_all_selected_probability": null, "nonselected_support": 0, "selected_support": 1, "threshold": 21}

## Claim

- does_this_close_gap_a: false
- does_this_find_register_internal_admission_candidate: true
- does_this_find_source_native_generator: false
- short_form: "The proper-internalization gate survives audit as a register-internal admission candidate, but not as a source-native generator."
- not_closed_reason: "The gate uses register support absorption and does not derive the source-native WXYZTI projection-family generator."
- next_problem: "Search whether this register-internal gate can be promoted into an admission predicate linked to G900-style return with trace."

## Checks

- PASS internalization_loaded: proper_internalization_gate_candidate_found_inside_best_family_not_generator
- PASS marked_boundary_loaded: marked_port_lift_gate_boundary_recorded
- PASS projection_search_loaded: source_native_projection_family_generator_search_family_signal_persists_no_generator
- PASS plateau_loaded: gap_a_open_with_source_shell_lift_conjecture_recorded
- PASS exact_on_polarity: [0, 1, 5, 7]
- PASS positive_separation_margin: 2
- PASS background_available: 120
- PASS register_internal_not_source_generator: ok
- PASS gap_a_not_closed: audit only

## Next script

    search_g900_admission_predicate_from_internalization_gate_001.py
