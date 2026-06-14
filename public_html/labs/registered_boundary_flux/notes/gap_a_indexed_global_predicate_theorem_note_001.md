# Gap A indexed global predicate theorem note 001

Status: gap_a_indexed_global_predicate_theorem_note_recorded

## Bounded theorem statement

Over the 18-row WXYZTI indexed global-carrier witness table, using the direct-or-indexed witness rule, the predicate all_global_witnesses AND zero_twisted_source_row AND (singleton_ZT OR multi_column_TI) selects exactly rows [3,16]. The stable complement predicate all_global_witnesses AND zero_twisted_source_row AND (singleton_TI OR multi_column_ZT) selects exactly rows [4,9,15].

## Predicate formulas

- preimage: all_global_witnesses AND zero_twisted_source_row AND (singleton_ZT OR multi_column_TI)
- stable_complement: all_global_witnesses AND zero_twisted_source_row AND (singleton_TI OR multi_column_ZT)

## Summary

- theorem_name: "Gap A bounded indexed global predicate theorem"
- status: "bounded_theorem_note_not_gap_a_closure"
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
- indexed_endpoint_agreement_count: 5
- columns_indexed_only: [1, 3, 5, 6, 7, 10, 11, 14, 18, 19, 28, 29]
- columns_direct_and_indexed: [0, 2, 4, 8, 9, 12, 13, 15, 16, 17, 20, 21, 22, 23, 24, 25, 26, 27]
- row_mode_summary: {"direct_and_indexed": [0, 1, 3, 4, 6, 7, 12, 13, 15, 16], "direct_and_indexed+indexed_only": [8, 9, 14], "indexed_only": [2, 5, 10, 11, 17]}
- claim_closes_gap_a: false

## Boundary

- This does not close Gap A.
- This is exact over the 18-row indexed global-carrier witness table.
- This is not yet a full source-derived carrier-to-register map from the 900 carrier.
- Indexed witness mode is weaker than direct endpoint equality.
- Only 5 columns have indexed endpoint agreement in the current audit.
- No physical interpretation is claimed.

## Why it matters

- The earlier row-local source law now has an exact indexed global-carrier formulation.
- The old branch-sensitive survivor is no longer an independent row-level selector in this tested table.
- The stable complement is recovered exactly alongside the preimage, which prevents the result from being only a one-sided fit.
- The remaining open problem is no longer schema coverage; it is full source-derived carrier-to-register construction.

## Claim

- does_this_close_gap_a: false
- does_this_record_bounded_theorem_note: true
- does_this_construct_full_global_source_law_map: false
- preimage_exact: true
- stable_complement_exact: true
- preimage_support: [3, 16]
- stable_complement_support: [4, 9, 15]
- short_form: "The normalized source law has an exact indexed global-carrier predicate form over the 18-row witness table."
- not_closed_reason: "A full source-derived 900 carrier-to-register map remains open."

## Next options

- full_carrier_domain_enumeration: Attempt to enumerate a broader global carrier-domain predicate rather than the 18-row witness table. Risk: May require a precise definition of the carrier-domain rows before enumeration.
- gap_a_boundary_theorem_note: Write the bounded theorem as the current Gap A boundary result. Risk: Must clearly preserve that Gap A is not fully closed.
- carrier_to_register_map_attempt: Try to construct an explicit source-derived map from 900 carrier records into WXYZTI register rows. Risk: Harder but closest to actual Gap A closure.

## Checks

- PASS indexed_predicate_loaded: gap_a_indexed_global_carrier_predicate_exact
- PASS global_indexed_map_loaded: gap_a_global_carrier_map_with_indexed_witnesses_complete
- PASS parser_patch_loaded: gap_a_global_edge_parser_patch_indexed_witness_complete
- PASS normalized_preimage_loaded: gap_a_source_preimage_from_normalized_zero_rows_recorded_not_promoted
- PASS preimage_exact: [3, 16]
- PASS stable_complement_exact: [4, 9, 15]
- PASS no_preimage_false_positives: []
- PASS no_preimage_false_negatives: []
- PASS no_stable_false_positives: []
- PASS no_stable_false_negatives: []
- PASS all_columns_witnessed: 30/30
- PASS all_rows_witnessed: 18/18
- PASS gap_a_not_closed: bounded indexed predicate theorem only

## Next script

    decide_gap_a_full_carrier_enumeration_or_boundary_note_001.py
