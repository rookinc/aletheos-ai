#!/usr/bin/env python3
"""Touch, camera and registration checks for the Orthogonal sitter view.

Pass a hosted sitters.html?field=orthogonal URL or an exported orthogonal file:// URL.
--root public_html serves real release bytes under a logical HTTP URL in Chromium.
"""
import argparse
from copy import deepcopy
import json
import math
import mimetypes
import os
from pathlib import Path
import shutil
from tempfile import TemporaryDirectory
from urllib.parse import unquote, urljoin, urlparse

from playwright.sync_api import expect, sync_playwright

p = argparse.ArgumentParser(description=__doc__)
p.add_argument('url')
p.add_argument('--root', type=Path)
p.add_argument('--artifacts', type=Path)
args = p.parse_args()
if args.artifacts:
    args.artifacts.mkdir(parents=True, exist_ok=True)

def experiment(record):
    copy = deepcopy(record)
    copy['display'].pop('orthogonal', None)
    return copy

def check_coordinates(record, copy_name, merge):
    chart = record['display']['orthogonal']
    assert chart['copy'] == copy_name and chart['mergePercent'] == merge
    assert len(chart['registered']) == 3
    for i, pair in enumerate(chart['registered']):
        sides = []
        for side in ('a', 'b'):
            k = (record['nativeStep'] + (10 if side == 'b' else 0)) % 20
            az = math.tau * (k/5 + i/450)
            phase = math.tau * (k/4 + (i*(math.sqrt(5)-1)/2) % 1)
            radius = 10+4*math.cos(phase)
            y = 4*math.sin(phase)
            y += (-1 if y < -1e-10 else 1)*12*(1-merge/100)
            x,y,z = radius*math.cos(az)/18, y/18, radius*math.sin(az)/18
            target = {'X':(y,z,x),'Y':(x,y,z),'Z':(z,x,y)}[copy_name]
            actual = pair[side]
            assert actual['id'] == record['addresses'][i][side]['id']
            for key in ('chartXYZ', 'displayedXYZ'):
                assert math.dist(actual[key],target) < 3e-8, (side,k,key,actual[key],target)
            sides.append(target)
        if merge == 100:
            assert abs(math.dist(*sides)-4/9) < 1e-10

def gesture(page, ctx, canvas, mobile):
    canvas.scroll_into_view_if_needed()
    box = canvas.bounding_box()
    x,y = box['x']+box['width']*.5, box['y']+box['height']*.48
    if mobile:
        touch = ctx.new_cdp_session(page)
        def points(*pts):
            return [dict(id=i+1,x=xx,y=yy) for i,(xx,yy) in enumerate(pts)]
        def dispatch(kind,*pts):
            touch.send('Input.dispatchTouchEvent',{'type':kind,'touchPoints':points(*pts)})
        dispatch('touchStart',(x-20,y))
        dispatch('touchMove',(x+16,y+16))
        dispatch('touchEnd')
        dispatch('touchStart',(x-23,y),(x+23,y))
        dispatch('touchMove',(x-44,y-3),(x+43,y+3))
        dispatch('touchEnd')
        touch.detach()
    else:
        page.mouse.move(x,y)
        page.mouse.down()
        page.mouse.move(x+44,y+16,steps=5)
        page.mouse.up()
        canvas.focus()
        canvas.press('+')

