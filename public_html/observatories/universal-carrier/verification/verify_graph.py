"""Check a Light Loom graph packet against GraphSym and optionally the G15 theorem object.

python verify_graph.py packet.json --census AT_4valent_60.s6 --theorem theorem_object.json

The certificate is stored in identity.json beside this script. The --census argument
uses a fresh copy of the pinned GraphSym file in place of its bundled sparse6 record.
All vertex maps run from Light Loom to reference labels; both are zero-based.
"""
import argparse
import hashlib
import json
from pathlib import Path


def require(condition, message):
    if not condition:
        raise ValueError(message)


def census_edges(line):
    # The order-60 census uses the single-character vertex count of sparse6.
    require(line.startswith(":{"), "Expected a sparse6 graph of order 60")
    require(all(63 <= ord(c) <= 126 for c in line[2:]), "Invalid sparse6 encoding")
    bits = "".join(f"{ord(c)-63:06b}" for c in line[2:])
    vertex = 0
    edges = set()
    for start in range(0, len(bits) - 6, 7):
        vertex += int(bits[start])
        other = int(bits[start + 1:start + 7], 2)
        if other >= 60 or vertex >= 60:
            break
        if other > vertex:
            vertex = other
        else:
            require(other < vertex and (other, vertex) not in edges,
                    "Unexpected loop or repeated edge in census")
            edges.add((other, vertex))
    return edges


def multiply(a, b):
    return [[sum(x*y for x, y in zip(row, col)) for col in zip(*b)] for row in a]


def verify_graph(packet, certificate, census=None, theorem=None):
    mapping = certificate["loom_to_graphsym_zero_based"]
    require(sorted(mapping) == list(range(60)), "Invalid 60-vertex bijection")
    row = certificate["line_1based"]
    require(row == 6, "Expected GraphSym census entry 6")
    line = census.splitlines()[row-1] if census is not None else certificate["sparse6"]
    require(hashlib.sha256(line.encode("ascii")).hexdigest() ==
            certificate["sparse6_sha256_ascii_no_newline"], "GraphSym record digest differs")
    expected = census_edges(line)
    edges = packet["edges"]
    require(len(edges) == len(expected) == 120, "Expected 120 edges")
    require(all(len(edge) == 2 and all(type(v) is int and 0 <= v < 60 for v in edge)
                for edge in edges), "Invalid endpoint")
    actual = {tuple(sorted((mapping[x], mapping[y]))) for x, y in edges}
    require(actual == expected, "Loom edge set differs from the GraphSym census entry")
    result = {"AT4val[60,6]": True, "edges_compared": len(actual),
              "census_record": "external" if census is not None else "bundled"}
    if theorem is not None:
        pi = packet["pi"]
        require(len(pi) == 60 and sorted(pi) == sorted(list(range(15))*4), "Invalid quotient map")
        rename = certificate["loom_slot_to_theorem_zero_based"]
        require(sorted(rename) == list(range(15)), "Invalid quotient bijection")
        adjacency = [[0]*15 for _ in range(15)]
        for u, v in edges:
            i, j = rename[pi[u]], rename[pi[v]]
            adjacency[i][j] = adjacency[j][i] = 1
        distances = theorem["g15_distance_matrix"]
        require(adjacency == [[int(d == 1) for d in row] for row in distances],
                "Loom quotient differs from the G15 distance-one adjacency")
        m, q = theorem["matrix_M"], theorem["gram_Q"]
        require(multiply(m, list(zip(*m))) == q, "Q differs from M M^T")
        square = multiply(adjacency, adjacency)
        cube = multiply(square, adjacency)
        require(q == [[cube[i][j]+2*square[i][j]+2*int(i == j) for j in range(15)]
                      for i in range(15)], "Q differs from A^3 + 2 A^2 + 2 I")
        result["G15_quotient_and_theorem_identity"] = True
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("packet", type=Path, help="The six-key Light Loom packet, in JSON")
    parser.add_argument("--census", type=Path, help="Pinned GraphSym AT_4valent_60.s6 file")
    parser.add_argument("--theorem", type=Path, help="Aletheos theorem_object.json")
    parser.add_argument("--certificate", type=Path, default=Path(__file__).with_name("identity.json"))
    args = parser.parse_args()
    result = verify_graph(json.loads(args.packet.read_text()), json.loads(args.certificate.read_text()),
                          args.census.read_text() if args.census else None,
                          json.loads(args.theorem.read_text()) if args.theorem else None)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
