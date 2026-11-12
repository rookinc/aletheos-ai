const {test}=require('node:test'),assert=require('node:assert/strict');
const N=require('../../public_html/observatories/g9000/camera-navigation.js');
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
const apply=(q,p)=>{const m=N.matrix(q);return[0,1,2].map(i=>m[3*i]*p[0]+m[3*i+1]*p[1]+m[3*i+2]*p[2]);};
test('Initial quaternion preserves the existing camera framing',()=>{
 for(const yaw of [-.65,-.42,.7])for(const pitch of [.28,.42,1.7]){
  const p=[2,3,4],d=-p[0]*Math.sin(yaw)+p[2]*Math.cos(yaw),expected=[p[0]*Math.cos(yaw)+p[2]*Math.sin(yaw),p[1]*Math.cos(pitch)-d*Math.sin(pitch),p[1]*Math.sin(pitch)+d*Math.cos(pitch)];
  apply(N.initial(yaw,pitch),p).forEach((v,i)=>near(v,expected[i]));
 }
});
test('Orbit passes over both poles and completes a full rotation without a tilt limit',()=>{
 const q=N.orbit([0,0,0,1],0,Math.PI/.006);apply(q,[0,1,0]).forEach((v,i)=>near(v,[0,-1,0][i]));
 const full=N.orbit(q,0,Math.PI/.006);apply(full,[1,2,3]).forEach((v,i)=>near(v,[1,2,3][i]));
});
test('Repeated arbitrary rotations and roll preserve orientation and lengths',()=>{
 let q=N.initial(-.65,.42);for(let i=0;i<10000;i++)q=N.turn(N.orbit(q,Math.sin(i)*12,Math.cos(i)*8),[0,0,1],.01);
 near(Math.hypot(...q),1);near(Math.hypot(...apply(q,[2,3,4])),Math.sqrt(29));
 const roll=N.turn([0,0,0,1],[0,0,1],Math.PI/2);apply(roll,[1,0,0]).forEach((v,i)=>near(v,[0,1,0][i]));
});
test('Pinch twist crosses the angle seam smoothly and zoom passes the old bounds',()=>{
 near(N.angleDelta(-Math.PI+.01,Math.PI-.01),.02);
 near(N.zoom(5,2),10);near(N.zoom(.3,.1),.03);assert.ok(N.zoom(1,0)>0);assert.ok(Number.isFinite(N.zoom(1,Infinity)));
});
