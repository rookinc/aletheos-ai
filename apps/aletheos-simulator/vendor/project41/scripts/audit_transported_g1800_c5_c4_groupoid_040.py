#!/usr/bin/env python

import hashlib
import json
from collections import Counter, deque
from datetime import UTC, datetime
from itertools import permutations
from pathlib import Path

AUDIT_ID = "transported_g1800_c5_c4_groupoid_audit_040"
VERDICT = (
    "certified_five_frame_G1800_groupoid_has_exact_free_"
    "order20_return_law_with_F5_equal_K"
)

ROOT = Path(__file__).resolve().parents[1]
AUDIT013_PATH = (
    ROOT / "artifacts/json/"
    "native_g60_order60_cayley_transport_audit_013.json"
)
AUDIT028T_PATH = (
    ROOT / "artifacts/json/"
    "intrinsic_g1800_center_square_root_classification_audit_028t.json"
)
BUNDLE_PATH = (
    ROOT / "sources/upstream/"
    "g60_native_generator_input_bundle_001.v1.json"
)
OUTPUT_PATH = ROOT / "artifacts/json" / f"{AUDIT_ID}.json"

audit013 = json.loads(AUDIT013_PATH.read_text())
audit028t = json.loads(AUDIT028T_PATH.read_text())
bundle = json.loads(BUNDLE_PATH.read_text())

measurements = audit013["measurements"]
connection_words = measurements["representative_connection_words"]
connection_generators = [
    tuple(row)
    for row in measurements["representative_connection_permutations"]
]
word_to_permutation = dict(zip(connection_words, connection_generators))
inverse_pair_words = measurements["representative_inverse_pair_words"]
state_mapping = tuple(map(int, measurements["state_mapping"]))

N = 60
PRODUCT_N = N * N
IDENTITY = tuple(range(N))


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def compose(left, right):
    return tuple(left[right[index]] for index in range(N))


def inverse(permutation):
    result = [None] * N
    for source, target in enumerate(permutation):
        result[target] = source
    return tuple(result)


def power(permutation, exponent):
    result = IDENTITY
    for _ in range(exponent):
        result = compose(result, permutation)
    return result


def conjugate(element, by):
    return compose(compose(by, element), inverse(by))


def permutation_order(permutation):
    current = IDENTITY
    for exponent in range(1, 301):
        current = compose(current, permutation)
        if current == IDENTITY:
            return exponent
    raise RuntimeError("order bound exceeded")


def closure(generators):
    steps = list(generators) + [inverse(g) for g in generators]
    seen = {IDENTITY}
    queue = deque([IDENTITY])

    while queue:
        current = queue.popleft()
        for generator in steps:
            candidate = compose(current, generator)
            if candidate not in seen:
                seen.add(candidate)
                queue.append(candidate)

    return tuple(sorted(seen))


def edge(left, right):
    return tuple(sorted((left, right)))


def graph_edges(connection_set):
    return frozenset(
        edge(state, generator[state])
        for state in range(N)
        for generator in connection_set
    )


def map_edges(edges, mapping):
    return frozenset(
        edge(mapping[left], mapping[right])
        for left, right in edges
    )


def transport_action(action, mapping):
    result = [None] * N
    for source in range(N):
        result[mapping[source]] = mapping[action[source]]

    if set(result) != set(range(N)):
        raise RuntimeError("transported action is not a permutation")

    return tuple(result)


def product_index(left, right):
    return left * N + right


def product_coordinates(index):
    return divmod(index, N)


def product_graph_edges(base_edges):
    result = set()

    for left, right in base_edges:
        for fixed in range(N):
            result.add(edge(
                product_index(left, fixed),
                product_index(right, fixed),
            ))
            result.add(edge(
                product_index(fixed, left),
                product_index(fixed, right),
            ))

    return frozenset(result)


def diagonal_action(action, state):
    left, right = product_coordinates(state)
    return product_index(action[left], action[right])


def swapped_action(left_action, right_action, state):
    left, right = product_coordinates(state)
    return product_index(
        left_action[right],
        right_action[left],
    )


