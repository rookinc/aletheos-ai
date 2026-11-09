'use strict';
// One route sampled once, then represented in each orthogonal drawing plane.
const SwarmModel=(()=>{
 function sample(route,phase,transport,depth,model,stagger=true){
  if(!Number.isInteger(route)||route<0||route>=transport.cycles.length||!Number.isFinite(phase)||!Number.isFinite(depth))throw Error('Invalid route triangle');
  const t=model.mod(phase+(stagger?route%20:0),20),step=Math.floor(t);
  const p=model.flowerPoint(route,t,transport.cycles,depth),n=model.flowerPoint(route,t+.025,transport.cycles,depth);
  return {route,phase:t,step,id:transport.cycles[route][step],nextId:transport.cycles[route][(step+1)%20],points:[0,1,2].map(i=>model.planePoint(p,i)),next:[0,1,2].map(i=>model.planePoint(n,i))};
 }
 return {sample};
})();
if(typeof module!=='undefined')module.exports=SwarmModel;
