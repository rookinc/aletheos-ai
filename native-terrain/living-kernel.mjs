/** SIM-003 experimental memory kernel. No renderer, browser clock, or topology mutation.
 * A and B share a counter-based random sample at each encounter. Both retain
 * diagnostic histories; A has zero feedback and B has optional feedback.
 * h(v) = sum over the latest D encounters of retention^age * activity(v).
 * Parameters are recorded at every encounter. Changing retention reweights the
 * retained window; changing depth cannot recover events already discarded.
 */
export const KERNEL_VERSION = 'aletheos.living-memory.v1';
export const MAX_REPLAY_ENCOUNTERS = 10000;
export const DEFAULT_CONFIG = Object.freeze({seed:52002,initialQ:0,initialEdge:0,memoryEnabled:true,memoryStrength:2,retention:.98,historyDepth:256,feedbackGain:1,tracePersistence:100});
const copy = value => JSON.parse(JSON.stringify(value));
const sum = values => values.reduce((a,b)=>a+b,0);
const geometryKeys = new WeakMap();

/** Accidental-source-mismatch check, not a cryptographic authenticity claim.
 * The application receipt additionally binds the admitted source SHA-256s.
 */
export function geometryIdentity(geometry){
  if(geometryKeys.has(geometry))return geometryKeys.get(geometry);
  const text=JSON.stringify({adj:geometry.quotient.adj,map:geometry.quotient.map,edges:geometry.directedEdges,successor:geometry.successor});
  let a=2166136261,b=0x9e3779b9;
  for(let i=0;i<text.length;i++){a=Math.imul(a^text.charCodeAt(i),16777619);b=Math.imul(b^text.charCodeAt(i),0x85ebca6b);}
  const key=Object.freeze({schema:'aletheos.topology-identity.v1',algorithm:'dual-32-bit-checksum-not-cryptographic',checksum:[a,b].map(x=>(x>>>0).toString(16).padStart(8,'0')).join(''),quotientStates:geometry.quotient.n,directedEdges:geometry.directedEdges.length});
  geometryKeys.set(geometry,key);return key;
}

export function normalizeConfig(config={},geometry) {
  if(config===null||typeof config!=='object'||Array.isArray(config))throw Error('Configuration must be an object');
  const c={...DEFAULT_CONFIG,...config};
  for(const key of ['memoryStrength','retention','feedbackGain','historyDepth','tracePersistence','initialQ','initialEdge'])if(!Number.isFinite(c[key]))throw Error(`Invalid ${key}`);
  if(c.retention<0||c.retention>1)throw Error('retention must be in [0,1]');
  if(Math.abs(c.memoryStrength)>20||c.feedbackGain<0||c.feedbackGain>20)throw Error('Feedback parameter outside supported range');
  for(const key of ['historyDepth','tracePersistence'])if(!Number.isInteger(c[key])||c[key]<1||c[key]>10000)throw Error(`${key} must be an integer in [1,10000]`);
  if(typeof c.memoryEnabled!=='boolean')throw Error('memoryEnabled must be boolean');
  if(!['string','number'].includes(typeof c.seed)||!String(c.seed).length||String(c.seed).length>256||(typeof c.seed==='number'&&!Number.isFinite(c.seed)))throw Error('Invalid seed');
  if(geometry){
    if(!Number.isInteger(c.initialQ)||c.initialQ<0||c.initialQ>=geometry.quotient.n)throw Error('Invalid initial quotient state');
    if(!Number.isInteger(c.initialEdge)||c.initialEdge<0||c.initialEdge>=geometry.directedEdges.length)throw Error('Invalid initial directed edge');
  }
  return Object.fromEntries(Object.keys(DEFAULT_CONFIG).map(k=>[k,c[k]]));
}

/** Pure sample keyed by seed and tick, independent of evaluation/call order. */
export function randomAt(seed,tick){
  if(!Number.isSafeInteger(tick)||tick<0)throw Error('Invalid encounter index');
  let h=2166136261;
  for(const ch of String(seed)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619);}
  h=(h+Math.imul((tick+1)>>>0,0x9e3779b9))>>>0;
  h=Math.imul(h^(h>>>16),0x21f0aaad);h=Math.imul(h^(h>>>15),0x735a2d97);
  return ((h^(h>>>15))>>>0)/4294967296;
}

export function transitionProbabilities(adj,q,history,alpha=0){
  if(!Array.isArray(adj[q])||!adj[q].length)throw Error('No admissible graph transition');
  const neighbors=[...adj[q]].sort((a,b)=>a-b);
  const scores=neighbors.map(u=>alpha*(history[u]-history[q]));
  if(!scores.every(Number.isFinite))throw Error('Non-finite transition score');
  const max=Math.max(...scores),weights=scores.map(w=>Math.exp(w-max)),total=sum(weights);
  return neighbors.map((q,i)=>({q,probability:weights[i]/total}));
}

