# G900 channel renderer HTTP smoke 001

Status: `channel_renderer_http_smoke_recorded`

Verdict: `channel_renderer_http_smoke_passed`

This smoke test checks the served browser path after explicit channel renderer enablement.

## Served paths

- lab: `http://127.0.0.1:8000/labs/g900_observatory/lab.html`
- renderer: `http://127.0.0.1:8000/labs/g900_observatory/kernel/g900_channel_renderer_v0.js`
- channels: `http://127.0.0.1:8000/labs/g900_observatory/data/g900_channels.v0.1.json`
- enablement receipt: `http://127.0.0.1:8000/labs/g900_observatory/artifacts/json/g900_explicit_channel_renderer_enablement_001.v1.json`

## Result

- lab served: `True`
- renderer served: `True`
- channel registry served: `True`
- enablement receipt served: `True`
- lab loads renderer once: `True`
- renderer targets channel id: `True`
- channel count: `1`
- renderer enabled: `True`
- renders channel: `True`
- mutates body: `False`
- marker lighting: `False`
- force claim: `False`
- physics claim: `False`

## Boundary

This is an HTTP smoke only. It admits no new channel and mutates no body.
