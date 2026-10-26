import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {buildGeometry} from '../living-geometry.mjs';

const read = name => JSON.parse(readFileSync(new URL(`../data/${name}`, import.meta.url)));
const fixture = read('g60.json'), g15 = read('g15-quotient.json');
const geometry = buildGeometry(fixture, g15);

test('native directed-edge successor has exactly 80 three-cycles and follows source edges', () => {
  const {g60, directedEdges, successor, triangleForEdge} = geometry;
  assert.equal(directedEdges.length, 240);
  assert.equal(g60.triangles.length, 40);
  const cycles = new Set();
  directedEdges.forEach(([u, v], i) => {
    const j = successor[i], k = successor[j];
    assert.equal(successor[k], i);
    assert.equal(new Set([i, j, k]).size, 3);
    assert.equal(directedEdges[j][0], v);
    assert.equal(directedEdges[k][1], u);
    assert.ok(g60.adj[u].includes(v));
    assert.ok(g60.triangles[triangleForEdge[i]].includes(u));
    assert.ok(g60.triangles[triangleForEdge[i]].includes(v));
    cycles.add([i, j, k].sort((a, b) => a - b).join(','));
  });
  assert.equal(cycles.size, 80);
});

test('diagonal quotient partitions every ordered pair into a free V4 orbit', () => {
  const {quotient: q, deck} = geometry;
  assert.equal(q.orbits.length, 900);
  assert.equal(new Set(q.orbits.flat().map(([x, y]) => x * 60 + y)).size, 3600);
  q.orbits.forEach((o, id) => {
    assert.equal(o.length, 4);
    for (const [x, y] of o) for (const p of deck) assert.equal(q.map[p[x] * 60 + p[y]], id);
  });
});

test('quotient transitions are exactly images of Cartesian native edges from every representative', () => {
  const {g60, quotient: q} = geometry;
  assert.equal(q.edges.length, 3600);
  q.orbits.forEach((orbit, id) => {
    for (const [x, y] of orbit) {
      const expected = [...new Set([
        ...g60.adj[x].map(nx => q.map[nx * 60 + y]),
        ...g60.adj[y].map(ny => q.map[x * 60 + ny]),
      ])].sort((a, b) => a - b);
      assert.deepEqual(q.adj[id], expected);
    }
    assert.equal(q.adj[id].length, 8);
    assert.ok(!q.adj[id].includes(id));
    q.adj[id].forEach(v => assert.ok(q.adj[v].includes(id)));
  });
});

test('factor exchange has precisely 60 fixed quotient states and preserves adjacency', () => {
  const q = geometry.quotient;
  assert.equal(q.fixedLocus.length, 60);
  q.factorSwap.forEach((v, i) => assert.equal(q.factorSwap[v], i));
  q.edges.forEach(([u, v]) => assert.ok(q.adj[q.factorSwap[u]].includes(q.factorSwap[v])));
  assert.deepEqual(q.fixedLocus, q.factorSwap.flatMap((v, i) => v === i ? [i] : []));
});

test('source and mutable visual positions cannot silently mutate native topology', () => {
  assert.throws(() => geometry.g60.adj[0].push(1), TypeError);
  assert.throws(() => geometry.quotient.edges[0][0] = 5, TypeError);
  assert.throws(() => geometry.g60.coords[0][0] = 100, TypeError);
  const changed = structuredClone(fixture);
  changed.layout.coordinates[0][0] += 100;
  const second = buildGeometry(changed, g15);
  assert.deepEqual(second.quotient.edges, geometry.quotient.edges);
  assert.deepEqual(second.successor, geometry.successor);
  assert.notDeepEqual(second.g60.coords, geometry.g60.coords);
  assert.equal(Object.isFrozen(fixture), false);
  assert.equal(Object.isFrozen(g15), false);
});

test('missing or corrupt source inputs fail rather than substituting geometry', () => {
  const missing = structuredClone(fixture); delete missing.layout;
  assert.throws(() => buildGeometry(missing, g15), /coordinates/);
  const badCoords = structuredClone(fixture); badCoords.layout.coordinates[0][0] = Infinity;
  assert.throws(() => buildGeometry(badCoords, g15), /coordinates/);
  const badDeck = structuredClone(g15); badDeck.deck_generators[0][0] = 0;
  assert.throws(() => buildGeometry(fixture, badDeck), /automorphism|involution/);
  const badMap = structuredClone(g15); badMap.map[0] = (badMap.map[0] + 1) % 15;
  assert.throws(() => buildGeometry(fixture, badMap), /covering check failed/);
  assert.throws(() => buildGeometry({...fixture, edges: fixture.edges.slice(1)}, g15), /120 native edges/);
});
