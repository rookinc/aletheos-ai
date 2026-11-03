#!/usr/bin/env python3
"""Validate the actual shipped graph, compressed fields and energy ledger."""
import array,base64,collections,gzip,hashlib,json,math,re,sys
from pathlib import Path
root=Path(__file__).resolve().parents[2]
page=root/'public_html/observatories/water/discharge/index.html'
s=page.read_text();data=json.loads(re.search(r'<script id="water-data"[^>]*>(.*?)</script>',s,re.S)[1])
assert hashlib.sha256(page.read_bytes()).hexdigest()==(root/'water-discharge-deployment/release.sha256').read_text().strip()
for key,n,degree in [('edges60',60,4),('edges900',900,8),('edges9000',9000,10)]:
 edges=data[key];assert len(edges)==n*degree//2 and len({tuple(e) for e in edges})==len(edges)
 counts=collections.Counter(v for edge in edges for v in edge)
 assert set(counts)==set(range(n)) and set(counts.values())=={degree}
 assert all(0<=a<b<n for a,b in edges)
F=data['F'];pi=data['pi'];assert len(F)==9000 and sorted(F)==list(range(9000))
assert set(collections.Counter(pi).values())=={10} and len(set(pi))==900
seen=set();cycles=0
for start in range(9000):
 if start in seen:continue
 cycle=[];v=start
 while v not in seen:seen.add(v);cycle.append(v);v=F[v]
 assert v==start and len(cycle)==20
 assert all(pi[cycle[i]]==pi[cycle[(i+10)%20]] for i in range(20));cycles+=1
assert cycles==450
assert len(data['positions60'])==60 and len(data['mode60'])==60
assert abs(sum(v*v for v in data['mode60'])-1)<1e-10
assert set(collections.Counter(data['anchors900']).values())=={15}
for name,run in data['runs'].items():
 decoded={}
 for key,n in [('q',9000),('h',900),('chi',9000)]:
  spec=run[key];assert spec['width']==n
  a=array.array('h',gzip.decompress(base64.b64decode(spec['gzip'])))
  if sys.byteorder!='little':a.byteswap()
  assert len(a)==201*n
  assert spec['max_error']<=spec['scale']/65534+1e-14
  decoded[key]=a
 # Sample every 20th state and all 9000 coordinates: verify q = Jh + chi
 for t in range(0,201,20):
  for i,p in enumerate(pi):
   q=decoded['q'][t*9000+i]*run['q']['scale']/32767
   h=decoded['h'][t*900+p]*run['h']['scale']/32767
   chi=decoded['chi'][t*9000+i]*run['chi']['scale']/32767
   bound=run['q']['max_error']+run['h']['max_error']/math.sqrt(10)+run['chi']['max_error']+1e-12
   assert abs(q-h/math.sqrt(10)-chi)<=bound
 if name=='native_only':assert not any(decoded['chi'])
 rows=data['ledger'][name];assert len(rows)==201
 for i,r in enumerate(rows):
  assert abs(r['time']-i*.2)<1e-12
  assert abs(r['total_energy']-1)<1e-12
  terms=['surface_tension','visible_bulk','visible_kinetic','hidden_bulk','hidden_kinetic','coupling_energy']
  assert min(r[k] for k in terms)>=-1e-15
  assert abs(sum(r[k] for k in terms)-r['total_energy'])<1e-12
assert max(r['hidden_energy'] for r in data['ledger']['native_only'])<1e-25
assert abs(data['ledger']['coupled_release'][-1]['hidden_energy']-.9790647885933741)<1e-12
print('PASS: graph incidence, 450 native F cycles, quotient fibers, 201 decoded fields, q=Jh+chi, full energy ledger, control and release endpoint')
