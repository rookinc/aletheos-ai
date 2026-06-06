# Fix Rotate Pitch Loop

Status: rotate toolbar bug fix

Problem:

    Pitch stopped because the rotate toolbar reused the old drag-camera clamp:
    -1.45 <= pitch <= 1.45

Fix:

    Rotate toolbar pitch now wraps through a full cycle instead of clamping.
    Yaw and roll also wrap into the range -pi..pi for cleaner readouts.

Boundary:

    Manual drag rotation may still use clamping.
    Rocker rotation is cyclic.
