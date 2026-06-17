# G900 Observatory v0.1

Status: static witness surface locked.

## Closed

- Full G900 body loads from JSON.
- The body is named `g900`.
- Source versions are normalized to `0.1`.
- Graph layer renders 900 vertices and 3600 edges.
- Grid is layer 0 and defaults off.
- Graph is layer 1 and defaults on.
- Viewer state exports as JSON receipt.
- Camera roll exists in state and is inert.
- The source provenance remains visible in the exported receipt.

## Boundary

- The G900 body is not mutated by the viewer.
- Runtime overlays do not alter the graph.
- No force layer is active.
- No physical claim is made.
- No motion authority is introduced.
- The observatory is a witness surface, not a simulator.

## Keeper rule

JSON is the grammar payload.
JS is the reader, validator, and renderer.
The graph body is source.
Overlays are readings.
Readings do not mutate the body.
