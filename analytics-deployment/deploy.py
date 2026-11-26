#!/usr/bin/env python3
"""Publish analytics to the existing Aletheos webroot using the owner's SSH alias."""
import argparse
import base64
import concurrent.futures
import fcntl
import json
import os
from pathlib import Path
import re
import shlex
import subprocess
import sys
import tempfile
import uuid

ORIGIN = "https://aletheos.ai"
RAW = "https://raw.githubusercontent.com/rookinc/aletheos-ai"
SCRIPT = "assets/aletheos-analytics/analytics.js"
PREFIX = "analytics-deployment/"
PAYLOAD = {"adapter": "public_html/" + SCRIPT, "config": PREFIX + "browser.conf",
           "check": PREFIX + "check_coverage.py"}
TAG = '<script defer src="/' + SCRIPT + '"></script>'
MARKER = SCRIPT.encode()
START = b"# BEGIN Aletheos consent analytics\n"
END = b"# END Aletheos consent analytics\n"
LEGACY_TAG = b"""<script async src="https://www.googletagmanager.com/gtag/js?id=G-3MHQ9Y1GJX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-3MHQ9Y1GJX');
  </script>"""
# Accept whitespace changes in the exact known loader/config pair, leaving other scripts intact.
LEGACY = re.compile(rb"(?:<!-- Google tag \(gtag\.js\) -->\s*)?" +
                    rb"\s+".join(re.escape(word) for word in LEGACY_TAG.split()))
LEGACY_PAGES = (
    "labs/p900_observatory/lab.html", "labs/informative_action/", "labs.php", "papers.php",
    "research.php", "philosophy.php", "the_thalean_graph_at4val_60_6.php", "evidence.php",
    "glossary.php", "thalean_action_theory.php", "coherence.php",
    "philosophy/consciousness-and-relation.php", "philosophy/let-my-trace-not-be-cruelty.php",
    "research/from-circle-to-thalion.php", "research/memory-and-possibility.php",
    "research/thalean-mathematical-spaces.php",
)
PUBLIC_ROOT = "index|labs|research|papers|philosophy|evidence|glossary|coherence|the_thalean_graph_at4val_60_6|thalean_action_theory"
PUBLIC_AREAS = "library|observatories|labs|research|philosophy|thalean-explorer"
EXCLUDED = "admin|auth|internal|private|includes?|assets?|data|exports?|downloads?|backups?|bak|archive|fixtures?|tests?|debug|verification|certificates?|source|vendor"
PUBLIC_PATH = (r"(?:|(?:" + PUBLIC_ROOT + r")[.]php|(?:" + PUBLIC_AREAS +
               r")/(?:[A-Za-z0-9_-]+/)*(?:[A-Za-z0-9_.-]+[.](?:html?|php))?)")
ORIGINAL_APP = "/observatories/universal-carrier/"
DIRECTORY = "/observatories/"


def apache_config(source, provider, path_pattern=PUBLIC_PATH):
    # THE_REQUEST retains the original route after DirectoryIndex and the library's internal rewrite.
    scope = ("req('Host') =~ m#^(?:www[.])?aletheos[.]ai(?::443)?$#i"
             " && %{THE_REQUEST} =~ m#^(?:GET|HEAD) /" + path_pattern + "[? ]#"
             " && %{THE_REQUEST} !~ m#^(?:GET|HEAD) [^? ]*/(?:" + EXCLUDED +
             ")(?:[./_? -]|$)#i")
    quoted_tag = TAG.replace('"', "'")
    if provider == "SUBSTITUTE":
        # A real current page (XYZ Flower) exceeds Apache's 1 MiB default per line.
        # A doctype is present on every audited public page, including instruments with no head tag.
        transform = ('SubstituteMaxLineLength 32m\n'
                     'Substitute "s@^([[:space:]]*<!doctype[[:space:]]+html[[:space:]]*>)@$1' +
                     quoted_tag + '@i"')
    else:
        transform = 'OutputSed "$s@$@' + quoted_tag + '@"'
    return (source.decode().replace("SCOPE &&", scope + " &&").replace("PROVIDER", provider)
            .replace("TRANSFORM", transform).encode())


