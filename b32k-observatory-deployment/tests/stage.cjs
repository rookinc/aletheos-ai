const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync(require('path').resolve(__dirname,'../../public_html/observatories/b32k/index.html'),'utf8'),listeners={},frames=[];
let recordDrawing=false;const drawing=[];
const ctx2d=new Proxy({},{get:(_,key)=>(...args)=>{if(recordDrawing)drawing.push([key,...args]);}}),els=new Map();
function el(id){if(!els.has(id))els.set(id,{style:{},textContent:'',hidden:true,onclick:null,setAttribute(k,v){this[k]=v},classList:{add(){},remove(){}},getContext:type=>type==='webgl'?null:ctx2d,getBoundingClientRect:()=>({width:390,height:720,left:0,top:0}),setPointerCapture(){},addEventListener(k,f){listeners[k]=f}});return els.get(id)}
const ctx=vm.createContext({document:{body:{classList:{toggle(){}}},getElementById:el,addEventListener(){},hidden:false},window:{devicePixelRatio:1,addEventListener(){}},requestAnimationFrame:f=>frames.push(f),ResizeObserver:class{observe(){}},console,performance});
el('topology').textContent=html.match(/<script id="topology" type="application\/json">([\s\S]*?)<\/script>/)[1];
el('native-darts').textContent=html.match(/<script id="native-darts" type="application\/json">([\s\S]*?)<\/script>/)[1];
el('quotient-link').textContent=html.match(/<script id="quotient-link" type="application\/json">([\s\S]*?)<\/script>/)[1];
el('pairing-data').textContent=html.match(/<script id="pairing-data" type="application\/json">([\s\S]*?)<\/script>/)[1];
vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],ctx);const run=s=>vm.runInContext(s,ctx);run("setTorusSplit(0);setStageView('cube');reset()");
function flush(){while(frames.length)frames.shift()();}
flush();assert.equal(el('error').hidden,true);assert.equal(run('new Set(addresses).size'),9000);assert.equal(run('positions.length'),27000);assert.equal(run('edges.length'),12);
assert(run('addresses.every((a,i)=>a>=0&&a<32768&&positions[3*i]+15.5===(a&31)&&positions[3*i+1]+15.5===((a>>>5)&31)&&positions[3*i+2]+15.5===(a>>>10))'));
assert(run('Array.from({length:3},(_,axis)=>new Set(addresses.map(a=>(a>>>(axis*5))&31)).size).every(n=>n===32)'));
run('const first=q.slice(); for(let i=0;i<10000;i++)rotate(1,2,3,.1)');assert(Math.abs(run('Math.hypot(...q)')-1)<1e-12);assert(run('Array.from(matrix()).every(Number.isFinite)'));
// No camera collision or hard near/far/dolly limit; the camera can cross the cube.
run('reset();travel(100)');assert.equal(run('translation[2]'),36);run('travel(-1000000)');assert.equal(run('translation[2]'),-999964);run('move(1000000,-1000000)');assert(run('translation[0]>1000000&&translation[1]>1000000'));flush();
function ev(type,id,x,y,extra={}){listeners[type]({type,pointerType:'touch',pointerId:id,clientX:x,clientY:y,preventDefault(){},...extra})}
run('reset()');const before=run('JSON.stringify(q)');ev('pointerdown',1,100,100);ev('pointermove',1,200,400);assert.notEqual(run('JSON.stringify(q)'),before);ev('pointerup',1,200,400);
run('reset()');ev('pointerdown',1,100,100);ev('pointerdown',2,200,100);ev('pointermove',1,90,110);ev('pointermove',2,230,110);assert(run('translation[0]>0&&translation[1]<0'));assert(run('translation[2]>-64'));ev('pointercancel',1,0,0);ev('pointercancel',2,0,0);assert.equal(run('pointers.size'),0);
el('reset').onclick();flush();assert.equal(run('translation[2]'),-64);assert.equal(run('translation[0]'),0);assert.equal(frames.length,0);
console.log('PASS: 9000 unique B32K addresses; all 32 coordinates on each axis; 12 cube edges; quaternion stability; uncapped rotation/pan/travel through cube; finger rotation/pan/pinch; cancel/reset; no idle animation.');

