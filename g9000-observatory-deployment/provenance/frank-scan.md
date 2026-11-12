# Frank-thread recovery used by the Absence lens

The user asked to scan “Summarize Frank's Argument” while upgrading the G9000 Paired Field Observatory. Personal Context returned “Personal context is unavailable for this conversation.” Exact thread-title, Frank and G9000 Page searches returned no matching transcript or observatory identity. A complete Frank-thread scan is therefore not claimed.

The current, explicitly identified Frank-linked Gate014 certificate and producer were read. The producer was replayed in an isolated working scope before its original hard-coded output write; its computed report matched the current JSON exactly.

- [Gate014 certificate](https://chatgpt.com/library?file_id=libfile_80e8d28586488191b1926cd3acc25a68&account_id=personal)
- [Gate014 producer](https://chatgpt.com/library?file_id=libfile_5fb01ea14cac8191b254130d1e6a50a1&account_id=personal)

## Exact recovered structure

The construction is independently generated L(Petersen): 15 vertices, 30 edges and 12 pentagons. It does not assert an original G60 source-label crosswalk.

| Pair relation | Number of unordered pairs |
|---|---:|
| No common vertex or edge | 6 |
| One common vertex, no common edge | 30 |
| One shared edge, two common vertices | 30 |

Every selected pentagon has one disjoint mate, five vertex-touch neighbors and five edge-sharing neighbors. The edge-sharing graph on the twelve pentagons is K6,6 minus a perfect matching; its two sheets have six pentagons each. The six disjoint pairs are precisely that missing cross-sheet matching.

The certificate reports 120 induced automorphisms, 60 preserving and 60 exchanging the sheets, with the matching covariant. The unordered/oriented matched-pair stabilizers have sizes 20 and 10. This is not a spinor theorem.

Visible conversation breadcrumbs also included a proposed repeated `[5 4 3 | 3 4 5]` packet and questions about CMB orientation and spinors. Those are exploratory requests, not certified identifications. They are not used to assign physical geometry or dynamics in this lens.

## Integration

Load `absence-data.js`, then `absence-lens.js`, and include `absence-lens.css`:

```js
const inspector = window.ABSENCE_LENS.mount(hostElement);
// Call when disposing the host:
inspector.destroy();
```

`getState()` returns the two zero-based pentagon indices and the relation filter. `setSelection(first, second, filter)` supports `all`, `disjoint`, `vertex`, or `edge`. The visible vertex labels are one-based: source index 0 is vertex 1. The raw source indices and construction limitations are available only in the collapsed details.

The SVG is a schematic L(Petersen) embedding. Disjointness means combinatorial non-incidence; no physical absence, CMB alignment or spinor behavior is certified.

Run the content checks with:

```sh
node scripts/absence-lens.test.cjs
```

The checks cover all 66 pairs, complete 1/5/5 profiles, matching involution, legal pentagon edges, the crown-sheet structure and one-based display labels. The module owns its listeners and removes them through `destroy()`; remounting the same host disposes the previous instance.
