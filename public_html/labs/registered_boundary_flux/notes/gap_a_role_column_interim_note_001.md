# Gap A role-column interim note 001

Status: gap_a_role_column_interim_note_recorded

## Boundary

- This is an interim theorem note, not a closure proof.
- Gap A remains open.
- The result is local to the tested zero-twisted-carrier obstruction neighborhood.
- No full source-derived chamber/register map is claimed.
- No global exact selector is claimed.
- No physical interpretation is claimed.

## Claim

- does_this_close_gap_a: false
- does_this_solve_gap_a: false
- does_this_give_full_chamber_register_map: false
- does_this_give_bounded_interim_support: true
- local_domain: "tested zero-twisted-carrier obstruction neighborhood"
- residual_rule: "singleton ZT OR multi-column TI"
- residual_support: [3, 16]
- stable_complement_rule: "singleton TI OR multi-column ZT"
- stable_complement_support: [4, 9, 15]
- all_residual_nulls_broken: true
- short_form: "Gap A remains open, but inside the zero-twisted obstruction the role-column orientation is load-bearing: singleton ZT plus multi-column TI selects the residuals, while singleton TI plus multi-column ZT selects the stable false positives."
- not_closed_reason: "The result is local to the tested zero-twisted-carrier neighborhood and does not yet derive a full source chamber/register map."

## Interim theorem statement

- name: Gap A role-column obstruction split interim theorem note
- statement: "Within the tested zero-twisted-carrier obstruction neighborhood, the residual rows are selected exactly by the role-column orientation singleton ZT OR multi-column TI. The stable false positives are selected exactly by the complementary orientation singleton TI OR multi-column ZT. Role-only and column-shape-only tests are insufficient; all nine residual nulls break exactness. This gives bounded interim support for a source-geometry split of the obstruction, but it does not close Gap A because no full source-derived chamber/register map has yet been constructed."
- admission_status: bounded_interim_support_not_gap_closure

## Evidence

- residual_side: {"exact_inside_neighborhood": true, "name": "source_geometry_singleton_ZT_OR_multi_column_TI", "precision": 1.0, "reading": "inside zero-twisted carrier, residual support is singleton ZT OR multi-column TI", "recall": 1.0, "support": [3, 16]}
- stable_side: {"exact_against_false_positives": true, "name": "source_geometry_singleton_TI_OR_multi_column_ZT", "precision_against_false_positives": 1.0, "reading": "inside zero-twisted carrier, stable false-positive support is singleton TI OR multi-column ZT", "recall_against_false_positives": 1.0, "support": [4, 9, 15]}
- null_summary: {"baseline_exact": true, "baseline_support": [3, 16], "broken_residual_null_count": 9, "complement_selects_false_positives": true, "complement_support": [4, 9, 15], "load_bearing": {"complement_selects_false_positives": true, "pairing_orientation_load_bearing": true, "role_only_insufficient": true, "role_placement_load_bearing": true, "role_swap_breaks_residual_exactness": true, "shape_only_insufficient": true, "shape_placement_load_bearing": true, "shape_swap_breaks_residual_exactness": true}, "residual_null_count": 9}

## Next questions

- Can the role-column orientation be derived from the source edge-law geometry before forming residual labels?
- Can the split be lifted from zero-twisted rows to a chamber/register map over all WXYZTI rows?
- Can allowed slot symmetries preserve the role-column orientation split?
- Can the stable complement singleton TI OR multi-column ZT be explained as lawful stable zero-twisted support?

## Checks

- PASS geometry_loaded: gap_a_role_column_source_geometry_candidate_found_not_closure
- PASS nulls_loaded: gap_a_role_column_source_geometry_nulls_recorded
- PASS residual_support_3_16: {"exact_inside_neighborhood": true, "name": "source_geometry_singleton_ZT_OR_multi_column_TI", "precision": 1.0, "reading": "inside zero-twisted carrier, residual support is singleton ZT OR multi-column TI", "recall": 1.0, "support": [3, 16]}
- PASS stable_support_4_9_15: {"exact_against_false_positives": true, "name": "source_geometry_singleton_TI_OR_multi_column_ZT", "precision_against_false_positives": 1.0, "reading": "inside zero-twisted carrier, stable false-positive support is singleton TI OR multi-column ZT", "recall_against_false_positives": 1.0, "support": [4, 9, 15]}
- PASS all_residual_nulls_broken: {"baseline_exact": true, "baseline_support": [3, 16], "broken_residual_null_count": 9, "complement_selects_false_positives": true, "complement_support": [4, 9, 15], "load_bearing": {"complement_selects_false_positives": true, "pairing_orientation_load_bearing": true, "role_only_insufficient": true, "role_placement_load_bearing": true, "role_swap_breaks_residual_exactness": true, "shape_only_insufficient": true, "shape_placement_load_bearing": true, "shape_swap_breaks_residual_exactness": true}, "residual_null_count": 9}

## Next script

    derive_gap_a_chamber_register_map_candidate_001.py
