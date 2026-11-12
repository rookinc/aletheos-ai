'use strict';
const PairedHistoryPanel=(()=>{
 const names=['1','a','b','ab'];
 function create({data,getContext,controls}){
  const $=id=>document.getElementById(id);
  let enabled=false,copy=0,model=null,last='',error=null;
  function snapshot(){const c=getContext();return model.snapshot(c.selected,c.steps,c.planes[copy].offset);}
  function update(){
   if(!enabled||!model)return;
   const c=getContext(),offset=c.planes[copy].offset;
   const key=[c.selected,c.steps,offset,copy,c.mode,c.running,c.planes[copy].visible,c.planes[copy].opacity].join(':');if(key===last)return;last=key;
   const s=snapshot(),v=s.current,started=s.started;
   if(document.activeElement!==$('historyCycle'))$('historyCycle').value=c.selected+1;$('historyCopy').value=copy;
   $('historyReference').textContent=`Cycle ${c.selected+1} / 450 · ${['X','Y','Z'][copy]} offset ${offset} · reference F ${offset}${!c.planes[copy].visible||!c.planes[copy].opacity?' · copy hidden':''}`;
   $('historySheet').textContent=names[v.relativeSheet];$('historyBit').textContent=v.hiddenBit;
   $('historySheets').querySelectorAll('[data-sheet]').forEach(el=>el.setAttribute('aria-current',String(+el.dataset.sheet===v.relativeSheet)));
   $('historySteps').textContent=s.steps;$('historyPhase').textContent=`${s.phase} / ${(s.phase+s.offset)%20}`;
   $('historyBase').textContent=`${v.frame} · (${v.basePair.join(', ')})`;
   $('historyNative').textContent=`${v.g900} · ${v.state}`;
   const status=!started?'start':s.nativeReturned?'complete':s.relativeReturned?'partial':'moving';
   const text=!started?'Starting registered state':s.nativeReturned?'Complete native return':s.relativeReturned?'Projected return · hidden bit flipped':s.baseReturned?'Base returned · relative state differs':'Transport in progress';
   $('historyReturn').dataset.status=status;$('historyReturn').textContent=text;
   $('historyReturn').setAttribute('aria-live',c.running?'off':'polite');
   const label=value=>!started?'Start':value?'Returned':'Not returned';
   $('historyBaseReturn').textContent=label(s.baseReturned);$('historyRelativeReturn').textContent=label(s.relativeReturned);$('historyNativeReturn').textContent=label(s.nativeReturned);
   $('historyPlay').textContent=c.running?'Pause':'Play';$('historyPlay').setAttribute('aria-label',`${c.running?'Pause':'Play'} original F clock`);
   const frag=document.createDocumentFragment();
   for(const item of s.trail){const li=document.createElement('li'),small=document.createElement('small'),value=document.createElement('span');
    small.textContent=item.step;value.textContent=`${names[item.relativeSheet]}/${item.hiddenBit}`;
    if(item.hiddenBit!==s.start.hiddenBit)value.className='changed-bit';
    if(item.step===s.steps)li.setAttribute('aria-current','step');
    li.title=`Advance ${item.step}, clock F ${item.phase}, copy F ${(item.phase+s.offset)%20}: native index ${item.state}, relative sheet ${names[item.relativeSheet]}, hidden bit ${item.hiddenBit}, pair (${item.basePair.join(', ')})`;
    li.append(small,value);frag.append(li);
   }
   $('historyTrail').replaceChildren(frag);
   $('historyModeNote').textContent=c.mode==='inverse'?'Clock trace only: the inverse cube shows a full-cycle envelope.':'Completed native transitions. Between-step motion is rendering interpolation.';
  }
  function setEnabled(value){
   enabled=!!value;last='';
   if(enabled&&!model){try{model=new PairedSheetHistory.Model(data,JSON.parse($('pairedHistoryData').textContent));}catch(e){error=e.message;enabled=false;$('historyToggle').title='History unavailable: '+error;controls.notice('Paired history unavailable: '+error);}}
   $('pairedHistoryPanel').hidden=!enabled;$('historyToggle').setAttribute('aria-expanded',String(enabled));$('historyToggle').setAttribute('aria-pressed',String(enabled));
   update();
  }
  $('historyToggle').onclick=()=>{setEnabled(!enabled);if(enabled)$('historyClose').focus();};
  $('historyClose').onclick=()=>{setEnabled(false);$('historyToggle').focus();};
  $('historyCopy').onchange=e=>{copy=+e.target.value;last='';update();};
  $('historyCycle').oninput=e=>{const n=Number(e.target.value);if(Number.isInteger(n)&&n>=1&&n<=450){controls.selectCycle(n-1);last='';update();}};
  $('historyCycle').onchange=e=>{const index=Math.max(0,Math.min(449,Math.round(Number(e.target.value)||1)-1));e.target.value=index+1;controls.selectCycle(index);last='';update();};
  $('historyPlay').onclick=()=>{controls.play();update();};
  $('historyStep').onclick=()=>{controls.step();update();};
  $('historyReset').onclick=()=>{controls.reset();update();};
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&enabled){setEnabled(false);$('historyToggle').focus();}});
  return {update,settings:()=>({enabled,copy}),apply(value){copy=value?.copy??0;setEnabled(value?.enabled??false);},getState:()=>({enabled,copy,error,snapshot:enabled&&model?snapshot():null})};
 }
 return {create};
})();