def quotient_by_involution(product_edges, involution):
    fibers = []
    fiber_to_index = {}
    state_to_quotient = [None] * PRODUCT_N

    for state in range(PRODUCT_N):
        partner = involution(state)

        if partner == state:
            raise RuntimeError("quotient involution has a fixed point")

        fiber = tuple(sorted((state, partner)))

        if fiber not in fiber_to_index:
            fiber_to_index[fiber] = len(fibers)
            fibers.append(fiber)

        state_to_quotient[state] = fiber_to_index[fiber]

    quotient_edges = frozenset(
        item
        for item in {
            edge(
                state_to_quotient[left],
                state_to_quotient[right],
            )
            for left, right in product_edges
        }
        if item[0] != item[1]
    )

    return {
        "fibers": tuple(fibers),
        "qid": tuple(state_to_quotient),
        "edges": quotient_edges,
    }


def descend(source_model, target_model, product_action):
    result = [None] * len(source_model["fibers"])

    for source_q, fiber in enumerate(source_model["fibers"]):
        images = {
            target_model["qid"][product_action(state)]
            for state in fiber
        }

        if len(images) != 1:
            return None

        result[source_q] = next(iter(images))

    if set(result) != set(range(len(target_model["fibers"]))):
        return None

    return tuple(result)


def descend_within(model, product_action):
    return descend(model, model, product_action)


def quotient_edge_image(edges, action):
    return frozenset(
        edge(action[left], action[right])
        for left, right in edges
    )


def degree_distribution(vertex_count, edges):
    degrees = [0] * vertex_count
    for left, right in edges:
        degrees[left] += 1
        degrees[right] += 1
    return dict(sorted(Counter(degrees).items()))


def connected(vertex_count, edges):
    adjacency = [[] for _ in range(vertex_count)]
    for left, right in edges:
        adjacency[left].append(right)
        adjacency[right].append(left)

    seen = {0}
    queue = deque([0])

    while queue:
        current = queue.popleft()
        for neighbor in adjacency[current]:
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append(neighbor)

    return len(seen) == vertex_count


def action_power_state(action, state, exponent):
    current = state
    for _ in range(exponent):
        current = action[current]
    return current


def cycle_profile(action):
    seen = set()
    lengths = []

    for start in range(len(action)):
        if start in seen:
            continue

        current = start
        length = 0

        while current not in seen:
            seen.add(current)
            length += 1
            current = action[current]

        lengths.append(length)

    return dict(sorted(Counter(lengths).items()))


native_edges = frozenset(
    edge(*map(int, row))
    for row in bundle["current_edges"]
)

a_native = tuple(
    int(bundle["relabeled_involution_a_current_labels"][str(i)])
    for i in range(N)
)
b_native = tuple(
    int(bundle["relabeled_involution_b_current_labels"][str(i)])
    for i in range(N)
)
ab_native = compose(a_native, b_native)

native_deck = {
    "identity": IDENTITY,
    "a": a_native,
    "b": b_native,
    "ab": ab_native,
}
native_deck_label = {
    action: label
    for label, action in native_deck.items()
}

connection_set = frozenset(connection_generators)
initial_edges = graph_edges(connection_set)
mapped_initial_edges = map_edges(initial_edges, state_mapping)

native_product_edges = product_graph_edges(native_edges)
native_models = {}

for kernel_label in ("a", "b", "ab"):
    kernel = native_deck[kernel_label]
    native_models[kernel_label] = quotient_by_involution(
        native_product_edges,
        lambda state, action=kernel:
            diagonal_action(action, state),
    )

native_K_actions = {}

for image_a_label in ("a", "b", "ab"):
    for image_b_label in ("a", "b", "ab"):
        if image_a_label == image_b_label:
            continue

        image_a = native_deck[image_a_label]
        image_b = native_deck[image_b_label]
        image_ab = compose(image_a, image_b)
        model = native_models[image_b_label]

        native_K = descend_within(
            model,
            lambda state, left=image_ab, right=image_b:
                swapped_action(left, right, state),
        )

        if native_K is None:
            raise RuntimeError("native K did not descend")

        native_K_actions[(image_a_label, image_b_label)] = native_K

regular_group = closure(connection_generators)

connection_stabilizer = frozenset(
    element
    for element in regular_group
    if frozenset(
        conjugate(connection, element)
        for connection in connection_set
    ) == connection_set
)

stabilizer_nonidentity = tuple(sorted(
    element
    for element in connection_stabilizer
    if element != IDENTITY
))
ordered_source_axes = tuple(permutations(stabilizer_nonidentity, 2))

cross_products = []

for left_word in inverse_pair_words[0]:
    for right_word in inverse_pair_words[1]:
        cross_products.append({
            "label": left_word + "_x_" + right_word,
            "action": compose(
                word_to_permutation[left_word],
                word_to_permutation[right_word],
            ),
        })

