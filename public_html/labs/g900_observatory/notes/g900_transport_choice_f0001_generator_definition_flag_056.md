# G900 transport choice F0001 generator definition flag 056

Status: `passed`

Verdict: `g900_transport_choice_f0001_generator_definition_flag_056_recorded`

Definition status: `generator_satisfaction_definition_planted_phase_plateau_named`

## Purpose

056 plants the flag for what would satisfy a F0001 seam generator.

This is not another seam search.

It defines the finish line.

## Generator definition

A F0001 seam generator is an explicit rule `G` which, given an allowed pre-role source universe `U` and only non-leaking source fields, outputs the seam carrier `13-14` as a necessary construction result, not as a post-hoc selection.

Short form:

`A generator is satisfied when a pre-role rule produces 13-14 without using 13, 14, slot14, return-hub role, anchor labels, 180-cut status, target labels, or post-hoc fingerprints.`

## Distinctions

- Fingerprint: `13-14 is uniquely recognizable.`
- Handle: `13-14 is structurally nameable after some grammar is known.`
- Generator: `13-14 is produced by an earlier admissible rule.`

## Required criteria

- `056-C1` `input_discipline`: G uses only declared pre-role source universe U and non-leaking source fields.
- `056-C2` `constructive_output`: G outputs the seam carrier object, not merely a property that recognizes it.
- `056-C3` `exactness`: generated set equals target set, with no missing and no extra carriers.
- `056-C4` `non_circularity`: G does not depend on target labels, endpoint identity, later roles, cut grammar, or post-hoc fingerprints.
- `056-C5` `scope_declared`: G declares local, family, or global scope before evaluation.
- `056-C6` `receipt_boundary`: A failed generator search may close as a bounded negative only if it states the tested family.

## Forbidden inputs

- target seam label
- carrier identity label
- endpoint identity 13-14
- literal endpoint pair 13 and 14
- slot14 label unless independently generated before this rule
- return-hub role unless independently generated before this rule
- anchor labels unless independently generated before this rule
- 180-cut grammar unless independently generated before this rule
- admission status
- viewer or renderer state
- exact selector discovered by looking at the target first
- post-hoc scalar fingerprint used as a cause

## Allowed scopes

- `local_F0001_generator`: Given the F0001 chamber source packet, G generates the F0001 seam. Acceptable now: `true`
- `family_generator`: For every comparable chamber in the tested family, G generates the corresponding seam. Acceptable now: `true`
- `global_generator`: Across the full carrier universe, G generates all and only seams of this type. Acceptable now: `false`

## Phase conclusion rule

Generator found:

`A non-leaking pre-role rule constructs the seam under one declared scope.`

Generator not found in tested family:

`All exact pre-role selectors in the tested family remain fingerprints or handles, and no constructive rule is promoted.`

## Current phase reading

- After 053: the weak edge is the return-hub seam.
- After 054: the seam is identifiable but not yet generated.
- After 055: pre-role fingerprints find the seam but still do not generate it.
- After 056: the generator definition is planted and the current phase has a formal finish line.

## Summary

- `definition_flag` count `1` status `definition_only`
- `required_criteria_count` count `6` status `definition_only`
- `forbidden_input_count` count `12` status `guardrail`
- `allowed_scope_count` count `3` status `definition_only`
- `current_phase_status` count `1` status `plateau_flag`
- `source_law_promotions` count `0` status `locked`
- `family_promotions` count `0` status `locked`
- `admission_promotions` count `0` status `locked`

## Boundary

This flag promotes no source law.

It promotes no family.

It admits no permission channel.

It admits no information transport.

It declares no new flux witness.

It makes no transport family claim.

It makes no global uniqueness claim.

It claims no physical transport.

It claims no physical flux.

It claims no energy flow.

It claims no force.

It claims no physics.

It makes no geometry claim.

It does not mutate the G900 body.

It adds no vertices.

It adds no edges.

## Keeper

A fingerprint finds the seam. A generator must produce it.
