# G900 predicted frame registry 03_09 vs 03_06 audit 001

Status: `predicted_frame_registry_03_09_vs_03_06_audit_recorded`

## Question

Why does nearest anchor `9` land on existing `03_09 root_slot 9`, while farther anchor `6` lands on absent `03_06 root_slot 6`?

## Result

Verdict: `predicted_frame_registry_03_09_vs_03_06_audit_passed`

Registry status: `answer_frame_present_nonanswer_frame_absent`

Reading:

The support-table registry contains the nearest-anchor predicted frame 03_09 root_slot 9 at 23->24 as a full clean reciprocal receipt frame, while the farther-anchor predicted frame 03_06 root_slot 6 at 23->24 has zero rows. This explains the immediate registry-level difference: nearest anchor lands on an admitted outside frame; farther anchor points to a missing frame.

## Frames

Source frame:

`06_09 root_slot 12 at 23->24`

Answering predicted frame:

`03_09 root_slot 9 at 23->24`

Nonanswering predicted frame:

`03_06 root_slot 6 at 23->24`

## Boundary

This is a registry inspection over observed support-table frames.

It records that `03_09 root_slot 9` exists and `03_06 root_slot 6` is absent.

It does not derive why the registry admits `03_09` and excludes `03_06`.

No closure witness is admitted.

No transport relation.

No channel admission.

No marker lighting.

No viewer change.

No body mutation.

No force claim.

No physics claim.

No GR, Maxwell, QCD, electroweak, or unification claim.
