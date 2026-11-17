import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const embedded=html.match(/<script type="application\/json" id="native-dataset">([\s\S]*?)<\/script>/)[1];
const moduleSource=html.match(/<script type="module">([\s\S]*?)<\/script>/)[1];
const engine=moduleSource.slice(0,moduleSource.indexOf('const $=id=>'));
const {step,observe,createComparisonModel,compose,verifyActiveGate}=await import('data:text/javascript;base64,'+Buffer.from(engine+'\nexport {step,observe,createComparisonModel,compose,verifyActiveGate};').toString('base64'));
const d=JSON.parse(embedded),g=d.g60;

test('Curated dataset is bound to the retained source export',()=>{
 const p=JSON.parse(fs.readFileSync(new URL('../DATA_PROVENANCE.json',import.meta.url)));
 assert.equal(crypto.createHash('sha256').update(Buffer.from(embedded)).digest('hex'),p.data_sha256);
 assert.equal(g.references.length,15);assert.equal(g.automorphisms.length,480);
});
test('All960 controllers match an independent incoming-edge continuation and exact4/8 return',()=>{
 let states=0;
 for(const ref of g.references)for(const vertex of ref.surface)for(const phase of [0,1]){
  const ports=new Map(ref.ports.map(([v,a,b])=>[v,[a,b]]));
  const initial={vertex,phase};let s=initial,previous=ports.get(vertex)[phase^1],current=vertex;
  const observations=[];
  for(let n=1;n<=8;n++){
   const next=g.adjacency[current].find(w=>ref.surface.includes(w)&&w!==previous);
   previous=current;current=next;s=step(ref,s);
   assert.equal(s.vertex,current);assert.equal(s.phase,phase^(n%2));observations.push(observe(ref,s));
   if(n<8)assert.notDeepEqual(s,initial);
   if(n===4){assert.equal(s.vertex,ref.tau[vertex]);assert.deepEqual(observe(ref,s),observe(ref,initial));}
  }
  assert.deepEqual(s,initial);assert.equal(new Set(observations.slice(0,4).map(x=>x.address)).size,4);states++;
 }
 assert.equal(states,960);
});
test('Inverse, causal crossing bit and hidden-sheet future boundary hold on all960 states',()=>{
 for(const ref of g.references)for(const vertex of ref.surface){
  assert.notDeepEqual(observe(ref,step(ref,{vertex,phase:0})),observe(ref,step(ref,{vertex,phase:1})));
  for(const phase of [0,1]){const s={vertex,phase};assert.deepEqual(step(ref,step(ref,s),-1),s);assert.deepEqual(step(ref,step(ref,s,-1)),s);
   let a=s,b={vertex:ref.tau[vertex],phase};for(let n=0;n<8;n++){assert.deepEqual(observe(ref,a),observe(ref,b));a=step(ref,a);b=step(ref,b);}
  }
 }
});
test('Native return covariance survives all480 reference transformations',()=>{
 const refs=new Map(g.references.map(r=>[[...r.fiber].sort((a,b)=>a-b).join(','),r]));
 for(const p of g.automorphisms)for(const ref of g.references){
  const target=refs.get(ref.fiber.map(v=>p[v]).sort((a,b)=>a-b).join(','));
  for(const vertex of ref.surface)for(const phase of [0,1]){
   const out=step(ref,{vertex,phase});assert.deepEqual(step(target,{vertex:p[vertex],phase}),{vertex:p[out.vertex],phase:out.phase});
  }
 }
});
test('Four native comparison references preserve records, conjugacy and all64 compositions',()=>{
 const model=createComparisonModel(g),records=g.initialObservers.map(o=>({reference:o.reference_id,vertex:o.shell_vertex,phase:o.crossing_bit})),original=JSON.stringify(records),base=model.compare(records,0);
 assert.equal(model.marks.size,480);
 for(let reference=0;reference<4;reference++){
  const out=model.compare(records,reference);assert.equal(JSON.stringify(records),original);assert.deepEqual(out.coordinates.map(o=>o.phase),records.map(o=>o.phase));
  assert.equal(out.holonomy.trace,60);assert.equal(out.holonomy.determinant,1);assert.equal(out.holonomy.order,1);
  for(let a=0;a<4;a++)for(let b=0;b<4;b++)for(let c=0;c<4;c++)assert.deepEqual(compose(out.matrix[b][c].permutation,out.matrix[a][b].permutation),out.matrix[a][c].permutation);
  for(let a=0;a<4;a++)for(let b=a+1;b<4;b++)assert.equal(out.matrix[a][b].signature,base.matrix[a][b].signature);
 }
});
test('Native gate matches all8 certified rational coordinates, exact maximum and inverse',()=>{
 const result=verifyActiveGate(d.g9000.active);assert.equal(result.passed,true);assert.equal(result.changed,8);assert.ok(Object.values(result.checks).every(Boolean));
});
test('A corrupted gate coordinate is rejected',()=>{
 const corrupt=structuredClone(d.g9000.active);corrupt.square_s_after[0]='0';assert.equal(verifyActiveGate(corrupt).passed,false);
});
test('Both source trajectories retain their full domain and three-step horizon',()=>{
 const snapshots=d.g9000.snapshots;
 assert.deepEqual(snapshots.PQ.map(r=>r.context),[[101,96],[96,40],[40,177],[177,189]]);
 assert.deepEqual(snapshots.QP.map(r=>r.context),[[101,96],[96,571],[571,572],[572,144]]);
 assert.equal(snapshots.PQ[3].receipt,138);assert.equal(snapshots.QP[3].receipt,200);
 for(const rows of Object.values(snapshots))for(const r of rows){assert.equal(r.Q,d.g9000.Q);if(r.step){assert.equal(r.inverse_exact,true);assert.match(r.x_sha256,/^[a-f0-9]{64}$/);assert.match(r.s_sha256,/^[a-f0-9]{64}$/);}}
 assert.equal(d.g9000.active.changed_coordinates.length,8);assert.equal(d.g9000.active.quotient_sites.length,4);assert.equal(d.g9000.horizon,3);
});
