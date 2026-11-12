"""Verify the Site base carrier against an extracted013source or its sealedZIP."""
import argparse,json,hashlib,zipfile
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('audit',type=Path,help='THALEAN-NATIVE-LOOP-ENVELOPE-013 ZIP or extracted directory');a=p.parse_args();root=Path(__file__).resolve().parents[2]/"public_html/observatories/g9000"
if a.audit.is_dir():
 def read(name):return(a.audit/'sources'/name).read_bytes()
else:
 z=zipfile.ZipFile(a.audit);prefix=next(n[:-len('sources/native_fixture.json')] for n in z.namelist() if n.endswith('sources/native_fixture.json'))
 def read(name):return z.read(prefix+'sources/'+name)
f=json.loads(read('native_fixture.json'));d=json.loads(read('native_lift_data_009.json'));n=json.loads((root/'native/native.json').read_text());raw=(root/'native-model.js').read_text();D=json.loads(raw[len('window.NATIVE_MODEL='):].strip().removesuffix(';'))
assert n['source']==f['source'];assert sorted(n['edges'])==sorted(f['edges']);assert all(n['deck'][k]==f['deck'][k] for k in('a','b','ab'));assert D['turn']==f['turns']['a'];assert D['pairs1800']==[list(divmod(v,60)) for v in d['pair_representatives']];assert sorted(D['edges1800X']+D['edges1800Y'])==sorted(v['edge'] for v in d['internal_cochains'])
print('PASS: identical indexed G9000 base carrier, including source, deck, pair representatives, internal edges and selected turn. Four-sheet receipts remain a separate cover.')
