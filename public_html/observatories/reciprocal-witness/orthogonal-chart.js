// The three displays use one G9000 transport and the Orthogonal Observatory's
// split-torus chart. Chart units and the display merge never enter F or the gate.
import registration from './data/orthogonal-registration.js';

export const CHART_SOURCE = Object.freeze({
  name:'Thalean G9000 Automaton Observatory v1.8 · Assembly', version:'1.8',
  release:'THALEAN-ORTHOGONAL-D8-001-20261120T202754Z',
  parentGraphRevision:'dfe977f66d57ed34d61d42c6221378cbd819f9d1',
  url:'https://aletheos.ai/observatories/thalean-orthogonal/',
  htmlSha256:'53ae52f010d79e678556bce470aaaaf740249603a3c498caccd753760a90662f',
  nativeDataSha256:'d070869e90b5d3b34981ae593faf5c635dfa25eb1aedebd504833a7a17f27e11',
  nativeModelSha256:'1b01d744ce9a461e38390a9d2c6954a1750af0121823bd2ef4282f3b4d430cd3',
  cameraSha256:'5d09b81b619d51bd77fbe92af3c4268016cd3366aeed37d4e112292075a80beb',
  assemblyScriptSha256:'7fd5585a87ce6af93396ae615739395710a3b3cad27a232e88708380ccf13811',
  parentModelSha256:'d53652baacefe2dfd9d00a0692b2267deda3c710d2a03b83e47b2d0d1180e8e0',
  sharedBaseline:'7abb1c6681879db06a292952d0fc4b0440c206de',
  nativeSourceRevision:'d1f4a55fdfe5720094dbee23a1f2870670f116f6',
  nativeSourceURL:'https://github.com/rookinc/aletheos-ai/tree/d1f4a55fdfe5720094dbee23a1f2870670f116f6/thalean-orthogonal-deployment/source/src',
  coordinateFrame:'chart native +Y symmetry normal; X/Y/Z cyclic copies; shared local origin'
});

export const chartCopies = Object.freeze([
  {axis:0,name:'X',plane:'YZ',color:'#ff838c'}, {axis:1,name:'Y',plane:'ZX',color:'#8ce4b7'},
  {axis:2,name:'Z',plane:'XY',color:'#89b6ff'}
]);

// Source builder enumerates diagonal-a and diagonal-V4 pair orbits by least
// ordered-pair representative. G1800's registered K[(x,y)] is [(ab(y),x)].
const {a, ab, g60} = registration;
const b = a.map(x => ab[x]);
function quotient(maps) {
  const labels = new Int16Array(3600).fill(-1);
  const reps = [];
  for (let pair=0; pair<3600; pair++) {
    if (labels[pair] >= 0) continue;
    const label = reps.length;
    reps.push(pair);
    labels[pair] = label;
    for (const perm of maps) labels[60*perm[Math.floor(pair/60)] + perm[pair%60]] = label;
  }
  return {labels,reps};
}
const cover = quotient([a]);
const surface = quotient([a,b,ab]);
const turn = cover.reps.map(pair => cover.labels[60*ab[pair%60]+Math.floor(pair/60)]);
const projection = cover.reps.map(pair => surface.labels[pair]);
const neighbors = Array.from({length:60}, () => []);
for (const [i,j] of g60) { neighbors[i].push(j); neighbors[j].push(i); }
const factorPairs = [];
for (let i=0; i<1800; i++) {
  const pair=cover.reps[i], u=Math.floor(pair/60), v=pair%60;
  const incident=[...neighbors[u].map(n => cover.labels[60*n+v]), ...neighbors[v].map(n => cover.labels[60*u+n])];
  for (const j of incident.sort((x,y)=>x-y)) if (j>i) factorPairs.push([i,j]);
}
const cycles=[];
const cycleById=new Int16Array(9000).fill(-1), stageById=new Uint8Array(9000);
const lift=new Uint8Array(1800), seenBase=new Uint8Array(900);
for (let i=0; i<1800; i++) {lift[i]=seenBase[projection[i]]; seenBase[projection[i]]++;}
for (let seed=0; seed<9000; seed++) {
  if (cycleById[seed] >= 0) continue;
  const cycle=[];
  let id=seed;
  do {
    cycleById[id]=cycles.length;
    stageById[id]=cycle.length;
    cycle.push(id);
    id=1800*((Math.floor(id/1800)+1)%5)+turn[id%1800];
  } while(id!==seed);
  cycles.push(cycle);
}
const TAU=2*Math.PI, GOLDEN=(Math.sqrt(5)-1)/2;
function phase20(k) { return ((k%20)+20)%20; }
function release(merge) { return 1-Math.min(100,Math.max(0,merge))/100; }
function checkId(id) {
  if (!Number.isInteger(id) || id<0 || id>=9000) throw new RangeError('G9000 address outside 0–8999');
}
export function chartState(c,k) {
  if (!Number.isInteger(c) || c<0 || c>=450 || !Number.isSafeInteger(k)) throw new RangeError('Invalid F cycle or step');
  return cycles[c][phase20(k)];
}
export function chartAddress(id) {
  checkId(id);
  const frame=Math.floor(id/1800), g1800=id%1800, g900=projection[g1800];
  return {id,cycle:cycleById[id],stage:stageById[id],frame,g1800,g900,sheet:lift[g1800],framedProjection:900*frame+g900};
}
export function chartRotate([x,y,z],axis) {
  if (axis===0) return [y,z,x];
  if (axis===1) return [x,y,z];
  if (axis===2) return [z,x,y];
  throw new RangeError('Orthogonal copy must be X=0, Y=1 or Z=2');
}
function torus(c,t) {
  const az=TAU*(t/5+c/450), phase=TAU*(t/4+((c*GOLDEN)%1)), r=10+4*Math.cos(phase);
  return [r*Math.cos(az),4*Math.sin(phase),r*Math.sin(az)];
}
function knot(c,t,side) {
  const [x,y,z]=torus(c,t);
  const sigma=side===undefined?(y< -1e-10?-1:1):side;
  return [x/18,y/18,z/18,sigma*12/18];
}
function resolve([x,y,z,offset],m) { return [x, y+offset*m, z]; }