construction_rows = []

for transport_row in cross_products:
    transport_label = transport_row["label"]
    transport = transport_row["action"]

    if permutation_order(transport) != 5:
        raise RuntimeError("C5 transport does not have order five")

    for labeling_index, (source_a, source_b) in enumerate(
        ordered_source_axes
    ):
        image_a = transport_action(source_a, state_mapping)
        image_b = transport_action(source_b, state_mapping)
        image_ab = compose(image_a, image_b)

        image_a_label = native_deck_label.get(image_a)
        image_b_label = native_deck_label.get(image_b)
        image_ab_label = native_deck_label.get(image_ab)

        if None in (image_a_label, image_b_label, image_ab_label):
            raise RuntimeError("axis transport missed native deck")

        canonical_model = native_models[image_b_label]
        canonical_K = native_K_actions[
            (image_a_label, image_b_label)
        ]

        frame_models = []
        frame_native_maps = []
        local_K_actions = []
        frame_checks = []

        for frame_index in range(5):
            transport_power = power(transport, frame_index)
            transport_inverse = inverse(transport_power)

            frame_connection_set = frozenset(
                conjugate(connection, transport_power)
                for connection in connection_set
            )
            frame_a = conjugate(source_a, transport_power)
            frame_b = conjugate(source_b, transport_power)
            frame_ab = compose(frame_a, frame_b)

            frame_edges = graph_edges(frame_connection_set)
            frame_product_edges = product_graph_edges(frame_edges)

            frame_model = quotient_by_involution(
                frame_product_edges,
                lambda state, action=frame_b:
                    diagonal_action(action, state),
            )

            frame_to_native = compose(
                state_mapping,
                transport_inverse,
            )

            quotient_to_native = descend(
                frame_model,
                canonical_model,
                lambda state, mapping=frame_to_native:
                    product_index(
                        mapping[product_coordinates(state)[0]],
                        mapping[product_coordinates(state)[1]],
                    ),
            )

            local_K = descend_within(
                frame_model,
                lambda state, left=frame_ab, right=frame_b:
                    swapped_action(left, right, state),
            )

            frame_graph_exact = (
                map_edges(frame_edges, frame_to_native)
                == native_edges
            )
            quotient_shape_exact = (
                len(frame_model["fibers"]) == 1800
                and len(frame_model["edges"]) == 7200
                and degree_distribution(
                    1800,
                    frame_model["edges"],
                ) == {8: 1800}
                and connected(1800, frame_model["edges"])
            )
            quotient_native_exact = (
                quotient_to_native is not None
                and quotient_edge_image(
                    frame_model["edges"],
                    quotient_to_native,
                ) == canonical_model["edges"]
            )
            local_K_automorphism = (
                local_K is not None
                and quotient_edge_image(
                    frame_model["edges"],
                    local_K,
                ) == frame_model["edges"]
            )
            local_K_native_exact = (
                local_K is not None
                and quotient_to_native is not None
                and all(
                    quotient_to_native[local_K[state]]
                    == canonical_K[quotient_to_native[state]]
                    for state in range(1800)
                )
            )

            frame_models.append(frame_model)
            frame_native_maps.append(quotient_to_native)
            local_K_actions.append(local_K)
            frame_checks.append({
                "frame_graph_exact": frame_graph_exact,
                "quotient_shape_exact": quotient_shape_exact,
                "quotient_native_exact": quotient_native_exact,
                "local_K_automorphism": local_K_automorphism,
                "local_K_native_exact": local_K_native_exact,
            })

        transport_maps = []
        transport_checks = []

        for frame_index in range(5):
            next_index = (frame_index + 1) % 5
            source_model = frame_models[frame_index]
            target_model = frame_models[next_index]

            quotient_transport = descend(
                source_model,
                target_model,
                lambda state, action=transport:
                    product_index(
                        action[product_coordinates(state)[0]],
                        action[product_coordinates(state)[1]],
                    ),
            )

            graph_exact = (
                quotient_transport is not None
                and quotient_edge_image(
                    source_model["edges"],
                    quotient_transport,
                ) == target_model["edges"]
            )
            intertwines_K = (
                quotient_transport is not None
                and all(
                    quotient_transport[
                        local_K_actions[frame_index][state]
                    ]
                    == local_K_actions[next_index][
                        quotient_transport[state]
                    ]
                    for state in range(1800)
                )
            )
            native_identity = (
                quotient_transport is not None
                and all(
                    frame_native_maps[next_index][
                        quotient_transport[state]
                    ] == frame_native_maps[frame_index][state]
                    for state in range(1800)
                )
            )

            transport_maps.append(quotient_transport)
            transport_checks.append({
                "graph_exact": graph_exact,
                "intertwines_K": intertwines_K,
                "native_identity": native_identity,
            })

        if any(action is None for action in local_K_actions):
            raise RuntimeError("missing local K action")

        if any(action is None for action in transport_maps):
            raise RuntimeError("missing frame transport")

        F = [None] * 9000

        for frame_index in range(5):
            next_index = (frame_index + 1) % 5
            for state in range(1800):
                after_K = local_K_actions[frame_index][state]
                after_transport = transport_maps[frame_index][after_K]
                F[frame_index * 1800 + state] = (
                    next_index * 1800 + after_transport
                )

        F = tuple(F)

        if set(F) != set(range(9000)):
            raise RuntimeError("combined F is not a permutation")

        F5_equals_K = all(
            action_power_state(
                F,
                frame_index * 1800 + state,
                5,
            )
            == (
                frame_index * 1800
                + local_K_actions[frame_index][state]
            )
            for frame_index in range(5)
            for state in range(1800)
        )

        F20_identity = all(
            action_power_state(F, state, 20) == state
            for state in range(9000)
        )

        first_return = next(
            (
                exponent
                for exponent in range(1, 21)
                if all(
                    action_power_state(F, state, exponent) == state
                    for state in range(9000)
                )
            ),
            None,
        )

        construction_rows.append({
            "transport_label": transport_label,
            "labeling_index": labeling_index,
            "image_axes": [
                image_a_label,
                image_b_label,
                image_ab_label,
            ],
            "selected_Audit028t_axes": (
                image_a_label == "a"
                and image_b_label == "b"
                and image_ab_label == "ab"
            ),
            "all_frame_graphs_exact":
                all(row["frame_graph_exact"] for row in frame_checks),
            "all_quotient_shapes_exact":
                all(row["quotient_shape_exact"] for row in frame_checks),
            "all_quotients_native_exact":
                all(row["quotient_native_exact"] for row in frame_checks),
            "all_local_K_automorphisms":
                all(row["local_K_automorphism"] for row in frame_checks),
            "all_local_K_native_exact":
                all(row["local_K_native_exact"] for row in frame_checks),
            "all_transports_graph_exact":
                all(row["graph_exact"] for row in transport_checks),
            "all_transports_intertwine_K":
                all(row["intertwines_K"] for row in transport_checks),
            "all_transports_native_identity":
                all(row["native_identity"] for row in transport_checks),
            "F5_equals_local_K": F5_equals_K,
            "F20_is_identity": F20_identity,
            "first_global_return": first_return,
            "cycle_profile": cycle_profile(F),
        })

