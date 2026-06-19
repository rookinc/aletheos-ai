# G900 transport choice F0001 slot14 edgehit18 origin probe 047

Status: `passed`

Verdict: `g900_transport_choice_f0001_slot14_edgehit18_origin_probe_047_recorded`

Origin status: `slot14_eighteen_hits_explained_as_4_internal_plus_14_boundary_no_law_no_promotion`

## Question

Why does slot 14 have edge_hit_count 18?

## Answer

047 parses root-smoke carrier entries and tests whether edge_hit_count=18 is explained as carrier-entry cardinality in slot14.

It records the decomposition of slot14 as four internal carrier entries plus fourteen boundary carrier entries.

That gives eighteen total signature parts.

It promotes no source law.

It admits no permission channel.

It admits no information transport.

## Summary

- `root_smoke_universe_row_count` count `900` status `input`
- `target_surface_row_count` count `60` status `input`
- `slot14_row_count` count `60` status `not_promoted`
- `edge_hit18_row_count` count `60` status `not_promoted`
- `signature_entry18_row_count` count `60` status `not_promoted`
- `slot14_internal_4_boundary_14_all_rows` count `1` status `not_promoted`
- `global_edge_hit_equals_signature_entry_count` count `1` status `diagnostic`
- `slot14_signature_part_count` count `18` status `profile_only`
- `source_law_promotions` count `0` status `locked`
- `admission_promotions` count `0` status `locked`

## Selector tests

- `slot=14` selected `60` tp `60` fp `0` fn `0` exact `true` status `exact_chamber_handle_not_law`
- `edge_hit_count=18` selected `60` tp `60` fp `0` fn `0` exact `true` status `exact_count_handle_not_law`
- `signature_entry_count=18` selected `60` tp `60` fp `0` fn `0` exact `true` status `signature_entry_count_exact_not_law`
- `carrier_sum=18` selected `60` tp `60` fp `0` fn `0` exact `true` status `carrier_sum_exact_not_law`
- `internal_entry_count=4` selected `254` tp `60` fp `194` fn `0` exact `false` status `internal_count_handle_not_law`
- `boundary_entry_count=14` selected `60` tp `60` fp `0` fn `0` exact `true` status `boundary_count_handle_not_law`
- `internal_entry_count=4 AND boundary_entry_count=14` selected `60` tp `60` fp `0` fn `0` exact `true` status `carrier_split_exact_not_law`
- `slot=14 AND signature_entry_count=18` selected `60` tp `60` fp `0` fn `0` exact `true` status `chamber_cardinality_exact_not_law`
- `slot=14 AND internal=4 AND boundary=14` selected `60` tp `60` fp `0` fn `0` exact `true` status `chamber_carrier_split_exact_not_law`
- `max_pair=10:4` selected `130` tp `60` fp `70` fn `0` exact `false` status `superset_signature_profile_not_generator`

## Slot profiles

- slot `0` rows `60` target `0` edge hits `13:18 | 7:11 | 9:11 | 5:8 | 10:3 | 6:3 | 12:2 | 16:2 | 17:1 | 11:1` entries `13:18 | 7:11 | 9:11 | 5:8 | 10:3 | 6:3 | 12:2 | 16:2 | 17:1 | 11:1` split `2+5:11 | 2+7:11 | 3+10:11 | 1+4:8 | 4+9:7 | 2+4:3 | 3+9:2 | 4+12:2 | 3+7:2 | 5+12:1 | 2+8:1 | 3+8:1`
- slot `1` rows `60` target `0` edge hits `9:24 | 13:18 | 6:8 | 5:3 | 16:2 | 14:2 | 17:2 | 10:1` entries `9:24 | 13:18 | 6:8 | 5:3 | 16:2 | 14:2 | 17:2 | 10:1` split `2+7:24 | 3+10:18 | 2+4:8 | 1+4:3 | 4+12:2 | 4+10:2 | 3+7:1 | 4+13:1 | 5+12:1`
- slot `2` rows `60` target `0` edge hits `5:40 | 9:20` entries `5:40 | 9:20` split `1+4:40 | 2+7:20`
- slot `3` rows `60` target `0` edge hits `9:60` entries `9:60` split `2+7:60`
- slot `4` rows `60` target `0` edge hits `9:41 | 13:19` entries `9:41 | 13:19` split `2+7:41 | 3+10:19`
- slot `5` rows `60` target `0` edge hits `9:37 | 12:23` entries `9:37 | 12:23` split `2+7:37 | 3+9:23`
- slot `6` rows `60` target `0` edge hits `9:49 | 5:11` entries `9:49 | 5:11` split `2+7:49 | 1+4:11`
- slot `7` rows `60` target `0` edge hits `9:40 | 12:20` entries `9:40 | 12:20` split `2+7:40 | 3+9:20`
- slot `8` rows `60` target `0` edge hits `12:60` entries `12:60` split `3+9:60`
- slot `9` rows `60` target `0` edge hits `12:60` entries `12:60` split `3+9:60`
- slot `10` rows `60` target `0` edge hits `13:60` entries `13:60` split `3+10:60`
- slot `11` rows `60` target `0` edge hits `16:60` entries `16:60` split `4+12:60`
- slot `12` rows `60` target `0` edge hits `16:60` entries `16:60` split `4+12:60`
- slot `13` rows `60` target `0` edge hits `16:60` entries `16:60` split `4+12:60`
- slot `14` rows `60` target `60` edge hits `18:60` entries `18:60` split `4+14:60`

