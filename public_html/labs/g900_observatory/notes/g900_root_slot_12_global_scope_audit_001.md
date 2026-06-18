# G900 root slot 12 global scope audit 001

Status: `root_slot_12_global_scope_audit_recorded`

## Question

Is `root_slot=12` globally a zero-hit obstruction slot, or only special inside the `23->24` fork?

## Result

Verdict: `root_slot_12_global_scope_audit_passed`

Scope status: `root_slot_12_mixed_global_special_in_23_24_fork`

Reading:

`Root_slot=12 is mixed globally; it is exact zero-hit only inside the 23->24 fork.`

## Counts

- global rows: `1440`
- global zero-hit rows: `60`
- root_slot 12 rows: `240`
- root_slot 12 zero-hit rows: `60`
- root_slot 12 nonzero-hit rows: `180`

## Boundary

Global scope audit only.

No transport admission.

No channel admission.

No viewer change.

No body mutation.

No force claim.

No physics claim.
