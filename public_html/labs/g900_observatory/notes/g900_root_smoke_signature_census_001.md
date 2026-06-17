# G900 root smoke signature census 001

Status: root smoke signature census recorded.

Audit pass: `true`.

This is a census only. It does not admit channels.

Selector:

- `bounded_root_tuple_shell_depth_2_edge_limit_30`

Counts:

- root_count: 900
- exact_signature_class_count: 135
- count_signature_class_count: 45
- family_signature_class_count: 67
- root0_exact_signature_size: 9
- root0_count_signature_size: 9

Root0 signature:

- root: 0:0
- count_signature: `29,30,7,12`
- edge_hit_count: 7
- max_edge_overlap: 12

Root0 exact signature roots:

- 0:0
- 0:5
- 0:6
- 0:33
- 0:34
- 0:37
- 0:43
- 0:44
- 0:54

Distributions:

- edge_hit_count: `{5: 62, 6: 11, 7: 11, 9: 282, 10: 4, 11: 1, 12: 165, 13: 115, 14: 2, 16: 184, 17: 3, 18: 60}`
- max_edge_overlap: `{4: 245, 5: 2, 7: 278, 8: 4, 9: 16, 10: 250, 11: 21, 12: 26, 13: 17, 14: 41}`
- vertex_count: `{25: 144, 26: 39, 27: 141, 28: 96, 29: 349, 30: 124, 31: 7}`
- edge_count: `{30: 900}`

Largest count-signature classes:

- size 110 | signature `29,30,16,4` | sample 11:0
- size 70 | signature `29,30,9,10` | sample 0:7
- size 60 | signature `25,30,12,7` | sample 9:0
- size 60 | signature `25,30,13,7` | sample 10:0
- size 60 | signature `27,30,16,4` | sample 13:0
- size 60 | signature `29,30,18,4` | sample 14:0
- size 55 | signature `30,30,12,7` | sample 5:30
- size 50 | signature `28,30,9,10` | sample 0:50
- size 41 | signature `29,30,5,14` | sample 0:57
- size 37 | signature `27,30,9,10` | sample 0:19
- size 35 | signature `26,30,9,10` | sample 1:27
- size 32 | signature `30,30,9,10` | sample 1:31

Boundary:

- no channels admitted
- channel registry remains zero count
- no channel rendering
- no body mutation
- no physics claim
- no force claim

Interpretation:

The bounded smoke selector partitions all 900 possible roots into signature classes. The existing root0 smoke rail belongs to a local nine-root exact-signature class inside slot 0, rather than being globally unique or globally maximal.
