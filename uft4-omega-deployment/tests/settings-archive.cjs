'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),cp=require('node:child_process');
const ctx={TextEncoder,TextDecoder,Uint8Array,Uint32Array,ArrayBuffer,DataView,Set,DecompressionStream,ReadableStream};vm.createContext(ctx);
const html=fs.readFileSync(path.join(__dirname,'../../public_html/observatories/uft4-omega/index.html'),'utf8');
const script=html.match(/<script>([\s\S]*)<\/script>/)[1];
vm.runInContext(script,ctx);const A=ctx.UFT4.SettingsArchive;
const json=JSON.stringify({format:'uft4-omega-settings',version:1,camera:{zoom:2.8},label:'Ω / settings'});
const fixture=(entries,descriptor=false)=>new Uint8Array(cp.execFileSync('python3',['-c',`
import io,zipfile,json,sys
config=json.load(sys.stdin)
class Sink(io.BytesIO):
 def seekable(self): return False
 def seek(self,*a): raise io.UnsupportedOperation()
b=Sink() if config['descriptor'] else io.BytesIO()
with zipfile.ZipFile(b,'w') as z:
 for name,text,method in config['entries']:
  z.writestr(name,text,compress_type=method)
sys.stdout.buffer.write(b.getvalue())
`],{input:JSON.stringify({entries,descriptor})}));
const clone=x=>new Uint8Array(x),view=x=>new DataView(x.buffer,x.byteOffset,x.byteLength);
const central=x=>view(x).getUint32(x.length-6,true);
let count=0;async function test(name,fn){await fn();count++;console.log('PASS '+name);}
(async()=>{
 await test('Stored export round trips Unicode and is readable by ordinary Python ZIP tooling',async()=>{
  const zip=A.zip(json);assert.equal(await A.unzip(zip),json);
  const output=cp.execFileSync('python3',['-c',"import io,zipfile,sys;z=zipfile.ZipFile(io.BytesIO(sys.stdin.buffer.read()));assert z.namelist()==['uft4-omega-settings.json'];assert z.getinfo(z.namelist()[0]).compress_type==0;sys.stdout.buffer.write(z.read(z.namelist()[0]))"],{input:zip});assert.equal(output.toString(),json);
  assert.equal(await A.unzip(zip.buffer),json);
 });
 await test('Imports ordinary deflate ZIPs with paths and harmless companion files',async()=>{
  assert.equal(await A.unzip(fixture([['folder/', '',0],['folder/settings.json',json,8],['README.txt','Open settings.json in UFT4.',8]])),json);
 });
 await test('Imports streaming ZIP data descriptors for stored and deflate files',async()=>{
  for(const method of [0,8])assert.equal(await A.unzip(fixture([['settings.json',json,method]],true)),json);
 });
 await test('Rejects ambiguous, missing and excessive entry sets',async()=>{
  await assert.rejects(A.unzip(fixture([['a.json',json,0],['b.JSON',json,8]])),/exactly one/);
  await assert.rejects(A.unzip(fixture([['note.txt','plain',0]])),/exactly one/);
  await assert.rejects(A.unzip(fixture(Array.from({length:17},(_,i)=>[i+'.json',json,0]))),/1 to 16/);
 });
 await test('Enforces compressed and inflated resource budgets before decoding',async()=>{
  assert.throws(()=>A.zip('x'.repeat(A.MAX_JSON+1)),/256 KiB/);
  await assert.rejects(A.unzip(new Uint8Array(A.MAX_ARCHIVE+1)),/1 MiB/);
  await assert.rejects(A.unzip(fixture([['settings.json','x'.repeat(A.MAX_JSON+1),8]])),/256 KiB/);
 });
 await test('Bounds actual inflate output even when archive sizes lie',async()=>{
  const zip=fixture([['settings.json','x'.repeat(A.MAX_JSON+10000),8]]),v=view(zip),c=central(zip);v.setUint32(22,8,true);v.setUint32(c+24,8,true);
  await assert.rejects(A.unzip(zip),/Decompressed settings exceed/);
 });
 await test('Rejects corrupt CRC, truncated archives and invalid UTF-8',async()=>{
  const zip=A.zip(json),bad=clone(zip);bad[30+view(bad).getUint16(26,true)]^=1;await assert.rejects(A.unzip(bad),/integrity/);
  await assert.rejects(A.unzip(zip.subarray(0,zip.length-1)),/end record/);
  const utf=A.zip('a'),v=view(utf),c=central(utf),start=30+v.getUint16(26,true);utf[start]=0xff;const crc=A.crc32(utf.subarray(start,start+1));v.setUint32(14,crc,true);v.setUint32(c+16,crc,true);await assert.rejects(A.unzip(utf),/UTF-8/);
 });
 await test('Rejects local/central disagreements and invalid descriptors',async()=>{
  for(const offset of [6,8,14,18,22,30]){const zip=A.zip(json);zip[offset]^=1;await assert.rejects(A.unzip(zip),/disagree/);}
  const zip=fixture([['settings.json',json,8]],true),v=view(zip),c=central(zip);zip[c-1]^=1;await assert.rejects(A.unzip(zip),/descriptor/);
 });
 await test('Rejects encryption, unsupported compression, ZIP64 and multi-disk records',async()=>{
  const zip=A.zip(json),c=central(zip);
  for(const [offset,value] of [[c+8,0x801],[c+10,12],[c+6,45],[c+34,1],[zip.length-18,1]]){const bad=clone(zip);view(bad).setUint16(offset,value,true);await assert.rejects(A.unzip(bad),/Encrypted|stored or deflate|ZIP64|Multi-disk/);}
  const bad=clone(zip);view(bad).setUint32(c+24,0xffffffff,true);await assert.rejects(A.unzip(bad),/ZIP64/);
 });
 await test('Rejects corrupt central bounds and overlapping/duplicate local records',async()=>{
  const zip=A.zip(json),bad=clone(zip);view(bad).setUint32(bad.length-6,1,true);await assert.rejects(A.unzip(bad),/malformed/);
  const dup=fixture([['a.json',json,0],['b.txt','note',0]]),v=view(dup),c=central(dup),next=c+46+v.getUint16(c+28,true)+v.getUint16(c+30,true)+v.getUint16(c+32,true);v.setUint32(next+42,0,true);await assert.rejects(A.unzip(dup),/disagree/);
 });
 await test('Compressed imports explain the fallback when raw inflate is unavailable',async()=>{
  const ds=ctx.DecompressionStream;ctx.DecompressionStream=undefined;
  try{await assert.rejects(A.unzip(fixture([['settings.json',json,8]])),/extracted JSON/);assert.equal(await A.unzip(A.zip(json)),json);}finally{ctx.DecompressionStream=ds;}
 });
 await test('Zero-length settings content is decoded without crashes',async()=>{assert.equal(await A.unzip(A.zip('')),'');});
 console.log(`${count}/12 settings archive checks passed`);
})().catch(error=>{console.error(error);process.exitCode=1;});
