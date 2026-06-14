# Perfect Return Cell sheet-flip projection 001

Status: verified_not_active

This checkpoint declares Projection Mode 2 for the Perfect Return Cell.

## Mode 2

Path:

    W-X-Y-Z-T-I-T-Z-Y-X-W

This is the sheet-flip return path. It travels from W to I through the chain and returns by reversing the chain.

## Boundary

G60 remains the source object.

The sheet-flip path is a projection witness only. It is not the source object, not a physical-force derivation, and not the active rendered cell.

Mode 1 remains active:

    W-X-Y-Z-T-I-W

Mode 2 is now validated but not active:

    W-X-Y-Z-T-I-T-Z-Y-X-W

## Validation

- status: verified_not_active
- passed: 12 of 12
- shape: registered_boundary_flux/artifacts/json/perfect_return_sheet_flip_shape.v1.json
- receipt: registered_boundary_flux/artifacts/json/perfect_return_sheet_flip.validation.v1.json

## Key distinction

Mode 1 closes by the cyclic edge I-W.

Mode 2 returns by reverse-chain sheet flip:

    I-T-Z-Y-X-W
