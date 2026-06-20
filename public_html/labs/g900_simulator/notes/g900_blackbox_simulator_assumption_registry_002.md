# G900 black-box simulator assumption registry 002

Status: `passed`

Verdict: `g900_blackbox_simulator_assumption_registry_002_recorded`

Registry status: `blackbox_assumption_registry_recorded_simulator_inputs_named`

Branch: `g900-blackbox-sim-fork`

## Purpose

002 names the black boxes the simulator fork is allowed to use.

This does not run a simulation.

This does not make a physics claim.

This does not admit a new channel or information transport.

## Registered simulator assumptions

- `SIM-BB-001` `fixed_g900_body`: The simulator may read the fixed G900 body/register state as its static substrate. Status: `body_fixed_not_physics`
- `SIM-BB-002` `admitted_permission_channel_registry`: The simulator may treat the current admitted permission channel count and records as fixed ledger inputs. Status: `registry_fixed`
- `SIM-BB-003` `admitted_information_transport_registry`: The simulator may use the single admitted finite information transport as a graph information-transfer primitive. Status: `registry_fixed`
- `SIM-BB-004` `f0001_return_hub_seam_plateau`: The simulator may use the F0001 seam as visible, identifiable, role/cut handled, and pre-role fingerprinted. Status: `identifiable_not_generated`
- `SIM-BB-005` `f0001_generator_gap`: The simulator may label any F0001 seam behavior as black-boxed at the generator layer. Status: `missing_pre_role_seam_generator`
- `SIM-BB-006` `pre_role_seam_fingerprint_surface`: The simulator may expose pre-role seam fingerprints as observables or diagnostic fields. Status: `fingerprint_not_generator`

## Required labels on simulator outputs

- black_box_simulation
- exploratory
- not_physics_claim
- not_channel_admission
- not_body_mutation
- assumption_version_required

## Simulator must not claim

- physical transport
- physical flux
- energy flow
- force
- gravity
- electromagnetism
- strong interaction
- weak interaction
- unification
- geometry
- spacetime
- new permission channel
- new information transport
- body mutation

## Summary

- `assumption_registry` count `1` status `registry`
- `assumption_count` count `6` status `assumption_layer`
- `required_output_label_count` count `6` status `guardrail`
- `admitted_permission_channel_count` count `1` status `fixed_input`
- `admitted_information_transport_count` count `1` status `fixed_input`
- `new_permission_channel_admitted` count `0` status `locked_zero`
- `new_information_transport_admitted` count `0` status `locked_zero`
- `physics_claim` count `0` status `locked_zero`

## True path lock

The true path remains locked.

The missing pre-role seam generator is still unfinished.

The simulator may use named black boxes as assumptions, not as theorem completions.

## Boundary

This registry promotes no source law.

It promotes no family.

It admits no permission channel.

It admits no information transport.

It declares no flux witness.

It makes no transport family claim.

It makes no global uniqueness claim.

It claims no physical transport.

It claims no physical flux.

It claims no energy flow.

It claims no force.

It claims no physics.

It makes no geometry claim.

It does not mutate the G900 theorem body.

It adds no vertices.

It adds no edges.

## Keeper

The simulator may move only what the registry names.
