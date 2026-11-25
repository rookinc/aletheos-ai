#!/usr/bin/env python3
"""Replay catalog integration on saved live responses. Writes only to a temporary site."""
import argparse
from collections import Counter
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
from zipfile import ZipFile
from unittest.mock import patch

from catalog import BASES, HERE, ID, INPUTS, INSTRUMENT, RECORD, SLUG, TITLE, digest, scope
from install import file_inventory, install, replace_bytes


class Links(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links = []
        self.tags = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag == 'a' and 'href' in attrs:
            self.links.append((attrs['href'], attrs.get('class')))

    def count_class(self, value):
        return sum(cls == value for href, cls in self.links)


def run(instrument, php=None, auto_index=None, publisher=None):
    report = {}
    with tempfile.TemporaryDirectory() as tmp:
        work = Path(tmp)
        site, package, state = (work / name for name in ('www', 'package', 'private'))
        staged = package / 'public_html'
        with ZipFile(HERE / 'catalog-baseline.zip') as archive:
            for rel in BASES:
                p = site / rel
                p.parent.mkdir(parents=True, exist_ok=True)
                original = archive.read(rel)
                if BASES[rel]['patch_scope'] == 'main':
                    original = original.replace(' · Aletheos.ai</title>'.encode(), ' · CoRI Library</title>'.encode())
                p.write_bytes(original)
        (site / 'library/records').mkdir()
        # Similar to the publication sources on Bluehost: the main fragment is
        # identical while the header differs from the publicly rendered PHP view.
        index = site / 'library/index.html'
        header = '<!-- publisher-owned test header -->'
        index.write_text(index.read_text().replace('<body', header+'<body'))
        shutil.copytree(instrument, staged / INSTRUMENT)
        shutil.copytree(HERE.parent/'public_html'/RECORD, staged/RECORD)
        (staged/'observatories/registry.json').write_bytes((HERE.parent/'public_html/observatories/registry.json').read_bytes())
        before = {rel: (site/rel).read_bytes() for rel in BASES}
        interrupted = False
        writes = []
        def fail_once(dest, data, mode):
            nonlocal interrupted
            if len(writes) == 2 and not interrupted:
                interrupted = True
                raise OSError('simulated partial installation')
            writes.append(dest)
            replace_bytes(dest, data, mode)
        with patch('install.replace_bytes', side_effect=fail_once):
            try:
                install(site, package, state)
            except OSError as err:
                assert 'simulated partial installation' in str(err)
        assert interrupted
        assert all(not (site / rel).exists() for rel in (INSTRUMENT, RECORD))
        assert all((site / rel).read_bytes() == data for rel, data in before.items())
        report['interrupted_install_restores_sources'] = True
        first = install(site, package, state)
        assert first['installed'] and len(first['updated_catalogs']) == 6
        assert header in index.read_text()
        assert file_inventory(site/INSTRUMENT) == file_inventory(instrument)
        assert file_inventory(site/RECORD) == file_inventory(staged/RECORD)
        for rel in BASES:
            assert (Path(first['backup'])/rel).read_bytes() == before[rel]
            assert scope(rel, (site/rel).read_text()) == scope(rel, (HERE.parent/'public_html'/rel).read_text()),rel
        catalog = json.loads((site/'library/catalog.json').read_text())
        previous = json.loads(before['library/catalog.json'])
        assert catalog[:-1] == previous and catalog[-1]['id'] == ID and len(catalog) == 76
        registry = json.loads((site/'observatories/registry.json').read_text())['instruments']
        assert registry[:-1] == json.loads(before['observatories/registry.json'])['instruments']
        assert len(registry) == 13 and registry[-1]['artifact_sha256'] == digest((instrument/'index.html').read_bytes())
        assert registry[-1]['id'] == SLUG
        for rel, reference in [('library/index.html','records/'+ID+'/'),
                               ('library/collections/index.html','../records/'+ID+'/'),
                               ('library/observatories/index.html','/'+INSTRUMENT+'/'),
                               ('observatories/index.html','/'+INSTRUMENT+'/')]:
            assert reference in (site / rel).read_text(), rel
        assert '/'+INSTRUMENT+'/' in (site / RECORD / 'index.html').read_text()
        assert '/'+RECORD+'/' in (site / INSTRUMENT / 'index.html').read_text()
        for rel in BASES:
            if rel.endswith('.html'):
                old_links = Counter(Links(before[rel].decode()).links)
                new_links = Counter(Links((site/rel).read_text()).links)
                assert not (old_links - new_links), 'Lost links in ' + rel
        research = Links(index.read_text())
        current_row, = [attrs for tag,attrs in research.tags if tag == 'li' and ID in attrs.get('data-search','')]
        assert current_row['data-pdf'] == '0' and current_row['data-subject'] == 'Geometry and Thalean mechanics'
        curated = Links((site/'library/observatories/index.html').read_text()).count_class('title')
        directory = Links((site/'observatories/index.html').read_text()).count_class('card')
        assert (curated, directory) == (14,13)
        for rel,desc in INPUTS['offline_catalog_assets'].items():
            asset = (HERE.parent / 'public_html' / rel).read_bytes()
            assert digest(asset) == desc['sha256'] and len(asset) == desc['bytes']
        report.update(existing_research_records_preserved=len(previous), research_records=len(catalog),
                      original_registry_records_preserved=len(registry)-1, registry_records=len(registry),
                      curated_observatories=curated, directory_cards=directory,
                      public_paths_and_backlink_verified=True, original_sources_backed_up=True)
        prior = {rel:(site/rel).stat().st_mtime_ns for rel in BASES}
        assert install(site, package, state)['already_current']
        assert {rel:(site/rel).stat().st_mtime_ns for rel in BASES} == prior
        report['second_install_writes_nothing'] = True
        if php and auto_index:
            target = site/'observatories/index.php'
            expected = '26647d2203ea1571cb990ee04017c29201a57bb7518345495e60eca295c963a2'
            assert digest(auto_index.read_bytes()) == expected
            shutil.copyfile(auto_index, target)
            output = subprocess.check_output([str(php), '-n', str(target)], text=True)
            assert re.search(r'class="card-title" href="/observatories/reciprocal-witness/">Reciprocal Witness</a>',output)
            report['upstream_php_discovery'] = {'href':'/'+INSTRUMENT+'/', 'source_sha256':expected}
        if php and publisher:
            for rel in ('/library/', '/library/observatories/', '/'+RECORD+'/'):
                code = '$_SERVER["DOCUMENT_ROOT"]=$argv[1]; $_SERVER["REQUEST_URI"]=$argv[2]; require $argv[3];'
                result = subprocess.check_output([str(php),'-n','-r',code,str(site),rel,str(publisher/'index.php')],text=True)
                assert TITLE in result and result.count('<main') == 1 and result.count('<header') == 1
                assert 'Aletheos.ai · Aletheos.ai' not in result
            report['publication_wrapper_rendered'] = ['/library/','/library/observatories/','/'+RECORD+'/']
        dirty = site/'library/catalog.json'
        dirty.write_bytes(dirty.read_bytes()+b' ')
        was = {rel:(site/rel).read_bytes() for rel in BASES}
        try:
            install(site,package,state)
        except ValueError as err:
            assert 'changed since' in str(err)
        else:
            raise AssertionError('Drifted catalog unexpectedly accepted')
        assert was == {rel:(site/rel).read_bytes() for rel in BASES}
        report['drift_blocks_before_writing'] = True
    return report


if __name__ == '__main__':
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--instrument', type=Path, default=HERE.parent/'public_html'/INSTRUMENT)
    p.add_argument('--php', type=Path)
    p.add_argument('--auto-index', type=Path, help='Original PHP catalog at the pinned deployment revision.')
    p.add_argument('--publisher', type=Path, help='Unpacked publication wrapper from the Nov 23 release.')
    args = p.parse_args()
    print(json.dumps(run(args.instrument, args.php, args.auto_index, args.publisher),indent=2))
