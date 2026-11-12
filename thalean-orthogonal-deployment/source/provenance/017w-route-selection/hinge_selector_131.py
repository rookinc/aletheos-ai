#!/usr/bin/env python3

import csv
import json
import os
from collections import Counter, defaultdict
from pathlib import Path


P41 = Path(os.environ["P41"]).resolve()
JSON_OUT = Path(os.environ["AUDIT131_JSON_OUT"])
CSV_OUT = Path(os.environ["AUDIT131_CSV_OUT"])

B41 = P41 / (
    "sources/upstream/"
    "g60_native_generator_input_bundle_001.v1.json"
)

J124 = P41 / (
    "artifacts/json/"
    "g1800_wxyzti_fixed_column_C_cycle_selector_124.v1.json"
)

J130 = P41 / (
    "artifacts/json/"
    "g1800_wxyzti_connector_route_memory_130.v1.json"
)


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def canonical_edge(left, right):
    return tuple(sorted((int(left), int(right))))


def permutation(rows):
    return tuple(
        int(rows[str(index)])
        for index in range(60)
    )


def permutation_orbits(permutation_value):
    seen = set()
    result = []

    for start in range(len(permutation_value)):
        if start in seen:
            continue

        orbit = []
        current = start

        while current not in seen:
            seen.add(current)
            orbit.append(current)
            current = permutation_value[current]

        result.append(tuple(sorted(orbit)))

    return tuple(sorted(result))


def cycle_rotations(vertices):
    sequence = tuple(vertices)
    count = len(sequence)

    return tuple(
        sequence[index:] + sequence[:index]
        for index in range(count)
    )


def canonical_cycle(vertices):
    forward = min(cycle_rotations(tuple(vertices)))
    reverse = min(cycle_rotations(
        tuple(reversed(tuple(vertices)))
    ))
    return min(forward, reverse)


def recursive_dicts(value):
    if isinstance(value, dict):
        yield value

        for child in value.values():
            yield from recursive_dicts(child)

    elif isinstance(value, list):
        for child in value:
            yield from recursive_dicts(child)


bundle = read_json(B41)
audit124 = read_json(J124)
audit130 = read_json(J130)

native_edges = {
    canonical_edge(*row)
    for row in bundle["current_edges"]
}

native_a = permutation(
    bundle[
        "relabeled_involution_a_current_labels"
    ]
)

native_b = permutation(
    bundle[
        "relabeled_involution_b_current_labels"
    ]
)

a_orbits = permutation_orbits(native_a)

a_orbit_index = {
    vertex: orbit_index
    for orbit_index, orbit in enumerate(a_orbits)
    for vertex in orbit
}

b_on_a_orbits = []

for orbit in a_orbits:
    images = {
        a_orbit_index[native_b[vertex]]
        for vertex in orbit
    }

    if len(images) != 1:
        raise RuntimeError(
            "native b does not descend through native a"
        )

    b_on_a_orbits.append(next(iter(images)))

b_on_a_orbits = tuple(b_on_a_orbits)
g15_orbits = permutation_orbits(b_on_a_orbits)

g15_by_a_orbit = {}

for g15_index, orbit in enumerate(g15_orbits):
    for a_orbit in orbit:
        g15_by_a_orbit[a_orbit] = g15_index

g15_by_g60 = tuple(
    g15_by_a_orbit[a_orbit_index[vertex]]
    for vertex in range(60)
)

g15_edges = {
    canonical_edge(
        g15_by_g60[left],
        g15_by_g60[right],
    )
    for left, right in native_edges
}

g15_edges = {
    edge
    for edge in g15_edges
    if edge[0] != edge[1]
}

g15_adjacency = {
    vertex: set()
    for vertex in range(15)
}

for left, right in g15_edges:
    g15_adjacency[left].add(right)
    g15_adjacency[right].add(left)

hinge_transition_rows = {}

for row in recursive_dicts(audit124):
    transition = row.get("transition_key")

    if transition is None:
        continue

    if len(transition) != 2:
        continue

    contains_fixed = row.get(
        "contains_fixed_column"
    )

    if contains_fixed is not True:
        continue

    key = (
        int(row.get("alignment_index", -1)),
        int(transition[0]),
        int(transition[1]),
    )

    hinge_transition_rows[key] = {
        "alignment_index": int(
            row.get("alignment_index", -1)
        ),
        "source": int(transition[0]),
        "target": int(transition[1]),
        "role_class": row.get("role_class"),
        "edge_role": row.get("edge_role"),
        "role_pair": row.get("role_pair"),
    }

hinge_rows = sorted(
    hinge_transition_rows.values(),
    key=lambda row: (
        row["alignment_index"],
        row["source"],
        row["target"],
    ),
)

