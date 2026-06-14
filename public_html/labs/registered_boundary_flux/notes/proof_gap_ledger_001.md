# Proof-gap ledger 001

Status: open proof-gap ledger.

Program: Registered Boundary Flux / Perfect Return Cell / Thalean proof filling.

## Working rules

- Do not write physics claims.
- Do not treat animation as evidence.
- Do not treat upstairs/downstairs as proof until finite predicates exist.
- Preserve all negative claims.
- Prefer small scripts and JSON receipts over prose-only assertions.
- Every proof attempt should emit source inputs, finite predicate, generated artifact, validator, receipt, and boundary note.

## Priority order

A, C, D, B, E.

First task: build the register-map candidate ledger for Gap A.

## Gap A: chamber_register_map

- status: open
- missing theorem statement: There exists a lawful finite map from K900/G15 role slots to chamber grammar support labels that explains the selected WXYZTIW branch triple, or a finite obstruction proves the available public predicates are insufficient.
- proposed finite predicate: A register map R preserves triangle/mate-pair structure and recovers the selected branch triple under row-aware M-incidence.
- next script: build_register_map_candidate_ledger.py

### Current evidence

- K900-native WXYZTIW collision bound exists without chamber-register input.
- Chamber-facing comparison is suggestive, not yet lawful.
- A lawful map between K900 slots and chamber grammar support labels remains missing.

### Minimal input artifacts

- K900 G15 carrier edge register
- K900 odd/even triangle reference
- selected WXYZTIW branch triple
- M-sector incidence rows
- chamber support labels
- G60/G15/G900 source bindings

### Validator plan

- enumerate candidate register keys
- test public chamber/triangle predicates
- test row-aware M-incidence recovery
- emit exact/pass, ambiguous, or fail receipt

### Null / control

- random register key
- row-shuffled M
- public-predicate-only selection
- scalar-summary-only selection

### Likely failure mode

Public predicates reduce the key space but do not uniquely recover the selected branch triple without row-aware incidence.

## Gap B: role_relative_branch_law

- status: partially_proved_minimality_open
- missing theorem statement: The Apre branch triple is exactly the preimage of a K900-native role-relative closure predicate, with minimal assumptions stated.
- proposed finite predicate: TopLock(WXYZTIW): role pattern plus aggregate trace signature selects exactly the three base witnesses and six oriented presentations.
- next script: prove_role_relative_branch_law.py

### Current evidence

- WXYZTIW role order is fixed.
- Apre has shared W-X-Y stem and shared I-W return.
- The three branches differ only at central Z-T.
- Role-relative pattern keeps the three-way class while rejecting tested local sign tampers.

### Minimal input artifacts

- imported K900 G15 carrier
- binary carrier signs
- odd/even triangle reference
- simple six-cycle census
- role order WX, XY, YZ, ZT, TI, IW

### Validator plan

- enumerate all simple six-cycles
- expand all oriented presentations
- apply candidate predicate
- record selected base cycles and oriented presentations

### Null / control

- aggregate observable only
- one-edge sign tamper
- two-edge sign tamper
- triangle-reference disabled comparison

### Likely failure mode

The exact predicate works, but its minimality is not unique or depends on the imported triangle reference.

## Gap C: cocycle_source_derivation

- status: validated_payload_strict_writer_gap_open
- missing theorem statement: The active aligned cocycle is derivable from named source inputs by a strict finite writer, or the current payload is validated-but-not-source-derived.
- proposed finite predicate: A strict writer must produce the 30-edge cocycle and sign convention from source artifacts only, with no hand-filled edge table.
- next script: audit_strict_cocycle_writer_candidates.py

### Current evidence

- Active aligned cocycle passes public C1-C4 checks.
- 60 directed transport cocycle edge records validate.
- Candidate lift passes old checker bundle.
- Strict origin writer audit found no strict cocycle data writer.

### Minimal input artifacts

- theorem/cocycle_data_aligned.json
- public_html/json/gram_Q.json
- 05 transport_cocycle_edges.json
- 11 lift schema
- old checker validation result
- strict origin gap audit

### Validator plan

- search writer candidates
- run candidates in isolated output directories
- compare edge set, sign counts, C1-C4, and hash against active aligned payload
- emit closed-source derivation receipt or open-gap theorem note

