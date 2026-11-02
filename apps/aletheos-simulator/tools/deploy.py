#!/usr/bin/env python3
"""On-host reversible dev-only handoff. Never changes DNS or unrelated files."""
import argparse,hashlib,json,shutil,os
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--document-root',type=Path,required=True);p.add_argument('--backup-dir',type=Path,required=True);p.add_argument('--apply',action='store_true');a=p.parse_args()
R=Path(__file__).resolve().parents[1];root=a.document_root;dest=root/'aletheos';backup=a.backup_dir
if not root.is_absolute() or not root.is_dir() or root.is_symlink():p.error('Use the verified real dev.rook.ca document root')
if not backup.is_absolute() or backup.exists() or backup.is_relative_to(root):p.error('Backup must be a new absolute directory outside the web root')
if dest.is_symlink() or not dest.is_dir():p.error('Expected existing real aletheos directory')
expected=json.loads((R/'webroot/release.json').read_text())['baseline_sha256']
for name in ['index.html','release.json']:
 if not (dest/name).is_file() or (dest/name).is_symlink():p.error('Expected ordinary baseline '+name)
actual=hashlib.sha256((dest/'index.html').read_bytes()).hexdigest()
if actual!=expected:p.error('Live baseline changed; refuse replacement and reconcile first')
if (dest/'native').exists():p.error('Existing native directory; refuse overwrite')
print('Baseline verified. Planned changes: index.html, release.json, new native/ only. Backup:',backup)
if not a.apply:print('Dry run only. Browser verification is required before using --apply.');raise SystemExit()
backup.mkdir(parents=True)
for name in ['index.html','release.json']:shutil.copy2(dest/name,backup/name)
# New assets first; replace entrypoint last. Backups are retained outside web root.
shutil.copytree(R/'webroot/native',dest/'native')
for name in ['release.json','index.html']:
 tmp=dest/(name+'.native-001-staged');shutil.copy2(R/'webroot'/name,tmp);os.replace(tmp,dest/name)
print('Installed. Verify HTTPS, hashes and browser tests. Rollback: restore both backup files; leave native assets inert until reviewed.')
