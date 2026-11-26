import {num, sign, table, pairBoxes, delta} from './presentation.js';
import {heart} from './heart.js';
import {faceFixture} from './data/flux-fixtures.js';
export const skyMapPath='./data/sky-planck.png';
const select=(key,label,value,options)=>'<label>'+label+'<select data-set="'+key+'">'+options.map(([v,t])=>'<option value="'+v+'"'+(String(v)===String(value)?' selected':'')+'>'+t+'</option>').join('')+'</select></label>';
const check=(key,label,on)=>'<label class="check"><input type="checkbox" data-set="'+key+'"'+(on?' checked':'')+'>'+label+'</label>';
const slider=(key,label,value,min,max,step,unit='')=>'<label>'+label+' <output>'+num(value)+' '+unit+'</output><input type="range" aria-label="'+label+'" data-set="'+key+'" min="'+min+'" max="'+max+'" step="'+step+'" value="'+value+'"></label>';
const cmd=(id,title,pressed)=>'<button type="button" data-cmd="'+id+'"'+(pressed===undefined?'':' aria-pressed="'+pressed+'"')+'>'+title+'</button>';
const row=s=>'<div class="formrow">'+s+'</div>',grid=s=>'<div class="formgrid">'+s+'</div>';
export function controls(name,c,d){
 if(name==='paired')return grid(select('route','Route to endpoint 495',c.route,[['preserve','Preserve · r'],['swap','Swap · Zr']])+select('pairs','Paired receivers',c.pairs,[[1,'One port pair'],[8,'All eight pairs']])+select('readout','Readout',c.readout,[['signed','Signed difference'],['sum','Ordinary sum']]))+'<p class="hint">The launch changes sheets with the route. Both preparations use unit displacement and zero velocity.</p>';
 if(name==='flux')return grid(select('cut','Oriented boundary',c.cut,[['face7','Around face 7'],['patch','Seven-face patch'],['half','Around faces 0–9']])+select('control','Transform at sample time',c.control,[['original','Original F, V'],['both','Reverse both F and V'],['velocity','Reverse velocity only']])+select('mode','Current readout',c.mode,[['instant','Instantaneous rate'],['cycle','Mean over one cycle']])+slider('phase','Starting phase',c.phase,0,1,.025,'T'))+'<p class="hint">Each transform starts from the same chosen phase. The receiver comparison always uses its stated T/4 checkpoint.</p>';
 if(name==='sky')return row(cmd('order','Reverse test order')+cmd('reference','Reverse reference only')+cmd('both','Reverse both'))+grid(select('order','Test route order',c.order,[[1,'AB · +b'],[-1,'BA · −b']])+select('reference','Coherent reference',c.reference,[[1,'Positive reference'],[-1,'Negative reference'],[0,'Reference off']])+slider('phaseDeg','Relative phase',c.phaseDeg,0,360,5,'°'))+row(check('averaged','Average over uncontrolled phase',c.averaged))+row(check('feedback','Connect local feedback at B',c.feedback));
 if(name==='sag')return grid(select('cut','Exterior model boundary',c.cut,[['near','Near · one hop'],['middle','Middle · two hops'],['far','Far · four hops']]))+'<p class="hint">Choose a graph-distance shell around source 61. Each shell lies in the exterior model. The observational ring has its own angular scale.</p>';
 return row(cmd('independent','Independent',!c.cue&&!c.coupling)+cmd('shared','Shared cue',c.cue&&!c.coupling)+cmd('coupled','Same cue + coupling',c.cue&&c.coupling))+
 grid(slider('rateA','A heart rate',c.rateA,40,120,1,'bpm')+slider('rateB','B heart rate',c.rateB,40,120,1,'bpm')+slider('phaseA','A initial phase',c.phaseA,0,.99,.01,'cycles')+slider('phaseB','B initial phase',c.phaseB,0,.99,.01,'cycles')+slider('variation','Beat variation',c.variation,0,.05,.005,'fraction')+select('beat','Mark an A beat',d.mark.ordinal,d.beatsA.slice(0,d.availableBeats).map(v=>[v.ordinal,'Beat '+v.ordinal+' · '+v.time+' s'])))+
 row(check('cue','Shared breathing cue',c.cue)+check('coupling','Reciprocal field coupling',c.coupling))+'<p class="hint">Beat variation is a fractional half-width (0.015 = 1.5%). Seed '+c.seed+' fixes both synthetic clocks.</p>';
}
function storedCycle(g){
  const outgoing=Array.from({length:20},()=>[]),p=g.position,v=g.velocity;
  for(const [a,b] of faceFixture.edges){const flow=p[a]*v[b]-v[a]*p[b];if(Math.abs(flow)>1e-10){const [i,j]=flow>0?[a,b]:[b,a];outgoing[i].push([j,Math.abs(flow)]);}}
  for(const targets of outgoing)targets.sort((a,b)=>b[1]-a[1]);
  const start=g.witness.cycleMean>=0?7:15,next=start===7?15:7;
  function walk(path){const tail=path.at(-1);for(const [j] of outgoing[tail]){if(j===start&&path.length>2)return [...path,j];if(!path.includes(j)){const found=walk([...path,j]);if(found)return found;}}return null;}
  return walk([start,next])??[];
}
function cycleGraphic(path,g){
 if(path.length<4)return '';
 const nodes=path.slice(0,-1),w=300,h=138,r=46,x=w/2,y=69;
 const pts=nodes.map((n,i)=>[x+Math.cos(i*2*Math.PI/nodes.length-Math.PI/2)*r*1.65,y+Math.sin(i*2*Math.PI/nodes.length-Math.PI/2)*r]);
 let svg='<svg role="img" aria-label="Directed face-current circulation '+path.join(' to ')+'" viewBox="0 0 300 138" style="width:100%;max-height:145px"><defs><marker id="cwArrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0 0 5 2.5 0 5" fill="#a3d8c7"/></marker></defs>';
 for(let i=0;i<nodes.length;i++){const [x0,y0]=pts[i],[x1,y1]=pts[(i+1)%nodes.length],d=Math.hypot(x1-x0,y1-y0);svg+='<line x1="'+(x0+12*(x1-x0)/d)+'" y1="'+(y0+12*(y1-y0)/d)+'" x2="'+(x1-13*(x1-x0)/d)+'" y2="'+(y1-13*(y1-y0)/d)+'" stroke="#a3d8c7" stroke-width="1.5" marker-end="url(#cwArrow)"/>';}
 nodes.forEach((n,i)=>{const [a,b]=pts[i];svg+='<circle cx="'+a+'" cy="'+b+'" r="10" fill="#142830" stroke="#87b7ad"/><text x="'+a+'" y="'+(b+4)+'" text-anchor="middle" fill="#e5efe7" font-size="11" font-family="monospace">'+n+'</text>';});return svg+'</svg>';
}
function heartPlot(d,e,branch){
 const timing=[d.mark.time,d.arrival?.time??d.mark.time+.03,d.checkpoint.time,d.return.time,d.later.time][e];
 const compact=typeof window!=='undefined'&&window.matchMedia('(max-width:600px)').matches,W=compact?360:640,left=compact?58:113,right=W-19,lo=Math.max(0,Math.min(d.mark.time-.48,d.duration-4)),hi=Math.min(d.duration,lo+4);
 const xa=t=>left+(t-lo)/(hi-lo)*(right-left);
 let s='<svg role="img" aria-label="Four aligned traces around the marked beat, heart drives and signed field displacements" viewBox="0 0 '+W+' 265" width="100%">';
 const rows=[['A beat',d.heartA,null,'#78e5d3'],['B beat',d.heartB,null,'#f4ad70'],['A field',d.fieldA,d.clearedFieldA,'#78e5d3'],['B field',d.fieldB,d.clearedFieldB,'#f4ad70']];
 rows.forEach(([lab,free,cleared,col],idx)=>{const center=44+idx*52,minIndex=Math.ceil(lo/d.dt),maxIndex=Math.min(d.time.length-1,Math.floor(hi/d.dt)),peak=idx<2?1:Math.max(.03,...free.slice(minIndex,maxIndex+1).map(Math.abs),...cleared.slice(minIndex,maxIndex+1).map(Math.abs)),base=idx<2?center+7:center;
  const path=(arr)=>{let v='';for(let i=minIndex;i<=maxIndex;i++){v+=(i===minIndex?'M':'L')+xa(d.time[i]).toFixed(2)+' '+(base-17*arr[i]/peak).toFixed(2)+' ';}return v;};
  s+='<text x="2" y="'+(center+3)+'" fill="'+col+'" font-family="monospace" font-size="15">'+lab+'</text><line x1="'+left+'" y1="'+base+'" x2="'+right+'" y2="'+base+'" stroke="#35464d"/><path d="'+path(free)+'" stroke="'+col+'" stroke-width="2" fill="none"/>';
  if(cleared&&(branch==='cleared'||e===4))s+='<path d="'+path(cleared)+'" stroke="#e6ece3" stroke-width="1.7" stroke-dasharray="4 4" fill="none"/>';
 });
 [[d.mark.time,'#8be8cd','beat'],[d.checkpoint.time,'#f8b878','clear B']].forEach(([t,col,lab],i)=>{s+='<line x1="'+xa(t)+'" x2="'+xa(t)+'" y1="17" y2="224" stroke="'+col+'" stroke-dasharray="3 4"/><text x="'+(xa(t)+(i?4:-4))+'" y="13" text-anchor="'+(i?'start':'end')+'" fill="'+col+'" font-size="13">'+lab+'</text>';});
 s+='<path d="M'+(xa(timing)-4)+' 226h8l-4 -6z" fill="#f4f4de"/>';
 for(let t=Math.ceil(lo);t<=hi;t++)s+='<text x="'+xa(t)+'" y="244" text-anchor="middle" font-size="13" fill="#c4d2d0">'+t+' s</text>';
 return s+'</svg>';
}
function sagDiagram(rad){
 const scale=2,rc=51.8*scale/2,cut=rc*(1.32+rad*.1);
 return '<svg viewBox="0 0 380 190" role="img" aria-label="Original apparent ring scale and exterior graph cut schematic" width="100%" style="max-height:200px"><defs><radialGradient id="plasma"><stop offset="41%" stop-color="#0b171d"/><stop offset="61%" stop-color="#6b412a"/><stop offset="79%" stop-color="#f3ad6c"/><stop offset="100%" stop-color="#bc6840" stop-opacity="0"/></radialGradient></defs><circle cx="112" cy="90" r="66" fill="url(#plasma)"/><circle cx="112" cy="90" r="'+rc+'" fill="none" stroke="#efbf8d" stroke-width="1"/><ellipse cx="112" cy="90" rx="'+cut+'" ry="'+cut*.82+'" fill="none" stroke="#86dccb" stroke-width="1.6" stroke-dasharray="5 4"/><g fill="none" stroke="#a7b9b8"><path d="M163 89h20l12-26h20"/><path d="M154 111h41l10 12h12"/><path d="M150 35h37l14-8h16"/></g><g font-size="13" font-family="sans-serif"><text x="220" y="31" fill="#85e3ce">selected model cut</text><text x="220" y="66" fill="#efc596">apparent ring</text><text x="220" y="127" fill="#e3c29c">emitting plasma</text></g><path d="M86 169h52m-52-4v8m52-8v8" stroke="#e4e3d7"/><text x="112" y="185" font-size="12" fill="#d5ddd9" text-anchor="middle">26 µas · ring scale</text></svg>';
}
const specialBox=(title,body)=>'<section class="special"><h3>'+title+'</h3>'+body+'</section>';
export function special(name,c,d,view){
 if(name==='paired'){
   if(!d.flux)return '';
   const f=d.flux;
   return '<details class="special"><summary>Does the paired-port intervention reverse energy transfer?</summary><p>Use the same two graph updates and enclose the selected receiver ports. Positive transfer enters B. The clamp happens before the interval starts.</p>'+
   pairBoxes('Free · net into B',sign(f.free.netIntoB),'Cleared · net into B',sign(f.cleared.netIntoB))+delta(f.reversed?'Direction reverses.':'Direction holds.',sign(f.delta))+'<p class="hint">Difference in local invariant Q over update 1 to 2. The receipt contains individual crossing edges and both gross directions.</p></details>';
 }
 if(name==='flux'){
   const g=d.sample, f=d.fixed,path=storedCycle(g),i=d.fork;
   return specialBox('Edge currents and accumulated traffic','<div class="specialgrid"><div><p>Positive current leaves the selected faces. Negative current enters them. The two traffic totals count opposing crossings separately.</p>'+table(['Quantity','Value'],[['Accumulated outward',num(g.traffic.outward)],['Accumulated inward',num(g.traffic.inward)],['Net transfer',sign(g.traffic.net)],['Integration interval',g.mode==='cycle'?'One full period':'One eighth-period']])+'</div><div>'+cycleGraphic(path,g)+'<p class="hint">One directed loop of whole-cycle mean currents. Edge 7→15 carries '+sign(g.witness.cycleMean)+'. Across any closed cut, a full stored period has zero net transfer.</p></div></div>'+row(cmd('cycle','Show cycle mean',c.mode==='cycle'))+
   '<details><summary>Inspect '+g.edges.length+' crossing edges</summary>'+table(['Outward edge',g.mode==='cycle'?'Mean current':'Current','Integrated net'],g.edges.map(v=>[v.from+' → '+v.to,sign(v.current),sign(v.transfer)]))+'</details>')+
   specialBox('What can flip?','<div class="specialgrid"><div><h4>Amplitude at a reference</h4><p>Reverse a coherent input to exchange the bright port. Read the signed contrast in the sky receiver.</p>'+cmd('sky','Open phase comparison')+'</div><div><h4>Exit at a fixed fork</h4><p>Connect the TOM-PHY-027 echo reader to the selector at site 480. Its returned bit determines which actual graph edge is taken.</p>'+row(check('forkOn','Connect echo to fork selector',c.forkOn))+(i?grid(select('test','Test triangle',c.test,[[1,'+1'],[-1,'−1']])+select('reference','Reference triangle',c.reference,[[1,'+1'],[-1,'−1']]))+table(['Receipt','Value'],[['Detected echo','Hop '+i.echoHop],['Selected edge','480 → '+i.exit],['First edge clock','Hop '+i.firstEdgeHop]]):'')+'</div></div><h4>Energy through a fixed cut</h4><p>Reversing velocity alone changes the sign of each nonzero instantaneous current. Clearing a receiver record is a separate test. Its integrated result for the selected faces is '+sign(f.free,9)+' free and '+sign(f.cleared,9)+' cleared.</p>');
 }
 if(name==='sky'){
   const g=d.fork;
   return specialBox('Sky and receiver',row(cmd('map','Measured Planck sky',view.map)+cmd('apparatus','Phase apparatus',view.apparatus))+
     (view.map?'<figure><img src="'+skyMapPath+'" alt="Galactic Mollweide projection of the measured Planck SMICA quadrupole and octupole, in thermodynamic microkelvin"><figcaption>Planck PR3 SMICA · Galactic sky · ℓ = 2, 3 only, in thermodynamic µK. CoRI synthesis from the archived full-sky coefficients. ESA and the Planck Collaboration. <a href="https://irsa.ipac.caltech.edu/data/Planck/release_3/all-sky-maps/matrix_cmb.html">Planck products</a></figcaption></figure>':'')+
     (view.apparatus?'<h4>Calibrated output powers</h4>'+pairBoxes('Positive port P₊',num(d.plus),'Negative port P₋',num(d.minus))+delta('Signed contrast',sign(d.contrast))+'<p>The map supplies measured temperature structure. This combiner supplies its own controlled phase. Incoming single-beam intensity is '+d.incomingIntensity+'.</p>':'')+
     (!view.map&&!view.apparatus?'<p>Select a layer to inspect it here.</p>':'')+
     '<details><summary>What does the observer bring at 59 → 17?</summary><p>Earlier triad '+(g.reference.triad?g.reference.triad.join(' → '):'disconnected')+' supplies the reference ('+g.reference.vector.map(x=>sign(x)).join(', ')+'). Compare each possible exit at the same incoming edge.</p>'+table(['Exit','Signed vector','Raw overlap','Normalized'],g.candidates.map(x=>[x.exit,'('+x.vector.map(y=>sign(y)).join(', ')+')',sign(x.rawOverlap),x.normalizedOverlap===null?'—':sign(x.normalizedOverlap)]))+'<p>The larger signed overlap favors '+(g.preferredExit??'neither candidate')+'. A separate action rule is required to send a walker down an edge.</p></details>');
 }
 if(name==='sag')return specialBox('Ring, plasma and model cut','<div class="specialgrid"><figure>'+sagDiagram(d.cutRadius)+'<figcaption>Original scale schematic. The bar calibrates the apparent ring. Dashed cut geometry is diagrammatic.</figcaption></figure><div><p>The Event Horizon Telescope’s 2017 interferometric observations at 1.3 mm resolve a bright ring with diameter <strong>51.8 ± 2.3 µas</strong> (68% credible interval). The radio reconstruction measures brightness on the sky.</p><p>Here the emitting plasma, apparent ring and chosen exterior shell have separate marks. The distant detector reads a signed graph field. A physical horizon has no assigned graph radius in this experiment.</p><p><a href="https://doi.org/10.3847/2041-8213/ac6674">EHT Collaboration · primary result</a></p></div></div>'+
 table(['Selected exterior cut','Value'],[['Graph distance',d.cutRadius+' hop'+(d.cutRadius===1?'':'s')],['Crossing edges',d.edgeCount],['Free outward / inward traffic',num(d.free.traffic.outward)+' / '+num(d.free.traffic.inward)],['Cleared outward / inward traffic',num(d.cleared.traffic.outward)+' / '+num(d.cleared.traffic.inward)]])+'<p>Traffic is cumulative from graph time 0 to '+d.time+'. Compare receipts for the post-intervention interval.</p>');
 const presetKey=JSON.stringify([c.seed,c.rateA,c.rateB,c.phaseA,c.phaseB,c.variation,c.beat]);
 if(!heartPresetCache.has(presetKey)){if(heartPresetCache.size>10)heartPresetCache.clear();heartPresetCache.set(presetKey,[[false,false],[true,false],[true,true]].map(([cue,coupling])=>heart({...c,cue,coupling})));}const runs=heartPresetCache.get(presetKey);
 return specialBox('Follow the marked beat',heartPlot(d,view.event,view.branch)+'<p class="hint">A’s marked beat and B’s clearing checkpoint share one time axis. Each row uses its own vertical scale. Solid lines show the free replay. Dashed lines appear for the cleared replay.</p>'+
 table(['Replay','Mean beat gap','Δ next A velocity'],runs.map((x,i)=>[['Independent · coupling off','Shared cue · coupling off','Same cue · coupling on'][i],num(x.timing.meanNearestBeatGapSeconds*1000,4)+' ms',sign(x.return.deltaVelocityA)]))+'<p>Timing measures the mean distance from each A beat in seconds 6–14 to its nearest B beat. The return measures field velocity. The shared and coupled rows use exactly the same heartbeat schedules.</p>');
}
const heartPresetCache=new Map();
