# G900 transport choice F0001 slot14 boundary14 origin probe 048

Status: `passed`

Verdict: `g900_transport_choice_f0001_slot14_boundary14_origin_probe_048_recorded`

Origin status: `slot14_boundary14_explained_as_4_inner_8_spoke_2_outer_no_law_no_promotion`

## Question

Why does slot14 have exactly fourteen boundary entries?

## Answer

048 parses slot14 boundary carriers against the four internal anchors.

It records that slot14 boundary14 decomposes as four inner ties, eight anchor spokes, and two outer returns.

The value bands match the incidence split.

Inner ties carry value 10:1.

Anchor spokes carry value 6:1.

Outer returns carry value 2:1.

It promotes no source law.

It admits no permission channel.

It admits no information transport.

## Summary

- `root_smoke_universe_row_count` count `900` status `input`
- `target_surface_row_count` count `60` status `input`
- `boundary14_row_count` count `60` status `not_promoted`
- `slot14_all_boundary14` count `1` status `not_promoted`
- `slot14_all_4_8_2_incidence_split` count `1` status `not_promoted`
- `slot14_all_value_profile_10_1_4_6_1_8_2_1_2` count `1` status `not_promoted`
- `slot14_boundary_carrier_count` count `14` status `profile_only`
- `source_law_promotions` count `0` status `locked`
- `admission_promotions` count `0` status `locked`

## Selector tests

- `slot=14` selected `60` tp `60` fp `0` fn `0` exact `true` status `exact_chamber_handle_not_law`
- `boundary_entry_count=14` selected `60` tp `60` fp `0` fn `0` exact `true` status `exact_boundary_count_handle_not_law`
- `inner_tie_count=4` selected `254` tp `60` fp `194` fn `0` exact `false` status `superset_inner_tie_not_generator`
- `anchor_spoke_count=8` selected `349` tp `60` fp `289` fn `0` exact `false` status `boundary_spoke_handle_not_law`
- `outer_return_count=2` selected `60` tp `60` fp `0` fn `0` exact `true` status `boundary_return_handle_not_law`
- `inner_tie=4 AND anchor_spoke=8 AND outer_return=2` selected `60` tp `60` fp `0` fn `0` exact `true` status `incidence_split_handle_not_law`
- `boundary values 10:1x4 6:1x8 2:1x2` selected `60` tp `60` fp `0` fn `0` exact `true` status `value_split_handle_not_law`
- `class/value profile inner=10:1x4 spoke=6:1x8 outer=2:1x2` selected `60` tp `60` fp `0` fn `0` exact `true` status `class_value_split_exact_not_law`
- `slot=14 AND boundary_entry_count=14` selected `60` tp `60` fp `0` fn `0` exact `true` status `chamber_boundary_count_exact_not_law`
- `slot=14 AND incidence split 4+8+2` selected `60` tp `60` fp `0` fn `0` exact `true` status `chamber_incidence_split_exact_not_law`

## Slot profiles