assert.equal(run('graphEdges.length'),45000);assert.equal(run('edgeKeys.size'),45000);assert(run('degree.every(x=>x===10)'));assert(run('graphEdges.every(([a,b],i)=>graphWire[i*6]===positions[a*3]&&graphWire[i*6+3]===positions[b*3])'));
const state=run('JSON.stringify({q,translation})');el('edgeOpacity').oninput({target:{value:'0'}});flush();assert.equal(run('edgeOpacity'),0);assert.equal(el('edgeValue').textContent,'0.0%');el('edgeOpacity').oninput({target:{value:'100'}});flush();assert.equal(run('edgeOpacity'),1);el('vertexLabels').onchange({target:{checked:true}});flush();assert.equal(run('showLabels'),true);assert(el('labelInfo').textContent.includes('visible vertices'));el('vertexLabels').onchange({target:{checked:false}});flush();assert.equal(run('showLabels'),false);assert.equal(run('JSON.stringify({q,translation})'),state);console.log('PASS: 45000 unique degree-10 native edges; exact endpoint assignment; full-range fader; label toggle/decluttering; controls preserve camera.');

assert.equal(run('cycles.length'),450);assert.equal(run('new Set(cycles.flat()).size'),9000);assert(run('cycles.every(c=>c.length===20&&c.every((v,k)=>F[v]===c[(k+1)%20]))'));
assert(run('cycles.every((c,j)=>c.every((v,k)=>{const p=torusPoint(j,k);return p.every((x,a)=>Math.abs(x-torusPositions[v*3+a])<2e-6);}))'));
assert(run('cycles.every((c,j)=>torusPoint(j,0).every((x,a)=>Math.abs(x-torusPoint(j,20)[a])<1e-10))'));
assert.equal(run('new Set(Array.from({length:9000},(_,i)=>Array.from(torusPositions.slice(i*3,i*3+3)).map(x=>x.toFixed(5)).join(","))).size'),9000);
const old=run('JSON.stringify(Array.from(positions))'),wireOld=run('JSON.stringify(Array.from(graphWire))');el('toroidal').onchange({target:{checked:true}});flush();assert.equal(run('toroidal'),true);assert.equal(run('graphWire.length/6'),108000);assert(run('Array.from({length:9000},(_,i)=>Math.abs(Math.hypot(Math.hypot(positions[3*i],positions[3*i+1])-10,positions[3*i+2])-4)<2e-6).every(Boolean)'));
run('launchPulse();pausePulse();for(let i=0;i<10;i++)stepPulse();measurePulse()');const field=run('JSON.stringify({t:pulseTime,phi:Array.from(pulsePhi),p:Array.from(pulseP),E:pulseEnergy})');el('toroidal').onchange({target:{checked:false}});flush();assert.equal(run('JSON.stringify(Array.from(positions))'),old);assert.equal(run('JSON.stringify(Array.from(graphWire))'),wireOld);assert.equal(run('JSON.stringify({t:pulseTime,phi:Array.from(pulsePhi),p:Array.from(pulseP),E:pulseEnergy})'),field);el('toroidal').onchange({target:{checked:true}});flush();assert.equal(run('JSON.stringify({t:pulseTime,phi:Array.from(pulsePhi),p:Array.from(pulseP),E:pulseEnergy})'),field);
console.log('PASS: all 450 exact F cycles, 9000 unique torus positions, geometric closure, torus radii, curved F segments, reversible layout mapping, unchanged field and camera.');