export function chooseTransition(adj,q,history,alpha,sample){
  if(!Number.isFinite(sample)||sample<0||sample>=1)throw Error('Random sample must be in [0,1)');
  const probabilities=transitionProbabilities(adj,q,history,alpha);
  let cumulative=0;
  for(const entry of probabilities){cumulative+=entry.probability;if(sample<cumulative)return entry.q;}
  return probabilities.at(-1).q; // rounding only; still an admitted neighbor
}

function field(run,config,n){
  if(run.events.length>config.historyDepth)run.events.splice(0,run.events.length-config.historyDepth);
  run.history=Array(n).fill(0);
  let weight=1;
  for(let i=run.events.length-1;i>=0;i--){run.history[run.events[i]]+=weight;weight*=config.retention;}
}
function initialRun(q,n,enabled){const visits=Array(n).fill(0);visits[q]=1;return {q,previousQ:q,history:Array(n).fill(0),events:[],path:[q],visits,encounters:0,memoryEnabled:enabled};}
function refreshMetrics(exp){
  const {A,B,tick,config}=exp,n=exp.geometry.quotient.n;
  const differing=exp.divergence.count,first=exp.divergence.first;
  const total=Math.max(1,tick+1),densityDifference=A.visits.reduce((v,x,i)=>v+Math.abs(x-B.visits[i])/total,0)/2;
  exp.metrics={stateDivergence:Number(A.q!==B.q),pathDivergence:differing,pathDivergenceFraction:differing/total,firstDivergence:first,memoryMagnitude:sum(B.history),memoryMagnitudeA:sum(A.history),densityDifference,returnErrorA:Number(A.q!==config.initialQ),returnErrorB:Number(B.q!==config.initialQ),nativeWalkerReturned:exp.walker===config.initialEdge,registeredClock:tick%20,encounters:tick,occupiedA:A.visits.filter(Boolean).length,occupiedB:B.visits.filter(Boolean).length,localDensityA:A.visits[A.q]/total,localDensityB:B.visits[B.q]/total,fieldDivergence:A.history.reduce((v,x,i)=>v+Math.abs(x-B.history[i]),0)/n};
}

export function createExperiment(geometry,config={}){
  if(!geometry?.quotient?.n||!geometry?.successor?.length)throw Error('Native geometry required');
  const c=normalizeConfig(config,geometry);
  const exp={version:KERNEL_VERSION,geometry,source:geometryIdentity(geometry),config:c,initialConfig:copy(c),tick:0,walker:c.initialEdge,previousWalker:c.initialEdge,A:initialRun(c.initialQ,geometry.quotient.n,false),B:initialRun(c.initialQ,geometry.quotient.n,c.memoryEnabled),timeline:[],historyResets:[],divergence:{count:0,first:null},metrics:{}};
  refreshMetrics(exp);return exp;
}

export function stepExperiment(exp){
  const c=normalizeConfig(exp.config,exp.geometry);
  if(c.seed!==exp.initialConfig.seed||c.initialQ!==exp.initialConfig.initialQ||c.initialEdge!==exp.initialConfig.initialEdge)throw Error('Restart after changing seed or initial state');
  exp.config=c;
  const sample=randomAt(c.seed,exp.tick),before={A:exp.A.q,B:exp.B.q,walker:exp.walker};
  for(const [name,run] of [['A',exp.A],['B',exp.B]]){
    field(run,c,exp.geometry.quotient.n);
    const alpha=name==='B'&&c.memoryEnabled?c.memoryStrength*c.feedbackGain:0;
    run.previousQ=run.q;
    run.q=chooseTransition(exp.geometry.quotient.adj,run.q,run.history,alpha,sample);
    run.memoryEnabled=name==='B'&&c.memoryEnabled;
    run.events.push(run.q);run.path.push(run.q);run.visits[run.q]++;run.encounters++;
    field(run,c,exp.geometry.quotient.n);
  }
  exp.previousWalker=exp.walker;exp.walker=exp.geometry.successor[exp.walker];exp.tick++;
  if(exp.A.q!==exp.B.q){exp.divergence.count++;if(exp.divergence.first===null)exp.divergence.first=exp.tick;}
  refreshMetrics(exp);
  exp.timeline.push({tick:exp.tick,before,after:{A:exp.A.q,B:exp.B.q,walker:exp.walker},sample,config:copy(c),metrics:copy(exp.metrics)});
  return exp;
}

export function resetHistory(exp){
  for(const run of [exp.A,exp.B]){run.events=[];run.history.fill(0);}
  if(!exp.historyResets.includes(exp.tick))exp.historyResets.push(exp.tick);
  refreshMetrics(exp);return exp;
}

