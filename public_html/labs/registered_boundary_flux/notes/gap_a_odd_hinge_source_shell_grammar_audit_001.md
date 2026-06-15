# Gap A odd-hinge source-shell grammar audit 001

Status: gap_a_odd_hinge_source_shell_audit_enriched_not_generator

## Summary

- audit_result: "odd_hinge_enriched_against_unique_length2_background"
- gap_a_closed: false
- selected_record_count: 4
- selected_odd_hinge_count: 4
- selected_all_odd_hinge: true
- selected_all_unique_shortest_len2: true
- selected_hinges: {"1": 1, "3": 1, "7": 1, "9": 1}
- selected_stations: {"T": 1, "Y": 1, "Z": 2}
- selected_role_pairs: {"XY->YZ": 1, "YZ->ZT": 2, "ZT->TI": 1}
- background_all_simple_length2: {"even_hinge_count": 48, "hinge_counts": {"0": 6, "1": 6, "10": 6, "11": 6, "12": 6, "13": 6, "14": 6, "2": 6, "3": 6, "4": 6, "5": 6, "6": 6, "7": 6, "8": 6, "9": 6}, "name": "all_simple_length2_paths", "odd_hinge_count": 42, "odd_hinge_fraction": 0.46666667, "path_count": 90}
- background_unique_shortest_length2: {"even_hinge_count": 32, "hinge_counts": {"0": 4, "1": 4, "10": 4, "11": 4, "12": 4, "13": 4, "14": 4, "2": 4, "3": 4, "4": 4, "5": 4, "6": 4, "7": 4, "8": 4, "9": 4}, "name": "unique_shortest_length2_paths", "odd_hinge_count": 28, "odd_hinge_fraction": 0.46666667, "path_count": 60}
- probability_all_selected_odd_under_unique_shortest_background_hypergeom: 0.041988372
- probability_all_selected_odd_under_unique_shortest_background_binomial: 0.047427162
- claim_closes_gap_a: false

## Selected records

- {"A": 3, "B": 4, "C": 2, "background_shortest_len2_for_endpoint": 1, "cycle": 0, "hinge_parity": "odd", "is_odd_hinge": true, "path_columns": [10, 7], "path_vertices": [4, 3, 2], "role_pair": "YZ->ZT", "selected_endpoint_unique_shortest_len2": true, "station": "Z"}
- {"A": 9, "B": 13, "C": 10, "background_shortest_len2_for_endpoint": 1, "cycle": 0, "hinge_parity": "odd", "is_odd_hinge": true, "path_columns": [29, 28], "path_vertices": [13, 9, 10], "role_pair": "ZT->TI", "selected_endpoint_unique_shortest_len2": true, "station": "T"}
- {"A": 1, "B": 2, "C": 0, "background_shortest_len2_for_endpoint": 1, "cycle": 1, "hinge_parity": "odd", "is_odd_hinge": true, "path_columns": [4, 0], "path_vertices": [2, 1, 0], "role_pair": "XY->YZ", "selected_endpoint_unique_shortest_len2": true, "station": "Y"}
- {"A": 7, "B": 11, "C": 14, "background_shortest_len2_for_endpoint": 1, "cycle": 2, "hinge_parity": "odd", "is_odd_hinge": true, "path_columns": [23, 24], "path_vertices": [11, 7, 14], "role_pair": "YZ->ZT", "selected_endpoint_unique_shortest_len2": true, "station": "Z"}

## Claim

- does_this_close_gap_a: false
- does_this_audit_odd_hinge_against_background: true
- does_this_find_enrichment: true
- does_this_find_generator: false
- short_form: "odd_hinge_enriched_against_unique_length2_background"
- not_closed_reason: "Odd-hinge enrichment or survival is weaker than a source-native projection-family generator."

## Checks

- PASS abc_loaded: source_shell_signed_abc_primitives_extracted_odd_hinge_signal_found_not_generator
- PASS branch_loaded: source_shell_projection_family_generator_branch_started
- PASS source_columns_loaded: 30
- PASS selected_records_loaded: 4
- PASS selected_all_odd_hinge: True
- PASS selected_all_unique_shortest_len2: True
- PASS gap_a_not_closed: audit only

## Next script

    search_gap_a_polarity_aware_odd_hinge_family_grammar_001.py
