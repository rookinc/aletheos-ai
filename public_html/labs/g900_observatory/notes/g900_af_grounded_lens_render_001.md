# G900 A/F grounded lens render 001

Status: `viewport_witness_overlay_rendered`

Commit: `3015f11`
Tag: `g900-af-grounded-lens-render-001`

## What changed

The A-grounded F-return lens now has a first visual reading in the G900 Scope.

When the A/F Lens toggle is ON, the viewer renders a viewport-only witness overlay:

- an A ground marker
- an F scoped-terminal marker
- a return-reading curve from F toward A

This is a screen-space witness overlay. It is not a graph-body operation.

## Receipt fields

When the A/F Lens is OFF:

- `grounded_lens.mode = off`
- `grounded_lens.active_lens_count = 0`
- `grounded_lens.return_read_visible = false`
- `grounded_lens.render_allowed_now = false`

When the A/F Lens is ON:

- `grounded_lens.mode = a_grounded_f_return_lens`
- `grounded_lens.active_lens_count = 1`
- `grounded_lens.return_read_visible = true`
- `grounded_lens.render_allowed_now = true`
- `grounded_lens.render_kind = viewport_witness_overlay`

## Boundary

The overlay bends the reading, not the body.

No body-coordinate claim.

No movement of terminal F.

No added vertices.

No added edges.

No graph-body mutation.

No channel admission.

No marker lighting.

No gate opening.

No transport relation claim.

No force claim.

No physics claim.

No GR claim.

No Maxwell/QCD/electroweak/unification claim.

## Keeper

The overlay bends the reading, not the body.
