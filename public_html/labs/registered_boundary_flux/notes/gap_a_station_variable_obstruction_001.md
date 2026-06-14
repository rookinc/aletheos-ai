# Gap A station-variable obstruction 001

Status: gap_a_station_variable_obstruction_recorded

## Boundary

- This does not close Gap A.
- This records a localized obstruction, not a generator.
- Outer frame stability is partial structure, not closure.
- Interior turn instability is the next target if the search continues.
- The IW reusable subgrammar remains a hint only.
- Mode 2 mirror remains projection-level evidence and is not promoted here.
- No physical interpretation is claimed.

## Plateau statement

Gap A stabilized the outer register frame but obstructed at the interior turn seam.

- WX, XY, and IW are cycle-invariant in the best station assignments.
- YZ, ZT, and TI are not cycle-invariant in the best station assignments.
- No cycle admits a strict WXYZTI station closure in the bounded SAT-like search.
- The best obstruction localizes to the middle chain, especially the Z seam.
- The reusable IW non-lookup subgrammar remains a hint, not proof.
- This records a localized obstruction, not a source-native generator.

## Summary

- obstruction_result: "station_variable_obstruction_recorded"
- gap_a_closed: false
- station_search_result: "strict_station_candidate_not_found"
- strict_cycles: []
- all_cycles_strict: false
- best_mismatch_by_cycle: {"0": 2, "1": 1, "2": 1}
- outer_frame_roles: ["WX", "XY", "IW"]
- outer_frame_stable: ["IW", "WX", "XY"]
- interior_turn_roles: ["YZ", "ZT", "TI"]
- interior_turn_unstable: ["TI", "YZ", "ZT"]
- obstruction_by_station: {"T": 1, "Y": 1, "Z": 2}
- obstruction_by_role_pair: {"XY->YZ": 1, "YZ->ZT": 2, "ZT->TI": 1}
- iw_reusable_nonlookup_core_present: true
- hard_rows: [3, 4, 5, 8, 9, 11, 15, 16, 17]
- non_path_rows: [5, 8, 9, 11, 15, 16, 17]
- preimage_rows: [3, 16]
- stable_rows: [4, 9, 15]
- zero_rows: [3, 4, 9, 15, 16]
- claim_closes_gap_a: false

## Outer frame evidence

{
  "role_stability": {
    "IW": {
      "cycle_invariant_pair": true,
      "distinct_oriented_pair_count": 1,
      "distinct_oriented_pairs": [
        {
          "from": 4,
          "to": 0
        }
      ],
      "pairs_by_cycle": [
        {
          "cycle": 0,
          "from": 4,
          "source": "support_slot_edge",
          "to": 0
        },
        {
          "cycle": 1,
          "from": 4,
          "source": "support_slot_edge",
          "to": 0
        },
        {
          "cycle": 2,
          "from": 4,
          "source": "support_slot_edge",
          "to": 0
        }
      ],
      "sources": [
        "support_slot_edge"
      ]
    },
    "WX": {
      "cycle_invariant_pair": true,
      "distinct_oriented_pair_count": 1,
      "distinct_oriented_pairs": [
        {
          "from": 0,
          "to": 1
        }
      ],
      "pairs_by_cycle": [
        {
          "cycle": 0,
          "from": 0,
          "source": "open_path_endpoint",
          "to": 1
        },
        {
          "cycle": 1,
          "from": 0,
          "source": "open_path_endpoint",
          "to": 1
        },
        {
          "cycle": 2,
          "from": 0,
          "source": "open_path_endpoint",
          "to": 1
        }
      ],
      "sources": [
        "open_path_endpoint"
      ]
    },
    "XY": {
      "cycle_invariant_pair": true,
      "distinct_oriented_pair_count": 1,
      "distinct_oriented_pairs": [
        {
          "from": 1,
          "to": 2
        }
      ],
      "pairs_by_cycle": [
        {
          "cycle": 0,
          "from": 1,
          "source": "open_path_endpoint",
          "to": 2
        },
        {
          "cycle": 1,
          "from": 1,
          "source": "open_path_endpoint",
          "to": 2
        },
        {
          "cycle": 2,
          "from": 1,
          "source": "open_path_endpoint",
          "to": 2
        }
      ],
      "sources": [
        "open_path_endpoint"
      ]
    }
  },
  "stable_roles": [
    "IW",
    "WX",
    "XY"
  ]
}

## Interior turn evidence

