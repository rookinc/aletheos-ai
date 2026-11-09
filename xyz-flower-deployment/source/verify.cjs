process.chdir(__dirname);
const assert=require('node:assert/strict'),fs=require('node:fs'),M=require('./model.js');
const t=JSON.parse(fs.readFileSync('transport.json')),d=JSON.parse(fs.readFileSync('pilot-data.json'));
const n=M.native(t),p=M.verify(d);
assert.equal(n.cycles.length,450);assert.equal(new Set(n.cycles.flat()).size,9000);
assert.deepEqual(n.cycles[0],[0,2280,4088,5408,7200,480,2288,3608,5400,7680,488,1808,3600,5880,7688,8,1800,4080,5888,7208]);
for(const c of n.cycles)for(let i=0;i<20;i++)assert.equal(n.F[c[i]],c[(i+1)%20]);
assert.equal(new Set(n.F).size,9000);assert.equal(p.residual,0);assert(p.roundtrip<1e-12);
const LC=M.lap(8,[...d.ring,...d.partners]),lam=[0,2,2,2,4,4,4,6];
for(let j=0;j<8;j++){let x=d.H.map(r=>r[j]);assert.deepEqual(M.mul(LC,x),x.map(v=>v*lam[j]));}
// A general signal must survive the actual shipped P/Q round trip.
let signal=[.3,-.7,.11,2,-1.1,.2,4,-2],round=M.mul(d.Q,M.mul(d.P,signal));
assert(Math.max(...round.map((v,i)=>Math.abs(v-signal[i])))<1e-12);
const html=fs.readFileSync('dist/index.html','utf8');assert(!html.includes('/*APP*/'));assert(!/\bsrc="https?:/i.test(html));assert(!/@import/.test(html));
const centers=M.flowerCenters();assert.equal(centers.length,19);assert.equal(new Set(centers.map(p=>p.join(','))).size,19);
assert(Math.hypot(...centers[0])<1e-12);
assert.equal(centers.filter(p=>Math.hypot(...p)<.43).length,7);
for(let i=0;i<19;i++){const near=Math.min(...centers.filter((_,j)=>i!==j).map(p=>Math.hypot(p[0]-centers[i][0],p[1]-centers[i][1])));assert(Math.abs(near-.42)<1e-12);}
for(let c=0;c<450;c++)for(const depth of [0,.8])for(const t of [0,.37,4.7,19.99]){const a=M.flowerPoint(c,t,n.cycles,depth),b=M.flowerPoint(c,t+20,n.cycles,depth),o=centers[c%19];assert(Math.hypot(...a.map((v,i)=>v-b[i]))<1e-12);assert(Math.abs(Math.hypot(a[0]-o[0],a[1]-o[1])-.42)<1e-12);}
console.log('Flower: 19 equal-radius circles, triangular spacing, and all 450 routes close after 20 steps at flat and lifted depth.');
console.log(JSON.stringify({routes:450,states:9000,period:20,firstRouteMatchesExplorer:true,laplacianResidual:p.residual,roundTripResidual:p.roundtrip,walshModes:8,selfContained:true}));

// XYZ is an isometric re-embedding; it must preserve route identity and closure.
const counts=[0,0,0];
for(let c=0;c<450;c++){
  const plane=c%3;counts[plane]++;
  for(const depth of [0,.8])for(const time of [0,.37,4.7,19.99]){
    const a=M.xyzFlowerPoint(c,time,n.cycles,depth),b=M.xyzFlowerPoint(c,time+20,n.cycles,depth);
    const flat=M.flowerPoint(c,time,n.cycles,depth);
    assert(Math.hypot(...a.map((v,i)=>v-b[i]))<1e-12);
    assert(Math.abs(Math.hypot(...a)-Math.hypot(...flat))<1e-12);
    if(depth===0)assert(Math.abs(a[[2,1,0][plane]])<1e-12);
  }
}
assert.deepEqual(counts,[150,150,150]);
for(let plane=0;plane<3;plane++){
  let a=M.planePoint([.2,-.3,.4],plane),b=M.planePoint([-.7,.9,.1],plane);
  assert(Math.abs(Math.hypot(...a.map((v,i)=>v-b[i]))-Math.hypot(.9,-1.2,.3))<1e-12);
}
console.log('XYZ: 150 distinct routes per plane; distances, fixed-plane constraints and 20-step closure verified.');
