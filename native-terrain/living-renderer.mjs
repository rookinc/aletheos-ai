/** Canvas renderer for the living finite instrument. Rendering never alters topology. */
const TAU=Math.PI*2;
const PALETTE={cyan:'#5de4d5',blue:'#8ca9ff',amber:'#f4c77b',pink:'#e7a1d4',ink:'#09111c',muted:'#71869b',text:'#dae8f2'};
const CHANNELS=['#d7e8eb','#6de0d2','#a695ef','#a695ef','#6de0d2'];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const mix=(a,b,t)=>a+(b-a)*t;
const coordsExtent=cs=>Math.max(1,...cs.flatMap(c=>c.map(Math.abs)));
const memoryAt=(m,i)=>Number(m?.[i]||0);
function pointOn(a,b,t){return a.map((v,i)=>mix(v,b[i],t));}
function pathIds(path){return (path||[]).map(x=>typeof x==='number'?x:x.q??x.state??x.vertex).filter(Number.isInteger);}

export class LivingRenderer {
  constructor(canvas,geometry,{onSelect=()=>{}}={}){
    this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});
    if(!this.ctx)throw Error('A 2D canvas is required for the 3D visualization embedding');
    this.geometry=geometry;this.onSelect=onSelect;this.angleX=-.16;this.angleY=.36;this.zoom=1;this.panX=0;this.panY=0;
    this.hits=[];this.pointers=new Map();this.state=null;this.width=0;this.height=0;this.dpr=0;
    this.g60coords=geometry.g60.coords;this.qcoords=geometry.quotient.coords;
    this.gExtent=coordsExtent(this.g60coords);this.qExtent=coordsExtent(this.qcoords);
    this.fixed=new Set(geometry.quotient.fixedLocus);this.registeredCache=null;
    this.resize=new ResizeObserver(()=>{if(this.state)this.render(this.state);});this.resize.observe(canvas);
    this.handlers={pointerdown:e=>this.pointerDown(e),pointermove:e=>this.pointerMove(e),pointerup:e=>this.pointerUp(e),pointercancel:e=>this.pointerCancel(e),wheel:e=>this.wheel(e),contextmenu:e=>e.preventDefault()};
    for(const [k,fn] of Object.entries(this.handlers))canvas.addEventListener(k,fn,{passive:false});
    canvas.style.touchAction='none';
  }
  resetCamera(preset='isometric'){
    this.angleX=preset==='top'?-Math.PI/2:preset==='front'?0:-.16;
    this.angleY=preset==='front'||preset==='top'?0:.36;this.zoom=1;this.panX=0;this.panY=0;
    if(this.state)this.render(this.state);
  }
  destroy(){this.resize.disconnect();for(const[k,fn]of Object.entries(this.handlers))this.canvas.removeEventListener(k,fn);}
  pointerDown(e){
    this.canvas.setPointerCapture(e.pointerId);this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,moved:false});
    if(this.pointers.size>1)for(const p of this.pointers.values())p.moved=true;
  }
  pointerMove(e){
    const p=this.pointers.get(e.pointerId);if(!p)return;
    const before=[...this.pointers.values()].map(x=>({...x}));const dx=e.clientX-p.x,dy=e.clientY-p.y;
    p.x=e.clientX;p.y=e.clientY;p.moved||=Math.hypot(p.x-p.startX,p.y-p.startY)>5;
    if(this.pointers.size===2){
      const after=[...this.pointers.values()];const d0=Math.hypot(before[0].x-before[1].x,before[0].y-before[1].y),d1=Math.hypot(after[0].x-after[1].x,after[0].y-after[1].y);
      if(d0>0)this.zoom=clamp(this.zoom*d1/d0,.35,4);this.panX+=dx/2;this.panY+=dy/2;
    }else if(e.shiftKey||e.buttons===2){this.panX+=dx;this.panY+=dy;}else{this.angleY+=dx*.006;this.angleX+=dy*.006;}
    if(this.state)this.render(this.state);
  }
  pointerUp(e){
    const p=this.pointers.get(e.pointerId);if(p&&!p.moved&&this.pointers.size===1){
      const rect=this.canvas.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top;
      let best=null,dist=18;for(const hit of this.hits){const d=Math.hypot(hit.x-x,hit.y-y);if(d<dist){dist=d;best=hit;}}
      if(best)this.onSelect({type:best.type,index:best.index,factor:best.factor});
    }this.pointers.delete(e.pointerId);
  }
  pointerCancel(e){this.pointers.delete(e.pointerId);}
  wheel(e){e.preventDefault();this.zoom=clamp(this.zoom*Math.exp(-e.deltaY*.001),.35,4);if(this.state)this.render(this.state);}
  project([x,y,z],box,scale=1,offset=[0,0,0]){
    x+=offset[0];y+=offset[1];z+=offset[2];
    const cy=Math.cos(this.angleY),sy=Math.sin(this.angleY),cx=Math.cos(this.angleX),sx=Math.sin(this.angleX);
    const xx=x*cy+z*sy,zz=-x*sy+z*cy,yy=y*cx-zz*sx,z2=y*sx+zz*cx;
    const unit=Math.min(box.w,box.h)*.36*this.zoom*scale;
    return {x:box.x+box.w/2+this.panX+xx*unit,y:box.y+box.h/2+this.panY-yy*unit,z:z2};
  }
  text(text,x,y,color=PALETTE.muted,size=11,align='left'){
    const c=this.ctx;c.font=`${size}px ui-monospace, SFMono-Regular, Consolas, monospace`;c.textAlign=align;c.fillStyle=color;c.fillText(text,x,y);c.textAlign='left';
  }
  line(a,b,color,alpha=1,width=1){const c=this.ctx;c.globalAlpha=alpha;c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();c.globalAlpha=1;}
  dot(p,r,color,glow=false){const c=this.ctx;if(glow){c.shadowBlur=14;c.shadowColor=color;}c.beginPath();c.arc(p.x,p.y,r,0,TAU);c.fillStyle=color;c.fill();c.shadowBlur=0;}
  ring(p,r,color,alpha=1){const c=this.ctx;c.globalAlpha=alpha;c.strokeStyle=color;c.lineWidth=1;c.beginPath();c.arc(p.x,p.y,r,0,TAU);c.stroke();c.globalAlpha=1;}
  root(p){const c=this.ctx;c.strokeStyle=PALETTE.amber;c.lineWidth=1;c.beginPath();c.moveTo(p.x-10,p.y);c.lineTo(p.x-5,p.y);c.moveTo(p.x+5,p.y);c.lineTo(p.x+10,p.y);c.moveTo(p.x,p.y-10);c.lineTo(p.x,p.y-5);c.moveTo(p.x,p.y+5);c.lineTo(p.x,p.y+10);c.stroke();this.ring(p,4,PALETTE.amber,.85);}
  background(w,h){
    const c=this.ctx,gradient=c.createRadialGradient(w*.5,h*.48,0,w*.5,h*.48,Math.max(w,h)*.7);gradient.addColorStop(0,'#111f2c');gradient.addColorStop(.55,'#0b1521');gradient.addColorStop(1,'#080f19');c.fillStyle=gradient;c.fillRect(0,0,w,h);
    c.strokeStyle='#8da6bc';c.globalAlpha=.035;c.lineWidth=1;
    c.beginPath();for(let x=25;x<w;x+=36){c.moveTo(x,0);c.lineTo(x,h);}for(let y=25;y<h;y+=36){c.moveTo(0,y);c.lineTo(w,y);}c.stroke();c.globalAlpha=1;
  }
  render(state){
    this.state=state;this.animating=false;const c=this.ctx,w=this.canvas.clientWidth||850,h=this.canvas.clientHeight||600;
    const quality=state.options?.quality||'auto',dpr=Math.min(globalThis.devicePixelRatio||1,quality==='low'?1:2);
    if(w!==this.width||h!==this.height||dpr!==this.dpr){this.canvas.width=Math.round(w*dpr);this.canvas.height=Math.round(h*dpr);this.width=w;this.height=h;this.dpr=dpr;}
    c.setTransform(dpr,0,0,dpr,0,0);this.background(w,h);this.hits=[];
    const box={x:0,y:0,w,h};
    if(state.mode==='memory')this.memoryView(box,state);
    else if(state.mode==='harmonics'||state.carrier==='g9000')this.harmonicView(box,state);
    else if(state.carrier==='g1800')this.registeredView(box,state);
    else if(state.carrier==='g900')this.quotientView(box,state,state.b||state.a,PALETTE.cyan,true);
    else this.nativeView(box,state);
    this.compass(w-40,h-45);
  }
  compass(x,y){
    const axes=[[1,0,0,PALETTE.pink,'x'],[0,1,0,PALETTE.cyan,'y'],[0,0,1,PALETTE.blue,'z']];
    for(const[a,b,c,color,label]of axes){const cy=Math.cos(this.angleY),sy=Math.sin(this.angleY),cx=Math.cos(this.angleX),sx=Math.sin(this.angleX);const xx=a*cy+c*sy,zz=-a*sy+c*cy,yy=b*cx-zz*sx;const p={x:x+xx*17,y:y-yy*17};this.line({x,y},p,color,.65);this.text(label,p.x+3,p.y,color,9);}
  }
  nativeView(box,s){
    const pair=s.carrier==='pair'||!s.carrier,parts=pair?2:1,g=this.geometry.g60;
    const edgeId=Number.isInteger(s.walkerEdge)?s.walkerEdge:0,edge=this.geometry.directedEdges[edgeId]||this.geometry.directedEdges[0];
    const tri=g.triangles[this.geometry.triangleForEdge[edgeId]]||[];
    const orbit=s.tick%20,caption=pair?'COUPLED G60 × G60':'NATIVE G60';
    this.text(caption,24,32,PALETTE.text,12);this.text('60 vertices · 120 edges per factor',24,51,PALETTE.muted,10);
    const rootPair=this.geometry.quotient.orbits[s.rootQ??0]?.[0]||[0,0],activePoints=[];
    for(let factor=0;factor<parts;factor++){
      const right=pair?factor===1:s.carrier==='g60-right',color=right?PALETTE.blue:PALETTE.cyan;
      // Separation is a visualization layout, not an edge or coupling law.
      const offset=pair?[right ? .91 : -.91,0,0]:[0,0,0],scale=pair ? .68 : 1;
      const ps=this.g60coords.map(v=>this.project(v.map(x=>x/this.gExtent),box,scale,offset));
      if(s.options?.edges!==false){const c=this.ctx;c.beginPath();for(const[a,b]of g.edges){c.moveTo(ps[a].x,ps[a].y);c.lineTo(ps[b].x,ps[b].y);}c.strokeStyle=color;c.globalAlpha=.19;c.lineWidth=.9;c.stroke();c.globalAlpha=1;}
      if(s.mode==='waltz'){
        const c=this.ctx;c.beginPath();for(let k=0;k<tri.length;k++){const a=ps[tri[k]],b=ps[tri[(k+1)%tri.length]];c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);}c.strokeStyle=color;c.globalAlpha=.8;c.lineWidth=2;c.stroke();c.globalAlpha=1;
        if(tri.length===3){c.beginPath();c.moveTo(ps[tri[0]].x,ps[tri[0]].y);c.lineTo(ps[tri[1]].x,ps[tri[1]].y);c.lineTo(ps[tri[2]].x,ps[tri[2]].y);c.closePath();c.fillStyle=color;c.globalAlpha=.045;c.fill();c.globalAlpha=1;}
      }
      for(const p of ps.map((p,index)=>({...p,index})).sort((a,b)=>a.z-b.z)){
        const hot=tri.includes(p.index)&&s.mode==='waltz';this.dot(p,hot?3.4:2.2,color,hot);this.hits.push({...p,type:'g60',index:p.index,factor:right?'right':'left'});
      }
      this.root(ps[rootPair[right?1:0]]);
      if(Number.isInteger(s.selectedVertex))this.ring(ps[s.selectedVertex%60],8,PALETTE.text,.7);
      if(s.mode==='waltz'){
        const t=clamp(Number(s.blend??1),0,1),smooth=t*t*(3-2*t),a=ps[edge[0]],b=ps[edge[1]],moving={x:mix(a.x,b.x,smooth),y:mix(a.y,b.y,smooth)};
        if(s.options?.trails!==false){this.line(a,b,color,.4,2.5);for(let i=0;i<8;i++){const u=clamp(smooth-i*.032,0,1);this.dot({x:mix(a.x,b.x,u),y:mix(a.y,b.y,u)},(8-i)*.35,color);}}
        this.dot(moving,6,color,true);this.ring(moving,12,color,.35);activePoints.push(moving);
        this.text(`${right?'R':'L'} · ${edge[0]+1} → ${edge[1]+1}`,moving.x+15,moving.y-14,color,11);
      }
      const center=this.project([0,-1.35,0],box,scale,offset);this.text(right?'G60  /  RIGHT':'G60  /  LEFT',center.x,center.y,color,11,'center');
    }
    if(pair&&s.options?.seam!==false){
      const p0=this.project([-.05,-.92,0],box,.68),p1=this.project([.05,.92,0],box,.68);const c=this.ctx;c.setLineDash([3,6]);this.line(p0,p1,PALETTE.amber,.32);c.setLineDash([]);
      if(activePoints.length===2){c.setLineDash([3,5]);this.line(activePoints[0],activePoints[1],PALETTE.amber,.38);c.setLineDash([]);}
      this.text('candidate interface',box.w/2,box.h-68,PALETTE.amber,10,'center');
    }
    this.text('Drag to orbit · pinch / wheel to zoom · shift-drag to pan',24,box.h-24,PALETTE.muted,10);
  }
  qProjection(box,s,run){
    const opts=s.options||{},memory=run?.memory||[],deformation=Number(opts.deformation||0);
    const maxMemory=Math.max(1,...memory);
    return this.qcoords.map((v,index)=>{
      const amount=deformation*memoryAt(memory,index)/maxMemory*.26;
      return this.project(v.map(x=>x/this.qExtent*(1+amount)),box,.93);
    });
  }
  quotientView(box,s,run,color=PALETTE.cyan,caption=true){
    const q=this.geometry.quotient,opts=s.options||{},ps=this.qProjection(box,s,run),c=this.ctx;
    const low=opts.quality==='low'||(opts.quality==='auto'&&box.w<600),density=clamp(Number(opts.density??1),.05,1),stride=Math.max(1,Math.round(1/density));
    if(caption){this.text('G900  /  DIAGONAL V4 QUOTIENT',box.x+24,box.y+32,PALETTE.text,12);this.text('900 states · Cartesian-product adjacency',box.x+24,box.y+51,PALETTE.muted,10);}
    if(opts.edges!==false){c.beginPath();const skip=low?2:1;for(let j=0;j<q.edges.length;j+=skip){const[a,b]=q.edges[j];c.moveTo(ps[a].x,ps[a].y);c.lineTo(ps[b].x,ps[b].y);}c.strokeStyle=color;c.globalAlpha=.075;c.lineWidth=.6;c.stroke();c.globalAlpha=1;}
    for(let i=0;i<ps.length;i+=stride){c.globalAlpha=.35+(ps[i].z+1)*.08;this.dot(ps[i],low?1:1.5,color);this.hits.push({...ps[i],type:'quotient',index:i});}c.globalAlpha=1;
    if(opts.fixed!==false){for(const i of q.fixedLocus){this.dot(ps[i],2,PALETTE.amber);if(!low)this.ring(ps[i],3.7,PALETTE.amber,.25);}}
    if(opts.seam!==false){const selected=s.selectedQ??0,orb=q.orbits[selected];if(orb){const c0=ps[selected];this.ring(c0,14,PALETTE.amber,.5);}}
    const path=pathIds(run?.path),length=Math.max(3,Number(opts.tracePersistence??s.tracePersistence??120));
    if(opts.trails!==false&&path.length>1){const history=path.slice(-length);for(let i=1;i<history.length;i++){const a=ps[history[i-1]],b=ps[history[i]];if(a&&b)this.line(a,b,color,.15+.75*i/history.length,1.6);}}
    const root=opts.followRoot&&Number.isInteger(run?.q)?run.q:(Number.isInteger(s.rootQ)?s.rootQ:0);if(ps[root])this.root(ps[root]);
    if(Number.isInteger(s.selectedQ)&&ps[s.selectedQ]){this.ring(ps[s.selectedQ],8,PALETTE.text,.6);this.text(`q${s.selectedQ+1}`,ps[s.selectedQ].x+11,ps[s.selectedQ].y-8,PALETTE.text,10);}
    if(run&&Number.isInteger(run.q)&&ps[run.q]){
      const current=ps[run.q],prev=ps[run.previousQ]||current,t=clamp(Number(s.blend??1),0,1),p={x:mix(prev.x,current.x,t),y:mix(prev.y,current.y,t)};
      this.dot(p,5.2,color,true);this.ring(p,10,color,.45);this.text(`q${run.q+1}`,p.x+12,p.y-10,color,10);
    }
    return ps;
  }
  memoryView(box,s){
    const vertical=box.w<560,half=vertical?box.h/2:box.w/2;
    const panes=vertical?[{x:0,y:0,w:box.w,h:half},{x:0,y:half,w:box.w,h:half}]:[{x:0,y:0,w:half,h:box.h},{x:half,y:0,w:half,h:box.h}];
    const c=this.ctx;c.strokeStyle='#314253';c.lineWidth=1;c.beginPath();if(vertical){c.moveTo(12,half);c.lineTo(box.w-12,half);}else{c.moveTo(half,20);c.lineTo(half,box.h-20);}c.stroke();
    const runs=[s.a,s.b],colors=[PALETTE.blue,PALETTE.cyan];
    for(let k=0;k<2;k++){
      const b=panes[k];c.save();c.beginPath();c.rect(b.x,b.y,b.w,b.h);c.clip();
      this.quotientView(b,s,runs[k],colors[k],false);
      const coupling=k&&runs[k]?.memoryEnabled&&Number(runs[k]?.coupling??0)!==0;
      this.text(k?`B  /  MEMORY COUPLING ${coupling?'ON':'OFF'}`:'A  /  MEMORY COUPLING OFF',b.x+18,b.y+29,colors[k],11);
      this.text(`encounter ${s.tick||0} · q${(runs[k]?.q??0)+1}`,b.x+18,b.y+48,PALETTE.muted,10);
      const mem=runs[k]?.memory||[],mass=mem.reduce((a,v)=>a+v,0);this.text(`history mass ${mass.toFixed(2)}`,b.x+18,b.y+b.h-25,PALETTE.muted,10);
      c.restore();
    }
    if(s.a&&s.b&&s.a.q!==s.b.q){this.text('TRAJECTORIES DIVERGED',box.w/2,vertical?half-10:box.h-52,PALETTE.amber,10,'center');}
  }
  registeredCoordinates(data){
    if(this.registeredCache?.data===data)return this.registeredCache;
    const fibers=data.fibers||data.orbits||[],source=this.g60coords;
    const coords=fibers.map((fiber,i)=>{
      let pair=Array.isArray(fiber[0])?fiber[0]:null;
      if(!pair&&Number.isInteger(fiber[0]))pair=[Math.floor(fiber[0]/60),fiber[0]%60];
      if(!pair&&Array.isArray(fiber)&&fiber.length===2&&fiber.every(Number.isInteger))pair=fiber;
      if(!pair)return this.qcoords[data.toG900?.[i]??i%900];
      const a=source[pair[0]],b=source[pair[1]];return [a[0]+b[0]*.48,a[1]+b[1]*.48,a[2]+b[2]*.48];
    });
    this.registeredCache={data,coords,extent:coordsExtent(coords)};return this.registeredCache;
  }
  registeredView(box,s){
    const data=s.registered;
    this.text('G1800  /  REGISTERED CARRIER',24,32,PALETTE.text,12);
    if(!data?.fibers){this.text('Native registered source is unavailable.',24,55,PALETTE.amber,11);return;}
    const {coords,extent}=this.registeredCoordinates(data),ps=coords.map(v=>this.project(v.map(x=>x/extent),box,.95)),c=this.ctx;
    if(s.options?.edges!==false&&data.edges){c.beginPath();const skip=s.options?.quality==='low'?4:s.options?.quality==='high'?1:2;for(let i=0;i<data.edges.length;i+=skip){const[a,b]=data.edges[i];c.moveTo(ps[a].x,ps[a].y);c.lineTo(ps[b].x,ps[b].y);}c.strokeStyle=PALETTE.blue;c.globalAlpha=.07;c.lineWidth=.65;c.stroke();c.globalAlpha=1;}
    const stride=Math.max(s.options?.quality==='low'?3:1,Math.round(1/clamp(Number(s.options?.density??1),.05,1)));for(let i=0;i<ps.length;i+=stride){this.dot(ps[i],1.4,PALETTE.blue);this.hits.push({...ps[i],type:'quotient',index:data.toG900?.[i]??0});}
    const index=s.registeredIndex??s.internalState??0;if(ps[index]){this.dot(ps[index],6,PALETTE.cyan,true);this.ring(ps[index],12,PALETTE.cyan,.5);this.text(`x${index+1}`,ps[index].x+14,ps[index].y-12,PALETTE.cyan,11);}
    this.text('Pair-derived visualization embedding · topology unchanged',24,box.h-24,PALETTE.muted,10);
  }
  harmonicView(box,s){
    const data=s.registered,c=this.ctx,hasNative=Boolean(data?.fibers),tick=Number(s.tick||0),action=['F','S','K'].includes(s.action)?s.action:'F',period=action==='F'?20:action==='S'?5:4,frame=s.frame??(action==='K'?0:tick%5),turn=s.internalTurn??(action==='S'?0:tick%4);
    this.text('FIVE REGISTERED FRAMES',24,32,PALETTE.text,12);this.text(hasNative?'G9000 · 5 × 1800 states · native registered transport':'Five-frame Fourier visualization · registered data unavailable',24,51,hasNative?PALETTE.muted:PALETTE.amber,10);
    const channel=s.options?.channel||'all',channels=/^[0-4]$/.test(channel)?[Number(channel)]:channel==='14'?[1,4]:channel==='23'?[2,3]:[0,1,2,3,4];
    const selected=new Set(channels),recombine=channel==='recombined',phase=(tick%period+Number(s.blend??0))/period;
    const targetSpread=recombine ? .13 : .82;
    this.harmonicSpread=this.harmonicSpread===undefined?targetSpread:mix(this.harmonicSpread,targetSpread,.12);
    this.animating=Math.abs(this.harmonicSpread-targetSpread)>.001;
    if(!this.animating)this.harmonicSpread=targetSpread;
    const spread=this.harmonicSpread,center={x:box.x+box.w/2+this.panX,y:box.y+box.h*.5+this.panY};
    const radius=Math.min(box.w,box.h)*.31*this.zoom*spread,frameRadius=Math.min(box.w,box.h)*.11*this.zoom;
    const frameCenters=Array.from({length:5},(_,f)=>({x:center.x+Math.cos(-Math.PI/2+TAU*f/5)*radius,y:center.y+Math.sin(-Math.PI/2+TAU*f/5)*radius}));
    const rc=hasNative?this.registeredCoordinates(data):null;
    for(let f=0;f<5;f++){
      const p=frameCenters[f],n=frameCenters[(f+1)%5];this.line(p,n,PALETTE.muted,.16,1);
      const contribution=channels.reduce((sum,k)=>{const z=s.harmonics?.channels?.[k]?.[f];return {re:sum.re+(z?.re??0),im:sum.im+(z?.im??0)};},{re:0,im:0});
      const amplitude=s.harmonics?.channels?Math.hypot(contribution.re,contribution.im):.2;
      const intensity=clamp(amplitude,.05,1);
      this.line(p,center,PALETTE.blue,.08+intensity*.35,1);
      this.ring(p,frameRadius,PALETTE.blue,.18+intensity*.4);
      if(rc){
        const stride=Math.max(1,Math.round((s.options?.quality==='low'?20:s.options?.quality==='high'?2:8)/clamp(Number(s.options?.density??1),.05,1)));
        const mini={x:p.x-frameRadius,y:p.y-frameRadius,w:frameRadius*2,h:frameRadius*2};
        // Mini carrier rotations share the main camera; translations are kept local.
        const savePan=[this.panX,this.panY],saveZoom=this.zoom;this.panX=0;this.panY=0;this.zoom=1;
        for(let j=0;j<rc.coords.length;j+=stride){const xy=this.project(rc.coords[j].map(v=>v/rc.extent),mini,1.3);c.globalAlpha=.12+.5*intensity;this.dot(xy,s.options?.quality==='high'?1:.8,CHANNELS[f]);}
        const ix=s.registeredIndex??0;if(rc.coords[ix]){const p1=this.project(rc.coords[ix].map(v=>v/rc.extent),mini,1.3);c.globalAlpha=1;this.dot(p1,f===frame?4:2,PALETTE.cyan,f===frame);}
        this.panX=savePan[0];this.panY=savePan[1];this.zoom=saveZoom;
      }else{
        for(let j=0;j<20;j++){const a=TAU*j/20;this.dot({x:p.x+Math.cos(a)*frameRadius*.66,y:p.y+Math.sin(a)*frameRadius*.66},1,CHANNELS[f]);}
      }
      c.globalAlpha=1;
      if(f===frame){this.ring(p,frameRadius+6,PALETTE.cyan,.75);if(spread>.5)this.text('ACTIVE',p.x,p.y-frameRadius-14,PALETTE.cyan,8,'center');}
      if(spread>.5){
        this.text(`frame ${f+1}`,p.x,p.y+frameRadius+19,PALETTE.text,10,'center');
        this.text(`|ψ| ${amplitude.toFixed(3)}`,p.x,p.y+frameRadius+32,PALETTE.muted,9,'center');
      }
    }
    const pulse=.5+.5*Math.sin(phase*TAU);this.dot(center,5+pulse*2,PALETTE.text,true);this.ring(center,15+pulse*3,PALETTE.text,.18);
    if(!recombine){this.text(action==='F'?'F = S ∘ K':action==='S'?'S · frame shift':'K · internal turn',center.x,center.y+32,PALETTE.text,10,'center');}
    else{this.text('Σ Pₖ ψ = ψ',center.x,center.y+frameRadius+55,PALETTE.text,12,'center');this.text('recombined · frame locations visually compressed',center.x,center.y+frameRadius+74,PALETTE.muted,9,'center');}
    const barY=box.h-62,barWidth=Math.min(360,box.w-90),barX=(box.w-barWidth)/2;
    for(let k=0;k<5;k++){
      const x=barX+k*(barWidth/5),width=barWidth/5-8;
      const energies=s.harmonics?.energy||s.harmonics?.amplitudes||[.2,.2,.2,.2,.2];
      const total=energies.reduce((sum,v)=>sum+Number(v||0),0)||1;
      const raw=energies[k]/total;
      const amp=typeof raw==='number'?raw:Math.hypot(raw.re||0,raw.im||0);
      c.fillStyle='#1b2939';c.fillRect(x,barY,width,4);c.fillStyle=CHANNELS[k];c.globalAlpha=selected.has(k)?1:.25;c.fillRect(x,barY,width*clamp(amp,0,1),4);c.globalAlpha=1;
      this.text(`k=${k} ${(amp*100).toFixed(0)}%`,x,barY+19,CHANNELS[k],10);
    }
    this.text(`frame ${frame+1}/5  ·  internal turn ${turn}/4  ·  ${action} return ${tick%period}/${period}`,box.w/2,box.h-15,PALETTE.muted,10,'center');
  }
}
