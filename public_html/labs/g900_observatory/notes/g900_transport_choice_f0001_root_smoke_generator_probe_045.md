# G900 transport choice F0001 root smoke generator probe 045

Status: `passed`

Verdict: `transport_choice_f0001_root_smoke_generator_probe_045_recorded`

Generator status: `non_signature_single_field_exact_selector_found_no_law_no_promotion`

## Question

Can the 60-row root-smoke surface be generated without reading the hit_signature itself?

## Answer

045 quarantines hit_signature and signature-like fields.

It searches non-signature root-smoke source fields for exact or near selectors of the 044 surface.

It records selector candidates.

It promotes no source law.

It admits no permission channel.

It admits no information transport.

## Summary

- `root_smoke_universe_row_count` count `900` status `input`
- `target_surface_row_count` count `60` status `input`
- `candidate_selector_count` count `161` status `not_promoted`
- `exact_selector_count` count `143` status `not_promoted`
- `exact_single_field_selector_count` count `4` status `not_promoted`
- `quarantined_signature_field_count` count `2700` status `quarantined`
- `source_law_promotions` count `0` status `locked`
- `admission_promotions` count `0` status `locked`

## Exact non-signature selectors

- `edge_count + edge_hit_count` = `30 | 18` selected `60` tp `60` fp `0` fn `0` status `exact_source_field_selector_not_law`
- `edge_count + parsed:first_token_left` = `30 | 14` selected `60` tp `60` fp `0` fn `0` status `exact_parsed_source_field_selector_not_law`
- `edge_count + parsed:second_token` = `30 | 14` selected `60` tp `60` fp `0` fn `0` status `exact_parsed_source_field_selector_not_law`
- `edge_count + slot` = `30 | 14` selected `60` tp `60` fp `0` fn `0` status `exact_source_field_selector_not_law`
- `edge_hit_count + max_edge_overlap` = `18 | 4` selected `60` tp `60` fp `0` fn `0` status `exact_source_field_selector_not_law`
- `edge_hit_count + max_vertex_overlap` = `18 | 10` selected `60` tp `60` fp `0` fn `0` status `exact_source_field_selector_not_law`
- `edge_hit_count + parsed:fifth_token` = `18 | 30` selected `60` tp `60` fp `0` fn `0` status `exact_parsed_source_field_selector_not_law`
- `edge_hit_count + parsed:first_token_left` = `18 | 14` selected `60` tp `60` fp `0` fn `0` status `exact_parsed_source_field_selector_not_law`
- `edge_hit_count + parsed:fourth_token` = `18 | 29` selected `60` tp `60` fp `0` fn `0` status `exact_parsed_source_field_selector_not_law`
- `edge_hit_count + parsed:second_token` = `18 | 14` selected `60` tp `60` fp `0` fn `0` status `exact_parsed_source_field_selector_not_law`
- `edge_hit_count + slot` = `18 | 14` selected `60` tp `60` fp `0` fn `0` status `exact_source_field_selector_not_law`
- `edge_hit_count + vertex_count` = `18 | 29` selected `60` tp `60` fp `0` fn `0` status `exact_source_field_selector_not_law`
- `max_edge_overlap + parsed:first_token_left` = `4 | 14` selected `60` tp `60` fp `0` fn `0` status `exact_parsed_source_field_selector_not_law`
- `max_edge_overlap + parsed:second_token` = `4 | 14` selected `60` tp `60` fp `0` fn `0` status `exact_parsed_source_field_selector_not_law`
- `max_edge_overlap + slot` = `4 | 14` selected `60` tp `60` fp `0` fn `0` status `exact_source_field_selector_not_law`
- `max_vertex_overlap + parsed:first_token_left` = `10 | 14` selected `60` tp `60` fp `0` fn `0` status `exact_parsed_source_field_selector_not_law`
- `max_vertex_overlap + parsed:fourth_token` = `10 | 29` selected `60` tp `60` fp `0` fn `0` status `exact_parsed_source_field_selector_not_law`
- `max_vertex_overlap + parsed:second_token` = `10 | 14` selected `60` tp `60` fp `0` fn `0` status `exact_parsed_source_field_selector_not_law`
- `max_vertex_overlap + slot` = `10 | 14` selected `60` tp `60` fp `0` fn `0` status `exact_source_field_selector_not_law`
- `max_vertex_overlap + vertex_count` = `10 | 29` selected `60` tp `60` fp `0` fn `0` status `exact_source_field_selector_not_law`

## Near non-signature selectors

