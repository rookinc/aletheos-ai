#!/usr/bin/env bash
set -u

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$APP_DIR"

HOST="${HOST:-127.0.0.1}"
PORT="${PORT:-8000}"
pidfile="run/web.pid"

if [ -f "$pidfile" ]; then
  pid="$(cat "$pidfile" 2>/dev/null || true)"
  if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
    echo "aletheos web running: pid $pid"
  else
    echo "aletheos web stopped"
  fi
else
  echo "aletheos web stopped"
fi

echo "URL: http://$HOST:$PORT/"
curl -s -I "http://$HOST:$PORT/" 2>/dev/null | head -5 || true
