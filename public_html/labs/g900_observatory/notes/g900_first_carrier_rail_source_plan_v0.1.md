# G900 first carrier rail source plan v0.1

Status: internal source plan.

## Purpose

This note identifies the admissible source path for the first real carrier rail in the G900 Observatory.

No carrier rail geometry is admitted here.
No rendering is introduced here.
No graph mutation is introduced here.

The goal is to prevent the first carrier rail from being invented by visual taste, force metaphor, or cosmological enthusiasm.

## Current stack

The G900 Observatory currently has:

- body: g900
- body version: 0.1
- vertices: 900
- edges: 3600
- overlay registry: 0.1
- carrier registry: 0.1
- carrier contract: 0.1
- placeholder carrier set: source_provenance_scaffold
- carrier rails: 0

The body is source.
The carrier layer is a reading.
Readings do not mutate the body.

## Guardrail

The first carrier rail must come from source provenance or deterministic selection over receipted body data.

It must not come from:

- force-like interpretation
- hand-drawn aesthetics
- cosmological metaphor
- visual salience alone
- post-hoc pattern naming

The forces are at the end of the chain.
They are the shadows of admissible action.

## Candidate source path

The first admissible source path is:

1. Use the existing G900 body payload.
2. Preserve the body source metadata.
3. Select a rail candidate by a deterministic rule over existing body identifiers.
4. Record the rule in the carrier rail source object.
5. Validate the rail against the carrier contract.
6. Export the state receipt.
7. Only then consider rendering.

The first rail should live under:

carrier_sets[0].id = source_provenance_scaffold

## Required rail source object

A future nonempty rail must include a source object with at least:

- kind
- body
- body_version
- selector
- selector_version
- source_path
- admissibility_note

Example shape:

source:
  kind: deterministic_body_selector
  body: g900
  body_version: 0.1
  selector: first_provenance_ring_candidate
  selector_version: 0.1
  source_path: public_html/labs/g900_observatory/data/g900_static_body.v1.json
  admissibility_note: selected from receipted body data; no graph mutation

## First admissibility test

Before a rail can be admitted, it must pass:

- rail has id, label, kind
- rail has mutates_body: false
- rail has source provenance
- rail references existing vertex ids, edge ids, or both
- rail references at least one vertex or edge
- rail belongs to an existing carrier set
- registry counts match carrier set and rail contents
- exported viewer state reports the rail
- body remains g900 v0.1 with 900 vertices and 3600 edges

## Preferred first rail kind

The preferred first rail kind is:

source_provenance_rail

This name keeps the first rail humble. It says the rail is a provenance reading, not a force, not a physical mechanism, and not a cosmological declaration.

## Rendering rule

Do not render the first rail until it is receipted in state.

Order:

1. data
2. validation
3. state receipt
4. commit
5. render

## Quartz clock rule

If the first rail cannot be connected back to the clocked, material, receiptable apparatus, it has gone adrift.

Lucky for me, CPUs run on quartz.

## Keeper

The graph is body.
The carrier is a reading.
The channel is permission.
The trail is memory.
The receipt is accountability.
The force is the shadow.
