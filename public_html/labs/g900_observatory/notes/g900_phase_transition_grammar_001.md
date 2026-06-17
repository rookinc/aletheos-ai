# G900 phase transition grammar 001

Status: phase transition grammar recorded.

Audit pass: `true`.

This is grammar extraction only. It does not admit channels.

Selector family:

- `bounded_root_tuple_shell_depth_2_edge_limit_N`

Counts:

- root_count: 900
- transition_row_count: 2628
- unique_transition_count: 69
- unique_pair_count: 28
- full_60_transition_count: 24
- at_least_60_transition_count: 24

Transition kind counts:

- pair_to_pair: 19
- pair_to_single: 807
- single_to_pair: 27
- single_to_single: 1775

Top transitions:

- 2/3 -> 3: 60 | slots {3: 60}
- 3 -> 2: 60 | slots {3: 60}
- 2 -> 3: 60 | slots {3: 60}
- 2/8 -> 8: 60 | slots {8: 60}
- 8 -> 2: 60 | slots {8: 60}
- 2 -> 8: 60 | slots {8: 60}
- 3/9 -> 9: 60 | slots {9: 60}
- 9 -> 3: 60 | slots {9: 60}
- 3 -> 9: 60 | slots {9: 60}
- 5/10 -> 10: 60 | slots {10: 60}
- 10 -> 5: 60 | slots {10: 60}
- 5 -> 10: 60 | slots {10: 60}
- 7/11 -> 11: 60 | slots {11: 60}
- 11 -> 7: 60 | slots {11: 60}
- 6/12 -> 12: 60 | slots {12: 60}
- 12 -> 6: 60 | slots {12: 60}
- 6 -> 9: 60 | slots {12: 60}
- 9 -> 12: 60 | slots {12: 60}
- 6/13 -> 13: 60 | slots {13: 60}
- 13 -> 6: 60 | slots {13: 60}

Top unordered pairs:

- 2/3: 180 | slots {3: 180}
- 2/8: 180 | slots {8: 180}
- 3/9: 180 | slots {9: 180}
- 5/10: 180 | slots {10: 180}
- 5/14: 180 | slots {14: 180}
- 6/13: 180 | slots {13: 180}
- 0/1: 148 | slots {0: 20, 1: 128}
- 0/4: 146 | slots {0: 35, 4: 50, 5: 61}
- 4/5: 136 | slots {5: 136}
- 2/7: 132 | slots {7: 132}
- 3/4: 130 | slots {4: 130}
- 7/11: 130 | slots {11: 130}
- 1/2: 122 | slots {1: 10, 2: 60, 7: 52}
- 6/12: 120 | slots {12: 120}
- 0/6: 89 | slots {1: 2, 6: 87}
- 1/6: 60 | slots {6: 60}
- 6/9: 60 | slots {12: 60}
- 9/12: 60 | slots {12: 60}
- 7/9: 50 | slots {11: 50}
- 9/11: 50 | slots {11: 50}

Top bridge motifs:


Boundary:

- no channels admitted
- channel registry remains zero count
- no channel rendering
- no body mutation
- no physics claim
- no force claim

Interpretation:

This artifact extracts the transition grammar induced by edge-limit phase changes. It records directed label transitions, unordered slot-pair supports, reciprocal single-label moves, and pair-label bridge motifs. It is a pre-channel grammar map, not a channel admission.
