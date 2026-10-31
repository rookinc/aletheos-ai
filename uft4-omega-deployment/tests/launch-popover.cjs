const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const file=require('node:path').join(__dirname,'../../public_html/observatories/uft4-omega/index.html');
const js=fs.readFileSync(file,'utf8').match(/<script>([\s\S]*)<\/script>/)[1];
const context={console};vm.createContext(context);vm.runInContext(js+'\nglobalThis.LaunchPopover=LaunchPopover;',context);
// Preserve the uploaded startup phase while the launch dialog holds playback.
const startupTime=215.92550000000682;
function setup(){
 const nodes={};for(const id of ['launchDialog','launchContinue','launchStatus','launchInstruction','launchPauseNote','openCredits'])nodes[id]={dataset:{},disabled:id==='launchContinue',listeners:{},addEventListener(n,f){this.listeners[n]=f},emit(n,e={}){this.listeners[n]?.(e)},focus(){this.focused=true},showModal(){this.open=true},close(){this.open=false;this.emit('close')}};
 context.document={getElementById:id=>nodes[id],activeElement:nodes.openCredits};context.location={reload(){context.reloaded=true}};
 const launch=new context.LaunchPopover(),app={sim:new context.UFT4.SimulationEngine(),last:42,ui:{sync(){}},renderer:{stats:{frames:0},lost:false,stopped:false,failed:false}};
 app.sim.time=startupTime;launch.open();launch.attach(app);return{launch,app,nodes};
}
let count=0;function test(name,fn){fn();console.log('PASS '+name);count++;}
test('Launch holds the uploaded simulation phase and blocks early dismissal',()=>{const{launch,app,nodes}=setup();app.sim.step(.07);assert.equal(app.sim.time,startupTime);assert.equal(app.sim.playing,false);let blocked=false;nodes.launchDialog.emit('cancel',{preventDefault(){blocked=true}});assert.equal(blocked,true);launch.afterFrame();assert.equal(launch.state,'loading');assert.equal(nodes.launchContinue.disabled,true)});
test('First successful frame enables Continue and resumes without clock jump',()=>{const{launch,app,nodes}=setup();app.renderer.stats.frames=1;launch.afterFrame();assert.equal(launch.state,'ready');assert.equal(nodes.launchContinue.disabled,false);assert.equal(app.launchPopover,null);nodes.launchContinue.emit('click');assert.equal(nodes.launchDialog.open,false);assert.equal(app.sim.playing,true);assert.equal(app.sim.time,startupTime);assert.equal(app.last,0);app.sim.step(.04);assert.equal(app.sim.time,startupTime+.04)});
test('Reopening restores playing and paused states, preserving time',()=>{const{launch,app,nodes}=setup();app.renderer.stats.frames=1;launch.afterFrame();nodes.launchContinue.emit('click');app.sim.step(.03);launch.openCredits();assert.equal(app.sim.playing,false);nodes.launchContinue.emit('click');assert.equal(app.sim.playing,true);assert.equal(app.sim.time,startupTime+.03);app.sim.playing=false;launch.openCredits();nodes.launchContinue.emit('click');assert.equal(app.sim.playing,false);assert.equal(app.sim.time,startupTime+.03);assert.equal(nodes.openCredits.focused,true)});
test('Readiness waits for successful Safe Sheets frame after fallback',()=>{const{launch,app,nodes}=setup();app.renderer.failed=true;launch.afterFrame();assert.equal(launch.state,'loading');app.renderer.stats.frames=1;launch.afterFrame();assert.equal(nodes.launchStatus.textContent,'Graphics ready in Safe Sheets.')});
test('Context loss and stopped renderer offer reload, not false readiness',()=>{for(const kind of ['lost','stopped']){const{launch,app,nodes}=setup();app.renderer[kind]=true;launch.afterFrame();assert.equal(launch.state,'error');assert.equal(app.sim.playing,false);assert.equal(nodes.launchContinue.textContent,'Reload simulator');nodes.launchContinue.emit('click');assert.equal(context.reloaded,true)}});
test('Native G60/G15 validation remains successful',()=>{assert.equal(context.UFT4.GraphEngine.validate().valid,true)});
console.log(`${count}/6 checks passed`);
