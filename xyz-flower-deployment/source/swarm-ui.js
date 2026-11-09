'use strict';
function drawSwarm(){
 const all=[0,1,2].every(planeVisible),selected=S.swRoute-1;
 const routes=S.swOnly?[selected]:Array.from({length:450},(_,r)=>r);
 const samples=routes.map(r=>{const a=SwarmModel.sample(r,phase,native,S.swDepth/100,M,S.swStagger);a.z=a.points.reduce((sum,p)=>sum+rotate(p)[2],0)/3;return a;}).sort((a,b)=>b.z-a.z);
 if(S.swTails)drawSwarmTails(samples);
 for(const a of samples){const chosen=a.route===selected&&S.swWhiteArrows,p=a.points,col=chosen?colors.white:planeColors[a.route%3];
  if(all&&S.swFace){ctx.globalAlpha=S.swFace/100*(chosen?1:.32);ctx.fillStyle=col;ctx.beginPath();p.forEach((v,i)=>{const q=project(v);i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]);});ctx.closePath();ctx.fill();ctx.globalAlpha=1;}
  if(all)line([...p,p[0]],col,chosen?Math.sqrt(S.swEdges/100):S.swEdges/100*.65,chosen?1.8:.6);
  if(S.swVertices)for(let i=0;i<3;i++)if(planeVisible(i)){ctx.globalAlpha=S.swVertices/100;triangle(p[i],a.next[i],planeColors[i],chosen?4.5:2,chosen);ctx.globalAlpha=1;}
 }
 if(S.labels){const a=SwarmModel.sample(selected,phase,native,S.swDepth/100,M,S.swStagger);a.points.forEach((p,i)=>{if(planeVisible(i))label(p.map((v,j)=>v+(j===1?.075:0)),planeNames[i]+' · F'+S.swRoute,planeColors[i],10);});}
}
function drawSwarmTails(samples){
 // Recover recent route positions from the same registered clock; tails are time traces.
 const steps=3,segments=12,gain=S.swTails/100;
 for(const a of samples){
  const points=Array.from({length:segments+1},(_,j)=>M.flowerPoint(a.route,a.phase-steps+j*steps/segments,native.cycles,S.swDepth/100));
  for(let plane=0;plane<3;plane++)if(planeVisible(plane)){
   const projected=points.map(p=>project(M.planePoint(p,plane)));
   for(let section=0;section<3;section++){
    ctx.globalAlpha=gain*[.12,.4,.8][section];ctx.strokeStyle=planeColors[plane];ctx.lineWidth=1;ctx.beginPath();
    for(let j=section*4;j<=section*4+4;j++){const p=projected[j];j===section*4?ctx.moveTo(p[0],p[1]):ctx.lineTo(p[0],p[1]);}ctx.stroke();
   }
  }
 }
 ctx.globalAlpha=1;
}
function updateSwarmReadout(){
 const a=SwarmModel.sample(S.swRoute-1,phase,native,S.swDepth/100,M,S.swStagger),planes=[0,1,2].filter(planeVisible).length,count=S.swOnly?1:450;
 $('readoutLabel').textContent='TRIANGLES / CORNERS';$('stateReadout').textContent=(planes===3?count:0)+' / '+count*planes;
 $('phaseLabel').textContent='F'+S.swRoute+' · STEP';$('phaseReadout').textContent=(a.step+1)+' / 20';
 $('checkLabel').textContent='TRANSPORT';$('checkReadout').textContent='F²⁰ = I';
 $('swMetrics').textContent='Active routes   '+count+' / 450\nVisible corners '+count*planes+'\nSelected route  F'+S.swRoute+'\nNative state    '+a.id+' → '+a.nextId+'\nPhase           '+(S.swStagger?'route offsets':'synchronized')+'\nReturn          20 steps'+(planes<3?'\nFaces hidden: a plane is off':'');
}
$('swPrevious').onclick=()=>triangleStep(-1);$('swNext').onclick=()=>triangleStep(1);
$('swReceipt').onclick=()=>download('450-route-triangles.json',JSON.stringify({schema:'thalean.route-triangles.v1',source:DATA.transport.sourceAuditSHA256,phase,depth:S.swDepth/100,stagger:S.swStagger,counts:{nativeRoutes:450,geometricTriangles:450,drawingCorners:1350},display:{whiteSelectionArrows:S.swWhiteArrows,tailOpacity:S.swTails/100,tailSteps:3,onlySelected:S.swOnly,selectedRoute:S.swRoute,visiblePlanes:[S.planeXY,S.planeXZ,S.planeYZ]},routes:Array.from({length:450},(_,r)=>SwarmModel.sample(r,phase,native,S.swDepth/100,M,S.swStagger)),scope:'Three planar drawings of the same native route state form each triangle. Edges are display geometry, not native graph adjacency. No hydrogen evolution.'},null,2),'application/json');
