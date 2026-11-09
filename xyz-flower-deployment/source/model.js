'use strict';
const ObservatoryModel=(()=>{
 const mod=(x,n)=>(x%n+n)%n;
 function native(t){
  const K=Array.from({length:1800},(_,i)=>t.base[i%60]+(t.base[i%60]%60===0?t.offsets[Math.floor(i/60)]:t.shifts[Math.floor(i/60)]));
  if(K.reduce((s,v,i)=>s+(i+1)*v,0)!==t.weightedSum||new Set(K).size!==1800||K.some(v=>v<0||v>=1800))throw Error('Carrier data check failed');
  const F=Array.from({length:9000},(_,i)=>((Math.floor(i/1800)+1)%5)*1800+K[i%1800]);
  const seen=new Set(),cycles=[];
  for(let i=0;i<9000;i++)if(!seen.has(i)){let v=i,c=[];do{if(seen.has(v))throw Error('Invalid F orbit');seen.add(v);c.push(v);v=F[v];}while(v!==i);if(c.length!==20)throw Error('F period is not 20');cycles.push(c);}
  if(cycles.length!==450||seen.size!==9000)throw Error('Incomplete F partition');
  return {K,F,cycles};
 }
 const mul=(A,v)=>A.map(r=>r.reduce((s,x,j)=>s+x*v[j],0));
 function lap(n,edges){const L=Array.from({length:n},()=>Array(n).fill(0));for(const [a,b]of edges){L[a][a]++;L[b][b]++;L[a][b]--;L[b][a]--;}return L;}
 function verify(data){
  const LC=lap(8,[...data.ring,...data.partners]),LG=lap(60,data.gEdges);let residual=0,roundtrip=0;
  for(let j=0;j<8;j++){let x=Array.from({length:8},(_,i)=>i===j?1:0),p=mul(data.P,x),a=mul(LG,p),b=mul(data.P,mul(LC,x)),q=mul(data.Q,p);residual=Math.max(residual,...a.map((v,i)=>Math.abs(v-b[i])));roundtrip=Math.max(roundtrip,...q.map((v,i)=>Math.abs(v-x[i])));}
  if(residual>1e-9||roundtrip>1e-9)throw Error('Fourier witness check failed');return {residual,roundtrip};
 }
 function torus(c,step,merge){const a=2*Math.PI*(step/5+c/450),b=2*Math.PI*(step/4+mod(c*((Math.sqrt(5)-1)/2),1)),r=10+4*Math.cos(b),y=4*Math.sin(b);return [r*Math.cos(a)/18,r*Math.sin(a)/18,(y+(y<0?-1:1)*12*(1-merge))/18];}
 function flowerCenters(radius=.42){const out=[];for(let q=-2;q<=2;q++)for(let r=-2;r<=2;r++)if(Math.max(Math.abs(q),Math.abs(r),Math.abs(q+r))<=2)out.push([radius*(q+r/2),radius*Math.sqrt(3)*r/2]);return out.sort((a,b)=>Math.hypot(...a)-Math.hypot(...b)||Math.atan2(a[1],a[0])-Math.atan2(b[1],b[0]));}
 const flowerGrid=flowerCenters();
 function flowerPoint(c,t,cycles,depth=0){const center=flowerGrid[c%19],dir=c%2?-1:1,a=2*Math.PI*(c/450+dir*t/20),k=Math.floor(t),u=t-k,ca=cycles[c],f0=Math.floor(ca[mod(k,20)]/1800),f1=Math.floor(ca[mod(k+1,20)]/1800),z=((f0+(f1-f0)*(u*u*(3-2*u)))-2)*.26*depth;return [center[0]+.42*Math.cos(a),center[1]+.42*Math.sin(a),z];}
 function planePoint(p,plane){return plane===1?[p[0],p[2],p[1]]:plane===2?[p[2],p[0],p[1]]:p.slice();}
 function xyzFlowerPoint(c,t,cycles,depth=0){return planePoint(flowerPoint(c,t,cycles,depth),c%3);}
 return {mod,native,mul,lap,verify,torus,flowerCenters,flowerPoint,planePoint,xyzFlowerPoint};
})();
if(typeof module!=='undefined')module.exports=ObservatoryModel;
