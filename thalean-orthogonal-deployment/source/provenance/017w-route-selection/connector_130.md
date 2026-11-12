# Audit 130: WXYZTI connector route memory

## Result

Audit 130 passes.

The four shortest two-sheet connector histories form an exact
two-by-two route-memory register:

- two unoriented G15 pentagon families;
- two written orientations in each family.

Native b exchanges the two orientations within each pentagon family.

## Route families

Family 0 is the G15 pentagon

`0 - 1 - 2 - 3 - 4 - 0`.

It contains connector candidates 2 and 3 in opposite orientations.

Family 1 is the G15 pentagon

`0 - 9 - 6 - 10 - 11 - 0`.

It contains connector candidates 0 and 1 in opposite orientations.

The two pentagons are edge-disjoint and share only vertex 0.

## Native-b action

On the four written histories, native b acts as

`(0 1)(2 3)`.

It has no fixed connector history.

Thus native b preserves each unoriented route family while exchanging
its two orientations.

The four histories therefore carry two independent pieces of
route-level information:

1. which G15 pentagon was traversed;
2. which orientation was used.

## Memory hierarchy

The endpoint records where the path arrived.

The native voltage records that the path changed sheet.

Neither determines the pentagon family or its orientation.

The written chain retains both:

`endpoint < sheet displacement < route family + orientation`.

Equivalently, the endpoint says where the process is, the cocycle says
that it crossed, and the written chain records how it got there.

## Remaining selector boundary

The route-memory register has now been identified, but neither of its
coordinates is selected canonically.

The next bounded test is whether the fixed-column WXYZTI hinge grammar
distinguishes the two G15 pentagon families. Even if it selects a
family, native b still exchanges the two orientations unless another
registered orientation datum is present.

No connector has been embedded into native G1800. No Audit 117 failure
has been resolved.

Sigma exchange as a native chain automorphism, native topological
coorientation, and physical inside/outside remain unproved.
