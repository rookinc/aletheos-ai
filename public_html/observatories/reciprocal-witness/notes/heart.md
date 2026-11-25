# Two people meditating

A and B are two people sitting side by side in the illustration. Each sphere displays one signed field coordinate, centered on that person. The cut Σ intercepts a single modeled connection between the coordinates. A positive field value means displacement along its chosen local reference. A positive return in the receipt means A’s signed field velocity was higher in the free replay. The magnitude has arbitrary field units. Only the model clock carries seconds.

Select **Independent** and mark an A beat. The synthetic heart clocks drive their own fields. Select **Shared cue** to let each clock respond separately to one external timing pattern. In the default 6–14 second scoring interval, the mean distance from an A beat to its nearest B beat falls from 242 ms to 47.78 ms. Both receipts give exactly zero causal return. **Coupled** keeps the two shared-cue heartbeat schedules and adds a bidirectional spring between the field coordinates.

In the coupled run, A’s marked beat excites A’s field, the connection excites B’s field, and part of B’s subsequent displacement remains attributable to that beat. The counterfactual clears just that component at B. Everything else at the checkpoint, including both velocities, carries through. Read the signed difference in A’s next field velocity and inspect the displaced field trace sixteen updates after clearing. Both people’s heartbeat marks stay at their prescribed times throughout the comparison. A physiological feedback experiment would need measured drives, a law feeding the fields back to the clocks, and an independent test.

## The two clock schedules

The default run lasts 16 s at h = 0.01 s. The independent A and B pseudorandom streams are xorshift32, seeded by the run seed XOR `0x243f6a88` and `0x85a308d3`, respectively. Each oscillator starts at an adjustable phase in cycles. For integer seed zero the stream initialization still uses those two nonzero masks. A zero result after XOR uses a fixed nonzero xorshift seed. Set a base period to 60/BPM seconds. At initialization and after each beat, multiply the base period by `1 + ε(2z − 1)` with a fresh uniform stream value z. The variation control ε ranges from 0 to 0.05. The reciprocal period is the clock speed ν. At a wrap of the integrated phase, register a beat on that sample and retain the fractional excess for the next interval.

For the optional shared cue, define an external breath phase t/T, T = 5 s. The clock track has six subdivisions per synthetic breath and a small within-breath modulation. In cycles,

```text
q(t) = 6 t/T + (0.045 × 6 / 2π) [1 − cos(2πt/T)]
dφᵢ/dt = νᵢ + c × 0.24 sin[2π(q(t) − φᵢ)]
```

Here c is 1 with the cue enabled and 0 with the cue disabled. Each phase uses a forward update of length h. The strong common pacing target deliberately makes the common-input control easy to see. It represents a prescribed timing comparison. Rates far from the cue may produce less alignment. The initial default rates are 69 and 74 beats/min, phases 0.15 and 0.62 cycles, and variation ε = 0.015. The timing statistic measures the mean nearest absolute gap for A beats inside [6,14] s, using all B beats. Its sample counts are 10 without the cue and 9 with the cue in the default runs.

Each beat drives a unit-height, 0.12 s, compact pulse `H(n) = sin²(πn/12)` at offsets n = 1,…,11. Using a pulse with this exact support makes the stamped beat unambiguous. Both heartbeat traces show these dimensionless synthetic pulses. Each drives the field through the same gain of 36 field units/s². The output includes both complete beat-index lists, so the supplied pulse expression recreates every drive sample.

## Reciprocal state update

At the start both coordinates and both velocities are zero. Values xᵢ are signed field units, velocities vᵢ are field units/s, and Hᵢ is the dimensionless pulse drive. With ω = 2π × 0.9 s⁻¹, γ = 1.8 s⁻¹, and spring k = 0 or 9 s⁻², use

```text
a_A = 36 H_A − ω² x_A − γ v_A + k(x_B − x_A)
a_B = 36 H_B − ω² x_B − γ v_B + k(x_A − x_B)
v_i[n+1] = v_i[n] + h a_i[n]
x_i[n+1] = x_i[n] + h v_i[n+1]
```

Both kicks use the old positions. Equal and opposite interaction terms give the reciprocal path. This two-mode example uses declared model constants and a new synthetic fixture. A unit field coordinate is chosen by the instrument. Each stiffness eigenvalue s is either ω² or ω² + 2k. The damped discrete oscillator has determinant 1 − γh and trace 2 − γh − sh². The Schur conditions reduce to positive γ, positive s and `2γh + sh² < 4`. The largest left-hand side is about 0.041 at the supported settings.

## Mark, clear, compare

The observable of interest is A’s field velocity one sample after erasure. Use linearity to propagate the response of the marked A pulse alone, from zero initial state with zero B drive. Its B coordinate at exactly 32 updates after the mark is the retained component `x_B,tag`. The full replay uses both complete drive arrays. Fork it at this checkpoint by replacing `x_B` with `x_B − x_B,tag`. The test compares this retained component against a second, independently formulated solve that omitted just the marked A pulse. It checks both velocities and A’s displacement at the fork. Both full drives continue forward on both branches. One kick later,

```text
v_A,free − v_A,cleared = h k x_B,tag
```

The next row for A’s position equals h times that velocity difference. The second comparison evaluates the fields at a preselected delay of 16 updates after erasure. Clearing B leaves the whole prior track identical. At the checkpoint the one edited coordinate changes by its declared amount. The display time and camera can change without entering the recurrence.

| Default replay | Mark / checkpoint (s) | Retained B | Next A velocity, free | Next A velocity, cleared | Difference | A field difference after 0.16 s |
|---|---|---:|---:|---:|---:|---:|
| Independent clocks, k = 0 | 3.39 / 3.71 | 0 | 0.67231588 | 0.67231588 | 0 | 0 |
| Common cue, k = 0 | 3.31 / 3.63 | 0 | 0.46824850 | 0.46824850 | 0 | 0 |
| Same common drives, k = 9 | 3.31 / 3.63 | 0.03455333 | 0.56707245 | 0.56396265 | 0.00310980 | 0.00320397 |

Each row uses seed 916 and A beat #4. In the coupled row its first B displacement occurs at 3.34 s. The intervention is at 3.63 s, the changed velocity is read at 3.64 s, and the later displacement is read at 3.79 s. The default marker gives measurable differences at all three checkpoints. Because the model is linear and time-independent and each beat has the same pulse shape, changing the marker shifts the response in time and changes the full background at the checkpoint. Its isolated impulse contribution at a fixed delay has the same magnitude.

## Replay evidence

Run `node tests/heart-check.mjs` from the instrument directory. The test checks both four-trace controls, the matching complete schedules, a second solver in modes x_A + x_B and x_A − x_B, the removal of only the tagged displacement, the one-step return identity and stability at the supported extremes. Output includes the source SHA-256 and the three numerical receipts. Version `RWO-heart-1.0.0`. The optional short schedule fingerprints use FNV-1a over both ordered beat lists. The full index lists in the exported receipt permit exact schedule comparison.
