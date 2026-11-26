/**
 * node tests/dart-orbits.mjs
 * node tests/dart-orbits.mjs --source-dir /path/to/public_html/observatories/g9000
 * Checks the complete 9,000-site transport without network or third-party libraries.
 */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DART_PAIRS, DART_SOURCE, dartPairAt } from '../dart-orbits.js';

const sha256 = x => createHash('sha256').update(x).digest('hex');

// Verbatim 855-byte native/kalachakra-transport.json, plus the a/b arrays
// extracted from native/native.json. These suffice to reconstruct all graph
// addresses when only the downloadable instrument is installed.
const originalTransport = "{\"base\":[480,540,300,360,420,120,180,240,0,60,340,1300,940,1680,1620,40,1740,700,1240,1360,400,1600,1420,1000,640,100,1060,1180,1540,1660,460,1780,1720,1480,1120,160,780,720,660,600,520,1020,960,900,840,220,1260,1200,1140,1080,580,820,1440,1380,1320,280,1560,1500,760,880],\"offsets\":[0,1,2,3,4,5,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,33,34,36,37,44],\"shifts\":[0,10,-30,-20,-10,-5,5,15,-25,-15,6,3,-8,-11,-9,-2,7,14,16,13,2,-1,1,8,17,12,9,11,18,19],\"weightedSum\":1471960500,\"source\":\"https://aletheos.ai/observatories/thalean-graph-explorer/\",\"sourceVersion\":\"0.34.0\",\"sourceAuditSHA256\":\"77e8672d9df1a7b51fbc5ea76c16c607332130a5947a209d4eb11763e5814026\",\"extraction\":\"Exact compact representation of the inline topology.K array; all 1800 reconstructed entries compared equal in the source page. F(frame,local)=((frame+1) mod 5,K(local)).\"}\n";
const deck = {"a":[40,50,10,20,30,35,45,55,15,25,2,46,43,32,29,8,31,38,47,54,3,56,53,42,39,9,41,48,57,14,4,16,13,52,49,5,51,58,17,24,0,26,23,12,59,6,11,18,27,34,1,36,33,22,19,7,21,28,37,44],"b":[15,25,35,45,55,10,20,30,40,50,5,24,17,58,51,0,59,12,23,26,6,34,27,18,11,1,19,22,33,36,7,44,37,28,21,2,29,32,43,46,8,54,47,38,31,3,39,42,53,56,9,14,57,48,41,4,49,52,13,16]};
assert.equal(sha256(originalTransport), DART_SOURCE.sha256['native/kalachakra-transport.json']);
assert.equal(sha256(JSON.stringify(deck)), '8a087b0184fd7df911fdd0a3a32271aec6b40c9522958134c269164ca0f6367d');
const t = JSON.parse(originalTransport);
const localTurn = Array.from({length: 1800}, (_, i) => {
  const u = t.base[i % 60];
  return u + (u % 60 === 0 ? t.offsets : t.shifts)[Math.floor(i / 60)];
});
assert.equal(localTurn.reduce((total, v, i) => total + (i + 1) * v, 0), t.weightedSum);
assert.equal(new Set(localTurn).size, 1800);

const identity = Array.from({length: 60}, (_, i) => i);
const group = [identity, deck.a, deck.b, deck.a.map(i => deck.b[i])];
function quotient(size, elements) {
  const index = new Int32Array(size).fill(-1);
  const reps = [];
  for (let i = 0; i < size; i++) {
    if (index[i] !== -1) continue;
    for (const u of elements(i)) index[u] = reps.length;
    reps.push(i);
  }
  return {index, reps};
}
const pairedAction = (g, z) => 60 * g[Math.floor(z / 60)] + g[z % 60];
const q15 = quotient(60, i => group.map(g => g[i]));
const q900 = quotient(3600, z => group.map(g => pairedAction(g, z)));
const q1800 = quotient(3600, z => [z, pairedAction(deck.a, z)]);
assert.deepEqual([q15.reps.length, q900.reps.length, q1800.reps.length], [15, 900, 1800]);
const pi = q1800.reps.map(z => q900.index[z]);
const fibers = Array.from({length: 900}, () => []);
pi.forEach((base, i) => fibers[base].push(i));
assert.ok(fibers.every(f => f.length === 2));
const localB = q1800.reps.map(z => q1800.index[pairedAction(deck.b, z)]);
const deckLabel = v => group.findIndex(g => g[q15.reps[q15.index[v]]] === v);
function ordered(z) { return [Math.floor(z / 60), z % 60]; }
function surfaceAddress(g900) {
  const [x, y] = ordered(q900.reps[g900]);
  return [q15.index[x], q15.index[y], deckLabel(x) ^ deckLabel(y)];
}

