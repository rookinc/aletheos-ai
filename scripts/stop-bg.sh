#!/usr/bin/env bash
set -u

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$APP_DIR"

pidfile="run/web.pid"

if [ ! -f "$pidfile" ]; then
  echo "aletheos web not running: no pidfile"
  exit 0
fi

pid="$(cat "$pidfile" 2>/dev/null || true)"

if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
  echo "stopping aletheos web pid $pid"
  kill "$pid" 2>/dev/null || true
else
  echo "aletheos web not running"
fi

rm -f "$pidfile"
