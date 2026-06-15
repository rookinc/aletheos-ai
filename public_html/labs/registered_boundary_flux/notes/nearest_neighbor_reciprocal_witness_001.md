# Nearest-neighbor reciprocal witness 001

Status: nearest_neighbor_reciprocal_witness_recorded

## Keeper

The witness is the nearest neighbor that answers back.

## Definition

For a record x, NRC(x) is the local reciprocal witness context formed when x is answered by its nearest transport neighbors: one side preserves local anchor context and the reciprocal side answers through reverse_partner. The witness is the trace left by that reciprocal return.

## Witness map

W_NRC(x) = sharp_fiber_sequence(x)

## Admission rule

x is admitted iff W_NRC(x) is in W_NRC(A)

## Result

Within the declared 120-record carrier, B + C_plus_1 address frame, and anchor-and-reverse transport grammar, sharp_fiber_sequence is an exact internal reciprocal witness for the admitted four.

## Fit

- accepted_count: 4
- false_positive_count: 0
- miss_count: 0
- exact_over_120_record_carrier: true
- grade: "Grade 1 internal reciprocal witness"

## Admitted trace class

- ["[0, 2, 5, 0, 2, 5, 0]"]
- ["[10, 13, 11, 10, 13, 11, 10]"]
- ["[14, 11, 13, 14, 11, 13, 14]"]
- ["[2, 4, 5, 2, 4, 5, 2]"]

## Not claimed

- not external independence
- not validated full closure
- not full 41-seam lift
- not full G900
- not Gap A closure
- not physical interpretation

## Corrected question

Not: can the witness avoid context? But: is the context priced as nearest-neighbor reciprocal coupling?

## Next question

Can the NRC witness be derived directly from nearest-neighbor reciprocal couple structure, rather than only named from sharp_fiber_sequence after the fit?

## Checks

- PASS plateau_loaded
- PASS strict_loaded
- PASS sharp_fiber_sequence
- PASS accepted_4
- PASS false_positive_zero
- PASS miss_zero
- PASS basic_return_not_exact
- PASS transport_specific
- PASS gap_a_open
