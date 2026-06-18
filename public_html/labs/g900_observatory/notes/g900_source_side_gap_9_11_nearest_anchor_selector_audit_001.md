# G900 source-side gap 9 11 nearest anchor selector audit 001

Status: `source_side_gap_9_11_nearest_anchor_selector_audit_recorded`

## Question

Does nearest-anchor selection separate the receipt branch inside source-side `[9,11]`?

## Result

Verdict: `source_side_gap_9_11_nearest_anchor_selector_audit_passed`

Nearest status: `nearest_anchor_selects_receipt_branch`

Reading:

Inside the source-side [9,11] fork, nearest-anchor selection exactly separates the receipt branch. Endpoint 9 is distance 3 from source root 12 and selects the admitted 03_09 root9 receipt branch. Endpoint 6 is distance 6 from source root 12 and selects the absent 03_06 root6 branch. Thus the sharper source-side rule is: [9,11] opens the fork, nearest anchor selects receipt. This is still a branch-selector audit, not a native derivation.

## Distance rule

Distance from endpoint to source root:

`(source_root_slot - endpoint) mod 15`

For source root `12`:

`12 - 9 = 3`

`12 - 6 = 6`

So endpoint `9` is nearest and endpoint `6` is farther.

## Branches

Nearest branch:

`[9,11] + anchor 9 -> 03_09 root_slot 9 -> receipt`

Farther branch:

`[9,11] + anchor 6 -> 03_06 root_slot 6 -> absent`

## Boundary

This is a source-side branch-selector audit over the `[9,11]` rows.

It does not derive why the nearest anchor rule should hold from the deeper native construction.

No closure witness is admitted.

No transport relation.

No channel admission.

No marker lighting.

No viewer change.

No body mutation.

No force claim.

No physics claim.

No GR, Maxwell, QCD, electroweak, or unification claim.
