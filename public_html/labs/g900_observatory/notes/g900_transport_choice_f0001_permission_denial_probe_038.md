# G900 transport choice F0001 permission denial probe 038

Status: `passed`

Verdict: `transport_choice_f0001_permission_denial_probe_038_recorded`

Probe status: `f0001_permission_denial_visibility_profile_recorded_no_promotion`

## Question

What distinguishes the visible terminal edge `04 05` from the F0001 pairs allowed to enter the local grammar?

## Answer

Within F0001, the denied pair is exactly the prefix terminal path edge.

The edge is visible.

Its visibility profile is distinctive in the tested scan.

Visibility profile does not grant permission.

The prefix-terminal denial is local, not global.

No source law is promoted.

No permission channel is admitted.

No information transport is admitted.

## Patch note

The first 038 run failed one expectation.

That failure was useful.

It showed that the denied edge is not merely visible.

It has a distinctive source-visibility profile in the tested scan.

This patch records that signal without promoting it.

## F0001 pair profile

- `B C` values `05 04` class `prefix_terminal_edge` permission `denied_visible_edge`
- `B D` values `05 03` class `skip_one_jump` permission `allowed_local_member`
- `B E` values `05 09` class `long_jump` permission `allowed_local_member`
- `C D` values `04 03` class `internal_adjacent_edge` permission `allowed_local_member`
- `C E` values `04 09` class `skip_one_jump` permission `allowed_local_member`
- `D E` values `03 09` class `suffix_terminal_edge` permission `allowed_local_member`

## Candidate rules

- `038-R1` `f0001_denial_is_prefix_terminal_position` hit `true` scope `F0001` status `local_permission_denial_candidate_not_law`
- `038-R2` `visibility_profile_distinguishes_denial_in_scan` hit `true` scope `F0001 source scan` status `visibility_profile_not_source_law`
- `038-R3` `visibility_profile_does_not_grant_permission` hit `true` scope `ledger` status `visibility_profile_not_permission`
- `038-R4` `prefix_terminal_denial_not_global` hit `true` scope `87 repeated families` status `not_global_source_law`
- `038-R5` `permission_denial_not_promoted` hit `true` scope `ledger` status `no_promotion`

## Counts

F0001 pair count: `6`

Allowed pair count: `5`

Denied pair count: `1`

Denied source-hit count: `48`

Denied construction-surface hit count: `17`

Allowed source-hit counts: `[1, 1, 52, 37, 236]`

Allowed construction-surface hit counts: `[1, 1, 19, 16, 73]`

Visibility profile distinguishes denial: `true`

037 repeated family count: `87`

037 prefix-terminal missing count: `10`

Candidate local permission-denial rules: `1`

Promoted source laws: `0`

Promoted families: `0`

Promoted admissions: `0`

Current admitted permission channels: `1`

Current admitted information transports: `1`

## Interpretation

037 showed that the forbidden edge is visible.

038 separates visibility from permission.

The local distinction inside F0001 is positional:

the denied edge is the prefix terminal first step.

The tested source scan also gives the denied edge a distinctive visibility profile.

That is a useful diagnostic handle.

It is not a source law.

It is not permission.

It does not globalize across all repeated families.

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

The edge is visible. The first step is denied.
