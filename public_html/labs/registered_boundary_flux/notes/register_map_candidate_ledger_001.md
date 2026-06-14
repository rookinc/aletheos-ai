# Register map candidate ledger 001

Status: candidate inventory, not proof.

Gap: A - chamber/register map.

## Purpose

Inventory candidate artifacts and finite predicates for the missing K900-to-chamber/register map proof.

## Boundary

- This ledger does not prove the chamber/register map.
- This ledger does not change the Perfect Return Cell UI.
- This ledger does not claim that upstairs/downstairs is a finite invariant.
- This ledger only records available sources, candidate input sets, controls, and next proof scripts.

## Target theorem A0

A finite search over candidate register keys either produces a lawful register map that recovers the selected WXYZTIW branch triple, or proves that public predicates are insufficient and row-aware incidence is the first tested exact layer.

## Candidate input sets

### A0_public_predicate_only

- status: control
- purpose: Test whether public chamber/triangle predicates alone recover the WXYZTIW selected branch triple.
- expected result: Likely reduces candidate space but does not recover exact branch law.
- required artifacts:
  - K900 G15 carrier edge register
  - K900 triangle reference
  - selected WXYZTIW branch triple

### A1_row_aware_M_incidence

- status: primary_candidate
- purpose: Test whether row-aware M-incidence is the first layer that exactly recovers the selected branch triple.
- expected result: Exact recovery if v21 conclusion is reproduced.
- required artifacts:
  - matrix_M.json
  - row_taxonomy.json
  - selected branch triple
  - role order W,X,Y,Z,T,I

### A2_row_shuffled_M_null

- status: null
- purpose: Control against accidental recovery by the shape of M alone.
- expected result: Should fail exact recovery.
- required artifacts:
  - matrix_M.json
  - row_taxonomy.json
  - row shuffle seed
  - selected branch triple

### A3_register_key_layer

- status: candidate_if_artifacts_found
- purpose: Test whether public chamber/triangle predicates reduce the register space to Petersen mate-pairs before row-aware incidence resolves the branch law.
- expected result: Should identify partial key reduction, not full selection.
- required artifacts:
  - register-key layer artifact
  - Petersen mate-pair references
  - selected branch triple

## Explicit artifact records

- aletheos.ai/public_html/json/theorem_object.json exists=yes sha256=82078e2a053218df
- aletheos.ai/public_html/json/gram_Q.json exists=yes sha256=486cc484c9dc8b17
- aletheos.ai/public_html/json/matrix_M.json exists=yes sha256=b72fc5606c60fcb3
- aletheos.ai/public_html/json/row_taxonomy.json exists=yes sha256=80d88f9ba9a305dc
- aletheos.ai/public_html/json/transport_cocycle.json exists=yes sha256=54fbfe8bbd66991b
- aletheos.ai/public_html/json/verify_report.json exists=yes sha256=70e3356e4b36ee27
- aletheos.ai/theorem/cocycle_data_aligned.json exists=yes sha256=7d9b3144524b2989
- aletheos.ai/theorem/cocycle_status.json exists=yes sha256=40e8a469109cfd98
- aletheos.ai/public_html/labs/registered_boundary_flux/data/g60_source_binding.v1.json exists=yes sha256=8dec103c109f8a93
- aletheos.ai/public_html/labs/registered_boundary_flux/data/g900_signature_binding.v1.json exists=yes sha256=fa5e368923d2dc05
- aletheos.ai/public_html/labs/registered_boundary_flux/data/perfect_return_cell.v1.json exists=yes sha256=a49883203ef87e3c
- aletheos.ai/public_html/labs/registered_boundary_flux/artifacts/json/proof_gap_ledger_001.v1.json exists=yes sha256=359a0fc2a8209148
- aletheos.ai/public_html/labs/registered_boundary_flux/artifacts/json/perfect_return_shape.validation.v1.json exists=yes sha256=a529d98bd9697113
- aletheos.ai/public_html/labs/registered_boundary_flux/artifacts/json/perfect_return_sheet_flip.validation.v1.json exists=yes sha256=50ddbbb268b78331
- aletheos.ai/public_html/labs/registered_boundary_flux/artifacts/json/cocycle_companion.validation.v1.json exists=yes sha256=aecb947eea376b7c
- research/thalean-graph-theory/18-g900-kernel-admission/source/kernel_payload/g15_slot_edges.csv exists=yes sha256=7b94834d507cf299
- research/thalean-graph-theory/18-g900-kernel-admission/source/kernel_payload/g60_local_edges.csv exists=yes sha256=c700a185fab6a5f4
- research/thalean-graph-theory/18-g900-kernel-admission/source/kernel_payload/carrier_signing_table.csv exists=yes sha256=9b3cf812cc0f6d7b
- research/thalean-graph-theory/18-g900-kernel-admission/source/kernel_payload/x_sigma_edges.csv exists=yes sha256=ea2679662f4322a9
- research/thalean-graph-theory/18-g900-kernel-admission/artifacts/json/qed_status_ledger.json exists=yes sha256=b71e534e65213029
- research/thalean-graph-theory/11-thalean-unification/lifts/g15_candidate_cocycle_edges.json exists=yes sha256=031a9843d65f820f
- research/thalean-graph-theory/11-thalean-unification/artifacts/json/018_M_Q_cocycle_compatibility.json exists=yes sha256=79bc583a6e6d4996
- research/thalean-graph-theory/11-thalean-unification/artifacts/json/030_validate_candidate_cocycle_lift_against_old_checkers.json exists=yes sha256=3257d8b617397c44
- research/thalean-graph-theory/11-thalean-unification/artifacts/json/038_strict_cocycle_data_origin_gap.json exists=yes sha256=1182f9d8c935bba4
- research/fhe/RESULT_v21.md exists=yes sha256=93dfa06cbbf8b7cf
- research/fhe/artifacts/json/register_key_layer.v1.json exists=no
- research/fhe/artifacts/json/role_relative_selector.v1.json exists=no
- research/fhe/artifacts/json/exact_selector_minimizer.v1.json exists=no
- research/thalean-graph-theory/15-finite-projection-separation/paper/sections/09_companion_transport_residue.tex exists=yes sha256=c36ec9753507339d

