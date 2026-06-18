# G900 global return-cell label-free selector audit 001

Status: `global_return_cell_label_free_selector_audit_passed`

Verdict: `label_free_selector_recovers_unique_return_cell`

This audit tests whether the unique oriented local return cell can be recovered without using package labels.

## Selector fields

The selector uses:

- transition lengths: `[3, 1, 2, 3]`
- root pattern: `a,b,b,c`
- endpoint rule on every edge
- boundary carrier present on every edge

It does not use `package_kind` for selection. Package kinds are reported only afterward for evaluation.

## Scope

- package count: `10`
- oriented simple four-edge windows: `12`
- not all G900 body paths: `true`

## Result

- selected count: `1`
- exact selected count: `1`
- selected pairs: `[['03_09', '09_12', '06_12', '06_13']]`
- selected roots: `[['09', '12', '12', '13']]`
- selected package kinds for evaluation only: `[['clean_reciprocal_pair_package', 'one_way_single_transition', 'two_transition_pair_package', 'clean_reciprocal_pair_package']]`
- channel count: `0`

## Boundary

This is a label-free selector audit only. It admits no channels, renders no channels, mutates no body, lights no marker, and makes no force or physics claim.
