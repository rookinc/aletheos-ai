# G900 channel renderer containment fix 001

Status: `channel_renderer_containment_fix_recorded`

Verdict: `channel_renderer_containment_fix_passed`

## Diagnosis

The channel escaped the witness window, not the boundary contract.

The renderer was valid but latched onto a broad page host, producing a page-wide spine. This was a rendering placement bug, not a registry or theorem failure.

## Fix

- renderer now targets the actual stage canvas
- overlay canvas is synced to the stage canvas rectangle
- no body-wide or viewport-wide fallback remains
- stale Layer 3 copy is patched toward admitted/display-only language

## Boundary

- channel count remains `1`
- channel registry unchanged: `True`
- static body unchanged: `True`
- carriers unchanged: `True`
- stage unchanged: `True`
- marker lighting: `false`
- mutates body: `false`
- force claim: `false`
- physics claim: `false`
