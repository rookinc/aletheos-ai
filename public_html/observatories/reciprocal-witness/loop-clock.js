// Continuous, deterministic phase clocks. Time is in seconds, phases in cycles.
// The analytical solution between capture boundaries also supplies beat root times.
export const LOOP_CLOCK_VERSION = 'RWO-loop-clock-1.0.0';
export const LOCK_RULE = Object.freeze({dwellSeconds:6, frequencyToleranceBpm:0.10, gapToleranceDeg:1, coincidenceDeg:2});
const TAU = 2 * Math.PI;
const EVENT_TOLERANCE = 1e-9;
const wrap = p => p - Math.floor(p);
const signed = p => p - Math.floor(p + 0.5);
const clamp = (n,low,high) => Math.max(low, Math.min(high,n));

function number(v,fallback) {
  return v == null || v === '' || !Number.isFinite(Number(v)) ? fallback : Number(v);
}

function configuration(input) {
  const seed = Math.trunc(number(input.seed,916)) >>> 0;
  let s = seed;
  const draw = () => {
    s = (Math.imul(s,1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
  // Only the two default launch phases use this seed. Explicit phases supersede them.
  const launchA = 0.07 + 0.08*draw(), launchB = launchA + 0.10 + 0.05*draw();
  return Object.freeze({seed,rateA:clamp(number(input.rateA,69),40,120),rateB:clamp(number(input.rateB,72),40,120),
    phaseA:wrap(number(input.phaseA,launchA)),phaseB:wrap(number(input.phaseB,launchB)),
    openA:input.openA !== false,openB:input.openB !== false,feedback:input.feedback === true,
    windowDeg:clamp(number(input.windowDeg,60),1,85),strengthBpm:clamp(number(input.strengthBpm,5),0,15)});
}

// For local gap z = pB-pA (mod one turn), inside capture z' = a - b sin(2πz).
// Set y = tan(πz). The 2x2 exponential for its Riccati equation gives the
// Möbius transform below, including the critical |a|=b limit.
function sineFlow(a,b) {
  const discriminant = b*b-a*a;
  const q = Math.sqrt(Math.abs(discriminant));
  function value(z0,dt) {
    const y = Math.tan(Math.PI*z0);
    let c = 1, s = Math.PI*dt;
    if (discriminant > 0) s = Math.tanh(Math.PI*q*dt)/q;
    if (discriminant < 0) {
      c = Math.cos(Math.PI*q*dt);
      s = Math.sin(Math.PI*q*dt)/q;
    }
    return Math.atan2((c-b*s)*y+a*s, c+b*s-a*s*y)/Math.PI;
  }
  function travel(z0,z1) {
    if (z0 === z1) return 0;
    const y0=Math.tan(Math.PI*z0), y1=Math.tan(Math.PI*z1);
    const ratio=(y1-y0)/(a*(1+y0*y1)-b*(y0+y1));
    if (discriminant > 0) return Math.atanh(clamp(q*ratio,-1,1))/(Math.PI*q);
    if (discriminant < 0) return Math.atan(q*ratio)/(Math.PI*q);
    return ratio/Math.PI;
  }
  return {value,travel};
}

function makePath(config,feedback) {
  const mean0=(config.phaseA+config.phaseB)/2, meanRate=(config.rateA+config.rateB)/120;
  const initialGap=config.phaseB-config.phaseA;
  const a=(config.rateB-config.rateA)/60, b=2*config.strengthBpm/60, w=config.windowDeg/360;
  const armed=feedback && config.openA && config.openB && b>0;
  const canLock=armed && Math.abs(a) <= b*Math.sin(TAU*w) + 2e-15;
  const fixed=canLock ? Math.asin(clamp(a/b,-1,1))/TAU : null;
  const flow=sineFlow(a,b);

  // Inside this band the sine is monotone. Its inverse gives the first time
  // both the gap and frequency tolerances hold; subsequent motion stays inside.
  function dwellEntry(z) {
    const gapTol=LOCK_RULE.gapToleranceDeg/360, rateTol=LOCK_RULE.frequencyToleranceBpm/60;
    const lo=Math.max(-w,fixed-gapTol,Math.asin(clamp((a-rateTol)/b,-1,1))/TAU);
    const hi=Math.min(w,fixed+gapTol,Math.asin(clamp((a+rateTol)/b,-1,1))/TAU);
    return flow.travel(z,clamp(z,lo,hi));
  }

  function free(start,raw) {
    if (!armed || a === 0) return {start,end:Infinity,raw,active:false};
    // Capture entry is the left boundary during positive drift and the right
    // boundary during negative drift. A completed outgoing edge is skipped.
    const center = a>0 ? Math.floor(raw+w+1e-14)+1 : Math.ceil(raw-w-1e-14)-1;
    const entry=-Math.sign(a)*w;
    return {start,end:start+(center+entry-raw)/a,raw,active:false,nextCenter:center,nextZ:entry};
  }
  function active(start,center,z) {
    if (canLock) return {start,end:Infinity,center,z,active:true,dwell:start+dwellEntry(z)};
    const exit=Math.sign(a)*w;
    const duration=flow.travel(z,exit);
    if (duration<=1e-13) return free(start,center+exit);
    return {start,end:start+duration,center,z,active:true,dwell:Infinity,nextRaw:center+exit};
  }

  const z0=signed(initialGap), n0=Math.round(initialGap-z0);
  const segments=[armed && Math.abs(z0)<=w+1e-15 ? active(0,n0,clamp(z0,-w,w)) : free(0,initialGap)];
  function segmentAt(t) {
    let last=segments[segments.length-1];
    while (t>=last.end) {
      last=last.active ? free(last.end,last.nextRaw) : active(last.end,last.nextCenter,last.nextZ);
      segments.push(last);
    }
    if (t>=last.start) return last;
    let l=0,h=segments.length-1;
    while(l<h) { const m=Math.ceil((l+h)/2); if(segments[m].start<=t) l=m; else h=m-1; }
    return segments[l];
  }
  function dynamics(t) {
    const segment=segmentAt(t), dt=t-segment.start;
    const z=t===0 ? z0 : segment.active ? flow.value(segment.z,dt) : signed(segment.raw+a*dt);
    const raw=segment.active ? segment.center+z : segment.raw+a*dt;
    const rateChange=segment.active ? config.strengthBpm*Math.sin(TAU*z) : 0;
    const mean=mean0+meanRate*t;
    return {pA:t===0 ? config.phaseA : mean-raw/2,pB:t===0 ? config.phaseB : mean+raw/2,
      z,bpmA:config.rateA+rateChange,bpmB:config.rateB-rateChange,segment};
  }
  function at(time) {
    const t=Math.max(0,number(time,0)), {pA,pB,z,bpmA,bpmB,segment}=dynamics(t);
    const gapDeg=360*z, absGapDeg=Math.abs(gapDeg), inWindow=absGapDeg<=config.windowDeg+1e-9;
    const lockSeconds=segment.active ? Math.max(0,t-segment.dwell) : 0;
    const locked=lockSeconds>=LOCK_RULE.dwellSeconds-1e-12;
    const frequencyMatched=Math.abs(bpmB-bpmA)<=LOCK_RULE.frequencyToleranceBpm+1e-12;
    const coincident=absGapDeg<=LOCK_RULE.coincidenceDeg;
    let status='free';
    if (armed && !segment.active) status='outside capture';
    if (segment.active) status=canLock ? 'settling' : 'passing through capture';
    if (locked) status='locked';
    return {t,phaseA:wrap(pA),phaseB:wrap(pB),bpmA,bpmB,gapDeg,absGapDeg,inWindow,eligible:segment.active,
      frequencyMatched,coincident,locked,lockSeconds,status};
  }
  return {dynamics,at,fixed};
}

function exactBeat(path,key,rateKey,integer,lower,upper) {
  // Both phases advance strictly, even at the largest permitted coupling.
  // Solve on unwrapped phase. Every integer crossing gets one timestamp.
  const toleranceCycles=2e-13*Math.max(1,integer/1000);
  let lo=lower, hi=upper, t=lo;
  for (let iteration=0;iteration<48;iteration++) {
    const state=path.dynamics(t), error=state[key]-integer;
    if (Math.abs(error)<toleranceCycles) return t;
    if (error<0) lo=t; else hi=t;
    if (hi-lo<2e-12) return (hi+lo)/2;
    const next=t-error*60/state[rateKey];
    t=next>lo && next<hi ? next : (lo+hi)/2;
  }
  return (lo+hi)/2;
}

function beatLedger(config,path) {
  let extent=0;
  const next={A:1,B:1}, events=[];
  function append(t,side) {
    const last=events[events.length-1];
    if (last && last.side!==side && Math.abs(t-last.t)<=EVENT_TOLERANCE) last.side='AB';
    else events.push({t,side});
  }
  if(config.phaseA===0) append(0,'A');
  if(config.phaseB===0) append(0,'B');
  function extend(t) {
    if(t<=extent) return;
    const end=path.dynamics(t), batch=[];
    for (const side of ['A','B']) {
      const key='p'+side, rateKey='bpm'+side;
      let lower=extent;
      for (;next[side]<=end[key]+1e-13;next[side]++) {
        const when=exactBeat(path,key,rateKey,next[side],lower,t);
        batch.push({t:when,side});
        lower=when;
      }
    }
    batch.sort((x,y)=>x.t-y.t || x.side.localeCompare(y.side));
    for(const event of batch) append(event.t,event.side);
    extent=t;
  }
  return {events,extend};
}

export function makeClock(input={},duration=240) {
  const config=configuration(input), path=makePath(config,config.feedback), baseline=makePath(config,false);
  const liveLedger=beatLedger(config,path), baseLedger=beatLedger(config,baseline);
  let extent=0;
  const clock={
    sourceVersion:LOOP_CLOCK_VERSION, config, at:path.at, baselineAt:baseline.at,
    equilibriumGapDeg:path.fixed===null ? null : 360*path.fixed,
    beats:liveLedger.events,baselineBeats:baseLedger.events,
    get duration() { return extent; },
    extendTo(value) {
      const t=Math.max(0,number(value,extent));
      if(t<=extent) return clock;
      liveLedger.extend(t); baseLedger.extend(t); extent=t;
      return clock;
    },
    receipt(t) {
      return {sourceVersion:LOOP_CLOCK_VERSION,config,clockUnit:'seconds',phaseGap:'B minus A, wrapped degrees',
        equilibriumGapDeg:clock.equilibriumGapDeg,lockRule:LOCK_RULE,model:path.at(t),closedBaseline:baseline.at(t)};
    }
  };
  return clock.extendTo(duration);
}
