# Gap A directed P900 edge lift 001

Status: directed_p900_edge_lift_marks_TI_residual_not_gap_closure

Gap: A - chamber/register map.

## Boundary

- This is not a Gap A closure proof.
- This does not flip residual rows.
- The same directed lift is applied to all 18 rows.
- Branch sensitivity is treated as diagnostic pressure, not as a closure rule.

## Summary

- row_count: 18
- residual_count: 2
- matching_count: 16
- branch_sensitive_residual_count: 1
- branch_sensitive_matching_count: 0
- branch_sensitive_residual_rows: [{"row_index": 16, "cycle_index": 2, "role": "TI", "columns": [13, 15], "branch_difference_fields": ["directed_signature", "bit_transition_hist", "shift_mod60_hist"]}]
- branch_sensitive_matching_rows: []
- both_residual_class_feature_count: 0
- one_residual_marker_count: 1
- zt_residual_branch_sensitive: false
- ti_residual_branch_sensitive: true

## Residual directed rows

- row=3 cycle=0 role=ZT columns=[9] branch_sensitive=False branch_difference_fields=[]
  - candidate=0 edges=60 sig=545a35b121ea3d18 shift={"30": 60} residue_delta={"0": 60} bit_transition={"[0, 1]": 30, "[1, 0]": 30}
  - candidate=1 edges=60 sig=545a35b121ea3d18 shift={"30": 60} residue_delta={"0": 60} bit_transition={"[0, 1]": 30, "[1, 0]": 30}
- row=16 cycle=2 role=TI columns=[13, 15] branch_sensitive=True branch_difference_fields=["directed_signature", "bit_transition_hist", "shift_mod60_hist"]
  - candidate=0 edges=120 sig=94f2cc694ce4f652 shift={"30": 120} residue_delta={"0": 120} bit_transition={"[0, 1]": 60, "[1, 0]": 60}
  - candidate=1 edges=120 sig=4fe193663401084e shift={"0": 60, "30": 60} residue_delta={"0": 120} bit_transition={"[0, 0]": 30, "[0, 1]": 30, "[1, 0]": 30, "[1, 1]": 30}

## Feature tests

- branch_sensitive: residual_values=["False", "True"] disjoint=False both_class=False one_residual_marker=True
- branch_difference_fields: residual_values=["[\"directed_signature\", \"bit_transition_hist\", \"shift_mod60_hist\"]", "[]"] disjoint=False both_class=False one_residual_marker=False
- c0_directed_signature: residual_values=["545a35b121ea3d18848941ea52c8894e8051a6788c70d391d738bf2794a2c78d", "94f2cc694ce4f6525fad4dcc82d503a920a22ff7132d1f5d7cebd37c6eae2eba"] disjoint=True both_class=False one_residual_marker=False
- c1_directed_signature: residual_values=["4fe193663401084eb0c6de39dd9d9cb3cd7f472504bb93eb06892f90affd4f3a", "545a35b121ea3d18848941ea52c8894e8051a6788c70d391d738bf2794a2c78d"] disjoint=True both_class=False one_residual_marker=False
- c0_shift_mod60_hist: residual_values=["{\"30\": 120}", "{\"30\": 60}"] disjoint=False both_class=False one_residual_marker=False
- c1_shift_mod60_hist: residual_values=["{\"0\": 60, \"30\": 60}", "{\"30\": 60}"] disjoint=False both_class=False one_residual_marker=False
- c0_residue_delta_mod30_hist: residual_values=["{\"0\": 120}", "{\"0\": 60}"] disjoint=False both_class=False one_residual_marker=False
- c1_residue_delta_mod30_hist: residual_values=["{\"0\": 120}", "{\"0\": 60}"] disjoint=False both_class=False one_residual_marker=False
- c0_bit_transition_hist: residual_values=["{\"[0, 1]\": 30, \"[1, 0]\": 30}", "{\"[0, 1]\": 60, \"[1, 0]\": 60}"] disjoint=False both_class=False one_residual_marker=False
- c1_bit_transition_hist: residual_values=["{\"[0, 0]\": 30, \"[0, 1]\": 30, \"[1, 0]\": 30, \"[1, 1]\": 30}", "{\"[0, 1]\": 30, \"[1, 0]\": 30}"] disjoint=False both_class=False one_residual_marker=False

## Interpretation

- main_result: The directed P900 edge lift marks exactly one residual row as candidate-branch sensitive while marking no matching rows.
- zt_result: The ZT residual remains branch-stable under the directed P900 lift.
- ti_result: The TI residual is branch-sensitive under the directed P900 lift.
- meaning: The two residuals are not the same obstruction: ZT looks like a stable direct selected-turn residue; TI looks like a branch-sensitive return-path residue.
- not_a_closure: This does not close Gap A because it explains one residual pressure but does not produce a full source-derived register map.
- next_question: Record a bounded theorem note: Gap A remains open, but the obstruction has split into stable selected-turn residue and branch-sensitive return-path residue.

## Checks

- PASS separation_loaded: status=g900_lift_residuals_upstairs_distinct_not_class_separated
- PASS uniform_lift_loaded: status=uniform_g900_row_lift_available_residuals_not_separated
- PASS row_count_18: count=18
- PASS residual_count_2: count=2
- PASS all_rows_have_two_candidate_records: rows=18
- PASS all_rows_have_directed_edges: rows=18
- PASS branch_sensitive_residual_count_1: count=1
- PASS branch_sensitive_matching_count_0: count=0

## Next script

    record_gap_a_lift_refined_partial_closure_theorem_note_001.py
