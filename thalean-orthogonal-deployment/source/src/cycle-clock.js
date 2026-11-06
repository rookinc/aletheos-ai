// Twenty logical updates per full cycle, scheduled from monotonic system time.
class CycleClock {
 constructor(hz=10,now=0){this.hz=hz;this.running=true;this.reset(now);}
 reset(now){this.last=now;this.fraction=0;this.steps=0;this.seconds=0;}
 advance(now,step=()=>{}){if(!Number.isFinite(now)||now<this.last)throw Error('Clock must be monotonic.');const dt=(now-this.last)/1000;this.last=now;if(!this.running)return;this.seconds+=dt;const due=this.fraction+dt*this.hz*20,count=Math.floor(due+1e-9);this.fraction=Math.max(0,due-count);for(let i=0;i<count;i++){this.steps++;step(this.steps%20,this.steps);} }
 setHz(hz,now,step){if(!Number.isFinite(hz)||hz<=0||hz>30)throw Error('Cycle rate must be above 0 and at most 30 Hz.');this.advance(now,step);this.hz=hz;}
 setRunning(running,now,step){this.advance(now,step);this.running=running;}
 get cycles(){return Math.floor(this.steps/20);}
 get phaseStep(){return this.steps%20;}
}
if(typeof module!=='undefined')module.exports=CycleClock;
