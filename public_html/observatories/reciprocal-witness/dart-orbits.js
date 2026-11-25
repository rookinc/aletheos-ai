// Three canonical G9000 F-orbits and their ten-step deck partners.
// These are native graph addresses. The heart gate and spatial shell drawing
// are application choices and neither changes the successor in this module.
export const DART_SOURCE = Object.freeze({
  repository: 'rookinc/aletheos-ai',
  revision: 'dfe977f66d57ed34d61d42c6221378cbd819f9d1',
  folder: 'public_html/observatories/g9000',
  sha256: Object.freeze({
    'native-model.js': 'd53652baacefe2dfd9d00a0692b2267deda3c710d2a03b83e47b2d0d1180e8e0',
    'native/native.json': '9d7729b179da8919d2713701a8e4ef4eebc77c9baef4c0051a1bcf5327ba40e6',
    'native/constructor_chapter4.json': 'd7064673a65771bfae67af418314a7316473cbf042583b5600a67cab6e95555d',
    'native/kalachakra-transport.json': 'ca9c77755a32b15e3a062796256c11a96f49c5e251b85ff20922f29eadcab310'
  }),
  frameCount: 5, localSites: 1800, vertices: 9000, cycles: 450, period: 20,
  complementaryStep: 10,
  selection: 'First three F-orbits in increasing least-vertex order',
  gate: 'The experiment assigns synthetic beats to admissions. The canonical F step, sheet partner, and next graph address use no cardiac variables.'
});

// The native G1800 turn has period four. Each row holds its local site, G900
// projection, lift bit, representative ordered G60 pair and G900 surface address
// (left G15 site, right G15 site, relative V4 label).
const localCycles = [
  [[0,0,0,[0,0],[0,0,0]], [480,8,1,[8,0],[0,0,3]],
    [488,0,1,[8,8],[0,0,0]], [8,8,0,[0,8],[0,0,3]]],
  [[1,1,0,[0,1],[0,1,0]], [540,68,1,[9,0],[1,0,3]],
    [489,1,1,[8,9],[0,1,0]], [68,68,0,[1,8],[1,0,3]]],
  [[2,2,0,[0,2],[0,2,0]], [300,128,1,[5,0],[2,0,3]],
    [485,2,1,[8,5],[0,2,0]], [128,128,0,[2,8],[2,0,3]]]
];

const cycles = localCycles.map(rows => Object.freeze(Array.from({length:20}, (_, phase) => {
  const frame = phase % 5;
  const [g1800, g900, sheet, orderedG60, address] = rows[phase % 4];
  return Object.freeze({
    id: 1800 * frame + g1800, frame, g1800, g900, sheet,
    framedProjection: 900 * frame + g900,
    orderedG60: Object.freeze(orderedG60), address: Object.freeze(address)
  });
})));

export const DART_PAIRS = Object.freeze(cycles.map((states, i) => Object.freeze({
  orbitId: i + 1, seed: states[0].id, complement: states[10].id,
  trajectory: Object.freeze(states.map(p => p.id)),
  complementaryTrajectory: Object.freeze(states.map((_, t) => states[(t + 10) % 20].id))
})));

// Steps count F updates, independently of playback seconds. Circular lookup also
// allows a researcher to inspect the predecessor with a negative step.
export function dartPairAt(pairIndex, step) {
  if (!Number.isInteger(pairIndex) || pairIndex < 0 || pairIndex >= cycles.length) {
    throw new RangeError('Dart pair index must be 0, 1 or 2');
  }
  if (!Number.isSafeInteger(step)) throw new RangeError('Dart step must be an exact integer');
  const phase = ((step % 20) + 20) % 20;
  const states = cycles[pairIndex];
  return {pairIndex, orbitId: DART_PAIRS[pairIndex].orbitId, step, phase,
    a: states[phase], b: states[(phase + 10) % 20]};
}
