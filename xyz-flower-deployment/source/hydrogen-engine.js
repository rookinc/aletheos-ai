// Engines preserved from Hydrogen Motiph 1.0; display code excluded.

'use strict';
class G1800Engine {
 static axes=['a','b','ab'];
 static integer(v,n){if(!Number.isInteger(v)||v<0||v>=n)throw Error('State outside registered carrier');return v;}
 static permutation(p,n){return Array.isArray(p)&&p.length===n&&p.every(v=>Number.isInteger(v)&&v>=0&&v<n)&&new Set(p).size===n;}
 static pair(s){return [Math.floor(s/60),s%60];}
 static freeze(v){if(v&&typeof v==='object'){Object.values(v).forEach(G1800Engine.freeze);Object.freeze(v);}return v;}
 constructor(data){
  if(data.schema!=='uft4.g1800.registration.v1')throw Error('Unsupported G1800 source');
  this.data=G1800Engine.freeze(data);
  for(const name of ['identity',...G1800Engine.axes]){
   const p=data.deck[name];if(!G1800Engine.permutation(p,60))throw Error('Invalid native deck permutation');
   if(name!=='identity'&&p.some((v,i)=>v===i||p[v]!==i))throw Error('Native deck must be a free involution');
  }
  if(data.deck.identity.some((v,i)=>v!==i)||data.deck.a.some((v,i)=>data.deck.b[v]!==data.deck.ab[i]||data.deck.b[v]!==data.deck.a[data.deck.b[i]]))throw Error('Native V4 law failed');
  const edgeSet=new Set(data.edges.map(([a,b])=>Math.min(a,b)+','+Math.max(a,b)));
  if(data.edges.length!==120||edgeSet.size!==120)throw Error('Native G60 edge count failed');
  for(const name of G1800Engine.axes)if(!this.preservesEdges(data.deck[name],edgeSet))throw Error('Deck adjacency failed');
  this.base=this.quotient(['identity',...G1800Engine.axes]);
  if(this.base.fibers.length!==900)throw Error('Native G900 quotient count failed');
  this.models={};this.projections={};this.sheets={};this.delta={};
  for(const axis of G1800Engine.axes){
   const model=this.quotient(['identity',axis]);if(model.fibers.length!==1800)throw Error('G1800 quotient count failed');
   const projection=model.fibers.map(f=>this.base.qid[f[0]]),sheets=Array.from({length:900},()=>[]);
   projection.forEach((b,q)=>sheets[b].push(q));
   if(sheets.some(f=>f.length!==2))throw Error('Two-to-one projection failed');
   const delta=projection.map((b,q)=>sheets[b][0]===q?sheets[b][1]:sheets[b][0]),K=data.turns[axis];
   if(!G1800Engine.permutation(K,1800))throw Error('Native K is not bijective');
   for(let q=0;q<1800;q++)if(K[K[q]]!==delta[q]||K[K[K[K[q]]]]!==q)throw Error('K squared / fourth power failed');
   this.models[axis]=model;this.projections[axis]=Object.freeze(projection);this.sheets[axis]=G1800Engine.freeze(sheets);this.delta[axis]=Object.freeze(delta);
  }
  G1800Engine.freeze(this.models);G1800Engine.freeze(this.projections);G1800Engine.freeze(this.sheets);G1800Engine.freeze(this.delta);
  if(data.automorphisms.length!==480)throw Error('Automorphism source count failed');
 }
 preservesEdges(p,E=new Set(this.data.edges.map(([a,b])=>Math.min(a,b)+','+Math.max(a,b)))){return this.data.edges.every(([a,b])=>E.has(Math.min(p[a],p[b])+','+Math.max(p[a],p[b])));}
 quotient(group){
  const qid=Array(3600).fill(-1),fibers=[];
  for(let s=0;s<3600;s++){if(qid[s]>=0)continue;const [u,v]=G1800Engine.pair(s),f=[...new Set(group.map(k=>this.data.deck[k][u]*60+this.data.deck[k][v]))].sort((a,b)=>a-b);
   if(f.length!==group.length||f.some(x=>qid[x]>=0))throw Error('Invalid quotient partition');
   const q=fibers.length;f.forEach(x=>qid[x]=q);fibers.push(Object.freeze(f));
  }
  return Object.freeze({qid:Object.freeze(qid),fibers:Object.freeze(fibers)});
 }
 model(axis){if(!G1800Engine.axes.includes(axis))throw Error('Unknown kernel');return this.models[axis];}
 inspect(axis,q){
  const m=this.model(axis);G1800Engine.integer(q,1800);const base=this.projections[axis][q],sheets=this.sheets[axis][base],K=this.data.turns[axis],cycle=[q];
  for(let i=1;i<4;i++)cycle.push(K[cycle[i-1]]);
  return {kernel:axis,state:q,projection:base,sheet:sheets.indexOf(q),twoStates:sheets.slice(),representatives:m.fibers[q].map(G1800Engine.pair),baseRepresentatives:this.base.fibers[base].map(G1800Engine.pair),cycle,checks:{twoRepresentatives:m.fibers[q].length===2,twoToOne:sheets.length===2,K2IsDelta:K[K[q]]===this.delta[axis][q],K4IsIdentity:K[cycle[3]]===q,deltaPreservesProjection:this.projections[axis][this.delta[axis][q]]===base}};
 }
 step(axis,q,n){this.model(axis);G1800Engine.integer(q,1800);if(!Number.isSafeInteger(n))throw Error('Use an integer turn count');for(let j=0,count=((n%4)+4)%4;j<count;j++)q=this.data.turns[axis][q];return q;}
 flip(axis,q){this.model(axis);G1800Engine.integer(q,1800);return this.delta[axis][q];}
 transport(axis,q,index,reverse=false){
  const model=this.model(axis);G1800Engine.integer(q,1800);G1800Engine.integer(index,480);
  const a=this.data.automorphisms[index];if(!G1800Engine.permutation(a.p,60)||!this.preservesEdges(a.p))throw Error('Automorphism validation failed');
  let p=a.p,target;
  if(reverse){p=Array(60);a.p.forEach((v,i)=>p[v]=i);target=G1800Engine.axes[a.action.indexOf(axis)];}
  else target=a.action[G1800Engine.axes.indexOf(axis)];
  if(!target)throw Error('Kernel transport unavailable');
  const image=model.fibers[q].map(s=>{const [u,v]=G1800Engine.pair(s);return this.models[target].qid[p[u]*60+p[v]];});
  if(image[0]!==image[1])throw Error('Transport does not descend');
  return {kernel:target,state:image[0]};
 }
 fromPair(axis,u,v){G1800Engine.integer(u,60);G1800Engine.integer(v,60);return this.model(axis).qid[u*60+v];}
 receipt(axis,q,operation,input){return {schema:'uft4.g1800.receipt.v1',source:this.data.source,operation,input,output:this.inspect(axis,q),classification:'native finite registration and action',display:{coordinates:'conventional',sheetLabels:'least-class ordering; registration-dependent',audit052HostMap:'unestablished'},boundaries:{g1800Adjacency:'not asserted in this view',fieldCoupling:'unestablished',gaugeModuleExactness:'unresolved'}};}
}

