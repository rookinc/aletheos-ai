function verifyG1800(api,data,core,constructions,makeController){
 const results=[],assert=(v,m)=>{if(!v)throw Error(m);},same=(a,b,m)=>assert(JSON.stringify(a)===JSON.stringify(b),m),test=(name,fn)=>{fn();results.push({name,status:'passed'});};
 const {G1800Engine:E,GraphEngine,GeometryEngine,SettingsPresets:S}=api,e=new E(data);
 test('Native G60 edges retain exact current registration',()=>same(data.edges,GraphEngine.edges,'G60 registration mismatch'));
 test('All quotient partitions reproduce pinned core, 14,400 product assignments',()=>{
  same(e.base,core.g900&&{qid:core.g900.qid,fibers:core.g900.fibers},'G900 quotient');
  for(const k of E.axes)same(e.models[k],{qid:core.g1800[k].qid,fibers:core.g1800[k].fibers},'G1800 '+k);
 });
 test('Every G1800 state projects consistently; exactly two states per native G900 address',()=>{
  for(const k of E.axes)for(let q=0;q<1800;q++){const f=core.g1800[k].fibers[q],b=core.g900.qid[f[0]];assert(e.projections[k][q]===b&&f.every(s=>core.g900.qid[s]===b),'Projection');assert(e.sheets[k][b].length===2,'Fiber count');}
 });
 test('All 5,400 native turns reproduce conjugated Audit040 maps',()=>{
  for(const c of constructions){const k=c.certificate.image_axes[1],m=c.nativeMaps[0];for(let q=0;q<1800;q++)assert(data.turns[k][m[q]]===m[c.K[0][q]],'Turn provenance');}
 });
 test('K² is residual diagonal deck action, K⁴ identity; 450 free four-cycles per kernel',()=>{
  for(const k of E.axes){const other=E.axes.find(x=>x!==k),p=data.deck[other],seen=new Set();let count=0;
   for(let q=0;q<1800;q++){const [u,v]=E.pair(core.g1800[k].fibers[q][0]),delta=core.g1800[k].qid[p[u]*60+p[v]];
    assert(e.flip(k,q)===delta&&delta!==q,'Residual deck');
    assert(e.step(k,q,2)===delta&&e.step(k,q,4)===q&&e.step(k,e.step(k,q,1),-1)===q,'Power law');
    if(!seen.has(q)){count++;for(const s of e.inspect(k,q).cycle){assert(!seen.has(s),'Cycle overlap');seen.add(s);}}
   }assert(count===450&&seen.size===1800,'Cycle decomposition');
  }
 });
 test('All 480 diagonal automorphisms descend on all 5,400 states and invert',()=>{
  for(let i=0;i<480;i++){
   const a=data.automorphisms[i],ref=core.automorphisms[i];same(a.p,ref.permutation,'Automorphism source');assert(e.preservesEdges(a.p),'Adjacency');const inverse=Array(60);a.p.forEach((v,j)=>inverse[v]=j);
   for(const k of E.axes){const target=a.action[E.axes.indexOf(k)],src=e.models[k],dst=e.models[target];
    assert(target===ref.deck_action[k],'Kernel action');
    for(let q=0;q<1800;q++){
     const images=src.fibers[q].map(s=>{const [u,v]=E.pair(s);return dst.qid[a.p[u]*60+a.p[v]];});assert(images[0]===images[1],'Quotient descent');
     const back=dst.fibers[images[0]].map(s=>{const [u,v]=E.pair(s);return src.qid[inverse[u]*60+inverse[v]];});assert(back.every(x=>x===q),'Inverse descent');
    }
    const q=(i*37)%1800,out=e.transport(k,q,i),back=e.transport(out.kernel,out.state,i,true);same(back,{kernel:k,state:q},'Runtime transport round trip');
   }
  }
 });
 test('Invalid state and action requests are refused',()=>{
  const rejects=fn=>{let threw=false;try{fn();}catch{threw=true;}assert(threw,'Expected rejection');};
  for(const q of [-1,1800,NaN,.5])rejects(()=>e.inspect('a',q));
  rejects(()=>e.step('a',0,.1));rejects(()=>e.inspect('x',0));rejects(()=>e.transport('a',0,480));
  const bad=JSON.parse(JSON.stringify(data));bad.turns.a[0]=bad.turns.a[1];rejects(()=>new E(bad));
 });
 const host={blockNeighbors:Array.from({length:15},(_,i)=>[(i+1)%15]),neighbors:Array.from({length:900},(_,i)=>[(i+1)%900,(i+899)%900])};
 function record(version=3){
  const schema=S.schema;
  function sample(rule){if(rule==='boolean')return false;if(Array.isArray(rule))return rule[0];if(Object.hasOwn(rule,'min'))return rule.min;return Object.fromEntries(Object.entries(rule).map(([k,v])=>[k,sample(v)]));}
  const settings=sample(schema);settings.host.sourceBlock=0;settings.host.neighborBlock=1;settings.host.sourceVertex=0;settings.host.travel=0;settings.g1800=S.defaultLift();
  if(version<3)delete settings.g1800;if(version===1)delete settings.layout;
  return {format:S.format,schemaVersion:version,appVersion:'test',exportedAt:'test',settings};
 }
 test('Schema 1/2 migrate to G900; schema 3 retains G1800',()=>{
  for(const v of [1,2]){const s=S.validate(record(v),host);same(s.g1800,S.defaultLift(),'Legacy defaults');}
  const r=record();r.settings.g1800={...S.defaultLift(),active:true,kernel:'b',state:480,origin:0,steps:1,running:true};same(S.validate(r,host).g1800,r.settings.g1800,'G1800 round trip');
 });
 test('Invalid G1800 imports are atomic before any live state changes',()=>{
  const bad=record();bad.settings.g1800.state=1800;let threw=false;try{S.apply({host},bad);}catch{threw=true;}assert(threw,'Range refusal');
  const mismatch=record();mismatch.settings.g1800.state=1;
  const app={host,renderer:{lost:false,stopped:false},g1800:{available:true,engine:e},layout:{sentinel:true}};
  const before=JSON.stringify(app.layout);threw=false;try{S.apply(app,mismatch);}catch{threw=true;}assert(threw&&JSON.stringify(app.layout)===before,'Atomic incompatible orbit refusal');
 });
 test('Receipts identify source, native projection, conventions and open boundaries',()=>{
  const r=e.receipt('a',0,'inspect',null);assert(r.source.commit===data.source.commit&&r.output.checks.K4IsIdentity&&r.display.audit052HostMap==='unestablished'&&r.boundaries.g1800Adjacency.includes('not asserted'),'Receipt');
 });
 if(makeController){
  test('Controller selection, K controls, inverse transport, global pause and return to G900',()=>{
   const {controller:g,app,doc}=makeController();
   g.setActive(true);assert(g.active&&doc.getElementById('g1800Section').hidden===false,'Activate');
   g.act(1);assert(g.q===e.step('a',0,1),'K');g.act(-1);assert(g.q===0,'Inverse');
   g.act(2);assert(g.q===e.flip('a',0),'Delta');g.act(4);assert(g.q===e.flip('a',0),'Full return');
   g.q=0;g.anchor();g.auto=core.automorphisms.findIndex(a=>a.deck_action.a!=='a');if(g.auto<0)g.auto=73;
   g.applyTransport(false);g.applyTransport(true);assert(g.kernel==='a'&&g.q===0,'Automorphism inverse');
   g.running=true;app.sim.playing=false;g.advance(.07);assert(g.q===0,'Pause');app.sim.playing=true;for(let i=0;i<15;i++)g.advance(.07);assert(g.q===e.step('a',0,1),'Clock advances');
   const saved=g.snapshot();g.restore(saved);same(g.snapshot(),saved,'Controller snapshot');
   g.setActive(false);assert(!g.active&&doc.getElementById('g1800Section').hidden===true,'Restore G900');
  });
  test('Overview computes all 1,800 finite display positions; representative view draws only G60 edges',()=>{
   const {controller:g,app}=makeController();g.setActive(true);let arcs=0,lines=0;
   const ctx=new Proxy({},{get:(_,k)=>k==='arc'?()=>arcs++:k==='lineTo'?()=>lines++:()=>{}});
   const r={ctx,w:360,h:230,canvas:{width:720,height:460},stats:{frames:0},windowFrames:0,windowStart:0};
   g.draw(r,33);assert(g.screen.length===5400&&Array.from(g.screen).every(Number.isFinite),'Finite geometry');assert(arcs>=1800&&lines>=900,'Overview symbols');
   arcs=lines=0;g.view='representatives';g.draw(r,66);assert(lines===240,'Two G60 edge copies only');
  });
 }
 return {schema:'uft4.g1800.tests.v1',status:'passed',checks:results.length,results,coverage:{kernels:3,nativeStates:5400,automorphisms:480,quotientTransportStates:2592000,sourceCommit:data.source.commit},limits:['Canvas calls are mocked; no visual browser QA','Physical Android and sustained performance are unverified','No G1800 adjacency or Audit052 host map is asserted']};
}
function mockControllerFactory(api,data,source){
 return function(){
  class Element {
   constructor(){this.children=[];this.attributes={};this.hidden=false;this.checked=false;this.value='';this.textContent='';this.classList={toggle(){}};}
   append(...x){this.children.push(...x);}replaceChildren(...x){this.children=x;}setAttribute(k,v){this.attributes[k]=String(v);}getAttribute(k){return this.attributes[k]??null;}remove(){}
   get valueAsNumber(){return this.value===''?NaN:Number(this.value);}
  }
  const elements=new Map(),doc={getElementById(id){if(!elements.has(id))elements.set(id,new Element());return elements.get(id);},createElement(){return new Element();},body:new Element()};
  doc.getElementById('g1800NativeData').textContent=JSON.stringify(data);
  const app={graph:new api.GraphEngine(),geometry:new api.GeometryEngine({major:.33,minor:.35}),camera:{yaw:40,pitch:25,roll:-55,zoom:2.8},settings:{highContrast:false},sim:{playing:true,direction:1,params:{speed:1}},renderer:{invalidate(){},stats:{}},ui:{el:id=>doc.getElementById(id),updateHost(){}},updateDiagnostics(){}};
  const Controller=new Function('document','getOverlayTheme','performance',source+';return G1800Controller;')(doc,()=>({source:'#ffc888',local:'#6ce8ff',external:'#a7e7c8'}),{now:()=>0});
  const controller=new Controller(app);app.g1800=controller;
  if(!controller.available)throw Error(doc.getElementById('g1800Error').textContent);
  return {controller,app,doc};
 };
}
if(typeof require!=='undefined'&&require.main===module){
 const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),cp=require('node:child_process'),crypto=require('node:crypto');
 const root=path.resolve(__dirname,'../..'),pack=path.join(root,'uft4-omega-deployment'),page=fs.readFileSync(path.join(root,'public_html/observatories/uft4-omega/index.html'),'utf8');
 const code=fs.readFileSync(path.join(pack,'g1800/registration.js'),'utf8'),dataText=fs.readFileSync(path.join(pack,'g1800/native-data.json'),'utf8'),data=JSON.parse(dataText);
 const pin=data.source.commit,prefix='apps/aletheos-simulator/',read=p=>cp.execFileSync('git',['show',pin+':'+prefix+p],{cwd:root,encoding:'utf8',maxBuffer:4*1024*1024});
 const coreText=read('webroot/native/data/core.json'),core=JSON.parse(coreText),cs=[0,1,2].map(i=>read('webroot/native/data/construction-0'+i+'.json'));
 const hash=s=>crypto.createHash('sha256').update(s).digest('hex'),assert=(v,m)=>{if(!v)throw Error(m);};
 assert(hash(coreText)===data.source.coreSha256,'Pinned core hash mismatch');
 cs.forEach((text,i)=>assert(hash(text)===data.source.turnSources[i].sha256,'Pinned construction hash mismatch'));
 const embedded=page.match(/<script id="g1800NativeData" type="application\/json">\s*([\s\S]*?)\s*<\/script>/);
 assert(embedded&&JSON.stringify(JSON.parse(embedded[1]))===JSON.stringify(data),'Embedded fixture mismatch');
 assert(page.includes('/* BEGIN G1800_CODE */\n'+code+'\n/* END G1800_CODE */'),'Embedded code mismatch');
 const script=[...page.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].at(-1)[1],context={module:{exports:{}}};
 vm.runInNewContext(script+'\nglobalThis.testAPI={G1800Engine,GraphEngine,GeometryEngine,SettingsPresets,SettingsArchive};',context);
 const api=context.testAPI;
 const report=verifyG1800(api,data,core,cs.map(JSON.parse),mockControllerFactory(api,data,code));
 assert(hash(page)===fs.readFileSync(path.join(pack,'release.sha256'),'utf8').trim(),'Release checksum mismatch');
 console.log(JSON.stringify({...report,sourceHashes:'verified',embeddedSources:'verified',releaseSha256:hash(page)},null,2));
}
if(typeof module!=='undefined')module.exports={verifyG1800,mockControllerFactory};
