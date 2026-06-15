# Canonical G60 payload import 001

Status: canonical_g60_payload_import_recorded

## Claim

A verified machine-readable G60 edge payload is now bound into the registered boundary flux lab. The imported CSV has 120 local edges on 60 vertices, is 4-regular and connected, has diameter 6, and has shell vector (1,4,8,16,24,6,1) from every root.

## Payload

- payload_file: public_html/labs/registered_boundary_flux/data/canonical_g60_payload.v1.json
- csv_file: public_html/labs/registered_boundary_flux/data/canonical_g60_local_edges.v1.csv
- source_csv: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/18-g900-kernel-admission/source/kernel_payload/g60_local_edges.csv
- source_sha256: c700a185fab6a5f434da09b7acb716b96c76170774bee946af8ea907e4fe7f9f
- local_sha256: c700a185fab6a5f434da09b7acb716b96c76170774bee946af8ea907e4fe7f9f

## Summary

- canonical_g60_payload_imported: true
- vertex_count: 60
- edge_count: 120
- degree_counts: {"4": 60}
- connected: true
- diameter: 6
- shell_vector_counts: [{"count": 60, "shell_vector": [1, 4, 8, 16, 24, 6, 1]}]
- triangle_count: 40
- gap_a_closed: false
- full_g900_admission_found: false
- next_step: "g60_payload_to_nrc_generator_alignment"

## Boundary

- This imports the canonical G60 local edge payload.
- This does not yet derive a G60-native NRC generator.
- This does not close Gap A.
- This does not prove full G900.

## Checks

- PASS source_csv_exists: /data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/18-g900-kernel-admission/source/kernel_payload/g60_local_edges.csv
- PASS copy_sha_matches: c700a185fab6a5f434da09b7acb716b96c76170774bee946af8ea907e4fe7f9f
- PASS vertex_count_60: 60
- PASS edge_count_120: 120
- PASS vertices_0_to_59: [0, 59]
- PASS degree_4_regular: {'4': 60}
- PASS connected: True
- PASS diameter_6: 6
- PASS shell_vector_expected_all_roots: [{'shell_vector': [1, 4, 8, 16, 24, 6, 1], 'count': 60}]
- PASS triangle_count_40: 40
- PASS resolution_source_strong: True
