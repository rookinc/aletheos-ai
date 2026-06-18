# g900_six_nine_endpoint_contrast_pair_taxonomy_032

Status: `endpoint_contrast_source_like_pairs_found`

## Purpose

031 found endpoint contrast pairs on the broader artifact surface. This audit classifies the stored contrast sample to determine whether those contrasts look source-native or derived/noisy.

## Result

- audit_pass: `True`
- taxonomy_status: `broader_contrasts_include_source_endpoint_like_rows`
- stored_contrast_sample_count: `50`
- source_like_contrast_count_in_sample: `32`
- source_like_contrast_pair_keys: `['02_03', '02_08', '03_09', '05_10', '05_14', '06_12', '06_13', '07_11', '09_12']`
- sample_pair_counts: `{'02_03': 8, '09_12': 4, '07_11': 5, '05_10': 8, '02_08': 6, '03_09': 6, '06_12': 2, '06_13': 4, '05_14': 4, '08_13': 1, '10_14': 2}`
- sample_layer_counts: `{'source_endpoint_like': 32, 'generic_endpoint_like': 4, 'derived_or_excluded_context': 14}`
- theory_claim: `False`

## Reading

The broader endpoint-like contrast rows include source-endpoint-like rows in the stored sample. These must be treated as real contrast candidates before claiming endpoint [6,9] uniqueness.

## Boundary

This is a contrast taxonomy audit only. It does not claim native derivation completion, closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification.

Next ascent target: inspect source-like endpoint contrast rows directly.
