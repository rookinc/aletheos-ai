'use strict';
// Exercise the real inline drawing methods with a recording Canvas2D stub.
// This verifies drawing contracts, not physical Android or GPU performance.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../../public_html/observatories/uft4-omega/index.html'),'utf8');
const source=html.match(/<script>([\s\S]*)<\/script>/)[1];
const context={console,performance:require('node:perf_hooks').performance};vm.createContext(context);vm.runInContext(source,context);
const U=context.UFT4,plain=x=>JSON.parse(JSON.stringify(x)),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
let checks=0;const test=(name,fn)=>{fn();checks++;console.log('PASS '+name)};
class RecordingCanvas {
 constructor(){this.records=[];this.stack=[];this.path=[];this.globalAlpha=.37;this.strokeStyle='#123456';this.fillStyle='#654321';this.lineWidth=7;this.globalCompositeOperation='source-over';this.lineCap='butt';this.lineJoin='miter';this.font='10px sans-serif';this.textAlign='left';this.textBaseline='alphabetic';}
 save(){this.stack.push(Object.fromEntries(RecordingCanvas.fields.map(k=>[k,this[k]])));}
 restore(){assert.ok(this.stack.length);Object.assign(this,this.stack.pop());}
 beginPath(){this.path=[];} moveTo(...p){this.path.push(['M',...p]);} lineTo(...p){this.path.push(['L',...p]);} arc(...p){this.path.push(['A',...p]);}closePath(){this.path.push(['Z']);}setLineDash(){}
 stroke(){this.records.push({kind:'stroke',color:this.strokeStyle,alpha:this.globalAlpha,width:this.lineWidth,path:this.path.slice()});}
 fill(){this.records.push({kind:'fill',color:this.fillStyle,alpha:this.globalAlpha,path:this.path.slice()});}
 fillText(text,x,y){this.records.push({kind:'text',color:this.fillStyle,alpha:this.globalAlpha,path:[text,x,y]});}
 isContextLost(){return false;}
 createImageData(){throw Error('Overlay attempted image allocation');}createLinearGradient(){throw Error('Overlay attempted gradient allocation');}createRadialGradient(){throw Error('Overlay attempted gradient allocation');}
 snapshot(){return Object.fromEntries(RecordingCanvas.fields.map(k=>[k,this[k]]));}
 static fields=['globalAlpha','strokeStyle','fillStyle','lineWidth','globalCompositeOperation','lineCap','lineJoin','font','textAlign','textBaseline'];
}
function fixture(){
 const a={sim:new U.SimulationEngine(),graph:new U.GraphEngine(),settings:{palette:'ice',highContrast:false,faceMode:'plasma',sceneLabels:true},camera:{yaw:40,pitch:25,roll:-55,zoom:2.6},hostSettings:{enabled:true,view:'pair',merge:100,opacity:.8,local:true,external:true,trails:true},bcSettings:{enabled:true,tailDegrees:182,tailOpacity:1,dots:true,trails:true,labels:true,scope:'layers'},layers:{face:true,g60:true,vertices:true,g15:true,g30:true,g30Links:true,fibers:true,selectedConnections:true,generatedLayer:true,showFiberRays:true,showFiberLabels:true},research:{fiberView:'overlay'},ui:{sync(){},status(message){throw Error(message)}}};
 a.host=new U.HostEngine(a.graph);a.host.setNeighborBlock(1);a.tower=new U.TowerReferenceEngine(a.graph);a.geometry=new U.GeometryEngine(a.sim.params);a.geometry.configure(a.camera,390,376);a.hostRenderer=new U.HostRenderer(a);a.hostRenderer.configure(a.geometry,390,376);a.graph.rebuild(a.geometry);a.sim.time=.43;a.graph.update(a.sim,a.geometry);
 a.bc=new U.BCTracerEngine(182);a.bcRenderer=new U.BCTracerRenderer(a);
 a.generated={sites:[{p:[.1,.2,.3]},{p:[.2,.4,.1]},{p:[-.1,.2,.2]},{p:[-.2,.1,.3]}],edges:[[0,1],[1,2],[2,3],[0,3]]};a.fiberAudit={orbits:[[0,1,2,3]]};
 const r=Object.create(U.RenderingEngine.prototype);Object.assign(r,{app:a,ctx:new RecordingCanvas(),level:'balanced',lost:false,stopped:false,w:390,h:376,stats:{},genScreen:new Float64Array(0),scratchPoint:new Float64Array(3)});return{a,r,c:r.ctx};
}
function tailDraw(f,opacity){f.a.bcSettings.tailOpacity=opacity;f.c.records=[];f.a.bcRenderer.prepare(f.r);assert.equal(f.a.bcRenderer.failed,false);return f.c.records.slice();}

