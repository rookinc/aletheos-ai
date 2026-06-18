# g900_six_nine_ladder_schema_microscope_003

Status: `schema_microscope_found_clean_and_broken_ladder_occurrences`

## Purpose

This is a schema microscope, not a theory claim. It checks whether the prior native-anchor asymmetry artifact actually contains the clean ladder `[3,6,9,12]` and the broken ladder `[3,9,6,12]`, and how the failed provenance extractor labeled them.

## Counts

- audit_pass: `True`
- source_exists: `True`
- prior_exists: `True`
- source_ladder_occurrence_count: `58`
- target_clean_ladder_occurrence_count: `35`
- broken_ladder_occurrence_count: `23`
- prior_branch_row_count: `7`
- prior_label_counts: `{'absent_candidate': 7}`

## Source hits

- `target_clean_ladder` pointer `$.branches[0].features` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.branches[0].features` key `ladder_set_signature` ladder `[3, 6, 9, 12]`
- `broken_ladder` pointer `$.branches[1].features` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `target_clean_ladder` pointer `$.branches[1].features` key `ladder_set_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.preferred_receipt_holds[0].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.preferred_receipt_holds[1].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.preferred_receipt_holds[2].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.preferred_receipt_holds[3].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.preferred_receipt_holds[4].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.preferred_receipt_holds[5].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.preferred_receipt_holds[6].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.preferred_receipt_holds[7].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.preferred_receipt_holds[8].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.preferred_receipt_holds[9].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[0].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[1].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[2].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[3].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[4].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[5].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[6].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[7].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[8].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[9].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[10].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[11].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[12].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[13].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[14].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[15].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[16].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[17]` key `value` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[17].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[18].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[19].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `target_clean_ladder` pointer `$.receipt_selectors[20].selected_branches[0]` key `ladder_signature` ladder `[3, 6, 9, 12]`
- `broken_ladder` pointer `$.absent_selectors[0].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[1].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[2].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[3].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[4].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[5].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[6].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[7].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[8].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[9].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[10].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[11].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[12].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[13].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[14].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[15].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[16].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[17]` key `value` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[17].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[18].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[19].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`
- `broken_ladder` pointer `$.absent_selectors[20].selected_branches[0]` key `ladder_signature` ladder `[3, 9, 6, 12]`

## Prior extracted rows

- row `0` label `absent_candidate` ladder `[3, 6, 9, 12]` pointer `$.branches[0].features` anchor `9` root `12` distance `3`
- row `1` label `absent_candidate` ladder `[3, 9, 6, 12]` pointer `$.branches[1].features` anchor `6` root `12` distance `6`
- row `2` label `absent_candidate` ladder `[3, 6, 9, 12]` pointer `$.branches[1].features` anchor `6` root `12` distance `6`
- row `3` label `absent_candidate` ladder `[3, 6, 9, 12]` pointer `$.receipt_selectors[20].selected_branches[0]` anchor `9` root `None` distance `None`
- row `4` label `absent_candidate` ladder `[3, 6, 9, 12]` pointer `$.receipt_selectors[17]` anchor `None` root `None` distance `None`
- row `5` label `absent_candidate` ladder `[3, 9, 6, 12]` pointer `$.absent_selectors[20].selected_branches[0]` anchor `6` root `None` distance `None`
- row `6` label `absent_candidate` ladder `[3, 9, 6, 12]` pointer `$.absent_selectors[17]` anchor `None` root `None` distance `None`

## Boundary

This records schema evidence only. It does not admit closure, transport, channel, marker lighting, viewer/body mutation, force, physics, or unification claims.

Next step: repair provenance extractor labels using actual source schema.
