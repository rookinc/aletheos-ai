# Selected WXYZTI target 001

Status: normalized target, not proof.

## Purpose

This artifact normalizes the selected FHE/K900 WXYZTI target object that future register-map proof scripts must recover.

## Boundary

- This records the target class.
- It does not prove the chamber/register map.
- It does not change the Perfect Return Cell UI.
- Future proof scripts must recover this target from finite predicates rather than assuming it.

## Role order

    W, X, Y, Z, T, I

Edge role order:

    WX, XY, YZ, ZT, TI, IW

Role-relative sign pattern:

    1, 1, 1, 0, 1, 1

## Target class Apre

Base cycles:

    [0, 1, 2, 3, 4, 5]
    [0, 1, 2, 7, 10, 5]
    [0, 1, 2, 8, 14, 5]

Shared positions:

    W = 0
    X = 1
    Y = 2
    I = 5

Variable ZT branches:

    ZT = 3-4
    ZT = 7-10
    ZT = 8-14

Keeper line:

    Apre closes through an even central coupler between odd-active sides.

## Confirmation summary

- all_three_cycles_seen_in_some_source: True
- all_three_zt_edges_seen_in_some_source: True
- source_count: 9

## Next use

This target becomes the expected output for register-map candidate tests and row-aware M-incidence recovery checks.
