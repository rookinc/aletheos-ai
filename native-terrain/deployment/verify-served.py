"""Verify packaged HTTP bytes; stop on explicit security rejection, without retries.

This is independent of browser QA. A successful browser visit cannot establish
that these requests received the exact expected asset bytes.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
from urllib.error import HTTPError
from urllib.parse import quote
from urllib.request import Request, urlopen

MAX_ERROR_BODY_BYTES = 2048


class HTTPVerificationError(Exception):
    def __init__(self, details):
        super().__init__(details['reason'])
        self.details = details


def http_error_details(response, status, reason):
    # Do not expose cookies, authentication headers, or unbounded response bodies.
    raw = response.read(MAX_ERROR_BODY_BYTES + 1)
    excerpt = raw[:MAX_ERROR_BODY_BYTES].decode('utf-8', errors='replace')
    explicit_security_rejection = (
        status in (403, 406, 429)
        and re.search(r'\bMod[_ -]?Security\b', excerpt, re.I) is not None
    )
    headers = response.headers
    return {
        'reason': str(reason),
        'http_status': status,
        'content_type': headers.get('Content-Type') if headers else None,
        'server': headers.get('Server') if headers else None,
        'body_excerpt': excerpt,
        'body_truncated': len(raw) > MAX_ERROR_BODY_BYTES,
        'explicit_security_rejection': explicit_security_rejection,
    }


def fetch(url):
    # Preserve the original request identity and negotiation behavior. No header
    # substitutions or retries are used to work around a server rejection.
    try:
        with urlopen(Request(url, headers={'Cache-Control': 'no-cache'}), timeout=30) as response:
            if response.status != 200:
                raise HTTPVerificationError(http_error_details(
                    response, response.status, 'HTTP ' + str(response.status)))
            return response.read()
    except HTTPError as error:
        try:
            details = http_error_details(error, error.code, str(error))
        finally:
            error.close()
        raise HTTPVerificationError(details) from error


def verify_site(site, release_url, entry_url=None):
    site = Path(site)
    manifest = json.loads((site / 'manifest.json').read_text())
    expected = dict(manifest['files'])
    expected['manifest.json'] = hashlib.sha256((site / 'manifest.json').read_bytes()).hexdigest()
    files = list(expected.items())
    failures = []
    not_checked = []
    checked = verified = 0
    entry_checked = entry_verified = False
    stop_reason = None

    for index, (name, digest) in enumerate(files):
        checked += 1
        try:
            actual = hashlib.sha256(fetch(release_url.rstrip('/') + '/' + quote(name))).hexdigest()
            if actual != digest:
                failures.append({'file': name, 'reason': 'SHA-256 mismatch'})
            else:
                verified += 1
        except HTTPVerificationError as error:
            failures.append({'file': name, **error.details})
            if error.details['explicit_security_rejection']:
                stop_reason = 'explicit_security_rejection'
                not_checked.extend(n for n, _ in files[index + 1:])
                break
        except Exception as error:
            failures.append({'file': name, 'reason': str(error)})

    if entry_url and stop_reason:
        not_checked.append('public living.html')
    elif entry_url:
        try:
            release_name = release_url.rstrip('/').rsplit('/', 1)[-1]
            source = (site / 'living.html').read_text()
            activated, count = re.subn(
                r'(<head\b[^>]*>)',
                lambda match: match.group(1) + '<base href="./' + release_name + '/">',
                source, count=1, flags=re.I)
            if count != 1:
                failures.append({'file': 'public living.html', 'reason': 'Source entry requires one head element'})
                not_checked.append('public living.html')
            else:
                entry_checked = True
                if fetch(entry_url) != activated.encode():
                    failures.append({'file': 'public living.html', 'reason': 'Entry bytes/base URL mismatch'})
                else:
                    entry_verified = True
        except HTTPVerificationError as error:
            failures.append({'file': 'public living.html', **error.details})
            if error.details['explicit_security_rejection']:
                stop_reason = 'explicit_security_rejection'
        except Exception as error:
            failures.append({'file': 'public living.html', 'reason': str(error)})
            if not entry_checked:
                not_checked.append('public living.html')

    complete = checked == len(files) and (not entry_url or entry_checked)
    return {
        'schema': 'aletheos.served-verification.v1',
        'release_url': release_url,
        'files_planned': len(files),
        'files_checked': checked,
        'files_verified': verified,
        'files_skipped': len(files) - checked,
        'entry_requested': bool(entry_url),
        'entry_checked': entry_checked,
        'entry_verified': entry_verified,
        'not_checked': not_checked,
        'complete': complete,
        'stopped_early': bool(not_checked),
        'stop_reason': stop_reason,
        'failures': failures,
        'browser_verified': False,
        'passed': complete and not failures and not not_checked,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('site', type=Path)
    parser.add_argument('release_url', help='Exact immutable living-release URL')
    parser.add_argument('--entry-url', help='Public /aletheos/living.html URL')
    args = parser.parse_args()
    receipt = verify_site(args.site, args.release_url, args.entry_url)
    print(json.dumps(receipt, indent=2))
    return 0 if receipt['passed'] else 1


if __name__ == '__main__':
    raise SystemExit(main())