def replace_config(original, config):
    begin, end = original.count(START), original.count(END)
    if (begin, end) not in ((0, 0), (1, 1)):
        raise ValueError("Existing analytics .htaccess block is incomplete")
    block = START + config.rstrip() + b"\n" + END
    if begin:
        a, b = original.index(START), original.index(END)
        if a >= b:
            raise ValueError("Invalid analytics .htaccess markers")
        return original[:a] + block + original[b + len(END):]
    return original + (b"\n" if original and not original.endswith(b"\n") else b"") + block


def public_get(route, dest="", accept="*/*", query=""):
    # curl runs in Termux or on Bluehost; no Google URL is contacted by these checks.
    with tempfile.TemporaryDirectory() as tmp:
        headers = Path(tmp) / "headers"
        args = ["curl", "--compressed", "--fail", "--silent", "--show-error", "--location",
                "--max-time", "25", "--dump-header", str(headers), "-H", "Accept: " + accept,
                "-H", "Cache-Control: no-cache"]
        if dest:
            args += ["-H", "Sec-Fetch-Dest: " + dest]
        data = subprocess.check_output(args + [ORIGIN + route + "?analytics_release=" + query])
        h = headers.read_bytes().replace(b"\r", b"").strip().split(b"\n\n")[-1].lower()
        return data, h


def check_variants(route, raw, key):
    # The same cache key is exercised raw -> browser -> raw. A fallback for older browsers
    # also treats an explicit HTML Accept header as navigation in the absence of Fetch Metadata.
    for dest, accept, browser in [("", "*/*", False), ("document", "text/html", True),
                                  ("", "*/*", False), ("", "text/html", True)]:
        data, headers = public_get(route, dest, accept, key)
        vary = b",".join(re.findall(rb"^vary:\s*(.+)$", headers, re.M)).replace(b" ", b"").split(b",")
        if b"sec-fetch-dest" not in vary or b"accept" not in vary:
            raise ValueError("Missing cache variation on " + route)
        if browser:
            if data.count(MARKER) != 1:
                raise ValueError("Expected one local analytics adapter on " + route)
        elif data != raw:
            raise ValueError("Unmodified artifact response differs on " + route)


def select_provider(root, config):
    with tempfile.TemporaryDirectory(prefix="aletheos-ga-probe-", dir=str(root)) as folder:
        probe = Path(folder)
        # Fixtures deliberately omit head and title; the long line exercises instrument embeds.
        sample = b"<!doctype html><html><body><canvas></canvas><!--" + b"." * 1350000 + b"--></body></html>\n"
        (probe / "index.html").write_bytes(sample)
        (probe / "index.html").chmod(0o644)
        probe.chmod(0o755)
        errors = []
        for provider in ("SUBSTITUTE", "Sed"):
            rules = probe / ".htaccess"
            rules.write_bytes(b"FilterChain !\n" + apache_config(config, provider, re.escape(probe.name) + "/"))
            rules.chmod(0o644)
            try:
                check_variants("/" + probe.name + "/", sample, uuid.uuid4().hex)
                return provider
            except (ValueError, subprocess.CalledProcessError) as error:
                errors.append(str(error))
        raise RuntimeError("The isolated Bluehost test could not apply either HTML filter. "
                           "Enable mod_filter, mod_headers and mod_substitute with FileInfo/Options "
                           "overrides, or enable mod_sed with AllowOverrideList OutputSed. "
                           "Existing site configuration was preserved. " + " / ".join(errors))


def inside(root, path):
    if path.is_symlink() or root not in path.resolve().parents:
        raise ValueError("Unexpected destination " + str(path))
    return path


def read(path):
    return path.read_bytes() if path.exists() else None


def write(path, contents, mode):
    fd, tmp = tempfile.mkstemp(prefix=".analytics-", dir=str(path.parent))
    try:
        with os.fdopen(fd, "wb") as stream:
            stream.write(contents)
            stream.flush()
            os.fchmod(stream.fileno(), mode)
            os.fsync(stream.fileno())
        os.replace(tmp, path)
    finally:
        if os.path.exists(tmp):
            os.unlink(tmp)


def legacy_sources(root):
    paths = set(root / name for name in ("includes/analytics.php", "includes/header.php",
                "includes/site_header.php", "includes/site_footer.php", "includes/footer.php"))
    for name in LEGACY_PAGES:
        p = root / name
        if name.endswith("/"):
            paths.update(p / index for index in ("index.php", "index.html"))
        else:
            paths.add(p)
    for p in sorted(paths):
        if inside(root, p).is_file():
            old = p.read_bytes()
            new, count = LEGACY.subn(b"", old)
            if count:
                yield p, old, new


