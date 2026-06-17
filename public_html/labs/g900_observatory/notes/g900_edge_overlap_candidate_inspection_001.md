# G900 edge-overlap candidate inspection 001

Status: edge-overlap candidate inspection recorded.

Audit pass: `true`.

This is an inspection only. It does not admit channels.

Counts:

- edge_overlap_candidate_count: 7
- max_edge_overlap: 12
- max_vertex_overlap: 16

Family pair counts:

- source_provenance_scaffold -> slot_internal_carriers: 2
- source_provenance_scaffold -> slot_pair_boundary_carriers: 5

Kind pair counts:

- source_provenance_rail -> slot_internal_carrier: 2
- source_provenance_rail -> slot_pair_boundary_carrier: 5

Edge overlap counts:

- 1: 2
- 4: 4
- 12: 1

Rows:

- edge_overlap=12 vertex_overlap=11 | root_0_0_tuple_shell_depth_2 -> slot_00_internal_carrier
- edge_overlap=4 vertex_overlap=16 | root_0_0_tuple_shell_depth_2 -> slot_pair_00_04_boundary_carrier
- edge_overlap=4 vertex_overlap=15 | root_0_0_tuple_shell_depth_2 -> slot_pair_00_01_boundary_carrier
- edge_overlap=4 vertex_overlap=15 | root_0_0_tuple_shell_depth_2 -> slot_pair_00_05_boundary_carrier
- edge_overlap=4 vertex_overlap=15 | root_0_0_tuple_shell_depth_2 -> slot_pair_00_06_boundary_carrier
- edge_overlap=1 vertex_overlap=6 | root_0_0_tuple_shell_depth_2 -> slot_pair_03_04_boundary_carrier
- edge_overlap=1 vertex_overlap=5 | root_0_0_tuple_shell_depth_2 -> slot_04_internal_carrier

Boundary:

- no channels admitted
- channel registry remains zero count
- no channel rendering
- no body mutation
- no physics claim
- no force claim

Interpretation:

These are the sharpest support-overlap handles found by the classifier. They are not channels. They are the first small test family for a later selector.
