#!/usr/bin/env python3
"""Derive display coordinates from pinned native pair and quotient evidence.

Example:
 python scripts/generate-paired-history.py --native-source native.json \
   --cover-certificate 017o.json --paired-certificate 017s.json
Original files are read only; only the named output is written.
"""
from pathlib import Path
import argparse, hashlib, json

ROOT = Path(__file__).resolve().parents[1]
def load(p): return json.loads(p.read_text())
def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--native-source', type=Path, required=True)
    parser.add_argument('--cover-certificate', type=Path, required=True)
    parser.add_argument('--paired-certificate', type=Path, required=True)
    parser.add_argument('--native-data', type=Path, default=ROOT/'src/native-data.json')
    parser.add_argument('--output', type=Path, default=ROOT/'src/paired-history-data.json')
    args = parser.parse_args()
    native, cover, paired, data = map(load, [args.native_source, args.cover_certificate, args.paired_certificate, args.native_data])
    assert cover['verification_pass'] and paired['verification_pass']
    q = cover['G60_to_admitted_G15']
    decks = [native['deck'][name] for name in ['identity', 'a', 'b', 'ab']]
    frames = [[p[min(v for v in range(60) if q[v] == u)] for p in decks] for u in range(15)]
    assert frames == [cover['fiber_frames'][str(u)] for u in range(15)]
    sheet = {v: s for vs in frames for s, v in enumerate(vs)}
    base, relative, hidden = [], [], []
    for i, reps in enumerate(data['pairing']['representatives']):
        coordinates = []
        for z in reps:
            u, v = divmod(z, 60)
            coordinates.append((q[u]*15+q[v], sheet[u]^sheet[v], sheet[v]//2))
        assert len(set(coordinates)) == 1, ('not diagonal-a invariant', i)
        bb, rr, zz = coordinates[0]
        base.append(bb); relative.append(rr); hidden.append(zz)
        expected = paired['G1800_coordinates'][i]
        h = expected['sheet']
        assert expected['base'] == bb and expected['G900'] == data['quotient']['projection'][i]
        assert rr == ((h&1) | ((((h>>1)^(h>>2))&1)<<1)) and zz == (h>>2)
    output = {
        'schema': 'thalean-paired-history-1',
        'source': {
            'repository': 'rookinc/aletheos-ai',
            'baselineCommit': '7abb1c6681879db06a292952d0fc4b0440c206de',
            'auditIds': ['017O', '017S', '017T'],
            'sha256': {
                'native-data.json': digest(args.native_data),
                'native.json': digest(args.native_source),
                '017o.json': digest(args.cover_certificate),
                '017s.json': digest(args.paired_certificate)
            }
        },
        'indexConvention': 'Native state and quotient labels are zero-based indices; cycle selection is displayed one-based.',
        'frameConvention': 'At each admitted G15 vertex, root the G60 fiber at its least native index; label [root,a(root),b(root),ab(root)] as [1,a,b,ab]. Relative sheet is s XOR t. Hidden bit is the b coordinate of the second native sheet. Bit values depend on this frame; return equality does not.',
        'sheetNames': ['1', 'a', 'b', 'ab'],
        'g60ToAdmitted': q,
        'fiberFrames': frames,
        'deck': dict(zip(['1', 'a', 'b', 'ab'], decks)),
        'base1800': base,
        'relative1800': relative,
        'hidden1800': hidden
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(output, separators=(',', ':'))+'\n')
    print('Generated 1,800 paired coordinates:', args.output.name, digest(args.output))

if __name__ == '__main__': main()
