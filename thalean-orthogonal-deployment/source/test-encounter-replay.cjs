'use strict';
const fs=require('fs'),assert=require('assert/strict'),crypto=require('crypto');
const {verify}=require('./scripts/replay-encounter.cjs');
const input=__dirname+'/provenance/encounter-001/android-replay-001.json';
const raw=fs.readFileSync(input),fixture=JSON.parse(raw),clone=x=>JSON.parse(JSON.stringify(x)),checks=[];
const check=(name,fn)=>{fn();checks.push(name);};
let result;
check('actual_android_scan_record_and_continuation_replay',()=>{result=verify(fixture);assert(result.pass&&result.scanReplayed&&result.continuationReplayed);assert.equal(fixture.scan.count,201);assert.equal(result.observations,1);assert(result.geometryMaxDelta>0&&result.geometryMaxDelta<1e-14);});
check('nearly_tied_candidates_may_reorder',()=>{const r=clone(fixture),a=r.scan.candidates;const i=a.findIndex((x,i)=>i&&Math.abs(a[i-1].distance-x.distance)<1e-14);assert(i>0);[a[i-1],a[i]]=[a[i],a[i-1]];assert(verify(r).pass);});
for(const [name,mutate]of [
 ['native_state_tampering_rejected',r=>r.scan.candidates[0].endpoints[0].state++],
 ['hidden_bit_tampering_rejected',r=>r.observations[0].state.hiddenBit^=1],
 ['count_tampering_rejected',r=>r.scan.count++],
 ['invented_interaction_rejected',r=>r.scan.candidates[0].provenInteraction=true],
 ['coupling_event_tampering_rejected',r=>r.couplingEvents=1],
 ['geometry_beyond_tolerance_rejected',r=>r.scan.candidates[0].endpoints[0].point[0]+=1e-9],
 ['nonfinite_geometry_rejected',r=>r.scan.candidates[0].distance=NaN],
 ['missing_candidate_rejected',r=>r.scan.candidates.pop()],
 ['changed_continuation_rejected',r=>r.memory.after[0].state++],
 ['arbitrary_candidate_reordering_rejected',r=>r.scan.candidates.reverse()],
])check(name,()=>{const r=clone(fixture);mutate(r);assert.throws(()=>verify(r));});
const receipt={pass:true,producer:'node test-encounter-replay.cjs',fixture_sha256:crypto.createHash('sha256').update(raw).digest('hex'),checks,result,boundary:'Tolerance applies only to display geometry, not native states, counts, candidate membership, or continuation tuples. Different retained membership at a cutoff still rejects.'};
fs.writeFileSync(__dirname+'/provenance/encounter-001/android-replay-checks.json',JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt,null,2));