assert(!html.includes('class BCTracerEngine'));assert(!html.includes('Play tails'));
run("setStageView('tower');reset();paintTower()");
assert.equal(run('nativeDarts.length'),60);assert.equal(run('new Set(nativeDarts.map(x=>x.join())).size'),60);
assert(run('dartMoves.every((ms,v)=>ms.length===4&&new Set(ms.map(m=>m.to)).size===4&&ms.filter(m=>m.kind==="head").length===2&&ms.filter(m=>m.kind==="tail").length===2&&ms.every(m=>nativeDartEdges.has(Math.min(v,m.to)+","+Math.max(v,m.to))&&dartMoves[m.to].some(n=>n.to===v&&n.kind===m.kind)))'));
assert.equal(run('new Set(dartMoves.flatMap((ms,v)=>ms.map(m=>Math.min(v,m.to)+","+Math.max(v,m.to)))).size'),120);
for(let v=0;v<60;v++){run(`selectDart(${v});paintTower()`);assert.equal(run('selectedDart'),v);assert.equal(run('omega.host.sourceVertex'),v);assert(run('omega.host.externalEdges.some(([a,b])=>a===selectedDart&&b===omega.host.pairedVertex)'));}
run('selectDart(0)');const retainedDartField=run('JSON.stringify({phi:Array.from(pulsePhi),p:Array.from(pulseP),t:pulseTime})');
for(let i=0;i<4;i++){run('selectDart(0)');const expected=run(`dartMoves[0][${i}].to`);el('dartMove'+i).onclick();assert.equal(run('selectedDart'),expected);}
el('dartMoveFilter').onchange({target:{value:'tail'}});assert.equal(el('dartMove0').disabled,false);assert.equal(el('dartMove2').disabled,true);
el('dartMoveFilter').onchange({target:{value:'head'}});assert.equal(el('dartMove0').disabled,true);assert.equal(el('dartMove2').disabled,false);
el('dartMoveFilter').onchange({target:{value:'both'}});
el('towerRestart').onclick();assert.equal(run('selectedDart'),0);
el('towerPlay').onclick();run('paint(1000);paint(1032)');assert(run('omega.sim.time>0'));assert.equal(run('selectedDart'),0);el('towerPlay').onclick();const held=run('omega.sim.time');run('paint(1064)');assert.equal(run('omega.sim.time'),held);flush();
assert.equal(run('JSON.stringify({phi:Array.from(pulsePhi),p:Array.from(pulseP),t:pulseTime})'),retainedDartField);
el('towerSplit').oninput({target:{value:'0'}});flush();assert.equal(run('omega.hostRenderer.pairOffset'),0);el('towerSplit').oninput({target:{value:'100'}});flush();assert.equal(run('omega.hostRenderer.pairOffset'),2.1);
assert.equal(el('error').hidden,true);assert.equal(frames.length,0);
console.log('PASS: exact 60-state dart registration and all 120 native edges; all 240 directed legal moves; reverse transitions; B0/B1 pairing for every selection; destination buttons and filters; play does not invent successor; pause/split/reset; unchanged G9000 pulse; BC traces removed.');

run("setStageView('torus');launchPulse();pausePulse();for(let n=0;n<30;n++)stepPulse();measurePulse()");
const splitField=run('JSON.stringify({phi:Array.from(pulsePhi),p:Array.from(pulseP),t:pulseTime,E:pulseEnergy,q,translation,edges:graphEdges})');
for(const amount of [0,25,60,100]){
 run(`setTorusSplit(${amount})`);flush();assert.equal(run('torusSplit'),amount);assert(run('Array.from(positions).every(Number.isFinite)'));
 assert.equal(run('JSON.stringify({phi:Array.from(pulsePhi),p:Array.from(pulseP),t:pulseTime,E:pulseEnergy,q,translation,edges:graphEdges})'),splitField);
 assert(run('cycles.every((vs,c)=>vs.every((v,k)=>splitTorusPoint(c,k).every((x,a)=>Math.abs(x-positions[v*3+a])<2e-6)))'));
 assert(run('cycles.every((vs,c)=>vs.every((v,k)=>{const path=splitFPath(c,k),a=splitTorusPoint(c,k),b=splitTorusPoint(c,k+1);return path[0].every((x,i)=>Math.abs(x-a[i])<1e-8)&&path[path.length-1].every((x,i)=>Math.abs(x-b[i])<1e-8)}))'));
 assert(run('transportPaths.every((p,k)=>p.points[p.points.length-1].every((x,a)=>Math.abs(x-transportPaths[(k+1)%20].points[0][a])<1e-8))'));
 assert(run('Array.from({length:20},(_,k)=>Math.hypot(...transportPoint(k+1-1e-8).map((x,a)=>x-transportPoint((k+1)%20)[a]))<1e-4).every(Boolean)'));
}
run('setTorusSplit(0)');assert.equal(run('JSON.stringify(Array.from(torusPositions))'),run('JSON.stringify(Array.from(torusBasePositions))'));
run('resumePulse()');const playingTime=run('pulseTime');el('torusSplit').oninput({target:{value:'70'}});assert.equal(run('pulseRunning'),true);assert.equal(run('pulseTime'),playingTime);run('pausePulse()');flush();
assert.equal(el('torusSplitPanel').hidden,false);run("setStageView('tower')");flush();assert.equal(el('torusSplitPanel').hidden,true);assert.equal(run('torusSplit'),70);run("setStageView('torus')");flush();assert.equal(el('torusSplitPanel').hidden,false);assert.equal(run('torusSplit'),70);
console.log('PASS: all 9000 split registrations; 450 closed F cycles; exact cut bridges and continuous marker; split/join round trip; live pulse, graph, energy and camera unchanged; control scoped to Torus.');

