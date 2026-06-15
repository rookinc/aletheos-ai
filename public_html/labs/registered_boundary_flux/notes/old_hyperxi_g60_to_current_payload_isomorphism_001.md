# Old Hyperxi G60 to current payload isomorphism 001

Status: old_hyperxi_g60_isomorphic_to_current_payload

## Summary

- old_source: "/data/data/com.termux/files/home/dev/zarchive/zarchive/hyperxi_lab/reports/true_quotients/export_thalean_graph_definition.json"
- current_source: "/data/data/com.termux/files/home/dev/cori/aletheos.ai/public_html/labs/registered_boundary_flux/data/canonical_g60_local_edges.v1.csv"
- map_source: "/data/data/com.termux/files/home/tmp/old_g60_to_current_g60_vertex_map.json"
- isomorphic: true
- mapped_exact_match: true
- mapping_count: 60
- old_identity_profile: {"automorphism_count": 480, "degree_set": [4], "diameter": 6, "edges": 120, "shell_profile": [1, 4, 8, 16, 24, 6, 1], "triangles": 40, "vertices": 60}
- current_identity_profile: {"degree_set": [4], "edges": 120, "shell_profile": [1, 4, 8, 16, 24, 6, 1], "triangles": 40, "vertices": 60}
- interpretation: "The old Hyperxi G60 definition and current lab G60 payload are the same canonical G60 graph under vertex relabeling."
- gap_a_closed: false
- full_g900_admission_found: false
- next_step: "use_old_hyperxi_g60_as_second_provenance_source"

## Boundary

- This records graph identity under relabeling.
- This does not derive a G60-native NRC generator.
- This does not close Gap A.
- This does not prove full G900.

## Checks

- PASS map_loaded: /data/data/com.termux/files/home/tmp/old_g60_to_current_g60_vertex_map.json
- PASS isomorphic: True
- PASS mapped_exact_match: True
- PASS mapping_count_60: 60
- PASS old_source_exists: /data/data/com.termux/files/home/dev/zarchive/zarchive/hyperxi_lab/reports/true_quotients/export_thalean_graph_definition.json
- PASS current_source_exists: /data/data/com.termux/files/home/dev/cori/aletheos.ai/public_html/labs/registered_boundary_flux/data/canonical_g60_local_edges.v1.csv
- PASS no_gap_a_claim_made: provenance only
