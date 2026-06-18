# G900 full60 path-position package audit 001

Status: `full60_path_position_package_audit_passed`

This audit asks whether the package kinds in the `P7 + P3 + P2` full60 boundary-package forest occupy specific path positions or endpoint/internal slot roles.

## Result

- edge count: `9`
- component labels: `['P7', 'P3', 'P2']`
- component size profile: `[7, 3, 2]`
- component edge profile: `[6, 2, 1]`
- package kind counts: `{'clean_reciprocal_pair_package': 6, 'one_way_single_transition': 1, 'two_transition_pair_package': 2}`
- transition count profile: `{180: 6, 60: 1, 120: 1, 130: 1}`
- nonclean edge count: `3`
- clean edge count: `6`
- channel count: `0`

## Nonclean edges

`[{'pair': '09_12', 'component_label': 'P7', 'position_class': 'interior', 'position_label': 'interior', 'slot_role_pair_unordered': 'internal/internal', 'package_kind': 'one_way_single_transition', 'pair_total_transition_count': 60}, {'pair': '06_12', 'component_label': 'P7', 'position_class': 'interior', 'position_label': 'interior', 'slot_role_pair_unordered': 'internal/internal', 'package_kind': 'two_transition_pair_package', 'pair_total_transition_count': 120}, {'pair': '07_11', 'component_label': 'P2', 'position_class': 'singleton', 'position_label': 'singleton', 'slot_role_pair_unordered': 'endpoint/endpoint', 'package_kind': 'two_transition_pair_package', 'pair_total_transition_count': 130}]`

## Boundary

This is a path-position audit only. It admits no channels, renders no channels, mutates no body, lights no marker, and makes no force or physics claim.
