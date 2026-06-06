# Add Constructor Rotate Toolbar

Status: UI control addition

Added a rotate toolbar above the stage.

Controls:

    Auto
        off by default
        off means rocker buttons step once
        on means rocker buttons start/stop continuous rotation

    Pitch
        on/off flag
        Up / Down rocker buttons

    Yaw
        on/off flag
        Left / Right rocker buttons

    Roll
        on/off flag
        CCW / CW rocker buttons

Camera:

    added camera.roll
    projection now applies yaw, pitch, and roll
    manual drag rotation remains available

Boundary:

    this is a view-control feature only
    it does not alter P900 artifact data or simulator semantics
