# G900 edge-limit phase scan 001

Status: edge-limit phase scan recorded.

Audit pass: `true`.

This is a phase scan only. It does not admit channels.

Selector family:

- `bounded_root_tuple_shell_depth_2_edge_limit_N`

Limits:

- min_edge_limit: 1
- max_edge_limit: 60
- limit_count: 60

Counts:

- root_count: 900
- phase_row_count: 54000
- stable_root_count: 93
- multi_label_root_count: 807
- exception_root_count: 15

Distributions:

- distinct_label_count_distribution: `{1: 93, 2: 26, 3: 620, 4: 153, 5: 8}`
- switch_count_distribution: `{0: 93, 1: 7, 2: 19, 3: 620, 4: 114, 5: 15, 6: 32}`
- dominant_label_counts: `{'0': 60, '1': 60, '10': 60, '11': 60, '12': 60, '13': 60, '14': 60, '2': 60, '3': 60, '4': 60, '5': 60, '6': 60, '7': 60, '8': 60, '9': 60}`

Top transitions:

- 2 -> 3: 60
- 2/3 -> 3: 60
- 3 -> 2: 60
- 2 -> 8: 60
- 2/8 -> 8: 60
- 8 -> 2: 60
- 3 -> 9: 60
- 3/9 -> 9: 60
- 9 -> 3: 60
- 10 -> 5: 60
- 5 -> 10: 60
- 5/10 -> 10: 60

Slot summary:

- slot 0 | stable 31 | multi 29 | avg switches 0.933 | label@30 {'0': 59, '4': 1} | dominant {'0': 60}
- slot 1 | stable 11 | multi 49 | avg switches 2.533 | label@30 {'0': 2, '1': 56, '2': 2} | dominant {'1': 60}
- slot 2 | stable 40 | multi 20 | avg switches 1.000 | label@30 {'2': 60} | dominant {'2': 60}
- slot 3 | stable 0 | multi 60 | avg switches 3.000 | label@30 {'3': 60} | dominant {'3': 60}
- slot 4 | stable 0 | multi 60 | avg switches 3.083 | label@30 {'4': 60} | dominant {'4': 60}
- slot 5 | stable 0 | multi 60 | avg switches 4.100 | label@30 {'5': 60} | dominant {'5': 60}
- slot 6 | stable 11 | multi 49 | avg switches 2.450 | label@30 {'6': 60} | dominant {'6': 60}
- slot 7 | stable 0 | multi 60 | avg switches 3.867 | label@30 {'7': 60} | dominant {'7': 60}
- slot 8 | stable 0 | multi 60 | avg switches 3.000 | label@30 {'8': 60} | dominant {'8': 60}
- slot 9 | stable 0 | multi 60 | avg switches 3.000 | label@30 {'9': 60} | dominant {'9': 60}
- slot 10 | stable 0 | multi 60 | avg switches 3.000 | label@30 {'10': 60} | dominant {'10': 60}
- slot 11 | stable 0 | multi 60 | avg switches 3.833 | label@30 {'7': 10, '9': 50} | dominant {'11': 60}
- slot 12 | stable 0 | multi 60 | avg switches 4.000 | label@30 {'9': 60} | dominant {'12': 60}
- slot 13 | stable 0 | multi 60 | avg switches 3.000 | label@30 {'6': 60} | dominant {'13': 60}
- slot 14 | stable 0 | multi 60 | avg switches 3.000 | label@30 {'5': 60} | dominant {'14': 60}

Exception roots:

- 0:14 | label@30 4 | dominant 0 (41/60) | distinct 4 | switches 4 | counts {'0': 41, '0/1': 5, '1': 1, '4': 13}
- 1:1 | label@30 0 | dominant 1 (32/60) | distinct 3 | switches 3 | counts {'0': 23, '0/1': 5, '1': 32}
- 1:6 | label@30 0 | dominant 1 (29/60) | distinct 4 | switches 5 | counts {'0': 23, '0/1': 5, '1': 29, '6': 3}
- 1:44 | label@30 2 | dominant 1 (40/60) | distinct 5 | switches 5 | counts {'0': 2, '0/1': 2, '1': 40, '1/2': 3, '2': 13}
- 1:59 | label@30 2 | dominant 1 (40/60) | distinct 5 | switches 5 | counts {'0': 3, '0/1': 2, '1': 40, '1/2': 3, '2': 12}
- 11:12 | label@30 7 | dominant 11 (38/60) | distinct 3 | switches 3 | counts {'11': 38, '7': 18, '7/11': 4}
- 11:13 | label@30 7 | dominant 11 (38/60) | distinct 3 | switches 3 | counts {'11': 38, '7': 18, '7/11': 4}
- 11:17 | label@30 7 | dominant 11 (38/60) | distinct 3 | switches 3 | counts {'11': 38, '7': 18, '7/11': 4}
- 11:18 | label@30 7 | dominant 11 (38/60) | distinct 3 | switches 3 | counts {'11': 38, '7': 18, '7/11': 4}
- 11:22 | label@30 7 | dominant 11 (38/60) | distinct 3 | switches 3 | counts {'11': 38, '7': 18, '7/11': 4}
- 11:23 | label@30 7 | dominant 11 (38/60) | distinct 3 | switches 3 | counts {'11': 38, '7': 18, '7/11': 4}
- 11:27 | label@30 7 | dominant 11 (38/60) | distinct 3 | switches 3 | counts {'11': 38, '7': 18, '7/11': 4}
- 11:28 | label@30 7 | dominant 11 (38/60) | distinct 3 | switches 3 | counts {'11': 38, '7': 18, '7/11': 4}
- 11:48 | label@30 7 | dominant 11 (37/60) | distinct 3 | switches 3 | counts {'11': 37, '7': 19, '7/11': 4}
- 11:53 | label@30 7 | dominant 11 (37/60) | distinct 3 | switches 3 | counts {'11': 37, '7': 19, '7/11': 4}

Boundary:

- no channels admitted
- channel registry remains zero count
- no channel rendering
- no body mutation
- no physics claim
- no force claim

Interpretation:

This scan treats edge_limit as a phase parameter. It checks whether the edge_limit=30 projection surface is stable across nearby and wider limits or one slice in a larger ordered-shell phase sequence.
