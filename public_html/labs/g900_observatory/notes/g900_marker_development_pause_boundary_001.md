# G900 marker development pause boundary 001

Status: `marker_development_paused_pending_cycle_contract`

Marker work is useful and preserved, but live marker lighting is paused.

## Reason

The Observatory currently has a sheets-per-second timer and a sheet counter. It does not yet have an admitted live marker cycle contract.

Keeper line:

`A timer is not a cycle. A counter is not an event. A marker should light only when the Observatory has an admitted rule saying what passed through it.`

## Locked marker assets

- data-only marker receipt
- data-only marker registry
- isolated marker debug page
- edge-index audit
- audit-gated debug page
- marker receipt pack
- live static marker panel stub
- isolated stepper/trail prototype

## Boundary

- marker work preserved
- live marker lighting paused
- isolated debug allowed
- no live stage marker import
- no live stage marker renderer
- no channel admission
- no body mutation
- no force claim
- no physics claim
