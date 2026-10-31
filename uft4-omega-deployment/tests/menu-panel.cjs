'use strict';
// Exercise the shipped UI menu methods. Layout and native keyboard behavior
// still require browser checks; this fixture does not emulate a browser renderer.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../../public_html/observatories/uft4-omega/index.html'),'utf8');
const script=html.match(/<script>([\s\S]*)<\/script>/)[1];
const context={console};vm.createContext(context);
vm.runInContext(script+'\nglobalThis.UIClass=UIController;',context);
const plain=value=>JSON.parse(JSON.stringify(value));
let checks=0;function test(name,fn){fn();checks++;console.log('PASS '+name);}
function fixture({collapsed=false,renderer=true}={}){
 const classes=new Set(),writes={attributes:0,classes:0,focus:0};
 const doc={activeElement:null,body:{classList:{toggle(name,on){writes.classes++;if(on)classes.add(name);else classes.delete(name);},contains(name){return classes.has(name);}}}};
 const field={id:'field-control'},panel={id:'panel',scrollTop:413,hidden:false,inert:false,contains(node){return node===field;}};
 const button={id:'panelMenu',textContent:'',attributes:{},listeners:{},addEventListener(name,fn){this.listeners[name]=fn;},setAttribute(name,value){writes.attributes++;this.attributes[name]=String(value);},getAttribute(name){return this.attributes[name]??null;},focus(){writes.focus++;doc.activeElement=this;}};
 const app={layout:{controlsCollapsed:collapsed},sim:{time:215.9255,playing:true,params:{speed:1,omega:2*Math.PI}},camera:{yaw:98.917225,pitch:-126.380053,roll:-10.9867,zoom:2.8},orbit:{enabled:true,pending:.02},hostSettings:{merge:100,opacity:1}};
 if(renderer)app.renderer={resizePending:false};
 const nodes={panel,panelMenu:button};
 const ui=Object.create(context.UIClass.prototype);ui.app=app;ui.el=id=>{assert.ok(nodes[id],'Unexpected element '+id);return nodes[id];};
 context.document=doc;ui.bindPanelMenu();ui.syncPanelMenu();
 const state=()=>plain({sim:app.sim,camera:app.camera,orbit:app.orbit,hostSettings:app.hostSettings});
 return {ui,app,doc,panel,button,field,classes,writes,state};
}

test('Menu is a native button outside the scrollable controls with an explicit panel relationship',()=>{
 const match=html.match(/<button\b[^>]*\bid="panelMenu"[^>]*>/);assert.ok(match,'Missing panelMenu button');
 assert.match(match[0],/\btype="button"/);assert.match(match[0],/\baria-controls="panel"/);
 const panelStart=html.indexOf('<aside'),panelEnd=html.indexOf('</aside>',panelStart),buttonAt=html.indexOf(match[0]);
 assert.ok(panelStart>=0&&panelEnd>panelStart);assert.ok(buttonAt<panelStart||buttonAt>panelEnd,'Button must remain available when panel is hidden');
});

test('Collapse and reopen preserve the running view and restore the controls scroll position',()=>{
 const f=fixture(),before=f.state(),camera=f.app.camera,sim=f.app.sim;
 assert.equal(f.panel.hidden,false);assert.equal(f.panel.inert,false);assert.equal(f.button.attributes['aria-expanded'],'true');
 f.panel.scrollTop=413;f.doc.activeElement=f.button;f.button.listeners.click();
 assert.equal(f.app.layout.controlsCollapsed,true);assert.equal(f.panel.hidden,true);assert.equal(f.panel.inert,true);
 assert.equal(f.button.attributes['aria-expanded'],'false');assert.match(f.button.textContent,/Menu/);assert.equal(f.classes.has('controls-collapsed'),true);assert.equal(f.app.renderer.resizePending,true);
 // Some browsers discard the scroll offset of a display:none element.
 f.panel.scrollTop=0;f.app.renderer.resizePending=false;f.button.listeners.click();
 assert.equal(f.app.layout.controlsCollapsed,false);assert.equal(f.panel.hidden,false);assert.equal(f.panel.inert,false);assert.equal(f.panel.scrollTop,413);
 assert.equal(f.button.attributes['aria-expanded'],'true');assert.match(f.button.textContent,/Hide controls/);assert.equal(f.classes.has('controls-collapsed'),false);assert.equal(f.app.renderer.resizePending,true);
 assert.deepEqual(f.state(),before);assert.equal(f.app.camera,camera);assert.equal(f.app.sim,sim);
 // Subsequent scrolling becomes the next retained offset, not the first one.
 f.panel.scrollTop=27;f.button.listeners.click();f.panel.scrollTop=0;f.button.listeners.click();assert.equal(f.panel.scrollTop,27);
});

test('Imported collapse state moves focus out of hidden controls without stealing external focus',()=>{
 const f=fixture();f.doc.activeElement=f.field;f.app.layout.controlsCollapsed=true;f.ui.syncPanelMenu();
 assert.equal(f.doc.activeElement,f.button);assert.equal(f.writes.focus,1);assert.equal(f.panel.inert,true);
 f.app.layout.controlsCollapsed=false;f.ui.syncPanelMenu();
 const external={id:'play'};f.doc.activeElement=external;f.app.layout.controlsCollapsed=true;f.ui.syncPanelMenu();
 assert.equal(f.doc.activeElement,external);assert.equal(f.writes.focus,1);
});

test('Repeated synchronization does not retrigger DOM updates or canvas resizing',()=>{
 const f=fixture();f.app.renderer.resizePending=false;const before={...f.writes};
 for(let i=0;i<20;i++)f.ui.syncPanelMenu();
 assert.equal(f.app.renderer.resizePending,false);assert.deepEqual(f.writes,before);
 f.button.listeners.click();f.app.renderer.resizePending=false;const collapsed={...f.writes};
 for(let i=0;i<20;i++)f.ui.syncPanelMenu();
 assert.equal(f.app.renderer.resizePending,false);assert.deepEqual(f.writes,collapsed);
});

test('Initial collapsed preferences and early UI setup work before a renderer exists',()=>{
 const f=fixture({collapsed:true,renderer:false});assert.equal(f.panel.hidden,true);assert.equal(f.panel.inert,true);assert.equal(f.button.attributes['aria-expanded'],'false');
 f.button.listeners.click();assert.equal(f.panel.hidden,false);assert.equal(f.panel.inert,false);assert.equal(f.app.layout.controlsCollapsed,false);
});
console.log(`${checks}/${checks} menu-panel checks passed`);
