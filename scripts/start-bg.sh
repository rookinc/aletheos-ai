#!/usr/bin/env bash
set -u

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$APP_DIR"

HOST="${HOST:-127.0.0.1}"
PORT="${PORT:-8000}"
DOCROOT="${DOCROOT:-public_html}"

mkdir -p logs run

pidfile="run/web.pid"
logfile="logs/web.log"

if [ -f "$pidfile" ]; then
  pid="$(cat "$pidfile" 2>/dev/null || true)"
  if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
    echo "aletheos web already running: pid $pid"
    echo "URL: http://$HOST:$PORT/"
    exit 0
  fi
fi

if ! command -v php >/dev/null 2>&1; then
  echo "ERROR: php is not installed or not on PATH."
  exit 1
fi

if [ ! -d "$DOCROOT" ]; then
  echo "ERROR: document root not found: $DOCROOT"
  exit 1
fi

echo "starting Aletheos web on http://$HOST:$PORT/"
nohup php -S "$HOST:$PORT" -t "$DOCROOT" >> "$logfile" 2>&1 &
echo $! > "$pidfile"
echo "web pid $(cat "$pidfile")"
