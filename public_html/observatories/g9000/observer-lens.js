/* Thalean Observer lens. Native F cycles, declared measurement/write model. */
(function(root){'use strict';
const N=root.NATIVE_MODEL;
function mount(host){
 const ac=new AbortController(),on=(el,event,fn)=>el.addEventListener(event,fn,{signal:ac.signal});
 const cycles=N.cycles,turn=N.turn;
 const e=(id)=>host.querySelector('#'+id);
 let step=0,selected=0,record=null,reference=0,mode='matched',coupled=true;
 host.innerHTML=`<section class="observer-lens">
 <div class="lens-intro"><span class="rw-eyebrow">OBSERVER · REGISTERED ENCOUNTER</span><h2>What does the observer retain?</h2><p>Inspect actual native G9000 twenty-step cycles. Write a declared reversible measurement record, separate the systems, then compare the later readout.</p></div>
 <div class="rw-card" style="padding:16px;margin:14px 0">
 <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:end">
 <label>Native encounter cycle <select id="obCycle"><option value="0">Cycle 0</option><option value="1">Cycle 1</option><option value="2">Cycle 2</option><option value="3">Cycle 3</option></select></label>
 <label>Reference <select id="obRef"><option value="matched">Quarter-turn matched</option><option value="stationary">Stationary (control)</option></select></label>
 <label>Phase offset <select id="obOffset"><option value="0">0</option><option value="1">+1</option><option value="2">+2</option><option value="3">+3</option></select></label>
 </div>
 <svg id="obSvg" viewBox="0 0 640 220" role="img" aria-label="Actual native twenty-site encounter orbit" style="width:100%;max-height:260px"></svg>
 <div style="display:flex;flex-wrap:wrap;gap:8px;margin:12px 0">
 <button id="obPrev">Previous</button><button id="obNext" class="rw-primary">Next native step</button><button id="obWrite">Write observer record</button><button id="obClear">Clear record</button>
 </div>
 <label>Native F phase <input id="obPhase" type="range" min="0" max="19" step="1" value="0" style="width:100%"></label>
 <p id="obSite" class="rw-small"></p></div>
 <div class="rw-card" style="padding:16px">
 <h3>Relational readout</h3><div id="obRead" style="font:13px/1.7 ui-monospace,monospace;white-space:pre-wrap"></div>
 <p id="obMeaning" class="rw-small"></p></div>
 <p class="rw-small" style="margin-top:16px">SOURCE: actual NATIVE_MODEL.cycles and turn from this observatory. EXPERIMENT: two-quadrature test signal and explicit record-writing are declared; no NRR-043 9000×8 matrix or native four-flux memory admission is claimed.</p></section>`;
 const svg=e('obSvg'),NS='http://www.w3.org/2000/svg';
 function add(tag,attrs,txt){const el=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,String(v)));if(txt!==undefined)el.textContent=txt;svg.appendChild(el);return el;}
 function render(){
 const cycle=cycles[selected],site=cycle[step],next=turn[site];
 svg.replaceChildren();
 const cx=320,cy=108,rad=82;
 for(let i=0;i<20;i++){const a=2*Math.PI*i/20-Math.PI/2,b=2*Math.PI*(i+1)/20-Math.PI/2;add('line',{x1:cx+rad*Math.cos(a),y1:cy+rad*Math.sin(a),x2:cx+rad*Math.cos(b),y2:cy+rad*Math.sin(b),stroke:'#436177','stroke-width':2});}
 for(let i=0;i<20;i++){const a=2*Math.PI*i/20-Math.PI/2,x=cx+rad*Math.cos(a),y=cy+rad*Math.sin(a);add('circle',{cx:x,cy:y,r:i===step?9:5,fill:i===step?'#f0be78':i%2===0?'#54d5c6':'#8499bb'});if(i%5===0)add('text',{x:cx+112*Math.cos(a),y:cy+112*Math.sin(a)+4,'text-anchor':'middle',fill:'#c4d6e4','font-size':12},String(i));}
 const q=step%4,base=[1,0,-1,0][q],quadr=[0,1,0,-1][q],offset=(q+reference)%4;
 const ref=mode==='matched'?[1,0,-1,0][offset]:1;
 const interference=mode==='matched'?4*base*ref:0;
 e('obSite').textContent='Cycle '+selected+' / 450 · site '+site+' → '+next+' · F step '+step+'/19 · F² dipole sign '+(q<2?'+':'−');
 e('obRead').textContent='Quarter-turn sample: ('+base+', '+quadr+')\nReference: '+mode+' · offset '+reference+'\nIllustrative signed interference: '+interference+'\nRecord: '+(record?'written at phase '+record.phase+', site '+record.site:'not written');
 e('obMeaning').textContent=!record?'A live signal is not an observer-owned memory. Use Write observer record.':'Stored sample ('+record.a+', '+record.b+') remains unchanged as the native phase advances. Current signal ('+base+', '+quadr+') differs after separation. A later decoder needs the saved phase registration.';
 e('obPhase').value=step;
 }
 on(e('obCycle'),'change',ev=>{selected=Number(ev.target.value);step=0;record=null;render();});
 on(e('obRef'),'change',ev=>{mode=ev.target.value;render();});
 on(e('obOffset'),'change',ev=>{reference=Number(ev.target.value);render();});
 on(e('obPhase'),'input',ev=>{step=Number(ev.target.value);render();});
 on(e('obPrev'),'click',()=>{step=(step+19)%20;render();});
 on(e('obNext'),'click',()=>{step=(step+1)%20;render();});
 on(e('obWrite'),'click',()=>{const q=step%4;record={site:cycles[selected][step],phase:step,a:[1,0,-1,0][q],b:[0,1,0,-1][q]};render();});
 on(e('obClear'),'click',()=>{record=null;render();});
 render();
 return{destroy(){ac.abort();host.replaceChildren();}};
}
root.OBSERVER_LENS={mount};
})(window);
