"""Exercise consent and analytics against the real Loom and catalog. All network traffic is intercepted.

Run with Python Playwright and Chromium. Optionally pass --google-tag /path/to/gtag.js
to inspect what the current Google tag would send to /g/collect, without sending it.
"""
import argparse
import json
from time import monotonic
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

from playwright.sync_api import expect, sync_playwright

WEB = Path(__file__).resolve().parents[1] / "public_html"
HOST = "https://aletheos.ai"
LOOM = "/observatories/universal-carrier/"
LIBRARY = "/library/observatories/"
SCRIPT = "/assets/aletheos-analytics/analytics.js"
STREAM = "G-3MHQ9Y1GJX"
KEY = "aletheos.analytics.consent.v1"


def run(browser, tag):
    context = browser.new_context(service_workers="block")
    context.add_init_script("window.requestAnimationFrame = () => 0")
    requests = []
    hits = []

    def serve(route):
        request = route.request
        url = urlsplit(request.url)
        if url.netloc == "aletheos.ai":
            if url.path in (LOOM, LIBRARY):
                html = (WEB / url.path.strip("/") / "index.html").read_text()
                # Two independently installed copies must still produce just one tag.
                bootstrap = f'<script src="{SCRIPT}" defer></script>' * 2
                route.fulfill(content_type="text/html", body=html.replace("</title>", "</title>" + bootstrap, 1))
            elif url.path == SCRIPT:
                route.fulfill(content_type="text/javascript", path=WEB / SCRIPT.lstrip("/"))
            else:
                route.fulfill(status=404, body="")
            return
        requests.append(request.url)
        if url.netloc == "www.googletagmanager.com" and url.path == "/gtag/js":
            route.fulfill(content_type="text/javascript", body=tag or b"/* offline stand-in */")
        elif url.netloc.endswith(".google-analytics.com") and url.path == "/g/collect":
            for line in (request.post_data or "").splitlines() or [""]:
                hits.append({**parse_qs(url.query), **parse_qs(line)})
            route.fulfill(status=204, headers={"Access-Control-Allow-Origin": HOST}, body="")
        else:
            route.abort()

    context.route("**/*", serve)
    page = context.new_page()
    page.goto(HOST + LOOM + "?q=fixture-search#fixture-fragment", wait_until="domcontentloaded")
    page.get_by_role("button", name="Decline analytics").click()
    page.reload(wait_until="domcontentloaded")
    assert not requests
    page.get_by_role("button", name="Privacy choices").click()
    page.get_by_role("button", name="Allow analytics").click()
    page.locator("#torusPlay").click()
    page.locator("#masterBrightness").focus()
    page.keyboard.press("ArrowRight")
    page.locator("details[data-mode='Einstein'] > summary").click()
    rows = page.evaluate("Array.from(dataLayer).filter(x => x && x[0]).map(x => Array.from(x))")
    configs = [row for row in rows if row[:2] == ["config", STREAM]]
    assert len(configs) == 1 and configs[0][2]["page_location"] == HOST + LOOM
    names = [r[1] for r in rows if r[0] == "event"]
    assert names.count("scope_first_interaction") == 1
    assert names.count("loom_control") == 2 and names.count("instrument_drawer_open") == 1
    assert sum("googletagmanager.com/gtag/js?" in r for r in requests) == 1
    if tag:
        # Allow the actual Google library to emit its network batches.
        deadline = monotonic() + 12
        while monotonic() < deadline:
            if set(names) <= {h.get("en", [""])[0] for h in hits}:
                break
            page.wait_for_timeout(100)
        recorded = [h for h in hits if h.get("tid") == [STREAM]]
        sent = [h["en"][0] for h in recorded if h.get("en")]
        assert sent.count("page_view") == 1 and set(names) <= set(sent), sent
        assert all(h.get("dl") == [HOST + LOOM] for h in recorded)
        print("Google collection events intercepted:", ", ".join(sent))

    second = context.new_page()
    second.goto(HOST + LIBRARY, wait_until="domcontentloaded")
    expect(second.get_by_role("button", name="Privacy choices")).to_be_visible()
    second.evaluate("document.addEventListener('click', e => e.preventDefault(), {capture:true})")
    second.get_by_role("link", name="Open the Light Loom").click()
    hero = second.evaluate("Array.from(dataLayer).filter(x=>x && x[0]==='event' && x[1]==='observatory_open').map(x=>x[2])")
    assert len(hero) == 1 and hero[0]["placement"] == "hero"
    second.get_by_role("button", name="Privacy choices").click()
    second.get_by_role("button", name="Decline analytics").click()
    page.wait_for_function("!window.dataLayer")
    assert not any(c["name"].startswith("_ga") for c in context.cookies())
    recorded_consent = json.loads(second.evaluate("(k) => localStorage.getItem(k)", KEY))
    assert recorded_consent["choice"] == "deny"
    print("Consent, duplicate installation, page view, Loom interactions, hero launch, and cross-tab revocation passed.")
    context.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--chromium", help="Chromium executable if using a system installation")
    parser.add_argument("--google-tag", type=Path, help="Optional current gtag.js file for this stream")
    options = parser.parse_args()
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path=options.chromium)
        try:
            run(browser, options.google_tag.read_bytes() if options.google_tag else None)
        finally:
            browser.close()