// Four doubles per vertex contain x, unsplit y, z and the signed y-offset at
// merge zero. At percentage m the base point is [x,y+offset*(1−m/100),z].
const vertices=new Float64Array(9000*4);
cycles.forEach((cycle,c)=>cycle.forEach((id,k)=>vertices.set(knot(c,k),4*id)));
export function chartPoint(id,axis=1,merge=0) {
  checkId(id);
  return chartRotate(resolve(vertices.subarray(id*4,id*4+4),release(merge)),axis);
}

// Source-native factor and F sampling in Assembly. All 45,000 topological
// edges are accessible independently of the drawn subset.
const factorEdges=[];
for (let frame=0; frame<5; frame++) for (let i=0; i<factorPairs.length; i+=20) {
  factorEdges.push(factorPairs[i].map(x=>x+frame*1800));
}
export const chartSamples = Object.freeze({
  factorEdges, pathCycles:Array.from({length:90},(_,i)=>i*5),
  moverCycles:Array.from({length:450},(_,i)=>i),
  factorTotal:36000, fTotal:9000, factorStride:20, cycleStride:5
});
export function chartEdge(index) {
  if (!Number.isInteger(index)||index<0||index>=45000) throw new RangeError('Invalid edge index');
  if (index<36000) {
    const frame=Math.floor(index/7200);
    return factorPairs[index%7200].map(v=>1800*frame+v);
  }
  const v=index-36000;
  return [v,chartState(cycleById[v],stageById[v]+1)];
}

const templates=new Array(9000);
function pathKnots(id) {
  if (templates[id]) return templates[id];
  const c=cycleById[id], k=stageById[id], shift=(c*GOLDEN)%1, cuts=[k,k+1];
  for (let n=Math.floor(k/2+2*shift)-1; n<=Math.ceil((k+1)/2+2*shift)+1; n++) {
    const t=2*n-4*shift;
    if (t>k+1e-10 && t<k+1-1e-10) cuts.push(t);
  }
  cuts.sort((a,b)=>a-b);
  const knots=[knot(c,k)];
  function append(p) {
    const last=knots.at(-1);
    if (Math.hypot(...last.map((x,i)=>x-p[i]))>1e-9) knots.push(p);
  }
  for (let j=0; j<cuts.length-1; j++) {
    const lo=cuts[j],hi=cuts[j+1],side=torus(c,(lo+hi)/2)[1]<0?-1:1;
    append(knot(c,lo,side));
    for (let m=1; m<8; m++) {
      const t=k+m/8;
      if(t>lo+1e-10 && t<hi-1e-10) append(knot(c,t,side));
    }
    append(knot(c,hi,side));
  }
  append(knot(c,k+1));
  templates[id]=knots;
  return knots;
}

export function chartPath(id,axis=1,merge=0) {
  checkId(id);
  const m=release(merge), points=[], lengths=[];
  for(const p of pathKnots(id)) {
    const next=chartRotate(resolve(p,m),axis), last=points.at(-1);
    const distance=last?Math.hypot(next[0]-last[0],next[1]-last[1],next[2]-last[2]):0;
    if (last && distance<=1e-9) continue;
    points.push(next);
    lengths.push((lengths.at(-1)||0)+distance);
  }
  return {points,lengths};
}
export function chartSamplePath({points,lengths},fraction) {
  const length=lengths.at(-1), distance=Math.min(1,Math.max(0,fraction))*length;
  let j=1;
  while (j<points.length-1 && lengths[j]<distance) j++;
  const prior=points[j-1], heading=points[j].map((v,i)=>v-prior[i]);
  const span=lengths[j]-lengths[j-1], t=span?(distance-lengths[j-1])/span:0;
  return {point:prior.map((v,i)=>v+t*heading[i]),heading};
}

export function chartAt(id,fraction,axis=1,merge=0) {
  return chartSamplePath(chartPath(id,axis,merge),fraction);
}

// Source default orthographic camera, repacked independently of viewport placement.
export function chartOblique([x,y,z]) {
  const a=(x-z)/Math.sqrt(2), b=(x+z)/Math.sqrt(2);
  return [a,Math.sqrt(2/3)*y-b/Math.sqrt(3),y/Math.sqrt(3)+Math.sqrt(2/3)*b];
}
export function chartScreen(point,width,height) {
  const [x,y,depth]=chartOblique(point), scale=Math.min(width*.41,height*.40);
  return [width/2+scale*x,height/2-scale*y,depth];
}

// Each F segment stores two 4-coordinate knots, in the same format as vertices.
// The range for each sampled orbit is [start,end) in segment units. Coincident
// endpoints at merge 100 represent a zero-length piece of the original split seam.
let mesh;
export function chartMeshBuffers() {
  if (!mesh) {
    const segments=[],ranges=[];
    for (const c of chartSamples.pathCycles) {
      const start=segments.length/8;
      for (const id of cycles[c]) {
        const path=pathKnots(id);
        for(let j=1;j<path.length;j++) segments.push(...path[j-1],...path[j]);
      }
      ranges.push([start,segments.length/8]);
    }
    mesh={vertices,factorEdges:chartSamples.factorEdges,segments:new Float64Array(segments),ranges};
  }
  return mesh;
}
