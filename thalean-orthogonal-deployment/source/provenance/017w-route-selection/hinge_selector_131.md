# Audit 131: WXYZTI hinge pentagon selector

## Result

Audit 131 passes.

Within the two shortest connector-route families identified by Audit
130, fixed-column WXYZTI hinge incidence distinguishes family 0 from
family 1.

It does not define a unique selector over all native G15 pentagons.

## Native census

The native G15 graph has

- 15 vertices;
- 30 edges;
- 12 simple pentagons.

The fixed-column hinge support consists of six vertices arranged as
two triangles:

- `(0,2,5)`;
- `(1,10,13)`.

The two reverse-partner endpoint pairs are `(0,2)` and `(1,10)`.

## Connector-family comparison

Route family 0 is

`0 - 1 - 2 - 3 - 4 - 0`.

It meets hinge vertices `{0,1,2}`, for incidence 3. Its component
profile is `[2,1]`, and it contains both endpoints of reverse pair
`(0,2)`.

Route family 1 is

`0 - 9 - 6 - 10 - 11 - 0`.

It meets hinge vertices `{0,10}`, for incidence 2. Its component
profile is `[1,1]`, and it contains neither complete reverse endpoint
pair.

Therefore hinge incidence selects route family 0 within the
independently defined shortest-connector candidate universe.

This reduces the four written histories to candidates 2 and 3.

## Global boundary

The hinge rule is not a universal native-pentagon selector.

The non-connector pentagon

`1 - 2 - 5 - 10 - 11 - 1`

has the global maximum hinge incidence 4. Family 0 has incidence 3.

Thus the selector is valid only after endpoint, distance, and
connector-family constraints have already defined the two-family
candidate universe.

## Remaining orientation pair

Family 0 retains two reverse orientations:

- candidate 2: `0 - 1 - 2 - 3 - 4 - 0`;
- candidate 3: `0 - 4 - 3 - 2 - 1 - 0`.

Native b exchanges them.

The WXYZTI hinge incidence used here is unoriented and cannot select
between them. A separate orientation datum is still required.

No connector has been embedded into native G1800. No Audit 117 failure
has been resolved.

Sigma exchange as a native chain automorphism, native topological
coorientation, and physical inside/outside remain unproved.
