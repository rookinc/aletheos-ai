/* Screen color mixing. These channels do not define physical emission. */
(function(root){
'use strict';
const clamp=x=>Math.max(0,Math.min(1,x));
function profile(mode='rgb',black=0){
 if(mode==='cmyk'){
  const v=Math.round(255*(1-clamp(black))),h=v.toString(16).padStart(2,'0');
  return {mode,blend:'multiply',colors:[`#00${h}${h}`,`#${h}00${h}`,`#${h}${h}00`],labels:['#007889','#a11470','#7e6600'],channels:['C','M','Y'],paper:true};
 }
 if(mode==='original')return {mode,blend:'source-over',colors:['#65d8e6','#ffd38a','#bd99e5'],labels:['#65d8e6','#ffd38a','#bd99e5'],channels:['XY','XZ','YZ'],paper:false};
 return {mode:'rgb',blend:'lighter',colors:['#ff0000','#00ff00','#0000ff'],labels:['#ff8585','#80f7a0','#8faaff'],channels:['R','G','B'],paper:false};
}
const api={profile};if(typeof module==='object'&&module.exports)module.exports=api;else root.FLOWER_COLOR=api;
})(typeof window==='object'?window:null);
