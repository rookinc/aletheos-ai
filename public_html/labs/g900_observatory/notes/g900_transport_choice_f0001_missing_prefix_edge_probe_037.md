# G900 transport choice F0001 missing prefix edge probe 037

Status: `passed`

Verdict: `transport_choice_f0001_missing_prefix_edge_probe_037_recorded`

Probe status: `f0001_missing_prefix_edge_classified_no_derivation_no_promotion`

## Question

Why is the terminal prefix pair `B C` / `04 05` excluded from F0001?

## Answer

037 classifies the omission.

It does not derive it.

In F0001, the missing pair is the prefix terminal role edge.

The missing edge is visible in source/context artifacts.

Visibility is not derivation.

No source law is promoted.

No permission channel is admitted.

No information transport is admitted.

## F0001 result

Path variables: `B C D E`

Path values: `05 04 03 09`

Role tokens: `03_04 03_09 05_04`

Tuple tokens: `tuple_edge_609 tuple_edge_614 tuple_edge_921`

Missing variable pair: `B C`

Missing value pair: `04 05`

Missing role token: `05_04`

Omission class: `missing_prefix_terminal_edge`

Source-visible hit count: `43`

Construction-source hit count: `16`

## Pattern summary

- `037-P1` `f0001_missing_prefix_terminal_edge` hits `1/1` exact `true` status `local_omission_handle_not_source_law`
- `037-P2` `repeated_family_path_match` hits `65/87` exact `false` status `descriptive_pattern_not_source_law`
- `037-P3` `exact_one_missing_subset` hits `18/87` exact `false` status `descriptive_pattern_not_source_law`
- `037-P4` `missing_prefix_terminal_edge_across_repeated_families` hits `10/87` exact `false` status `not_global_source_law`
- `037-P5` `forbidden_prefix_edge_is_source_visible` hits `43/652` exact `false` status `visibility_not_derivation`
- `037-P6` `no_admission_promotion` hits `1/1` exact `true` status `no_promotion`

## Omission classes across repeated families

- `missing_non_role_edge`: `1`
- `missing_prefix_terminal_edge`: `10`
- `missing_suffix_terminal_edge`: `7`
- `not_exact_one_missing`: `69`

## Interpretation

036 showed that F0001 has an exact local path-subset grammar.

037 shows that the omitted pair is not missing because the edge is absent.

The forbidden pair is a visible terminal role edge.

So the lock is sharper now:

the rule is not merely the path.

the rule is the path plus a forbidden first step.

This still does not explain why the first step is forbidden.

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

The rule is not the path. The rule is the path plus the forbidden first step.
