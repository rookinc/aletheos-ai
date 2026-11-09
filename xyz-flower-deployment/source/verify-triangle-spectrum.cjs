'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),S=require('./triangle-spectrum'),T=require('./triangle-model'),M=require('./model'),{G1800Engine,buildNativeCover,HydrogenEngine}=require('./hydrogen-engine');
const N=20,TAU=2*Math.PI,close=(a,b,tolerance=1e-12)=>assert(Math.abs(a-b)<tolerance,`${a} differs from ${b}`);
const signal=Array.from({length:N},(_,n)=>3+2*Math.cos(TAU*3*n/N)+.7*Math.sin(TAU*4*n/N)+.5*Math.cos(Math.PI*n));
const coefficients=S.dft(signal),restored=S.reconstruct(coefficients);
close(coefficients[0].real,3);close(coefficients[0].imag,0);close(coefficients[3].real,1);close(coefficients[3].imag,0);close(coefficients[17].real,1);
close(coefficients[4].real,0);close(coefficients[4].imag,-.35);close(coefficients[16].imag,.35);close(coefficients[10].real,.5);
restored.forEach((x,i)=>close(x,signal[i]));
const shift=7,shifted=Array.from({length:N},(_,n)=>signal[(n-shift+N)%N]),shiftedCoefficients=S.dft(shifted);
for(let k=0;k<N;k++){
 const a=-TAU*k*shift/N,c=coefficients[k];
 close(shiftedCoefficients[k].real,c.real*Math.cos(a)-c.imag*Math.sin(a));
 close(shiftedCoefficients[k].imag,c.real*Math.sin(a)+c.imag*Math.cos(a));
}
close(signal.reduce((s,v)=>s+v*v,0)/N,coefficients.reduce((s,c)=>s+c.real*c.real+c.imag*c.imag,0));
assert.throws(()=>S.dft([]));assert.throws(()=>S.dft([NaN]));assert.throws(()=>S.reconstruct([{real:0,imag:Infinity}]));
const native=M.native(require('./transport.json')),bundle=require('./hydrogen-data.json'),registration=new G1800Engine(bundle.native),engine=new HydrogenEngine(registration,buildNativeCover(registration),bundle.hydrogen),atlas=T.build(native,engine.graph.edges);
const before={metrics:JSON.stringify(engine.metrics),real:Array.from(engine.re),imag:Array.from(engine.im)};
let analyses=0,seriesChecked=0,maxReconstructionError=0,maxPlanarSquaredSideHighBin=0,maxGraphAC=0;
// Independently verify selected edges, so the constant graph-distance sequence
// is checked against the carrier rather than only against module metadata.
const adjacency=Array.from({length:9000},()=>new Set());for(let j=0;j<engine.graph.edges.length;j+=2){const a=engine.graph.edges[j],b=engine.graph.edges[j+1];adjacency[a].add(b);adjacency[b].add(a);}
for(const orbit of atlas.orbits)for(const depth of [0,.8]){
 const a=S.analyze(orbit,native,depth,M,T);analyses++;assert.equal(a.sampleCount,20);assert.equal(a.depth,depth);
 for(const [key,values]of Object.entries(a.series)){
  const spec=a.spectra[key];assert.equal(values.length,20);assert.equal(spec.coefficients.length,20);assert.equal(spec.amplitude.length,11);assert(values.every(Number.isFinite));
  close(spec.mean,values.reduce((x,y)=>x+y,0)/20);close(spec.min,Math.min(...values));close(spec.max,Math.max(...values));
  maxReconstructionError=Math.max(maxReconstructionError,spec.reconstructionError);assert(spec.reconstructionError<1e-12);seriesChecked++;
  close(spec.amplitude[0],Math.abs(spec.mean));close(spec.amplitude[10],Math.hypot(spec.coefficients[10].real,spec.coefficients[10].imag));
  for(let k=1;k<10;k++)close(spec.amplitude[k],2*Math.hypot(spec.coefficients[k].real,spec.coefficients[k].imag));
 }
 for(let k=0;k<20;k++){
  const ids=orbit.routes.map(r=>native.cycles[r][k]);assert(adjacency[ids[0]].has(ids[1]));assert(adjacency[ids[1]].has(ids[2]));assert(adjacency[ids[2]].has(ids[0]));assert.equal(a.series.graphXY[k],1);
  close(Math.hypot(a.series.areaX[k],a.series.areaY[k],a.series.areaZ[k]),a.series.area[k]);
 }
 assert.equal(a.spectra.graphXY.dominantBin,null);close(a.spectra.graphXY.mean,1);maxGraphAC=Math.max(maxGraphAC,...a.spectra.graphXY.amplitude.slice(1));
 if(depth===0)for(let k=3;k<=17;k++)maxPlanarSquaredSideHighBin=Math.max(maxPlanarSquaredSideHighBin,Math.hypot(a.spectra.sideSquared.coefficients[k].real,a.spectra.sideSquared.coefficients[k].imag));
}
assert(maxGraphAC<1e-12);assert(maxPlanarSquaredSideHighBin<1e-12);
assert.equal(JSON.stringify(engine.metrics),before.metrics);assert.deepEqual(Array.from(engine.re),before.real);assert.deepEqual(Array.from(engine.im),before.imag);
const examples=[0,.8].map(depth=>{const a=S.analyze(atlas.orbits[atlas.exampleIndex],native,depth,M,T);return {depth,signals:Object.fromEntries(Object.entries(a.spectra).map(([key,s])=>[key,{mean:s.mean,dominantBin:s.dominantBin,topAC:s.amplitude.slice(1).map((amplitude,i)=>({bin:i+1,amplitude})).filter(x=>x.amplitude>1e-12).sort((x,y)=>y.amplitude-x.amplitude).slice(0,4)}]))};});
const report={passed:true,analyses,seriesChecked,sampleCount:20,maxReconstructionError,maxPlanarSquaredSideHighBin,maxGraphAC,normalization:'X[k]=(1/N) sum x[n] exp(-2pi i kn/N); inverse has no 1/N',amplitude:'single-sided; double positive bins except DC and Nyquist',cyclicShiftPhaseVerified:true,parsevalVerified:true,graphAdjacencyVerified:true,hydrogenStateUnchanged:true,examples,scope:'Twenty discrete native F samples. Frequencies are cycles per F return; bins above10 are unresolved/aliased. Drawing signals depend on the chosen embedding; this is not a Hamiltonian eigenvalue spectrum or physical-frequency calibration.'};
fs.writeFileSync('triangle-spectrum-verification.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({passed:report.passed,analyses,seriesChecked,maxReconstructionError,maxPlanarSquaredSideHighBin,maxGraphAC,examples},null,2));
