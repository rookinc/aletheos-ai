# G900 carrier contract v0.1

Status: validation contract locked.

## Purpose

Carrier data is a reading over the G900 body.

A carrier may mark stable rails where trace can ride, but it does not alter the graph.

## Boundary

- Carriers do not mutate the G900 body.
- Carriers do not introduce runtime motion authority.
- Carriers do not make a physical claim.
- Carrier rails must cite vertices, edges, or both from the body.
- Empty scaffolds are allowed.
- Nonempty rails must carry explicit source provenance.

## Carrier set shape

Each carrier set must have:

- id
- label
- status
- mutates_body: false
- rails[]

## Rail shape

Each rail must have:

- id
- label
- kind
- vertex_ids[]
- edge_ids[]
- mutates_body: false
- source{}

A rail must reference at least one vertex or edge.

## Keeper rule

The body is source.
The carrier is a reading.
A reading may be rendered, exported, and audited.
A reading may not mutate the body.
