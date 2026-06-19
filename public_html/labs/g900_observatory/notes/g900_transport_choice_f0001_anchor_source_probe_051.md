# G900 transport choice F0001 anchor source probe 051

Status: `passed`

Verdict: `g900_transport_choice_f0001_anchor_source_probe_051_recorded`

Source status: `slot14_strong_incident_anchor_handle_found_no_law_no_promotion`

## Question

Why anchors 05 08 10 14?

## Answer

051 tests whether the anchor set can be recovered without importing the inner-tie class.

The exact handle is slot14 itself plus the three strongest slot14 incident boundary carriers in the full root-smoke carrier universe.

Strong can be read three equivalent local ways in this probe.

First, global root-smoke row count at least 180.

Second, slot presence count at least 3.

Third, top three slot14 incident carriers by global row count.

All three recover the same anchor handle.

The recovered set is 05 08 10 14.

The visible return-hub edge 13-14 is excluded by this local strength handle.

It promotes no source law.

It admits no permission channel.

It admits no information transport.

## Summary

- `endpoint_slot_universe_count` count `15` status `input`
- `target_anchor_count` count `4` status `evaluation_target`
- `slot14_incident_neighbor_count` count `4` status `profile_only`
- `slot14_strong_incident_neighbors_ge_180` count `3` status `not_promoted`
- `slot14_presence_neighbors_ge_3` count `3` status `not_promoted`
- `exact_nonquarantined_anchor_handle_count` count `3` status `not_promoted`
- `source_law_promotions` count `0` status `locked`
- `admission_promotions` count `0` status `locked`

## Slot14 incident carriers

- neighbor `05` carrier `slot_pair_05_14_boundary_carrier` global `196` slots `4` selected_ge180 `true` target_anchor `true`
- neighbor `08` carrier `slot_pair_08_14_boundary_carrier` global `180` slots `3` selected_ge180 `true` target_anchor `true`
- neighbor `10` carrier `slot_pair_10_14_boundary_carrier` global `180` slots `3` selected_ge180 `true` target_anchor `true`
- neighbor `13` carrier `slot_pair_13_14_boundary_carrier` global `120` slots `2` selected_ge180 `false` target_anchor `false`

## Selector tests

- `slot14 self plus slot14 incident global_row_count >= 180` selected `4` target `4` tp `4` fp `0` fn `0` exact `true` status `exact_slot14_frequency_handle_not_law`
- `slot14 self plus slot14 incident slot_presence_count >= 3` selected `4` target `4` tp `4` fp `0` fn `0` exact `true` status `exact_slot14_presence_handle_not_law`
- `slot14 self plus top3 incident carriers by global_row_count` selected `4` target `4` tp `4` fp `0` fn `0` exact `true` status `exact_slot14_rank_handle_not_law`
- `slot14 adjacency only` selected `4` target `4` tp `3` fp `1` fn `1` exact `false` status `includes_return_hub_not_exact`
- `slot14 closed neighborhood` selected `5` target `4` tp `4` fp `1` fn `0` exact `false` status `includes_return_hub_not_exact`
- `nodes with source_role_050=anchor quarantined` selected `4` target `4` tp `4` fp `0` fn `0` exact `true` status `exact_quarantined_from_050_not_source`
- `nodes with neighbor_count_to_target_anchors >= 2 quarantined` selected `4` target `4` tp `3` fp `1` fn `1` exact `false` status `uses_target_anchor_set_not_source`

## Recovered sets

Target anchors: `05 08 10 14`

Strong incident neighbors ge 180: `05 08 10`

Presence incident neighbors ge 3: `05 08 10`

Top3 incident neighbors by global support: `05 08 10`

Anchor handle ge 180 or self: `05 08 10 14`

Target hub: `13`

Target leaves: `00 02 03 04 06 07 11 12`

Target omitted: `01 09`

## Interpretation

050 reconstructed the hub and leaves conditionally from anchor-neighbor adjacency.

051 gives a slot14-conditioned handle for the anchor set.

The anchors are slot14 plus its three strongest incident carriers.

The return hub 13 remains visible, but its slot14 edge is weaker in this local support profile.

This is better than importing the inner-tie class.

It is still not a native source law.

The next test is whether the strength threshold or rank is native, or whether it is merely fitted to this local chamber.

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

It makes no geometry claim.

It does not mutate the G900 body.

It adds no vertices.

It adds no edges.

## Keeper

The anchors are slot14 plus its three strongest incident carriers. Now test whether strong is native.
