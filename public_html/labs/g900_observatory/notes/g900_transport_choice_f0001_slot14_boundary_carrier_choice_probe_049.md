# G900 transport choice F0001 slot14 boundary carrier choice probe 049

Status: `passed`

Verdict: `g900_transport_choice_f0001_slot14_boundary_carrier_choice_probe_049_recorded`

Choice status: `boundary_carrier_graph_handle_found_no_source_law_no_promotion`

## Question

Why these fourteen boundary carriers, and not another 4+8+2 boundary split?

## Answer

049 treats the fourteen boundary carriers as a graph over their endpoint slots.

The chosen carriers form one connected boundary graph.

The graph has thirteen endpoint slots.

The graph has eight leaves and five degree-four nodes.

The four internal anchors are degree-four nodes.

There is one additional non-anchor degree-four node, the return hub.

The two outer returns both attach to that return hub.

This is a sharper carrier-choice handle.

It promotes no source law.

It admits no permission channel.

It admits no information transport.

## Summary

- `boundary_carrier_universe_count` count `30` status `input`
- `target_boundary_carrier_count` count `14` status `profile_only`
- `target_graph_vertex_count` count `13` status `profile_only`
- `target_graph_connected` count `1` status `profile_only`
- `degree_profile_1x8_4x5` count `1` status `profile_only`
- `anchor_count_4` count `1` status `profile_only`
- `return_hub_count_1` count `1` status `profile_only`
- `outer_returns_incident_to_return_hub` count `1` status `profile_only`
- `source_law_promotions` count `0` status `locked`
- `admission_promotions` count `0` status `locked`

## Target graph profile

- `target_carrier_count` = `14` status `profile_only`
- `target_vertex_count` = `13` status `profile_only`
- `component_count` = `1` status `profile_only`
- `degree_profile` = `1:8 | 4:5` status `profile_only`
- `anchor_nodes` = `05 08 10 14` status `profile_only`
- `degree4_nodes` = `05 08 10 13 14` status `profile_only`
- `return_hub_nodes` = `13` status `profile_only`
- `leaf_nodes` = `00 02 03 04 06 07 11 12` status `profile_only`
- `inner_tie_carriers` = `slot_pair_05_10_boundary_carrier slot_pair_05_14_boundary_carrier slot_pair_08_14_boundary_carrier slot_pair_10_14_boundary_carrier` status `profile_only`
- `anchor_spoke_carriers` = `slot_pair_00_05_boundary_carrier slot_pair_02_08_boundary_carrier slot_pair_03_08_boundary_carrier slot_pair_04_05_boundary_carrier slot_pair_07_10_boundary_carrier slot_pair_08_13_boundary_carrier slot_pair_10_11_boundary_carrier slot_pair_13_14_boundary_carrier` status `profile_only`
- `outer_return_carriers` = `slot_pair_06_13_boundary_carrier slot_pair_12_13_boundary_carrier` status `profile_only`

## Selector tests

- `carrier in 048 target profile` selected `14` tp `14` fp `0` fn `0` exact `true` status `exact_profile_handle_not_law`
- `slot14_occurrence_count=60` selected `14` tp `14` fp `0` fn `0` exact `true` status `slot14_membership_exact_but_quarantined`
- `target_surface_occurrence_count=60` selected `14` tp `14` fp `0` fn `0` exact `true` status `target_surface_membership_exact_but_quarantined`
- `anchor-relative dominant value union` selected `5` tp `5` fp `0` fn `9` exact `false` status `anchor_value_candidate_not_law`
- `target-context class value union` selected `14` tp `14` fp `0` fn `0` exact `true` status `exact_context_handle_not_law`
- `anchor_hit_count=2` selected `4` tp `4` fp `0` fn `10` exact `false` status `inner_tie_candidate_superset_or_subset`
- `anchor_hit_count=1` selected `8` tp `8` fp `0` fn `6` exact `false` status `anchor_spoke_candidate_superset`
- `touches_return_hub=true` selected `4` tp `4` fp `0` fn `10` exact `false` status `return_hub_incidence_handle_not_law`

## Target carriers

- `slot_pair_00_05_boundary_carrier` class `anchor_spoke` value `6:1` endpoints `00-05` degree-pair `1:4`
- `slot_pair_02_08_boundary_carrier` class `anchor_spoke` value `6:1` endpoints `02-08` degree-pair `1:4`
- `slot_pair_03_08_boundary_carrier` class `anchor_spoke` value `6:1` endpoints `03-08` degree-pair `1:4`
- `slot_pair_04_05_boundary_carrier` class `anchor_spoke` value `6:1` endpoints `04-05` degree-pair `1:4`
- `slot_pair_05_10_boundary_carrier` class `inner_tie` value `10:1` endpoints `05-10` degree-pair `4:4`
- `slot_pair_05_14_boundary_carrier` class `inner_tie` value `10:1` endpoints `05-14` degree-pair `4:4`
- `slot_pair_06_13_boundary_carrier` class `outer_return` value `2:1` endpoints `06-13` degree-pair `1:4`
- `slot_pair_07_10_boundary_carrier` class `anchor_spoke` value `6:1` endpoints `07-10` degree-pair `1:4`
- `slot_pair_08_13_boundary_carrier` class `anchor_spoke` value `6:1` endpoints `08-13` degree-pair `4:4`
- `slot_pair_08_14_boundary_carrier` class `inner_tie` value `10:1` endpoints `08-14` degree-pair `4:4`
- `slot_pair_10_11_boundary_carrier` class `anchor_spoke` value `6:1` endpoints `10-11` degree-pair `4:1`
- `slot_pair_10_14_boundary_carrier` class `inner_tie` value `10:1` endpoints `10-14` degree-pair `4:4`
- `slot_pair_12_13_boundary_carrier` class `outer_return` value `2:1` endpoints `12-13` degree-pair `1:4`
- `slot_pair_13_14_boundary_carrier` class `anchor_spoke` value `6:1` endpoints `13-14` degree-pair `4:4`

## Counts

Boundary carrier universe count: `30`

Target boundary carrier count: `14`

Target graph vertex count: `13`

Target graph edge count: `14`

Target graph component count: `1`

Target graph connected: `true`

Degree profile 1x8 and 4x5: `true`

Anchor nodes: `05 08 10 14`

Degree-four nodes: `05 08 10 13 14`

Return hub nodes: `13`

Leaf nodes: `00 02 03 04 06 07 11 12`

Inner ties: `4`

Anchor spokes: `8`

Outer returns: `2`

Outer returns incident to return hub: `true`

Promoted source laws: `0`

Promoted families: `0`

Promoted admissions: `0`

Current admitted permission channels: `1`

Current admitted information transports: `1`

## Interpretation

048 explained boundary14 as four inner ties, eight anchor spokes, and two outer returns.

049 shows that the exact fourteen carriers are not just a bag of carriers.

They form a connected boundary graph with five degree-four hubs and eight leaves.

Four of the hubs are the internal anchors.

The fifth hub is the return hub.

The two outer returns attach to that hub.

This is stronger than the 4+8+2 count.

It still does not derive the upstream source construction that chooses this graph.

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

The fourteen carriers form a five-hub, eight-leaf boundary graph. Now derive the hub and leaves.
