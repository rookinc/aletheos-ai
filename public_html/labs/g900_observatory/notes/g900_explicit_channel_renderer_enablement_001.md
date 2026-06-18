# G900 explicit channel renderer enablement 001

Status: `explicit_channel_renderer_enabled`

Verdict: `explicit_channel_renderer_enablement_passed`

This artifact enables display rendering for the admitted return-cell channel.

## Channel

- channel id: `g900_return_cell_channel_1bed7a7cba65a7be`
- renderer id: `g900-return-cell-channel-renderer`
- canvas id: `g900-return-cell-channel-canvas`

## What changed

- wrote `public_html/labs/g900_observatory/kernel/g900_channel_renderer_v0.js`
- added the renderer script tag to `public_html/labs/g900_observatory/lab.html`
- backed up the previous lab HTML at `public_html/labs/g900_observatory/artifacts/json/g900_lab_html_pre_channel_renderer_enablement_001.v1.json`

## Boundary

The channel is rendered as display only.

- channel registry unchanged: `True`
- static body unchanged: `True`
- carriers unchanged: `True`
- existing stage JS unchanged: `True`
- marker lighting: `false`
- marker gate open: `false`
- mutates body: `false`
- force claim: `false`
- physics claim: `false`

Next problem: HTTP smoke the live lab.
