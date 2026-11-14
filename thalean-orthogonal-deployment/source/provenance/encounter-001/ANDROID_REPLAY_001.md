# Android export replay 001

Input: `Orthogonal_Encounter_Replay (1).json`, SHA-256 `11e51167787269719c890f4fe8184e48fc24cf85664b228214a22a6bbbf3214f`. The fixture retains the original scan, observations, memory result and settings; the repeated embedded audit bundle is omitted. Its own SHA is recorded in `android-replay-checks.json`.

The original strict verifier rejected display-coordinate differences between Android and Node. Across the same 200 retained candidate identities, 87 numerical fields differed; the largest absolute difference was 1.1102230246251565e-16. Native identities and the full memory result matched exactly. Nearly tied distance ordering also differed.

The corrected command-line verifier allows absolute tolerance 1e-12 only for declared display geometry fields. Candidate identities, counts, native tuples, configuration and interaction predicates remain exact. Candidate order may vary only within that tolerance. Different retained membership at the cap still rejects; no threshold/cutoff ambiguity is silently admitted. This is numerical chart reproducibility, not an exact physical-geometric certificate.

Result: **PASS**. At completed step 93 (F13), merge 69, epsilon 0.05, the spatial scan has 201 candidates with the nearest 200 retained. One witness observation and its captured candidate replay. Coupling events are zero. The nearest candidate joins native labels 6833 and 6392, at about 0.0063150213 chart units; those labels are neither adjacent in the common carrier nor equal registered labels.

| Continuation stage | Native pair | Hidden bits | Shared quotient projection |
| --- | --- | --- | --- |
| Before F^1 | 5880 / 5408 | 0 / 1 | (3,8) |
| After F^1 | 7688 / 7200 | 1 / 0 | (4,0) |

The same continuation preserves projected equality. This run does not establish operational memory or a native interaction.

Producer: `node test-encounter-replay.cjs`. Twelve focused checks include the real Android fixture, near-tie reordering, exact native-state/hidden-bit/count controls, invented interaction rejection, coupling-event rejection, geometry outside tolerance, nonfinite values, missing candidates, changed continuation and arbitrary reordering. The existing nine application integration checks and earlier browser replay also pass.

This is a source-only command-line verifier correction. The previously published v1.2 browser bundle and Termux deployment archive are unchanged; no observatory redeployment is required for this fix.
