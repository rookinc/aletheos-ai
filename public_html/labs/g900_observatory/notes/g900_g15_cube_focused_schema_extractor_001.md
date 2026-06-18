# G900 G15 cube focused schema extractor 001

Status: `g15_cube_focused_schema_extractor_recorded`

## Question

What exact source schema fields carry the 6/9 package support failure, and do they support the face/seam reading?

## Result

Verdict: `g15_cube_focused_schema_extractor_passed`

Focused schema extraction confirms that labels 6 and 9 are both active in the package-support schema, with support-failure context present.

## Focused status

`six_nine_package_support_schema_extracted`

Face/seam reading supported by focused schema: `True`

## Sources

- `g900_full60_package_support_audit_001.v1.json`
- `g900_full60_package_support_audit_001_steps.v1.csv`
- `g900_full60_package_support_audit_001_packages.v1.csv`

## 6/9 counts

- label 6 rows: `161`
- label 9 rows: `148`
- pair/named 6/9 rows: `124`
- support-failure rows: `12`
- boundary/face signal rows: `165`

## Boundary

Focused extractor only.

No full cube assignment derived.

No transport admission.

No channel admission.

No viewer change.

No body mutation.

No force claim.

No physics claim.
