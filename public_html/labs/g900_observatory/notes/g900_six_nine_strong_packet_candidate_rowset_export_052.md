# g900_six_nine_strong_packet_candidate_rowset_export_052

Status: `strong_packet_candidate_rowset_exported`

## Purpose

051 found a two-stage strong-packet filter candidate. This audit exports the retained 122-row candidate and verifies the internal two-stage partition.

## Result

- audit_pass: `True`
- raw_surface_count: `158`
- stage_a_rejected_count: `18`
- scaffold_count: `140`
- stage_b_rejected_count: `18`
- candidate_122_count: `122`
- sample_feature_support_count: `20` of `20`
- raw_partition_ok: `True`
- scaffold_partition_ok: `True`
- csv_path: `public_html/labs/g900_observatory/artifacts/csv/g900_six_nine_strong_packet_candidate_rowset_export_052_rows.v1.csv`
- theory_claim: `False`

## Reading

The candidate 122 strong packet is exported as the retained part of a two-stage filter: 158 raw proposal rows minus 18 source_inside_failure_proxy rows gives a 140-row scaffold; compact-context retention inside the scaffold gives 122 candidate strong-packet rows, with an 18-row second-stage rejection. This exports the candidate rowset but does not yet prove the 110+122+66 address-core union.

## Boundary

This exports the candidate 122 strong-packet rowset only. It does not yet prove the full 110+122+66=298 row-level union, because compatible full rowsets or predicates for the 110 origin seed and 66 contrast residue still need to be reconstructed.

Next ascent target: reconstruct compatible 110 seed and 66 contrast rowsets and test 110+122+66=298 as a row-level union.
