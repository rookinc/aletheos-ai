# Gap A 15-thalion residual split nulls 001

Status: gap_a_15_thalion_residual_split_nulls_recorded

## Boundary

- This does not claim Gap A closure.
- The baseline feature is not exact.
- The nulls test whether the alignment depends on twisted carrier structure.
- A source-derived exact chamber/register map remains missing.

## Summary

- baseline_support: [3, 4, 9, 15, 16]
- baseline_recall: 1.0
- baseline_precision: 0.4
- untwisted_null_support: []
- untwisted_null_recall: 0.0
- generic_union_null_support: []
- generic_union_null_recall: 0.0
- slot_shuffle_null_support: [0, 1, 2, 3, 4, 6, 7, 9, 10, 12, 13, 14, 16]
- slot_shuffle_null_recall: 1.0
- load_bearing: {"generic_carrier_union_null_destroys_alignment": true, "slot_shuffle_null_destroys_or_changes_alignment": true, "untwisted_carrier_null_destroys_alignment": true}

## Feature tests

- {"exact": false, "false_positive_count": 3, "false_positives": [4, 9, 15], "miss_count": 0, "misses": [], "name": "baseline_zero_twisted_carrier", "precision": 0.4, "recall": 1.0, "residual_hit_count": 2, "residual_hits": [3, 16], "support": [3, 4, 9, 15, 16], "support_count": 5}
- {"exact": false, "false_positive_count": 0, "false_positives": [], "miss_count": 2, "misses": [3, 16], "name": "null_zero_untwisted_carrier", "precision": null, "recall": 0.0, "residual_hit_count": 0, "residual_hits": [], "support": [], "support_count": 0}
- {"exact": false, "false_positive_count": 0, "false_positives": [], "miss_count": 2, "misses": [3, 16], "name": "null_zero_generic_carrier_union", "precision": null, "recall": 0.0, "residual_hit_count": 0, "residual_hits": [], "support": [], "support_count": 0}
- {"exact": false, "false_positive_count": 11, "false_positives": [0, 1, 2, 4, 6, 7, 9, 10, 12, 13, 14], "miss_count": 0, "misses": [], "name": "null_zero_twisted_after_slot_shuffle", "precision": 0.15384615384615385, "recall": 1.0, "residual_hit_count": 2, "residual_hits": [3, 16], "support": [0, 1, 2, 3, 4, 6, 7, 9, 10, 12, 13, 14, 16], "support_count": 13}

## Load-bearing checks

- untwisted_carrier_null_destroys_alignment: true
- generic_carrier_union_null_destroys_alignment: true
- slot_shuffle_null_destroys_or_changes_alignment: true

## Interpretation

- main_result: The residual alignment depends on the twisted carrier structure rather than generic carrier availability.
- untwisted_null: Untwisted carrier absence does not reproduce the baseline zero-twisted obstruction neighborhood.
- generic_union_null: Collapsing twisted and untwisted carrier availability destroys the zero-carrier obstruction signal.
- slot_shuffle_null: Slot shuffle is recorded as a structural attack on slot identity; compare its support to the baseline support.
- not_closure: The baseline remains an obstruction neighborhood, not an exact selector.

## Checks

- PASS split_loaded: gap_a_15_thalion_residual_split_aligned_not_closed
- PASS lift_loaded: gap_a_uniform_15_thalion_row_lift_needs_inspection
- PASS residual_count_2: [3, 16]
- PASS baseline_recall_1: {"exact": false, "false_positive_count": 3, "false_positives": [4, 9, 15], "miss_count": 0, "misses": [], "name": "baseline_zero_twisted_carrier", "precision": 0.4, "recall": 1.0, "residual_hit_count": 2, "residual_hits": [3, 16], "support": [3, 4, 9, 15, 16], "support_count": 5}
- PASS untwisted_null_computed: {"exact": false, "false_positive_count": 0, "false_positives": [], "miss_count": 2, "misses": [3, 16], "name": "null_zero_untwisted_carrier", "precision": null, "recall": 0.0, "residual_hit_count": 0, "residual_hits": [], "support": [], "support_count": 0}
- PASS generic_union_null_computed: {"exact": false, "false_positive_count": 0, "false_positives": [], "miss_count": 2, "misses": [3, 16], "name": "null_zero_generic_carrier_union", "precision": null, "recall": 0.0, "residual_hit_count": 0, "residual_hits": [], "support": [], "support_count": 0}
- PASS slot_shuffle_null_computed: {"exact": false, "false_positive_count": 11, "false_positives": [0, 1, 2, 4, 6, 7, 9, 10, 12, 13, 14], "miss_count": 0, "misses": [], "name": "null_zero_twisted_after_slot_shuffle", "precision": 0.15384615384615385, "recall": 1.0, "residual_hit_count": 2, "residual_hits": [3, 16], "support": [0, 1, 2, 3, 4, 6, 7, 9, 10, 12, 13, 14, 16], "support_count": 13}
- PASS untwisted_destroys_alignment: {"exact": false, "false_positive_count": 0, "false_positives": [], "miss_count": 2, "misses": [3, 16], "name": "null_zero_untwisted_carrier", "precision": null, "recall": 0.0, "residual_hit_count": 0, "residual_hits": [], "support": [], "support_count": 0}
- PASS generic_union_destroys_alignment: {"exact": false, "false_positive_count": 0, "false_positives": [], "miss_count": 2, "misses": [3, 16], "name": "null_zero_generic_carrier_union", "precision": null, "recall": 0.0, "residual_hit_count": 0, "residual_hits": [], "support": [], "support_count": 0}

## Next script

    record_gap_a_15_thalion_interim_theorem_note_001.py
