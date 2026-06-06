# Remove Constructor Auto Rotation

Status: UI and behavior cleanup

Removed Auto rotate from the constructor UI.

Behavior:

    automatic camera orbit is disabled
    default orbitEnabled is false
    manual drag rotation still works

Reason:

    the P900 checkpoint view should start stable, not drifting
