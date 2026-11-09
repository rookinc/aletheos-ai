'use strict';
const HydrogenBridge=(()=>{
 function create(bundle,transport){
  const registration=new G1800Engine(bundle.native),cover=buildNativeCover(registration);
  if(transport.K.some((v,i)=>v!==bundle.native.turns.a[i]))throw Error('Hydrogen / F registration mismatch');
  const engine=new HydrogenEngine(registration,cover,bundle.hydrogen);
  const route=new Uint16Array(9000),step=new Uint8Array(9000);
  transport.cycles.forEach((c,r)=>c.forEach((id,k)=>{route[id]=r;step[id]=k;}));
  return {engine,route,step,registration,cover};
 }
 function topCurrents(engine,limit=160){
  const [a,b]=engine.preset.vectors,edges=engine.graph.edges;
  return Array.from({length:45000},(_,i)=>({i,weight:Math.abs(a[edges[2*i]]*b[edges[2*i+1]]-b[edges[2*i]]*a[edges[2*i+1]])})).sort((a,b)=>b.weight-a.weight||a.i-b.i).slice(0,limit).map(x=>x.i);
 }
 return {create,topCurrents};
})();
if(typeof module!=='undefined')module.exports=HydrogenBridge;
