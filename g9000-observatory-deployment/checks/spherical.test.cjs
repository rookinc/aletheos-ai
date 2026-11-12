const {test}=require('node:test');
const assert=require('node:assert/strict');
const {unit,coordinates,arc}=require('../../public_html/observatories/g9000/spherical.js');
const near=(a,b,tol=1e-10)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
const angle=(a,b)=>Math.atan2(Math.hypot(a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]),dot(a,b));
test('Spherical conventions: north +Y; longitude +X toward +Z',()=>{
 near(coordinates([0,10,0]).latitude,Math.PI/2);
 near(coordinates([0,-10,0]).latitude,-Math.PI/2);
 near(coordinates([10,0,0]).longitude,0);
 near(coordinates([0,0,10]).longitude,Math.PI/2);
 near(coordinates([0,0,-10]).longitude,-Math.PI/2);
 const v=coordinates([2,3,4]);near(v.radius,1);near(v.latitude,Math.atan2(3,Math.hypot(2,4)));
 assert.throws(()=>unit([0,0,0]));
});
test('Great-circle travel stays on the sphere and has constant angular speed',()=>{
 for(let i=0;i<200;i++){
  const a=unit([Math.sin(i+.1),Math.cos(i*.67),Math.sin(i*.43+.2)]),b=unit([Math.cos(i*.19+.4),Math.sin(i*.53),Math.cos(i*.31)]);
  for(const t of [0,.1,.25,.5,.8,1]){const p=arc(a,b,t);near(Math.hypot(...p),1);near(angle(a,p),angle(a,b)*t,2e-9);}
  assert.deepEqual(arc(a,b,0),a);assert.deepEqual(arc(a,b,1),b);
 }
});
test('Coincident and opposite endpoints stay finite, including near the antipode',()=>{
 const a=[1,0,0];
 for(const b of [[1,0,0],[-1,0,0],unit([-1,1e-7,2e-7])])for(const t of [0,.1,.5,.9,1]){
  const p=arc(a,b,t);assert.ok(p.every(Number.isFinite));near(Math.hypot(...p),1);near(angle(a,p),angle(a,b)*t,1e-9);
 }
});