run("setStageView('pairings');pairingRunning=false");flush();
assert.equal(run('pairingData.addresses.length'),15);
assert(run('pairingData.addresses.every((a,i)=>pairAddress.filter(x=>x===i).length===4&&new Set(a.pairing.join("")).size===4&&!a.pairing.join("").includes(a.missing))'));
assert(run('pairReps.every(rs=>rs.length===2&&rs.every(s=>{const u=Math.floor(s/60),v=s%60;return pairLookup[pairingData.a[u]*60+pairingData.a[v]]===pairLookup[s]&&pairAddress[u]===pairAddress[pairingData.a[u]]&&pairAddress[v]===pairAddress[pairingData.ab[v]]}))'));
assert(run(`(()=>{for(let a=0;a<15;a++)for(let b=0;b<15;b++){pairingSeeds=[a,b];const first=pairingAt(0);for(let k=0;k<20;k++){const x=pairingAt(k),y=pairingAt(k+1);if(F[x.state]!==y.state||pairAddress[x.u]!== (k%2?b:a)||pairAddress[x.v]!== (k%2?a:b))return false;}if(JSON.stringify(first)!==JSON.stringify(pairingAt(20)))return false;}return true})()`));
run('pairingSelect(0,0);pairingSelect(1,3);renderPairings()');
assert.equal(el('pairingsScene').hidden,false);assert.equal(el('wavePanel').hidden,true);
el('pairNext').onclick();flush();assert.equal(run('Math.floor(pairingTime)'),1);el('pairPrev').onclick();flush();assert.equal(run('pairingTime'),0);el('pairPrev').onclick();flush();assert.equal(run('pairingTime'),19);el('pairNext').onclick();flush();assert.equal(run('pairingTime'),0);
el('pairPlay').onclick();run('paint(1000);paint(2500)');assert.equal(run('pairingTime'),1.5);el('pairPlay').onclick();flush();assert.equal(run('pairingTime'),1.5);
el('pairPhase').oninput({target:{value:'7'}});flush();assert.equal(run('pairingTime'),7);assert.equal(run('pairingRunning'),false);
el('pairLabels').onchange({target:{checked:false}});flush();assert(!el('pairGraph').innerHTML.includes('<text'));el('pairLabels').onchange({target:{checked:true}});flush();assert(el('pairGraph').innerHTML.includes('<text'));
el('reset').onclick();flush();assert.equal(run('pairingTime'),0);
el('pairPlay').onclick();run("setStageView('torus')");flush();assert.equal(run('pairingRunning'),false);assert.equal(el('pairingsScene').hidden,true);
console.log('PASS: exact K lift for all 3600 pairs, gauge-invariant address projection, all 225 selected pair cycles match native F and close at 20; playback, stepping, wrapping, scrubbing, label flag and view isolation.');

