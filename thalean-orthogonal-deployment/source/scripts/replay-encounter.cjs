'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('assert/strict');
const E=require('../src/encounter-model.js'),N=require('../src/native-model.js'),H=require('../src/paired-history.js'),I=require('../src/inverse-volume.js');
function verify(r){
 const geometryTolerance=1e-12;let geometryMaxDelta=0;
 // Native labels, counts, configuration and predicates stay exact. Only
 // display geometry uses a declared absolute tolerance across JS engines.
 function compare(a,b,p=''){
  if(typeof a==='number'&&typeof b==='number'&&/(?:^|\.)(distance|spatialDistance|d2|segmentFraction|volume)$|(?:^|\.)point\.\d+$/.test(p)){
   assert(Number.isFinite(a)&&Number.isFinite(b),'Nonfinite geometry at '+p);const delta=Math.abs(a-b);geometryMaxDelta=Math.max(geometryMaxDelta,delta);assert(delta<=geometryTolerance,'Geometry mismatch at '+p);return;
  }
  if(Array.isArray(a)){
   assert(Array.isArray(b),'Expected array at '+p);assert.equal(a.length,b.length,'Array length at '+p);
   if(p==='candidates'){
    for(const items of [a,b])for(let i=1;i<items.length;i++)assert(items[i-1].distance<=items[i].distance+geometryTolerance,'Candidate order mismatch');
    a=a.slice().sort((x,y)=>x.id.localeCompare(y.id));b=b.slice().sort((x,y)=>x.id.localeCompare(y.id));
   }
   a.forEach((x,i)=>compare(x,b[i],p+'.'+i));return;
  }
  if(a&&typeof a==='object'){
   assert(b&&typeof b==='object'&&!Array.isArray(b),'Expected object at '+p);assert.deepEqual(Object.keys(a).sort(),Object.keys(b).sort(),'Object keys at '+p);
   for(const key of Object.keys(a))compare(a[key],b[key],p?p+'.'+key:key);return;
  }
  assert.equal(a,b,'Exact mismatch at '+p);
 }
 assert.equal(r.schema,'orthogonal-encounter-replay-1');const m=new E.Model(require('../src/native-data.json'),require('../src/paired-history-data.json'),N,H);
 if(r.couplingEvents!==undefined)assert.equal(r.couplingEvents,0);
 if(r.evidence?.baseline?.input_provenance){const p=r.evidence.baseline.input_provenance;for(const [file,key]of [['native-data.json','native_data_sha256'],['paired-history-data.json','paired_history_sha256']])assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,'../src',file))).digest('hex'),p[key]);}
 const checkScan=s=>{const actual=s.config.kind==='envelope'?m.envelope(s.config,I,s.candidates[0]?.cellIndex??0):m.scan(s.config);compare(actual,s);};
 if(r.scan)checkScan(r.scan);
 const records=r.observations??[];assert(Array.isArray(records)&&records.length<=100);
 for(const [i,rec]of records.entries()){assert.equal(rec.schema,'orthogonal-observation-1');assert.equal(rec.sequence,i+1);assert.equal(rec.role,'Read-only observation; dynamically ineffective');const c=rec.context;assert.deepEqual(m.monitor(c.selected,c.steps,c.planes[c.copy].offset).current,rec.state);assert.deepEqual(m.tuple(m.next(rec.state.state)),rec.next);if(rec.candidate){assert(rec.candidate.scanConfig&&rec.candidate.selected,'Candidate requires captured scan context');const s=rec.candidate.scanConfig,sel=rec.candidate.selected;const actual=s.kind==='envelope'?m.envelope(s,I,sel.cellIndex):m.scan(s);const found=actual.candidates.find(x=>x.id===sel.id);assert(found,'Recorded candidate not retained in replay');compare(found,sel);}}
 if(r.memory){const n=Number(r.memory.operator.slice(2));assert.deepEqual(m.continuePair(...r.memory.before.map(x=>x.state),n),r.memory);}
 return {pass:true,observations:(r.observations??[]).length,scanReplayed:!!r.scan,continuationReplayed:!!r.memory,couplingEvents:0,geometryTolerance,geometryMaxDelta};
}
if(require.main===module){try{if(!process.argv[2])throw Error('Usage: node scripts/replay-encounter.cjs REPLAY.json');console.log(JSON.stringify(verify(JSON.parse(fs.readFileSync(process.argv[2])))));}catch(e){console.error('Replay rejected: '+e.message);process.exitCode=1;}}
module.exports={verify};