if len(hinge_rows) != 6:
    raise RuntimeError(
        "did not recover six fixed-column hinge transitions"
    )

hinge_vertices = sorted({
    vertex
    for row in hinge_rows
    for vertex in (
        row["source"],
        row["target"],
    )
})

hinge_directed_transitions = {
    (row["source"], row["target"])
    for row in hinge_rows
}

hinge_undirected_edges = {
    canonical_edge(
        row["source"],
        row["target"],
    )
    for row in hinge_rows
}

reverse_transition_rows = [
    row
    for row in hinge_rows
    if row["role_class"] == "reverse_partner"
]

reverse_endpoint_pairs = {
    canonical_edge(
        row["source"],
        row["target"],
    )
    for row in reverse_transition_rows
}

hinge_components = []
unseen_hinge_vertices = set(hinge_vertices)

while unseen_hinge_vertices:
    start = min(unseen_hinge_vertices)
    stack = [start]
    component = set()

    while stack:
        current = stack.pop()

        if current in component:
            continue

        component.add(current)
        unseen_hinge_vertices.discard(current)

        for edge in hinge_undirected_edges:
            if current not in edge:
                continue

            neighbor = (
                edge[1]
                if edge[0] == current
                else edge[0]
            )

            if neighbor not in component:
                stack.append(neighbor)

    hinge_components.append(tuple(sorted(component)))

hinge_components = tuple(sorted(hinge_components))

native_pentagons = set()

for start in range(15):
    def visit(path_value):
        current = path_value[-1]

        if len(path_value) == 5:
            if start in g15_adjacency[current]:
                native_pentagons.add(
                    canonical_cycle(tuple(path_value))
                )
            return

        for neighbor in sorted(
            g15_adjacency[current]
        ):
            if neighbor == start:
                continue

            if neighbor in path_value:
                continue

            visit(path_value + [neighbor])

    visit([start])

native_pentagons = tuple(sorted(native_pentagons))

route_family_keys = {
    int(row["route_family_index"]):
        tuple(int(value) for value in row[
            "unoriented_cycle_key"
        ])
    for row in audit130[
        "measurements"
    ]["family_rows"]
}

pentagon_rows = []

for pentagon_index, cycle in enumerate(
    native_pentagons
):
    vertex_set = set(cycle)
    cycle_edges = {
        canonical_edge(left, right)
        for left, right in zip(
            cycle,
            cycle[1:] + cycle[:1],
        )
    }

    component_incidence = [
        len(vertex_set & set(component))
        for component in hinge_components
    ]

    reverse_pair_endpoint_cover_count = sum(
        set(pair).issubset(vertex_set)
        for pair in reverse_endpoint_pairs
    )

    route_family_index = next(
        (
            family_index
            for family_index, key
            in route_family_keys.items()
            if key == cycle
        ),
        None,
    )

    pentagon_rows.append({
        "pentagon_index": pentagon_index,
        "cycle": list(cycle),
        "is_connector_route_family":
            route_family_index is not None,
        "route_family_index":
            route_family_index,
        "hinge_vertex_incidence_count":
            len(vertex_set & set(hinge_vertices)),
        "hinge_vertices":
            sorted(vertex_set & set(hinge_vertices)),
        "hinge_component_incidence":
            component_incidence,
        "hinge_transition_edge_incidence_count":
            len(cycle_edges & hinge_undirected_edges),
        "reverse_pair_endpoint_cover_count":
            reverse_pair_endpoint_cover_count,
        "contains_fixed_base_vertex_zero":
            0 in vertex_set,
    })

route_rows = sorted(
    (
        row
        for row in pentagon_rows
        if row["is_connector_route_family"]
    ),
    key=lambda row: row["route_family_index"],
)

if len(route_rows) != 2:
    raise RuntimeError(
        "did not recover two connector route pentagons"
    )

hinge_vertex_profile = dict(sorted(Counter(
    row["hinge_vertex_incidence_count"]
    for row in pentagon_rows
).items()))

hinge_edge_profile = dict(sorted(Counter(
    row[
        "hinge_transition_edge_incidence_count"
    ]
    for row in pentagon_rows
).items()))

route_hinge_vertex_profile = {
    row["route_family_index"]:
        row["hinge_vertex_incidence_count"]
    for row in route_rows
}

route_hinge_component_profile = {
    row["route_family_index"]:
        row["hinge_component_incidence"]
    for row in route_rows
}

route_reverse_pair_cover_profile = {
    row["route_family_index"]:
        row["reverse_pair_endpoint_cover_count"]
    for row in route_rows
}

route_vertex_counts = [
    row["hinge_vertex_incidence_count"]
    for row in route_rows
]

route_family_distinguished = (
    len(set(route_vertex_counts)) == 2
)

