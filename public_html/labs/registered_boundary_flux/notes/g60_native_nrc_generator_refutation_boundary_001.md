# G60-native NRC generator refutation boundary 001

Status: g60_native_nrc_generator_refutation_boundary_recorded

## Keeper

The NRC witness survives; the tested generator family does not.

## Claim

No deterministic NRC generator was found in the tested strict source-field or address-readable source-field feature families. This refutes the tested ranking-rule generator family, not the admission-blind NRC witness and not the source-native WXYZTI witness form.

## What succeeded before this boundary

- admission_blind_nrc_witness_exact: true
- source_native_wxyzti_witness_form_found: true
- wxyzti_form_exact_over_120: true
- accepted: 4
- false_positives: 0
- misses: 0

## What failed here

- strict_source_field_generator_found: false
- address_readable_generator_found: false
- winning_family: null
- local_gap_a_nrc_generator_success: false

## Tested family

- strict_source_field_meaning: "Uses only source record fields B,A,C,C_plus_1, column pair, deltas, shared-column counts, reverse-closure checks, and handedness."
- address_readable_meaning: "Allows slot/fiber/address readout from B + C_plus_1 in addition to strict fields."
- admission_blind: "Generator construction does not use the admitted label. Admission is checked only afterward."
- strict_selector_pair_count_tested: 2360
- strict_exact_found: false
- address_selector_pair_count_tested: 3128
- address_exact_found: false

## Boundary

- refutes_tested_generator_family: true
- refutes_nrc_witness: false
- refutes_source_native_wxyzti_witness_form: false
- gap_a_closed: false
- full_g900_admission_found: false
- physical_interpretation_claimed: false

## Not claimed

- does not disprove the NRC witness
- does not disprove the WXYZTI witness form
- does not disprove a G60-native generator outside the tested feature family
- does not close Gap A
- does not prove full G900

## Next question

Can a generator be derived from the canonical G60 / AT4val[60,6] source object itself, rather than from ranked source-field candidate features on the 120-record reconstruction?

## Checks

- PASS source_status_negative: g60_native_nrc_generator_not_found_in_tested_family
- PASS strict_not_found: False
- PASS address_not_found: False
- PASS no_winning_family: None
- PASS local_gap_a_generator_false: False
- PASS source_native_wxyzti_generator_false: False
- PASS gap_a_open: False
- PASS full_g900_false: False
