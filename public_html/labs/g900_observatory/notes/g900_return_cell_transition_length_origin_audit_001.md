# G900 return-cell transition-length origin audit 001

Status: `return_cell_transition_length_origin_audit_passed`

Verdict: `transition_lengths_derived_in_tested_carrier_incidence_family`

This audit tests whether the residual return-cell transition-length sequence can be derived from carrier/source incidence in the tested feature family.

## Selected cell

`['03_09', '09_12', '06_12', '06_13']`

Target transition lengths:

`[3, 1, 2, 3]`

## Result

- exact global hit count: `3`
- exact global hit features: `['low_endpoint|high_endpoint', 'high_endpoint|endpoint_gap', 'endpoint_sum_mod15|endpoint_gap_mod15']`
- transition lengths remain residual: `False`
- channel count: `0`

## Boundary

This is a transition-length origin audit only. It admits no channels, renders no channels, mutates no body, lights no marker, and makes no force or physics claim.