{
  "obstruction_by_role_pair": {
    "XY->YZ": 1,
    "YZ->ZT": 2,
    "ZT->TI": 1
  },
  "obstruction_by_station": {
    "T": 1,
    "Y": 1,
    "Z": 2
  },
  "role_stability": {
    "TI": {
      "cycle_invariant_pair": false,
      "distinct_oriented_pair_count": 3,
      "distinct_oriented_pairs": [
        {
          "from": 3,
          "to": 4
        },
        {
          "from": 6,
          "to": 4
        },
        {
          "from": 10,
          "to": 4
        }
      ],
      "pairs_by_cycle": [
        {
          "cycle": 0,
          "from": 10,
          "source": "open_path_endpoint",
          "to": 4
        },
        {
          "cycle": 1,
          "from": 3,
          "source": "support_slot_edge",
          "to": 4
        },
        {
          "cycle": 2,
          "from": 6,
          "source": "disconnected_endpoint_join",
          "to": 4
        }
      ],
      "sources": [
        "disconnected_endpoint_join",
        "open_path_endpoint",
        "support_slot_edge"
      ]
    },
    "YZ": {
      "cycle_invariant_pair": false,
      "distinct_oriented_pair_count": 3,
      "distinct_oriented_pairs": [
        {
          "from": 0,
          "to": 4
        },
        {
          "from": 2,
          "to": 4
        },
        {
          "from": 2,
          "to": 11
        }
      ],
      "pairs_by_cycle": [
        {
          "cycle": 0,
          "from": 2,
          "source": "open_path_endpoint",
          "to": 4
        },
        {
          "cycle": 1,
          "from": 0,
          "source": "support_slot_edge",
          "to": 4
        },
        {
          "cycle": 2,
          "from": 2,
          "source": "open_path_endpoint",
          "to": 11
        }
      ],
      "sources": [
        "open_path_endpoint",
        "support_slot_edge"
      ]
    },
    "ZT": {
      "cycle_invariant_pair": false,
      "distinct_oriented_pair_count": 3,
      "distinct_oriented_pairs": [
        {
          "from": 2,
          "to": 13
        },
        {
          "from": 4,
          "to": 3
        },
        {
          "from": 14,
          "to": 6
        }
      ],
      "pairs_by_cycle": [
        {
          "cycle": 0,
          "from": 2,
          "source": "open_path_endpoint",
          "to": 13
        },
        {
          "cycle": 1,
          "from": 4,
          "source": "disconnected_endpoint_join",
          "to": 3
        },
        {
          "cycle": 2,
          "from": 14,
          "source": "support_slot_edge",
          "to": 6
        }
      ],
      "sources": [
        "disconnected_endpoint_join",
        "open_path_endpoint",
        "support_slot_edge"
      ]
    }
  },
  "unstable_roles": [
    "TI",
    "YZ",
    "ZT"
  ]
}

## Obstruction records

- {"best_assignment": {"I": 4, "T": 13, "W": 0, "X": 1, "Y": 2, "Z": 4}, "best_mismatch_count": 2, "best_role_pairs": {"IW": {"cost": 2, "evidence": {"slot_edge": [0, 4]}, "from": 4, "source": "support_slot_edge", "to": 0}, "TI": {"cost": 0, "evidence": {"endpoints": [4, 10]}, "from": 10, "source": "open_path_endpoint", "to": 4}, "WX": {"cost": 0, "evidence": {"endpoints": [0, 1]}, "from": 0, "source": "open_path_endpoint", "to": 1}, "XY": {"cost": 0, "evidence": {"endpoints": [1, 2]}, "from": 1, "source": "open_path_endpoint", "to": 2}, "YZ": {"cost": 0, "evidence": {"endpoints": [2, 4]}, "from": 2, "source": "open_path_endpoint", "to": 4}, "ZT": {"cost": 0, "evidence": {"endpoints": [2, 13]}, "from": 2, "source": "open_path_endpoint", "to": 13}}, "cycle": 0, "mismatches": [{"left_role": "YZ", "left_value": 4, "right_role": "ZT", "right_value": 2, "station": "Z"}, {"left_role": "ZT", "left_value": 13, "right_role": "TI", "right_value": 10, "station": "T"}], "pair_cost": 2, "strict_solution_count": 0, "weak_pair_count": 0}
- {"best_assignment": {"I": 4, "T": 3, "W": 0, "X": 1, "Y": 2, "Z": 4}, "best_mismatch_count": 1, "best_role_pairs": {"IW": {"cost": 2, "evidence": {"slot_edge": [0, 4]}, "from": 4, "source": "support_slot_edge", "to": 0}, "TI": {"cost": 2, "evidence": {"slot_edge": [3, 4]}, "from": 3, "source": "support_slot_edge", "to": 4}, "WX": {"cost": 0, "evidence": {"endpoints": [0, 1]}, "from": 0, "source": "open_path_endpoint", "to": 1}, "XY": {"cost": 0, "evidence": {"endpoints": [1, 2]}, "from": 1, "source": "open_path_endpoint", "to": 2}, "YZ": {"cost": 2, "evidence": {"slot_edge": [0, 4]}, "from": 0, "source": "support_slot_edge", "to": 4}, "ZT": {"cost": 5, "evidence": {"endpoints": [2, 3, 4, 14]}, "from": 4, "source": "disconnected_endpoint_join", "to": 3}}, "cycle": 1, "mismatches": [{"left_role": "XY", "left_value": 2, "right_role": "YZ", "right_value": 0, "station": "Y"}], "pair_cost": 11, "strict_solution_count": 0, "weak_pair_count": 1}
- {"best_assignment": {"I": 4, "T": 6, "W": 0, "X": 1, "Y": 2, "Z": 11}, "best_mismatch_count": 1, "best_role_pairs": {"IW": {"cost": 2, "evidence": {"slot_edge": [0, 4]}, "from": 4, "source": "support_slot_edge", "to": 0}, "TI": {"cost": 5, "evidence": {"endpoints": [4, 5, 6, 10]}, "from": 6, "source": "disconnected_endpoint_join", "to": 4}, "WX": {"cost": 0, "evidence": {"endpoints": [0, 1]}, "from": 0, "source": "open_path_endpoint", "to": 1}, "XY": {"cost": 0, "evidence": {"endpoints": [1, 2]}, "from": 1, "source": "open_path_endpoint", "to": 2}, "YZ": {"cost": 0, "evidence": {"endpoints": [2, 11]}, "from": 2, "source": "open_path_endpoint", "to": 11}, "ZT": {"cost": 2, "evidence": {"slot_edge": [6, 14]}, "from": 14, "source": "support_slot_edge", "to": 6}}, "cycle": 2, "mismatches": [{"left_role": "YZ", "left_value": 11, "right_role": "ZT", "right_value": 14, "station": "Z"}], "pair_cost": 9, "strict_solution_count": 0, "weak_pair_count": 1}

