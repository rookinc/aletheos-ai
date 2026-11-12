(function(root){
'use strict';
const M=typeof module==='object'&&module.exports?require('./native/kalachakra-model.js'):ObservatoryModel;
const mod=(v,n)=>(v%n+n)%n;
function wrapPoint(p,plane,wrap=1,scale=.84){
 const [x,y,z]=p,d=scale*scale+x*x+y*y,r=1+z;
 const sphere=[r*2*scale*x/d,r*2*scale*y/d,r*(x*x+y*y-scale*scale)/d];
 return M.planePoint(p.map((v,i)=>v*(1-wrap)+sphere[i]*wrap),plane);
}
function at(route,phase,cycles,depth,plane,wrap=1){return wrapPoint(M.flowerPoint(route,mod(phase,20),cycles,depth),plane,wrap);}
const api={wrapPoint,at,centers:M.flowerCenters,source:M};
if(typeof module==='object'&&module.exports)module.exports=api;else root.FLOWER_GEOMETRY=api;
})(typeof window==='object'?window:null);
