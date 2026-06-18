# G900 global local return-cell oriented census 001

Status: `global_local_return_cell_oriented_census_passed`

Verdict: `oriented_global_local_return_cell_unique_in_current_full60_package_graph`

This census tests whether the P7 local return-cell signature is unique across oriented simple four-edge paths in the current full60 phase-package graph.

## Why oriented

The closure signature is directional:

`clean -> one-way -> two-transition -> clean`

A canonical undirected path can erase that order. This census keeps both orientations.

## Scope

- source: `public_html/labs/g900_observatory/artifacts/json/g900_full60_transition_package_anatomy_001.v1.json`
- package count: `10`
- oriented simple four-edge paths tested: `12`
- not all G900 body paths: `true`

## Result

- structural candidate count: `1`
- exact candidate count: `1`
- structural candidate pairs: `[['03_09', '09_12', '06_12', '06_13']]`
- exact candidate pairs: `[['03_09', '09_12', '06_12', '06_13']]`
- target oriented hit count: `1`
- target reverse hit count: `1`
- channel count: `0`

## Boundary

This is an oriented global census over the current full60 package graph only. It admits no channels, renders no channels, mutates no body, lights no marker, and makes no force or physics claim.
