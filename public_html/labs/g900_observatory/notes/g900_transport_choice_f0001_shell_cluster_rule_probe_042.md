# G900 transport choice F0001 shell cluster rule probe 042

Status: `passed`

Verdict: `transport_choice_f0001_shell_cluster_rule_probe_042_recorded`

Cluster-rule status: `shell_cluster_local_selector_with_upstream_support_no_rule_no_promotion`

## Question

Does the denied first-step cluster come from an upstream construction rule, or is it only a source-hit shell fingerprint?

## Answer

042 tests the seven-term shell cluster from 041 against pair-matrix evidence and upstream construction rows.

It records local selector evidence.

It records upstream support evidence.

It proves no upstream construction rule.

It promotes no source law.

It admits no permission channel.

It admits no information transport.

## Cluster terms

- `rail_slot_pair:04_05`
- `rail_internal_slot:05`
- `rail_internal_slot:08`
- `rail_internal_slot:10`
- `rail_internal_slot:14`
- `rail_slot_pair:05_10`
- `rail_slot_pair:05_14`

## Summary

- `denied_full_cluster` count `1` status `not_promoted`
- `allowed_full_cluster_count` count `0` status `not_promoted`
- `upstream_full_cluster_row_count` count `60` status `co_visibility_not_rule`
- `upstream_lock_edge_row_count` count `798` status `co_visibility_not_rule`
- `upstream_lock_with_outer_witness_row_count` count `216` status `co_visibility_not_rule`
- `source_law_promotions` count `0` status `locked`
- `admission_promotions` count `0` status `locked`

## Tests

- `042-T1` `denied_pair_has_full_shell_cluster_in_041_matrix` result `true` status `fingerprint_not_rule`
- `042-T2` `allowed_pairs_lack_full_shell_cluster_in_041_matrix` result `true` status `fingerprint_not_rule`
- `042-T3` `full_shell_cluster_selects_denied_pair_locally` result `true` status `local_selector_not_source_law`
- `042-T4` `upstream_full_cluster_row_exists` result `true` status `co_visibility_not_rule`
- `042-T5` `upstream_lock_with_outer_shell_witness_exists` result `true` status `co_visibility_not_rule`
- `042-T6` `source_law_promotion` result `false` status `locked_zero`
- `042-T7` `admission_promotion` result `false` status `locked_zero`

## Counts

Pair-cluster rows: `6`

Cluster source rows: `14592`

Denied cluster present count: `7`

Denied full cluster: `true`

Allowed full-cluster count: `0`

Upstream full-cluster row count: `60`

Upstream lock-edge row count: `798`

Upstream outer-witness row count: `1354`

Upstream lock-with-outer-witness row count: `216`

Promoted source laws: `0`

Promoted families: `0`

Promoted admissions: `0`

Current admitted permission channels: `1`

Current admitted information transports: `1`

## Interpretation

041 showed that a coherent shell-position cluster surrounds the denied first step.

042 asks whether that shell cluster is already a rule.

The answer remains bounded.

The shell cluster can name the lock.

It can select the local denied pair.

It can point to upstream construction rows.

But co-visibility is not derivation.

The rule still has to be derived from a source field, not read from token co-occurrence.

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

The shell named the lock. Now test whether the lock has a rule.
