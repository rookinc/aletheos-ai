'use strict';
// Fourier analysis of 20 discrete F samples. Frequencies are cycles per F return,
// not physical Hz. Modes above the 10-cycle Nyquist limit cannot be resolved.
// Drawing observables depend on the chosen embedding; this is not an H spectrum.
const TriangleSpectrum=(()=>{
 const TAU=2*Math.PI;
 function dft(values){
  if(!values||!Number.isInteger(values.length)||values.length<1||Array.from(values).some(v=>!Number.isFinite(v)))throw Error('DFT needs a nonempty finite real signal');
  const N=values.length;
  return Array.from({length:N},(_,k)=>{
   let real=0,imag=0;
   for(let n=0;n<N;n++){const a=TAU*k*n/N;real+=values[n]*Math.cos(a)/N;imag-=values[n]*Math.sin(a)/N;}
   return {real,imag};
  });
 }
 // Real part of the inverse DFT, appropriate to the real input signals above.
 function reconstruct(coefficients){
  if(!coefficients||!Number.isInteger(coefficients.length)||coefficients.length<1||Array.from(coefficients).some(c=>!c||!Number.isFinite(c.real)||!Number.isFinite(c.imag)))throw Error('Inverse DFT needs finite coefficients');
  const N=coefficients.length;
  return Array.from({length:N},(_,n)=>coefficients.reduce((value,c,k)=>{const a=TAU*k*n/N;return value+c.real*Math.cos(a)-c.imag*Math.sin(a);},0));
 }
 function spectrum(values){
  const coefficients=dft(values),N=values.length,restored=reconstruct(coefficients);
  const amplitude=Array.from({length:Math.floor(N/2)+1},(_,k)=>Math.hypot(coefficients[k].real,coefficients[k].imag)*(k===0||N%2===0&&k===N/2?1:2));
  const threshold=1e-12*Math.max(1,...values.map(Math.abs));
  let dominantBin=null;
  for(let k=1;k<amplitude.length;k++)if(amplitude[k]>threshold&&(dominantBin===null||amplitude[k]>amplitude[dominantBin]))dominantBin=k;
  return {mean:values.reduce((a,b)=>a+b,0)/N,min:Math.min(...values),max:Math.max(...values),coefficients,amplitude,reconstructionError:Math.max(...restored.map((v,i)=>Math.abs(v-values[i]))),dominantBin};
 }
 function analyze(orbit,transport,depth,model,triangleModel){
  if(!Number.isFinite(depth))throw Error('Invalid triangle spectrum depth');
  const series={area:[],sideSquared:[],centroidX:[],centroidY:[],centroidZ:[],areaX:[],areaY:[],areaZ:[],graphXY:[]};
  for(let step=0;step<20;step++){
   const sample=triangleModel.sample(orbit,step,transport,depth,model),p=sample.points;
   const a=p[1].map((v,i)=>v-p[0][i]),b=p[2].map((v,i)=>v-p[0][i]);
   const areaVector=[(a[1]*b[2]-a[2]*b[1])/2,(a[2]*b[0]-a[0]*b[2])/2,(a[0]*b[1]-a[1]*b[0])/2];
   series.area.push(sample.area);series.sideSquared.push(sample.sideLengths[0]**2);
   ['X','Y','Z'].forEach((axis,i)=>{series['centroid'+axis].push(sample.centroid[i]);series['area'+axis].push(areaVector[i]);});
   series.graphXY.push(sample.graphDistances[0]);
  }
  return {sampleCount:20,depth,series,spectra:Object.fromEntries(Object.entries(series).map(([key,values])=>[key,spectrum(values)]))};
 }
 return {analyze,dft,reconstruct};
})();
if(typeof module!=='undefined')module.exports=TriangleSpectrum;
