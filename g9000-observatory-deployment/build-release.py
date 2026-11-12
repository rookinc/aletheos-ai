#!/usr/bin/env python3
"""Build a deterministic, self-verifying static release using only the stdlib."""
import argparse
import hashlib
import html
import io
import json
from pathlib import Path, PurePosixPath
import re
import tarfile
from urllib.parse import unquote, urlsplit

SCHEMA = "g9000-observatory-release/1"


def digest(data):
    return hashlib.sha256(data).hexdigest()


def canonical(value):
    return (json.dumps(value, sort_keys=True, separators=(",", ":")) + "\n").encode()


def build(source, output):
    source = source.resolve()
    if not source.is_dir() or not (source / "index.html").is_file():
        raise ValueError("Source directory with index.html required")
    payload = {}
    for path in sorted(source.rglob("*")):
        if path.is_symlink():
            raise ValueError("Source symlinks are not supported")
        if path.is_file():
            name = path.relative_to(source).as_posix()
            if any(part in (".", "..", "") for part in PurePosixPath(name).parts) or "\\" in name:
                raise ValueError("Unsafe source path")
            payload[name] = path.read_bytes()
    if len(payload) > 200 or sum(map(len, payload.values())) > 20 * 1024 * 1024:
        raise ValueError("Release exceeds the 200-file / 20 MiB limit")
    inventory = [{"path": name, "sha256": digest(data), "size": len(data)} for name, data in payload.items()]
    release_id = digest(canonical(inventory))
    prefix = "releases/" + release_id + "/"
    entry = payload["index.html"].decode("utf-8")

    def rewrite(match):
        value = html.unescape(match.group(3))
        parsed = urlsplit(value)
        if not parsed.path or parsed.scheme or parsed.netloc or parsed.path.startswith("/"):
            return match.group(0)
        name = unquote(parsed.path)
        while name.startswith("./"):
            name = name[2:]
        if name not in payload:
            raise ValueError("Local entry reference is not a source file: " + value)
        # Only href/src values change: URL hashes and native view selection retain their meaning.
        return match.group(1) + match.group(2) + prefix + match.group(3) + match.group(2)

    entry = re.sub(r"(\b(?:href|src)\s*=\s*)([\"'])(.*?)\2", rewrite, entry, flags=re.I)
    entry = "<!-- G9000-OBSERVATORY-RELEASE " + release_id + " -->\n" + entry
    files = {"index.html": entry.encode("utf-8")}
    files.update({prefix + name: data for name, data in payload.items()})
    manifest = {"schema": SCHEMA, "release_id": release_id,
                "index_sha256": digest(files["index.html"]),
                "files": [{"path": name, "sha256": digest(data), "size": len(data)}
                          for name, data in sorted(files.items())]}
    manifest_bytes = canonical(manifest)
    output.mkdir(parents=True, exist_ok=True)
    archive = output / "release.tar"
    with tarfile.open(archive, "w", format=tarfile.USTAR_FORMAT) as tar:
        for name, data in [("manifest.json", manifest_bytes), *sorted(files.items())]:
            info = tarfile.TarInfo(name)
            info.size, info.mode, info.mtime = len(data), 0o644, 0
            info.uid = info.gid = 0
            info.uname = info.gname = ""
            tar.addfile(info, io.BytesIO(data))
    (output / "manifest.json").write_bytes(manifest_bytes)
    result = {"schema": SCHEMA, "release_id": release_id,
              "archive": str(archive.resolve()), "archive_sha256": digest(archive.read_bytes()),
              "manifest_sha256": digest(manifest_bytes), "index_sha256": manifest["index_sha256"]}
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=Path(__file__).resolve().parents[1] / "public_html/observatories/g9000")
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    try:
        print(json.dumps(build(args.source, args.output), sort_keys=True))
    except (ValueError, OSError, UnicodeError) as error:
        parser.exit(1, "Release build stopped: " + str(error) + "\n")
