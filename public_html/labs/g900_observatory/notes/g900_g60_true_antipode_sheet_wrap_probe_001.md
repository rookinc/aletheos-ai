# G900 G60 true antipode sheet-wrap probe 001

Status: `g60_true_antipode_sheet_wrap_probe_recorded`

## Question

Does the true G60 distance-6 antipode supply the native sheet-wrap map for the `06_09` fork-side counterpart?

## Result

Verdict: `g60_true_antipode_sheet_wrap_probe_passed`

Probe status: `true_antipode_requires_fork_swap_to_reach_support`

Reading:

The true G60 antipode, not local+30, supplies a native sheet-wrap candidate. Inside 06_09 it remains unsupported, but with fork swap to 03_09 it reaches a supported, carrier-bearing, nonzero-hit counterpart.

## Antipode map

- unique antipode count: `60`
- antipode pair count: `30`
- fixed points: `[]`
- involution failures: `0`
- antipode automorphism: `True`
- plus30 match count: `2`
- antipode delta profile: `{7: 1, 8: 1, 11: 1, 12: 1, 15: 7, 16: 1, 17: 1, 19: 3, 20: 1, 21: 4, 25: 3, 26: 1, 29: 4, 30: 2, 31: 4, 34: 1, 35: 3, 39: 4, 40: 1, 41: 3, 43: 1, 44: 1, 45: 7, 48: 1, 49: 1, 52: 1, 53: 1}`

## Support-table tests

- target rows: `60`
- true antipode fork supported: `True`
- true antipode internal unsupported: `True`

## Boundary

This derives and tests a native G60 antipode map only.

No closure witness is admitted.

No transport relation.

No channel admission.

No marker lighting.

No viewer change.

No body mutation.

No force claim.

No physics claim.

No GR, Maxwell, QCD, electroweak, or unification claim.
