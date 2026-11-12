/* Exact native character-response lens. A separate registration from the 3D stage. */
(function(root){
'use strict';
let serial=0;
const SQRT5=Math.sqrt(5);
const abs=n=>n<0n?-n:n;
function gcd(a,b){a=abs(a);b=abs(b);while(b){const r=a%b;a=b;b=r;}return a||1n;}
function rat(value){
 const s=String(value).trim();if(!/^[+-]?\d+(?:\/\d+)?$/.test(s))throw new Error('Invalid exact rational');
 const bits=s.split('/');let n=BigInt(bits[0]),d=bits.length===2?BigInt(bits[1]):1n;if(d===0n)throw new Error('Zero denominator');if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return{n:n/g,d:d/g};
}
function radd(a,b){return rat(`${a.n*b.d+b.n*a.d}/${a.d*b.d}`);}
function rmul(a,b){return rat(`${a.n*b.n}/${a.d*b.d}`);}
function rsub(a,b){return rat(`${a.n*b.d-b.n*a.d}/${a.d*b.d}`);}
function rtext(a){return a.d===1n?String(a.n):`${a.n}/${a.d}`;}
function pair(value){if(!Array.isArray(value)||value.length!==2)throw new Error('Expected a+b√5 coefficient pair');return{a:rat(value[0]),b:rat(value[1])};}
function padd(x,y){return{a:radd(x.a,y.a),b:radd(x.b,y.b)};}
function psub(x,y){return{a:rsub(x.a,y.a),b:rsub(x.b,y.b)};}
function zero(x){return x.a.n===0n&&x.b.n===0n;}
function sign(x){
 const a=x.a,b=x.b,sa=a.n===0n?0:(a.n>0n?1:-1),sb=b.n===0n?0:(b.n>0n?1:-1);if(!sa)return sb;if(!sb||sa===sb)return sa;
 const aa=rmul(a,a),bb=rmul(rat(5),rmul(b,b)),delta=aa.n*bb.d-bb.n*aa.d;return(delta>0n?1:delta<0n?-1:0)*sa;
}
function numeric(x){return Number(x.a.n)/Number(x.a.d)+(Number(x.b.n)/Number(x.b.d))*SQRT5;}
function sqrtTerm(b){const n=abs(b.n);return`${n===1n?'':String(n)}√5${b.d===1n?'':`/${b.d}`}`;}
function exact(value){const x=Array.isArray(value)?pair(value):value;if(x.b.n===0n)return rtext(x.a);const t=sqrtTerm(x.b);return x.a.n===0n?(x.b.n<0n?'−':'')+t:`${rtext(x.a)} ${x.b.n<0n?'−':'+'} ${t}`;}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function decimal(value,digits=5){return Number(value).toFixed(digits).replace(/0+$/,'').replace(/\.$/,'');}
function model(data){
 const src=data&&data.response_spectrum;if(!src||!Array.isArray(src.weights))throw new Error('The native response certificate is unavailable.');
 const rows=src.weights.map((r,i)=>{
  const energy=pair(r.energy),sum=pair(r.sum_channel_weight),difference=pair(r.difference_channel_weight);if(sign(sum)<0||sign(difference)<0)throw new Error('Response weight is negative.');
  return{index:i,key:r.energy.join('|'),energy,energyExact:r.energy.slice(),energyLabel:exact(energy),energyValue:numeric(energy),sum,difference,sumValue:numeric(sum),differenceValue:numeric(difference),sumActive:!zero(sum),differenceActive:!zero(difference)};
 });
 rows.sort((x,y)=>sign(psub(x.energy,y.energy)));rows.forEach((r,i)=>{r.index=i;});
 if(rows.length!==12||new Set(rows.map(r=>r.key)).size!==12)throw new Error('Expected the twelve native response energies.');
 const totals={sum:pair(['0','0']),difference:pair(['0','0'])};for(const r of rows)for(const c of ['sum','difference'])totals[c]=padd(totals[c],r[c]);
 for(const c of ['sum','difference'])if(totals[c].a.n!==totals[c].a.d||totals[c].b.n!==0n)throw new Error('A normalized response channel must have total exact weight one.');
 const counts={sum:rows.filter(r=>r.sumActive).length,difference:rows.filter(r=>r.differenceActive).length};if(counts.sum!==8||counts.difference!==8)throw new Error('Expected eight active energies per channel.');
 const first={sum:rows.find(r=>r.sumActive),difference:rows.find(r=>r.differenceActive)};
 return{rows,totals,counts,first,nativeDimension:16,controlDimension:72,source:src};
}
function spectrum(m,state,availableWidth=864){
 const narrow=availableWidth>0&&availableWidth<560,w=narrow?420:864,h=narrow?280:300,p=narrow?{l:43,r:15,t:23,b:45}:{l:54,r:22,t:21,b:48},pw=w-p.l-p.r,ph=h-p.t-p.b,base=p.t+ph,x=v=>p.l+(v-1.5)/10.5*pw,y=v=>base-v/.5*ph,colors={sum:'#65d8e6',difference:'#ffd38a'};
 const channels=state.channel==='both'?['sum','difference']:[state.channel];let s=`<svg class="rl-spectrum" viewBox="0 0 ${w} ${h}" role="img" aria-label="Exact native energy response. Choose an energy below to inspect its weights."><title>Sum and difference response at twelve exact native energies</title>`;
 for(const tick of (narrow?[0,.2,.4]:[0,.1,.2,.3,.4,.5]))s+=`<line class="rl-grid" x1="${p.l}" x2="${w-p.r}" y1="${y(tick)}" y2="${y(tick)}"/><text class="rl-axis-label" x="${p.l-11}" y="${y(tick)+4}" text-anchor="end">${tick.toFixed(1)}</text>`;
 for(const tick of [2,4,6,8,10,12])s+=`<line class="rl-tick" x1="${x(tick)}" x2="${x(tick)}" y1="${base}" y2="${base+5}"/><text class="rl-axis-label" x="${x(tick)}" y="${base+22}" text-anchor="middle">${tick}</text>`;
 s+=`<line class="rl-baseline" x1="${p.l}" x2="${w-p.r}" y1="${base}" y2="${base}"/><text class="rl-axis-title" x="${p.l}" y="12">Weight</text><text class="rl-axis-title" x="${p.l+pw/2}" y="${h-5}" text-anchor="middle">Energy · native dimensionless units</text>`;
 const chosen=m.rows[state.selected];s+=`<line class="rl-selection" x1="${x(chosen.energyValue)}" x2="${x(chosen.energyValue)}" y1="${p.t}" y2="${base}"/>`;
 for(const r of m.rows){const selected=r.index===state.selected;for(const c of channels){const value=r[c+'Value'],active=r[c+'Active'],offset=channels.length===2?(c==='sum'?-3.5:3.5):0,xx=x(r.energyValue)+offset,yy=y(value);s+=`<g class="rl-peak${selected?' is-selected':''}${active?'':' is-zero'}" data-rl-peak="${r.index}"><title>E=${esc(r.energyLabel)}, ${c}: ${esc(exact(r[c]))}${active?'':' (exact zero)'}</title><line x1="${xx}" x2="${xx}" y1="${base}" y2="${yy}" stroke="${colors[c]}"/><circle cx="${xx}" cy="${yy}" r="${selected?6:4.5}" fill="${active?colors[c]:'#0b1522'}" stroke="${colors[c]}"/><rect x="${xx-9}" y="${Math.min(yy,base)-10}" width="18" height="${Math.max(20,base-yy+20)}" fill="transparent"/></g>`;}}
 return s+'</svg>';
}
function weightCard(name,value,color,visible){const isZero=zero(value);return`<div class="rl-weight-card${visible?'':' is-muted'}"><span class="rl-channel-name"><i style="--rl-series:${color}"></i>${name}</span><strong class="rl-exact">${esc(exact(value))}</strong><small>${isZero?'Exact cancellation':`≈ ${decimal(numeric(value),6)}`}</small></div>`;}
function mount(host){
 if(!host||!host.ownerDocument)throw new Error('Response lens needs a DOM host.');if(host.__responseLens)host.__responseLens.destroy();
 const doc=host.ownerDocument,section=doc.createElement('section'),id=`response-lens-${++serial}`;section.className='response-lens';section.setAttribute('aria-labelledby',id+'-title');host.appendChild(section);
 let m;try{m=model(root&&root.RESEARCH_DATA);}catch(error){section.innerHTML=`<h2 id="${id}-title">Signed response</h2><p class="rl-error">${esc(error.message)}</p>`;const failed={destroy(){section.remove();if(host.__responseLens===failed)delete host.__responseLens;}};host.__responseLens=failed;return failed;}
 const state={channel:'both',selected:0};
 section.innerHTML=`<header class="rl-head"><div><span class="rl-eyebrow">NATIVE CHARACTER READOUTS</span><h2 id="${id}-title">Signed response</h2><p>Two readouts reveal different parts of one kinetic response.</p></div><span class="rl-certificate">012 · exact response</span></header><div class="rl-controls"><div class="rl-channel-switch" role="radiogroup" aria-label="Response channel"><button type="button" role="radio" data-rl-channel="sum" aria-checked="false"><i class="rl-key-sum"></i>Sum</button><button type="button" role="radio" data-rl-channel="difference" aria-checked="false"><i class="rl-key-difference"></i>Difference</button><button type="button" role="radio" data-rl-channel="both" aria-checked="true">Both</button></div><p class="rl-active-count"></p></div><div class="rl-chart"></div><p class="rl-chart-note">Tap an energy to inspect its exact weights. Hollow markers are exact zeroes.</p><div class="rl-energy-picker" role="group" aria-label="Choose a native energy">${m.rows.map(r=>`<button type="button" data-rl-energy="${r.index}" aria-pressed="${r.index===0?'true':'false'}" aria-label="Energy ${esc(r.energyLabel)}"><span>E</span> ${esc(r.energyLabel)}</button>`).join('')}</div><div class="rl-selected" aria-label="Selected energy response"></div><div class="rl-response-size"><div><small>Native response</small><strong>16 <span>dimensions</span></strong></div><div><small>Frozen odd control</small><strong>72 <span>dimensions</span></strong></div><p>Response under the kinetic operator L alone.</p></div><details class="rl-scope"><summary>What this response shows</summary><div><p>The normalized sum and difference channels each carry total exact weight <b>1</b> across <b>8</b> active energies. The combined response contains <b>12</b> energy levels; <b>4</b> occur in both channels.</p><p>This is the ground-state character response of the unweighted passive joint cover. The 16 and 72 dimensions describe L-only response spaces, not visible graph vertices. Native transport F belongs to a separate closure test.</p><p>Exact labels use rational numbers and √5. Decimal positions are display approximations. The response has no physical frequency or water calibration.</p><p class="rl-source">Source: THALEAN-NATIVE-CHARACTER-RESPONSE-012 · character-channel certificate.</p></div></details><div class="rl-sr-only" aria-live="polite" aria-atomic="true"></div>`;
 const chart=section.querySelector('.rl-chart'),count=section.querySelector('.rl-active-count'),selection=section.querySelector('.rl-selected'),live=section.querySelector('[aria-live]');
 let chartWidth=0,resizeFrame=0,resizeObserver=null,destroyed=false;
 function paintChart(){chartWidth=Math.round(chart.getBoundingClientRect().width||host.clientWidth||864);chart.innerHTML=spectrum(m,state,chartWidth);}
 function resize(){if(destroyed||resizeFrame)return;resizeFrame=root.requestAnimationFrame(()=>{resizeFrame=0;if(!destroyed)paintChart();});}
 function render(announce){
  section.dataset.channel=state.channel;paintChart();
  for(const button of section.querySelectorAll('[data-rl-channel]')){const yes=button.dataset.rlChannel===state.channel;button.setAttribute('aria-checked',String(yes));button.tabIndex=yes?0:-1;}
  for(const button of section.querySelectorAll('[data-rl-energy]')){const row=m.rows[Number(button.dataset.rlEnergy)],selected=row.index===state.selected;button.setAttribute('aria-pressed',String(selected));button.classList.toggle('is-zero-channel',state.channel!=='both'&&!row[state.channel+'Active']);}
  count.textContent=state.channel==='both'?'8 active energies per channel':`8 active energies · first at E = ${m.first[state.channel].energyLabel}`;
  const r=m.rows[state.selected],mode=state.channel,zeroSelected=mode!=='both'&&!r[mode+'Active'];
  selection.innerHTML=`<div class="rl-selected-head"><div><span class="rl-eyebrow">SELECTED ENERGY</span><h3>E = ${esc(r.energyLabel)}</h3><small>${r.energy.b.n===0n?'Exact energy':`≈ ${decimal(r.energyValue,6)}`}</small></div><span class="rl-selection-status${zeroSelected?' is-absent':''}">${zeroSelected?'Exact cancellation':mode==='both'?(r.sumActive&&r.differenceActive?'Shared energy':r.sumActive?'Sum only':'Difference only'):'Active response'}</span></div><div class="rl-weight-grid">${weightCard('Sum',r.sum,'#65d8e6',mode!=='difference')}${weightCard('Difference',r.difference,'#ffd38a',mode!=='sum')}</div>${zeroSelected?`<p class="rl-cancellation-note">The ${mode} channel vanishes exactly here; the other channel retains this energy.</p>`:''}`;
  if(announce)live.textContent=`Energy ${r.energyLabel}. Sum weight ${exact(r.sum)}. Difference weight ${exact(r.difference)}.`;
 }
 function setChannel(channel,announce=true){if(!['sum','difference','both'].includes(channel))return;state.channel=channel;render(announce);}
 function selectEnergy(value,announce=true){const i=typeof value==='number'?value:m.rows.findIndex(r=>r.key===String(value));if(!Number.isInteger(i)||i<0||i>=m.rows.length)return;state.selected=i;render(announce);}
 function click(event){const button=event.target.closest('[data-rl-channel]');if(button&&section.contains(button)){setChannel(button.dataset.rlChannel);return;}const peak=event.target.closest('[data-rl-energy],[data-rl-peak]');if(peak&&section.contains(peak))selectEnergy(Number(peak.dataset.rlEnergy??peak.dataset.rlPeak));}
 function keyboard(event){const button=event.target.closest('[data-rl-channel]');if(!button||!section.contains(button)||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;event.preventDefault();const channels=['sum','difference','both'];let i=channels.indexOf(state.channel);i=event.key==='Home'?0:event.key==='End'?2:(i+(['ArrowRight','ArrowDown'].includes(event.key)?1:2))%3;setChannel(channels[i]);section.querySelector(`[data-rl-channel="${channels[i]}"]`).focus();}
 section.addEventListener('click',click);section.addEventListener('keydown',keyboard);render(false);
 if(typeof root.ResizeObserver==='function'){resizeObserver=new root.ResizeObserver(entries=>{if(entries.some(entry=>Math.round(entry.contentRect.width)!==chartWidth))resize();});resizeObserver.observe(chart);}else root.addEventListener('resize',resize);
 const api={destroy(){destroyed=true;if(resizeObserver)resizeObserver.disconnect();else root.removeEventListener('resize',resize);if(resizeFrame)root.cancelAnimationFrame(resizeFrame);section.removeEventListener('click',click);section.removeEventListener('keydown',keyboard);section.remove();if(host.__responseLens===api)delete host.__responseLens;},setChannel,selectEnergy,getState(){return{channel:state.channel,selectedEnergy:m.rows[state.selected].energyExact.slice()};}};host.__responseLens=api;return api;
}
const api={mount,model,exact,pair,numeric,sign,add:padd,zero};if(typeof module==='object'&&module.exports)module.exports={...api,renderSpectrum:spectrum};if(root)root.RESPONSE_LENS=api;
})(typeof window==='object'?window:null);
