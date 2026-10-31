'use strict';
// Test the shipped inline settings code with real mathematical engines.
// DOM, downloads and canvas allocation are stubbed; these are not browser/GPU tests.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const assert=require('node:assert/strict'),crypto=require('node:crypto');
const html=fs.readFileSync(path.join(__dirname,'../../public_html/observatories/uft4-omega/index.html'),'utf8');
const script=html.match(/<script>([\s\S]*)<\/script>/)[1];
const context={console,performance:require('node:perf_hooks').performance,TextEncoder,TextDecoder,Blob,URL,setTimeout,clearTimeout,DecompressionStream};
vm.createContext(context);vm.runInContext(script+'\nglobalThis.AppClass=ObservatoryApp;globalThis.LaunchClass=LaunchPopover;',context);
const {SettingsPresets,SettingsTransfer}=context.UFT4;
const plain=value=>JSON.parse(JSON.stringify(value));
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
function element(){return {open:false,hidden:false,disabled:false,textContent:'',listeners:{},addEventListener(k,fn){this.listeners[k]=fn;},setAttribute(){},classList:{toggle(){}}};}
context.document={hidden:false,addEventListener(){}};context.window={addEventListener(){}};
context.requestAnimationFrame=()=>1;context.cancelAnimationFrame=()=>{};context.element=element;
vm.runInContext(`UIController=class {
 constructor(app){this.app=app;this.nodes={};this.messages=[];}el(id){return this.nodes[id]||(this.nodes[id]=element());}
 updateHost(){}syncCamera(){}syncRotisserie(){}sync(){}status(message){this.messages.push(message);}
};RenderingEngine=class {
 constructor(app){this.app=app;this.config={period:67};this.invalidations=[];this.failed=false;this.lost=false;this.stopped=false;this.level='balanced';this.releases=0;}
 effectiveMode(){return this.app.settings.faceMode;}invalidate(kind){this.invalidations.push(kind);}render(){}
 setQuality(value){this.level=value;}release(){this.releases++;}
 fallback(message){this.failed=true;this.app.settings.faceMode='sheets';this.app.settings.quality='safe';this.level='safe';this.message=message;}
};`,context);
function app(){const a=new context.AppClass();a.start=()=>{};a.renderer.invalidations=[];a.renderer.releases=0;return a;}
function panels(a){return Object.fromEntries(SettingsPresets.panels.map(id=>[id,a.ui.el(id).open]));}
function state(a){return plain(SettingsPresets.capture(a,panels(a)).settings);}
function file(text,name='settings.json'){const bytes=new TextEncoder().encode(text);return{name,size:bytes.length,arrayBuffer:async()=>bytes.buffer};}
let checks=0;
async function test(name,fn){await fn();checks++;console.log('PASS '+name);}
function assertRejectedWithoutMutation(a,record,pattern){const before=state(a);assert.throws(()=>SettingsPresets.apply(a,record),pattern);assert.deepEqual(state(a),before);}

