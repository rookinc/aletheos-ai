#!/usr/bin/env python3
"""Drive visible controls at a supplied release URL. Python Playwright and Chromium required.

python tests/browser.py http://127.0.0.1:8000/observatories/reciprocal-witness/
For a standalone download, use a file:/// URL and add --portable.
"""
import argparse
import json
import math
import mimetypes
import os
import shutil
from pathlib import Path
from tempfile import TemporaryDirectory
from urllib.parse import urljoin, urlparse, unquote
from playwright.sync_api import sync_playwright, expect

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument("url")
parser.add_argument("--portable",action="store_true")
parser.add_argument("--root",type=Path, help="Serve checked-out static bytes through Playwright routing, without starting a server")
parser.add_argument("--artifacts",type=Path,help="Optional destination for the test receipt and private QA screenshots")
args=parser.parse_args()
if args.artifacts:args.artifacts.mkdir(parents=True,exist_ok=True)
results=[]
def passed(s):results.append(s);print("PASS",s,flush=True)
def near(x,y):assert math.isclose(x,y,abs_tol=1e-13,rel_tol=2e-10),(x,y)

with sync_playwright() as pw:
    chromium=pw.chromium.launch(executable_path=os.environ.get("CHROMIUM_BIN") or shutil.which("chromium"),headless=True,args=["--no-sandbox"])
    version=chromium.version
    for width,height,mobile in [(360,800,True),(393,852,True),(1366,864,False)]:
        ctx=chromium.new_context(viewport={"width":width,"height":height},device_scale_factor=2 if mobile else 1,is_mobile=mobile,has_touch=mobile,
            user_agent=("Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36" if mobile else None),accept_downloads=True,reduced_motion="reduce")
        if args.root:
            root=args.root.resolve()
            def respond(route):
                path=unquote(urlparse(route.request.url).path).lstrip("/")
                if not path or path.endswith("/"):path+="index.html"
                local=root/path
                if local.is_file():
                    route.fulfill(status=200,content_type=mimetypes.guess_type(local.name)[0] or "application/octet-stream",body=local.read_bytes())
                elif path.startswith("observatories/reciprocal-witness/"):
                    route.fulfill(status=404,body="Missing release file")
                else:
                    # Shared live-site images and fonts are outside the catalog overlay.
                    route.fulfill(status=204,body="")
            ctx.route(urljoin(args.url,"/")+"**",respond)
        page=ctx.new_page()
        errors=[];bad=[]
        page.on("pageerror",lambda x:errors.append(str(x)))
        page.on("response",lambda x:bad.append([x.status,x.url]) if x.status>=400 else None)
        page.goto(args.url,wait_until="load")
        def click(loc):
            if mobile:loc.tap()
            else:loc.click()
        def element(key):return page.locator("#"+key)
        def ctl(k):return page.locator('[data-set="'+k+'"]')
        def press(k):click(element(k))
        def event(k):click(page.locator('[data-event="'+str(k)+'"]'))
        def scene(n):
            if mobile:element("mobileExperiment").select_option(n)
            else:click(page.locator('[data-scene="'+n+'"]'))
        def text(k):return element(k).inner_text()
        def receipt():return json.loads(element("ledger").text_content())
        def frame_ok():
            assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1"),(width,page.evaluate("document.documentElement.scrollWidth"))
        def cmd(k):click(page.locator('[data-cmd="'+k+'"]'))
        def save(name):
            if args.artifacts:page.screenshot(path=str(args.artifacts/(name+"-"+str(width)+".png")),animations="disabled")
        expect(element("rdtitle")).to_have_text("A sends")
        box=element("scene").bounding_box();assert box and box["width"]>270 and box["height"]>180
        if mobile:assert element("primary").bounding_box()["y"]<height and box["y"]+box["height"]<height
        save("opening");frame_ok()
        if width==393:
            press("play");press("play");idx=receipt()["eventIndex"];page.wait_for_timeout(1450);assert receipt()["eventIndex"]==idx
            press("step");assert receipt()["eventIndex"]==idx+1
            passed(f"{width}×{height} touch play, pause and single step; no background advance")
        press("reset") if width==393 else press("primary")
        expect(element("rdtitle")).to_have_text("B retains",timeout=6500)
        page.wait_for_timeout(1300);assert receipt()["eventIndex"]==2
        assert receipt()["values"]["receiver"]["x"]["contrast"]=="1/24000"
        pre=element("ledger").text_content();press("nest");element("outer").select_option("A")
        for cam in ["B","A","external"]:
            element("camera").select_option(cam);assert element("ledger").text_content()==pre
        element("orient").select_option("B");assert element("ledger").text_content()==pre
        element("outer").select_option("B");press("face");assert element("ledger").text_content()==pre
        press("primary");expect(element("rdtitle")).to_have_text("B acts back",timeout=4000)
        press("primary");expect(element("rdtitle")).to_have_text("What came back?",timeout=8500)
        assert "+1/576000000" in text("meters") and receipt()["branch"]=="cleared"
        with page.expect_download() as handle:press("export")
        downloaded=handle.value
        with TemporaryDirectory() as scratch:
            target=Path(scratch)/"receipt.json";downloaded.save_as(str(target));out=json.loads(target.read_text())
        assert out["free"][0]["values"]==out["cleared"][0]["values"]
        assert out["free"][2]["values"]["receiver"]["u"]==out["cleared"][2]["values"]["receiver"]["u"]
        assert out["free"][2]["values"]["receiver"]["x"]["contrast"]=="1/24000" and out["cleared"][2]["values"]["receiver"]["x"]["contrast"]=="0"
        assert out["exactReturn"]["signedDelta"]=="1/576000000" and out["energyCut"]["reversed"] is False
        ctl("route").select_option("swap");assert "−1/576000000" in text("meters")
        ctl("pairs").select_option("8");assert "−1/72000000" in text("meters")
        ctl("readout").select_option("sum");assert receipt()["counterfactual"]["ordinaryFreeMinusCleared"]=="0"
        click(page.get_by_text("Does the paired-port intervention reverse energy transfer?",exact=True))
        frame_ok();passed(f"{width}×{height} guided pause, both geometries, reversed nesting, three cameras, local orientation, exact fractions and JSON export")
        scene("flux")
        assert abs(receipt()["values"]["net"]-.658676121391)<1e-10
        orig=receipt()["values"]["edges"];ctl("control").select_option("both")
        for a,b in zip(orig,receipt()["values"]["edges"]):near(a["current"],b["current"])
        ctl("control").select_option("velocity")
        for a,b in zip(orig,receipt()["values"]["edges"]):near(a["current"],-b["current"])
        cmd("cycle");near(receipt()["values"]["net"],0)
        assert any(abs(x["current"])>1e-5 for x in receipt()["values"]["edges"])
        ctl("forkOn").check();assert receipt()["forkController"]["exit"]==505
        ctl("reference").select_option("-1");assert receipt()["forkController"]["exit"]==535
        for cut in ["face7","patch","half"]:
            ctl("cut").select_option(cut);event(4);assert "Direction holds" in text("rdtitle")
            assert "Free minus cleared" in text("comparison");frame_ok()
        passed(f"{width}×{height} all oriented edges, matched sign controls, circulation, fork selector and three fixed cuts")
        scene("sky");event(1)
        def ports(p,m,contrast):
            r=receipt()["values"];near(r["ports"][0],p);near(r["ports"][1],m);near(r["contrast"],contrast);near(r["incoming"],1)
        ports(1,0,1);cmd("order");ports(0,1,-1);cmd("reference");ports(1,0,1);cmd("both");ports(1,0,1)
        ctl("averaged").check();ports(.5,.5,0);ctl("averaged").uncheck()
        ctl("reference").select_option("0");ports(.25,.25,0);cmd("both");ports(.25,.25,0)
        ctl("order").select_option("1");ctl("reference").select_option("1");ctl("feedback").check();event(3);near(receipt()["values"]["command"],1)
        cmd("map");page.locator("#special img").evaluate("im=>im.decode()");assert page.locator("#special img").evaluate("im=>im.naturalWidth>100")
        cmd("apparatus");expect(element("rdtitle")).to_have_text("Measured temperature modes");cmd("apparatus")
        press("nest");element("camera").select_option("B");assert receipt()["forkScores"]["preferredExit"]==23;frame_ok()
        passed(f"{width}×{height} unit beams, four sign controls, reference off, phase average, local feedback, independent Planck layer")
        scene("sag");event(2);held=receipt()["values"]["receiver"];near(held,.00439586978536)
        event(4);press("nest");element("outer").select_option("A");p=element("ledger").text_content();element("camera").select_option("B");assert p==element("ledger").text_content()
        for cut in ["near","middle","far"]:
            ctl("cut").select_option(cut);assert "0.00001932367" in text("comparison");assert "kept its direction" in text("comparison")
            assert receipt()["values"]["postTraffic"]["net"]>0
        frame_ok();passed(f"{width}×{height} exterior cut selection, detector intervention and source return")
        scene("heart");cmd("independent");event(4);near(receipt()["values"]["nextVelocity"],.6723158809492211);assert "242 ms" in text("special")
        cmd("shared");event(4);shared=receipt()["driveID"];assert "47.78 ms" in text("special");assert "Difference at A 0" in text("comparison").replace("\n"," ")
        cmd("coupled");event(4);assert receipt()["driveID"]==shared;assert "+0.003109799" in text("comparison");press("nest");save("hearts")
        ctl("beat").select_option("3");event(0);assert receipt()["mark"]["ordinal"]==3
        ctl("rateA").fill("76");ctl("phaseB").fill("0.3");ctl("variation").fill("0.025");assert receipt()["preparation"]["rateA"]==76
        frame_ok();passed(f"{width}×{height} synthetic clocks, shared-cue null, same-drive field return, marked beat and rate/phase/variation controls")
        if width==360:
            if args.portable:
                click(page.locator("header .guidelink"))
                expect(page.locator("#portable-guide")).to_be_visible()
                assert "1/576,000,000" in page.locator("#portable-guide").inner_text()
                click(page.locator("#portable-guide a").filter(has_text="Replay evidence").first)
                expect(page.locator("#portable-replay")).to_be_visible()
                with page.expect_download() as science:
                    click(page.locator("#portable-replay a").filter(has_text="Download the science replay kit"))
                with TemporaryDirectory() as scratch:
                    artifact=Path(scratch)/"kit.zip";science.value.save_as(str(artifact))
                    import zipfile
                    with zipfile.ZipFile(artifact) as z:assert "tests/run-science.py" in z.namelist()
                click(page.locator("#portable-replay [data-close-doc]"));expect(element("sceneTitle")).to_have_text("Two people, two field responses")
                passed("Portable field guide, replay evidence, offline kit download and return to the same experiment")
            else:
                click(page.locator("header .guidelink"))
                expect(page.get_by_role("heading",name="Field guide",exact=True)).to_be_visible()
                click(page.get_by_role("link",name="Replay evidence",exact=True).first)
                expect(page.get_by_role("heading",name="Replay evidence",exact=True)).to_be_visible()
                passed("Field guide and reproducibility page open through instrument navigation")
        if width==360 and not args.portable:
            for path in ["/library/records/cori-0089/","/library/observatories/","/library/","/observatories/"]:
                resp=page.goto(urljoin(args.url,path));assert resp.status==200
                link=page.locator('a[href*="reciprocal-witness"],a[href*="cori-0089"]').first;assert link.count()
            passed("Research accession, both public catalogs and static Observatory directory open and link to the addition")
        if width==1366:
            for name in ["paired","flux","sky","sag","heart"]:
                scene(name)
                for checkpoint in range(5):
                    event(checkpoint);before=element("ledger").text_content()
                    press("nest");element("outer").select_option("A");element("camera").select_option("B")
                    assert element("ledger").text_content()==before
                    element("outer").select_option("B");element("camera").select_option("A");press("face");element("camera").select_option("external")
                    assert element("ledger").text_content()==before
            passed("All five checkpoints in every experiment preserve complete event receipts through both nesting orders and cameras")
        assert not errors,errors;assert not bad,bad
        ctx.close()
    chromium.close()
if args.artifacts:
    (args.artifacts/"browser-checks.json").write_text(json.dumps({"browser":"Chromium "+version,"device":"Emulated Android touch and desktop","passed":results,"scope":"Release URL" if not args.portable else "Portable offline HTML"},indent=2)+"\n")
print(f"{len(results)} browser check groups passed with Chromium {version}.")