if route_family_distinguished:
    selected_route_row = max(
        route_rows,
        key=lambda row:
            row["hinge_vertex_incidence_count"],
    )
    selected_route_family_index = (
        selected_route_row["route_family_index"]
    )
    selected_route_hinge_vertex_count = (
        selected_route_row[
            "hinge_vertex_incidence_count"
        ]
    )
else:
    selected_route_row = None
    selected_route_family_index = None
    selected_route_hinge_vertex_count = None

maximum_hinge_vertex_incidence = max(
    row["hinge_vertex_incidence_count"]
    for row in pentagon_rows
)

maximal_pentagon_rows = [
    row
    for row in pentagon_rows
    if row["hinge_vertex_incidence_count"]
    == maximum_hinge_vertex_incidence
]

selected_route_is_globally_unique_maximum = (
    selected_route_row is not None
    and len(maximal_pentagon_rows) == 1
    and maximal_pentagon_rows[0][
        "route_family_index"
    ] == selected_route_family_index
)

route_orientation_count_after_family_selection = (
    2 if selected_route_row is not None else 4
)

checks = {
    "Audit124_passes":
        audit124.get("audit_pass") is True,
    "Audit130_passes":
        audit130.get("audit_pass") is True,
    "native_G15_has_15_vertices":
        len(g15_adjacency) == 15,
    "native_G15_has_30_edges":
        len(g15_edges) == 30,
    "six_fixed_column_hinge_transitions_loaded":
        len(hinge_rows) == 6,
    "six_hinge_vertices_loaded":
        len(hinge_vertices) == 6,
    "hinge_support_is_two_triangles":
        len(hinge_components) == 2
        and all(
            len(component) == 3
            for component in hinge_components
        ),
    "two_reverse_partner_hinge_transitions_loaded":
        len(reverse_transition_rows) == 2,
    "native_G15_pentagon_census_nonempty":
        len(native_pentagons) > 0,
    "two_connector_route_pentagons_recovered":
        len(route_rows) == 2,
    "connector_route_pentagons_are_in_native_census":
        all(
            tuple(row["cycle"])
            in native_pentagons
            for row in route_rows
        ),
}

audit_pass = all(checks.values())

if not audit_pass:
    verdict = "audit_failed"
elif selected_route_is_globally_unique_maximum:
    verdict = (
        "fixed_column_hinge_vertex_incidence_"
        "uniquely_selects_one_native_G15_"
        "connector_pentagon"
    )
elif route_family_distinguished:
    verdict = (
        "fixed_column_hinge_vertex_incidence_"
        "distinguishes_connector_route_families_"
        "but_not_uniquely_among_all_native_pentagons"
    )
else:
    verdict = (
        "fixed_column_hinge_incidence_does_not_"
        "distinguish_connector_route_families"
    )

claims = {
    "WXYZTI_hinge_native_pentagon_census_completed":
        audit_pass,
    "WXYZTI_hinge_vertex_incidence_distinguishes_route_families":
        audit_pass and route_family_distinguished,
    "WXYZTI_hinge_uniquely_selects_route_family_among_native_pentagons":
        audit_pass
        and selected_route_is_globally_unique_maximum,
    "WXYZTI_hinge_selected_route_family_index":
        (
            selected_route_family_index
            if audit_pass
            else None
        ),
    "WXYZTI_hinge_selects_orientation":
        False,
    "native_b_orientation_pair_remains":
        audit_pass
        and route_orientation_count_after_family_selection
        == 2,
    "two_sheet_shortest_connector_pair_is_canonical":
        False,
    "two_sheet_connector_embedded_in_native_G1800":
        False,
    "hinge_correction_resolves_Audit117_L0_failure":
        False,
    "hinge_correction_resolves_Audit117_L1H_failure":
        False,
    "sigma_exchange_is_native_chain_automorphism":
        False,
    "sigma_is_native_topological_coorientation":
        False,
    "physical_inside_outside_claim":
        False,
}

