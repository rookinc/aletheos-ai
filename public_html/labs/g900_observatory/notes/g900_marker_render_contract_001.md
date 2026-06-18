# G900 marker render contract 001

Status: `marker_render_contract_recorded`

Verdict: `marker_render_contract_recorded_without_renderer`

This artifact defines the read-only render contract for a future unsupported 6/9 anomaly marker renderer.

It does not add a renderer and does not light the marker.

## Binding

- event id: `g900_return_cell_event_562162c72753c818`
- marker id: `unsupported_phase_step_6_9`
- binding id: `g900_marker_event_binding_1d645b31e5366deb`
- render contract id: `g900_marker_render_contract_2f8f21a3465a71d3`

## Effect now

- render contract recorded: `true`
- renderer enabled now: `false`
- gate open now: `false`
- lights marker now: `false`
- admits channel now: `false`
- renders channel now: `false`
- mutates body: `false`
- channel count: `0`

## Future renderer rules

A future renderer must be read-only, must use existing audited marker edges only, must require a gate recheck, must not mutate the body, must not admit or render a channel, must not use a timer as an event, and must not make force or physics claims.

## Boundary

This is a render contract only. It enables no renderer, opens no gate, lights no marker, admits no channel, renders no channel, mutates no body, and makes no force or physics claim.
