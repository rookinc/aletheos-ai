# Two open sitters · synthetic phase clocks

Give A and B different starting phases. With mutual feedback enabled, each clock can influence the other while their phases lie within the selected capture window. The closed comparison starts with the same seed, rates and phases. It provides a second beat ledger for the same elapsed time. Changing a launch phase registers a new experiment at time zero.

## What synchrony measures

The experiment distinguishes a close encounter, frequency matching and persistent phase locking. A close encounter puts two phase hands within 2° of each other. A frequency match puts the instantaneous rates within 0.10 bpm. For the instrument to report **locked**, both sitters must be open, feedback must be active, and the observed gap must stay within 1° of the predicted stable gap while satisfying the frequency test for 6 continuous seconds. Two independent clocks can have the same rate, or cross at the same instant. Those events have their own readouts.

The exhibition opens with 69 and 72 bpm and a +42° arrival gap. With both gates open, it meets the lock criterion at 9.797107 model seconds. At gate twenty the arrivals are 41.271 ms apart.

A separate analytical regression fixture uses 69 and 72 bpm, A at 0.12 cycles, B at 0.23 cycles, coupling strength 5 bpm per clock and a 60° capture window. The initial gap is +39.6°. With the path open, the gap is +17.46568° after eight seconds. The closed replay reads −176.4° at the same time. The open replay meets the six-second persistence rule at 9.683836 s, then approaches a common frequency of 70.5 bpm at a gap of +17.45760°. B's lead in the settled pattern is approximately 41 ms. For example, registering the clocks with equal 70 bpm rates and phases 0.95 and 0.04 starts them +32.4° apart across the phase seam. Their mutual response then takes the gap toward zero.

## Gate and phase law

Time t is in seconds. Phases p_A and p_B are unwrapped cycles. The displayed signed difference is δ = wrap(p_B − p_A) in [−0.5,0.5), multiplied by 360 for degrees. Let R_A and R_B be the chosen natural rates in beats/min, S the maximum individual feedback shift in beats/min and W the capture half-width in degrees. The gate G is 1 when feedback is selected, both sitters are open, S > 0 and |360δ| ≤ W. After an outgoing crossing the new exterior segment starts with G = 0. This convention resolves a single threshold instant in the beat ledger. The equations are

```text
dp_A/dt = [R_A + G S sin(2πδ)] / 60
dp_B/dt = [R_B − G S sin(2πδ)] / 60
```

The phase trajectories are continuous at a gate crossing. Their instantaneous rates can jump at that threshold. The mean unwrapped phase advances uniformly at (R_A + R_B)/120 cycles/s. Inside the gate, δ′ = a − b sin(2πδ), with a = (R_B − R_A)/60 and b = 2S/60. The supported W range of 1° to 85° keeps the sine monotone throughout the window. When |R_B − R_A| ≤ 2S sin(Wπ/180), its stable gap in the window is

```text
δ* = asin[(R_B − R_A)/(2S)] / (2π) cycles.
```

Its linearized slope is −2πb cos(2πδ*) per second. With W below 90°, the slope is negative. Equal-rate clocks outside the window have constant separation and cannot enter. Detuned closed clocks drift. Starting the 69/72 example at phases 0.1 and 0.7 gives an initial signed gap of −144°. It drifts into the −60° edge at 4⅔ s, then settles. If the mismatch exceeds the maximum restoring shift inside the cut, even open sitters pass through the window. At 70 and 83 bpm with S = 5 bpm and W = 60°, the 13 bpm mismatch exceeds the 8.66025 bpm capture capacity. The beat ledger records recurring passes without sustained lock.

## Reproducing a run

The solver uses an analytic segment for constant exterior drift and the tangent-half-angle solution inside capture. With y = tan(πδ), y′ = π[a(1+y²) − 2by]. A two-by-two matrix exponential advances y. Its inverse gives the time of the next outgoing edge or entry to the lock-measurement band. The midpoint advances by its exact linear law. Each beat is an integer crossing of an individual **unwrapped** phase. Positive rates over the supported parameter range give one root per wrap. The timestamp solver brackets that root, uses the analytic phase and instantaneous velocity to refine it, and falls back to bisection if a proposed step leaves the bracket. A phase starting at zero contributes a t = 0 beat. Crossings within 10⁻⁹ s share a deterministic `AB` event. Timestamps are never quantized to a display frame. Both ledgers can extend beyond four minutes without restarting their phase or lock timer.

Run `node tests/loop-clock.mjs` in the observatory directory. It tests the closed baseline, one-sided openness, wrap crossings, coincident beats, equal-frequency separation, delayed capture, above-threshold drift in both directions, uninterrupted continuation, and replay after registering different phases. It also compares the analytic answer against direct integration of both phase equations by fourth-order Runge–Kutta with a 0.0002 s step. The report includes the SHA-256 of the tested implementation.

The clocks and interactions in this exhibit are synthetic. The seed sets the default launch phases when those phases are unspecified. Each selected rate and phase can instead be entered explicitly. The computed response concerns this declared oscillator pair. Testing it against human physiology would require measured beat trains and a separately supported mechanism. The prescribed-heartbeat field experiment has its own drive law and counterfactual.
