# G900 G15 working trace readout format 001

Status: `g15_trace_readout_format_tightened`

## Purpose

Tighten the G15 working trace readout by removing the duplicated role prefix.

## Before

`M_W:W -> W -> scalar_surface_actual_result`

## After

`M_W -> W -> scalar_surface_actual_result`

## Boundary

- Cosmetic/readability repair only.
- Viewer surface only.
- Bounded working placement convention only.
- No theorem.
- No WXYZTI alignment admission.
- No scalar admission.
- No physics claim.
- No force claim.