selected_rows = [
    row
    for row in construction_rows
    if row["selected_Audit028t_axes"]
]

checks = {
    "source_Audit013_passes":
        audit013["audit_pass"],
    "source_Audit028t_passes":
        audit028t["audit_pass"],
    "Audit013_state_mapping_reproduces_native_edges":
        mapped_initial_edges == native_edges,
    "regular_group_order60":
        len(regular_group) == 60,
    "connection_stabilizer_is_V4":
        len(connection_stabilizer) == 4
        and Counter(
            permutation_order(element)
            for element in connection_stabilizer
        ) == {1: 1, 2: 3},
    "four_C5_transports":
        len(cross_products) == 4,
    "six_ordered_axis_registrations":
        len(ordered_source_axes) == 6,
    "twenty_four_constructions":
        len(construction_rows) == 24,
    "all_frame_graphs_map_to_native_G60":
        all(row["all_frame_graphs_exact"] for row in construction_rows),
    "all_quotients_are_1800_7200_degree8_connected":
        all(row["all_quotient_shapes_exact"] for row in construction_rows),
    "all_quotients_match_native_axis_models":
        all(row["all_quotients_native_exact"] for row in construction_rows),
    "all_local_K_actions_are_graph_automorphisms":
        all(row["all_local_K_automorphisms"] for row in construction_rows),
    "all_local_K_actions_match_native_axis_K":
        all(row["all_local_K_native_exact"] for row in construction_rows),
    "all_frame_transports_are_graph_isomorphisms":
        all(row["all_transports_graph_exact"] for row in construction_rows),
    "all_frame_transports_intertwine_K":
        all(row["all_transports_intertwine_K"] for row in construction_rows),
    "all_transports_are_identity_in_native_coordinates":
        all(row["all_transports_native_identity"] for row in construction_rows),
    "selected_Audit028t_axis_count4":
        len(selected_rows) == 4,
    "F5_equals_local_K_for_all_constructions":
        all(row["F5_equals_local_K"] for row in construction_rows),
    "F20_identity_for_all_constructions":
        all(row["F20_is_identity"] for row in construction_rows),
    "first_global_return_is20":
        all(row["first_global_return"] == 20 for row in construction_rows),
    "every_action_has450_free_twenty_cycles":
        all(row["cycle_profile"] == {20: 450} for row in construction_rows),
}

