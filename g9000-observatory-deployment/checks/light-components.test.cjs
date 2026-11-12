const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const C=require('../../public_html/observatories/g9000/light-components.js');
const context={window:{}};vm.runInNewContext(fs.readFileSync(require.resolve('../../public_html/observatories/g9000/native-model.js'),'utf8'),context);
const cycles=JSON.parse(JSON.stringify(context.window.NATIVE_MODEL.cycles));
const near=(a,b,tol=2e-11)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
test('Removing the F-cycle mean leaves zero-mean, 20-periodic coordinate signals',()=>{
 for(const depth of [0,.32,1]){const model=C.model(cycles,depth);for(let c=0;c<450;c++){
  const total=[0,0,0];for(let t=0;t<20;t++){const q=model.residual(c,t);q.forEach((x,i)=>total[i]+=x/20);for(let plane=0;plane<3;plane++){
   const v=model.residual(c,t+.37,plane),p=C.inside(v,.62);assert.ok(Math.hypot(...p)<=.62+1e-12);
   model.residual(c,t+20.37,plane).forEach((x,i)=>near(x,v[i]));const u=C.direction(v);if(u)near(Math.hypot(...u),1);
  }}total.forEach(x=>near(x,0));
 }}
 assert.equal(C.direction([0,0,0]),null);
});
test('Common white extraction reconstructs RGB with a nonnegative chromatic remainder',()=>{
 for(const rgb of [[1,0,0],[1,1,0],[.9,.4,.7],[1,1,1],[0,0,0]]){
  const s=C.split(rgb);s.color.forEach((v,i)=>{assert.ok(v>=0);near(v+s.white,rgb[i]);});near(Math.min(...s.color),0);
 }
 assert.equal(C.split([1,0,0]).white,0);assert.equal(C.split([1,1,0]).white,0);assert.equal(C.split([1,1,1]).white,1);
});
test('Angular sampling conserves contributions at the longitude seam and poles',()=>{
 const g=C.grid();for(let c=0;c<3;c++)for(const u of [[1,0,0],[0,1,0],[0,-1,0],[-1,0,1e-9]])C.deposit(g,u,c,c+1);
 const smooth=C.smooth(g);for(let c=0;c<3;c++){let sum=0;for(let i=c;i<smooth.values.length;i+=3)sum+=smooth.values[i];near(sum,4*(c+1));}
 let area=0;for(let y=0;y<g.ny;y++)area+=g.nx*C.area(g,y);near(area,4*Math.PI);
});
test('No white appears with a missing channel; coincident RGB contributes to the shell',()=>{
 const g=C.grid();C.deposit(g,[1,0,0],0,1);C.deposit(g,[1,0,0],1,1);
 for(const f of [g,C.smooth(g)])for(let i=0;i<f.values.length;i+=3)assert.equal(C.split(Array.from(f.values.subarray(i,i+3))).white,0);
 C.deposit(g,[1,0,0],2,1);const f=C.smooth(g);let white=0;for(let i=0;i<f.values.length;i+=3)white+=C.split(Array.from(f.values.subarray(i,i+3))).white;near(white,1);
});
