import {CHART_SOURCE, chartCopies, chartMeshBuffers, chartPath, chartPoint, chartSamplePath, chartState} from './orthogonal-chart.js';
import {VolumeCamera, bindVolumeCamera} from './orthogonal-camera.js';
import {CMY, RGB, canvasSurface, drawDartHead, drawHeart, drawSitter} from './loop-view.js?v=orthogonal-1';
import {DART_PAIRS, dartPairAt} from './dart-orbits.js';

const AXES = ['X','Y','Z'];
const SEATS = [[-.28,-.025,.28],[.28,-.025,-.28]];
const TAU = 2*Math.PI;
const positiveMod = n => ((n%20)+20)%20;

function sourceView(camera,name) {
  camera.reset();
  if(name==='x')camera.turn(0,-Math.PI/2,0);
  if(name==='y')camera.turn(Math.PI/2,0,0);
  if(name==='oblique'){
    camera.turn(0,-Math.PI/4,0);
    camera.turn(Math.atan(1/Math.sqrt(2)),0,0);
  }
}

// The source uses an orthographic camera. These screen bases are the projections
// of its three chart axes, reused for the many field samples between camera moves.
function projection(camera,w,h) {
  const scale=Math.min(w*.41,h*.40)*camera.zoom;
  const cx=w/2+camera.panX,cy=h/2+camera.panY;
  const basis=[[1,0,0],[0,1,0],[0,0,1]].map(p=>camera.rotate(p));
  function coordinates(x,y,z,axes=basis) {
    const [a,b,c]=axes;
    return {x:cx+scale*(a[0]*x+b[0]*y+c[0]*z),
      y:cy-scale*(a[1]*x+b[1]*y+c[1]*z),z:a[2]*x+b[2]*y+c[2]*z};
  }
  const chartBasis=[
    [basis[2],basis[0],basis[1]],basis,[basis[1],basis[2],basis[0]]
  ];
  return {cx,cy,scale,world:p=>coordinates(...p),copy:(p,axis)=>coordinates(...p,chartBasis[axis]),
    packed:(array,off,split,axis)=>coordinates(array[off],array[off+1]+array[off+3]*split,array[off+2],chartBasis[axis])};
}

function drawAxes(ctx,screen,copies) {
  ctx.save();ctx.font='bold 11px monospace';ctx.textAlign='center';ctx.textBaseline='middle';
  for(const {axis,color,name} of copies){
    const a=[0,0,0];a[axis]=1.17;
    const pos=screen.world(a),neg=screen.world(a.map(v=>-v));
    ctx.strokeStyle=color;ctx.lineWidth=.8;ctx.globalAlpha=.29;ctx.setLineDash([2,6]);
    ctx.beginPath();ctx.moveTo(neg.x,neg.y);ctx.lineTo(screen.cx,screen.cy);ctx.stroke();
    ctx.setLineDash([]);ctx.globalAlpha=.54;ctx.beginPath();ctx.moveTo(screen.cx,screen.cy);ctx.lineTo(pos.x,pos.y);ctx.stroke();
    const dx=pos.x-screen.cx,dy=pos.y-screen.cy,d=Math.hypot(dx,dy);
    if(d>12){ctx.fillStyle=color;ctx.globalAlpha=.95;ctx.fillText(name,pos.x+dx/d*9,pos.y+dy/d*9);}
  }
  ctx.restore();
}
function drawPlate(ctx,w,h,screen,mesh,merge,light,copies) {
  const bg=ctx.createRadialGradient(w/2,h*.47,0,w/2,h*.47,Math.max(w,h)*.68);
  bg.addColorStop(0,'#18293b');bg.addColorStop(.68,'#0a1825');bg.addColorStop(1,'#070f18');
  ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
  if(!light)return;
  drawAxes(ctx,screen,copies);
  const split=1-merge/100;
  ctx.save();
  for(const {axis,color} of copies){
    ctx.strokeStyle=color;ctx.lineJoin='round';ctx.lineWidth=.62;
    ctx.globalAlpha=.018*light;ctx.beginPath();
    for(const [a,b] of mesh.factorEdges){
      const p=screen.packed(mesh.vertices,a*4,split,axis),q=screen.packed(mesh.vertices,b*4,split,axis);
      ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
    }
    ctx.stroke();
    // Source Assembly samples every fifth orbit. Stroke successive orbits in
    // small groups so their crossings remain visible at mobile scale.
    ctx.lineWidth=.7;ctx.globalAlpha=.023*light;
    for(let i=0;i<mesh.ranges.length;i++){
      if(i%30===0)ctx.beginPath();
      const [start,end]=mesh.ranges[i];
      for(let j=start*8;j<end*8;j+=8){
        const p=screen.packed(mesh.segments,j,split,axis),q=screen.packed(mesh.segments,j+4,split,axis);
        ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
      }
      if(i%30===29||i===mesh.ranges.length-1)ctx.stroke();
    }
  }
  ctx.restore();
}

