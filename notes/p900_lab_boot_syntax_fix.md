# P900 Lab Boot Syntax Fix

Status: bug fix

Fixed malformed template literal lines in the P900 console readout.

Symptom:

    lab UI loaded as static HTML
    stage stayed blank
    tick/cells stayed at 0
    play did nothing

Cause:

    browser-side module failed to parse before the engine could boot.
