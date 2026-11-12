/* The slider controls the endpoints of one complete 20-step trail. */
(function(root){
'use strict';
const clamp=x=>Math.max(0,Math.min(1,x));
function endpoints(value){const s=clamp(value);return{first:Math.min(1,2*s),last:Math.max(0,2*s-1)};}
function opacity(value,age){const e=endpoints(value);return e.first+(e.last-e.first)*clamp(age);}
const api={endpoints,opacity};if(typeof module==='object'&&module.exports)module.exports=api;else root.FLOWER_TAIL=api;
})(typeof window==='object'?window:null);
