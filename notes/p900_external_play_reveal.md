# P900 External Play Reveal

Status: renderer refinement

P900 External now uses the existing play/tick controls as a reveal animation.

Boundary:

    The D4 growth engine is still not treated as the source of P900.
    Its current tick count is only used as a browser-side reveal counter.

Behavior:

    tick 0 shows no P900 states
    tick N shows the first N P900 states and edges whose endpoints are visible
    tick 900 shows the full external P900 scaffold
