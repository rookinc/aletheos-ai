'use strict';
(() => {
const S=window.SPHERICAL,N=window.CAMERA_NAVIGATION;
const D=window.NATIVE_MODEL, $=id=>document.getElementById(id), canvas=$('scene'),ctx=canvas.getContext('2d');
const TAU=2*Math.PI, colors=['#78c8e8','#65d8c2','#b5b2f1','#dca8ce','#e2bd84'],deckNames=['1','a','b','ab'];
const F=Uint16Array.from({length:9000},(_,i)=>((Math.floor(i/1800)+1)%5)*1800+D.turn[i%1800]);
const seen=new Uint8Array(9000);
for(const c of D.cycles){if(c.length!==20)throw Error('Invalid native period');c.forEach((s,k)=>{if(seen[s]++||F[s]!==c[(k+1)%20])throw Error('Invalid native F partition');});}
if(D.cycles.length!==450||seen.some(v=>v!==1))throw Error('Incomplete native field');
const E1800=[...D.edges1800X,...D.edges1800Y],E900=[...D.edges900X,...D.edges900Y];
const requestedView=location.hash.slice(1);
let displayPrefs={};try{const value=JSON.parse(localStorage.getItem('g9000.display')||'{}');if(value&&typeof value==='object')displayPrefs=value;}catch{}
const menuOpacity=typeof displayPrefs.menuOpacity==='number'&&displayPrefs.menuOpacity>=0&&displayPrefs.menuOpacity<=1?displayPrefs.menuOpacity:.45;
const state={menuOpacity,hideStageText:displayPrefs.hideStageText!==false,view:['field','flower','light','sphere','surface','pair'].includes(requestedView)?requestedView:'light',lightInside:.85,lightInterior:1,lightShell:2.2,lightGrid:false,lightRays:true,sphereGrid:true,flowerColor:'rgb',flowerIntensity:1.4,flowerGlow:true,flowerBlack:0,flowerGrid:false,flowerWrap:1,flowerDepth:.33,flowerCircles:.49,flowerTails:.27,flowerTriangles:true,flowerPlanes:[true,true,true],flowerReadPlane:0,phase:0,selected:0,playing:true,speed:5,allDarts:true,stagger:false,nodes:true,frameEdges:true,edgeDetail:12,transportEdges:false,orbitPath:true,autoOrbit:false,focus:false,orientation:[0,0,0,1],zoom:1,panX:0,panY:0};
let W=0,H=0,headerBottom=150,ratio=1,dirty=true,lastTime=0,lastUI=0,toastTimer,hitDarts=[],researchWasPlaying=false,researchWasOrbit=false;
state.historyOverlay=null;
const P900=D.addresses.map(([i,j,g])=>{const u=TAU*i/15,v=TAU*j/15+g*.018,r=1.10+g*.18;return[(3.7+r*Math.cos(v))*Math.cos(u),r*Math.sin(v),(3.7+r*Math.cos(v))*Math.sin(u)];});
const P9000=Array.from({length:9000},(_,i)=>{const z=i%1800,k=Math.floor(i/1800),[a,b,g]=D.addresses[D.projection[z]],u=TAU*a/15,v=TAU*b/15+g*.018,r=.72+g*.14;return[(k-2)*5+r*Math.sin(v)+(D.lift[z]-.5)*.17,(3+r*Math.cos(v))*Math.cos(u),(3+r*Math.cos(v))*Math.sin(u)];});
const UNIT=P9000.map(S.unit),SPHERE=UNIT.map(p=>p.map(x=>x*5));
const Ppair=[0,1].flatMap(side=>Array.from({length:60},(_,v)=>{const th=TAU*D.deck60[v]/4+Math.PI/4;return[(D.base60[v]-7)*.85,(side===0?2.6:-2.6)+.87*Math.cos(th),.87*Math.sin(th)];}));
const screen=new Float32Array(9000*3);
let cam={};
const flower=window.FLOWER_VIEW.create({state,D,ctx,project,arrow,dot,label});
const lightView=window.LIGHT_VIEW.create({state,D,ctx,project,dot,label});
function camera(){const mobile=W<=700,clean=state.hideStageText,top=state.focus?45:clean?headerBottom+24:mobile?headerBottom+200:Math.max(100,headerBottom+24),bottom=state.focus?30:clean?110:190;
const cx=(state.focus||mobile||clean?W*.5:(W+280)*.5)+state.panX,cy=(top+H-bottom)*.5+state.panY,side=mobile?35:clean?50:380;
let scale;if(state.view==='field')scale=Math.min((W-(clean?50:mobile?24:330))/26,(H-top-bottom)/10);else if(state.view==='flower')scale=Math.min((W-side)/15,(H-top-bottom)/15);else if(state.view==='light'||state.view==='sphere')scale=Math.min((W-side)/12,(H-top-bottom)/12);else if(state.view==='surface')scale=Math.min((W-side)/13,(H-top-bottom)/9);else scale=Math.min((W-side)/17,(H-top-bottom)/10);
cam={cx,cy,scale:Math.max(7,scale)*state.zoom,rotation:N.matrix(state.orientation)};}
function project(p){const [x,y,z]=p,m=cam.rotation,q=m[0]*x+m[1]*y+m[2]*z,t=m[3]*x+m[4]*y+m[5]*z,depth=m[6]*x+m[7]*y+m[8]*z,per=42/(42-depth);return[cam.cx+q*cam.scale*per,cam.cy-t*cam.scale*per,depth];}
function point(i){return[screen[i*3],screen[i*3+1],screen[i*3+2]];}
function mapState(i){return state.view==='surface'?D.projection[i%1800]:i;}
function cyclePoint(i){return point(mapState(i));}
function segment(a,b){ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);}
function line(a,b,color,width=1){ctx.beginPath();segment(a,b);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();}
function dot(p,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.arc(p[0],p[1],r,0,TAU);ctx.fill();}
function label(p,t,color='#92aabf',size=10,align='center'){if(state.hideStageText)return;ctx.font=`${size}px ui-monospace, monospace`;ctx.fillStyle=color;ctx.textAlign=align;ctx.fillText(t,p[0],p[1]);}
function arrow(a,b,t,color,size,selected=false){const x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t,ang=Math.atan2(b[1]-a[1],b[0]-a[0]);
if(selected){line(a,b,'#ffd38a80',1.5);ctx.shadowBlur=12;ctx.shadowColor=color;}
ctx.save();ctx.translate(x,y);ctx.rotate(ang);ctx.beginPath();ctx.moveTo(size,0);ctx.lineTo(-size*.7,-size*.5);ctx.lineTo(-size*.35,0);ctx.lineTo(-size*.7,size*.5);ctx.closePath();ctx.fillStyle=color;ctx.fill();ctx.restore();ctx.shadowBlur=0;return[x,y];}
function drawFrameGuides(){for(let k=0;k<5;k++){const p=project([(k-2)*5,4.8,0]);label(p,`FRAME ${k}`,colors[k],W<=700?8:9);}
const a=project([-12,-5,0]),b=project([12,-5,0]);line(a,b,'#56718555');label([b[0]+12,b[1]+4],'x','#6a849a',10);}
function drawEdges(){if(!state.frameEdges&&!state.transportEdges)return;
if(state.view==='sphere'){drawSphereEdges();return;}
if(state.view==='field'){
if(state.frameEdges){ctx.beginPath();for(let k=0;k<5;k++)for(let n=0;n<E1800.length;n+=state.edgeDetail){const[a,b]=E1800[n];segment(point(k*1800+a),point(k*1800+b));}ctx.strokeStyle=state.edgeDetail===1?'#87b9d00b':'#87b9d022';ctx.lineWidth=.65;ctx.stroke();}
if(state.transportEdges){ctx.beginPath();for(let i=0;i<9000;i++)segment(point(i),point(F[i]));ctx.strokeStyle='#63bdce08';ctx.lineWidth=.5;ctx.stroke();}
}else if(state.view==='surface'&&state.frameEdges){[D.edges900X,D.edges900Y].forEach((es,j)=>{ctx.beginPath();for(const[a,b]of es)segment(point(a),point(b));ctx.strokeStyle=j?'#d39bcb18':'#74c9df1b';ctx.lineWidth=.65;ctx.stroke();});}}
function drawNodes(){if(!state.nodes)return;const full=state.view==='field'||state.view==='sphere',n=full?9000:900;for(let k=0;k<(full?5:1);k++){ctx.fillStyle=colors[k];const start=k*1800,end=full?start+1800:n;for(let i=start;i<end;i++){ctx.globalAlpha=state.view==='sphere'?(screen[3*i+2]>.6?.48:.10):full?.34:.55;ctx.fillRect(screen[3*i],screen[3*i+1],full?1:1.4,full?1:1.4);}}ctx.globalAlpha=1;}
function drawOrbit(){if(!state.orbitPath)return;if(state.view==='sphere'){drawSphereOrbit();return;}const c=D.cycles[state.selected];ctx.beginPath();for(let j=0;j<20;j++)segment(cyclePoint(c[j]),cyclePoint(c[(j+1)%20]));ctx.strokeStyle='#ffd38a6b';ctx.lineWidth=1.2;ctx.stroke();
for(let j=0;j<20;j++){const p=cyclePoint(c[j]);dot(p,2,'#eac88f');if(state.view==='field'&&j%5===0)dot(p,3,'#ffe4ab');}}
function drawDarts(){if(state.view==='sphere'){drawSphereDarts();return;}hitDarts=[];const n=Math.floor(state.phase)%20,frac=state.phase%1;
if(state.allDarts){ctx.globalAlpha=.74;D.cycles.forEach((c,id)=>{if(id===state.selected)return;const t=(n+(state.stagger?id%20:0))%20,p=arrow(cyclePoint(c[t]),cyclePoint(c[(t+1)%20]),frac,'#65d8e6',state.view==='surface'?2.4:2.8);hitDarts.push([p[0],p[1],id]);});ctx.globalAlpha=1;}
const c=D.cycles[state.selected],p=arrow(cyclePoint(c[n]),cyclePoint(c[(n+1)%20]),frac,'#ffdb97',7,true);dot(p,1.6,'#fff9df');hitDarts.push([p[0],p[1],state.selected]);label([p[0]+12,p[1]-12],`D${state.selected}`,'#ffe2a7',10,'left');}

function sphereProject(u){return project(u.map(x=>x*5));}
function sphericalSegments(a,b,count,visit,end=1){let p=sphereProject(a);for(let j=1;j<=count;j++){const q=sphereProject(S.arc(a,b,end*j/count));visit(p,q);p=q;}}
function sphereStroke(a,b,color,width=1,count=24){const parts=[[],[]];sphericalSegments(a,b,count,(p,q)=>parts[(p[2]+q[2])/2>.6?1:0].push([p,q]));for(let side=0;side<2;side++){ctx.globalAlpha=side?1:.25;ctx.beginPath();for(const[p,q]of parts[side])segment(p,q);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();}ctx.globalAlpha=1;}
function drawSphereGrid(){
 const center=project([0,0,0]),r=5*cam.scale*42/Math.sqrt(42*42-25);
 const glow=ctx.createRadialGradient(center[0]-r*.3,center[1]-r*.35,r*.1,center[0],center[1],r);
 glow.addColorStop(0,'#1b3b502a');glow.addColorStop(1,'#1c4b6622');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(center[0],center[1],r,0,TAU);ctx.fill();
 ctx.strokeStyle='#86b8d238';ctx.lineWidth=1;ctx.stroke();
 if(state.sphereGrid||state.view==='flower'){const paths=[[],[]],add=points=>{for(let i=1;i<points.length;i++){const p=sphereProject(points[i-1]),q=sphereProject(points[i]);paths[(p[2]+q[2])/2>.6?1:0].push([p,q]);}};
 for(let lat=-60;lat<=60;lat+=30){const v=lat*Math.PI/180;add(Array.from({length:121},(_,i)=>[Math.cos(v)*Math.cos(TAU*i/120),Math.sin(v),Math.cos(v)*Math.sin(TAU*i/120)]));}
 for(let lon=0;lon<360;lon+=30){const v=lon*Math.PI/180;add(Array.from({length:61},(_,i)=>{const a=-Math.PI/2+Math.PI*i/60;return[Math.cos(a)*Math.cos(v),Math.sin(a),Math.cos(a)*Math.sin(v)];}));}
 for(let side=0;side<2;side++){ctx.beginPath();for(const[p,q]of paths[side])segment(p,q);ctx.strokeStyle=side?'#91bfd53e':'#91bfd51b';ctx.lineWidth=.75;ctx.setLineDash(side?[]:[2,4]);ctx.stroke();}ctx.setLineDash([]);
 const north=sphereProject([0,1.09,0]),south=sphereProject([0,-1.09,0]);label(north,'+Y · N','#a8c8d8',W<=700?8:10);label(south,'−Y · S','#7898ab',W<=700?8:10);
 for(const[v,text]of [[[1.11,0,0],'λ 0°'],[[0,0,1.11],'λ +90°']])label(sphereProject(v),text,'#7898ab',W<=700?8:9);
 }
}
function drawSphereEdges(){
 if(state.frameEdges){ctx.beginPath();for(let k=0;k<5;k++)for(let i=0;i<E1800.length;i+=state.edgeDetail){const[a,b]=E1800[i];sphericalSegments(UNIT[k*1800+a],UNIT[k*1800+b],5,(p,q)=>segment(p,q));}ctx.strokeStyle=state.edgeDetail===1?'#87b9d004':'#87b9d00d';ctx.lineWidth=.6;ctx.stroke();}
 if(state.transportEdges){ctx.beginPath();for(let i=0;i<9000;i++)sphericalSegments(UNIT[i],UNIT[F[i]],8,(p,q)=>segment(p,q));ctx.strokeStyle='#63bdce05';ctx.lineWidth=.5;ctx.stroke();}
}
function drawSphereOrbit(){const c=D.cycles[state.selected];for(let i=0;i<20;i++)sphereStroke(UNIT[c[i]],UNIT[c[(i+1)%20]],'#ffd38a9a',1.35);for(const s of c){const p=cyclePoint(s);dot(p,p[2]>.6?2.7:1.5,p[2]>.6?'#ffe0a5':'#9b855e');}}
function drawSphereDarts(){hitDarts=[];const n=Math.floor(state.phase)%20,f=state.phase%1;
 function dart(c,id,offset,selected){const j=(n+offset)%20,a=UNIT[c[j]],b=UNIT[c[(j+1)%20]],u=S.arc(a,b,f),v=S.arc(a,b,Math.min(1,f+.008)),p=sphereProject(u),q=sphereProject(v);ctx.globalAlpha=p[2]>.6?1:selected?.65:.25;if(selected){sphereStroke(a,b,'#ffd38a80',1.2);ctx.globalAlpha=p[2]>.6?1:.65;ctx.shadowBlur=12;ctx.shadowColor='#ffdb97';}arrow(p,q,0,selected?'#ffdb97':'#65d8e6',selected?7:2.8);if(selected){dot(p,1.5,'#fff7dc');label([p[0]+12,p[1]-12],`D${id}`,'#ffe2a7',10,'left');}hitDarts.push([p[0],p[1],id]);ctx.globalAlpha=1;}
 if(state.allDarts)D.cycles.forEach((c,id)=>{if(id!==state.selected)dart(c,id,state.stagger?id%20:0,false);});dart(D.cycles[state.selected],state.selected,0,true);
}

function boxCorners(x0,x1,y0,y1,z0,z1){return[[x0,y0,z0],[x1,y0,z0],[x1,y1,z0],[x0,y1,z0],[x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1]].map(project);}
function drawPair(){for(let side=0;side<2;side++){const y=side===0?2.6:-2.6;
for(let half=0;half<2;half++)for(let q=0;q<4;q++){const xs=half?0:-6.8,xe=half?6.8:0,ys=q===0||q===3?y:y-1,zs=q<2?0:-1;const ps=boxCorners(xs,xe,ys,ys+1,zs,zs+1);ctx.beginPath();for(const[a,b]of[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]])segment(ps[a],ps[b]);ctx.strokeStyle=q%2?'#b6a4e528':'#63cfe230';ctx.lineWidth=.8;ctx.stroke();}
if(state.frameEdges){ctx.beginPath();for(const[a,b]of D.edges60)segment(point(side*60+a),point(side*60+b));ctx.strokeStyle=side?'#dba9c34a':'#85d5df4a';ctx.lineWidth=1;ctx.stroke();}
if(state.nodes)for(let v=0;v<60;v++)dot(point(side*60+v),2.3,colors[D.deck60[v]]);
label(project([-7.2,y,0]),side?'G60 · y':'G60 · x',side?'#dfa9cb':'#8ddce6',11,'right');
for(let g=0;g<4;g++){const th=TAU*g/4+Math.PI/4;label(project([7.5,y+1.15*Math.cos(th),1.15*Math.sin(th)]),deckNames[g],colors[g],10);}}
const c=D.cycles[state.selected],n=Math.floor(state.phase)%20,s=c[n],next=c[(n+1)%20],pair=D.pairs1800[s%1800],pairN=D.pairs1800[next%1800],p1=point(pair[0]),p2=point(60+pair[1]);
line(p1,p2,'#ffd38a80',1.5);for(let side=0;side<2;side++){const p=point(side*60+pair[side]),q=point(side*60+pairN[side]);dot(p,5,'#ffda94');arrow(p,q,state.phase%1,'#ffe3a9',7,true);label([p[0],p[1]-13],`${side?'y':'x'} = ${pair[side]}`,'#ffe3a9',11);}
const p=project([0,-4.8,0]);label(p,'T[x, y] = [ab·y, x]','#b1c8d7',11);label([p[0],p[1]+18],'60 × 60 / 4 = 900 · shared deck orbit','#7392a7',10);}
function drawHistoryOverlay(){
 const h=state.historyOverlay;if(!h)return;hitDarts=[];ctx.save();
 if(state.view==='sphere'){for(let j=0;j<10;j++)sphereStroke(UNIT[h.path[j]],UNIT[h.path[j+1]],'#8ddde5b0',2.2,16);}
 else{ctx.beginPath();for(let j=0;j<10;j++)segment(point(h.path[j]),point(h.path[j+1]));ctx.strokeStyle='#66ddea99';ctx.lineWidth=2.2;ctx.stroke();
 ctx.setLineDash([4,7]);ctx.beginPath();for(let j=0;j<10;j++)segment(point(h.reverse[j]),point(h.reverse[j+1]));ctx.strokeStyle='#f5c779b0';ctx.lineWidth=1.2;ctx.stroke();ctx.setLineDash([]);}
 for(const id of h.path.slice(0,10)){const p=point(id);dot(p,3,'#c0e0e9');label([p[0]+8,p[1]-9],String(id+1),'#b5d1df',10,'left');}
 const f=point(h.path[h.cursor]),r=point(h.reverse[h.cursor]);ctx.strokeStyle='#66ddea';ctx.lineWidth=2.3;ctx.beginPath();ctx.arc(f[0],f[1],8,0,TAU);ctx.stroke();dot(r,4.5,'#f5c779');ctx.restore();
}
function clearHistoryOverlay(){state.historyOverlay=null;$('returnFieldBanner').hidden=true;dirty=true;}
function draw(){camera();ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,W,H);const gradient=ctx.createRadialGradient(cam.cx,cam.cy,20,cam.cx,cam.cy,Math.max(W,H)*.62);const paper=state.view==='flower'&&state.flowerColor==='cmyk',light=state.view==='light'||state.view==='flower'&&state.flowerColor==='rgb';gradient.addColorStop(0,paper?'#ffffff':light?'#020409':'#102438');gradient.addColorStop(.58,paper?'#ffffff':light?'#020409':'#0a1422');gradient.addColorStop(1,paper?'#ffffff':light?'#020409':'#080e19');ctx.fillStyle=gradient;ctx.fillRect(0,0,W,H);
if(state.view==='light'){hitDarts=lightView.render();edgeNote();dirty=false;return;}
if(state.view==='flower'){hitDarts=flower.render();if(state.flowerGrid)drawSphereGrid();dirty=false;return;}
const points=state.view==='sphere'?SPHERE:state.view==='field'?P9000:state.view==='surface'?P900:Ppair;for(let i=0;i<points.length;i++){const p=project(points[i]);screen[i*3]=p[0];screen[i*3+1]=p[1];screen[i*3+2]=p[2];}
if(state.view==='sphere')drawSphereGrid();
if(state.view==='pair'){hitDarts=[];drawPair();}else{if(state.view==='field')drawFrameGuides();drawEdges();drawNodes();if(state.historyOverlay)drawHistoryOverlay();else{drawOrbit();drawDarts();}}
if(state.view==='surface'){const p=project([0,-3.2,0]);label(p,'15 × 15 × 4 · diagonal deck quotient','#829eb1',10);}
dirty=false;}
const descriptions={light:{eyebrow:'NONCONSTANT MOTION · NEUTRAL PROJECTION',title:'The white projection.',description:'The colored motion stays inside. Its shared RGB contribution spreads across the outer sphere, with each orbit’s constant mean removed.',formula:'q = p − ⟨p⟩ · W = min(R, G, B)',vertices:'9,000',edges:'45,000',third:'450',thirdLabel:'dart cycles',note:'Interior: color residual · sphere: common white · r = 1'},flower:{eyebrow:'19 CIRCLES · THREE SPHERICAL CHARTS',title:'The Thalean flower.',description:'All 450 native routes, each drawn in XY, XZ and YZ. The original circles wrap onto spherical coordinates; bloom depth becomes radius.',formula:'19 × 3 charts · 450 × 3 copies',vertices:'9,000',edges:'45,000',third:'450',thirdLabel:'dart cycles',note:'Circle-preserving projection · coordinate readout: XY copy'},sphere:{eyebrow:'NATIVE ACTION · SPHERICAL PROJECTION',title:'The spherical return.',description:'The same 450 darts, projected radially onto a unit sphere. Follow F along spherical arcs in latitude and longitude.',formula:'u = p / ‖p‖ · r = 1',vertices:'9,000',edges:'45,000',third:'450',thirdLabel:'dart cycles',note:'Unit sphere · north +Y · longitude 0° at +X, +90° at +Z'},field:{eyebrow:'FIVE FRAMES · TWO LIFTS',title:'The full return.',description:'Two G60 factors form G900. A double cover and five frames carry the native dart motion.',formula:'F(k, z) = (k + 1, Tz)',vertices:'9,000',edges:'45,000',third:'450',thirdLabel:'dart cycles',note:'5 × G1800 · chosen toroidal embedding'},surface:{eyebrow:'PAIRED QUOTIENT · DIAGONAL DECK',title:'The paired surface.',description:'Each shared deck orbit identifies four ordered pairs. Two edge families preserve the two G60 factors.',formula:'G900 = (G60 □ G60) / diag D',vertices:'900',edges:'3,600',third:'8',thirdLabel:'degree',note:'G900 alone repeats in 2 steps · frame + G900 in 10'},pair:{eyebrow:'TWO CARRIERS · ONE CONSTRUCTION',title:'The generating pair.',description:'The two canonical factors of the selected state. Each carrier retains its 60 native vertices and 120 edges.',formula:'60 × 60 / {1, a, b, ab} → 900',vertices:'60 + 60',edges:'120 + 120',third:'4',thirdLabel:'deck maps',note:'Eight sectors per bar are display geometry · deck labels are endpoint maps'}};
function updateView(){if(!['field','sphere'].includes(state.view))clearHistoryOverlay();$('returnFieldBanner').hidden=state.focus||!state.historyOverlay;$('headerWhiteLight').disabled=state.view!=='light';$('headerWhiteControl').classList.toggle('inactive',state.view!=='light');$('headerWhiteControl').title=state.view==='light'?'White-light projection strength':'White light is available in the Light view';$('sphericalReadout').hidden=!['sphere','flower','light'].includes(state.view);$('sphereControls').hidden=state.view!=='sphere';$('flowerControls').hidden=state.view!=='flower';$('lightControls').hidden=state.view!=='light';$('fieldGeometryControls').hidden=['flower','light'].includes(state.view);updateFlowerColor();document.body.dataset.view=state.view;const d=descriptions[state.view];for(const[id,key]of[['viewEyebrow','eyebrow'],['viewTitle','title'],['viewDescription','description'],['viewFormula','formula'],['statVertices','vertices'],['statEdges','edges'],['statThird','third'],['statThirdLabel','thirdLabel'],['sceneNote','note']])$(id).textContent=d[key];document.querySelectorAll('[data-view]').forEach(b=>{b.classList.toggle('active',b.dataset.view===state.view);b.setAttribute('aria-pressed',String(b.dataset.view===state.view));});canvas.setAttribute('aria-label',state.view==='light'?'Nonconstant RGB dart components inside a sphere. Only the shared white directional contribution is projected onto the outer unit sphere. Drag to orbit.':state.view==='flower'?'Full Thalean flower with 19 circles per chart and three copies of all 450 native routes. Drag to orbit.':state.view==='sphere'?'Native G9000 dart motion projected onto a unit sphere. Drag to orbit; latitude and longitude follow the selected dart.':'Interactive native G9000 graph. Drag to orbit, scroll or pinch to zoom.');edgeNote();resetCamera();updateUI();}
function updateFlowerColor(){
 const c=window.FLOWER_COLOR.profile(state.flowerColor,state.flowerBlack);document.body.dataset.flowerColor=state.view==='flower'?c.mode:'';
 $('flowerLightControls').hidden=c.mode!=='rgb';$('flowerInkControls').hidden=c.mode!=='cmyk';
 $('flowerColorHint').textContent=c.mode==='rgb'?'XY → R · XZ → G · YZ → B. Overlapping traces add toward white.':c.mode==='cmyk'?'XY → C · XZ → M · YZ → Y. Overlapping ink darkens on white. K adds black to the marks.':'The original cyan, gold and violet plane colors.';
 $('sceneLegend').innerHTML=state.view==='light'?'<span><i style=background:#ff443e></i>R</span><span><i style=background:#32f27a></i>G</span><span><i style=background:#527fff></i>B</span><span><i style=background:white></i>White sphere</span>':state.view==='flower'?c.colors.map((v,i)=>`<span><i style="background:${v}"></i>${['XY','XZ','YZ'][i]}${c.mode==='original'?'':' · '+c.channels[i]}</span>`).join('')+(c.mode==='cmyk'?`<span>K ${Math.round(state.flowerBlack*100)}%</span>`:''):'<span><i class=cyan></i>450 native darts</span><span><i class=gold></i>Selected dart</span>';
}
function edgeNote(){let t;if(state.view==='light'){const s=lightView.stats();t=`${s.lit.toLocaleString()} / ${s.total.toLocaleString()} cells share R + G + B · cycle mean removed`;$('sceneNote').textContent=`Color inside · white outside · shell readout: ${['XY','XZ','YZ'][state.flowerReadPlane]}`;}else if(state.view==='flower'){const copies=state.flowerPlanes.filter(Boolean).length*(state.allDarts?450:1);t=`450 native routes · ${copies.toLocaleString()} visible copies · ${Math.round(state.flowerWrap*100)}% wrapped`;$('sceneNote').textContent=`${state.flowerWrap===1?'Spherical flower':state.flowerWrap===0?'Original three-plane flower':'Plane → sphere morph'} · readout: ${['XY','XZ','YZ'][state.flowerReadPlane]} copy · D0 = original F1`;}else if(state.view==='field'||state.view==='sphere')t=`${state.frameEdges?(36000/state.edgeDetail).toLocaleString():0} / 36,000 frame edges shown${state.frameEdges&&state.edgeDetail>1?' · sampled':''} · ${state.transportEdges?'9,000':'0'} background F edges`;else t=state.view==='surface'?'All 3,600 surface edges retained · selected native lift stays in the inspector':'Exact G60 adjacency · highlighted pair is a canonical representative';$('edgeNote').textContent=t;}
function updateTailReadout(){const e=window.FLOWER_TAIL.endpoints(state.flowerTails);for(const id of ['flowerTailReadout','lightTailReadout'])$(id).textContent=`20 steps · newest ${Math.round(e.first*100)}% → oldest ${Math.round(e.last*100)}%`;}
function updateUI(){const n=Math.floor(state.phase)%20,c=D.cycles[state.selected],s=c[n],z=s%1800,p=D.projection[z];$('stateId').textContent=s;$('frameLift').textContent=`${Math.floor(s/1800)} / ${D.lift[z]}`;$('projectionId').textContent=p;$('pairId').textContent=`(${D.pairs1800[z].join(', ')})`;$('nextState').textContent=`${s} → ${c[(n+1)%20]}`;$('stepValue').textContent=state.phase===20?'20':String(n);$('phase').value=state.phase;if(document.activeElement!==$('dartId'))$('dartId').value=state.selected;
let t=state.view==='light'?'Follow inner color · read its shell direction':state.view==='flower'?'Three colored copies · one native state':'All indices zero-based · follow the gold dart';if(state.phase===20)t='Full native state returned · F²⁰ = I';else if(n===10)t='Frame + G900 returned · opposite lift';else if(n===5||n===15)t='Frame returned · G900 state changed';else if(n===0)t='Start state · all indices zero-based';else if(n%2===0)t='G900 repeats · frame has not returned';$('returnStatus').textContent=t;if(['sphere','flower','light'].includes(state.view)){const v=state.view==='light'?(lightView.point(state.selected,state.phase)||[0,0,0]):state.view==='flower'?flower.point(state.selected,state.phase,state.flowerReadPlane):S.arc(UNIT[s],UNIT[c[(n+1)%20]],state.phase%1),r=Math.hypot(...v),q=r>1e-10?S.coordinates(v):null;$('radiusValue').textContent=r.toFixed(3);$('latitude').textContent=q?`${(q.latitude*180/Math.PI).toFixed(1)}°`:'—';$('longitude').textContent=q&&Math.hypot(v[0],v[2])>1e-10?`${(q.longitude*180/Math.PI).toFixed(1)}°`:'—';}
document.querySelectorAll('[data-checkpoint]').forEach(b=>b.classList.toggle('active',Number(b.dataset.checkpoint)===Math.floor(state.phase)));Array.from($('phaseTrack').children).forEach((e,i)=>e.classList.toggle('active',i<=Math.floor(state.phase)));
$('play').textContent=state.playing?'Ⅱ':'▷';$('play').setAttribute('aria-label',state.playing?'Pause native dart motion':'Play native dart motion');$('focusPlay').textContent=state.playing?'Ⅱ':'▷';}
function setPhase(p){clearHistoryOverlay();state.playing=false;state.phase=Math.max(0,Math.min(20,p));updateUI();dirty=true;}
function chooseDart(id){clearHistoryOverlay();state.selected=((Math.round(id)%450)+450)%450;updateUI();dirty=true;}
function play(){clearHistoryOverlay();state.playing=!state.playing;if(state.playing&&state.phase===20)state.phase=0;lastTime=performance.now();updateUI();dirty=true;}
function resetCamera(){const yaw=state.view==='field'?(W<=700?-.65:-.42):state.view==='surface'?-.2:['flower','light'].includes(state.view)?-.65:-.18,pitch=state.view==='surface'?.7:state.view==='sphere'?.18:['flower','light'].includes(state.view)?.42:W<=700?.45:.28;state.orientation=N.initial(yaw,pitch);state.zoom=1;state.panX=state.panY=0;dirty=true;}
function rollCamera(angle){state.orientation=N.turn(state.orientation,[0,0,1],angle);dirty=true;}
function zoomCamera(factor){state.zoom=N.zoom(state.zoom,factor);dirty=true;}
function measureHeader(){const bottom=document.querySelector('.topbar').getBoundingClientRect().bottom;if(bottom>0)headerBottom=bottom;document.documentElement.style.setProperty('--header-bottom',headerBottom+'px');}
function resize(){measureHeader();W=innerWidth;H=innerHeight;ratio=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(W*ratio);canvas.height=Math.round(H*ratio);dirty=true;}
function applyDisplay(persist=false){
 document.documentElement.style.setProperty('--menu-opacity',state.menuOpacity);document.body.dataset.hideStageText=String(state.hideStageText);
 $('menuOpacity').value=state.menuOpacity;$('menuOpacityOut').value=Math.round(state.menuOpacity*100)+'%';$('hideStageText').checked=state.hideStageText;
 if(persist)try{localStorage.setItem('g9000.display',JSON.stringify({menuOpacity:state.menuOpacity,hideStageText:state.hideStageText}));}catch{}
 dirty=true;
}
function focus(on){state.focus=on;document.querySelectorAll('.chrome').forEach(e=>{if(e!==$('settings'))e.hidden=on;});$('settings').hidden=true;$('settingsBtn').setAttribute('aria-expanded','false');$('restore').hidden=!on;$('focusPlay').hidden=!on;$('returnFieldBanner').hidden=on||!state.historyOverlay;if(!on)measureHeader();dirty=true;}
function toast(message){$('toast').textContent=message;$('toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').hidden=true,2400);}
for(let i=0;i<20;i++){const e=document.createElement('i');e.style.background=colors[i%5];$('phaseTrack').appendChild(e);}
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{state.view=b.dataset.view;history.replaceState(null,'',`#${state.view}`);updateView();});document.querySelectorAll('[data-checkpoint]').forEach(b=>b.onclick=()=>setPhase(Number(b.dataset.checkpoint)));
$('play').onclick=$('focusPlay').onclick=play;$('back').onclick=()=>setPhase(state.phase<=0?19:Math.ceil(state.phase)-1);$('forward').onclick=()=>setPhase(state.phase>=20?1:Math.floor(state.phase)+1);$('phase').oninput=e=>setPhase(Number(e.target.value));
$('dartId').oninput=e=>{const id=Number(e.target.value);if(e.target.value!==''&&Number.isInteger(id)&&id>=0&&id<450)chooseDart(id);};$('dartId').onchange=e=>chooseDart(Number(e.target.value)||0);$('prevDart').onclick=()=>chooseDart(state.selected-1);$('nextDart').onclick=()=>chooseDart(state.selected+1);
function setSpeed(value){state.speed=Number(value);$('speed').value=$('headerSpeed').value=state.speed;$('speedOut').value=state.speed.toFixed(1);$('headerSpeedOut').value=state.speed.toFixed(1)+' /s';}
function setWhiteLight(value){state.lightShell=Number(value);$('lightShell').value=$('headerWhiteLight').value=state.lightShell;$('lightShellOut').value=$('headerWhiteOut').value=state.lightShell.toFixed(1)+'×';dirty=true;}
$('speed').oninput=$('headerSpeed').oninput=e=>setSpeed(e.target.value);
$('lightShell').oninput=$('headerWhiteLight').oninput=e=>setWhiteLight(e.target.value);
for(const id of ['lightGrid','lightRays','flowerGrid','sphereGrid','allDarts','stagger','nodes','frameEdges','transportEdges','orbitPath','autoOrbit'])$(id).onchange=e=>{state[id]=e.target.checked;if(id==='orbitPath')$('flowerOrbit').checked=state.orbitPath;dirty=true;edgeNote();};$('edgeDetail').onchange=e=>{state.edgeDetail=Number(e.target.value);dirty=true;edgeNote();};
for(const id of ['flowerWrap','flowerDepth','flowerCircles','flowerTails'])$(id).oninput=e=>{state[id]=Number(e.target.value);$(id+'Out').value=`${Math.round(state[id]*100)}%`;if(id==='flowerDepth'){$('lightDepth').value=state[id];$('lightDepthOut').value=Math.round(state[id]*100)+'%';}dirty=true;edgeNote();updateUI();};
$('flowerTriangles').onchange=e=>{state.flowerTriangles=e.target.checked;dirty=true;};
$('flowerOrbit').onchange=e=>{state.orbitPath=e.target.checked;$('orbitPath').checked=state.orbitPath;dirty=true;};
['XY','XZ','YZ'].forEach((plane,i)=>$('flower'+plane).onchange=e=>{state.flowerPlanes[i]=e.target.checked;$('light'+['R','G','B'][i]).checked=e.target.checked;dirty=true;edgeNote();});
$('flowerReadPlane').onchange=e=>{state.flowerReadPlane=Number(e.target.value);$('lightReadPlane').value=state.flowerReadPlane;edgeNote();updateUI();dirty=true;};
for(const id of ['lightInside','lightInterior'])$(id).oninput=e=>{state[id]=Number(e.target.value);$(id+'Out').value=Math.round(state[id]*100)+'%';dirty=true;};
$('lightTails').oninput=e=>{state.flowerTails=Number(e.target.value);$('flowerTails').value=state.flowerTails;$('lightTailsOut').value=$('flowerTailsOut').value=Math.round(state.flowerTails*100)+'%';updateTailReadout();dirty=true;};
$('lightDepth').oninput=e=>{state.flowerDepth=Number(e.target.value);$('flowerDepth').value=state.flowerDepth;$('lightDepthOut').value=$('flowerDepthOut').value=Math.round(state.flowerDepth*100)+'%';dirty=true;updateUI();};
['R','G','B'].forEach((channel,i)=>$('light'+channel).onchange=e=>{state.flowerPlanes[i]=e.target.checked;$('flower'+['XY','XZ','YZ'][i]).checked=e.target.checked;dirty=true;});
$('lightReadPlane').onchange=e=>{state.flowerReadPlane=Number(e.target.value);$('flowerReadPlane').value=state.flowerReadPlane;dirty=true;updateUI();edgeNote();};
updateTailReadout();
$('flowerTails').oninput=e=>{state.flowerTails=Number(e.target.value);$('lightTails').value=state.flowerTails;$('lightTailsOut').value=Math.round(state.flowerTails*100)+'%';$('flowerTailsOut').value=`${Math.round(state.flowerTails*100)}%`;updateTailReadout();dirty=true;};
$('flowerColor').onchange=e=>{state.flowerColor=e.target.value;updateFlowerColor();dirty=true;};
$('flowerIntensity').oninput=e=>{state.flowerIntensity=Number(e.target.value);$('flowerIntensityOut').value=state.flowerIntensity.toFixed(1)+'×';dirty=true;};
$('flowerGlow').onchange=e=>{state.flowerGlow=e.target.checked;dirty=true;};
$('flowerBlack').oninput=e=>{state.flowerBlack=Number(e.target.value);$('flowerBlackOut').value=Math.round(state.flowerBlack*100)+'%';updateFlowerColor();dirty=true;};
$('menuOpacity').oninput=e=>{state.menuOpacity=Number(e.target.value);applyDisplay(true);};
$('hideStageText').onchange=e=>{state.hideStageText=e.target.checked;applyDisplay(true);};
$('settingsBtn').onclick=()=>{$('settings').hidden=!$('settings').hidden;$('settingsBtn').setAttribute('aria-expanded',String(!$('settings').hidden));};$('closeSettings').onclick=()=>{$('settings').hidden=true;$('settingsBtn').setAttribute('aria-expanded','false');};
$('aboutBtn').onclick=()=>{$('about').showModal();};$('closeAbout').onclick=()=>$('about').close();$('about').onclick=e=>{if(e.target===$('about')){const r=$('about').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('about').close();}};
$('home').onclick=$('resetCamera').onclick=resetCamera;$('zoomOut').onclick=()=>zoomCamera(1/1.2);$('zoomIn').onclick=()=>zoomCamera(1.2);$('rollLeft').onclick=()=>rollCamera(Math.PI/12);$('rollRight').onclick=()=>rollCamera(-Math.PI/12);$('focusBtn').onclick=()=>focus(true);$('restore').onclick=()=>focus(false);
$('saveImage').onclick=()=>{draw();const out=document.createElement('canvas');out.width=canvas.width;out.height=canvas.height;const c=out.getContext('2d');c.drawImage(canvas,0,0);c.scale(ratio,ratio);if(!state.hideStageText){c.fillStyle=state.view==='flower'&&state.flowerColor==='cmyk'?'#243646':'#c8dce9';c.font='13px ui-monospace,monospace';c.fillText(state.historyOverlay?`G9000 · Registered return · edge ${state.historyOverlay.cursor} / 10`:`G9000 · ${state.view.toUpperCase()}${state.view==='flower'?' · '+state.flowerColor.toUpperCase():''} · dart ${state.selected} · F step ${Math.floor(state.phase)} / 20`,24,H-45);c.font='10px ui-monospace,monospace';c.fillStyle='#8ca4ba';c.fillText('Native connectivity and F transport · chosen geometric embedding',24,H-25);}out.toBlob(blob=>{if(!blob)return;const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`g9000-${state.view}-dart-${state.selected}.png`;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);toast('Image saved');});};
const pointers=new Map();let gesture=null,down=null;
function pinch(){const p=[...pointers.values()];return{distance:Math.hypot(p[1][0]-p[0][0],p[1][1]-p[0][1]),angle:Math.atan2(p[1][1]-p[0][1],p[1][0]-p[0][0]),x:(p[0][0]+p[1][0])/2,y:(p[0][1]+p[1][1])/2};}
canvas.oncontextmenu=e=>e.preventDefault();
canvas.onpointerdown=e=>{canvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,[e.clientX,e.clientY]);down={x:e.clientX,y:e.clientY,moved:pointers.size>1,mode:e.button===1||e.button===2||e.shiftKey?'pan':e.altKey?'roll':'orbit'};if(pointers.size===2)gesture=pinch();};
canvas.onpointermove=e=>{if(!pointers.has(e.pointerId))return;const old=pointers.get(e.pointerId),dx=e.clientX-old[0],dy=e.clientY-old[1];pointers.set(e.pointerId,[e.clientX,e.clientY]);if(down&&Math.hypot(e.clientX-down.x,e.clientY-down.y)>4)down.moved=true;
 if(pointers.size===2){const g=pinch();if(gesture){state.zoom=N.zoom(state.zoom,g.distance/Math.max(1,gesture.distance));state.panX+=g.x-gesture.x;state.panY+=g.y-gesture.y;state.orientation=N.turn(state.orientation,[0,0,1],-N.angleDelta(g.angle,gesture.angle));}gesture=g;}
 else if(e.shiftKey||down?.mode==='pan'){state.panX+=dx;state.panY+=dy;}
 else if(e.altKey||down?.mode==='roll')state.orientation=N.turn(state.orientation,[0,0,1],-dx*.006);
 else state.orientation=N.orbit(state.orientation,dx,dy);dirty=true;};
