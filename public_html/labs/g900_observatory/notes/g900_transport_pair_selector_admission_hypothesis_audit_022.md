# G900 transport pair-selector admission hypothesis audit 022

Status: `passed`

Verdict: `pair_selector_admission_hypothesis_audit_022_recorded`

Audit status: `least_sharp_pair_admission_hypothesis_candidates_found`

## Question

Which of the 11 exact structural pair selectors from 021 are least-sharp enough to become admission hypotheses, without becoming admissions?

## Starting point

021 found no usable single structural selector.

021 found 11 exact pair structural selectors.

That means permission sharpness appears to live in coupled relations, not lone features.

## Ranking rule

For each exact pair selector, this audit looks at how broad each individual feature is before coupling.

The primary score is:

`individual_bucket_product`

The least-sharp exact pair selector is the one with the largest product.

This favors selectors whose two parts are individually broad, but exact only when coupled.

## Result

Exact pair selectors tested: `11`

Candidate admission hypotheses: `11`

Least-sharp best hypotheses: `1`

Best individual bucket product: `64`

## Best hypothesis candidates

- `role.AB=03_09 AND role.E=13` with individual bucket product `64`

## Interpretation

This is not an admission.

A selector can nominate permission.

It cannot grant permission.

The best pair selector should now be treated as an explicit admission hypothesis and tested against construction provenance or a larger candidate universe.

## Current ledger

Admitted permission channels: `1`

Admitted information transports: `1`

## Boundary

This artifact admits no new permission channel.

It admits no new information transport.

It declares no new flux witness.

It makes no transport family claim.

It makes no global uniqueness claim.

It claims no physical transport.

It claims no physical flux.

It claims no energy flow.

It claims no force.

It claims no physics.

It does not mutate the G900 body.

## Keeper

A selector can nominate permission. It cannot grant it.
