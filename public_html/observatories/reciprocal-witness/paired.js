// Exact two-update replay on the recovered positive quaternionic product cover.
import cover from './data/paired-cover.js';

const D = cover.source.denominator;
const SCALE = 2 * D * D;
const calibration = cover.calibration;
const r = calibration.reference_endpoint;
const zr = calibration.other_sheet;
const allPorts = calibration.receiver_ports.map(j => ({
  j, zj: cover.deck[j], projected: cover.projection[j]
}));

// Every state numerator, Laplacian and sum in this two-step preparation is a safe
// integer. The common denominator reserves a factor of two for the position mean.
function rational(n) {
  if (!Number.isSafeInteger(n)) throw new RangeError('Inexact paired-port numerator');
  if (n === 0) return '0';
  let a = Math.abs(n);
  let b = SCALE;
  while (b) [a, b] = [b, a % b];
  return SCALE === a ? String(n / a) : (n / a) + '/' + (SCALE / a);
}

function step({x, u}) {
  const nextX = new Float64Array(x.length);
  const nextU = new Float64Array(x.length);
  for (let site = 0; site < x.length; site++) {
    let laplacian = 8 * x[site];
    for (const neighbor of cover.adj[site]) laplacian -= x[neighbor];
    const velocity = u[site] - laplacian / D;
    if (!Number.isSafeInteger(velocity)) throw new RangeError('Unexpected state denominator');
    nextU[site] = velocity;
    nextX[site] = x[site] + velocity;
  }
  return {x: nextX, u: nextU};
}

function sourceComponent(vector) {
  return {
    plus: rational(vector[r]), minus: rational(vector[zr]),
    contrast: rational(vector[r] - vector[zr]), sum: rational(vector[r] + vector[zr])
  };
}

function receiverComponent(vector, selectedPorts) {
  let plus = 0, minus = 0;
  for (const site of selectedPorts) {
    plus += vector[site.j];
    minus += vector[site.zj];
  }
  return {plus: rational(plus), minus: rational(minus), contrast: rational(plus - minus),
    sum: rational(plus + minus)};
}

function frame(state, tick, selectedPorts) {
  return {
    tick,
    source: {x: sourceComponent(state.x), u: sourceComponent(state.u)},
    receiver: {x: receiverComponent(state.x, selectedPorts), u: receiverComponent(state.u, selectedPorts)},
    portReadings: allPorts.map(({j, zj, projected}) => ({
      j, zj, projected, clampedInIntervention: selectedPorts.some(pair => pair.j === j),
      x: [rational(state.x[j]), rational(state.x[zj])],
      u: [rational(state.u[j]), rational(state.u[zj])]
    }))
  };
}

const FLUX_DENOMINATOR = 2n * BigInt(SCALE) * BigInt(SCALE);
function fluxRational(n) {
  if (n === 0n) return '0';
  let a = n < 0n ? -n : n;
  let b = FLUX_DENOMINATOR;
  while (b) [a, b] = [b, a % b];
  const denominator = FLUX_DENOMINATOR / a;
  return denominator === 1n ? String(n / a) : (n / a) + '/' + denominator;
}

// Symmetric edge-energy split of Q, in units of 1 / (2*SCALE²).
function regionalEnergy({x, u}, region) {
  let total = 0n;
  for (const i of region) {
    total += 2n * BigInt(D) * BigInt(u[i]) ** 2n;
    for (const j of cover.adj[i]) {
      total += BigInt(x[i] - x[j]) * BigInt((x[i] - u[i]) - (x[j] - u[j]));
    }
  }
  return total;
}

// Positive points into B. This integrates exactly one discrete pair update;
// the externally applied mean replacement occurs before this interval opens.
function cutInterval(before, after, region) {
  let into = 0n, out = 0n;
  const edges = [];
  for (const j of region) for (const i of cover.adj[j]) {
    if (region.has(i)) continue;
    const twiceVelocity = before.u[i] + after.u[i] + before.u[j] + after.u[j];
    const current = BigInt(before.x[i] - before.x[j]) * BigInt(twiceVelocity);
    if (current > 0n) into += current;
    else out -= current;
    edges.push({from: i, to: j, transfer: fluxRational(current)});
  }
  const startEnergy = regionalEnergy(before, region);
  const endEnergy = regionalEnergy(after, region);
  if (endEnergy - startEnergy !== into - out) throw new Error('Regional energy balance failed');
  return {net: into - out, record: {
    intoB: fluxRational(into), outOfB: fluxRational(out), netIntoB: fluxRational(into - out),
    before: fluxRational(startEnergy), after: fluxRational(endEnergy), edges
  }};
}

