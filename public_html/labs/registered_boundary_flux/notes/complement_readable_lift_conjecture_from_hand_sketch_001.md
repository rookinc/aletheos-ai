# Complement-readable lift conjecture from hand sketch 001

Status: complement_readable_lift_conjecture_recorded

## Short form

The lift is not from 120 to 900 by counting. The lift is through complement-readable return.

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This records a hand-sketch conjecture.
- The complement rule is not yet executable proof.
- No independent witness layer is proven.
- No physical interpretation is claimed.

## Hand-sketch observations

- complement_pairs_seen: [["1", "40"], ["2", "39"], ["3", "38"], ["4", "37"]]
- complement_rule_candidate: "i -> 41 - i"
- complement_rule_type: "involution"
- local_cell_labels: ["A", "B", "C"]
- local_frame_reading: "A appears as a hinge/read cell; B and C appear as neighboring carrier cells or directional exits."
- seam_reading: "The mark may have two valid readings depending on which side of the seam reads it."
- word_layer_seen: "L/R handedness words appear as a possible return-word layer."
- sketch_status: "hand_conjecture_not_proof"

## Conjecture

- name: "Complement-Readable Lift Conjecture"
- short_form: "The lift is not from 120 to 900 by counting. The lift is through complement-readable return."
- statement: "Anchor-and-reverse transport on the 120-record source-shell carrier may be the visible shadow of a complement-readable lift. At the 120-record layer, reversal appears as B <-> C across a shared length-2 path. At the lifted layer, reversal may be governed by a complement seam i <-> 41-i, together with an L/R handedness word recording how the local frame crosses neighboring carrier cells."
- candidate_lift_fields: ["anchor_B", "visible_path_B_A_C", "source_columns", "reverse_partner_C_A_B", "complement_index_i_to_41_minus_i", "side_or_read_direction", "L_R_return_word", "neighbor_cell_identity", "settled_trace_residue"]
- current_shadow: {"canonical_sparse_law": "shared_B+reverse_partner", "canonical_sparse_law_relations": ["reverse_partner", "shared_B"], "combined_meaning": "within an anchor bucket, vary outgoing two-step records; by reversal, move the anchor to the opposite endpoint; repeat", "record_carrier_count": 120, "settles_to_admitted": true, "source_reading": "anchor-and-reverse transport on oriented length-2 source-shell records", "union_edges": 480}
- why_this_is_not_yet_a_lift: ["No explicit 120-record to 900-state map has been constructed.", "No full 900-state return cycle has been found.", "No independent witness layer has been found.", "No source-native WXYZTI generator has been derived.", "The complement rule is hand-sketched, not audited."]
- first_executable_test: "Test whether the admitted four can be assigned complement-readable seams, reverse partners, and L/R word classes without contradiction."

## Keeper lines

- The lift is not from 120 to 900 by counting.
- The lift is through complement-readable return.
- A mark may return with two readings: i from one side, 41-i from the other.
- Anchor-and-reverse transport may be the 120-record shadow of complement-readable transport.
- Neighbor overdrive may occur when adjacent carrier cells share a complement-readable seam.
- The L/R word may be the missing return-word layer.
- This is a conjecture, not a proof.
- Gap A remains open.

## Positive results

- A concrete complement rule candidate was identified: i -> 41 - i.
- The candidate rule is involutive.
- The conjecture connects the hand sketch to anchor-and-reverse transport.
- The conjecture gives a more specific target for a 120-to-900 lift map.
- The conjecture suggests L/R handedness words as a possible witness layer.

## Negative results

- No 120-to-900 lift map was constructed.
- No full 900-state return cycle was found.
- No independent witness layer was found.
- No source-native WXYZTI generator was derived.
- Gap A was not closed.

## Blocked promotions

- Do not call the complement rule proven.
- Do not call this full G900.
- Do not call this Gap A closure.
- Do not treat hand sketches as audited artifacts without executable tests.
- Do not claim physical interpretation.

## Allowed next work

- Test complement-readable assignments on the admitted four.
- Build a small executable complement-seam model using i -> 41-i.
- Search L/R return-word classes for the admitted records.
- Search for a 120-to-900 lift map using anchor, complement side, and L/R word fields.

## Summary

- record_result: "complement_readable_lift_conjecture_recorded"
- gap_a_status: "open"
- gap_a_closed: false
- conjecture_name: "Complement-Readable Lift Conjecture"
- short_form: "The lift is not from 120 to 900 by counting. The lift is through complement-readable return."
- complement_rule_candidate: "i -> 41 - i"
- complement_rule_type: "involution"
- canonical_sparse_law: "shared_B+reverse_partner"
- anchor_reverse_source_reading: "anchor-and-reverse transport on oriented length-2 source-shell records"
- record_carrier_count: 120
- admitted_count: 4
- admitted_keys: ["11|7|14|23,24", "13|9|10|28,29", "2|1|0|0,4", "4|3|2|7,10"]
- admitted_B_labels: [2, 4, 11, 13]
- explicit_900_payload_found: true
- anchor_reverse_to_900_map_found: false
- full_900_state_return_cycle_found: false
- independent_witness_layer_found: false
- full_g900_admission_found: false
- source_native_wxyzti_generator_found: false
- claim_closes_gap_a: false
- terminal_reason: "The hand sketch supplies a complement-readable lift conjecture, not a proof. It suggests a possible missing 120-to-900 lift mechanism but does not construct the lift."

## Checks

- PASS lift_search_loaded: 900_state_lift_candidate_payload_seen_not_constructed_not_full_g900
- PASS witness_boundary_loaded: independent_witness_layer_search_boundary_recorded
- PASS comparison_boundary_loaded: anchor_reverse_vs_shared_column_boundary_recorded
- PASS source_meaning_boundary_loaded: sparse_law_source_meaning_boundary_recorded
- PASS sparse_boundary_loaded: sparse_neighbor_carrier_boundary_recorded
- PASS canonical_anchor_reverse: shared_B+reverse_partner
- PASS record_carrier_120: 120
- PASS complement_rule_41: i -> 41 - i
- PASS lift_not_constructed: False
- PASS independent_witness_not_found: False
- PASS full_g900_not_found: False
- PASS gap_a_not_closed: conjecture record only

## Next script

    test_complement_readable_assignments_for_admitted_four_001.py