function install(target,source){for(const key of Object.keys(target))delete target[key];Object.assign(target,source);return target;}
export function resetExperiment(exp,config=exp.config){return install(exp,createExperiment(exp.geometry,config));}
export function replayExperiment(exp,ticks){
  if(!Number.isSafeInteger(ticks)||ticks<0||ticks>MAX_REPLAY_ENCOUNTERS)throw Error(`Replay requires 0–${MAX_REPLAY_ENCOUNTERS} encounters`);
  const next=createExperiment(exp.geometry,exp.config);for(let i=0;i<ticks;i++)stepExperiment(next);return install(exp,next);
}

function reconstruct(geometry,initialConfig,rows,resets,finalConfig){
  const exp=createExperiment(geometry,initialConfig),resetSet=new Set(resets);
  if(resetSet.has(0))resetHistory(exp);
  for(const row of rows){exp.config=normalizeConfig(row.config,geometry);stepExperiment(exp);if(resetSet.has(exp.tick))resetHistory(exp);}
  if(finalConfig)exp.config=normalizeConfig(finalConfig,geometry);
  refreshMetrics(exp);return exp;
}

export function reverseExperiment(exp){
  if(exp.tick===0)return exp;
  const rows=exp.timeline.slice(0,-1),resets=exp.historyResets.filter(t=>t<exp.tick);
  const finalConfig=rows.at(-1)?.config??exp.initialConfig;
  return install(exp,reconstruct(exp.geometry,exp.initialConfig,rows,resets,finalConfig));
}

export function exportConfiguration(exp){return {schema:'aletheos.living-config.v1',kernel:KERNEL_VERSION,source:copy(exp.source),config:copy(exp.config),initialConfig:copy(exp.initialConfig),classification:'experimental',rule:'Counter-seeded common samples; stable softmax of alpha*(h(u)-h(v)) on sorted quotient adjacency. A alpha=0; B alpha=strength*gain when enabled. Finite-depth exponential visit history.'};}
export function exportSnapshot(exp){
  return {schema:'aletheos.living-snapshot.v1',kernel:KERNEL_VERSION,source:copy(exp.source),initialConfig:copy(exp.initialConfig),config:copy(exp.config),historyResets:copy(exp.historyResets),timeline:copy(exp.timeline),state:{tick:exp.tick,walker:exp.walker,previousWalker:exp.previousWalker,A:copy(exp.A),B:copy(exp.B),metrics:copy(exp.metrics)}};
}
export function restoreExperiment(geometry,payload){
  if(!['aletheos.living-config.v1','aletheos.living-snapshot.v1'].includes(payload?.schema)||payload.kernel!==KERNEL_VERSION)throw Error('Unsupported experiment snapshot');
  if(JSON.stringify(payload.source)!==JSON.stringify(geometryIdentity(geometry)))throw Error('Snapshot topology identity differs from loaded geometry');
  if(payload.schema==='aletheos.living-config.v1')return createExperiment(geometry,payload.config);
  if(!Array.isArray(payload.timeline)||payload.timeline.length>MAX_REPLAY_ENCOUNTERS||!Array.isArray(payload.historyResets))throw Error('Invalid or oversized replay log');
  if(!payload.historyResets.every((t,i)=>Number.isInteger(t)&&t>=0&&t<=payload.timeline.length&&(i===0||t>payload.historyResets[i-1])))throw Error('Invalid history reset');
  if(!payload.timeline.every((row,i)=>row?.tick===i+1&&row.config&&typeof row.config==='object'))throw Error('Invalid encounter sequence');
  const exp=reconstruct(geometry,payload.initialConfig,payload.timeline,payload.historyResets,payload.config);
  const expected=exportSnapshot(exp);
  if(JSON.stringify(expected.state)!==JSON.stringify(payload.state)||JSON.stringify(expected.timeline)!==JSON.stringify(payload.timeline))throw Error('Snapshot does not match deterministic replay');
  return exp;
}
export function exportReceipt(exp){
  const snapshot=exportSnapshot(exp);
  return {schema:'aletheos.living-comparison-receipt.v1',kernel:KERNEL_VERSION,source:copy(exp.source),classification:{walker:'native unique-triangle successor',quotient:'derived diagonal V4 Cartesian-product adjacency',memory:'experimental softmax feedback'},configuration:exportConfiguration(exp),comparison:{onlyDynamicalDifference:'A feedback coefficient 0; B enabled ? memoryStrength*feedbackGain : 0',sharedRandomSamples:true,metrics:copy(exp.metrics),allTransitionsAdmissible:[exp.A,exp.B].every(run=>run.path.slice(1).every((q,i)=>exp.geometry.quotient.adj[run.path[i]].includes(q))),nativeWalkerPeriod:3,nativeRegisteredReturn:'Use separately verified G1800/G9000 transport; tick modulo twenty is only a display clock.'},snapshot};
}
