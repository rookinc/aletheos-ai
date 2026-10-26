import {sha256} from './kernel.mjs';
import {buildGeometry} from './living-geometry.mjs';
import {createExperiment,stepExperiment,reverseExperiment,resetHistory,exportConfiguration,exportSnapshot,exportReceipt,restoreExperiment} from './living-kernel.mjs';
import {loadRegistered,registeredStep,harmonicSummary,registeredReturnReceipt} from './living-harmonics.mjs';
import {LivingRenderer} from './living-renderer.mjs';

const $=id=>document.getElementById(id), pretty=x=>JSON.stringify(x,null,2);
const MODES={geometry:['FINITE GEOMETRY / EXACT ADJACENCY','Native structure','NATIVE CARRIERS / VISUALIZATION EMBEDDINGS','Explore source geometry, quotient fibers, and registered carriers.'],waltz:['NATIVE THREE-BEAT SUCCESSOR','The Thalean Waltz','NATIVE WALKER / EXPERIMENTAL REGISTER','One moving event. Three steps return. Six positions register the Waltz.'],harmonics:['FIVE-FRAME FOURIER DECOMPOSITION','Opening & recombination','NATIVE TRANSPORT / DERIVED FOURIER PROJECTORS','Five frame channels. One common mode. Two conjugate pairs.'],memory:['CONTROLLED EXPERIMENT / SHARED INITIAL STATE','Memory laboratory','EXPERIMENTAL GRAPH-LOCAL BACKACTION','Identical seed and initial state. History changes only B’s transition probabilities.']};
let geometry,registered,exp,renderer,sources,returnReceipt,mode='waltz',selectedQ=0,selectedVertex=0,playing=false,ready=false,busy=false,dirty=true,blend=0,lastStep=performance.now(),fpsFrames=0,fpsStart=performance.now(),frameHandle,timerHandle,noticeTimer;
let registeredState={frame:0,x:0},harmonics=harmonicSummary([1,0,0,0,0]),action='F';
function notice(text){$('notice').textContent=text;$('notice').classList.add('show');clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>$('notice').classList.remove('show'),4200);}
function guard(fn){return async(...args)=>{try{await fn(...args);}catch(e){notice(e.message);console.error(e);}};}
function configFromUI(){return {seed:Number($('seed').value),initialQ:Number($('root').value)-1,initialEdge:Number($('edge-index').value),memoryEnabled:$('memory-enabled').checked,memoryStrength:Number($('strength').value),retention:Number($('retention').value),feedbackGain:Number($('gain').value),historyDepth:Number($('history-depth').value),tracePersistence:Number($('trace-depth').value)};}
function reflectConfig(){const c=exp.config;for(const[id,key]of Object.entries({seed:'seed',strength:'memoryStrength',retention:'retention',gain:'feedbackGain','history-depth':'historyDepth','trace-depth':'tracePersistence','edge-index':'initialEdge'}))$(id).value=c[key];$('root').value=c.initialQ+1;$('memory-enabled').checked=c.memoryEnabled;outputs();}
function outputs(){for(const [i,o] of [['speed','speed-output'],['strength','strength-output'],['retention','retention-output'],['gain','gain-output']])$(o).textContent=$(i).value+(i==='speed'?' encounters/s':'');}
function setPlaying(value){playing=value&&ready&&!busy;$('play').textContent=playing?'Ⅱ':'▶';$('play').setAttribute('aria-label',playing?'Pause':'Play');lastStep=performance.now()-blend*(1000/Number($('speed').value));dirty=true;}
function regInitial(){return {frame:0,x:registered.toG900.indexOf(exp.config.initialQ)};}
function syncDerived(){
 registeredState=registeredStep(registered,regInitial(),action,exp.tick);
 const excitation=$('excitation')?.value||'localized';
 const init=excitation==='common'?[1,1,1,1,1].map(v=>v/Math.sqrt(5)):excitation==='paired'?[1,0,-1,0,0].map(v=>v/Math.sqrt(2)):[1,0,0,0,0];
 const shift=action==='K'?0:exp.tick%5;
 harmonics=harmonicSummary(Array.from({length:5},(_,f)=>init[(f-shift+5)%5]));dirty=true;
}
function step(){if(exp.tick>=10000){setPlaying(false);notice('10,000 encounters reached. Export the run or restart.');return;}stepExperiment(exp);lastStep=performance.now();blend=0;syncDerived();updateUI();}
function restart(){exp=createExperiment(geometry,configFromUI());selectedQ=exp.config.initialQ;blend=0;lastStep=performance.now();syncDerived();updateUI();}
async function rerun(ticks=exp.tick){
 if(busy)return;const wasPlaying=playing;setPlaying(false);busy=true;document.querySelectorAll('button,input,select').forEach(el=>el.disabled=true);
 try{exp=createExperiment(geometry,configFromUI());for(let i=0;i<ticks;i++){stepExperiment(exp);if(i%100===99)await new Promise(r=>setTimeout(r,0));}blend=1;syncDerived();updateUI();}
 finally{busy=false;document.querySelectorAll('button,input,select').forEach(el=>el.disabled=false);updateUI();setPlaying(wasPlaying);}
}
function setMode(next){if(!MODES[next])return;mode=next;document.querySelectorAll('[data-mode]').forEach(b=>{b.classList.toggle('active',b.dataset.mode===next);b.setAttribute('aria-pressed',String(b.dataset.mode===next));});
 const [k,t,b,c]=MODES[next];$('view-kicker').textContent=k;$('view-title').textContent=t;$('mode-badge').textContent=b;$('viewport-caption').textContent=c;
 $('harmonic-panel').hidden=next!=='harmonics';$('comparison-panel').hidden=next!=='memory';$('memory-controls').hidden=next!=='memory';$('dynamics-title').textContent=next==='memory'?'History & feedback':'Motion & registration';
 $('carrier').value=next==='harmonics'?'g9000':next==='memory'?'g900':next==='waltz'?'pair':$('carrier').value;
 history.replaceState(null,'','#'+next);dirty=true;if(ready)updateUI();
}
function select(item){if(item.type==='g60'){selectedVertex=item.index;const pairs=geometry.quotient.orbits[selectedQ];$('selection').textContent=`${item.factor||'Left'} vertex ${item.index+1}\nStored index ${item.index}\nNeighbors: ${geometry.g60.adj[item.index].map(v=>v+1).join(', ')}\nSelect a directed edge below to change the walker.`;}else{selectedQ=item.index;const o=geometry.quotient.orbits[selectedQ];$('selection').textContent=`G900 state ${selectedQ+1} · index ${selectedQ}\nPairs (one-based):\n${o.map(([a,b])=>`(${a+1}, ${b+1})`).join(' ')}\nNeighbors: ${geometry.quotient.adj[selectedQ].map(v=>v+1).join(', ')}\nFactor-exchange fixed: ${geometry.quotient.fixedLocus.includes(selectedQ)}`;$('root').value=selectedQ+1;}dirty=true;}
function memorySpectrum(run){const amplitudes=Array(5).fill(0);run.history.forEach((v,q)=>{amplitudes[q%5]+=v;});const total=amplitudes.reduce((a,b)=>a+b,0)||1;return harmonicSummary(amplitudes.map(v=>v/total)).energy;}
function updateUI(){
 const e=geometry.directedEdges[exp.walker],tri=geometry.g60.triangles[geometry.triangleForEdge[exp.walker]],r=registeredState,m=exp.metrics;
 $('tick-value').textContent=exp.tick;$('edge-value').textContent=`${e[0]+1} → ${e[1]+1}`;$('triangle-value').textContent=tri.map(v=>v+1).join('·');$('frame-value').textContent=`${r.frame+1} / ${(registered.turnOf[r.x]-registered.turnOf[regInitial().x]+4)%4}`;
 const period=action==='F'?20:action==='S'?5:4;
 const returned=r.frame===0&&r.x===regInitial().x;$('metric-label').textContent=mode==='memory'?'PATH DIFFERENCES':'REGISTERED RETURN';$('metric-value').textContent=mode==='memory'?m.pathDivergence:exp.tick===0?'INITIAL':returned?'RETURNED':'IN MOTION';
 $('return-position').textContent=`${exp.tick%period} / ${period}`;
 [...$('beats').querySelectorAll('span')].forEach((el,i)=>{el.classList.toggle('active',i===exp.tick%6);el.setAttribute('aria-label',`Waltz position ${i+1}${i===exp.tick%6?', active':''}`);});
 [...$('return-dots').children].forEach((el,i)=>{el.hidden=i>=period;el.classList.toggle('on',i<exp.tick%period||(exp.tick>0&&exp.tick%period===0));});
 $('state-divergence').textContent=m.stateDivergence;$('path-divergence').textContent=`${m.pathDivergence} / ${exp.tick}`;$('first-divergence').textContent=m.firstDivergence??'—';$('memory-magnitude').textContent=m.memoryMagnitude.toFixed(2);
 $('comparison-note').textContent=`A / B occupied states: ${m.occupiedA} / ${m.occupiedB} · density difference: ${m.densityDifference.toFixed(3)} · coupling B: ${exp.config.memoryEnabled?exp.config.memoryStrength*exp.config.feedbackGain:0}. Both retain diagnostic history; only B feeds it into transitions.`;
 $('reconstruction-error').textContent=`Reconstruction error ${harmonics.error.toExponential(1)}`;
 $('harmonic-bars').replaceChildren(...harmonics.energy.map((v,k)=>{const el=document.createElement('div');el.className='harmonic-bar';el.innerHTML=`<span>k=${k}</span><div class="track"><div class="fill"></div></div><span>${v.toFixed(3)}</span>`;el.querySelector('.fill').style.width=Math.min(100,v*100)+'%';return el;}));
 $('timeline').replaceChildren(...exp.timeline.slice(-32).map(row=>{const b=document.createElement('button');b.textContent=row.tick;b.title=`Encounter ${row.tick}: A ${row.before.A+1}→${row.after.A+1}; B ${row.before.B+1}→${row.after.B+1}`;b.classList.toggle('diverged',row.after.A!==row.after.B);b.onclick=()=>{$('encounter-detail').hidden=false;$('encounter-detail').textContent=pretty(row);};return b;}));
 if($('diagnostics').open)diagnostics();$('reverse').disabled=exp.tick===0||busy;dirty=true;
}
function diagnostics(){
 $('diagnostic-data').textContent=pretty({version:'Aletheos Native Terrain v3.1',classification:{native:'G60 topology, V4 deck, unique-triangle T, source-defined G1800 K/Delta/F',derived:'Cartesian G900 quotient, fixed locus, Fourier projectors',experimental:'Waltz 123223 register without digit-operation semantics; softmax memory coupling; candidate seam; display deformation'},sources,counts:{g60:60,directedEdges:240,threeCycles:80,g900:900,g1800:1800,g9000:9000,fixedLocus:60},tick:exp.tick,encounterRoots:{A:exp.A.q,B:exp.B.q,initial:exp.config.initialQ,follow:$('follow-root').checked},waltzPosition:exp.tick%6+1,activeWalker:exp.walker,registered:{...registeredState,action,internalTurn:registered.turnOf[registeredState.x],returned:registeredState.frame===0&&registeredState.x===regInitial().x},nativeReturnReceipt:returnReceipt,harmonics:{energy:harmonics.energy,recombinationError:harmonics.error,dimensions:harmonics.realDimensions},memory:exp.config,metrics:exp.metrics,experimentalMemorySpectrum:{definition:'DFT of normalized history totals in display buckets q mod 5; not native frame harmonics',A:memorySpectrum(exp.A),B:memorySpectrum(exp.B)},limits:['No certified perfect-defect interface inferred.','Coordinate layouts and interpolated paths do not define physical space.','One reproducible axis registration from source; no canonical root asserted.','Experimental walks need not close in twenty steps.','Finite native transport is unchanged by memory feedback.']});
}
function viewState(){const run=r=>({q:r.q,previousQ:r.previousQ,path:r.path,memory:r.history,memoryEnabled:r.memoryEnabled,coupling:r.memoryEnabled?exp.config.memoryStrength*exp.config.feedbackGain:0});return {mode,action,carrier:$('carrier').value,tick:exp.tick,blend,walkerEdge:exp.walker,previousWalkerEdge:exp.previousWalker,selectedVertex,selectedQ,rootQ:exp.config.initialQ,registered,registeredIndex:registeredState.x,frame:registeredState.frame,internalTurn:(registered.turnOf[registeredState.x]-registered.turnOf[regInitial().x]+4)%4,harmonics:{...harmonics,amplitudes:harmonics.energy.map(Math.sqrt)},a:run(exp.A),b:run(exp.B),options:{followRoot:$('follow-root').checked,edges:$('edges').checked,fixed:$('fixed').checked,seam:$('seam').checked,trails:$('trails').checked,deformation:Number($('deformation').value),quality:$('quality').value,density:Number($('density').value),channel:$('channel').value,tracePersistence:exp.config.tracePersistence}};}
function wrap(payload){return {schema:'aletheos.living-session.v1',sources,action,excitation:$('excitation')?.value||'localized',mode,carrier:$('carrier').value,registeredInitial:regInitial(),registeredState,harmonicEnergies:harmonics.energy,payload};}
function download(payload,name){const url=URL.createObjectURL(new Blob([pretty(wrap(payload))],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
async function importRun(file){
 if(!file)return;if(file.size>32*1024*1024)throw Error('Run file exceeds 32 MB');const session=JSON.parse(await file.text());
 if(session.schema!=='aletheos.living-session.v1'||JSON.stringify(session.sources)!==JSON.stringify(sources))throw Error('This run does not match the loaded native source hashes');
 if(!['F','S','K'].includes(session.action)||!['localized','common','paired'].includes(session.excitation))throw Error('Invalid registered configuration');
 const payload=session.payload.schema==='aletheos.living-comparison-receipt.v1'?session.payload.snapshot:session.payload;if(payload.timeline?.length>10000)throw Error('Run exceeds 10,000 encounters');
 const restored=restoreExperiment(geometry,payload),initial={frame:0,x:registered.toG900.indexOf(restored.config.initialQ)},check=registeredStep(registered,initial,session.action,restored.tick);
 if(payload.schema!=='aletheos.living-config.v1'&&JSON.stringify(check)!==JSON.stringify(session.registeredState))throw Error('Registered state does not match replay');
 setPlaying(false);exp=restored;action=session.action;$('action').value=action;$('excitation').value=session.excitation;reflectConfig();setMode(session.mode);if(['g60-left','g60-right','pair','g900','g1800','g9000'].includes(session.carrier))$('carrier').value=session.carrier;blend=1;syncDerived();updateUI();notice('Run restored and deterministic replay verified.');
}
async function main(){
 const names=['g60.json','g15-quotient.json','living-registered.json','symmetry.json'];
 const inputs=await Promise.all(names.map(async name=>{const response=await fetch('data/'+name);if(!response.ok)throw Error(`Native source unavailable: ${name} (${response.status})`);const bytes=await response.arrayBuffer();return {value:JSON.parse(new TextDecoder().decode(bytes)),hash:await sha256(bytes)};}));
 if(inputs[0].hash!==inputs[3].value.graph_sha256||inputs[0].hash!==inputs[2].value.source.graph_sha256)throw Error('Native graph source hash mismatch');
 sources=Object.fromEntries(names.map((n,i)=>[n,inputs[i].hash]));geometry=buildGeometry(inputs[0].value,inputs[1].value);registered=loadRegistered(inputs[2].value);returnReceipt=registeredReturnReceipt(registered);
 // Validate projection agreement with the live G900 ordering, not merely its size.
 for(let p=0;p<3600;p++)if(registered.toG900[registered.productMap[p]]!==geometry.quotient.map[p])throw Error('Registered-to-quotient source mismatch');
 exp=createExperiment(geometry,configFromUI());renderer=new LivingRenderer($('living-canvas'),geometry,{onSelect:select});ready=true;
 for(let i=0;i<20;i++)$('return-dots').append(document.createElement('span'));
 const excitation=document.createElement('label');excitation.textContent='Frame excitation';const selector=document.createElement('select');selector.id='excitation';for(const[value,text]of [['localized','Localized in one frame'],['common','Equal common mode'],['paired','Opposed frame pair']]){const o=document.createElement('option');o.value=value;o.textContent=text;selector.append(o);}excitation.append(selector);$('channel').parentElement.after(excitation);selector.onchange=()=>{syncDerived();updateUI();};
 document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));
 $('play').onclick=()=>setPlaying(!playing);$('step').onclick=guard(()=>{setPlaying(false);step();blend=1;});$('reverse').onclick=guard(()=>{setPlaying(false);reverseExperiment(exp);blend=1;syncDerived();updateUI();});$('restart').onclick=guard(()=>{restart();notice('Identical initial conditions restored.');});
 $('step20').onclick=guard(()=>{setPlaying(false);for(let i=0;i<20;i++)step();blend=1;});
 $('set-root').onclick=guard(()=>{restart();notice('Encounter root registered. Both runs restarted.');});$('set-edge').onclick=guard(restart);
 $('action').onchange=()=>{action=$('action').value;restart();notice('Registered action changed; clock restarted.');};
 for(const id of ['memory-enabled','strength','retention','gain','history-depth','seed'])$(id).onchange=guard(async()=>{outputs();await rerun();});
 for(const id of ['strength','retention','gain','speed'])$(id).oninput=outputs;
 $('trace-depth').onchange=guard(()=>{const depth=Number($('trace-depth').value);if(!Number.isInteger(depth)||depth<1||depth>1000)throw Error('Trace persistence must be 1–1000');exp.config.tracePersistence=depth;dirty=true;});
 $('reset-history').onclick=()=>{resetHistory(exp);updateUI();notice('Encounter history cleared; finite state retained.');};$('baseline').onclick=guard(async()=>{$('strength').value=0;outputs();await rerun();notice('Zero-coupling A/B baseline replayed.');});
 $('run-experiment').onclick=guard(async()=>{const n=Number($('run-length').value);if(!Number.isInteger(n)||n<1||n>10000)throw Error('Choose 1–10,000 encounters');setPlaying(false);setMode('memory');await rerun(n);notice(`Completed ${n} encounters. First path difference: ${exp.metrics.firstDivergence??'none'}.`);});
 for(const id of ['follow-root','carrier','edges','fixed','seam','trails','quality','density','deformation','channel'])$(id).onchange=()=>{dirty=true;};
 $('reset-camera').onclick=()=>renderer.resetCamera();$('camera-preset').onchange=()=>renderer.resetCamera($('camera-preset').value);
 for(const [btn,panel]of [['geometry-drawer','left-panel'],['dynamics-drawer','right-panel']])$(btn).onclick=()=>{const open=$(panel).classList.toggle('open');$(btn).setAttribute('aria-expanded',String(open));};
 $('diagnostics').ontoggle=()=>{if($('diagnostics').open)diagnostics();};
 $('export-config').onclick=()=>download(exportConfiguration(exp),'aletheos-living-config.json');$('export-snapshot').onclick=()=>download(exportSnapshot(exp),'aletheos-living-snapshot.json');$('export-receipt').onclick=()=>download(exportReceipt(exp),'aletheos-memory-comparison.json');$('import-run').onchange=guard(e=>importRun(e.target.files[0]));
 document.addEventListener('visibilitychange',()=>{if(document.hidden){setPlaying(false);notice('Paused while browser was suspended. Press Play to resume.');}});
 document.addEventListener('keydown',e=>{if(busy)return;if(['INPUT','SELECT','TEXTAREA','BUTTON','SUMMARY'].includes(e.target.tagName))return;if(e.code==='Space'){e.preventDefault();setPlaying(!playing);}if(e.code==='ArrowRight'){setPlaying(false);step();blend=1;}if(e.code==='ArrowLeft'){setPlaying(false);reverseExperiment(exp);blend=1;syncDerived();updateUI();}});
 setMode(MODES[location.hash.slice(1)]?location.hash.slice(1):'waltz');syncDerived();select({type:'quotient',index:0});updateUI();outputs();$('status').textContent='● Native sources verified · ready';$('status').style.color='#66e2cd';
 timerHandle=setInterval(()=>{if(!playing||busy)return;const now=performance.now(),dt=1000/Number($('speed').value);if(now-lastStep>=dt)step();},16);
 function frame(now){if(playing){blend=Math.min(1,(now-lastStep)/(1000/Number($('speed').value)));dirty=true;}if(dirty||renderer.animating){renderer.render(viewState());dirty=false;}fpsFrames++;if(now-fpsStart>1000){$('fps').textContent=`${Math.round(fpsFrames*1000/(now-fpsStart))} fps`;fpsFrames=0;fpsStart=now;}frameHandle=requestAnimationFrame(frame);}
 frameHandle=requestAnimationFrame(frame);setPlaying(true);
 window.addEventListener('pagehide',()=>{clearInterval(timerHandle);cancelAnimationFrame(frameHandle);renderer.destroy();},{once:true});
}
main().catch(e=>{$('status').textContent='Source loading failed';$('viewport-caption').textContent=e.message+' — no substitute geometry loaded.';console.error(e);document.querySelectorAll('button,input,select').forEach(el=>el.disabled=true);});
