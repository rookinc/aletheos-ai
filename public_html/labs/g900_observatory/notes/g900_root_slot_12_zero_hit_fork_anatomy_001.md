# G900 root slot 12 zero hit fork anatomy 001

Status: `root_slot_12_zero_hit_fork_anatomy_recorded`

## Question

Why does root_slot 12 in the 23->24 fork have zero delta/internal hits while root_slot 9 does not?

## Result

Verdict: `root_slot_12_zero_hit_fork_anatomy_passed`

Anatomy status: `root_slot_12_exact_zero_hit_selector`

Reading:

`Inside the 23->24 fork, root_slot=12 exactly selects the zero delta/internal hit branch.`

## Selector

`{"features": ["root_slot"], "selected_row_count": 60, "value": "12"}`

## Counts

- fork rows: `120`
- root_slot 9 rows: `60`
- root_slot 12 rows: `60`
- zero-hit rows: `60`
- nonzero-hit rows: `60`

## Boundary

Fork anatomy only.

No transport admission.

No channel admission.

No viewer change.

No body mutation.

No force claim.

No physics claim.
