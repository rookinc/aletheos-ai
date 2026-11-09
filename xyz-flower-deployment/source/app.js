'use strict';
const $=id=>document.getElementById(id),M=ObservatoryModel,TAU=Math.PI*2;
let native,proof;
try{native=M.native(DATA.transport);proof=M.verify(DATA);}catch(e){$('viewTitle').textContent='Model validation failed';$('caption').textContent=e.message;throw e;}
const colors={cyan:'#7ce1dc',gold:'#e8bf77',muted:'#7d96a0',violet:'#ba94d9',white:'#e5eeee'};
const defaults={triSignal:0,triCompare:true,triDc:false,triEnabled:false,triOrbit:0,triFace:30,triEdges:85,triOnly:true,hState:0,hG:1,hMix:35,hPhase:90,hSpeed:.1,hIntensity:75,hEdges:75,hFlower:50,hFlow:true,hDensity:true,hCurrents:true,hDarts:false,speed:.1,separation:55,flowerDepth:0,flowerLayout:0,planeXY:true,planeXZ:true,planeYZ:true,axes:true,trails:5,edges:35,vertices:45,palace:75,merge:0,morph:100,route:1,mode:1,labels:true,orbit:false};
let S={...defaults},view='mandala',playing=true,phase=0,last=performance.now(),frame=0,projectedRoles=[],selectedRole=-1;
let camera={q:[1,0,0,0],zoom:1,pan:[0,0]},w=800,h=700,dpr=1,scale=250;
const hydrogen=HydrogenBridge.create(DATA.hydrogenBundle,native),he=hydrogen.engine;
let hTime=0,hPositions=[],hDepthCache=-1,hTop=[],hPeak=1,hLastUpdate=0;
const triangleAtlas=TriangleModel.build(native,he.graph.edges);
defaults.triOrbit=triangleAtlas.exampleIndex;S.triOrbit=defaults.triOrbit;
$('triOrbit').innerHTML=triangleAtlas.orbits.map((o,i)=>'<option value="'+i+'">'+(i+1)+' · routes '+o.routes.map(r=>r+1).join(' / ')+'</option>').join('');
function triActive(){return xyzActive()&&S.triEnabled;}
function triSample(){return TriangleModel.sample(triangleAtlas.orbits[S.triOrbit],phase,native,S.flowerDepth/100,M);}
function drawNativeTriangle(){
 if(!triActive())return;
 const o=triangleAtlas.orbits[S.triOrbit],sample=triSample(),p=sample.points;
 const allVisible=[0,1,2].every(planeVisible);
 if(allVisible){
  if(S.triFace){ctx.save();ctx.globalAlpha=S.triFace/100;ctx.fillStyle=colors.cyan;ctx.beginPath();p.forEach((v,i)=>{const q=project(v);i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]);});ctx.closePath();ctx.fill();ctx.restore();}
  line([...p,p[0]],colors.white,S.triEdges/100,1.8);
 }
 for(let i=0;i<3;i++)if(planeVisible(i)){
  const next=M.xyzFlowerPoint(o.routes[i],phase+.025,native.cycles,S.flowerDepth/100);
  triangle(p[i],next,planeColors[i],5.8,true);
  if(S.labels)label(p[i].map((v,k)=>v+(k===1?.075:0)),planeNames[i]+' · R'+(o.routes[i]+1),planeColors[i],9);
 }
}
function updateTriangleReadout(){
 $('triangleControls').hidden=!xyzActive();$('triangleOptions').hidden=!S.triEnabled;
 if(view==='flower'&&xyzActive()){
  const title=triActive()?'A native triangle in motion':'A flower in three planes',badge=triActive()?'Three synchronized F darts · verified native edges':'XY + XZ + YZ · 450 routes · 20-step returns',caption=triActive()?'41 selectable triangle orbits · graph distances 1 · 1 · 1':'Three orthogonal flowers · 150 native routes per plane';
  if($('viewTitle').textContent!==title)$('viewTitle').textContent=title;
  if($('stageBadge').textContent!==badge)$('stageBadge').textContent=badge;
  if($('caption').textContent!==caption)$('caption').textContent=caption;
 }
 if(!triActive())return;
 const o=triangleAtlas.orbits[S.triOrbit],a=triSample(),step=M.mod(Math.floor(phase),20),u=M.mod(phase,1);
 $('triangleMetrics').textContent='Graph distances  1 · 1 · 1\nVerified         20 / 20 steps\nDrawing area     '+a.area.toFixed(5)+' units²\nF step           '+(step+1)+' / 20  + '+Math.round(u*100)+'%\nNative IDs       '+a.ids.join(' · ')+'\nRoutes           '+o.routes.map(r=>r+1).join(' · ')+(![0,1,2].every(planeVisible)?'\nFace hidden: a plane is off':'');
 if($('triangleSpectrum').open)refreshTriangleSpectrum();
 if(view==='flower'){$('readoutLabel').textContent='GRAPH DISTANCES';$('stateReadout').textContent='1 · 1 · 1';$('phaseLabel').textContent='F STEP / RETURN';$('phaseReadout').textContent=(step+1)+' / 20';$('checkLabel').textContent='DRAWING AREA';$('checkReadout').textContent=a.area.toFixed(5);}
}
const phasePalette=Array.from({length:72},(_,i)=>`hsl(${i*5+170} 72% 70%)`);
const canvas=$('scene'),ctx=canvas.getContext('2d',{alpha:true});
function quat(a,b){return [a[0]*b[0]-a[1]*b[1]-a[2]*b[2]-a[3]*b[3],a[0]*b[1]+a[1]*b[0]+a[2]*b[3]-a[3]*b[2],a[0]*b[2]-a[1]*b[3]+a[2]*b[0]+a[3]*b[1],a[0]*b[3]+a[1]*b[2]-a[2]*b[1]+a[3]*b[0]];}
function turn(axis,angle){const a=angle/2;camera.q=quat([Math.cos(a),...axis.map(v=>v*Math.sin(a))],camera.q);const n=Math.hypot(...camera.q);camera.q=camera.q.map(v=>v/n);}
function rotate(p){const q=camera.q,a=quat(q,[0,...p]),b=quat(a,[q[0],-q[1],-q[2],-q[3]]);return b.slice(1);}
function project(p){const r=rotate(p),f=1/(1+r[2]*.08);return [w/2+camera.pan[0]+r[0]*scale*f,h*.51+camera.pan[1]-r[1]*scale*f,r[2]];}
function cameraPreset(which='oblique'){camera={q:[1,0,0,0],zoom:1,pan:[0,0]};if(which==='xyz'){turn([0,1,0],.66);turn([1,0,0],-.63);}if(which==='front')turn([1,0,0],-Math.PI/2);if(which==='oblique'){turn([1,0,0],-.68);turn([0,0,1],-.10);}syncCameraButtons(which==='xyz'?'oblique':which);}
function syncCameraButtons(which){document.querySelectorAll('[data-camera]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.camera===which)));}
function resize(){const r=canvas.getBoundingClientRect();w=r.width;h=r.height;dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);}
new ResizeObserver(resize).observe(canvas);
function line(points,color,alpha=1,width=1,dash=[]){if(alpha<=0)return;ctx.globalAlpha=alpha;ctx.strokeStyle=color;ctx.lineWidth=width;ctx.setLineDash(dash);ctx.beginPath();points.forEach((p,i)=>{const a=project(p);i?ctx.lineTo(a[0],a[1]):ctx.moveTo(a[0],a[1]);});ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1;}
function circle3(r,z,color,alpha,width=1,n=120){line(Array.from({length:n+1},(_,i)=>[r*Math.cos(i*TAU/n),r*Math.sin(i*TAU/n),z]),color,alpha,width);}
function dot(p,r,color,alpha=1,glow=false){const a=project(p);ctx.globalAlpha=alpha;ctx.fillStyle=color;if(glow){ctx.shadowColor=color;ctx.shadowBlur=12;}ctx.beginPath();ctx.arc(a[0],a[1],r,0,TAU);ctx.fill();ctx.shadowBlur=0;ctx.globalAlpha=1;}
function label(p,text,color=colors.muted,size=10){const a=project(p);ctx.font=`${size}px ui-monospace, monospace`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#0a151ee6';ctx.fillRect(a[0]-ctx.measureText(text).width/2-5,a[1]-size/2-4,ctx.measureText(text).width+10,size+8);ctx.fillStyle=color;ctx.fillText(text,a[0],a[1]);}
function tierZ(f){return (f-2)*.25*S.separation/100;}
const radii=[1.12,.91,.70,.50,.30],tierNames=['BODY','SPEECH','MIND','WISDOM','BLISS'];
function palace(){const alpha=S.palace/100;if(!alpha)return;
 const z=tierZ(0)-.03;circle3(1.38,z,'#b49b69',alpha*.45);circle3(1.32,z,colors.gold,alpha*.25);circle3(1.24,z,colors.cyan,alpha*.15);
 for(let i=0;i<64;i++){const a=i*TAU/64;line([[1.33*Math.cos(a),1.33*Math.sin(a),z],[1.38*Math.cos(a+.024),1.38*Math.sin(a+.024),z],[1.43*Math.cos(a),1.43*Math.sin(a),z],[1.38*Math.cos(a-.024),1.38*Math.sin(a-.024),z],[1.33*Math.cos(a),1.33*Math.sin(a),z]],colors.gold,alpha*.3,.7);}
 for(let f=0;f<5;f++){const r=radii[f]*.74,z=tierZ(f),col=f%2?colors.cyan:colors.gold;for(const rr of [r,r*.95,r*.87]){
   const g=rr*.24,ext=rr*.18,side=[[-rr,-rr,z],[-g,-rr,z],[-g,-rr-ext,z],[g,-rr-ext,z],[g,-rr,z],[rr,-rr,z]];
   for(let j=0;j<4;j++){let a=j*Math.PI/2;line(side.map(([x,y,z])=>[x*Math.cos(a)-y*Math.sin(a),x*Math.sin(a)+y*Math.cos(a),z]),col,alpha*(rr===r?.65:.24),rr===r?1.1:.6);}
  }
  circle3(radii[f]*.88,z,col,alpha*.13,.6);
  for(let j=0;j<4;j++){let a=j*Math.PI/2;const tip=[r*1.2*Math.cos(a),r*1.2*Math.sin(a),z];line([[r*.88*Math.cos(a),r*.88*Math.sin(a),z],tip],col,alpha*.5,2);}
  if(S.labels&&S.separation>20)label([-r-.03,r+.06,z],tierNames[f],col,8);
 }
 for(let i=0;i<8;i++){let a=i*Math.PI/4,pts=[];for(let j=0;j<=30;j++){let t=j*TAU/30,r=.10+.11*Math.sin(t/2);pts.push([r*Math.cos(a+.25*Math.sin(t)),r*Math.sin(a+.25*Math.sin(t)),tierZ(4)+.006]);}line(pts,colors.gold,alpha*.65,.7);}
 dot([0,0,tierZ(4)],3,colors.gold,alpha,true);
 if(S.labels)for(const [a,n] of [[0,'E'],[Math.PI/2,'N'],[Math.PI,'W'],[Math.PI*1.5,'S']])label([1.5*Math.cos(a),1.5*Math.sin(a),z],n,colors.gold,11);
}
function flatFlower(){
 const alpha=S.palace/100,depth=S.flowerDepth/100,centers=M.flowerCenters();
 const levels=depth>0?[-2,-1,0,1,2]:[0];
 for(const f of levels){const z=f*.26*depth,opacity=alpha*(f===0?.75:.20);for(let i=0;i<19;i++){const [x,y]=centers[i],pts=Array.from({length:97},(_,j)=>[x+.42*Math.cos(j*TAU/96),y+.42*Math.sin(j*TAU/96),z]);line(pts,colors.gold,opacity,1.2);if(S.vertices)dot([x,y,z],1.7,colors.gold,S.vertices/100*.65);}}
 circle3(1.28,0,colors.gold,alpha*.75,1.2);circle3(1.32,0,colors.gold,alpha*.26,.7);
 const c=S.route-1,[x,y]=centers[c%19];line(Array.from({length:97},(_,j)=>[x+.42*Math.cos(j*TAU/96),y+.42*Math.sin(j*TAU/96),0]),colors.cyan,alpha*.6,1.5);
 if(S.labels){label([0,1.43,0],'FLOWER OF LIFE',colors.gold,10);label([0,-1.43,0],'1 + 6 + 12 CIRCLES',colors.muted,9);}
}
const planeColors=[colors.cyan,colors.gold,colors.violet],planeNames=['XY','XZ','YZ'];
function xyzActive(){return view==='hydrogen'||view==='flower'&&S.flowerLayout===1;}
function planeVisible(i){return S[['planeXY','planeXZ','planeYZ'][i]];}
function routeVisible(c){return !xyzActive()||planeVisible(c%3);}
function flowerPoint(c,t){return xyzActive()?M.xyzFlowerPoint(c,t,native.cycles,S.flowerDepth/100):M.flowerPoint(c,t,native.cycles,S.flowerDepth/100);}
function flower(){if(!xyzActive()){flatFlower();return;}const alpha=(view==='hydrogen'?S.hFlower:S.palace)/100,depth=S.flowerDepth/100,centers=M.flowerCenters(),levels=depth>0?[-2,-1,0,1,2]:[0];
 for(let plane=0;plane<3;plane++){if(!planeVisible(plane))continue;const col=planeColors[plane],map=p=>M.planePoint(p,plane);
  for(const f of levels){const z=f*.26*depth;for(const [x,y]of centers){line(Array.from({length:73},(_,j)=>map([x+.42*Math.cos(j*TAU/72),y+.42*Math.sin(j*TAU/72),z])),col,alpha*(f===0?.46:.09),.9);if(view!=='hydrogen'&&S.vertices&&f===0)dot(map([x,y,z]),1.7,col,S.vertices/100*.55);}}
  for(const r of [1.28,1.32])line(Array.from({length:97},(_,j)=>map([r*Math.cos(j*TAU/96),r*Math.sin(j*TAU/96),0])),col,alpha*.55,r===1.28?1.2:.5);
  if(S.labels&&alpha){ctx.globalAlpha=alpha;label(map([.97,.97,0]),planeNames[plane],col,11);ctx.globalAlpha=1;}
 }
 if(S.axes){const ends=[[1.53,0,0],[0,1.53,0],[0,0,1.53]],cols=['#ed9999',colors.cyan,colors.gold];for(let i=0;i<3;i++){line([ends[i].map(v=>-v),ends[i]],cols[i],.35,.8,[3,4]);label(ends[i],'XYZ'[i],cols[i],12);}dot([0,0,0],3,colors.white,.8,true);}
}

function refreshHydrogen(reset=false){
 if(he.g!==S.hG){he.prepare(S.hG);hTop=[];}if(reset)hTime=0;
 he.mode=['coherent','ground','excited'][S.hState];he.mix=S.hMix;he.phase=S.hPhase;he.seek(hTime);
 if(!hTop.length){hTop=HydrogenBridge.topCurrents(he);hPeak=Math.max(...he.preset.vectors[0].map((a,i)=>(Math.abs(a)+Math.abs(he.preset.vectors[1][i]))**2));}
 $('hMix').disabled=S.hState!==0;$('hPhase').disabled=S.hState!==0;
}
function drawHydrogen(){
 if(hDepthCache!==S.flowerDepth){hPositions=Array.from({length:9000},(_,id)=>M.xyzFlowerPoint(hydrogen.route[id],hydrogen.step[id],native.cycles,S.flowerDepth/100));hDepthCache=S.flowerDepth;}
 const visible=id=>planeVisible(hydrogen.route[id]%3),gain=S.hIntensity/100;
 if(S.hDensity&&gain){
  const groundPhase=he.preset.energies[0]*he.time;
  for(let id=0;id<9000;id++){if(!visible(id))continue;const prob=he.prob[id],q=Math.min(1,prob/hPeak);if(q<1e-8)continue;
   const a=project(hPositions[id]),arg=M.mod(Math.atan2(he.im[id],he.re[id])+groundPhase,TAU),radius=Math.max(.45,Math.sqrt(q)*3.5);
   ctx.fillStyle=phasePalette[Math.floor(arg/TAU*72)%72];ctx.globalAlpha=gain*(.12+.76*Math.sqrt(q));ctx.beginPath();ctx.arc(a[0],a[1],radius,0,TAU);ctx.fill();
  }ctx.globalAlpha=1;
 }
 if(S.hCurrents&&S.hEdges&&he.metrics.maxEdgeCurrent>1e-13){
  const edges=he.graph.edges,[v0,v1]=he.preset.vectors,gap=he.preset.energies[1]-he.preset.energies[0];
  const coefficient=j=>v0[edges[2*j]]*v1[edges[2*j+1]]-v1[edges[2*j]]*v0[edges[2*j+1]];
  const maxCoefficient=Math.abs(coefficient(hTop[0])),edgeGain=S.hEdges/100;
  const mix=Math.sin(2*he.mix*Math.PI/180),angle=he.phase*Math.PI/180-gap*he.time;
  for(const j of hTop){const a=edges[2*j],b=edges[2*j+1],J=he.currents[j];if(!visible(a)||!visible(b))continue;
   const u=hPositions[a],v=hPositions[b],weight=maxCoefficient?coefficient(j)/maxCoefficient:0;
   const strength=Math.min(1,Math.abs(J)/Math.max(1e-30,maxCoefficient));
   line([u,v],colors.gold,edgeGain*(.08+.28*strength),.5+strength*.7);
   if(S.hFlow&&Math.abs(J)>1e-13){
    const t=M.mod(j*.61803398875+1.5*mix*weight*Math.cos(angle),1);
    const p=u.map((x,i)=>x+(v[i]-x)*t),next=J>0?v:u;
    ctx.globalAlpha=edgeGain*strength;triangle(p,next,colors.gold,2.3+strength*1.7);ctx.globalAlpha=1;
   }
  }
 }
}

function mandalaPoint(c,k){const state=native.cycles[c][M.mod(k,20)],f=Math.floor(state/1800),a=TAU*(c/450+M.mod(k,4)/4),r=radii[f]*(.81+.18*M.mod(c*.61803398875,1));return [r*Math.cos(a),r*Math.sin(a),tierZ(f)];}
function point(c,step,mode=view){if(mode==='flower'||mode==='hydrogen')return flowerPoint(c,step);if(mode==='native')return M.torus(c,step,S.merge/100);return mandalaPoint(c,step);}
function position(c,t,mode=view){if(mode==='flower'||mode==='hydrogen')return flowerPoint(c,t);let k=Math.floor(t),u=t-k,a=point(c,k,mode),b=point(c,k+1,mode);if(mode==='native'){
 // Interpolate the same registered endpoints; bends are drawing geometry.
 const aa=M.torus(c,k,S.merge/100),bb=M.torus(c,k+1,S.merge/100);return aa.map((v,i)=>v+(bb[i]-v)*u);
 }const v=u*u*(3-2*u);return a.map((x,i)=>x+(b[i]-x)*v+(i===2?.045*Math.sin(Math.PI*u):0));}
function triangle(p,next,col,size=4,selected=false){let a=project(p),b=project(next),angle=Math.atan2(b[1]-a[1],b[0]-a[0]);ctx.save();ctx.translate(a[0],a[1]);ctx.rotate(angle);ctx.beginPath();ctx.moveTo(size*1.35,0);ctx.lineTo(-size,-size*.7);ctx.lineTo(-size*.65,0);ctx.lineTo(-size,size*.7);ctx.closePath();ctx.fillStyle=col;ctx.fill();ctx.strokeStyle=selected?'#fff':'#07141b';ctx.lineWidth=selected?1.2:.8;ctx.stroke();if(selected){ctx.beginPath();ctx.arc(0,0,size*2.5,0,TAU);ctx.strokeStyle='#f7ffffaa';ctx.lineWidth=.8;ctx.stroke();}ctx.restore();}
function darts(){if(triActive()&&S.triOnly)return;const selected=S.route-1,edge=S.edges/100;if(edge>0){for(let c=0;c<450;c+=10){if(!routeVisible(c))continue;let pts=Array.from({length:21},(_,i)=>point(c,i));line(pts,xyzActive()?planeColors[c%3]:c%2?colors.cyan:colors.gold,edge*.14,.6);}}
 if(S.vertices>0)for(let c=0;c<450;c+=10)if(routeVisible(c))for(let k=0;k<20;k++)dot(point(c,k),1,colors.muted,S.vertices/100*.38);
 let render=[];for(let c=0;c<450;c++){if(!routeVisible(c)||triActive()&&triangleAtlas.orbits[S.triOrbit].routes.includes(c))continue;let t=phase+c%20,p=position(c,t),n=position(c,t+.018),k=Math.floor(t);let col=xyzActive()?planeColors[c%3]:view==='flower'?(c%2?colors.gold:colors.cyan):(point(c,k+1)[2]>point(c,k)[2]?colors.cyan:colors.gold);if(c===selected)col=colors.white;
  if(S.trails>0){const steps=Math.min(S.trails,c===selected?20:5),count=steps*3;let prev=position(c,t-steps);for(let j=1;j<=count;j++){let next=position(c,t-steps+j/3);line([prev,next],col,(c===selected?.45:.11)*(j/count),c===selected?1.8:.65);prev=next;}}
  render.push({c,p,n,col,z:rotate(p)[2]});}
 render.sort((a,b)=>b.z-a.z);for(const v of render)triangle(v.p,v.n,v.col,v.c===selected?5.5:Math.max(2.3,Math.min(w,h)/210),v.c===selected);
}
function rolePosition(i,morph=S.morph/100){const a=-i*TAU/8,r=[.86*Math.cos(a),.86*Math.sin(a),0],b=DATA.bits[i].map(v=>(v-.5)*1.12);return r.map((v,j)=>v*(1-morph)+b[j]*morph);}
function roleGraph(){const positions=Array.from({length:8},(_,i)=>rolePosition(i));if(S.edges)for(const [a,b] of DATA.ring)line([positions[a],positions[b]],colors.cyan,S.edges/100*.8+ .2,2);if(S.edges)for(const [a,b]of DATA.partners)line([positions[a],positions[b]],colors.gold,S.edges/100*.8+.2,2,[5,4]);
 projectedRoles=[];positions.forEach((p,i)=>{dot(p,7,colors.gold,S.vertices/100*.6+.4,true);const a=project(p);projectedRoles.push({i,x:a[0],y:a[1]});if(S.labels)label([p[0],p[1]+.11,p[2]],DATA.roles[i].name,selectedRole===i?colors.white:'#aec3cb',w<600?9:11);});
 // Traverses the positional ring only; explicitly a role-graph illustration.
 const step=M.mod(phase*.4,8),i=Math.floor(step),j=(i+1)%8,u=step-i,p=positions[i].map((v,k)=>v+(positions[j][k]-v)*u);triangle(p,positions[j],colors.white,6,true);
}
function fourier(){let k=S.mode,x=DATA.H.map(r=>r[k]),g=M.mul(DATA.P,x),amplitude=Math.cos(phase*TAU/20),peak=Math.max(...g.map(Math.abs),1),lpos=Array.from({length:8},(_,i)=>{let p=rolePosition(i,1);return [p[0]*.55+p[2]*.29-.95,p[1]*.55+p[2]*.23,p[2]*.15];}),rpos=DATA.gPos.map(p=>p.map((v,j)=>v*.66+(j===0?.85:0)));
 for(const [a,b]of [...DATA.ring,...DATA.partners])line([lpos[a],lpos[b]],'#78949a',S.edges/100*.9,.9);
 for(const [a,b]of DATA.gEdges)line([rpos[a],rpos[b]],'#78949a',S.edges/100*.75,.6);
 x.forEach((v,i)=>dot(lpos[i],4+Math.abs(v*amplitude)*5,v*amplitude>=0?colors.cyan:colors.gold,.9,true));g.forEach((v,i)=>dot(rpos[i],1.7+Math.sqrt(Math.abs(v*amplitude)/peak)*5.4,v*amplitude>=0?colors.cyan:colors.gold,.9,Math.abs(v*amplitude)/peak>.4));
 if(S.labels){label([-.95,.63,0],'CUBE · 8 ROLES',colors.gold,10);label([.85,.86,0],'NATIVE G60',colors.gold,10);label([0,-.9,0],'Lᴳ P = P Lᶜ  ·  QP = I₈',colors.muted,w<600?9:12);}
 line([[-.32,0,0],[.1,0,0]],colors.gold,.5,1,[3,4]);triangle([.1,0,0],[.3,0,0],colors.gold,4);
}
const viewInfo={hydrogen:['HYDROGEN · XYZ FLOWER','Hydrogen through the flower','Native G9000 Hamiltonian · dimensionless hydrogen analogue'],flower:['NATIVE MOTION · FLOWER OF LIFE','Returns through the flower','19 equal circles · 450 native routes · circular display embedding'],mandala:['NATIVE MOTION · MANDALA CHART','Cycles through the palace','Exact native F transport · five-level display embedding'],native:['REGISTERED TRANSPORT · G9000','The native return','Same 450 routes · split-torus display chart'],cube:['TRADITIONAL ROLES · EXPLICIT RELATIONS','The ring becomes a cube','Teal: ring neighbors · gold: partner relations · white: ring tracer'],fourier:['EXACT LAPLACIAN CORRESPONDENCE','Eight modes, carried across','Cyan: positive amplitude · gold: negative amplitude · display sizes scaled separately']};
function setView(v){if(!viewInfo[v])return;view=v;const shows={separation:['mandala'],flowerDepth:['flower','hydrogen'],flowerLayout:['flower'],trails:['mandala','native','flower','hydrogen'],palace:['mandala','flower'],edges:['mandala','flower','native','cube','fourier'],vertices:['mandala','flower','native','cube','fourier'],merge:['native'],morph:['cube'],route:['mandala','native','flower','hydrogen'],mode:['fourier']};for(const [id,vs] of Object.entries(shows))$(id).closest('.control').hidden=!vs.includes(v);$('flowerPlanes').hidden=!xyzActive();$('triangleControls').hidden=!xyzActive();$('triangleOptions').hidden=!S.triEnabled;$('hydrogenControls').hidden=v!=='hydrogen';$('geometryLabel').textContent=(v==='flower'||v==='hydrogen')?'Circle drawing':'Palace drawing';$('legend').innerHTML=xyzActive()?'<i class=cyanDot></i> XY <i class=goldDot></i> XZ <i class=violetDot></i> YZ':v==='flower'?'<i class=cyanDot></i> Counterclockwise <i class=goldDot></i> Clockwise':v==='fourier'?'<i class=cyanDot></i> Positive <i class=goldDot></i> Negative':v==='cube'?'<i class=cyanDot></i> Ring <i class=goldDot></i> Partners':'<i class=cyanDot></i> Rising <i class=goldDot></i> Falling';let info=viewInfo[v];$('viewEyebrow').textContent=info[0];$('viewTitle').textContent=info[1];$('caption').textContent=info[2];document.querySelectorAll('[data-view]').forEach(b=>{b.classList.toggle('active',b.dataset.view===v);b.setAttribute('aria-pressed',String(b.dataset.view===v));});$('stageBadge').textContent=v==='cube'?'8 roles · 12 edges · Q₃':v==='fourier'?'rank P = 8 · exact witness':(v==='flower'?'19 circles · 450 routes · 20-step returns':'450 routes × 20 steps');if(xyzActive()){ $('viewEyebrow').textContent='NATIVE MOTION · XYZ FLOWER';$('viewTitle').textContent='A flower in three planes';$('caption').textContent='Three orthogonal flowers · 150 native routes per plane';$('stageBadge').textContent='XY + XZ + YZ · 450 routes · 20-step returns';cameraPreset('xyz');}else if(v==='fourier'||v==='flower')cameraPreset('top');else cameraPreset();if(v==='hydrogen'){$('viewEyebrow').textContent=viewInfo.hydrogen[0];$('viewTitle').textContent=viewInfo.hydrogen[1];$('caption').textContent='9,000 states · 45,000 edges computed · up to 160 current edges shown';$('stageBadge').textContent='Probability · relative phase · signed current';$('legend').innerHTML='<i class=cyanDot></i> Phase hue · dot size tracks probability';refreshHydrogen();}updateReadout();}
function updateReadout(){if(view==='hydrogen'){const m=he.metrics;$('readoutLabel').textContent='TOTAL PROBABILITY';$('stateReadout').textContent=m.norm.toFixed(6);$('phaseLabel').textContent='H BEAT · F STEP';$('phaseReadout').textContent=(hTime/he.period).toFixed(2)+' T · '+(M.mod(Math.floor(phase),20)+1)+'/20';$('checkLabel').textContent='PEAK CURRENT';$('checkReadout').textContent=m.maxEdgeCurrent.toExponential(2);$('hydrogenMetrics').textContent='Energy        '+m.energy.toFixed(8)+'\nMean d        '+m.meanPairDistance.toFixed(5)+'\nH time        '+hTime.toFixed(5)+'\nBeat period   '+he.period.toFixed(5)+'\nNorm error    '+m.normError.toExponential(2)+'\nEnergy error  '+m.energyError.toExponential(2)+'\nContinuity    '+m.continuityResidual.toExponential(2)+'\nK agreement   1800 / 1800\nComputed      9000 states / 45000 edges';}
 else if(view==='fourier'){let lam=[0,2,2,2,4,4,4,6][S.mode];$('readoutLabel').textContent='CUBE EIGENVALUE';$('stateReadout').textContent='λ = '+lam;$('phaseLabel').textContent='TRANSFER';$('phaseReadout').textContent='8 / 8 modes';$('checkLabel').textContent='ROUND TRIP';$('checkReadout').textContent='QP = I₈ ✓';}
 else if(view==='cube'){$('readoutLabel').textContent='SELECTED ROLE';$('stateReadout').textContent=selectedRole<0?'Tap a role':DATA.roles[selectedRole].name;$('phaseLabel').textContent='STRUCTURE';$('phaseReadout').textContent='8V · 12E';$('checkLabel').textContent='GRAPH';$('checkReadout').textContent='Cube Q₃ ✓';}
 else {let c=S.route-1,k=M.mod(Math.floor(phase)+c%20,20),a=native.cycles[c][k],b=native.cycles[c][(k+1)%20];$('readoutLabel').textContent='F ROUTE '+S.route+(xyzActive()?' · '+planeNames[c%3]+(routeVisible(c)?'':' HIDDEN'):' · STATE IDs');$('stateReadout').textContent=a+' → '+b;$('phaseLabel').textContent='STEP / RETURN';$('phaseReadout').textContent=String(k+1).padStart(2,'0')+' / 20';$('checkLabel').textContent='COMPLETE RETURNS';$('checkReadout').textContent=Math.floor(phase/20)+' · F²⁰ = I';}}
function render(now){const dt=Math.max(0,(now-last)/1000);last=now;if(playing){phase+=dt*S.speed*20;if(view==='hydrogen')hTime+=dt*S.hSpeed*he.period;}if(S.orbit&&playing)turn([0,1,0],dt*.075);scale=Math.min(w*.30,h*.34)*camera.zoom;if(view==='fourier')scale=Math.min(w*.25,h*.34)*camera.zoom;if(view==='flower'||view==='hydrogen')scale=Math.min(w*.30,h*.24)*camera.zoom;ctx.clearRect(0,0,w,h);ctx.lineJoin='round';
 if(view==='hydrogen'){if(now-hLastUpdate>33){he.seek(hTime);hLastUpdate=now;}flower();drawHydrogen();if(S.hDarts)darts();drawNativeTriangle();}else if(view==='flower'){flower();darts();drawNativeTriangle();}else if(view==='mandala'){palace();darts();}else if(view==='native'){darts();}else if(view==='cube')roleGraph();else fourier();
 if(frame++%6===0){updateReadout();updateTriangleReadout();}requestAnimationFrame(render);}
function togglePlay(){playing=!playing;last=performance.now();$('play').textContent=playing?'Ⅱ':'▶';$('play').setAttribute('aria-label',playing?'Pause':'Play');$('liveText').textContent=playing?'RUNNING':'PAUSED';}
function toast(t){$('toast').textContent=t;$('toast').classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('toast').classList.remove('show'),2500);}
function sync(){for(const k in S){const e=$(k);if(!e)continue;if(typeof S[k]==='boolean')e.checked=S[k];else e.value=S[k];const o=$(k+'Value');if(o)o.textContent=k==='hMix'||k==='hPhase'?S[k]+'°':k==='hSpeed'?S[k].toFixed(2)+' / s':k==='speed'?S[k].toFixed(2)+' Hz':k==='trails'?S[k]+' steps':k==='route'?S[k]+' / 450':S[k]+'%';}}
for(const k in S){$(k).addEventListener('input',e=>{S[k]=typeof defaults[k]==='boolean'?e.target.checked:Number(e.target.value);sync();if(k==='flowerLayout')setView('flower');if(k.startsWith('tri')){updateReadout();updateTriangleReadout();}if(k.startsWith('h'))refreshHydrogen(k==='hG');});}
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>setView(b.dataset.view));document.querySelectorAll('[data-camera]').forEach(b=>b.onclick=()=>cameraPreset(b.dataset.camera==='oblique'&&xyzActive()?'xyz':b.dataset.camera));
$('play').onclick=togglePlay;$('resetCamera').onclick=()=>cameraPreset(xyzActive()?'xyz':view==='fourier'||view==='flower'?'top':'oblique');$('restart').onclick=()=>{phase=0;hTime=0;he.seek(0);cameraPreset(xyzActive()?'xyz':view==='flower'?'top':'oblique');updateReadout();toast('Transport restarted');};
function drawer(open){document.body.classList.toggle('drawerOpen',open);$('drawerBtn').setAttribute('aria-expanded',String(open));}$('drawerBtn').onclick=()=>drawer(!document.body.classList.contains('drawerOpen'));$('closeDrawer').onclick=()=>drawer(false);
function hide(){document.body.classList.toggle('clean');$('restore').hidden=!document.body.classList.contains('clean');drawer(false);resize();}$('hideUi').onclick=hide;$('restore').onclick=hide;
$('zoomIn').onclick=()=>camera.zoom=Math.min(4,camera.zoom*1.15);$('zoomOut').onclick=()=>camera.zoom=Math.max(.35,camera.zoom/1.15);$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('instrument').requestFullscreen();}catch{hide();}};
$('checks').textContent='✓ 1,800 carrier entries verified\n✓ 450 disjoint routes cover 9,000 states\n✓ Every route returns at exactly 20 steps\n✓ Fourier residual: '+proof.residual.toExponential(1)+'\n✓ Round-trip residual: '+proof.roundtrip.toExponential(1);$('checks').style.whiteSpace='pre-line';
function about(){$('about').showModal();}$('info').onclick=about;$('details').onclick=about;$('closeAbout').onclick=()=>$('about').close();$('about').onclick=e=>{if(e.target===$('about')){let r=$('about').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('about').close();}};
function download(name,data,type){let u=URL.createObjectURL(new Blob([data],{type})),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
$('triPrevious').onclick=()=>triangleStep(-1);$('triNext').onclick=()=>triangleStep(1);
function triangleStep(delta){if(playing)togglePlay();phase=M.mod(Math.floor(phase)+delta,20);updateReadout();updateTriangleReadout();}
$('triReceipt').onclick=()=>{const o=triangleAtlas.orbits[S.triOrbit];download('native-triangle-receipt.json',JSON.stringify({schema:'thalean.native-triangle.v1',source:DATA.hydrogenBundle.provenance,counts:triangleAtlas.counts,orbit:S.triOrbit,routes:o.routes.map(r=>r+1),stateIds:'zero-based',seeds:o.seeds,phase,graphDistances:[1,1,1],all20StepsVerified:true,sample:triSample(),drawing:{depth:S.flowerDepth/100,faceOpacity:S.triFace/100,visiblePlanes:[S.planeXY,S.planeXZ,S.planeYZ],selectedDartsSynchronized:true,areaUnits:'drawing units squared',interpolation:'display only'},states:Array.from({length:20},(_,k)=>o.routes.map(r=>native.cycles[r][k]))},null,2),'application/json');};
$('hReceipt').onclick=()=>{he.seek(hTime);const receipt=he.receipt();receipt.display={layout:'XYZ flower',mapping:'state ID -> registered F route and fixed step; plane = route index modulo 3',Fphase:phase,hydrogenTime:hTime,visiblePlanes:[S.planeXY,S.planeXZ,S.planeYZ],bloomDepth:S.flowerDepth,registration:'identity; all 1800 K entries match',source:DATA.hydrogenBundle.provenance};download('hydrogen-flower-receipt.json',JSON.stringify(receipt,null,2),'application/json');};
$('save').onclick=()=>{download('kalachakra-observatory-state.json',JSON.stringify({schema:'kalachakra-observatory-v1',settings:S,view,phase,hTime,playing,camera,source:DATA.transport.sourceAuditSHA256},null,2),'application/json');toast('State saved');};
$('load').onclick=()=>$('file').click();$('file').onchange=async e=>{try{let f=e.target.files[0];if(!f)return;if(f.size>100000)throw Error('State file is too large');let d=JSON.parse(await f.text());if(d.schema!=='kalachakra-observatory-v1'||!viewInfo[d.view]||d.source!==DATA.transport.sourceAuditSHA256||!Number.isFinite(d.phase)||d.phase<0||d.phase>1e12)throw Error('Invalid observatory state');let next={...defaults};for(let k in next){let v=d.settings?.[k];if(v===undefined&&(k.startsWith('tri')||k.startsWith('h')||['flowerDepth','flowerLayout','planeXY','planeXZ','planeYZ','axes'].includes(k)))v=defaults[k];if(typeof defaults[k]==='boolean'){if(typeof v!=='boolean')throw Error('Invalid switch');}else{if(!Number.isFinite(v)||(!['speed','hSpeed'].includes(k)&&!Number.isInteger(v))||v<Number($(k).min||0)||v>Number(k==='triSignal'?8:k==='triOrbit'?triangleAtlas.orbits.length-1:k==='flowerLayout'?1:$(k).max||7))throw Error('Invalid control value');}if(k==='hState'&&![0,1,2].includes(v)||k==='hG'&&![0,1,4].includes(v))throw Error('Invalid hydrogen preset');next[k]=v;}let c=d.camera;if(!c||!Array.isArray(c.q)||c.q.length!==4||c.q.some(x=>!Number.isFinite(x))||Math.abs(Math.hypot(...c.q)-1)>.001||!Array.isArray(c.pan)||c.pan.length!==2||c.pan.some(x=>!Number.isFinite(x)||Math.abs(x)>10000)||!Number.isFinite(c.zoom)||c.zoom<.35||c.zoom>4)throw Error('Invalid camera');if(d.hTime!==undefined&&(!Number.isFinite(d.hTime)||d.hTime<0||d.hTime>1e6))throw Error('Invalid hydrogen time');S=next;hTime=d.hTime||0;refreshHydrogen();setView(d.view);camera=c;syncCameraButtons('');phase=d.phase;if(typeof d.playing==='boolean'&&playing!==d.playing)togglePlay();sync();toast('State restored');}catch(err){toast(err.message||'Could not load state');}e.target.value='';};
$('offline').onclick=()=>{let html=document.documentElement.cloneNode(true);html.querySelector('body').classList.remove('clean','drawerOpen');html.querySelector('body').dataset.startView=view;html.querySelector('body').dataset.flowerLayout=String(S.flowerLayout);html.querySelector('body').dataset.triangleEnabled=String(S.triEnabled);html.querySelector('body').dataset.triangleOrbit=String(S.triOrbit);html.querySelector('#about').removeAttribute('open');html.querySelector('#triangleSpectrum').removeAttribute('open');html.querySelector('#restore').hidden=true;html.querySelector('#toast').className='';download('Kalachakra-Thalean-Observatory.html','<!doctype html>\n'+html.outerHTML,'text/html');toast('Offline observatory downloaded');};
const pointers=new Map();let gesture=null,startPoint=null,moved=false;
function getGesture(){let a=[...pointers.values()];if(a.length<2)return null;return {x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2,d:Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y),a:Math.atan2(a[1].y-a[0].y,a[1].x-a[0].x)};}
canvas.onpointerdown=e=>{canvas.focus({preventScroll:true});canvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});gesture=getGesture();startPoint={x:e.clientX,y:e.clientY};moved=false;};
canvas.onpointermove=e=>{if(!pointers.has(e.pointerId))return;let prev=pointers.get(e.pointerId),dx=e.clientX-prev.x,dy=e.clientY-prev.y;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(Math.hypot(e.clientX-startPoint.x,e.clientY-startPoint.y)>5)moved=true;if(pointers.size===1){if(e.shiftKey){camera.pan[0]+=dx;camera.pan[1]+=dy;}else{turn([0,1,0],dx*.006);turn([1,0,0],dy*.006);}}else{let n=getGesture();if(gesture){camera.pan[0]+=n.x-gesture.x;camera.pan[1]+=n.y-gesture.y;camera.zoom=Math.max(.35,Math.min(4,camera.zoom*n.d/Math.max(gesture.d,1)));turn([0,0,1],gesture.a-n.a);}gesture=n;}syncCameraButtons('');};
canvas.onpointerup=e=>{pointers.delete(e.pointerId);gesture=getGesture();if(!moved&&view==='cube'){let r=canvas.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,nearest=projectedRoles.map(v=>({...v,d:Math.hypot(x-v.x,y-v.y)})).sort((a,b)=>a.d-b.d)[0];if(nearest&&nearest.d<35){selectedRole=nearest.i;updateReadout();toast(DATA.roles[selectedRole].direction+' · '+DATA.roles[selectedRole].name);}}};canvas.onpointercancel=e=>{pointers.delete(e.pointerId);gesture=getGesture();};canvas.onwheel=e=>{e.preventDefault();camera.zoom=Math.max(.35,Math.min(4,camera.zoom*Math.exp(-e.deltaY*.001)));};canvas.ondblclick=hide;
document.addEventListener('keydown',e=>{if(['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName)||$('about').open||$('triangleSpectrum').open)return;if(e.key===' '){e.preventDefault();togglePlay();}else if(e.key==='Enter'&&e.target===canvas){hide();}else if(e.key==='Home'){cameraPreset();}else if(e.key==='Escape'){drawer(false);if(document.body.classList.contains('clean'))hide();}else if(e.key.startsWith('Arrow')){e.preventDefault();if(e.key==='ArrowLeft')turn([0,1,0],-.12);if(e.key==='ArrowRight')turn([0,1,0],.12);if(e.key==='ArrowUp')turn([1,0,0],-.12);if(e.key==='ArrowDown')turn([1,0,0],.12);}else if(e.key==='q'||e.key==='e')turn([0,0,1],e.key==='q'?.12:-.12);else if(e.key==='+'||e.key==='=')$('zoomIn').click();else if(e.key==='-')$('zoomOut').click();else if(e.key==='w')camera.pan[1]-=15;else if(e.key==='s')camera.pan[1]+=15;else if(e.key==='a')camera.pan[0]-=15;else if(e.key==='d')camera.pan[0]+=15;});
if(document.body.dataset.triangleEnabled==='true'){S.triEnabled=true;const v=Number(document.body.dataset.triangleOrbit);if(Number.isInteger(v)&&v>=0&&v<triangleAtlas.orbits.length)S.triOrbit=v;}
if(['#triangles','#triangle-spectrum'].includes(location.hash)){S.triEnabled=true;S.palace=35;S.vertices=15;}
if(['#xyz','#hydrogen','#triangles','#triangle-spectrum'].includes(location.hash)||document.body.dataset.flowerLayout==='1')S.flowerLayout=1;sync();setView(location.hash==='#hydrogen'?'hydrogen':['#flower','#xyz','#triangles','#triangle-spectrum'].includes(location.hash)?'flower':document.body.dataset.startView||'mandala');$('play').textContent='Ⅱ';$('play').setAttribute('aria-label','Pause');$('liveText').textContent='RUNNING';resize();requestAnimationFrame(render);
