# G900 transport candidate family census scaffold 013

Status: `passed`

Verdict: `transport_candidate_family_census_scaffold_ready`

## Question

How should G900 ask whether the admitted return-cell transport repeats?

## Honest starting point

The current ledger contains:

- admitted permission channels: `1`
- admitted bounded finite information transports: `1`
- known transport: `g900_return_cell_one_step_information_transport_007`

The previous status audit said:

`only_one_transport_admitted_not_uniqueness_proof`

That means one admitted transport is real, but it is not yet a family and not yet a uniqueness theorem.

## Purpose

This scaffold defines the next census before running it.

It does not search for new transports.

It does not admit new transports.

It does not claim a family.

It does not claim uniqueness.

## Fixed body search space

The fixed G900 body has:

- vertices: `900`
- edges: `3600`
- directed edge readings if oriented both ways: `7200`
- slots parsed from vertex ids: `15`
- locals per slot minimum: `60`
- locals per slot maximum: `60`
- undirected slot-pair supports: `45`
- directed slot-pair supports: `45`

## Census ladder

A future census candidate must pass the same ladder as the return-cell case.

1. Candidate universe defined before scoring.
2. Source packet `P` generated before target packet `Q`.
3. Target packet `Q` uses existing G900 body edges only.
4. Successor rule `R` deterministically realizes `P` as `Q`.
5. Admission gate passes before permission channel admission.
6. Permission channel is admitted before transport admission.
7. One-step history `h(0)->h(1)` is supported.
8. Named conserved observable is preserved exactly.
9. Flux witness is declared only after transport.
10. Physical overclaims remain false.

## Required refusal

The census must not quietly preselect the known return-cell answer.

The known return-cell packet may appear as a positive control, but the search must be able to generate misses, near misses, and any other candidates from the same rules.

## Boundary

This scaffold makes no family claim.

It makes no uniqueness claim.

It admits no new permission channel.

It admits no new information transport.

It declares no new flux witness.

It does not claim physical transport.

It does not claim physical flux.

It does not claim energy flow.

It does not claim force.

It does not claim physics.

It does not mutate the G900 body.

## Next artifact

The next artifact should be a first bounded candidate census.

Suggested name:

`g900_transport_candidate_family_census_014`

Its job should be to run a small bounded census and report:

- exact closes
- near misses
- failed candidates
- whether the known return-cell transport appears without preselection

## Keeper

Before asking whether the seed repeats, define what would count as another seed.
