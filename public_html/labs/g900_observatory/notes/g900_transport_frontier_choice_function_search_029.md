# G900 transport frontier choice function search 029

Status: `passed`

Verdict: `frontier_choice_function_search_029_recorded`

Search status: `choice_hypotheses_found_no_admission`

## Question

Do any native, non-label-leaking structural fields define stable choice hypotheses over the quarantined frontier?

## Answer

029 searched for compact structural choice hypotheses.

It did not admit anything.

## Search source

Candidate source:

`labs/g900_observatory/artifacts/csv/g900_transport_deferred_gate_frontier_full_audit_018b_rows.v1.csv`

Candidate rows searched:

`71`

## Strong search fields

- `A`
- `B`
- `C`
- `D`
- `E`

## Caution fields

These fields were structurally visible but not used in the strong search because they contain selector-like values such as `03_09`.

- none

## Search counts

Total hypotheses found:

`545`

Hypotheses written to CSV:

`250`

Non-singleton candidate hypotheses:

`317`

Singleton too-sharp hypotheses:

`222`

Small-bucket hypotheses:

`254`

Medium-bucket hypotheses:

`63`

Broad-bucket hypotheses:

`6`

Blocked hypothesis count:

`165`

## Best non-singleton hypotheses

- `H0001` `E=11` bucket `2` status `choice_hypothesis_candidate_not_admission`
- `H0002` `E=12` bucket `2` status `choice_hypothesis_candidate_not_admission`
- `H0003` `D=6` bucket `3` status `choice_hypothesis_candidate_not_admission`
- `H0004` `A=14` bucket `4` status `choice_hypothesis_candidate_not_admission`
- `H0005` `B=5` bucket `4` status `choice_hypothesis_candidate_not_admission`
- `H0006` `B=8` bucket `4` status `choice_hypothesis_candidate_not_admission`
- `H0007` `C=3` bucket `4` status `choice_hypothesis_candidate_not_admission`
- `H0008` `C=4` bucket `4` status `choice_hypothesis_candidate_not_admission`
- `H0009` `D=7` bucket `4` status `choice_hypothesis_candidate_not_admission`
- `H0010` `D=9` bucket `4` status `choice_hypothesis_candidate_not_admission`


## Bookkeeping patch

The first 029 run correctly found choice hypotheses without admission.

Its pass flag was false only because boundary facts such as no new admission, no family claim, no physics claim, and no body mutation were encoded as false checks rather than `no_*` true checks.

The artifact was patched without changing the search results.

## Interpretation

A choice hypothesis may nominate.

It cannot admit.

A compact selector over `A B C D E` is still only a possible choice function unless 030 shows it is stable, non-leaking, and constructively grounded.

## Guardrail

A choice function may nominate.

Only provenance can promote.

## Current ledger

Admitted permission channels: `1`

Admitted information transports: `1`

New permission channels admitted by this search: `0`

New information transports admitted by this search: `0`

## Boundary

This search admits no new permission channel.

It admits no new information transport.

It declares no new flux witness.

It makes no transport family claim.

It makes no global uniqueness claim.

It claims no physical transport.

It claims no physical flux.

It claims no energy flow.

It claims no force.

It claims no physics.

It does not mutate the G900 body.

It adds no vertices.

It adds no edges.

## Keeper

A choice function may nominate. Only provenance can promote.
