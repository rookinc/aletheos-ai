#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

cmd="${1:-help}"

case "$cmd" in
  start|up)
    ./scripts/start-bg.sh
    ;;
  stop|down)
    ./scripts/stop-bg.sh
    ;;
  restart)
    ./scripts/stop-bg.sh
    ./scripts/start-bg.sh
    ;;
  status)
    ./scripts/status-bg.sh
    ;;
  logs)
    tail -80 logs/web.log 2>/dev/null || true
    ;;
  foreground|fg)
    HOST="${HOST:-127.0.0.1}"
    PORT="${PORT:-8000}"
    DOCROOT="${DOCROOT:-public_html}"
    exec php -S "$HOST:$PORT" -t "$DOCROOT"
    ;;
  *)
    echo "Usage: ./run.sh start|stop|restart|status|logs|foreground"
    ;;
esac
