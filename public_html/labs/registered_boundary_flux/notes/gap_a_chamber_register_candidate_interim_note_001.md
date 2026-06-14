# Gap A chamber/register candidate interim note 001

Status: gap_a_chamber_register_candidate_interim_note_recorded

## Boundary

- This is an interim theorem note, not a closure proof.
- Gap A remains open.
- The candidate is exact over the tested 18 WXYZTI role rows.
- The candidate is null-hardened against the ten tested row-level substitutes.
- No full source-derived chamber/register map is claimed.
- No global exact selector is claimed.
- No physical interpretation is claimed.

## Claim

- does_this_close_gap_a: false
- does_this_solve_gap_a: false
- does_this_give_full_source_derived_chamber_register_map: false
- does_this_give_row_level_chamber_register_map_candidate: true
- does_this_candidate_match_all_18_rows: true
- does_this_candidate_survive_tested_nulls: true
- base_projection_match_count: 16
- base_projection_mismatches: [3, 16]
- candidate_match_count: 18
- candidate_mismatches: []
- changed_rows: [3, 16]
- null_count: 10
- broken_null_count: 10
- surviving_nulls: []
- residual_side: "singleton ZT OR multi-column TI"
- stable_complement: "singleton TI OR multi-column ZT"
- short_form: "Gap A remains open, but the tested 18-row WXYZTI chamber/register table now has a null-hardened row-level map candidate: W-boundary seam projection plus role-column residual-side adjustment on rows 3 and 16."
- not_closed_reason: "The result is still row-table-level. It has not yet been derived as a full source-law chamber/register map from the global carrier construction."

## Interim theorem statement

- name: Gap A chamber/register row-level candidate interim note
- statement: "W-boundary seam projection alone matches 16 of 18 WXYZTI role rows, with residual mismatches at rows 3 and 16. Adding the role-column residual-side adjustment, singleton ZT OR multi-column TI, changes exactly rows 3 and 16 and yields an 18 of 18 row-level chamber/register map candidate. All ten tested chamber/register nulls break exactness, including no-change, role-only, column-shape-only, complement, rotation, and swap substitutes. This is strong row-level support for the candidate map, but it does not close Gap A because the map has not yet been derived as a full source-law chamber/register construction from the global carrier."
- admission_status: null_hardened_row_level_candidate_not_gap_closure

## Evidence

### candidate_rule

{
  "name": "W_boundary_seam_plus_role_column_obstruction_orientation",
  "reading": "Use W-boundary seam projection for all rows; for rows in the source-geometry residual side, apply the obstruction-side adjustment.",
  "residual_side": "singleton ZT OR multi-column TI",
  "residual_support": [
    3,
    16
  ],
  "stable_complement": "singleton TI OR multi-column ZT",
  "stable_complement_support": [
    4,
    9,
    15
  ]
}

### candidate_summary

{
  "base_match_count": 16,
  "base_mismatches": [
    3,
    16
  ],
  "candidate_match_count": 18,
  "candidate_mismatches": [],
  "changed_rows": [
    3,
    16
  ],
  "claim_closes_gap_a": false,
  "row_count": 18,
  "stable_complement_changed": [],
  "stable_complement_matches": [
    4,
    9,
    15
  ]
}

### null_summary

{
  "baseline_exact": true,
  "baseline_match_count": 18,
  "broken_null_count": 10,
  "broken_nulls": [
    "null_no_change_w_boundary_only",
    "null_role_only_ZT",
    "null_role_only_TI",
    "null_shape_only_singleton",
    "null_shape_only_multi_column",
    "null_complement_pairing_singleton_TI_OR_multi_column_ZT",
    "null_rotated_roles_keep_shapes",
    "null_rotated_shapes_keep_roles",
    "null_swapped_roles_keep_shapes",
    "null_swapped_shapes_keep_roles"
  ],
  "claim_closes_gap_a": false,
  "load_bearing": {
    "all_nulls_break_exactness": true,
    "complement_pairing_breaks": true,
    "role_only_insufficient": true,
    "role_rotation_breaks": true,
    "role_swap_breaks": true,
    "shape_only_insufficient": true,
    "shape_rotation_breaks": true,
    "shape_swap_breaks": true,
    "w_boundary_only_insufficient": true
  },
  "null_count": 10,
  "row_count": 18,
  "surviving_nulls": []
}

### role_column_claim

{
  "all_residual_nulls_broken": true,
  "does_this_close_gap_a": false,
  "does_this_give_bounded_interim_support": true,
  "does_this_give_full_chamber_register_map": false,
  "does_this_solve_gap_a": false,
  "local_domain": "tested zero-twisted-carrier obstruction neighborhood",
  "not_closed_reason": "The result is local to the tested zero-twisted-carrier neighborhood and does not yet derive a full source chamber/register map.",
  "residual_rule": "singleton ZT OR multi-column TI",
  "residual_support": [
    3,
    16
  ],
  "short_form": "Gap A remains open, but inside the zero-twisted obstruction the role-column orientation is load-bearing: singleton ZT plus multi-column TI selects the residuals, while singleton TI plus multi-column ZT selects the stable false positives.",
  "stable_complement_rule": "singleton TI OR multi-column ZT",
  "stable_complement_support": [
    4,
    9,
    15
  ]
}