## Classification

- what_is_closed: ["simple slot-path generator failed", "simple column hypergraph generator failed", "exact selector family found but rejected as generator", "selector overfit audited", "IW reusable non-lookup subgrammar salvaged as hint", "strict station-variable generator not found", "station obstruction localized"]
- what_remains_open: ["source-native WXYZTI row/register generator", "source derivation of interior turn seam", "reason why ZT/TI/YZ residues organize as the observed WXYZTI rows", "full 900 carrier-to-register map"]
- forbidden_promotions: ["do not call the exact selector family a generator", "do not call the Mode 2 mirror a source law", "do not call station best assignments source-derived", "do not close Gap A from this obstruction record"]
- allowed_use: ["treat outer frame stability as evidence for partial register structure", "treat interior turn seam as the next target", "use IW subgrammar as a hint only", "use this as a plateau note if Gap A is left open"]

## Interpretation

- main_result: The bounded station-variable search did not find a strict WXYZTI generator, but it localized the obstruction.
- outer_frame: WX, XY, and IW stabilize across cycles in the best assignments.
- interior_seam: YZ, ZT, and TI remain unstable, with mismatches concentrated at Y, Z, and T, especially Z.
- why_this_matters: Gap A is no longer a global mystery. The obstruction is localized to the interior turn seam.
- why_not_closure: A localized obstruction is not a source-native generator; it only tells us where the missing generator must act.
- next_move: Search a richer interior-turn seam grammar, or record Gap A as open with a localized obstruction.

## Claim

- does_this_close_gap_a: false
- does_this_record_localized_obstruction: true
- does_this_stabilize_outer_frame: true
- does_this_identify_interior_turn_seam_as_target: true
- does_this_find_source_native_generator: false
- short_form: "Gap A stabilized the outer register frame but obstructed at the interior turn seam."
- not_closed_reason: "A localized obstruction is not a source-native generator; it only tells us where the missing generator must act."
- next_problem: "Search a richer interior-turn seam grammar, or record Gap A as open with a localized obstruction."

## Checks

- PASS station_search_loaded: gap_a_station_variable_strict_candidate_not_found
- PASS overfit_audit_loaded: gap_a_bruteforce_selector_overfit_audited_reusable_subgrammar_salvaged_not_generator
- PASS bruteforce_loaded: gap_a_bruteforce_wxyzti_register_exact_selector_family_found_not_generator
- PASS derivation_return_loaded: gap_a_wxyzti_register_generator_slot_path_candidate_not_found
- PASS mode2_boundary_loaded: gap_a_mode2_projection_mirror_boundary_note_recorded
- PASS boundary_theorem_loaded: gap_a_boundary_theorem_note_recorded
- PASS no_strict_station_generator: false
- PASS outer_frame_stable: ["IW", "WX", "XY"]
- PASS interior_turn_unstable: ["TI", "YZ", "ZT"]
- PASS z_obstruction_present: {"T": 1, "Y": 1, "Z": 2}
- PASS gap_a_not_closed: obstruction record only

## Next script

    search_gap_a_interior_turn_seam_grammar_001.py
