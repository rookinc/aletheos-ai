/* Pure exact finite-state operations. Rendering never certifies an operation. */
(function(root){
'use strict';
const stable=v=>v===null||typeof v!=='object'?JSON.stringify(v):Array.isArray(v)?'['+v.map(stable).join(',')+']':'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+stable(v[k])).join(',')+'}';
const integer=(v,n)=>{if(!Number.isInteger(v)||v<0||v>=n)throw Error('State outside carrier');return v;};
const permutation=p=>Array.isArray(p)&&p.every(x=>Number.isInteger(x)&&x>=0&&x<p.length)&&new Set(p).size===p.length;
function inverse(p){if(!permutation(p))throw Error('Invalid permutation');let q=Array(p.length);p.forEach((v,i)=>q[v]=i);return q;}
function power(p,s,n){integer(s,p.length);if(!Number.isInteger(n))throw Error('Noninteger exponent');if(n<0){p=inverse(p);n=-n;}for(let i=0;i<n;i++)s=p[s];return s;}
function adjacencyPreserved(edges,p){if(!permutation(p))return false;const key=(a,b)=>a<b?a+','+b:b+','+a,E=new Set(edges.map(e=>key(...e)));return edges.every(([a,b])=>E.has(key(p[a],p[b])));}
function distances(adj,root){integer(root,adj.length);const d=Array(adj.length).fill(null),q=[root];d[root]=0;for(let i=0;i<q.length;i++)for(const v of adj[q[i]])if(d[v]===null){d[v]=d[q[i]]+1;q.push(v);}return d;}
function orbit(p,s){integer(s,p.length);const result=[],seen=new Set();while(!seen.has(s)){seen.add(s);result.push(s);s=p[s];}if(s!==result[0])throw Error('Not a cycle');return result;}
function transition(c,s,steps){integer(s,9000);const output=power(c.F,s,steps),f=Math.floor(s/1800),q=s%1800;return {output,checks:{permutation:permutation(c.F),twentyStepReturn:power(c.F,s,20)===s,fiveStepTurn:power(c.F,s,5)===f*1800+c.K[f][q],tenStepTurn:power(c.F,s,10)===f*1800+power(c.K[f],q,2),fourStepLocalTurn:power(c.K[f],q,4)===q,frameProgression:Math.floor(output/1800)===((f+steps)%5+5)%5,transportTurnCommutes:c.T[f][c.K[f][q]]===c.K[(f+1)%5][c.T[f][q]]}};}
// DFT of real amplitudes on five registered native-coordinate frame states.
function spectral(x){if(x.length!==5||x.some(v=>!Number.isFinite(v)))throw Error('Five finite amplitudes required');const coeff=Array.from({length:5},(_,k)=>x.reduce((z,v,j)=>{const t=-2*Math.PI*k*j/5;return [z[0]+v*Math.cos(t)/5,z[1]+v*Math.sin(t)/5];},[0,0]));const sectors=[[0],[1,4],[2,3]].map(ks=>x.map((_,j)=>ks.reduce((v,k)=>{const t=2*Math.PI*k*j/5;return v+coeff[k][0]*Math.cos(t)-coeff[k][1]*Math.sin(t);},0)));const reconstructed=x.map((_,j)=>sectors.reduce((v,y)=>v+y[j],0));return {coeff,sectors,reconstructed,maxResidual:Math.max(...x.map((v,j)=>Math.abs(v-reconstructed[j]))) };}
function receipt({carrier,source,object,operation,input,output,checks,classification='native',revision}){return {schema:'aletheos.math.receipt.v1',carrier,sourceArtifact:source,selectedObject:object,operation,input,output,invariants:checks,verified:Object.values(checks).every(v=>v===true),classification,revision};}
const api={stable,integer,permutation,inverse,power,adjacencyPreserved,distances,orbit,transition,spectral,receipt};
if(typeof module!=='undefined')module.exports=api;root.ThaleanMath=api;
})(typeof globalThis!=='undefined'?globalThis:this);
