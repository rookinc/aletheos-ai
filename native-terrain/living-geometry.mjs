import {loadGraph, triangles, automorphism, compose, verifyQuotient} from './kernel.mjs';

export const GEOMETRY_VERSION = 'aletheos-living-geometry/1.0.0';

function requireThat(condition, message) {
  if (!condition) throw new Error(`Living geometry: ${message}`);
}

function freezeTree(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    for (const child of Object.values(value)) freezeTree(child);
    Object.freeze(value);
  }
  return value;
}

/**
 * Build finite topology from admitted G60 and V4 inputs. All indices are zero
 * based. No rendered coordinate participates in a topology decision.
 *
 * The quotient graph is explicitly the Cartesian-product graph modulo the
 * simultaneous deck action: one factor takes a G60 edge at each transition.
 * It is a derived construction, not identification with a legacy G900 body.
 * Returned data is recursively frozen; callers own all mutable run state.
 */
export function buildGeometry(fixture, g15) {
  const loaded = loadGraph(fixture);
  requireThat(loaded.n === 60, 'expected 60 native vertices');
  requireThat(loaded.edges.length === 120 && loaded.adj.every(ns => ns.length === 4),
    'expected 120 native edges and degree four');
  const coords = fixture.layout?.coordinates;
  requireThat(Array.isArray(coords) && coords.length === 60 && coords.every(p =>
    Array.isArray(p) && p.length === 3 && p.every(Number.isFinite)),
  'native display coordinates are missing or invalid; no substitute layout loaded');
  const ts = triangles(loaded);
  requireThat(ts.length === 40, 'expected 40 native triangles');
  requireThat(g15?.schema === 'aletheos.quotient.v1', 'missing admitted V4 quotient input');
  requireThat(Array.isArray(g15.deck_generators) && g15.deck_generators.length === 2,
    'expected two native V4 generators');
  const [a, b] = g15.deck_generators.map(p => p.slice());
  const identity = Array.from({length: 60}, (_, i) => i);
  requireThat([a, b].every(p => automorphism(loaded, p)), 'deck generator is not a G60 automorphism');
  requireThat([a, b].every(p => p.every((v, i) => p[v] === i && v !== i)),
    'deck generators must be fixed-point-free involutions');
  const ab = compose(a, b);
  requireThat(ab.every((v, i) => v === compose(b, a)[i]), 'deck generators do not commute');
  const deck = [identity, a, b, ab];
  requireThat(new Set(deck.map(p => p.join(','))).size === 4 && ab.every((v, i) => v !== i),
    'deck action must be free and have exactly four elements');
  requireThat(verifyQuotient(loaded, g15).passed, 'G60 to G15 covering check failed');

  const g60 = {
    n: loaded.n,
    adj: loaded.adj.map(ns => ns.slice()),
    edges: loaded.edges.map(e => e.slice()),
    coords: coords.map(p => p.slice()),
    triangles: ts.map(t => t.slice()),
    layout: 'Imported native-source display coordinates; visualization embedding only',
  };
  const directedEdges = [];
  for (const [u, v] of g60.edges) directedEdges.push([u, v], [v, u]);
  const edgeIndex = Object.fromEntries(directedEdges.map(([u, v], i) => [`${u},${v}`, i]));
  const triangleIndex = new Map(ts.map((t, i) => [t.join(','), i]));
  const triangleForEdge = [];
  const successor = directedEdges.map(([u, v], i) => {
    const common = g60.adj[u].filter(w => g60.adj[v].includes(w));
    requireThat(common.length === 1, `edge ${u},${v} does not have a unique triangle`);
    const w = common[0];
    triangleForEdge[i] = triangleIndex.get([u, v, w].sort((x, y) => x - y).join(','));
    return edgeIndex[`${v},${w}`];
  });
  requireThat(new Set(successor).size === 240 && successor.every((s, i) =>
    s !== i && successor[successor[s]] === i), 'native successor failed T^3 = I');

  const map = Array(3600).fill(-1);
  const orbits = [];
  for (let x = 0; x < 60; x++) for (let y = 0; y < 60; y++) {
    if (map[x * 60 + y] !== -1) continue;
    const members = deck.map(p => [p[x], p[y]])
      .sort(([x1, y1], [x2, y2]) => x1 - x2 || y1 - y2);
    const id = orbits.length;
    requireThat(new Set(members.map(p => p.join(','))).size === 4, 'nonfree diagonal orbit');
    for (const [u, v] of members) {
      requireThat(map[u * 60 + v] === -1, 'overlapping diagonal orbits');
      map[u * 60 + v] = id;
    }
    orbits.push(members);
  }
  requireThat(orbits.length === 900 && map.every(id => id >= 0), 'diagonal quotient must contain 900 states');

  const adjacency = Array.from({length: 900}, () => new Set());
  // Use all representatives. This checks invariance and avoids relying on an
  // arbitrary representative to define a quotient transition.
  for (let x = 0; x < 60; x++) for (let y = 0; y < 60; y++) {
    const from = map[x * 60 + y];
    for (const nx of g60.adj[x]) adjacency[from].add(map[nx * 60 + y]);
    for (const ny of g60.adj[y]) adjacency[from].add(map[x * 60 + ny]);
  }
  const adj = adjacency.map(ns => [...ns].sort((x, y) => x - y));
  requireThat(adj.every((ns, i) => ns.length === 8 && !ns.includes(i) && ns.every(j => adjacency[j].has(i))),
    'Cartesian quotient must be a simple symmetric degree-eight graph');
  const edges = adj.flatMap((ns, u) => ns.filter(v => v > u).map(v => [u, v]));
  requireThat(edges.length === 3600, 'expected 3,600 Cartesian quotient edges');
  const factorSwap = orbits.map(o => map[o[0][1] * 60 + o[0][0]]);
  requireThat(factorSwap.every((v, i) => factorSwap[v] === i), 'factor exchange is not an involution');
  const fixedLocus = factorSwap.flatMap((v, i) => v === i ? [i] : []);
  requireThat(fixedLocus.length === 60, 'expected 60 factor-exchange fixed states');
  // A fixed, explicitly nonintrinsic projection of the canonical pair uses
  // only the source display coordinates. It does not alter graph adjacency.
  const quotientCoords = orbits.map(([[x, y]]) => {
    const left = g60.coords[x], right = g60.coords[y];
    return [1.7 * left[0] + .55 * right[2],
      1.7 * left[1] + .55 * right[0], 1.7 * left[2] + .55 * right[1]];
  });
  const quotient = {
    n: 900, orbits, map, adj, edges, fixedLocus, factorSwap, coords: quotientCoords,
    adjacencyRule: 'Cartesian product: exactly one G60 factor traverses an edge, modulo diagonal V4',
    layout: 'Canonical orbit-representative projection of source G60 coordinates; visualization embedding only',
  };
  return freezeTree({
    version: GEOMETRY_VERSION, g60, directedEdges, edgeIndex, successor, triangleForEdge, quotient, deck,
    classification: {
      g60: 'Native: admitted explicit source adjacency and V4 deck permutations',
      walker: 'Native: unique-triangle directed-edge successor, T^3 = I',
      quotient: 'Derived: Cartesian G60 × G60 graph modulo diagonal V4',
      fixedLocus: 'Derived: fixed states of factor exchange on the diagonal quotient',
      coordinates: 'Experimental visualization embedding; never used to decide adjacency',
      defect: 'No certified perfect-defect interface asserted by this builder',
    },
  });
}