function buildNativeCover(native) {
 const product=[];
 for(const [u,v] of native.data.edges)for(let w=0;w<60;w++){
  product.push([60*u+w,60*v+w],[60*w+u,60*w+v]);
 }
 function quotient(model){
  const n=model.fibers.length,seen=new Set(),edges=[],adj=Array.from({length:n},()=>[]);
  for(const [u,v]of product){let a=model.qid[u],b=model.qid[v];if(a===b)throw Error('Unexpected quotient loop');if(a>b)[a,b]=[b,a];const key=a*n+b;if(!seen.has(key)){seen.add(key);edges.push([a,b]);adj[a].push(b);adj[b].push(a);}}
  adj.forEach(a=>a.sort((x,y)=>x-y));
  if(edges.length!==n*4||adj.some(a=>a.length!==8))throw Error('Native degree / edge count failed');
  const reached=new Set([0]),queue=[0];for(let i=0;i<queue.length;i++)for(const v of adj[queue[i]])if(!reached.has(v)){reached.add(v);queue.push(v);}
  if(reached.size!==n)throw Error('Native graph disconnected');
  return {edges,adj};
 }
 const base=quotient(native.base),models={};
 for(const axis of G1800Engine.axes){
  const g=quotient(native.model(axis)),pi=native.projections[axis],delta=native.delta[axis],K=native.data.turns[axis];
  const has=(a,b)=>g.adj[a].includes(b);
  for(let q=0;q<1800;q++){
   const projected=g.adj[q].map(v=>pi[v]).sort((a,b)=>a-b);
   if(JSON.stringify(projected)!==JSON.stringify(base.adj[pi[q]]))throw Error('Cover local bijection failed');
   for(const v of g.adj[q])if(!has(K[q],K[v])||!has(delta[q],delta[v]))throw Error('K / Delta graph action failed');
  }
  models[axis]=g;
 }
 let triangles=0;for(const [u,v]of base.edges)for(const w of base.adj[u])if(base.adj[v].includes(w))triangles++;
 if(triangles/3!==1200)throw Error('Quotient triangle count failed');
 return {base,models,checks:{connected:true,degree8:true,localBijection:true,KPreservesEdges:true,deltaPreservesEdges:true,quotientTriangles:triangles/3},
  path(axis,start,end){
   const prev=new Int32Array(1800).fill(-1),queue=[start];prev[start]=start;
   for(let i=0;i<queue.length&&prev[end]<0;i++)for(const v of models[axis].adj[queue[i]])if(prev[v]<0){prev[v]=queue[i];queue.push(v);}
   if(prev[end]<0)throw Error('No lifted walk');const out=[end];while(out[out.length-1]!==start)out.push(prev[out[out.length-1]]);return out.reverse();
  }
 };
}


