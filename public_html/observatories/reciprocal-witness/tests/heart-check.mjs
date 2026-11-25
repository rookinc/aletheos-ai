import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {heart, HEART_VERSION} from '../heart.js';

const near = (a, b, tolerance = 3e-13) => assert.ok(Math.abs(a - b) <= tolerance, `${a} vs ${b}`);
const independent = heart();
const cue = heart({cue: true});
const coupled = heart({cue: true, coupling: true});
const varied = heart({seed: 17, rateA: 52, rateB: 96, phaseA: 0.76, phaseB: 0.29, variation: 0.05, beat: 2, coupling: true});

// A second solver in symmetric and antisymmetric coordinates. The mechanisms
// decouple into damped modes with spring eigenvalues w² and w² + 2k.
function modalFields(record, driveA, driveB) {
  const {spring, damping, coupling, driveAcceleration} = record.parameters;
  const {dt} = record;
  let s = 0, d = 0, vs = 0, vd = 0;
  const xA = [0], xB = [0];
  for (let i = 0; i < driveA.length - 1; i++) {
    vs += dt * (driveAcceleration * (driveA[i] + driveB[i]) - spring * s - damping * vs);
    vd += dt * (driveAcceleration * (driveA[i] - driveB[i]) - (spring + 2 * coupling) * d - damping * vd);
    s += dt * vs;
    d += dt * vd;
    xA.push((s + d) / 2);
    xB.push((s - d) / 2);
  }
  return {xA,xB};
}

// The score measures distance in time, in a fixed window selected before the test.
near(independent.timing.meanNearestBeatGapSeconds, 0.242);
near(cue.timing.meanNearestBeatGapSeconds, 0.04777777777777778);
assert.ok(cue.timing.meanNearestBeatGapSeconds < independent.timing.meanNearestBeatGapSeconds);
for (const record of [independent,cue]) {
  assert.equal(record.arrival, null);
  assert.equal(record.checkpoint.retainedB, 0);
  assert.equal(record.return.deltaVelocityA, 0);
  assert.deepEqual(record.fieldA, record.clearedFieldA);
  assert.deepEqual(record.fieldB, record.clearedFieldB);
}

// Cue and drive schedules are fixed through the comparison and intervention.
assert.deepEqual(cue.heartA, coupled.heartA);
assert.deepEqual(cue.heartB, coupled.heartB);
assert.deepEqual(cue.beatsA, coupled.beatsA);
assert.deepEqual(cue.beatsB, coupled.beatsB);
assert.equal(cue.driveId, coupled.driveId);
assert.equal(coupled.driveId, 'beats-32b48587');
assert.deepEqual(coupled, heart({cue: true, coupling: true}));

for (const r of [independent,cue,coupled,varied]) {
  assert.equal(r.time.length, 1601);
  for (const line of [r.heartA,r.heartB,r.fieldA,r.fieldB,r.clearedFieldA,r.clearedFieldB]) {
    assert.equal(line.length, r.time.length);
    assert.ok(line.every(Number.isFinite));
  }
  const modal = modalFields(r, r.heartA, r.heartB);
  const noTag = r.heartA.slice();
  for (let i = 1; i < 12; i++) noTag[r.mark.index + i] -= Math.sin(Math.PI * i / 12) ** 2;
  const omitted = modalFields(r, noTag, r.heartB);
  for (let n = 0; n < r.time.length; n++) {
    near(r.fieldA[n], modal.xA[n]);
    near(r.fieldB[n], modal.xB[n]);
    near(r.fieldA[n] - omitted.xA[n], r.taggedFieldA[n]);
    near(r.fieldB[n] - omitted.xB[n], r.taggedFieldB[n]);
  }
  // At c only tagged x_B has been cleared; both velocities and x_A agree.
  const {index,free,cleared,retainedB} = r.checkpoint;
  assert.equal(free.xA,cleared.xA);
  assert.equal(free.vA,cleared.vA);
  assert.equal(free.vB,cleared.vB);
  near(cleared.xB, omitted.xB[index]);
  near(free.xB-cleared.xB,retainedB);
  assert.deepEqual(r.fieldA.slice(0,index+1), r.clearedFieldA.slice(0,index+1));
  assert.deepEqual(r.fieldB.slice(0,index), r.clearedFieldB.slice(0,index));
  near(r.return.deltaVelocityA, r.dt*r.parameters.coupling*retainedB);
  near(r.fieldA[r.return.index]-r.clearedFieldA[r.return.index], r.dt*r.return.deltaVelocityA);
  const maximumStiffness = r.parameters.spring + 2*r.parameters.coupling;
  assert.ok(maximumStiffness*r.dt*r.dt + 2*r.parameters.damping*r.dt < 4);
}

near(coupled.checkpoint.retainedB, 0.03455332774357533);
near(coupled.return.deltaVelocityA, 0.0031097994969218057);
near(coupled.later.deltaFieldA, 0.0032039690858607917);
assert.ok(coupled.arrival.index === coupled.mark.index + 3);

// Different marked beats have different checkpoint times while sharing drives.
const nextBeat = heart({cue:true,coupling:true,beat:5});
assert.equal(nextBeat.driveId, coupled.driveId);
assert.deepEqual(nextBeat.fieldA,coupled.fieldA);
assert.notEqual(nextBeat.checkpoint.index, coupled.checkpoint.index);
assert.notDeepEqual(nextBeat.clearedFieldA,coupled.clearedFieldA);

// Each user's clock remains operable at all supported control extremes.
for (const rateA of [40,120]) for (const rateB of [40,120]) for (const useCue of [false,true]) {
  const r=heart({rateA,rateB,phaseA:0,phaseB:1,variation:0.05,seed:0,beat:999,cue:useCue,coupling:true});
  assert.equal(r.config.beat,r.availableBeats);
  assert.ok(r.later.index < r.time.length);
  assert.ok(Number.isFinite(r.timing.meanNearestBeatGapSeconds));
}

const source = await readFile(new URL('../heart.js', import.meta.url));
console.log(JSON.stringify({
  pass:true, sourceVersion:HEART_VERSION, sha256:createHash('sha256').update(source).digest('hex'),
  sampleCount:coupled.time.length, dt:coupled.dt, rows:[independent,cue,coupled].map(r=>({
    cue:r.config.cue,coupling:r.config.coupling,driveId:r.driveId,
    meanNearestBeatGapSeconds:r.timing.meanNearestBeatGapSeconds,
    beat:r.mark.ordinal, markSeconds:r.mark.time, checkpointSeconds:r.checkpoint.time,
    retainedTaggedB:r.checkpoint.retainedB,freeVelocityA:r.return.freeVelocityA,
    clearedVelocityA:r.return.clearedVelocityA,deltaVelocityA:r.return.deltaVelocityA,
    laterDeltaFieldA:r.later.deltaFieldA
  }))
},null,2));
