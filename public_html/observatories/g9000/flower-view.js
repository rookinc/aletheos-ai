window.FLOWER_VIEW={create({state,D,ctx:main,project,dot,label}){
 const G=window.FLOWER_GEOMETRY,S=window.SPHERICAL,TAU=Math.PI*2;
 const layer=document.createElement('canvas'),ctx=layer.getContext('2d'),bloom=document.createElement('canvas'),bctx=bloom.getContext('2d');
 let color=window.FLOWER_COLOR.profile(state.flowerColor,state.flowerBlack),cols=color.colors;
 const opacity=a=>Math.min(1,a);
 function begin(){
  color=window.FLOWER_COLOR.profile(state.flowerColor,state.flowerBlack);cols=color.colors;
  if(layer.width!==main.canvas.width||layer.height!==main.canvas.height){layer.width=main.canvas.width;layer.height=main.canvas.height;bloom.width=Math.ceil(layer.width/3);bloom.height=Math.ceil(layer.height/3);}
  ctx.setTransform(1,0,0,1,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.clearRect(0,0,layer.width,layer.height);
  if(color.paper){ctx.fillStyle='#ffffff';ctx.fillRect(0,0,layer.width,layer.height);}
  ctx.setTransform(main.getTransform());ctx.globalCompositeOperation=color.blend;
 }
 function composite(){
  main.save();main.setTransform(1,0,0,1,0,0);main.globalAlpha=1;main.globalCompositeOperation=color.mode==='rgb'?'lighter':'source-over';
  if(color.mode==='rgb'&&state.flowerGlow){
   bctx.clearRect(0,0,bloom.width,bloom.height);bctx.filter='blur(3px)';bctx.drawImage(layer,0,0,bloom.width,bloom.height);bctx.filter='none';
   main.globalAlpha=Math.min(1,.9*state.flowerIntensity);main.drawImage(bloom,0,0,main.canvas.width,main.canvas.height);main.globalAlpha=1;
  }
  if(color.mode==='rgb'){for(let light=state.flowerIntensity;light>1e-8;light-=1){main.globalAlpha=Math.min(1,light);main.drawImage(layer,0,0);}}else main.drawImage(layer,0,0);main.restore();
 }
 function dart(p,n,plane,selected){
  const size=selected?6:2.2;ctx.save();ctx.translate(p[0],p[1]);ctx.rotate(Math.atan2(n[1]-p[1],n[0]-p[0]));ctx.fillStyle=cols[plane];ctx.beginPath();ctx.moveTo(size,0);ctx.lineTo(-size*.7,-size*.5);ctx.lineTo(-size*.35,0);ctx.lineTo(-size*.7,size*.5);ctx.closePath();ctx.fill();ctx.restore();
 }
 let cacheKey='',curves=[];
 const point=(route,t,plane)=>G.at(route,t,D.cycles,state.flowerDepth,plane,state.flowerWrap);
 const screen=p=>project(p.map(v=>v*5));
 const segment=(a,b)=>{ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);};
 function path(points,col,alpha,width=1){ctx.globalAlpha=opacity(alpha);ctx.strokeStyle=col;ctx.lineWidth=width;ctx.beginPath();let prev=null;for(const v of points){const p=screen(v);if(prev)segment(prev,p);prev=p;}ctx.stroke();ctx.globalAlpha=1;}
 function circles(){const key=[state.flowerWrap,state.flowerDepth].join('/');if(key!==cacheKey){curves=[];const levels=state.flowerDepth>0?[-2,-1,0,1,2]:[0];for(let plane=0;plane<3;plane++){
  for(const f of levels)for(const [x,y]of G.centers())curves.push({plane,central:f===0,points:Array.from({length:65},(_,j)=>G.wrapPoint([x+.42*Math.cos(j*TAU/64),y+.42*Math.sin(j*TAU/64),f*.26*state.flowerDepth],plane,state.flowerWrap))});
  for(const r of [1.28,1.32])curves.push({plane,central:true,points:Array.from({length:97},(_,j)=>G.wrapPoint([r*Math.cos(j*TAU/96),r*Math.sin(j*TAU/96),0],plane,state.flowerWrap))});
 }cacheKey=key;}
 for(const c of curves)if(state.flowerPlanes[c.plane])path(c.points,cols[c.plane],state.flowerCircles*(c.central?.65:.15),c.central?.85:.5);
 }
 function tails(ids){
 // Sample one full cycle per route, sharing its local point across the three charts.
 const routes=ids.map(c=>{const count=c===state.selected?8:4,t=state.phase+(state.stagger&&c!==state.selected?c%20:0),planes=[[],[],[]];
  for(let j=0;j<=20*count;j++){const v=point(c,t-j/count,0);for(let plane=0;plane<3;plane++)if(state.flowerPlanes[plane])planes[plane].push(screen(G.source.planePoint(v,plane)));}
  return {c,count,planes};
 });
 // Batch equal-age strokes, keeping the selected route wider, with the same alpha law.
 for(let step=19;step>=0;step--){const alpha=window.FLOWER_TAIL.opacity(state.flowerTails,step/19);if(alpha===0)continue;
  for(let plane=0;plane<3;plane++){if(!state.flowerPlanes[plane])continue;
   for(const selected of [false,true]){ctx.globalAlpha=alpha;ctx.strokeStyle=cols[plane];ctx.lineWidth=selected?1.5:.65;ctx.beginPath();
    for(const r of routes){if((r.c===state.selected)!==selected)continue;const start=step*r.count,points=r.planes[plane];ctx.moveTo(points[start][0],points[start][1]);for(let j=1;j<=r.count;j++)ctx.lineTo(points[start+j][0],points[start+j][1]);}
    ctx.stroke();
   }
  }
 }
 ctx.globalAlpha=1;
}
 function connector(a,b){const r=Math.hypot(...a),s=Math.hypot(...b);if(r<1e-10||s<1e-10)return[a,b];const u=a.map(v=>v/r),v=b.map(v=>v/s);return Array.from({length:13},(_,j)=>{const t=j/12,q=S.arc(u,v,t),radius=r+(s-r)*t;return a.map((x,i)=>(x+(b[i]-x)*t)*(1-state.flowerWrap)+q[i]*radius*state.flowerWrap);});}
 function render(){begin();circles();const hit=[],records=[],guides=[],selected=state.selected,ids=state.allDarts?Array.from({length:450},(_,i)=>i):[selected];
 if(state.flowerTails>0)tails(ids);
 for(const c of ids){const t=state.phase+(state.stagger&&c!==selected?c%20:0),ps=[0,1,2].map(i=>point(c,t,i));
  if(state.flowerTriangles&&state.flowerPlanes.every(Boolean)){
   for(let i=0;i<3;i++)guides.push({points:connector(ps[i],ps[(i+1)%3]),selected:c===selected});
  }
  for(let i=0;i<3;i++){if(!state.flowerPlanes[i])continue;const p=screen(ps[i]),n=screen(point(c,t+.012,i));
   records.push({p,n,c,plane:i});
  }
 }
 if(state.orbitPath&&state.flowerTails===0)for(let plane=0;plane<3;plane++)if(state.flowerPlanes[plane])path(Array.from({length:201},(_,j)=>point(selected,j/10,plane)),cols[plane],.75,1.35);
 records.sort((a,b)=>a.p[2]-b.p[2]);for(const {p,n,c,plane}of records){ctx.globalAlpha=opacity(c===selected?1:p[2]<0?.45:.85);dart(p,n,plane,c===selected);hit.push([p[0],p[1],c]);}ctx.globalAlpha=1;
 composite();main.save();main.globalCompositeOperation='source-over';for(const g of guides){main.globalAlpha=g.selected?.45:.035;main.strokeStyle=color.paper?'#394f63':g.selected?'#eff8ff':'#87afbd';main.lineWidth=g.selected?1.15:.55;main.beginPath();g.points.forEach((v,i)=>{const p=screen(v);if(i)main.lineTo(p[0],p[1]);else main.moveTo(p[0],p[1]);});main.stroke();}main.restore();
 for(const {p,c,plane}of records)if(c===selected){dot(p,1.6,color.paper?'#16212c':'#ffffff');label([p[0]+10,p[1]-10],`D${c} · ${['XY','XZ','YZ'][plane]}`,color.labels[plane],9,'left');}
 return hit;
 }
 return {render,point};
}};
