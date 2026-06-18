# G900 P7 hinge-return pocket source provenance audit 001

Status: `p7_hinge_return_pocket_source_provenance_audit_passed`

This audit tests whether the unique P7 hinge and right-wing nonclean pocket are visible in source fields beyond transition weights.

## Result

- hinge pair: `03_09`
- hinge transition length: `3`
- hinge package kind: `clean_reciprocal_pair_package`
- right-wing nonclean pairs: `['09_12', '06_12']`
- right-wing nonclean root sets: `[['12'], ['12']]`
- right-wing nonclean transition lengths: `[1, 2]`
- right-wing clean exit: `['06_13']`
- dominant root sequence: `['08', '03', '09', '12', '12', '13']`
- transition length sequence: `[3, 3, 3, 1, 2, 3]`
- channel count: `0`

## Interpretation

The winning hinge `03_09` is source-visible as a clean length-3 transition package. The right-wing nonclean pocket is source-visible as `09_12` and `06_12`, both rooted at slot `12`, with transition lengths `1` and `2`. The right wing exits through the clean pair `06_13`.

This still does not admit a channel.

## Boundary

This is a source provenance audit only. It admits no channels, renders no channels, mutates no body, lights no marker, and makes no force or physics claim.
