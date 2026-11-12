/* F-cycle mean removal and directional RGB decomposition for the Light view. */
(function(root){
'use strict';
const G=typeof module==='object'&&module.exports?require('./flower-geometry.js'):root.FLOWER_GEOMETRY;
const TAU=2*Math.PI,mod=(x,n)=>(x%n+n)%n;
function model(cycles,depth){
 const means=cycles.map((_,c)=>{const m=[0,0,0];for(let t=0;t<20;t++){const p=G.at(c,t,cycles,depth,0,1);for(let i=0;i<3;i++)m[i]+=p[i]/20;}return m;});
 function residual(c,t,plane=0){const p=G.at(c,t,cycles,depth,0,1).map((x,i)=>x-means[c][i]);return G.source.planePoint(p,plane);}
 return{means,residual};
}
function direction(v){const n=Math.hypot(...v);return n>1e-10?v.map(x=>x/n):null;}
function inside(v,radius=.62){const d=Math.max(1,Math.hypot(...v));return v.map(x=>x*radius/d);}
function split(rgb){const white=Math.min(...rgb);return{white,color:rgb.map(x=>x-white)};}
function grid(nx=72,ny=36){return{nx,ny,values:new Float64Array(nx*ny*3)};}
function uv(u){return[mod(Math.atan2(u[2],u[0])/TAU,1),(Math.asin(Math.max(-1,Math.min(1,u[1])))+Math.PI/2)/Math.PI];}
function index(g,u){const [x,y]=uv(u);return Math.min(g.ny-1,Math.floor(y*g.ny))*g.nx+Math.floor(x*g.nx);}
function deposit(g,u,channel,weight){
 const [lon,lat]=uv(u),x=lon*g.nx-.5,y=lat*g.ny-.5,x0=Math.floor(x),y0=Math.floor(y),fx=x-x0,fy=y-y0;
 for(let dy=0;dy<2;dy++)for(let dx=0;dx<2;dx++){const i=Math.max(0,Math.min(g.ny-1,y0+dy))*g.nx+mod(x0+dx,g.nx);g.values[3*i+channel]+=weight*(dx?fx:1-fx)*(dy?fy:1-fy);}
}
function smooth(g){const out=grid(g.nx,g.ny),w=[1,2,1];for(let y=0;y<g.ny;y++)for(let x=0;x<g.nx;x++)for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
 const a=3*(y*g.nx+x),b=3*(Math.max(0,Math.min(g.ny-1,y+dy))*g.nx+mod(x+dx,g.nx)),weight=w[dy+1]*w[dx+1]/16;
 for(let c=0;c<3;c++)out.values[b+c]+=g.values[a+c]*weight;
 }return out;}
function area(g,row){const a=-Math.PI/2+row*Math.PI/g.ny,b=a+Math.PI/g.ny;return TAU/g.nx*(Math.sin(b)-Math.sin(a));}
function sphere(lon,lat){return[Math.cos(lat)*Math.cos(lon),Math.sin(lat),Math.cos(lat)*Math.sin(lon)];}
const api={model,direction,inside,split,grid,index,deposit,smooth,area,sphere};
if(typeof module==='object'&&module.exports)module.exports=api;else root.LIGHT_COMPONENTS=api;
})(typeof window==='object'?window:null);
