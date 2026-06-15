# Anchor-reverse vs shared-column boundary 001

Status: anchor_reverse_vs_shared_column_boundary_recorded

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This records a comparison boundary between two 120-record carrier laws.
- Comparison is not source-native WXYZTI generation.
- No independent witness layer is proven.
- No physical interpretation is claimed.

## Keeper lines

- Anchor-and-reverse is the canonical sparse law.
- Shared-column is the faster single-relation witness.
- shared_B plus reverse_partner is sparser and source-facing.
- shared_column reaches full exposure faster but is denser.
- Both expose the 120-record carrier.
- Both settle to the admitted four.
- Neither closes Gap A.
- Neither proves full G900.

## Positive results

- The comparison was recorded.
- shared_B plus reverse_partner was retained as the canonical sparse law.
- shared_column was retained as the preferred single-relation witness.
- Anchor-and-reverse has 480 edges.
- shared_column has 780 edges.
- Anchor-and-reverse has lower density.
- shared_column reaches full exposure one shell earlier.
- Both laws reach the 120-record carrier.
- Both laws settle to the admitted four.

## Negative results

- No full 900-state return cycle was found.
- No independent witness layer was found.
- No full G900 admission was found.
- No source-native WXYZTI generator was derived.
- Gap A was not closed.

## Blocked promotions

- Do not call either law full G900.
- Do not call either law Gap A closure.
- Do not call either law an independent witness layer.
- Do not treat faster exposure as stronger source meaning.
- Do not claim physical interpretation.

## Allowed next work

- Search for an independent witness layer over the anchor-and-reverse carrier.
- Search for a 900-state lift from anchor-and-reverse transport.
- Use shared_column as a comparison witness in future audits.
- Return to WXYZTI generator derivation with anchor-and-reverse as a constraint.

## Summary

- record_result: "anchor_reverse_vs_shared_column_boundary_recorded"
- gap_a_status: "open"
- gap_a_closed: false
- canonical_sparse_law: "shared_B+reverse_partner"
- canonical_sparse_law_relations: ["reverse_partner", "shared_B"]
- canonical_sparse_law_edges: 480
- canonical_sparse_law_density: 0.06722689075630252
- canonical_sparse_law_radius_to_full_exposure: 4
- alternate_single_relation_witness: "shared_column"
- alternate_single_relation_relations: ["shared_column"]
- alternate_single_relation_edges: 780
- alternate_single_relation_density: 0.1092436974789916
- alternate_single_relation_radius_to_full_exposure: 3
- anchor_reverse_is_sparser: true
- shared_column_is_single_relation: true
- shared_column_reaches_faster: true
- edge_delta_shared_column_minus_anchor_reverse: 300
- density_ratio_shared_column_over_anchor_reverse: 1.625
- anchor_reverse_source_reading: "anchor-and-reverse transport on oriented length-2 source-shell records"
- anchor_reverse_combined_meaning: "within an anchor bucket, vary outgoing two-step records; by reversal, move the anchor to the opposite endpoint; repeat"
- anchor_reverse_source_only: true
- anchor_reverse_row_support_free: true
- anchor_reverse_quotient_B_connected: true
- anchor_reverse_reaches_all: true
- anchor_reverse_settles: true
- sparse_neighbor_carrier_law_supported: true
- local_g900_shaped_boundary_reached: true
- full_900_state_return_cycle_found: false
- heuristic_900_return_signal_found: false
- full_g900_admission_found: false
- independent_witness_layer_found: false
- source_native_wxyzti_generator_found: false
- terminal_reason: "Anchor-and-reverse is retained as the canonical sparse law because it is sparser and source-facing; shared_column is retained as the faster single-relation witness. Both remain 120-record carrier laws, not full G900."
- claim_closes_gap_a: false

## Interpretation

- main_result: The branch now has a canonical sparse law and an alternate single-relation witness.
- canonical_law: shared_B plus reverse_partner, read as anchor-and-reverse transport.
- alternate_witness: shared_column, read as column-overlap transport.
- why_anchor_reverse_wins: It is sparser, source-facing, row/support-free, and semantically explicit.
- why_shared_column_matters: It is a clean single-relation witness and reaches the full 120-record background faster.
- why_not_closure: Both are 120-record source-shell carrier laws, not full G900, not independent witness, and not the WXYZTI generator.
- next_move: Search for an independent witness layer or a 900-state lift from anchor-and-reverse transport.

## Checks

- PASS comparison_loaded: anchor_reverse_vs_shared_column_compared
- PASS source_meaning_boundary_loaded: sparse_law_source_meaning_boundary_recorded
- PASS source_meaning_audit_loaded: sparse_law_shared_B_reverse_partner_source_meaning_supported_not_full_g900
- PASS sparse_boundary_loaded: sparse_neighbor_carrier_boundary_recorded
- PASS local_boundary_loaded: local_g900_shaped_admission_boundary_recorded
- PASS full_return_search_loaded: full_g900_return_cycle_not_found
- PASS canonical_is_anchor_reverse: shared_B+reverse_partner
- PASS alternate_is_shared_column: shared_column
- PASS anchor_sparser: 300
- PASS shared_column_single: ['shared_column']
- PASS shared_column_faster: True
- PASS anchor_source_only: True
- PASS anchor_row_support_free: True
- PASS anchor_reaches_all: True
- PASS anchor_settles: True
- PASS full_g900_not_found: False
- PASS gap_a_not_closed: boundary record only

## Next script

    search_independent_witness_layer_from_anchor_reverse_boundary_001.py
