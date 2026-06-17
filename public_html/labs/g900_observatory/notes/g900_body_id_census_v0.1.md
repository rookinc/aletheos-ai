# G900 body ID census v0.1

Status: inspection only.

No carrier rail geometry is admitted here.
No rendering is introduced here.
No graph mutation is introduced here.

## Body

- body: g900
- body_version: 0.1
- vertices: 900
- edges: 3600
- edge_pairs_detected: 0

## Detected keys

- vertex_id_key: id
- edge_id_key: None
- edge_u_key: None
- edge_v_key: None

## Profiles

- degree_counts: {}
- component_count: None
- largest_components: []

## Selector candidates

### first_15_vertex_ids_lexicographic

- kind: vertex_id_selector
- description: First 15 vertex ids after lexicographic sort. Useful only as a deterministic smoke rail, not as a structural theorem.
- vertex_count: 15
- edge_count: 0
- admissibility: deterministic over receipted body identifiers; weak structural meaning

## Boundary

This census may identify deterministic selector candidates.
It does not admit a rail.
It does not draw a rail.
It does not claim force-like meaning.

The next step is to choose one source-provenance selector and document why it is acceptable as the first smoke rail.
