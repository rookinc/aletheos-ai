# G900 primary-slot projection census 001

Status: primary-slot projection census recorded.

Audit pass: `true`.

This is a census only. It does not admit channels.

Selector:

- `bounded_root_tuple_shell_depth_2_edge_limit_30`

Counts:

- root_count: 900
- root_slot_count: 15
- projection_pair_count: 19
- full_slot_pure_count: 12
- full_slot_aligned_count: 9
- full_slot_displaced_count: 3

Slot summaries:

- root slot 0 | aligned 0.983 | dominant 0 (59/60) | primary counts {'0': 59, '4': 1}
- root slot 1 | aligned 0.933 | dominant 1 (56/60) | primary counts {'1': 56, '0': 2, '2': 2}
- root slot 2 | aligned 1.000 | dominant 2 (60/60) | primary counts {'2': 60}
- root slot 3 | aligned 1.000 | dominant 3 (60/60) | primary counts {'3': 60}
- root slot 4 | aligned 1.000 | dominant 4 (60/60) | primary counts {'4': 60}
- root slot 5 | aligned 1.000 | dominant 5 (60/60) | primary counts {'5': 60}
- root slot 6 | aligned 1.000 | dominant 6 (60/60) | primary counts {'6': 60}
- root slot 7 | aligned 1.000 | dominant 7 (60/60) | primary counts {'7': 60}
- root slot 8 | aligned 1.000 | dominant 8 (60/60) | primary counts {'8': 60}
- root slot 9 | aligned 1.000 | dominant 9 (60/60) | primary counts {'9': 60}
- root slot 10 | aligned 1.000 | dominant 10 (60/60) | primary counts {'10': 60}
- root slot 11 | aligned 0.000 | dominant 9 (50/60) | primary counts {'9': 50, '7': 10}
- root slot 12 | aligned 0.000 | dominant 9 (60/60) | primary counts {'9': 60}
- root slot 13 | aligned 0.000 | dominant 6 (60/60) | primary counts {'6': 60}
- root slot 14 | aligned 0.000 | dominant 5 (60/60) | primary counts {'5': 60}

Global primary slot counts:

- 9: 170
- 5: 120
- 6: 120
- 7: 70
- 2: 62
- 0: 61
- 4: 61
- 10: 60
- 3: 60
- 8: 60
- 1: 56

Boundary:

- no channels admitted
- channel registry remains zero count
- no channel rendering
- no body mutation
- no physics claim
- no force claim

Interpretation:

This census records how each root slot projects to a primary carrier slot under the bounded smoke selector. It tests whether the carrier-projection grammar is root-aligned, displaced, or mixed before any channel admission.
