# G900 hit-forest root endpoint rule scope audit 001

Status: `hit_forest_root_endpoint_rule_scope_audit_passed`

Verdict: `high_endpoint_rule_persists_across_hit_forest`

This audit tests whether the P7 rule

`dominant_root_slot = higher-numbered endpoint`

persists across the P7 + P3 + P2 full60 hit path forest.

## Result

- component count: `3`
- component match profile: `{'P7': True, 'P3': True, 'P2': True}`
- global rows: `9`
- global high-endpoint matches: `9`
- global high-endpoint matches all: `True`
- channel count: `0`

## Boundary

This is a scope audit only. It admits no channels, renders no channels, mutates no body, lights no marker, and makes no force or physics claim.