test('Opacity scales trail alpha, preserves paths and restores canvas state',()=>{
 const f=fixture(),before=f.c.snapshot(),full=tailDraw(f,1),quarter=tailDraw(f,.25);assert.ok(full.length>0);assert.equal(full.length,quarter.length);
 full.forEach((record,i)=>{near(quarter[i].alpha,record.alpha*.25);assert.deepEqual(quarter[i].path,record.path);assert.equal(quarter[i].color,record.color)});
 assert.deepEqual(f.c.snapshot(),before);assert.equal(f.c.stack.length,0);
});
test('Zero tail opacity hides trails while keeping BC dots and graph overlays',()=>{
 const f=fixture();assert.equal(tailDraw(f,0).length,0);assert.equal(f.a.bcRenderer.prepared,true);assert.equal(f.a.bcRenderer.segmentsDrawn,0);
 f.a.bcRenderer.drawHeads(f.r);assert.equal(f.a.bcRenderer.headsDrawn,15);assert.equal(f.c.records.filter(x=>x.kind==='fill').length,15);
 f.c.records=[];f.a.hostRenderer.render(f.r);const graphAtZero=plain(f.c.records);assert.ok(graphAtZero.length>0);
 f.a.bcSettings.tailOpacity=1;f.c.records=[];f.a.hostRenderer.render(f.r);assert.deepEqual(plain(f.c.records),graphAtZero);
});
test('Opacity clamping is finite and default strength is retained',()=>{
 assert.equal(U.getTailOpacity({}),1);assert.equal(U.getTailOpacity({tailOpacity:NaN}),1);assert.equal(U.getTailOpacity({tailOpacity:-1}),0);assert.equal(U.getTailOpacity({tailOpacity:2}),1);
 const f=fixture();assert.equal(tailDraw(f,-1).length,0);const full=tailDraw(f,1),high=tailDraw(f,2);assert.deepEqual(high,full);
});
test('Every palette and sunlight variant supplies cached, distinct BC and graph colors',()=>{
 const signatures=new Set();
 for(const palette of ['nebula','ember','ice'])for(const highContrast of [false,true]){
  const settings={palette,highContrast},t=U.getOverlayTheme(settings);assert.equal(U.getOverlayTheme(settings),t);assert.ok(Object.isFrozen(t)&&Object.isFrozen(t.bc));assert.equal(new Set(t.bc).size,3);assert.notEqual(t.local,t.external);signatures.add(JSON.stringify(t));
  const f=fixture();Object.assign(f.a.settings,settings);const tails=tailDraw(f,1);assert.deepEqual([...new Set(tails.map(x=>x.color))].sort(),[...t.bc].sort());
  f.c.records=[];f.a.bcRenderer.drawHeads(f.r);assert.deepEqual([...new Set(f.c.records.filter(x=>x.kind==='fill').map(x=>x.color))].sort(),[...t.bc].sort());
  f.c.records=[];f.a.hostRenderer.render(f.r);const colors=new Set(f.c.records.map(x=>x.color));for(const name of ['local','external','g30','generated','source','partner'])assert.ok(colors.has(t[name]),`${palette}/${highContrast} missing ${name}`);
  const allowed=new Set(Object.values(t).filter(x=>typeof x==='string'));assert.ok(f.c.records.every(x=>allowed.has(x.color)),`${palette}/${highContrast} has an unthemed color`);
 }
 assert.equal(signatures.size,6);
});
test('Sheets, Plasma, Hybrid and Sunlight reuse fixed resources and bounded strokes',()=>{
 const f=fixture(),b=f.a.bcRenderer,refs=[b.projected,b.activeSlots,b.alpha,b.width,b.strides,b.bins,f.a.bc.positions],budget=b.fixedBytes,sim=JSON.stringify(f.a.sim.snapshot()),coordinates=Array.from(f.a.graph.points);
 for(let repeat=0;repeat<5;repeat++)for(const faceMode of ['sheets','plasma','hybrid'])for(const highContrast of [false,true])for(const palette of ['nebula','ember','ice']){
  Object.assign(f.a.settings,{faceMode,highContrast,palette});tailDraw(f,.6);b.drawHeads(f.r);assert.ok(b.segmentsDrawn<=5*3*112);assert.equal(b.headsDrawn,15);assert.equal(b.failed,false);
 }
 [b.projected,b.activeSlots,b.alpha,b.width,b.strides,b.bins,f.a.bc.positions].forEach((x,i)=>assert.equal(x,refs[i]));assert.equal(b.fixedBytes,budget);assert.equal(JSON.stringify(f.a.sim.snapshot()),sim);assert.deepEqual(Array.from(f.a.graph.points),coordinates);assert.equal(f.c.stack.length,0);
});
test('Sunlight overlay colors have readable solid-color contrast',()=>{
 const luminance=hex=>{const rgb=hex.match(/[a-f\d]{2}/gi).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2]};
 const bg=luminance('#f8fafc');for(const palette of ['nebula','ember','ice']){const t=U.getOverlayTheme({palette,highContrast:true});for(const name of ['local','external','secondary','generated'])assert.ok((bg+.05)/(luminance(t[name])+.05)>=4.5,`${palette} ${name}`)}
});
test('Default 1 Hz field has a one-second period and finite evaluations',()=>{
 const sim=new U.SimulationEngine();near(sim.frequencyHz,1);near(sim.params.omega,2*Math.PI);
 for(const mode of ['scalar','chiral']){sim.mode=mode;for(const t of [0,.17,2.3])for(const d of [.01,.1,.5,1,4]){sim.time=t;const value=sim.radial(d);assert.ok(Number.isFinite(value));sim.time=t+1;near(sim.radial(d),value)}}
 assert.equal(U.GraphEngine.validate().valid,true);const host=new U.HostEngine(new U.GraphEngine());assert.equal(host.edges.length,3600);assert.ok(host.neighbors.every(x=>x.length===8));
});
test('Camera Orbit label and tail opacity control are exposed without changing orbit rates',()=>{
 assert.match(html,/Camera Orbit · Off/);assert.doesNotMatch(html,/Rotisserie ·|rotisserie camera orbit|Camera rotisserie:/);assert.match(source,/\['tailOpacity','Tail opacity',0,1,\.01,0\]/);assert.match(source,/tailDegrees:182,tailOpacity:1/);
 const orbit=new U.CameraOrbit(),camera={yaw:0,pitch:0,roll:0,zoom:2.6};orbit.setEnabled(true);for(let i=0;i<10;i++)orbit.step(.1,camera,.1);near(camera.yaw,6);near(camera.pitch,4);near(camera.roll,3);near(camera.zoom,2.6);
});
console.log(`${checks}/8 themed-tail checks passed`);
