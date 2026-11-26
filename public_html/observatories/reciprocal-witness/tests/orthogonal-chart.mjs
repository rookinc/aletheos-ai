/* node tests/orthogonal-chart.mjs [--source-html /path/to/orthogonal-index.html]
 * A retained Git checkout can instead supply --parent-src thalean-orthogonal-deployment/source/src.
 * The optional HTML file is the pinned live Orthogonal assembly archive. The offline
 * check uses the hashes of its complete graph and independent screen checkpoints.
 */
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import vm from 'node:vm';
import {chartState,chartAddress,chartEdge,chartPoint,chartSamples,chartPath,chartAt,
  chartRotate,chartScreen,chartMeshBuffers,CHART_SOURCE} from '../orthogonal-chart.js';
import {dartPairAt} from '../dart-orbits.js';

const hash=value=>createHash('sha256').update(value).digest('hex');
function near(a,b,tol=8e-11) {
  if(Array.isArray(a)) {
    assert.equal(a.length,b.length);
    for(let i=0;i<a.length;i++) near(a[i],b[i],tol);
  } else assert.ok(Math.abs(a-b)<=tol, 'coordinate drift '+a+' vs '+b);
}

const fixture=JSON.parse(readFileSync(new URL('./orthogonal-reference.json',import.meta.url)));
const cycles=Array.from({length:450},(_,c)=>Array.from({length:20},(_,k)=>chartState(c,k)));
const K=Array.from({length:1800},(_,i)=>chartEdge(36000+i)[1]%1800);
const factors=Array.from({length:7200},(_,e)=>chartEdge(e));
const projection=Array.from({length:1800},(_,i)=>chartAddress(i).g900);
for(const [name,x] of Object.entries({cycles,K,factors,projection})) {
  assert.equal(hash(JSON.stringify(x)),fixture.sha256[name]);
}
const degrees=new Uint8Array(9000),allEdges=new Set();
for(let k=0;k<45000;k++) {
  const [i,j]=chartEdge(k);
  assert.notEqual(i,j);
  allEdges.add(Math.min(i,j)*9000+Math.max(i,j));
  degrees[i]++; degrees[j]++;
}
assert.equal(allEdges.size,45000);
assert.ok(degrees.every(d=>d===10));
assert.deepEqual(chartSamples.factorEdges,Array.from({length:1800},(_,i)=>chartEdge(20*i)));
assert.deepEqual(chartSamples.pathCycles,Array.from({length:90},(_,i)=>i*5));
assert.equal(new Set(cycles.flat()).size,9000);
const mesh=chartMeshBuffers();
assert.equal(mesh.vertices.length,36000);
assert.equal(mesh.segments.length/8,16190);
assert.equal(mesh.ranges.length,90);
for(let c=0;c<3;c++) for(let k=0;k<20;k++) {
  const pair=dartPairAt(c,k);
  for(const [p,stage] of [[pair.a,k],[pair.b,(k+10)%20]]) {
    const loc=chartAddress(p.id);
    assert.equal(loc.cycle,c); assert.equal(loc.stage,stage);
    for(const field of ['id','frame','g1800','g900','sheet','framedProjection']) assert.equal(loc[field],p[field]);
  }
  for(let axis=0;axis<3;axis++) {
    const a=chartPoint(pair.a.id,axis,100),b=chartPoint(pair.b.id,axis,100);
    near(Math.hypot(...a.map((x,j)=>x-b[j])),4/9);
  }
}
for(const s of fixture.screen) {
  assert.equal(chartState(s.cycle,s.stage),s.id);
  const p=chartAt(s.id,s.fraction,s.axis,s.merge);
  near(p.point,s.world); near(p.heading,s.heading);
  near(chartScreen(p.point,...fixture.viewport),s.screen);
}
for (const merge of [0,58,100]) for (const c of chartSamples.pathCycles) {
  const expected=[],actual=[];
  for(let k=0;k<20;k++) {
    const path=chartPath(chartState(c,k),1,merge).points;
    for(let j=1;j<path.length;j++) expected.push([path[j-1],path[j]]);
  }
  const [lo,hi]=mesh.ranges[c/5];
  const resolve=n=>[mesh.segments[n],mesh.segments[n+1]+mesh.segments[n+3]*(1-merge/100),mesh.segments[n+2]];
  for(let i=lo;i<hi;i++) {
    const x=resolve(8*i),y=resolve(8*i+4);
    if(Math.hypot(...y.map((v,d)=>v-x[d]))>1e-9) actual.push([x,y]);
  }
  near(actual,expected);
}