canvas.onpointerup=e=>{if(down&&!down.moved&&down.mode==='orbit'&&pointers.size===1){let hit=null,dist=14;for(const p of hitDarts){const d=Math.hypot(p[0]-e.clientX,p[1]-e.clientY);if(d<dist){dist=d;hit=p[2];}}if(hit!==null)chooseDart(hit);}pointers.delete(e.pointerId);gesture=null;down=null;};
canvas.onpointercancel=e=>{pointers.delete(e.pointerId);gesture=down=null;};
canvas.addEventListener('wheel',e=>{e.preventDefault();zoomCamera(Math.exp(-e.deltaY*.001));},{passive:false});
window.addEventListener('keydown',e=>{if(['INPUT','SELECT','TEXTAREA'].includes(document.activeElement.tagName)||$('about').open||$('researchWorkbench').open||e.ctrlKey||e.metaKey)return;const k=e.key.toLowerCase();if(['w','a','s','d','q','e','r','+','=','-'].includes(k)){e.preventDefault();if(k==='q')rollCamera(.1);else if(k==='e')rollCamera(-.1);else if(k==='r')resetCamera();else if(k==='+'||k==='=')zoomCamera(1.12);else if(k==='-')zoomCamera(1/1.12);else{state.panX+=(k==='d'?24:k==='a'?-24:0);state.panY+=(k==='s'?24:k==='w'?-24:0);dirty=true;}return;}if(e.code==='Space'){e.preventDefault();play();}if(e.code==='ArrowRight'){e.preventDefault();$('forward').click();}if(e.code==='ArrowLeft'){e.preventDefault();$('back').click();}if(e.code==='Escape'){focus(false);$('settings').hidden=true;}});
window.addEventListener('hashchange',()=>{const requested=location.hash.slice(1);if(requested.startsWith('explore-'))return;const view=descriptions[requested]?requested:'light';state.view=view;updateView();});window.addEventListener('resize',resize);document.addEventListener('visibilitychange',()=>{lastTime=performance.now();});
window.addEventListener('g9000:explore',e=>{
 if(e.detail.open){researchWasPlaying=state.playing;researchWasOrbit=state.autoOrbit;state.playing=false;state.autoOrbit=false;$('settings').hidden=true;$('settingsBtn').setAttribute('aria-expanded','false');}
 else{state.playing=e.detail.resume?researchWasPlaying:false;state.autoOrbit=researchWasOrbit;lastTime=performance.now();}updateUI();dirty=true;
});
window.addEventListener('g9000:show-return',e=>{
 const h=window.RESEARCH_DATA?.history,q=e.detail;if(window.RESEARCH_REGISTRATION?.status!=='PASS'||!h||!Array.isArray(q.path)||!Array.isArray(q.reverse)||q.path.length!==11||q.reverse.length!==11||!q.path.every((v,i)=>v===h.forward[i])||!q.reverse.every((v,i)=>v===h.reverse[i]))return;
 state.historyOverlay={path:h.forward.slice(),reverse:h.reverse.slice(),cursor:Math.max(0,Math.min(10,Math.round(q.cursor)||0))};state.playing=false;state.view='field';$('returnFieldStep').textContent=state.historyOverlay.cursor+' / 10';updateView();history.replaceState(null,'','#field');$('returnFieldBanner').hidden=false;dirty=true;
});
$('returnFieldClear').onclick=clearHistoryOverlay;$('returnFieldExplore').onclick=()=>window.RESEARCH_WORKBENCH.open('return');
function animate(time){const dt=lastTime?Math.max(0,(time-lastTime)/1000):0;lastTime=time;if(!document.hidden){if(state.playing){state.phase=(state.phase+dt*state.speed)%20;dirty=true;}if(state.autoOrbit){state.orientation=N.turn(state.orientation,[0,1,0],dt*.1);dirty=true;}if(time-lastUI>85){if(state.playing)updateUI();lastUI=time;}if(dirty)draw();}requestAnimationFrame(animate);}
applyDisplay();setSpeed(state.speed);setWhiteLight(state.lightShell);resize();updateView();requestAnimationFrame(animate);
})();