assert.equal(run('scaffoldMoves.length'),1800);
assert(run('scaffoldMoves.every((ms,q0)=>ms.length===8&&ms.filter(m=>m.factor===0).length===4&&ms.filter(m=>m.factor===1).length===4&&ms.every(m=>[0,1,2,3,4].every(f=>edgeKeys.has(Math.min(q0+1800*f,m.to+1800*f)*COUNT+Math.max(q0+1800*f,m.to+1800*f)))))'));
run("clearPulse();setStageView('torus');showLabels=false;scaffoldMode=true;scaffoldControls()");flush();
for(const split of [0,60,100]){run(`setTorusSplit(${split})`);flush();assert.equal(run('scaffoldPaths.length'),9000);assert(run('scaffoldPaths.every((p,i)=>{const c=Math.floor(i/20),k=i%20;return pathAt(p,0).every((x,j)=>Math.abs(x-splitTorusPoint(c,k)[j])<1e-9)&&pathAt(p,1).every((x,j)=>Math.abs(x-splitTorusPoint(c,(k+1)%20)[j])<1e-8)&&p.lengths.every((x,j)=>!j||x>=p.lengths[j-1]);})'));}
const originalField=run('JSON.stringify({time:pulseTime,phi:Array.from(pulsePhi),p:Array.from(pulseP)})');
el('scaffoldPlay').onclick();assert.equal(run('scaffoldRunning'),true);run('paint(1000);paint(2500)');assert.equal(run('scaffoldTime'),1.5);assert.equal(run('pulseActive'),false);assert.equal(run('pulseRunning'),false);
const dartCamera=run('JSON.stringify({q,translation})');el('torusSplit').oninput({target:{value:'75'}});assert.equal(run('scaffoldRunning'),true);assert.equal(run('scaffoldTime'),1.5);assert.equal(run('JSON.stringify({q,translation})'),dartCamera);
el('scaffoldPlay').onclick();flush();const hold=run('scaffoldTime');run('paint(3000)');assert.equal(run('scaffoldTime'),hold);
el('scaffoldStep').onclick();flush();assert.equal(run('scaffoldTime'),2);run('scaffoldTime=19.9');el('scaffoldStep').onclick();flush();assert.equal(run('scaffoldTime'),0);
el('allFibers').onchange({target:{checked:false}});flush();assert(el('scaffoldStatus').textContent.includes('1 dart'));el('allFibers').onchange({target:{checked:true}});flush();assert(el('scaffoldStatus').textContent.includes('450 darts'));
el('dartMode').onchange({target:{checked:false}});flush();assert.equal(el('wavePanel').hidden,false);el('dartMode').onchange({target:{checked:true}});flush();assert.equal(el('wavePanel').hidden,true);
assert.equal(run('JSON.stringify({time:pulseTime,phi:Array.from(pulsePhi),p:Array.from(pulseP)})'),originalField);
el('scaffoldPlay').onclick();run("setStageView('cube')");flush();assert.equal(run('scaffoldRunning'),false);assert.equal(el('scaffoldPanel').hidden,true);
run("setStageView('torus')");el('scaffoldReset').onclick();flush();assert.equal(run('scaffoldTime'),0);assert.equal(run('scaffoldRunning'),false);
console.log('PASS: all 72000 directed product-factor moves lie on native edges; all 9000 F paths match exact endpoints at 0/60/100 split; independent dart play/pause/step/wrap; live split preserves clock/camera; 450/1 scope, wave toggle and view isolation.');

assert(run('Array.from({length:9000},(_,v)=>{const x=linkedTowerState(v);return x.lifts.length===4&&x.lifts.filter(p=>p.active).length===2&&x.pairs30.length===2&&x.address.length===2&&x.q===v%1800&&x.frame===Math.floor(v/1800)}).every(Boolean)'));
assert(run('quotientFibers.every((f,r)=>{const qs=Array.from({length:1800},(_,i)=>i).filter(i=>quotientLink.projection[i]===r);return qs.length===2&&new Set(qs.map(q=>quotientLink.projection[topology.K[q]])).size===1})'));
const selectedField=run('JSON.stringify({time:pulseTime,phi:Array.from(pulsePhi),p:Array.from(pulseP),q,translation})');
for(const c of [0,1,117,449]){run(`chooseLinkedFiber(${c+1})`);for(const k of [0,1,5,19]){run(`scaffoldTime=${k};paint(5000)`);assert(el('scaffoldStatus').textContent.includes('V'+(run(`cycles[${c}][${k}]`)+1)+' →'));assert.equal(el('towerState9000').textContent,'G9000 · V'+(run(`cycles[${c}][${k}]`)+1));}}
assert.equal(run('JSON.stringify({time:pulseTime,phi:Array.from(pulsePhi),p:Array.from(pulseP),q,translation})'),selectedField);
el('nextFiber').onclick();assert.equal(run('selectedFiber'),0);el('previousFiber').onclick();assert.equal(run('selectedFiber'),449);
run('scaffoldTime=3.25');el('scaffoldPlay').onclick();el('linkedTowerFlag').onchange({target:{checked:false}});assert.equal(run('scaffoldTime'),3.25);assert.equal(run('scaffoldRunning'),true);assert.equal(el('linkedTowerPanel').hidden,true);el('linkedTowerFlag').onchange({target:{checked:true}});assert.equal(el('linkedTowerPanel').hidden,false);el('scaffoldPlay').onclick();flush();
run("setStageView('tower')");flush();assert.equal(el('linkedTowerPanel').hidden,true);
console.log('PASS: all 9000 native state decompositions, 900 four-pair lift fibres, two active representatives, exact paired 4→2→1 folds, descended K action, selected-fibre/phase synchronization, wrapping selector, preserved camera/wave and running visibility toggle.');