const opt=process.argv.indexOf('--source-html'), parent=process.argv.indexOf('--parent-src');
let fromSource='';
if (opt>=0 || parent>=0) {
  let scripts,appHash;
  if (opt>=0) {
    const bytes=readFileSync(process.argv[opt+1]);
    assert.equal(hash(bytes),CHART_SOURCE.htmlSha256);
    scripts=[...bytes.toString('utf8').matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].map(m=>m[2]);
    appHash=CHART_SOURCE.assemblyScriptSha256;
  } else {
    const dir=process.argv[parent+1];
    scripts=['native-data.json','native-model.js','volume-camera.js'].map(f=>readFileSync(join(dir,f),'utf8'));
    scripts[16]=readFileSync(join(dir,'app.js'),'utf8');
    appHash='3e47f9e36d897c0c1a90a50a0e63dbc143dd685dec7fec736ba50f7d13664c29';
  }
  for (const [i,sha] of [[0,CHART_SOURCE.nativeDataSha256],[1,CHART_SOURCE.nativeModelSha256],
    [2,CHART_SOURCE.cameraSha256],[16,appHash]]) assert.equal(hash(scripts[i]),sha);
  const sourceData=JSON.parse(scripts[0]);
  assert.deepEqual(sourceData.cycles,cycles);
  assert.deepEqual(sourceData.topology.K,K);
  assert.deepEqual(sourceData.topology.edges1800,factors);
  assert.deepEqual(sourceData.quotient.projection,projection);
  // The verified source JS exposes pure chart methods before the DOM application starts.
  const M=vm.runInNewContext(scripts[1]+'; NativeModel');
  const L=vm.runInNewContext(scripts[16].split('(()=>{')[0]+'; OrthogonalLayout');
  const C=vm.runInNewContext(scripts[2]+'; VolumeCamera');
  const camera=new C();
  camera.turn(0,-Math.PI/4,0);
  camera.turn(Math.atan(1/Math.sqrt(2)),0,0);
  const [w,h]=fixture.viewport, scale=Math.min(w*.41,h*.40);
  for(let c=0;c<450;c++) for(let k=0;k<20;k++) {
    const id=cycles[c][k];
    for(const merge of [0,58,100]) {
      const original=M.splitPoint(c,k,undefined,merge);
      for(let axis=0;axis<3;axis++) {
        const got=chartPoint(id,axis,merge);
        near(got,L.point(original,axis));
        const [x,y,z]=camera.rotate(got);
        near(chartScreen(got,w,h),[w/2+scale*x,h/2-scale*y,z]);
      }
      const originalPath=M.path(c,k,merge);
      const projected=chartPath(id,1,merge);
      near(projected.points,originalPath.points);
      near(projected.lengths,originalPath.lengths);
      if(c<3) for(const f of [.15,.5,.85]) {
        const frame=M.at(originalPath,f), actual=chartAt(id,f,k%3,merge);
        near(actual.point,L.point(frame.point,k%3));
        near(actual.heading,L.point(frame.heading,k%3));
      }
    }
  }
  fromSource=' Compared every vertex and every F polyline against the hash-matched '+(opt>=0?'live':'pinned parent')+' source at three merges.';
}
console.log('PASS · 9,000 native addresses, 45,000 edges, 450 F20 cycles, 3 orthogonal copies, 16,190 sampled F segments. All 60 complementary dart phase pairs registered, all merge endpoints and canonical screens matched.'+fromSource);