with sync_playwright() as pw:
    browser = pw.chromium.launch(executable_path=os.getenv('CHROMIUM_BIN') or shutil.which('chromium'),args=['--no-sandbox'])
    results = []
    for width,height in [(360,800),(393,852),(1366,864)]:
        mobile = width < 500
        ctx = browser.new_context(viewport={'width':width,'height':height},is_mobile=mobile,has_touch=mobile,
            device_scale_factor=2 if mobile else 1,reduced_motion='reduce',accept_downloads=True)
        if args.root:
            root = args.root.resolve()
            def respond(route):
                f = root / unquote(urlparse(route.request.url).path).lstrip('/')
                if f.is_dir(): f = f/'index.html'
                if f.is_file():
                    route.fulfill(body=f.read_bytes(),content_type=mimetypes.guess_type(f.name)[0] or 'application/octet-stream')
                else:
                    route.fulfill(status=404,body='Unknown release path')
            ctx.route(urljoin(args.url,'/')+'**',respond)
        page = ctx.new_page()
        errors,failures,external = [],[],[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.on('response',lambda r:failures.append((r.status,r.url)) if r.status>=400 else None)
        page.on('request',lambda r:external.append(r.url) if r.url.startswith(('http:','https:')) else None)
        page.goto(args.url,wait_until='load')
        def loc(name): return page.locator('#'+name)
        def press(name): loc(name).tap() if mobile else loc(name).click()
        def read():
            with page.expect_download() as d: press('receipt')
            with TemporaryDirectory() as temp:
                path = Path(temp)/'receipt.json'
                d.value.save_as(str(path))
                return json.loads(path.read_bytes())
        def snap(name):
            if args.artifacts:
                page.evaluate('window.scrollTo({top:0,behavior:"instant"})')
                page.screenshot(path=str(args.artifacts/f'{name}-{width}.png'),animations='disabled')
        def charts(expected):
            expect(loc('orthogonalView')).to_have_attribute('aria-pressed',str(expected).lower())
            expect(loc('orthCanvas')).to_be_visible() if expected else expect(loc('fieldCanvas')).to_be_visible()
        def layout():
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1')
        charts(True)
        expect(loc('orbitReading')).to_have_text('F13 / 20')
        initial=read()
        assert initial['display']['orthogonal']['camera']['name']=='seated'
        for layer in ('tracer','arrow'):
            slider=loc(layer+'Alpha')
            box=slider.bounding_box()
            assert box['y']+box['height']<height
            prior=loc('orthCanvas').evaluate("c=>c.toDataURL()")
            slider.focus();slider.press('Home')
            assert loc('orthCanvas').evaluate("c=>c.toDataURL()")!=prior
            rec=read()
            assert rec['display']['orthogonal'][layer+'Opacity']==0 and experiment(rec)==experiment(initial)
            slider.press('End')
            assert loc('orthCanvas').evaluate("c=>c.toDataURL()")==prior
        press('restart')
        expect(loc('run')).to_have_accessible_name('Play loop')
        expect(loc('chartSites')).to_have_text('Cyan 0 · red 488')
        layout()
        box = loc('orthCanvas').bounding_box()
        assert box['width']>=265 and box['height']>238 and box['y']+box['height']<height
        start=read();check_coordinates(start,'Z',0)
        snap('orthogonal-start')
        press('nextGate');expect(loc('orbitReading')).to_have_text('F1 / 20')
        press('jumpSwap');expect(loc('chartSites')).to_have_text('Cyan 488 · red 0')
        swap=read();check_coordinates(swap,'Z',0)
        press('spheresView');charts(False);assert read()==experiment(swap)
        press('orthogonalView');charts(True);assert read()==swap
        if args.url.startswith('http'): assert 'field=orthogonal' in page.url
        loc('chartTools').locator('summary').click()
        for axis in ('X','Y','Z'):
            loc('chartCopy').select_option(str('XYZ'.index(axis)))
            loc('chartCamera').select_option(axis.lower())
            rec=read()
            assert experiment(rec)==experiment(swap)
            assert rec['display']['orthogonal']['camera']['name']==axis.lower()
            check_coordinates(rec,axis,0)
        loc('chartCamera').select_option('oblique')
        gesture(page,ctx,loc('orthCanvas'),mobile)
        camera=read()['display']['orthogonal']['camera']
        assert camera['name']=='custom' and camera['zoom']>1.05
        assert camera['quaternion']!=start['display']['orthogonal']['camera']['quaternion']
        loc('chartCamera').select_option('oblique')
        loc('chartMerge').focus();loc('chartMerge').press('End')
        loc('chartOthers').uncheck()
        loc('chartLight').focus();loc('chartLight').press('Home')
        rec=read();assert experiment(rec)==experiment(swap)
        assert rec['display']['orthogonal']['visibleCopies']==['Z'] and rec['display']['orthogonal']['brightness']==0
        check_coordinates(rec,'Z',100)
        loc('chartOthers').check();loc('chartLight').press('End');loc('chartMerge').press('Home')
        loc('chartTools').locator('summary').click()
        press('jumpReturn');ret=read();check_coordinates(ret,'Z',0)
        assert ret['display']['interval']==[0,20] and ret['clock']['model']['locked']
        expect(loc('bpmA')).to_have_text('70.5 bpm');expect(loc('bpmB')).to_have_text('70.5 bpm')
        expect(loc('wait')).to_have_text('41 ms')
        snap('orthogonal-return')
        press('matched');closed=read()
        assert closed['clock']['model']==ret['clock']['closedBaseline']
        assert closed['matchedOpenReplay']['clock']==ret['clock']['model']
        press('spheresView');assert read()==experiment(closed)
        press('orthogonalView');assert read()==closed
        press('matched');assert read()==ret
        loc('pair').select_option('2');loc('trail').select_option('4')
        expect(loc('chartSites')).to_have_text('Yellow 2 · blue 485')
        assert read()['display']['interval']==[16,20]
        press('nextGate');assert read()['display']['interval']==[17,21]
        before=read()['clock']['model']['t'];press('run')
        page.wait_for_function("n=>Number(document.querySelector('#scope').dataset.time)>n",arg=before+.26)
        press('spheresView');press('orthogonalView');press('run')
        assert read()['clock']['model']['t']>before and loc('scope').get_attribute('data-playing')=='false'
        layout()
        assert not errors and not failures,(errors,failures)
        if args.url.startswith('file:'): assert not external,external
        results.append({'viewport':[width,height],'nativeSwap':[488,0],'nativeReturn':[0,488],
                        'checkedCameras':4,'gestures':'touch orbit and pinch' if mobile else 'mouse orbit and key zoom',
                        'settledBpm':round(ret['clock']['model']['bpmA'],4),'delayMs':round(1000*ret['lastPairedBeats'][-1]['wait'],4)})
        ctx.close()
    print(json.dumps({'browser':browser.version,'passed':results},indent=2))
    browser.close()
