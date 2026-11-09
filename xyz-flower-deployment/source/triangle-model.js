'use strict';
// Native graph triangles registered to the existing F darts. No dynamics are changed.
const TriangleModel=(()=>{
 const mod=(x,n)=>(x%n+n)%n;
 const key=ids=>ids.slice().sort((a,b)=>a-b).join(',');
 function build(transport,graphEdges){
  const N=transport.F.length,period=20;
  if(N!==9000||graphEdges.length!==90000||new Set(transport.F).size!==N)throw Error('Unsupported triangle carrier');
  const adj=Array.from({length:N},()=>new Set()),route=new Int32Array(N).fill(-1),step=new Int8Array(N).fill(-1);
  for(let j=0;j<graphEdges.length;j+=2){const a=graphEdges[j],b=graphEdges[j+1];if(!Number.isInteger(a)||!Number.isInteger(b)||a<0||b<0||a>=N||b>=N||a===b||adj[a].has(b))throw Error('Invalid triangle graph edge');adj[a].add(b);adj[b].add(a);}
  transport.cycles.forEach((cycle,r)=>{if(cycle.length!==period)throw Error('Unsupported F cycle');cycle.forEach((id,k)=>{if(route[id]!==-1||transport.F[id]!==cycle[(k+1)%period])throw Error('Triangle F registration failed');route[id]=r;step[id]=k;});});
  if(route.some(r=>r<0))throw Error('Incomplete triangle registration');
  for(let j=0;j<graphEdges.length;j+=2)if(!adj[transport.F[graphEdges[j]]].has(transport.F[graphEdges[j+1]]))throw Error('F does not preserve triangle graph adjacency');
  let triangles=0,alignedTriangles=0;const crossKeys=new Set(),aligned=new Map();
  for(let a=0;a<N;a++)for(const b of adj[a])if(b>a)for(const c of adj[b])if(c>b&&adj[a].has(c)){
   triangles++;const ids=[a,b,c];if(new Set(ids.map(id=>route[id]%3)).size!==3)continue;crossKeys.add(key(ids));
   if(step[a]===step[b]&&step[b]===step[c]){
    alignedTriangles++;const routes=ids.map(id=>route[id]).sort((x,y)=>x%3-y%3),seeds=routes.map(r=>transport.cycles[r][0]);
    aligned.set(key(seeds),{routes,seeds,graphDistances:[1,1,1]});
   }
  }
  let crossPlaneOrbits=0;const seen=new Set();
  for(const first of crossKeys)if(!seen.has(first)){
   crossPlaneOrbits++;let ids=first.split(',').map(Number);const orbitKeys=new Set();
   for(let k=0;k<period;k++){const q=key(ids);if(!crossKeys.has(q)||orbitKeys.has(q))throw Error('Invalid cross-plane triangle orbit');orbitKeys.add(q);seen.add(q);ids=ids.map(id=>transport.F[id]);}
   if(key(ids)!==first)throw Error('Triangle orbit does not close');
  }
  const orbits=Array.from(aligned.values()).sort((a,b)=>{const x=a.seeds.slice().sort((a,b)=>a-b),y=b.seeds.slice().sort((a,b)=>a-b);for(let i=0;i<3;i++)if(x[i]!==y[i])return x[i]-y[i];return 0;});
  for(const orbit of orbits)for(let k=0;k<period;k++){
   const ids=orbit.routes.map(r=>transport.cycles[r][k]);if(!adj[ids[0]].has(ids[1])||!adj[ids[1]].has(ids[2])||!adj[ids[2]].has(ids[0]))throw Error('Aligned triangle lost adjacency');
  }
  if(alignedTriangles!==orbits.length*period||crossKeys.size!==crossPlaneOrbits*period)throw Error('Triangle orbit counts disagree');
  const exampleIndex=orbits.findIndex(o=>key(o.seeds)==='3,35,46');if(exampleIndex<0)throw Error('Verified example is missing');
  return {orbits,exampleIndex,counts:{triangles,crossPlaneTriangles:crossKeys.size,crossPlaneOrbits,alignedTriangles,alignedOrbits:orbits.length,verifiedFEdges:graphEdges.length/2,period},scope:'Native adjacency is verified at integer F steps; interpolation and filled faces are display geometry. Selectable orbits use equal canonical cycle steps; corner darts must use this shared phase instead of the optional per-route display staggering.'};
 }
 function sample(orbit,phase,transport,depth,model){
  if(!Number.isFinite(phase)||!Number.isFinite(depth))throw Error('Invalid triangle display parameter');
  const cyclePhase=mod(phase,20),step=Math.floor(cyclePhase),fraction=cyclePhase-step;
  const points=orbit.routes.map(r=>model.xyzFlowerPoint(r,cyclePhase,transport.cycles,depth)),ids=orbit.routes.map(r=>transport.cycles[r][step]),nextIds=orbit.routes.map(r=>transport.cycles[r][(step+1)%20]);
  const a=points[1].map((v,i)=>v-points[0][i]),b=points[2].map((v,i)=>v-points[0][i]);
  const cross=[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],norm=Math.hypot(...cross);
  return {points,ids,nextIds,phase:cyclePhase,step,fraction,area:norm/2,normal:norm>1e-14?cross.map(v=>v/norm):null,centroid:[0,1,2].map(i=>points.reduce((s,p)=>s+p[i],0)/3),sideLengths:[[0,1],[1,2],[2,0]].map(([i,j])=>Math.hypot(...points[i].map((v,k)=>v-points[j][k]))),graphDistances:orbit.graphDistances.slice(),integerStep:fraction<1e-10};
 }
 return {build,sample};
})();
if(typeof module!=='undefined')module.exports=TriangleModel;
