// The continuous native face register and the exterior graph have separate stiffnesses.
import {faceFixture, exteriorFixture} from './data/flux-fixtures.js';

const omega = Math.sqrt(10);
export const facePeriod = 2 * Math.PI / omega;
export const fluxVersion = 'Current and Remote Readout · 2026-11-23 / RW-1';
const dot = (a, b) => a.reduce((sum, value, index) => sum + value * b[index], 0);
const zeroTraffic = () => ({outward: 0, inward: 0, net: 0});

export function evolveFace(position, velocity, time) {
  const c = Math.cos(omega * time);
  const s = Math.sin(omega * time);
  return {
    position: position.map((f, i) => f * c + velocity[i] * s / omega),
    velocity: velocity.map((v, i) => v * c - omega * position[i] * s)
  };
}

export function faceEnergy(position, velocity) {
  const energy = velocity.map(v => v * v / 2);
  for (const [i, j] of faceFixture.edges) {
    const share = (position[i] - position[j]) ** 2 / 2;
    energy[i] += share;
    energy[j] += share;
  }
  return energy;
}

// On this weight-two graph j(t) = mean + cosPart cos(2ωt) + sinPart sin(2ωt).
function currentCoefficients(position, velocity, i, j) {
  const mean = position[i] * velocity[j] - velocity[i] * position[j];
  const atZero = (position[i] - position[j]) * (velocity[i] + velocity[j]);
  const sinPart = ((velocity[i] - velocity[j]) * (velocity[i] + velocity[j]) / omega
                 - omega * (position[i] - position[j]) * (position[i] + position[j])) / 2;
  return {mean, cosPart: atZero - mean, sinPart};
}

function trafficOnEdge({mean, cosPart, sinPart}, duration) {
  const frequency = 2 * omega;
  const end = frequency * duration;
  const amplitude = Math.hypot(cosPart, sinPart);
  const points = [0, end];
  // Split at every zero before integrating each piece of the signed current.
  if (amplitude > 0 && Math.abs(mean) < amplitude) {
    const angle = Math.atan2(sinPart, cosPart);
    const root = Math.acos(-mean / amplitude);
    const turn = 2 * Math.PI;
    for (const initial of [angle - root, angle + root]) {
      let x = initial + turn * Math.ceil(-initial / turn);
      for (; x < end; x += turn) if (x > 0) points.push(x);
    }
  }
  points.sort((a, b) => a - b);
  const primitive = x => (mean * x + cosPart * Math.sin(x) - sinPart * Math.cos(x)) / frequency;
  const result = zeroTraffic();
  for (let k = 1; k < points.length; k++) {
    const integral = primitive(points[k]) - primitive(points[k - 1]);
    result.outward += Math.max(0, integral);
    result.inward += Math.max(0, -integral);
  }
  result.net = result.outward - result.inward;
  return result;
}

function readCut({position, velocity}, cut, duration, average) {
  const inside = new Set(faceFixture.cuts[cut]);
  const edges = [];
  const traffic = zeroTraffic();
  let outward = 0;
  let inward = 0;
  for (const pair of faceFixture.edges) {
    if (inside.has(pair[0]) === inside.has(pair[1])) continue;
    const [from, to] = inside.has(pair[0]) ? pair : [pair[1], pair[0]];
    const coeff = currentCoefficients(position, velocity, from, to);
    const current = average ? coeff.mean : coeff.mean + coeff.cosPart;
    const flow = trafficOnEdge(coeff, duration);
    traffic.outward += flow.outward;
    traffic.inward += flow.inward;
    outward += Math.max(0, current);
    inward += Math.max(0, -current);
    edges.push({from, to, current, cycleMean: coeff.mean, transfer: flow.net});
  }
  traffic.net = traffic.outward - traffic.inward;
  return {edges, net: outward - inward, outward, inward, traffic};
}

export function flux({cut = 'face7', control = 'original', phase = 0, mode = 'instant'} = {}) {
  if (!(cut in faceFixture.cuts) || !['original', 'both', 'velocity'].includes(control)
    || !['instant', 'cycle'].includes(mode) || !Number.isFinite(phase)) throw new RangeError('Unknown face-wave control');
  const time = phase * facePeriod;
  const state = evolveFace(faceFixture.position, faceFixture.velocity, time);
  if (control === 'both') state.position = state.position.map(x => -x);
  if (control !== 'original') state.velocity = state.velocity.map(x => -x);
  const duration = facePeriod * (mode === 'cycle' ? 1 : 1/8);
  const readout = readCut(state, cut, duration, mode === 'cycle');
  const coeff = currentCoefficients(state.position, state.velocity, 7, 15);
  return {...readout, cutFaces: [...faceFixture.cuts[cut]], control, phase, mode, time, period: facePeriod,
    interval: [time, time + duration], position: state.position, velocity: state.velocity, sourceVersion: fluxVersion,
    witness: {from: 7, to: 15, current: mode === 'cycle' ? coeff.mean : coeff.mean + coeff.cosPart, cycleMean: coeff.mean}};
}

