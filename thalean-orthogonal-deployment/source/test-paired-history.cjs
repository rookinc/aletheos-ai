'use strict';
const assert=require('assert/strict'),fs=require('fs'),crypto=require('crypto');
const data=require('./src/native-data.json'),meta=require('./src/paired-history-data.json');
const Native=require('./src/native-model.js'),History=require('./src/paired-history.js');
const digest=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
assert.equal(digest(fs.readFileSync(__dirname+'/src/native-data.json')),meta.source.sha256['native-data.json']);
const untouched=JSON.stringify({data,meta});
const g=Native.topology(data),model=new History.Model(data,meta),q=meta.g60ToAdmitted;
assert.equal(q.length,60);assert.deepEqual(History.names,['1','a','b','ab']);
const deck=['1','a','b','ab'].map(k=>meta.deck[k]);
const edgeKey=(u,v)=>u<v?`${u},${v}`:`${v},${u}`;
const E=new Set(data.g60Edges.map(([u,v])=>edgeKey(u,v)));
for(const p of deck){
 assert.equal(p.length,60);assert.equal(new Set(p).size,60);
 for(let v=0;v<60;v++){assert.equal(p[p[v]],v);assert.equal(q[p[v]],q[v]);}
 for(const [u,v]of data.g60Edges)assert(E.has(edgeKey(p[u],p[v])));
}
const coordinate=new Map(),frames=[];
for(let base=0;base<15;base++){
 const vertices=Array.from({length:60},(_,v)=>v).filter(v=>q[v]===base);
 assert.equal(vertices.length,4);
 const labels=deck.map(p=>p[Math.min(...vertices)]);
 assert.deepEqual(new Set(labels),new Set(vertices));frames.push(labels);
 labels.forEach((v,s)=>coordinate.set(v,{base,s}));
}
assert.deepEqual(frames,meta.fiberFrames);
// Independent display oracle: decode BOTH original ordered-pair representatives.
// It never reads the compact base1800/relative1800/hidden1800 arrays.
function direct(state){
 const pairedState=state%1800,answers=data.pairing.representatives[pairedState].map(z=>{
  const u=coordinate.get(Math.floor(z/60)),v=coordinate.get(z%60);
  return {state,frame:Math.floor(state/1800),pairedState,g900:data.quotient.projection[pairedState],basePair:[u.base,v.base],relativeSheet:u.s^v.s,hiddenBit:(v.s>>1)&1};
 });
 assert.equal(answers.length,2);assert.deepEqual(answers[0],answers[1]);return answers[0];
}
const oracle=Array.from({length:9000},(_,v)=>direct(v));
let stateChecks=0,transitionChecks=0,snapshotChecks=0,trailChecks=0,returnChecks=0;
for(let v=0;v<9000;v++){
 assert.deepEqual(model.at(v),oracle[v]);stateChecks++;
 const before=oracle[v],after=oracle[g.F[v]],ra=before.relativeSheet&1,rb=before.relativeSheet>>1;
 assert.deepEqual(after.basePair,before.basePair.slice().reverse());
 assert.equal(after.frame,(before.frame+1)%5);
 assert.equal(after.relativeSheet,before.relativeSheet^3);
 assert.equal(after.hiddenBit,before.hiddenBit^rb);transitionChecks++;
}
for(let cycle=0;cycle<450;cycle++)for(let offset=0;offset<20;offset++){
 const startState=data.cycles[cycle][offset],start=oracle[startState];let currentState=startState;
 for(let step=0;step<20;step++){
  const s=model.snapshot(cycle,step,offset),current=oracle[currentState];
  assert.equal(s.phase,step);assert.equal(s.steps,step);assert.equal(s.offset,offset);assert.equal(s.started,step>0);
  assert.deepEqual(s.start,start);assert.deepEqual(s.current,current);
  assert.equal(s.baseReturned,current.frame===start.frame&&current.basePair.every((v,i)=>v===start.basePair[i]));
  assert.equal(s.relativeReturned,current.frame===start.frame&&current.g900===start.g900);
  assert.equal(s.nativeReturned,currentState===startState);assert.equal(s.hiddenChanged,current.hiddenBit!==start.hiddenBit);
  assert.equal(s.trail.length,step+1);
  for(let j=0;j<s.trail.length;j++){
   const {step:trailStep,phase,...point}=s.trail[j];
   assert.equal(trailStep,j);assert.equal(phase,j);assert.deepEqual(point,oracle[data.cycles[cycle][(j+offset)%20]]);trailChecks++;
  }
  snapshotChecks++;currentState=g.F[currentState];
 }
 assert.equal(currentState,startState);
 const at5=model.snapshot(cycle,5,offset),at10=model.snapshot(cycle,10,offset),at20=model.snapshot(cycle,20,offset);
 assert.equal(at5.baseReturned,start.basePair[0]===start.basePair[1]);
 assert.equal(at5.relativeReturned,false);assert.equal(at5.nativeReturned,false);
 assert.equal(at10.baseReturned,true);assert.equal(at10.relativeReturned,true);assert.equal(at10.nativeReturned,false);assert.equal(at10.hiddenChanged,true);
 assert.equal(at20.baseReturned,true);assert.equal(at20.relativeReturned,true);assert.equal(at20.nativeReturned,true);assert.equal(at20.hiddenChanged,false);
 assert.equal(at20.trail.length,21);assert.equal(at20.trail[0].step,0);assert.equal(at20.trail[20].step,20);
 returnChecks+=3;
}
// Long-running and exact-boundary traces retain the right completed window.
for(const step of [21,39,40,41,100,1001,Number.MAX_SAFE_INTEGER]){
 const s=model.snapshot(27,step,13),anchor=step-(step%20||20);
 assert.equal(s.trail[0].step,anchor);assert.equal(s.trail.at(-1).step,step);
 assert.equal(s.trail.length,step-anchor+1);assert(s.trail.length<=21);
 assert.deepEqual(s.start,oracle[data.cycles[27][13]]);
 assert.deepEqual(s.current,oracle[data.cycles[27][(step%20+13)%20]]);
}
const zero=model.snapshot(0,0);assert.equal(zero.trail.length,1);assert.equal(zero.started,false);
// The model is a projection only: neither caller inputs nor internal cycles are writable.
assert.equal(JSON.stringify({data,meta}),untouched);
const m=new History.Model(data,meta),snap=m.snapshot(0,10);
snap.current.basePair[0]=999;snap.trail[0].state=999;
assert.deepEqual(m.snapshot(0,10).current,oracle[data.cycles[0][10]]);
assert.throws(()=>{m.cycles[0][0]=999;},TypeError);
assert.throws(()=>{m.base[0]=999;},TypeError);
for(const invalid of [-1,9000,1.5,NaN,Infinity,'0',null,undefined])assert.throws(()=>model.at(invalid));
for(const invalid of [-1,450,1.5,NaN,Infinity,'0',null])assert.throws(()=>model.snapshot(invalid,0));
for(const invalid of [-1,Number.MAX_SAFE_INTEGER+1,1.5,NaN,Infinity,'0',null])assert.throws(()=>model.snapshot(0,invalid));
for(const invalid of [-1,20,1.5,NaN,Infinity,'0',null])assert.throws(()=>model.snapshot(0,0,invalid));
for(const [key,value] of [['base1800',[0]],['relative1800',new Array(1800).fill(4)],['hidden1800',new Array(1800).fill(2)]])assert.throws(()=>new History.Model(data,{...meta,[key]:value}));
assert.throws(()=>new History.Model(data,{...meta,schema:'wrong'}));
// Projection readouts cannot change original transport/PID behavior.
const a=new Native.Experiment(data),b=new Native.Experiment(data);
for(let step=0;step<40;step++){
 model.snapshot(step%450,step,step%20);a.step();b.step();
}
for(const name of ['closed','open'])for(const state of ['x','v','I'])assert.deepEqual(a[name][state],b[name][state]);
console.log(JSON.stringify({audit:'017V paired history model',pass:true,stateChecks,transitionChecks,snapshotChecks,trailChecks,returnChecks,sourceNativeSHA256:meta.source.sha256['native-data.json'],unchangedEngine:true},null,2));
