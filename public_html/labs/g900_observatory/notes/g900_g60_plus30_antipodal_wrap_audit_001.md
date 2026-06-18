# G900 G60 plus30 antipodal wrap audit 001

Status: `g60_plus30_antipodal_wrap_audit_recorded`

## Question

Is `local -> local + 30 mod 60` a native antipodal or sheet-wrap operation in the AT4val[60,6] G60 carrier?

## Result

Verdict: `g60_plus30_antipodal_wrap_audit_passed`

Plus30 status: `plus30_not_confirmed_as_native_g60_antipodal_map`

Reading:

The local+30 map is not confirmed as a native G60 antipodal map in the tested edge payload.

## G60 source

- edge source: `/data/data/com.termux/files/home/dev/cori/research/thalean-graph-theory/18-g900-kernel-admission/source/kernel_payload/g60_local_edges.csv`
- vertices: `60`
- edges: `120`
- degree profile: `{4: 60}`
- connected: `True`
- diameter: `6`
- radius: `6`

## Plus30 tests

- orbit pairs: `30`
- fixed points: `[]`
- automorphism: `False`
- distance profile to plus30: `{2: 14, 3: 20, 4: 24, 6: 2}`
- constant distance: `False`
- constant distance value: `None`
- plus30 pair is edge count: `0`

## Boundary

This audits the carrier map only.

No closure witness is admitted.

No transport relation.

No channel admission.

No marker lighting.

No viewer change.

No body mutation.

No force claim.

No physics claim.

No GR, Maxwell, QCD, electroweak, or unification claim.
