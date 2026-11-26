// The fields and interpolating curves are display geometry, independent of native addresses.
const TAU=2*Math.PI;
export const CMY=['#61f2ef','#f084ea','#ffdf82'];
export const RGB=['#ff7987','#8fed89','#88abff'];
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
function color(hex,a){const c=parseInt(hex.slice(1),16);return 'rgba('+[(c>>16)&255,(c>>8)&255,c&255,a].join(',')+')';}
function dot(ctx,x,y,r,fill,stroke){
  ctx.beginPath();ctx.arc(x,y,r,0,TAU);if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.stroke();}
}
function ellipse(ctx,x,y,rx,ry,angle,paint){ctx.beginPath();ctx.ellipse(x,y,rx,ry,angle,0,TAU);ctx.strokeStyle=paint;ctx.stroke();}
function glow(ctx,x,y,r,col,alpha){
  const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color(col,alpha));g.addColorStop(.39,color(col,alpha*.46));g.addColorStop(1,color(col,0));
  dot(ctx,x,y,r,g);
}
function size(canvas){
  const w=canvas.clientWidth,h=canvas.clientHeight,dpr=Math.min(window.devicePixelRatio||1,2);
  const dw=Math.round(w*dpr),dh=Math.round(h*dpr);
  if(canvas.width!==dw||canvas.height!==dh){canvas.width=dw;canvas.height=dh;}
  const ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);return {ctx,w,h,dpr};
}
function geometry(w,h){
  const r=Math.min(w*.267,h*.386);
  return {w,h,cx:w*.5,cy:h*.49,r,sep:r*.635};
}
function lines(ctx,pts){
  ctx.beginPath();pts.forEach((p,i)=>{if(i)ctx.lineTo(p.x,p.y);else ctx.moveTo(p.x,p.y);});
}
function shell(ctx,x,y,r,palette,mirror){
  const g=ctx.createRadialGradient(x-r*.22,y-r*.34,r*.12,x,y,r);
  g.addColorStop(0,color(palette[0],.075));g.addColorStop(.58,color(palette[1],.055));g.addColorStop(.94,color(palette[0],.092));g.addColorStop(1,color(palette[2],.028));
  ctx.lineWidth=.85;dot(ctx,x,y,r,g,color(palette[0],.56));
  const yaw=.41*mirror,tilt=-.22*mirror,roll=.17*mirror;
  function project(lat,angle){
    const dx=Math.cos(lat)*Math.cos(angle+yaw),yy=Math.sin(lat),zz=Math.cos(lat)*Math.sin(angle+yaw);
    const dy=yy*Math.cos(tilt)-zz*Math.sin(tilt),z=zz*Math.cos(tilt)+yy*Math.sin(tilt);
    return {x:x+r*(dx*Math.cos(roll)-dy*Math.sin(roll)),y:y+r*(dx*Math.sin(roll)+dy*Math.cos(roll)),z};
  }
  const rows=11,cols=22,points=Array.from({length:rows+1},(_,i)=>Array.from({length:cols},(_,j)=>project(-Math.PI/2+i*Math.PI/rows,(j+(i%2)*.5)*TAU/cols)));
  const groups=Array.from({length:9},()=>[]);
  function edge(a,b,i){const level=(a.z+b.z)/2,shade=level<-.15?0:level>.6?2:1;groups[(i%3)*3+shade].push([a,b]);}
  for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){
    const p=points[i][j],q=points[i+1][j];if(i)edge(p,points[i][(j+1)%cols],i);
    edge(p,q,i+1);edge(p,points[i+1][(j+(i%2?1:-1)+cols)%cols],i+1);
  }
  groups.forEach((edges,id)=>{ctx.strokeStyle=color(palette[Math.floor(id/3)],[.055,.18,.34][id%3]);ctx.lineWidth=id%3===2?.82:.63;ctx.beginPath();for(const [a,b] of edges){ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);}ctx.stroke();});
  for(let i=1;i<rows;i++)for(let j=0;j<cols;j+=3){const p=points[i][j];if(p.z>.28)dot(ctx,p.x,p.y,r*.0095,color(palette[i%3],.6));}
  ctx.lineWidth=.85;ellipse(ctx,x,y,r*1.034,r*.28,mirror*.25,color(palette[1],.23));
}
const robe=new Path2D('M-8 -22 Q-15 -23 -21 -15 Q-27 -9 -28 6 Q-31 19 -42 26 Q-47 27 -46 30 Q-43 34 -34 30 L-23 23 L-19 30 Q-37 24 -49 35 Q-60 45 -49 52 Q-33 61 -6 55 Q9 61 28 55 Q48 58 52 48 Q55 39 41 33 Q29 28 18 30 L18 22 Q32 32 42 31 Q48 31 46 27 Q43 24 38 25 Q26 18 24 6 Q23 -7 18 -15 Q14 -21 7 -22 L5 -29 L-5 -29Z');
const headOutline=new Path2D('M-9 -50 Q-9 -58 -2 -60 Q10 -63 13 -51 L12 -45 Q15 -42 12 -39 L10 -38 Q9 -30 4 -29 Q0 -27 -5 -32 Q-9 -36 -10 -42 Q-13 -43 -12 -46 Q-12 -49 -9 -47Z');
const hair=new Path2D('M-10 -44 Q-14 -49 -11 -56 Q-10 -61 -4 -62 Q-2 -68 4 -66 Q8 -66 8 -61 Q15 -58 13 -49 Q10 -51 9 -55 Q5 -51 -1 -52 Q-6 -53 -9 -43Z');
const folding=[
 'M-7 -22 Q0 -14 8 -19 Q8 -11 14 -1','M-16 -15 Q-13 -1 -19 13 L-23 22',
 'M-12 -18 Q-5 -3 6 5 Q14 11 16 22','M-8 -9 Q0 7 14 15','M-17 24 Q-9 28 3 27 Q12 27 17 24',
 'M-44 37 Q-28 32 -14 40 Q3 50 24 50 Q36 50 41 45','M37 34 Q21 36 7 44 Q-3 50 -19 52 Q-33 52 -42 48',
 'M-42 27 Q-38 29 -34 26','M34 26 Q39 29 43 28','M-26 38 Q-14 36 -4 42','M24 39 Q16 42 10 46'
].map(p=>new Path2D(p));
function sitter(ctx,x,y,r,side){
  ctx.save();ctx.translate(x,y);ctx.scale(r*.0135*(side==='A'?1:-1),r*.0135);ctx.lineJoin='round';ctx.lineCap='round';
  const rim=side==='A'?'#77cfc9':'#c3a5c2',shadow=side==='A'?'#132833':'#252432',light=side==='A'?'#28404a':'#3a3747';
  const shade=ctx.createLinearGradient(-38,-40,35,48);shade.addColorStop(0,light);shade.addColorStop(.6,shadow);shade.addColorStop(1,'#11202c');
  ctx.fillStyle=shade;ctx.fill(robe);ctx.strokeStyle=color(rim,.92);ctx.lineWidth=1.45;ctx.stroke(robe);
  ctx.fillStyle=side==='A'?'#38474e':'#49434f';ctx.fill(headOutline);ctx.strokeStyle=color(rim,.85);ctx.lineWidth=1.2;ctx.stroke(headOutline);
  ctx.fillStyle=side==='A'?'#15232e':'#241f2c';ctx.fill(hair);ctx.strokeStyle=color(rim,.48);ctx.stroke(hair);
  ctx.lineWidth=.96;for(const path of folding){ctx.strokeStyle=color(rim,.61);ctx.stroke(path);}
  ctx.strokeStyle=color(rim,.8);ctx.stroke(new Path2D('M3 -46 Q5 -44 9 -46 M7 -37 Q9 -36 10 -38'));
  ctx.restore();
}
function staticPlate(canvas,layout,dpr){
  const ctx=canvas.getContext('2d'),{w,h,cx,cy,r,sep}=layout;ctx.setTransform(dpr,0,0,dpr,0,0);
  const bg=ctx.createRadialGradient(cx,cy,r*.2,cx,cy,w*.68);bg.addColorStop(0,'#1a2934');bg.addColorStop(.65,'#0c1922');bg.addColorStop(1,'#09111c');ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
  const step=w<550?24:32;ctx.strokeStyle='#839ea210';ctx.lineWidth=.7;ctx.beginPath();
  for(let x=cx%step;x<w;x+=step){ctx.moveTo(x,0);ctx.lineTo(x,h);}
  for(let y=cy%step;y<h;y+=step){ctx.moveTo(0,y);ctx.lineTo(w,y);}ctx.stroke();
  for(let i=0;i<68;i++){ctx.fillStyle=i%4?'#8da6ad31':'#aac1bf67';ctx.fillRect((i*317%977)/977*w,(i*521%937)/937*h,i%6?1:1.4,1);}
  glow(ctx,cx-sep,cy,r*1.3,'#518f9e',.17);glow(ctx,cx+sep,cy,r*1.3,'#9b647b',.15);
  ctx.save();ctx.beginPath();ctx.arc(cx-sep,cy,r,0,TAU);ctx.clip();ctx.beginPath();ctx.arc(cx+sep,cy,r,0,TAU);ctx.clip();
  const lens=ctx.createLinearGradient(cx,cy-r,cx,cy+r);lens.addColorStop(0,'#d7ffe109');lens.addColorStop(.48,'#b6dfc61c');lens.addColorStop(1,'#d4ffe30b');ctx.fillStyle=lens;ctx.fillRect(cx-r,cy-r,2*r,2*r);ctx.restore();
  shell(ctx,cx-sep,cy,r,CMY,1);shell(ctx,cx+sep,cy,r,RGB,-1);
  ctx.save();ctx.setLineDash([2,5]);ctx.strokeStyle='#b2cdc85b';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(cx,cy-r*.87);ctx.lineTo(cx,cy+r*.85);ctx.stroke();ctx.restore();
  ctx.font='500 '+(w<550?10:12)+'px monospace';ctx.textAlign='center';ctx.fillStyle='#bdcec9';ctx.fillText('Σ',cx,cy-r*.91);
  for(let i=0;i<2;i++){const px=cx+(i?sep:-sep);ctx.fillStyle='#060d1480';ctx.beginPath();ctx.ellipse(px,cy+r*.78,r*.68,r*.08,0,0,TAU);ctx.fill();sitter(ctx,px,cy,r,i?'B':'A');}
}
// θ and θ+π put paired addresses on opposite sides of the same two-lobed display curve.
function projected(g,step,k){
  const theta=step*TAU/20,c=Math.cos(theta),s=Math.sin(theta),spin=[-.67,.07,.76][k];
  const loop=Math.sin(2*theta)*.73,lift=s*.59,dy=loop*Math.cos(spin)-lift*Math.sin(spin)+(k-1)*.11*c;
  return {x:g.cx-g.r*(1.47*c+.035*Math.sin(3*theta+spin)),y:g.cy+g.r*dy,z:loop*Math.sin(spin)+lift*Math.cos(spin)};
}
function tracer(ctx,g,head,tail,k,side){
  const offset=side?10:0,start=Math.max(0,head-tail),col=(side?RGB:CMY)[k],small=g.w<550;
  if(tail>0&&head>start){
    // Fixed subdivision in native step coordinates keeps trails invariant to frame rate.
    const len=head-start,slices=8;
    for(let group=0;group<slices;group++){
      const a=start+len*group/slices,b=start+len*(group+1)/slices,n=Math.max(2,Math.ceil((b-a)*9)),pts=[];
      for(let j=0;j<=n;j++)pts.push(projected(g,offset+a+(b-a)*j/n,k));
      const alpha=.41+.47*(group+1)/slices;
      ctx.lineCap='round';ctx.setLineDash([]);
      if(!side){ctx.lineWidth=small?3.5:5;ctx.strokeStyle=color(col,.07+group*.004);lines(ctx,pts);ctx.stroke();}
      ctx.setLineDash(side?[small?3:4,small?3:5]:[]);ctx.lineWidth=side?(small?1.65:2.2):(small?1.6:2.2);ctx.strokeStyle=color(col,alpha);lines(ctx,pts);ctx.stroke();
    }
  }
}
function head(ctx,p,col,side,r){
  glow(ctx,p.x,p.y,r*3.5,col,.44);ctx.save();ctx.translate(p.x,p.y);if(side)ctx.rotate(Math.PI/4);
  ctx.lineWidth=1.15;ctx.fillStyle=col;ctx.strokeStyle='#f9fff6';
  if(side){const a=r*.89;ctx.fillRect(-a,-a,a*2,a*2);ctx.strokeRect(-a,-a,a*2,a*2);}
  else dot(ctx,0,0,r,col,'#e9ffff');ctx.restore();
}
function heart(ctx,x,y,r,p,col){
  const beat=Math.exp(-(Math.min(p,1-p)**2)/.004);const pr=r*(.037+.017*beat);
  glow(ctx,x,y,r*(.13+.14*beat),col,.3+.42*beat);
  // A phase hand crosses twelve o'clock at each integer-phase heartbeat.
  const ring=r*.097, angle=TAU*p-Math.PI/2;
  ctx.lineWidth=.8;
  dot(ctx,x,y,ring,'#09131bc4',color(col,.72));
  ctx.strokeStyle=color(col,.92);ctx.beginPath();ctx.moveTo(x,y-ring-2);ctx.lineTo(x,y-ring+1.5);ctx.stroke();
  dot(ctx,x+ring*Math.cos(angle),y+ring*Math.sin(angle),Math.max(1.4,r*.013),col);
  ctx.save();ctx.translate(x,y);ctx.scale(pr,pr);ctx.beginPath();ctx.moveTo(0,1);
  ctx.bezierCurveTo(-.23,.55,-1.36,-.02,-.95,-.76);ctx.bezierCurveTo(-.63,-1.19,-.18,-.94,0,-.63);
  ctx.bezierCurveTo(.25,-1.03,.74,-1.12,1,-.7);ctx.bezierCurveTo(1.4,.03,.25,.68,0,1);ctx.fillStyle=col;ctx.fill();ctx.restore();
}
// Each field redraw uses a cached illustrated plate. The clock, heart lights and histories stay dynamic.
export function fieldRenderer(canvas){
  let plate=null,last='',layout=null;
  return function draw(state,opt){
    const {ctx,w,h,dpr}=size(canvas);if(!w||!h)return;
    const key=[w,h,dpr].join('/');
    if(key!==last){
      layout=geometry(w,h);plate=document.createElement('canvas');plate.width=Math.round(w*dpr);plate.height=Math.round(h*dpr);
      staticPlate(plate,layout,dpr);last=key;
    }
    const g=layout;ctx.drawImage(plate,0,0,w,h);ctx.lineJoin='round';
    for(let side=0;side<2;side++){
      const p=side?state.clocks.phaseB:state.clocks.phaseA,col=side?RGB[0]:CMY[0],x=g.cx+(side?g.sep:-g.sep);
      const glowAmount=Math.exp(-(Math.min(p,1-p)**2)/.005);
      ctx.lineWidth=.8+glowAmount*.7;ctx.setLineDash([]);ellipse(ctx,x,g.cy,g.r*(1+.02*glowAmount),g.r*(1+.02*glowAmount),0,color(col,.12+.48*glowAmount));
      heart(ctx,x+(side?-1:1)*g.r*.045,g.cy-g.r*.102,g.r,p,col);
    }
    const selected=opt.pair==='all'?[0,1,2]:[Number(opt.pair)];
    for(const k of selected)for(const side of [0,1])tracer(ctx,g,state.drawn,opt.tail,k,side);
    ctx.setLineDash([]);for(const k of selected)for(const side of [0,1])head(ctx,projected(g,state.drawn+(side?10:0),k),(side?RGB:CMY)[k],side,g.w<550?2.6:3.6);
    const s=g.w<550?10:12;ctx.font='500 '+s+'px monospace';ctx.textAlign='center';ctx.fillStyle='#a9dfd8';ctx.fillText('A · CMY',g.cx-g.sep,g.cy+g.r*1.14);ctx.fillStyle='#dfbfce';ctx.fillText('B · RGB',g.cx+g.sep,g.cy+g.r*1.14);
  };
}
function wave(p){
  const d=(x,m,w)=>Math.exp(-.5*((x-m)/w)**2);const x=p>.65?p-1:p;
  return .15*d(x,-.17,.034)-.17*d(x,-.024,.011)+1.04*d(x,0,.012)-.27*d(x,.031,.014)+.24*d(x,.23,.065);
}
function lineplot(ctx,w,h,sample,col,dash=[],breakAngle=false){
  ctx.beginPath();ctx.strokeStyle=col;ctx.lineWidth=1.7;ctx.setLineDash(dash);let previous=null;
  const pts=Math.max(90,Math.ceil(w*.85));
  for(let i=0;i<=pts;i++){const v=sample(i/pts),x=w*i/pts;if(v===null){previous=null;continue;}
    if(previous===null||breakAngle&&Math.abs(v-previous)>h*.48)ctx.moveTo(x,v);else ctx.lineTo(x,v);previous=v;}
  ctx.stroke();ctx.setLineDash([]);
}
export function rhythmStrip(canvas,clock,t,side){
  const {ctx,w,h}=size(canvas);ctx.clearRect(0,0,w,h);const col=side==='A'?CMY[0]:RGB[0],base=h*.75;
  ctx.fillStyle='#86a0aa27';ctx.fillRect(0,base,w,1);for(let s=0;s<5;s++)ctx.fillRect(w*s/5,5,1,h-8);
  lineplot(ctx,w,h,q=>{const time=t-5+5*q;if(time<0)return null;return base-(h*.63)*wave(clock.at(time)['phase'+side]);},col);
}
export function phasePlot(canvas,clock,t,windowDeg){
  const {ctx,w,h}=size(canvas);if(!w||!h)return;ctx.clearRect(0,0,w,h);const left=32,right=5,top=12,bottom=16,gw=w-left-right,gh=h-top-bottom;
  const mid=top+gh/2,y=d=>mid-d*gh/360;
  ctx.fillStyle='#17322f';ctx.fillRect(left,y(windowDeg),gw,y(-windowDeg)-y(windowDeg));
  ctx.font='10px monospace';ctx.textAlign='right';ctx.fillStyle='#a8bdc3';
  for(const d of [-180,0,180]){ctx.fillText(d+'°',left-4,y(d)+3);ctx.fillStyle='#687c843e';ctx.fillRect(left,y(d),gw,1);ctx.fillStyle='#a8bdc3';}
  const start=Math.max(0,t-15),end=start+15;ctx.save();ctx.translate(left,top);const fy=deg=>gh/2-deg*gh/360;
  for(const [fn,col,dash] of [[clock.baselineAt,'#b7aec9',[4,4]],[clock.at,CMY[0],[]]])
    lineplot(ctx,gw,gh,q=>{const x=start+q*15;return x>t+1e-9?null:fy(fn(x).gapDeg);},col,dash,true);
  ctx.restore();dot(ctx,left+gw*(t-start)/15,y(clock.at(t).gapDeg),2.7,CMY[0]);
  ctx.textAlign='left';ctx.fillStyle='#b3c4c8';ctx.fillText(Math.floor(start)+' s',left,h-2);ctx.textAlign='right';ctx.fillText(Math.floor(end)+' s',w-right,h-2);
}

// Both views share the sitter portraits, heartbeat clocks and dart identity marks.
export {sitter as drawSitter, heart as drawHeart, head as drawDartHead, size as canvasSurface};
