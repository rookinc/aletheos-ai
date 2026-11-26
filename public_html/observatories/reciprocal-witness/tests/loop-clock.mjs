import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {makeClock,LOCK_RULE,LOOP_CLOCK_VERSION} from '../loop-clock.js';

const close=(a,b,tol=1e-9)=>assert.ok(Math.abs(a-b)<=tol,`${a} vs ${b} (±${tol})`);
const wrap=p=>p-Math.floor(p+0.5);
const config={seed:916,rateA:69,rateB:72,phaseA:0.12,phaseB:0.23,feedback:true,openA:true,openB:true,windowDeg:60,strengthBpm:5};
const c=makeClock(config), closed=makeClock({...config,openB:false});

// The comparison shares every initial parameter. Openness and the explicit
// feedback switch each independently remove the coupling when switched off.
for (const settings of [{openA:false},{openB:false},{feedback:false},{strengthBpm:0}]) {
  const off=makeClock({...config,...settings});
  assert.deepEqual(off.beats,off.baselineBeats);
  for (const t of [0,1,4.75,15,47,240]) {
    const state=off.at(t);
    assert.deepEqual(state,off.baselineAt(t));
    close(state.gapDeg, 360*wrap(config.phaseB-config.phaseA+t*(config.rateB-config.rateA)/60));
    assert.equal(state.locked,false);
  }
}
assert.deepEqual(c.baselineBeats,closed.beats);
assert.equal(c.at(0).phaseA,config.phaseA);
assert.equal(c.at(0).phaseB,config.phaseB);
close(c.at(0).gapDeg,39.6);
close(c.at(8).gapDeg,17.46568472859);
close(c.baselineAt(8).gapDeg,-176.4);
close(c.at(240).gapDeg, Math.asin(3/10)*180/Math.PI);
close(c.at(240).bpmA,70.5);
close(c.at(240).bpmB,70.5);
assert.equal(c.at(8).frequencyMatched,true);
assert.equal(c.at(8).locked,false);
const lockedAt=240-c.at(240).lockSeconds+LOCK_RULE.dwellSeconds;
close(lockedAt,9.6838359742195);
assert.equal(c.at(lockedAt-0.01).locked,false);
assert.equal(c.at(lockedAt+0.01).locked,true);
assert.equal(c.at(240).coincident,false);

// Two phases on opposite sides of zero can start close. With equal natural
// rates the tangent-half-angle solution is a simple exponential to zero lag.
const equal=makeClock({...config,rateA:70,rateB:70,phaseA:0.95,phaseB:0.04});
close(equal.at(0).gapDeg,32.4);
for(const t of [0.1,1,3,7,21,240]) {
  const exact=Math.atan(Math.tan(Math.PI*0.09)*Math.exp(-2*Math.PI*10*t/60))/Math.PI;
  close(equal.at(t).gapDeg,360*exact);
}
assert.ok(equal.at(18).locked && equal.at(18).coincident);
const outside=makeClock({...config,rateA:70,rateB:70,phaseA:0.1,phaseB:0.6});
assert.deepEqual(outside.beats,outside.baselineBeats);
for(const time of [0,5,10,80,240]) {
  const p=outside.at(time);
  close(p.absGapDeg,180);
  assert.ok(p.frequencyMatched && !p.coincident && !p.locked && !p.eligible);
}

// Detuning drifts from −144° to capture at −60°, then settles toward +17.46°.
const delayed=makeClock({...config,phaseA:0.1,phaseB:0.7});
const entry=(144-60)/(360*3/60);
assert.equal(delayed.at(entry-1e-6).eligible,false);
assert.equal(delayed.at(entry+1e-6).eligible,true);
close(delayed.at(entry).gapDeg,-60);
assert.equal(delayed.at(22).locked,true);

// Above the restoring capacity the trajectory slips through each finite window.
// Include both directions and all three analytical sine-flow branches.
const slips=[];
for(const d of [-13,-10,-9,9,10,13]) {
  const model=makeClock({...config,rateA:70,rateB:70+d});
  assert.equal(model.equilibriumGapDeg,null);
  assert.ok(model.beats.length>200);
  let visits=0, previous=false;
  for(let i=0;i<=2400;i++) {
    const p=model.at(i/10);
    const activeStep=p.eligible;
    assert.equal(p.locked,false);
    if(activeStep && !previous) visits++;
    previous=activeStep;
  }
  assert.ok(visits>10);
  slips.push(model);
}
const high=slips.at(-1);

