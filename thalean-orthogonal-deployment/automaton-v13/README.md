# G9000 Automaton Observatory v1.3

Extends the existing Orthogonal Observatory at https://aletheos.ai/observatories/thalean-orthogonal/ . The original Assembly, Inverse cube and Sheet history views remain available. Encounter Lab adds two independent native entities, a shared native-graph visualization and an isolated, opt-in declared joint-field experiment.

## Use

Select Encounter Lab. Entity A is cyan; Entity B is amber. Enter zero-based native addresses and choose **Prepare / clear run**. Step either entity, step both or play the synchronous pair. Preparing clears this run's actions and observations. The original clock is hidden in this view; the pair uses one synchronous F step per second. Space on the canvas toggles pair playback.

**Approach preset** prepares (7208,16): Step A produces native adjacency at (0,16). Synchronous F preserves adjacency or nonadjacency. **Hidden-partner preset** prepares (488,16), which has no native adjacency, despite A sharing the quotient projection of0. Exact entity states disclose frame, quotient, relative sheet, hidden bit and next F label.

**Record pair** appends a read-only observation. **Export automaton replay** saves preparations, exact action history, observations, source fingerprints and any experimental snapshot. Verify it from the repository's source directory with `node scripts/replay-automaton.cjs FILE.json`. Save/load retains view, current addresses as fresh preparations, camera and legacy display settings. Loading starts a fresh run and resets experimental time to0. Playback is not restored.

**Original three projections** restores the legacy rendering and tools. Its older replay export remains separate from the new automaton replay.

## Scientific scope

The native entities are point-supported configurations on independent 9,000-state automata, commonly registered on the unchanged native graph. The display embedding is visualization. Adjacency is eligibility, not a physical interaction. Extended-body placement and a field response/backreaction law remain open. No native coupling has been added.

The isolated experimental section starts disabled. Witness008 uses a declared correlated field over pairs of configurations in a different (diagonal-b) registration. Its25 selected positive local terms discover a 31-state prepared component. The slider evaluates its analytic evolution in units T=pi/kappa. At T, the probe is home7 and witness488 is written; at2T the prepared state resets. It never changes the native entity instances. Its bars are norm fractions, not detector probabilities. Source reference0 is fixed; no source backreaction, physical clock or permanent memory is claimed.

Sources, exact certificates and boundaries: `../source/provenance/two-entity-field-001/`. Current UI and numerical/browser checks: `../source/provenance/automaton-ui-001/`. Native graph/model, clock, camera, inverse-volume and registered-history modules retain their baseline hashes.

## Validate and build

From `../source`:

```bash
python3 scripts/check-automaton-release.py
python3 scripts/prepare-automaton-release.py
```

The first command executes native/legacy/model/controller/replay checks and the independent SciPy matrix exponential. It checks the separately recorded real-browser session against UI source hashes; it does not pretend to rerun a browser. The second builds the self-contained page, pins its source/output digests, runs17 real installer/wrapper safety tests with local SSH/HTTP adapters and creates the ZIP. No command above deploys.

## Deployment and rollback

Use `TERMUX.md`. Only the verified v1.2 page hash is accepted as the predecessor:

`29ee7dc62e1bab177c4e2048b29868ae54831519e5764545ba3449012063a7d1`

Installation preserves it as `index.before-automaton-v13.html`, distinct from earlier backups. An unknown current page, conflicting backup, symlink or existing lock stops replacement. The upload is staged and checksum-verified before atomic replacement. Identical retries are safe.

Rollback accepts only this v1.3 release as current, verifies the exact v1.2 backup, restores it atomically and retains the backup. It refuses to overwrite subsequent edits. A public verification failure after SSH can mean installation completed: inspect the returned hash before deciding what to do next.

This package was prepared for owner-operated Termux installation. No production deployment is claimed until Termux reports `LIVE VERIFIED` for this release's checksum.
