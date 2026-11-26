#!/usr/bin/env python3
"""Apply one accession to the existing Aletheos catalogs; Python standard library."""
import argparse
import hashlib
import json
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
INPUTS = json.loads((HERE / 'catalog-inputs.json').read_text(encoding='utf-8'))
TITLE = 'Reciprocal Witness Observatory'
SLUG = 'reciprocal-witness'
ID = 'cori-0089'
GROUP = 'Geometry and Thalean mechanics'
INSTRUMENT = 'observatories/' + SLUG
RECORD = 'library/records/' + ID
ORIGIN = INPUTS['site']
PUBLIC = ORIGIN + '/' + INSTRUMENT + '/'
GUIDE = PUBLIC + 'field-guide.html'
MAIN = re.compile(r'<main\b[^>]*>.*?</main\s*>', re.I | re.S)
BASES = INPUTS['inputs']


def digest(data):
    return hashlib.sha256(data).hexdigest()


def serialize(value):
    return json.dumps(value, ensure_ascii=False, indent=2) + '\n'


def once(document, old, new):
    if document.count(old) != 1:
        raise ValueError('Expected a unique catalog marker: ' + old[:80])
    return document.replace(old, new, 1)


def record():
    return {'id': ID, 'title': TITLE, 'author': 'Scott Allen Cave · Center of Recursive Inquiry',
            'date': '2026-11-25', 'version': '1.0', 'type': 'Software', 'collection': GROUP,
            'files': [], 'url': PUBLIC, 'field_guide': GUIDE}


def registry(index_sha):
    return {'id': SLUG, 'title': TITLE, 'entrypoint': SLUG + '/index.html',
            'url': PUBLIC, 'artifact_sha256': index_sha, 'research_program': 'Thalean observer mechanics',
            'mathematical_organism': 'TOM-PHY-029 paired cover and documented registers',
            'proof_status': 'finite_replay', 'physical_interpretation_status': 'observational_context_and_simulation',
            'provenance': [ORIGIN + '/' + RECORD + '/', GUIDE],
            'dependencies': ['TOM-PHY-029 paired-port dynamics'], 'certification': None}


def patch_original(path, source, index_sha):
    """Transform a verified original scope once. Callers retain the outside of <main>."""
    if path == 'library/catalog.json':
        records = json.loads(source)
        if any(r['id'] == ID for r in records):
            raise ValueError(f'{ID} is already allocated')
        return serialize([*records, record()])
    if path == 'observatories/registry.json':
        doc = json.loads(source)
        if any(r['id'] == SLUG for r in doc['instruments']):
            raise ValueError('Slug is already registered')
        doc['instruments'].append(registry(index_sha))
        doc['generated_at_utc'] = INPUTS['registry_time']
        return serialize(doc)
    if path == 'library/index.html':
        row = (f'<li data-search="{ID} Scott Allen Cave Center of Recursive Inquiry CoRI" '
               f'data-subject="{GROUP}" data-date="2026-11-25" data-pdf="0">'
               '<time datetime="2026-11-25">25 Nov 2026</time>'
               f'<div><a class="title" href="records/{ID}/">{TITLE}</a>'
               f'<small>{GROUP} · Software · 1.0</small></div><span class="availability">Instrument</span></li>')
        source = once(source, 'aria-live="polite">75 records</output>', 'aria-live="polite">76 records</output>')
        return once(source, '<ol id="entries">', '<ol id="entries">' + row)
    if path == 'library/collections/index.html':
        source = once(source, f'{GROUP} (43)</a>', f'{GROUP} (44)</a>')
        source = once(source, f'<h2>{GROUP}</h2><p>43 records', f'<h2>{GROUP}</h2><p>44 records')
        row = ('<li><time datetime="2026-11-25">25 Nov 2026</time><div>'
               f'<a class="title" href="../records/{ID}/">{TITLE}</a><small>Software</small></div></li>')
        # Year-only records continue to follow all fully dated records in the same year.
        marker = '<li><time datetime="2026">2026 (year only)</time><div><a class="title" href="../records/cori-0077/">'
        return once(source, marker, row + marker)
    if path == 'library/observatories/index.html':
        source = once(source, 'Explore 13 public research instruments', 'Explore 14 public research instruments')
        section = '<h2>Observer mechanics and registration</h2><dl>'
        entry = (f'<dt><a class="title" href="/{INSTRUMENT}/">{TITLE}</a></dt>'
                 f'<dd>Replay a two-sphere encounter and measure how a retained receiver state changes the return. '
                 f'<a href="../records/{ID}/">Read the Library record</a>.</dd>')
        return once(source, section, section + entry)
    if path == 'observatories/index.html':
        count = len(re.findall(r'<a\b[^>]+class="card"', source))
        if count != 12:
            raise ValueError('Unexpected number of directory cards')
        source = once(source, 'Eleven deployed instrument entry points.', 'Thirteen deployed instrument entry points.')
        entry = (f'<a class="card" href="/{INSTRUMENT}/"><strong>{TITLE}</strong>'
                 f'<span class="sub">{SLUG}/index.html</span></a>')
        source = once(source, '<div class="grid">', '<div class="grid">' + entry + '\n')
        stamp = INPUTS['registry_time'].replace('-', '').replace(':', '')
        return once(source, 'Registry generated 20261118T212623Z', 'Registry generated ' + stamp)
    raise ValueError('Unknown catalog path: ' + path)


