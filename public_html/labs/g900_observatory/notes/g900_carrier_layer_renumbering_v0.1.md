# G900 carrier layer renumbering v0.1

Status: carrier layer renumbering.

## Result

Carriers are now Layer 2.

The earlier Layer 6 carrier placement came from an older ordering where force-like overlays were reserved immediately after the graph body. That ordering is now deprecated.

## New layer discipline

- Layer 0: stage / grid / apparatus
- Layer 1: G900 body graph
- Layer 2: carriers
- Layer 3: channels
- Layer 4: trails
- Layer 5: receipts / witness marks
- Later layers: force-like shadows

## Reason

The force-like overlays are not first primitives.

They belong after body, carriers, channels, trails, and receipts.

The forces are at the end of the chain.
They are the shadows of admissible action.

## Boundary

This renumbering does not mutate the G900 body.

It does not change the first carrier rail selector.

It does not admit new carriers.

It does not admit channels.

It does not make a force claim.

It only corrects the layer ontology so the viewer matches the current discipline.

## Keeper

Body first.
Carriers second.
Channels third.
Trails fourth.
Receipts fifth.
Force-shadows later.
