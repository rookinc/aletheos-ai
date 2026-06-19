# G900 black-box simulator run-step roundtrip receipt 008

Status: `passed`

Verdict: `g900_blackbox_simulator_run_step_roundtrip_receipt_008_recorded`

Receipt status: `run_step_roundtrip_observed_manual_control_recovered_body_fixed`

Branch: `g900-blackbox-sim-fork`

Commit at receipt: `330b4d7`

## Purpose

008 records a three-state observed UI sequence:

1. Running
2. Step forward
3. Step back

The purpose is to verify that live running advances sheets under the Timing panel, then the manual stepper recovers control, pauses animation, and step-back decrements exactly one sheet.

This receipt does not run simulator dynamics by script.

It ingests existing G900 viewer-state exports.

## Observed states

- `running` sheet `3840`, playing `True`, sheets/sec `240`, pitch_roll `True`
- `step_forward` sheet `5036`, playing `False`, sheets/sec `240`, pitch_roll `False`
- `step_back` sheet `5035`, playing `False`, sheets/sec `240`, pitch_roll `False`

## Transitions

- `008-T001` `running` -> `step_forward` delta `1196`: Live running advanced sheets, then manual stepper recovered control and paused.
- `008-T002` `step_forward` -> `step_back` delta `-1`: Step back decremented exactly one sheet after manual control was recovered.

## Check results

- `state_count` passed `true` observed `3`: Three viewer-state exports were loaded: running, step forward, step back.
- `schemas_ok` passed `true` observed `['g900.viewer.state', 'g900.viewer.state', 'g900.viewer.state']`: All witnesses are G900 viewer-state exports.
- `running_state_is_live` passed `true` observed `playing=True pitch_roll_enabled=True`: The first state records live running.
- `step_forward_paused` passed `true` observed `playing=False pitch_roll_enabled=False`: The step-forward state recovered manual control and paused animation.
- `step_back_paused` passed `true` observed `playing=False pitch_roll_enabled=False`: The step-back state stayed paused.
- `run_to_forward_delta_positive` passed `true` observed `1196`: Running advanced the sheet before manual control was recovered.
- `step_back_decrements_one` passed `true` observed `-1`: Back-step decremented exactly one sheet from the paused forward state.
- `sample_rate_preserved` passed `true` observed `[240, 240, 240]`: All states preserve the 240 sheets/sec selected sample rate.
- `runtime_rate_matches` passed `true` observed `[(240, 240), (240, 240), (240, 240)]`: Runtime oscillator rate matches timeline rate in all states.
- `body_fixed` passed `true` observed `[(900, 3600), (900, 3600), (900, 3600)]`: G900 body counts remain fixed across run, forward, and back.
- `overlays_bounded` passed `true` observed `[(False, False), (False, False), (False, False)]`: Overlay layer remains non-mutating and non-physical.
- `runtime_no_motion_authority` passed `true` observed `[False, False, False]`: Runtime oscillator remains a timing witness, not motion authority.
- `timing_does_not_open_gate` passed `true` observed `[(False, False, False), (False, False, False), (False, False, False)]`: Timing does not open gates, admit channels, or light markers.
- `channel_preview_not_admitted` passed `true` observed `[(False, False), (False, False), (False, False)]`: Existing channel preview remains non-admitted.
- `lens_nonmutating` passed `true` observed `[(False, False, False), (False, False, False), (False, False, False)]`: A/F lens remains non-mutating across the sequence.
- `orientation_bounded` passed `true` observed `[(False, False), (False, False), (False, False)]`: Orientation layer remains bounded.
- `prior_receipts_passed` passed `true` observed `005=True 006=True 007=True`: Run-step receipt builds on the passed timing boundary, UI audit, and first null tick receipt.

## Summary

- `running_sheet` value `3840` status `running`: Running state records live sheet advancement.
- `step_forward_sheet` value `5036` status `paused`: Step-forward state is paused after manual control recovered.
- `step_back_sheet` value `5035` status `paused`: Step-back state is paused after one-sheet decrement.
- `run_to_forward_delta` value `1196` status `positive`: Live running advanced sheets before manual stepping.
- `forward_to_back_delta` value `-1` status `minus_one`: Back-step decremented exactly one sheet.
- `sheets_per_second` value `240` status `preserved`: All states preserve the 240 sheets/sec sample rate.
- `body` value `900 vertices / 3600 edges` status `fixed`: G900 body remains fixed across the sequence.
- `source_law_promoted` value `false` status `locked_zero`: Run-step roundtrip does not promote timing to source law.
- `physics_claim` value `false` status `locked_zero`: Run-step roundtrip makes no physics claim.
- `body_mutation` value `false` status `locked_zero`: Run-step roundtrip does not mutate the body.

## Boundary

This is a receipt for observed UI exports.

It does not promote quartz to source law.

It admits no new permission channel.

It admits no new information transport.

It makes no physical force claim.

It makes no physical flux claim.

It claims no physical energy flow.

It makes no physics claim.

It makes no geometry claim.

It does not mutate the G900 body.

It adds no vertices.

It adds no edges.

The run advanced the sheet.

The stepper recovered control.

The body did not move.

## Keeper

The run advanced the sheet. The stepper recovered control. The body did not move.
