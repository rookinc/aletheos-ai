'use strict';
// Fourier interpolation of drawing coordinates. This does not create native
// graph states, edges, Hamiltonian modes, or physical electron trajectories.
const TriangleSpatial=(()=>{
 const N=20,TAU=2*Math.PI,mod=(x,n)=>(x%n+n)%n;
 function validateMode(k,style){
  if(!Number.isInteger(k)||k<0||k>10||!Number.isInteger(style)||style<0||style>1)throw Error('Invalid spatial Fourier mode');
 }
 function harmonic(c,k,phase){
  // A real even-N series has a lone Nyquist coefficient: do not double it.
  if(k===10)return c.real*Math.cos(Math.PI*phase);
  const a=TAU*k*phase/N;
  return 2*(c.real*Math.cos(a)-c.imag*Math.sin(a));
 }
 function sample(data,phase,k,style){
  validateMode(k,style);if(!Number.isFinite(phase))throw Error('Invalid spatial Fourier phase');
  const t=mod(phase,N);
  return data.coordinates.map(corner=>corner.map(coefficients=>{
   let value=coefficients[0].real;
   if(style===0){if(k>0)value+=harmonic(coefficients[k],k,t);}
   else for(let j=1;j<=k;j++)value+=harmonic(coefficients[j],j,t);
   return value;
  }));
 }
 function modeAmplitude(data,k){
  validateMode(k,0);
  // Euclidean norm of the nine single-sided coordinate amplitudes. This is a
  // display-coordinate amplitude summary, not an energy or probability norm.
  return Math.hypot(...data.coordinates.flatMap(corner=>corner.map(coefficients=>{
   const c=coefficients[k];return k===0||k===10?Math.abs(c.real):2*Math.hypot(c.real,c.imag);
  })));
 }
 function build(orbit,transport,depth,model,triangleModel,spectrum){
  if(!Number.isFinite(depth))throw Error('Invalid spatial Fourier depth');
  const nativeSamples=Array.from({length:N},(_,step)=>triangleModel.sample(orbit,step,transport,depth,model).points);
  if(nativeSamples.some(points=>points.length!==3||points.some(p=>p.length!==3||p.some(v=>!Number.isFinite(v)))))throw Error('Invalid spatial Fourier coordinates');
  const coordinates=Array.from({length:3},(_,corner)=>Array.from({length:3},(_,axis)=>spectrum.dft(nativeSamples.map(points=>points[corner][axis]))));
  const data={sampleCount:N,period:N,depth,routes:orbit.routes.slice(),seeds:orbit.seeds.slice(),coordinates,nativeSamples,means:coordinates.map(corner=>corner.map(c=>c[0].real)),maxReconstructionError:0,
   scope:'Fourier interpolation of three drawing-coordinate paths. Full reconstruction matches the 20 native samples; between-step paths can differ from native drawing interpolation. Single-mode and truncated faces are not certified native graph triangles.'};
  for(let step=0;step<N;step++){
   const restored=sample(data,step,10,1);
   for(let corner=0;corner<3;corner++)for(let axis=0;axis<3;axis++)data.maxReconstructionError=Math.max(data.maxReconstructionError,Math.abs(restored[corner][axis]-nativeSamples[step][corner][axis]));
  }
  return data;
 }
 return {build,sample,modeAmplitude};
})();
if(typeof module!=='undefined')module.exports=TriangleSpatial;