def scope(path, data):
    if BASES[path]['patch_scope'] == 'file':
        return data
    blocks = list(MAIN.finditer(data))
    if len(blocks) != 1:
        raise ValueError(f'Expected one main element in {path}')
    return blocks[0].group()


def apply_catalog(path, current, baseline, index_sha):
    base = scope(path, baseline)
    if digest(base.encode()) != BASES[path]['patch_sha256']:
        raise ValueError(f'Baseline fingerprint differs for {path}')
    expected = patch_original(path, base, index_sha)
    present = scope(path, current)
    if present == expected:
        return current
    if present != base:
        raise ValueError(f'{path} changed since the checked release. Keep the live file and rebase the catalog insertion.')
    return once(current, present, expected)


def build_catalogs(site, index_bytes, baseline):
    """Build the six replacements in memory before any public file is touched."""
    result = {}
    for path in BASES:
        previous = (site / path).read_bytes()
        original = baseline.read(path)
        if digest(original) != BASES[path]['public_response_sha256']:
            raise ValueError('Captured baseline failed SHA-256: ' + path)
        result[path] = previous, apply_catalog(path, previous.decode(), original.decode(), digest(index_bytes)).encode()
    return result


if __name__ == '__main__':
    from zipfile import ZipFile

    parser = argparse.ArgumentParser(description='Build reviewable catalog pages from captured public responses.')
    parser.add_argument('--overlay', type=Path, required=True)
    parser.add_argument('--instrument-index', type=Path, required=True)
    args = parser.parse_args()
    with ZipFile(HERE / 'catalog-baseline.zip') as baseline:
        for path in BASES:
            current = baseline.read(path).decode()
            new = apply_catalog(path, current, current, digest(args.instrument_index.read_bytes()))
            # Two different servers can serve this source. The live PHP wrapper reads only
            # main and the title, then appends Aletheos.ai itself. The original publication
            # shell supplies the standalone presentation in the absence of that wrapper.
            if BASES[path]['patch_scope'] == 'main':
                title = re.search(r'<title>(.*?) · Aletheos.ai</title>', new).group(1)
                depth = len(Path(path).parts) - 2
                prefix = '../' * depth
                script = '<script src="library.js"></script>' if path == 'library/index.html' else ''
                new = (f'<!doctype html><html lang="en"><head><meta charset="utf-8">'
                       f'<meta name="viewport" content="width=device-width,initial-scale=1">'
                       f'<title>{title} · CoRI Library</title><link rel="stylesheet" href="{prefix}library.css">'
                       f'</head><body><a class="skip" href="#main">Skip to content</a><header><div class="wrap mast">'
                       f'<a href="{prefix}index.html" class="wordmark">CoRI <span>/ Library</span></a>'
                       f'<span>Center of Recursive Inquiry</span></div></header>{scope(path, new)}'
                       f'<footer class="wrap">Center of Recursive Inquiry · Research library</footer>{script}</body></html>')
            dest = args.overlay / 'public_html' / path
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(new.encode())