for (let i = 0; i < 1800; i++) {
  const [x, y] = ordered(q1800.reps[i]);
  // Independent registered turn T[(x,y)] = [(ab·y,x)].
  assert.equal(localTurn[i], q1800.index[60 * group[3][y] + x]);
  assert.equal(localB[localB[i]], i);
  assert.notEqual(localB[i], i);
  assert.equal(pi[localB[i]], pi[i]);
}

const forward = v => 1800 * ((Math.floor(v / 1800) + 1) % 5) + localTurn[v % 1800];
const partner = v => 1800 * Math.floor(v / 1800) + localB[v % 1800];
const allCycles = [];
const seen = new Set();
for (let seed = 0; seed < 9000; seed++) {
  if (seen.has(seed)) continue;
  let v = seed;
  const orbit = [];
  do {
    assert.ok(!seen.has(v));
    seen.add(v);
    orbit.push(v);
    v = forward(v);
  } while (v !== seed);
  assert.equal(orbit.length, 20);
  for (let tick = 0; tick < 20; tick++) assert.equal(orbit[(tick + 10) % 20], partner(orbit[tick]));
  allCycles.push(orbit);
}
assert.equal(seen.size, 9000);
assert.equal(allCycles.length, 450);
function address(v) {
  const frame = Math.floor(v / 1800);
  const g1800 = v % 1800;
  const g900 = pi[g1800];
  return {id: v, frame, g1800, g900, sheet: fibers[g900].indexOf(g1800),
    framedProjection: frame * 900 + g900,
    orderedG60: ordered(q1800.reps[g1800]), address: surfaceAddress(g900)};
}

assert.equal(DART_PAIRS.length, 3);
for (const [i, pair] of DART_PAIRS.entries()) {
  const orbit = allCycles[i];
  assert.equal(pair.orbitId, i + 1);
  assert.equal(pair.seed, orbit[0]);
  assert.equal(pair.complement, orbit[10]);
  assert.deepEqual(pair.trajectory, orbit);
  assert.deepEqual(pair.complementaryTrajectory, orbit.map(partner));
  for (let tick = -20; tick <= 40; tick++) {
    const p = dartPairAt(i, tick);
    const phase = (tick + 20) % 20;
    const v = orbit[phase];
    assert.equal(p.step, tick);
    assert.equal(p.phase, phase);
    assert.deepEqual(p.a, address(v));
    assert.deepEqual(p.b, address(partner(v)));
    assert.equal(p.b.framedProjection, p.a.framedProjection);
    assert.equal(p.a.sheet + p.b.sheet, 1);
  }
}
for (const args of [[3, 0], [-1, 0], [0, 0.5], [1, NaN]]) assert.throws(() => dartPairAt(...args));

const supplied = process.argv.indexOf('--source-dir');
const source = supplied >= 0 ? process.argv[supplied + 1] : fileURLToPath(new URL('../../g9000/', import.meta.url));
let full = false;
if (supplied >= 0 || existsSync(join(source, 'native-model.js'))) {
  const files = {};
  for (const [path, hash] of Object.entries(DART_SOURCE.sha256)) {
    const bytes = readFileSync(join(source, path));
    assert.equal(sha256(bytes), hash, path);
    files[path] = bytes.toString('utf8');
  }
  const n = JSON.parse(files['native/native.json']);
  assert.deepEqual(n.deck.a, deck.a);
  assert.deepEqual(n.deck.b, deck.b);
  assert.deepEqual(n.turns.a, localTurn);
  assert.deepEqual(JSON.parse(files['native/constructor_chapter4.json']).projection, pi);
  const m = JSON.parse(files['native-model.js'].trim().replace(/^window\.NATIVE_MODEL=/, '').replace(/;$/, ''));
  assert.deepEqual(m.cycles, allCycles);
  assert.deepEqual(m.projection, pi);
  for (let i = 0; i < 1800; i++) {
    const p = address(i);
    assert.equal(m.lift[i], p.sheet);
    assert.deepEqual(m.pairs1800[i], p.orderedG60);
    assert.deepEqual(m.addresses[p.g900], p.address);
  }
  full = true;
}
console.log('PASS · 9,000 native states / 450 disjoint F20 cycles. Every F10 equals the independently constructed deck exchange. All three selected pairs have exact two-sheet addresses.' +
  (full ? ' Four pinned original file hashes and the full 450-orbit published fixture matched.' : ' Reconstructed from included exact compact transport and deck permutations.'));
