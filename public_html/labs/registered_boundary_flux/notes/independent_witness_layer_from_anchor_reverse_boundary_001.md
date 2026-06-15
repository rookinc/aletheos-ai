# Independent witness layer search from anchor-reverse boundary 001

Status: independent_witness_layer_not_found_source_feature_search_recorded

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This searches source-facing features over the 120-record carrier.
- A source-feature candidate is not automatically an independent witness layer.
- No physical interpretation is claimed.

## Interpretation

- main_result: No exact independent witness layer was found in the tested source-feature family.
- strict_boundary: A true independent witness layer would need to validate the admitted residue without restating the local admission predicate, without row/support absorption, and without being merely a data-mined source feature.
- why_not_gap_a_closure: This remains a witness search over the 120-record source-shell carrier, not a full 900-state evaluator or WXYZTI generator.
- next_move: Record the witness search boundary, then decide whether to search a 900-state lift or return to WXYZTI generator derivation.

## Summary

- search_result: "no_exact_candidate_found"
- gap_a_status: "open"
- gap_a_closed: false
- record_count: 120
- admitted_count: 4
- admitted_keys: ["11|7|14|23,24", "13|9|10|28,29", "2|1|0|0,4", "4|3|2|7,10"]
- canonical_sparse_law: "shared_B+reverse_partner"
- alternate_single_relation_witness: "shared_column"
- anchor_reverse_source_reading: "anchor-and-reverse transport on oriented length-2 source-shell records"
- candidate_atom_count: 4
- exact_candidate_count: 0
- strict_exact_candidate_count: 0
- strict_clean_exact_candidate_count: 0
- source_shell_exact_candidate_count: 0
- best_exact_candidate: null
- best_strict_exact_candidate: null
- best_strict_clean_exact_candidate: null
- best_near_candidate: {"exact_admitted": false, "false_positive_count": 4, "families": ["source_shell"], "feature_count": 1, "features": ["source_shell_polarity=True"], "missed_admitted_count": 0, "quality": "source_shell_dependent_candidate", "strict_allowed": false, "support_count": 8, "support_keys": ["10|9|8|25,28", "11|7|14|23,24", "13|9|10|28,29", "2|1|0|0,4", "4|3|2|7,10", "8|7|6|19,22", "9|5|12|16,18", "9|5|6|15,16"], "uses_modular": false, "uses_source_shell": true}
- independent_witness_layer_found: false
- candidate_independent_witness_layer_found: false
- candidate_clean_source_witness_found: false
- full_g900_admission_found: false
- source_native_wxyzti_generator_found: false
- claim_closes_gap_a: false

## Top exact candidates


## Top near candidates

- {"false_positive_count": 4, "features": ["source_shell_polarity=True"], "strict_allowed": false, "support_count": 8, "uses_modular": false, "uses_source_shell": true}
- {"false_positive_count": 4, "features": ["A_parity=odd", "source_shell_polarity=True"], "strict_allowed": false, "support_count": 8, "uses_modular": false, "uses_source_shell": true}
- {"false_positive_count": 4, "features": ["C_parity=even", "source_shell_polarity=True"], "strict_allowed": false, "support_count": 8, "uses_modular": false, "uses_source_shell": true}
- {"false_positive_count": 4, "features": ["sign_dBA=neg", "source_shell_polarity=True"], "strict_allowed": false, "support_count": 8, "uses_modular": false, "uses_source_shell": true}
- {"false_positive_count": 4, "features": ["A_parity=odd", "C_parity=even", "source_shell_polarity=True"], "strict_allowed": false, "support_count": 8, "uses_modular": false, "uses_source_shell": true}
- {"false_positive_count": 4, "features": ["A_parity=odd", "sign_dBA=neg", "source_shell_polarity=True"], "strict_allowed": false, "support_count": 8, "uses_modular": false, "uses_source_shell": true}
- {"false_positive_count": 4, "features": ["C_parity=even", "sign_dBA=neg", "source_shell_polarity=True"], "strict_allowed": false, "support_count": 8, "uses_modular": false, "uses_source_shell": true}
- {"false_positive_count": 4, "features": ["A_parity=odd", "C_parity=even", "sign_dBA=neg", "source_shell_polarity=True"], "strict_allowed": false, "support_count": 8, "uses_modular": false, "uses_source_shell": true}
- {"false_positive_count": 15, "features": ["A_parity=odd", "C_parity=even", "sign_dBA=neg"], "strict_allowed": true, "support_count": 19, "uses_modular": false, "uses_source_shell": false}
- {"false_positive_count": 26, "features": ["A_parity=odd", "sign_dBA=neg"], "strict_allowed": true, "support_count": 30, "uses_modular": false, "uses_source_shell": false}
- {"false_positive_count": 26, "features": ["C_parity=even", "sign_dBA=neg"], "strict_allowed": true, "support_count": 30, "uses_modular": false, "uses_source_shell": false}
- {"false_positive_count": 32, "features": ["A_parity=odd", "C_parity=even"], "strict_allowed": true, "support_count": 36, "uses_modular": false, "uses_source_shell": false}
- {"false_positive_count": 52, "features": ["A_parity=odd"], "strict_allowed": true, "support_count": 56, "uses_modular": false, "uses_source_shell": false}
- {"false_positive_count": 56, "features": ["sign_dBA=neg"], "strict_allowed": true, "support_count": 60, "uses_modular": false, "uses_source_shell": false}
- {"false_positive_count": 60, "features": ["C_parity=even"], "strict_allowed": true, "support_count": 64, "uses_modular": false, "uses_source_shell": false}

## Checks

- PASS comparison_boundary_loaded: anchor_reverse_vs_shared_column_boundary_recorded
- PASS source_meaning_boundary_loaded: sparse_law_source_meaning_boundary_recorded
- PASS sparse_boundary_loaded: sparse_neighbor_carrier_boundary_recorded
- PASS record_count_120: 120
- PASS admitted_count_4: 4
- PASS canonical_anchor_reverse: shared_B+reverse_partner
- PASS no_full_g900: False
- PASS gap_a_not_closed: search only

## Next script

    record_independent_witness_layer_search_boundary_001.py
