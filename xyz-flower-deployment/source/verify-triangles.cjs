'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),M=require('./model'),T=require('./triangle-model'),{G1800Engine,buildNativeCover,HydrogenEngine}=require('./hydrogen-engine');
const native=M.native(require('./transport.json')),bundle=require('./hydrogen-data.json'),registration=new G1800Engine(bundle.native),engine=new HydrogenEngine(registration,buildNativeCover(registration),bundle.hydrogen);
const before={metrics:JSON.stringify(engine.metrics),re:Array.from(engine.re),im:Array.from(engine.im)};
const result=T.build(native,engine.graph.edges);assert.deepEqual(result.counts,{triangles:12000,crossPlaneTriangles:2680,crossPlaneOrbits:134,alignedTriangles:820,alignedOrbits:41,verifiedFEdges:45000,period:20});
// Independent adjacency construction and shortest-path checks, not module metadata.
const adj=Array.from({length:9000},()=>[]);for(let j=0;j<engine.graph.edges.length;j+=2){let a=engine.graph.edges[j],b=engine.graph.edges[j+1];adj[a].push(b);adj[b].push(a);}
function distance(a,b){const seen=new Set([a]),queue=[[a,0]];for(let i=0;i<queue.length;i++){const [v,d]=queue[i];if(v===b)return d;for(const w of adj[v])if(!seen.has(w)){seen.add(w);queue.push([w,d+1]);}}return Infinity;}
let verifiedFaces=0,maxClosureError=0;const allFaces=new Set(),coveredVertices=new Set();
for(const orbit of result.orbits){
 assert.deepEqual(orbit.routes.map(r=>r%3),[0,1,2]);assert.equal(new Set(orbit.routes).size,3);
 const orbitVertices=new Set();for(let k=0;k<20;k++){
  const s=T.sample(orbit,k,native,0,M);assert.equal(new Set(s.ids).size,3);assert(s.integerStep);assert.equal(s.fraction,0);
  assert.deepEqual([[0,1],[1,2],[2,0]].map(([i,j])=>distance(s.ids[i],s.ids[j])),[1,1,1]);
  const face=s.ids.slice().sort((a,b)=>a-b).join(',');assert(!allFaces.has(face));allFaces.add(face);
  for(const v of s.ids){assert(!orbitVertices.has(v));orbitVertices.add(v);coveredVertices.add(v);}
  assert.deepEqual(s.nextIds,s.ids.map(v=>native.F[v]));verifiedFaces++;
 }
 assert.equal(orbitVertices.size,60);
 for(const depth of [0,.8])for(const phase of [0,.37,4.75,19.99,-.2]){
  const s=T.sample(orbit,phase,native,depth,M),closed=T.sample(orbit,phase+20,native,depth,M);
  assert(s.points.flat().every(Number.isFinite));assert(Number.isFinite(s.area)&&s.area>=0);assert(s.sideLengths.every(v=>Number.isFinite(v)&&v>=0));assert(s.centroid.every(Number.isFinite));
  if(s.normal)assert(Math.abs(Math.hypot(...s.normal)-1)<1e-12);
  const semiperimeter=s.sideLengths.reduce((a,b)=>a+b)/2,heron=Math.sqrt(Math.max(0,s.sideLengths.reduce((x,l)=>x*(semiperimeter-l),semiperimeter)));assert(Math.abs(heron-s.area)<1e-11);
  for(let i=0;i<3;i++)for(let j=0;j<3;j++)maxClosureError=Math.max(maxClosureError,Math.abs(s.points[i][j]-closed.points[i][j]));
  assert.deepEqual(s.ids,closed.ids);assert(Math.abs(s.area-closed.area)<1e-12);
 }
}
assert(maxClosureError<1e-12);assert.deepEqual(result.orbits[result.exampleIndex].seeds,[3,35,46]);assert.deepEqual(result.orbits[result.exampleIndex].routes,[3,34,44]);
assert.equal(JSON.stringify(engine.metrics),before.metrics);assert.deepEqual(Array.from(engine.re),before.re);assert.deepEqual(Array.from(engine.im),before.im);
const report={passed:true,...result.counts,verifiedFaces,uniqueFaces:allFaces.size,distinctVerticesCovered:coveredVertices.size,maxClosureError,exampleIndex:result.exampleIndex,example:result.orbits[result.exampleIndex],hydrogenStateUnchanged:true,scope:result.scope};fs.writeFileSync('triangle-verification.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
