# WXYZTI slot-fiber channel bridge 001

Status: wxyzti_slot_fiber_channel_bridge_failed

## Bridge rule

station.slot + station.fiber -> (slot, local=fiber), vertex=slot*60+fiber

## Summary

- forms_key: "wxyzti_admitted_forms"
- form_count: 4
- station_total: 28
- station_addressed: 28
- all_station_addressed: true
- edge_total: 24
- edge_resolved: 0
- all_edges_resolved: false
- edge_channel_counts: {"unresolved": 24}
- label_channel_counts: {"reverse_partner -> unresolved": 12, "shared_B -> unresolved": 12}
- expected_role_fit: false
- address_conflict_count: 0
- bridge_constructed: false
- bridge_rule: "station.slot + station.fiber -> (slot, local=fiber), vertex=slot*60+fiber"
- gap_a_closed: false
- full_g900_admission_found: false
- next_step: "inspect_failed_slot_fiber_bridge_edges"

## Forms

- form 0: stations=7, addressed=6, edges=6, resolved=0, all_edges_resolved=False
- form 1: stations=7, addressed=6, edges=6, resolved=0, all_edges_resolved=False
- form 2: stations=7, addressed=6, edges=6, resolved=0, all_edges_resolved=False
- form 3: stations=7, addressed=6, edges=6, resolved=0, all_edges_resolved=False

## Boundary

- This constructs a WXYZTI station-to-channel bridge if checks pass.
- This does not yet prove a G60-native NRC generator.
- This does not close Gap A.
- This does not prove full G900.

## Checks

- PASS channel_join_loaded: channel_aware_g60_g15_join_constructed
- PASS provenance_keys_loaded: wxyzti_station_record_provenance_keys_recorded
- PASS forms_present: 4
- PASS all_station_addressed: 28/28
- FAIL all_edges_resolved: 0/24
- FAIL expected_role_fit: {'reverse_partner -> unresolved': 12, 'shared_B -> unresolved': 12}
- PASS no_address_conflicts: 0
- FAIL bridge_constructed: False
- PASS no_generator_claim_made: bridge only
