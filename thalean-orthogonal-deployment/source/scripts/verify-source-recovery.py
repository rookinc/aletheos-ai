#!/usr/bin/env python3
"""Rebuild the recovered Git baseline without changing the development checkout."""
from pathlib import Path
import hashlib, json, subprocess, tempfile

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'provenance/encounter-001'
report = json.loads((OUT/'orthogonal_observatory_source_recovery_001.json').read_text())
repo = Path(subprocess.check_output(['git', 'rev-parse', '--show-toplevel'], cwd=ROOT, text=True).strip())
prefix = ROOT.relative_to(repo).as_posix()
base = report['base_commit']
sha = lambda b: hashlib.sha256(b).hexdigest()

def blob(path):
    return subprocess.check_output(['git', 'show', f'{base}:{path}'], cwd=repo)

for name, expected in report['input_hashes'].items():
    assert sha(blob(f'{prefix}/{name}')) == expected, name
entry = blob(report['entry_point'])
assert sha(entry) == report['baseline_html_sha256']
with tempfile.TemporaryDirectory(prefix='orthogonal-baseline-') as temporary:
    target = Path(temporary)
    files = subprocess.check_output(['git', 'ls-tree', '-r', '--name-only', base, '--', prefix], cwd=repo, text=True).splitlines()
    for name in files:
        relative = Path(name).relative_to(prefix)
        if relative.as_posix() == 'build.py' or relative.parts[0] == 'src':
            p = target/relative
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_bytes(blob(name))
    subprocess.run(['python3', 'build.py'], cwd=target, check=True)
    assert (target/'dist/index.html').read_bytes() == entry
result = {'pass': True, 'base_commit': base, 'baseline_build_equals_tracked_entry': True,
          'input_hashes_verified': len(report['input_hashes']), 'baseline_sha256': sha(entry),
          'live_bytes_verified': False, 'boundary': 'Git baseline verified; HTTP 406 prevented live-byte attestation.'}
(OUT/'source-recovery-checks.json').write_text(json.dumps(result, indent=2)+'\n')
print(json.dumps(result))
