# Gap A neighbor-port mixed note 001

Status: gap_a_neighbor_port_mixed_note_recorded

## Boundary

- This is an interim note, not a closure proof.
- Gap A remains open.
- The neighbor-port rule is not promoted as independently load-bearing.
- The exact support remains local to the tested zero-twisted-carrier neighborhood.
- No full chamber/register map is claimed.
- No physical interpretation is claimed.

## Claim

- does_neighbor_port_rule_close_gap_a: false
- does_neighbor_port_rule_solve_gap_a: false
- does_neighbor_port_rule_remain_exact_inside_zero_twisted_neighborhood: true
- is_neighbor_port_rule_independently_load_bearing_after_nulls: false
- should_neighbor_port_rule_be_promoted: false
- short_form: "The neighbor-port rule is exact but not promoted: mixed nulls show weaker role/column substitutes still reproduce the same support."
- surviving_simpler_pattern: "singleton ZT OR multi-column TI"
- next_source_question: "Why does the zero-twisted obstruction split into singleton ZT and multi-column TI?"

## Interim statement

- name: Gap A neighbor-port mixed-note checkpoint
- statement: "The neighbor-port rewrite is exact inside the zero-twisted-carrier neighborhood, but mixed nulls prevent promotion. The evidence still supports surrounding-cell context as relevant, yet the exact support may be explained by a simpler role/column pattern: singleton ZT OR multi-column TI. The next source question is why the zero-twisted obstruction splits along that role/column geometry."
- admission_status: mixed_interim_support_not_promoted_not_gap_closure

## Evidence

### neighbor_port_rule

- status: "gap_a_neighbor_port_rule_candidate_found_not_closure"
- reading: "balanced singleton ZT port OR multi-column TI return with a dead neighbor port"
- support: [3, 16]
- exact_inside_neighborhood: true

### mixed_nulls

- status: "gap_a_neighbor_port_rule_nulls_mixed_not_promoted"
- baseline_support: [3, 16]
- broken_null_count: 5
- null_count: 8
- review_result: "mixed_not_promoted"
- exact_surviving_nulls: ["null_balance_blind_singleton_ZT_OR_TI_dead_port", "null_column_role_only_singleton_ZT_OR_multi_TI", "null_shift_dead_port_placement"]
- broken_nulls: ["null_role_blind_balanced_singleton_OR_any_dead_port", "null_dead_role_blind_balanced_ZT_OR_any_dead_port", "null_radius2_neighbor_port_rule", "null_shift_balanced_singleton_placement", "null_role_rotation_neighbor_port_rule"]
- load_bearing: {"balanced_singleton_placement_load_bearing": true, "dead_port_placement_load_bearing": false, "dead_port_role_specificity_load_bearing": true, "radius1_locality_load_bearing": true, "role_placement_load_bearing": true, "role_specificity_load_bearing": true}

### zero_twisted_split

- status: "gap_a_zero_twisted_neighborhood_split_candidate_found_not_closure"
- zero_twisted_neighborhood: [3, 4, 9, 15, 16]
- known_residual_rows: [3, 16]
- preferred_candidate: {"exact": true, "name": "branch_sensitive_return_candidate OR singleton_ZT_selected_turn_candidate", "precision": 1.0, "reading": "branch-sensitive return OR singleton ZT selected-turn", "recall": 1.0, "support": [3, 16]}

### surrounding_context

- status: "gap_a_surrounding_cell_context_probe_recorded"
- working_conjecture: {"current_status": "plausible_source_rule_vector_not_closure", "meaning": "A single Perfect Return Cell displays the local witness, while the 15-thalion ring supplies the environment that distinguishes selected-turn residue from return-path residue.", "statement": "Surrounding perfect cells supply neighbor boundary conditions for the local WXYZTI register."}

### previous_interim

- status: "gap_a_zero_twisted_split_interim_note_recorded"
- claim: {"candidate_rule": "branch-sensitive return OR singleton ZT selected-turn", "candidate_support": [3, 16], "does_this_close_gap_a": false, "does_this_give_exact_split_inside_zero_twisted_neighborhood": true, "does_this_give_global_exact_selector": false, "does_this_solve_gap_a": false, "does_this_survive_tested_nulls": true, "not_closed_reason": "The exact split is restricted to the tested zero-twisted-carrier neighborhood. No full source-derived chamber/register map is claimed.", "short_form": "Gap A remains open, but inside the load-bearing zero-twisted-carrier neighborhood, the tested split candidate is exact and every tested null breaks exactness."}

## Next questions

- Can singleton ZT and multi-column TI be derived from the twisted carrier source geometry?
- Are singleton ZT and multi-column TI invariant under allowed slot symmetries?
- Can the role/column split be lifted from row-level description to source edge-law geometry?
- Does this explain the stable false positives: singleton TI and multi-column ZT?

## Checks

- PASS rule_loaded: gap_a_neighbor_port_rule_candidate_found_not_closure
- PASS nulls_mixed_loaded: gap_a_neighbor_port_rule_nulls_mixed_not_promoted
- PASS context_loaded: gap_a_surrounding_cell_context_probe_recorded
- PASS split_interim_loaded: gap_a_zero_twisted_split_interim_note_recorded
- PASS split_loaded: gap_a_zero_twisted_neighborhood_split_candidate_found_not_closure
- PASS surviving_nulls_present: ["null_balance_blind_singleton_ZT_OR_TI_dead_port", "null_column_role_only_singleton_ZT_OR_multi_TI", "null_shift_dead_port_placement"]
- PASS not_promoted: promotion false
- PASS gap_a_not_closed: closure false

## Next script

    derive_gap_a_role_column_source_geometry_001.py
