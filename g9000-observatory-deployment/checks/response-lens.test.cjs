const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const R=require('../../public_html/observatories/g9000/response-lens.js');
function source(){
 if(process.env.RESPONSE_LENS_DATA)return JSON.parse(fs.readFileSync(process.env.RESPONSE_LENS_DATA,'utf8'));
 const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../../public_html/observatories/g9000/research-data.js'),'utf8'),context);return JSON.parse(JSON.stringify(context.window.RESEARCH_DATA));
}
const data=source(),m=R.model(data);
// Sum original coefficient strings independently of display conversion.
function gcd(a,b){while(b){const r=a%b;a=b;b=r;}return a;}
function plus(a,s){let[n,d]=String(s).split('/').map(BigInt);d=d??1n;const num=a[0]*d+n*a[1],den=a[1]*d,g=gcd(num<0n?-num:num,den);return[num/g,den/g];}
test('Exact certificate channel weights normalize to one in Q(sqrt5)',()=>{
 for(const field of ['sum_channel_weight','difference_channel_weight']){let a=[0n,1n],b=[0n,1n];for(const row of data.response_spectrum.weights){a=plus(a,row[field][0]);b=plus(b,row[field][1]);}assert.deepEqual(a,[1n,1n]);assert.deepEqual(b,[0n,1n]);}
});
test('Eight positive energies per channel form a twelve-energy union with distinct first levels',()=>{
 assert.equal(m.rows.length,12);assert.deepEqual(m.counts,{sum:8,difference:8});assert.equal(m.first.sum.energyLabel,'4');assert.equal(m.first.difference.energyLabel,'2');assert.equal(m.rows.filter(r=>r.sumActive&&r.differenceActive).length,4);assert.equal(m.rows.filter(r=>!r.sumActive&&!r.differenceActive).length,0);
});
test('The first difference response retains exact4/9 while sum cancels at the same energy',()=>{
 const r=m.rows.find(r=>r.key==='2|0');assert.equal(R.exact(r.difference),'4/9');assert.equal(R.exact(r.sum),'0');assert.equal(r.sumActive,false);assert.equal(r.differenceActive,true);assert.ok(Math.abs(r.differenceValue-4/9)<1e-15);
});
test('Exact radical labels preserve signs and are separate from approximate positions',()=>{
 const low=m.rows.find(r=>r.key==='5|-1'),high=m.rows.find(r=>r.key==='9|1');assert.equal(low.energyLabel,'5 − √5');assert.equal(R.exact(low.difference),'1/25 + √5/75');assert.equal(high.energyLabel,'9 + √5');assert.equal(R.exact(high.sum),'1/25 − √5/75');assert.ok(low.energyValue<3);assert.ok(high.energyValue>11);assert.equal(R.sign(R.pair(['1/5','-2/25'])),1);assert.equal(R.sign(R.pair(['-1/5','2/25'])),-1);
});
test('L-only response dimensions stay16versus72regardless of envelope/F data',()=>{
 const x=JSON.parse(JSON.stringify(data));x.envelope.frozen_control_envelope_dimension=280;x.envelope.total_complex_dimension=120;const n=R.model(x);assert.equal(n.nativeDimension,16);assert.equal(n.controlDimension,72);assert.equal(n.rows.length,12);
});
test('Malformed or unnormalized certificate data fails visibly instead of fitting a spectrum',()=>{
 const x=JSON.parse(JSON.stringify(data));x.response_spectrum.weights[0].difference_channel_weight=['1/9','0'];assert.throws(()=>R.model(x),/total exact weight one/);assert.throws(()=>R.pair(['1/0','0']),/Zero denominator/);assert.throws(()=>R.pair(['alert(1)','0']),/Invalid exact rational/);
});

test('Source row order does not change exact energy ordering or initial-channel claims',()=>{
 const x=JSON.parse(JSON.stringify(data));x.response_spectrum.weights.reverse();const n=R.model(x);assert.equal(n.first.sum.energyLabel,'4');assert.equal(n.first.difference.energyLabel,'2');assert.deepEqual(n.rows.map(r=>r.energyLabel),m.rows.map(r=>r.energyLabel));n.rows.forEach((r,i)=>assert.equal(r.index,i));
});

test('Narrow spectrum enlarges readable coordinates without losing energies or exact zero markers',()=>{
 const state={channel:'both',selected:0},phone=R.renderSpectrum(m,state,300),desktop=R.renderSpectrum(m,state,900);assert.match(phone,/viewBox="0 0 420 280"/);assert.match(desktop,/viewBox="0 0 864 300"/);for(const svg of[phone,desktop]){assert.equal((svg.match(/data-rl-peak=/g)||[]).length,24);assert.equal((svg.match(/ is-zero/g)||[]).length,8);}assert.ok(12*300/420>=8);
});
