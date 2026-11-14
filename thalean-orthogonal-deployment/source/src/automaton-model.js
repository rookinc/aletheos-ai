'use strict';
const G9000Automaton=(()=>{
 const clone=x=>JSON.parse(JSON.stringify(x));
 const address=x=>{if(!Number.isInteger(x)||x<0||x>8999)throw Error('Native address must be an integer from 0 to 8999.');return x;};
 class Pair{
  constructor(data,metadata,N,H){this.N=N;this.g=N.topology(data);this.other=N.topology(data);this.history=new H.Model(data,metadata);this.adj=Array.from({length:9000},()=>new Set());for(const[a,b]of this.g.edges){this.adj[a].add(b);this.adj[b].add(a);}this.prepare(0,16);}
  prepare(a,b){address(a);address(b);this.prepared=[a,b];this.a=a;this.b=b;this.steps=[0,0];this.actions=[];this.records=[];}
  snapshot(){return {A:this.history.at(this.a),B:this.history.at(this.b),steps:this.steps.slice(),adjacent:this.adj[this.a].has(this.b),coLocated:this.a===this.b,nativeCouplingEvents:0};}
  step(operator){if(!['A','B','both'].includes(operator))throw Error('Unknown native operator.');if(this.actions.length>=500)throw Error('500-step limit reached. Export and prepare a fresh run.');const before=[this.a,this.b];if(operator!=='B'){this.a=this.g.F[this.a];this.steps[0]++;}if(operator!=='A'){this.b=this.other.F[this.b];this.steps[1]++;}this.actions.push({operator,before,after:[this.a,this.b]});return this.snapshot();}
  record(){if(this.records.length>=100)throw Error('100-observation limit reached.');this.records.push({sequence:this.records.length+1,afterAction:this.actions.length,snapshot:this.snapshot()});return this.records.length;}
  export(){return clone({prepared:this.prepared,actions:this.actions,snapshot:this.snapshot(),observations:this.records});}
 }
 class Joint008{
  constructor(data){this.data=clone(data);const {history,terms}=this.data;if(history.length!==31||terms.length!==25)throw Error('Invalid declared model.');
   const key=s=>s.join(':'),indices=new Map(history.map((s,i)=>[key(s),i]));if(indices.size!==31)throw Error('Duplicate joint state.');
   // Discover transitions from the GLOBAL local rules, not a projected chain.
   const seen=new Set([key(history[0])]),queue=[history[0]];let links=0;
   for(let i=0;i<queue.length;i++){const state=queue[i],j=indices.get(key(state));if(j===undefined)throw Error('Model leaks outside certified component.');let diagonal=0;const targets=[];
    for(const term of terms){const {x,y,a2,b2}=term;let target=null,weight=0;
     if(term.kind==='pair'){if(state[0]===x&&state[1]===x){target=[y,y];weight=a2;}else if(state[0]===y&&state[1]===y){target=[x,x];weight=b2;}}
     else if((term.witness_at===null||state[1]===term.witness_at)&&!term.witness_absent.includes(state[1])){if(state[0]===x){target=[y,state[1]];weight=a2;}else if(state[0]===y){target=[x,state[1]];weight=b2;}}
     if(target){diagonal+=weight;const k=indices.get(key(target));if(k===undefined||Math.abs(k-j)!==1||a2*b2!==(Math.min(j,k)+1)*(30-Math.min(j,k)))throw Error('Uncertified joint link.');targets.push(k);if(!seen.has(key(target))){seen.add(key(target));queue.push(target);}}
    }
    if(diagonal!==30||targets.length!==(j===0||j===30?1:2)||new Set(targets).size!==targets.length)throw Error('Uncertified joint generator.');links+=targets.length;
   }
   if(seen.size!==31||links!==60)throw Error('Joint component closure failed.');
  }
  sample(t){if(!Number.isFinite(t)||t<0||t>2)throw Error('Choose normalized time from 0 to 2T.');let weights;
   if(t===0||t===2)weights=Array.from({length:31},(_,j)=>+(j===0));else if(t===1)weights=Array.from({length:31},(_,j)=>+(j===30));else{const p=Math.sin(Math.PI*t/2)**2,q=Math.cos(Math.PI*t/2)**2;let choose=1;weights=Array.from({length:31},(_,j)=>{if(j)choose=choose*(31-j)/j;return choose*p**j*q**(30-j);});}
   const sum=(fn)=>weights.reduce((s,w,j)=>s+(fn(this.data.history[j])?w:0),0);
   return {status:'Experimental',model:'Encounter Witness008',timeOverT:t,weights,totalNorm:weights.reduce((s,w)=>s+w,0),probeHome:sum(s=>s[0]===7),witnessReady:sum(s=>s[1]===0),witnessWritten:sum(s=>s[1]===488),energyOverKappa:7.5,dominantJointState:this.data.history[weights.indexOf(Math.max(...weights))].slice(),nativeCouplingEvents:0};
  }
 }
 function validateSettings(s){if(!s||!['entities','projections'].includes(s.view)||typeof s.experimental!=='boolean')throw Error('Invalid automaton settings.');address(s.a);address(s.b);return s;}
 return {Pair,Joint008,validateSettings};
})();
if(typeof module!=='undefined')module.exports=G9000Automaton;
