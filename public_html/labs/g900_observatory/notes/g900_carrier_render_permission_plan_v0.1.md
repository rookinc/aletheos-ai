# G900 carrier render permission plan v0.1

Status: internal render gate plan.

## Purpose

This note defines the conditions under which a carrier rail may become visible in the G900 Observatory.

No rendering is admitted here.
No graph mutation is admitted here.
No force claim is admitted here.

The first source-provenance smoke rail has been admitted into carrier data. The next question is not how to make it look interesting. The next question is what must be true before it is allowed to appear.

## Current state

The observatory currently has:

- body: g900
- body version: 0.1
- vertices: 900
- edges: 3600
- carrier set: source_provenance_scaffold
- carrier set status: active_smoke
- rail: root_0_0_tuple_shell_depth_2
- rail kind: source_provenance_rail
- selector: root_tuple_shell_depth_2
- rail status: smoke_rail
- rail vertices: 29
- rail edges: 30

This is a data and state receipt checkpoint.
It is not yet a rendering checkpoint.

## Render permission rule

A carrier rail may be rendered only after it satisfies all of the following:

1. The rail exists in carrier data.
2. The rail validates against the carrier contract.
3. The exported viewer state reports the rail.
4. The rail source object identifies the selector.
5. The rail source object points back to the receipted body.
6. The G900 body remains unchanged.
7. The render layer is declared as a reading.
8. The render path does not mutate vertices or edges.
9. The render path can be disabled.
10. The exported receipt still reports mutates_body: false.

## Rendering boundary

Rendering a carrier rail means:

- draw a visual reading over the body
- preserve the graph
- preserve the carrier data
- preserve the state receipt
- make the rail visible for inspection

Rendering a carrier rail does not mean:

- add new graph edges
- move graph vertices
- animate action
- introduce force behavior
- claim physics
- claim cosmology
- treat a smoke rail as theorem-grade structure

## Fail closed

If carrier render loading fails, the graph body must still render.

If carrier render data is invalid, the rail must not be drawn.

If the carrier registry is unavailable, the viewer must continue without rail rendering.

A failed reading must not break the body.

## First rendering target

The first renderable rail candidate is:

root_0_0_tuple_shell_depth_2

Render status:

planned

Render layer:

carrier_visual_reading

Render claim:

source-provenance smoke rail visible over the g900 body

Render non-claim:

not a force, not a channel, not action, not physics

## Display rule

The first visual carrier rail should be quiet.

Preferred visual behavior:

- thin line overlay
- low opacity
- distinct from graph edges
- toggleable
- no animation
- no glow-as-meaning
- no force color language

The visual should say:

this rail is selected

It should not say:

this rail is powerful

## Receipt rule

After first rendering, the exported state must include a render section reporting:

- carriers visible: true or false
- rendered carrier rail ids
- render version
- mutates_body: false
- physics_claim: false
- motion_authority: false

## Quartz clock guardrail

Rendering is not proof.

A visible rail is only a receipted reading if it can be connected back to:

- body data
- carrier data
- selector
- exported state
- clocked execution
- saved receipt

If it cannot return to the clocked apparatus, it has gone adrift.

Lucky for me, CPUs run on quartz.

## Keeper

Data first.
Validation second.
State receipt third.
Render permission fourth.
Rendering fifth.

The graph is body.
The carrier is a reading.
The channel is permission.
The trail is memory.
The receipt is accountability.
The force is the shadow.
