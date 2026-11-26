#!/usr/bin/env python3
"""Check publicly listed Aletheos HTML for the consent-aware loader without running JavaScript."""
import argparse
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
import json
import re
import sys
from urllib.error import HTTPError
from urllib.parse import urljoin, urlsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener

TAG = '/assets/aletheos-analytics/analytics.js'
ROOT_PAGES = {
    '/', '/index.php', '/labs.php', '/research.php', '/papers.php', '/philosophy.php',
    '/evidence.php', '/glossary.php', '/coherence.php', '/the_thalean_graph_at4val_60_6.php',
    '/thalean_action_theory.php',
}
SEEDS = ROOT_PAGES | {'/library/', '/library/collections/', '/library/observatories/',
                      '/observatories/', '/observatories/universal-carrier/', '/thalean-explorer/',
                      '/labs/p900_observatory/lab.html', '/labs/informative_action/'}
PAGE = re.compile(r'^/(?:library|observatories|labs|research|philosophy|thalean-explorer)/'
                  r'(?:[A-Za-z0-9_-]+/)*(?:[A-Za-z0-9_.-]+\.(?:html?|php))?$')
EXCLUDE = re.compile(r'/(?:admin|auth|internal|private|includes?|assets?|data|exports?|downloads?|'
                     r'backups?|bak|archive|fixtures?|tests?|debug|verification|certificates?|'
                     r'source|vendor)(?:[./_-]|$)', re.I)
GOOGLE = re.compile(r'(?:^|\.)(?:googletagmanager\.com|google-analytics\.com)$', re.I)
CONFIG = re.compile(r"""\bgtag\s*\(\s*['"]config['"]|(?:googletagmanager|google-analytics)\.com/""", re.I)


def public_path(href, base, site):
    if href.startswith(('#', '?')):
        return None
    u = urlsplit(urljoin(base, href))
    if (u.scheme, u.netloc) != (site.scheme, site.netloc):
        return None
    return u.path if u.path in ROOT_PAGES or (PAGE.fullmatch(u.path) and not EXCLUDE.search(u.path)) else None


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.base = None
        self.links, self.scripts, self.frames, self.inline = [], [], [], []
        self.in_script = False

    def handle_starttag(self, tag, pairs):
        a = dict(pairs)
        if tag == 'base' and self.base is None and a.get('href'):
            self.base = a['href']
        if tag == 'a' and a.get('href'):
            self.links.append(a['href'])
        if tag == 'iframe' and a.get('src'):
            self.frames.append(a['src'])
        if tag == 'script':
            self.in_script = a.get('type', '').lower() in ('', 'module', 'application/javascript', 'text/javascript')
            if self.in_script and a.get('src'):
                self.scripts.append(a['src'])

    def handle_endtag(self, tag):
        if tag == 'script':
            self.in_script = False

    def handle_data(self, data):
        if self.in_script:
            self.inline.append(data)


class LocalRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        src, dst = urlsplit(req.full_url), urlsplit(newurl)
        if (src.scheme, src.netloc) != (dst.scheme, dst.netloc):
            raise ValueError('Off-site redirect from ' + req.full_url)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def fetch(url, html=True):
    headers = {'User-Agent': 'Mozilla/5.0 (compatible; AletheosCoverage/1.0)', 'Cache-Control': 'no-cache',
               'Sec-Fetch-Dest': 'document' if html else 'empty',
               'Accept': 'text/html,application/xhtml+xml' if html else 'application/json'}
    for attempt in range(2):
        try:
            with build_opener(LocalRedirect()).open(Request(url, headers=headers), timeout=25) as res:
                kind = res.headers.get_content_type()
                if html and kind not in ('text/html', 'application/xhtml+xml'):
                    raise ValueError('Unexpected response type ' + kind)
                return res.geturl(), res.read().decode('utf-8', 'replace')
        except OSError as exc:
            if attempt or getattr(exc, 'code', 500) < 500:
                raise


def inspect(path, origin, site):
    try:
        final, text = fetch(origin + path)
        page = Page()
        page.feed(text)
        base = urljoin(final, page.base or '')
        scripts = [urlsplit(urljoin(base, src)) for src in page.scripts]
        n = sum((s.scheme, s.netloc, s.path) == (site.scheme, site.netloc, TAG) for s in scripts)
        direct = any(GOOGLE.search(s.hostname or '') for s in scripts)
        direct |= any(GOOGLE.search(urlsplit(urljoin(base, f)).hostname or '') for f in page.frames)
        direct |= any(CONFIG.search(block) for block in page.inline)
        failures = []
        if n != 1:
            failures.append('expected one site loader, found ' + str(n))
        if direct:
            failures.append('direct Google Analytics or Tag Manager code')
        links = {public_path(h, base, site) for h in page.links + page.frames}
        return failures, links - {None}, None
    except HTTPError as exc:
        return [str(exc)], set(), exc.code
    except (OSError, ValueError) as exc:
        return [str(exc)], set(), None


def audit(origin):
    site = urlsplit(origin)
    pending = set(SEEDS)
    records = json.loads(fetch(origin + '/library/catalog.json', False)[1])
    instruments = json.loads(fetch(origin + '/observatories/registry.json', False)[1])['instruments']
    if not records or not instruments:
        raise ValueError('The public catalog or registry is empty')
    for row in records:
        if not re.fullmatch(r'cori-\d+', row['id']):
            raise ValueError('Unrecognized public record ID')
        pending.add('/library/records/' + row['id'] + '/')
    for entry in instruments:
        path = public_path(entry['url'], origin, site)
        if not path:
            raise ValueError('Unexpected instrument URL in public registry: ' + entry['url'])
        pending.add(path)

    required = set(pending)
    checked, failed, unavailable, groups = set(), {}, {}, Counter()
    with ThreadPoolExecutor(max_workers=6) as pool:
        while pending:
            if len(pending | checked) > 500:
                raise ValueError('Coverage scan exceeded 500 public routes')
            batch = sorted(pending)
            checked.update(batch)
            pending.clear()
            for path, (problems, links, status) in zip(batch, pool.map(lambda p: inspect(p, origin, site), batch)):
                if status in (404, 410) and path not in required:
                    unavailable[path] = status
                    continue
                group = path.split('/')[1] or 'root'
                groups['root' if group.endswith('.php') else group] += 1
                if problems:
                    failed[path] = problems
                pending.update(links - checked)
    measured = len(checked) - len(unavailable)
    print('Public HTML routes: {} checked, {} passed, {} failed. Library records: {}. Registry entries: {}.'
          .format(measured, measured - len(failed), len(failed), len(records), len(instruments)))
    print('Route groups: ' + ', '.join('{} {}'.format(k, n) for k, n in sorted(groups.items())))
    for path, status in sorted(unavailable.items()):
        print('UNAVAILABLE {}{}  HTTP {} (linked outside the public inventories)'.format(origin, path, status))
    for path, problems in sorted(failed.items()):
        print('FAIL {}{}  {}'.format(origin, path, ', '.join(problems)))
    return int(bool(failed))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--site', default='https://aletheos.ai', help='public origin or local test origin')
    origin = parser.parse_args().site.rstrip('/')
    try:
        sys.exit(audit(origin))
    except (OSError, ValueError, KeyError, TypeError) as error:
        sys.exit('Could not complete public coverage check: ' + str(error))
