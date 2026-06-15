# WXYZTI station record provenance keys 001

Status: wxyzti_station_record_provenance_keys_recorded

## Summary

- forms_key: "wxyzti_admitted_forms"
- form_count: 4
- station_count: 28
- edge_label_counts: {"reverse_partner": 12, "shared_B": 12}
- stations_with_record_like_fields: 28
- stations_with_address_like_fields: 28
- stations_with_abc_like_fields: 28
- stations_with_artifact_value_matches: 28
- global_terminal_key_counts_top_80: {"A": 28, "B": 28, "C": 28, "C_plus_1": 28, "address_pair_source[]": 56, "columns[]": 56, "fiber": 28, "handedness_word": 28, "key": 28, "role": 28, "slot": 28}
- global_integer_ranges: {"0_119": 280, "0_14": 254, "0_59": 280, "0_899": 280}
- common_station_scalar_paths: {"$.A": 28, "$.B": 28, "$.C": 28, "$.C_plus_1": 28, "$.address_pair_source[0]": 28, "$.address_pair_source[1]": 28, "$.columns[0]": 28, "$.columns[1]": 28, "$.fiber": 28, "$.handedness_word": 28, "$.key": 28, "$.role": 28, "$.slot": 28}
- bridge_search_status: "record_120_to_channel_join_bridge_not_found_in_scanned_artifacts"
- bridge_found_in_previous_search: false
- alignment_status: "source_native_nrc_wxyzti_channel_alignment_needs_bridge"
- direct_alignment_possible: false
- bridge_key_hypothesis_available: true
- gap_a_closed: false
- full_g900_admission_found: false
- next_step: "derive_bridge_from_station_provenance_keys_or_report_missing_keys"

## Station compact reports

- form0:W:0: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form0:X:1: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form0:Y:2: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form0:Z:3: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form0:T:4: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form0:I:5: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form0:W:6: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form1:W:0: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form1:X:1: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form1:Y:2: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form1:Z:3: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form1:T:4: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form1:I:5: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form1:W:6: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form2:W:0: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form2:X:1: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=46
- form2:Y:2: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form2:Z:3: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form2:T:4: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form2:I:5: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form2:W:6: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form3:W:0: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form3:X:1: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form3:Y:2: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form3:Z:3: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form3:T:4: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form3:I:5: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80
- form3:W:6: signature_values=13, record_like=2, address_like=4, abc_like=3, artifact_matches=80

## Boundary

- This inspects station provenance keys only.
- This does not construct the bridge yet.
- This does not claim a G60-native NRC generator.
- This does not close Gap A.
- This does not prove full G900.

## Checks

- PASS forms_present: 4
- PASS station_records_present: 28
- PASS bridge_search_loaded: record_120_to_channel_join_bridge_not_found_in_scanned_artifacts
- PASS alignment_loaded: source_native_nrc_wxyzti_channel_alignment_needs_bridge
- PASS provenance_inspection_recorded: inspection only
- PASS no_generator_claim_made: key inspection only
