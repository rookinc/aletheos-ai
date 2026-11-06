'use strict';
const NativeModel=(()=>{
 function topology(data){const n=9000,F=Uint16Array.from({length:n},(_,i)=>((Math.floor(i/1800)+1)%5)*1800+data.topology.K[i%1800]),edges=[];for(let f=0;f<5;f++)for(const [a,b] of data.topology.edges1800)edges.push([1800*f+a,1800*f+b]);const factorCount=edges.length;for(let i=0;i<n;i++)edges.push([i,F[i]]);const degree=new Uint8Array(n),keys=new Set();for(const [a,b]of edges){const k=Math.min(a,b)*n+Math.max(a,b);if(a===b||keys.has(k))throw Error('Invalid native edge');keys.add(k);degree[a]++;degree[b]++;}if(edges.length!==45000||degree.some(d=>d!==10))throw Error('Native incidence mismatch');const covered=new Uint8Array(n),cycleOf=new Uint16Array(n),stageOf=new Uint8Array(n);if(data.cycles.length!==450)throw Error('Missing F cycles');data.cycles.forEach((c,j)=>{if(c.length!==20)throw Error('F period mismatch');c.forEach((v,k)=>{if(covered[v]||F[v]!==c[(k+1)%20])throw Error('F registration mismatch');covered[v]=1;cycleOf[v]=j;stageOf[v]=k;});});if(covered.some(v=>!v))throw Error('F partition incomplete');return {n,F,edges,factorCount,cycleOf,stageOf,from:Uint16Array.from(edges,e=>e[0]),to:Uint16Array.from(edges,e=>e[1])};}
 class Plant{
  static gains=Object.freeze({P:1.4,I:.12,D:4});
  constructor(graph,pid=true){this.g=graph;this.pid=pid;this.x=new Float64Array(graph.n);this.v=new Float64Array(graph.n);this.I=new Float64Array(graph.n);this.tmp=new Float64Array(graph.n);this.acc=new Float64Array(graph.n);this.z=new Float64Array(graph.n);}
  transport(){for(const key of ['x','v','I']){const a=this[key],b=this.tmp;for(let i=0;i<a.length;i++)b[this.g.F[i]]=a[i];this[key]=b;this.tmp=a;}}
  kick(v,amplitude=.65){this.x[v]+=amplitude;this.x[this.g.F[v]]-=amplitude;}
  integrate(h=1/120){const {x,v,I,acc,z,g}=this;const {P,I:ki,D}=Plant.gains;for(let i=0;i<x.length;i++){z[i]=-.6*x[i]+(this.pid?-P*x[i]+ki*I[i]-D*v[i]:0);acc[i]=0;}
   for(let k=0;k<g.from.length;k++){const a=g.from[k],b=g.to[k],f=z[a]-z[b];acc[a]+=f;acc[b]-=f;}
   for(let i=0;i<x.length;i++){if(this.pid)I[i]-=x[i]*h;v[i]+=h*acc[i];x[i]+=h*v[i];}
  }
  metrics(){let sum=0,sq=0,peak=0;for(const x of this.x){sum+=x;sq+=x*x;peak=Math.max(peak,Math.abs(x));}return {total:this.g.n+sum,rms:Math.sqrt(sq/this.g.n),peak};}
 }
 class Experiment{
  constructor(data){this.data=data;this.g=topology(data);this.reset();}
  reset(){this.closed=new Plant(this.g,true);this.open=new Plant(this.g,false);this.steps=0;this.pulses=0;this.kick();}
  kick(){this.closed.kick(0);this.open.kick(0);this.pulses++;}
  step(){this.closed.transport();this.open.transport();this.closed.integrate();this.open.integrate();this.steps++;if(this.steps%20===0)this.kick();}
 }
 // Source B32K chart: orientation changed only to make its split axis vertical.
 function torusPoint(c,step){const a=2*Math.PI*(step/5+c/450),b=2*Math.PI*(step/4+(c*((Math.sqrt(5)-1)/2))%1),r=10+4*Math.cos(b);return [r*Math.cos(a),4*Math.sin(b),r*Math.sin(a)];}
 function splitPoint(c,step,side,merge=0){const p=torusPoint(c,step);if(side===undefined)side=p[1]<-1e-10?-1:1;p[1]+=side*12*(1-Math.max(0,Math.min(100,merge))/100);return p.map(v=>v/18);}
 function path(c,k,merge=0){const cuts=[k,k+1],shift=(c*((Math.sqrt(5)-1)/2))%1;for(let n=Math.floor(k/2+2*shift)-1;n<=Math.ceil((k+1)/2+2*shift)+1;n++){const t=2*n-4*shift;if(t>k+1e-10&&t<k+1-1e-10)cuts.push(t);}cuts.sort((a,b)=>a-b);const points=[];const push=p=>{const old=points.at(-1);if(!old||Math.hypot(...p.map((x,i)=>x-old[i]))>1e-9)points.push(p);};push(splitPoint(c,k,undefined,merge));for(let j=0;j<cuts.length-1;j++){const a=cuts[j],b=cuts[j+1],side=torusPoint(c,(a+b)/2)[1]<0?-1:1;push(splitPoint(c,a,side,merge));for(let m=1;m<8;m++){const t=k+m/8;if(t>a+1e-10&&t<b-1e-10)push(splitPoint(c,t,side,merge));}push(splitPoint(c,b,side,merge));}push(splitPoint(c,k+1,undefined,merge));const lengths=[0];for(let i=1;i<points.length;i++)lengths.push(lengths.at(-1)+Math.hypot(...points[i].map((v,j)=>v-points[i-1][j])));return {points,lengths};}
 function at(path,f){const target=Math.min(1,Math.max(0,f))*path.lengths.at(-1);let j=1;while(j<path.points.length-1&&path.lengths[j]<target)j++;const a=path.points[j-1],b=path.points[j],len=path.lengths[j]-path.lengths[j-1],t=len?(target-path.lengths[j-1])/len:0;return {point:a.map((v,i)=>v+(b[i]-v)*t),heading:b.map((v,i)=>v-a[i])};}
 function chartSide(heading){const n=Math.hypot(...heading);return Math.abs(heading[1])<=n*1e-7?'turn':heading[1]>0?'exterior':'interior';}
 function positionHz(p){p=Math.max(0,Math.min(1102,Number(p)||0));return p<=551?(Math.round(p/29)+1)/20:1+Math.round((p-551)/19);}
 function hzPosition(hz){hz=Math.max(.05,Math.min(30,Number(hz)||.05));return hz<=1?Math.round(hz*20-1)*29:551+(Math.round(hz)-1)*19;}
 return {topology,Plant,Experiment,torusPoint,splitPoint,path,at,chartSide,positionHz,hzPosition};
})();
if(typeof module!=='undefined')module.exports=NativeModel;
