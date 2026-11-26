#!/usr/bin/env python3
"""Replay two-version, optional-menu and fresh-site installation without contacting a host."""
import argparse
import json
from pathlib import Path
import shutil
import subprocess
import tempfile
from unittest.mock import patch
from zipfile import ZipFile

import orthogonal_menu as menu
import update_sitters as updater
from catalog import BASES, HERE, INSTRUMENT, digest
from install import install
from test_sitters_update import check_shell_transport, must_fail, response_server


def input_page(optional):
    if optional:
        data = optional.read_bytes()
        assert digest(data) == menu.RULE['before'], 'Supply the unmodified, published Orthogonal v1.8 entry.'
        return data,menu.RULE,'exact-public-input'
    # The full independent publication has its own provenance and is not in this tree.
    # Its public navigation excerpt is enough for an offline insertion/rollback fixture.
    nav = menu.RULE['original_menu'].encode()
    first, last = b'<!doctype html><header>', b'</header><main>Independent workbench fixture</main>'
    data = first+nav+last
    at = len(first)+len(nav)-len(b'</nav>')
    inserted = menu.RULE['insert'].encode()
    rule = dict(menu.RULE,insert_offset=at,source_bytes=len(data),before=digest(data),
                after=digest(data[:at]+inserted+data[at:]),
                prefix_sha256=digest(data[:at]),suffix_sha256=digest(data[at:]))
    return data,rule,'public-menu-excerpt'


def baseline_catalogs(root):
    with ZipFile(HERE/'catalog-baseline.zip') as z:
        for name in BASES:
            path = root/name
            path.parent.mkdir(parents=True,exist_ok=True)
            path.write_bytes(z.read(name))
    (root/'library/records').mkdir()


def v2_site(site, source, spec):
    dest = site/INSTRUMENT
    shutil.copytree(source,dest)
    needed = set()
    for name,item in spec['files'].items():
        if item['v2'] is None:
            (dest/name).unlink()
        elif item['v2'] != item['after']:
            needed.add(name)
            shutil.copyfile(HERE/'fixtures/v2'/name,dest/name)
            assert digest((dest/name).read_bytes()) == item['v2']
    assert needed == {p.relative_to(HERE/'fixtures/v2').as_posix() for p in (HERE/'fixtures/v2').rglob('*') if p.is_file()}
    return dest


def set_external(site, data, rule):
    path = site/rule['server_path']
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_bytes(data)
    return path


def tree_hashes(root):
    return {p.relative_to(root).as_posix():digest(p.read_bytes()) for p in root.rglob('*') if p.is_file()}


def fresh_source(work, source, spec):
    original = HERE.parent
    record = 'public_html/library/records/cori-0089/index.html'
    if (original/record).is_file():
        return original
    # A sparse developer checkout may omit the existing record. Read its tracked
    # bytes from the published v2 commit into this temporary test package.
    package = work/'fresh-release'
    shutil.copytree(source, package/updater.PUBLIC)
    for name in (record, 'public_html/observatories/registry.json'):
        p = package/name
        p.parent.mkdir(parents=True,exist_ok=True)
        p.write_bytes(subprocess.check_output(['git','-C',str(original),'show',spec['previous_commit']+':'+name]))
    return package


def check_browser(webroot):
    from playwright.sync_api import sync_playwright
    from urllib.parse import urlsplit
    import os
    results = []
    with response_server(webroot) as origin, sync_playwright() as pw:
        browser = pw.chromium.launch(executable_path=os.getenv('CHROMIUM_BIN') or shutil.which('chromium'),args=['--no-sandbox'])
        for width,height in ((390,844),(1280,800)):
            page=browser.new_page(viewport={'width':width,'height':height},has_touch=width<500)
            page.route('**/*', lambda route:route.continue_() if route.request.url.startswith(origin+'/') else route.abort())
            page.goto(origin+'/observatories/thalean-orthogonal/',wait_until='domcontentloaded')
            nav=page.get_by_role('navigation',name='Observatory view')
            link=nav.get_by_role('link',name='Two sitters',exact=True)
            assert nav.locator('button').count()==7 and link.get_attribute('href')==FIELD_LINK
            link.scroll_into_view_if_needed()
            box=link.bounding_box()
            assert box and box['x']>=-1 and box['x']+box['width']<=width+1
            link.click()
            page.wait_for_url(origin+FIELD_LINK)
            where=urlsplit(page.url)
            results.append({'viewport':[width,height],'previous_mode_buttons':7,
                            'link_width':round(box['width'],1),'target':where.path+'?'+where.query})
            page.close()
        browser.close()
    return results


