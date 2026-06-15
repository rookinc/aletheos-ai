# Neighbor-induced overdrive from ratchet boundary 001

Status: neighbor_induced_overdrive_signal_supported_not_full_g900

## Boundary

- This does not close Gap A.
- This does not prove full G900.
- This tests neighbor-induced overdrive in the finite source-shell/register proxy.
- Neighbor exposure is not physical expansion.
- No independent witness layer is proven.

## Summary

- search_result: "neighbor_induced_overdrive_signal_supported"
- gap_a_closed: false
- full_g900_admission_found: false
- background_count: 120
- admitted_count: 4
- admitted_keys: ["11|7|14|23,24", "13|9|10|28,29", "2|1|0|0,4", "4|3|2|7,10"]
- admitted_columns: [0, 4, 7, 10, 23, 24, 28, 29]
- overshoot_seen: true
- neighbor_pressure_seen: true
- all_shells_settle_to_admitted: true
- all_loose_paths_explained_as_neighbors: true
- unexplained_by_radius: {"0": [], "1": [], "2": [], "3": [], "4": []}
- relation_counts_all: {"reverse_partner": 20, "same_source_polarity_family": 17, "same_source_polarity_truth_value": 17, "shared_B": 125, "shared_C": 125, "shared_column": 250, "shared_endpoint": 368, "shared_r1_column_neighborhood": 514, "shared_r1_cycle": 514, "shared_r1_role": 514, "shared_r1_support_row": 514, "shared_source_hinge_A": 132}
- source_neighbor_sample_explanation: {"0": {"sample_explained_by_source_neighbor_relation": 30, "sample_size": 30}, "1": {"sample_explained_by_source_neighbor_relation": 30, "sample_size": 30}, "2": {"sample_explained_by_source_neighbor_relation": 30, "sample_size": 30}, "3": {"sample_explained_by_source_neighbor_relation": 30, "sample_size": 30}, "4": {"sample_explained_by_source_neighbor_relation": 30, "sample_size": 30}}
- claim_closes_gap_a: false

## Shell summaries

- {"all_loose_explained_as_neighbors": true, "loose_path_count": 50, "radius": 0, "relation_counts": {"reverse_partner": 4, "same_source_polarity_family": 1, "same_source_polarity_truth_value": 1, "shared_B": 13, "shared_C": 13, "shared_column": 50, "shared_endpoint": 40, "shared_r1_column_neighborhood": 50, "shared_r1_cycle": 50, "shared_r1_role": 50, "shared_r1_support_row": 50, "shared_source_hinge_A": 20}, "settled_count": 4, "settles_to_admitted": true, "shell_column_count": 8, "touch_path_count": 54}
- {"all_loose_explained_as_neighbors": true, "loose_path_count": 116, "radius": 1, "relation_counts": {"reverse_partner": 4, "same_source_polarity_family": 4, "same_source_polarity_truth_value": 4, "shared_B": 28, "shared_C": 28, "shared_column": 50, "shared_endpoint": 82, "shared_r1_column_neighborhood": 116, "shared_r1_cycle": 116, "shared_r1_role": 116, "shared_r1_support_row": 116, "shared_source_hinge_A": 28}, "settled_count": 4, "settles_to_admitted": true, "shell_column_count": 27, "touch_path_count": 120}
- {"all_loose_explained_as_neighbors": true, "loose_path_count": 116, "radius": 2, "relation_counts": {"reverse_partner": 4, "same_source_polarity_family": 4, "same_source_polarity_truth_value": 4, "shared_B": 28, "shared_C": 28, "shared_column": 50, "shared_endpoint": 82, "shared_r1_column_neighborhood": 116, "shared_r1_cycle": 116, "shared_r1_role": 116, "shared_r1_support_row": 116, "shared_source_hinge_A": 28}, "settled_count": 4, "settles_to_admitted": true, "shell_column_count": 30, "touch_path_count": 120}
- {"all_loose_explained_as_neighbors": true, "loose_path_count": 116, "radius": 3, "relation_counts": {"reverse_partner": 4, "same_source_polarity_family": 4, "same_source_polarity_truth_value": 4, "shared_B": 28, "shared_C": 28, "shared_column": 50, "shared_endpoint": 82, "shared_r1_column_neighborhood": 116, "shared_r1_cycle": 116, "shared_r1_role": 116, "shared_r1_support_row": 116, "shared_source_hinge_A": 28}, "settled_count": 4, "settles_to_admitted": true, "shell_column_count": 30, "touch_path_count": 120}
- {"all_loose_explained_as_neighbors": true, "loose_path_count": 116, "radius": 4, "relation_counts": {"reverse_partner": 4, "same_source_polarity_family": 4, "same_source_polarity_truth_value": 4, "shared_B": 28, "shared_C": 28, "shared_column": 50, "shared_endpoint": 82, "shared_r1_column_neighborhood": 116, "shared_r1_cycle": 116, "shared_r1_role": 116, "shared_r1_support_row": 116, "shared_source_hinge_A": 28}, "settled_count": 4, "settles_to_admitted": true, "shell_column_count": 30, "touch_path_count": 120}

## Interpretation

- main_result: Neighbor-induced overdrive is supported locally: overdrive exposes loose neighboring paths, and settling removes them while preserving the admitted traces.
- why_this_matters: The overdrive is not arbitrary shell growth. It is explained as neighbor exposure around admitted traces.
- why_not_full_g900: This remains a finite source-shell/register proxy. It does not prove a full 900-state return cycle or independent witness layer.
- next_move: Record the neighbor-induced overdrive boundary, then search a larger neighbor carrier or independent witness layer.

## Claim

- does_this_close_gap_a: false
- does_this_support_neighbor_induced_overdrive: true
- does_this_find_full_g900_admission: false
- short_form: "Neighbor-induced overdrive is supported locally: overdrive exposes loose neighboring paths, and settling removes them while preserving the admitted traces."
- not_closed_reason: "This remains a finite source-shell/register proxy. It does not prove a full 900-state return cycle or independent witness layer."
- next_problem: "Record the neighbor-induced overdrive boundary, then search a larger neighbor carrier or independent witness layer."

## Checks

- PASS ratchet_boundary_loaded: internalization_ratchet_boundary_recorded
- PASS ratchet_loaded: internalization_ratchet_overdrive_settle_signal_supported_not_full_g900
- PASS local_boundary_loaded: local_g900_shaped_admission_boundary_recorded
- PASS return_trace_loaded: local_admission_predicate_return_trace_witness_proxy_supported_not_full_g900
- PASS background_count_120: 120
- PASS admitted_count_4: 4
- PASS overshoot_seen: True
- PASS neighbor_pressure_seen: True
- PASS all_shells_settle: True
- PASS all_loose_explained: {'0': [], '1': [], '2': [], '3': [], '4': []}
- PASS gap_a_not_closed: search only
- PASS not_full_g900: False

## Next script

    record_neighbor_induced_overdrive_boundary_001.py
