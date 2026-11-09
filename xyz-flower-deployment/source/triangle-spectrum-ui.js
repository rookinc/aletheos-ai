'use strict';
const spectrumKeys=['area','sideSquared','centroidX','centroidY','centroidZ','areaX','areaY','areaZ','graphXY'];
const spectrumNames=['Drawing area','Squared side · XY–XZ','Centroid · X','Centroid · Y','Centroid · Z','Oriented area · X','Oriented area · Y','Oriented area · Z','Graph distance · XY–XZ'];
let spectrumCache=null,spectrumDataKey='',spectrumChartKey='',spectrumScreenPoints=[];
const spectrumAxisFmt=v=>Number(v.toPrecision(3)).toString();
const spectrumFmt=v=>Math.abs(v)<1e-12?'0':Math.abs(v)>=1000||Math.abs(v)<.001?v.toExponential(2):Number(v.toFixed(5)).toString();
function getTriangleSpectrum(){
 const dataKey=S.triOrbit+':'+S.flowerDepth;
 if(dataKey!==spectrumDataKey){const orbit=triangleAtlas.orbits[S.triOrbit];const current=TriangleSpectrum.analyze(orbit,native,S.flowerDepth/100,M,TriangleModel),flat=S.flowerDepth===0?current:TriangleSpectrum.analyze(orbit,native,0,M,TriangleModel);spectrumCache={current,flat};spectrumDataKey=dataKey;}
 return spectrumCache;
}
function refreshTriangleSpectrum(){
 if(!$('triangleSpectrum').open)return;
 const {current,flat}=getTriangleSpectrum(),key=spectrumKeys[S.triSignal],data=current.series[key],spec=current.spectra[key],ref=flat.series[key],refSpec=flat.spectra[key],compare=S.triCompare&&S.flowerDepth!==0;
 const chartKey=spectrumDataKey+':'+S.triSignal+':'+S.triCompare+':'+S.triDc;
 if(chartKey!==spectrumChartKey){
  spectrumChartKey=chartKey;$('spectrumOrbit').value=S.triOrbit;$('spectrumDepth').value=S.flowerDepth;$('spectrumDepthValue').textContent=S.flowerDepth+'%';
  $('spectrumLegend').innerHTML='<span style="color:#70d9d4">● Current depth '+S.flowerDepth+'%</span>'+(compare?' &nbsp; <span style="color:#d7b77a">● Flat reference 0%</span>':S.triCompare?' · current drawing is the flat reference':'')+' · '+(key==='graphXY'?'graph edges':key.startsWith('centroid')?'drawing units':'drawing units²');
  const values=compare?[...data,...ref]:data,lo=Math.min(...values),hi=Math.max(...values),pad=Math.max((hi-lo)*.12,Math.max(1,Math.abs(hi))*.015),bottom=lo-pad,top=hi+pad;
  const X=k=>58+k*356/19,Y=v=>166-(v-bottom)/(top-bottom)*140;
  spectrumScreenPoints=data.map((v,k)=>[X(k),Y(v)]);
  const path=series=>series.map((v,k)=>(k?'L':'M')+X(k).toFixed(2)+','+Y(v).toFixed(2)).join(' ');
  const axis='<path d="M58 20V166H414" fill="none" stroke="#354b57"/><text x="54" y="24" text-anchor="end">'+spectrumAxisFmt(top)+'</text><text x="54" y="169" text-anchor="end">'+spectrumAxisFmt(bottom)+'</text><text x="58" y="187">1</text><text x="215" y="187">10</text><text x="402" y="187">20</text><text x="180" y="204">Native step</text>';
  $('cycleChart').innerHTML='<svg viewBox="0 0 440 214" role="img" aria-label="'+spectrumNames[S.triSignal]+', twenty native samples">'+axis+(compare?'<path d="'+path(ref)+'" fill="none" stroke="#d7b77a" stroke-dasharray="4 3" stroke-width="1.6"/>':'')+'<path d="'+path(data)+'" fill="none" stroke="#70d9d4" stroke-width="1.8"/>'+data.map((v,k)=>'<circle cx="'+X(k)+'" cy="'+Y(v)+'" r="2.5" fill="#70d9d4"><title>Step '+(k+1)+': '+v+'</title></circle>').join('')+'<circle id="spectrumCursor" r="5" fill="#fff" stroke="#70d9d4" stroke-width="2"/></svg>';
  const first=S.triDc?0:1,bins=Array.from({length:11-first},(_,i)=>i+first),amplitude=spec.amplitude,refAmplitude=refSpec.amplitude;
  const peak=Math.max(...bins.map(k=>amplitude[k]),...(compare?bins.map(k=>refAmplitude[k]):[0])),plotPeak=peak>1e-12?peak:1,dx=356/bins.length,bw=compare?dx*.3:dx*.55;
  let bars='';for(let i=0;i<bins.length;i++){const k=bins[i],x=58+(i+.5)*dx;const bar=(a,col,offset)=>{const h=a<1e-12?0:a/plotPeak*138;return '<rect x="'+(x+offset-bw/2)+'" y="'+(166-h)+'" width="'+bw+'" height="'+h+'" fill="'+col+'"><title>Harmonic '+k+': '+a+'</title></rect>';};if(compare)bars+=bar(refAmplitude[k],'#d7b77a',bw*.55);bars+=bar(amplitude[k],'#70d9d4',compare?-bw*.55:0);bars+='<text x="'+x+'" y="187" text-anchor="middle">'+k+'</text>';}
  $('harmonicChart').innerHTML='<svg viewBox="0 0 440 214" role="img" aria-label="Single-sided Fourier amplitudes, bins '+first+' to 10"><path d="M58 20V166H414" fill="none" stroke="#354b57"/><text x="54" y="28" text-anchor="end">'+spectrumAxisFmt(peak)+'</text><text x="54" y="169" text-anchor="end">0</text>'+bars+'<text x="178" y="204">Harmonic k</text>'+(peak<=1e-12?'<text x="220" y="90" text-anchor="middle">No oscillating component</text>':'')+'</svg>';
  $('spectrumStats').innerHTML='<div><span>MEAN / DC</span><strong>'+spectrumFmt(spec.mean)+'</strong></div><div><span>STRONGEST NON-DC</span><strong>'+(spec.dominantBin===null?'None':'k = '+spec.dominantBin)+'</strong></div><div><span>INVERSE ERROR</span><strong>'+spec.reconstructionError.toExponential(2)+'</strong></div><div><span id="spectrumSampleLabel">NATIVE SAMPLE</span><strong id="spectrumSampleValue"></strong></div>';
  $('spectrumInsight').textContent=key==='graphXY'?'Graph distance stays exactly 1 at every native step. Its only meaningful Fourier coefficient is the mean (DC), at any bloom depth.':key==='sideSquared'&&S.flowerDepth===0?'In the flat drawing, squared side lengths contain only the mean and harmonics 1 and 2. This is a consequence of the circular coordinate construction.':S.flowerDepth>0?'Depth changes the drawing and can introduce new harmonics. The same triangle still has graph distances 1–1–1; these changes are not new graph interactions.':'The drawing changes through a 20-step cycle while graph distance stays fixed. Compare bloom depth or choose graph distance to separate the two effects.';
 }
 const step=M.mod(Math.floor(phase),20),p=spectrumScreenPoints[step],cursor=$('spectrumCursor');if(cursor){cursor.setAttribute('cx',p[0]);cursor.setAttribute('cy',p[1]);}
 $('spectrumSampleLabel').textContent='STEP '+(step+1)+' / 20';$('spectrumSampleValue').textContent=spectrumFmt(data[step]);
 $('spectrumPlay').textContent=playing?'Pause':'Play';
 $('spectrumSteps').querySelectorAll('button').forEach((b,i)=>{b.classList.toggle('active',i===step);b.setAttribute('aria-pressed',String(i===step));});
}
function triangleSpectrumReceipt(){
 const o=triangleAtlas.orbits[S.triOrbit],analysis=getTriangleSpectrum();return {schema:'thalean.triangle-spectrum.v1',source:DATA.hydrogenBundle.provenance,orbit:S.triOrbit,routes:o.routes.map(r=>r+1),seeds:o.seeds,stateIds:'zero-based',states:Array.from({length:20},(_,k)=>o.routes.map(r=>native.cycles[r][k])),selectedSignal:spectrumKeys[S.triSignal],...analysis,convention:{samples:'native steps 0..19',forward:'X[k] = sum_n x[n] exp(-2pi i k n / 20) / 20',inverse:'x[n] = real(sum_k X[k] exp(2pi i k n / 20))',amplitude:'2 abs(X[k]) for k1..9; abs(X[k]) for DC and Nyquist',frequency:'cycles per F return; not physical Hz'},scope:'Observable Fourier analysis only. Drawing depends on embedding and depth; graph distances do not. Not a new G60 operator bridge or a hydrogen energy spectrum. Twenty samples can alias higher continuous frequencies.'};
}
$('spectrumOrbit').innerHTML=$('triOrbit').innerHTML;
$('spectrumOrbit').oninput=e=>{S.triOrbit=Number(e.target.value);sync();updateTriangleReadout();refreshTriangleSpectrum();};
$('spectrumDepth').oninput=e=>{S.flowerDepth=Number(e.target.value);sync();updateTriangleReadout();refreshTriangleSpectrum();};
$('spectrumSteps').innerHTML=Array.from({length:20},(_,i)=>'<button data-sample="'+i+'" aria-label="Inspect native step '+(i+1)+'">'+(i+1)+'</button>').join('');
$('spectrumSteps').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(playing)togglePlay();phase=Number(b.dataset.sample);updateReadout();updateTriangleReadout();refreshTriangleSpectrum();});
$('spectrumPlay').onclick=()=>{togglePlay();refreshTriangleSpectrum();};
$('triSpectrumOpen').onclick=()=>{$('triangleSpectrum').showModal();refreshTriangleSpectrum();};
$('spectrumClose').onclick=()=>$('triangleSpectrum').close();
$('spectrumJson').onclick=()=>download('triangle-fourier-analysis.json',JSON.stringify(triangleSpectrumReceipt(),null,2),'application/json');
$('spectrumCsv').onclick=()=>{const r=triangleSpectrumReceipt(),keys=spectrumKeys,head=['step_zero_based','state_XY','state_XZ','state_YZ','depth',...keys.map(k=>'current_'+k),...keys.map(k=>'flat_'+k)],rows=Array.from({length:20},(_,i)=>[i,...r.states[i],r.current.depth,...keys.map(k=>r.current.series[k][i]),...keys.map(k=>r.flat.series[k][i])]);download('triangle-cycle-samples.csv',[head,...rows].map(r=>r.join(',')).join('\n')+'\n','text/csv');};
if(location.hash==='#triangle-spectrum'){$('triangleSpectrum').showModal();refreshTriangleSpectrum();}