## Search hits

- score 13: research/fhe/paper/SOURCE_LEDGER.md
  - L17:     The FHE branch isolates a provisional three-member K900-WXYZTIW class A_pre.
  - L28:     artifacts/json/apre_top_lock_and_single_flip_tamper_probe.v1.json
  - L29:     artifacts/json/apre_wxyzti_anatomy.v1.json
- score 11: research/fhe/src/selected_branch_exact_selector_minimizer_v1.py
  - L7: SPACE = Path("artifacts/json/selected_branch_selection_space_count.v1.json")
  - L46:     M = theorem.get("matrix_M") or theorem.get("M")
  - L50:         raise SystemExit("could not find matrix_M")
- score 10: research/fhe/src/extract_apre_wxyzti_anatomy_v1.py
  - L6: OUT_JSON = Path("artifacts/json/apre_wxyzti_anatomy.v1.json")
  - L7: OUT_MD = Path("artifacts/md/apre_wxyzti_anatomy.v1.md")
  - L8: OUT_NOTE = Path("notes/007_apre_wxyzti_anatomy.md")
- score 10: research/fhe/src/selected_branch_row_aware_discriminants_v1.py
  - L7: SPACE = Path("artifacts/json/selected_branch_selection_space_count.v1.json")
  - L46:     M = theorem.get("matrix_M") or theorem.get("M")
  - L50:         raise SystemExit("could not find matrix_M")
- score 9: research/fhe/metadata/paper_manifest.json
  - L9:   "paper_title": "Finite Holonomy Evidence for Role-Relative Projection Separation in a K900 Carrier",
  - L10:   "paper_version_note": "v0.2 Track B register-key integration",
  - L17:     "paper/sections/04_role_relative_observables.tex",
- score 9: research/fhe/notes/046_selected_branch_exact_selector_minimizer.md
  - L1: # Selected branch exact selector minimizer checkpoint
  - L5:     Recompute all exact row-aware selector combinations and identify the least-sharp exact selectors.
- score 9: research/fhe/paper/sections/05_apre_branch_anatomy.tex
  - L1: \section{\texorpdfstring{\(A_{\mathrm{pre}}\)}{Apre} branch anatomy}
  - L3: The branch anatomy audit asks which zero-sign G15 carrier edges can serve as the \(ZT\) central coupler in the role-relative pattern
  - L8: There are fifteen zero-sign carrier edges. Exactly three satisfy the top-lock \(ZT\) role test:
- score 9: research/fhe/paper/sections/05c_register_key_selection.tex
  - L1: \section{Register-Key Selection and Row-Aware Incidence}
  - L2: \label{sec:register-key-selection}
  - L4: The K900-native collision census in Section~\ref{sec:k900-native-collision-bound} gives the Track A result: within the K900 carrier, the target predicate selects exactly three base cycles and six oriented presentations. 
