import json,hashlib,pathlib,sys
root=pathlib.Path(sys.argv[1] if len(sys.argv)>1 else '.')
m=json.loads((root/'manifest.json').read_text())
expected=set(m['files'])|{'manifest.json'};actual={str(p.relative_to(root)) for p in root.rglob('*') if p.is_file()}
if actual!=expected:raise SystemExit('File inventory mismatch')
for name,digest in m['files'].items():
 p=root/name
 if not p.resolve().is_relative_to(root.resolve()):raise SystemExit('Unsafe manifest path')
 if hashlib.sha256(p.read_bytes()).hexdigest()!=digest:raise SystemExit('Hash mismatch: '+name)
print('PASS: exact production inventory and all SHA-256 hashes')
