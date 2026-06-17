# G900 slot carrier census v0.1

Status: inspection only.

No carrier family is admitted here.
No rendering is introduced here.
No graph mutation is introduced here.

## Result

- body: g900
- body_version: 0.1
- vertices: 900
- edges: 3600
- tuple_edges: 3600
- bad_edge_count: 0
- missing_endpoint_edge_count: 0
- slot_count: 15
- slot_ids: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
- slot_size_counts: {60: 15}
- internal_edge_count_set: [120]
- boundary_edge_count_set: [240]
- cross_slot_pair_count: 30

## Candidate families

### slot_vertex_carriers

One candidate carrier per slot, using the vertices and same-slot tuple edges of that slot.

### slot_boundary_carriers

One candidate carrier per slot, using the cross-slot tuple edges incident to that slot.

## Boundary

This census identifies slot-carrier candidate families.
It does not admit them into carrier data.
It does not render them.
It does not mutate the G900 body.
It does not make a force claim.

The first smoke rail proved the carrier pipeline.
The slot census begins the real carrier map.
