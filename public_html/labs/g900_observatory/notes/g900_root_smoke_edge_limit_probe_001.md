# G900 root smoke edge-limit probe 001

Status: root smoke edge-limit probe recorded.

Audit pass: `true`.

This is a probe only. It does not admit channels.

Main result:

- selector: `bounded_root_tuple_shell_depth_2_edge_limit_30`
- exact_reconstructs_existing_smoke_rail: `true`
- root_count: 900
- root0 edge_hit_count: 7
- root0 max_edge_overlap: 12
- same_exact_signature_count: 9
- same_count_signature_count: 9

Interpretation:

The existing smoke rail is exactly reconstructed by the bounded root tuple shell selector with depth limit 2 and edge limit 30. It is not the full depth-2 shell. It is a bounded ordered sub-shell of the receipted G900 body.

The exact root0 signature is not unique, but it is local: exactly nine roots share it, all in slot 0.

Root0 is structured but not globally maximal. Other roots reach max_edge_overlap 14 while root0 reaches 12.

Distributions:

- edge_hit_count: `{'5': 62, '6': 11, '7': 11, '9': 282, '10': 4, '11': 1, '12': 165, '13': 115, '14': 2, '16': 184, '17': 3, '18': 60}`
- max_edge_overlap: `{'4': 245, '5': 2, '7': 278, '8': 4, '9': 16, '10': 250, '11': 21, '12': 26, '13': 17, '14': 41}`
- vertex_count: `{'25': 144, '26': 39, '27': 141, '28': 96, '29': 349, '30': 124, '31': 7}`
- edge_count: `{'30': 900}`

Same exact signature roots:

- 0:0
- 0:5
- 0:6
- 0:33
- 0:34
- 0:37
- 0:43
- 0:44
- 0:54

Boundary:

- no channels admitted
- channel registry remains zero count
- no channel rendering
- no body mutation
- no physics claim
- no force claim