(async()=>{
await test('Complete startup profile matches the exact user-uploaded ZIP fixture',()=>{
 // Independent fixture reader: this known archive is a single stored JSON file.
 // Its frozen upload hash detects accidental replacement with regenerated defaults.
 const zip=fs.readFileSync(path.join(__dirname,'../default-settings.zip'));
 assert.equal(crypto.createHash('sha256').update(zip).digest('hex'),'8765d9c6e1abe375cd6af5ee4148fe4caad16df91c3aa067e3f3652a01d24086');
 assert.equal(zip.readUInt32LE(0),0x04034b50);assert.equal(zip.readUInt16LE(8),0);
 const start=30+zip.readUInt16LE(26)+zip.readUInt16LE(28),length=zip.readUInt32LE(18);
 const uploaded=JSON.parse(zip.subarray(start,start+length).toString('utf8'));
 const a=app(),record=SettingsPresets.capture(a,panels(a));
 assert.equal(record.format,'uft4-omega-settings');assert.equal(record.schemaVersion,1);
 assert.deepEqual(plain(context.UFT4.STARTUP_PRESET.settings),uploaded.settings);
 assert.deepEqual(plain(record.settings),uploaded.settings);
 assert.equal(record.settings.appearance.faceMode,'hybrid');assert.equal(record.settings.appearance.palette,'ice');
 assert.equal(record.settings.host.display.opacity,1);assert.equal(record.settings.appearance.fiberOpacity,.11);
 assert.equal(record.settings.orbit.enabled,true);assert.equal(record.settings.simulation.time,215.92550000000682);assert.equal(record.settings.panels.settingsFiles,true);
 a.generated={sites:[{p:[1,2,3]}],edges:[[0,1]]};a.fiberAudit={orbits:[[0,1,2,3]]};
 const data=JSON.stringify(SettingsPresets.capture(a));assert.ok(!data.includes('"sites"'));assert.ok(!data.includes('"edges"'));assert.ok(!data.includes('"orbits"'));
 assert.equal(SettingsPresets.validate(record,a.host).host.display.merge,100);
});

await test('Launch credits hold the imported time and enabled orbit without discarding the profile',()=>{
 const a=app(),before=state(a),held={app:a,held:false};
 assert.equal(a.sim.playing,true);assert.equal(a.orbit.enabled,true);
 context.LaunchClass.prototype.hold.call(held);
 assert.equal(held.held,true);assert.equal(held.resumePlaying,true);assert.equal(a.sim.playing,false);
 a.last=1000;a.lastPaint=1000;for(let t=1010;t<=2010;t+=10)a.tick(t);
 const expected=plain(before);expected.simulation.playing=false;
 assert.deepEqual(state(a),expected);assert.equal(a.sim.time,215.92550000000682);
});

await test('All control groups and playback positions survive JSON capture/apply round trip',()=>{
 const source=app(),dest=app();
 Object.assign(source.camera,{yaw:-141.25,pitch:178.75,roll:-179.5,zoom:1.73});
 Object.assign(source.settings,{faceMode:'hybrid',palette:'ember',blur:17,glow:2.1,opacity:.43,detail:1.25,turbulence:.71,quality:'low',highContrast:true,sceneLabels:true,fiberOpacity:.64});
 for(const key of Object.keys(source.layers))source.layers[key]=!source.layers[key];
 Object.assign(source.bcSettings,{enabled:true,dots:true,trails:false,tailDegrees:359,tailOpacity:.91,scope:'center',labels:true});
 Object.assign(source.sim.params,{spin:-2.15,major:.79,minor:.27,core:.16,k:4.8,omega:2*Math.PI*7.3,amp:1.2,speed:1.47});
 source.sim.time=-125.75;source.sim.mode='chiral';source.sim.playing=false;source.sim.direction=-1;
 Object.assign(source.hostSettings,{enabled:false,view:'overview',local:true,external:true,trails:true,merge:37,opacity:.77});
 source.host.setSource(9,37);source.host.setNeighborBlock(source.host.blockNeighbors[9][2]);source.host.rate=2.25;source.host.seekHop(3.125);source.host.repeat=true;source.host.playing=true;source.host.lapCount=17;
 Object.assign(source.research,{resonanceMode:'tolerant',gradFilter:false,minFilter:false,coherenceFilter:false,mergeFilter:false,compareFilter:true,phaseTol:1.2,gradTol:.01,edgeTol:-.1,coherenceTol:1.55,orbitTol:.62,fiberView:'split'});
 source.orbit.setEnabled(true);SettingsPresets.panels.forEach((id,i)=>source.ui.el(id).open=i%2===0);
 const expected=state(source),record=JSON.parse(JSON.stringify(SettingsPresets.capture(source,panels(source))));
 const params=dest.sim.params,camera=dest.camera,native=JSON.stringify([dest.graph.edges,dest.graph.fibers,dest.graph.qEdges,dest.host.edges]);
 dest.generated={sites:[{}]};dest.fiberAudit={orbits:[]};const result=SettingsPresets.apply(dest,record);
 assert.deepEqual(plain(result),[]);assert.deepEqual(state(dest),expected);
 assert.equal(dest.sim.params,params);assert.equal(dest.camera,camera);assert.equal(dest.generated,null);assert.equal(dest.fiberAudit,null);
 assert.equal(JSON.stringify([dest.graph.edges,dest.graph.fibers,dest.graph.qEdges,dest.host.edges]),native);
 near(dest.sim.field([.4,.7,.2]),source.sim.field([.4,.7,.2]));assert.equal(dest.bc.tailDegrees,359);
 assert.equal(dest.renderer.level,'low');assert.equal(dest.renderer.releases,1);assert.deepEqual(plain(dest.renderer.invalidations),['geometry','field']);
 assert.equal(dest.last,0);assert.equal(dest.lastPaint,0);
});

await test('Wrong formats, unsupported versions, missing and unknown fields fail before state changes',()=>{
 const a=app(),base=plain(SettingsPresets.capture(a));
 for(const mutate of [r=>r.format='other',r=>r.schemaVersion=99,r=>delete r.settings.camera.zoom,r=>r.settings.camera.secret=1,r=>r.settings.graph={edges:[]},r=>r.unknown=true,r=>r.settings=[]]){
  const record=plain(base);mutate(record);assertRejectedWithoutMutation(a,record);
 }
 const poison=JSON.parse(JSON.stringify(base).replace('"camera":{','"camera":{"__proto__":{"polluted":true},'));
 assertRejectedWithoutMutation(a,poison);assert.equal({}.polluted,undefined);
});

await test('Nonfinite numbers, wrong types and out-of-control-range values are rejected',()=>{
 const a=app(),base=plain(SettingsPresets.capture(a));
 const mutations=[r=>r.settings.camera.zoom=NaN,r=>r.settings.camera.yaw=Infinity,r=>r.settings.camera.zoom=2.81,r=>r.settings.camera.zoom='2',r=>r.settings.layers.face=1,r=>r.settings.appearance.palette='unknown',r=>r.settings.simulation.params.omega=40*Math.PI+.01,r=>r.settings.simulation.time=1e10,r=>r.settings.simulation.direction=0,r=>r.settings.host.sourceVertex=1.5,r=>r.settings.bc.tailOpacity=-.1,r=>r.settings.research.gradTol=.2,r=>r.settings.panels.about='open'];
 for(const mutate of mutations){const record=plain(base);mutate(record);assertRejectedWithoutMutation(a,record,/Invalid settings/);}
});

await test('Native neighbor relation and selected-source pulse range are checked before import',()=>{
 const a=app(),record=plain(SettingsPresets.capture(a));record.settings.host.neighborBlock=record.settings.host.sourceBlock;
 assertRejectedWithoutMutation(a,record,/not native neighbors/);
 const probe=app();let found=false;
 for(let v=0;v<900;v++){probe.host.setSource(Math.floor(v/60),v%60);if(probe.host.maxHop<8){found=true;break;}}
 assert.equal(found,true);const tooFar=plain(SettingsPresets.capture(probe));tooFar.settings.host.travel=10;
 assertRejectedWithoutMutation(a,tooFar,/Pulse position/);
});

await test('Imports preserve graphics failure barriers and do not revive failed BC rendering',()=>{
 const a=app(),record=plain(SettingsPresets.capture(a));record.settings.appearance.quality='high';record.settings.appearance.faceMode='plasma';record.settings.bc.enabled=true;
 a.renderer.failed=true;a.bcRenderer.failed=true;const warnings=SettingsPresets.apply(a,record);
 assert.equal(a.settings.faceMode,'sheets');assert.equal(a.settings.quality,'safe');assert.equal(a.renderer.level,'safe');assert.equal(a.bcSettings.enabled,false);assert.equal(warnings.length,2);
 const lost=app();lost.renderer.lost=true;assertRejectedWithoutMutation(lost,SettingsPresets.capture(lost),/Reload the graphics engine/);
 const busy=app();busy.job={};assertRejectedWithoutMutation(busy,SettingsPresets.capture(busy),/research run/);
});

await test('JSON import restores settings and playback without applying generated output',async()=>{
 const source=app(),dest=app();source.camera.zoom=1.41;source.hostSettings.merge=23;source.sim.time=9.5;source.sim.playing=false;source.research.resonanceMode='off';source.orbit.setEnabled(true);
 const transfer=new SettingsTransfer(dest.ui);await transfer.importFile(file(JSON.stringify(SettingsPresets.capture(source,panels(source)))));
 assert.deepEqual(state(dest),state(source));assert.match(dest.ui.el('settingsFileStatus').textContent,/Settings imported/);assert.equal(transfer.busy,false);assert.equal(dest.ui.el('importSettings').disabled,false);assert.equal(dest.ui.el('exportSettings').disabled,false);
});

await test('Malformed, oversized and unsupported JSON imports leave scene and playback unchanged',async()=>{
 const a=app(),transfer=new SettingsTransfer(a.ui),before=state(a);
 const unsupported=plain(SettingsPresets.capture(a));unsupported.schemaVersion=2;
 for(const bad of [file('{"bad":'),file(JSON.stringify(unsupported)),file('[]'),{size:1048577,arrayBuffer(){throw Error('must not read oversized file');}},{size:0,arrayBuffer(){throw Error('must not read empty file');}},file(' '.repeat(262145))]){
  await transfer.importFile(bad);assert.deepEqual(state(a),before);assert.match(a.ui.el('settingsFileStatus').textContent,/Import failed/);assert.equal(transfer.busy,false);assert.equal(a.ui.el('importSettings').disabled,false);
 }
});

await test('Export download contains settings JSON that can be imported from its ZIP',async()=>{
 const source=app(),dest=app();source.hostSettings.merge=62;source.camera.roll=123;source.sim.time=4.5;source.sim.playing=false;source.ui.el('effectsDetails').open=true;
 let blob,clicks=0,removed=false,filename='',revocations=0;
 context.URL={createObjectURL(value){blob=value;return 'blob:test-settings';},revokeObjectURL(){revocations++;}};
 context.document.createElement=()=>({click(){clicks++;filename=this.download;},remove(){removed=true;}});context.document.body={append(){}};
 const exporter=new SettingsTransfer(source.ui);exporter.exportZIP();
 const retry=source.ui.el('settingsDownload');assert.equal(retry.hidden,false);assert.equal(retry.href,'blob:test-settings');assert.equal(retry.download,filename);assert.equal(retry.href,exporter.downloadURL);
 exporter.revokeDownload();assert.equal(retry.hidden,true);assert.equal(exporter.downloadURL,null);
 assert.equal(clicks,1);assert.equal(removed,true);assert.equal(revocations,1);assert.match(filename,/^uft4-omega-settings-.*\.zip$/);assert.equal(blob.type,'application/zip');
 const bytes=new Uint8Array(await blob.arrayBuffer());assert.equal(bytes[0],0x50);assert.equal(bytes[1],0x4b);
 const transfer=new SettingsTransfer(dest.ui);await transfer.importFile({name:filename,size:bytes.length,arrayBuffer:async()=>bytes.buffer});
 assert.match(dest.ui.el('settingsFileStatus').textContent,/Settings imported/);assert.deepEqual(state(dest),state(source));
});

await test('A corrupt ZIP fails without changing the running scene',async()=>{
 const a=app(),transfer=new SettingsTransfer(a.ui),before=state(a);
 const bytes=Uint8Array.from(context.UFT4.SettingsArchive.zip(JSON.stringify(SettingsPresets.capture(a))));
 // Alter the first stored payload byte while retaining the original CRC.
 const view=new DataView(bytes.buffer);const payload=30+view.getUint16(26,true)+view.getUint16(28,true);bytes[payload]^=1;
 await transfer.importFile({name:'corrupt.zip',size:bytes.length,arrayBuffer:async()=>bytes.buffer});
 assert.deepEqual(state(a),before);assert.match(a.ui.el('settingsFileStatus').textContent,/Import failed/);assert.equal(transfer.busy,false);
});

console.log(`${checks}/${checks} settings preset checks passed`);
})().catch(error=>{console.error(error);process.exitCode=1;});
