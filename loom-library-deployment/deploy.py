#!/usr/bin/env python3
"""Publish the Light Loom feature from a full rookinc/aletheos-ai commit SHA."""
import argparse
import base64
import fcntl
import hashlib
import json
import os
from pathlib import Path
import re
import shlex
import stat
import subprocess
import sys
import tempfile
import time
import urllib.request

HOST = "https://aletheos.ai"
RAW = "https://raw.githubusercontent.com/rookinc/aletheos-ai"
OBS = "observatories/"
LOOM = OBS + "universal-carrier/"
APP = LOOM + "index.html"
CSS = LOOM + "feature.css"
IMAGE = LOOM + "loom-hero.webp"
REGISTRY = OBS + "registry.json"
DIRECTORY = OBS + "index.html"
LIBRARY = "library/observatories/index.html"
# Write the links only after their dependencies exist.
FILES = (CSS, IMAGE, REGISTRY, DIRECTORY, LIBRARY)
# Production before this feature. The library's PHP-generated shell varies.
BASE = {
    REGISTRY: "9e7f5514ac5a9af0bcf0c619ec8ed1b7d68a29016b387b10ac0c18bdf4de28cf",
    DIRECTORY: "0a51babda1da84593503f6736c06ff96034e8364a1044c8039a976f55598267c",
    LIBRARY: "5282907765037efbc86139b0c810d9548d7a2fc1f6312076329040f9d1a0f71c",
}


def digest(data):
    return hashlib.sha256(data).hexdigest()


def main_span(data):
    matches = list(re.finditer(rb"<main\b[^>]*>.*?</main\s*>", data, re.I | re.S))
    if len(matches) != 1:
        raise ValueError("Expected a single library <main> element")
    return matches[0]


def read_target(path, root):
    if path.is_symlink() or root not in path.resolve().parents:
        raise ValueError("Unexpected destination: " + str(path))
    if not path.parent.is_dir():
        raise ValueError("Missing directory: " + str(path.parent))
    return path.read_bytes() if path.exists() else None


def atomic_write(path, data, mode):
    fd, temporary = tempfile.mkstemp(dir=str(path.parent), prefix=".loom-")
    try:
        with os.fdopen(fd, "wb") as stream:
            stream.write(data)
            stream.flush()
            os.fchmod(stream.fileno(), mode)
            os.fsync(stream.fileno())
        os.replace(temporary, path)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def app_digest(files):
    rows = json.loads(files[REGISTRY])["instruments"]
    matches = [r for r in rows if r["url"] == HOST + "/" + LOOM]
    if len(matches) != 1:
        raise ValueError("Expected exactly one Light Loom registry entry")
    return matches[0]["artifact_sha256"]


def install(root, state, files):
    """Run on the host. 'root' is the existing webroot and 'state' is private."""
    root = root.resolve()
    state.mkdir(mode=0o700, parents=True, exist_ok=True)
    with (state / "publish.lock").open("a") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        app = read_target(root / APP, root)
        if app is None or digest(app) != app_digest(files):
            raise ValueError("The installed Light Loom differs from the release registry")
        changes = []
        for name in FILES:
            path = root / name
            old = read_target(path, root)
            new = files[name]
            previous = old
            if name == LIBRARY:
                if old is None:
                    raise ValueError("The installed library source is missing")
                span = main_span(old)
                previous = span.group()
                new = old[:span.start()] + main_span(new).group() + old[span.end():]
            if old == new:
                continue
            expected = BASE.get(name)
            observed = None if previous is None else digest(previous)
            if observed != expected:
                raise ValueError("Changed since the verified production baseline: " + name)
            mode = stat.S_IMODE(path.stat().st_mode) if old is not None else 0o644
            changes.append((name, old, new, mode))
        if not changes:
            print("Light Loom feature already installed.")
            return
        backup = Path(tempfile.mkdtemp(prefix="before-", dir=str(state)))
        for name, old, _, mode in changes:
            if old is not None:
                copy = backup / name
                copy.parent.mkdir(parents=True, exist_ok=True)
                atomic_write(copy, old, mode)
        written = []
        try:
            for name, old, new, mode in changes:
                path = root / name
                if read_target(path, root) != old:
                    raise RuntimeError("Concurrent change to " + name)
                atomic_write(path, new, mode)
                written.append((name, old, new, mode))
        except BaseException:
            for name, old, new, mode in reversed(written):
                path = root / name
                if read_target(path, root) == new:
                    if old is None:
                        path.unlink()
                    else:
                        atomic_write(path, old, mode)
            raise
        print("Light Loom feature installed. Prior files: " + str(backup))


def download(url):
    request = urllib.request.Request(url, headers={"User-Agent": "Aletheos-Loom-Publisher/1.0",
                                                  "Cache-Control": "no-cache"})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(request, timeout=35) as response:
                return response.read()
        except OSError:
            if attempt == 2:
                raise
            time.sleep(1 + attempt)


def publish(revision):
    if not re.fullmatch(r"[0-9a-f]{40}", revision):
        raise ValueError("Use the full 40-character Git commit SHA")
    files = {name: download(RAW + "/" + revision + "/public_html/" + name) for name in FILES}
    source = Path(__file__).read_text(encoding="utf-8")
    payload = {name: base64.b64encode(data).decode("ascii") for name, data in files.items()}
    target = os.environ.get("LOOM_SSH_TARGET", "gurtiamy")
    if not re.fullmatch(r"[A-Za-z0-9_][A-Za-z0-9_@.:-]*", target):
        raise ValueError("Invalid SSH target")
    subprocess.run(["ssh", "-T", target, "python3 -c " + shlex.quote(source) + " --install"],
                   input=json.dumps(payload).encode("ascii"), check=True)
    # Compare served content by its public directory route, including the PHP library shell.
    for name in FILES + (APP,):
        route = name[:-len("index.html")] if name.endswith("/index.html") else name
        url = HOST + "/" + route
        served = download(url + "?loom-release=" + revision)
        if name == APP:
            matches = digest(served) == app_digest(files)
        elif name == LIBRARY:
            matches = main_span(served).group() == main_span(files[name]).group()
        else:
            matches = served == files[name]
        if not matches:
            raise RuntimeError("Installed, but public verification failed for " + url)
        print("Verified " + url)


def cli():
    if sys.argv[1:] == ["--install"]:
        raw = json.load(sys.stdin)
        if set(raw) != set(FILES):
            raise ValueError("Release files do not match this publisher")
        files = {name: base64.b64decode(raw[name], validate=True) for name in FILES}
        install(Path.home() / "www", Path.home() / ".aletheos-loom-feature", files)
    else:
        parser = argparse.ArgumentParser(description=__doc__)
        parser.add_argument("revision", help="full GitHub commit SHA")
        publish(parser.parse_args().revision)


if __name__ == "__main__":
    try:
        cli()
    except (OSError, subprocess.CalledProcessError, ValueError, RuntimeError) as error:
        sys.exit(str(error))
