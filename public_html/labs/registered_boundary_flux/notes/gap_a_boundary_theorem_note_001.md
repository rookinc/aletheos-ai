# Gap A boundary theorem note 001

Status: gap_a_boundary_theorem_note_recorded

## Plateau

- name: Bounded Indexed Global Predicate Plateau
- result: Exact indexed global-carrier predicate for the Gap A source law
- gap_a_closed: false

## Boundary theorem

Over the 18-row WXYZTI indexed global-carrier witness table, the normalized source law is exact. The preimage predicate all_global_witnesses AND zero_twisted_source_row AND (singleton_ZT OR multi_column_TI) selects exactly rows [3,16]. The stable complement predicate all_global_witnesses AND zero_twisted_source_row AND (singleton_TI OR multi_column_ZT) selects exactly rows [4,9,15].

## Predicate formulas

- preimage: all_global_witnesses AND zero_twisted_source_row AND (singleton_ZT OR multi_column_TI)
- stable_complement: all_global_witnesses AND zero_twisted_source_row AND (singleton_TI OR multi_column_ZT)

## Summary

- plateau_name: "Bounded Indexed Global Predicate Plateau"
- boundary_result: "Exact indexed global-carrier predicate for the Gap A source law"
- gap_a_closed: false
- bounded_domain: "18-row WXYZTI indexed global-carrier witness table"
- full_domain_not_yet_constructed: "900 carrier to WXYZTI register map"
- preimage_support: [3, 16]
- stable_complement_support: [4, 9, 15]
- preimage_exact: true
- stable_complement_exact: true
- false_positive_preimage: []
- false_negative_preimage: []
- false_positive_stable: []
- false_negative_stable: []
- all_columns_have_global_witnesses: true
- all_rows_have_global_witnesses: true
- columns_indexed_only: [1, 3, 5, 6, 7, 10, 11, 14, 18, 19, 28, 29]
- columns_direct_and_indexed: [0, 2, 4, 8, 9, 12, 13, 15, 16, 17, 20, 21, 22, 23, 24, 25, 26, 27]
- indexed_endpoint_agreement_count: 5
- row_mode_summary: {"direct_and_indexed": [0, 1, 3, 4, 6, 7, 12, 13, 15, 16], "direct_and_indexed+indexed_only": [8, 9, 14], "indexed_only": [2, 5, 10, 11, 17]}

## Hard boundary

- Gap A is not closed.
- The theorem is exact only over the 18-row WXYZTI indexed global-carrier witness table.
- A full source-derived 900 carrier-to-WXYZTI register map has not yet been constructed.
- Indexed witness mode is representation evidence, not direct endpoint equality.
- Only 5 columns currently show indexed endpoint agreement.
- No physical interpretation is claimed.

## What changed

- The earlier row-local source law now has a global indexed-carrier predicate form.
- The complete witness table has 30/30 column coverage and 18/18 row coverage.
- The preimage [3,16] and stable complement [4,9,15] are both exact, with no false positives or false negatives.
- The old branch-sensitive survivor is not independent on the tested row table; it is row-equivalent to the normalized preimage.
- The remaining problem has shifted from witness coverage to source-derived map construction.

## Claim

- does_this_close_gap_a: false
- does_this_record_gap_a_boundary_theorem: true
- does_this_construct_full_900_carrier_to_register_map: false
- preimage_exact: true
- stable_complement_exact: true
- short_form: "Gap A is not closed, but the normalized source law has an exact indexed global-carrier predicate form over the 18-row WXYZTI witness table."
- not_closed_reason: "The full source-derived 900 carrier-to-WXYZTI register map remains open."

## Next phase

- recommended_next: attempt_gap_a_full_carrier_to_wxyzti_register_map_001.py
- goal: Try to construct an explicit source-derived map from 900 carrier records into WXYZTI register rows.
- success_condition: WXYZTI rows and their preimage/stable predicates arise from a source map, not from an already-formed 18-row witness table.
- failure_condition: The source files provide indexed witness coverage but not enough structure to derive the register rows without an external row table.

## Checks

- PASS indexed_theorem_note_loaded: gap_a_indexed_global_predicate_theorem_note_recorded
- PASS indexed_predicate_loaded: gap_a_indexed_global_carrier_predicate_exact
- PASS global_indexed_map_loaded: gap_a_global_carrier_map_with_indexed_witnesses_complete
- PASS parser_patch_loaded: gap_a_global_edge_parser_patch_indexed_witness_complete
- PASS normalized_preimage_loaded: gap_a_source_preimage_from_normalized_zero_rows_recorded_not_promoted
- PASS preimage_exact: [3, 16]
- PASS stable_complement_exact: [4, 9, 15]
- PASS all_columns_witnessed: 30/30
- PASS all_rows_witnessed: 18/18
- PASS gap_a_not_closed: boundary theorem only

## Next script

    attempt_gap_a_full_carrier_to_wxyzti_register_map_001.py
