/** Native registered action in common coordinates; derived Fourier projections.
 * No physical wave propagation or intrinsic choice of axis is asserted.
 */
const integer=(x,n)=>Number.isInteger(x)&&x>=0&&x<n;
const mod=(x,n)=>(x%n+n)%n;
const complex=x=>typeof x==='number'?{re:x,im:0}:{re:x.re,im:x.im};

export function loadRegistered(data){
  if(data?.schema!=='aletheos.living-registered.v1'||data.vertices!==1800)throw Error('Missing native G1800 registration');
  const n=1800;
  for(const name of ['K','delta'])if(data[name]?.length!==n||new Set(data[name]).size!==n||!data[name].every(x=>integer(x,n)))throw Error('Invalid registered '+name+' permutation');
  if(data.edges?.length!==7200||data.fibers?.length!==n||data.toG900?.length!==n)throw Error('Incomplete registered carrier');
  const adj=Array.from({length:n},()=>[]), edgeSet=new Set();
  for(const [a,b] of data.edges){
    if(!integer(a,n)||!integer(b,n)||a===b)throw Error('Invalid G1800 edge');
    const key=[Math.min(a,b),Math.max(a,b)].join(',');
    if(edgeSet.has(key))throw Error('Duplicate G1800 edge');edgeSet.add(key);adj[a].push(b);adj[b].push(a);
  }
  if(!adj.every(a=>a.length===8))throw Error('G1800 degree check failed');
  const visited=new Set([0]),queue=[0];for(let i=0;i<queue.length;i++)for(const y of adj[queue[i]])if(!visited.has(y)){visited.add(y);queue.push(y);}
  if(visited.size!==n)throw Error('G1800 disconnected');
  const inverseK=Array(n),cycleOf=Array(n),turnOf=Array(n),cycles=[];
  for(let x=0;x<n;x++){
    const k=data.K[x],d=data.delta[x];inverseK[k]=x;
    if(data.K[k]!==d||data.delta[d]!==x||d===x)throw Error('Native quarter-turn identity failed');
    if(!integer(data.toG900[x],900)||data.toG900[d]!==data.toG900[x])throw Error('Native G1800 to G900 projection failed');
    if(cycleOf[x]!==undefined)continue;
    const c=[x,k,d,data.K[d]];
    if(new Set(c).size!==4||data.K[c[3]]!==x)throw Error('Native K cycle failed');
    c.forEach((v,t)=>{cycleOf[v]=cycles.length;turnOf[v]=t;});cycles.push(c);
  }
  for(const [a,b] of data.edges){const u=data.K[a],v=data.K[b];if(!edgeSet.has([Math.min(u,v),Math.max(u,v)].join(',')))throw Error('K does not preserve native edges');}
  if(cycles.length!==450)throw Error('Native cycle count failed');
  return {...data,adj,inverseK,cycleOf,turnOf,cycles};
}

/** F: frame+turn; S: frame only; K: turn only; Delta: half turn. */
export function registeredStep(data,state,action='F',steps=1){
  if(!integer(state.frame,5)||!integer(state.x,1800)||!Number.isInteger(steps))throw Error('Invalid registered state/step');
  if(!['F','S','K','Delta'].includes(action))throw Error('Unknown registered action');
  const frame=mod(state.frame+(['F','S'].includes(action)?steps:0),5);
  let x=state.x, turns=action==='S'?0:mod(steps*(action==='Delta'?2:1),4);
  while(turns-->0)x=data.K[x];
  return {frame,x};
}

/** P_k = 1/5 sum exp(-2 pi i k j/5) S^j, on a five-frame vector.
 * S is the push-forward frame shift: (S psi)[f] = psi[f-1].
 * The five output vectors sum to the original input (complex values retained).
 */
export function projectChannels(amplitudes){
  if(!Array.isArray(amplitudes)||amplitudes.length!==5)throw Error('Expected five complex frame amplitudes');
  const a=amplitudes.map(complex);
  if(!a.every(z=>Number.isFinite(z.re)&&Number.isFinite(z.im)))throw Error('Nonfinite frame amplitude');
  return Array.from({length:5},(_,k)=>Array.from({length:5},(_,f)=>{
    let re=0,im=0;
    for(let j=0;j<5;j++){
      const z=a[mod(f-j,5)],theta=-2*Math.PI*k*j/5,c=Math.cos(theta),s=Math.sin(theta);
      re+=(z.re*c-z.im*s)/5;im+=(z.re*s+z.im*c)/5;
    }
    return {re,im};
  }));
}

export function recombineChannels(channels,selected=[0,1,2,3,4]){
  if(channels?.length!==5||channels.some(c=>c.length!==5)||!selected.every(k=>integer(k,5)))throw Error('Invalid harmonic channels');
  return Array.from({length:5},(_,f)=>selected.reduce((z,k)=>({re:z.re+channels[k][f].re,im:z.im+channels[k][f].im}),{re:0,im:0}));
}

export function harmonicSummary(amplitudes){
  const channels=projectChannels(amplitudes);
  const energy=channels.map(c=>c.reduce((sum,z)=>sum+z.re*z.re+z.im*z.im,0));
  const recombined=recombineChannels(channels);
  const error=Math.max(...recombined.map((z,i)=>{const a=complex(amplitudes[i]);return Math.hypot(z.re-a.re,z.im-a.im);}));
  return {channels,energy,recombined,error,sectors:[energy[0],energy[1]+energy[4],energy[2]+energy[3]],realDimensions:[1800,3600,3600]};
}

export function registeredReturnReceipt(data){
  let f5=true,f10=true,f20=true;
  for(let frame=0;frame<5;frame++)for(let x=0;x<1800;x++){
    const start={frame,x};
    const a=registeredStep(data,start,'F',5),b=registeredStep(data,start,'F',10),c=registeredStep(data,start,'F',20);
    f5&&=a.frame===frame&&a.x===data.K[x];f10&&=b.frame===frame&&b.x===data.delta[x];f20&&=c.frame===frame&&c.x===x;
  }
  return {classification:'native',states:9000,F5_equals_K:f5,F10_equals_delta:f10,F20_identity:f20,freeCycles:450,firstReturn:20};
}
