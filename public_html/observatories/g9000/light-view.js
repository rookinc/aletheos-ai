window.LIGHT_VIEW={create({state,D,ctx:main,project,dot,label}){
let ctx=main;const shellCanvas=document.createElement('canvas'),shellContext=shellCanvas.getContext('2d');
const C=window.LIGHT_COMPONENTS,G=window.FLOWER_GEOMETRY,T=window.FLOWER_TAIL,TAU=Math.PI*2;
const colors=['#ff443e','#32f27a','#527fff'],names=['R · XY','G · XZ','B · YZ'];
let depth=-1,geometry=null,key='',data=[],field=null,white=[],lit=0,peak=0;
const nx=72,ny=36,cells=[];
const scr=p=>project(p.map(x=>x*5));
for(let y=0;y<ny;y++)for(let x=0;x<nx;x++){
 const a=x*TAU/nx,b=(x+1)*TAU/nx,c=-Math.PI/2+y*Math.PI/ny,d=c+Math.PI/ny;
 cells.push({center:C.sphere((a+b)/2,(c+d)/2),corners:[C.sphere(a,c),C.sphere(b,c),C.sphere(b,d),C.sphere(a,d)]});
}
function ensure(){if(depth!==state.flowerDepth){depth=state.flowerDepth;geometry=C.model(D.cycles,depth);key='';}}
function point(c,t,plane=state.flowerReadPlane){ensure();return C.direction(geometry.residual(c,t,plane));}
function prepare(){ensure();const next=[state.phase,state.selected,state.allDarts,state.stagger,state.flowerTails,state.flowerPlanes.join(''),depth,state.lightInside].join('/');if(next===key)return;
 key=next;data=[];const raw=C.grid(nx,ny),ids=state.allDarts?Array.from({length:450},(_,c)=>c):[state.selected];
 for(const c of ids){const t=state.phase+(state.stagger&&c!==state.selected?c%20:0),steps=state.flowerTails>0?20*(c===state.selected?8:2):0,count=steps||1,planes=[[],[],[]];
  for(let j=0;j<=steps;j++){
   const age=steps?20*j/steps:0,v=geometry.residual(c,t-age,0),alpha=steps?T.opacity(state.flowerTails,Math.min(19,Math.floor(age))/19):1;
   for(let plane=0;plane<3;plane++)if(state.flowerPlanes[plane]){
    const q=G.source.planePoint(v,plane),u=C.direction(q);if(!u)continue;
    planes[plane].push({p:C.inside(q,state.lightInside),u,alpha});
    if(j<steps||!steps)C.deposit(raw,u,plane,alpha/count);
   }
  }
  data.push({c,planes});
 }
 field=C.smooth(raw);white=new Float64Array(nx*ny);lit=0;peak=0;
 for(let i=0;i<white.length;i++){
  const value=C.split(Array.from(field.values.subarray(3*i,3*i+3))).white/C.area(field,Math.floor(i/nx));white[i]=value;if(value>1e-8)lit++;peak=Math.max(peak,value);
 }
}
function ratio(sample,plane){const i=3*C.index(field,sample.u),v=field.values[ i+plane],w=Math.min(field.values[i],field.values[i+1],field.values[i+2]);return v>1e-12?Math.max(0,1-w/v):0;}
function shell(front){
 if(shellCanvas.width!==main.canvas.width||shellCanvas.height!==main.canvas.height){shellCanvas.width=main.canvas.width;shellCanvas.height=main.canvas.height;}
 ctx=shellContext;ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,shellCanvas.width,shellCanvas.height);ctx.setTransform(main.getTransform());
 const normal=(state.allDarts?450:1)/(4*Math.PI),power=state.lightShell*state.flowerIntensity;
 for(let i=0;i<cells.length;i++){if(white[i]<1e-8)continue;const cell=cells[i],center=scr(cell.center);if((center[2]>=0)!==front)continue;
  const a=(1-Math.exp(-power*white[i]/normal))*(front?.68:.18);if(a<.002)continue;
  ctx.globalAlpha=a;ctx.fillStyle='#ffffff';ctx.beginPath();cell.corners.forEach((v,j)=>{const p=scr(v);if(j)ctx.lineTo(p[0],p[1]);else ctx.moveTo(p[0],p[1]);});ctx.closePath();ctx.fill();
 }
 ctx.globalAlpha=1;ctx=main;main.save();main.setTransform(1,0,0,1,0,0);main.filter='blur(1.5px)';main.drawImage(shellCanvas,0,0);main.restore();
}
function grid(){
 const center=scr([0,0,0]),r=Math.max(...cells.map(c=>{const p=scr(c.center);return Math.hypot(p[0]-center[0],p[1]-center[1]);}));
 ctx.strokeStyle='#c4d7e14d';ctx.lineWidth=1;ctx.beginPath();ctx.arc(center[0],center[1],r,0,TAU);ctx.stroke();if(!state.lightGrid)return;
 function line(points){let prev=null;for(const v of points){const p=scr(v);ctx.globalAlpha=p[2]>0?.19:.055;ctx.beginPath();if(prev){ctx.moveTo(prev[0],prev[1]);ctx.lineTo(p[0],p[1]);ctx.stroke();}prev=p;}}
 ctx.strokeStyle='#ffffff';ctx.lineWidth=.7;
 for(let lat=-60;lat<=60;lat+=30)line(Array.from({length:97},(_,j)=>C.sphere(j*TAU/96,lat*Math.PI/180)));
 for(let lon=0;lon<360;lon+=30)line(Array.from({length:49},(_,j)=>C.sphere(lon*Math.PI/180,-Math.PI/2+j*Math.PI/48)));
 ctx.globalAlpha=1;
}
function render(){prepare();const hit=[];ctx.save();shell(false);
 if(state.lightInterior>0){
  const buckets=Array.from({length:3},()=>Array.from({length:12},()=>[[],[]]));
  for(const r of data)for(let plane=0;plane<3;plane++){const ps=r.planes[plane];let previous=null;
   for(let j=0;j<ps.length;j++){const sample=ps[j],p=scr(sample.p);if(previous){const alpha=(sample.alpha*ratio(sample,plane)+ps[j-1].alpha*ratio(ps[j-1],plane))/2,band=Math.min(11,Math.floor(alpha*12));if(alpha>1e-5)buckets[plane][band][r.c===state.selected?1:0].push([previous,p]);}previous=p;}
  }
  ctx.globalCompositeOperation='source-over';
  for(let plane=0;plane<3;plane++)for(let band=0;band<12;band++)for(let selected=0;selected<2;selected++){
   const parts=buckets[plane][band][selected];if(!parts.length)continue;ctx.globalAlpha=(band+.5)/12*state.lightInterior;ctx.strokeStyle=colors[plane];ctx.lineWidth=selected?1.8:.65;ctx.beginPath();for(const[a,b]of parts){ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);}ctx.stroke();
  }
  ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
  for(const r of data)for(let plane=0;plane<3;plane++)if(r.planes[plane].length){const sample=r.planes[plane][0],p=scr(sample.p),selected=r.c===state.selected;
   ctx.globalAlpha=Math.max(selected?.5:.08,ratio(sample,plane))*state.lightInterior;dot(p,selected?4:1.25,colors[plane]);hit.push([p[0],p[1],r.c]);ctx.globalAlpha=1;
   if(selected){label([p[0]+10,p[1]-10],`D${r.c} · ${names[plane]}`,colors[plane],9,'left');if(state.lightRays){const i=C.index(field,sample.u),a=white[i]/((state.allDarts?450:1)/(4*Math.PI));if(a>.001){const q=scr(sample.u);ctx.strokeStyle='#ffffff';ctx.globalAlpha=Math.min(.65,a*.6);ctx.setLineDash([3,5]);ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(q[0],q[1]);ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1;}}}
  }
 }
 shell(true);grid();ctx.restore();return hit;
}
return{render,point,stats:()=>({lit,total:nx*ny,peak})};
}};
