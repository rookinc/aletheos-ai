const assert=require('assert/strict'),fs=require('fs'),vm=require('vm');
const V=require('./src/inverse-volume.js'),M=require('./src/native-model.js');
const sandbox={};vm.createContext(sandbox);vm.runInContext(fs.readFileSync(__dirname+'/src/app.js','utf8').split('(()=>{')[0]+';this.L=OrthogonalLayout;',sandbox);const L=sandbox.L;
assert.equal(V.distance2([0,2,0],[-1,0,0],[1,0,0]),4);
assert.equal(V.distance2([3,0,0],[-1,0,0],[1,0,0]),4);
assert.equal(V.distance2([1,2,2],[0,0,0],[0,0,0]),9);
// Independent brute-force rotated segments, including a zero-length segment.
const small=[[{points:[[-.6,-.2,.11],[.4,.37,-.27],[.2,-.1,.4]]},{points:[[.2,-.1,.4],[.2,-.1,.4]]}]];
const grid=new V(11).build(small,.19);
for(let i=0;i<grid.n;i++)for(let j=0;j<grid.n;j++)for(let k=0;k<grid.n;k++){
 const p=[i,j,k].map(v=>-grid.half+(v+.5)*grid.step);
 const expected=[0,1,2].every(axis=>small.some(c=>c.some(path=>path.points.slice(1).some((b,s)=>V.distance2(p,L.point(path.points[s],axis),L.point(b,axis))<=.19**2))));
 assert.equal(Boolean(grid.mask[(i*grid.n+j)*grid.n+k]),expected,'accelerated field must equal independent three-axis segment test');
}
assert.equal(new V(10).build([[{points:[[2,2,2],[3,3,3]]}]],.1).count,0,'no synthetic overlap');
assert.throws(()=>new V().build(small,NaN));
const paths=merge=>Array.from({length:450},(_,c)=>Array.from({length:20},(_,k)=>M.path(c,k,merge)));
const p=paths(0),v=new V().build(p,.05),tight=new V().build(p,.025),wide=new V().build(p,.08);
assert.equal(v.count,1592,'native split-chart regression');assert.ok(tight.count<v.count&&v.count<wide.count);
for(const c of tight.cells)assert.equal(v.mask[c.id],1);for(const c of v.cells)assert.equal(wide.mask[c.id],1);
assert.ok(v.cells.every(c=>Math.hypot(...c.point)>.2),'no invented contact at origin');
assert.ok(v.faces.length>0&&v.faces.every(f=>f.points.flat().every(Number.isFinite)));
assert.ok(Math.abs(v.volume-v.count*(1/50)**3)<1e-12);
assert.equal(new V().build(paths(100),.05).count,0,'joined toroidal paths have no shared samples at default tolerance');
console.log(`PASS: exact segment distance; independent rotated brute-force grid; real overlap and empty states; monotone tolerance; finite boundary mesh. Default ${v.count} cells, ${v.volume.toFixed(5)} chart³.`);
