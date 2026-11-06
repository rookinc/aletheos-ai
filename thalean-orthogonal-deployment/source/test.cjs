const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const base=__dirname+'/src/';
const M=require(base+'native-model.js'),Clock=require(base+'cycle-clock.js');
const sandbox={};vm.createContext(sandbox);vm.runInContext(fs.readFileSync(base+'app.js','utf8').split('(()=>{')[0]+';this.layout=OrthogonalLayout;',sandbox);const L=sandbox.layout;
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0),cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],norm=a=>Math.hypot(...a);
for(let axis=0;axis<3;axis++){
 const basis=[[1,0,0],[0,1,0],[0,0,1]].map(v=>L.point(v,axis));
 assert.equal(dot(basis[0],cross(basis[1],basis[2])),1,'proper rotation');
 assert.deepEqual(Array.from(L.point([0,1,0],axis)),Array.from(L.normal(axis)),'native normal maps to intended physical axis');
 for(let j=0;j<3;j++)assert.equal(dot(L.normal(axis),L.normal(j)),+(axis===j),'mutually orthogonal normals');
 for(let c=0;c<450;c+=17)for(let k=0;k<20;k++)for(const merge of [0,50,100]){
  const path=M.path(c,k,merge);for(const p of path.points)assert.ok(Math.abs(norm(p)-norm(L.point(p,axis)))<1e-12);
  const a=M.at(path,0).point,b=M.at(path,1).point,first=M.splitPoint(c,k,undefined,merge),last=M.splitPoint(c,k+1,undefined,merge);
  assert.ok(norm(a.map((v,i)=>v-first[i]))<1e-10);assert.ok(norm(b.map((v,i)=>v-last[i]))<1e-10);
 }
}
const data=JSON.parse(fs.readFileSync(base+'native-data.json','utf8')),sim=new M.Experiment(data);
assert.equal(sim.g.n,9000);assert.equal(sim.g.edges.length,45000);assert.equal(data.cycles.length,450);
const initial=Array.from(sim.closed.x);for(let i=0;i<20;i++)sim.closed.transport();assert.deepEqual(Array.from(sim.closed.x),initial,'F^20 returns exact state');
for(let i=0;i<200;i++)sim.step();assert.ok(Number.isFinite(sim.closed.metrics().rms));assert.ok(Math.abs(sim.closed.metrics().total-9000)<1e-7,'conserved total');
const clock=new Clock(.05,0);let steps=0;clock.advance(20000,()=>steps++);assert.equal(steps,20);clock.setRunning(false,20000);clock.advance(30000,()=>steps++);assert.equal(steps,20);
const provenance=JSON.parse(fs.readFileSync(__dirname+'/source-provenance.json'));for(const[name,sha]of Object.entries(provenance.preserved_sha256))assert.equal(require('crypto').createHash('sha256').update(fs.readFileSync(base+name)).digest('hex'),sha,name+' preserved exactly');
console.log('PASS: native incidence and F^20; three orthogonal proper rotations; preserved distances and path endpoints at 0/50/100% merge; original engine unchanged; finite PID and conserved total; clock pause.');
