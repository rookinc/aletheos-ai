# G900 projection exception handles 001

Status: projection exception handles recorded.

Audit pass: `true`.

This is inspection only. It does not admit channels.

Selector:

- `bounded_root_tuple_shell_depth_2_edge_limit_30`

Target projection exceptions:

- `0 -> 4`
- `1 -> 0`
- `1 -> 2`
- `11 -> 7`

Counts:

- exception_total_count: 15

Exception pair counts:

- 0 -> 4: 1
- 1 -> 0: 2
- 1 -> 2: 2
- 11 -> 7: 10

Exception roots:

- 0 -> 4 | roots ['0:14'] | locals [14]
- 1 -> 0 | roots ['1:1', '1:6'] | locals [1, 6]
- 1 -> 2 | roots ['1:44', '1:59'] | locals [44, 59]
- 11 -> 7 | roots ['11:12', '11:13', '11:17', '11:18', '11:22', '11:23', '11:27', '11:28', '11:48', '11:53'] | locals [12, 13, 17, 18, 22, 23, 27, 28, 48, 53]

Kind summaries:

- slot_0_single_escape_to_4 | count 1 | count signatures {'31,30,17,4': 1}
- slot_11_minor_displaced_branch_to_7 | count 10 | count signatures {'28,30,16,4': 10}
- slot_1_left_escape_to_0 | count 2 | count signatures {'31,30,16,4': 2}
- slot_1_right_escape_to_2 | count 2 | count signatures {'31,30,17,4': 2}

Boundary:

- no channels admitted
- channel registry remains zero count
- no channel rendering
- no body mutation
- no physics claim
- no force claim

Interpretation:

These rows isolate the small non-dominant projection exceptions from the primary-slot projection census. They are candidate handles for later Layer 3 channel work, but this artifact does not admit or render channels.
