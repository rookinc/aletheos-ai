# G900 registry admission condition 03_09 vs 03_06 001

Status: `registry_admission_condition_03_09_vs_03_06_recorded`

## Question

Which registry-level admission features separate `03_09 root_slot 9` from absent `03_06 root_slot 6`?

## Result

Verdict: `registry_admission_condition_03_09_vs_03_06_audit_passed`

Admission status: `registry_admission_features_separate_03_09_from_03_06`

Reading:

In the two nondegenerate predicted-frame candidates, 03_09 root_slot 9 is admitted because both its predicted pair and root slot already appear in the full support-frame registry. 03_06 root_slot 6 is absent because neither pair 03_06 nor root_slot 6 appears anywhere in the full registry. This gives a registry-level admission separator, but it is not yet a native derivation of why that registry exists.

## Important boundary

This is a registry-level separator inside the two nondegenerate predicted-frame candidates.

It does not derive why the registry admits `03_09 root_slot 9`.

It does not derive why the registry excludes `03_06 root_slot 6`.

No closure witness is admitted.

No transport relation.

No channel admission.

No marker lighting.

No viewer change.

No body mutation.

No force claim.

No physics claim.

No GR, Maxwell, QCD, electroweak, or unification claim.
