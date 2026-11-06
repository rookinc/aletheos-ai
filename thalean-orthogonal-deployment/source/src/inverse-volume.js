'use strict';
// Finite-resolution coincidence of the actual rendered F polylines.
// A sample belongs iff its distance to EACH rotated path set is <= tolerance.
// No physical scale, energy functional, cross-copy force or 1/r^3 law is assumed.
class InverseVolume {
 constructor(n=50,half=.5){this.n=n;this.half=half;this.step=2*half/n;this.cells=[];this.faces=[];this.count=0;}
 static distance2(p,a,b){const d=b.map((v,i)=>v-a[i]),v=p.map((x,i)=>x-a[i]),q=d.reduce((s,x)=>s+x*x,0),t=q?Math.max(0,Math.min(1,v.reduce((s,x,i)=>s+x*d[i],0)/q)):0;return v.reduce((s,x,i)=>s+(x-t*d[i])**2,0);}
 build(paths,tolerance=.05){
  if(!Number.isFinite(tolerance)||tolerance<=0)throw Error('Convergence tolerance must be positive.');
  const {n,half,step}=this,size=n*n*n,distance=new Float64Array(size).fill(Infinity),limit=tolerance*tolerance;
  const coord=Float64Array.from({length:n},(_,i)=>-half+(i+.5)*step);
  for(const cycle of paths)for(const path of cycle)for(let s=1;s<path.points.length;s++){
   const a=path.points[s-1],b=path.points[s],lo=[],hi=[];let outside=false;
   for(let j=0;j<3;j++){lo[j]=Math.max(0,Math.ceil((Math.min(a[j],b[j])-tolerance+half)/step-.5));hi[j]=Math.min(n-1,Math.floor((Math.max(a[j],b[j])+tolerance+half)/step-.5));if(lo[j]>hi[j])outside=true;}if(outside)continue;
   const dx=b[0]-a[0],dy=b[1]-a[1],dz=b[2]-a[2],length2=dx*dx+dy*dy+dz*dz;
   for(let i=lo[0];i<=hi[0];i++)for(let j=lo[1];j<=hi[1];j++)for(let k=lo[2];k<=hi[2];k++){
    const idx=(i*n+j)*n+k,vx=coord[i]-a[0],vy=coord[j]-a[1],vz=coord[k]-a[2],t=length2?Math.max(0,Math.min(1,(vx*dx+vy*dy+vz*dz)/length2)):0;
    const d2=(vx-t*dx)**2+(vy-t*dy)**2+(vz-t*dz)**2;if(d2<=limit&&d2<distance[idx])distance[idx]=d2;
   }
  }
  const mask=new Uint8Array(size),cells=[];
  for(let i=0;i<n;i++)for(let j=0;j<n;j++)for(let k=0;k<n;k++){
   const id=(i*n+j)*n+k,dY=distance[id],dX=distance[(k*n+i)*n+j],dZ=distance[(j*n+k)*n+i],max=Math.max(dX,dY,dZ);
   if(max<=limit){mask[id]=1;cells.push({i,j,k,id,point:[coord[i],coord[j],coord[k]],strength:1-Math.sqrt(max)/tolerance});}
  }
  const faces=[],corners=[[[0,-1,-1],[0,1,-1],[0,1,1],[0,-1,1]], [[-1,0,-1],[-1,0,1],[1,0,1],[1,0,-1]], [[-1,-1,0],[1,-1,0],[1,1,0],[-1,1,0]]];
  for(const c of cells)for(let axis=0;axis<3;axis++)for(const side of [-1,1]){
   const q=[c.i,c.j,c.k];q[axis]+=side;if(q[axis]>=0&&q[axis]<n&&mask[(q[0]*n+q[1])*n+q[2]])continue;
   faces.push({points:corners[axis].map(p=>p.map((v,j)=>c.point[j]+(j===axis?side:v)*step/2)),normal:[+(axis===0)*side,+(axis===1)*side,+(axis===2)*side],axis,strength:c.strength});
  }
  Object.assign(this,{mask,cells,faces,count:cells.length,tolerance,volume:cells.length*step**3,distance});return this;
 }
}
if(typeof module!=='undefined')module.exports=InverseVolume;