def install(root, state, payload):
    root = root.resolve()
    if not all((root / name).is_file() for name in ["index.php", "observatories/index.html",
                                                       "observatories/universal-carrier/index.html"]):
        raise ValueError("Expected the Aletheos website in ~/public_html")
    state.mkdir(exist_ok=True, mode=0o700)
    with (state / "publish.lock").open("a") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        config = inside(root, root / ".htaccess")
        old_config = read(config)
        # A repeat install already has a working provider. A child .htaccess would
        # inherit its Substitute expressions, so a second canary could double-apply them.
        provider = next((p for p in ("SUBSTITUTE", "Sed") if old_config and
                         replace_config(old_config, apache_config(payload["config"], p)) == old_config), None)
        if provider is None:
            provider = select_provider(root, payload["config"])
        key = uuid.uuid4().hex
        before = {path: public_get(path, query=key)[0] for path in (ORIGINAL_APP, DIRECTORY)}
        adapter = inside(root, root / SCRIPT)
        adapter.parent.mkdir(exist_ok=True, mode=0o755)
        plan = [(adapter, read(adapter), payload["adapter"]), *legacy_sources(root),
                (config, old_config, replace_config(old_config or b"", apache_config(payload["config"], provider)))]
        if len({p for p, _, _ in plan}) != len(plan):
            raise RuntimeError("Duplicate deployment path")
        changes = []
        for p, old, new in plan:
            if old != new:
                changes.append((p, old, new, p.stat().st_mode & 0o777 if old is not None else 0o644))
        if changes:
            backup = Path(tempfile.mkdtemp(prefix="before-", dir=str(state)))
            for p, old, new, mode in changes:
                if old is not None:
                    saved = backup / p.relative_to(root)
                    saved.parent.mkdir(parents=True, exist_ok=True)
                    saved.write_bytes(old)
            print("Private backup: " + str(backup), flush=True)
        written = []
        try:
            for p, old, new, mode in changes:
                if read(p) != old:
                    raise RuntimeError("Concurrent change to " + str(p))
                write(p, new, mode)
                written.append((p, old, new, mode))
            if public_get("/" + SCRIPT, query=key)[0] != payload["adapter"]:
                raise ValueError("Published adapter differs from the release")
            for route, raw in before.items():
                check_variants(route, raw, key + "after")
            with tempfile.TemporaryDirectory(dir=str(state)) as tmp:
                check = Path(tmp) / "check_coverage.py"
                check.write_bytes(payload["check"])
                subprocess.run([sys.executable, str(check)], check=True)
        except BaseException:
            for p, old, new, mode in reversed(written):
                if read(p) == new:
                    if old is None:
                        p.unlink()
                    else:
                        write(p, old, mode)
            print("Analytics changes from this run rolled back.", file=sys.stderr)
            raise
        print("Verified consent analytics and canonical artifact bytes via " + provider + ".")


def main():
    if sys.argv[1:] == ["--host"]:
        payload = {k: base64.b64decode(v, validate=True) for k, v in json.load(sys.stdin).items()}
        if set(payload) != set(PAYLOAD):
            raise ValueError("Incomplete release")
        install(Path.home() / "public_html", Path.home() / ".aletheos-analytics-deployments", payload)
        return
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("revision")
    args = parser.parse_args()
    if not re.fullmatch("[0-9a-f]{40}", args.revision):
        parser.error("Use a full Git commit SHA")
    def download(item):
        key, path = item
        data = subprocess.check_output(["curl", "-fsSL", "--retry", "2", "--max-time", "40",
                                        RAW + "/" + args.revision + "/" + path])
        return key, base64.b64encode(data).decode("ascii")
    with concurrent.futures.ThreadPoolExecutor(3) as pool:
        payload = dict(pool.map(download, PAYLOAD.items()))
    source = Path(__file__).read_text(encoding="utf-8")
    subprocess.run(["ssh", "-T", "gurtiamy", "python3 -c " + shlex.quote(source) + " --host"],
                   input=json.dumps(payload).encode("ascii"), check=True)


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError, RuntimeError, subprocess.CalledProcessError) as error:
        sys.exit(str(error))