payload = {
    "schema":
        "g1800_wxyzti_hinge_pentagon_selector_131.v1",
    "audit_pass": audit_pass,
    "verdict": verdict,
    "kernel": "a",
    "measurements": {
        "native_G15_vertex_count":
            len(g15_adjacency),
        "native_G15_edge_count":
            len(g15_edges),
        "native_G15_pentagon_count":
            len(native_pentagons),
        "hinge_transition_count":
            len(hinge_rows),
        "hinge_vertices":
            hinge_vertices,
        "hinge_components": [
            list(component)
            for component in hinge_components
        ],
        "reverse_endpoint_pairs": [
            list(pair)
            for pair in sorted(reverse_endpoint_pairs)
        ],
        "hinge_vertex_incidence_profile":
            hinge_vertex_profile,
        "hinge_transition_edge_incidence_profile":
            hinge_edge_profile,
        "route_hinge_vertex_profile":
            route_hinge_vertex_profile,
        "route_hinge_component_profile":
            route_hinge_component_profile,
        "route_reverse_pair_cover_profile":
            route_reverse_pair_cover_profile,
        "route_family_distinguished":
            route_family_distinguished,
        "selected_route_family_index":
            selected_route_family_index,
        "selected_route_hinge_vertex_count":
            selected_route_hinge_vertex_count,
        "maximum_hinge_vertex_incidence":
            maximum_hinge_vertex_incidence,
        "maximal_native_pentagon_count":
            len(maximal_pentagon_rows),
        "maximal_native_pentagon_indices": [
            row["pentagon_index"]
            for row in maximal_pentagon_rows
        ],
        "selected_route_is_globally_unique_maximum":
            selected_route_is_globally_unique_maximum,
        "route_orientation_count_after_family_selection":
            route_orientation_count_after_family_selection,
        "hinge_rows":
            hinge_rows,
        "route_rows":
            route_rows,
        "pentagon_rows":
            pentagon_rows,
    },
    "checks": checks,
    "claims": claims,
    "interpretation": {
        "closed": (
            "The fixed-column WXYZTI hinge support was "
            "compared with every simple native G15 pentagon "
            "and with the two Audit130 connector families."
        ),
        "boundary": (
            "Vertex incidence is an unoriented selector. Even "
            "a unique route-family result cannot select between "
            "the two native-b-exchanged orientations."
        ),
    },
}

JSON_OUT.parent.mkdir(parents=True, exist_ok=True)
CSV_OUT.parent.mkdir(parents=True, exist_ok=True)

JSON_OUT.write_text(
    json.dumps(payload, indent=2, sort_keys=True) + "\n",
    encoding="utf-8",
)

with CSV_OUT.open(
    "w",
    newline="",
    encoding="utf-8",
) as handle:
    fieldnames = [
        "pentagon_index",
        "cycle",
        "is_connector_route_family",
        "route_family_index",
        "hinge_vertex_incidence_count",
        "hinge_vertices",
        "hinge_component_incidence",
        "hinge_transition_edge_incidence_count",
        "reverse_pair_endpoint_cover_count",
        "contains_fixed_base_vertex_zero",
    ]

    writer = csv.DictWriter(
        handle,
        fieldnames=fieldnames,
    )
    writer.writeheader()

    for row in pentagon_rows:
        writer.writerow({
            name: row[name]
            for name in fieldnames
        })

print("audit_pass:", str(audit_pass).lower())
print("verdict:", verdict)
print("kernel: a")
print(
    "native_G15_vertex_count:",
    len(g15_adjacency),
)
print(
    "native_G15_edge_count:",
    len(g15_edges),
)
print(
    "native_G15_pentagon_count:",
    len(native_pentagons),
)
print(
    "hinge_transition_count:",
    len(hinge_rows),
)
print("hinge_vertices:", hinge_vertices)
print("hinge_components:", hinge_components)
print(
    "reverse_endpoint_pairs:",
    sorted(reverse_endpoint_pairs),
)
print(
    "hinge_vertex_incidence_profile:",
    hinge_vertex_profile,
)
print(
    "hinge_transition_edge_incidence_profile:",
    hinge_edge_profile,
)
print(
    "route_hinge_vertex_profile:",
    route_hinge_vertex_profile,
)
print(
    "route_hinge_component_profile:",
    route_hinge_component_profile,
)
print(
    "route_reverse_pair_cover_profile:",
    route_reverse_pair_cover_profile,
)
print(
    "route_family_distinguished:",
    str(route_family_distinguished).lower(),
)
print(
    "selected_route_family_index:",
    selected_route_family_index,
)
print(
    "selected_route_hinge_vertex_count:",
    selected_route_hinge_vertex_count,
)
print(
    "maximum_hinge_vertex_incidence:",
    maximum_hinge_vertex_incidence,
)
print(
    "maximal_native_pentagon_count:",
    len(maximal_pentagon_rows),
)
print(
    "maximal_native_pentagon_indices:",
    [
        row["pentagon_index"]
        for row in maximal_pentagon_rows
    ],
)
print(
    "selected_route_is_globally_unique_maximum:",
    str(
        selected_route_is_globally_unique_maximum
    ).lower(),
)
print(
    "route_orientation_count_after_family_selection:",
    route_orientation_count_after_family_selection,
)

for row in route_rows:
    print("ROUTE:", row)

for row in maximal_pentagon_rows:
    print("MAXIMAL_PENTAGON:", row)

for name, passed in checks.items():
    print("CHECK:", name + ":", str(passed).lower())

for name, value in claims.items():
    print(name + ":", str(value).lower())
