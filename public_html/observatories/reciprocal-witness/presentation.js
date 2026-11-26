import {paired, fork} from './paired.js';
import {sky} from './sky.js';
import {flux, fixedCut, sag} from './flux.js';
import {heart, HEART_DEFAULTS} from './heart.js';

export const profiles={
  paired:{tab:'Paired ports',title:'Two-sphere encounter',source:'TOM-PHY-029 · Exact finite replay',stages:['Send','Receive','Retain','Return','Compare'],names:['A · Sender','B · Receiver','Σ · Shared boundary'],defaults:{route:'preserve',pairs:1,readout:'signed'}},
  flux:{tab:'Boundary flux',title:'Traffic through a fixed cut',source:'Native face wave · 20 faces',stages:['Prepare','Sample','Retain','Advance','Compare'],names:['A · Inside cut','B · Outside cut','Σ · Oriented cut'],defaults:{cut:'face7',control:'original',phase:.125,mode:'instant',forkOn:false,test:1,reference:1}},
  sky:{tab:'CMB observer',title:'A reference for the arriving sky',source:'CMB observer · Coherent comparison',stages:['Arrive','Combine','Retain','Read','Compare'],names:['A · Sky shell','B · Apparatus','Σ · Receiver input'],defaults:{order:1,reference:1,averaged:false,phaseDeg:0,feedback:false}},
  sag:{tab:'Sagittarius A*',title:'Outside the emitting region',source:'Sagittarius A* · G1800 exterior model',stages:['Launch','Cross','Retain','Return','Compare'],names:['A · Exterior source','B · Detector','Σ · Model cut'],defaults:{cut:'middle'}},
  heart:{tab:'Two hearts',title:'Two people, two field responses',source:'Two hearts · Synthetic drives',stages:['Mark','Arrive','Retain','Return','Compare'],names:['A · First sitter','B · Second sitter','Σ · Field coupling'],defaults:{...HEART_DEFAULTS}}
};
export const rationalNumber=s=>String(s).split('/').map(Number).reduce((a,b)=>a/b);
export function num(x,n=7){
  if(typeof x!=='number')return String(x??'—');
  if(Math.abs(x)<1e-14)return '0';
  if(Math.abs(x)<1e-5)return x.toExponential(Math.min(n-1,5)).replace('-','−');
  return Number(x.toPrecision(n)).toString().replace('-','−');
}
export function sign(v,n=7){const value=typeof v==='number'?v:rationalNumber(v);const f=typeof v==='string'?v.replace('-','−'):num(v,n);return value>0?'+'+f:f;}
export const meter=(k,v)=>'<div class="meter"><span>'+k+'</span><b>'+v+'</b></div>';
export const pairBoxes=(l,a,r,b)=>'<div class="resultpair"><div>'+l+'<strong>'+a+'</strong></div><div>'+r+'<strong>'+b+'</strong></div></div>';
export const delta=(k,v)=>'<div class="focusResult">'+k+' <strong class="resultVal">'+v+'</strong></div>';
export const table=(headers,rows)=>'<div class="dataTable"><table><thead><tr>'+headers.map(t=>'<th scope="col">'+t+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+r.map((v,i)=>i===0?'<th scope="row">'+v+'</th>':'<td>'+v+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
const levels=['Preparation','Update 1 · velocities','Update 1 · positions','Update 2 · source','Matched counterfactual'];
const titleList=['A sends','B receives','B retains','B acts back','What came back?'];
const meterRows=rows=>rows.map(([k,v])=>meter(k,v)).join('');
export function compute(name,cfg,e){
  if(name==='paired')return paired(cfg);
  if(name==='sky')return sky(cfg);
  if(name==='heart')return heart(cfg);
  if(name==='flux')return {sample:flux({...cfg,phase:cfg.phase+[0,.125,.25,.375,.375][e]}),fixed:fixedCut(cfg),fork:cfg.forkOn?fork({test:cfg.test,reference:cfg.reference}):null};
  return sag({cut:cfg.cut,step:e});
}
function scale(f,n,label){const x=rationalNumber(f)*n;return '<div class="scale" aria-hidden="true"><i class="'+(x<0?'minus':'')+'" style="left:'+(x<0?50+48*x:50)+'%;width:'+Math.min(48,48*Math.abs(x))+'%"></i></div><div class="scaleNote">'+label+' · '+sign(x)+'</div>';}
export function readout(name,cfg,e,branch,d){
 const cleared=branch==='cleared';
 if(name==='paired'){
   const tick=[0,1,1,2,2][e],fr=d.frames[cleared&&e>=2?'cleared':'free'][tick],k=cfg.readout==='sum'?'sum':'contrast',seven=d.pairs===8?' across eight pairs':'',p=d.sites;
   const cols=k==='sum'?'Ordinary sum':'Signed difference';
   const prose=[
     'One unit of displacement sits at lifted site '+p.launch+'. Both routes project to site '+p.baseEndpoint+'. The lift records which route A took.',
     'Read the velocities at B’s two calibrated ports'+seven+'. The route puts the pulse on one member of each pair.',
     cleared?'The replay replaces the two positions in each selected pair by their mean. Their signed displacement is now zero. Both velocity readings survive.':'The update has written a route-dependent displacement into B’s two positions. The instrument holds this frame so you can inspect the record.',
     'B’s positions enter the next graph update at A. Read the source velocity at '+p.r+' relative to its partner '+p.zr+'.',
     cfg.readout==='sum'?'Adding the sheets gives the same return in both runs. Switch to the signed difference to recover the contribution from B’s record.':'A’s next response depends on what B became when it received A’s signal.'
   ];
   const rr=[
     [['A · lifted site',String(p.launch)],['Displacement at launch','+1'],[cols+' at source',sign(fr.source.x[k])],['Initial velocity','0']],
     [['Port '+(cfg.pairs===8?'j · total':p.j),sign(fr.receiver.u.plus)],['Port '+(cfg.pairs===8?'Zj · total':p.zj),sign(fr.receiver.u.minus)],[cols,sign(fr.receiver.u[k])]],
     [['B · position at j'+seven,sign(fr.receiver.x.plus)],['B · position at Zj'+seven,sign(fr.receiver.x.minus)],[cols+' in x',sign(fr.receiver.x[k])]],
     [['Source '+p.r,sign(fr.source.u.plus)],['Source '+p.zr,sign(fr.source.u.minus)],[cols+' in u',sign(fr.source.u[k])]],
     [['Free return',sign(d.return.free)],['Cleared return',sign(d.return.cleared)],['Free minus cleared',sign(d.return.delta)]]
   ];
   return {title:titleList[e],label:levels[e],text:prose[e],meters:meterRows(rr[e]),foot:e===1||e===2?scale(e===1?fr.receiver.u[k]:fr.receiver.x[k],24000/cfg.pairs,'Display ×24,000'+(cfg.pairs===8?' ÷ 8':'')):e===4?scale(d.return.delta,576000000/cfg.pairs,'Return difference ×576,000,000'+(cfg.pairs===8?' ÷ 8':'')):'Exact fractions · native graph units',clock:'Update '+tick+' / 2',time:tick,values:fr};
 }
 if(name==='sky'){
   const label=['Unit beam','Calibrated ports','Local register','Next apparatus tick','Matched readout'][e];
   const titles=['A signal arrives','Which port lights up?','B retains a comparison',cfg.feedback?'The local command acts':'The observer reads','What did the reference add?'];
   const prose=['The line of sight runs from the observer to the sky. Radiation travels the other way, into the local combiner.','B combines the entering field with its retained reference. The two outputs resolve their relative sign.','A local register can retain the signed difference between output powers. Clearing this register preserves the incoming intensity.',cfg.feedback?'The selected unit-gain controller sends the register to a calibration command at the next local tick.':'The passive observer records both powers. Select local feedback to apply a command on the next apparatus tick.','Reverse either calibrated input and compare the two port powers. A common reversal keeps their difference.'];
   const rows=e===0?[['Order',cfg.order===1?'AB':'BA'],['Incoming |b|²',d.incomingIntensity]]:e===3?[['Local feedback',d.local.enabled?'Connected':'Disconnected'],['Later command',sign(cleared?d.local.cleared:d.local.free)]]:e===2?[['Retained P₊ − P₋',sign(cleared?0:d.contrast)],['Incoming |b|²',d.incomingIntensity]]:[['P₊',num(d.plus)],['P₋',num(d.minus)],['P₊ − P₋',sign(d.contrast)],['Incoming |b|²',num(d.incomingIntensity)]];
   return {title:titles[e],label,text:prose[e],meters:meterRows(rows),foot:'Power in normalized input units · return local to B',clock:'Apparatus '+[0,1,1,2,2][e],time:[0,1,1,2,2][e],values:{incoming:d.incomingIntensity,ports:[d.plus,d.minus],contrast:d.contrast,retained:e>=2?(cleared?0:d.contrast):null,command:e>=3?(cleared?d.local.cleared:d.local.free):null}};
 }
 if(name==='flux'){
   const g=d.sample,f=d.fixed;
   if(e===4)return {title:f.reversal?'Transfer reverses':'Direction holds',label:'Fixed-cut intervention',text:'Replay the same writer and the same cut. Clear only the receiver’s signed position along d₁₁ at T/4. Compare transfer through 3T/8.',meters:meterRows([['Free net',sign(f.free,10)],['Cleared net',sign(f.cleared,10)],['Free minus cleared',sign(f.difference)]]),foot:'Positive is outward. Transfer is integrated in native energy units.',clock:'T/4 – 3T/8',time:f.interval,values:f};
   return {title:['A stored face wave','Read the crossings','A signed writing axis','Advance the wave'][e],label:g.mode==='cycle'?'Whole-period mean':'Instantaneous current',text:['A recovered encounter has deposited a wave on twenty faces. The selected cut divides those faces into an inside and an outside.','Each crossing has its own oriented energy current. Add outward and inward terms with their signs to read the cut.','The receiver stores a signed position along d₁₁. The fixed-cut comparison below tests clearing that component at T/4.','The current changes as position and velocity advance in their common oscillator plane.'][e],meters:meterRows([['Net current across Σ',sign(g.net)],['Outward rate',num(g.outward)],['Inward rate',num(g.inward)]]),foot:'Current unit: native energy per model time. Edges and accumulated traffic are below.',clock:num(g.phase)+' T',time:g.time,values:{mode:g.mode,net:g.net,period:g.period,interval:g.interval,traffic:g.traffic,edges:g.edges}};
 }
 if(name==='sag'){
   const x=cleared?d.cleared:d.free;
   const title=['An exterior pulse','Across the chosen cut','The detector retains','The two runs separate','A later source response'][e];
   return {title,label:'G1800 · t = '+d.time,text:['A unit perturbation starts at native source 61, six graph hops from detector 1136.','Inspect outward energy traffic across the selected shell and the response arriving at the distant port.',cleared?'Only detector 1136’s displacement is set to zero at t = 4. Its velocity and every other site are preserved.':'At t = 4 the detector holds a small signed displacement. This checkpoint is shared by both launches.','The changed detector state now propagates under the same exterior wave law.','Both runs began at source 61. The detector intervention changes the later displacement at the source.'][e],meters:meterRows([['Detector displacement',sign(x.receiver)],['Source displacement',sign(x.source)],['Net rate across cut',sign(x.net)]]),foot:'Native graph time and field units · direction fixed outward',clock:'t = '+d.time,time:d.time,values:x};
 }
 const g=d,eidx=[g.mark.index,g.arrival?.index??g.mark.index+3,g.checkpoint.index,g.return.index,g.later.index][e];
 const title=['Mark A’s beat',g.arrival?'B receives the tag':'The fields are independent','B’s tagged displacement','A’s next field velocity','Is there a return?'][e];
 const prose=['Each sitter’s heartbeat drives a field. Follow only the contribution from the selected beat in A’s schedule.',g.arrival?'The symmetric coupling transfers a contribution from A’s tagged beat to B.':'B still has its own heartbeat and field trace. With the coupling open, A’s marked beat contributes zero at B.',cleared?'Subtract the component at B attributable to the marked beat. B’s other displacement and both velocities survive.':'Linearity lets us measure how much of B’s field displacement came specifically from A’s marked beat.','The next kick at A reads B’s field. The measured return is free minus cleared velocity at A, in field units per second.','Compare the two field runs using identical beat schedules. The four aligned traces show when the intervention was made.'][e];
 const rr=[[['A beat',String(g.mark.ordinal)],['Beat time',num(g.mark.time)+' s']],[['Tagged B field',sign(g.arrival?.displacementB??0)],['Coupling',cfg.coupling?'On':'Off']],[['Tagged B field',sign(cleared?0:g.checkpoint.retainedB)],['Total B field',sign(cleared?g.checkpoint.clearedB:g.checkpoint.freeB)]],[['A field velocity',sign(cleared?g.return.clearedVelocityA:g.return.freeVelocityA)],['Free − cleared',sign(g.return.deltaVelocityA)]],[['Δ next A velocity',sign(g.return.deltaVelocityA)],['Δ later A field',sign(g.later.deltaFieldA)],['Mean beat gap',num(1000*g.timing.meanNearestBeatGapSeconds,4)+' ms']]];
 return {title,label:'Marked beat '+g.mark.ordinal,text:prose,meters:meterRows(rr[e]),foot:'Synthetic heartbeat schedules · fields in model units',clock:'t = '+num(g.time[eidx])+' s',time:g.time[eidx],values:{beat:g.mark.ordinal,index:eidx,heartA:g.heartA[eidx],heartB:g.heartB[eidx],fieldA:(cleared?g.clearedFieldA:g.fieldA)[eidx],fieldB:(cleared?g.clearedFieldB:g.fieldB)[eidx],taggedB:cleared&&e===2?0:cleared&&e>2?g.taggedFieldB[eidx]-(g.fieldB[eidx]-g.clearedFieldB[eidx]):g.taggedFieldB[eidx],nextVelocity:e>=3?(cleared?g.return.clearedVelocityA:g.return.freeVelocityA):null}};
}
export function compare(name,cfg,d){
 if(name==='paired')return pairBoxes('Free · source velocity',sign(d.return.free),'B cleared · source velocity',sign(d.return.cleared))+delta('Difference at A',sign(d.return.delta))+'<p class="hint">'+(cfg.readout==='sum'?'The two sheet velocities add to exactly the same value in both returns.':'One removed signed displacement changes the next update at the source. Positive and negative signs refer to the fixed sheet calibration.')+'</p>';
 if(name==='flux'){const f=d.fixed;return pairBoxes('Free · net energy',sign(f.free,11),'d₁₁ cleared · net energy',sign(f.cleared,11))+delta('Free minus cleared',sign(f.difference))+'<p class="hint">'+f.outcome+'. Both arms integrate T/4 to 3T/8 with the same outward orientation.</p>';}
 if(name==='sky')return pairBoxes('Next local command · free',sign(d.local.free),'Next local command · cleared',sign(d.local.cleared))+delta('Local command difference',sign(d.local.difference))+'<p class="hint">'+(d.local.enabled?'The explicitly connected register drives a future calibration command at B.':'Feedback is disconnected. The readout remains passive.')+'</p>';
 if(name==='sag'){const g=sag({cut:cfg.cut,step:4});const a=g.free.postTraffic.net,b=g.cleared.postTraffic.net;return pairBoxes('Free · A at t = 8',sign(g.free.source,10),'Cleared · A at t = 8',sign(g.cleared.source,10))+delta('Difference at A',sign(g.deltaSource))+'<p class="hint">Net outward transfer, t = 4 to 8: '+sign(a)+' free and '+sign(b)+' cleared. '+(a*b<0?'The transfer reversed.':'The transfer kept its direction.')+'</p>';}
 return pairBoxes('Free · A field velocity',sign(d.return.freeVelocityA,9),'Cleared · A field velocity',sign(d.return.clearedVelocityA,9))+delta('Difference at A',sign(d.return.deltaVelocityA))+'<p class="hint">Field units/s at '+d.return.time+' s. Both replays use beat schedule '+d.driveId+'.</p>';
}
