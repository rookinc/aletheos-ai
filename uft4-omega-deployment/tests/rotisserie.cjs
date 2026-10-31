'use strict';
// Node checks of the actual inline classes. DOM/canvas scheduling are stubbed;
// these checks do not stand in for Chromium or physical Android measurements.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const assert=require('node:assert/strict'),crypto=require('node:crypto');
const html=fs.readFileSync(path.join(__dirname,'../../public_html/observatories/uft4-omega/index.html'),'utf8');
const script=html.match(/<script>([\s\S]*)<\/script>/)[1];
const context={console,performance:require('node:perf_hooks').performance};
vm.createContext(context);vm.runInContext(script+'\nglobalThis.AppClass=ObservatoryApp;globalThis.UIClass=UIController;globalThis.LaunchClass=LaunchPopover;',context);
const {CameraOrbit,GraphEngine,HostEngine,SettingsPresets}=context.UFT4;
const near=(a,b,tol=1e-7)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
const plain=value=>JSON.parse(JSON.stringify(value));
let checks=0;function test(name,fn){fn();checks++;console.log('PASS '+name);}
function element(){return{listeners:{},children:[],dataset:{},addEventListener(name,fn){this.listeners[name]=fn;},append(...nodes){this.children.push(...nodes);},setAttribute(){},setPointerCapture(){},classList:{toggle(){}}};}
const documentEvents={},windowEvents={},nodes={};
context.document={hidden:false,addEventListener:(name,fn)=>documentEvents[name]=fn,createElement:element,createDocumentFragment:element};
context.window={addEventListener:(name,fn)=>windowEvents[name]=fn};
context.requestAnimationFrame=()=>1;context.cancelAnimationFrame=()=>{};
context.nodes=nodes;context.element=element;
vm.runInContext(`UIController=class {
 constructor(app){this.app=app;}el(id){return nodes[id]||(nodes[id]=element());}
 updateHost(){}syncCamera(){}syncRotisserie(){}sync(){}
};RenderingEngine=class {
 constructor(app){this.app=app;this.config={period:67};this.invalidations=0;this.frames=0;}
 effectiveMode(){return this.app.settings.faceMode;}invalidate(kind){assertKind(kind);this.invalidations++;}render(){this.frames++;}
 setQuality(value){this.level=value;}release(){}fallback(message){throw Error(message);}
};`,Object.assign(context,{assertKind:kind=>assert.ok(['camera','geometry','field'].includes(kind),kind)}));
function app({startup=false}={}){
 const a=new context.AppClass();a.start=()=>{};a.last=1000;a.lastPaint=1000;a.renderer.invalidations=0;
 // Scheduling tests deliberately start at zero with orbit off; the first test
 // checks the unmodified startup state against the user's exported preset.
 if(!startup){a.sim.time=0;a.orbit.setEnabled(false);}
 return a;
}
function ticks(a,from,to,step=10){for(let time=from;time<=to;time+=step)a.tick(time);}
// Exact user-exported settings from uft4-omega-settings-2026-10-31T00-43-22-978Z.zip.
const expectedStartup={
 "camera": {
  "yaw": 98.91722499999025,
  "pitch": -126.38005312499388,
  "roll": -10.986700000012206,
  "zoom": 2.8
 },
 "appearance": {
  "faceMode": "hybrid",
  "palette": "ice",
  "blur": 9,
  "glow": 1.3,
  "opacity": 0.9,
  "detail": 1,
  "turbulence": 0.35,
  "quality": "auto",
  "highContrast": false,
  "sceneLabels": false,
  "fiberOpacity": 0.11
 },
 "layers": {
  "face": true,
  "g60": false,
  "vertices": false,
  "g15": false,
  "g30": false,
  "g30Links": false,
  "selectedConnections": false,
  "fibers": true,
  "generatedLayer": true,
  "showFiberRays": true,
  "showFiberLabels": false
 },
 "bc": {
  "enabled": true,
  "dots": false,
  "trails": true,
  "tailDegrees": 182,
  "tailOpacity": 0.25,
  "scope": "layers",
  "labels": false
 },
 "simulation": {
  "params": {
   "spin": 0.45,
   "major": 0.33,
   "minor": 0.35,
   "core": 0.07,
   "k": 12,
   "omega": 6.283185307179586,
   "amp": 2.45,
   "speed": 1
  },
  "time": 215.92550000000682,
  "mode": "scalar",
  "playing": true,
  "direction": 1
 },
 "host": {
  "display": {
   "enabled": true,
   "view": "pair",
   "local": false,
   "external": false,
   "trails": false,
   "merge": 100,
   "opacity": 1
  },
  "sourceBlock": 0,
  "sourceVertex": 0,
  "neighborBlock": 1,
  "rate": 1,
  "repeat": false,
  "playing": false,
  "travel": 0,
  "lapCount": 0
 },
 "research": {
  "resonanceMode": "exact",
  "gradFilter": true,
  "minFilter": true,
  "coherenceFilter": true,
  "mergeFilter": true,
  "compareFilter": false,
  "phaseTol": 0.2,
  "gradTol": 0.001,
  "edgeTol": 0.0335,
  "coherenceTol": 0.785,
  "orbitTol": 0.15,
  "fiberView": "generated"
 },
 "orbit": {
  "enabled": true
 },
 "panels": {
  "researchVisibility": false,
  "bcControls": false,
  "displayNotes": false,
  "g30Explanation": false,
  "hostPlayback": false,
  "effectsDetails": false,
  "cameraDetails": false,
  "fieldDetails": false,
  "embeddingDetails": false,
  "settingsFiles": true,
  "advancedResearch": false,
  "diagnostics": false,
  "about": false
 }
};
const initial=expectedStartup.camera;

