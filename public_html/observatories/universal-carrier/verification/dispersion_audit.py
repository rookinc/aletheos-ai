#!/usr/bin/env python3
"""Regenerate the four Light Loom oscilloscope acquisitions and dispersion audit.

Extract Light-Loom-Replay.zip and run
  python dispersion_audit.py Light-Loom-Replay --output .
Requires NumPy and SymPy as pinned in the replay kit. All contact dynamics,
closure, first-zero tests and spatial/temporal support checks use rational
arithmetic. Fourier powers and native period displays are floating-point.
"""
import argparse
import json
import math
from fractions import Fraction
from hashlib import sha256
from pathlib import Path

import numpy as np
import sympy as sp


HASHES = {
    "native_tensor_arrays.npz": "c2393278b1014c59798dc0b47c597a12f31c1c4a56d75d4872770278da98ef28",
    "actions.npz": "dc7eafc829d31d64182cca9c209e0929dbb20e8f65ee64d1595a237eaf3cd402",
}
# (rooted directed site, action). The pentagon reproduces the archived setting.
ROUTES = (("pentagon", "Pentagon", 26, 447), ("twelve", "Twelve-contact loop", 3, 15))
PHASES = ("-1/5", "-3/20")


def native_data(root):
    for name, digest in HASHES.items():
        if sha256((root / "source" / name).read_bytes()).hexdigest() != digest:
            raise ValueError("Native input hash mismatch: " + name)
    with np.load(root / "source/native_tensor_arrays.npz", allow_pickle=False) as native:
        w, edges, b1, b2, p = [native[name] for name in ("W", "canonical_edges", "B1", "B2", "PC30")]
    with np.load(root / "source/actions.npz", allow_pickle=False) as actions:
        vt, ft, fs = [actions[name] for name in ("vertex_target", "face_target", "face_sign")]
    edge_id = {tuple(edge): i for i, edge in enumerate(edges)}
    neighbors = [np.flatnonzero((abs(b1) @ abs(b1).T)[j] == 1) for j in range(60)]

    def guard(i, j, k):
        e = edge_id[tuple(sorted((i, j)))]
        f = edge_id[tuple(sorted((j, k)))]
        return int(np.sign(j - i) * np.sign(k - j)) * w[:, e, f]

    return vt, ft, fs, guard, neighbors, abs(b1), b2, p


def route_data(native, root, index):
    vt, ft, fs, guard, neighbors, *_ = native
    action = np.zeros((20, 20), int)
    action[ft[index], np.arange(20)] = fs[index]
    cycle = [root]
    while int(vt[index, cycle[-1]]) != root:
        cycle.append(int(vt[index, cycle[-1]]))
    steps = [(cycle * 2)[i:i + 3] for i in range(len(cycle))]
    guards = np.array([guard(*triple) for triple in steps])
    assert np.array_equal(guards @ action.T, np.roll(guards, -1, axis=0))
    for (i, j, _), h in zip(steps, guards):
        live = [guard(i, j, k) for k in neighbors[j] if guard(i, j, k).any()]
        assert len(live) == 2 and np.array_equal(live[0], -live[1]) and h.any()
    return action, cycle, guards


def guard_orbit_census(native):
    """Group the advancing single-action routes by exact guard autocorrelation."""
    vertex_actions, _, _, guard, neighbors, *_ = native
    classes = {}
    for index, perm in enumerate(vertex_actions):
        for start in range(60):
            j = int(perm[start])
            if j not in neighbors[start] or int(perm[j]) == start:
                continue
            h = guard(start, j, int(perm[j]))
            if not h.any():
                continue
            cycle = [start]
            while int(perm[cycle[-1]]) != start:
                cycle.append(int(perm[cycle[-1]]))
            pairs = (cycle * 2)
            correlations = tuple(int(h @ guard(*pairs[k:k + 3])) for k in range(len(cycle)))
            if correlations not in classes:
                classes[correlations] = dict(contact_count=len(cycle), representative_start=start,
                                             representative_action=index, rooted_action_pairs=0,
                                             guard_autocorrelation=list(correlations))
            classes[correlations]["rooted_action_pairs"] += 1
    return list(classes.values())