- `edge_count + max_vertex_overlap` = `30 | 10` selected `130` tp `60` fp `70` fn `0` status `superset_not_generator`
- `max_edge_overlap + max_vertex_overlap` = `4 | 10` selected `130` tp `60` fp `70` fn `0` status `superset_not_generator`
- `max_vertex_overlap + parsed:fifth_token` = `10 | 30` selected `130` tp `60` fp `70` fn `0` status `superset_not_generator`
- `edge_count + max_edge_overlap + max_vertex_overlap` = `30 | 4 | 10` selected `130` tp `60` fp `70` fn `0` status `superset_not_generator`
- `edge_count + max_vertex_overlap + parsed:fifth_token` = `30 | 10 | 30` selected `130` tp `60` fp `70` fn `0` status `superset_not_generator`
- `max_edge_overlap + max_vertex_overlap + parsed:fifth_token` = `4 | 10 | 30` selected `130` tp `60` fp `70` fn `0` status `superset_not_generator`
- `max_vertex_overlap` = `10` selected `130` tp `60` fp `70` fn `0` status `superset_not_generator`
- `max_edge_overlap + parsed:fourth_token` = `4 | 29` selected `170` tp `60` fp `110` fn `0` status `superset_not_generator`
- `max_edge_overlap + vertex_count` = `4 | 29` selected `170` tp `60` fp `110` fn `0` status `superset_not_generator`
- `edge_count + max_edge_overlap + parsed:fourth_token` = `30 | 4 | 29` selected `170` tp `60` fp `110` fn `0` status `superset_not_generator`
- `edge_count + max_edge_overlap + vertex_count` = `30 | 4 | 29` selected `170` tp `60` fp `110` fn `0` status `superset_not_generator`
- `max_edge_overlap + parsed:fifth_token + parsed:fourth_token` = `4 | 30 | 29` selected `170` tp `60` fp `110` fn `0` status `superset_not_generator`
- `max_edge_overlap + parsed:fifth_token + vertex_count` = `4 | 30 | 29` selected `170` tp `60` fp `110` fn `0` status `superset_not_generator`
- `max_edge_overlap + parsed:fourth_token + vertex_count` = `4 | 29 | 29` selected `170` tp `60` fp `110` fn `0` status `superset_not_generator`
- `edge_count + max_edge_overlap` = `30 | 4` selected `245` tp `60` fp `185` fn `0` status `superset_not_generator`
- `max_edge_overlap + parsed:fifth_token` = `4 | 30` selected `245` tp `60` fp `185` fn `0` status `superset_not_generator`
- `edge_count + max_edge_overlap + parsed:fifth_token` = `30 | 4 | 30` selected `245` tp `60` fp `185` fn `0` status `superset_not_generator`
- `max_edge_overlap` = `4` selected `245` tp `60` fp `185` fn `0` status `superset_not_generator`

## Field profiles

- `edge_count` target `60` outside `840` target values `30:60`
- `edge_hit_count` target `60` outside `840` target values `18:60`
- `local` target `60` outside `840` target values `0:1 | 1:1 | 2:1 | 3:1 | 4:1 | 5:1 | 6:1 | 7:1`
- `max_edge_overlap` target `60` outside `840` target values `4:60`
- `max_vertex_overlap` target `60` outside `840` target values `10:60`
- `parsed:fifth_token` target `60` outside `840` target values `30:60`
- `parsed:first_token` target `60` outside `840` target values `14:0:1 | 14:1:1 | 14:2:1 | 14:3:1 | 14:4:1 | 14:5:1 | 14:6:1 | 14:7:1`
- `parsed:first_token_left` target `60` outside `840` target values `14:60`
- `parsed:first_token_right` target `60` outside `840` target values `0:1 | 1:1 | 2:1 | 3:1 | 4:1 | 5:1 | 6:1 | 7:1`
- `parsed:fourth_token` target `60` outside `840` target values `29:60`
- `parsed:second_token` target `60` outside `840` target values `14:60`
- `parsed:third_token` target `60` outside `840` target values `0:1 | 1:1 | 2:1 | 3:1 | 4:1 | 5:1 | 6:1 | 7:1`
- `root` target `60` outside `840` target values `14:0:1 | 14:1:1 | 14:2:1 | 14:3:1 | 14:4:1 | 14:5:1 | 14:6:1 | 14:7:1`
- `slot` target `60` outside `840` target values `14:60`
- `vertex_count` target `60` outside `840` target values `29:60`

## Counts

Root-smoke universe rows: `900`

Target surface rows: `60`

Outside root-smoke rows: `840`

Candidate selectors: `161`

Exact selectors: `143`

Exact single-field selectors: `4`

Exact multi-field selectors: `139`

Strict subset candidates: `0`

Superset candidates: `18`

Field profiles: `15`

Promoted source laws: `0`

Promoted families: `0`

Promoted admissions: `0`

Current admitted permission channels: `1`

Current admitted information transports: `1`

## Interpretation

044 proved that the hit-signature surface is selector-exact.

045 asks whether the same surface can be selected without using the signature itself.

A non-signature exact selector is stronger than a signature selector.

But it is still not a law unless it derives the 5:4 internal signature from upstream construction.

This probe names possible handles.

It does not open admission.

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

The signature selected the surface. Now derive the signature without using its name.
