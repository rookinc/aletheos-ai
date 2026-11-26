import {ENCOUNTERS, twoSitters} from './loop-transport.js';
import {dartPairAt, DART_PAIRS} from './dart-orbits.js';
import {fieldRenderer, phasePlot, rhythmStrip} from './loop-view.js?v=orthogonal-1';
import {orthogonalRenderer} from './orthogonal-view.js?v=layers-2';

const $ = id => document.getElementById(id);
const controls = ['rateA', 'rateB', 'gap', 'window', 'openA', 'openB'];
const pairs = ['Cyan / red', 'Magenta / green', 'Yellow / blue'];
const drawField = fieldRenderer($('fieldCanvas'));
const statuses = {
  'free': 'Independent clocks', 'outside capture': 'Outside capture', 'settling': 'Pulling together',
  'passing through capture': 'Passing through', 'locked': 'Phase locked'
};
const explain = {
  'free': 'A closed gate leaves each clock at its own resting rate.',
  'outside capture': 'Both are open. Their phase gap is outside the range where the clocks can adjust.',
  'settling': 'Both are open and within range. The leading clock slows and the trailing clock speeds up relative to their resting rates.',
  'passing through capture': 'The clocks can feel each other within this window. Their resting rates are too far apart to hold a steady gap here.',
  'locked': 'Both clocks now keep the same rhythm and hold a steady beat spacing.'
};
const signed = x => (x < -.049 ? '−' : x > .049 ? '+' : '') + Math.abs(x).toFixed(1) + '°';
const ms = t => Math.round(t * 1000) + ' ms';
function lead(gap) {
  if (Math.abs(gap) < .05) return 'A and B are in phase';
  if (Math.abs(Math.abs(gap)-180)<.05) return 'A and B are half a cycle apart';
  return (gap > 0 ? 'B leads A by ' : 'A leads B by ') + Math.abs(gap).toFixed(1) + '°';
}

let config = {...ENCOUNTERS.inside};
let model = twoSitters(config);
let t = 0, speed = 1, tail = 20, pair = 'all', activeStep = -1;
let playing = !matchMedia('(prefers-reduced-motion: reduce)').matches;
let lastTick = null, lastPaint = -Infinity, lastReadout = -Infinity, request = 0;
let scrubCycle = null, comparisonStart = null, comparisonModel = null;
let field = 'spheres', orthogonal = null;
const colorNames = [['Cyan','red'],['Magenta','green'],['Yellow','blue']];

function syncChartTools(){
  $('chartCamera').value=orthogonal.cameraName;
  const name=orthogonal.cameraName==='seated'?'Seated view':orthogonal.cameraName==='oblique'?'Oblique':orthogonal.cameraName==='custom'?'Free orbit':'Along '+orthogonal.cameraName.toUpperCase();
  $('chartSummary').textContent=name+' · '+orthogonal.copy+' chart';
}
function selectField(next) {
  field=next==='orthogonal'?'orthogonal':'spheres';
  const inChart=field==='orthogonal';
  $('fieldCanvas').hidden=inChart;
  $('orthCanvas').hidden=!inChart;
  $('chartTools').hidden=!inChart;
  $('chartLegend').hidden=!inChart;
  $('layerAlpha').hidden=!inChart;
  $('spheresView').setAttribute('aria-pressed',String(!inChart));
  $('orthogonalView').setAttribute('aria-pressed',String(inChart));
  $('sitterTitle').innerHTML=inChart?'Orthogonal <em>field loop</em>':'Two-sitter <em>field loop</em>';
  $('sitterIntro').textContent=inChart?'Two seated hearts share one G9000 field. A beat from each sitter advances the six colored darts.':'A beat from each sitter advances the darts. Open both heart clocks to let their rhythms pull together.';
  document.title=(inChart?'Two sitters in the orthogonal field':'Two-sitter field loop')+' · Reciprocal Witness Observatory';
  if(inChart && !orthogonal){
    orthogonal=orthogonalRenderer($('orthCanvas'),()=>{syncChartTools();paint(false);});
    syncChartTools();
  }
  paint();
}
function chooseField(next){
  selectField(next);
  if(location.protocol==='https:'||location.protocol==='http:'){
    const url=new URL(location.href);
    if(field==='orthogonal')url.searchParams.set('field',field);else url.searchParams.set('field','spheres');
    history.replaceState(history.state,'',url);
  }
}
function enableFields(){
  // An already-open, cached first-edition document can use the same clock script.
  if(!$('orthogonalView'))return;
  $('spheresView').addEventListener('click',()=>chooseField('spheres'));
  $('orthogonalView').addEventListener('click',()=>chooseField('orthogonal'));
  for(const [id,key] of [['chartCamera','camera'],['chartCopy','copy'],['chartMerge','merge'],['chartLight','light'],['chartOthers','others']]){
    const control=$(id);
    control.addEventListener(control.type==='range'?'input':'change',()=>{
      orthogonal.setting(key,control.type==='checkbox'?control.checked:control.value);
      $('mergeReading').textContent=$('chartMerge').value+'%';
      $('lightReading').textContent=$('chartLight').value+'%';
      syncChartTools();paint(false);
    });
  }
  for(const layer of ['tracer','arrow']){
    const slider=$(layer+'Alpha');
    slider.addEventListener('input',()=>{
      orthogonal.setting(layer,slider.value);
      $(layer+'Percent').textContent=slider.value+'%';
      paint(false);
    });
  }
  selectField(new URLSearchParams(location.search).get('field')||'orthogonal');
}