function markArrow(path,p,back,size) {
  const dx=p.x-back.x,dy=p.y-back.y,n=Math.hypot(dx,dy);
  if(n<.01)return;
  const x=dx/n*size,y=dy/n*size;
  path.moveTo(p.x+x,p.y+y);
  path.lineTo(p.x-x-y*.59,p.y-y+x*.59);
  path.lineTo(p.x-x+y*.59,p.y-y-x*.59);
  path.closePath();
}

// Render only the part of each stepped path already traversed. Fractions have
// the source's displayed arc-length parametrisation, including crossing bridges.
function appendTrace(ctx,path,start,finish,screen) {
  const a=screen.world(chartSamplePath(path,start).point);
  ctx.moveTo(a.x,a.y);
  const d=path.lengths.at(-1);
  for(let j=1;j<path.points.length-1;j++){
    if(path.lengths[j]<=start*d||path.lengths[j]>=finish*d)continue;
    const p=screen.world(path.points[j]);ctx.lineTo(p.x,p.y);
  }
  const b=screen.world(chartSamplePath(path,finish).point);
  ctx.lineTo(b.x,b.y);
}

export function orthogonalRenderer(canvas,onChange) {
  const camera=new VolumeCamera();
  let cameraName='oblique',axis=2,merge=0,light=.65,allCharts=true;
  let plate=null,dirty=true,screen=null,viewSize='',phaseKey='',fieldPaths=[];
  let orbitPaths=new Map();
  function view(name){
    if(!['oblique','x','y','z'].includes(name))return;
    sourceView(camera,name);cameraName=name;dirty=true;
  }
  view('oblique');
  function gesture(){cameraName='custom';dirty=true;onChange();}
  function reset(){view('oblique');onChange();}
  bindVolumeCamera(canvas,camera,gesture,reset,reset);
  function setting(key,value) {
    if(key==='camera')view(value);
    if(key==='copy'){axis=Number(value);orbitPaths.clear();dirty=true;}
    if(key==='others'){allCharts=Boolean(value);dirty=true;}
    if(key==='merge'){merge=Number(value);phaseKey='';orbitPaths.clear();dirty=true;}
    if(key==='light'){light=Number(value)/100;dirty=true;}
  }
  function pathFor(pair,side,step) {
    const addr=side?DART_PAIRS[pair].complementaryTrajectory:DART_PAIRS[pair].trajectory;
    const id=addr[positiveMod(step)];
    if(!orbitPaths.has(id))orbitPaths.set(id,chartPath(id,axis,merge));
    return orbitPaths.get(id);
  }
  function visibleCopies(){return allCharts?chartCopies:[chartCopies[axis]];}
  function markerBatches(step,fraction,w,copies) {
    // All chart copies rotate the same unscaled reference vectors. Resolve each
    // of the 450 reference movers just once per frame.
    const key=step+'/'+merge;
    if(key!==phaseKey){
      fieldPaths=Array.from({length:450},(_,c)=>chartPath(chartState(c,step),1,merge));
      phaseKey=key;
    }
    const batches=[0,1,2].map(()=>[new Path2D(),new Path2D()]);
    const radius=Math.max(1.25,Math.min(w<540?2.55:3,screen.scale*.014));
    for(const path of fieldPaths){
      const {point,heading}=chartSamplePath(path,fraction);
      const previous=point.map((n,j)=>n-heading[j]);
      for(const {axis} of copies){
        const p=screen.copy(point,axis),b=screen.copy(previous,axis);
        markArrow(batches[axis][p.z>0?1:0],p,b,radius);
      }
    }
    return batches;
  }
  function paintMarkers(ctx,batches,front) {
    ctx.save();ctx.globalAlpha=(front?.85:.62)*light;
    for(const c of chartCopies){ctx.fillStyle=c.color;ctx.fill(batches[c.axis][front?1:0]);}
    ctx.restore();
  }
  function sitters(ctx,state) {
    const r=screen.scale*.445;
    const seats=SEATS.map((pos,i)=>({p:screen.world(pos),i})).sort((a,b)=>a.p.z-b.p.z);
    for(const {p,i} of seats){
      const col=i?RGB[0]:CMY[0],side=i?'B':'A';
      ctx.save();ctx.fillStyle='#050d17aa';ctx.beginPath();ctx.ellipse(p.x,p.y+.77*r,r*.69,r*.105,0,0,TAU);ctx.fill();ctx.restore();
      drawSitter(ctx,p.x,p.y,r,side);
      drawHeart(ctx,p.x+(i?-1:1)*r*.045,p.y-r*.102,r,i?state.clocks.phaseB:state.clocks.phaseA,col);
    }
    return seats;
  }
  function paintTrails(ctx,drawn,selected,tail) {
    const start=Math.max(0,drawn-tail),k0=Math.floor(start),k1=Math.ceil(drawn);
    ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
    for(const i of selected)for(let side=0;side<2;side++){
      ctx.strokeStyle=(side?RGB:CMY)[i];ctx.setLineDash(side?[3.3,3.4]:[]);
      ctx.lineWidth=side?1.7:1.6;
      for(let k=k0;k<k1;k++){
        const lo=Math.max(0,start-k),hi=Math.min(1,drawn-k);if(hi<=lo)continue;
        ctx.globalAlpha=.19+.68*((k+hi-start)/Math.max(1,drawn-start));
        ctx.beginPath();appendTrace(ctx,pathFor(i,side,k),lo,hi,screen);ctx.stroke();
      }
    }
    ctx.restore();
  }
  function paintHeads(ctx,drawn,selected){
    const step=Math.floor(drawn),f=drawn-step;
    for(const i of selected)for(let side=0;side<2;side++){
      const pos=chartSamplePath(pathFor(i,side,step),f).point;
      drawDartHead(ctx,screen.world(pos),(side?RGB:CMY)[i],side,Math.max(3,Math.min(4.7,screen.scale*.024)));
    }
  }
  function draw(state,{pair,tail}){
    const {ctx,w,h,dpr}=canvasSurface(canvas);if(!w||!h)return;
    const geometry=[w,h,dpr].join('/');
    if(geometry!==viewSize){
      plate=document.createElement('canvas');plate.width=canvas.width;plate.height=canvas.height;
      viewSize=geometry;dirty=true;
    }
    if(dirty){
      screen=projection(camera,w,h);
      const base=plate.getContext('2d');base.setTransform(dpr,0,0,dpr,0,0);
      drawPlate(base,w,h,screen,chartMeshBuffers(),merge,light,visibleCopies());
      dirty=false;
    }
    ctx.drawImage(plate,0,0,w,h);
    const step=Math.floor(state.drawn),f=state.drawn-step;
    const batches=light>0?markerBatches(positiveMod(step),f,w,visibleCopies()):null;
    if(batches)paintMarkers(ctx,batches,false);
    const selected=pair==='all'?[0,1,2]:[Number(pair)];
    paintTrails(ctx,state.drawn,selected,tail);
    const seats=sitters(ctx,state);
    if(batches)paintMarkers(ctx,batches,true);
    paintHeads(ctx,state.drawn,selected);
    ctx.save();
    ctx.font='600 '+(w<530?10:12)+'px monospace';ctx.textAlign='center';ctx.lineWidth=3;ctx.strokeStyle='#0a1524';
    for(const {p,i} of seats){
      const text=i?'B · RGB':'A · CMY',y=p.y+screen.scale*.432;
      ctx.strokeText(text,p.x,y);ctx.fillStyle=i?'#f6b5c4':'#a8f2e7';ctx.fillText(text,p.x,y);
    }
    ctx.restore();
  }
  function registration(state) {
    const f=state.drawn-Math.floor(state.drawn);
    return {source:CHART_SOURCE,copy:AXES[axis],visibleCopies:visibleCopies().map(c=>c.name),mergePercent:merge,brightness:Math.round(100*light),
      camera:{name:cameraName,quaternion:[...camera.q],zoom:camera.zoom,panPixels:[camera.panX,camera.panY],
        viewport:[canvas.clientWidth,canvas.clientHeight]},sitterLocations:SEATS,
      displayedStep:state.drawn,registered:DART_PAIRS.map((_,i)=>{
        const {a,b}=dartPairAt(i,state.n);
        const site=(id,side)=>({id,chartXYZ:chartPoint(id,axis,merge),
          displayedXYZ:chartSamplePath(pathFor(i,side,Math.floor(state.drawn)),f).point});
        return {a:site(a.id,0),b:site(b.id,1)};
      })};
  }
  return {draw,setting,registration,get cameraName(){return cameraName;},get copy(){return AXES[axis];}};
}