def exact_entry(guards, parameter):
    # On the cyclic guard span, (R-lambda)r=lambda*h has a finite geometric sum.
    # beta=hold, f=free, psi=beta+f mod 2*pi; units set free angular frequency to 1.
    t = sp.QQ.convert(Fraction(parameter))
    psi_cos = (1 - t*t) / (1 + t*t)
    psi_sin = 2*t / (1 + t*t)
    lam = sp.QQ_I(psi_cos, -psi_sin)
    n = len(guards)
    weights = [lam**(n - j) / (1 - lam**n) for j in range(n)]
    r = [sum((weight * sp.QQ_I(int(g)) for weight, g in zip(weights, col)), sp.QQ_I.zero)
         for col in guards.T]
    h = guards[0]
    c = -2 * sum(int(g) * val.y for g, val in zip(h, r)) / int(h @ h)
    assert c > 0
    cb, sb = (1 - c*c) / (1 + c*c), -2*c / (1 + c*c)
    cf, sf = psi_cos*cb + psi_sin*sb, psi_sin*cb - psi_cos*sb
    assert sb < 0 and sf > 0
    z = [val * sp.QQ_I(1 - cb, -sb) for val in r]
    q, v = (np.array([getattr(a, part) for a in z], dtype=object) for part in ("x", "y"))
    b = 2 * math.pi - 2 * math.atan(float(c))
    f = math.atan2(float(sf), float(cf))
    return q, v, cb, sb, cf, sf, b, f


def minimal_period(seq):
    return next(i for i in range(1, len(seq) + 1) if np.array_equal(seq, np.roll(seq, i, axis=0)))


