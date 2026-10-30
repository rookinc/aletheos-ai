'use strict';
// Node checks of the actual inline classes. DOM/canvas scheduling are stubbed;
// these checks do not stand in for Chromium or physical Android measurements.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const assert=require('node:assert/strict'),crypto=require('node:crypto');
const html=fs.readFileSync(path.join(__dirname,'../../public_html/observatories/uft4-omega/index.html'),'utf8');
const script=html.match(/<script>([\s\S]*)<\/script>/)[1];
const context={console,performance:require('node:perf_hooks').performance};
vm.createContext(context);vm.runInContext(script+'\nglobalThis.AppClass=ObservatoryApp;globalThis.UIClass=UIController;globalThis.LaunchClass=LaunchPopover;',context);
const {CameraOrbit,GraphEngine,HostEngine}=context.UFT4;
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
};`,Object.assign(context,{assertKind:kind=>assert.equal(kind,'camera')}));
function app(){const a=new context.AppClass();a.start=()=>{};a.last=1000;a.lastPaint=1000;return a;}
function ticks(a,from,to,step=10){for(let time=from;time<=to;time+=step)a.tick(time);}
const initial={yaw:40,pitch:25,roll:-55,zoom:2.6};

test('Screenshot defaults: diagonal joined Plasma view with 182-degree trails',()=>{
 const a=app();assert.deepEqual(plain(a.camera),initial);assert.equal(a.orbit.enabled,false);
 assert.equal(a.settings.faceMode,'plasma');assert.equal(a.settings.palette,'ice');assert.equal(a.hostSettings.merge,100);
 assert.equal(a.hostSettings.opacity,.5);
 assert.equal(a.bcSettings.trails,true);assert.equal(a.bcSettings.tailDegrees,182);assert.equal(a.bc.tailDegrees,182);
 assert.equal(a.bcSettings.tailOpacity,.25);assert.equal(a.layers.fibers,true);assert.equal(a.settings.fiberOpacity,.25);
 assert.equal(a.bcSettings.dots,false);assert.equal(a.bcSettings.labels,false);assert.equal(a.settings.sceneLabels,false);
 assert.equal(a.layers.selectedConnections,false);assert.equal(a.sim.frequencyHz,1);
});

test('Display-only orbit and merge leave clock, field, topology and camera identity intact',()=>{
 const a=app(),before=JSON.stringify(a.sim.snapshot()),camera=a.camera,keys=Object.keys(camera).join();
 const graphBefore=JSON.stringify([a.graph.edges,a.graph.fibers,a.graph.qEdges,a.host.edges]);
 const value=a.sim.field([.4,.5,.6]);a.orbit.setEnabled(true);
 for(let i=0;i<360;i++)a.orbit.step(.1,camera,.1,a.hostSettings);
 assert.equal(a.camera,camera);assert.equal(Object.keys(camera).join(),keys);assert.equal(camera.zoom,initial.zoom);
 assert.equal(JSON.stringify(a.sim.snapshot()),before);assert.equal(a.sim.field([.4,.5,.6]),value);
 assert.equal(JSON.stringify([a.graph.edges,a.graph.fibers,a.graph.qEdges,a.host.edges]),graphBefore);
 near(CameraOrbit.wrap(camera.yaw-initial.yaw),-144);near(CameraOrbit.wrap(camera.pitch-initial.pitch),144);near(CameraOrbit.wrap(camera.roll-initial.roll),108);
});

test('Elapsed-time orbit agrees across 10, 30, 60 and 120 Hz scheduling',()=>{
 for(const rate of [10,30,60,120]){const o=new CameraOrbit(),c={...initial};o.setEnabled(true);
  for(let i=0;i<rate*36;i++)o.step(1/rate,c,.1);
  near(c.yaw,CameraOrbit.wrap(initial.yaw+216));near(c.pitch,169);near(c.roll,53);
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

test('Merge completes a smooth 100 to 0 to 100 cycle in ten active seconds',()=>{
 const o=new CameraOrbit(),c={...initial},h={enabled:true,view:'pair',merge:100};o.setEnabled(true,h.merge);
 const expected=[[2.5,50],[5,0],[7.5,50],[10,100]];let elapsed=0;
 for(const [at,value] of expected){
  while(elapsed<at-1e-8){o.step(.1,c,.1,h);elapsed+=.1;assert.ok(h.merge>=0&&h.merge<=100);}
  near(h.merge,value);
 }
 // A cosine turns around gently at both endpoints.
 o.step(.01,c,.01,h);assert.ok(h.merge>99.99);
});

test('Merge timing is independent of frame rate, field Hz, speed and direction',()=>{
 for(const rate of [1,10,30,60,120]){
  const o=new CameraOrbit(),c={...initial},h={enabled:true,view:'pair',merge:100};o.setEnabled(true,h.merge);
  for(let i=0;i<rate*5;i++)o.step(1/rate,c,.1,h);near(h.merge,0);
  for(let i=0;i<rate*5;i++)o.step(1/rate,c,.1,h);near(h.merge,100);
 }
 const a=app();a.sim.params.speed=0;a.sim.direction=-1;a.sim.params.omega=20*Math.PI;
 a.orbit.setEnabled(true,a.hostSettings.merge);ticks(a,1100,6000,100);near(a.hostSettings.merge,0);near(a.sim.time,0);
 ticks(a,6100,11000,100);near(a.hostSettings.merge,100);
});

test('Merge enable starts from the selected value and rejects invalid deltas',()=>{
 for(const start of [0,25,50,75,100]){
  const a=app();a.hostSettings.merge=start;a.toggleRotisserie();
  assert.equal(a.hostSettings.merge,start);a.orbit.step(1e-9,a.camera,0,a.hostSettings);near(a.hostSettings.merge,start,1e-6);
  a.orbit.step(.5,a.camera,.1,a.hostSettings);const stopped=a.hostSettings.merge;
  a.stopRotisserie();a.orbit.step(4,a.camera,.1,a.hostSettings);assert.equal(a.hostSettings.merge,stopped);
  a.toggleRotisserie();a.orbit.step(1e-9,a.camera,0,a.hostSettings);near(a.hostSettings.merge,stopped,1e-6);
 }
 for(const start of [-100,200,NaN,Infinity]){
  const o=new CameraOrbit(),c={...initial},h={enabled:true,view:'pair',merge:100};o.setEnabled(true,start);
  o.step(.1,c,.1,h);assert.ok(Number.isFinite(h.merge)&&h.merge>=0&&h.merge<=100);
 }
 const o=new CameraOrbit(),c={...initial},h={enabled:true,view:'pair',merge:50};o.setEnabled(true,h.merge);
 const phase=o.mergePhase;
 for(const dt of [0,-1,NaN,Infinity])assert.equal(o.step(dt,c,.1,h),false);
 assert.equal(o.mergePhase,phase);assert.equal(h.merge,50);
});

test('Merge holds outside mirrored towers without stopping camera rotation',()=>{
 for(const h of [{enabled:true,view:'overview',merge:25},{enabled:false,view:'pair',merge:25}]){
  const o=new CameraOrbit(),c={...initial};o.setEnabled(true,h.merge);const phase=o.mergePhase;
  for(let i=0;i<100;i++)o.step(.1,c,.1,h);
  assert.equal(h.merge,25);assert.equal(o.mergePhase,phase);assert.notEqual(c.yaw,initial.yaw);
  h.enabled=true;h.view='pair';o.step(.1,c,.1,h);assert.ok(h.merge<25);
 }
});

test('Real frame orchestration freezes orbit while paused, hidden or launch-held',()=>{
 const a=app();a.orbit.setEnabled(true);a.sim.playing=false;const original=plain(a.camera),merge=a.hostSettings.merge,phase=a.orbit.mergePhase;ticks(a,1010,1510);
 assert.deepEqual(plain(a.camera),original);assert.equal(a.sim.time,0);
 assert.equal(a.hostSettings.merge,merge);assert.equal(a.orbit.mergePhase,phase);
 // LaunchPopover.hold uses this same real paused simulation state.
 const held={app:a,held:false};a.sim.playing=true;context.LaunchClass.prototype.hold.call(held);ticks(a,1520,2010);
 assert.deepEqual(plain(a.camera),original);assert.equal(a.sim.time,0);
 assert.equal(a.hostSettings.merge,merge);assert.equal(a.orbit.mergePhase,phase);
 a.sim.playing=true;context.document.hidden=true;ticks(a,2020,2510);assert.deepEqual(plain(a.camera),original);
 context.document.hidden=false;documentEvents.visibilitychange();a.tick(3000);assert.deepEqual(plain(a.camera),original);
 assert.equal(a.hostSettings.merge,merge);assert.equal(a.orbit.mergePhase,phase);
 ticks(a,3010,3110);assert.notDeepEqual(plain(a.camera),original);
 assert.ok(a.hostSettings.merge<merge);
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

test('Manual merge takes control while zoom and G900 opacity retain the orbit',()=>{
 const a=app(),ui=Object.create(context.UIClass.prototype),container=element();a.sim.time=12.5;
 ui.app=a;ui.ranges=[];ui.elements={};ui.el=()=>container;ui.syncPresets=()=>{};a.changed=()=>{};
 ui.addRanges('test','hostSettings','camera',[['merge','Merge halves',0,100,1,0]]);
 ui.addRanges('test','camera','camera',[['zoom','Zoom',.5,4,.1,1]]);
 ui.addRanges('test','hostSettings','display',[['hostOpacity','G900 opacity',0,1,.01,0,'opacity']]);
 for(const [i,value,enabled] of [[0,'37',false],[1,'2',true],[2,'.2',true]]){
  a.orbit.setEnabled(true,a.hostSettings.merge);const r=ui.ranges[i];r.input.value=value;r.input.listeners.input();
  assert.equal(a.orbit.enabled,enabled);assert.equal(a.sim.time,12.5);
 }
 assert.equal(a.hostSettings.merge,37);assert.equal(a.hostSettings.opacity,.2);assert.equal(a.camera.zoom,2);
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
console.log(`${checks}/15 orbit/merge checks passed`);
