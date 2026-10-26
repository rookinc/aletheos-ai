import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadRegistered,registeredStep,projectChannels,recombineChannels,harmonicSummary,registeredReturnReceipt} from '../living-harmonics.mjs';
const raw=JSON.parse(fs.readFileSync(new URL('../data/living-registered.json',import.meta.url)));
const r=loadRegistered(raw);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-11,`${a} != ${b}`);

test('source-defined G1800 exact graph and source binding',()=>{
 assert.equal(r.vertices,1800);assert.equal(r.edges.length,7200);assert.equal(r.cycles.length,450);
 assert.equal(raw.source.sha256,'ee12ef66c5ac2e71dd5c31996bbee4979266cbf72fb1c01400153a44913bfca5');
 const g15=JSON.parse(fs.readFileSync(new URL('../data/g15-quotient.json',import.meta.url)));
 const [a,b]=g15.deck_generators;
 const diag=(p,s)=>p[Math.floor(s/60)]*60+p[s%60];
 for(let i=0;i<1800;i++)for(const s of r.fibers[i]){
  const u=Math.floor(s/60),v=s%60;
  assert.equal(r.productMap[diag(b,s)],i);
  assert.equal(r.K[i],r.productMap[a[b[v]]*60+b[u]]);
  assert.equal(r.delta[i],r.productMap[diag(a,s)]);
 }
});

test('all 9000 registered states first return after twenty, not five or ten',()=>{
 assert.deepEqual(registeredReturnReceipt(r),{classification:'native',states:9000,F5_equals_K:true,F10_equals_delta:true,F20_identity:true,freeCycles:450,firstReturn:20});
 for(let x=0;x<1800;x++)for(let n=1;n<20;n++)assert.notDeepEqual(registeredStep(r,{frame:0,x},'F',n),{frame:0,x});
 for(let x=0;x<1800;x++)assert.deepEqual(registeredStep(r,registeredStep(r,{frame:3,x},'F'),'F',-1),{frame:3,x});
});

test('pure shift, internal turn, and combined action remain distinct and commute',()=>{
 const s={frame:2,x:71};
 assert.deepEqual(registeredStep(r,s,'S',5),s);
 assert.deepEqual(registeredStep(r,s,'K',4),s);
 assert.deepEqual(registeredStep(r,registeredStep(r,s,'K'),'S'),registeredStep(r,s,'F'));
 assert.deepEqual(registeredStep(r,s,'Delta'),registeredStep(r,s,'K',2));
});

test('Fourier projectors reconstruct complex state, are idempotent and orthogonal',()=>{
 const input=[{re:1,im:.2},{re:-2,im:3},{re:.5,im:-.3},{re:0,im:.6},{re:2,im:1}];
 const p=projectChannels(input),sum=recombineChannels(p);
 sum.forEach((z,i)=>{near(z.re,input[i].re);near(z.im,input[i].im);});
 for(let k=0;k<5;k++){
  const again=projectChannels(p[k]);
  for(let l=0;l<5;l++)again[l].forEach((z,i)=>{near(z.re,k===l?p[k][i].re:0);near(z.im,k===l?p[k][i].im:0);});
 }
 const summary=harmonicSummary(input);
 near(summary.energy.reduce((a,b)=>a+b),input.reduce((s,z)=>s+z.re*z.re+z.im*z.im,0));
 near(summary.error,0);
});

test('real amplitudes form common mode and two conjugate pairs',()=>{
 const p=projectChannels([1,0,0,0,0]);
 p[0].forEach(z=>{near(z.re,.2);near(z.im,0);});
 for(let f=0;f<5;f++)for(const [k,l] of [[1,4],[2,3]]){near(p[k][f].re,p[l][f].re);near(p[k][f].im,-p[l][f].im);}
});

test('full 9000-state native F commutes with every frame projector',()=>{
 // Nonfactorized data: different internal states carry different frame vectors.
 const input=Array.from({length:9000},(_,i)=>({re:Math.sin(i*.17),im:Math.cos(i*.31)}));
 const pushF=values=>{
  const result=Array(9000);
  for(let f=0;f<5;f++)for(let x=0;x<1800;x++)result[((f+1)%5)*1800+r.K[x]]=values[f*1800+x];
  return result;
 };
 const projectAll=values=>{
  const result=Array.from({length:5},()=>Array(9000));
  for(let x=0;x<1800;x++){
   const p=projectChannels(Array.from({length:5},(_,f)=>values[f*1800+x]));
   for(let k=0;k<5;k++)for(let f=0;f<5;f++)result[k][f*1800+x]=p[k][f];
  }
  return result;
 };
 const before=projectAll(input),after=projectAll(pushF(input));
 for(let k=0;k<5;k++)pushF(before[k]).forEach((z,i)=>{near(z.re,after[k][i].re);near(z.im,after[k][i].im);});
});

test('corrupt source maps and invalid states fail visibly',()=>{
 const bad=structuredClone(raw);bad.K[0]=bad.K[1];assert.throws(()=>loadRegistered(bad));
 assert.throws(()=>registeredStep(r,{frame:0,x:1800}));
 assert.throws(()=>projectChannels([1,2]));
});
