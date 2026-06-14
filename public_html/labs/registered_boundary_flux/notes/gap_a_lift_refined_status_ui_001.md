# Gap A lift-refined status UI 001

Status: gap_a_lift_refined_status_wired_into_perfect_return_cell

## Boundary

- This is a UI/status wiring pass.
- It does not change the theorem note.
- It does not claim Gap A is closed.
- It exposes the bounded lift-refined status compactly.

## Outputs

- data: {"path": "registered_boundary_flux/data/gap_a_lift_refined_status.v1.json", "sha256": "c561586ede18035cbd1c61694f09f55327e505693ad3132ac387c5fba8c87fa9"}
- html: {"path": "registered_boundary_flux/perfect_return_cell.html", "sha256": "b36d8506a9c7d06d0efee00301f9aef4b2f8ae7b124847255e1bec4e46f37ee0", "action": "inserted_before_main_close"}
- css: {"path": "registered_boundary_flux/perfect_return_cell.css", "sha256": "faa9b9def35df25fb2c5ca9a4273e89ade6da3bea858f88fb30e894e4591cc65", "action": "appended"}
- js: {"path": "registered_boundary_flux/perfect_return_cell.js", "sha256": "6831834d61bff4d9b3a825dd845dd204e0ed68642c409ee4a037788bb49e8f9a", "action": "appended"}

## Compact status

- Gap A open
- bounded partial closure
- 16 of 18 rows close after W seam
- ZT residual branch-stable
- TI residual branch-sensitive
- no residual flip accepted

## UI copy

- title: "Gap A status"
- eyebrow: "lift-refined partial closure"
- lede: "Gap A remains open, but the obstruction is sharply bounded."
- detail: "After the W-boundary seam, 16 of 18 role rows close. The two remaining residuals lift into P900/G900 and split: ZT is branch-stable, while TI is branch-sensitive."
- boundary: "Not a full chamber/register map proof. No residual flip rule is accepted."

## Checks

- PASS theorem_status_ok: status=gap_a_lift_refined_partial_closure_theorem_note_recorded
- PASS data_written: registered_boundary_flux/data/gap_a_lift_refined_status.v1.json
- PASS html_exists: registered_boundary_flux/perfect_return_cell.html
- PASS css_exists: registered_boundary_flux/perfect_return_cell.css
- PASS js_exists: registered_boundary_flux/perfect_return_cell.js
- PASS html_marker_present: markers in html
- PASS html_status_text_present: status text
- PASS css_marker_present: markers in css
- PASS js_marker_present: markers in js

## Next script

    verify_gap_a_lift_refined_status_ui_001.py
