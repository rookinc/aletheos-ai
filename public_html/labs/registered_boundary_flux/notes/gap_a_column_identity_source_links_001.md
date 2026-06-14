# Gap A column identity source links 001

Status: column_identity_source_links_audited_not_map_proof

Gap: A - chamber/register map.

## Boundary

- This is not a chamber/register map proof.
- This does not prove that column identities are source-derived.
- It audits candidate source records that may name or constrain the 30 columns.
- If edge-column artifacts are present, they are candidates for the next verification pass, not automatic closure.

## Result

- columns audited: 30
- column row-support collisions: 0
- edge-column source artifacts found: ["edge_column_assignment", "edge_column_signatures", "edge_column_signatures_colored"]
- explicit 30-candidate paths found: 23
- directed 60-candidate paths found: 0

## Interpretation

- main_result: M column row-supports are unique, so column identity can carry row identity if the columns are source-linked.
- candidate_bridge: Existing edge-column derived artifacts are present and should be verified next.
- remaining_gap: A source-derived bridge must still show that the 30 column identities come from G60/source transport rather than from post-hoc matrix assignment.
- next_question: Do edge_column_assignment/signature artifacts bind the 30 columns to source edges or transport roles in a checkable way?

## Source records

- theorem_object: exists=True path=../json/theorem_object.json
- transport_cocycle: exists=True path=../json/transport_cocycle.json
- edge_column_assignment: exists=True path=../../reports/derived/edge_column_assignment.json
- edge_column_signatures: exists=True path=../../reports/derived/edge_column_signatures.json
- edge_column_signatures_colored: exists=True path=../../reports/derived/edge_column_signatures_colored.json
- theorem_petrie_probe: exists=True path=../../reports/derived/theorem_petrie_probe.json

## Explicit 30-candidate paths

- theorem_object list_len_30 $.matrix_M[0]
- theorem_object list_len_30 $.matrix_M[1]
- theorem_object list_len_30 $.matrix_M[2]
- theorem_object list_len_30 $.matrix_M[3]
- theorem_object list_len_30 $.matrix_M[4]
- theorem_object list_len_30 $.matrix_M[5]
- theorem_object list_len_30 $.matrix_M[6]
- theorem_object list_len_30 $.matrix_M[7]
- theorem_object list_len_30 $.matrix_M[8]
- theorem_object list_len_30 $.matrix_M[9]
- theorem_object list_len_30 $.matrix_M[10]
- theorem_object list_len_30 $.matrix_M[11]
- theorem_object list_len_30 $.matrix_M[12]
- theorem_object list_len_30 $.matrix_M[13]
- theorem_object list_len_30 $.matrix_M[14]
- theorem_object list_len_30 $.columns
- theorem_object list_len_30 $.col_sums
- edge_column_assignment list_len_30 $.assignment
- edge_column_signatures list_len_30 $.edges
- edge_column_signatures list_len_30 $.columns
- edge_column_signatures_colored list_len_30 $.edges
- edge_column_signatures_colored list_len_30 $.columns
- theorem_petrie_probe list_len_30 $.edges

## Checks

- PASS previous_transport_candidates_loaded: status=row_identity_transport_candidates_derived_not_map_proof
- PASS matrix_shape_15x30: shape=15x30
- PASS column_count_30: column_count=30
- PASS column_row_supports_unique: collision_count=0
- PASS edge_column_artifacts_found: found=["edge_column_assignment", "edge_column_signatures", "edge_column_signatures_colored"]
- PASS source_scan_completed: source_records=6

## Next script

    verify_gap_a_edge_column_assignment_bridge_001.py