### role_column_null_load_bearing

{
  "complement_selects_false_positives": true,
  "pairing_orientation_load_bearing": true,
  "role_only_insufficient": true,
  "role_placement_load_bearing": true,
  "role_swap_breaks_residual_exactness": true,
  "shape_only_insufficient": true,
  "shape_placement_load_bearing": true,
  "shape_swap_breaks_residual_exactness": true
}

## Next questions

- Can the 18-row candidate be derived from source edge-law geometry without referencing residual labels?
- Can the chamber/register map be lifted from the WXYZTI row table to the global carrier construction?
- Can the map be expressed as a lawful source preimage rather than a row-level correction?
- Can the stable complement rows be characterized as lawful stable support rather than merely non-residual rows?

## Checks

- PASS candidate_loaded: gap_a_chamber_register_map_candidate_found_not_closure
- PASS candidate_nulls_loaded: gap_a_chamber_register_map_candidate_nulls_recorded
- PASS role_interim_loaded: gap_a_role_column_interim_note_recorded
- PASS role_geometry_loaded: gap_a_role_column_source_geometry_candidate_found_not_closure
- PASS role_nulls_loaded: gap_a_role_column_source_geometry_nulls_recorded
- PASS boundary_loaded: boundary_seam_projection_role_rows_partial_not_map_proof
- PASS base_16_of_18: {"base_match_count": 16, "base_mismatches": [3, 16], "candidate_match_count": 18, "candidate_mismatches": [], "changed_rows": [3, 16], "claim_closes_gap_a": false, "row_count": 18, "stable_complement_changed": [], "stable_complement_matches": [4, 9, 15]}
- PASS base_mismatches_3_16: {"base_match_count": 16, "base_mismatches": [3, 16], "candidate_match_count": 18, "candidate_mismatches": [], "changed_rows": [3, 16], "claim_closes_gap_a": false, "row_count": 18, "stable_complement_changed": [], "stable_complement_matches": [4, 9, 15]}
- PASS candidate_18_of_18: {"base_match_count": 16, "base_mismatches": [3, 16], "candidate_match_count": 18, "candidate_mismatches": [], "changed_rows": [3, 16], "claim_closes_gap_a": false, "row_count": 18, "stable_complement_changed": [], "stable_complement_matches": [4, 9, 15]}
- PASS candidate_no_mismatches: {"base_match_count": 16, "base_mismatches": [3, 16], "candidate_match_count": 18, "candidate_mismatches": [], "changed_rows": [3, 16], "claim_closes_gap_a": false, "row_count": 18, "stable_complement_changed": [], "stable_complement_matches": [4, 9, 15]}
- PASS changed_rows_3_16: {"base_match_count": 16, "base_mismatches": [3, 16], "candidate_match_count": 18, "candidate_mismatches": [], "changed_rows": [3, 16], "claim_closes_gap_a": false, "row_count": 18, "stable_complement_changed": [], "stable_complement_matches": [4, 9, 15]}
- PASS all_chamber_nulls_break: {"baseline_exact": true, "baseline_match_count": 18, "broken_null_count": 10, "broken_nulls": ["null_no_change_w_boundary_only", "null_role_only_ZT", "null_role_only_TI", "null_shape_only_singleton", "null_shape_only_multi_column", "null_complement_pairing_singleton_TI_OR_multi_column_ZT", "null_rotated_roles_keep_shapes", "null_rotated_shapes_keep_roles", "null_swapped_roles_keep_shapes", "null_swapped_shapes_keep_roles"], "claim_closes_gap_a": false, "load_bearing": {"all_nulls_break_exactness": true, "complement_pairing_breaks": true, "role_only_insufficient": true, "role_rotation_breaks": true, "role_swap_breaks": true, "shape_only_insufficient": true, "shape_rotation_breaks": true, "shape_swap_breaks": true, "w_boundary_only_insufficient": true}, "null_count": 10, "row_count": 18, "surviving_nulls": []}
- PASS no_surviving_chamber_nulls: {"baseline_exact": true, "baseline_match_count": 18, "broken_null_count": 10, "broken_nulls": ["null_no_change_w_boundary_only", "null_role_only_ZT", "null_role_only_TI", "null_shape_only_singleton", "null_shape_only_multi_column", "null_complement_pairing_singleton_TI_OR_multi_column_ZT", "null_rotated_roles_keep_shapes", "null_rotated_shapes_keep_roles", "null_swapped_roles_keep_shapes", "null_swapped_shapes_keep_roles"], "claim_closes_gap_a": false, "load_bearing": {"all_nulls_break_exactness": true, "complement_pairing_breaks": true, "role_only_insufficient": true, "role_rotation_breaks": true, "role_swap_breaks": true, "shape_only_insufficient": true, "shape_rotation_breaks": true, "shape_swap_breaks": true, "w_boundary_only_insufficient": true}, "null_count": 10, "row_count": 18, "surviving_nulls": []}
- PASS gap_a_not_closed: closure false

## Next script

    derive_gap_a_source_law_preimage_candidate_001.py
