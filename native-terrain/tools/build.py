"""Package v3.1 static assets without replacing the existing observatory.

The archive is deterministic for the same source bytes, Git commit, and dirty
state. Build output establishes file integrity, never deployment/test success.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import pathlib
import shutil
import subprocess
import zipfile

ROOT = pathlib.Path(__file__).resolve().parents[1]
REPO = ROOT.parent


def digest(path: pathlib.Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=pathlib.Path,
                        default=REPO / 'dist' / 'living-geometry-packet')
    args = parser.parse_args()
    dest = args.output.resolve()
    # The builder may clear only its own named packet directory.
    if dest.name != 'living-geometry-packet':
        raise SystemExit('Output directory must be named living-geometry-packet')
    required = ['index.html', 'style.css', 'app.mjs', 'kernel.mjs', 'living.html']
    missing = [name for name in required if not (ROOT / name).is_file()]
    if missing:
        raise SystemExit('Missing required source assets: ' + ', '.join(missing))
    files = {ROOT / name for name in required}
    for pattern in ('living*.mjs', 'living*.html', 'living*.css'):
        files.update(ROOT.glob(pattern))
    files.update((ROOT / 'data').rglob('*.json'))
    if dest.exists():
        shutil.rmtree(dest)
    site = dest / 'site'
    site.mkdir(parents=True)
    for source in sorted(files):
        if source.is_symlink() or not source.is_file():
            raise SystemExit('Unsupported static source: ' + str(source))
        target = site / source.relative_to(ROOT)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, target)
    commit = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=REPO, text=True).strip()
    branch = subprocess.check_output(['git', 'branch', '--show-current'], cwd=REPO, text=True).strip()
    dirty = bool(subprocess.check_output(
        ['git', 'status', '--porcelain', '--untracked-files=normal', '--',
         'native-terrain', 'docs/ALETHEOS-SIM-003-inventory.md'], cwd=REPO, text=True).strip())
    release = {
        'schema': 'aletheos.release-info.v2',
        'source_commit': commit,
        'source_branch': branch or None,
        'source_worktree_dirty': dirty,
        'version': 'Native Terrain v3.1 — Living Geometry',
        'entry_point': 'living.html',
        'preserved_entry_point': 'index.html',
        'deployment': 'not_verified_by_build',
        'tests': 'not_inferred_from_packaging',
        'static_asset_sha256': {str(path.relative_to(site)): digest(path)
                                for path in sorted(site.rglob('*')) if path.is_file()},
    }
    (site / 'release-info.json').write_text(json.dumps(release, indent=2) + '\n')
    manifest = {str(path.relative_to(site)): digest(path)
                for path in sorted(site.rglob('*')) if path.is_file()}
    (site / 'manifest.json').write_text(json.dumps(
        {'schema': 'aletheos.release-manifest.v1', 'files': manifest}, indent=2) + '\n')
    for name in ['README.md', 'RELEASE.md', 'LIVING-README.md', 'LIVING-REPORT.md']:
        if (ROOT / name).is_file():
            shutil.copyfile(ROOT / name, dest / name)
    shutil.copytree(ROOT / 'deployment', dest / 'deployment',
                    ignore=shutil.ignore_patterns('__pycache__', '*.pyc'))
    inventory = REPO / 'docs' / 'ALETHEOS-SIM-003-inventory.md'
    if inventory.is_file():
        shutil.copyfile(inventory, dest / inventory.name)
    archive = dest.parent / 'Aletheos-Native-Terrain-v3.1-Living-Geometry.zip'
    with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as zipped:
        for path in sorted(dest.rglob('*')):
            if path.is_file():
                info = zipfile.ZipInfo(str(path.relative_to(dest)), date_time=(2026, 1, 1, 0, 0, 0))
                info.compress_type = zipfile.ZIP_DEFLATED
                info.external_attr = 0o100644 << 16
                zipped.writestr(info, path.read_bytes())
    archive.with_suffix('.zip.sha256').write_text(digest(archive) + '  ' + archive.name + '\n')
    print(json.dumps({'archive': str(archive), 'site': str(site),
                      'production_files': len(manifest), 'sha256': digest(archive),
                      'source_commit': commit, 'source_worktree_dirty': dirty,
                      'disposition': 'packaged; tests and remote deployment require separate verification'}))


if __name__ == '__main__':
    main()
