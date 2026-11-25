// Two prescribed heartbeat clocks driving a reciprocal pair of synthetic field modes.
// All samples, including the checkpoint and both replays, use the same time grid.
export const HEART_VERSION = 'RWO-heart-1.0.0';
export const HEART_DEFAULTS = Object.freeze({
  seed: 916, rateA: 69, rateB: 74, phaseA: 0.15, phaseB: 0.62,
  variation: 0.015, cue: false, coupling: false, beat: 4
});

const DT = 0.01;
const DURATION = 16;
const SAMPLES = Math.round(DURATION / DT) + 1;
const TWO_PI = 2 * Math.PI;
const PULSE_STEPS = 12;
const CHECKPOINT_OFFSET = 32;
const LATER_OFFSET = 16;
const CUE_PERIOD = 5;
const CUE_LOCK = 0.24;
const SPRING = (TWO_PI * 0.9) ** 2;
const DAMPING = 1.8;
const RECIPROCAL_SPRING = 9;
const DRIVE_ACCELERATION = 36;

function bounded(value, fallback, low, high) {
  if (value == null || value === '' || !Number.isFinite(Number(value))) return fallback;
  return Math.max(low, Math.min(high, Number(value)));
}

function normalized(input) {
  const d = HEART_DEFAULTS;
  return {
    seed: Math.floor(bounded(input.seed, d.seed, 0, 0xffffffff)),
    rateA: bounded(input.rateA, d.rateA, 40, 120),
    rateB: bounded(input.rateB, d.rateB, 40, 120),
    phaseA: bounded(input.phaseA, d.phaseA, 0, 1) % 1,
    phaseB: bounded(input.phaseB, d.phaseB, 0, 1) % 1,
    variation: bounded(input.variation, d.variation, 0, 0.05),
    cue: input.cue === true, coupling: input.coupling === true,
    beat: Math.floor(bounded(input.beat, d.beat, 1, SAMPLES))
  };
}

function stream(seed) {
  let s = seed >>> 0 || 0x6d2b79f5;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
}

function timeAt(index) { return index / 100; }

// The cue's six timing subdivisions per breath are a declared construction.
// A small within-breath modulation gives the external timing track a shape.
function cuePhase(time) {
  return 6 * time / CUE_PERIOD + 0.045 * 6 * (1 - Math.cos(TWO_PI * time / CUE_PERIOD)) / TWO_PI;
}

function addPulse(samples, index) {
  for (let step = 1; step < PULSE_STEPS && index + step < samples.length; step++) {
    samples[index + step] += Math.sin(Math.PI * step / PULSE_STEPS) ** 2;
  }
}

function clock(rate, phase, variation, cue, seed) {
  const random = stream(seed);
  const rateInCycles = () => rate / (60 * (1 + variation * (2 * random() - 1)));
  let base = rateInCycles();
  const pulse = Array(SAMPLES).fill(0);
  const beats = [];
  for (let n = 0; n < SAMPLES - 1; n++) {
    const pull = cue ? CUE_LOCK * Math.sin(TWO_PI * (cuePhase(timeAt(n)) - phase)) : 0;
    phase += DT * (base + pull);
    if (phase < 1) continue;
    phase -= 1;
    const index = n + 1;
    beats.push({ordinal: beats.length + 1, index, time: timeAt(index)});
    addPulse(pulse, index);
    base = rateInCycles();
  }
  return {pulse, beats};
}

// Simultaneous velocity kick from the old positions, then a position drift.
// At a checkpoint, the erasure acts after drift and before the following kick.
function propagate(driveA, driveB, k, erasure) {
  const xA = Array(SAMPLES).fill(0), xB = Array(SAMPLES).fill(0);
  const vA = Array(SAMPLES).fill(0), vB = Array(SAMPLES).fill(0);
  for (let n = 0; n < SAMPLES - 1; n++) {
    const exchange = k * (xB[n] - xA[n]);
    vA[n + 1] = vA[n] + DT * (DRIVE_ACCELERATION * driveA[n] - SPRING * xA[n] - DAMPING * vA[n] + exchange);
    vB[n + 1] = vB[n] + DT * (DRIVE_ACCELERATION * driveB[n] - SPRING * xB[n] - DAMPING * vB[n] - exchange);
    xA[n + 1] = xA[n] + DT * vA[n + 1];
    xB[n + 1] = xB[n] + DT * vB[n + 1];
    if (erasure && n + 1 === erasure.index) xB[n + 1] -= erasure.displacement;
  }
  return {xA, xB, vA, vB};
}

function stateAt(series, index) {
  return {xA: series.xA[index], vA: series.vA[index], xB: series.xB[index], vB: series.vB[index]};
}

