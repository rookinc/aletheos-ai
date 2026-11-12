/* Free camera orientation, expressed as a unit quaternion. */
(function(root){
'use strict';
const unit=q=>{const n=Math.hypot(...q);return n>1e-15?q.map(v=>v/n):[0,0,0,1];};
function multiply(a,b){const[x,y,z,w]=a,[X,Y,Z,W]=b;return[w*X+x*W+y*Z-z*Y,w*Y-x*Z+y*W+z*X,w*Z+x*Y-y*X+z*W,w*W-x*X-y*Y-z*Z];}
function axis(axis,angle){const n=Math.hypot(...axis),s=Math.sin(angle/2)/n;return[axis[0]*s,axis[1]*s,axis[2]*s,Math.cos(angle/2)];}
function turn(q,a,angle){return unit(multiply(axis(a,angle),q));}
function orbit(q,dx,dy){return turn(turn(q,[0,1,0],dx*.006),[1,0,0],dy*.006);}
function initial(yaw,pitch){return unit(multiply(axis([1,0,0],pitch),axis([0,1,0],yaw)));}
function matrix(q){const[x,y,z,w]=unit(q);return[1-2*(y*y+z*z),2*(x*y-z*w),2*(x*z+y*w),2*(x*y+z*w),1-2*(x*x+z*z),2*(y*z-x*w),2*(x*z-y*w),2*(y*z+x*w),1-2*(x*x+y*y)];}
function angleDelta(a,b){return Math.atan2(Math.sin(a-b),Math.cos(a-b));}
// These numerical limits are far beyond the old viewing range (0.3–5).
function zoom(current,factor){return Math.max(.0001,Math.min(10000,current*factor));}
const api={unit,multiply,axis,turn,orbit,initial,matrix,angleDelta,zoom};
if(typeof module==='object'&&module.exports)module.exports=api;else root.CAMERA_NAVIGATION=api;
})(typeof window==='object'?window:null);
