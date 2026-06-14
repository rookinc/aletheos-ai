# Gap A 900-vertex automorphism orbit discovery 001

Status: gap_a_900_vertex_automorphism_orbits_no_mirror_support

## Boundary

- This does not close Gap A.
- WL color classes are necessary automorphism invariants, not a complete automorphism group.
- Slot-quotient automorphisms are source-side quotient symmetries, not full 900-vertex automorphisms.
- Mirror support here means source-discovered compatibility, not proof of the WXYZTI row generator.
- No physical interpretation is claimed.

## Summary

- discovery_result: "no_source_discovered_mirror_support_found"
- gap_a_closed: false
- graph_report_count: 3
- mirror_supported_sources: []
- max_wl_cell_count: 240
- max_slot_quotient_automorphism_count: 120
- sources_with_slot_quotient_automorphisms: ["g900_candidate_graph_export", "g900_twisted_ring_candidate_export", "g900_candidate_edges"]
- sources_with_mirror_slot_automorphisms: []
- claim_closes_gap_a: false

## Graph reports compact

- {"degree_histogram": {"8": 900}, "edge_count": 3600, "mirror_slot_automorphism_count": 0, "slot_orbits": [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]], "slot_quotient_automorphism_count": 120, "slot_signature_class_count": 1, "source_discovered_mirror_support": false, "source_name": "g900_candidate_graph_export", "vertex_count": 900, "wl_cell_count": 1, "wl_cell_size_histogram": {"900": 1}}
- {"degree_histogram": {"8": 900}, "edge_count": 3600, "mirror_slot_automorphism_count": 0, "slot_orbits": [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]], "slot_quotient_automorphism_count": 120, "slot_signature_class_count": 1, "source_discovered_mirror_support": false, "source_name": "g900_twisted_ring_candidate_export", "vertex_count": 900, "wl_cell_count": 1, "wl_cell_size_histogram": {"900": 1}}
- {"degree_histogram": {"8": 885, "11": 2, "12": 13}, "edge_count": 3629, "mirror_slot_automorphism_count": 0, "slot_orbits": [[0], [6, 13], [1, 4, 10, 11], [2, 3, 5, 7, 8, 9, 12, 14]], "slot_quotient_automorphism_count": 8, "slot_signature_class_count": 2, "source_discovered_mirror_support": false, "source_name": "g900_candidate_edges", "vertex_count": 900, "wl_cell_count": 240, "wl_cell_size_histogram": {"1": 60, "2": 60, "4": 60, "8": 60}}

## Mirror tests

### g900_candidate_graph_export

- {"broken_sample": [], "name": "cycle_mirror_keep_local_5x3", "preserves_slot_quotient": false, "wl_same_color_count": 900, "wl_same_color_fraction": 1.0, "wl_total": 900}
- {"broken_sample": [], "name": "cycle_mirror_reverse_local_5x3", "preserves_slot_quotient": false, "wl_same_color_count": 900, "wl_same_color_fraction": 1.0, "wl_total": 900}
- {"broken_sample": [], "name": "reflect_14_minus_s", "preserves_slot_quotient": false, "wl_same_color_count": 900, "wl_same_color_fraction": 1.0, "wl_total": 900}
### g900_twisted_ring_candidate_export

- {"broken_sample": [], "name": "cycle_mirror_keep_local_5x3", "preserves_slot_quotient": false, "wl_same_color_count": 900, "wl_same_color_fraction": 1.0, "wl_total": 900}
- {"broken_sample": [], "name": "cycle_mirror_reverse_local_5x3", "preserves_slot_quotient": false, "wl_same_color_count": 900, "wl_same_color_fraction": 1.0, "wl_total": 900}
- {"broken_sample": [], "name": "reflect_14_minus_s", "preserves_slot_quotient": false, "wl_same_color_count": 900, "wl_same_color_fraction": 1.0, "wl_total": 900}
### g900_candidate_edges

- {"broken_sample": [["T00_S00", "T10_S00", "177", "175"], ["T00_S01", "T10_S01", "215", "105"], ["T00_S02", "T10_S02", "126", "64"], ["T00_S03", "T10_S03", "189", "65"], ["T00_S04", "T10_S04", "153", "168"]], "name": "cycle_mirror_keep_local_5x3", "preserves_slot_quotient": false, "wl_same_color_count": 540, "wl_same_color_fraction": 0.6, "wl_total": 900}
- {"broken_sample": [["T00_S00", "T14_S00", "177", "125"], ["T00_S01", "T14_S01", "215", "235"], ["T00_S02", "T14_S02", "126", "104"], ["T00_S03", "T14_S03", "189", "234"], ["T00_S04", "T14_S04", "153", "129"]], "name": "cycle_mirror_reverse_local_5x3", "preserves_slot_quotient": false, "wl_same_color_count": 420, "wl_same_color_fraction": 0.4666666666666667, "wl_total": 900}
- {"broken_sample": [["T00_S00", "T14_S00", "177", "125"], ["T00_S01", "T14_S01", "215", "235"], ["T00_S02", "T14_S02", "126", "104"], ["T00_S03", "T14_S03", "189", "234"], ["T00_S04", "T14_S04", "153", "129"]], "name": "reflect_14_minus_s", "preserves_slot_quotient": false, "wl_same_color_count": 420, "wl_same_color_fraction": 0.4666666666666667, "wl_total": 900}

## Claim

- does_this_close_gap_a: false
- does_this_discover_source_orbit_data: true
- does_this_find_source_discovered_mirror_support: false
- does_this_construct_full_900_carrier_to_register_map: false
- short_form: "Source-discovered orbit data gives no mirror support in the tested 900-vertex sources."
- not_closed_reason: "No source-derived WXYZTI row generator is constructed."

## Interpretation

- main_result: The source graph itself does not support the projection mirror under the tested orbit and quotient probes.
- remaining_gap: A source-native WXYZTI row generator remains missing.
- next_move: Record the Mode 2 mirror as projection-level evidence and return to deriving the WXYZTI register generator.

## Checks

- PASS mirror_900_search_loaded: gap_a_mode2_mirror_900_vertex_involution_not_found
- PASS column_involution_search_loaded: gap_a_source_side_involution_for_mode2_mirror_not_found
- PASS mode2_audit_loaded: gap_a_mode2_mirror_return_rule_projection_symmetric_not_source_derived
- PASS mode2_exploration_loaded: gap_a_mode2_wxyztitzyxw_return_path_candidate_found_not_closure
- PASS upstreamed_supports_loaded: gap_a_projection_row_supports_upstreamed_columnwise_complete_not_generator
- PASS graph_reports_created: 3
- PASS wl_refinement_completed: all graph reports have WL rounds
- PASS slot_quotient_checked: slot quotient automorphisms checked
- PASS gap_a_not_closed: orbit discovery only

## Next script

    record_gap_a_mode2_projection_mirror_boundary_note_001.py
