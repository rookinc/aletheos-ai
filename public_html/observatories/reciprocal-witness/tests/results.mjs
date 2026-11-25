// Write one human-inspectable set of matching benchmark receipts to standard output.
import {paired, fork} from '../paired.js';
import {flux, fixedCut, sag} from '../flux.js';
import {sky} from '../sky.js';
import {heart} from '../heart.js';
let pairedBench=[];
for(const route of ['preserve','swap'])for(const pairs of [1,8]){
  const p=paired({route,pairs});
  pairedBench.push({route,pairs,sites:p.sites,first:p.first,retained:p.retained,return:p.return,cut:p.flux});
}
const outcome={
  schema:'cori.reciprocal-witness/benchmarks-1',
  paired:pairedBench,
  fork:[1,-1].map(reference=>fork({reference})),
  face:{
    phaseOneEighth:['original','both','velocity'].map(control=>{const g=flux({control,phase:.125});return {control,net:g.net,traffic:g.traffic,edges:g.edges};}),
    cycle:flux({phase:.125,mode:'cycle'}),
    fixed:['face7','patch','half'].map(cut=>fixedCut({cut}))
  },
  cmb:[{}, {order:-1},{reference:-1},{order:-1,reference:-1},{averaged:true},{reference:0},{feedback:true}].map(c=>sky(c)),
  exterior:['near','middle','far'].map(cut=>sag({cut,step:4})),
  hearts:[[false,false],[true,false],[true,true]].map(([cue,coupling])=>{
    const r=heart({cue,coupling});
    return {cue,coupling,timing:r.timing,driveID:r.driveId,mark:r.mark,checkpoint:r.checkpoint,return:r.return,later:r.later};
  })
};
process.stdout.write(JSON.stringify(outcome,null,2)+'\n');