test('Opening state preserves the uploaded Hybrid preset with controls closed',()=>{
 const a=app({startup:true}),panels=Object.fromEntries(SettingsPresets.panels.map(id=>[id,a.ui.el(id).open]));
 assert.deepEqual(plain(SettingsPresets.capture(a,panels).settings),{...expectedStartup,layout:{controlsCollapsed:true}});
 assert.equal(a.bc.tailDegrees,182);assert.equal(a.sim.frequencyHz,1);assert.equal(a.renderer.level,'balanced');
 assert.equal(a.generated,null);assert.equal(a.fiberAudit,null);
});

test('Display-only orbit leaves merge, clock, field, topology and camera identity intact',()=>{
 const a=app(),before=JSON.stringify(a.sim.snapshot()),camera=a.camera,keys=Object.keys(camera).join();
 const graphBefore=JSON.stringify([a.graph.edges,a.graph.fibers,a.graph.qEdges,a.host.edges]);
 const value=a.sim.field([.4,.5,.6]);a.orbit.setEnabled(true);
 for(let i=0;i<360;i++)a.orbit.step(.1,camera,.1);
 assert.equal(a.camera,camera);assert.equal(Object.keys(camera).join(),keys);assert.equal(camera.zoom,initial.zoom);
 assert.equal(a.hostSettings.merge,100);assert.equal(JSON.stringify(a.sim.snapshot()),before);assert.equal(a.sim.field([.4,.5,.6]),value);
 assert.equal(JSON.stringify([a.graph.edges,a.graph.fibers,a.graph.qEdges,a.host.edges]),graphBefore);
 near(CameraOrbit.wrap(camera.yaw-initial.yaw),-144);near(CameraOrbit.wrap(camera.pitch-initial.pitch),144);near(CameraOrbit.wrap(camera.roll-initial.roll),108);
});

test('Elapsed-time orbit agrees across 10, 30, 60 and 120 Hz scheduling',()=>{
 for(const rate of [10,30,60,120]){const o=new CameraOrbit(),c={...initial};o.setEnabled(true);
  for(let i=0;i<rate*36;i++)o.step(1/rate,c,.1);
  near(c.yaw,CameraOrbit.wrap(initial.yaw+216));near(c.pitch,CameraOrbit.wrap(initial.pitch+144));near(c.roll,CameraOrbit.wrap(initial.roll+108));
 }
});

test('All axes complete full rotations, including top and underside orientations',()=>{
 const o=new CameraOrbit(),c={...initial},geo=new context.UFT4.GeometryEngine(context.UFT4.DEFAULT_PARAMS);
 const min=[1,1,1],max=[-1,-1,-1];o.setEnabled(true);
 let previous={...c};
 for(let i=0;i<3600;i++){
  o.step(.1,c,.1);for(const key of ['yaw','pitch','roll']){assert.ok(c[key]>=-180&&c[key]<180);assert.ok(Math.abs(CameraOrbit.wrap(c[key]-previous[key]))<=.600001);}
  geo.configure(c,390,400);for(let axis=0;axis<3;axis++){const d=geo.matrix[6+axis];min[axis]=Math.min(min[axis],d);max[axis]=Math.max(max[axis],d);}
  previous={...c};
 }
 for(let axis=0;axis<3;axis++){assert.ok(min[axis]<-.9,`negative view axis ${axis}`);assert.ok(max[axis]>.9,`positive view axis ${axis}`);}
 near(c.yaw,initial.yaw);near(c.pitch,initial.pitch);near(c.roll,initial.roll);
});

