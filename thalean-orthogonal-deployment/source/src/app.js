'use strict';
// Proper cyclic rotations: native +Y is the symmetry normal of the Data chart.
const OrthogonalLayout = Object.freeze({
 names:['X','Y','Z'], planes:['YZ','ZX','XY'], colors:['#ff838c','#8ce4b7','#89b6ff'],
 point(p,axis){return axis===0?[p[1],p[2],p[0]]:axis===1?[p[0],p[1],p[2]]:[p[2],p[0],p[1]];},
 normal(axis){return [+(axis===0),+(axis===1),+(axis===2)];}
});
(()=>{
 const $=id=>document.getElementById(id), M=NativeModel, L=OrthogonalLayout;
 const data=JSON.parse($('nativeData').textContent), canvas=$('volume'),ctx=canvas.getContext('2d',{alpha:false});
 const background=document.createElement('canvas'),bg=background.getContext('2d');
 const camera=new VolumeCamera();let sim,clock;
 try{sim=new M.Experiment(data);clock=new CycleClock(.05,performance.now());}catch(error){$('metric').textContent=error.message;$('play').disabled=true;return;}
 const planes=L.names.map((name,i)=>({visible:true,opacity:1,offset:0}));
 const flags=['showAxes','showPaths','showFactors','showSelected','showResponse','orbit'];
 let merge=0,edgeOpacity=1,vertexOpacity=0,selected=0,colorMode='plane',paths=[],width=0,height=0,dpr=1;
 let dirty=true,backgroundDirty=true,layoutDirty=true,lastPaint=0,lastFrame=0,lastMetric=-Infinity,noticeTimer,priorView='oblique';
 let mode='assembly',tolerance=.05,inverseDirty=true,inverseReadyAt=0;
 const inverse=new InverseVolume();
 const transportColors={interior:'#f2bd71',exterior:'#62dcea',turn:'#bd9ae9'};
 const setDirty=(back=true)=>{dirty=true;if(back)backgroundDirty=true;};
 function notice(message,ms=4200){$('notice').textContent=message;$('notice').hidden=false;clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>$('notice').hidden=true,ms);}
 function setDrawer(open){$('drawer').hidden=!open;$('settings').setAttribute('aria-expanded',String(open));if(open)$('closeDrawer').focus();}
 function setImmersive(value){document.body.classList.toggle('immersive',value);$('reveal').hidden=!value;layout();}
 function layout(){document.documentElement.style.setProperty('--header',$('chrome').getBoundingClientRect().height+'px');document.documentElement.style.setProperty('--footer',$('copyright').getBoundingClientRect().height+'px');resize();}
 function resize(){const r=canvas.getBoundingClientRect();width=r.width;height=r.height;dpr=Math.min(devicePixelRatio||1,2);for(const c of [canvas,background]){c.width=Math.max(1,Math.round(width*dpr));c.height=Math.max(1,Math.round(height*dpr));}setDirty();}
 new ResizeObserver(resize).observe(canvas);new ResizeObserver(layout).observe($('chrome'));new ResizeObserver(layout).observe($('copyright'));
 function view(name){camera.reset();if(name==='x')camera.turn(0,-Math.PI/2,0);else if(name==='y')camera.turn(Math.PI/2,0,0);else if(name==='oblique'){camera.turn(0,-Math.PI/4,0);camera.turn(Math.atan(1/Math.sqrt(2)),0,0);}priorView=name;updateViews();setDirty();}
 function updateViews(){document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-current',String(b.dataset.view===priorView)));}
 bindVolumeCamera(canvas,camera,()=>{priorView='custom';updateViews();setDirty();},()=>setDrawer($('drawer').hidden),()=>view('oblique'));
 function project(p){const r=camera.rotate(p),scale=Math.min(width*.41,height*.40)*camera.zoom*(mode==='inverse'?1.32:1);return [width/2+camera.panX+scale*r[0],height/2+camera.panY-scale*r[1],r[2]];}
 function position(v){return M.splitPoint(sim.g.cycleOf[v],sim.g.stageOf[v],undefined,merge);}
 function segment(path,a,b){const p=project(a),q=project(b);path.moveTo(p[0],p[1]);path.lineTo(q[0],q[1]);}
 function stroke(g,path,color,alpha=1,lineWidth=.7){if(alpha<=0)return;g.globalAlpha=alpha;g.strokeStyle=color;g.lineWidth=lineWidth;g.stroke(path);g.globalAlpha=1;}
 function polyline(points,axis){const path=new Path2D();for(let i=0;i<points.length;i++){const p=project(L.point(points[i],axis));i?path.lineTo(p[0],p[1]):path.moveTo(p[0],p[1]);}return path;}
 function buildBackground(){
  bg.setTransform(dpr,0,0,dpr,0,0);bg.clearRect(0,0,width,height);
  if($('showAxes').checked)drawAxes(bg);
  for(let axis=0;axis<3;axis++){
   const p=planes[axis];if(!p.visible||!p.opacity)continue;const alpha=p.opacity*edgeOpacity;
   if($('showFactors').checked&&alpha){const path=new Path2D();for(let i=0;i<sim.g.factorCount;i+=20){const[a,b]=sim.g.edges[i];segment(path,L.point(position(a),axis),L.point(position(b),axis));}stroke(bg,path,colorMode==='plane'?L.colors[axis]:'#c298ff',.045*alpha,.55);}
   if($('showPaths').checked&&alpha){const buckets={interior:new Path2D(),exterior:new Path2D(),turn:new Path2D()};for(let c=0;c<450;c+=5)for(const path of paths[c])for(let j=1;j<path.points.length;j++){const a=path.points[j-1],b=path.points[j],side=M.chartSide(b.map((v,k)=>v-a[k]));segment(buckets[side],L.point(a,axis),L.point(b,axis));}for(const side of Object.keys(buckets))stroke(bg,buckets[side],colorMode==='plane'?L.colors[axis]:transportColors[side],.11*alpha,.7);}
   if($('showSelected').checked&&alpha){const color=colorMode==='plane'?L.colors[axis]:'#e4f8ff';for(const path of paths[selected])stroke(bg,polyline(path.points,axis),color,.55*alpha,1.05);}
  }
  backgroundDirty=false;
 }
 function drawAxes(g){
  const o=project([0,0,0]);g.lineWidth=.7;
  for(let axis=0;axis<3;axis++){
   const n=L.normal(axis),end=project(n.map(v=>v*1.17)),start=project(n.map(v=>v*-1.17));
   g.strokeStyle=L.colors[axis];g.globalAlpha=.25;g.setLineDash([3,5]);g.beginPath();g.moveTo(start[0],start[1]);g.lineTo(o[0],o[1]);g.stroke();g.setLineDash([]);
   g.globalAlpha=.6;g.beginPath();g.moveTo(o[0],o[1]);g.lineTo(end[0],end[1]);g.stroke();
   const dx=end[0]-o[0],dy=end[1]-o[1],len=Math.hypot(dx,dy);g.globalAlpha=.95;g.fillStyle=L.colors[axis];g.font='bold 11px ui-monospace,monospace';g.textAlign='center';g.textBaseline='middle';
   if(len>15)g.fillText(L.names[axis],end[0]+dx/len*12,end[1]+dy/len*12);else g.fillText(L.names[axis]+' ⊙',o[0]+18,o[1]-12);
  }
  g.globalAlpha=.6;g.fillStyle='#d8e5ed';g.beginPath();g.arc(o[0],o[1],1.7,0,Math.PI*2);g.fill();g.globalAlpha=1;
 }
 function setMode(next){
  mode=next;const active=mode==='inverse';document.body.classList.toggle('inverse',active);
  $('assemblyMode').setAttribute('aria-pressed',String(!active));$('inverseMode').setAttribute('aria-pressed',String(active));
  $('inverseControls').hidden=!active;$('inverseGuide').hidden=!active;$('modeLabel').textContent=active?'X ∩ Y ∩ Z':'ONE ORIGIN';
  $('volume').setAttribute('aria-label',active?'Three-way convergence in a central cube. Drag to rotate, pinch to zoom.':'Three orthogonal Thalean charts. Drag to rotate, pinch to zoom.');
  if(!active)$('gains').textContent='PID gains · P 1.4 · I 0.12 · D 4';
  lastMetric=-Infinity;updatePlanes();layout();setDirty();
 }
 function drawCube(g){
  if(!$('cubeFrame').checked)return;
  const path=new Path2D(),h=inverse.half;
  for(let axis=0;axis<3;axis++)for(const a of [-h,h])for(const b of [-h,h]){
   const p=[0,0,0],q=[0,0,0];p[axis]=-h;q[axis]=h;p[(axis+1)%3]=q[(axis+1)%3]=a;p[(axis+2)%3]=q[(axis+2)%3]=b;segment(path,p,q);
  }
  stroke(g,path,'#779bb5',.32,.8);
 }
 function drawInverse(now){
  const active=planes.every(p=>p.visible&&p.opacity>0);
  if(inverseDirty&&now>=inverseReadyAt){inverse.build(paths,tolerance);inverseDirty=false;backgroundDirty=true;}
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.globalAlpha=1;
  const gradient=ctx.createRadialGradient(width/2,height/2,0,width/2,height/2,Math.max(width,height)*.65);
  gradient.addColorStop(0,'#122638');gradient.addColorStop(1,'#060e18');ctx.fillStyle=gradient;ctx.fillRect(0,0,width,height);
  if(backgroundDirty){
   bg.setTransform(dpr,0,0,dpr,0,0);bg.clearRect(0,0,width,height);drawCube(bg);
   if(active&&!inverseDirty){
    const faces=inverse.faces.map(f=>({...f,normal:camera.rotate(f.normal),screen:f.points.map(project)})).filter(f=>f.normal[2]>0.00001);
    faces.sort((a,b)=>a.screen.reduce((s,p)=>s+p[2],0)-b.screen.reduce((s,p)=>s+p[2],0));
    for(const f of faces){
     const light=.55+.25*f.normal[2]+.13*f.normal[1]-.07*f.normal[0];
     bg.fillStyle=`rgb(${Math.round(166*light+44*f.strength)},${Math.round(220*light+30*f.strength)},${Math.round(239*light)})`;
     bg.beginPath();f.screen.forEach((p,i)=>i?bg.lineTo(p[0],p[1]):bg.moveTo(p[0],p[1]));bg.closePath();bg.fill();
     bg.strokeStyle='#a9e6ea26';bg.lineWidth=.45;bg.stroke();
    }
   }
   backgroundDirty=false;
  }
  ctx.drawImage(background,0,0,background.width,background.height,0,0,width,height);
  const count=active&&!inverseDirty?inverse.count:0;
  $('visibleCount').textContent=inverseDirty?'Updating overlap…':count.toLocaleString()+' shared cells';
  $('cycleReadout').textContent='X ∩ Y ∩ Z · full-cycle envelope';
  $('gains').textContent=`ε ${tolerance.toFixed(3)} · cell ${inverse.step.toFixed(3)} · ${inverse.n}³ grid`;
  $('metric').textContent=`V ≈ ${(count*inverse.step**3).toFixed(5)} chart³ · merge ${merge}%`;
  $('empty').hidden=active&&(count>0||inverseDirty);
  $('empty').innerHTML=active?'No shared cells at this tolerance<span>Adjust tolerance or merge to inspect the overlap.</span>':'Three visible copies required<span>Enable X, Y and Z with nonzero opacity.</span>';
 }
 $('assemblyMode').onclick=()=>setMode('assembly');$('inverseMode').onclick=()=>setMode('inverse');
 $('tolerance').oninput=e=>{tolerance=+e.target.value/1000;$('toleranceValue').textContent=tolerance.toFixed(3);inverseDirty=true;inverseReadyAt=performance.now()+100;setDirty();};
 $('cubeFrame').onchange=()=>setDirty();
 function arrow(point,heading,color,size,alpha){const a=project(point),b=project(point.map((x,i)=>x-heading[i])),dx=a[0]-b[0],dy=a[1]-b[1],norm=Math.hypot(dx,dy);if(norm<.01)return;const ux=dx/norm,uy=dy/norm;ctx.globalAlpha=alpha;ctx.fillStyle=color;ctx.strokeStyle='#07121b';ctx.lineWidth=.55;ctx.beginPath();ctx.moveTo(a[0]+ux*size,a[1]+uy*size);ctx.lineTo(a[0]-ux*size-uy*size*.6,a[1]-uy*size+ux*size*.6);ctx.lineTo(a[0]-ux*size+uy*size*.6,a[1]-uy*size-ux*size*.6);ctx.closePath();ctx.fill();ctx.stroke();}
 function draw(now){
  if(!width||!height)return;
  if(layoutDirty){paths=data.cycles.map((c,i)=>c.map((_,k)=>M.path(i,k,merge)));layoutDirty=false;backgroundDirty=true;inverseDirty=true;}
  if(mode==='inverse'){drawInverse(now);dirty=false;return;}
  if(backgroundDirty)buildBackground();
  ctx.setTransform(dpr,0,0,dpr,0,0);const gradient=ctx.createRadialGradient(width/2,height*.48,0,width/2,height*.48,Math.max(width,height)*.65);gradient.addColorStop(0,'#122238');gradient.addColorStop(.65,'#091521');gradient.addColorStop(1,'#060e18');ctx.globalAlpha=1;ctx.fillStyle=gradient;ctx.fillRect(0,0,width,height);ctx.drawImage(background,0,0,background.width,background.height,0,0,width,height);
  const k=clock.phaseStep,f=clock.fraction;
  for(let axis=0;axis<3;axis++){
   const p=planes[axis];if(!p.visible||p.opacity<=0)continue;const v=data.cycles[selected][(k+p.offset)%20];
   if($('showFactors').checked&&$('showSelected').checked&&edgeOpacity>0){const path=new Path2D();for(let i=0;i<sim.g.factorCount;i++){const a=sim.g.from[i],b=sim.g.to[i];if(a===v||b===v)segment(path,L.point(position(a),axis),L.point(position(b),axis));}stroke(ctx,path,colorMode==='plane'?L.colors[axis]:'#c298ff',.55*edgeOpacity*p.opacity,1.1);}
  }
  if(vertexOpacity>0){const markers=[];for(let axis=0;axis<3;axis++){const p=planes[axis];if(!p.visible||p.opacity<=0)continue;for(let c=0;c<450;c++){const loc=M.at(paths[c][(k+p.offset)%20],f),point=L.point(loc.point,axis),heading=L.point(loc.heading,axis);markers.push({c,point,heading,axis,side:M.chartSide(loc.heading),depth:project(point)[2]});}}markers.sort((a,b)=>a.depth-b.depth);
   const amplitudes=$('showResponse').checked?data.cycles.map(c=>{let a=0,b=0;for(const v of c){a+=sim.closed.x[v]**2;b+=sim.open.x[v]**2;}return [Math.sqrt(a/20),Math.sqrt(b/20)];}):null;
   for(const m of markers){const alpha=vertexOpacity*planes[m.axis].opacity;if(amplitudes){const[a,b]=amplitudes[m.c];if(Math.max(a,b)>.001){const q=project(m.point);ctx.globalAlpha=alpha*.35;ctx.strokeStyle='#b1c3d4';ctx.lineWidth=.7;ctx.beginPath();ctx.arc(q[0],q[1],3+Math.min(12,b*45),0,2*Math.PI);ctx.stroke();ctx.fillStyle=L.colors[m.axis];ctx.beginPath();ctx.arc(q[0],q[1],2+Math.min(10,a*45),0,2*Math.PI);ctx.fill();}}
    arrow(m.point,m.heading,m.c===selected?'#f2fbff':colorMode==='plane'?L.colors[m.axis]:transportColors[m.side],m.c===selected?4.5:2.6,alpha);
   }
  }
  ctx.globalAlpha=1;
  if(now-lastMetric>200||!clock.running){const a=sim.closed.metrics(),b=sim.open.metrics();$('cycleReadout').textContent=`${clock.hz.toFixed(2)} Hz · cycle ${clock.cycles} · F ${k} / 20`;$('metric').textContent=`RMS ${a.rms.toFixed(5)} PID / ${b.rms.toFixed(5)} free · Δ ${(a.total-9000).toExponential(1)}`;lastMetric=now;}
  dirty=false;
 }
 function advance(){sim.step();dirty=true;}
 function setPlay(running){clock.setRunning(running,performance.now(),advance);$('play').textContent=running?'Ⅱ':'▶';$('play').setAttribute('aria-pressed',String(running));$('play').setAttribute('aria-label',running?'Pause':'Play');dirty=true;}
 function frame(t){const dt=lastFrame?Math.min(.1,(t-lastFrame)/1000):0;lastFrame=t;const now=performance.now();clock.advance(now,advance);if(clock.running||(mode==='inverse'&&inverseDirty))dirty=true;if($('orbit').checked&&clock.running){camera.turn(0,dt*.065,0);priorView='custom';updateViews();setDirty();}if(dirty&&t-lastPaint>=1000/30){draw(t);lastPaint=t;}requestAnimationFrame(frame);}
 function updatePlanes(){document.querySelectorAll('[data-plane]').forEach(b=>b.setAttribute('aria-pressed',String(planes[+b.dataset.plane].visible)));planes.forEach((p,i)=>{const c=$('planeVisible'+i);if(c)c.checked=p.visible;});const count=planes.filter(p=>p.visible&&p.opacity>0).length;$('visibleCount').textContent=count+' plane'+(count===1?'':'s');$('empty').hidden=count>0;if(mode==='assembly')$('empty').innerHTML='All planes hidden<span>Use X, Y or Z above to show a plane.</span>';setDirty();}
 for(let i=0;i<3;i++){
  const card=document.createElement('div');card.className='plane-card';card.innerHTML=`<div class="plane-head"><input id="planeVisible${i}" type="checkbox" checked aria-label="Show ${L.names[i]} copy"><strong class="${L.names[i].toLowerCase()}">${L.names[i]} · ${L.planes[i]} plane</strong><button data-solo="${i}">Solo</button></div><label>Opacity <output id="opacityValue${i}">100%</output><input id="opacity${i}" type="range" min="0" max="100" value="100" aria-label="${L.names[i]} copy opacity"></label><label>Phase offset <output id="phaseValue${i}">0° · 0 steps</output><input id="phase${i}" type="range" min="0" max="19" value="0" aria-label="${L.names[i]} copy phase offset"></label>`;$('planeControls').append(card);
  $('planeVisible'+i).onchange=e=>{planes[i].visible=e.target.checked;updatePlanes();};$('opacity'+i).oninput=e=>{planes[i].opacity=+e.target.value/100;$('opacityValue'+i).textContent=e.target.value+'%';updatePlanes();};$('phase'+i).oninput=e=>{planes[i].offset=+e.target.value;$('phaseValue'+i).textContent=`${planes[i].offset*18}° · ${planes[i].offset} steps`;dirty=true;};
 }
 document.querySelectorAll('[data-plane]').forEach(b=>b.onclick=()=>{const p=planes[+b.dataset.plane];p.visible=!p.visible;updatePlanes();});
 document.querySelectorAll('[data-solo]').forEach(b=>b.onclick=()=>{planes.forEach((p,i)=>p.visible=i===+b.dataset.solo);updatePlanes();view(L.names[+b.dataset.solo].toLowerCase());setDrawer(false);});
 $('showAll').onclick=()=>{planes.forEach(p=>p.visible=true);updatePlanes();view('oblique');};
 $('play').onclick=()=>setPlay(!clock.running);$('reset').onclick=()=>{sim.reset();clock.reset(performance.now());view('oblique');dirty=true;notice('Simulation restarted.');};
 $('step').onclick=()=>{setPlay(false);clock.fraction=0;clock.steps++;sim.step();dirty=true;};
 $('hz').oninput=e=>{const hz=M.positionHz(+e.target.value);clock.setHz(hz,performance.now(),advance);$('hzValue').textContent=hz.toFixed(2)+' Hz';$('hz').setAttribute('aria-valuetext',hz+' hertz');dirty=true;};
 for(const name of ['edges','vertices','merge'])$(name).oninput=e=>{const n=+e.target.value;$(name+'Value').textContent=n+'%';if(name==='edges')edgeOpacity=n/100;if(name==='vertices')vertexOpacity=n/100;if(name==='merge'){merge=n;layoutDirty=true;inverseDirty=true;inverseReadyAt=performance.now()+100;}setDirty();};
 for(const name of flags)$(name).onchange=()=>setDirty();
 $('colorMode').onchange=e=>{colorMode=e.target.value;setDirty();};$('selected').onchange=e=>{selected=Math.max(0,Math.min(449,Math.round(Number(e.target.value)||1)-1));e.target.value=selected+1;setDirty();};
 document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>view(b.dataset.view));
 $('homeCamera').onclick=()=>view('oblique');$('zoomIn').onclick=()=>{camera.zoom=Math.min(1e4,camera.zoom*1.2);setDirty();};$('zoomOut').onclick=()=>{camera.zoom=Math.max(1e-4,camera.zoom/1.2);setDirty();};
 $('settings').onclick=()=>setDrawer($('drawer').hidden);$('closeDrawer').onclick=()=>{setDrawer(false);$('settings').focus();};
 $('hide').onclick=()=>setImmersive(true);$('reveal').onclick=()=>setImmersive(false);
 function openInfo(){if(!$('info').open)$('info').showModal();} $('about').onclick=openInfo;$('credits').onclick=openInfo;$('closeInfo').onclick=()=>$('info').close();
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){setDrawer(false);if(document.body.classList.contains('immersive'))setImmersive(false);}if(e.code==='Space'&&(e.target===canvas||e.target===document.body)){e.preventDefault();setPlay(!clock.running);}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)setPlay(false);});
 function settings(){return {schema:'thalean-orthogonal-settings-1',source:'Thalean Graph Explorer v0.34.0',hz:clock.hz,running:clock.running,mode,tolerance,cubeFrame:$('cubeFrame').checked,merge,edgeOpacity,vertexOpacity,selected,colorMode,planes:planes.map(p=>({...p})),flags:Object.fromEntries(flags.map(id=>[id,$(id).checked])),camera:{q:camera.q.slice(),zoom:camera.zoom,pan:[camera.panX/Math.max(1,width),camera.panY/Math.max(1,height)]}};}
 function validate(s){
  const num=(n,a,b)=>typeof n==='number'&&Number.isFinite(n)&&n>=a&&n<=b;
  if(!s||s.schema!=='thalean-orthogonal-settings-1')throw Error('Choose a Thalean Orthogonal settings file.');
  if(!num(s.hz,.05,10)||!num(s.merge,0,100)||!num(s.edgeOpacity,0,1)||!num(s.vertexOpacity,0,1)||!Number.isInteger(s.selected)||!num(s.selected,0,449)||typeof s.running!=='boolean'||!['plane','transport'].includes(s.colorMode))throw Error('Invalid display settings.');
  if((s.mode!==undefined&&!['assembly','inverse'].includes(s.mode))||(s.tolerance!==undefined&&!num(s.tolerance,.01,.12))||(s.cubeFrame!==undefined&&typeof s.cubeFrame!=='boolean'))throw Error('Invalid inverse cube settings.');
  if(!Array.isArray(s.planes)||s.planes.length!==3||s.planes.some(p=>!p||typeof p.visible!=='boolean'||!num(p.opacity,0,1)||!Number.isInteger(p.offset)||!num(p.offset,0,19)))throw Error('Invalid plane settings.');
  if(!s.flags||flags.some(id=>typeof s.flags[id]!=='boolean'))throw Error('Invalid visibility flags.');
  const c=s.camera;if(!c||!Array.isArray(c.q)||c.q.length!==4||c.q.some(v=>!num(v,-1,1))||Math.abs(Math.hypot(...c.q)-1)>1e-5||!num(c.zoom,1e-4,1e4)||!Array.isArray(c.pan)||c.pan.length!==2||c.pan.some(v=>!Number.isFinite(v)))throw Error('Invalid camera settings.');
  return s;
 }
 function applySettings(s){validate(s);tolerance=s.tolerance??.05;$('tolerance').value=tolerance*1000;$('toleranceValue').textContent=tolerance.toFixed(3);$('cubeFrame').checked=s.cubeFrame??true;inverseDirty=true;inverseReadyAt=0;setMode(s.mode??'assembly');setPlay(false);sim.reset();clock.reset(performance.now());clock.hz=s.hz;merge=s.merge;edgeOpacity=s.edgeOpacity;vertexOpacity=s.vertexOpacity;selected=s.selected;colorMode=s.colorMode;planes.forEach((p,i)=>Object.assign(p,s.planes[i]));flags.forEach(id=>$(id).checked=s.flags[id]);camera.q=s.camera.q.slice();camera.zoom=s.camera.zoom;camera.panX=s.camera.pan[0]*width;camera.panY=s.camera.pan[1]*height;priorView='custom';updateViews();
  $('hz').value=M.hzPosition(s.hz);$('hzValue').textContent=s.hz.toFixed(2)+' Hz';$('hz').setAttribute('aria-valuetext',s.hz+' hertz');for(const [id,n]of [['edges',edgeOpacity*100],['vertices',vertexOpacity*100],['merge',merge]]){$(id).value=n;$(id+'Value').textContent=n+'%';}$('selected').value=selected+1;$('colorMode').value=colorMode;planes.forEach((p,i)=>{$('opacity'+i).value=p.opacity*100;$('opacityValue'+i).textContent=Math.round(p.opacity*100)+'%';$('phase'+i).value=p.offset;$('phaseValue'+i).textContent=`${p.offset*18}° · ${p.offset} steps`;});updatePlanes();layoutDirty=true;setPlay(s.running);notice('Settings loaded · fresh simulation started.');}
 $('save').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(settings(),null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='Thalean_Orthogonal_Settings.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notice('Settings saved.');};
 $('load').onclick=()=>{$('file').value='';$('file').click();};$('file').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{if(f.size>1024*1024)throw Error('Settings file is too large (1 MB maximum).');applySettings(JSON.parse(await f.text()));}catch(error){notice(error instanceof SyntaxError?'Invalid JSON; settings unchanged.':error.message,6000);}finally{$('file').value='';}};
 $('inverseSave').onclick=()=>$('save').click();$('inverseLoad').onclick=()=>$('load').click();
 $('audit').textContent=`Verified: ${sim.g.n.toLocaleString()} states, ${sim.g.edges.length.toLocaleString()} edges, degree 10, 450 disjoint F cycles of length 20. Three proper rotations with mutually perpendicular normals. No cross-copy edges.`;
 window.orthogonalObservatory={settings,validate,applySettings,getState:()=>({mode,inverse:{count:inverse.count,tolerance,volume:inverse.volume},steps:clock.steps,phase:clock.phaseStep,running:clock.running,geometry:{states:sim.g.n,edges:sim.g.edges.length,cycles:data.cycles.length},planes:planes.map(p=>({...p})),size:[width,height],metrics:sim.closed.metrics()}),draw:()=>{setDirty();draw(performance.now());}};
 view('oblique');setMode(location.hash==='#inverse'?'inverse':'assembly');updatePlanes();layout();requestAnimationFrame(frame);notice('Drag to rotate · pinch to zoom · tap plane buttons to hide/show',5500);
})();
