# Gap A row identity transport candidates 001

Status: row_identity_transport_candidates_derived_not_map_proof

Gap: A - chamber/register map.

## Boundary

- This is not a chamber/register map proof.
- Exact matrix-derived signatures are not automatically source-derived transport laws.
- A lawful Gap A map still has to explain row identity from the source object, not merely name it in M.

## Main result

- main_result: Several matrix-derived signatures can identify rows exactly, but the source-derived explanation is still missing.
- useful_failure: taxonomy_class alone collides, so the map cannot stop at row class.
- strong_candidate: support_columns remains the cleanest exact carrier, but it is still matrix-assigned until derived from source transport.
- next_question: Which source-side finite structure names the 30 columns or their supports so that row support identity becomes transported rather than assigned?

## Exact schemes

- support_columns (matrix_assigned_not_source_derived)
- complement_columns (matrix_assigned_not_source_derived)
- overlap_vector_by_row_order (matrix_derived_depends_on_row_order)

## Candidate classes

- source_derived_candidate_now: []
- matrix_exact_but_needs_source_derivation: ["support_columns", "complement_columns", "overlap_vector_by_row_order"]
- organizing_but_colliding: ["taxonomy_class", "block_vector", "taxonomy_class_plus_block_vector", "overlap_multiset_without_self", "taxonomy_plus_overlap_multiset", "supported_column_row_degrees", "taxonomy_plus_supported_column_row_degrees"]

## Scheme collision table

- taxonomy_class: buckets=9 unique=3 collisions=6 source_status=row_taxonomy
- block_vector: buckets=9 unique=3 collisions=6 source_status=row_taxonomy
- taxonomy_class_plus_block_vector: buckets=9 unique=3 collisions=6 source_status=row_taxonomy
- support_columns: buckets=15 unique=15 collisions=0 source_status=matrix_assigned_not_source_derived
- complement_columns: buckets=15 unique=15 collisions=0 source_status=matrix_assigned_not_source_derived
- overlap_vector_by_row_order: buckets=15 unique=15 collisions=0 source_status=matrix_derived_depends_on_row_order
- overlap_multiset_without_self: buckets=1 unique=0 collisions=1 source_status=matrix_derived_partly_forgets_row_order
- taxonomy_plus_overlap_multiset: buckets=9 unique=3 collisions=6 source_status=matrix_derived_partly_forgets_row_order
- supported_column_row_degrees: buckets=1 unique=0 collisions=1 source_status=matrix_derived_column_side_scalar
- taxonomy_plus_supported_column_row_degrees: buckets=9 unique=3 collisions=6 source_status=matrix_derived_column_side_scalar

## Checks

- PASS audit_loaded: audit status=row_identity_carriers_extracted_not_map_proof
- PASS matrix_shape_15x30: shape=15x30
- PASS support_columns_exact: collision_count=0
- PASS taxonomy_class_collides: collision_count=6
- PASS at_least_one_matrix_exact_candidate: candidates=["support_columns", "complement_columns", "overlap_vector_by_row_order"]

## Next script

    audit_gap_a_column_identity_source_links_001.py