def run(optional=None, browser=False):
    data,rule,source_kind = input_page(optional)
    spec = updater.load_spec()
    source = HERE.parent/updater.PUBLIC
    assert b'libfile_' not in (HERE/'orthogonal-menu.json').read_bytes()
    assert noprivate_menu(rule['original_menu'])
    patched = menu.splice(data,rule)
    pos = rule['insert_offset']
    assert patched == data[:pos]+rule['insert'].encode()+data[pos:]
    assert menu.unsplice(patched,rule) == data
    assert rule['original_menu'].count('<button ') == 7
    assert FIELD_LINK in rule['insert'] and '>Two sitters</a>' in rule['insert']
    with tempfile.TemporaryDirectory() as working:
        work = Path(working)
        fresh_package=fresh_source(work,source,spec)
        site = work/'v2'
        dest = v2_site(site,source,spec)
        independent = set_external(site,data,rule)
        (dest/'independent-note.txt').write_bytes(b'host annotation')
        cat = site/'library/catalog.json';cat.parent.mkdir(exist_ok=True)
        cat.write_bytes(b'catalog with other recent accessions')
        start = tree_hashes(site)
        private = work/'private-v2'
        apply = lambda:updater.update(site,HERE.parent,private,spec,rule)
        def interrupted(change):
            raise OSError('simulated independent menu interruption')
        for point in ('orthogonal_menu.apply','orthogonal_menu.verify_change'):
            with patch(point,side_effect=interrupted):
                must_fail(apply,'menu interruption')
            assert tree_hashes(site) == start
        res = apply()
        assert res['orthogonal_menu']['status'] == 'installed' and independent.read_bytes() == patched
        assert (Path(res['backup'])/'external-original'/rule['server_path']).read_bytes() == data
        assert cat.read_bytes() == b'catalog with other recent accessions' and (dest/'independent-note.txt').read_bytes() == b'host annotation'
        stamps = {p:p.stat().st_mtime_ns for p in site.rglob('*') if p.is_file()}
        assert apply()['already_current']
        assert all(p.stat().st_mtime_ns == n for p,n in stamps.items())
        with response_server(site) as origin:
            checks = updater.public_checks(spec,origin,res['orthogonal_menu'],rule)
            assert checks['orthogonal_menu']['sha256'] == rule['after'] and checks['verified_field_route'] == FIELD_LINK
            independent.write_bytes(data)
            must_fail(lambda:updater.public_checks(spec,origin,res['orthogonal_menu'],rule),'does not match')
            independent.write_bytes(patched)
            if optional:
                check_shell_transport(work,site,private,origin,menu_restore=True)
        browser_receipts = check_browser(site) if browser else []
        removed = updater.restore_menu(site,private,rule)
        assert removed['orthogonal_menu']['status'] == 'removed' and independent.read_bytes() == data
        assert updater.restore_menu(site,private,rule)['orthogonal_menu']['status'] == 'original'
        foreign = data + b'<!-- independent newer workbench revision -->'
        independent.write_bytes(foreign)
        assert apply()['orthogonal_menu']['status'] == 'preserved-unrecognized'
        assert updater.restore_menu(site,private,rule)['orthogonal_menu']['status'] == 'preserved-unrecognized'
        assert independent.read_bytes() == foreign
        with response_server(site) as origin:
            checked = updater.public_checks(spec,origin,apply()['orthogonal_menu'],rule)
            assert checked['orthogonal_menu']['sha256'] == digest(foreign)
        for label, before, expected in [('absent',None,'absent'),('present',data,'installed'),('independent-newer',foreign,'preserved-unrecognized')]:
            fresh = work/('fresh-'+label);state=work/('private-'+label)
            baseline_catalogs(fresh)
            if before is not None:
                set_external(fresh,before,rule)
            assert install(fresh,fresh_package,state)['installed']
            receipt = updater.update(fresh,HERE.parent,state,spec,rule)
            assert receipt['orthogonal_menu']['status'] == expected
            path = fresh/rule['server_path']
            assert (path.read_bytes() if path.exists() else None) == (patched if before==data else before)
            with response_server(fresh) as origin:
                checked = updater.public_checks(spec,origin,receipt['orthogonal_menu'],rule)
                assert checked['orthogonal_menu']['status'] == ('current' if expected=='installed' else expected)
    return {'source_fixture':source_kind,'browser_workbench_navigation':browser_receipts,'tested_before':digest(data),'tested_after':digest(patched),
            'production_v18_before':menu.RULE['before'],'production_v18_after':menu.RULE['after'],
            'menu_insertion_offset':rule['insert_offset'],'menu_insertion_bytes':len(rule['insert'].encode()),
            'verified_field_route':FIELD_LINK,'versioned_assets':spec['runtime_urls'],'phone_removal_and_reinstall':bool(optional),'previous_modes':7,'v2_to_orthogonal':'pass',
            'cross_directory_interruption_restored_originals':True,'identical_second_run_performed_no_writes':True,
            'reversal_restored_exact_original':True,'newer_workbench_preserved_on_install_and_remove':True,
            'fresh_site_cases':['without Orthogonal','with matching Orthogonal','with newer Orthogonal'],
            'public_response_fixture':'local HTTP server serving the installed document root'}


FIELD_LINK = '/observatories/reciprocal-witness/sitters.html?field=orthogonal'


def noprivate_menu(value):
    return all(token not in value for token in ('libfile_','account_id=','chatgpt.com'))


if __name__ == '__main__':
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--orthogonal-page',type=Path,help='Optional pinned, unmodified public Orthogonal v1.8 HTML.')
    p.add_argument('--browser',action='store_true',help='Click the real inserted link at 390px and 1280px in Chromium.')
    args=p.parse_args()
    print(json.dumps(run(args.orthogonal_page,args.browser),indent=2))
