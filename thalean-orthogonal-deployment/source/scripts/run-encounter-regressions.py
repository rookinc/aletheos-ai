#!/usr/bin/env python3
"""Execute local regressions; consume separately recorded browser/research evidence.

Browser receipts are not rerun by this script. Their tested UI hashes must match.
Research replays: python3 scripts/replay-research.py --inputs ARCHIVE_DIRECTORY.
"""
from pathlib import Path
import hashlib, json, subprocess

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT/'provenance/encounter-001'
sha = lambda b: hashlib.sha256(b).hexdigest()
commands = [
    ['python3', 'scripts/verify-source-recovery.py'],
    ['node', 'test.cjs'],
    ['node', 'test-inverse.cjs'],
    ['node', 'test-paired-history.cjs'],
    ['node', 'test-paired-history-panel.cjs'],
    ['node', 'scripts/audit-encounter.cjs'],
    ['node', 'test-encounter-app.cjs'],
    ['node', 'scripts/replay-encounter.cjs', 'provenance/encounter-001/example-replay.json'],
    ['node', 'scripts/replay-encounter.cjs', 'provenance/encounter-001/browser-replay.json'],
    ['node', 'test-encounter-replay.cjs'],
    ['python3', '../encounter-v12/test-deploy.py', '--previous', '../paired-sheet-history-017v/index.html', '--output', 'provenance/encounter-001/deployment-checks.json'],
]
receipts = []
for i, command in enumerate(commands):
    result = subprocess.run(command, cwd=ROOT, capture_output=True, text=True, timeout=600)
    log = f'regression-{i+1:02}.txt'
    (OUT/log).write_text(result.stdout+result.stderr)
    receipts.append({'command': command, 'exit': result.returncode, 'log': log})
    print(f'{result.returncode}: {" ".join(command)}', flush=True)
    if result.returncode:
        raise SystemExit(f'FAILED; see {log}')

browser = json.loads((OUT/'browser-checks.json').read_text())
assert browser['pass'] and not browser['application_errors']
for name, expected in browser['ui_source_sha256'].items():
    assert sha((ROOT/name).read_bytes()) == expected, f'Browser receipt is stale: {name}'
bridge = json.loads((OUT/'orthogonal_six_channel_bridge_audit_001.json').read_text())
for receipt in bridge['replay_receipts']:
    assert receipt['exit'] == 0
    assert sha((OUT/receipt['log']).read_bytes()) == receipt['log_sha256']
source = json.loads((OUT/'orthogonal_observatory_source_recovery_001.json').read_text())
native = json.loads((OUT/'native-checks.json').read_text())
app = json.loads((OUT/'app-regression.json').read_text())
deploy = json.loads((OUT/'deployment-checks.json').read_text())
report = {
    'audit': 'orthogonal_observatory_v12_regression_001', 'status': 'Certified derived',
    'verdict': 'LOCAL_REGRESSIONS_PASS_PRODUCTION_ATTESTATION_PENDING',
    'producer': 'python3 scripts/run-encounter-regressions.py',
    'input_provenance': {'repository': source['repository'], 'base_commit': source['base_commit'],
                         'baseline_input_hashes': source['input_hashes'], 'browser_ui_hashes': browser['ui_source_sha256']},
    'commands': receipts, 'native_suite_count': len(native['checks']),
    'equal_continuation_tests': native['allContinuationChecks'],
    'app_regression': app, 'deployment_safety_checks': deploy['checks'],
    'browser_checks': browser['checks'], 'browser_application_errors': 0,
    'negative_controls': ['Geometric overlap causes zero coupling events.', 'Single visible copy produces no cross-copy candidate.',
                          'Tampered replay and invalid settings are rejected.', 'Observation and experimental inspection do not change live Plant trajectories.',
                          'Unknown production page, bad upload and conflicting backup are refused.'],
    'changed_file_review': 'Reviewed app integration, detector definitions, immutable observation records, replay verifier and guarded installer. Native carrier and history producers are hash-identical to baseline.',
    'failures': [], 'production_deployed': False,
    'release_ready': False,
    'boundaries': ['Local baseline, model, controller, browser and installer checks passed; this is not live production attestation.',
                   'Browser receipt covers desktop Chrome and 360x740/390x844 viewport layout; physical Android device testing is outstanding.',
                   'Browser interactions were executed through CUA, separately from this command; no fabricated headless-browser pass is asserted.',
                   'HTTP 406 prevented live-source comparison. Owner host access and review of the release diff remain deployment gates.',
                   'Research replay receipts are verified here; use replay-research.py to regenerate them from the pinned source packages.'],
}
(OUT/(report['audit']+'.json')).write_text(json.dumps(report, indent=2)+'\n')
evidence = {key: json.loads((OUT/(name+'.json')).read_text()) for key, name in [
    ('source', 'orthogonal_observatory_source_recovery_001'), ('baseline', 'orthogonal_observatory_native_baseline_001'),
    ('detector', 'orthogonal_encounter_detector_001'), ('witness', 'orthogonal_registered_witness_001'),
    ('memory', 'g9000_native_operational_memory_audit_001'), ('bridge', 'orthogonal_six_channel_bridge_audit_001'),
    ('regression', 'orthogonal_observatory_v12_regression_001')]}
(ROOT/'src/encounter-evidence.json').write_text(json.dumps(evidence, indent=2)+'\n')
print(json.dumps({'pass': True, 'commands': len(receipts), 'browser_receipt_current': True, 'production_deployed': False}))
