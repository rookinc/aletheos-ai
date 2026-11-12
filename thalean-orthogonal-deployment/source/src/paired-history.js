'use strict';
// Read-only projection of the original registered F state. It does not advance F.
const PairedSheetHistory = (() => {
 const names=Object.freeze(['1','a','b','ab']);
 const integer=(value,min,max,name)=>{
  if(!Number.isSafeInteger(value)||value<min||value>max)throw new RangeError('Invalid '+name+'.');
  return value;
 };
 class Model {
  constructor(data,metadata){
   if(!data||!Array.isArray(data.cycles)||data.cycles.length!==450||!data.quotient||!metadata||metadata.schema!=='thalean-paired-history-1')throw new TypeError('Invalid paired history data.');
   for(const [key,max]of [['base1800',224],['relative1800',3],['hidden1800',1]]){
    if(!Array.isArray(metadata[key])||metadata[key].length!==1800)throw new TypeError('Invalid '+key+'.');
    metadata[key].forEach(v=>integer(v,0,max,key));
   }
   if(!Array.isArray(data.quotient.projection)||data.quotient.projection.length!==1800)throw new TypeError('Invalid registered G900 projection.');
   data.quotient.projection.forEach(v=>integer(v,0,899,'G900 state'));
   if(data.cycles.some(c=>!Array.isArray(c)||c.length!==20))throw new TypeError('Invalid native cycles.');
   const seen=new Set();
   data.cycles.forEach(c=>c.forEach(v=>{integer(v,0,8999,'native state');seen.add(v);}));
   if(seen.size!==9000)throw new TypeError('Incomplete native cycles.');
   // Copy and freeze to preserve purity even if a caller later mutates its own inputs.
   this.cycles=Object.freeze(data.cycles.map(c=>Object.freeze(c.slice())));
   this.projection=Object.freeze(data.quotient.projection.slice());
   this.base=Object.freeze(metadata.base1800.slice());
   this.relative=Object.freeze(metadata.relative1800.slice());
   this.hidden=Object.freeze(metadata.hidden1800.slice());
   Object.freeze(this);
  }
  at(nativeState){
   const state=integer(nativeState,0,8999,'native state'),pairedState=state%1800,base=this.base[pairedState];
   return {state,frame:Math.floor(state/1800),pairedState,g900:this.projection[pairedState],basePair:[Math.floor(base/15),base%15],relativeSheet:this.relative[pairedState],hiddenBit:this.hidden[pairedState]};
  }
  snapshot(cycleIndex,absoluteSteps,offset=0){
   integer(cycleIndex,0,449,'cycle');integer(absoluteSteps,0,Number.MAX_SAFE_INTEGER,'step count');integer(offset,0,19,'phase offset');
   const steps=absoluteSteps,phase=steps%20,cycle=this.cycles[cycleIndex];
   const start=this.at(cycle[offset]),current=this.at(cycle[(phase+offset)%20]);
   const sameFrame=current.frame===start.frame;
   const baseReturned=sameFrame&&current.basePair[0]===start.basePair[0]&&current.basePair[1]===start.basePair[1];
   // At a boundary retain the completed cycle, including both endpoints.
   const anchor=steps===0?0:steps-(phase||20),trail=[];
   for(let step=anchor;step<=steps;step++){
    const p=step%20;
    trail.push({step,phase:p,...this.at(cycle[(p+offset)%20])});
   }
   return {cycleIndex,steps,offset,phase,started:steps>0,start,current,baseReturned,relativeReturned:sameFrame&&current.g900===start.g900,nativeReturned:current.state===start.state,hiddenChanged:current.hiddenBit!==start.hiddenBit,trail};
  }
 }
 return Object.freeze({Model,names});
})();
if(typeof module!=='undefined')module.exports=PairedSheetHistory;
