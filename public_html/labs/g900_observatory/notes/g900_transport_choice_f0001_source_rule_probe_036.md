# G900 transport choice F0001 source rule probe 036

Status: `passed`

Verdict: `transport_choice_f0001_source_rule_probe_036_recorded`

Probe status: `f0001_local_source_rule_candidate_found_no_promotion`

## Question

Does F0001 contain an exact local source-side grammar, and can it be promoted?

## Answer

F0001 contains an exact local grammar candidate.

It is not promoted.

## Local grammar

F0001 role tokens: `03_04 03_09 05_04`

F0001 tuple tokens: `tuple_edge_609 tuple_edge_614 tuple_edge_921`

Role-path nodes under variable order: `B=05 C=04 D=03 E=09`

Observed F0001 members: `9`

All size 2 and 3 subsets over `B,C,D,E`: `10`

Observed subsets: `9`

Missing subset: `B C`

Missing values: `04 05`

The missing subset is a role edge: `true`

The missing subset is a terminal path edge: `true`

The missing subset is the prefix variable pair: `true`

## Candidate rule

F0001 is exactly:

all size 2 and size 3 subsets of the path-ordered variables `B,C,D,E` except the prefix terminal pair `B C`.

In value form:

all size 2 and size 3 subsets of `05 04 03 09` except `04 05`.

## What this proves

The handle is not arbitrary.

The F0001 family has an exact local path-subset grammar.

## What this does not prove

It does not explain why the prefix terminal pair is omitted.

It does not derive the omission from upstream construction.

It does not promote F0001 to source law.

It does not admit a permission channel.

It does not admit an information transport.

## Counts

Candidate source-rule count: `1`

Promoted source laws: `0`

Promoted families: `0`

Promoted admissions: `0`

Current admitted permission channels: `1`

Current admitted information transports: `1`

## Boundary

This probe admits no new permission channel.

It admits no new information transport.

It declares no new flux witness.

It promotes no source law.

It promotes no family.

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

A handle can name the door. Only a rule can open it.