function showAddresses(step) {
  const table = document.createElement('table'), row = table.insertRow();
  for (const heading of ['Dart pair', 'A · CMY', 'B · RGB']) {
    const th = document.createElement('th'); th.scope='col'; th.textContent=heading; row.append(th);
  }
  DART_PAIRS.forEach((_, i) => {
    const {a,b} = dartPairAt(i,step), r = table.insertRow();
    [pairs[i], String(a.id), String(b.id)].forEach(v=>{r.insertCell().textContent=v;});
  });
  $('addresses').replaceChildren(table);
}
function showReadout(state) {
  const c = state.clocks;
  $('bpmA').textContent = c.bpmA.toFixed(1) + ' bpm';
  $('bpmB').textContent = c.bpmB.toFixed(1) + ' bpm';
  $('gapReading').textContent = lead(c.gapDeg);
  $('lockState').textContent = statuses[c.status];
  $('clockStory').textContent = (comparisonStart ? 'Same launch and elapsed time. ' : '') + explain[c.status];
  $('controlReading').textContent = 'At ' + t.toFixed(2) + ' s, selected gap ' + signed(c.gapDeg) +
    ' · both closed ' + signed(state.closed.gapDeg) + '. Positive means B leads A.';
  $('time').textContent = t.toFixed(2) + ' s';
  $('wait').textContent = state.last ? ms(state.last.wait) : 'Awaiting pair';
  $('returns').textContent = String(state.returns);
  const shortState = {'free':'Closed','outside capture':'Outside','settling':'In range','passing through capture':'Passing','locked':'Locked'}[c.status];
  $('scopeStatus').textContent = shortState + ' · ' + c.absGapDeg.toFixed(1) + '°';
  $('orbitReading').textContent = 'F' + state.phase + ' / 20';
  $('orbitStatus').textContent = 'Cycle ' + state.cycle + ' · ' + (state.phase===0 ? 'Launch addresses' :
    state.phase===10 ? 'Darts at partner addresses' : state.phase===20 ? 'All darts home' : 'Native step ' + state.n);
  $('scrub').value = state.phase;
  $('scrub').setAttribute('aria-valuetext','Cycle '+state.cycle+', native step '+state.phase+' of 20');
  const recent = state.last ? 'Last paired beat at '+state.last.t.toFixed(3)+' s. The two arrivals were '+ms(state.last.wait)+' apart.' : 'The first paired beat will advance the six darts one address.';
  $('gateState').textContent = (state.waiting ? 'Sitter '+state.waiting+' has arrived and is waiting. ' : '') + recent;
  const scope = $('scope');
  scope.dataset.nativeStep = state.n; scope.dataset.time = t.toFixed(5); scope.dataset.playing = String(playing);
  if(field==='orthogonal'){
    const i=pair==='all'?0:Number(pair),sites=dartPairAt(i,state.n);
    $('chartSites').textContent=colorNames[i][0]+' '+sites.a.id+' · '+colorNames[i][1]+' '+sites.b.id;
  }
  if(activeStep!==state.n){showAddresses(state.n);activeStep=state.n;}
  rhythmStrip($('ecgA'),model.clock,t,'A');
  rhythmStrip($('ecgB'),model.clock,t,'B');
  phasePlot($('gapPlot'),model.clock,t,config.window);
}
function paint(readouts=true) {
  const state = model.at(t);
  if(field==='orthogonal')orthogonal.draw(state,{pair,tail});
  else drawField(state,{pair,tail});
  if(readouts) showReadout(state);
}
function frame(now) {
  request=0;
  if(!playing || document.hidden) return;
  if(lastTick!==null) t += (now-lastTick)*.001*speed;
  lastTick=now;
  if(now-lastPaint>=1000/30){
    const read=now-lastReadout>=100;
    paint(read);lastPaint=now;if(read)lastReadout=now;
  }
  request=requestAnimationFrame(frame);
}
function resetTimer(){
  lastTick=null;lastPaint=-Infinity;lastReadout=-Infinity;
  if(request)cancelAnimationFrame(request);
  request=playing&&!document.hidden ? requestAnimationFrame(frame) : 0;
}
function setPlaying(on){
  playing=on;
  $('run').textContent=playing?'Pause':'Play';
  $('run').setAttribute('aria-label',playing?'Pause loop':'Play loop');
  resetTimer();paint();
}
function seek(step){
  t=model.timeForStep(step);setPlaying(false);
  $('announce').textContent=$('orbitStatus').textContent+'. '+$('gapReading').textContent+'.';
}
function refreshLabels(){
  $('rateAVal').textContent=$('rateA').value+' bpm';
  $('rateBVal').textContent=$('rateB').value+' bpm';
  $('phaseVal').textContent=signed(Number($('gap').value));
  $('windowVal').textContent='±'+$('window').value+'°';
}
function setConfig(next, elapsed=0, matchedStart=null){
  comparisonStart=matchedStart;
  comparisonModel=matchedStart?twoSitters(matchedStart):null;
  config={...next};model=twoSitters(config);t=elapsed;activeStep=-1;scrubCycle=null;
  const compare=$('matched');
  compare.disabled=!comparisonStart&&(!config.openA||!config.openB);
  compare.textContent=comparisonStart?'Restore open':'Compare closed';
  compare.title=comparisonStart?'Restore the open replay at this same time':'Replay to this same time with B closed';
  for(const id of controls){
    if(typeof config[id]==='boolean')$(id).checked=config[id];else $(id).value=config[id];
  }
  document.querySelectorAll('[data-preset]').forEach(b=>{
    const options=ENCOUNTERS[b.dataset.preset];
    b.setAttribute('aria-pressed',String(controls.every(id=>config[id]===options[id])));
  });
  refreshLabels();resetTimer();paint();
}
for(const id of controls){
  const el=$(id);
  if(el.type==='range')el.addEventListener('input',refreshLabels);
  el.addEventListener('change',()=>setConfig({...config,[id]:el.type==='checkbox'?el.checked:Number(el.value)}));
}
document.querySelectorAll('[data-preset]').forEach(b=>b.addEventListener('click',()=>setConfig(ENCOUNTERS[b.dataset.preset])));
$('run').addEventListener('click',()=>setPlaying(!playing));
$('restart').addEventListener('click',()=>{t=0;scrubCycle=null;setPlaying(playing);$('announce').textContent='Returned to the same launch.';});
$('speed').addEventListener('change',()=>{speed=Number($('speed').value);resetTimer();});
$('matched').addEventListener('click',()=>{
  const elapsed=t, original=comparisonStart;
  setPlaying(false);
  if(original)setConfig(original,elapsed);
  else setConfig({...config,openB:false},elapsed,{...config});
  $('announce').textContent='Same launch, '+elapsed.toFixed(2)+' seconds. '+$('lockState').textContent+'. '+$('gapReading').textContent+'.';
});
$('nextGate').addEventListener('click',()=>seek(model.at(t).n+1));
$('jumpSwap').addEventListener('click',()=>{
  const {n}=model.at(t);let swap=Math.floor(n/20)*20+10;if(swap<=n)swap+=20;seek(swap);
});
$('jumpReturn').addEventListener('click',()=>seek((Math.floor(model.at(t).n/20)+1)*20));
$('scrub').addEventListener('pointerdown',()=>{scrubCycle=model.at(t).cycle;});
$('scrub').addEventListener('input',e=>{
  if(scrubCycle===null)scrubCycle=model.at(t).cycle;
  seek((scrubCycle-1)*20+Number(e.target.value));
});
$('scrub').addEventListener('change',()=>{scrubCycle=null;});
$('scrub').addEventListener('blur',()=>{scrubCycle=null;});
$('trail').addEventListener('change',()=>{tail=Number($('trail').value);paint();});
$('pair').addEventListener('change',()=>{pair=$('pair').value;paint();});
$('receipt').addEventListener('click',()=>{
  const data=model.receipt(t,tail,pair);
  if(field==='orthogonal')data.display.orthogonal=orthogonal.registration(model.at(t));
  if(comparisonModel){
    const open=comparisonModel.at(t);
    data.matchedOpenReplay={config:comparisonModel.clock.config,clock:open.clocks,nativeStep:open.n,lastPairedBeat:open.last};
  }
  const blob=new Blob([JSON.stringify(data,null,2)+'\n'],{type:'application/json'});
  const a=document.createElement('a'),url=URL.createObjectURL(blob);
  a.download='two-sitter-step-'+data.nativeStep+'.json';a.href=url;document.body.append(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),2000);
});
document.addEventListener('visibilitychange',resetTimer);
new ResizeObserver(()=>paint()).observe($('scope'));
window.addEventListener('resize',()=>paint());
enableFields();setConfig(config,field==='orthogonal'?model.timeForStep(33):0);setPlaying(playing);
