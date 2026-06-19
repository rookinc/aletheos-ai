# G900 transport choice F0001 strength native probe 052

Status: `passed`

Verdict: `g900_transport_choice_f0001_strength_native_probe_052_recorded`

Strength status: `local_strength_handle_exact_global_strength_not_native_no_promotion`

## Question

Is strong native, or is it only a fitted local threshold?

## Answer

052 tests the strength handle from 051 globally and locally.

Global strength is not native in the tested family.

The global row-count threshold selects too many carriers.

The global slot-presence threshold also selects too many carriers.

Slot14-local strength remains exact.

Inside the slot14 incident edge set, the three strong edges are 05-14, 08-14, and 10-14.

The weak visible edge is 13-14.

So strong is currently a slot14-local rank/support handle.

It is not yet a promoted source law.

## Summary

- `boundary_carrier_universe_count` count `30` status `input`
- `target_anchor_incident_carrier_count` count `3` status `evaluation_target`
- `global_ge180_selected_count` count `29` status `not_native`
- `slot14_local_ge180_selected_count` count `3` status `local_handle`
- `slot14_local_top3_selected_count` count `3` status `local_handle`
- `target_handle_slot14_unique` count `1` status `diagnostic`
- `all_slots_strict_top3_gap` count `0` status `diagnostic`
- `slots_with_180_cut_count` count `2` status `diagnostic`
- `source_law_promotions` count `0` status `locked`
- `admission_promotions` count `0` status `locked`

## Selector tests

- `global carrier strength global_row_count >= 180` selected `29` target `3` tp `3` fp `26` fn `0` exact `false` status `not_native_global_threshold_selects_too_much`
- `global carrier strength slot_presence_count >= 3` selected `29` target `3` tp `3` fp `26` fn `0` exact `false` status `not_native_global_presence_selects_too_much`
- `slot14-local global_row_count >= 180` selected `3` target `3` tp `3` fp `0` fn `0` exact `true` status `exact_slot14_local_strength_handle_not_law`
- `slot14-local slot_presence_count >= 3` selected `3` target `3` tp `3` fp `0` fn `0` exact `true` status `exact_slot14_local_presence_handle_not_law`
- `slot14-local top3 incident carriers` selected `3` target `3` tp `3` fp `0` fn `0` exact `true` status `exact_slot14_local_rank_handle_not_law`
- `slots whose self plus top3 handle equals target anchors` selected `1` target `1` tp `1` fp `0` fn `0` exact `true` status `diagnostic_target_handle_slot14_unique_not_source_law`

## Slot14 local strength

Slot14 incident carriers by strength: `slot_pair_05_14_boundary_carrier slot_pair_08_14_boundary_carrier slot_pair_10_14_boundary_carrier slot_pair_13_14_boundary_carrier`

Slot14 incident global counts: `196 180 180 120`

Slot14 top3 carriers: `slot_pair_05_14_boundary_carrier slot_pair_08_14_boundary_carrier slot_pair_10_14_boundary_carrier`

Slot14 top3 neighbors: `05 08 10`

Slot14 weak carrier: `slot_pair_13_14_boundary_carrier`

Slot14 weak neighbor: `13`

Slot14 rank gap third minus fourth: `60`

## Recovered status

Target anchors: `05 08 10 14`

Target anchor incident carriers: `slot_pair_05_14_boundary_carrier slot_pair_08_14_boundary_carrier slot_pair_10_14_boundary_carrier`

Slot14 local ge180: `slot_pair_05_14_boundary_carrier slot_pair_08_14_boundary_carrier slot_pair_10_14_boundary_carrier`

Slot14 local top3: `slot_pair_05_14_boundary_carrier slot_pair_08_14_boundary_carrier slot_pair_10_14_boundary_carrier`

Slots whose self plus top3 handle equals target anchors: `14`

Slots with 180 cut between third and fourth incident carrier: `13 14`

## Interpretation

051 recovered the anchors as slot14 plus its three strongest incident carriers.

052 shows that the word strong cannot yet be promoted as a global native rule.

It works locally at slot14.

It works as a rank handle.

It works as a support handle.

But the same raw global thresholds are too broad across the 30-carrier universe.

The next step is to replace numeric strength with a structural reason for why 13-14 is the weak incident edge.

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

Strong is local, not yet native. Now derive why 13-14 is the weak incident edge.