### Null / control

- archived pre-alignment file
- random signings with same counts
- gauge-switched equivalents
- manual bridge payload

### Likely failure mode

A script reproduces the table but depends on an aligned bridge or manual source rather than a strict derivation.

## Gap D: inscription_station_invariant

- status: interpretation_recorded_finite_invariant_open
- missing theorem statement: I is distinguished by a finite predicate in the validated projection/cocycle structure, or I remains an interpretive inscription label.
- proposed finite predicate: Inscription(I): I is uniquely selected by turnaround/closure behavior and measurable cocycle or return-signature change.
- next script: test_inscription_station_invariance.py

### Current evidence

- I is interpreted as the inscription station.
- Mode 1 is cyclic/elevator return.
- Mode 2 is sheet-flip/stairwell return.
- This role grammar is recorded but not yet proved as a finite invariant.

### Minimal input artifacts

- Mode 1 shape receipt
- Mode 2 sheet-flip receipt
- cocycle companion receipt
- role order
- cycle clock paths

### Validator plan

- test all station relabelings
- compare Mode 1 and Mode 2 return signatures
- test alternate turnaround stations
- record whether I remains uniquely selected

### Null / control

- same path length with different turnaround
- relabelled station set
- visual labels removed
- reverse-chain null without inscription distinction

### Likely failure mode

I is distinguished by chosen path syntax, not by invariant structure.

## Gap E: g60_to_g900_relation

- status: source_bound_context_located_fiber_theorem_open
- missing theorem statement: A Perfect Return Cell projection corresponds to a specified fiber or role component in the G60 -> G15 x G60 -> G900 tower, with stated coupling obligations.
- proposed finite predicate: A cell is admissible as a projection fiber only if it names source object, projection path, carrier relation, validation receipt, and boundary.
- next script: build_g60_g900_relation_ledger.py

### Current evidence

- G60 is the source object for the cell.
- G900 is an admitted local theorem signature, not active rendered cell.
- The transition from projection cell to located G900 fiber is not yet proved.

### Minimal input artifacts

- G60 source binding
- G15 slot graph
- K900 construction kernel
- G900 signature binding
- Perfect Return Cell projection modes
- carrier signing table

### Validator plan

- build relation ledger from G60 source to projection cell to G15 slot role to G900 carrier position
- require every arrow to cite a source artifact
- emit located, ambiguous, or unlocated status

### Null / control

- cell as pure UI
- random six-station path
- G900 context with no fiber relation
- sibling carrier relation

### Likely failure mode

The current cell is source-bound and validated, but not yet located as a specific G900 fiber.

## Source hashes

- registered_boundary_flux/data/perfect_return_cell.v1.json: a49883203ef87e3c5129f24c9a889ef0ddc5a3a1f7a60c863be6f239ef57a375
- registered_boundary_flux/data/kernel.v1.json: 8a1ab8e69fdfb568524ca378e6fb0ad04a702e6ebdf1dac683cdb5ae85ca0d1a
- registered_boundary_flux/data/g60_source_binding.v1.json: 8dec103c109f8a93fa84f46ea8faafd5638e1e1042ef66bb9fe47c3ab976f675
- registered_boundary_flux/data/g900_signature_binding.v1.json: fa5e368923d2dc05314887eb0014416606ca54727d9b4c87a040918109bf4440
- registered_boundary_flux/artifacts/json/perfect_return_shape.validation.v1.json: a529d98bd9697113bc1f01aec73fc889d7f92497822a31826bdc2bbbb5e01af6
- registered_boundary_flux/artifacts/json/perfect_return_sheet_flip.validation.v1.json: 50ddbbb268b78331716846520499e286f5d34924c7fee22d9dc329ef882b0b15
- registered_boundary_flux/artifacts/json/cocycle_companion.validation.v1.json: aecb947eea376b7cbff48c29ea394224a61bb22c914c909dcae779cbb99674b4
- registered_boundary_flux/artifacts/json/upstairs_downstairs_inscription_interpretation_001.v1.json: eab9b15eabd903d827aeb92fce5cc026131adfa58f8a4c56a6e3fb12d863cf40
