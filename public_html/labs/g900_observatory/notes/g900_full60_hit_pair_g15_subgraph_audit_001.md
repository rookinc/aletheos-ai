# G900 full60 hit-pair G15 subgraph audit 001

Status: `full60_hit_pair_g15_subgraph_audit_passed`

This audit tests whether the nine full60 endpoint-pair hits form a meaningful subgraph of the G15 endpoint-incidence skeleton.

## Result

- all G15 endpoint pairs: `30`
- full60 hit pairs: `9`
- miss pairs: `21`
- hit pairs: `['02_03', '02_08', '03_09', '05_10', '05_14', '06_12', '06_13', '07_11', '09_12']`
- hit equals boundary-package pairs: `True`
- hit package rows: `9`
- package kind counts: `{'clean_reciprocal_pair_package': 6, 'two_transition_pair_package': 2, 'one_way_single_transition': 1}`
- transition count profile: `{180: 6, 120: 1, 130: 1, 60: 1}`
- hit subgraph component sizes: `[7, 3, 2]`
- hit subgraph degree histogram: `{1: 6, 2: 6}`
- hit subgraph triangle count: `0`
- full G15 triangle count: `10`
- channel count: `0`

## Interpretation

The nine full60 hits are not loose string overlap: they exactly match the full60 packages that have boundary carriers.

The first attempted audit assumed all hit packages would have 180 pair-total transitions. That was too strong. The corrected result is more informative: the hit layer has a package taxonomy of 6 clean reciprocal pair packages, 2 two-transition pair packages, and 1 one-way single transition.

The next problem is to explain why the boundary-package subgraph splits into components `[7, 3, 2]` with this package-kind profile.

## Boundary

This is a subgraph audit only. It admits no channels, renders no channels, mutates no body, lights no marker, and makes no force or physics claim.
