# G900 full-60 transition package anatomy 001

Status: full-60 transition package anatomy recorded.

Audit pass: `true`.

This is anatomy only. It does not admit channels.

Selector family:

- `bounded_root_tuple_shell_depth_2_edge_limit_N`

Counts:

- full60_transition_count: 24
- full60_package_count: 10
- clean_reciprocal_package_count: 6
- boundary_carrier_count: 30
- package_boundary_hit_count: 9
- package_boundary_missing_count: 1
- unused_boundary_pair_count: 21

Package kind counts:

- clean_reciprocal_pair_package: 6
- one_way_single_transition: 2
- two_transition_pair_package: 2

Full-60 packages:

- 2/3 | clean_reciprocal_pair_package | transitions ['2 -> 3', '2/3 -> 3', '3 -> 2'] | root slots {3: 180} | boundary slot_pair_02_03_boundary_carrier
- 2/8 | clean_reciprocal_pair_package | transitions ['2 -> 8', '2/8 -> 8', '8 -> 2'] | root slots {8: 180} | boundary slot_pair_02_08_boundary_carrier
- 3/9 | clean_reciprocal_pair_package | transitions ['3 -> 9', '3/9 -> 9', '9 -> 3'] | root slots {9: 180} | boundary slot_pair_03_09_boundary_carrier
- 5/10 | clean_reciprocal_pair_package | transitions ['10 -> 5', '5 -> 10', '5/10 -> 10'] | root slots {10: 180} | boundary slot_pair_05_10_boundary_carrier
- 5/14 | clean_reciprocal_pair_package | transitions ['14 -> 5', '5 -> 14', '5/14 -> 14'] | root slots {14: 180} | boundary slot_pair_05_14_boundary_carrier
- 6/13 | clean_reciprocal_pair_package | transitions ['13 -> 6', '6 -> 13', '6/13 -> 13'] | root slots {13: 180} | boundary slot_pair_06_13_boundary_carrier
- 6/12 | two_transition_pair_package | transitions ['12 -> 6', '6/12 -> 12'] | root slots {12: 120} | boundary slot_pair_06_12_boundary_carrier
- 7/11 | two_transition_pair_package | transitions ['11 -> 7', '7/11 -> 11'] | root slots {11: 120} | boundary slot_pair_07_11_boundary_carrier
- 6/9 | one_way_single_transition | transitions ['6 -> 9'] | root slots {12: 60} | boundary None
- 9/12 | one_way_single_transition | transitions ['9 -> 12'] | root slots {12: 60} | boundary slot_pair_09_12_boundary_carrier

Packages without matching boundary carriers:

- 6/9

Boundary:

- no channels admitted
- channel registry remains zero count
- no channel rendering
- no body mutation
- no physics claim
- no force claim

Interpretation:

This artifact groups all count-60 phase transitions into full-slot packages and compares each package with the admitted Layer 2 slot-pair boundary carriers. A boundary-carrier match is structural support only; it is not channel admission.
