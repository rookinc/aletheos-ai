/* Native cycle-local quarter-turn field and measurement helpers. No NRR-043 lift is imported. */
(function(root){'use strict';
function assertCycles(cycles){
 if(!Array.isArray(cycles)||cycles.length!==450)throw Error('Expected 450 native F cycles');
 const seen=new Uint8Array(9000);
 for(const c of cycles){if(!Array.isArray(c)||c.length!==20)throw Error('Expected twenty-site native cycle');
  for(const site of c){if(!Number.isInteger(site)||site<0||site>=9000||seen[site]++)throw Error('Invalid or repeated native site');}}
 if(seen.some(x=>x!==1))throw Error('Incomplete native F cycle partition');
 return true;
}
function basis(index,phase=0){
 const i=((index-phase)%20+20)%20;
 return i%2===0?[(i%4===0?1:-1),0]:[0,(i%4===1?1:-1)];
}
function field(cycle,a,b,phase=0){
 return cycle.map((_,i)=>{const [r,q]=basis(i,phase);return a*r+b*q;});
}
function dot(a,b){return a.reduce((s,x,i)=>s+x*b[i],0);}
function energy(a){return dot(a,a);}
function measure(cycle,a,b,phase,referencePhase,referenceType){
 const signal=field(cycle,a,b,phase);
 const ref=referenceType==='stationary'?Array(20).fill(1):field(cycle,1,0,referencePhase);
 const plus=signal.map((x,i)=>x+ref[i]),minus=signal.map((x,i)=>x-ref[i]);
 return {difference:energy(plus)-energy(minus),overlap:dot(signal,ref),signal,reference:ref};
}
function reconstruct(cycle,phase,referencePhase,measurements){
 // Two signed interference contrasts against quarter-turn separated references.
 // y = 4 G [a,b], with G_ij = <basis_j(phase), reference_i>.
 const r=field(cycle,1,0,phase),q=field(cycle,0,1,phase);
 const refs=[referencePhase,(referencePhase+1)%4].map(p=>field(cycle,1,0,p));
 const g=refs.map(v=>[dot(v,r),dot(v,q)]);
 const determinant=g[0][0]*g[1][1]-g[0][1]*g[1][0];
 if(!determinant)return{rank:Math.abs(g[0][0])+Math.abs(g[0][1])+Math.abs(g[1][0])+Math.abs(g[1][1])?1:0,determinant,coefficients:null,gram:g};
 const y=measurements.map(v=>v/4);
 return{rank:2,determinant,coefficients:[(y[0]*g[1][1]-y[1]*g[0][1])/determinant,(g[0][0]*y[1]-g[1][0]*y[0])/determinant],gram:g};
}
function decode(a,b,phase,referencePhase,referenceType){
 const c=Array.from({length:20},(_,i)=>i);
 const m=measure(c,a,b,phase,referencePhase,referenceType);
 return m;
}
root.OBSERVER_NATIVE={assertCycles,basis,field,dot,energy,measure,decode,reconstruct};
})(window);
