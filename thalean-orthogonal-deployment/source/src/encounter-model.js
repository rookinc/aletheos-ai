'use strict';
// Observation only. Own topology/readout objects; no reference to the live Plant.
const EncounterLab = (() => {
 const names=['X','Y','Z'];
 const clone=x=>JSON.parse(JSON.stringify(x));
 const freeze=x=>{if(x&&typeof x==='object'){Object.values(x).forEach(freeze);Object.freeze(x);}return x;};
 const integer=(x,lo,hi)=>Number.isSafeInteger(x)&&x>=lo&&x<=hi;
 const norm2=(a,b)=>a.reduce((n,v,i)=>n+(v-b[i])**2,0);
 const projection=s=>[s.frame,s.g900];
 const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function rotate(p,axis){return axis===0?[p[1],p[2],p[0]]:axis===1?p.slice():[p[2],p[0],p[1]];}
 function segmentNearest(p,a,b){const d=b.map((v,i)=>v-a[i]),len=d.reduce((s,x)=>s+x*x,0);const t=len?Math.max(0,Math.min(1,d.reduce((s,x,i)=>s+x*(p[i]-a[i]),0)/len)):0;const point=a.map((x,i)=>x+t*d[i]);return {d2:norm2(p,point),t,point};}
 class Model {
  constructor(data,metadata,Native,History){
   this.native=Native;this.g=Native.topology(data);this.history=new History.Model(data,metadata);
   this.cycles=this.history.cycles;this.records=[];this.pathCache=null;this.pathMerge=null;
   this.edges=new Set(this.g.edges.map(([a,b])=>Math.min(a,b)*9000+Math.max(a,b)));
  }
  tuple(state){return this.history.at(state);}
  next(state,count=1){if(!integer(state,0,8999)||!integer(count,0,Number.MAX_SAFE_INTEGER))throw Error('Invalid native continuation.');let v=state;for(let i=0;i<count%20;i++)v=this.g.F[v];return v;}
  monitor(cycle,steps,offset){return this.history.snapshot(cycle,steps,offset);}
  validate(c){
   if(!c||!integer(c.steps,0,Number.MAX_SAFE_INTEGER)||!Number.isFinite(c.merge)||c.merge<0||c.merge>100||!Number.isFinite(c.epsilon)||c.epsilon<.001||c.epsilon>.2)throw Error('Invalid encounter scan.');
   if(!Array.isArray(c.planes)||c.planes.length!==3||c.planes.some(p=>!p||typeof p.visible!=='boolean'||!integer(p.offset,0,19)||!Number.isFinite(p.opacity)||p.opacity<0||p.opacity>1))throw Error('Invalid field presentation.');
   if(!['spatial','projection','envelope'].includes(c.kind))throw Error('Unknown detector.');
   if(c.kind==='projection'&&(!Array.isArray(c.projection)||c.projection.length!==2||c.projection.some(r=>!Array.isArray(r)||r.length!==3||r.some(x=>!Number.isFinite(x)))||c.projection.some(r=>Math.abs(norm2(r,[0,0,0])-1)>1e-9)||Math.abs(c.projection[0].reduce((s,x,i)=>s+x*c.projection[1][i],0))>1e-9))throw Error('Projection must have two orthonormal rows.');
   return c;
  }
  point(cycle,stage,axis,merge){return rotate(this.native.splitPoint(cycle,stage,undefined,merge),axis);}
  endpoint(cycle,stage,axis,merge){const state=this.cycles[cycle][stage];return {copy:names[axis],axis,cycle,stage,state,tuple:this.tuple(state),next:this.tuple(this.g.F[state]),point:this.point(cycle,stage,axis,merge)};}
  classify(a,b){return {sameCarrierAdjacency:this.edges.has(Math.min(a,b)*9000+Math.max(a,b)),sharedRegisteredLabel:a===b,crossCopyNativeEdge:false,provenInteraction:false};}
  scan(config){
   const c=clone(this.validate(config));if(c.kind==='envelope')throw Error('Use envelope() for full-cycle sampling.');
   const points=c.planes.map((p,axis)=>p.visible&&p.opacity>0?this.cycles.map((_,cycle)=>this.endpoint(cycle,(c.steps%20+p.offset)%20,axis,c.merge)):[]);
   const project=p=>c.projection.map(r=>r.reduce((n,v,i)=>n+v*p[i],0));
   const coords=points.map(ps=>ps.map(p=>c.kind==='projection'?project(p.point):p.point));
   const candidates=[];const lim=c.epsilon**2;
   for(let i=0;i<3;i++)for(let j=i+1;j<3;j++)for(let a=0;a<points[i].length;a++)for(let b=0;b<points[j].length;b++){
    const d2=norm2(coords[i][a],coords[j][b]);if(d2>lim)continue;
    const x=points[i][a],y=points[j][b];candidates.push({id:`${i}:${a}:${j}:${b}`,distance:Math.sqrt(d2),spatialDistance:Math.sqrt(norm2(x.point,y.point)),kind:c.kind,status:'Visualization',endpoints:[x,y],...this.classify(x.state,y.state)});
   }
   candidates.sort((a,b)=>a.distance-b.distance||a.id.localeCompare(b.id));
   return freeze({schema:'orthogonal-encounter-scan-1',criterion:c.kind==='spatial'?'Euclidean distance between completed-step chart vertices <= epsilon':'Distance in the stored orthonormal 2D camera projection <= epsilon; depth discarded',config:c,count:candidates.length,retained:Math.min(candidates.length,200),truncated:candidates.length>200,candidates:candidates.slice(0,200),couplingEvents:0});
  }
  paths(merge){if(this.pathMerge!==merge){this.pathCache=this.cycles.map((c,i)=>c.map((_,k)=>this.native.path(i,k,merge)));this.pathMerge=merge;}return this.pathCache;}
  envelope(config,Inverse,cellIndex=0){
   const c=clone(this.validate(config));if(c.kind!=='envelope'||!integer(cellIndex,0,124999))throw Error('Invalid envelope selection.');
   if(!c.planes.every(p=>p.visible&&p.opacity>0))return freeze({schema:'orthogonal-encounter-scan-1',config:c,count:0,candidates:[],retained:0,truncated:false,couplingEvents:0,criterion:'All three visible full-cycle envelopes required.'});
   const paths=this.paths(c.merge),grid=new Inverse().build(paths,c.epsilon);const cell=grid.cells[Math.min(cellIndex,Math.max(0,grid.count-1))];
   const candidates=[];
   if(cell){const endpoints=[];for(let axis=0;axis<3;axis++){
    let best=null;
    for(let cycle=0;cycle<450;cycle++)for(let stage=0;stage<20;stage++){
     const path=paths[cycle][stage];for(let seg=1;seg<path.points.length;seg++){
      const a=rotate(path.points[seg-1],axis),b=rotate(path.points[seg],axis),near=segmentNearest(cell.point,a,b);
      if(!best||near.d2<best.d2)best={...this.endpoint(cycle,stage,axis,c.merge),point:near.point,d2:near.d2,distance:Math.sqrt(near.d2),segment:seg-1,segmentFraction:near.t,intervalEnd:this.tuple(this.g.F[this.cycles[cycle][stage]])};
     }
    }endpoints.push(best);
   }
   candidates.push({id:`cell:${cell.id}`,kind:'envelope',status:'Visualization',point:cell.point,cellId:cell.id,cellIndex:Math.min(cellIndex,grid.count-1),distance:Math.max(...endpoints.map(e=>e.distance)),endpoints,pairRelations:[[0,1],[0,2],[1,2]].map(([a,b])=>({copies:names[a]+names[b],...this.classify(endpoints[a].state,endpoints[b].state)})),crossCopyNativeEdge:false,provenInteraction:false});}
   return freeze({schema:'orthogonal-encounter-scan-1',config:c,count:grid.count,retained:candidates.length,truncated:false,grid:{n:50,step:.02,domain:[-.5,.5],volume:grid.volume},criterion:'50^3 grid: sample-centre distance to each full F-polyline envelope <= epsilon. Independent path intervals; not simultaneous contact. No unique native state at interpolated positions.',candidates,couplingEvents:0});
  }
  continuePair(a,b,steps){
   const before=[this.tuple(a),this.tuple(b)],after=[this.tuple(this.next(a,steps)),this.tuple(this.next(b,steps))];
   return freeze({operator:`F^${steps}`,projection:'pi(state) = (frame, G900 quotient)',before,after,inputProjectionEqual:equal(projection(before[0]),projection(before[1])),registeredStatesDiffer:a!==b,hiddenBitsDiffer:before[0].hiddenBit!==before[1].hiddenBit,outputProjectionEqual:equal(projection(after[0]),projection(after[1])),operationalMemoryEstablished:false,boundary:'Only deterministic F continuations are admitted here. A log, bit difference, or unequal initial quotient does not establish history-caused response.'});
  }
  capture(context,candidate=null){
   const snap=this.monitor(context.selected,context.steps,context.planes[context.copy].offset);
   const record=freeze({schema:'orthogonal-observation-1',sequence:this.records.length+1,status:'Certified derived',role:'Read-only observation; dynamically ineffective',context:clone(context),state:snap.current,next:this.tuple(this.g.F[snap.current.state]),candidate:candidate?clone(candidate):null});
   if(this.records.length>=100)throw Error('100-record limit reached. Export before starting a new observation session.');this.records.push(record);return clone(record);
  }
  ledger(){return clone(this.records);}
 }
 return Object.freeze({Model,projection,rotate,segmentNearest});
})();
if(typeof module!=='undefined')module.exports=EncounterLab;
