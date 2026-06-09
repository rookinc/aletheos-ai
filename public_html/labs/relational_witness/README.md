# Relational Witness Lab

A native TRT/TGT rendering tool for viewing finite admissibility stages.

This lab is not a geometry constructor. It is a witness surface.

Core ladder:

    surface coherence
    projection
    observed closure
    admission

The lab renders small finite systems with explicit surface nodes, ambient witnesses,
projection arrows, trace comparisons, and admission status.

Initial purpose:

    make the finite projection-separation theorem visible

## Data

The witness systems are defined in:

    data/finite_witnesses.json

The renderer reads the finite sets and maps from that file.

## Verification

Run:

    python relational_witness/support/check_finite_witnesses.py

The checker verifies the intended strict gaps:

    surface coherence without projection
    projection without observed closure
    observed closure without admission
    admitted projection