export function paired({route = 'preserve', pairs = 1, readout = 'signed'} = {}) {
  if (!['preserve', 'swap'].includes(route) || ![1, 8].includes(pairs) ||
      !['signed', 'sum'].includes(readout)) throw new RangeError('Invalid paired-port controls');
  const selectedPorts = allPorts.slice(0, pairs);
  const x = new Float64Array(cover.adj.length);
  const launch = cover.routes[route].lift.at(-1);
  x[launch] = SCALE;
  const prepared = {x, u: new Float64Array(x.length)};
  const received = step(prepared);
  const cleared = {x: received.x.slice(), u: received.u};
  for (const {j, zj} of selectedPorts) {
    const even = (received.x[j] + received.x[zj]) / 2;
    cleared.x[j] = even;
    cleared.x[zj] = even;
  }
  const freeReturn = step(received);
  const clearedReturn = step(cleared);
  const free = [prepared, received, freeReturn].map((s, t) => frame(s, t, selectedPorts));
  const altered = [prepared, cleared, clearedReturn].map((s, t) => frame(s, t, selectedPorts));
  const signedDelta = rational((freeReturn.u[r] - freeReturn.u[zr]) - (clearedReturn.u[r] - clearedReturn.u[zr]));
  const sumDelta = rational((freeReturn.u[r] + freeReturn.u[zr]) - (clearedReturn.u[r] + clearedReturn.u[zr]));
  const sourceFree = free[2].source.u;
  const sourceCleared = altered[2].source.u;
  const fieldReadout = readout === 'signed' ? 'contrast' : 'sum';
  const region = new Set(selectedPorts.flatMap(({j, zj}) => [j, zj]));
  const freeFlux = cutInterval(received, freeReturn, region);
  const clearedFlux = cutInterval(cleared, clearedReturn, region);
  return {
    route, pairs, readout, denominator: D,
    sourceVersion: 'TOM-PHY-029/' + cover.source.receiptSHA256,
    protocol: cover.source,
    sites: {r, zr, j: allPorts[0].j, zj: allPorts[0].zj, ports: allPorts,
      launch, baseEndpoint: calibration.base_endpoint, coverCount: cover.adj.length},
    routeTrace: cover.routes[route],
    first: {...free[1].receiver.u, selected: free[1].receiver.u[fieldReadout], onePair: free[1].portReadings[0].u},
    retained: {...free[1].receiver.x, clearedPlus: altered[1].receiver.x.plus,
      clearedMinus: altered[1].receiver.x.minus, clearedContrast: altered[1].receiver.x.contrast},
    return: {free: sourceFree[fieldReadout], cleared: sourceCleared[fieldReadout],
      delta: readout === 'signed' ? signedDelta : sumDelta,
      signedFree: sourceFree.contrast, signedCleared: sourceCleared.contrast, signedDelta,
      sumFree: sourceFree.sum, sumCleared: sourceCleared.sum, sumDelta},
    frames: {free, cleared: altered},
    flux: {region: [...region], interval: [1, 2], orientation: 'outside into B', units: 'Q per update',
      partition: 'symmetric half-edge energy', free: freeFlux.record, cleared: clearedFlux.record,
      delta: fluxRational(freeFlux.net - clearedFlux.net), reversed: freeFlux.net * clearedFlux.net < 0n}

  };
}

// Separate TOM-PHY-027 experiment. The observer here is explicitly wired to a fork controller.
// The 4-port scattering calculation chooses the registered exit, with no route label as input.
export function fork({test = 1, reference = 1, checkpoint = 420} = {}) {
  if (![1, -1].includes(test) || ![1, -1].includes(reference) || ![420, 540].includes(checkpoint)) {
    throw new RangeError('Invalid fork controls');
  }
  function scatter(ports) {
    const halfSum = ports.reduce((sum, x) => sum + x, 0) / 2;
    return ports.map(x => halfSum - x);
  }
  let ports = scatter([0, 0, 1, 1]);
  const arrivals = [{hop: 0, detector: ports.slice(2)}];
  for (const hop of [3, 6]) {
    ports = scatter([test * ports[0], reference * ports[1], 0, 0]);
    arrivals.push({hop, detector: ports.slice(2)});
  }
  const hit = arrivals.find(row => row.detector.some(x => x !== 0));
  const bit = Number(hit.hop === 6);
  // Positive test/positive reference supplies the native preserve target for each fixed history.
  const baseline = cover.forkRows.find(c => c.checkpoint === checkpoint &&
    c.test_triangle_return === 1 && c.reference_triangle_return === 1);
  const exits = [505, 535];
  const memory = exits.indexOf(baseline.first_edge[1]);
  const exit = exits[memory ^ bit];
  return {
    test, reference, checkpoint, fork: 480, triangle: [5, 11, 20, 5], arrivals,
    echoHop: hit.hop, echoAmplitude: hit.detector[0], bit, memory, firstEdge: [480, exit],
    exit, relation: bit ? 'swap' : 'preserve', releaseHop: 6, firstEdgeHop: 15, endpoint: 495,
    sourceVersion: 'TOM-PHY-027/' + cover.source.forkReceiptSHA256
  };
}
