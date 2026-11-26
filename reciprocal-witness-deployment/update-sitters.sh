#!/usr/bin/env bash
# Install the Orthogonal field at CORI-0089 using the established SSH host.
set -euo pipefail
tools_dir=$(cd -- "$(dirname -- "$0")" && pwd)
target=${WITNESS_SSH_TARGET:-gurtiamy}
tmp=$(mktemp -d)
trap 'rm -rf -- "$tmp"' EXIT
case "${1:-install}" in
    install) action=apply ;;
    --remove-menu-link) action=restore-menu ;;
    *) echo "Usage: bash $0 [--remove-menu-link]" >&2; exit 2 ;;
esac
# PREPARE RELEASE BYTES
python3 -B "$tools_dir/update_sitters.py" pack "$tmp/extension.tar.gz"
digest=$(python3 -c 'import hashlib,sys; print(hashlib.sha256(open(sys.argv[1],"rb").read()).hexdigest())' "$tmp/extension.tar.gz")
# Only an exact copy of the locally prepared tar is extracted on the host.
ssh "$target" "set -eu
umask 077
stage=\$(mktemp -d)
trap 'rm -rf -- \"\$stage\"' EXIT
cat >\"\$stage/extension.tar.gz\"
cd -- \"\$stage\"
python3 -c 'import hashlib,sys; sys.exit(hashlib.sha256(open(\"extension.tar.gz\",\"rb\").read()).hexdigest()!=sys.argv[1])' '$digest'
tar -xzf extension.tar.gz
python3 -B reciprocal-witness-deployment/update_sitters.py $action --receipt install-result.json
python3 -B reciprocal-witness-deployment/update_sitters.py verify --receipt install-result.json" < "$tmp/extension.tar.gz"