class TransportCellEngine {
 constructor(native,cover,{kernel='a',base=0,preparation='site',coupling=.1}={}){
  native.model(kernel);G1800Engine.integer(base,900);
  if(!['site','uniform','mode1'].includes(preparation))throw Error('Unknown field preparation');
  if(!Number.isFinite(coupling)||coupling<.01||coupling>.18)throw Error('Coupling must lie between 0.01 and 0.18');
  this.native=native;this.cover=cover;this.kernel=kernel;this.base=base;this.preparation=preparation;this.coupling=coupling;this.n=9000;this.time=0;
  const edges=[],degree=new Uint8Array(9000),seen=new Set();
  const add=(u,v)=>{if(u>v)[u,v]=[v,u];const key=u*9000+v;if(u===v||seen.has(key))throw Error('Duplicate / loop in transport graph');seen.add(key);edges.push(u,v);degree[u]++;degree[v]++;};
  for(let f=0;f<5;f++)for(const [u,v]of cover.models[kernel].edges)add(f*1800+u,f*1800+v);
  this.nativeEdgeCount=edges.length/2;
  const K=native.data.turns[kernel];for(let f=0;f<5;f++)for(let q=0;q<1800;q++)add(f*1800+q,((f+1)%5)*1800+K[q]);
  this.edges=Int32Array.from(edges);this.degree=degree;this.edgeCount=edges.length/2;
  if(this.edgeCount!==45000||degree.some(x=>x!==10))throw Error('Transport graph count / degree failed');
  this.adj=new Int32Array(90000);const cursor=new Uint8Array(9000);
  for(let e=0;e<edges.length;e+=2){const a=edges[e],b=edges[e+1];this.adj[a*10+cursor[a]++]=b;this.adj[b*10+cursor[b]++]=a;}
  this.u=new Float64Array(9000);this.v=new Float64Array(9000);this.refU=new Float64Array(9000);this.refV=new Float64Array(9000);
  this.sources=[];const pair=native.sheets[kernel][base];
  if(preparation==='site'){this.u[pair[0]]=1;this.sources=[pair[0]];}
  else for(let f=0;f<5;f++)for(const q of pair){this.u[f*1800+q]=preparation==='uniform'?1/Math.sqrt(10):Math.cos(2*Math.PI*f/5)/Math.sqrt(5);this.sources.push(f*1800+q);}
  this.v.set(this.u);this.refU.set(this.u);this.refV.set(this.u);this.initial=this.u.slice();
  this.distance=new Int16Array(9000).fill(-1);const queue=[];for(const i of this.sources){this.distance[i]=0;queue.push(i);}
  for(let j=0;j<queue.length;j++){const i=queue[j];for(let k=0;k<10;k++){const v=this.adj[i*10+k];if(this.distance[v]<0){this.distance[v]=this.distance[i]+1;queue.push(v);}}}
  if(queue.length!==9000)throw Error('Transport graph disconnected');
  this.radius=Math.max(...this.distance);this.boundary=[];this.shellCounts=new Uint16Array(this.radius+1);
  for(let i=0;i<9000;i++){this.shellCounts[this.distance[i]]++;if(this.distance[i]===this.radius)this.boundary.push(i);}
  this.next=new Float64Array(9000);this.refNext=new Float64Array(9000);this.lap=new Float64Array(9000);this.refLap=new Float64Array(9000);
  this.core=new Float64Array(900);this.initialEnergy=this.energy(this.u,this.v);this.ledger=[];this.firstBoundary=null;this.firstBoundaryReturn=null;this.lastFlux=new Float64Array(this.radius);this.fluxResidual=0;this.reversed=false;this.record();
 }
 applyL(u,out){out.fill(0);for(let e=0;e<this.edges.length;e+=2){const a=this.edges[e],b=this.edges[e+1],d=u[a]-u[b];out[a]+=d;out[b]-=d;}return out;}
 energy(u,v){let E=0;for(let i=0;i<9000;i++)E+=(u[i]-v[i])**2/2;for(let e=0;e<this.edges.length;e+=2){const a=this.edges[e],b=this.edges[e+1];E+=this.coupling/2*(u[a]-u[b])*(v[a]-v[b]);}return E;}
 localEnergy(u,v){const E=Float64Array.from(u,(x,i)=>(x-v[i])**2/2);for(let e=0;e<this.edges.length;e+=2){const a=this.edges[e],b=this.edges[e+1],p=this.coupling/4*(u[a]-u[b])*(v[a]-v[b]);E[a]+=p;E[b]+=p;}return E;}
 advance(){
  const u=this.u,v=this.v,c=this.next,ru=this.refU,rv=this.refV,rc=this.refNext,k=this.coupling;
  this.applyL(u,this.lap);this.applyL(ru,this.refLap);
  for(let i=0;i<9000;i++){c[i]=2*u[i]-v[i]-k*this.lap[i];rc[i]=this.distance[i]===this.radius?0:2*ru[i]-rv[i]-k*this.refLap[i];}
  const before=this.localEnergy(u,v),after=this.localEnergy(c,u),div=new Float64Array(9000);this.lastFlux.fill(0);
  for(let e=0;e<this.edges.length;e+=2){const a=this.edges[e],b=this.edges[e+1],flux=k/4*(u[a]-u[b])*(c[a]-v[a]+c[b]-v[b]);div[a]+=flux;div[b]-=flux;
   const da=this.distance[a],db=this.distance[b];if(da<db)this.lastFlux[da]+=flux;else if(db<da)this.lastFlux[db]-=flux;
  }
  this.fluxResidual=0;for(let i=0;i<9000;i++)this.fluxResidual=Math.max(this.fluxResidual,Math.abs(after[i]-before[i]+div[i]));
  this.v=u;this.u=c;this.next=v;this.refV=ru;this.refU=rc;this.refNext=rv;this.time++;this.reversed=false;return this.record();
 }
 reverse(){if(this.time===0)return this.metrics;
  this.applyL(this.v,this.lap);this.applyL(this.refV,this.refLap);
  for(let i=0;i<9000;i++){this.next[i]=2*this.v[i]-this.u[i]-this.coupling*this.lap[i];this.refNext[i]=this.distance[i]===this.radius?0:2*this.refV[i]-this.refU[i]-this.coupling*this.refLap[i];}
  const u=this.u;this.u=this.v;this.v=this.next;this.next=u;const ru=this.refU;this.refU=this.refV;this.refV=this.refNext;this.refNext=ru;this.time--;this.lastFlux.fill(0);this.fluxResidual=0;this.reversed=true;
  this.ledger=this.ledger.filter(x=>x.step<this.time);this.firstBoundary=null;this.firstBoundaryReturn=null;for(const row of this.ledger){if(this.firstBoundary===null&&row.boundaryAmplitude>1e-10)this.firstBoundary=row.step;if(this.firstBoundaryReturn===null&&row.boundarySensitiveReturn>1e-10)this.firstBoundaryReturn=row.step;}return this.record();
 }
 record(){
  let norm=0,current=0,source=0,boundary=0,difference=0,initialDistance=0,weighted=0;
  const shells=new Float64Array(this.radius+1);this.core.fill(0);const pi=this.native.projections[this.kernel];
  for(let f=0;f<5;f++)for(let q=0;q<1800;q++){
   const i=f*1800+q,a=this.u[i]**2;norm+=a;shells[this.distance[i]]+=a;weighted+=this.distance[i]*a;initialDistance+=(this.u[i]-this.initial[i])**2;
   current+=(this.u[((f+1)%5)*1800+q]-this.u[((f+4)%5)*1800+q])**2;this.core[pi[q]]+=this.u[i]/Math.sqrt(10);
  }
  for(const i of this.sources){source+=this.u[i]**2;difference+=(this.u[i]-this.refU[i])**2;}
  for(const i of this.boundary)boundary+=this.u[i]**2;
  const E=this.energy(this.u,this.v),m={step:this.time,energy:E,referenceEnergy:this.energy(this.refU,this.refV),energyError:Math.abs(E-this.initialEnergy)/Math.max(1e-30,this.initialEnergy),amplitudeSquared:norm,sourceAmplitude:Math.sqrt(source),boundaryAmplitude:Math.sqrt(boundary),boundarySensitiveReturn:Math.sqrt(difference),meanShell:norm?weighted/norm:0,frameCurrentSquared:current,frameMagnitudeSquared:norm>1e-24?current/norm:null,initialFieldDistance:Math.sqrt(initialDistance),maxLocalBalanceResidual:this.fluxResidual,shellAmplitudeSquared:Array.from(shells),outwardFlux:Array.from(this.lastFlux),fluxAvailable:!this.reversed&&this.time>0};
  if(this.firstBoundary===null&&m.boundaryAmplitude>1e-10)this.firstBoundary=this.time;
  if(this.firstBoundaryReturn===null&&m.boundarySensitiveReturn>1e-10)this.firstBoundaryReturn=this.time;
  this.metrics=m;this.ledger.push(m);return m;
 }
 receipt(){return {schema:'uft4.g9000-transport-cell.v1',source:this.native.data.source,parameters:{kernel:this.kernel,base:this.base,preparation:this.preparation,coupling:this.coupling},graph:{vertices:9000,nativeFrameEdges:36000,undirectedFEdges:9000,totalEdges:45000,degree:10,construction:'declared union of verified within-frame edges and F/F^-1 links; not a cubic lattice'},wave:{update:'u_next = 2u - u_previous - kappa L u',state:'two retained real 9000-component fields',energy:'0.5 ||u-v||² + kappa/2 u^T L v',stability:'kappa <= 0.18 < 4/20; degree-10 Laplacian spectral bound',frameCurrent:'D=S-S^-1 on current displacement, equal-weight metric'},boundary:{definition:'maximum graph-distance shell from preparation support',radius:this.radius,count:this.boundary.length,main:'closed finite carrier, no extra boundary force',comparison:'same graph and source, outermost shell pinned to zero',returnDiagnostic:'norm of closed-minus-pinned displacement on source support; threshold 1e-10',firstArrival:this.firstBoundary,firstBoundarySensitiveReturn:this.firstBoundaryReturn},core:{definition:'normalized sum over all ten preimages of each quotient address',notAdditionalCarrierStates:true},scope:{waveLaw:'chosen reversible graph-wave model',cube:'display boundary, not certified native face ports',sphere:'quotient field readout, not extra vertices',physicalEnergy:'not identified',cellToCellInterfaces:'not implemented',nativeEncounterMemory:'not derived'},metrics:this.metrics,ledger:this.ledger,fields:{current:Array.from(this.u),previous:Array.from(this.v),pinnedCurrent:Array.from(this.refU),pinnedPrevious:Array.from(this.refV)}};}
}


