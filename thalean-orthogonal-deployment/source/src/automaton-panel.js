'use strict';
const AutomatonPanel=(()=>{
 function create({data,metadata,jointData,controls}){
  const $=id=>document.getElementById(id),pair=new G9000Automaton.Pair(data,metadata,NativeModel,PairedSheetHistory),joint=new G9000Automaton.Joint008(jointData);
  let view='entities',experimental=false,time=0,running=false,lastTick=null,pointMerge=null,points=null;
  const sceneActive=()=>view==='entities';
  const download=(value,name)=>{const u=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);};
  const tuple=s=>`native ${s.state} · frame ${s.frame} · G1800 ${s.pairedState}\nπ = (${s.frame}, ${s.g900}) · G15 (${s.basePair.join(', ')})\nrelative ${s.relativeSheet} · hidden ${s.hiddenBit}`;
  function stop(){running=false;lastTick=null;$('autoPlay').textContent='Play pair';$('autoPlay').setAttribute('aria-pressed','false');}
  function paintExperiment(){
   $('autoExperimentBody').hidden=!experimental;if(!experimental)return;
   const s=joint.sample(time);$('autoTime').value=time;
   $('autoExperimentInfo').textContent=`Experimental · Witness008 · t/T ${time.toFixed(2)}\nA at home 7: ${s.probeHome.toFixed(8)}\nB at written address 488: ${s.witnessWritten.toFixed(8)}\nB at ready address 0: ${s.witnessReady.toFixed(8)}\nTotal norm: ${s.totalNorm.toFixed(12)}\nModel H/κ: ${s.energyOverKappa}\nLargest joint component: (${s.dominantJointState.join(', ')})\nNative coupling events: 0`;
   const c=$('autoJointChart').getContext('2d');c.fillStyle='#09131e';c.fillRect(0,0,700,210);for(let j=0;j<31;j++){const w=s.weights[j];c.fillStyle=jointData.history[j][1]===488?'#f5c47c':'#60e3eb';c.fillRect(12+j*22,178-150*w,16,Math.max(1,150*w));}c.font='16px ui-monospace,monospace';c.fillStyle='#c8e1ee';c.fillText('h₀ (7,0)',12,202);c.fillText('h₃₀ (7,488)',535,202);
  }
  function update(){const s=pair.snapshot();$('autoA').value=pair.a;$('autoB').value=pair.b;$('autoContact').textContent=`Native adjacency: ${s.adjacent?'YES':'NO'} · co-location: ${s.coLocated?'YES':'NO'}\nA: ${s.steps[0]} F steps · B: ${s.steps[1]} F steps\nNative coupling events: 0`;$('autoContact').classList.toggle('contact',s.adjacent);$('autoTuples').textContent=`ENTITY A\n${tuple(s.A)}\nNext F ${pair.g.F[pair.a]}\n\nENTITY B\n${tuple(s.B)}\nNext F ${pair.other.F[pair.b]}`;$('autoRecords').textContent=`${pair.records.length} observations · no feedback into evolution`;$('autoEntityControls').hidden=!sceneActive();$('autoView').value=view;controls.dirty();}
  const act=fn=>()=>{try{fn();update();}catch(e){stop();controls.notice(e.message);}};
  $('autoA').onfocus=stop;$('autoB').onfocus=stop;
  $('autoPrepare').onclick=act(()=>{const a=$('autoA').value,b=$('autoB').value;if(a===''||b==='')throw Error('Enter both native addresses.');pair.prepare(Number(a),Number(b));stop();});
  $('autoApproach').onclick=act(()=>{pair.prepare(7208,16);stop();});$('autoHidden').onclick=act(()=>{pair.prepare(488,16);stop();});
  for(const [id,op]of [['autoStepA','A'],['autoStepB','B'],['autoStepBoth','both']])$(id).onclick=act(()=>{stop();pair.step(op);});
  $('autoPlay').onclick=()=>{running=!running;lastTick=null;$('autoPlay').textContent=running?'Pause pair':'Play pair';$('autoPlay').setAttribute('aria-pressed',String(running));};
  $('autoView').onchange=e=>{view=e.target.value;stop();controls.changed();update();};
  $('autoRecord').onclick=act(()=>pair.record());$('autoSave').onclick=()=>controls.save();$('autoLoad').onclick=()=>controls.load();
  $('autoExperimental').onchange=e=>{experimental=e.target.checked;time=0;paintExperiment();controls.dirty();};
  $('autoTime').oninput=act(()=>{const n=Number($('autoTime').value);joint.sample(n);time=n;paintExperiment();});
  for(let i=0;i<3;i++)$('autoTime'+i).onclick=act(()=>{time=i;paintExperiment();});
  const exportReplay=()=>({schema:'g9000-automaton-replay-1',nativeSource:jointData.native_provenance,native:pair.export(),experimental:experimental?{source:jointData.provenance,timeOverT:time,snapshot:joint.sample(time)}:null,nativeCouplingEvents:0,assumptions:{native:'Independent F_A/F_B on the commonly registered observatory a-quotient graph; no field response law.',experimental:'Declared correlated joint field in the distinct b registration. No transplantation to native entity instances.'}});
  $('autoExport').onclick=()=>download(exportReplay(),'G9000_Automaton_Replay.json');
  function tick(now){if(!running)return;if(lastTick===null){lastTick=now;return;}if(now-lastTick>=1000){lastTick=now;try{pair.step('both');update();}catch(e){stop();controls.notice(e.message);}}}
  function render(ctx,project,width,height,merge){
   if(pointMerge!==merge){points=Array.from({length:9000},(_,v)=>NativeModel.splitPoint(pair.g.cycleOf[v],pair.g.stageOf[v],undefined,merge));pointMerge=merge;}
   const projected=points.map(project),graph=new Path2D();for(const[a,b]of pair.g.edges){graph.moveTo(projected[a][0],projected[a][1]);graph.lineTo(projected[b][0],projected[b][1]);}
   ctx.globalAlpha=.025;ctx.strokeStyle='#759aaf';ctx.lineWidth=.45;ctx.stroke(graph);ctx.globalAlpha=.23;ctx.fillStyle='#9ab2c5';for(const p of projected)ctx.fillRect(p[0],p[1],1,1);
   for(const [v,color,label,r]of [[pair.a,'#60e3eb','A',7],[pair.b,'#f5c47c','B',11]]){const p=projected[v];ctx.globalAlpha=.55;ctx.strokeStyle=color;ctx.lineWidth=1.2;ctx.beginPath();for(const w of pair.adj[v]){ctx.moveTo(p[0],p[1]);ctx.lineTo(projected[w][0],projected[w][1]);}ctx.stroke();ctx.globalAlpha=1;ctx.beginPath();ctx.arc(p[0],p[1],r,0,2*Math.PI);ctx.fillStyle='#09131e';ctx.fill();ctx.lineWidth=2.4;ctx.stroke();ctx.fillStyle=color;ctx.font='bold 12px ui-monospace,monospace';ctx.textAlign='left';ctx.fillText(label+' '+v,Math.max(8,Math.min(width-75,p[0]+15)),Math.max(18,Math.min(height-8,p[1]+(label==='A'?-16:25))));}
   ctx.globalAlpha=1;
  }
  const settings=()=>({view,a:pair.a,b:pair.b,experimental});
  function apply(s){s=s??{view:'entities',a:0,b:16,experimental:false};G9000Automaton.validateSettings(s);stop();view=s.view;pair.prepare(s.a,s.b);experimental=s.experimental;time=0;$('autoExperimental').checked=experimental;paintExperiment();update();controls.changed();}
  update();
  return {sceneActive,render,tick,stop,settings,apply,exportReplay,togglePlay:()=>$('autoPlay').onclick(),snapshot:()=>pair.snapshot()};
 }
 return {create};
})();
