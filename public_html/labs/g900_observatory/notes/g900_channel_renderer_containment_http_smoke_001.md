# G900 channel renderer containment HTTP smoke 001

Status: `channel_renderer_containment_http_smoke_recorded`

Verdict: `channel_renderer_containment_http_smoke_passed`

This smoke test checks the served browser path after the containment fix.

## Result

- lab served: `True`
- renderer served: `True`
- channel registry served: `True`
- containment fix receipt served: `True`
- lab loads renderer once: `True`
- UI copy mentions admitted: `True`
- UI copy mentions one admitted: `True`
- zero admitted removed: `True`
- renderer is stage contained: `True`
- renderer has no global fallback: `True`
- channel count: `1`
- mutates body: `false`
- marker lighting: `false`
- force claim: `false`
- physics claim: `false`

## Boundary

This is an HTTP smoke only. It admits no new channel and mutates no body.
