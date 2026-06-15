# Anchor-reverse vs shared-column comparison 001

Status: anchor_reverse_vs_shared_column_compared

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This compares two 120-record sparse carrier laws.
- Comparison is not source-native WXYZTI generation.
- No independent witness layer is proven.
- No physical interpretation is claimed.

## Short form

shared_B+reverse_partner remains the preferred canonical sparse law, while shared_column is the preferred single-relation witness.

## Summary

- comparison_result: "anchor_reverse_vs_shared_column_compared"
- gap_a_status: "open"
- gap_a_closed: false
- anchor_reverse_law: "shared_B+reverse_partner"
- anchor_reverse_relations: ["reverse_partner", "shared_B"]
- anchor_reverse_edges: 480
- anchor_reverse_density: 0.06722689075630252
- anchor_reverse_radius_to_full_exposure: 4
- shared_column_law: "shared_column"
- shared_column_relations: ["shared_column"]
- shared_column_edges: 780
- shared_column_density: 0.1092436974789916
- shared_column_radius_to_full_exposure: 3
- edge_delta_shared_column_minus_anchor_reverse: 300
- density_ratio_shared_column_over_anchor_reverse: 1.625
- anchor_reverse_is_sparser: true
- shared_column_is_single_relation: true
- shared_column_reaches_faster: true
- canonical_sparse_law_recommendation: "shared_B+reverse_partner"
- alternate_single_relation_witness: "shared_column"
- recommendation_reason: "shared_B+reverse_partner is sparser and has a clearer source-facing anchor-and-reverse meaning; shared_column is useful as a faster, denser single-relation witness."
- full_g900_admission_found: false
- source_native_wxyzti_generator_found: false
- claim_closes_gap_a: false

## Comparison

### anchor_reverse

- name: "shared_B+reverse_partner"
- relations: ["reverse_partner", "shared_B"]
- edge_count: 480
- density: 0.06722689075630252
- relation_count: 2
- radius_to_full_exposure: 4
- reaches_all_records: true
- settles_all_shells_to_admitted: true
- source_reading: "anchor-and-reverse transport on oriented length-2 source-shell records"
- combined_meaning: "within an anchor bucket, vary outgoing two-step records; by reversal, move the anchor to the opposite endpoint; repeat"
- strength: "sparser, source-facing, row/support-free, semantically explicit"
- weakness: "uses two relations and reaches full exposure one shell later than shared_column"

### shared_column

- name: "shared_column"
- relations: ["shared_column"]
- edge_count: 780
- density: 0.1092436974789916
- relation_count: 1
- radius_to_full_exposure: 3
- reaches_all_records: true
- settles_all_shells_to_admitted: true
- source_reading: "column-overlap transport on source-column incidence"
- combined_meaning: "records are adjacent when they share a source column"
- strength: "single relation and reaches full exposure faster"
- weakness: "denser and less explanatory as anchor/reversal transport"

## Interpretation

- main_result: shared_B+reverse_partner remains the preferred canonical sparse law, while shared_column is the preferred single-relation witness.
- why_anchor_reverse_wins: It is sparser, source-facing, row/support-free, and has a clear anchor-and-reverse transport meaning.
- why_shared_column_matters: It is the cleanest single-relation witness and reaches the full 120-record background faster, though with more edges.
- why_not_gap_a_closure: Both laws operate on the 120-record source-shell carrier, not the full 900-state evaluator or WXYZTI generator.
- next_move: Record the comparison boundary, then choose independent-witness search or 900-state lift search.

## Checks

- PASS source_meaning_boundary_loaded: sparse_law_source_meaning_boundary_recorded
- PASS source_meaning_audit_loaded: sparse_law_shared_B_reverse_partner_source_meaning_supported_not_full_g900
- PASS sparse_search_loaded: sparse_neighbor_carrier_law_supported_not_full_g900
- PASS sparse_boundary_loaded: sparse_neighbor_carrier_boundary_recorded
- PASS anchor_expected: shared_B+reverse_partner
- PASS single_expected: shared_column
- PASS anchor_sparser: 300
- PASS shared_column_single: 1
- PASS both_reach_all: both reach all
- PASS both_settle: both settle
- PASS not_full_g900: False
- PASS gap_a_not_closed: comparison only

## Next script

    record_anchor_reverse_vs_shared_column_boundary_001.py
