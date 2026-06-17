# G900 slot-pair boundary carrier census v0.1

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
- slot_size_counts: {60: 15}
- internal_edge_count: 1800
- boundary_edge_count: 1800
- slot_pair_count: 30
- slot_pair_edge_count_set: [60]
- slot_pair_endpoint_vertex_count_set: [120]

## Candidate family

### slot_pair_boundary_carriers

One candidate carrier per cross-slot pair.

This avoids duplicating boundary edges as 15 per-slot boundary views.

## Boundary

This census identifies the slot-pair boundary carrier candidates.

It does not admit them into carrier data.
It does not render them.
It does not mutate the G900 body.
It does not make a channel claim.
It does not make a force claim.

## Interpretation

The slot-internal carrier family accounts for the internal half of the body.

The slot-pair boundary family is the natural candidate for the external half.

If the census is uniform, the expected shape is:

30 slot pairs x 60 cross-slot edges = 1800 boundary edges

Together with the slot-internal family:

15 slots x 120 internal edges = 1800 internal edges

1800 internal + 1800 boundary = 3600 total edges.
