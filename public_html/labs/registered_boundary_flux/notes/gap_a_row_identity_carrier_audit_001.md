# Gap A row identity carrier audit 001

Status: row_identity_carriers_extracted_not_map_proof

Gap: A - chamber/register map.

## Boundary

- This is not a chamber/register map proof.
- This does not construct a lawful K900-to-chamber map.
- This audits row identity carriers available in M and row_taxonomy.
- The row-shuffle null showed row identity is load-bearing; this audit asks what finite signatures can carry that identity.

## Result

- rows audited: 15
- columns in M: 30
- taxonomy_class collision_count: 6
- support_columns collision_count: 0
- full_row_hash collision_count: 0

## Interpretation

- taxonomy_layer: row_taxonomy gives a 9-class row partition; it organizes rows but does not uniquely identify every row.
- support_layer: M row support columns uniquely identify rows in this audit.
- map_construction_need: A lawful register map must explain why these row identities are transported from the source object, not merely observed after the fact.
- next_question: Can row support identity be derived from G60/AT4val[60,6] transport structure rather than assigned from the site matrix?

## Row identity table

- row 0: class=A0 support_size=14 support=[16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
- row 1: class=A1 support_size=14 support=[11, 12, 13, 14, 15, 21, 22, 23, 24, 25, 26, 27, 28, 29]
- row 2: class=A2 support_size=14 support=[6, 7, 8, 9, 10, 21, 22, 23, 24, 25, 26, 27, 28, 29]
- row 3: class=F0± support_size=14 support=[2, 3, 4, 5, 8, 9, 10, 13, 14, 15, 19, 20, 28, 29]
- row 4: class=F1± support_size=14 support=[1, 3, 4, 5, 7, 9, 10, 12, 15, 18, 19, 20, 27, 29]
- row 5: class=C2± support_size=14 support=[3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 24, 25, 26, 29]
- row 6: class=F0± support_size=14 support=[0, 1, 2, 5, 6, 7, 10, 11, 12, 14, 16, 17, 23, 26]
- row 7: class=F2± support_size=14 support=[0, 1, 4, 5, 7, 9, 11, 12, 14, 17, 18, 20, 23, 27]
- row 8: class=C1± support_size=14 support=[0, 2, 5, 7, 11, 12, 13, 14, 15, 17, 22, 23, 25, 27]
- row 9: class=F1± support_size=14 support=[0, 1, 2, 3, 6, 8, 10, 11, 13, 16, 17, 18, 21, 26]
- row 10: class=F2± support_size=14 support=[0, 2, 3, 4, 6, 8, 13, 14, 15, 16, 18, 19, 21, 28]
- row 11: class=C0± support_size=14 support=[0, 1, 3, 6, 13, 16, 17, 18, 19, 20, 21, 22, 24, 28]
- row 12: class=C2± support_size=14 support=[0, 1, 2, 6, 7, 8, 9, 10, 11, 16, 24, 25, 26, 29]
- row 13: class=C1± support_size=14 support=[2, 4, 5, 8, 11, 12, 13, 14, 15, 19, 21, 22, 25, 28]
- row 14: class=C0± support_size=14 support=[1, 3, 4, 9, 12, 16, 17, 18, 19, 20, 22, 23, 24, 27]

## Checks

- PASS matrix_has_15_rows: row_count=15
- PASS matrix_has_30_columns: all rows length 30=True
- PASS taxonomy_covers_15_rows: taxonomy rows=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
- PASS support_columns_unique: collision_count=0
- PASS full_row_hash_unique: collision_count=0
- PASS taxonomy_alone_not_unique_expected: collision_count=6
- PASS gap_a_theorem_note_loaded: status=bounded_gap_a_selector_theorem_note_recorded

## Next script

    derive_gap_a_row_identity_transport_candidates_001.py
