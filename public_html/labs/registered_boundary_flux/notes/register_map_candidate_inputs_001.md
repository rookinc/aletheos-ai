# Register map candidate inputs 001

Status: ready_for_candidate_input_validation

Gap: A - chamber/register map.

## Purpose

Assemble selected target, M, row taxonomy, and FHE selector artifacts into one ready-to-test input bundle.

## Boundary

- This is not a proof of the register map.
- This does not run selector recovery.
- This does not modify the UI.
- This only confirms that proof-input artifacts are present and summarized.

## Readiness

- required_missing: []
- required_bad: []
- matrix_M shape: {"rows": 15, "cols": 30}
- row_taxonomy status: loaded
- target status: loaded

## Candidate tests prepared

### A0_public_predicate_only

- status: prepared_as_control
- expected: partial selection or ambiguity, not exact row-aware recovery
- input sources:
  - fhe_anatomy
  - fhe_top_lock_probe
  - fhe_zero_edge_census
  - selected_wxyzti_target

### A1_row_aware_M_incidence

- status: prepared_as_primary
- expected: recover target class if v21 exact selector conclusion is reproducible
- input sources:
  - matrix_M
  - row_taxonomy
  - selected_wxyzti_target
  - fhe_row_aware_discriminants
  - fhe_exact_selector_minimizer

### A2_row_shuffled_M_null

- status: declared_not_run
- expected: fail exact recovery after row identity is destroyed
- input sources:
  - matrix_M
  - row_taxonomy
  - selected_wxyzti_target

## Input records

- selected_wxyzti_target: loaded path=aletheos.ai/public_html/labs/registered_boundary_flux/artifacts/json/selected_wxyzti_target_001.v1.json sha256=70bd9ff63bfbd58e
- matrix_M: loaded path=aletheos.ai/public_html/json/matrix_M.json sha256=b72fc5606c60fcb3 shape={"rows": 15, "cols": 30}
- row_taxonomy: loaded path=aletheos.ai/public_html/json/row_taxonomy.json sha256=80d88f9ba9a305dc
- theorem_object: loaded path=aletheos.ai/public_html/json/theorem_object.json sha256=82078e2a053218df shape={"rows": 15, "cols": 30}
- fhe_anatomy: loaded path=research/fhe/artifacts/json/apre_wxyzti_anatomy.v1.json sha256=63bf2029485fd80d
- fhe_top_lock_probe: loaded path=research/fhe/artifacts/json/apre_top_lock_and_single_flip_tamper_probe.v1.json sha256=bdd8e15e8376b8b5
- fhe_zero_edge_census: loaded path=research/fhe/artifacts/json/branch_anatomy_zero_edge_census.v1.json sha256=1ae10c4aec10740a
- fhe_selection_space: loaded path=research/fhe/artifacts/json/selected_branch_selection_space_count.v1.json sha256=0b96be0d2af39d55
- fhe_row_aware_discriminants: loaded path=research/fhe/artifacts/json/selected_branch_row_aware_discriminants.v1.json sha256=545e322ece3d741f
- fhe_exact_selector_minimizer: loaded path=research/fhe/artifacts/json/selected_branch_exact_selector_minimizer.v1.json sha256=49e2b18f3891c3b2
- fhe_register_keypair_anatomy: loaded path=research/fhe/artifacts/json/register_keypair_anatomy.v1.json sha256=2c936e537ced57a1
- fhe_register_key_section: loaded path=research/fhe/paper/sections/05c_register_key_selection.tex sha256=687dd6a56b69d330
- fhe_result_v21: loaded path=research/fhe/RESULT_v21.md sha256=93dfa06cbbf8b7cf

## Next script

    validate_register_map_candidate_inputs_001.py
