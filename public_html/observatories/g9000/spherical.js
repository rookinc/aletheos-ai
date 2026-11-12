/* Drawing coordinates only. Native F and vertex identities are unchanged. */
(function(root){
'use strict';
const clamp=v=>Math.max(-1,Math.min(1,v));
function unit(v){const r=Math.hypot(...v);if(!Number.isFinite(r)||r===0)throw Error('Spherical projection needs a finite nonzero point');return v.map(x=>x/r);}
function coordinates(v){const [x,y,z]=unit(v);return{radius:1,latitude:Math.asin(clamp(y)),longitude:Math.atan2(z,x)};}
function arc(a,b,t){
 if(t<=0)return a.slice();if(t>=1)return b.slice();
 const dot=clamp(a.reduce((s,x,i)=>s+x*b[i],0));
 if(dot>.999999)return unit(a.map((x,i)=>x+(b[i]-x)*t));
 const normal=b.map((x,i)=>x-dot*a[i]),length=Math.hypot(...normal);
 let tangent;
 if(length>1e-12)tangent=normal.map(x=>x/length);
 else{
  // Opposite endpoints need a chosen great circle. Pick a stable tangent.
  const axis=a.map(Math.abs).indexOf(Math.min(...a.map(Math.abs))),e=[0,0,0];e[axis]=1;
  tangent=unit([a[1]*e[2]-a[2]*e[1],a[2]*e[0]-a[0]*e[2],a[0]*e[1]-a[1]*e[0]]);
 }
 const angle=Math.atan2(length,dot);
 return unit(a.map((x,i)=>x*Math.cos(angle*t)+tangent[i]*Math.sin(angle*t)));
}
const api={unit,coordinates,arc};
if(typeof module==='object'&&module.exports)module.exports=api;else root.SPHERICAL=api;
})(typeof window==='object'?window:null);
