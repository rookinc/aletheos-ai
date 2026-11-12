const {test}=require('node:test');
const assert=require('node:assert/strict');
const T=require('../../public_html/observatories/g9000/flower-tail.js');
const near=(x,y)=>assert.ok(Math.abs(x-y)<1e-12,`${x} != ${y}`);
test('Full-cycle tail has the requested 0%, 50%, and 100% endpoints',()=>{
 for(let step=0;step<20;step++){
  const age=step/19;
  near(T.opacity(0,age),0);
  near(T.opacity(.5,age),1-age);
  near(T.opacity(1,age),1);
 }
 assert.deepEqual(T.endpoints(.5),{first:1,last:0});
 assert.deepEqual(T.endpoints(1),{first:1,last:1});
});
test('Intermediate slider values fade across the entire cycle',()=>{
 near(T.opacity(.25,0),.5);near(T.opacity(.25,.5),.25);near(T.opacity(.25,1),0);
 near(T.opacity(.75,0),1);near(T.opacity(.75,.5),.75);near(T.opacity(.75,1),.5);
 near(T.opacity(.64,1),.28);
 for(let s=0;s<=100;s++)for(let age=0;age<100;age++){
  const a=T.opacity(s/100,age/100),b=T.opacity(s/100,(age+1)/100);
  assert.ok(a>=b-1e-12&&a<=1&&b>=0);
  if(s<100)assert.ok(T.opacity((s+1)/100,age/100)>=a-1e-12);
 }
});