// Independent direct numerical solution of the two original phase equations.
// The finite-step error tolerance also covers a step crossing a hard capture edge.
function rk4(config,t,h=0.0002) {
  const end=Math.round(t/h), speed=(a,b)=>{
    const z=wrap(b-a), active=config.openA && config.openB && config.feedback && Math.abs(z)<=config.windowDeg/360;
    const correction=active ? config.strengthBpm*Math.sin(2*Math.PI*z) : 0;
    return [(config.rateA+correction)/60,(config.rateB-correction)/60];
  };
  let a=config.phaseA,b=config.phaseB;
  for(let i=0;i<end;i++) {
    const [a1,b1]=speed(a,b),[a2,b2]=speed(a+h*a1/2,b+h*b1/2);
    const [a3,b3]=speed(a+h*a2/2,b+h*b2/2),[a4,b4]=speed(a+h*a3,b+h*b3);
    a+=h*(a1+2*a2+2*a3+a4)/6;
    b+=h*(b1+2*b2+2*b3+b4)/6;
  }
  return {a,b};
}
for(const model of [c,delayed,equal,high,slips[0],slips[1],slips[2]]) {
  const t=11.37, independent=rk4(model.config,t), actual=model.at(t);
  close(wrap(actual.phaseA-independent.a),0,4e-5);
  close(wrap(actual.phaseB-independent.b),0,4e-5);
  close(actual.bpmA+actual.bpmB,model.config.rateA+model.config.rateB);
}

// Beat events are actual unwrapped integer crossings. All intervals remain
// sorted. For coalesced equal timestamps both phases wrap within the tolerance.
for(const model of [c,equal,outside,delayed,high,...slips]) {
  for(const branch of [['beats','at'],['baselineBeats','baselineAt']]) {
    const [list,sample]=branch;
    let previous=-Infinity;
    const counts={A:0,B:0};
    for(const {t,side} of model[list]) {
      assert.ok(t>previous); previous=t;
      const data=model[sample](t);
      for (const person of side) { counts[person]++; close(wrap(data['phase'+person]),0,3e-9); }
    }
    const end=model[sample](model.duration), initial=model.config;
    // Conservation of mean phase fixes total wraps, including optional t=0 beats.
    const totalUnwrapped=initial.phaseA+initial.phaseB+(initial.rateA+initial.rateB)*model.duration/60;
    const initialMarks=Number(initial.phaseA===0)+Number(initial.phaseB===0);
    close(counts.A+counts.B-initialMarks,Math.round(totalUnwrapped-end.phaseA-end.phaseB));
  }
}
const identical=makeClock({...config,rateA:72,rateB:72,phaseA:0,phaseB:0},60);
assert.equal(identical.beats.length,73);
for(let i=0;i<identical.beats.length;i++) {
  assert.equal(identical.beats[i].side,'AB'); close(identical.beats[i].t,i*60/72);
}
const rebuilt=makeClock({...config,phaseA:1.12,phaseB:0.63});
close(rebuilt.at(0).phaseA,0.12); close(rebuilt.at(0).phaseB,0.63);
assert.notDeepEqual(c.beats,rebuilt.beats);
assert.ok(!rebuilt.at(0).eligible);

// Replay, seek and continuation do not quantize elapsed time or reset the dwell.
const chunked=makeClock(config,0), attached=chunked.beats;
for(const to of [1.337,6.682,39,90,135,240]) chunked.extendTo(to);
assert.equal(chunked.beats,attached);
assert.equal(chunked.beats.length,c.beats.length);
for(let i=0;i<c.beats.length;i++) {
  assert.equal(c.beats[i].side,chunked.beats[i].side);
  close(c.beats[i].t,chunked.beats[i].t,1e-9);
}
assert.deepEqual(chunked.at(240),c.at(240));
assert.deepEqual(chunked.at(411.27),c.at(411.27));
assert.deepEqual(chunked.at(3.4),c.at(3.4));
const seeded=makeClock({feedback:true,seed:3711},1);
assert.deepEqual(seeded.at(0),makeClock({feedback:true,seed:3711},1).at(0));
assert.notEqual(seeded.at(0).phaseA,makeClock({feedback:true,seed:3712},1).at(0).phaseA);

const sha256=createHash('sha256').update(await readFile(new URL('../loop-clock.js',import.meta.url))).digest('hex');
console.log(JSON.stringify({pass:true,sourceVersion:LOOP_CLOCK_VERSION,sha256,lockedAtSeconds:lockedAt,
  finalCaptured:c.at(240),closedAt8Seconds:c.baselineAt(8),lateCaptureStartsAtSeconds:entry,
  tooDetuned:{naturalBpm:[high.config.rateA,high.config.rateB],lock:high.at(240).locked},durationSeconds:c.duration,
  events:c.beats.length, numericalReference:'Two-coordinate RK4, 0.0002 s step'},null,2));
