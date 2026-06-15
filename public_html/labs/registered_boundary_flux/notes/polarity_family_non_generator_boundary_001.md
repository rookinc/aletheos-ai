# Polarity family non-generator boundary 001

Status: polarity_family_non_generator_boundary_recorded

## Boundary

- This does not close Gap A.
- This records a non-generator boundary.
- The polarity family survives as a family signal.
- The best family is broader than the selected correction target.
- No source-native projection-family generator has been derived.
- No physical interpretation is claimed.

## Summary

- record_result: "polarity_family_non_generator_boundary_recorded"
- gap_a_status: "open"
- gap_a_closed: false
- polarity_family_survives_lookup_audit: true
- polarity_family_support_count: 8
- polarity_family_selected_support_count: 4
- polarity_family_nonselected_support_count: 4
- best_polarity_feature: "A_odd_BA_neg=True AND A_odd_C_even_BC_2or3=True AND BA_abs_small=True"
- best_polarity_hypergeom_probability: 8.5214442e-06
- projection_family_generator_found: false
- best_persistent_family: {"covers_all_selected": true, "exact_selected": false, "features": ["source:p900_candidate0_edge_law:sector_delta_abs_small=True"], "has_nonselected_family": true, "lookup_terms": [], "mode": "source_only", "nonselected_indices": [6], "nonselected_support_count": 1, "score": 4, "selected_indices": [0, 1, 5, 7], "selected_support_count": 4, "support_count": 5, "support_indices": [0, 1, 5, 6, 7]}
- exact_source_subselector_found: false
- exact_projection_subselector_found: false
- claim_closes_gap_a: false

## Boundary record

The polarity family is real enough to survive lookup audit, but too broad to serve as the projection-family generator.

What survived:

- The odd-hinge A/B/C primitive is enriched against background.
- The polarity-aware family covers all four selected correction paths.
- The polarity family has no lookup violations.
- The polarity family has nonselected support, so it is not merely row lookup.
- The best persistent source-only family covers 4 selected paths plus 1 companion path.

What failed:

- No exact source-side projection-family generator was found.
- No exact projection-family subselector was found.
- The best surviving family is broader than the target.
- The extra companion path prevents generator promotion.
- Gap A remains open.

Blocked promotions:

- Do not call Gap A closed.
- Do not call the polarity family a generator.
- Do not treat the selected four as source-derived closure.
- Do not ignore the nonselected companion path.
- Do not attach physical interpretation.

Allowed next work:

- Inspect the nonselected companion path.
- Ask whether the companion path is a missing neighbouring projection member.
- Search for a larger projection-family object that includes selected plus companion structure.
- Keep the polarity family as a strong non-generator signal.

## Interpretation

- main_result: The polarity-aware source-shell family survives as a real family signal but not as a generator.
- why_this_matters: The search stopped forcing exact selection and found a small source-side family. The extra companion path is now load-bearing evidence, not garbage.
- why_not_closure: A source-side family that also contains a nonselected companion path is broader than the WXYZTI correction target.
- next_move: Inspect the nonselected companion path and ask whether it belongs to a neighbouring projection-family completion.

## Claim

- does_this_close_gap_a: false
- does_this_record_real_family_signal: true
- does_this_record_non_generator_boundary: true
- does_this_find_generator: false
- short_form: "The polarity family is real enough to survive lookup audit, but too broad to serve as the projection-family generator."
- not_closed_reason: "A source-side family that also contains a nonselected companion path is broader than the WXYZTI correction target."
- next_problem: "Inspect the nonselected companion path and ask whether it belongs to a neighbouring projection-family completion."

## Checks

- PASS projection_search_loaded: source_native_projection_family_generator_search_family_signal_persists_no_generator
- PASS candidate_audit_loaded: gap_a_polarity_aware_odd_hinge_candidate_survives_lookup_audit_not_generator
- PASS polarity_search_loaded: gap_a_polarity_aware_odd_hinge_family_candidate_found_not_generator
- PASS odd_audit_loaded: gap_a_odd_hinge_source_shell_audit_enriched_not_generator
- PASS abc_loaded: source_shell_signed_abc_primitives_extracted_odd_hinge_signal_found_not_generator
- PASS plateau_loaded: gap_a_open_with_source_shell_lift_conjecture_recorded
- PASS polarity_family_survives: True
- PASS selected_4: 4
- PASS nonselected_companion_present: 4
- PASS no_exact_generator: False
- PASS gap_a_not_closed: boundary record only

## Next script

    inspect_polarity_family_nonselected_companion_001.py
