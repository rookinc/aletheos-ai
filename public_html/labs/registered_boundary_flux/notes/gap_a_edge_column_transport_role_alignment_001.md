# Gap A edge-column transport role alignment 001

Status: edge_column_transport_role_alignment_verified_not_map_proof

Gap: A - chamber/register map.

## Boundary

- This is not a chamber/register map proof.
- This verifies internal alignment of derived edge-column transport-role layers.
- This does not yet prove that the WXYZTI register map is lawfully derived from G60.
- It does show that the 30-column identity layer is no longer anonymous: edges, supports, signatures, Petrie edges, and cocycle values agree column by column.

## Summary

- record_count: 30
- failed_row_count: 0
- unique_edge_count: 30
- unique_alignment_hash_count: 30
- cocycle_value_histogram: {"0": 10, "1": 20}

## Interpretation

- main_result: The edge-column bridge aligns across assignment, signature, colored, Petrie, support, and cocycle-value layers.
- what_this_gives: Each M column can be treated as a specific edge-column transport record with a support set and cocycle value.
- what_remains_open: A full Gap A map still needs a lawful derivation from G60/source structure into the WXYZTI register.
- next_question: Can the selected WXYZTI target be read directly through these aligned edge-column transport records?

## Column alignment table

- column 0: edge=[0, 1] cocycle=0 support=[6, 7, 8, 9, 10, 11, 12] pass=True
- column 1: edge=[0, 2] cocycle=1 support=[4, 6, 7, 9, 11, 12, 14] pass=True
- column 2: edge=[0, 11] cocycle=0 support=[3, 6, 8, 9, 10, 12, 13] pass=True
- column 3: edge=[0, 14] cocycle=1 support=[3, 4, 5, 9, 10, 11, 14] pass=True
- column 4: edge=[1, 2] cocycle=1 support=[3, 4, 5, 7, 10, 13, 14] pass=True
- column 5: edge=[1, 8] cocycle=0 support=[3, 4, 5, 6, 7, 8, 13] pass=True
- column 6: edge=[1, 13] cocycle=1 support=[2, 5, 6, 9, 10, 11, 12] pass=True
- column 7: edge=[2, 5] cocycle=1 support=[2, 4, 5, 6, 7, 8, 12] pass=True
- column 8: edge=[2, 12] cocycle=0 support=[2, 3, 5, 9, 10, 12, 13] pass=True
- column 9: edge=[3, 4] cocycle=1 support=[2, 3, 4, 5, 7, 12, 14] pass=True
- column 10: edge=[3, 5] cocycle=0 support=[2, 3, 4, 5, 6, 9, 12] pass=True
- column 11: edge=[3, 10] cocycle=1 support=[1, 6, 7, 8, 9, 12, 13] pass=True
- column 12: edge=[3, 13] cocycle=0 support=[1, 4, 6, 7, 8, 13, 14] pass=True
- column 13: edge=[4, 5] cocycle=1 support=[1, 3, 8, 9, 10, 11, 13] pass=True
- column 14: edge=[4, 7] cocycle=0 support=[1, 3, 6, 7, 8, 10, 13] pass=True
- column 15: edge=[4, 14] cocycle=1 support=[1, 3, 4, 5, 8, 10, 13] pass=True
- column 16: edge=[5, 12] cocycle=1 support=[0, 6, 9, 10, 11, 12, 14] pass=True
- column 17: edge=[6, 7] cocycle=0 support=[0, 6, 7, 8, 9, 11, 14] pass=True
- column 18: edge=[6, 8] cocycle=1 support=[0, 4, 7, 9, 10, 11, 14] pass=True
- column 19: edge=[6, 9] cocycle=1 support=[0, 3, 4, 10, 11, 13, 14] pass=True
- column 20: edge=[6, 12] cocycle=1 support=[0, 3, 4, 5, 7, 11, 14] pass=True
- column 21: edge=[7, 8] cocycle=1 support=[0, 1, 2, 9, 10, 11, 13] pass=True
- column 22: edge=[7, 14] cocycle=1 support=[0, 1, 2, 8, 11, 13, 14] pass=True
- column 23: edge=[8, 13] cocycle=1 support=[0, 1, 2, 6, 7, 8, 14] pass=True
- column 24: edge=[9, 10] cocycle=1 support=[0, 1, 2, 5, 11, 12, 14] pass=True
- column 25: edge=[9, 11] cocycle=0 support=[0, 1, 2, 5, 8, 12, 13] pass=True
- column 26: edge=[9, 12] cocycle=0 support=[0, 1, 2, 5, 6, 9, 12] pass=True
- column 27: edge=[10, 11] cocycle=1 support=[0, 1, 2, 4, 7, 8, 14] pass=True
- column 28: edge=[10, 13] cocycle=1 support=[0, 1, 2, 3, 10, 11, 13] pass=True
- column 29: edge=[11, 14] cocycle=1 support=[0, 1, 2, 3, 4, 5, 12] pass=True

## Checks

- PASS bridge_loaded: status=edge_column_assignment_bridge_verified_not_map_proof
- PASS bridge_record_count_30: count=30
- PASS all_assignment_columns_normalize: fail_count=0
- PASS assignment_signature_edges_align: fail_count=0
- PASS assignment_colored_edges_align: fail_count=0
- PASS assignment_petrie_edges_align: fail_count=0
- PASS cocycle_values_align_colored_values: fail_count=0
- PASS M_supports_align_assignment_supports: fail_count=0
- PASS M_supports_align_signature_column_supports: fail_count=0
- PASS M_supports_align_colored_column_supports: fail_count=0
- PASS edge_identities_unique: unique_edges=30
- PASS alignment_hashes_unique: unique_hashes=30
- PASS all_local_alignment_rows_pass: failed_rows=[]

## Next script

    project_selected_wxyzti_through_edge_column_bridge_001.py
