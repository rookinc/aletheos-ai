#!/usr/bin/env python3
"""Drive the Two-sitter field loop at a release URL or a standalone file:/// URL.

Use --root public_html for a checkout at a logical HTTP URL. Set CHROMIUM_BIN to
select a Chromium executable. --artifacts writes optional viewport screenshots.
"""
import argparse
import json
import math
import mimetypes
import os
from pathlib import Path
import shutil
from tempfile import TemporaryDirectory
from urllib.parse import unquote, urljoin, urlparse

from playwright.sync_api import expect, sync_playwright

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('url')
parser.add_argument('--root', type=Path)
parser.add_argument('--artifacts', type=Path)
options = parser.parse_args()
if options.artifacts:
    options.artifacts.mkdir(parents=True, exist_ok=True)

with sync_playwright() as pw:
    browser = pw.chromium.launch(executable_path=os.getenv('CHROMIUM_BIN') or shutil.which('chromium'),
                                 args=['--no-sandbox'])
    outputs = []
    for width, height in [(360, 800), (393, 852), (1366, 864)]:
        mobile = width < 500
        ctx = browser.new_context(viewport={'width': width, 'height': height}, is_mobile=mobile,
                                  has_touch=mobile, device_scale_factor=2 if mobile else 1,
                                  reduced_motion='reduce', accept_downloads=True,
                                  user_agent='Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 Chrome/130.0 Mobile Safari/537.36' if mobile else None)
        if options.root:
            def serve(route):
                path = unquote(urlparse(route.request.url).path).strip('/')
                f = options.root / path
                if f.is_dir():
                    f = f / 'index.html'
                if f.is_file():
                    route.fulfill(body=f.read_bytes(), content_type=mimetypes.guess_type(f.name)[0] or 'application/octet-stream')
                else:
                    route.fulfill(status=404, body='Missing release file')
            ctx.route(urljoin(options.url, '/') + '**', serve)
        page = ctx.new_page()
        errors, failures, external = [], [], []
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('response', lambda r: failures.append((r.status, r.url)) if r.status >= 400 else None)
        page.on('request', lambda r: external.append(r.url) if r.url.startswith(('http:', 'https:')) else None)
        def loc(name):
            return page.locator('#' + name)
        def hit(el):
            el.tap() if mobile else el.click()
        def press(name):
            hit(loc(name))
        def preset(name):
            hit(page.locator('[data-preset="' + name + '"]'))
        def snap(name):
            if options.artifacts:
                page.evaluate('window.scrollTo(0,0)')
                page.screenshot(path=str(options.artifacts / f'{name}-{width}.png'), animations='disabled')
        def result():
            with page.expect_download() as downloaded:
                press('receipt')
            with TemporaryDirectory() as temp:
                p = Path(temp) / 'run.json'
                downloaded.value.save_as(str(p))
                return json.loads(p.read_text())
        def ensure_layout():
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1')
        if options.root and width == 360:
            page.goto(urljoin(options.url, 'index.html#heart'))
            hit(loc('sittersLink'))
            expect(page).to_have_url(options.url)
        else:
            page.goto(options.url)
        expect(loc('run')).to_have_accessible_name('Play loop')
        press('spheresView');press('restart')
        expect(loc('orbitReading')).to_have_text('F0 / 20')
        expect(loc('gapReading')).to_have_text('B leads A by 42.0°')
        ensure_layout()
        box = loc('fieldCanvas').bounding_box()
        assert box['width'] > 285 and box['height'] > 195 and box['y'] + box['height'] < height
        strip_a, strip_b = loc('ecgA').bounding_box(), loc('ecgB').bounding_box()
        assert strip_a['x'] == strip_b['x'] and strip_a['width'] == strip_b['width'] and strip_a['y'] < strip_b['y']
        snap('launch')
        press('run')
        page.wait_for_function("Number(document.querySelector('#scope').dataset.time) > .7")
        press('run')
        freeze = loc('scope').get_attribute('data-time')
        page.wait_for_timeout(220)
        assert freeze == loc('scope').get_attribute('data-time')
        press('restart')
        press('nextGate')
        expect(loc('orbitReading')).to_have_text('F1 / 20')
        loc('speed').select_option('4')
        press('jumpSwap')
        expect(loc('orbitStatus')).to_contain_text('partner addresses')
        swapped = result()
        assert [(v['a']['id'], v['b']['id']) for v in swapped['addresses']] == [(488,0), (489,1), (485,2)]
        press('jumpReturn')
        expect(loc('lockState')).to_have_text('Phase locked')
        expect(loc('bpmA')).to_have_text('70.5 bpm')
        expect(loc('bpmB')).to_have_text('70.5 bpm')
        expect(loc('gapReading')).to_have_text('B leads A by 17.5°')
        expect(loc('wait')).to_have_text('41 ms')
        assert loc('scope').get_attribute('data-playing') == 'false'
        returned = result()
        assert returned['nativeStep'] == 20 and returned['display']['interval'] == [0,20]
        assert [(v['a']['id'], v['b']['id']) for v in returned['addresses']] == [(0,488), (1,489), (2,485)]
        snap('full-cycle')
        expect(loc('scopeStatus')).to_have_text('Locked · 17.5°')
        press('matched')
        expect(loc('lockState')).to_have_text('Independent clocks')
        control = result()
        assert control['clock']['model'] == returned['clock']['closedBaseline']
        assert control['matchedOpenReplay']['clock'] == returned['clock']['model']
        assert control['lastPairedBeats'][-1] == returned['closedLastPairedBeat']
        press('matched')
        assert result() == returned
        loc('pair').select_option('2')
        loc('trail').select_option('4')
        partial = result()
        assert partial['display']['interval'] == [16,20] and partial['display']['shownPair'] == '2'
        assert partial['clock'] == returned['clock']
        loc('trail').select_option('0')
        assert result()['display']['interval'] == [20,20]
        loc('trail').select_option('20')
        loc('pair').select_option('all')
        press('nextGate')
        assert result()['display']['interval'] == [1,21]
        # Use real keyboard slider operation in cycle two.
        loc('scrub').focus()
        loc('scrub').press('End')
        expect(loc('returns')).to_have_text('2')
        loc('scrub').press('Home')
        assert result()['nativeStep'] == 20
        preset('closed')
        expect(loc('gapReading')).to_have_text('B leads A by 42.0°')
        press('jumpReturn')
        expect(loc('lockState')).to_have_text('Independent clocks')
        closed = result()
        assert [closed['clock']['model'][s] for s in ('bpmA','bpmB')] == [69,72]
        preset('outside')
        press('jumpReturn')
        expect(loc('lockState')).to_have_text('Outside capture')
        assert math.isclose(result()['clock']['model']['gapDeg'],140,abs_tol=1e-10)
        preset('inside')
        loc('openA').uncheck()
        press('jumpReturn')
        expect(loc('lockState')).to_have_text('Independent clocks')
        loc('openA').check()
        loc('rateA').focus()
        loc('rateA').press('ArrowRight')
        expect(loc('rateAVal')).to_have_text('70 bpm')
        loc('gap').focus()
        loc('gap').press('Home')
        expect(loc('orbitReading')).to_have_text('F0 / 20')
        assert math.isclose(abs(result()['clock']['model']['gapDeg']),180,abs_tol=1e-10)
        loc('window').focus()
        loc('window').press('Home')
        expect(loc('windowVal')).to_have_text('±10°')
        hit(page.get_by_text('What swaps at steps 10 and 20?', exact=True))
        ensure_layout()
        assert not errors and not failures, (width, errors, failures)
        if options.url.startswith('file:'):
            assert not external, external
        outputs.append(dict(viewport=[width,height], addressPairs=3, nativeReturn=20,
                            coLockedBpm=round(returned['clock']['model']['bpmA'],5),
                            pairedWaitMs=round(returned['lastPairedBeats'][-1]['wait'] * 1000,4)))
        # Normal motion starts automatically; reduced motion above opened paused.
        page.emulate_media(reduced_motion='no-preference')
        page.reload()
        expect(loc('run')).to_have_accessible_name('Pause loop')
        page.wait_for_function("Number(document.querySelector('#scope').dataset.nativeStep)>=1")
        assert not errors and not failures, (width, errors, failures)
        ctx.close()
    print(json.dumps({'chromium':browser.version,'passed':outputs}, indent=2))
    browser.close()
