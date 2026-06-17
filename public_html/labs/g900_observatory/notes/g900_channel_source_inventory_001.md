# G900 channel source inventory 001

Status: channel source inventory recorded.

Audit pass: `true`.

This is an inventory only. It does not admit channels.

Count method:

- carrier counts are derived from `carrier_sets`
- no top-level `carrier_set_count` or `rail_count` field is required
- the source `counts` object is recorded as evidence, not used as the admission rule

Counts:

- carrier_set_count: 3
- rail_count: 46
- slot_internal_count: 15
- slot_pair_boundary_count: 30
- smoke_rail_count: 1
- candidate_count: 278

Candidate kind counts:

- boundary_to_slot_internal_incidence: 60
- source_scaffold_to_carrier_handle: 45
- support_overlap_handle: 173

Boundary:

- no channels admitted
- channel registry remains zero count
- no channel rendering
- no body mutation
- no physics claim
- no force claim

Interpretation:

Layer 3 now has a source inventory over the admitted Layer 2 carriers. The inventory identifies possible source handles, not admissible channel laws.
