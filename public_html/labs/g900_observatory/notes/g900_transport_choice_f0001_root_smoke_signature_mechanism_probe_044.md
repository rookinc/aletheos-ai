# G900 transport choice F0001 root smoke signature mechanism probe 044

Status: `passed`

Verdict: `transport_choice_f0001_root_smoke_signature_mechanism_probe_044_recorded`

Mechanism status: `root_smoke_signature_selectors_exact_no_mechanism_no_promotion`

## Question

Why does the exact root-smoke hit signature have four internal carriers all at 5:4, and why does that signature attach to the forbidden 04_05 first step?

## Answer

044 reconstructs the 043 root-smoke rows.

It parses hit-signature carrier entries.

It tests internal 5:4, boundary-shell, full-cluster, prefix, target-key, and overlap selectors against the root-smoke universe.

It records selectors and mechanism-like features.

It promotes no source law.

It admits no permission channel.

It admits no information transport.

## Summary

- `full_cluster_signature_row_count` count `60` status `input`
- `unique_full_hit_signature_count` count `1` status `diagnostic`
- `all_target_internal_5_4_count` count `60` status `not_promoted`
- `all_target_boundary_present_count` count `60` status `not_promoted`
- `all_cluster_carriers_present_count` count `60` status `not_promoted`
- `exact_selector_count` count `5` status `not_promoted`
- `source_law_promotions` count `0` status `locked`
- `admission_promotions` count `0` status `locked`

## Selector tests

- `all_target_internal_5_4` selected `60` tp `60` fp `0` fn `0` exact `true`
- `all_target_boundary_present` selected `196` tp `60` fp `136` fn `0` exact `false`
- `all_cluster_carriers_present` selected `60` tp `60` fp `0` fn `0` exact `true`
- `exact_043_hit_signature_prefix` selected `60` tp `60` fp `0` fn `0` exact `true`
- `target_signature_key_exact_full_rows` selected `60` tp `60` fp `0` fn `0` exact `true`
- `max_pair_10_4_and_all_target_internal_5_4` selected `60` tp `60` fp `0` fn `0` exact `true`

## Profiles

- `full_cluster_signature_rows` rows `60` unique full hit signatures `1` all internal 5:4 `60` all cluster carriers `60`
- `outside_root_smoke_signature_rows` rows `840` unique full hit signatures `134` all internal 5:4 `0` all cluster carriers `0`

## Counts

Full-cluster signature rows: `60`

Root-smoke universe rows: `900`

Outside root-smoke rows: `840`

Unique full hit signatures: `1`

Unique hit-signature prefixes length 80: `1`

All target internal 5:4 rows: `60`

All target boundary present rows: `60`

All cluster carriers present rows: `60`

Selector tests: `6`

Exact selectors: `5`

Promoted source laws: `0`

Promoted families: `0`

Promoted admissions: `0`

Current admitted permission channels: `1`

Current admitted information transports: `1`

## Interpretation

043 found an exact root-smoke hit-signature surface.

044 asks whether the surface is already the mechanism.

The answer remains bounded.

The parsed hit-signature surface can produce exact selectors.

But an exact selector derived from the hit signature is not an upstream construction rule.

The next proof must derive the hit signature from root-smoke generation, carrier incidence, or endpoint selection.

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

The hit signature named the room. Now test what makes the signature.
