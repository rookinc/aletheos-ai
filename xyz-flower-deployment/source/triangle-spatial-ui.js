'use strict';
let spatialDataKey='',spatialDrawKey='',spatialData=null,spatialPaths=[],spatialMaxGap=0;
function getSpatialTriangle(){
 const key=S.triOrbit+':'+S.flowerDepth;
 if(key!==spatialDataKey){spatialData=TriangleSpatial.build(triangleAtlas.orbits[S.triOrbit],native,S.flowerDepth/100,M,TriangleModel,TriangleSpectrum);spatialDataKey=key;}
 const drawKey=key+':'+S.triSpatialK+':'+S.triSpatialStyle;
 if(drawKey!==spatialDrawKey){
  spatialDrawKey=drawKey;spatialPaths=[[],[],[]];spatialMaxGap=0;
  for(let j=0;j<=120;j++){const pts=TriangleSpatial.sample(spatialData,j/6,S.triSpatialK,S.triSpatialStyle);pts.forEach((p,i)=>spatialPaths[i].push(p));}
  for(let k=0;k<20;k++){const pts=TriangleSpatial.sample(spatialData,k,S.triSpatialK,S.triSpatialStyle);for(let i=0;i<3;i++)spatialMaxGap=Math.max(spatialMaxGap,Math.hypot(...pts[i].map((v,j)=>v-spatialData.nativeSamples[k][i][j])));}
 }
 return spatialData;
}
function drawSpatialTriangle(){
 if(!triActive()||!S.triSpatial||!S.triSpatialFade)return;
 const data=getSpatialTriangle(),p=TriangleSpatial.sample(data,phase,S.triSpatialK,S.triSpatialStyle),next=TriangleSpatial.sample(data,phase+.025,S.triSpatialK,S.triSpatialStyle),fade=S.triSpatialFade/100;
 if(S.triSpatialPaths)for(let i=0;i<3;i++)if(planeVisible(i))line(spatialPaths[i],colors.gold,fade*.5,1.1,[4,3]);
 if([0,1,2].every(planeVisible)){
  ctx.save();ctx.globalAlpha=fade*.22;ctx.fillStyle=colors.gold;ctx.beginPath();p.forEach((v,i)=>{const a=project(v);i?ctx.lineTo(a[0],a[1]):ctx.moveTo(a[0],a[1]);});ctx.closePath();ctx.fill();ctx.restore();
  line([...p,p[0]],colors.gold,fade,2);
 }
 for(let i=0;i<3;i++)if(planeVisible(i)){
  ctx.globalAlpha=fade;
  if(Math.hypot(...p[i].map((v,j)=>v-next[i][j]))>1e-10)triangle(p[i],next[i],colors.gold,6.5);else dot(p[i],4,colors.gold,fade,true);
  ctx.globalAlpha=1;
  if(S.labels){ctx.globalAlpha=fade;label(p[i].map((v,j)=>v+(j===1?-.085:0)),planeNames[i]+' · '+(S.triSpatialStyle?'≤':'k')+S.triSpatialK,colors.gold,9);ctx.globalAlpha=1;}
 }
}
function updateSpatialReadout(){
 const data=getSpatialTriangle(),p=TriangleSpatial.sample(data,phase,S.triSpatialK,S.triSpatialStyle),ref=triSample().points;
 const gap=Math.max(...p.map((v,i)=>Math.hypot(...v.map((x,j)=>x-ref[i][j]))));
 $('spatialMetrics').textContent=(S.triSpatialK===0?'Mean positions (DC)':(S.triSpatialStyle?'Mean + harmonics 1…':'Mean + harmonic ')+S.triSpatialK)+'\nCurrent gap      '+gap.toExponential(2)+'\n20-step max gap  '+spatialMaxGap.toExponential(2)+'\nAll-mode error   '+data.maxReconstructionError.toExponential(2)+'\nUnits            drawing coordinates'+(![0,1,2].every(planeVisible)?'\nFace hidden: a plane is off':'');
}
$('spectrumOnGraph').onclick=()=>{
 S.triEnabled=true;S.triSpatial=true;S.flowerLayout=1;S.triFace=Math.min(S.triFace,12);$('triangleSpectrum').close();sync();setView('flower');updateTriangleReadout();
};
$('spatialReceipt').onclick=()=>{
 const data=getSpatialTriangle(),orbit=triangleAtlas.orbits[S.triOrbit];download('triangle-spatial-fourier.json',JSON.stringify({schema:'thalean.triangle-spatial-fourier.v1',source:DATA.hydrogenBundle.provenance,routes:orbit.routes.map(r=>r+1),seeds:orbit.seeds,phase,depth:S.flowerDepth/100,harmonic:S.triSpatialK,construction:S.triSpatialStyle?'mean plus harmonics1..k':'mean plus harmonic k',sampledMaxCornerGap:spatialMaxGap,reconstructed:TriangleSpatial.sample(data,phase,S.triSpatialK,S.triSpatialStyle),native:triSample(),data,scope:'Fourier modes of the nine corner coordinates, not the scalar area spectrum. Reconstructed edges are drawing geometry, not new graph edges. Complete modes match integer samples; fractional phases use trigonometric interpolation.'},null,2),'application/json');
};