- slot `0` rows `60` target `0` boundary `7:13 | 5:11 | 10:11 | 4:11 | 9:9 | 12:3 | 8:2` incidence `inner_tie:1;anchor_spoke:4;outer_return:0:11 | inner_tie:1;anchor_spoke:6;outer_return:0:11 | inner_tie:0;anchor_spoke:4;outer_return:0:8 | inner_tie:4;anchor_spoke:5;outer_return:0:7 | inner_tie:2;anchor_spoke:8;outer_return:0:7 | inner_tie:3;anchor_spoke:6;outer_return:1:4 | inner_tie:1;anchor_spoke:3;outer_return:0:3 | inner_tie:3;anchor_spoke:6;outer_return:0:2 | inner_tie:4;anchor_spoke:8;outer_return:0:2 | inner_tie:3;anchor_spoke:4;outer_return:0:2 | inner_tie:6;anchor_spoke:6;outer_return:0:1 | inner_tie:1;anchor_spoke:6;outer_return:1:1` values `6:1x1;15:4x3;16:4x1:9 | 8:1x4;9:2x1;10:2x1;14:2x3:7 | 6:1x2;9:1x1;13:3x2;14:3x1;15:3x1:4 | 15:4x2;16:5x2:4 | 6:1x2;7:1x2;8:1x1;9:2x1;10:2x2;12:2x1;13:2x1:3 | 15:4x4:3 | 16:4x3;17:5x1:3 | 5:1x1;8:1x4;9:2x1;10:2x1;14:2x3:3 | 8:1x4;10:2x2;14:2x1;15:2x2:2 | 9:1x2;12:2x1;12:3x2;13:3x1;17:3x1:2 | 6:1x2;7:1x2;8:1x1;9:1x1;10:2x2;12:2x1;13:3x1:2 | 6:1x2;7:1x5;8:1x1;11:1x1;12:1x2;12:2x1:2`
- slot `1` rows `60` target `0` boundary `7:25 | 10:20 | 4:11 | 12:3 | 13:1` incidence `inner_tie:1;anchor_spoke:6;outer_return:0:24 | inner_tie:2;anchor_spoke:8;outer_return:0:18 | inner_tie:1;anchor_spoke:3;outer_return:0:8 | inner_tie:0;anchor_spoke:4;outer_return:0:3 | inner_tie:4;anchor_spoke:8;outer_return:0:2 | inner_tie:4;anchor_spoke:6;outer_return:0:2 | inner_tie:2;anchor_spoke:5;outer_return:0:1 | inner_tie:4;anchor_spoke:8;outer_return:1:1 | inner_tie:6;anchor_spoke:6;outer_return:0:1` values `6:1x2;7:1x2;8:1x1;9:2x1;10:2x2;12:2x1;13:2x1:11 | 7:1x2;8:1x2;9:1x1;10:2x3;13:2x1;14:2x1:7 | 8:1x2;11:1x1;12:3x1;13:3x1;13:4x1;16:3x1:4 | 15:4x3;16:4x1:4 | 15:4x4:4 | 9:1x2;12:1x1;12:3x2;13:3x1;17:4x1:3 | 9:1x2;12:1x1;13:3x2;14:3x1;18:4x1:3 | 7:1x7;8:2x1;11:1x3;12:2x1:2 | 8:1x2;12:1x1;12:3x1;13:4x1;14:4x1;16:3x1:2 | 7:1x4;9:1x1;10:1x1;10:2x1;11:2x1;13:2x2:2 | 8:1x2;11:1x1;13:3x2;14:3x1;17:3x1:2 | 8:1x2;11:1x1;12:3x2;13:3x1;16:4x1:2`
- slot `2` rows `60` target `0` boundary `4:40 | 7:20` incidence `inner_tie:0;anchor_spoke:4;outer_return:0:40 | inner_tie:1;anchor_spoke:6;outer_return:0:20` values `17:4x4:38 | 8:1x2;11:1x1;12:3x2;13:3x1;16:4x1:4 | 6:1x2;9:1x1;12:3x2;13:3x1;14:4x1:4 | 7:1x2;10:1x1;13:3x2;14:3x1;16:3x1:4 | 7:1x2;10:1x1;12:3x2;13:3x1;15:4x1:2 | 6:1x2;9:1x1;13:3x2;14:3x1;15:4x1:2 | 7:1x2;10:1x1;13:3x2;14:3x1;16:4x1:2 | 16:4x3;17:5x1:2 | 8:1x2;11:1x1;14:3x2;15:3x1;18:3x1:1 | 8:1x2;11:1x1;13:3x2;14:3x1;17:3x1:1`
- slot `3` rows `60` target `0` boundary `7:60` incidence `inner_tie:1;anchor_spoke:6;outer_return:0:60` values `9:1x2;12:1x1;12:3x2;13:3x1;17:4x1:20 | 9:1x2;12:1x1;13:3x2;14:3x1;18:4x1:12 | 8:1x2;11:1x1;12:3x2;13:3x1;16:4x1:8 | 7:1x2;10:1x1;12:3x2;13:3x1;15:4x1:7 | 6:1x2;9:1x1;12:3x2;13:3x1;14:4x1:5 | 7:1x2;10:1x1;13:3x2;14:3x1;16:4x1:5 | 6:1x2;9:1x1;13:3x2;14:3x1;15:4x1:3`
- slot `4` rows `60` target `0` boundary `7:41 | 10:19` incidence `inner_tie:1;anchor_spoke:6;outer_return:0:41 | inner_tie:2;anchor_spoke:8;outer_return:0:19` values `6:1x2;8:1x1;12:3x3;14:4x1:24 | 6:1x2;8:1x1;13:3x3;15:4x1:10 | 6:1x2;7:1x3;9:1x1;9:2x1;10:2x1;12:3x1;13:2x1:9 | 6:1x2;7:1x3;9:1x1;9:2x1;10:2x1;12:2x1;13:3x1:7 | 6:1x2;8:1x1;12:3x2;13:4x1;14:3x1:5 | 6:1x2;8:1x1;12:3x2;13:4x1;14:4x1:2 | 6:1x4;7:1x1;8:1x1;9:2x1;10:2x1;12:2x1;12:3x1:2 | 6:1x2;7:1x1;8:1x2;9:2x1;10:1x1;10:2x1;12:2x1;14:3x1:1`
- slot `5` rows `60` target `0` boundary `7:37 | 9:23` incidence `inner_tie:1;anchor_spoke:6;outer_return:0:37 | inner_tie:3;anchor_spoke:6;outer_return:0:23` values `8:1x2;9:1x2;9:2x2;14:2x1;15:2x1;15:3x1:13 | 9:1x2;12:1x1;12:3x2;13:3x1;17:4x1:8 | 8:1x4;9:2x2;14:2x2;14:3x1:8 | 8:1x2;11:1x1;12:3x2;13:3x1;16:4x1:6 | 9:1x2;12:1x1;13:3x2;14:3x1;18:4x1:5 | 8:1x2;12:1x1;12:3x2;14:4x1;16:3x1:4 | 6:1x2;9:1x1;12:3x2;13:3x1;14:4x1:4 | 9:1x2;12:3x2;13:1x1;14:4x1;17:4x1:2 | 7:1x2;10:1x1;12:3x2;13:3x1;15:4x1:2 | 7:1x2;11:1x1;12:3x2;14:4x1;15:3x1:2 | 6:1x2;9:1x1;13:3x2;14:3x1;15:4x1:2 | 7:1x2;10:1x1;13:3x2;14:3x1;16:4x1:2`
- slot `6` rows `60` target `0` boundary `7:49 | 4:11` incidence `inner_tie:1;anchor_spoke:6;outer_return:0:49 | inner_tie:0;anchor_spoke:4;outer_return:0:11` values `16:4x3;17:5x1:10 | 8:1x2;12:1x1;12:3x2;14:4x1;16:3x1:7 | 7:1x2;10:1x1;12:3x2;13:3x1;15:4x1:7 | 8:1x2;11:1x1;13:3x2;14:3x1;17:3x1:5 | 6:1x2;9:1x1;12:3x2;13:3x1;14:4x1:5 | 7:1x2;10:1x1;13:3x2;14:3x1;16:4x1:5 | 8:1x2;11:1x1;12:3x2;13:3x1;16:4x1:4 | 8:1x2;12:1x1;13:3x2;15:4x1;17:3x1:3 | 9:1x2;12:1x1;12:3x2;13:3x1;17:4x1:3 | 7:1x2;11:1x1;12:3x2;14:4x1;15:3x1:3 | 6:1x2;9:1x1;13:3x2;14:3x1;15:4x1:3 | 9:1x2;12:1x1;13:3x2;14:3x1;18:4x1:2`
- slot `7` rows `60` target `0` boundary `7:40 | 9:20` incidence `inner_tie:1;anchor_spoke:6;outer_return:0:40 | inner_tie:3;anchor_spoke:6;outer_return:0:20` values `9:1x2;12:1x1;12:3x2;13:3x1;17:4x1:10 | 8:1x2;12:1x1;12:3x2;14:4x1;16:3x1:9 | 9:1x2;12:1x1;13:3x2;14:3x1;18:4x1:6 | 8:1x2;9:1x2;9:2x2;14:2x1;15:2x1;15:3x1:6 | 8:1x4;9:2x2;14:2x2;14:3x1:6 | 7:1x4;9:2x2;12:2x1;13:2x1;13:3x1:6 | 9:1x2;12:3x2;13:1x1;14:4x1;17:4x1:5 | 7:1x2;10:1x1;12:3x2;13:3x1;15:4x1:5 | 7:1x2;10:1x1;13:3x2;14:3x1;16:4x1:3 | 7:1x2;8:1x2;9:2x2;13:2x2;14:3x1:2 | 6:1x2;9:1x1;12:3x2;13:3x1;14:4x1:1 | 6:1x2;9:1x1;13:3x2;14:3x1;15:4x1:1`
- slot `8` rows `60` target `0` boundary `9:60` incidence `inner_tie:3;anchor_spoke:6;outer_return:0:60` values `8:1x2;9:1x2;9:2x2;14:2x1;15:2x1;15:3x1:36 | 8:1x4;9:2x2;14:2x2;14:3x1:14 | 7:1x4;9:2x2;12:2x1;13:2x1;13:3x1:8 | 7:1x2;8:1x2;9:2x2;13:2x2;14:3x1:2`
- slot `9` rows `60` target `0` boundary `9:60` incidence `inner_tie:3;anchor_spoke:6;outer_return:0:60` values `6:1x4;9:2x2;10:1x1;12:3x2:60`
- slot `10` rows `60` target `0` boundary `10:60` incidence `inner_tie:2;anchor_spoke:8;outer_return:0:60` values `6:1x4;7:1x2;9:2x2;12:2x1;12:3x1:60`
- slot `11` rows `60` target `0` boundary `12:60` incidence `inner_tie:4;anchor_spoke:8;outer_return:0:60` values `6:1x4;7:1x3;8:1x1;10:1x2;10:2x1;11:2x1:50 | 6:1x6;7:1x2;10:1x2;10:2x2:10`
- slot `12` rows `60` target `0` boundary `12:60` incidence `inner_tie:4;anchor_spoke:8;outer_return:0:60` values `6:1x4;7:1x4;10:2x1;11:1x2;12:2x1:60`
- slot `13` rows `60` target `0` boundary `12:60` incidence `inner_tie:4;anchor_spoke:8;outer_return:0:60` values `6:1x8;10:1x2;10:2x2:60`
- slot `14` rows `60` target `60` boundary `14:60` incidence `inner_tie:4;anchor_spoke:8;outer_return:2:60` values `2:1x2;6:1x8;10:1x4:60`

