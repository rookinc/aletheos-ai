#!/usr/bin/env python3
"""Build and package the reviewed static release; never deploy or access a host."""
from pathlib import Path
import hashlib, json, re, subprocess, zipfile

ROOT = Path(__file__).resolve().parents[1]
RELEASE = ROOT.parent/'encounter-v12'
AUDITS = ROOT/'provenance/encounter-001'
sha = lambda b: hashlib.sha256(b).hexdigest()
regression = json.loads((AUDITS/'orthogonal_observatory_v12_regression_001.json').read_text())
assert regression['verdict'] == 'LOCAL_REGRESSIONS_PASS_PRODUCTION_ATTESTATION_PENDING'
browser = json.loads((AUDITS/'browser-checks.json').read_text())
for name, expected in browser['ui_source_sha256'].items():
    assert sha((ROOT/name).read_bytes()) == expected, f'Stale browser receipt: {name}'
subprocess.run(['python3', 'build.py'], cwd=ROOT, check=True)
html = (ROOT/'dist/index.html').read_bytes()
digest = sha(html)
(RELEASE/'index.html').write_bytes(html)
(ROOT.parents[1]/'public_html/observatories/thalean-orthogonal/index.html').write_bytes(html)
for name in ['server.sh', 'deploy.sh']:
    p = RELEASE/name
    updated, count = re.subn(r'^expected=[0-9a-f]{64}$', 'expected='+digest, p.read_text(), flags=re.M)
    assert count == 1
    p.write_text(updated)
source_files = sorted([*ROOT.glob('src/*'), *ROOT.glob('scripts/*'), *ROOT.glob('test*.cjs'), ROOT/'build.py'])
info = {
    'release': 'Thalean Orthogonal Observatory v1.2 — Encounter Lab',
    'repository': 'rookinc/aletheos-ai', 'branch': 'thalean-orthogonal-encounter-v12',
    'base_commit': '9a1a659e8f6b1e4d83212271b7840788d1f3aa19',
    'previous_html_sha256': 'ebe248b6724f3e2727004b126b1b78f4bc6abb2670b830a4ce7a8406d573b44f',
    'html_sha256': digest, 'html_bytes': len(html),
    'source_files_sha256': {p.relative_to(ROOT).as_posix(): sha(p.read_bytes()) for p in source_files if p.is_file()},
    'production_deployed': False, 'ready_for_production': False,
    'deployment_gates': ['Compare actual production bytes with the recovered prior hash.',
                         'Review the development diff and audits.', 'Use working owner host access.'],
    'rebuild': 'python3 scripts/prepare-encounter-release.py',
    'rollback': 'bash deploy.sh rollback, after reviewed installation; guarded exact-byte restore',
}
(RELEASE/'release.json').write_text(json.dumps(info, indent=2)+'\n')
names = ['README.md', 'TERMUX.md', 'index.html', 'server.sh', 'deploy.sh', 'test-deploy.py', 'release.json']
(RELEASE/'SHA256SUMS').write_text(''.join(sha((RELEASE/name).read_bytes())+'  '+name+'\n' for name in names))
subprocess.run(['python3', str(RELEASE/'test-deploy.py'), '--previous', str(ROOT.parent/'paired-sheet-history-017v/index.html'),
                '--output', str(AUDITS/'deployment-checks.json')], check=True)
subprocess.run(['sha256sum', '-c', 'SHA256SUMS'], cwd=RELEASE, check=True)
archive = ROOT.parent/'orthogonal-encounter-v12.zip'
with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_DEFLATED) as z:
    for name in [*names, 'SHA256SUMS']:
        info = zipfile.ZipInfo(name, date_time=(2026, 11, 14, 0, 0, 0))
        info.external_attr = (0o100755 if name.endswith('.sh') else 0o100644) << 16
        info.compress_type = zipfile.ZIP_DEFLATED
        z.writestr(info, (RELEASE/name).read_bytes())
archive.with_suffix('.zip.sha256').write_text(sha(archive.read_bytes())+'  '+archive.name+'\n')
print(json.dumps({'prepared': True, 'html_sha256': digest, 'archive_sha256': sha(archive.read_bytes()), 'deployed': False}))
