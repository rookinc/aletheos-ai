'use strict';
const EncounterPanel=(()=>{
 function create({data,metadata,evidence,getContext,controls}){
  const $=id=>document.getElementById(id),model=new EncounterLab.Model(data,metadata,NativeModel,PairedSheetHistory);
  let copy=0,kind='spatial',epsilon=.05,experimental=false,scan=null,candidateIndex=0,memory=null,last='';
  const candidate=()=>scan?.candidates[candidateIndex]??null;
  const config=()=>{const c=getContext();return {steps:c.steps,merge:c.merge,planes:c.planes.map(p=>({...p})),kind,epsilon,projection:c.projection};};
  const isCurrent=()=>{if(!scan)return false;const a=scan.config,b=config();return a.kind===b.kind&&a.epsilon===b.epsilon&&a.merge===b.merge&&JSON.stringify(a.planes)===JSON.stringify(b.planes)&&(a.kind==='envelope'||a.steps===b.steps)&&(a.kind!=='projection'||JSON.stringify(a.projection)===JSON.stringify(b.projection));};
  const scanStatus=()=>{if(scan)$('labScanStatus').textContent=`${scan.count.toLocaleString()} ${scan.config.kind==='envelope'?'shared grid cells':'candidate pairs'} · ${scan.retained} inspected${scan.truncated?' (nearest 200 retained)':''} · captured F ${scan.config.steps%20}. ${isCurrent()?'Current scan.':'Stored snapshot; rescan for current controls.'}`;};
  for(const [id,name]of [['labMerge','merge'],['labEdges','edges'],['labVertices','vertices']])$(id).oninput=e=>controls.display(name,+e.target.value);
  const download=(value,name)=>{const u=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);};
  const formatTuple=v=>`native ${v.state} · frame ${v.frame} · G1800 ${v.pairedState}\nπ = (${v.frame}, ${v.g900}) · G15 pair (${v.basePair.join(', ')})\nrelative ${PairedSheetHistory.names[v.relativeSheet]} [${v.relativeSheet}] · hidden ${v.hiddenBit}`;
  for(let i=0;i<3;i++){
   const label=document.createElement('label');label.className=['x','y','z'][i];label.innerHTML=`<input id="labVisible${i}" type="checkbox" checked aria-label="Show ${['X','Y','Z'][i]} in Encounter Lab"> ${['X','Y','Z'][i]} · phase F <input id="labPhase${i}" type="number" min="0" max="19" value="0" aria-label="${['X','Y','Z'][i]} phase">`;$('labPhases').append(label);
   $('labVisible'+i).onchange=e=>controls.plane(i,{visible:e.target.checked});
   $('labPhase'+i).oninput=e=>{const v=Number(e.target.value);if(e.target.value!==''&&Number.isInteger(v)&&v>=0&&v<20)controls.plane(i,{offset:v});};
   $('labPhase'+i).onchange=e=>{const v=Number(e.target.value);if(Number.isInteger(v)&&v>=0&&v<20)controls.plane(i,{offset:v});else e.target.value=getContext().planes[i].offset;};
  }
  function update(){
   const c=getContext();if(c.mode!=='encounter')return;
   const key=JSON.stringify([c.steps,c.selected,c.planes,c.merge,c.edgeOpacity,c.vertexOpacity,c.projection,copy,kind,epsilon]);if(key===last)return;last=key;scanStatus();
   for(const[id,value]of [['labMerge',c.merge],['labEdges',c.edgeOpacity*100],['labVertices',c.vertexOpacity*100]])if(document.activeElement!==$(id))$(id).value=value;
   const s=model.monitor(c.selected,c.steps,c.planes[copy].offset),v=s.current;
   if(document.activeElement!==$('labCycle'))$('labCycle').value=c.selected+1;
   c.planes.forEach((p,i)=>{$('labVisible'+i).checked=p.visible;if(document.activeElement!==$('labPhase'+i))$('labPhase'+i).value=p.offset;});
   $('labNative').textContent=`Clock: ${s.steps} completed steps · F ${s.phase}\nCopy ${['X','Y','Z'][copy]}: F ${(s.phase+s.offset)%20} · reference F ${s.offset}\n${formatTuple(v)}\nChart XYZ: ${model.point(c.selected,(s.phase+s.offset)%20,copy,c.merge).map(x=>x.toFixed(6)).join(', ')}\nNext F: ${model.next(v.state)}`;
   $('labReturn').textContent=!s.started?'Reference state · no return yet':s.nativeReturned?'Full registered return':s.relativeReturned?'Partial return · π restored, hidden bit flipped':'Native transport in progress';
  }
  function showCandidate(){
   const item=candidate();if(!item){$('labCandidateInfo').textContent='No candidates at this criterion. Native coupling events: 0.';return;}
   const lines=[`${item.kind} · ${item.id}`,`Distance ${item.distance.toPrecision(7)} chart units`];
   if(item.spatialDistance!==undefined)lines.push(`3D separation ${item.spatialDistance.toPrecision(7)}`);
   for(const p of item.endpoints)lines.push(`\n${p.copy} · cycle ${p.cycle+1} · F ${p.stage}\n${formatTuple(p.tuple)}\nNext F native ${p.next.state}${p.intervalEnd?`\nSegment ${p.segment} fraction ${p.segmentFraction.toFixed(6)}\nInterval endpoints ${p.state} → ${p.intervalEnd.state}`:''}`);
   for(const r of item.pairRelations??[item])lines.push(`\n${r.copies??'Pair'} same-carrier adjacency: ${r.sameCarrierAdjacency?'yes':'no'}\nShared registered label: ${r.sharedRegisteredLabel?'yes':'no'}`);
   lines.push('\nCross-copy native edge: no\nProven interaction: no\nNative coupling events: 0');$('labCandidateInfo').textContent=lines.join('\n');controls.dirty();
  }
  function runScan(){
   controls.pause();kind=$('labKind').value;epsilon=Number($('labEpsilon').value);
   try{
    const c=config();scan=kind==='envelope'?model.envelope(c,InverseVolume,Number($('labCell').value)-1):model.scan(c);candidateIndex=0;
    const frag=document.createDocumentFragment();scan.candidates.forEach((p,i)=>{const o=document.createElement('option');o.value=i;o.textContent=`${i+1}. ${p.id} · d ${p.distance.toFixed(5)}`;frag.append(o);});$('labCandidate').replaceChildren(frag);$('labCandidate').disabled=!scan.candidates.length;
    $('labScanStatus').textContent=`${scan.count.toLocaleString()} ${kind==='envelope'?'shared grid cells':'candidate pairs'} · ${scan.retained} inspected${scan.truncated?' (nearest 200 retained)':''} · captured F ${scan.config.steps%20}. Scan again after changing controls.`;
    $('labCriterion').textContent=scan.criterion;if(scan.candidates[0]?.cellIndex!==undefined)$('labCell').value=scan.candidates[0].cellIndex+1;showCandidate();
   }catch(e){controls.notice(e.message);$('labScanStatus').textContent=e.message;}
  }
  function renderMemory(){
   $('labMemory').textContent=`${memory.operator} on both native inputs\nπ equal before: ${memory.inputProjectionEqual}\nRegistered state differs: ${memory.registeredStatesDiffer}\nHidden bits differ: ${memory.hiddenBitsDiffer}\nπ equal afterwards: ${memory.outputProjectionEqual}\nBefore: ${memory.before.map(x=>x.state).join(' / ')}\nAfter: ${memory.after.map(x=>x.state).join(' / ')}\nOperational memory established: no\n${memory.boundary}`;
  }
  function continuation(){const n=Number($('labContinuation').value);if(!Number.isInteger(n)||n<0||n>19)throw Error('Choose continuation 0–19.');return n;}
  $('labScan').onclick=runScan;$('labCandidate').onchange=e=>{candidateIndex=+e.target.value;showCandidate();};
  $('labKind').onchange=e=>{kind=e.target.value;$('labCellLabel').hidden=kind!=='envelope';controls.dirty();};
  $('labEpsilon').onchange=e=>{const n=Number(e.target.value);if(Number.isFinite(n)&&n>=.001&&n<=.2)epsilon=n;else e.target.value=epsilon;controls.dirty();};
  $('labCopy').onchange=e=>{copy=+e.target.value;last='';update();};
  $('labCycle').onchange=e=>{const n=Math.max(1,Math.min(450,Math.round(Number(e.target.value)||1)));controls.selectCycle(n-1);last='';update();};
  $('labStep').onclick=()=>{controls.step();update();};$('labClose').onclick=()=>controls.close();
  $('labRecord').onclick=()=>{try{
   const c=getContext(),item=candidate();const r=model.capture({...c,copy},item?{scanConfig:scan.config,selected:item}:null);
   const values=[$('labRecordA').value,$('labRecordB').value];
   for(const id of ['labRecordA','labRecordB']){const o=document.createElement('option');o.value=r.sequence-1;o.textContent=`#${r.sequence} · ${r.state.state}`;$(id).append(o);}
   $('labRecordA').value=values[0]||'0';$('labRecordB').value=r.sequence-1;$('labRecordStatus').textContent=`${r.sequence} observations · log never feeds evolution${item&&!isCurrent()?' · candidate retained from an earlier scan':''}`;
  }catch(e){controls.notice(e.message);}};
  $('labCompare').onclick=()=>{try{const records=model.ledger(),a=records[+$('labRecordA').value],b=records[+$('labRecordB').value];if(!a||!b)throw Error('Record two states first.');memory=model.continuePair(a.state.state,b.state.state,continuation());renderMemory();}catch(e){controls.notice(e.message);}};
  $('labF10').onclick=()=>{try{const c=getContext(),a=model.monitor(c.selected,c.steps,c.planes[copy].offset).current.state;memory=model.continuePair(a,model.next(a,10),continuation());renderMemory();}catch(e){controls.notice(e.message);}};
  $('labExperimental').onchange=e=>{experimental=e.target.checked;$('labExperimentNote').hidden=!experimental;$('labCoupling').textContent='No native coupling law admitted.';};
  const claims=Object.values(evidence);for(const [i,claim]of claims.entries()){const o=document.createElement('option');o.value=i;o.textContent=claim.audit;$('labEvidence').append(o);}
  function showEvidence(){const claim=claims[+$('labEvidence').value||0];$('labEvidenceInfo').textContent=JSON.stringify(claim,null,2);$('labEvidenceLink').href=`https://github.com/rookinc/aletheos-ai/tree/thalean-orthogonal-encounter-v12/thalean-orthogonal-deployment/source/provenance/encounter-001`;}
  $('labEvidence').onchange=showEvidence;showEvidence();$('labBridgeStatus').textContent='Read the bridge audit for recovered generators, replay results and the missing map. Display reversal is not a complex SU(6) operator.';
  const settings=()=>({copy,kind,epsilon,experimental});
  function apply(s){copy=s?.copy??0;kind=s?.kind??'spatial';epsilon=s?.epsilon??.05;experimental=s?.experimental??false;$('labCopy').value=copy;$('labKind').value=kind;$('labEpsilon').value=epsilon;$('labExperimental').checked=experimental;$('labExperimentNote').hidden=!experimental;$('labCellLabel').hidden=kind!=='envelope';scan=null;memory=null;candidateIndex=0;last='';$('labScanStatus').textContent='Fresh simulation; scan again. Earlier observations retain their original contexts.';$('labCandidate').replaceChildren();showCandidate();$('labMemory').textContent='No continuation tested for this simulation.';update();}
  const state=()=>({settings:settings(),scan,observations:model.ledger(),memory,couplingEvents:0});
  $('labExport').onclick=()=>download({schema:'orthogonal-encounter-replay-1',...state(),evidence},'Orthogonal_Encounter_Replay.json');
  return {update,settings,apply,state,runScan,markers:()=>isCurrent()?(candidate()?.endpoints.map(p=>p.point)??[]):[]};
 }
 return {create};
})();