## Slot14 boundary carrier profile

- `slot_pair_00_05_boundary_carrier` value `6:1` class `anchor_spoke` rows `60`
- `slot_pair_02_08_boundary_carrier` value `6:1` class `anchor_spoke` rows `60`
- `slot_pair_03_08_boundary_carrier` value `6:1` class `anchor_spoke` rows `60`
- `slot_pair_04_05_boundary_carrier` value `6:1` class `anchor_spoke` rows `60`
- `slot_pair_07_10_boundary_carrier` value `6:1` class `anchor_spoke` rows `60`
- `slot_pair_08_13_boundary_carrier` value `6:1` class `anchor_spoke` rows `60`
- `slot_pair_10_11_boundary_carrier` value `6:1` class `anchor_spoke` rows `60`
- `slot_pair_13_14_boundary_carrier` value `6:1` class `anchor_spoke` rows `60`
- `slot_pair_05_10_boundary_carrier` value `10:1` class `inner_tie` rows `60`
- `slot_pair_05_14_boundary_carrier` value `10:1` class `inner_tie` rows `60`
- `slot_pair_08_14_boundary_carrier` value `10:1` class `inner_tie` rows `60`
- `slot_pair_10_14_boundary_carrier` value `10:1` class `inner_tie` rows `60`
- `slot_pair_06_13_boundary_carrier` value `2:1` class `outer_return` rows `60`
- `slot_pair_12_13_boundary_carrier` value `2:1` class `outer_return` rows `60`

