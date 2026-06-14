# Register map exact selectors 001

Status: exact_selector_structure_extracted

Gap: A - chamber/register map.

## Boundary

- This extraction does not prove the chamber/register map.
- This extraction does not rerun the selector minimizer.
- This extraction records what existing FHE artifacts say about exact row-aware recovery.
- The row-aware recovery evidence is treated as selector-structural, not as literal target-cycle echo.

## Derived summary

- one_feature_exact_selector: "support_row_degree_profile"
- row_aware_recovery_levels_seen: true
- least_sharp_mentions_three_feature: true
- row_aware_needed_in_tested_family: true
- one_row_aware_profile_line_seen: true

## Feature names seen

- block_word
- support_complement
- support_intersection
- support_row_degree_profile
- support_union

## Current interpretation

- public_layer: confirms target class and ZT edges but does not close register map
- exact_layer: support_row_degree_profile is the minimal single-feature exact selector in the tested family, per v21
- least_sharp_layer: least-sharp tested exact selectors combine chamber block information with row-aware support location/histogram information, per v21
- null_boundary: row identity is load-bearing under the first live row-shuffle null

## V21 hits

- L3: Status: Exact selector minimizer checkpoint.
- L7: After v20 found that row-aware M-incidence exactly separates the observed selected-branch triples from rejected abstract candidates, what is the least-sharp exact selector in the tested feature family?
- L9: This matters because support_row_degree_profile is exact, but it has one distinct value per local candidate row:
- L23: The only one-feature exact selector is:
- L25:     support_row_degree_profile
- L31: Thus support_row_degree_profile is the minimal single-feature exact selector in the tested family.
- L33: ## Least-sharp exact tested selectors
- L35: The least-value exact selectors have:
- L40: The first least-sharp exact selectors are:
- L43:     support_intersection_size
- L44:     support_complement
- L49:     support_intersection_size
- L50:     support_union
- L54:     support_complement
- L58:     support_union
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
- L98:     Three weaker row-aware predicates nearly name the same law.
- L104: It is not a proof over all possible predicates. It does show that within the tested chamber/support feature set, exact carrier selection requires row-aware incidence information.

## Register-key section hits

- L1: \section{Register-Key Selection and Row-Aware Incidence}
- L2: \label{sec:register-key-selection}
- L4: The K900-native collision census in Section~\ref{sec:k900-native-collision-bound} gives the Track A result: within the K900 carrier, the target predicate selects exactly three base cycles and six oriented presentations. The present section records a second, bounded Track B audit. Its purpose is not 
- L6: The starting point is the register-boundary audit summarized in Section~\ref{sec:register-boundary}. Endpoint labels, shared edge order, bare \(G_{15}\) isomorphism, and the K900 odd/even triangle partition do not force a unique chamber register alignment. The bridge is therefore not treated as a sh
- L8: A census of the K900-to-theorem-object key space gives \(120\) candidate graph isomorphisms. Public chamber/triangle predicates reduce this space to \(60\) structured keypairs. Each keypair is explained by a Petersen line-graph involution: a mate fixes one Petersen-star triangle and swaps the remain
- L10: The selected branch triple is an edge-level object in this register. It does not live on the fixed triangle itself. For every public keypair, the selected triple lies in the complement of the fixed Petersen-star triangle and has the following uniform form:
- L16: Equivalently, the selected branch triple is a three-edge matching in \(G_{15}\). It uses six distinct \(G_{15}\) vertices arranged across exactly three \(\tau\)-swapped vertex-pairs: two pairs are crosslinked by the moved edge-pair, and one pair folds back by endpoint swap.
- L18: The abstract Petersen edge-orbit structure alone does not determine the observed selection. For each fixed Petersen-star triangle, there are \(21\) abstract triples of the relevant type, while the carrier admits \(6\). Across all ten fixed triangles, this gives \(210\) local abstract candidates and 
- L20: The resulting selection law is not recovered by scalar summaries alone. Chamber block words, hinge words, support sizes, support pair-intersection counts, support union size, support intersection size, and support row-degree histograms nearly recover the law, but leave two observed/rejected collisio
- L22: Exact recovery in the tested feature family requires row-aware incidence. The row-aware support-degree profile of the sector matrix \(M\), recording which rows are touched and with what multiplicity, separates all \(60\) observed selected triples from all \(150\) rejected local candidates:
- L28: As a single feature, this row-aware profile is exact but sharp: it has \(210\) distinct values on the \(210\) local candidate rows. A minimizer over the tested feature family found that the only one-feature exact selector is the full row-aware support-degree profile. The least-sharp exact tested sel
- L30: This Track B result should be read with the same boundary discipline as the rest of the paper. It is not a cryptographic security theorem and not a proof over all possible predicates. It is a finite register-key audit. It shows that the carrier selection law is not visible in scalar support size alo

## Selector-like node count

- minimizer selector-like nodes: 120
- row-aware selector-like nodes: 80
- one-feature-like nodes: 2

## Next script

    write_gap_a_selector_theorem_note_001.py
