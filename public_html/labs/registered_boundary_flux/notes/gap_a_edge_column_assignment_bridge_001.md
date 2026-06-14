# Gap A edge-column assignment bridge 001

Status: edge_column_assignment_bridge_verified_not_map_proof

Gap: A - chamber/register map.

## Boundary

- This is not a chamber/register map proof.
- This verifies a candidate 30-column identity bridge, not the full source-derived row map.
- A verified edge-column layer can explain where column identities are recorded, but not yet why the whole WXYZTI register map is lawful.
- The next step is to compare this bridge against source transport/cocycle roles.

## Indexing repair

- assignment raw columns cover 1..30: True
- normalized columns cover 0..29: True
- rule: normalized column = assignment.column - 1
- boundary: indexing interpretation only; no new mathematical claim added

## Result

- bridge records: 30
- bridge hashes unique: True

## Layer reports

- assignment: exists=True length=30 path=$.assignment ids_cover_0_to_29=True raw_ids_cover_1_to_30=True index_base=1 hash_collisions=0
- signatures_columns: exists=True length=30 path=$.columns ids_cover_0_to_29=True hash_collisions=0
- signatures_edges: exists=True length=30 path=$.edges ids_cover_0_to_29=True hash_collisions=0
- colored_columns: exists=True length=30 path=$.columns ids_cover_0_to_29=True hash_collisions=0
- colored_edges: exists=True length=30 path=$.edges ids_cover_0_to_29=True hash_collisions=0
- petrie_edges: exists=True length=30 path=$.edges ids_cover_0_to_29=True hash_collisions=0

## Interpretation

- main_result: The edge-column artifacts provide checkable 30-item layers. The assignment layer is 1-indexed and normalizes cleanly to the 0-indexed M column convention.
- what_this_gives: M columns can now be paired with derived edge/signature records using explicit index normalization.
- what_remains_open: The lawful source-to-register map still requires showing that these edge-column identities are transported from G60/source structure into the WXYZTI register.
- next_question: Do the edge-column identities align with transport/cocycle/source roles in a non-post-hoc way?

## First assignment edge-like hits

- {"path": "$.edge", "value": [0, 1]}
- {"path": "$.edge", "value": [0, 1]}
- {"path": "$.cocycle_value", "value": 0}
- {"path": "$.column", "value": 1}

## Checks

- PASS previous_audit_loaded: status=column_identity_source_links_audited_not_map_proof
- PASS matrix_shape_15x30: shape=15x30
- PASS assignment_layer_len_30: length=30 path=$.assignment
- PASS signature_columns_layer_len_30: length=30 path=$.columns
- PASS signature_edges_layer_len_30: length=30 path=$.edges
- PASS colored_columns_layer_len_30: length=30 path=$.columns
- PASS colored_edges_layer_len_30: length=30 path=$.edges
- PASS assignment_ids_normalize_to_0_to_29: raw columns cover 1..30 and normalize to 0..29
- PASS bridge_record_count_30: count=30
- PASS bridge_hashes_unique: unique_count=30
- PASS edge_like_hits_present_in_assignment: hit_count=4

## Next script

    audit_gap_a_edge_column_transport_role_alignment_001.py