## Counts

Root-smoke universe rows: `900`

Target surface rows: `60`

Slot14 rows: `60`

Boundary14 rows: `60`

Inner-tie 4 rows: `254`

Anchor-spoke 8 rows: `349`

Outer-return 2 rows: `60`

Incidence 4 plus 8 plus 2 rows: `60`

Value profile 10:1x4, 6:1x8, 2:1x2 rows: `60`

Class-value profile rows: `60`

Slot14 all boundary14: `true`

Slot14 all incidence split 4 plus 8 plus 2: `true`

Slot14 all value split: `true`

Slot14 all class-value profile: `true`

Promoted source laws: `0`

Promoted families: `0`

Promoted admissions: `0`

Current admitted permission channels: `1`

Current admitted information transports: `1`

## Interpretation

047 explained the eighteen hits as four internal entries plus fourteen boundary entries.

048 explains the fourteen boundary entries as a three-part boundary incidence split.

The fourteen boundary entries are four inner ties, eight anchor spokes, and two outer returns.

The value profile mirrors the split: 10:1, 6:1, and 2:1.

This is a stronger local anatomy result.

It still does not derive why these exact fourteen boundary carriers are chosen by upstream source construction.

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

Four inner ties, eight anchor spokes, two outer returns. Now derive why those boundary carriers are chosen.