audit_pass = all(checks.values())

payload = {
    "audit_id": AUDIT_ID,
    "timestamp": datetime.now(UTC).isoformat(),
    "audit_pass": audit_pass,
    "verdict": VERDICT if audit_pass else "audit_failed",
    "sources": {
        "Audit013": {
            "path": str(AUDIT013_PATH.relative_to(ROOT)),
            "sha256": sha256(AUDIT013_PATH),
            "audit_pass": audit013["audit_pass"],
        },
        "Audit028t": {
            "path": str(AUDIT028T_PATH.relative_to(ROOT)),
            "sha256": sha256(AUDIT028T_PATH),
            "audit_pass": audit028t["audit_pass"],
        },
        "canonical_bundle": {
            "path": str(BUNDLE_PATH.relative_to(ROOT)),
            "sha256": sha256(BUNDLE_PATH),
        },
    },
    "measurements": {
        "construction_count": len(construction_rows),
        "C5_transport_count": len(cross_products),
        "ordered_axis_registration_count": len(ordered_source_axes),
        "selected_Audit028t_axis_count": len(selected_rows),
        "frame_count_per_construction": 5,
        "G1800_vertex_count_per_frame": 1800,
        "G1800_edge_count_per_frame": 7200,
        "global_groupoid_state_count": 9000,
        "combined_cycle_profile": {"20": 450},
        "first_global_return": 20,
        "return_law": "F^5=K, K^4=1, F^20=1",
        "construction_rows": construction_rows,
    },
    "checks": checks,
    "interpretation": (
        "The exact Audit013 state map identifies the connection-frame "
        "stabilizer with the native G60 deck V4. Across four C5 transports "
        "and six ordered axis registrations, five framed G60 graphs yield "
        "five native-deck G1800 quotients. Frame transport is a graph "
        "isomorphism intertwining local C4 actions. The combined action "
        "has first return twenty and 450 free twenty-cycles."
    ),
    "keeper": (
        "Five-step transport returns the frame while retaining one "
        "quarter-turn. Four such returns close the action."
    ),
    "boundary": {
        "specific_ordered_axis_intrinsically_selected": False,
        "specific_C5_transport_intrinsically_selected": False,
        "bare_single_G1800_has_order20_automorphism": False,
        "order20_action_is_on_five_frame_groupoid": True,
        "dimensionful_action_derived": False,
        "action_normalized_to_hbar": False,
        "physical_action_cycle_claim": False,
        "physical_memory_claim": False,
    },
    "next_target": (
        "Classify the cyclic C20 action relative to the intrinsic "
        "automorphism and quotient structure, then state the independent "
        "normalization datum required for a dimensionful action claim."
    ),
}

OUTPUT_PATH.write_text(
    json.dumps(payload, indent=2, sort_keys=True) + "\n"
)

print("== TRANSPORTED G1800 C5-C4 GROUPOID AUDIT 040 ==")
print("audit_id:", AUDIT_ID)
print("audit_pass:", str(audit_pass).lower())
print("verdict:", payload["verdict"])
print("construction_count:", len(construction_rows))
print("selected_Audit028t_axis_count:", len(selected_rows))
print("global_groupoid_state_count: 9000")
print("first_global_return: 20")
print("combined_cycle_profile:", {20: 450})
print("return_law: F^5=K, K^4=1, F^20=1")
print("bare_single_G1800_has_order20_automorphism: false")
print("action_normalized_to_hbar: false")
print("output:", OUTPUT_PATH)
print()
print("== CHECKS ==")

for name, passed in checks.items():
    print(name + ":", str(passed).lower())
