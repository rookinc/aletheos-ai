# Selected WXYZTI edge-column projection 001

Status: selected_wxyzti_projection_partial_not_map_proof

Gap: A - chamber/register map.

## Boundary

- This is not a chamber/register map proof.
- This checks visibility of selected WXYZTI cycle edges in the verified 30-column edge layer.
- Missing edges are not treated as failure; they localize where another register-transport step may be needed.
- The edge-column bridge remains verified, but WXYZTI cycle visibility may be partial.

## Summary

- target_cycle_count: 3
- total_cycle_edges: 18
- present_cycle_edges: 8
- missing_cycle_edges: 10
- selected_zt_edges: [[3, 4], [7, 10], [8, 14]]
- selected_zt_present: 1
- selected_zt_missing: 2
- all_target_edges_present: false
- all_selected_zt_edges_present: false

## Role summary

- WX: present=3 missing=0 present_edges=[[0, 1], [0, 1], [0, 1]] missing_edges=[]
- XY: present=3 missing=0 present_edges=[[1, 2], [1, 2], [1, 2]] missing_edges=[]
- YZ: present=0 missing=3 present_edges=[] missing_edges=[[2, 3], [2, 7], [2, 8]]
- ZT: present=1 missing=2 present_edges=[[3, 4]] missing_edges=[[7, 10], [8, 14]]
- TI: present=1 missing=2 present_edges=[[4, 5]] missing_edges=[[10, 5], [14, 5]]
- IW: present=0 missing=3 present_edges=[] missing_edges=[[5, 0], [5, 0], [5, 0]]

## Selected ZT projection

- edge=[3, 4] present=True column=9 cocycle=1
- edge=[7, 10] present=False column=None cocycle=None
- edge=[8, 14] present=False column=None cocycle=None

## Interpretation

- main_result: The selected WXYZTI target has been projected against the verified edge-column bridge.
- if_partial: A partial result means the 30-column source edge layer is not identical to the selected WXYZTI cycle-edge register.
- what_this_gives: The register-map problem is now localized to the missing role edges or to the transport that carries them into the WXYZTI witness register.
- what_remains_open: Full Gap A closure still requires a lawful map from G60/source structure into the WXYZTI register.

## Checks

- PASS alignment_loaded: status=edge_column_transport_role_alignment_verified_not_map_proof
- PASS target_loaded: status=normalized_target_not_proof
- PASS edge_lookup_has_30_edges: edge_count=30
- PASS target_has_3_cycles: cycle_count=3
- PASS target_has_3_selected_zt_edges: zt_count=3

## Next script

    derive_gap_a_missing_wxyzti_edge_transport_001.py
