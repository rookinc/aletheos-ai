const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),M=require('./model');
const bundle=JSON.parse(fs.readFileSync('hydrogen-data.json')),transport=M.native(JSON.parse(fs.readFileSync('transport.json')));
const scope=vm.createContext({});vm.runInContext(fs.readFileSync('hydrogen-engine.js','utf8')+'\n'+fs.readFileSync('hydrogen-bridge.js','utf8')+'\nthis.bridge=HydrogenBridge;',scope);
const h=scope.bridge.create(bundle,transport),e=h.engine;
assert.deepEqual(transport.K,bundle.native.turns.a);
const edges=new Set();for(let j=0;j<45000;j++){const a=e.graph.edges[2*j],b=e.graph.edges[2*j+1];edges.add(Math.min(a,b)+','+Math.max(a,b));}assert.equal(edges.size,45000);
let fEdges=0,potentialMismatch=0;for(let i=0;i<9000;i++){assert.equal(transport.cycles[h.route[i]][h.step[i]],i);const b=transport.F[i];assert(edges.has(Math.min(i,b)+','+Math.max(i,b)));fEdges++;if(e.distance[i]!==e.distance[b])potentialMismatch++;}
assert.equal(potentialMismatch,6600);
const report={source:bundle.provenance,states:9000,edges:edges.size,KMatches:1800,FEdges:fEdges,attractionMismatchUnderF:potentialMismatch,presets:[],cases:0,maxNormError:0,maxEnergyError:0,maxContinuityResidual:0,maxStationaryDensityChange:0,maxStationaryCurrent:0,maxPeriodDensityChange:0};
for(const g of [0,1,4]){
 e.prepare(g);const residuals=[];
 for(let j=0;j<2;j++){const v=e.preset.vectors[j],out=new Float64Array(9000);e.applyH(v,out);const residual=Math.hypot(...out.map((a,i)=>a-e.preset.energies[j]*v[i]));assert(residual<1e-10);residuals.push(residual);}
 report.presets.push({g,energies:e.preset.energies,eigenResiduals:residuals});
 for(const mode of ['ground','excited','coherent'])for(const phase of [0,90,237]){
  e.mode=mode;e.mix=35;e.phase=phase;e.seek(0);const before=Array.from(e.prob);
  for(const t of [0,.17*e.period,.5*e.period,e.period,1000]){
   e.seek(t);report.cases++;const m=e.metrics;
   for(const [key,field]of [['maxNormError','normError'],['maxEnergyError','energyError'],['maxContinuityResidual','continuityResidual']]){report[key]=Math.max(report[key],m[field]);assert(m[field]<1e-10);}
   if(mode!=='coherent'){report.maxStationaryCurrent=Math.max(report.maxStationaryCurrent,m.maxEdgeCurrent);report.maxStationaryDensityChange=Math.max(report.maxStationaryDensityChange,...e.prob.map((v,i)=>Math.abs(v-before[i])));assert(m.maxEdgeCurrent<1e-12);}
   if(t===e.period)report.maxPeriodDensityChange=Math.max(report.maxPeriodDensityChange,...e.prob.map((v,i)=>Math.abs(v-before[i])));
  }
 }
 const currentSnapshot=Array.from(e.prob);for(const depth of [0,.8])for(let id=0;id<9000;id++){const xyz=M.xyzFlowerPoint(h.route[id],h.step[id],transport.cycles,depth);assert(xyz.every(Number.isFinite));}assert.deepEqual(Array.from(e.prob),currentSnapshot);
}
assert(report.maxStationaryDensityChange<1e-12);assert(report.maxPeriodDensityChange<1e-12);
report.passed=true;fs.writeFileSync('hydrogen-verification.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
