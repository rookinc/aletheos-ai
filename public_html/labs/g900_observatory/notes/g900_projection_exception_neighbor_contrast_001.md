# G900 projection exception neighbor contrast 001

Status: projection exception neighbor contrast recorded.

Audit pass: `true`.

This is contrast only. It does not admit channels.

Selector:

- `bounded_root_tuple_shell_depth_2_edge_limit_30`

Question:

Do the projection exceptions behave like stable local handles, or do they look cutoff-sensitive relative to nearby baseline roots?

Counts:

- exception_root_count: 15
- limit_window: `[24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]`
- stable_exception_count: 0
- cutoff_sensitive_count: 5

Exception contrasts:

- slot_0_single_escape_to_4 | root 0:14 | baseline 0 | exception 4 | label counts {'0': 4, '1': 1, '4': 12} | nearest ['0:13', '0:15', '0:12', '0:16']
- slot_1_left_escape_to_0 | root 1:1 | baseline 1 | exception 0 | label counts {'0': 14, '1': 3} | nearest ['1:0', '1:2', '1:3', '1:4']
- slot_1_left_escape_to_0 | root 1:6 | baseline 1 | exception 0 | label counts {'0': 11, '1': 3, '6': 3} | nearest ['1:5', '1:7', '1:4', '1:8']
- slot_1_right_escape_to_2 | root 1:44 | baseline 1 | exception 2 | label counts {'0': 2, '1': 3, '2': 12} | nearest ['1:43', '1:45', '1:42', '1:46']
- slot_1_right_escape_to_2 | root 1:59 | baseline 1 | exception 2 | label counts {'0': 3, '1': 3, '2': 11} | nearest ['1:0', '1:58', '1:57', '1:2']
- slot_11_minor_displaced_branch_to_7 | root 11:12 | baseline 9 | exception 7 | label counts {'11': 9, '7': 8} | nearest ['11:11', '11:10', '11:14', '11:9']
- slot_11_minor_displaced_branch_to_7 | root 11:13 | baseline 9 | exception 7 | label counts {'11': 9, '7': 8} | nearest ['11:14', '11:11', '11:15', '11:10']
- slot_11_minor_displaced_branch_to_7 | root 11:17 | baseline 9 | exception 7 | label counts {'11': 9, '7': 8} | nearest ['11:16', '11:15', '11:19', '11:14']
- slot_11_minor_displaced_branch_to_7 | root 11:18 | baseline 9 | exception 7 | label counts {'11': 9, '7': 8} | nearest ['11:19', '11:16', '11:20', '11:15']
- slot_11_minor_displaced_branch_to_7 | root 11:22 | baseline 9 | exception 7 | label counts {'11': 9, '7': 8} | nearest ['11:21', '11:20', '11:24', '11:19']
- slot_11_minor_displaced_branch_to_7 | root 11:23 | baseline 9 | exception 7 | label counts {'11': 9, '7': 8} | nearest ['11:24', '11:21', '11:25', '11:20']
- slot_11_minor_displaced_branch_to_7 | root 11:27 | baseline 9 | exception 7 | label counts {'11': 9, '7': 8} | nearest ['11:26', '11:25', '11:29', '11:24']
- slot_11_minor_displaced_branch_to_7 | root 11:28 | baseline 9 | exception 7 | label counts {'11': 9, '7': 8} | nearest ['11:29', '11:26', '11:30', '11:25']
- slot_11_minor_displaced_branch_to_7 | root 11:48 | baseline 9 | exception 7 | label counts {'11': 9, '7': 8} | nearest ['11:47', '11:49', '11:46', '11:50']
- slot_11_minor_displaced_branch_to_7 | root 11:53 | baseline 9 | exception 7 | label counts {'11': 9, '7': 8} | nearest ['11:52', '11:54', '11:51', '11:55']

Boundary:

- no channels admitted
- channel registry remains zero count
- no channel rendering
- no body mutation
- no physics claim
- no force claim

Interpretation:

This artifact compares the 15 projection exceptions against their same-slot baseline neighbors and tests edge-limit sensitivity around the edge_limit=30 selector. Stable exception labels are stronger candidate handles; exception labels that flip to the baseline in the nearby limit window are more likely to be cutoff-sensitive.
