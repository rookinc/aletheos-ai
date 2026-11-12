/* G1800: finite diagonal kernel quotients. Display never defines incidence. */
class G1800Engine {
 static axes=['a','b','ab'];
 static integer(v,n){if(!Number.isInteger(v)||v<0||v>=n)throw Error('State outside registered carrier');return v;}
 static permutation(p,n){return Array.isArray(p)&&p.length===n&&p.every(v=>Number.isInteger(v)&&v>=0&&v<n)&&new Set(p).size===n;}
 static pair(s){return [Math.floor(s/60),s%60];}
 static freeze(v){if(v&&typeof v==='object'){Object.values(v).forEach(G1800Engine.freeze);Object.freeze(v);}return v;}
 constructor(data){
  if(data.schema!=='uft4.g1800.registration.v1')throw Error('Unsupported G1800 source');
  this.data=G1800Engine.freeze(data);
  for(const name of ['identity',...G1800Engine.axes]){
   const p=data.deck[name];if(!G1800Engine.permutation(p,60))throw Error('Invalid native deck permutation');
   if(name!=='identity'&&p.some((v,i)=>v===i||p[v]!==i))throw Error('Native deck must be a free involution');
  }
  if(data.deck.identity.some((v,i)=>v!==i)||data.deck.a.some((v,i)=>data.deck.b[v]!==data.deck.ab[i]||data.deck.b[v]!==data.deck.a[data.deck.b[i]]))throw Error('Native V4 law failed');
  const edgeSet=new Set(data.edges.map(([a,b])=>Math.min(a,b)+','+Math.max(a,b)));
  if(data.edges.length!==120||edgeSet.size!==120)throw Error('Native G60 edge count failed');
  for(const name of G1800Engine.axes)if(!this.preservesEdges(data.deck[name],edgeSet))throw Error('Deck adjacency failed');
  this.base=this.quotient(['identity',...G1800Engine.axes]);
  if(this.base.fibers.length!==900)throw Error('Native G900 quotient count failed');
  this.models={};this.projections={};this.sheets={};this.delta={};
  for(const axis of G1800Engine.axes){
   const model=this.quotient(['identity',axis]);if(model.fibers.length!==1800)throw Error('G1800 quotient count failed');
   const projection=model.fibers.map(f=>this.base.qid[f[0]]),sheets=Array.from({length:900},()=>[]);
   projection.forEach((b,q)=>sheets[b].push(q));
   if(sheets.some(f=>f.length!==2))throw Error('Two-to-one projection failed');
   const delta=projection.map((b,q)=>sheets[b][0]===q?sheets[b][1]:sheets[b][0]),K=data.turns[axis];
   if(!G1800Engine.permutation(K,1800))throw Error('Native K is not bijective');
   for(let q=0;q<1800;q++)if(K[K[q]]!==delta[q]||K[K[K[K[q]]]]!==q)throw Error('K squared / fourth power failed');
   this.models[axis]=model;this.projections[axis]=Object.freeze(projection);this.sheets[axis]=G1800Engine.freeze(sheets);this.delta[axis]=Object.freeze(delta);
  }
  G1800Engine.freeze(this.models);G1800Engine.freeze(this.projections);G1800Engine.freeze(this.sheets);G1800Engine.freeze(this.delta);
  if(data.automorphisms.length!==480)throw Error('Automorphism source count failed');
 }
 preservesEdges(p,E=new Set(this.data.edges.map(([a,b])=>Math.min(a,b)+','+Math.max(a,b)))){return this.data.edges.every(([a,b])=>E.has(Math.min(p[a],p[b])+','+Math.max(p[a],p[b])));}
 quotient(group){
  const qid=Array(3600).fill(-1),fibers=[];
  for(let s=0;s<3600;s++){if(qid[s]>=0)continue;const [u,v]=G1800Engine.pair(s),f=[...new Set(group.map(k=>this.data.deck[k][u]*60+this.data.deck[k][v]))].sort((a,b)=>a-b);
   if(f.length!==group.length||f.some(x=>qid[x]>=0))throw Error('Invalid quotient partition');
   const q=fibers.length;f.forEach(x=>qid[x]=q);fibers.push(Object.freeze(f));
  }
  return Object.freeze({qid:Object.freeze(qid),fibers:Object.freeze(fibers)});
 }
 model(axis){if(!G1800Engine.axes.includes(axis))throw Error('Unknown kernel');return this.models[axis];}
 inspect(axis,q){
  const m=this.model(axis);G1800Engine.integer(q,1800);const base=this.projections[axis][q],sheets=this.sheets[axis][base],K=this.data.turns[axis],cycle=[q];
  for(let i=1;i<4;i++)cycle.push(K[cycle[i-1]]);
  return {kernel:axis,state:q,projection:base,sheet:sheets.indexOf(q),twoStates:sheets.slice(),representatives:m.fibers[q].map(G1800Engine.pair),baseRepresentatives:this.base.fibers[base].map(G1800Engine.pair),cycle,checks:{twoRepresentatives:m.fibers[q].length===2,twoToOne:sheets.length===2,K2IsDelta:K[K[q]]===this.delta[axis][q],K4IsIdentity:K[cycle[3]]===q,deltaPreservesProjection:this.projections[axis][this.delta[axis][q]]===base}};
 }
 step(axis,q,n){this.model(axis);G1800Engine.integer(q,1800);if(!Number.isSafeInteger(n))throw Error('Use an integer turn count');for(let j=0,count=((n%4)+4)%4;j<count;j++)q=this.data.turns[axis][q];return q;}
 flip(axis,q){this.model(axis);G1800Engine.integer(q,1800);return this.delta[axis][q];}
 transport(axis,q,index,reverse=false){
  const model=this.model(axis);G1800Engine.integer(q,1800);G1800Engine.integer(index,480);
  const a=this.data.automorphisms[index];if(!G1800Engine.permutation(a.p,60)||!this.preservesEdges(a.p))throw Error('Automorphism validation failed');
  let p=a.p,target;
  if(reverse){p=Array(60);a.p.forEach((v,i)=>p[v]=i);target=G1800Engine.axes[a.action.indexOf(axis)];}
  else target=a.action[G1800Engine.axes.indexOf(axis)];
  if(!target)throw Error('Kernel transport unavailable');
  const image=model.fibers[q].map(s=>{const [u,v]=G1800Engine.pair(s);return this.models[target].qid[p[u]*60+p[v]];});
  if(image[0]!==image[1])throw Error('Transport does not descend');
  return {kernel:target,state:image[0]};
 }
 fromPair(axis,u,v){G1800Engine.integer(u,60);G1800Engine.integer(v,60);return this.model(axis).qid[u*60+v];}
 receipt(axis,q,operation,input){return {schema:'uft4.g1800.receipt.v1',source:this.data.source,operation,input,output:this.inspect(axis,q),classification:'native finite registration and action',display:{coordinates:'conventional',sheetLabels:'least-class ordering; registration-dependent',audit052HostMap:'unestablished'},boundaries:{g1800Adjacency:'not asserted in this view',fieldCoupling:'unestablished',gaugeModuleExactness:'unresolved'}};}
}
class G1800Controller {
 constructor(app){
  this.app=app;this.active=false;this.kernel='a';this.q=0;this.origin=0;this.steps=0;this.auto=0;this.view='overview';this.fibers=true;this.rate=1;this.running=false;this.pending=0;this.lastReceipt=null;this.downloadURL=null;this.available=false;
  this.$=id=>document.getElementById(id);
  this.canvas=app.ui.el('canvas');this.legacyCanvasLabel=this.canvas.getAttribute('aria-label');this.legacyStageLabel=app.ui.el('stage').getAttribute('aria-label');
  try{
   this.engine=new G1800Engine(JSON.parse(this.$('g1800NativeData').textContent));
   if(JSON.stringify(this.engine.data.edges)!==JSON.stringify(app.graph.edges))throw Error('Current native G60 registration does not match');
   this.available=true;
  }catch(error){this.$('g1800Select').disabled=true;this.$('g1800Select').title=error.message;this.$('g1800Error').hidden=false;this.$('g1800Error').textContent='G1800 unavailable: '+error.message;return;}
  this.screen=new Float64Array(5400);this.point=new Float64Array(3);
  this.$('g900Select').onclick=()=>this.setActive(false);
  this.$('g1800Select').onclick=()=>this.setActive(true);
  this.$('liftKernel').onchange=()=>{const pair=this.engine.inspect(this.kernel,this.q).representatives[0];this.kernel=this.$('liftKernel').value;this.q=this.engine.fromPair(this.kernel,...pair);this.anchor();this.sync();};
  this.$('liftState').onchange=()=>this.guard(()=>{const value=this.$('liftState').valueAsNumber;G1800Engine.integer(value,1800);this.q=value;this.anchor();this.sync();});
  this.$('liftBase').onchange=()=>this.guard(()=>{const value=this.$('liftBase').valueAsNumber;G1800Engine.integer(value,900);this.q=this.engine.sheets[this.kernel][value][Number(this.$('liftSheet').value)];this.anchor();this.sync();});
  this.$('liftSheet').onchange=()=>{const info=this.engine.inspect(this.kernel,this.q);this.q=info.twoStates[Number(this.$('liftSheet').value)];this.anchor();this.sync();};
  this.$('liftView').onchange=()=>{this.view=this.$('liftView').value;this.sync();};
  this.$('liftFibers').onchange=()=>{this.fibers=this.$('liftFibers').checked;};
  for(const [id,n]of [['liftBack',-1],['liftStep',1],['liftReturn',4]])this.$(id).onclick=()=>this.act(n);
  this.$('liftFlip').onclick=()=>this.act(2);
  this.$('liftReset').onclick=()=>this.resetToOrigin();
  this.$('liftPlay').onclick=()=>{this.running=!this.running;this.pending=0;this.sync();};
  this.$('liftRate').onchange=()=>this.guard(()=>{const n=this.$('liftRate').valueAsNumber;if(!Number.isFinite(n)||n<.25||n>4)throw Error('Use a rate from 0.25 to 4');this.rate=n;this.pending=0;this.sync();});
  const select=this.$('liftAuto');this.engine.data.automorphisms.forEach((a,i)=>{const option=document.createElement('option');option.value=i;option.textContent='A'+i+' · order '+a.order;select.append(option);});
  select.onchange=()=>{this.auto=Number(select.value);this.sync();};
  this.$('liftTransport').onclick=()=>this.applyTransport(false);this.$('liftUndoTransport').onclick=()=>this.applyTransport(true);
  this.$('liftExport').onclick=()=>this.exportReceipt();
  this.sync();
 }
 guard(fn){try{fn();this.$('liftMessage').textContent='';}catch(error){this.$('liftMessage').textContent=error.message;this.sync();}}
 resetToOrigin(){const before=this.q;this.q=this.origin;this.steps=0;this.running=false;this.pending=0;this.record('reset to registered origin',{kernel:this.kernel,state:before});this.sync();}
 anchor(){this.origin=this.q;this.steps=0;this.pending=0;this.running=false;}
 setActive(on){
  if(!this.available)return;this.active=on;this.pending=0;this.app.last=0;
  document.body.classList.toggle('g1800-active',on);
  this.$('renderControlsTitle').textContent=on?'Display palette':'Field style & cycle';
  for(const [id,pressed]of [['g900Select',!on],['g1800Select',on]]){this.$(id).setAttribute('aria-pressed',String(pressed));this.$(id).classList.toggle('active',pressed);}
  this.$('g1800Section').hidden=!on;
  this.canvas.setAttribute('aria-label',on?'G1800 native registration: 1,800 states in two display sheets over 900 diagonal quotient addresses. Tap a state to inspect; drag to orbit. Positions and sheet labels are display conventions.':this.legacyCanvasLabel);
  this.app.ui.el('stage').setAttribute('aria-label',on?'G1800 native quotient registration and four-step transport':this.legacyStageLabel);
  this.app.ui.sceneDescription=null;if(!on)this.app.ui.updateHost(true);this.app.renderer.invalidate('geometry');this.sync();
 }
 record(operation,input){this.lastReceipt=this.engine.receipt(this.kernel,this.q,operation,input);this.$('liftExport').disabled=false;}
 act(n,automatic=false){this.guard(()=>{const before={kernel:this.kernel,state:this.q};this.q=this.engine.step(this.kernel,this.q,n);this.steps+=n;this.record('K^'+n,before);if(!automatic){this.running=false;this.pending=0;}this.sync();});}
 applyTransport(reverse){this.guard(()=>{const input={kernel:this.kernel,state:this.q,automorphism:this.auto,inverse:reverse},next=this.engine.transport(this.kernel,this.q,this.auto,reverse);this.kernel=next.kernel;this.q=next.state;this.anchor();this.record(reverse?'inverse diagonal automorphism transport':'diagonal automorphism transport',input);this.sync();});}
 advance(dt){
  if(!this.active||!this.available||!this.running||!this.app.sim.playing)return;
  this.pending+=Math.max(0,Math.min(.07,dt))*this.rate*this.app.sim.params.speed;
  if(this.pending>=1){this.pending-=1;this.act(this.app.sim.direction,true);}
 }
 sync(){
  if(!this.available)return;
  const i=this.engine.inspect(this.kernel,this.q);
  this.$('liftKernel').value=this.kernel;this.$('liftState').value=this.q;this.$('liftBase').value=i.projection;this.$('liftSheet').value=i.sheet;this.$('liftView').value=this.view;this.$('liftAuto').value=this.auto;this.$('liftRate').value=this.rate;this.$('liftFibers').checked=this.fibers;
  this.$('liftPlay').textContent=this.running?'Pause K cycle':'Run K cycle';this.$('liftPlay').setAttribute('aria-pressed',String(this.running));
  const pairText=p=>'('+p.map(v=>'V'+(v+1)).join(', ')+')';
  this.$('liftReadout').textContent='State '+(this.q+1)+' · index '+this.q+' / 1799\nKernel ⟨'+this.kernel+', '+this.kernel+'⟩ · sheet '+i.sheet+'\nNative quotient G900 index '+i.projection+'\nTwo states above it: '+i.twoStates.join(' ↔ ')+'\nRepresentatives: '+i.representatives.map(pairText).join(' ≡ ')+'\nK turns from origin: '+this.steps+'\nK² = Δ · K⁴ = I · projection verified';
  this.$('liftCycle').replaceChildren();
  const cycle=this.engine.inspect(this.kernel,this.origin).cycle;
  cycle.forEach((q,j)=>{const b=document.createElement('button');b.type='button';b.textContent='K'+['⁰','¹','²','³'][j]+' · '+q;b.setAttribute('aria-label','Inspect K step '+j+', state index '+q);b.setAttribute('aria-pressed',String(q===this.q));b.classList.toggle('active',q===this.q);b.onclick=()=>{const before=this.q;this.q=q;this.steps=j;this.running=false;this.pending=0;this.record('inspect registered K cycle',{kernel:this.kernel,state:before,cycleStep:j});this.sync();};this.$('liftCycle').append(b);});
  this.$('liftTransportHint').textContent='A'+this.auto+': kernel '+this.kernel+' → '+this.engine.data.automorphisms[this.auto].action[G1800Engine.axes.indexOf(this.kernel)]+'. Inverse applies this same automorphism in reverse.';
  if(this.active){this.$('liftStatus').textContent='G1800 · '+(this.view==='overview'?'1,800 registered states':'selected class representatives')+' · K cycle '+(this.running?(this.app.sim.playing?'running':'held by global Pause'):'paused');this.$('liftStatus').hidden=false;}
  else this.$('liftStatus').hidden=true;
 }
 exportReceipt(){
  this.guard(()=>{const record=this.lastReceipt||this.engine.receipt(this.kernel,this.q,'inspect registration',null);if(this.downloadURL)URL.revokeObjectURL(this.downloadURL);this.downloadURL=URL.createObjectURL(new Blob([JSON.stringify(record,null,2)+'\n'],{type:'application/json'}));const a=document.createElement('a');a.href=this.downloadURL;a.download='uft4-g1800-registration.json';document.body.append(a);a.click();a.remove();this.$('liftMessage').textContent='Native state receipt prepared.';});
 }
 pick(x,y){
  if(!this.active||this.view!=='overview')return;
  let best=14*14,chosen=-1;for(let q=0;q<1800;q++){const dx=x-this.screen[q*3],dy=y-this.screen[q*3+1],d=dx*dx+dy*dy;if(d<best){best=d;chosen=q;}}
  if(chosen>=0){this.q=chosen;this.anchor();this.sync();}
 }
 draw(r,now){
  const started=performance.now(),c=r.ctx,w=r.w,h=r.h,hi=this.app.settings.highContrast,theme=getOverlayTheme(this.app.settings),M=this.app.geometry;
  M.configure(this.app.camera,w,h);M.scale=Math.min(w/4.6,Math.max(30,h-96)/4.6)*this.app.camera.zoom/2.8;M.centerX=w/2;M.centerY=h*.47;
  c.setTransform(r.canvas.width/w,0,0,r.canvas.height/h,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.fillStyle=hi?'#f8fafc':'#030713';c.fillRect(0,0,w,h);
  const info=this.engine.inspect(this.kernel,this.q),cycle=this.engine.inspect(this.kernel,this.origin).cycle;
  if(this.view==='overview'){
   for(let b=0;b<900;b++){
    const u=2*Math.PI*Math.floor(b/60)/15,v=2*Math.PI*(b%60)/60,R=1.65+.32*Math.cos(v);
    for(let sheet=0;sheet<2;sheet++){const q=this.engine.sheets[this.kernel][b][sheet];M.projectInto(R*Math.cos(u),R*Math.sin(u),.32*Math.sin(v)+(sheet?.66:-.66),this.screen,q*3);}
   }
   if(this.fibers){c.strokeStyle=hi?'#526b78':'#8db0c7';c.globalAlpha=hi?.22:.1;c.lineWidth=.65;c.beginPath();for(const pair of this.engine.sheets[this.kernel]){const a=pair[0]*3,b=pair[1]*3;c.moveTo(this.screen[a],this.screen[a+1]);c.lineTo(this.screen[b],this.screen[b+1]);}c.stroke();}
   for(let sheet=0;sheet<2;sheet++){c.fillStyle=sheet?theme.external:theme.local;c.globalAlpha=hi?.7:.48;c.beginPath();for(let b=0;b<900;b++){const q=this.engine.sheets[this.kernel][b][sheet],x=this.screen[q*3],y=this.screen[q*3+1];c.moveTo(x+1.2,y);c.arc(x,y,1.2,0,Math.PI*2);}c.fill();}
   c.globalAlpha=1;c.strokeStyle=theme.source;c.lineWidth=2;c.beginPath();for(let j=0;j<5;j++){const q=cycle[j%4]*3;if(j)c.lineTo(this.screen[q],this.screen[q+1]);else c.moveTo(this.screen[q],this.screen[q+1]);}c.stroke();
   for(const q of new Set([...cycle,...info.twoStates])){const x=this.screen[q*3],y=this.screen[q*3+1];c.fillStyle=q===this.q?theme.source:theme.external;c.beginPath();c.arc(x,y,q===this.q?6:3.5,0,Math.PI*2);c.fill();if(q===this.q){c.strokeStyle=theme.source;c.beginPath();c.arc(x,y,11,0,Math.PI*2);c.stroke();}}
  }else{
   const points=[new Float64Array(180),new Float64Array(180)];
   for(let side=0;side<2;side++)for(let v=0;v<60;v++){const j=this.app.graph.index[v],k=this.app.graph.fibers[j].indexOf(v),u=2*Math.PI*j/15,t=2*Math.PI*k/4,R=.72+.18*Math.cos(t);M.projectInto(R*Math.cos(u)+(side?1.06:-1.06),R*Math.sin(u),.18*Math.sin(t),points[side],v*3);}
   for(let side=0;side<2;side++){
    const P=points[side];c.strokeStyle=side?theme.external:theme.local;c.globalAlpha=hi?.65:.35;c.lineWidth=1;c.beginPath();for(const [a,b]of this.engine.data.edges){c.moveTo(P[a*3],P[a*3+1]);c.lineTo(P[b*3],P[b*3+1]);}c.stroke();
    for(let v=0;v<60;v++){c.fillStyle=side?theme.external:theme.local;c.beginPath();c.arc(P[v*3],P[v*3+1],1.7,0,Math.PI*2);c.fill();}
    c.globalAlpha=1;
    info.representatives.forEach((pair,j)=>{const v=pair[side],x=P[v*3],y=P[v*3+1];c.fillStyle=j?theme.external:theme.source;c.beginPath();c.arc(x,y,5,0,Math.PI*2);c.fill();c.font='12px system-ui';c.fillText('V'+(v+1),x+8,y-6);});
   }
  }
  c.globalAlpha=1;c.fillStyle=hi?'#16354c':'#c2d9eb';c.font='600 13px system-ui';c.textAlign='center';c.fillText('G1800 / ⟨'+this.kernel+', '+this.kernel+'⟩',w/2,Math.max(27,h-58));c.font='11px system-ui';c.fillStyle=hi?'#37434e':'#94a9c3';c.fillText(this.view==='overview'?'Two display sheets · 900 quotient addresses each':'Two G60 factors · two equivalent ordered-pair representatives',w/2,Math.max(43,h-37));c.textAlign='left';
  r.stats.frames++;r.stats.surfaceElements=0;r.stats.plasmaMs=0;r.stats.fieldMs=0;r.stats.graphMs=0;r.stats.geometryMs=0;r.stats.compositeMs=0;r.stats.drawMs=performance.now()-started;r.lastFrame=now;r.windowFrames++;
  if(now-r.windowStart>=1000){r.stats.fps=r.windowFrames*1000/(now-r.windowStart);r.stats.plasmaFps=0;r.stats.frameMs=(now-r.windowStart)/r.windowFrames;r.windowFrames=0;r.windowStart=now;this.app.updateDiagnostics();}
  this.$('liftStatus').textContent='G1800 · state '+this.q+' · quotient '+info.projection+' · sheet '+info.sheet+(this.running?(this.app.sim.playing?' · K running':' · held by Pause'):' · K paused');
 }
 snapshot(){return {active:this.active,kernel:this.kernel,state:this.q,origin:this.origin,steps:this.steps,auto:this.auto,view:this.view,fibers:this.fibers,rate:this.rate,running:this.running};}
 restore(s){this.lastReceipt=null;this.active=s.active;this.kernel=s.kernel;this.q=s.state;this.origin=s.origin;this.steps=s.steps;this.auto=s.auto;this.view=s.view;this.fibers=s.fibers;this.rate=s.rate;this.running=s.running;this.pending=0;this.setActive(s.active);}
}
if(typeof module!=='undefined'&&typeof document==='undefined')module.exports={G1800Engine,G1800Controller};