class HydrogenEngine {
 constructor(native,cover,data){
  this.native=native;this.data=data;this.graph=new TransportCellEngine(native,cover,{kernel:'a'});
  if(data.schema!=='thalean.hydrogen.g9000.v1'||data.kernel!=='a')throw Error('Unsupported hydrogen data');
  if(JSON.stringify(data.quotient)!==JSON.stringify(Array.from(native.projections.a)))throw Error('Hydrogen quotient registration mismatch');
  this.n=9000;this.re=new Float64Array(9000);this.im=new Float64Array(9000);this.prob=new Float64Array(9000);this.hr=new Float64Array(9000);this.hi=new Float64Array(9000);
  this.currents=new Float64Array(45000);this.core=new Float64Array(900);this.shells=new Float64Array(7);this.distance=Uint8Array.from({length:9000},(_,i)=>data.distance[i%1800]);
  this.time=0;this.mix=35;this.phase=90;this.mode='coherent';this.prepare(1);
 }
 prepare(g){const p=this.data.presets.find(x=>x.g===g);if(!p)throw Error('No computed spectrum for this attraction');
  if(p.vectors.some(v=>v.length!==9000||v.some(x=>!Number.isFinite(x))))throw Error('Invalid eigenvector fixture');
  this.preset=p;this.g=g;this.time=0;this.period=2*Math.PI/(p.energies[1]-p.energies[0]);return this.update();
 }
 applyH(a,out){this.graph.applyL(a,out);for(let i=0;i<9000;i++)out[i]-=this.g/(this.distance[i]+1)*a[i];return out;}
 update(){
  if(!['ground','excited','coherent'].includes(this.mode)||!Number.isFinite(this.time)||!Number.isFinite(this.mix)||this.mix<0||this.mix>90||!Number.isFinite(this.phase))throw Error('Invalid spectral state');
  const angle=(this.mode==='ground'?0:this.mode==='excited'?90:this.mix)*Math.PI/180,A=Math.cos(angle),B=Math.sin(angle),[E0,E1]=this.preset.energies,[v0,v1]=this.preset.vectors;
  const t0=-E0*this.time,t1=-E1*this.time+this.phase*Math.PI/180,c0=A*Math.cos(t0),s0=A*Math.sin(t0),c1=B*Math.cos(t1),s1=B*Math.sin(t1);
  this.core.fill(0);this.shells.fill(0);let norm=0,mean=0,m2=0;const frames=new Float64Array(5);
  for(let i=0;i<9000;i++){const r=this.re[i]=c0*v0[i]+c1*v1[i],s=this.im[i]=s0*v0[i]+s1*v1[i],p=this.prob[i]=r*r+s*s;norm+=p;mean+=this.distance[i]*p;this.core[this.data.quotient[i%1800]]+=p;this.shells[this.distance[i]]+=p;frames[Math.floor(i/1800)]+=p;}
  this.applyH(this.re,this.hr);this.applyH(this.im,this.hi);let energy=0;for(let i=0;i<9000;i++)energy+=this.re[i]*this.hr[i]+this.im[i]*this.hi[i];
  const div=new Float64Array(9000),flux=new Float64Array(6);let peak=0,total=0;
  for(let j=0;j<45000;j++){const a=this.graph.edges[2*j],b=this.graph.edges[2*j+1],J=this.currents[j]=2*(this.re[a]*this.im[b]-this.im[a]*this.re[b]);div[a]+=J;div[b]-=J;peak=Math.max(peak,Math.abs(J));total+=Math.abs(J);
   const da=this.distance[a],db=this.distance[b];for(let cut=Math.min(da,db);cut<Math.max(da,db);cut++)flux[cut]+=da<db?J:-J;
  }
  let residual=0;const shellDerivative=new Float64Array(7);
  for(let i=0;i<9000;i++){
   const dr=E0*s0*v0[i]+E1*s1*v1[i],di=-E0*c0*v0[i]-E1*c1*v1[i],derivative=2*(this.re[i]*dr+this.im[i]*di);
   residual=Math.max(residual,Math.abs(derivative+div[i]));shellDerivative[this.distance[i]]+=derivative;
   const f=Math.floor(i/1800),q=i%1800,a=((f+1)%5)*1800+q,b=((f+4)%5)*1800+q;m2+=(this.re[a]-this.re[b])**2+(this.im[a]-this.im[b])**2;
  }
  this.metrics={time:this.time,norm,normError:Math.abs(norm-1),energy,expectedEnergy:A*A*E0+B*B*E1,energyError:Math.abs(energy-(A*A*E0+B*B*E1)),meanPairDistance:mean/norm,coincidenceProbability:this.shells[0],maxEdgeCurrent:peak,totalAbsoluteCurrent:total,continuityResidual:residual,frameMagnitudeSquared:m2/norm,frameProbabilities:Array.from(frames),shellProbabilities:Array.from(this.shells),shellDerivatives:Array.from(shellDerivative),outwardShellCurrents:Array.from(flux)};
  return this.metrics;
 }
 seek(time){if(!Number.isFinite(time)||Math.abs(time)>1e6)throw Error('Time outside supported range');this.time=time;return this.update();}
 receipt(){return {schema:'thalean.hydrogen.experiment.v1',title:'G9000 Hydrogen Observatory',version:'hydrogen-motiph-1.0.0',sources:this.data.sources,nativeSource:this.data.native_source,graphSha256:this.data.graph_sha256,model:this.data.model,parameters:{kernel:'a',g:this.g,mode:this.mode,mixDegrees:this.mix,initialRelativePhaseDegrees:this.phase,time:this.time},spectrum:{energies:this.preset.energies,firstExcitedMultiplicity:this.preset.firstExcitedMultiplicity,excitedProjectorAnchor:this.preset.excitedAnchor,eigenResiduals:this.preset.eigenResiduals},checks:this.data.checks,metrics:this.metrics,fields:{real:Array.from(this.re),imaginary:Array.from(this.im)},scope:{classification:'dimensionless hydrogen analogue on a declared G9000 carrier Hamiltonian',subspace:'ground state plus one registered vector in the first excited eigenspace',core:'900-address probability marginal over all ten preimages; not a proton',geometry:'sphere / torus / cube display coordinates do not define adjacency or distance',physicalHydrogen:'not established',spectralCalibration:'none; no eV, nm or seconds conversion',radiation:'no photon or electromagnetic emission model',dynamics:'equal pair kinetic weights; no derived proton/electron mass ratio',nativeFSymmetry:'F preserves the kinetic graph but the selected attraction does not commute with F'}};}
}




if(typeof module!=="undefined")module.exports={G1800Engine,buildNativeCover,TransportCellEngine,HydrogenEngine};
