# Gap A selector theorem note 001

Status: bounded_gap_a_selector_theorem_note_recorded

Gap: A - chamber/register map.

Proof status: bounded finite audit theorem-note, not full Gap A closure

## Short form

Public predicates reduce but do not close; row-aware incidence closes in the tested family; row identity is load-bearing under null.

## Theorem-note statement

- Within the tested FHE chamber/support feature family, public predicates confirm the selected target class and ZT edge pattern but do not close the chamber/register map.
- Within that tested feature family, exact recovery requires row-aware M-incidence information.
- The minimal one-feature exact selector recorded by the minimizer is support_row_degree_profile.
- The least-sharp exact tested selectors combine chamber block information with row-aware support-location information.
- A deterministic row-shuffle null preserves the shape and row multiset of M while destroying row identity, so row-aware recovery cannot be treated as shape-only.

## Not claimed

- a lawful K900-to-chamber register map
- a proof over all possible predicates
- a full selector rerun on shuffled or transported inputs
- a physical interpretation
- a claim that the lab rendering itself proves the theorem

## Evidence summary

- A0: control_layer_confirms_target_but_does_not_close_register_map
- A1: row_aware_recovery_supported_by_existing_artifacts
- A2: passed_row_identity_destroyed_null
- one_feature_exact_selector: support_row_degree_profile
- row_aware_needed_in_tested_family: True
- row_multiset_preserved_under_null: True
- row_position_hash_changed_under_null: True

## Checks

- PASS recovery_002_expected_status: status=A0_confirms_A1_supported_A2_row_identity_null_passed
- PASS selectors_extracted: status=exact_selector_structure_extracted
- PASS one_feature_selector_is_support_row_degree_profile: one_feature_exact_selector=support_row_degree_profile
- PASS row_aware_needed_in_tested_family: row_aware_needed=True
- PASS row_shuffle_null_passed: status=passed_row_identity_destroyed_null
- PASS row_multiset_preserved: row_multiset_preserved=True
- PASS row_position_hash_changed: row_position_hash_changed=True
- PASS no_fixed_points: fixed_point_count=0

## Next work

- Decide whether to run a heavier shuffled-selector rerun.
- Separate public register-key reduction from row-aware exact recovery in a concise proof note.
- Use this note as the Gap A status surface for the Perfect Return Cell lab.
- Do not claim full chamber/register map closure until a lawful map is constructed.

## Next script

    wire_gap_a_status_into_perfect_return_cell_001.py
