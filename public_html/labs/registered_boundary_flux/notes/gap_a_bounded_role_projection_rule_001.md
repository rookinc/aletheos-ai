# Gap A bounded role-projection rule 001

Status: bounded_boundary_seam_projection_candidate_found_not_map_proof

Gap: A - chamber/register map.

## Boundary

- This is not a chamber/register map proof.
- A matching candidate is not accepted if it is selected by target mismatch alone.
- This pass records bounded candidates and explicitly separates allowed structural rules from post-hoc descriptive rules.
- A rule that matches here remains a candidate until independently justified by source transport or register geometry.

## Patterns

- role_order: ["WX", "XY", "YZ", "ZT", "TI", "IW"]
- raw_bridge_path_majority_pattern: [0, 1, 1, 0, 1, 0]
- target_pattern: [1, 1, 1, 0, 1, 1]

## Summary

- allowed_exact_count: 2
- disallowed_exact_count: 2
- best_allowed_distance: 0
- best_allowed_rules: ["flip_boundary_seam_first_last", "flip_W_incident_roles"]
- allowed_exact_rules: ["flip_boundary_seam_first_last", "flip_W_incident_roles"]
- disallowed_exact_rules: ["flip_stable_zero_roles", "flip_mismatching_roles"]

## Candidate results

- identity: allowed=True distance=2 matches=False projected=[0, 1, 1, 0, 1, 0] basis=baseline
- flip_all_roles: allowed=True distance=4 matches=False projected=[1, 0, 0, 1, 0, 1] basis=global complement
- flip_boundary_seam_first_last: allowed=True distance=0 matches=True projected=[1, 1, 1, 0, 1, 1] basis=cyclic role-order boundary seam
- flip_W_incident_roles: allowed=True distance=0 matches=True projected=[1, 1, 1, 0, 1, 1] basis=target-declared W boundary incidence
- flip_diads: allowed=True distance=3 matches=False projected=[1, 1, 0, 0, 0, 0] basis=triad-of-diads positions WX,YZ,TI
- flip_couplers: allowed=True distance=3 matches=False projected=[0, 0, 1, 1, 1, 1] basis=coupler positions XY,ZT,IW
- flip_direct_visible_roles: allowed=True distance=4 matches=False projected=[1, 0, 1, 1, 0, 0] basis=direct edge-column visibility
- flip_bridge_path_roles: allowed=True distance=4 matches=False projected=[0, 1, 0, 1, 0, 1] basis=bridge-path visibility
- flip_stable_zero_roles: allowed=False distance=0 matches=True projected=[1, 1, 1, 0, 1, 1] basis=post-hoc output profile
- flip_mismatching_roles: allowed=False distance=0 matches=True projected=[1, 1, 1, 0, 1, 1] basis=post-hoc target mismatch

## Interpretation

- main_result: A bounded boundary-seam projection candidate is found if an allowed first-last/W-incident seam rule exactly maps the raw bridge-path pattern to the selected target pattern.
- anti_overfit_result: Post-hoc rules are recorded but not accepted as explanatory rules.
- what_this_gives: The mismatch is localized to boundary seam handling rather than the whole WXYZTI role pattern.
- what_remains_open: The boundary-seam rule must still be justified by source transport or register geometry before Gap A can close.
- next_question: Can W as entry/return boundary be justified independently from the selected target construction?

## Checks

- PASS role_pattern_loaded: status=wxyzti_bridge_path_role_pattern_partial_not_map_proof
- PASS target_loaded: status=normalized_target_not_proof
- PASS role_count_6: roles=["WX", "XY", "YZ", "ZT", "TI", "IW"]
- PASS raw_vec_len_6: raw=[0, 1, 1, 0, 1, 0]
- PASS target_vec_len_6: target=[1, 1, 1, 0, 1, 1]
- PASS candidate_count_ge_8: count=10
- PASS records_disallowed_overfit: disallowed_exact_count=2

## Next script

    justify_gap_a_boundary_seam_rule_from_register_geometry_001.py
