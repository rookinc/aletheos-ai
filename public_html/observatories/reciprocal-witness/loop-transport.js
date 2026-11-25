import {makeClock} from './loop-clock.js';
import {dartPairAt, DART_PAIRS, DART_SOURCE} from './dart-orbits.js';

export const ENCOUNTERS = Object.freeze({
  inside: {rateA:69,rateB:72,gap:42,window:60,openA:true,openB:true},
  outside: {rateA:69,rateB:69,gap:140,window:60,openA:true,openB:true},
  closed: {rateA:69,rateB:72,gap:42,window:60,openA:true,openB:false}
});
const EPS=1e-9;
const mod1=x=>(x%1+1)%1;

export function pairBeats(events){
  const gates=[];let a=null,b=null;
  for(const e of events){
    if((e.side==='A'||e.side==='AB')&&a===null)a=e.t;
    if((e.side==='B'||e.side==='AB')&&b===null)b=e.t;
    if(a!==null&&b!==null){gates.push({step:gates.length+1,t:Math.max(a,b),a,b,wait:Math.abs(a-b)});a=null;b=null;}
  }
  return gates;
}

function countAt(gates,t){
  let lo=0,hi=gates.length;
  while(lo<hi){const mid=Math.floor((lo+hi)/2);if(gates[mid].t<=t+EPS)lo=mid+1;else hi=mid;}
  return lo;
}
const smooth=t=>t*t*(3-2*t);
function travelSpan(gates,n){
  if(!n)return 0;
  const current=gates[n-1];return Math.min(.27,((gates[n]?.t??current.t+.6)-current.t)*.66);
}
export function twoSitters(config=ENCOUNTERS.inside){
  const clock=makeClock({seed:916,rateA:config.rateA,rateB:config.rateB,phaseA:.12,phaseB:mod1(.12+config.gap/360),
    windowDeg:config.window,strengthBpm:5,feedback:true,openA:config.openA,openB:config.openB},60);
  let gates=pairBeats(clock.beats),baseGates=pairBeats(clock.baselineBeats);
  function extend(t){
    if(t+3<clock.duration)return;
    clock.extendTo(Math.max(clock.duration+60,Math.ceil(t/60)*60+60));
    gates=pairBeats(clock.beats);baseGates=pairBeats(clock.baselineBeats);
  }
  function at(t){
    t=Math.max(0,t);extend(t);
    const n=countAt(gates,t),last=gates[n-1]??null,next=gates[n]??null,baseN=countAt(baseGates,t);
    const fraction=last?Math.max(0,Math.min(1,(t-last.t)/travelSpan(gates,n))):0;
    const drawn=last?n-1+smooth(fraction):0;
    let waiting='';
    if(next&&next.a<=t+EPS)waiting='A';
    if(next&&next.b<=t+EPS)waiting='B';
    return {t,n,last,next,drawn,waiting,baseGate:baseGates[baseN-1]??null,cycle:n?Math.ceil(n/20):1,
      phase:n?(n-1)%20+1:0,returns:Math.floor(n/20),clocks:clock.at(t),closed:clock.baselineAt(t)};
  }
  function timeForStep(n){
    if(!Number.isSafeInteger(n)||n<0)throw new RangeError('Use a nonnegative native step.');
    if(!n)return 0;
    while(gates.length<=n)extend(clock.duration);
    return gates[n-1].t+travelSpan(gates,n)+EPS;
  }
  function receipt(t,tail=20,pair='all'){
    const state=at(t);
    return {schema:'cori.two-sitter-loop/1',clock:clock.receipt(t),native:DART_SOURCE,
      gateRule:'First arrival on each side is latched; one native F update consumes both arrivals.',
      nativeStep:state.n,completedCycles:state.returns,displayPhase:state.phase,cycle:state.cycle,
      lastPairedBeats:gates.slice(Math.max(0,state.n-20),state.n),closedLastPairedBeat:state.baseGate,waiting:state.waiting,
      addresses:DART_PAIRS.map((_,i)=>dartPairAt(i,state.n)),display:{CMY:'A, solid circle',RGB:'B, dashed diamond',
        interval:[Math.max(0,state.drawn-tail),state.drawn],traceLength:tail,shownPair:pair}};
  }
  return {clock,at,timeForStep,receipt};
}
