# G900 transport choice F0001 slot14 hub leaf source probe 050

Status: `passed`

Verdict: `g900_transport_choice_f0001_slot14_hub_leaf_source_probe_050_recorded`

Source status: `conditional_hub_leaf_carrier_reconstruction_exact_no_law_no_promotion`

## Question

Why hub 13 and leaves 00 02 03 04 06 07 11 12?

## Answer

050 uses the full 30-carrier boundary graph and conditions on the four anchor hubs.

The return hub is selected as the unique non-anchor endpoint with two anchor neighbors.

The leaves are selected as non-anchor endpoints with one anchor neighbor or adjacency to the hub.

The omitted endpoints are selected as non-anchor endpoints with no anchor neighbor and no hub adjacency.

These source roles reconstruct the fourteen 049 boundary carriers.

It promotes no source law.

It admits no permission channel.

It admits no information transport.

## Summary

- `endpoint_slot_universe_count` count `15` status `input`
- `anchor_count` count `4` status `context`
- `source_hub_count` count `1` status `not_promoted`
- `source_leaf_count` count `8` status `not_promoted`
- `source_omitted_count` count `2` status `not_promoted`
- `predicted_carrier_count` count `14` status `not_promoted`
- `carrier_reconstruction_exact` count `1` status `not_promoted`
- `source_law_promotions` count `0` status `locked`
- `admission_promotions` count `0` status `locked`

## Selector tests

- `hub source rule: non-anchor and two anchor neighbors` selected `1` target `1` tp `1` fp `0` fn `0` exact `true` status `conditional_source_handle_not_law`
- `leaf source rule: non-anchor and one anchor neighbor or connected to hub` selected `8` target `8` tp `8` fp `0` fn `0` exact `true` status `conditional_source_handle_not_law`
- `omitted source rule: non-anchor, no anchor neighbor, not connected to hub` selected `2` target `2` tp `2` fp `0` fn `0` exact `true` status `conditional_source_handle_not_law`
- `target node reconstruction: anchors plus hub plus leaves` selected `13` target `13` tp `13` fp `0` fn `0` exact `true` status `conditional_node_reconstruction_not_law`
- `carrier reconstruction: inner plus spoke plus outer rules` selected `14` target `14` tp `14` fp `0` fn `0` exact `true` status `conditional_carrier_reconstruction_not_law`
- `inner tie reconstruction: both endpoints anchors` selected `4` target `4` tp `4` fp `0` fn `0` exact `true` status `conditional_inner_reconstruction_not_law`
- `anchor spoke reconstruction: one anchor to leaf or hub` selected `8` target `8` tp `8` fp `0` fn `0` exact `true` status `conditional_spoke_reconstruction_not_law`
- `outer return reconstruction: hub to zero-anchor leaf` selected `2` target `2` tp `2` fp `0` fn `0` exact `true` status `conditional_outer_reconstruction_not_law`

## Recovered sets

Anchor nodes: `05 08 10 14`

Target hub: `13`

Source hub: `13`

Target leaves: `00 02 03 04 06 07 11 12`

Source leaves: `00 02 03 04 06 07 11 12`

Target omitted: `01 09`

Source omitted: `01 09`

Target carriers: `14`

Predicted carriers: `14`

Predicted inner ties: `4`

Predicted anchor spokes: `8`

Predicted outer returns: `2`

## Conditional rules

Hub rule: non-anchor endpoint with exactly two full-carrier neighbors in the anchor set.

Leaf rule: non-anchor endpoint that is not hub and has one anchor neighbor or adjacency to the hub.

Omitted rule: non-anchor endpoint that is not hub, not leaf, has no anchor neighbor, and has no hub adjacency.

Inner carrier rule: carrier whose two endpoints are anchors.

Spoke carrier rule: carrier with exactly one anchor endpoint and the other endpoint a source leaf or source hub.

Outer carrier rule: carrier joining source hub to a zero-anchor-neighbor source leaf.

## Interpretation

049 showed the fourteen carriers form a five-hub, eight-leaf boundary graph.

050 reconstructs that graph from full-carrier adjacency conditioned on the four anchors.

That is a stronger source handle.

It is still conditional.

It does not yet derive the anchors.

The next ascent is to test whether the four anchor hubs 05 08 10 14 are native, rather than imported from the inner-tie context.

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

The hub and leaves are conditionally reconstructed from anchor-neighbor adjacency. Now derive the anchors.