test('Off, invalid deltas and long scheduling gaps cannot jump the camera',()=>{
 const o=new CameraOrbit(),c={...initial};assert.equal(o.step(10,c),false);assert.deepEqual(c,initial);
 o.setEnabled(true);for(const dt of [NaN,Infinity,-1,0])assert.equal(o.step(dt,c),false);
 o.step(10,c,.1);near(c.yaw,initial.yaw+.6);near(c.pitch,initial.pitch+.4);near(c.roll,initial.roll+.3);
 o.setEnabled(false);const stopped={...c};o.step(.1,c);assert.deepEqual(c,stopped);o.setEnabled(true);assert.deepEqual(c,stopped);
});

test('Default merge stays at 100% while the camera orbits across frame rates',()=>{
 for(const rate of [1,10,30,60,120]){
  const a=app();a.sim.params.speed=0;a.sim.direction=-1;a.sim.params.omega=20*Math.PI;a.orbit.setEnabled(true);
  for(let i=1;i<=rate*20;i++){a.tick(1000+i*1000/rate);assert.equal(a.hostSettings.merge,100);}
  assert.notEqual(a.camera.yaw,initial.yaw);assert.notEqual(a.camera.pitch,initial.pitch);assert.notEqual(a.camera.roll,initial.roll);
  assert.equal(a.hostSettings.opacity,1);near(a.sim.time,0);
 }
});

test('Manual merge values survive orbit toggles, pauses and host view changes',()=>{
 for(const merge of [0,25,50,75,100]){
  const a=app();a.hostSettings.merge=merge;let time=1000;
  const run=()=>{for(let i=0;i<20;i++){time+=100;a.tick(time);assert.equal(a.hostSettings.merge,merge);}};
  a.toggleRotisserie();run();const moving=plain(a.camera);a.togglePlay();run();assert.deepEqual(plain(a.camera),moving);
  a.togglePlay();run();assert.notDeepEqual(plain(a.camera),moving);
  a.toggleRotisserie();run();const stopped=plain(a.camera);run();assert.deepEqual(plain(a.camera),stopped);
  a.toggleRotisserie();run();assert.notDeepEqual(plain(a.camera),stopped);
  for(const [enabled,view] of [[true,'overview'],[false,'pair'],[true,'pair']]){
   a.hostSettings.enabled=enabled;a.hostSettings.view=view;const before=plain(a.camera);run();assert.notDeepEqual(plain(a.camera),before);
  }
 }
});

test('Real frame orchestration freezes orbit while paused, hidden or launch-held',()=>{
 const a=app();a.orbit.setEnabled(true);a.sim.playing=false;const original=plain(a.camera),merge=a.hostSettings.merge;ticks(a,1010,1510);
 assert.deepEqual(plain(a.camera),original);assert.equal(a.sim.time,0);
 assert.equal(a.hostSettings.merge,merge);
 // LaunchPopover.hold uses this same real paused simulation state.
 const held={app:a,held:false};a.sim.playing=true;context.LaunchClass.prototype.hold.call(held);ticks(a,1520,2010);
 assert.deepEqual(plain(a.camera),original);assert.equal(a.sim.time,0);
 assert.equal(a.hostSettings.merge,merge);
 a.sim.playing=true;context.document.hidden=true;ticks(a,2020,2510);assert.deepEqual(plain(a.camera),original);
 context.document.hidden=false;documentEvents.visibilitychange();a.tick(3000);assert.deepEqual(plain(a.camera),original);
 assert.equal(a.hostSettings.merge,merge);
 ticks(a,3010,3110);assert.notDeepEqual(plain(a.camera),original);
 assert.equal(a.hostSettings.merge,merge);
});

test('Automatic projection updates respect plasma quality cadence',()=>{
 const counts=[];
 for(const period of [50,67,100]){const a=app();a.renderer.config.period=period;a.orbit.setEnabled(true);ticks(a,1010,2000);counts.push(a.renderer.invalidations);assert.ok(a.renderer.invalidations<=Math.ceil(1000/period));}
 assert.ok(counts[0]>counts[1]&&counts[1]>counts[2],String(counts));
 const sheets=app();sheets.settings.faceMode='sheets';sheets.orbit.setEnabled(true);ticks(sheets,1010,2000);
 assert.ok(sheets.renderer.invalidations>counts[0]);
});