def exact_temporal_support(seq):
    # A rational time-series coefficient vanishes at a primitive d-th root
    # exactly when its coefficient polynomial has zero remainder modulo Phi_d.
    x = sp.Symbol("x")
    n = len(seq)
    support = []
    for j in range(n // 2 + 1):
        order = n // math.gcd(n, j)
        phi = sp.Poly(sp.cyclotomic_poly(order, x), x)
        remainders = [sp.rem(sp.Poly(x**k, x), phi) for k in range(n)]
        reduce_poly = np.array([[int(poly.nth(i)) for poly in remainders] for i in range(phi.degree())])
        if (reduce_poly @ seq).any():
            support.append(j)
    return support


def spectra(density, laplacian, step_time):
    # Rational projectors are valid on the generated endpoint-density subspace.
    # Verify annihilation before using them, without assuming a support threshold.
    identity = np.eye(60, dtype=int)
    projected = {}
    for lam, num, den in (
        (0, (laplacian - 2*identity) @ (laplacian - 5*identity), 10),
        (2, laplacian @ (5*identity - laplacian), 6),
        (5, laplacian @ (laplacian - 2*identity), 15),
    ):
        field = (density @ num.T) / sp.QQ(den)
        assert np.array_equal(field @ laplacian.T, lam*field)
        projected[lam] = field
    assert np.array_equal(sum(projected.values()), density)
    n = len(density)
    components = {}
    for lam, field in projected.items():
        bins = np.fft.rfft(np.array(field, dtype=float), axis=0)
        exact_support = exact_temporal_support(field)
        for j in exact_support:
            p = float(np.vdot(bins[j], bins[j]).real)
            if 0 < j < n/2:
                p *= 2
            components.setdefault(j, {})[lam] = p
    total = sum(sum(power.values()) for power in components.values())
    return [
        dict(harmonic=j, omega_over_free=j/(n*step_time),
             share_of_density_power=sum(power.values())/total,
             rayleigh_k_squared=sum(lam*p for lam, p in power.items())/sum(power.values()),
             graph_eigenvalue_power={str(lam): p/sum(power.values()) for lam, p in power.items()})
        for j, power in sorted(components.items())
    ]


def acquisition(native, route, parameter, reference):
    key, name, root, index = route
    action, cycle, guards = route_data(native, root, index)
    incidence, b2, sector = native[-3:]
    q, v, cb, sb, cf, sf, b, f = exact_entry(guards, parameter)
    n = len(cycle)
    q0, v0 = q.copy(), v.copy()
    assert np.array_equal(sector @ q, 30*q) and np.array_equal(sector @ v, 30*v)
    rows, densities, registers = [], [], []
    for i, h in enumerate(guards):
        eq, ev = b2 @ q, b2 @ v
        energy = incidence @ (eq**2 + ev**2)
        rho = energy / sum(energy)
        rows.append(dict(tail=cycle[i], head=cycle[(i + 1) % n],
                         q=list(map(float, q)), v=list(map(float, v)), rho=list(map(float, rho))))
        registers.append(np.concatenate((q, v)))
        densities.append(rho)
        # Held: h.q(s)=||h||²(cos(s)-1)+(h.v)sin(s). Positive release
        # b=2*pi-2*atan(c), where c=−h.v/||h||², is the first positive zero.
        assert h @ q == 0 and h @ v < 0
        qr, vr = cb*(q+h) + sb*v - h, cb*v - sb*(q+h)
        assert h @ qr == 0 and h @ vr == -(h @ v) > 0
        qnext, vnext = cf*qr + sf*vr, cf*vr - sf*qr
        next_guard = guards[(i + 1) % n]
        # Free: consecutive zeros of a nonzero scalar sinusoid are pi apart.
        # The computed free angle is in (0,pi) with a simple root at the endpoint.
        assert next_guard @ qr > 0 and next_guard @ qnext == 0 and next_guard @ vnext < 0
        assert np.array_equal(qnext, action @ q) and np.array_equal(vnext, action @ v)
        q, v = qnext, vnext
    assert np.array_equal(q, q0) and np.array_equal(v, v0)
    if key == "pentagon" and parameter == "-1/5":
        for row, published in zip(rows, reference, strict=True):
            assert row["tail"] == published["tail"] and row["head"] == published["head"]
            for observable in ("q", "v", "rho"):
                np.testing.assert_allclose(row[observable], published[observable], atol=2e-12, rtol=0)
    step_time = (b + f) / (2*math.pi)
    ident = key + ("-1-5" if parameter == "-1/5" else "-3-20")
    info = dict(id=ident, label=name + " · " + parameter.replace("-", "−"),
                action=index, parameter=parameter, contact_count=n, step_free_periods=step_time)
    density = np.array(densities)
    laplacian = np.diag(incidence.sum(axis=1)) - ((incidence @ incidence.T) == 1)
    measurement = dict(**info, native_cycle=cycle, hold_free_periods=b/(2*math.pi),
                       free_free_periods=f/(2*math.pi), signed_period_contacts=minimal_period(registers),
                       density_period_contacts=minimal_period(density),
                       nonzero_signed_bins=exact_temporal_support(np.array(registers)),
                       density_spectrum=spectra(density, laplacian, step_time))
    return dict(**info, rows=rows), measurement


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("replay", type=Path, help="Extracted Light-Loom-Replay directory")
    parser.add_argument("--output", type=Path, default=Path.cwd(), help="Output directory")
    args = parser.parse_args()
    native = native_data(args.replay)
    classes = guard_orbit_census(native)
    assert sorted(group["contact_count"] for group in classes) == [10, 12]
    reference = json.loads((args.replay / "packet.json").read_text())["rows"]
    traces, measurements = [], []
    for route in ROUTES:
        for phase in PHASES:
            trace, measured = acquisition(native, route, phase, reference)
            traces.append(trace)
            measurements.append(measured)
    report = dict(
        title="Independent native contact preparations",
        observation="Normalized endpoint energy at each held-entry event; in-between states are unsampled.",
        frequency_unit="omega / omega_free = h / (N * step_free_periods); one free period = 2*pi oscillator-time units.",
        spatial_operator="Unnormalized 60-vertex combinatorial Laplacian 4I-A, on normalized endpoint density.",
        exact_checks=["Opposite eligible guards, first positive held and free zeros, signed native update.",
                      "Exact closure, minimal periods and spatial/temporal support on every trajectory.",
                      "The canonical launch matches every published endpoint and face trace to 2e-12."],
        conclusion="At graph eigenvalue 2, the twelve-contact density carries two distinct positive temporal lines. Its pure H2 line also shifts with launch parameter at fixed eigenvalue. These samples cannot provide one frequency per density eigenvalue. A fundamental field dispersion law, propagation speed and gap remain undetermined.",
        scope="Two symmetry-generated routes, each at two rational launch parameters. Harmonics of one route are related. The temporal spectra are contact-sampled and frequencies are in native clock units.",
        source_sha256=HASHES,
        route_search="All 480 native vertex actions and all 60 roots, retaining cyclic neighbor walks of length at least three with a live forward turn. Classes are distinguished by the guard autocorrelation sequence. Other histories are outside this search.",
        route_classes=classes, preparations=measurements)
    # Each twelve-contact H2 is pure and H4 has nonzero power at the same k².
    twelve = [p for p in measurements if p["action"] == 15]
    h2_freq = []
    for p in twelve:
        lines = {line["harmonic"]: line for line in p["density_spectrum"]}
        assert set(lines[2]["graph_eigenvalue_power"]) == {"2"}
        assert set(lines[4]["graph_eigenvalue_power"]) == {"2", "5"}
        h2_freq.append(lines[2]["omega_over_free"])
    assert abs(h2_freq[0] - h2_freq[1]) > 0.002
    args.output.mkdir(exist_ok=True, parents=True)
    (args.output / "scope-preparations.json").write_text(json.dumps({"preparations": traces}, separators=(",", ":"))+"\n")
    (args.output / "dispersion-audit.json").write_text(json.dumps(report, indent=2)+"\n")
    for p in measurements:
        print(p["label"], "  signed / energy / route periods:", p["signed_period_contacts"],
              p["density_period_contacts"], p["contact_count"])


if __name__ == "__main__":
    main()
