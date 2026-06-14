# Register map candidate recovery 002

Status: A0_confirms_A1_supported_A2_row_identity_null_passed

Gap: A - chamber/register map.

## Boundary

- This is still not a chamber/register map proof.
- A0 confirms the target class at the public/control layer but does not close the register map.
- A1 is supported by existing row-aware FHE artifacts.
- A2 now has a live null showing row identity can be destroyed while M shape and row multiset are preserved.
- This does not replace a heavier full selector rerun on shuffled/transported inputs.

## A0 public predicate only

- status: control_layer_confirms_target_but_does_not_close_register_map
- supported: True
- interpretation: The target class and ZT edges are confirmed, but this layer does not close the chamber/register map.

## A1 row-aware M incidence

- status: row_aware_recovery_supported_by_existing_artifacts
- supported: True
- interpretation: Existing FHE artifacts support row-aware recovery; the evidence is selector-structural rather than literal target echo.

## A2 row-shuffled M null

- status: passed_row_identity_destroyed_null
- supported: True
- row_multiset_preserved: True
- row_position_hash_changed: True
- fixed_point_count: 0
- changed_position_count: 15
- interpretation: The null preserves M shape and row multiset while destroying row identity. Therefore row-aware recovery is not shape-only; a lawful register map must preserve or explicitly transport row identity.

## Current Gap A position

The tested evidence supports a forked Gap A position: public predicates confirm the target but do not close the register map; row-aware incidence carries exact recovery evidence; row identity is load-bearing under the first live null.

Not yet claimed:

- a lawful K900-to-chamber register map
- a full rerun of the selector search
- a proof that no alternative non-row-aware selector exists outside the tested feature family
- a physical interpretation

## Checks

- PASS recovery_001_loaded: recovery_001 status=A0_confirms_target_A1_supported_A2_pending
- PASS a0_supported: A0 supported=True
- PASS a1_supported: A1 supported=True
- PASS a2_was_pending: A2 old status=pending_live_row_shuffle_null
- PASS row_shuffle_null_passed: null status=passed_row_identity_destroyed_null
- PASS row_multiset_preserved: row_multiset_preserved=True
- PASS row_position_hash_changed: row_position_hash_changed=True
- PASS no_fixed_points: fixed_point_count=0
- PASS all_positions_changed: changed_position_count=15

## Next script

    extract_register_map_exact_selectors_001.py