// Hiding chrome never resets the scene or its independent playback clocks.
for(const view of ['cube','torus','tower','pairings']){
 run(`setStageView('${view}')`);
 const snapshot=run('JSON.stringify({q,translation,scaffoldTime,pairingTime,selectedFiber,showLabels,showFIndicators,allFibers,linkedTower})');
 el('uiToggle').onclick();assert.equal(run('uiHidden'),true);assert.equal(el('uiToggle').textContent,'Show UI');assert.equal(el('uiToggle')['aria-pressed'],'true');
 assert.equal(run('JSON.stringify({q,translation,scaffoldTime,pairingTime,selectedFiber,showLabels,showFIndicators,allFibers,linkedTower})'),snapshot);
 el('uiToggle').onclick();assert.equal(run('uiHidden'),false);assert.equal(el('uiToggle').textContent,'Hide UI');
}
run("setStageView('torus');scaffoldRunning=true;scaffoldLast=1000;setUIHidden(true);paint(1100)");assert(run('scaffoldRunning&&scaffoldTime>0'));run('scaffoldRunning=false;setUIHidden(false)');flush();
console.log('PASS: all-mode UI toggle preserves camera, phase, selected fiber and display flags; darts continue while hidden.');

// Layer switches remove drawing only; independent darts and field data survive.
for(const view of ['cube','torus','tower','pairings']){
 run(`setStageView('${view}')`);
 const before=run('JSON.stringify({q,translation,scaffoldTime,pairingTime,pulseTime,phi:Array.from(pulsePhi),selectedFiber})');
 el('boxFrameFlag').onchange({target:{checked:false}});el('verticesFlag').onchange({target:{checked:false}});flush();
 assert.equal(run('showBoxFrame'),false);assert.equal(run('showVertices'),false);
 assert.equal(run('JSON.stringify({q,translation,scaffoldTime,pairingTime,pulseTime,phi:Array.from(pulsePhi),selectedFiber})'),before);
 el('boxFrameFlag').onchange({target:{checked:true}});el('verticesFlag').onchange({target:{checked:true}});flush();
}
run("setStageView('torus');edgeOpacity=0;showBoxFrame=false;showVertices=false;showFIndicators=false;linkedTower=false;showLabels=true");
recordDrawing=true;drawing.length=0;run('initCanvas(labelCtx)();paintLabels();paintFaces()');
assert.equal(drawing.filter(c=>['arc','stroke','fillText'].includes(c[0])).length,0);
drawing.length=0;run('allFibers=true;drawScaffoldDarts()');assert(drawing.some(c=>c[0]==='fill'));recordDrawing=false;
// Coincident projected vertices: the farther but more energetic one wins the label.
run("setStageView('cube');q=[0,0,0,1];translation=[0,0,-64];positions.fill(9999);positions.set([0,0,0,0,0,-10]);showVertices=true;showLabels=true;pulseActive=true;localEnergy.fill(0);localEnergy[1]=100");
recordDrawing=true;drawing.length=0;run('paintLabels()');
const texts=drawing.filter(c=>c[0]==='fillText').map(c=>c[1]);assert(texts[0].startsWith('V2 '));assert(!texts.some(t=>t.startsWith('V1 ')));assert(drawing.some(c=>c[0]==='lineTo'));recordDrawing=false;
console.log('PASS: all-mode layer switches preserve state; hidden frame/vertices/labels emit no drawing, darts remain; energy-first labels beat depth and connect to vertices.');
