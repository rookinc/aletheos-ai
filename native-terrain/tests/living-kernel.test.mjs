import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {buildGeometry} from '../living-geometry.mjs';
import {MAX_REPLAY_ENCOUNTERS,createExperiment,stepExperiment,reverseExperiment,resetExperiment,resetHistory,replayExperiment,exportSnapshot,exportConfiguration,exportReceipt,restoreExperiment,transitionProbabilities,chooseTransition,randomAt} from '../living-kernel.mjs';
const read=name=>JSON.parse(readFileSync(new URL('../data/'+name,import.meta.url)));
const geometry=buildGeometry(read('g60.json'),read('g15-quotient.json'));
const advance=(exp,n)=>{for(let i=0;i<n;i++)stepExperiment(exp);return exp;};

test('zero coupling gives exactly identical A/B paths and restart reproduces baseline',()=>{
  for(const config of [{memoryEnabled:false},{memoryStrength:0},{feedbackGain:0}]){
    const exp=advance(createExperiment(geometry,{...config,seed:'cohort-003'}),150),baseline=exportSnapshot(exp);
    assert.deepEqual(exp.A.path,exp.B.path);assert.deepEqual(exp.A.history,exp.B.history);
    assert.equal(exp.metrics.firstDivergence,null);assert.equal(exp.metrics.pathDivergence,0);
    resetExperiment(exp);advance(exp,150);assert.deepEqual(exportSnapshot(exp),baseline);
  }
});

test('memory affects actual next states and never creates an off-graph transition',()=>{
  const exp=advance(createExperiment(geometry,{memoryStrength:4,feedbackGain:2,seed:52002}),160);
  assert.notEqual(exp.metrics.firstDivergence,null);assert.ok(exp.metrics.pathDivergence>0);
  assert.ok(exp.metrics.densityDifference>0);assert.ok(exp.metrics.memoryMagnitude>0);
  assert.ok(exportReceipt(exp).comparison.allTransitionsAdmissible);
  for(const run of [exp.A,exp.B])assert.ok(run.path.slice(1).every((q,i)=>geometry.quotient.adj[run.path[i]].includes(q)));
});

test('same current configuration with different histories produces different next states',()=>{
  const adj=geometry.quotient.adj,q=0,first=adj[q][0],last=adj[q].at(-1),h1=Array(900).fill(0),h2=Array(900).fill(0);
  h1[first]=12;h2[last]=12;
  assert.equal(chooseTransition(adj,q,h1,3,.5),first);
  assert.equal(chooseTransition(adj,q,h2,3,.5),last);
  const p=transitionProbabilities(adj,q,h1,3);
  assert.ok(p.every(x=>x.probability>=0&&x.probability<=1));
  assert.ok(Math.abs(p.reduce((s,x)=>s+x.probability,0)-1)<1e-12);
});

test('retained history survives finite walker return and obeys finite-depth retention',()=>{
  const exp=advance(createExperiment(geometry,{historyDepth:4,retention:.5}),60);
  assert.equal(exp.walker,exp.config.initialEdge);assert.equal(exp.metrics.registeredClock,0);
  assert.equal(exp.metrics.nativeWalkerReturned,true);assert.equal(exp.A.events.length,4);
  assert.ok(Math.abs(exp.metrics.memoryMagnitude-(1+.5+.25+.125))<1e-12);
  assert.equal(exp.tick,60);assert.equal(exp.B.path.length,61);
});

test('deterministic snapshots replay parameter changes and history resets; reverse is exact',()=>{
  const exp=advance(createExperiment(geometry),12);
  exp.config.retention=.7;advance(exp,8);resetHistory(exp);
  exp.config.memoryStrength=-2;advance(exp,7);
  const before=exportSnapshot(exp);stepExperiment(exp);reverseExperiment(exp);
  assert.deepEqual(exportSnapshot(exp),before);
  const restored=restoreExperiment(geometry,before);assert.deepEqual(exportSnapshot(restored),before);
  advance(exp,15);advance(restored,15);assert.deepEqual(exportSnapshot(restored),exportSnapshot(exp));
  const bad=structuredClone(before);bad.state.B.q=(bad.state.B.q+1)%900;
  assert.throws(()=>restoreExperiment(geometry,bad),/deterministic replay/);
});

