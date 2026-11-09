'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),P=require('./triangle-spatial'),S=require('./triangle-spectrum'),T=require('./triangle-model'),M=require('./model'),{G1800Engine,buildNativeCover,HydrogenEngine}=require('./hydrogen-engine');
const close=(a,b,tolerance=1e-12)=>assert(Math.abs(a-b)<tolerance,`${a} differs from ${b}`);
// Analytic mixed signal checks the sign of the sine contribution, inclusion of
// the mean, and the undoubled Nyquist term both on and between integer samples.
const values=Array.from({length:20},(_,n)=>3+2*Math.cos(2*Math.PI*n/20)+.7*Math.sin(6*Math.PI*n/20)+.5*Math.cos(Math.PI*n));
const synthetic={coordinates:Array.from({length:3},()=>Array.from({length:3},()=>S.dft(values)))};
for(const t of [0,.125,.7,2.3,10,19.9]){
 close(P.sample(synthetic,t,0,0)[0][0],3);
 close(P.sample(synthetic,t,1,0)[0][0],3+2*Math.cos(2*Math.PI*t/20));
 close(P.sample(synthetic,t,3,0)[0][0],3+.7*Math.sin(6*Math.PI*t/20));
 close(P.sample(synthetic,t,10,0)[0][0],3+.5*Math.cos(Math.PI*t));
 close(P.sample(synthetic,t,10,1)[0][0],3+2*Math.cos(2*Math.PI*t/20)+.7*Math.sin(6*Math.PI*t/20)+.5*Math.cos(Math.PI*t));
}
close(P.modeAmplitude(synthetic,10),1.5);close(P.modeAmplitude(synthetic,1),6);
assert.throws(()=>P.sample(synthetic,NaN,1,0));assert.throws(()=>P.sample(synthetic,0,11,0));assert.throws(()=>P.sample(synthetic,0,1,2));assert.throws(()=>P.modeAmplitude(synthetic,-1));
const native=M.native(require('./transport.json')),bundle=require('./hydrogen-data.json'),registration=new G1800Engine(bundle.native),engine=new HydrogenEngine(registration,buildNativeCover(registration),bundle.hydrogen),atlas=T.build(native,engine.graph.edges);
const before={metrics:JSON.stringify(engine.metrics),real:Array.from(engine.re),imag:Array.from(engine.im)};
let analyses=0,integerConfigurations=0,fractionalConfigurations=0,maxReconstructionError=0,maxFlatFractionalError=0,maxClosureError=0,maxLiftedInterpolationDifference=0;
for(const orbit of atlas.orbits)for(const depth of [0,.8]){
 const data=P.build(orbit,native,depth,M,T,S);analyses++;
 assert.equal(data.sampleCount,20);assert.equal(data.period,20);assert.equal(data.coordinates.length,3);assert.equal(data.nativeSamples.length,20);
 for(let corner=0;corner<3;corner++)for(let axis=0;axis<3;axis++){
  assert.equal(data.coordinates[corner][axis].length,20);
  close(data.means[corner][axis],data.nativeSamples.reduce((sum,p)=>sum+p[corner][axis],0)/20);
 }
 for(let step=0;step<20;step++){
  const expected=orbit.routes.map(r=>M.xyzFlowerPoint(r,step,native.cycles,depth)),restored=P.sample(data,step,10,1),mean=P.sample(data,step,0,0);integerConfigurations++;
  for(let corner=0;corner<3;corner++)for(let axis=0;axis<3;axis++){
   const error=Math.abs(restored[corner][axis]-expected[corner][axis]);maxReconstructionError=Math.max(maxReconstructionError,error);assert(error<1e-12);
   close(mean[corner][axis],data.means[corner][axis]);
  }
 }
 close(data.maxReconstructionError,Math.max(...data.nativeSamples.flatMap((points,k)=>P.sample(data,k,10,1).flatMap((p,c)=>p.map((v,a)=>Math.abs(v-points[c][a]))))));
 for(const phase of [.125,.37,2.6,7.4,19.99])for(const style of [0,1])for(const k of [0,1,4,10]){
  const a=P.sample(data,phase,k,style),b=P.sample(data,phase+20,k,style);fractionalConfigurations++;
  for(let corner=0;corner<3;corner++)for(let axis=0;axis<3;axis++){
   assert(Number.isFinite(a[corner][axis]));maxClosureError=Math.max(maxClosureError,Math.abs(a[corner][axis]-b[corner][axis]));close(a[corner][axis],b[corner][axis]);
  }
 }
 for(const phase of [.125,.37,2.6,7.4,19.99]){
  const expected=orbit.routes.map(r=>M.xyzFlowerPoint(r,phase,native.cycles,depth)),first=P.sample(data,phase,1,0),all=P.sample(data,phase,10,1);
  for(let corner=0;corner<3;corner++)for(let axis=0;axis<3;axis++){
   if(depth===0){const error=Math.abs(first[corner][axis]-expected[corner][axis]);maxFlatFractionalError=Math.max(maxFlatFractionalError,error);assert(error<1e-12);}
   else maxLiftedInterpolationDifference=Math.max(maxLiftedInterpolationDifference,Math.abs(all[corner][axis]-expected[corner][axis]));
  }
 }
}
assert(maxLiftedInterpolationDifference>1e-6,'Lifted Fourier interpolation should be distinguished from existing smoothstep drawing interpolation.');
assert.equal(JSON.stringify(engine.metrics),before.metrics);assert.deepEqual(Array.from(engine.re),before.real);assert.deepEqual(Array.from(engine.im),before.imag);
const example=[0,.8].map(depth=>{const data=P.build(atlas.orbits[atlas.exampleIndex],native,depth,M,T,S);return {depth,modeAmplitudes:Array.from({length:11},(_,k)=>P.modeAmplitude(data,k)),maxReconstructionError:data.maxReconstructionError};});
const report={passed:true,analyses,integerConfigurations,fractionalConfigurations,maxReconstructionError,maxFlatFractionalError,maxClosureError,maxLiftedInterpolationDifference,nyquistUndoubledVerified:true,sinePhaseSignVerified:true,hydrogenStateUnchanged:true,example,scope:'Coordinate Fourier interpolation, not native graph dynamics. DC plus k=1 reproduces flat circular paths. All modes reproduce all20 discrete samples; lifted between-step paths differ from the native drawing interpolation.'};
fs.writeFileSync('triangle-spatial-verification.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
