# G900 return-cell selector field-origin audit 001

Status: `return_cell_selector_field_origin_audit_passed`

Verdict: `partial_selector_field_origin_pass_transition_lengths_remain_residual`

This audit checks where the label-free return-cell selector fields come from.

## Selected cell

`['03_09', '09_12', '06_12', '06_13']`

## Derived without full60 package rows

`['boundary_carrier_presence', 'dominant_root_sequence', 'root_pattern_abbc']`

## Residual fields

`['transition_len_sequence']`

## Interpretation

Boundary-carrier presence is derived from the carrier registry.

Dominant root sequence and the `a,b,b,c` root pattern are derived from the high-endpoint rule.

The transition-length sequence `[3, 1, 2, 3]` still comes from full60 transition rows and remains the residual field for a carrier/source-incidence derivation.

This still does not admit a channel.

## Boundary

This is a field-origin audit only. It admits no channels, renders no channels, mutates no body, lights no marker, and makes no force or physics claim.
