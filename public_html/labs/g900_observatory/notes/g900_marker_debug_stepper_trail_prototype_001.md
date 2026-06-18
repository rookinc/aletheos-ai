# G900 marker debug stepper trail prototype 001

Status: visually checked prototype.

This isolated prototype lights the 6/9 marker when the stepper reaches step 24 and leaves a fading trail.

## Behavior

- page: `marker_debug_stepper.html`
- module: `kernel/g900_marker_debug_stepper.js`
- marker: `unsupported_phase_step_6_9`
- activation rule: `step == 24`
- phase event: `6 -> 9`
- edge-limit event: `23 -> 24`
- trail kind: runtime display memory

## Boundary

- isolated prototype only
- no live stage import
- no live stage marker renderer
- no live Observatory UI change
- no channel admission
- no body mutation
- no force claim
- no physics claim

Keeper line:

The marker does not move the graph. The stepper moves the reading. The trail records the afterimage of that reading.
