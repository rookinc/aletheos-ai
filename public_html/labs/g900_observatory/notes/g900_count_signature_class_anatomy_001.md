# G900 count-signature class anatomy 001

Status: count-signature class anatomy recorded.

Audit pass: `true`.

This is anatomy only. It does not admit channels.

Selector:

- `bounded_root_tuple_shell_depth_2_edge_limit_30`

Counts:

- root_count: 900
- count_signature_class_count: 45
- largest_class_size: 110

Class kind counts:

- full_single_slot_class: 4
- multi_slot_irregular: 20
- partial_single_slot_class: 21

Largest classes:

- size 110 | `29,30,16,4` | multi_slot_irregular | slots {11: 50, 12: 60} | primary {'slot_internal_carriers': 110}
- size 70 | `29,30,9,10` | multi_slot_irregular | slots {0: 2, 1: 7, 3: 20, 5: 12, 6: 10, 7: 19} | primary {'slot_internal_carriers': 70}
- size 60 | `25,30,12,7` | full_single_slot_class | slots {9: 60} | primary {'slot_internal_carriers': 60}
- size 60 | `25,30,13,7` | full_single_slot_class | slots {10: 60} | primary {'slot_internal_carriers': 60}
- size 60 | `27,30,16,4` | full_single_slot_class | slots {13: 60} | primary {'slot_internal_carriers': 60}
- size 60 | `29,30,18,4` | full_single_slot_class | slots {14: 60} | primary {'slot_internal_carriers': 60}
- size 55 | `30,30,12,7` | multi_slot_irregular | slots {5: 13, 7: 6, 8: 36} | primary {'slot_internal_carriers': 55}
- size 50 | `28,30,9,10` | multi_slot_irregular | slots {0: 2, 1: 4, 2: 6, 3: 13, 5: 10, 6: 12, 7: 3} | primary {'slot_internal_carriers': 50}
- size 41 | `29,30,5,14` | multi_slot_irregular | slots {0: 1, 1: 1, 2: 38, 6: 1} | primary {'slot_internal_carriers': 41}
- size 37 | `27,30,9,10` | multi_slot_irregular | slots {0: 1, 1: 2, 2: 4, 3: 10, 5: 4, 6: 10, 7: 6} | primary {'slot_internal_carriers': 37}
- size 35 | `26,30,9,10` | multi_slot_irregular | slots {1: 1, 2: 4, 3: 5, 4: 15, 5: 4, 6: 5, 7: 1} | primary {'slot_internal_carriers': 35}
- size 32 | `30,30,9,10` | multi_slot_irregular | slots {1: 4, 3: 12, 5: 5, 6: 5, 7: 6} | primary {'slot_internal_carriers': 32}

Root0 class:

- count_signature: `29,30,7,12`
- class_size: 9
- class_kind: partial_single_slot_class
- root_slot_counts: `{0: 9}`
- primary_set_counts: `{'slot_internal_carriers': 9}`
- primary_slot_counts: `{0: 9}`
- primary_root_slot_alignment_rate: `1.0`

Boundary:

- no channels admitted
- channel registry remains zero count
- no channel rendering
- no body mutation
- no physics claim
- no force claim

Interpretation:

This anatomy groups the 900 bounded smoke selectors by coarse count signature and records how each class touches carrier families. It is a pre-admission structural map, not a channel law.
