// Display coordinates only. The numbered ports and signal events come from the experiment modules.
const TAU = 2 * Math.PI;
const A = [111, 231, 209], B = [246, 170, 105], N = [181, 204, 205];
const rgb = (c, alpha = 1) => 'rgba(' + c.join(',') + ',' + alpha + ')';
const unit = p => { const m = Math.hypot(...p); return p.map(x => x / m); };
function net() {
  const g=(1+Math.sqrt(5))/2;
  const verts=[[-1,g,0],[1,g,0],[-1,-g,0],[1,-g,0],[0,-1,g],[0,1,g],[0,-1,-g],[0,1,-g],[g,0,-1],[g,0,1],[-g,0,-1],[-g,0,1]].map(unit);
  let faces=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];
  for(let n=0;n<3;n++){
    const mids=new Map();
    const mid=(a,b)=>{const k=a<b?a+'_'+b:b+'_'+a;if(!mids.has(k)){mids.set(k,verts.length);verts.push(unit(verts[a].map((v,i)=>(v+verts[b][i])/2)));}return mids.get(k);};
    faces=faces.flatMap(([a,b,c])=>{const p=mid(a,b),q=mid(b,c),r=mid(c,a);return [[a,p,r],[b,q,p],[c,r,q],[p,q,r]];});
  }
  const seen=new Set(), edges=[];
  for(const f of faces)for(let i=0;i<3;i++){const a=f[i],b=f[(i+1)%3];const k=Math.min(a,b)+'_'+Math.max(a,b);if(!seen.has(k)){seen.add(k);edges.push([a,b]);}}
  return {verts,edges};
}
const mesh=net();
function line(ctx, pts, color, width=1, dash=[]) {
  ctx.save();ctx.strokeStyle=color;ctx.lineWidth=width;ctx.setLineDash(dash);
  ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();ctx.restore();
}
function ellipse(c,x,y,rx,ry,stroke,fill=null,rot=0,dash=[]) {
  if(rx<=0||ry<=0)return;
  c.save();c.beginPath();c.ellipse(x,y,rx,ry,rot,0,TAU);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.setLineDash(dash);c.strokeStyle=stroke;c.lineWidth=1;c.stroke();}c.restore();
}
function text(c,s,x,y,size=12,color='#c8d7d7',align='center',font='mono') {
  c.font=(font==='serif'?'normal ':'500 ')+size+'px '+(font==='serif'?'Georgia, serif':'"DejaVu Sans Mono", monospace');
  c.fillStyle=color;c.textAlign=align;c.textBaseline='middle';c.fillText(s,x,y);
}
function sphere(c,x,y,r,col,{yaw=.48,tilt=.32,cut=false,dim=false}={}) {
  const light=c.createRadialGradient(x-r*.32,y-r*.42,0,x,y,r*1.03);
  light.addColorStop(0,rgb(col,dim?.07:.2));light.addColorStop(.65,rgb(col,dim?.025:.06));light.addColorStop(.94,rgb(col,.075));light.addColorStop(1,rgb(col,.02));
  ellipse(c,x,y,r,r,rgb(col,.55),light);
  c.save();c.translate(x,y);const co=Math.cos(yaw),si=Math.sin(yaw),ct=Math.cos(tilt),st=Math.sin(tilt);
  const p=mesh.verts.map(([a,b,d])=>{const u=a*co+d*si,v=d*co-a*si;return [u*r,(b*ct-v*st)*r,b*st+v*ct];});
  const groups=Array.from({length:7},()=>[]);
  for(const [a,b] of mesh.edges){const v=p[a],w=p[b],z=(v[2]+w[2])/2;
    if(cut&&z>0&&((v[0]+w[0])*.5>-.55*r && (v[1]+w[1])*.5>-.63*r))continue;
    const group=Math.max(0,Math.min(6,Math.floor((z+1)*3.5)));groups[group].push([v,w]);
  }
  groups.forEach((rows,i)=>{c.beginPath();c.lineWidth=i<3?.46:.62;c.strokeStyle=rgb(col,([.065,.09,.12,.24,.37,.52,.65][i])*(dim?.55:1));for(const [v,w] of rows){c.moveTo(v[0],v[1]);c.lineTo(w[0],w[1]);}c.stroke();});
  for(let i=0;i<p.length;i+=3){const [a,b,z]=p[i];if(z<.28||(cut&&a>-.55*r&&b>-.63*r))continue;c.fillStyle=rgb(col,.38+z*.4);c.fillRect(a-.6,b-.6,1.35,1.35);}
  c.restore();
  ellipse(c,x,y,r*1.04,r*.32,rgb(col,.22),null,-.26);
  if(!cut)ellipse(c,x,y,r*.39,r*1.02,rgb(col,.21),null,.32);
}
function beacon(c,[x,y],col,kind,hot=true){
  if(hot){const glow=c.createRadialGradient(x,y,0,x,y,17);glow.addColorStop(0,rgb(col,.65));glow.addColorStop(.35,rgb(col,.27));glow.addColorStop(1,rgb(col,0));ellipse(c,x,y,17,17,null,glow);ellipse(c,x,y,7,7,rgb(col,.65));}
  if(kind==='A'){ellipse(c,x,y,3.2,3.2,'#ebf6ed',rgb(col));}
  else{c.save();c.translate(x,y);c.rotate(Math.PI/4);c.fillStyle=rgb(col);c.strokeStyle='#f1e8cd';c.fillRect(-2.8,-2.8,5.6,5.6);c.strokeRect(-2.8,-2.8,5.6,5.6);c.restore();}
}
function arrow(c,p,q,col,dash=[],w=1.35) {
  line(c,[p,q],col,w,dash); const angle=Math.atan2(q[1]-p[1],q[0]-p[0]),l=7;
  line(c,[[q[0]-l*Math.cos(angle-.48),q[1]-l*Math.sin(angle-.48)],q,[q[0]-l*Math.cos(angle+.48),q[1]-l*Math.sin(angle+.48)]],col,w);
}
function grid(c,w,h){
  const shade=c.createRadialGradient(w*.5,h*.55,3,w*.5,h*.5,w*.62);shade.addColorStop(0,'#14252c');shade.addColorStop(.66,'#0b171e');shade.addColorStop(1,'#09121a');c.fillStyle=shade;c.fillRect(0,0,w,h);
  const s=w<540?23:31;
  for(let x=w/2%s;x<w;x+=s)line(c,[[x,0],[x,h]],'#71919810');
  for(let y=h/2%s;y<h;y+=s)line(c,[[0,y],[w,y]],'#71919812');
  for(let i=1;i<58;i++){const x=w*((i*1051%997)/997),y=h*((i*547%877)/877);c.fillStyle='rgba(164,204,209,'+(i%3===0?.28:.13)+')';c.fillRect(x,y,1.2,1.2);}
}
function person(c,x,y,s,col){
  c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';c.lineCap='round';
  ellipse(c,0,-24,5.2,6.2,rgb(col,.98),'#16232b');
  c.strokeStyle=rgb(col,.9);c.fillStyle='#112129';c.lineWidth=1.5;
  c.beginPath();c.moveTo(-3.8,-17);c.bezierCurveTo(-9,-16,-7,-4,-15,0);c.bezierCurveTo(-19,2,-20,1,-19,3);c.bezierCurveTo(-18,5,-10,4,-6,-2);c.lineTo(-6,4);c.bezierCurveTo(-14,1,-24,5,-19,9);c.bezierCurveTo(-15,13,-6,10,0,9);c.bezierCurveTo(9,12,19,13,20,8);c.bezierCurveTo(23,4,14,2,6,4);c.lineTo(5,-3);c.bezierCurveTo(8,3,16,5,19,3);c.bezierCurveTo(20,1,15,2,12,-1);c.bezierCurveTo(8,-5,9,-16,4,-17);c.closePath();c.fill();c.stroke();
  ellipse(c,2,-10,2.15,2.15,null,rgb(col));c.restore();
}
function ring(c,x,y,r){
  const grad=c.createRadialGradient(x,y,r*.47,x,y,r*1.35);grad.addColorStop(0,'rgba(232,127,56,0)');grad.addColorStop(.48,'rgba(230,133,61,.19)');grad.addColorStop(.72,'rgba(245,159,72,.48)');grad.addColorStop(.92,'rgba(218,115,42,.12)');grad.addColorStop(1,'rgba(218,115,42,0)');ellipse(c,x,y,r*1.35,r*1.35,null,grad);
  c.save();c.beginPath();c.arc(x,y,r,.45,2.65);c.lineWidth=r*.125;c.strokeStyle='#f5ae70';c.stroke();c.restore();ellipse(c,x,y,r,r,'#d9a277');
}
function skyShell(c,x,y,r){for(const [dx,dy] of [[-.76,-.27],[.31,-.72],[.65,.4],[-.38,.67],[-.21,-.36],[.12,.17]]){ellipse(c,x+dx*r,y+dy*r,1.5,1.5,null,'#ecdda2');}}
function dish(c,x,y,k=1){c.save();c.translate(x,y);c.scale(k,k);line(c,[[-9,-6],[2,3],[12,-7]],'#c4d2cf',1.6);line(c,[[2,3],[2,12],[-6,12],[10,12]],'#b8c5c5',1.4);line(c,[[-6,-7],[1,-13],[5,1]],'#c4d2cf',1);c.restore();}
function markPatch(c,p,col,letter,txt,small,hot=true,dy=16){beacon(c,p,col,letter,hot);if(!small&&txt)text(c,txt,p[0],p[1]+dy,10,rgb(col));}
function heightLayout(w,h){const small=w<540;return {small,cy:h*.50,r:Math.min(w*.166,h*.35),fs:small?10:12};}
function levelLabel(c,txt,x,r,cy,col,small){text(c,txt,x,cy+r+16,small?11:13,rgb(col));}
export function drawScene(canvas,s,progress=1){
  const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return;
  const d=Math.min(window.devicePixelRatio||1,2);
  if(canvas.width!==Math.round(w*d)||canvas.height!==Math.round(h*d)){canvas.width=Math.round(w*d);canvas.height=Math.round(h*d);}
  const c=canvas.getContext('2d');c.setTransform(d,0,0,d,0,0);grid(c,w,h);
  const {small,cy,r,fs}=heightLayout(w,h), mode=s.scenario, nested=s.geometry==='nested';
  const camera=s.camera, e=s.event, forward=s.forward??!(e>=3&&s.canReturn), active=s.live!==false;
  const cA=A,cB=B;
  let pa,pb;
  const humanInset=()=>{const u=small?.48:.64,ix=small?32:52,iy=h-23;person(c,ix-12,iy,u,A);person(c,ix+15,iy,u,B);text(c,'Seats A · B',ix+2,h-6,small?8:10,'#bfd2cf');};
  if(!nested&&camera==='external'){
    const ax=w*.265,bx=w*.735;const boundary=w*.5;
    line(c,[[w*.065,cy],[w*.935,cy]],'#71888d66',1,[3,6]);
    if(mode!=='sag'){line(c,[[boundary,28],[boundary,h-30]],'#b4cecd9c',1.3,[5,5]);text(c,'Σ',boundary,14,small?15:19,'#d5e5dc','center','serif');}
    sphere(c,ax,cy,r,cA,{yaw:.72,tilt:.28,dim:mode==='sag'});sphere(c,bx,cy,r,cB,{yaw:-.48,tilt:-.26});
    if(mode==='heart'){person(c,ax,cy+r*.31,r/36,A);person(c,bx,cy+r*.31,r/36,B);}
    if(mode==='sag'){ring(c,ax,cy,r*.48);ellipse(c,ax,cy,r*(.61+.09*s.cutIndex),r*(.61+.09*s.cutIndex),'#d4e4db',null,0,[4,4]);dish(c,bx,cy,r/48);}
    if(mode==='sky'){skyShell(c,ax,cy,r);dish(c,bx,cy,r/46);}
    levelLabel(c,s.nameA,ax,r,cy,cA,small);levelLabel(c,s.nameB,bx,r,cy,cB,small);
    pa=[ax+r*(mode==='sag'?.32:.90),cy-2];pb=[bx-r*.9,cy-2];
    if(mode==='sky'){arrow(c,[pb[0],cy-17],[pa[0],cy-17],'#cad2ce',[2,3],.85);text(c,'look',boundary,cy-27,fs-1,'#bcc5c5');}
  }else if(nested&&camera==='external'){
    const rad=Math.min(h*.39,w*.294),x=w*.5,y=h*.5, inner=rad*.54, outer=s.outer;
    const outerColor=outer==='B'?cB:cA,innerColor=outer==='B'?cA:cB;
    sphere(c,x,y,rad,outerColor,{cut:true,yaw:-.15,tilt:.54});sphere(c,x,y,inner,innerColor,{yaw:.68,tilt:-.26});
    ellipse(c,x,y,rad*.75,rad*.75,'#d0e6dbb2',null,0,[4,4]);
    const it=[x+inner*.93,y-inner*.13],ot=[x+rad*.91,y-rad*.12];pa=outer==='B'?it:ot;pb=outer==='B'?ot:it;
    const labelX=Math.min(w-6,x+rad+10);text(c,'Σ',x-rad*.74,y-10,16,'#e9eddd','right','serif');
    text(c,outer+' shell',labelX,y-rad*.61,fs,rgb(outerColor), 'left');
    text(c,(outer==='B'?'A':'B')+' core',labelX,y+rad*.48,fs,rgb(innerColor), 'left');
    if(mode==='sag'){const sr=outer==='A'?rad:inner;ring(c,x,y,sr*.41);ellipse(c,x,y,sr*(.61+.09*s.cutIndex),sr*(.61+.09*s.cutIndex),'#e4dac3',null,0,[2,3]);}
    if(mode==='sky')skyShell(c,x,y,outer==='A'?rad:inner);
    if(mode==='heart')humanInset();
  }else{
    const local=camera==='A'?'A':'B',remote=local==='A'?'B':'A', lc=local==='A'?cA:cB,rc=remote==='A'?cA:cB;
    const x=w*.58,y=h*.48,rr=Math.min(h*.30,w*.20);
    sphere(c,x,y,rr,rc,{cut:nested,yaw:local==='A'?-.6:.65,tilt:.3});
    if(mode==='sag'&&remote==='A')ring(c,x,y,rr*.55);
    if(mode==='sky'&&remote==='A')skyShell(c,x,y,rr);
    const rim=Math.min(w*.4,h*.82);c.save();c.beginPath();c.rect(2,12,w-4,h-25);c.clip();sphere(c,-rim*.54,h*.78,rim,lc,{cut:true,dim:true,yaw:1.1});c.restore();
    const localPort=[rim*.4,h*.60],remotePort=[x-rr*.83,y+rr*.13];pa=local==='A'?localPort:remotePort;pb=local==='A'?remotePort:localPort;
    const mx=(localPort[0]+remotePort[0])/2,my=(localPort[1]+remotePort[1])/2;ellipse(c,mx,my,small?6:10,rr*.49,'#c3dfd0ae',null,-.08,[4,4]);text(c,'Σ',mx,my-rr*.54,16,'#cfdfd6','center','serif');
    text(c,local+' · near port',10,19,fs,rgb(lc),'left');levelLabel(c,remote+' · '+(nested?'shell contact':'facing port'),x,rr,y,rc,small);
    if(mode==='sky'&&local==='B'){arrow(c,[localPort[0],localPort[1]-19],[remotePort[0],remotePort[1]-19],'#dae3dd',[3,4]);text(c,'look outward',mx,my-28,fs-1,'#c6d3cf');}
    if(nested){text(c,s.outer+' outside',w-11,16,fs-1,'#b0c1c3','right');}
    if(mode==='heart')humanInset();
  }
  if(!pa||!pb)return;
  if(mode==='paired'){
    const disp=s.route==='swap'?7:-7, alt=[pb[0],pb[1]-disp];
    pb=[pb[0],pb[1]+disp];pa=[pa[0],pa[1]+disp];
    beacon(c,alt,B,'B',s.cleared&&e===2);
    text(c,s.route==='swap'?'j':'Zj',alt[0]+(camera==='B'?-11:11),alt[1],small?9:10,rgb(B,.75),camera==='B'?'right':'left');
  }
  markPatch(c,pa,cA,'A',s.portA,small||nested||camera!=='external',e===0||e>=3);markPatch(c,pb,cB,'B',s.portB,small||nested||camera!=='external',e>0,s.route==='preserve'?-14:14);
  if(mode==='sky'&&e>=3){ // a recorded local command stays at the apparatus
    if(s.canReturn){const q=[pb[0]+(pb[0]>w*.5?1:-1)*Math.min(27,w*.05),pb[1]+16];arrow(c,pb,q,rgb(cB));beacon(c,q,cB,'B');}
  }else if(active){
    const p=forward?pa:pb,q=forward?pb:pa, col=forward?cA:cB;
    arrow(c,p,q,rgb(col,.83),e===0?[4,4]:[],1.6);
    const t=e===0?0: e===2?1:progress;
    const dot=[p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t];beacon(c,dot,col,forward?'A':'B');
  }
  if(e===2){ellipse(c,pb[0],pb[1],12,12,rgb(cB),null,0,s.cleared?[2,3]:[]);}
  if(mode==='sag'&&camera==='external'&&!nested)text(c,'Σ · exterior cut',w*.265,cy-r-12,fs-1,'#d3dfda');
}
