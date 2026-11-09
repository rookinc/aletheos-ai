const assert=require('node:assert/strict'),fs=require('node:fs'),M=require('./model.js'),W=require('./swarm-model.js');
const native=M.native(JSON.parse(fs.readFileSync('transport.json')));let configurations=0,maxClosure=0;
for(const stagger of [false,true])for(const depth of [0,.8])for(let r=0;r<450;r++)for(const t of [0,.25,1,9.5,19,19.75]){
 const a=W.sample(r,t,native,depth,M,stagger),b=W.sample(r,t+20,native,depth,M,stagger),next=W.sample(r,t+1,native,depth,M,stagger);
 assert.equal(native.F[a.id],next.id);assert.equal(a.id,b.id);
 for(let i=0;i<3;i++){
  assert.deepEqual(a.points[i],M.planePoint(M.flowerPoint(r,a.phase,native.cycles,depth),i));
  for(let j=0;j<3;j++)maxClosure=Math.max(maxClosure,Math.abs(a.points[i][j]-b.points[i][j]));
 }
 configurations++;
}
for(const stagger of [false,true])for(let k=0;k<20;k++)assert.equal(new Set(Array.from({length:450},(_,r)=>W.sample(r,k,native,.8,M,stagger).id)).size,450);
assert.ok(maxClosure<1e-12);
const report={passed:true,routes:450,triangles:450,corners:1350,configurations,maxClosure,distinctStatesAtEveryStep:450,scope:'Each triangle is three drawing copies of one native state; connecting edges are geometric.'};fs.writeFileSync('swarm-verification.json',JSON.stringify(report,null,2)+'\n');console.log(report);
