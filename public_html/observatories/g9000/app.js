'use strict';
(() => {
const D=window.G60_DATA,$=id=>document.getElementById(id),canvas=$('universe'),ctx=canvas.getContext('2d');
const codes=['+1','+2','+3','+4','−4','−3','−2','−1'],words=['1','a','b','ab','ba','b','a','1'];
const stepAngles=[Math.PI/2,0,-Math.PI/2,-Math.PI,-Math.PI,-Math.PI/2,0,Math.PI/2,Math.PI/2];
const defaults={phase:0,speed:.15,playing:false,view:'face',yaw:0,pitch:0,zoom:1,panX:0,panY:0,autoOrbit:false,field:true,fieldAlpha:.55,edges:true,edgeAlpha:.32,vertices:true,poleLabels:true,vertexLabels:false,tracer:true};
let state={...defaults},selected=null,focus=false,W=0,H=0,dpr=1,origin=[0,0],scale=1,points=[],last=0,lastUi=0,toastTimer;
const colorN=[255,115,125],colorS=[98,202,255],mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t),rgba=(c,a=1)=>`rgba(${c[0]},${c[1]},${c[2]},${a})`;
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x)),mod=(n,m)=>(n%m+m)%m;
const base=D.angles.map(a=>[.86*Math.cos(a),.86*Math.sin(a),0]);
const nodeColors=D.angles.map(a=>mix(colorS,colorN,(Math.tanh(-Math.cos(2*a)*3)+1)/2));
const fieldCurves=[];
for(const sy of [-1,1])for(const sx of [-1,1])for(let k=0;k<7;k++){
 const c=1.12+k*.125,off=.25-k*.029,rim=Math.sqrt(.92**2-off**2),P=[[sx*off,sy*rim],[sx*off,sy*c],[sx*c,sy*off],[sx*rim,sy*off]],pts=[];
 for(let j=0;j<=65;j++){let t=j/65,u=1-t;pts.push([u**3*P[0][0]+3*u*u*t*P[1][0]+3*u*t*t*P[2][0]+t**3*P[3][0],u**3*P[0][1]+3*u*u*t*P[1][1]+3*u*t*t*P[2][1]+t**3*P[3][1],.07*Math.sin(Math.PI*t)*(k-3)]);}
 fieldCurves.push({pts,k});
}
function validateGraph(){
 if(D.adjacency.length!==60||D.edges.length!==120)throw Error('Graph data has incorrect size.');
 D.adjacency.forEach((ns,i)=>{if(new Set(ns).size!==4||ns.includes(i)||ns.some(j=>!D.adjacency[j].includes(i)))throw Error('Graph adjacency failed validation.');});
 const seen=new Set([0]),todo=[0];while(todo.length){for(const j of D.adjacency[todo.pop()])if(!seen.has(j)){seen.add(j);todo.push(j);}}if(seen.size!==60)throw Error('Graph is disconnected.');
}
validateGraph();
function resize(){W=innerWidth;H=innerHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);canvas.style.width=W+'px';canvas.style.height=H+'px';}
addEventListener('resize',resize);resize();
function project(p){
 let [x,y,z]=p;const cy=Math.cos(state.yaw),sy=Math.sin(state.yaw),cp=Math.cos(state.pitch),sp=Math.sin(state.pitch);
 const xx=cy*x+sy*z,zz=-sy*x+cy*z,yy=cp*y-sp*zz,depth=sp*y+cp*zz;
 const perspective=3.8/(3.8-depth*.35);
 return [origin[0]+xx*scale*perspective,origin[1]-yy*scale*perspective,depth];
}
function line(a,b,col,width=1){ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.strokeStyle=col;ctx.lineWidth=width;ctx.stroke();}
function dot(p,r,col){ctx.beginPath();ctx.arc(p[0],p[1],r,0,Math.PI*2);ctx.fillStyle=col;ctx.fill();}
function arrow(a,b,col,size=5){let v=Math.atan2(b[1]-a[1],b[0]-a[0]);ctx.beginPath();ctx.moveTo(b[0],b[1]);ctx.lineTo(b[0]-size*Math.cos(v-.5),b[1]-size*Math.sin(v-.5));ctx.lineTo(b[0]-size*Math.cos(v+.5),b[1]-size*Math.sin(v+.5));ctx.closePath();ctx.fillStyle=col;ctx.fill();}
function label(text,x,y,font,color){ctx.font=font;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=color;ctx.fillText(text,x,y);}
function background(){
 ctx.fillStyle='#080e19';ctx.fillRect(0,0,W,H);const g=ctx.createRadialGradient(origin[0],origin[1],0,origin[0],origin[1],Math.max(W,H)*.65);g.addColorStop(0,'#142237');g.addColorStop(.55,'#0a1321');g.addColorStop(1,'#080e19');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 for(let i=0;i<50;i++){let x=((i*167.31+29)%997)/997*W,y=((i*323.71+57)%991)/991*H;dot([x,y],i%3===0?.65:.4,'#aac3dd35');}
}
function ring(radius,color,dash=[]){ctx.beginPath();for(let j=0;j<=90;j++){const a=j/90*Math.PI*2,p=project([radius*Math.cos(a),radius*Math.sin(a),0]);j?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);}ctx.strokeStyle=color;ctx.lineWidth=.7;ctx.setLineDash(dash);ctx.stroke();ctx.setLineDash([]);}
function drawField(){
 if(!state.field||state.fieldAlpha===0)return;
 for(const {pts,k} of fieldCurves){const projected=pts.map(project);for(let j=1;j<projected.length;j++){const col=mix(colorN,colorS,j/(projected.length-1));line(projected[j-1],projected[j],rgba(col,state.fieldAlpha*.72),k%3===0?1.15:.8);}
 if(k===1||k===4||k===6)arrow(projected[31],projected[34],rgba(mix(colorN,colorS,.5),state.fieldAlpha),5);}
}
function drawNodes(){
 points=(state.view==='spatial'?D.spatial:base).map(project);
 if(state.edges)for(const [i,j] of D.edges){const related=selected===i||selected===j;let alpha=state.edgeAlpha;if(selected!==null&&!related)alpha*=.23;line(points[i],points[j],related?'#e8c78c':rgba(mix(nodeColors[i],nodeColors[j],.5),alpha),related?1.6:.75);}
 const neighbors=selected===null?[]:D.adjacency[selected];
 for(const i of Array.from({length:60},(_,i)=>i).sort((a,b)=>points[a][2]-points[b][2])){
 const p=points[i],isSelected=i===selected,near=neighbors.includes(i);let alpha=state.view==='spatial'?.48+(p[2]+1)*.25:1;alpha=clamp(alpha,.2,1);if(selected!==null&&!isSelected&&!near)alpha*=.3;
 if(state.vertices){dot(p,7,rgba(nodeColors[i],alpha*.075));dot(p,2.5+(isSelected?1.5:0),isSelected?'#edcc95':rgba(nodeColors[i],alpha));dot(p,.8,rgba([246,251,255],alpha));if(isSelected){ctx.beginPath();ctx.arc(p[0],p[1],8,0,Math.PI*2);ctx.strokeStyle='#edcc95';ctx.lineWidth=1;ctx.stroke();}}
 if(state.vertexLabels||isSelected||near){label(String(i+1),p[0],p[1]-11,'9px system-ui',isSelected?'#edcc95':'#c9d9eb');}
 }
}
function currentPosition(phase){const i=Math.floor(phase),t=phase-i,a=stepAngles[i]+(stepAngles[i+1]-stepAngles[i])*t;return [Math.cos(a)*.98,Math.sin(a)*.98,i<4?.065:-.065];}
function drawTracer(){
 if(!state.tracer)return;const returning=state.phase>=4,col=returning?[190,188,255]:[237,204,151];
 for(let j=35;j>0;j--){const q=mod(state.phase-j*.012,8),p=project(currentPosition(q));dot(p,1.6,rgba(col,(1-j/36)*.5));}
 const p=project(currentPosition(state.phase)),g=ctx.createRadialGradient(p[0],p[1],0,p[0],p[1],14);g.addColorStop(0,rgba(col,.45));g.addColorStop(1,rgba(col,0));ctx.fillStyle=g;ctx.fillRect(p[0]-14,p[1]-14,28,28);dot(p,3.2,rgba(col));dot(p,1.2,'#fff');
}
function drawLabels(){
 if(!state.poleLabels)return;const active=Math.floor(state.phase),compact=W<600,size=compact?14:18;
 const labels=[{p:[0,1.45,0],v:'+1 / −1',word:'1',color:colorN,steps:[0,7]},{p:[1.47,0,0],v:'+2 / −2',word:'a',color:colorS,steps:[1,6]},{p:[0,-1.45,0],v:'+3 / −3',word:'b',color:colorN,steps:[2,5]},{p:[-1.47,0,0],v:'+4 / −4',word:'ab | ba',color:colorS,steps:[3,4]}];
 for(const l of labels){const p=project(l.p),on=l.steps.includes(active);ctx.shadowColor='#080e19';ctx.shadowBlur=12;label(l.v,p[0],p[1],`${on?600:400} ${size}px system-ui`,rgba(l.color,on?1:.65));label(l.word,p[0],p[1]+(compact?19:24),`italic ${compact?12:15}px Georgia`,on?'#e5edf8':'#8b9cb1');ctx.shadowBlur=0;if(on){line([p[0]-13,p[1]-size],[p[0]+13,p[1]-size],state.phase<4?'#e7c38c':'#bebcff',1.5);}}
}
function draw(t){
 const dt=Math.min((t-last)/1000||0,.06);last=t;if(state.playing)state.phase=mod(state.phase+dt*state.speed*8,8);if(state.autoOrbit)state.yaw+=dt*.13;
 const mobile=W<600,top=focus?60:mobile?202:W<1050?195:183,bottom=focus?60:mobile?212:220,available=Math.max(130,H-top-bottom);
 origin=[W/2+state.panX,H<570?H*.40:(top+available/2)+state.panY];scale=Math.min((W-(mobile?32:180))/(mobile?3.35:3.85),available/3.4)*state.zoom;
 ctx.setTransform(dpr,0,0,dpr,0,0);background();ring(.905,'#a5c4e826');ring(1.05,'#879bb915',[2,6]);drawField();drawNodes();drawTracer();drawLabels();
 if(t-lastUi>45){syncTransport();lastUi=t;}requestAnimationFrame(draw);
}
function syncTransport(){const i=Math.floor(state.phase);$('directionLabel').textContent=i<4?'FORWARD':'RETURN';$('directionLabel').style.color=i<4?'#e7c38c':'#bebcff';$('activeCode').innerHTML=codes[i]+' <span>→ '+words[i]+'</span>';$('cycleValue').textContent=(state.phase/8).toFixed(2)+' / 1';$('phase').value=state.phase;document.querySelectorAll('[data-step]').forEach(b=>b.classList.toggle('active',+b.dataset.step===i));$('orderNote').textContent=i<4?'1 → a → b → ab':'ba → b → a → 1';$('play').textContent=state.playing?'Ⅱ':'▶︎';$('play').setAttribute('aria-label',state.playing?'Pause traversal':'Play traversal');$('focusPlay').textContent=state.playing?'Ⅱ':'▶︎';$('focusPlay').setAttribute('aria-label',state.playing?'Pause traversal':'Play traversal');}
function togglePlay(){state.playing=!state.playing;syncTransport();}
function setStep(n){state.phase=mod(n,8);state.playing=false;syncTransport();}
function step(direction){setStep(Math.floor(state.phase)+direction);}
$('play').onclick=togglePlay;$('focusPlay').onclick=togglePlay;$('previous').onclick=()=>step(-1);$('next').onclick=()=>step(1);
document.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>setStep(+b.dataset.step));
$('phase').oninput=e=>{state.phase=+e.target.value;state.playing=false;syncTransport();};
function setView(view){state.view=view;state.yaw=view==='face'?0:.48;state.pitch=view==='face'?0:.62;state.zoom=1;state.panX=state.panY=0;document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));$('sceneLabel').textContent=view==='spatial'?'Spatial layout · illustrative embedding':view==='oblique'?'Oblique · planar carrier':'Circular layout';}
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>setView(b.dataset.view));
$('homeView').onclick=()=>setView('face');$('resetView').onclick=()=>setView(state.view);$('zoomIn').onclick=()=>state.zoom=clamp(state.zoom*1.15,.45,3);$('zoomOut').onclick=()=>state.zoom=clamp(state.zoom/1.15,.45,3);
function menu(open){$('controls').hidden=!open;$('menuBtn').setAttribute('aria-expanded',String(open));}
$('menuBtn').onclick=()=>menu($('controls').hidden);$('closeMenu').onclick=()=>menu(false);
function focusView(value){focus=value;document.body.classList.toggle('focus',focus);$('restoreUI').hidden=!focus;$('focusPlay').hidden=!focus;}
$('focusBtn').onclick=()=>focusView(true);$('restoreUI').onclick=()=>focusView(false);
$('aboutBtn').onclick=()=>$('about').showModal();$('closeAbout').onclick=()=>$('about').close();$('about').addEventListener('click',e=>{if(e.target===$('about')){const r=$('about').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('about').close();}});
for(const id of ['autoOrbit','field','edges','vertices','poleLabels','vertexLabels','tracer'])$(id).onchange=e=>state[id]=e.target.checked;
for(const id of ['speed','fieldAlpha','edgeAlpha'])$(id).oninput=e=>{state[id]=+e.target.value;$(id+'Value').textContent=id==='speed'?state[id].toFixed(2)+' Hz':Math.round(state[id]*100)+'%';};
function toast(message){clearTimeout(toastTimer);$('toast').textContent=message;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,3200);}
function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('saveImage').onclick=()=>{const out=document.createElement('canvas');out.width=canvas.width;out.height=canvas.height;const c=out.getContext('2d');c.drawImage(canvas,0,0);c.scale(dpr,dpr);c.textAlign='left';c.fillStyle='#e7eef7';c.font='600 18px system-ui';c.fillText('G60 · SIGNED OBSERVATORY',24,32);c.fillStyle='#9cb0c9';c.font='12px system-ui';c.fillText('E[1,a,b,ab] | [ba,b,a,1]E⁻¹',24,55);c.font='10px system-ui';c.fillText('Exact adjacency · illustrative field, pole mapping and traversal',24,H-22);out.toBlob(b=>{if(b)download(b,'g60-observatory.png');},'image/png');};
$('exportSettings').onclick=()=>download(new Blob([JSON.stringify({format:'g60-signed-observatory',version:1,settings:state},null,2)],{type:'application/json'}),'g60-observatory-settings.json');
$('importSettings').onclick=()=>$('importFile').click();
$('importFile').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const data=JSON.parse(await f.text());if(data.format!=='g60-signed-observatory'||data.version!==1||!data.settings)throw Error();const s=data.settings,next={...defaults};for(const key of Object.keys(defaults)){if(typeof defaults[key]==='boolean'&&typeof s[key]==='boolean')next[key]=s[key];if(typeof defaults[key]==='number'&&typeof s[key]==='number'&&Number.isFinite(s[key]))next[key]=s[key];}if(['face','oblique','spatial'].includes(s.view))next.view=s.view;next.phase=mod(next.phase,8);next.speed=clamp(next.speed,.05,2);next.zoom=clamp(next.zoom,.45,3);next.pitch=clamp(next.pitch,-Math.PI,Math.PI);next.panX=clamp(next.panX,-W,W);next.panY=clamp(next.panY,-H,H);next.fieldAlpha=clamp(next.fieldAlpha,0,1);next.edgeAlpha=clamp(next.edgeAlpha,0,1);state=next;syncControls();toast('View settings restored.');}catch{toast('Choose a valid G60 settings file.');}e.target.value='';};
function syncControls(){for(const id of ['autoOrbit','field','edges','vertices','poleLabels','vertexLabels','tracer'])$(id).checked=state[id];for(const id of ['speed','fieldAlpha','edgeAlpha']){$(id).value=state[id];$(id+'Value').textContent=id==='speed'?state[id].toFixed(2)+' Hz':Math.round(state[id]*100)+'%';}document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===state.view));$('sceneLabel').textContent=state.view==='spatial'?'Spatial layout · illustrative embedding':state.view==='oblique'?'Oblique · planar carrier':'Circular layout';syncTransport();}
function selectVertex(i){selected=i;$('inspector').hidden=i===null;if(i!==null){$('vertexTitle').textContent='Vertex '+(i+1)+' · index '+i;$('vertexNeighbors').textContent='Neighbors: '+D.adjacency[i].map(j=>j+1).join(', ');}}
$('clearSelection').onclick=()=>selectVertex(null);
const pointers=new Map();let down=null,moved=0,gesture=null;
function pair(){const a=[...pointers.values()];if(a.length!==2)return null;return {x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2,d:Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y)};}
canvas.addEventListener('pointerdown',e=>{canvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===1){down={x:e.clientX,y:e.clientY,time:performance.now()};moved=0;}else{moved=20;gesture=pair();}});
canvas.addEventListener('pointermove',e=>{const old=pointers.get(e.pointerId);if(!old)return;const dx=e.clientX-old.x,dy=e.clientY-old.y;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});moved+=Math.hypot(dx,dy);if(pointers.size===2){const n=pair();if(gesture){state.zoom=clamp(state.zoom*n.d/Math.max(gesture.d,1),.45,3);state.panX+=n.x-gesture.x;state.panY+=n.y-gesture.y;}gesture=n;}else if(e.shiftKey||e.buttons===2){state.panX+=dx;state.panY+=dy;}else{state.yaw+=dx*.006;state.pitch=clamp(state.pitch+dy*.006,-Math.PI,Math.PI);}});
canvas.addEventListener('pointerup',e=>{pointers.delete(e.pointerId);gesture=null;if(!pointers.size&&down&&moved<7){let best=null,d=14;if(state.vertices){for(let i=0;i<points.length;i++){const r=Math.hypot(points[i][0]-e.clientX,points[i][1]-e.clientY);if(r<d){d=r;best=i;}}}if(best!==null)selectVertex(best);else togglePlay();}down=null;});
canvas.addEventListener('pointercancel',e=>{pointers.delete(e.pointerId);gesture=null;down=null;});canvas.addEventListener('contextmenu',e=>e.preventDefault());
canvas.addEventListener('wheel',e=>{e.preventDefault();state.zoom=clamp(state.zoom*Math.exp(-e.deltaY*.001),.45,3);},{passive:false});
addEventListener('keydown',e=>{if(e.target.matches('input,button,textarea,select')||$('about').open)return;if(e.code==='Space'){e.preventDefault();togglePlay();}if(e.code==='ArrowRight'){e.preventDefault();step(1);}if(e.code==='ArrowLeft'){e.preventDefault();step(-1);}if(e.code==='Escape'){menu(false);focusView(false);selectVertex(null);}});
syncControls();requestAnimationFrame(draw);
})();
