# Register map candidate recovery 001

Status: A0_confirms_target_A1_supported_A2_pending

Gap: A - chamber/register map.

## Boundary

- This is not yet a chamber/register map proof.
- This does not claim a lawful K900-to-chamber map has been found.
- This pass uses existing FHE artifacts and does not rerun the full selector search.
- A2 is not claimed until a live row-shuffle null artifact is generated.

## Target

- role pattern: [1, 1, 1, 0, 1, 1]
- cycles: [[0, 1, 2, 3, 4, 5], [0, 1, 2, 7, 10, 5], [0, 1, 2, 8, 14, 5]]
- ZT edges: [[3, 4], [7, 10], [8, 14]]

## A0 public predicate only

- status: control_layer_confirms_target_but_does_not_close_register_map
- supported: True
- detail: Public/top-lock/anatomy sources confirm the selected target class and ZT edges, but this pass does not treat them as a chamber-register proof.

## A1 row-aware M incidence

- status: row_aware_recovery_supported_by_existing_artifacts
- supported: True
- row_aware_terms_ok: True
- minimizer_terms_ok: True
- target_cycles_seen_in_row_aware_or_minimizer: False
- selector_like_value_count: 80

## A2 row-shuffled M null

- status: pending_live_row_shuffle_null
- detail: The input bundle declares the row-shuffled M null, but no live row-shuffle recovery/null artifact has been generated in this pass. Next script should destroy row identity deterministically and rerun the recovery predicate.

## V21 / selector hits

- L3: Status: Exact selector minimizer checkpoint.
- L7: After v20 found that row-aware M-incidence exactly separates the observed selected-branch triples from rejected abstract candidates, what is the least-sharp exact selector in the tested feature family?
- L9: This matters because support_row_degree_profile is exact, but it has one distinct value per local candidate row:
- L20:     exact_combo_count = 1384
- L21:     one_feature_exact_count = 1
- L23: The only one-feature exact selector is:
- L31: Thus support_row_degree_profile is the minimal single-feature exact selector in the tested family.
- L33: ## Least-sharp exact tested selectors
- L35: The least-value exact selectors have:
- L40: The first least-sharp exact selectors are:
- L69: There are two levels of exact row-aware recovery.
- L73:     support_row_degree_profile alone is exact.
- L76: Level 2: least-sharp tested recovery.
- L78:     Three-feature row-aware selectors reduce sharpness slightly, to 206 values.
- L79:     These combine chamber block information with row-aware support union/complement or support histogram information.
- L81: Thus row-aware incidence is necessary for exact recovery in the tested feature family, but it does not have to appear only as the full row-degree profile.
- L88:     Row-aware incidence sees it.
- L92:     The minimal one-feature exact selector is full row-aware degree profile.
- L93:     The least-sharp exact tested selectors use block word plus row-aware support location.
- L97:     One row-aware profile sees everything.

## Next script

    run_register_map_row_shuffle_null_001.py
