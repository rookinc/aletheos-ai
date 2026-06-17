# G900 marker debug page 001

Status: isolated marker debug page.

This page is separate from the live G900 Observatory stage.

Files:

- marker_debug.html
- kernel/g900_marker_debug.js

Boundary:

- does not import g900_grammar_stage_v0.js
- does not change lab.html
- does not add UI to the live Observatory
- does not admit channels
- does not mutate the G900 body
- renders only a debug view of existing body edges from the data-only marker registry
