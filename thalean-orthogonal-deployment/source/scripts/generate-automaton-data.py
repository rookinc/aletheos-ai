#!/usr/bin/env python3
"""Package the pinned008 local program; retain its separate registration."""
from pathlib import Path
import argparse,hashlib,json
ROOT=Path(__file__).resolve().parents[1]
ap=argparse.ArgumentParser();ap.add_argument('--model',type=Path,required=True);args=ap.parse_args()
raw=args.model.read_bytes();m=json.loads(raw)
assert hashlib.sha256(raw).hexdigest()=='7351c309e0d4f4fefe35c06bfc86cd8fd91074b8fa91e2af51fe3d8e63ae2fe3','Unrecognized sealed008 model data'
assert len(m['history'])==31 and len(m['terms'])==25
assert m['history'][0]==[7,0] and m['history'][-1]==[7,488]
provenance={'audit':'G9000_ENCOUNTER_WITNESS_008','registration':'Reciprocal diagonal-b quotient; distinct from observatory diagonal-a','model_data_sha256':hashlib.sha256(raw).hexdigest(),'containing010_archive_sha256':'509e639c915c22c4bfa95af3adcf74998e887886cb65cad54c448d08879d5852','certificate':'provenance/two-entity-field-001/008-certificate.json','independent':'provenance/two-entity-field-001/008-independent.json','status':'Experimental','assumptions':['Correlated joint configuration field, not independent role fields or a derived ambient field on one G9000.','25 selected positive local terms and their coefficients.','Fixed source reference0; no source backreaction.','No physical clock, detector probability or permanent memory.']}
out={'history':m['history'],'terms':m['terms'],'provenance':provenance,'native_provenance':{name:hashlib.sha256((ROOT/'src'/name).read_bytes()).hexdigest() for name in ['native-data.json','native-model.js','paired-history-data.json']}}
(ROOT/'src/automaton-joint-data.json').write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps({'history':31,'terms':25,**provenance}))
