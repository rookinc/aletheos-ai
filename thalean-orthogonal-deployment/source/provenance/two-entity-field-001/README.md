# G9000 Two-Entity Field Test 001

Request: test two independent G9000 entities encountering within a shared G9000 field.

**Verdict:** native two-entity kinematics and a declared local correlated-field model pass their respective tests. A source-selected joint law for two extended G9000 bodies in a dynamical field on one G9000 carrier remains unestablished. No application or deployment was changed.

## Native product test

`node scripts/test-two-entity-field.cjs` constructs two independent native automaton instances from the observatory's preserved source. The common native graph supplies the field's relational substrate. This is an explicit common registration and a static graph, not an invented dynamical field equation. Entity preparations occupy native addresses; no shape/placement law for two extended bodies is assumed.

There are 81,000,000 ordered joint states `(a,b)`. The product transition is `T0(a,b)=(F(a),F(b))`; its least period is 20 and there are 4,050,000 joint cycles. These counts follow from the certified single-factor periods and independent product; the audit does not claim to enumerate every joint state.

The native contact predicate is `C(a,b)=1` exactly when the addresses are adjacent in the shared native graph. Co-location is separate. F maps all 45,000 graph edges onto graph edges bijectively. Thus both contacts and noncontacts are preserved for every joint state under synchronous T0. The audit also explicitly checks 900,000 edge/phase cases. Initially nonadjacent entities cannot enter adjacency by synchronous F alone.

An externally specified asynchronous control can approach: with B fixed at 16, A moves from 7208 to 0 and changes adjacency from false to true. Advancing both instead preserves false. The schedule is declared; contact does not select a response or modify native F.

### A second entity resolves a hidden distinction relationally

For every native state x, the ten neighbors of x and the ten neighbors of D(x), D=F^10, are disjoint. Example:

| A state | A quotient projection | B state | Native adjacency |
| --- | --- | --- | --- |
| 0 | (0,0) | 16 | Yes |
| 488 | (0,0) | 16 | No |

The two A states look identical under pi but differ to the relational selector with the same B. This is an exact source-derived eligibility/readout predicate. The distinction is already visible to this enlarged relational observation before continuation; it is not evidence of a dynamically inscribed and subsequently used record.

The original 180,000 single-factor equal-continuation checks are repeated. Every independent F_A/F_B word reduces to separate powers; component factorization proves the joint quotient remains equal for all 400 exponent combinations and every four-point joint hidden-state fiber. Observation causes zero coupling events and no native source mutation.

## Declared local interaction model

The preserved Encounter Witness 010 archive (SHA-256 `509e639c915c22c4bfa95af3adcf74998e887886cb65cad54c448d08879d5852`) contains the sealed 009 and 008 sources. Those sources were extracted into fresh temporary directories, their manifests verified, and their main and independent producers executed. The complete receipts and result certificates are retained here.

The008 field is **Psi(a,b) in V over X_A x X_B**, with `V=C6 tensor C2_internal`. It assigns one amplitude fiber to a *joint configuration*. It is not a separate V field for each entity, nor is it an already derived ambient `Phi(v)` on one 9,000-site field. Its source reference 0 is fixed; no source backreaction is modeled. The native graph is the reciprocal experiment's diagonal-b registration, distinct from the observatory's diagonal-a registration.

With 25 chosen positive local terms, the discovered prepared component contains 31 actual joint configurations. Twenty-four terms have support on a single native bond; one uses a connected three-site neighborhood. Its exact transfer sends `(7,0)` to `(7,488)` at `T=pi/kappa`, with conserved norm and energy in the declared model. At `2T`, the entire prepared component returns exactly. Temporary witness retention does not constitute permanent autonomous storage.

A new direct counterfactual using the recovered global rules removes the single vacancy condition involving source site 0. The reachable component expands from **31 to 39** configurations, losing the certified mirror component. The local condition is dynamically effective in this declared model.

The009 independently derived product restriction cannot write W488 from the same preparation: witness support stays in `{0,255}`. The successful model therefore requires the declared correlated joint-field carrier. A positive, local, symmetry-compatible program is possible, but those properties do not uniquely select it as a native physical law.

## Independent replay of the new field readout

Encounter010's fresh replay passed **33 composition checks, 65 native-gate checks and 46 independent checks**. Custody verified 33 manifests and 784 member hashes across 38 unique archives. Custody is not a replay of every ancestor; the optional Universal Carrier parent rerun was not requested in this test.

The controlled closed-address echo gives different later face readouts after the same mixer, with explicit pulse timing/registration. The preparation-specific native t witness has all 36 initial face moments equal and later readouts different. Its native operation words are not an admitted local inscription law, and its G9000 encounter crosswalk remains uncertified. These boundaries survive independent replay.

## Reproduce

From `thalean-orthogonal-deployment/source`, with Node, Python, NumPy, SymPy, SciPy, NetworkX and Matplotlib installed:

```bash
node scripts/test-two-entity-field.cjs
python3 scripts/replay-two-entity-field.py --archive /path/to/G9000_ENCOUNTER_WITNESS_010_Audit_Package.zip
```

The archive's exact persistent identifier is recorded in `audit.json`. The recorded execution reused only the fresh010 replay already run during this same request; its four successful subprocess receipts are preserved in `010-execution.json`. Omitting `--reuse-010` executes those stages anew. The programs never patch the source carrier or the web application.

## What remains to make the requested architecture native

1. Specify the native degrees of freedom and placement maps for two *extended* G9000 entities.
2. Recover a field state and evolution on the shared carrier, including entity-to-field and field-to-entity response.
3. Derive the contact-admitted joint transition and its rates/selection from source operations.
4. Reconcile registrations before relating that law to this observatory.
5. Reproduce write, return and common-continuation distinction in that same model, with the observation projection fixed in advance.

The exact product obstruction and the successful declared-model control give concrete tests for that next law. Neither is a license to insert an arbitrary native force.
