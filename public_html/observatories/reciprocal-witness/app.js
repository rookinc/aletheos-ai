import {profiles, compute, readout, compare, num, sign} from './presentation.js';
import {controls, special, skyMapPath} from './panels.js';
import {drawScene} from './visual.js';
import {methodHTML} from './methods.js';

const $=id=>document.getElementById(id);
const icons={
 paired:'<circle cx="8" cy="12" r="6"/><circle cx="16" cy="12" r="6"/>',
 flux:'<path d="M2 8c3 0 3-4 6-4s4 7 7 7 3-4 7-4M2 16c3 0 3-4 6-4s4 7 7 7 3-4 7-4"/>',
 sky:'<circle cx="12" cy="12" r="8"/><ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(43 12 12)"/><circle cx="15" cy="8" r="1"/>',
 sag:'<circle cx="12" cy="12" r="5"/><ellipse cx="12" cy="12" rx="11" ry="3.5" transform="rotate(-22 12 12)"/>',
 heart:'<path d="M2 12h5l2-5 3 12 3-15 2 8h5"/>'
};
const sticky={};for(const n in profiles)sticky[n]={...profiles[n].defaults};
const state={name:'paired',event:0,branch:'free',geometry:'face',outer:'B',camera:'external',orient:'global',running:false,guide:true,map:false,apparatus:true,compare:false};
const validHash=location.hash.slice(1);if(validHash in profiles)state.name=validHash;
if(state.name==='sky')state.outer='A';
let timer=0,paintRequest=0,record=null,engine=null,current=null,previousName=null;
const currentConfig=()=>sticky[state.name];
const sittersLink=document.createElement('a');
sittersLink.href='./sitters.html';
sittersLink.textContent='Open the two-sitter field loop';
sittersLink.className='textbutton';
sittersLink.id='sittersLink';
sittersLink.hidden=true;
$('sceneTitle').after(sittersLink);
const sourceLinks={
 paired:'./data/paired-provenance.json',flux:'./data/flux-provenance.json',sag:'./data/flux-provenance.json',sky:'./data/sky-provenance.json',heart:'./data/replay-sha256.json'
};
for(const [name,p] of Object.entries(profiles)){
 const b=document.createElement('button');b.type='button';b.dataset.scene=name;b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" aria-hidden="true">'+icons[name]+'</svg>'+p.tab;$('experiments').append(b);
 const o=document.createElement('option');o.value=name;o.textContent=p.tab;$('mobileExperiment').append(o);
}
function keyID(object){
 let hash=14695981039346656037n;const mask=(1n<<64n)-1n;
 for(const b of new TextEncoder().encode(JSON.stringify(object)))hash=((hash^BigInt(b))*1099511628211n)&mask;
 return hash.toString(16).padStart(16,'0');
}
function buildReceipt(branch,e,d,screen){
 const n=state.name,c=currentConfig();
 let inputs={...c};if(n==='paired')delete inputs.readout;
 if(n==='flux'&&e===4)inputs={cut:c.cut,writer:'archived matched encounter',transform:'original',intervalInPeriods:[.25,.375]};
 if(n==='flux'&&!inputs.forkOn){delete inputs.test;delete inputs.reference;}
 const version=d.sourceVersion??d.sample.sourceVersion;
 const launch='RW-'+keyID([n,inputs,version]).toUpperCase();
 const r={schema:'cori.reciprocal-witness/1',launchID:launch,experiment:profiles[n].title,runSeed:n==='heart'?c.seed:'Deterministic fixture · no random draw',sourceVersion:version,sourceManifest:sourceLinks[n],preparation:inputs,eventIndex:e,branch,clock:screen.clock,time:screen.time,orientation:'Fixed ledger. Positive crossing is from A side to B side. Port coordinates use their stated signed calibration.',route:null,reference:null,cut:null,intervention:null,values:screen.values};
 if(n==='paired'){
  r.route={selection:c.route,record:d.routeTrace,launch:d.sites.launch,projectedEndpoint:d.sites.baseEndpoint};r.reference={source:[d.sites.r,d.sites.zr],calibratedPorts:d.sites.ports.slice(0,c.pairs)};r.cut='Outside into selected B pairs';r.intervention=branch==='cleared'&&e>=2?'Selected B positions replaced by their pair mean after update 1. All velocities retained.':'Free evolution';
  if(e>=3)r.counterfactual={signedFreeMinusCleared:d.return.signedDelta,ordinaryFreeMinusCleared:d.return.sumDelta};
  if(e===4)r.boundaryEnergy=d.flux[branch];
 }else if(n==='flux'){
  r.route='Encounter writer and free stored face wave';r.reference='Registered position axis d11';r.cut={inside:d.fixed.cutFaces,positive:'Inside to outside'};r.forkController=d.fork;r.intervention=e===4&&branch==='cleared'?'Remove signed position along normalized d11 at T/4. Preserve every velocity.':(e===4?'Free writer replay':c.control);if(e===4)r.values={net:d.fixed[branch],traffic:branch==='free'?d.fixed.freeTraffic:d.fixed.clearedTraffic,interval:d.fixed.interval,positionProjection:branch==='free'?d.fixed.retainedBefore:d.fixed.retainedAfter};
 }else if(n==='sky'){
  r.route=c.order===1?'AB':'BA';r.reference={sign:c.reference,phaseDegrees:c.phaseDeg,averaged:c.averaged,previousTriad:d.fork.reference};r.cut='Local input combiner';r.intervention=branch==='cleared'&&e>=2?'Clear local signed power register':'Free apparatus';r.forkScores=d.fork;r.feedback=d.local.enabled;
 }else if(n==='sag'){
  r.route='Exterior source 61 to detector 1136 on G1800';r.reference='Zero field with a unit source displacement';r.cut={radiusHops:d.cutRadius,edgeCount:d.edgeCount,positive:'Outward'};r.intervention=branch==='cleared'&&e>=2?'At t=4 set x(1136)=0 and preserve velocity':'Free graph wave';
 }else{
  r.route='Marked A beat to B and subsequent response at A';r.reference='Same A and B schedules in both branches';r.cut=d.receipts.free.cut;r.intervention=branch==='cleared'&&e>=2?'Subtract B displacement due only to the marked A beat':'Free fields';r.driveID=d.driveId;r.mark=d.mark;r.beatIndices={A:d.receipts.free.beatIndicesA,B:d.receipts.free.beatIndicesB};r.parameters=d.parameters;
 }
 r.receiptID=launch+'-'+e+'-'+(branch==='free'?'F':'C')+'-'+keyID([r.values,r.intervention]).slice(-6).toUpperCase();
 return r;
}
function stop(){clearTimeout(timer);timer=0;state.running=false;}
function sceneData(){
 const n=state.name,c=currentConfig(),e=state.event,d=engine;
 let names=profiles[n].names.map(x=>x.replace(/^[AB] · /,''));
 let live=true,canReturn=true,forward;
 if(n==='heart'){live=c.coupling;canReturn=c.coupling;}
 if(n==='sky'){live=state.apparatus;canReturn=c.feedback&&d.local.difference!==0&&state.branch==='free';}
 if(n==='flux'){const v=e===4?d.fixed[state.branch]:d.sample.net;live=Math.abs(v)>1e-12;forward=v>=0;}
 return {scenario:n,geometry:state.geometry,outer:state.outer,camera:state.camera,event:e,route:c.route,canReturn,live,forward,cleared:state.branch==='cleared',nameA:'A · '+names[0],nameB:'B · '+names[1],cutIndex:['near','middle','far'].indexOf(c.cut),portA:n==='paired'?String(engine.sites.launch):'',portB:n==='paired'?(c.route==='preserve'?'j · '+engine.sites.j:'Zj · '+engine.sites.zj):''};
}
function paint(animate=false){cancelAnimationFrame(paintRequest);if(!engine)return;
 const s=sceneData(),canvas=$('scene');const x=performance.now(),should=animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&(s.event===1||s.event===3);
 function frame(t){const fraction=should?Math.min(1,(t-x)/560):1;drawScene(canvas,s,Math.max(0,fraction));if(fraction<1)paintRequest=requestAnimationFrame(frame);}
 frame(x);
}
function cameraUpdate(){
 const n=state.name,p=profiles[n];
 $('face').setAttribute('aria-pressed',String(state.geometry==='face'));$('nest').setAttribute('aria-pressed',String(state.geometry==='nested'));$('outerLabel').hidden=state.geometry!=='nested';
 $('camera').value=state.camera;$('outer').value=state.outer;$('orient').value=state.orient;
 $('orientNote').textContent=state.orient==='global'?'Ledger direction is positive A→B. Port signs follow the fixed sheet or field calibration.':'B-local outward points B→A. A→B reads −1 on this directional ruler and +1 in the fixed ledger. Port calibration and receipts stay fixed.';
 $('scene').setAttribute('aria-label',p.title+'. '+(state.geometry==='face'?'Facing spheres':'Nested spheres, '+state.outer+' outside')+'. '+(state.camera==='external'?'External comparison':'View from '+state.camera)+'. '+current.title+'. '+current.text);
 $('legendA').textContent=p.names[0];$('legendB').textContent=p.names[1];$('legendS').textContent=p.names[2];
 const outward=state.orient==='B';$('directionReadout').hidden=!outward;$('directionReadout').textContent='B-local ruler · A→B −1 · B→A +1';
 const swap=n==='sky'&&!state.apparatus;$('skyLayer').hidden=!swap;if(swap)$('skyLayer').innerHTML=state.map?'<img src="'+skyMapPath+'" alt="Planck PR3 SMICA quadrupole and octupole temperature map in thermodynamic microkelvin">':'<p>Choose a sky or apparatus layer below.</p>';
 paint();
}
function buttonText(){
 const e=state.event,n=state.name;const next=state.running?'Pause':e===0?'Replay one encounter':e===1?'Continue':e===2?'Continue to return':e===3?(n==='flux'?'Test receiver intervention':state.branch==='cleared'?'Compare both runs':'Replay counterfactual'):'Replay one encounter';
 $('primary').innerHTML='<span aria-hidden="true">'+(state.running?'Ⅱ':e===0||e===4||e===3&&n!=='flux'?'↻':'▷')+'</span> '+next;$('play').innerHTML='<span aria-hidden="true">'+(state.running?'Ⅱ':'▷')+'</span> '+(state.running?'Pause':'Play');$('play').setAttribute('aria-label',state.running?'Pause':'Play');
}
function render(controlsDirty=true,animate=false){
 const n=state.name,e=state.event,c=currentConfig(),p=profiles[n];
 const focus=document.activeElement?.dataset?.set;
 const priorDetails=[...$('special').querySelectorAll('details[open]')].map(x=>x.querySelector('summary')?.textContent);
 engine=compute(n,c,e);current=readout(n,c,e,state.branch,engine);record=buildReceipt(state.branch,e,engine,current);
 $('mobileExperiment').value=n;for(const b of $('experiments').querySelectorAll('button'))b.setAttribute('aria-pressed',String(b.dataset.scene===n));
 sittersLink.hidden=n!=='heart';
 $('sourceLabel').textContent=p.source;$('sceneTitle').textContent=p.title;
 $('eventBadge').textContent=current.label;$('rdtitle').textContent=current.title;$('explain').textContent=current.text;$('meters').innerHTML=current.meters;$('rdfoot').innerHTML=current.foot;
 if(n==='sky'&&!state.apparatus){$('rdtitle').textContent=state.map?'Measured temperature modes':'Sky receiver';$('eventBadge').textContent='Observational context';$('explain').textContent=state.map?'These twelve real coefficients reconstruct the measured quadrupole and octupole on a Galactic sky.':'Enable a display layer to inspect the sky or local phase receiver.';$('meters').innerHTML=state.map?'<div class="meter"><span>Temperature units</span><b>µK CMB</b></div><div class="meter"><span>Multipoles</span><b>ℓ = 2, 3</b></div>':'';$('rdfoot').textContent='The instrument retains the selected phase preparation for replay.';}
 $('clock').textContent=current.clock+' · '+(state.branch==='free'?'free':'cleared');
 $('track').innerHTML=p.stages.map((label,i)=>'<button data-event="'+i+'" '+(i===e?'aria-current="step"':'')+' class="'+(i<e?'done':'')+'" aria-label="Checkpoint '+(i+1)+', '+label+'">'+label+'</button>').join('');
 if(controlsDirty)$('physicalControls').innerHTML=controls(n,c,engine);
 $('special').innerHTML=special(n,c,engine,state);if(previousName===n)for(const el of $('special').querySelectorAll('details'))if(priorDetails.includes(el.querySelector('summary')?.textContent))el.open=true;
 $('witnessLead').textContent={paired:'Compare A’s next signed source velocity after leaving B’s position free or clearing its retained difference.',flux:'Compare integrated energy through the same cut during the same interval after the receiver intervention.',sky:'Compare future local commands from the intact and cleared contrast register.',sag:'Compare source and detector signals with the same exterior pulse and the same shell.',heart:'Read the return beyond the common cue by comparing A’s next field velocity under identical heartbeat schedules.'}[n];
 if(n==='paired'&&c.readout==='sum')$('witnessLead').textContent='Add the two sheet velocities at A in each run. Compare the sums after clearing only B’s signed position.';
 let comparison='';
 if(state.compare||e===4){const g=compute(n,c,4);const ids=['free','cleared'].map(arm=>buildReceipt(arm,4,g,readout(n,c,4,arm,g)).receiptID);
 comparison=compare(n,c,g)+'<p class="hint oneLine">Free '+ids[0]+'<br>Cleared '+ids[1]+'</p>';}
 $('comparison').innerHTML=comparison;$('compare').textContent=state.compare&&e!==4?'Hide comparison':'Compare receipts';
 $('ledger').textContent=JSON.stringify(record,null,2);
 if(previousName!==n){const m=methodHTML(n);$('walkthrough').innerHTML=m.walk;$('equations').innerHTML=m.eq;$('sources').innerHTML=m.sources;}
 previousName=n;cameraUpdate();buttonText();
 if(focus&&controlsDirty){const el=document.querySelector('[data-set="'+focus+'"]');if(el)el.focus({preventScroll:true});}
 if(animate)paint(true);
 $('notice').textContent=current.title+'. '+current.clock+'. '+(e===2&&!state.running?'Paused at the retained state. ':'')+(e===4?current.text:'');
}
function move(e,animate=true){state.event=e;state.compare=e===4;render(false,animate);}
function advance(){
 const next=state.event+1;if(next>4){stop();buttonText();return;}
 if(next===2&&state.guide&&state.branch==='free'||next===3&&state.guide&&state.branch==='free'||next===4)stop();
 move(next);if(state.running)timer=setTimeout(advance,1200);
}
function play(guided=false){
 if(state.running){stop();buttonText();return;}
 if(state.event===4){state.event=0;state.branch='free';state.compare=false;}
 state.guide=guided;state.running=true;render(false);timer=setTimeout(advance,950);
}
function replay(branch='free',guided=true){stop();state.branch=branch;state.event=0;state.compare=false;play(guided);}
function selectScenario(n){
 if(!(n in profiles))return;stop();state.name=n;state.event=0;state.branch='free';state.compare=false;state.guide=true;state.outer=n==='sky'?'A':'B';state.geometry='face';state.camera='external';state.orient='global';$('ledger').hidden=true;$('ledgerButton').textContent='Open event receipt';render();
 if(history.replaceState){try{history.replaceState(null,'','#'+n);}catch{}}
}
function alter(key,value){
 const cfg=currentConfig();if(!(key in cfg))return;
 if(typeof cfg[key]==='number')value=Number(value);cfg[key]=value;stop();render();
}
$('experiments').onclick=e=>{const b=e.target.closest('[data-scene]');if(b)selectScenario(b.dataset.scene);};
$('mobileExperiment').onchange=e=>selectScenario(e.target.value);
$('face').onclick=()=>{state.geometry='face';cameraUpdate();};
$('nest').onclick=()=>{state.geometry='nested';cameraUpdate();};
for(const k of ['camera','outer','orient'])$(k).onchange=e=>{state[k]=e.target.value;cameraUpdate();};
$('primary').onclick=()=>{
 if(state.running){stop();buttonText();return;}
 if(state.event===3){if(state.name==='flux'||state.branch==='cleared'){move(4);return;}replay('cleared',false);return;}
 if(state.event===0||state.event===4){replay();if(matchMedia('(max-width:700px)').matches)$('instrument').scrollIntoView({block:'start',behavior:'instant'});return;}play(true);
};
$('reset').onclick=()=>replay();$('play').onclick=()=>play(false);
$('step').onclick=()=>{stop();if(state.event===4){state.branch='free';move(0);}else move(state.event+1);};
$('track').onclick=e=>{const b=e.target.closest('[data-event]');if(!b)return;stop();move(Number(b.dataset.event));};
$('compare').onclick=()=>{state.compare=!state.compare;render(false);};
$('ledgerButton').onclick=()=>{$('ledger').hidden=!$('ledger').hidden;$('ledgerButton').textContent=$('ledger').hidden?'Open event receipt':'Close event receipt';};
$('export').onclick=()=>{
 const n=state.name,c=currentConfig(),g=compute(n,c,4);
 const receipts=['free','cleared'].map(branch=>Array.from({length:5},(_,e)=>{const d=compute(n,c,e);return buildReceipt(branch,e,d,readout(n,c,e,branch,d));}));
 const result={format:'Reciprocal Witness Observatory / replay 1',current:record,free:receipts[0],cleared:receipts[1]};
 if(n==='paired'){result.exactReturn=g.return;result.energyCut=g.flux;}if(n==='flux')result.fixedCut=g.fixed;
 if(n==='heart'){result.heartbeatSchedules=g.receipts;result.return=g.return;result.later=g.later;}
 const blob=new Blob([JSON.stringify(result,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=record.receiptID+'.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);$('notice').textContent='JSON export prepared for '+record.receiptID+'.';
};
document.addEventListener('change',e=>{const el=e.target;if(el.dataset?.set)alter(el.dataset.set,el.type==='checkbox'?el.checked:el.value);});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-cmd]');if(!b)return;
 const c=currentConfig(),k=b.dataset.cmd;stop();
 if(k==='sky'){selectScenario('sky');$('instrument').scrollIntoView();return;}
 if(k==='map'||k==='apparatus')state[k]=!state[k];
 if(k==='cycle')c.mode=c.mode==='cycle'?'instant':'cycle';
 if(k==='order'||k==='both')c.order*=-1;
 if(k==='reference'||k==='both')c.reference=-c.reference || 0;
 if(['independent','shared','coupled'].includes(k)){c.cue=k!=='independent';c.coupling=k==='coupled';state.event=0;state.branch='free';state.compare=false;}
 render();
});
const ro=new ResizeObserver(()=>paint());ro.observe($('visual'));
render();