export function fixedCut({cut = 'face7'} = {}) {
  if (!(cut in faceFixture.cuts)) throw new RangeError('Unknown face cut');
  const start = facePeriod / 4;
  const length = facePeriod / 8;
  const held = evolveFace(faceFixture.position, faceFixture.velocity, start);
  const unit = faceFixture.signedAxis.map(k => k / Math.sqrt(24));
  const signed = dot(unit, held.position);
  const cleared = {position: held.position.map((x, i) => x - unit[i] * signed), velocity: [...held.velocity]};
  const freeTraffic = readCut(held, cut, length, false).traffic;
  const clearedTraffic = readCut(cleared, cut, length, false).traffic;
  const free = freeTraffic.net;
  const clearedNet = clearedTraffic.net;
  const tolerance = 1e-12;
  const reversal = Math.abs(free) > tolerance && Math.abs(clearedNet) > tolerance && free * clearedNet < 0;
  const outcome = reversal ? 'Transfer reverses' : Math.abs(free - clearedNet) <= tolerance ?
    'No resolved change' : 'Magnitude changes; direction holds';
  return {cut, cutFaces: [...faceFixture.cuts[cut]], free, cleared: clearedNet, difference: free - clearedNet,
    reversal, outcome, freeTraffic, clearedTraffic, retainedBefore: signed, retainedAfter: dot(unit, cleared.position),
    interval: [start, start + length], period: facePeriod, tolerance, sourceVersion: fluxVersion};
}

// Exact equitable partition of the recovered 1,800-site frame, with each port a singleton.
// Class position/velocity is per native site. All spatial sums use multiplicities.
const g = exteriorFixture;
const shellRadii = {near: 1, middle: 2, far: 4};
const shellEdges = {};
for (const [name, radius] of Object.entries(shellRadii)) {
  const crosses = [];
  for (const [i, neighbors] of g.neighbors.entries()) {
    if (g.distance[i] !== radius) continue;
    for (const [j, count] of neighbors) {
      if (g.distance[j] === radius + 1) crosses.push([i, j, count * g.multiplicity[i]]);
    }
  }
  shellEdges[name] = crosses;
}
const n = g.distance.length;
const offsets = new Uint16Array(n + 1);
const neighborIDs = [];
const neighborCounts = [];
for (let i = 0; i < n; i++) {
  offsets[i] = neighborIDs.length;
  for (const [j, k] of g.neighbors[i]) {
    neighborIDs.push(j);
    neighborCounts.push(k);
  }
}
offsets[n] = neighborIDs.length;

function minusLaplace(src, dest) {
  for (let i = 0; i < n; i++) {
    let sum = -8 * src[i];
    for (let k = offsets[i]; k < offsets[i + 1]; k++) sum += neighborCounts[k] * src[neighborIDs[k]];
    dest[i] = sum;
  }
}

function pointPulse() {
  const q = new Float64Array(n);
  q[g.sourceClass] = 1;
  return {q, v: new Float64Array(n)};
}

function stepper(h) {
  const coeff = [1];
  for (let i = 1; i <= 11; i++) coeff.push(coeff[i - 1] * h / i);
  const tmp = Array.from({length: 4}, () => new Float64Array(n));
  return ({q, v}) => {
    let [p0, p1, nextP, nextV] = tmp;
    p0.set(q);
    p1.set(v);
    for (let i = 0; i < n; i++) q[i] += h * v[i];
    // Evaluate the matrix exponential of the free wave to order ten in velocity
    // and eleven in position. ||sqrt(L)|| <= 4, so the omitted terms are tiny.
    for (let k = 1; k <= 5; k++) {
      minusLaplace(p0, nextP);
      minusLaplace(p1, nextV);
      [p0, nextP] = [nextP, p0];
      [p1, nextV] = [nextV, p1];
      for (let i = 0; i < n; i++) {
        q[i] += coeff[2 * k] * p0[i] + coeff[2 * k + 1] * p1[i];
        v[i] += coeff[2 * k - 1] * p0[i] + coeff[2 * k] * p1[i];
      }
    }
  };
}

function shellRate({q, v}, crossings) {
  let outward = 0;
  let inward = 0;
  for (const [i, j, multiplicity] of crossings) {
    const edge = multiplicity * (q[i] - q[j]) * (v[i] + v[j]) / 2;
    if (edge > 0) outward += edge;
    else inward -= edge;
  }
  return {outward, inward, net: outward - inward};
}

