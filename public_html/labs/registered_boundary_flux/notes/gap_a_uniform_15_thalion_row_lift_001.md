# Gap A uniform 15-thalion row lift 001

Status: gap_a_uniform_15_thalion_row_lift_needs_inspection

## Boundary

- This is a uniform row-to-ring lift, not Gap A closure.
- Residual labels are not used in this pass.
- Role/cycle labels are retained only as row identifiers.
- Residual evaluation must happen in the next pass using only features produced here.
- No explanation of ZT or TI is claimed here.

## Summary

- row_count: 18
- rows_with_uniform_ring_lift: 13
- total_columns_seen: 30
- unique_columns_seen: [0, 1, 3, 4, 5, 7, 9, 10, 11, 13, 14, 15, 21, 22]
- unique_slot_pairs_seen: [[0, 1], [0, 4], [0, 11], [1, 2], [1, 11], [2, 3], [2, 13], [3, 4], [3, 13], [4, 10], [4, 14], [5, 6], [6, 14], [7, 8]]
- twisted_law_signature_count: 5
- feature_signature_count: 12
- identity_only_rows: [10]
- half_flip_only_rows: [0, 1, 5, 6, 7, 8, 11, 12, 13, 14, 17]
- mixed_identity_half_flip_rows: [2]

## Column to slot-pair map

- column 0: [0, 1]
- column 1: [0, 4]
- column 2: [0, 10]
- column 3: [0, 11]
- column 4: [1, 2]
- column 5: [1, 11]
- column 6: [1, 12]
- column 7: [2, 3]
- column 8: [2, 12]
- column 9: [2, 13]
- column 10: [3, 4]
- column 11: [3, 13]
- column 12: [3, 14]
- column 13: [4, 10]
- column 14: [4, 14]
- column 15: [5, 6]
- column 16: [5, 9]
- column 17: [5, 10]
- column 18: [5, 12]
- column 19: [6, 7]
- column 20: [6, 12]
- column 21: [6, 14]
- column 22: [7, 8]
- column 23: [7, 11]
- column 24: [7, 14]
- column 25: [8, 9]
- column 26: [8, 11]
- column 27: [8, 13]
- column 28: [9, 10]
- column 29: [9, 13]

## Role feature table

- row 0 cycle=0 role=WX columns=[0] slot_pairs=[[0, 1]] twisted_law_hist={"half_flip_x_plus_30": 60} twisted_local_delta={"30": 60}
- row 1 cycle=0 role=XY columns=[4] slot_pairs=[[1, 2]] twisted_law_hist={"half_flip_x_plus_30": 60} twisted_local_delta={"30": 60}
- row 2 cycle=0 role=YZ columns=[7, 10] slot_pairs=[[2, 3], [3, 4]] twisted_law_hist={"half_flip_x_plus_30": 60, "identity": 60} twisted_local_delta={"0": 60, "30": 60}
- row 3 cycle=0 role=ZT columns=[9] slot_pairs=[[2, 13]] twisted_law_hist={} twisted_local_delta={}
- row 4 cycle=0 role=TI columns=[13] slot_pairs=[[4, 10]] twisted_law_hist={} twisted_local_delta={}
- row 5 cycle=0 role=IW columns=[1, 7] slot_pairs=[[0, 4], [2, 3]] twisted_law_hist={"half_flip_x_plus_30": 120} twisted_local_delta={"30": 120}
- row 6 cycle=1 role=WX columns=[0] slot_pairs=[[0, 1]] twisted_law_hist={"half_flip_x_plus_30": 60} twisted_local_delta={"30": 60}
- row 7 cycle=1 role=XY columns=[4] slot_pairs=[[1, 2]] twisted_law_hist={"half_flip_x_plus_30": 60} twisted_local_delta={"30": 60}
- row 8 cycle=1 role=YZ columns=[1, 3, 22] slot_pairs=[[0, 4], [0, 11], [7, 8]] twisted_law_hist={"half_flip_x_plus_30": 60} twisted_local_delta={"30": 60}
- row 9 cycle=1 role=ZT columns=[9, 11, 14] slot_pairs=[[2, 13], [3, 13], [4, 14]] twisted_law_hist={} twisted_local_delta={}
- row 10 cycle=1 role=TI columns=[10, 11] slot_pairs=[[3, 4], [3, 13]] twisted_law_hist={"identity": 60} twisted_local_delta={"0": 60}
- row 11 cycle=1 role=IW columns=[1, 7] slot_pairs=[[0, 4], [2, 3]] twisted_law_hist={"half_flip_x_plus_30": 120} twisted_local_delta={"30": 120}
- row 12 cycle=2 role=WX columns=[0] slot_pairs=[[0, 1]] twisted_law_hist={"half_flip_x_plus_30": 60} twisted_local_delta={"30": 60}
- row 13 cycle=2 role=XY columns=[4] slot_pairs=[[1, 2]] twisted_law_hist={"half_flip_x_plus_30": 60} twisted_local_delta={"30": 60}
- row 14 cycle=2 role=YZ columns=[4, 5] slot_pairs=[[1, 2], [1, 11]] twisted_law_hist={"half_flip_x_plus_30": 60} twisted_local_delta={"30": 60}
- row 15 cycle=2 role=ZT columns=[21, 22] slot_pairs=[[6, 14], [7, 8]] twisted_law_hist={} twisted_local_delta={}
- row 16 cycle=2 role=TI columns=[13, 15] slot_pairs=[[4, 10], [5, 6]] twisted_law_hist={} twisted_local_delta={}
- row 17 cycle=2 role=IW columns=[1, 7] slot_pairs=[[0, 4], [2, 3]] twisted_law_hist={"half_flip_x_plus_30": 120} twisted_local_delta={"30": 120}

## Interpretation

- main_result: All role rows that pass checks have been lifted by the same source rule from M-column identity to 15-thalion slot-edge carrier features.
- twist_feature: The lift exposes identity and half_flip_x_plus_30 carrier laws before any residual evaluation.
- next_question: Do the two known residual rows align with branch-stable selected-turn and branch-sensitive return-path behavior when evaluated against these precomputed features?

## Checks

- PASS test_plan_loaded: status=gap_a_15_thalion_ring_test_plan_recorded
- PASS schema_loaded: status=gap_a_15_thalion_ring_schema_recovered_residual_blind
- PASS prior_lift_loaded: status=uniform_g900_row_lift_available_residuals_not_separated
- PASS slot_edge_list_len_30: len=30
- PASS column_slot_pairs_30: len=30
- PASS role_row_count_18: len=18
- PASS all_rows_have_columns: empty_rows=[]
- PASS all_rows_have_slot_pairs: missing=[]
- FAIL all_rows_have_twisted_edges: zero=[3, 4, 9, 15, 16]
- PASS all_rows_have_untwisted_edges: zero=[]
- PASS no_residual_labels_used: script reads prior lift rows, columns, role/cycle labels, and ring source edges; it does not read residual/mismatch flags or Gap A theorem residual labels

## Next script

    evaluate_gap_a_15_thalion_residual_split_001.py