test('history reset preserves encounter identity and reverse can return to origin',()=>{
  const exp=advance(createExperiment(geometry),9),oldQ=exp.B.q;
  resetHistory(exp);assert.equal(exp.tick,9);assert.equal(exp.B.q,oldQ);assert.equal(exp.metrics.memoryMagnitude,0);
  assert.equal(exp.B.path.length,10);assert.equal(exp.metrics.encounters,9);
  for(let i=0;i<9;i++)reverseExperiment(exp);
  assert.equal(exp.tick,0);assert.equal(exp.B.q,0);assert.equal(exp.walker,0);assert.equal(exp.B.path.length,1);
  reverseExperiment(exp);assert.equal(exp.tick,0);
});

test('configuration export, seeded counter samples, and invalid input handling',()=>{
  const exp=createExperiment(geometry,{seed:'same seed'});
  const imported=restoreExperiment(geometry,exportConfiguration(exp));replayExperiment(exp,100);replayExperiment(imported,100);
  assert.deepEqual(exportSnapshot(exp),exportSnapshot(imported));
  assert.equal(randomAt('seed',50),randomAt('seed',50));assert.notEqual(randomAt('seed',50),randomAt('seed',51));
  for(const config of [{retention:1.1},{historyDepth:0},{initialQ:900},{initialEdge:-1},{memoryStrength:NaN}])assert.throws(()=>createExperiment(geometry,config));
  exp.config.seed='changed';assert.throws(()=>stepExperiment(exp),/Restart/);
  assert.throws(()=>restoreExperiment(geometry,{schema:'unknown'}));
});

test('source identity, bounded replay, ordered logs, and malformed reset guards',()=>{
  const exp=advance(createExperiment(geometry),5),snapshot=exportSnapshot(exp);
  const altered=structuredClone(geometry);[altered.quotient.map[15],altered.quotient.map[16]]=[altered.quotient.map[16],altered.quotient.map[15]];
  assert.throws(()=>restoreExperiment(altered,snapshot),/topology identity/);
  const absent=structuredClone(snapshot);delete absent.source;assert.throws(()=>restoreExperiment(geometry,absent),/topology identity/);
  const oversized=structuredClone(snapshot);oversized.timeline=Array(MAX_REPLAY_ENCOUNTERS+1).fill(null);assert.throws(()=>restoreExperiment(geometry,oversized),/oversized/);
  const malformed=structuredClone(snapshot);malformed.timeline[2]=null;assert.throws(()=>restoreExperiment(geometry,malformed),/sequence/);
  const duplicate=structuredClone(snapshot);duplicate.historyResets=[2,2];assert.throws(()=>restoreExperiment(geometry,duplicate),/reset/);
  assert.throws(()=>replayExperiment(exp,MAX_REPLAY_ENCOUNTERS+1),/Replay requires/);
  assert.throws(()=>createExperiment(geometry,null),/object/);assert.throws(()=>createExperiment(geometry,[]),/object/);
  assert.throws(()=>randomAt('seed',-1),/encounter/);
});

test('display trace persistence does not change dynamics; disabling and restarting restores baseline',()=>{
  const exp=createExperiment(geometry),comparison=createExperiment(geometry,{tracePersistence:1});
  for(let i=0;i<120;i++){exp.config.tracePersistence=1+i;stepExperiment(exp);stepExperiment(comparison);}
  assert.deepEqual(exp.A.path,comparison.A.path);assert.deepEqual(exp.B.path,comparison.B.path);
  assert.deepEqual(exp.B.history,comparison.B.history);
  exp.config.memoryEnabled=false;resetExperiment(exp);advance(exp,120);
  const baseline=advance(createExperiment(geometry,{memoryEnabled:false}),120);
  assert.deepEqual(exp.A.path,baseline.A.path);assert.deepEqual(exp.B.path,baseline.A.path);
});

test('long encounter log keeps exact cumulative metrics through replay and rollback',()=>{
  const exp=advance(createExperiment(geometry,{seed:'long-run',historyDepth:32}),1500);
  exp.config.retention=1;resetHistory(exp);advance(exp,30);
  assert.equal(exp.metrics.memoryMagnitude,30);
  assert.equal(exp.metrics.pathDivergence,exp.A.path.filter((q,i)=>q!==exp.B.path[i]).length);
  assert.equal(exp.metrics.firstDivergence,exp.A.path.findIndex((q,i)=>q!==exp.B.path[i]));
  const snapshot=exportSnapshot(exp),restored=restoreExperiment(geometry,snapshot);
  assert.deepEqual(exportSnapshot(restored),snapshot);
  stepExperiment(restored);reverseExperiment(restored);assert.deepEqual(exportSnapshot(restored),snapshot);
});