function timingGap(a, b) {
  // A complete second on either side of the scored interval avoids edge truncation.
  const score = a.filter(beat => beat.time >= 6 && beat.time <= 14);
  const absGaps = score.map(beat => Math.min(...b.map(other => Math.abs(beat.index - other.index))) * DT);
  return {
    meanNearestBeatGapSeconds: absGaps.reduce((sum, gap) => sum + gap, 0) / absGaps.length,
    count: absGaps.length, intervalSeconds: [6, 14], definition: 'Mean distance from each scored A beat to its nearest B beat'
  };
}

// The complete beat-index lists in each receipt reconstruct the two pulse arrays.
function scheduleId(a, b) {
  const schedule = 'sin2-12|' + a.map(i => i.index).join(',') + '|' + b.map(i => i.index).join(',');
  let hash = 2166136261;
  for (const c of schedule) hash = Math.imul(hash ^ c.charCodeAt(0), 16777619) >>> 0;
  return 'beats-' + hash.toString(16).padStart(8, '0');
}

export function heart(input = {}) {
  const config = normalized(input);
  const a = clock(config.rateA, config.phaseA, config.variation, config.cue, config.seed ^ 0x243f6a88);
  const b = clock(config.rateB, config.phaseB, config.variation, config.cue, config.seed ^ 0x85a308d3);
  const selectable = a.beats.filter(beat => beat.index + CHECKPOINT_OFFSET + LATER_OFFSET < SAMPLES);
  config.beat = Math.min(config.beat, selectable.length);
  const mark = selectable[config.beat - 1];
  const k = config.coupling ? RECIPROCAL_SPRING : 0;
  const tag = Array(SAMPLES).fill(0);
  addPulse(tag, mark.index);
  const tagged = propagate(tag, Array(SAMPLES).fill(0), k);
  const free = propagate(a.pulse, b.pulse, k);
  const c = mark.index + CHECKPOINT_OFFSET, one = c + 1, later = c + LATER_OFFSET;
  const retainedB = tagged.xB[c];
  const clear = propagate(a.pulse, b.pulse, k, {index: c, displacement: retainedB});
  const driveId = scheduleId(a.beats, b.beats);
  const firstContact = tagged.xB.findIndex(value => value !== 0);
  const arrival = firstContact >= 0 ? {index:firstContact,time:timeAt(firstContact),displacementB:tagged.xB[firstContact]} : null;
  const checkpoint = {
    index: c, time: timeAt(c), retainedB, freeB: free.xB[c], clearedB: clear.xB[c],
    free: stateAt(free,c), cleared: stateAt(clear,c)
  };
  const response = {
    index: one, time: timeAt(one), freeVelocityA: free.vA[one], clearedVelocityA: clear.vA[one],
    deltaVelocityA: free.vA[one] - clear.vA[one], expectedDeltaVelocityA: DT * k * retainedB
  };
  const delayed = {
    index: later, time: timeAt(later), freeFieldA: free.xA[later], clearedFieldA: clear.xA[later],
    deltaFieldA: free.xA[later] - clear.xA[later]
  };
  const timing = timingGap(a.beats, b.beats);
  const commonReceipt = {
    sourceVersion: HEART_VERSION, seed: config.seed, config: {...config}, driveId, clockSeconds: DT,
    pulseWidthSeconds: PULSE_STEPS * DT, beatIndicesA: a.beats.map(beat => beat.index),
    beatIndicesB: b.beats.map(beat => beat.index), mark, arrival, timing,
    cut: 'Single symmetric spring between signed field modes A and B',
    orientation: 'Positive displacement uses each calibrated signed field coordinate',
    kPerSecondSquared: k, checkpointIndex: c, returnIndex: one, laterIndex: later
  };
  function receipt(branch, series) {
    return {
      ...commonReceipt, intervention: branch, retainedTaggedB: branch === 'free' ? retainedB : 0,
      checkpoint: stateAt(series,c), returnVelocityA: series.vA[one], laterFieldA: series.xA[later]
    };
  }
  return {
    sourceVersion: HEART_VERSION, config, dt: DT, duration: DURATION, driveId,
    time: Array.from({length: SAMPLES}, (_, n) => timeAt(n)),
    heartA: a.pulse, heartB: b.pulse, fieldA: free.xA, fieldB: free.xB,
    clearedFieldA: clear.xA, clearedFieldB: clear.xB, taggedFieldA: tagged.xA, taggedFieldB: tagged.xB,
    beatsA: a.beats, beatsB: b.beats, availableBeats: selectable.length,
    mark, arrival, checkpoint, return: response, later: delayed, timing,
    receipts: {free: receipt('free', free), cleared: receipt('clear only B displacement from marked A beat', clear)},
    parameters: {
      spring: SPRING, damping: DAMPING, coupling: k, driveAcceleration: DRIVE_ACCELERATION,
      breathPeriodSeconds: CUE_PERIOD, cueLockCyclesPerSecond: CUE_LOCK
    }
  };
}