- score 8: research/fhe/artifacts/json/apre_top_lock_and_single_flip_tamper_probe.v1.json
  - L2:   "title": "A_pre top-lock class and single-flip tamper probe",
  - L6:   "apre_signature": {
  - L15:   "apre_count": 3,
- score 8: research/fhe/artifacts/json/apre_wxyzti_anatomy.v1.json
  - L2:   "title": "A_pre WXYZTI anatomy",
  - L4:   "status": "provisional_anatomy_of_top_lock_class",
  - L6:   "apre_count": 3,
- score 8: research/fhe/artifacts/json/selected_branch_exact_selector_minimizer.v1.json
  - L2:   "title": "Selected branch exact selector minimizer",
  - L4:   "status": "global_exact_selector_minimizer",
  - L380:     "This recomputes all exact selector combinations instead of reading the truncated exact list stored in v20.",
- score 8: research/fhe/artifacts/json/selected_branch_row_aware_discriminants.v1.json
  - L2:   "title": "Selected branch row-aware discriminants",
  - L1182:     "This audit adds row-aware support features: support_union, support_complement, support_intersection, support_row_degree_profile.",
  - L1183:     "Row-aware support is stronger than scalar support summaries but does not directly use selected column identity."
- score 8: research/fhe/artifacts/md/apre_wxyzti_anatomy.v1.md
  - L1: # A_pre WXYZTI anatomy v1
  - L3: Status: provisional anatomy of the top-lock class.
  - L14: Variable branch positions:
- score 8: research/fhe/artifacts/md/selected_branch_exact_selector_minimizer.v1.md
  - L1: # Selected branch exact selector minimizer v1
  - L12: ## Least-value exact selectors
  - L40: ## One-feature exact selectors
- score 8: research/fhe/artifacts/md/selected_branch_row_aware_discriminants.v1.md
  - L1: # Selected branch row-aware discriminants v1
  - L79: - Row-aware support predicates use row identities of M.
- score 8: research/fhe/notes/045_selected_branch_row_aware_discriminants.md
  - L1: # Selected branch row-aware discriminants checkpoint
  - L5:     Test whether row-aware support features resolve the four residual ambiguous rows left by v19.
- score 8: research/fhe/src/register_key_space_audit_v1.py
  - L11: APRE_CYCLES = [
  - L164:         m = theorem["matrix_M"]
  - L226:         apre_profiles = []
- score 7: research/fhe/artifacts/json/branch_anatomy_zero_edge_census.v1.json
  - L2:   "title": "Branch anatomy zero-edge census",
  - L4:   "status": "branch_anatomy_test",
  - L15:   "top_lock_signature": {
- score 7: research/fhe/artifacts/json/selected_branch_tau_action_audit.v1.json
  - L2:   "title": "Selected branch tau action audit",
  - L4:   "status": "carrier_specific_selected_branch_action",
  - L5:   "source": "artifacts/json/register_keypair_anatomy.v1.json",
- score 7: research/fhe/artifacts/md/apre_top_lock_and_single_flip_tamper_probe.v1.md
  - L1: # A_pre top-lock and single-flip tamper probe v1
- score 7: research/fhe/notes/004_apre_top_lock_and_tamper_probe.md
  - L1: # A_pre top-lock checkpoint
  - L3: A_pre is the provisional top-lock class inside the K900 G15 C6 candidate scan.
- score 7: research/fhe/paper/sections/00_abstract.tex
  - L4: The current checkpoint isolates a provisional K900-locked WXYZTIW class, denoted \(A_{\mathrm{pre}}\), consisting of three concrete six-cycle witnesses:
  - L10: These witnesses share a common \(W\)-\(X\)-\(Y\) stem and \(I\)-\(W\) return, while differing only in the central \(Z\)-\(T\) branch. A coarse aggregate observable preserves the three-way class but fails balanced two-fli
  - L12: A subsequent branch anatomy audit shows that among fifteen zero-sign carrier edges, exactly three can serve as the top-lock \(Z T\) coupler: \(3\!-\!4\), \(7\!-\!10\), and \(8\!-\!14\). Each is an even-triangle edge with
- score 7: research/fhe/paper/sections/09_conclusion.tex
  - L3: The current FHE branch establishes a finite local projection-separation checkpoint inside the imported K900 G15 carrier.
  - L7:   \item a three-way K900-WXYZTIW projection is isolated;
  - L8:   \item the selected branches are exactly the zero-sign even couplers between odd-active sides satisfying the top-lock role pattern;
- score 7: research/fhe/src/branch_anatomy_zero_edge_census_v1.py
  - L9: OUT_JSON = Path("artifacts/json/branch_anatomy_zero_edge_census.v1.json")
  - L10: OUT_MD = Path("artifacts/md/branch_anatomy_zero_edge_census.v1.md")
  - L11: OUT_NOTE = Path("notes/013_branch_anatomy_zero_edge_census.md")
- score 7: research/fhe/src/selected_branch_ambiguous_collision_audit_v1.py
  - L6: SPACE = Path("artifacts/json/selected_branch_selection_space_count.v1.json")
  - L52:     M = theorem.get("matrix_M") or theorem.get("M")
  - L56:         raise SystemExit("could not find matrix_M")
- score 7: research/fhe/src/selected_branch_discriminant_lattice_v1.py
  - L7: SPACE = Path("artifacts/json/selected_branch_selection_space_count.v1.json")
  - L46:     M = theorem.get("matrix_M") or theorem.get("M")
  - L50:         raise SystemExit("could not find matrix_M")
- score 7: research/fhe/src/selected_branch_matching_structure_v1.py
  - L6: ANATOMY = Path("artifacts/json/register_keypair_anatomy.v1.json")
  - L175:         "title": "Selected branch matching structure",
  - L177:         "status": "selected_branch_matching_and_tau_pair_usage",
- score 7: research/fhe/src/selected_branch_observed_vs_candidate_discriminants_v1.py
  - L6: SPACE = Path("artifacts/json/selected_branch_selection_space_count.v1.json")
  - L45:     M = theorem.get("matrix_M") or theorem.get("M")
  - L49:         raise SystemExit("could not find matrix_M in theorem object")
- score 7: research/fhe/src/selected_branch_selection_space_count_v1.py
  - L7: ANATOMY = Path("artifacts/json/register_keypair_anatomy.v1.json")
  - L213:         "title": "Selected branch selection-space count",
  - L215:         "status": "selected_branch_abstract_candidate_count",
- score 7: research/fhe/src/selected_branch_tau_action_audit_v1.py
  - L6: ANATOMY = Path("artifacts/json/register_keypair_anatomy.v1.json")
  - L162:         "title": "Selected branch tau action audit",
  - L164:         "status": "carrier_specific_selected_branch_action",
- score 6: research/fhe/artifacts/json/fhe_checkpoint.v1.json
  - L4:   "branch": "fhe",
  - L9:     "top_lock_preimage_size": 3,
  - L10:     "apre_count": 3,
- score 6: research/fhe/artifacts/json/k900_source_artifact_scan.v0.json
  - L26:     "WXYZTI",
  - L27:     "W-X-Y-Z-T-I"
  - L261:                 "- Standard Model dynamics - physical gravity ## Allowed language Use: - finite EM-like support conservation - finite polarity-support selector - residue-vector representative - paired-cancellation exact 
- score 6: research/fhe/artifacts/json/register_keypair_hinge_leak_audit.v1.json
  - L5:   "source": "artifacts/json/register_keypair_fixed_triangle_audit.v1.json",
  - L2436:     "These exceptions mark the branch-local leak boundary.",
- score 6: research/fhe/artifacts/json/selected_branch_matching_structure.v1.json
  - L2:   "title": "Selected branch matching structure",
  - L4:   "status": "selected_branch_matching_and_tau_pair_usage",
- score 6: research/fhe/artifacts/json/selected_branch_observed_vs_candidate_discriminants.v1.json
  - L2:   "title": "Selected branch observed-vs-candidate discriminants",
  - L5:   "source": "artifacts/json/selected_branch_selection_space_count.v1.json",
- score 6: research/fhe/artifacts/json/selected_branch_selection_space_count.v1.json
  - L2:   "title": "Selected branch selection-space count",
  - L4:   "status": "selected_branch_abstract_candidate_count",
- score 6: research/fhe/artifacts/json/source_ledger_audit.v1.json
  - L41:       "path": "artifacts/json/apre_top_lock_and_single_flip_tamper_probe.v1.json",
  - L46:       "path": "artifacts/json/apre_two_flip_tamper_probe.v1.json",
  - L51:       "path": "artifacts/json/apre_wxyzti_anatomy.v1.json",
- score 6: research/fhe/artifacts/md/source_ledger_audit.v1.md
  - L16: - artifacts/json/apre_top_lock_and_single_flip_tamper_probe.v1.json exists=True size=12481
  - L17: - artifacts/json/apre_two_flip_tamper_probe.v1.json exists=True size=27231
  - L18: - artifacts/json/apre_wxyzti_anatomy.v1.json exists=True size=5558
- score 6: research/fhe/notes/007_apre_wxyzti_anatomy.md
  - L1: # A_pre WXYZTI anatomy checkpoint
  - L11: Under WXYZTIW labeling:
  - L16:     Z = branch entry
- score 6: research/fhe/notes/012_branch_anatomy_hypothesis.md
  - L1: # Branch anatomy hypothesis
  - L16: and differ only in the central ZT branch:
  - L22: Each branch has the same role-relative sign pattern:

## Next steps

- Inspect search hits for exact v21 selector/minimizer artifacts.
- Normalize selected WXYZTIW branch triple into a small JSON target.
- Write build_register_map_candidate_inputs.py to assemble candidate inputs.
- Write validate_register_map_candidate_inputs.py before attempting proof.
