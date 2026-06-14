# Gap A boundary seam rule geometry 001

Status: boundary_seam_rule_geometrically_justified_not_map_proof

Gap: A - chamber/register map.

## Boundary

- This is not a chamber/register map proof.
- This does not prove the physical or source meaning of the seam flip.
- This only tests whether the seam rule is independently expressible from WXYZTI cyclic geometry.
- The rule remains a candidate until connected back to source transport or G60 register derivation.

## Patterns

- role_order: ["WX", "XY", "YZ", "ZT", "TI", "IW"]
- raw_bridge_path_majority_pattern: [0, 1, 1, 0, 1, 0]
- target_pattern: [1, 1, 1, 0, 1, 1]

## Boundary seam masks

- first_last_mask: {"WX": true, "XY": false, "YZ": false, "ZT": false, "TI": false, "IW": true}
- W_incident_mask: {"WX": true, "XY": false, "YZ": false, "ZT": false, "TI": false, "IW": true}
- first_last_equals_W_incident: true
- first_last_projected_pattern: [1, 1, 1, 0, 1, 1]
- W_incident_projected_pattern: [1, 1, 1, 0, 1, 1]

## Station incidence scan

- station=W incident_roles=["WX", "IW"] distance=0 matches=True projected=[1, 1, 1, 0, 1, 1]
- station=X incident_roles=["WX", "XY"] distance=2 matches=False projected=[1, 0, 1, 0, 1, 0]
- station=Y incident_roles=["XY", "YZ"] distance=4 matches=False projected=[0, 0, 0, 0, 1, 0]
- station=Z incident_roles=["YZ", "ZT"] distance=4 matches=False projected=[0, 1, 0, 1, 1, 0]
- station=T incident_roles=["ZT", "TI"] distance=4 matches=False projected=[0, 1, 1, 1, 0, 0]
- station=I incident_roles=["TI", "IW"] distance=2 matches=False projected=[0, 1, 1, 0, 0, 1]

## Cycle geometry

- cycle 0: starts_W=True ends_I=True first_last_W_incident=True W_edges={"WX": [0, 1], "IW": [5, 0]}
- cycle 1: starts_W=True ends_I=True first_last_W_incident=True W_edges={"WX": [0, 1], "IW": [5, 0]}
- cycle 2: starts_W=True ends_I=True first_last_W_incident=True W_edges={"WX": [0, 1], "IW": [5, 0]}

## Interpretation

- main_result: The boundary seam rule is geometrically justified as the W-incident first/last seam rule of the cyclic WXYZTI register.
- anti_overfit_result: Among station-incidence rules, only W incidence maps the raw bridge-path majority pattern to the selected target pattern.
- what_this_gives: The seam flip can now be described as a register-geometry candidate rather than a mismatch-selected patch.
- what_remains_open: Gap A still requires connecting this W boundary seam rule to source transport or G60-derived register geometry.
- next_question: Can the W boundary seam projection be applied to the row-level role records and then checked against the selected target without further choices?

## Checks

- PASS bounded_rule_loaded: status=bounded_boundary_seam_projection_candidate_found_not_map_proof
- PASS role_pattern_loaded: status=wxyzti_bridge_path_role_pattern_partial_not_map_proof
- PASS target_loaded: status=normalized_target_not_proof
- PASS role_order_is_wxyzti_edges: role_order=["WX", "XY", "YZ", "ZT", "TI", "IW"]
- PASS raw_and_target_len_6: raw=[0, 1, 1, 0, 1, 0] target=[1, 1, 1, 0, 1, 1]
- PASS first_last_equals_W_incident_mask: first_last=[true, false, false, false, false, true] W_incident=[true, false, false, false, false, true]
- PASS first_last_projects_to_target: projected=[1, 1, 1, 0, 1, 1]
- PASS W_incident_projects_to_target: projected=[1, 1, 1, 0, 1, 1]
- PASS only_W_station_incidence_matches_target: exact_station_rules=["W"]
- PASS selected_target_has_3_cycles: cycle_count=3
- PASS all_cycles_start_at_shared_W: shared_W=0
- PASS all_cycles_end_at_shared_I_before_closure: shared_I=5
- PASS all_cycles_first_last_roles_are_W_incident: rows=[true, true, true]
- PASS bounded_candidates_present: allowed_exact_rules=["flip_boundary_seam_first_last", "flip_W_incident_roles"]

## Next script

    apply_gap_a_boundary_seam_projection_to_role_rows_001.py
