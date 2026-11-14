'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('assert/strict');
const E=require('../src/encounter-model.js'),N=require('../src/native-model.js'),H=require('../src/paired-history.js'),I=require('../src/inverse-volume.js');
function verify(r){
 assert.equal(r.schema,'orthogonal-encounter-replay-1');const m=new E.Model(require('../src/native-data.json'),require('../src/paired-history-data.json'),N,H);
 if(r.couplingEvents!==undefined)assert.equal(r.couplingEvents,0);
 if(r.evidence?.baseline?.input_provenance){const p=r.evidence.baseline.input_provenance;for(const [file,key]of [['native-data.json','native_data_sha256'],['paired-history-data.json','paired_history_sha256']])assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,'../src',file))).digest('hex'),p[key]);}
 const checkScan=s=>{const actual=s.config.kind==='envelope'?m.envelope(s.config,I,s.candidates[0]?.cellIndex??0):m.scan(s.config);assert.deepEqual(actual,s);};
 if(r.scan)checkScan(r.scan);
 const records=r.observations??[];assert(Array.isArray(records)&&records.length<=100);
 for(const [i,rec]of records.entries()){assert.equal(rec.schema,'orthogonal-observation-1');assert.equal(rec.sequence,i+1);assert.equal(rec.role,'Read-only observation; dynamically ineffective');const c=rec.context;assert.deepEqual(m.monitor(c.selected,c.steps,c.planes[c.copy].offset).current,rec.state);assert.deepEqual(m.tuple(m.next(rec.state.state)),rec.next);if(rec.candidate){assert(rec.candidate.scanConfig&&rec.candidate.selected,'Candidate requires captured scan context');const s=rec.candidate.scanConfig,sel=rec.candidate.selected;const actual=s.kind==='envelope'?m.envelope(s,I,sel.cellIndex):m.scan(s);assert(actual.candidates.some(x=>JSON.stringify(x)===JSON.stringify(sel)));}}
 if(r.memory){const n=Number(r.memory.operator.slice(2));assert.deepEqual(m.continuePair(...r.memory.before.map(x=>x.state),n),r.memory);}
 return {pass:true,observations:(r.observations??[]).length,scanReplayed:!!r.scan,continuationReplayed:!!r.memory,couplingEvents:0};
}
if(require.main===module){if(!process.argv[2])throw Error('Usage: node scripts/replay-encounter.cjs REPLAY.json');console.log(JSON.stringify(verify(JSON.parse(fs.readFileSync(process.argv[2])))));}
module.exports={verify};