function shellRates(state) {
  return Object.fromEntries(Object.entries(shellEdges).map(([name, crossing]) => [name, shellRate(state, crossing)]));
}

function halfStepTraffic(accum, a, b, h) {
  for (const cut of Object.keys(shellEdges)) {
    const t = accum[cut];
    t.outward += h * (a[cut].outward + b[cut].outward) / 2;
    t.inward += h * (a[cut].inward + b[cut].inward) / 2;
    t.net = t.outward - t.inward;
  }
}

// Equal allocation of each spring between its endpoint sites. The checkpoint
// lies strictly outside every selectable cut. Its work leaves these regional energies
// continuous, so loss from the initial region equals its net outward transfer.
function energyTransfers(state, integral) {
  const {q, v} = state;
  const byRadius = [0, 0, 0, 0, 0];
  for (let i = 0; i < n; i++) {
    const hop = g.distance[i];
    if (hop > 4) continue;
    let energy = v[i] * v[i] / 2;
    for (let k = offsets[i]; k < offsets[i + 1]; k++) {
      energy += neighborCounts[k] * (q[i] - q[neighborIDs[k]]) ** 2 / 4;
    }
    byRadius[hop] += g.multiplicity[i] * energy;
  }
  for (let r = 1; r < byRadius.length; r++) byRadius[r] += byRadius[r - 1];
  return Object.fromEntries(Object.entries(shellRadii).map(([name, radius]) => {
    const net = 4 - byRadius[radius];
    const t = integral[name];
    const absolute = Math.max(Math.abs(net), t.outward + t.inward);
    return [name, {outward: (absolute + net) / 2, inward: (absolute - net) / 2, net}];
  }));
}

function branchRecords(erased, subdivisions) {
  const h = 1 / subdivisions;
  const advance = stepper(h);
  const state = pointPulse();
  const total = Object.fromEntries(Object.keys(shellEdges).map(name => [name, zeroTraffic()]));
  let rates = shellRates(state);
  let checkpointTraffic;
  let held = 0;
  const frames = [];
  for (let index = 0; index <= 8 * subdivisions; index++) {
    if (index === 4 * subdivisions) {
      held = state.q[g.receiverClass];
      checkpointTraffic = energyTransfers(state, total);
      if (erased) {
        state.q[g.receiverClass] = 0;
        rates = shellRates(state);
      }
    }
    if (index % (2 * subdivisions) === 0) {
      const frame = {};
      const transfers = energyTransfers(state, total);
      for (const name of Object.keys(shellEdges)) {
        const t = transfers[name];
        const p = checkpointTraffic?.[name] ?? t;
        frame[name] = {receiver: state.q[g.receiverClass], source: state.q[g.sourceClass], receiverVelocity: state.v[g.receiverClass],
          net: rates[name].net, outward: rates[name].outward, inward: rates[name].inward, traffic: {...t},
          postTraffic: {outward: t.outward - p.outward, inward: t.inward - p.inward, net: t.net - p.net}};
      }
      frames.push(frame);
    }
    if (index === 8 * subdivisions) break;
    advance(state);
    const futureRates = shellRates(state);
    halfStepTraffic(total, rates, futureRates, h);
    rates = futureRates;
  }
  return {frames, held};
}

let exteriorCache;
export function exteriorRun(subdivisions = 128) {
  if (!Number.isInteger(subdivisions) || subdivisions < 8 || subdivisions > 1024) throw new RangeError('Invalid quadrature refinement');
  return {free: branchRecords(false, subdivisions), cleared: branchRecords(true, subdivisions)};
}

export function sag({cut = 'middle', step = 0} = {}) {
  if (!(cut in shellRadii) || !Number.isInteger(step) || step < 0 || step > 4) throw new RangeError('Unknown exterior checkpoint');
  if (!exteriorCache) exteriorCache = exteriorRun();
  const {free: a, cleared: b} = exteriorCache;
  const free = a.frames[step][cut];
  const cleared = b.frames[step][cut];
  return {time: 2 * step, step, source: g.source, receiver: g.receiver, cutRadius: shellRadii[cut],
    edgeCount: shellEdges[cut].reduce((s, e) => s + e[2], 0), portDistance: g.portDistance,
    free, cleared, deltaReceiver: free.receiver - cleared.receiver, deltaSource: free.source - cleared.source,
    checkpoint: 4, retainedBefore: step >= 2 ? a.held : null, interval: [0, 2 * step], postInterval: step >= 2 ? [4, 2 * step] : null,
    sourceVersion: fluxVersion, model: 'G1800 free graph wave · selected exterior cut'};
}
