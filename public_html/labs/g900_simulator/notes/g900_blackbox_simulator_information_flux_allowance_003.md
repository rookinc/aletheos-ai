# G900 black-box simulator information flux allowance 003

Status: `passed`

Verdict: `g900_blackbox_simulator_information_flux_allowance_003_recorded`

Allowance status: `information_can_simulate_force_flux_energy_readouts_physical_claims_locked`

Branch: `g900-blackbox-sim-fork`

## Purpose

003 amends the simulator registry to allow information to simulate force-like, physical-flux-like, and energy-flow-like readouts.

This means finite graph-information simulation outputs inside the simulator fork.

It does not mean physical force.

It does not mean physical flux.

It does not mean physical energy flow.

It does not mean physics.

## Allowed

`information_flux`

`force_like_simulation`

`physical_flux_like_simulation`

`energy_flow_like_simulation`

## Required labels

`information_flux_simulation`

`simulated_force_readout`

`simulated_physical_flux_readout`

`simulated_energy_flow_readout`

`not_force_claim`

`not_physical_flux_claim`

`not_energy_flow_claim`

`not_physics_claim`

## Still forbidden as claims

`physical_force`

`physical_flux`

`physical_energy_flow`

`physics`

`geometry`

`new information transport admission`

`new permission channel admission`

`body mutation`

## New assumption meaning

`SIM-BB-007 simulated_information_flux_observable`

The simulator may compute and render information flux, force-like readouts, physical-flux-like readouts, and energy-flow-like readouts as finite graph-information simulation outputs over declared simulator assumptions and admitted information-transport records.

It may not reinterpret those readouts as physical force, physical flux, physical energy flow, field strength, geometry, spacetime, or a new admitted transport.

## Summary

- `information_flux_allowance` count `1` status `allowed_in_sandbox`
- `force_like_simulation_allowance` count `1` status `allowed_in_sandbox`
- `physical_flux_like_simulation_allowance` count `1` status `allowed_in_sandbox`
- `energy_flow_like_simulation_allowance` count `1` status `allowed_in_sandbox`
- `physical_claims` count `0` status `locked_zero`
- `new_permission_channel_admitted` count `0` status `locked_zero`
- `new_information_transport_admitted` count `0` status `locked_zero`

## Boundary

This allowance promotes no source law.

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

Information may simulate force, flux, and energy-flow readouts. Physical claims remain locked.
