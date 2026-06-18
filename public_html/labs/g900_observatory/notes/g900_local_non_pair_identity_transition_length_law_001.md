# G900 local non-pair-identity transition-length law 001

Status: `local_non_pair_identity_transition_length_law_recorded`

Verdict: `candidate_local_non_pair_identity_transition_length_law_passed`

This artifact attacks the remaining channel blocker directly.

## Target

The return-cell transition-length sequence is:

`[3, 1, 2, 3]`

for candidate pairs:

`['03_09', '09_12', '06_12', '06_13']`

## Law

Let `r=1` when the high endpoint repeats in the oriented cell, otherwise `r=0`.

Let `o` be the occurrence rank among that repeated high endpoint, with `o=0` for nonrepeated highs.

Then:

`transition_length = 3 - 2*r + o`

## Result

- predicted candidate lengths: `[3, 1, 2, 3]`
- target candidate lengths: `[3, 1, 2, 3]`
- candidate law exact: `True`
- non-pair-identity: `True`
- P7 scope check exact: `True`
- global package law claimed: `false`

## Boundary

This is a candidate-local law artifact only. It does not admit a channel, enable a renderer, render a channel, mutate the body, light a marker, open a gate, or make a force or physics claim.
