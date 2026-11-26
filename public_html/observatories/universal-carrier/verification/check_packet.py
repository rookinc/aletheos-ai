"""Check the archived register from a standalone JSON packet or Light Loom HTML."""
import argparse
import json
from collections import Counter, deque
from fractions import Fraction
from math import fsum, isfinite
from pathlib import Path


def read_packet(path):
    text = path.read_text(encoding="utf-8")
    if text.lstrip().startswith("{"):
        return json.loads(text)
    marker = "<script>const D="
    if marker not in text:
        raise ValueError("Cannot locate the Light Loom packet in the supplied HTML")
    return json.JSONDecoder().raw_decode(text.split(marker, 1)[1])[0]


def check(condition, description):
    if not condition:
        raise ValueError(description)


def verify(data):
    pi, rows = data["pi"], data["rows"]
    check(len(pi) == 60 and Counter(pi) == {i: 4 for i in range(15)}, "quotient fibres")
    edges = {tuple(sorted(pair)) for pair in data["edges"]}
    check(len(edges) == len(data["edges"]) == 120, "distinct undirected edges")
    neighbors = [set() for _ in pi]
    for u, v in edges:
        check(0 <= u < v < 60, "simple loop-free edge")
        neighbors[u].add(v)
        neighbors[v].add(u)
    lifts = Counter(tuple(sorted((pi[u], pi[v]))) for u, v in edges)
    check(len(lifts) == 30 and set(lifts.values()) == {4}, "four lifts per quotient edge")
    for u, adjacent in enumerate(neighbors):
        slots = {pi[v] for v in adjacent}
        check(len(slots) == len(adjacent) == 4 and pi[u] not in slots, "local cover")
        check(slots == {y if x == pi[u] else x for x,y in lifts if pi[u] in (x,y)}, "locally bijective cover")
    profiles = set()
    for site in range(60):
        distances, queue = {site: 0}, deque([site])
        while queue:
            v = queue.popleft()
            for w in neighbors[v] - distances.keys():
                distances[w] = distances[v] + 1
                queue.append(w)
        check(len(distances) == 60 and max(distances.values()) == 6, "connectivity and diameter")
        counts = Counter(distances.values())
        profiles.add(tuple(counts[i] for i in range(7)))
    check(len(profiles) == 1, "common distance profile")
    check(len(rows) == len(data["recip"]["guard"]) == 10, "ten contacts")
    scores, max_norm_error, max_chamber_error = [], 0, 0
    for i, row in enumerate(rows):
        opposite = rows[(i + 5) % 10]
        here = f"contact {i + 1}"
        check(row["step"] == i and tuple(sorted((row["tail"], row["head"]))) in edges, here + " dart")
        check(row["head"] == rows[(i + 1) % 10]["tail"], here + " successor")
        for field in ("q", "v"):
            values = row[field]
            check(len(values) == 20 and all(map(isfinite, values)) and [-x for x in values] == opposite[field], here + " " + field)
        rho = row["rho"]
        check(len(rho) == 60 and all(isfinite(x) and x >= 0 for x in rho) and rho == opposite["rho"], here + " densities")
        check(pi[row["head"]] == pi[opposite["head"]], here + " arrival slot")
        check(Fraction(data["recip"]["guard"][i]) == -Fraction(data["recip"]["guard"][(i+5)%10]), here + " signed guard")
        error = abs(fsum(rho) - 1)
        check(error <= 1e-14, here + " normalization")
        max_norm_error = max(error, max_norm_error)
        e00, e01, e10, e11 = map(Fraction, row["E"])
        score = Fraction(row["CHSH"])
        check(e00 + e01 + e10 - e11 == score, here + " exact CHSH")
        check(row["chsh"] == float(score), here + " decimal score")
        chamber = fsum(v for v, slot in zip(rho, pi) if slot in (1, 6, 12))
        error = abs(2.8 - 1.5 * chamber - float(score))
        check(error <= 1e-14, here + " chamber identity on decimal packet")
        max_chamber_error = max(error, max_chamber_error)
        scores.append(score)
    return dict(scope="internal packet checks", vertices=len(pi), edges=len(edges),
                distance_profile=list(profiles.pop()), quotient_edges=len(lifts),
                contacts=len(rows), normalization_max_absolute_error=max_norm_error,
                chamber_formula_max_absolute_error=max_chamber_error,
                exact_score_range=[str(min(scores)), str(max(scores))])


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("packet", type=Path, nargs="?", default=Path(__file__).with_name("packet.json"))
    print(json.dumps(verify(read_packet(parser.parse_args().packet)), indent=2))
