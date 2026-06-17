# G900 edge tuple census v0.1

Status: inspection only.

No carrier rail geometry is admitted here.
No rendering is introduced here.
No graph mutation is introduced here.

## Result

- body: g900
- body_version: 0.1
- vertices: 900
- unique_vertex_ids: 900
- edges: 3600
- tuple_edges: 3600
- bad_edge_rows: 0
- missing_endpoint_edges: 0

## Profiles

- degree_counts: {8: 900}
- component_count: 1
- component_sizes: [900]

## Selector candidates

### first_15_tuple_edges_by_index

- kind: edge_tuple_selector
- description: First 15 edge tuples by body edge index. Deterministic smoke selector only.
- vertex_count: 0
- edge_count: 15
- admissibility: deterministic over receipted body edge tuple order; weak structural meaning

### root_tuple_shell_depth_2

- kind: adjacency_shell_selector
- description: Tuple-edge shell from lexicographically first vertex, bounded to depth 2.
- vertex_count: 5
- edge_count: 30
- root_vertex_id: 0:0
- admissibility: deterministic over receipted body tuple adjacency; source-provenance smoke rail candidate, not a force claim

## Boundary

This census proves that the static body edge rows are readable as two-endpoint tuples.
It proposes deterministic selectors, but it does not admit a rail.

