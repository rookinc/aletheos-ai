# P900 Simulator Overdrive

Status: renderer refinement

The simulator intentionally breaks the 900-state artifact boundary after the checkpoint.

Behavior:

    0..900:
        artifact reveal

    at 900:
        auto-pause once

    after user presses play again:
        simulator overdrive begins
        sim_states continues beyond 900
        overdrive = sim_states - 900
        visual renders post-900 echo layers

Boundary:

    artifact_states remains 900
    post-900 states are simulated, not theorem-backed P900 states
    internal G60 thalion edges are still not added
