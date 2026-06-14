# Register map row-shuffle null 001

Status: passed_row_identity_destroyed_null

Gap: A - chamber/register map.

Test: A2 row-shuffled M null.

## Boundary

- This is a live row-identity destruction null, not a full rerun of the FHE selector search.
- It does not prove that no possible shuffled selector can be invented.
- It does show that any row-aware recovery cannot be claimed after row shuffle unless row identity/taxonomy is transported or recomputed.
- This is the correct first null before attempting a heavier full selector rerun.

## Shuffle

- convention: shuffled_M[i] = original_M[perm[i]]
- perm: [7, 0, 13, 5, 1, 14, 2, 10, 3, 12, 4, 9, 6, 11, 8]
- fixed_points: []
- changed_position_count: 15
- row_multiset_preserved: True
- row_position_hash_changed: True

## Interpretation

The row-aware recovery evidence is identity-sensitive. A chamber/register proof must preserve or lawfully transport row identity; scalar row multiset shape is insufficient.

What remains open: A heavier pass may rerun the exact selector search on shuffled/transported inputs, but this first null already blocks treating row-aware recovery as shape-only.

## Checks

- PASS validation_passed: validation status=passed
- PASS recovery_a2_was_pending: A2 prior status=pending_live_row_shuffle_null
- PASS matrix_shape_15x30: shape={"rows": 15, "cols": 30}
- PASS perm_is_permutation_0_to_14: perm=[7, 0, 13, 5, 1, 14, 2, 10, 3, 12, 4, 9, 6, 11, 8]
- PASS perm_is_derangement: fixed_points=[]
- PASS shuffled_matrix_shape_preserved: shuffled_shape={"rows": 15, "cols": 30}
- PASS row_multiset_preserved: original_multiset_hash=c59f0d45df7808eb shuffled_multiset_hash=c59f0d45df7808eb
- PASS row_position_hash_changed: original_position_hash=53d0ca57fc6891d5 shuffled_position_hash=b7e3b45b0e363f7e
- PASS all_row_positions_changed: changed_positions=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
- PASS row_taxonomy_partition_unchanged_as_labels: taxonomy_rows=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
- PASS row_aware_artifacts_use_row_features: row-aware support feature names are present
- PASS minimizer_records_exact_row_aware_selector_terms: exact selector and support_row_degree_profile are present

## Next script

    update_register_map_candidate_recovery_with_a2_null_001.py
