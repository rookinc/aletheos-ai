'use strict';
// Controller integration tests with a deliberately small DOM double.
// The real panel source and real paired model run unchanged; no browser is used.
const assert=require('assert/strict'),fs=require('fs'),vm=require('vm');
const data=require('./src/native-data.json'),metadata=require('./src/paired-history-data.json');
const History=require('./src/paired-history.js');
const panelCode=fs.readFileSync(__dirname+'/src/paired-history-panel.js','utf8');
const ui=fs.readFileSync(__dirname+'/src/ui.html','utf8');
let checks=0;
const check=(name,fn)=>{fn();checks++;};
function fixture(meta=metadata){
 const elements=new Map(),listeners={},counts={writes:0,contextReads:0,modelCreates:0},calls=[],notices=[];
 let document;
 class Element{
  constructor(tag,id){this.tag=tag;this.id=id;this.attributes={};this.dataset={};this.children=[];this.hidden=false;this._text='';this._value='';this.className='';}
  set textContent(v){this._text=String(v);counts.writes++;}get textContent(){return this._text;}
  set value(v){this._value=String(v);counts.writes++;}get value(){return this._value;}
  setAttribute(k,v){this.attributes[k]=String(v);counts.writes++;}
  append(...items){this.children.push(...items.flatMap(x=>x.tag==='#fragment'?x.children:[x]));counts.writes++;}
  replaceChildren(...items){this.children=[];this.append(...items);}
  focus(){document.activeElement=this;}
  querySelectorAll(selector){assert.equal(selector,'[data-sheet]');return this.children.filter(x=>x.dataset.sheet!==undefined);}
 }
 document={activeElement:null,getElementById(id){assert(elements.has(id),'Missing UI element '+id);return elements.get(id);},createElement(tag){return new Element(tag);},createDocumentFragment(){return new Element('#fragment');},addEventListener(type,fn){(listeners[type]??=[]).push(fn);}};
 for(const match of ui.matchAll(/<([\w-]+)\b[^>]*\bid="([^"]+)"[^>]*>/g)){
  const el=new Element(match[1],match[2]);el.hidden=/\bhidden(?:\s|>|=)/.test(match[0]);elements.set(el.id,el);
 }
 const $=id=>document.getElementById(id);
 for(let s=0;s<4;s++){const el=new Element('span');el.dataset.sheet=String(s);$('historySheets').children.push(el);}
 $('pairedHistoryData').textContent=JSON.stringify(meta);
 const context={selected:0,steps:0,running:true,mode:'assembly',planes:[0,0,0].map(offset=>({offset,visible:true,opacity:1}))};
 class CountedModel extends History.Model{constructor(...args){counts.modelCreates++;super(...args);}}
 const sandbox={document,PairedSheetHistory:{Model:CountedModel}};
 vm.createContext(sandbox);vm.runInContext(panelCode+'\nthis.createPanel=PairedHistoryPanel.create;',sandbox);
 const controller=sandbox.createPanel({data,getContext:()=>{counts.contextReads++;return context;},controls:{
  play(){calls.push('play');context.running=!context.running;},
  step(){calls.push('step');context.running=false;context.steps++;},
  reset(){calls.push('reset');context.steps=0;},
  selectCycle(index){calls.push(['selectCycle',index]);context.selected=index;},
  notice(message){notices.push(message);}
 }});
 return {$,context,counts,calls,notices,document,controller,escape(){for(const fn of listeners.keydown??[])fn({key:'Escape'});}};
}
const f=fixture(),{$,context,controller,counts,calls}=f;
check('disabled by default',()=>{assert.equal(controller.getState().enabled,false);assert.equal(controller.getState().snapshot,null);assert.equal($('pairedHistoryPanel').hidden,true);assert.equal(counts.modelCreates,0);assert.equal(calls.length,0);});
check('disabled updates are inert',()=>{const before={...counts};controller.update();assert.deepEqual(counts,before);});
check('enable is simulation-neutral',()=>{const before=JSON.stringify(context);$('historyToggle').onclick();assert.equal(JSON.stringify(context),before);assert.equal(calls.length,0);assert.equal(controller.getState().enabled,true);assert.equal(counts.modelCreates,1);assert.equal($('pairedHistoryPanel').hidden,false);assert.equal($('historyToggle').attributes['aria-expanded'],'true');assert.equal(f.document.activeElement,$('historyClose'));});
check('initial state is not mislabeled a return',()=>{assert.equal($('historyReturn').textContent,'Starting registered state');assert.equal($('historyNativeReturn').textContent,'Start');assert.equal($('historyTrail').children.length,1);});
check('step ten exposes hidden-bit opposition',()=>{context.steps=10;context.running=false;controller.update();assert.equal($('historyReturn').textContent,'Projected return · hidden bit flipped');assert.equal($('historyReturn').dataset.status,'partial');assert.equal($('historyRelativeReturn').textContent,'Returned');assert.equal($('historyNativeReturn').textContent,'Not returned');assert.equal($('historyReturn').attributes['aria-live'],'polite');assert.equal($('historyTrail').children.length,11);});
check('step twenty displays complete return',()=>{context.steps=20;controller.update();assert.equal($('historyReturn').textContent,'Complete native return');assert.equal($('historyReturn').dataset.status,'complete');assert.equal($('historyNativeReturn').textContent,'Returned');assert.equal($('historyTrail').children.length,21);});
check('input updates cycle immediately without blur',()=>{f.document.activeElement=$('historyCycle');$('historyCycle').value='13';$('historyCycle').oninput({target:$('historyCycle')});assert.equal(context.selected,12);assert.equal(context.steps,20);assert.equal($('historyCycle').value,'13');assert.match($('historyReference').textContent,/Cycle 13 \/ 450/);});
check('empty and incomplete cycle inputs do not reanchor',()=>{const before=calls.length;for(const value of ['', '1.5','451']){$('historyCycle').value=value;$('historyCycle').oninput({target:$('historyCycle')});assert.equal(context.selected,12);}assert.equal(calls.length,before);$('historyCycle').value='13';});
check('cycle change clamps on commit',()=>{$('historyCycle').value='999';$('historyCycle').onchange({target:$('historyCycle')});assert.equal(context.selected,449);assert.equal($('historyCycle').value,'450');$('historyCycle').value='1';$('historyCycle').onchange({target:$('historyCycle')});assert.equal(context.selected,0);});
check('copy offset and clock phase remain distinct',()=>{context.steps=8;context.planes[1].offset=7;$('historyCopy').value='1';$('historyCopy').onchange({target:$('historyCopy')});const s=controller.getState().snapshot;assert.equal(s.offset,7);assert.equal(s.current.state,data.cycles[0][15]);assert.equal(s.start.state,data.cycles[0][7]);assert.equal($('historyPhase').textContent,'8 / 15');assert.match($('historyReference').textContent,/Y offset 7 · reference F 7/);});
check('offset changes reanchor without changing clock',()=>{context.planes[1].offset=3;controller.update();const s=controller.getState().snapshot;assert.equal(s.start.state,data.cycles[0][3]);assert.equal(s.current.state,data.cycles[0][11]);assert.equal(context.steps,8);assert.equal($('historyPhase').textContent,'8 / 11');});
check('hidden copies are explicit',()=>{context.planes[1].visible=false;controller.update();assert.match($('historyReference').textContent,/copy hidden/);context.planes[1].visible=true;context.planes[1].opacity=0;controller.update();assert.match($('historyReference').textContent,/copy hidden/);context.planes[1].opacity=1;controller.update();assert.doesNotMatch($('historyReference').textContent,/copy hidden/);});
check('pause play delegates once',()=>{context.running=true;controller.update();const before=calls.length;$('historyPlay').onclick();assert.equal(calls.length,before+1);assert.equal(calls.at(-1),'play');assert.equal(context.running,false);assert.equal($('historyPlay').textContent,'Play');$('historyPlay').onclick();assert.equal(context.running,true);assert.equal($('historyPlay').textContent,'Pause');assert.equal($('historyReturn').attributes['aria-live'],'off');});
check('step delegates once and pauses',()=>{const before=calls.length,n=context.steps;$('historyStep').onclick();assert.equal(calls.length,before+1);assert.equal(calls.at(-1),'step');assert.equal(context.steps,n+1);assert.equal(context.running,false);assert.equal($('historySteps').textContent,String(n+1));});
check('reset delegates and restores initial reference',()=>{const before=calls.length;$('historyReset').onclick();assert.equal(calls.length,before+1);assert.equal(calls.at(-1),'reset');assert.equal(context.steps,0);assert.equal(controller.getState().snapshot.start.state,data.cycles[0][3]);assert.equal($('historyReturn').textContent,'Starting registered state');});
check('inverse mode labels clock-only trace',()=>{context.mode='inverse';controller.update();assert.match($('historyModeNote').textContent,/Clock trace only/);context.mode='assembly';controller.update();assert.match($('historyModeNote').textContent,/rendering interpolation/);});
check('close does not mutate simulation',()=>{const before=JSON.stringify(context),n=calls.length;$('historyClose').onclick();assert.equal(JSON.stringify(context),before);assert.equal(calls.length,n);assert.equal(controller.getState().enabled,false);assert.equal($('pairedHistoryPanel').hidden,true);assert.equal(f.document.activeElement,$('historyToggle'));const after={...counts};controller.update();assert.deepEqual(counts,after);});
check('reenabling retains original reference',()=>{context.steps=10;$('historyToggle').onclick();assert.equal(counts.modelCreates,1);assert.equal(controller.getState().snapshot.start.state,data.cycles[0][3]);assert.equal($('historyReturn').textContent,'Projected return · hidden bit flipped');});
check('legacy settings disable and reset copy only',()=>{const before=JSON.stringify(context),n=calls.length;controller.apply(undefined);assert.equal(controller.getState().enabled,false);assert.equal(controller.getState().copy,0);assert.equal(JSON.stringify(context),before);assert.equal(calls.length,n);});
check('new settings enable selected copy',()=>{controller.apply({enabled:true,copy:2});assert.equal(controller.getState().copy,2);assert.equal(controller.getState().enabled,true);assert.equal($('historyCopy').value,'2');});
check('escape closes panel',()=>{f.escape();assert.equal(controller.getState().enabled,false);assert.equal(f.document.activeElement,$('historyToggle'));});
check('invalid metadata fails visibly without simulation mutation',()=>{const bad=fixture({...metadata,schema:'invalid'}),before=JSON.stringify(bad.context);bad.$('historyToggle').onclick();assert.equal(bad.controller.getState().enabled,false);assert.equal(bad.$('pairedHistoryPanel').hidden,true);assert.equal(bad.notices.length,1);assert.match(bad.notices[0],/Paired history unavailable:/);assert.equal(bad.calls.length,0);assert.equal(JSON.stringify(bad.context),before);});
// Execute the original app's actual settings validator, isolated from DOM startup.
const app=fs.readFileSync(__dirname+'/src/app.js','utf8');
const flagsMatch=app.match(/const flags=(\[[^;]+\]);/);assert(flagsMatch);
const from=app.indexOf('function validate(s){'),to=app.indexOf('function applySettings(s)',from);assert(from>=0&&to>from);
const validate=vm.runInNewContext('const flags='+flagsMatch[1]+';'+app.slice(from,to)+';validate;');
const flags=vm.runInNewContext(flagsMatch[1]);
const settings={schema:'thalean-orthogonal-settings-1',hz:.05,merge:0,edgeOpacity:.13,vertexOpacity:.62,selected:0,running:false,colorMode:'plane',planes:Array.from({length:3},()=>({visible:true,opacity:1,offset:0})),flags:Object.fromEntries(flags.map(k=>[k,true])),camera:{q:[1,0,0,0],zoom:1,pan:[0,0]}};
check('legacy settings accepted by actual app validator',()=>{assert.equal(validate(settings),settings);});
check('valid paired settings accepted',()=>{for(const copy of [0,1,2])for(const enabled of [false,true]){const s={...settings,pairedHistory:{enabled,copy}};assert.equal(validate(s),s);}});
check('invalid paired settings rejected before application',()=>{for(const pairedHistory of [null,{},false,{enabled:1,copy:0},{enabled:true,copy:-1},{enabled:false,copy:3},{enabled:true,copy:1.5},{enabled:true,copy:'1'}])assert.throws(()=>validate({...settings,pairedHistory}),/Invalid paired history settings/);});
console.log(JSON.stringify({audit:'017V paired history panel integration',pass:true,checks,actualPanelSourceExecuted:true,actualSettingsValidatorExecuted:true,browserUsed:false},null,2));
