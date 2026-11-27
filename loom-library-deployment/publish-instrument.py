#!/usr/bin/env python3
"""Publish the self-contained Light Loom and update its entry in the live registry."""
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


RAW = "https://raw.githubusercontent.com/rookinc/aletheos-ai/"
LIVE = "https://aletheos.ai/"
APP = "observatories/universal-carrier/index.html"
REGISTRY = "observatories/registry.json"
# Source actually served and registered immediately before the scope release.
LIVE_BEFORE = "1c0855c2c18af77c78221e20f839118c6e41051e9dbf5c50f2e2d95df8f022a3"


def digest(data):
    return hashlib.sha256(data).hexdigest()


def registered(data):
    rows = [row for row in json.loads(data)["instruments"] if row.get("id") == "universal-carrier"]
    if len(rows) != 1 or rows[0].get("entrypoint") != "universal-carrier/index.html":
        raise ValueError("Expected exactly one Light Loom entry with its canonical entrypoint")
    result = rows[0]["artifact_sha256"]
    if not isinstance(result, str) or not re.fullmatch("[0-9a-f]{64}", result):
        raise ValueError("Invalid Light Loom registry SHA-256")
    return result


def read_existing(root, name):
    path = root / name
    if path.is_symlink() or root not in path.resolve().parents or not path.is_file():
        raise ValueError("Unexpected destination: " + str(path))
    return path.read_bytes()


def write_atomic(path, data, mode):
    fd, name = tempfile.mkstemp(dir=str(path.parent), prefix=".loom-")
    try:
        with os.fdopen(fd, "wb") as stream:
            stream.write(data)
            stream.flush()
            os.fchmod(stream.fileno(), mode)
            os.fsync(stream.fileno())
        os.replace(name, path)
    finally:
        if os.path.exists(name):
            os.unlink(name)


def install(root, state, app, target):
    if digest(app) != target:
        raise ValueError("Release HTML does not match its pinned registry")
    root = root.resolve()
    state.mkdir(mode=0o700, parents=True, exist_ok=True)
    with (state / "publish.lock").open("a") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        previous = {name: read_existing(root, name) for name in (APP, REGISTRY)}
        old_digest = digest(previous[APP])
        reg_digest = registered(previous[REGISTRY])
        # Accept a restart between the two file replacements after process/power loss.
        if old_digest not in {LIVE_BEFORE, target} or reg_digest not in {LIVE_BEFORE, target}:
            raise ValueError("Light Loom changed on the host. Compare its HTML and registry before publishing.")
        registry = previous[REGISTRY]
        if reg_digest != target:
            token = ('"' + reg_digest + '"').encode("ascii")
            if registry.count(token) != 1:
                raise ValueError("The old digest does not uniquely identify the Light Loom registry field")
            registry = registry.replace(token, ('"' + target + '"').encode("ascii"))
            if registered(registry) != target:
                raise ValueError("Registry update did not reach the Light Loom entry")
        updates = [(name, data) for name, data in [(APP, app), (REGISTRY, registry)] if previous[name] != data]
        if not updates:
            print("Light Loom already installed.")
            return
        modes = {name: stat.S_IMODE((root / name).stat().st_mode) for name, _ in updates}
        backup = Path(tempfile.mkdtemp(prefix="before-instrument-", dir=str(state)))
        for name, _ in updates:
            dst = backup / name
            dst.parent.mkdir(parents=True, exist_ok=True)
            write_atomic(dst, previous[name], modes[name])
        written = []
        try:
            for name, data in updates:
                if read_existing(root, name) != previous[name]:
                    raise ValueError("Concurrent change to " + name)
                write_atomic(root / name, data, modes[name])
                written.append((name, data))
        except BaseException:
            for name, data in reversed(written):
                if read_existing(root, name) == data:
                    write_atomic(root / name, previous[name], modes[name])
            raise
        print("Installed Light Loom. Backup: " + str(backup))


def download(url):
    request = urllib.request.Request(url, headers={"Cache-Control": "no-cache", "User-Agent": "LightLoom/1.0"})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(request, timeout=35) as response:
                return response.read()
        except OSError:
            if attempt == 2:
                raise
            time.sleep(1 + attempt)


def publish(revision, host):
    if not re.fullmatch("[0-9a-f]{40}", revision):
        raise ValueError("Use a full 40-character Git commit SHA")
    if not re.fullmatch("[A-Za-z0-9_][A-Za-z0-9_@.:-]*", host):
        raise ValueError("Invalid SSH target")
    pinned = RAW + revision + "/public_html/"
    app = download(pinned + APP)
    target = registered(download(pinned + REGISTRY))
    if digest(app) != target:
        raise ValueError("Pinned GitHub HTML does not match its release registry")
    payload = {"html": base64.b64encode(app).decode("ascii"), "sha256": target}
    source = Path(__file__).read_text(encoding="utf-8")
    subprocess.run(["ssh", "-T", host, "python3 -c " + shlex.quote(source) + " --install"],
                   input=json.dumps(payload).encode("ascii"), check=True)
    query = "?loom-release=" + revision
    served = download(LIVE + APP[:-len("index.html")] + query)
    served_registry = download(LIVE + REGISTRY + query)
    if digest(served) != target or registered(served_registry) != target:
        raise RuntimeError("The public HTML and registry have not both verified. Re-run to check after cache expiry.")
    print("Verified " + LIVE + APP[:-len("index.html")] + " and registry, SHA-256 " + target)


def main():
    if sys.argv[1:] == ["--install"]:
        payload = json.load(sys.stdin)
        install(Path.home() / "www", Path.home() / ".aletheos-loom-feature",
                base64.b64decode(payload["html"], validate=True), payload["sha256"])
        return
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("revision", help="full GitHub release commit")
    parser.add_argument("--host", default="gurtiamy", help="SSH host or existing alias (default: gurtiamy)")
    args = parser.parse_args()
    publish(args.revision, args.host)


if __name__ == "__main__":
    try:
        main()
    except (OSError, KeyError, ValueError, RuntimeError, subprocess.CalledProcessError) as error:
        sys.exit(str(error))