## Slot14 signature parts

- `slot_05_internal_carrier:5:4` count `60` kind `internal_carrier`
- `slot_08_internal_carrier:5:4` count `60` kind `internal_carrier`
- `slot_10_internal_carrier:5:4` count `60` kind `internal_carrier`
- `slot_14_internal_carrier:5:4` count `60` kind `internal_carrier`
- `slot_pair_05_10_boundary_carrier:10:1` count `60` kind `boundary_carrier`
- `slot_pair_05_14_boundary_carrier:10:1` count `60` kind `boundary_carrier`
- `slot_pair_08_14_boundary_carrier:10:1` count `60` kind `boundary_carrier`
- `slot_pair_10_14_boundary_carrier:10:1` count `60` kind `boundary_carrier`
- `slot_pair_00_05_boundary_carrier:6:1` count `60` kind `boundary_carrier`
- `slot_pair_02_08_boundary_carrier:6:1` count `60` kind `boundary_carrier`
- `slot_pair_03_08_boundary_carrier:6:1` count `60` kind `boundary_carrier`
- `slot_pair_04_05_boundary_carrier:6:1` count `60` kind `boundary_carrier`
- `slot_pair_07_10_boundary_carrier:6:1` count `60` kind `boundary_carrier`
- `slot_pair_08_13_boundary_carrier:6:1` count `60` kind `boundary_carrier`
- `slot_pair_10_11_boundary_carrier:6:1` count `60` kind `boundary_carrier`
- `slot_pair_13_14_boundary_carrier:6:1` count `60` kind `boundary_carrier`
- `slot_pair_06_13_boundary_carrier:2:1` count `60` kind `boundary_carrier`
- `slot_pair_12_13_boundary_carrier:2:1` count `60` kind `boundary_carrier`

## Counts

Root-smoke universe rows: `900`

Target surface rows: `60`

Slot14 rows: `60`

Edge-hit 18 rows: `60`

Signature-entry 18 rows: `60`

Carrier-sum 18 rows: `60`

Internal-entry 4 rows: `254`

Boundary-entry 14 rows: `60`

Internal 4 plus boundary 14 rows: `60`

Slot14 all edge-hit 18: `true`

Slot14 all signature-entry 18: `true`

Slot14 all 4 internal plus 14 boundary: `true`

Global edge_hit_count equals signature entry count: `true`

Global edge_hit_count equals carrier sum: `true`

Promoted source laws: `0`

Promoted families: `0`

Promoted admissions: `0`

Current admitted permission channels: `1`

Current admitted information transports: `1`

## Interpretation

046 showed slot14 equals edge_hit18 equals the target surface.

047 shows why the chamber has eighteen hits inside the root-smoke signature layer.

The chamber has four internal carrier entries.

The chamber has fourteen boundary carrier entries.

Together they form eighteen signature parts.

This explains the count locally.

It does not derive the split from upstream construction.

The next ascent is to derive the 4 plus 14 split without treating hit_signature anatomy as the generator.

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

The chamber has eighteen hits because it carries four internal entries and fourteen boundary entries. Now derive the split.
