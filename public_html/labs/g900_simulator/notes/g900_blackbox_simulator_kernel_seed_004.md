# G900 black-box simulator kernel seed 004

Status: `passed`

Verdict: `g900_blackbox_simulator_kernel_seed_004_recorded`

Kernel status: `simulator_kernel_seed_recorded_readouts_named_no_execution`

Branch: `g900-blackbox-sim-fork`

## Purpose

004 defines the first simulator kernel seed.

It names the state object.

It names the allowed readout vocabulary.

It names future update words.

It does not execute dynamics.

It does not render physics.

It does not make a physics claim.

## Seed state

State id: `g900_blackbox_simulator_state_seed_0000`

Tick: `0`

Body status: `read_only`

Execution status: `not_executed_seed_only`

## Readouts

- `information_flux`: finite graph-information flux readout inside the simulator Not: `physical flux`
- `force_like`: information-driven force-like readout inside the simulator Not: `physical force`
- `physical_flux_like`: information-driven physical-flux-like readout inside the simulator Not: `physical flux`
- `energy_flow_like`: information-driven energy-flow-like readout inside the simulator Not: `physical energy flow`

## Future update words

- `hold`: advance no state; preserve seed values Runs now: `false`
- `step_information_flux`: future update may compute dimensionless information flux from declared assumptions Runs now: `false`
- `project_force_like`: future projection may derive a force-like simulator readout from information flux Runs now: `false`
- `project_physical_flux_like`: future projection may derive a physical-flux-like simulator readout from information flux Runs now: `false`
- `project_energy_flow_like`: future projection may derive an energy-flow-like simulator readout from information flux Runs now: `false`

## Required labels

- black_box_simulation
- exploratory
- not_physics_claim
- not_channel_admission
- not_body_mutation
- assumption_version_required
- information_flux_simulation
- simulated_force_readout
- simulated_physical_flux_readout
- simulated_energy_flow_readout
- not_force_claim
- not_physical_flux_claim
- not_energy_flow_claim

## Summary

- `kernel_seed` count `1` status `seed`
- `readout_count` count `4` status `readout_vocabulary`
- `update_word_count` count `5` status `vocabulary_only`
- `assumption_stack_count` count `7` status `assumption_layer`
- `new_permission_channel_admitted` count `0` status `locked_zero`
- `new_information_transport_admitted` count `0` status `locked_zero`
- `physics_claim` count `0` status `locked_zero`
- `body_mutation` count `0` status `locked_zero`

## Boundary

This seed starts no simulator dynamics.

It promotes no source law.

It promotes no family.

It admits no permission channel.

It admits no information transport.

It declares no physical flux witness.

It makes no transport family claim.

It makes no physical force claim.

It makes no physical flux claim.

It claims no physical energy flow.

It claims no physics.

It makes no geometry claim.

It does not mutate the G900 theorem body.

It adds no vertices.

It adds no edges.

## Keeper

A simulator kernel may name motion before it moves.
