# G900 black-box simulator fork manifest 001

Status: `passed`

Verdict: `g900_blackbox_simulator_fork_manifest_001_recorded`

Manifest status: `blackbox_simulator_fork_created_true_path_lock_preserved`

Branch: `g900-blackbox-sim-fork`

## Purpose

This manifest forks the work into a black-box simulator path while preserving the true path lock.

The true path remains responsible for finishing or discharging the black boxes before any physics claim.

The simulator fork may use the current black box as an explicit assumption.

## Track split

- `true_path` status `hard_locked`: Finish or discharge black boxes before claiming physics.
- `simulator_fork` status `allowed`: Use black boxes as explicit assumptions for exploratory simulation only.

## Fork definition

Allow exploratory physics-like simulation using the currently mapped G900 black boxes as declared simulator assumptions, while preserving the true path lock that no physics claim may be made until the black boxes are generated or otherwise discharged.

## True path lock

The G900 F0001 seam remains identifiable but not generated. Physics claims require black-box completion or an explicitly separate empirical bridge. The simulator fork may use the black box as an assumption, not as a theorem.

## Allowed simulator uses

- simulate internal graph-state evolution using declared black-box mappings
- use F0001 seam behavior as a simulator assumption
- render physics-like fields, flows, or potentials as exploratory visuals
- define toy observables on the graph
- compare simulated behavior across parameter settings
- generate hypotheses for later theorem or empirical work
- label every output with black_box_assumption_version

## Forbidden claims

- physical transport claim
- physical flux claim
- energy flow claim
- force claim
- gravity claim
- electromagnetism claim
- strong or weak interaction claim
- unification claim
- geometry claim
- spacetime claim
- body mutation of the G900 theorem object
- new permission channel admission
- new information transport admission
- viewer gate opening
- marker lighting as physical event
- black-box simulator result presented as proof

## Required labels on simulator outputs

- black_box_simulation
- exploratory
- not_physics_claim
- not_channel_admission
- not_body_mutation
- assumption_version_required

## Summary

- `fork_manifest` count `1` status `manifest`
- `true_path_lock` count `1` status `hard_lock`
- `simulator_fork_allowed` count `1` status `sandbox`
- `allowed_use_count` count `7` status `sandbox_rules`
- `forbidden_claim_count` count `16` status `guardrail`
- `physics_claims` count `0` status `locked_zero`
- `new_admissions` count `0` status `locked_zero`

## Boundary

This fork manifest promotes no source law.

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

The true path finishes the black box. The fork lets the black box move.
