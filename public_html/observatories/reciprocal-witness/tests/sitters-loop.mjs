import assert from 'node:assert/strict';
import {pairBeats, ENCOUNTERS, twoSitters} from '../loop-transport.js';
import {DART_PAIRS, dartPairAt} from '../dart-orbits.js';

function near(actual,expected,tolerance=1e-8){
  assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} differs from ${expected}`);
}
const gate=pairBeats([{t:0,side:'A'},{t:.11,side:'A'},{t:.35,side:'B'},
  {t:.8,side:'B'},{t:.97,side:'A'},{t:1.8,side:'AB'}]);
assert.deepEqual(gate.map(x=>[x.a,x.b,x.t]),[[0,.35,.35],[.97,.8,.97],[1.8,1.8,1.8]]);
near(gate[0].wait,.35);assert.equal(gate[2].wait,0);
const run=twoSitters(),closed=twoSitters(ENCOUNTERS.closed),far=twoSitters(ENCOUNTERS.outside);
const launched=run.receipt(0);
assert.equal(launched.nativeStep,0);assert.deepEqual(launched.display.interval,[0,0]);
near(launched.clock.model.gapDeg,42);
const first=run.at(0).next,firstTime=Math.min(first.a,first.b);
const waiting=run.at((firstTime+first.t)/2);
assert.equal(waiting.n,0);assert.equal(waiting.waiting,first.a<first.b?'A':'B');
near(run.at(first.t).drawn,0);assert.equal(run.at(first.t).n,1);
for(const n of [1,10,20,21,40,105,400]){
  const t=run.timeForStep(n),s=run.at(t),r=run.receipt(t);
  assert.equal(s.n,n);near(s.drawn,n);
  assert.equal(s.phase,(n-1)%20+1);assert.equal(r.completedCycles,Math.floor(n/20));
  assert.deepEqual(r.display.interval,[Math.max(0,n-20),n]);
  assert.equal(r.lastPairedBeats.length,Math.min(n,20));
  for(const event of r.lastPairedBeats){
    let end=Math.max(event.a,event.b);near(event.t,end);near(event.wait,Math.abs(event.a-event.b));
    assert.ok(run.at(end-1e-6).n<event.step);assert.equal(run.at(end+1e-6).n,event.step);
  }
  DART_PAIRS.forEach((pair,i)=>{
    const out=r.addresses[i];assert.deepEqual(out,dartPairAt(i,n));
    if(n%20===10){assert.equal(out.a.id,pair.complement);assert.equal(out.b.id,pair.seed);}
    if(n%20===0){assert.equal(out.a.id,pair.seed);assert.equal(out.b.id,pair.complement);}
  });
}
const fullTime=run.timeForStep(20),full=run.receipt(fullTime),baseline=closed.receipt(fullTime);
assert.equal(full.clock.model.locked,true);near(full.clock.model.bpmA,70.5,1e-5);near(full.clock.model.bpmB,70.5,1e-5);
near(full.clock.model.gapDeg,Math.asin(.3)*180/Math.PI,2e-6);near(full.lastPairedBeats.at(-1).wait,.0412709324,1e-7);
assert.equal(baseline.clock.model.locked,false);near(baseline.clock.model.bpmA,69);near(baseline.clock.model.bpmB,72);
assert.deepEqual(full.clock.closedBaseline,baseline.clock.model);
assert.deepEqual(full.closedLastPairedBeat,baseline.lastPairedBeats.at(-1));
const farState=far.at(90).clocks;near(farState.absGapDeg,140);assert.equal(farState.status,'outside capture');
for(const [side,other] of [['openA','openB'],['openB','openA']]){
  const test=twoSitters({...ENCOUNTERS.inside,[side]:false,[other]:true});
  assert.deepEqual(test.receipt(35).lastPairedBeats,closed.receipt(35).lastPairedBeats);
}
const short=run.receipt(fullTime,4,'2');assert.deepEqual(short.display.interval,[16,20]);assert.equal(short.display.shownPair,'2');
assert.deepEqual(short.addresses,full.addresses);assert.deepEqual(short.clock,full.clock);
assert.deepEqual(run.receipt(fullTime,0).display.interval,[20,20]);
const later=run.receipt(run.timeForStep(21));assert.deepEqual(later.display.interval,[1,21]);
const equal=twoSitters({...ENCOUNTERS.inside,rateB:69,gap:0}),sync=equal.receipt(equal.timeForStep(20));
assert.equal(sync.lastPairedBeats.every(g=>g.wait===0),true);
const fresh=twoSitters();assert.deepEqual(fresh.receipt(fullTime),full);
console.log(JSON.stringify({nativeStepsChecked:400,initialGapDeg:42,displayReturnTime:fullTime,
  meanBpm:full.clock.model.bpmA,lockedGapDeg:full.clock.model.gapDeg,
  pairedWaitMs:1000*full.lastPairedBeats.at(-1).wait,closedGapDeg:baseline.clock.model.gapDeg,
  closedRates:[baseline.clock.model.bpmA,baseline.clock.model.bpmB],farGapDeg:farState.gapDeg},null,2));
