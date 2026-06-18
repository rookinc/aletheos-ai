# G900 root slot 12 23_24 source provenance probe 001

Status: `root_slot_12_2324_source_provenance_probe_recorded`

## Question

Can the native return-seam selector

`root_slot=12 AND limit_transition=23->24`

be derived from deeper source/provenance fields in the existing support table?

## Target

The target seam is the already-closed exact zero-hit condition.

- target rows: `60`
- target matches global zero-hit rows: `True`
- target pair counts: `{'06_09': 60}`
- target limit counts: `{'23->24': 60}`

## Result

Verdict: `root_slot_12_2324_source_provenance_probe_passed`

Source search status: `exact_single_signature_source_candidate_found`

Best family: `structural_nonlabel_with_condition_fields_excluded_from_strict`

Best candidate:

`{'features': ['from_limit', 'package_kind'], 'target_signature_count': 1, 'single_signature': True, 'selected_row_count': 60, 'target_row_count': 60, 'false_positive_count': 0, 'false_negative_count': 0, 'exact_union': True, 'exact_single_signature': True, 'target_signature': ['23', 'one_way_single_transition']}`

## Boundary

Source provenance probe only.

No transport relation.

No channel admission.

No marker lighting.

No viewer change.

No body mutation.

No force claim.

No physics claim.

No GR, Maxwell, QCD, electroweak, or unification claim.
