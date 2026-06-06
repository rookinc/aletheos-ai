# Split Constructor Controls by Mode

Status: UI structure checkpoint

The constructor controls are now grouped by role:

    Primary mode
    P900 controls
    Tetra controls
    Ticks
    Camera
    Stage

P900 controls:

    Show P900 states
    Show external edges

Tetra controls:

    L/R channel opacity
    Show tetra faces
    Show tetra edges
    Show spinors
    Spinor opacity
    Show trurtle
    Show color edges

Shared controls remain outside the mode-specific cards:

    playback / ticks
    camera
    stage

The old overloaded Faces/Edges controls were split into P900-specific and tetra-specific selectors.