test('Manual drag and angle keys stop orbit; zoom retains it; pitch passes poles',()=>{
 const a=app(),canvas=element(),ui=Object.create(context.UIClass.prototype);
 ui.app=a;ui.el=()=>canvas;ui.syncCamera=()=>{};ui.updateHost=()=>{};context.UIClass.prototype.bindCamera.call(ui);
 a.orbit.setEnabled(true);canvas.listeners.pointerdown({isPrimary:true,button:0,pointerId:1,clientX:0,clientY:0});assert.equal(a.orbit.enabled,false);
 a.orbit.setEnabled(true);a.camera.pitch=88;canvas.listeners.keydown({key:'ArrowUp',preventDefault(){}});assert.equal(a.orbit.enabled,false);assert.equal(a.camera.pitch,91);
 a.orbit.setEnabled(true);const zoom=a.camera.zoom;canvas.listeners.keydown({key:'-',preventDefault(){}});assert.equal(a.orbit.enabled,true);assert.ok(a.camera.zoom<zoom);
 a.camera.pitch=179;canvas.listeners.keydown({key:'ArrowUp',preventDefault(){}});assert.equal(a.camera.pitch,-178);
});

test('Manual pitch/roll slider input takes control without resetting the simulation',()=>{
 const a=app(),ui=Object.create(context.UIClass.prototype),container=element();a.sim.time=12.5;
 ui.app=a;ui.ranges=[];ui.elements={};ui.el=()=>container;ui.syncPresets=()=>{};a.changed=()=>{};
 ui.addRanges('test','camera','camera', [['pitch','Pitch',-180,180,1,0],['roll','Roll',-180,180,1,0]]);
 for(const r of ui.ranges){a.orbit.setEnabled(true);r.input.value='150';r.input.listeners.input();assert.equal(a.orbit.enabled,false);assert.equal(a.camera[r.key],150);assert.equal(a.sim.time,12.5);}
});

test('Manual merge, zoom and G900 opacity retain the orbit without automatic merge changes',()=>{
 const a=app(),ui=Object.create(context.UIClass.prototype),container=element();a.sim.time=12.5;
 ui.app=a;ui.ranges=[];ui.elements={};ui.el=()=>container;ui.syncPresets=()=>{};a.changed=()=>{};
 ui.addRanges('test','hostSettings','camera',[['merge','Merge halves',0,100,1,0]]);
 ui.addRanges('test','camera','camera',[['zoom','Zoom',.5,4,.1,1]]);
 ui.addRanges('test','hostSettings','display',[['hostOpacity','G900 opacity',0,1,.01,0,'opacity']]);
 for(const [i,value,enabled] of [[0,'37',true],[1,'2',true],[2,'.2',true]]){
  a.orbit.setEnabled(true);const r=ui.ranges[i];r.input.value=value;r.input.listeners.input();
  assert.equal(a.orbit.enabled,enabled);assert.equal(a.sim.time,12.5);
 }
 assert.equal(a.hostSettings.merge,37);assert.equal(a.hostSettings.opacity,.2);assert.equal(a.camera.zoom,2);
 const before=plain(a.camera);ticks(a,1100,21000,100);assert.notDeepEqual(plain(a.camera),before);assert.equal(a.hostSettings.merge,37);
});

test('Native structure and inherited mathematical engine sources are preserved',()=>{
 const g=new GraphEngine();assert.equal(g.certificate.valid,true);assert.equal(g.edges.length,120);assert.equal(g.fibers.length,15);assert.equal(g.qEdges.length,30);
 const h=new HostEngine(g);assert.equal(h.neighbors.length,900);assert.equal(h.edges.length,3600);assert.ok(h.neighbors.every(row=>row.length===8));
 const hashes=[
 ['SimulationEngine','GraphEngine','94d5ad78ae7e45554d7a50591a0493cb0d61ec59d6406ac32dd18f6b1cd19e07'],
 ['GraphEngine','GeometryEngine','a42737a609f756a7cd6130b2111bd882d95640e3afc5aa961bf6fbd928e2c4b2'],
 ['GeometryEngine','TowerReferenceEngine','2905fb4d6760e7f34a85faa20ce73e66c605dbe8eed6807a474437d513da1920'],
 ['TowerReferenceEngine','HostEngine','c494834d16ee0f0314d26116d3b40c4a799f6c2796644100edcfb6b83154c000'],
 ['HostEngine','IndependentGenerator','cd324ca66cbd3d85c865763f010b9ede3f8e186154627f651c1001c847f30da0'],
 ['IndependentGenerator','BCTracerEngine','4345f2096319d63f3b4d78aeb22d1f3e3c2226494b17787de240e1e0e362161e'],
 ['BCTracerEngine','BCTracerRenderer','ea205b44e8af8582091e4652225920e5bec43cf966e68e33070174d7a94f27a0']];
 // Renderer styling changes are covered separately in themed-tails.cjs.
 for(const [a,b,expected] of hashes){const body=html.slice(html.indexOf('class '+a),html.indexOf('class '+b));assert.equal(crypto.createHash('sha256').update(body).digest('hex'),expected,a);}
});
console.log(`${checks}/13 orbit/manual-merge checks passed`);
