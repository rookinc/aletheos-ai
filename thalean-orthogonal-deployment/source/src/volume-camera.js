/* Quaternion orientation permits full turns on every axis without pitch locks. */
class VolumeCamera {
 constructor(){this.reset();}
 reset(){this.q=[0,0,0,1];this.panX=0;this.panY=0;this.zoom=1;}
 turn(x,y,z){const angle=Math.hypot(x,y,z);if(!angle)return;const s=Math.sin(angle/2)/angle,[ax,ay,az,aw]=[x*s,y*s,z*s,Math.cos(angle/2)],[bx,by,bz,bw]=this.q;const q=[aw*bx+ax*bw+ay*bz-az*by,aw*by-ax*bz+ay*bw+az*bx,aw*bz+ax*by-ay*bx+az*bw,aw*bw-ax*bx-ay*by-az*bz],n=Math.hypot(...q);this.q=q.map(v=>v/n);}
 rotate(p){const[x,y,z,w]=this.q,[a,b,c]=p,tx=2*(y*c-z*b),ty=2*(z*a-x*c),tz=2*(x*b-y*a);return [a+w*tx+y*tz-z*ty,b+w*ty+z*tx-x*tz,c+w*tz+x*ty-y*tx];}
 // Move, scale and roll about a gesture centroid in screen coordinates.
 gesture(from,to,ratio,angle,width,height){if(!Number.isFinite(ratio)||ratio<=0||!Number.isFinite(angle))return;const next=Math.max(1e-4,Math.min(1e4,this.zoom*ratio)),k=next/this.zoom,dx=width/2+this.panX-from[0],dy=height/2+this.panY-from[1],co=Math.cos(angle),si=Math.sin(angle);this.panX=to[0]+k*(co*dx-si*dy)-width/2;this.panY=to[1]+k*(si*dx+co*dy)-height/2;this.zoom=next;this.turn(0,0,-angle);}
}
function bindVolumeCamera(canvas,camera,invalidate,onDoubleTap,onReset){
 const pointers=new Map();let lastTap=null,gestureState=null;
 const location=e=>{const r=canvas.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top];};
 const snapshot=()=>{const p=[...pointers.values()];if(p.length<2)return null;const[a,b]=p;return {centre:[(a.pos[0]+b.pos[0])/2,(a.pos[1]+b.pos[1])/2],distance:Math.hypot(a.pos[0]-b.pos[0],a.pos[1]-b.pos[1]),angle:Math.atan2(b.pos[1]-a.pos[1],b.pos[0]-a.pos[0])};};
 const rebase=()=>{gestureState=snapshot();};
 canvas.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&![0,1,2].includes(e.button))return;e.preventDefault();canvas.focus({preventScroll:true});const pos=location(e);pointers.set(e.pointerId,{pos,start:pos.slice(),moved:false,time:performance.now(),mode:e.button===1||e.button===2||e.shiftKey?'pan':e.altKey?'roll':'orbit',tapEligible:e.button===0});if(pointers.size>1){lastTap=null;for(const p of pointers.values())p.tapEligible=false;}canvas.setPointerCapture(e.pointerId);rebase();});
 canvas.addEventListener('pointermove',e=>{const p=pointers.get(e.pointerId);if(!p)return;e.preventDefault();const previous=p.pos;p.pos=location(e);if(Math.hypot(p.pos[0]-p.start[0],p.pos[1]-p.start[1])>5)p.moved=true;
  if(pointers.size>=2){const now=snapshot(),old=gestureState;if(old&&old.distance>2&&now.distance>2){let angle=now.angle-old.angle;angle=Math.atan2(Math.sin(angle),Math.cos(angle));camera.gesture(old.centre,now.centre,now.distance/old.distance,angle,canvas.clientWidth,canvas.clientHeight);}gestureState=now;}
  else{const dx=p.pos[0]-previous[0],dy=p.pos[1]-previous[1],mode=e.shiftKey?'pan':e.altKey?'roll':p.mode;if(mode==='pan'){camera.panX+=dx;camera.panY+=dy;}else if(mode==='roll')camera.turn(0,0,-dx*.008);else camera.turn(dy*.008,dx*.008,0);}
  invalidate();
 });
 function finish(e,cancelled){const p=pointers.get(e.pointerId);if(!p)return;const now=performance.now();if(!cancelled&&p.tapEligible&&!p.moved&&now-p.time<300){if(lastTap&&now-lastTap.time<350&&Math.hypot(p.pos[0]-lastTap.pos[0],p.pos[1]-lastTap.pos[1])<24){if(onDoubleTap)onDoubleTap();else camera.reset();invalidate();lastTap=null;}else lastTap={time:now,pos:p.pos};}else lastTap=null;pointers.delete(e.pointerId);rebase();}
 canvas.addEventListener('pointerup',e=>finish(e,false));canvas.addEventListener('pointercancel',e=>finish(e,true));canvas.addEventListener('lostpointercapture',e=>finish(e,true));
 canvas.addEventListener('contextmenu',e=>e.preventDefault());
 canvas.addEventListener('wheel',e=>{e.preventDefault();const r=canvas.getBoundingClientRect(),unit=e.deltaMode===1?16:e.deltaMode===2?r.height:1;if(e.shiftKey){camera.panX-=e.deltaX*unit;camera.panY-=e.deltaY*unit;}else{const p=location(e);camera.gesture(p,p,Math.exp(Math.max(-2,Math.min(2,-e.deltaY*unit*.0015))),0,r.width,r.height);}invalidate();},{passive:false});
 canvas.addEventListener('keydown',e=>{const k=e.key.toLowerCase(),step=e.shiftKey?.16:.06,move=e.shiftKey?36:12;let handled=true;if(k==='arrowleft')camera.turn(0,-step,0);else if(k==='arrowright')camera.turn(0,step,0);else if(k==='arrowup')camera.turn(-step,0,0);else if(k==='arrowdown')camera.turn(step,0,0);else if(k==='q')camera.turn(0,0,step);else if(k==='e')camera.turn(0,0,-step);else if(k==='a')camera.panX-=move;else if(k==='d')camera.panX+=move;else if(k==='w')camera.panY-=move;else if(k==='s')camera.panY+=move;else if(k==='+'||k==='='||k==='-'){const p=[canvas.clientWidth/2,canvas.clientHeight/2];camera.gesture(p,p,k==='-'?1/1.15:1.15,0,...p.map(x=>x*2));}else if(k==='enter'&&onDoubleTap)onDoubleTap();else if(k==='home'||k==='0'){if(onReset)onReset();else camera.reset();}else handled=false;if(handled){e.preventDefault();invalidate();}});
 window.addEventListener('blur',()=>{pointers.clear();gestureState=null;lastTap=null;});
}
