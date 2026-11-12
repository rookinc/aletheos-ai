const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const G=require('../../public_html/observatories/g9000/flower-geometry.js');
const original=G.source.native(require('../../public_html/observatories/g9000/native/kalachakra-transport.json'));
const context={window:{}};vm.runInNewContext(fs.readFileSync(require.resolve('../../public_html/observatories/g9000/native-model.js'),'utf8'),context);
const D=JSON.parse(JSON.stringify(context.window.NATIVE_MODEL));
const near=(a,b,tol=1e-10)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
const vector=(a,b)=>a.forEach((x,i)=>near(x,b[i]));
test('Original Kalachakra and current G9000 have identical K and all 450 ordered F cycles',()=>{
 assert.deepEqual(D.turn,original.K);assert.deepEqual(D.cycles,original.cycles);
 assert.equal(new Set(D.cycles.flat()).size,9000);
});
test('Unwrapped flower exactly recovers every source route in all three planes',()=>{
 for(let c=0;c<450;c++)for(const t of [0,.25,4.5,9.9,19.75,20])for(let plane=0;plane<3;plane++){
  const source=G.source.planePoint(G.source.flowerPoint(c,t,D.cycles,.32),plane);
  vector(G.at(c,t,D.cycles,.32,plane,0),source);
 }
});
test('Every native state and all three copies lie on the correct frame-depth sphere',()=>{
 for(const depth of [0,.32,1])for(let c=0;c<450;c++)for(let t=0;t<20;t++){
  const radius=1+(Math.floor(D.cycles[c][t]/1800)-2)*.26*depth;
  for(let plane=0;plane<3;plane++)near(Math.hypot(...G.at(c,t,D.cycles,depth,plane)),radius);
 }
});
test('Continuous flower motion closes after 20 steps and stays finite across F boundaries',()=>{
 for(let c=0;c<450;c++)for(let plane=0;plane<3;plane++)for(const t of [0,.37,4.999,10.5,19.999]){
  vector(G.at(c,t,D.cycles,.32,plane),G.at(c,t+20,D.cycles,.32,plane));
  const w=G.source.flowerPoint(c,t,D.cycles,.32)[2];
  near(Math.hypot(...G.at(c,t,D.cycles,.32,plane)),1+w);
 }
});
test('Each of the 19 circles becomes a planar sphere section and remains invertible',()=>{
 const a=.84,R=.42;assert.equal(G.centers().length,19);
 for(const [cx,cy]of G.centers())for(let j=0;j<64;j++){
  const t=j*2*Math.PI/64,u=cx+R*Math.cos(t),v=cy+R*Math.sin(t);
  const [X,Y,Z]=G.wrapPoint([u,v,0],0);
  const C=cx*cx+cy*cy-R*R;
  near(-2*a*cx*X-2*a*cy*Y+(a*a-C)*Z+a*a+C,0);
  near(a*X/(1-Z),u);near(a*Y/(1-Z),v);
 }
});
test('Neighboring source circles keep their shared intersection after projection',()=>{
 const radius=.42;for(const y of [-Math.sqrt(3)*radius/2,Math.sqrt(3)*radius/2]){
  const p=[radius/2,y,0],q=G.wrapPoint(p,0);
  for(const cx of [0,radius]){
   near(Math.hypot(p[0]-cx,p[1]),radius);
   const C=cx*cx-radius*radius,a=.84;
   near(-2*a*cx*q[0]+(a*a-C)*q[2]+a*a+C,0);
  }
 }
});
