#!/usr/bin/env bash
# Install into the existing public CORI-0089 instrument from the release root or SSH-enabled Termux checkout.
set -euo pipefail
tools_dir=$(cd -- "$(dirname -- "$0")" && pwd)
target=${WITNESS_SSH_TARGET:-gurtiamy}
tmp=$(mktemp -d)
trap 'rm -rf -- "$tmp"' EXIT
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
python3 -B reciprocal-witness-deployment/update_sitters.py apply
python3 -B reciprocal-witness-deployment/update_sitters.py verify" < "$tmp/extension.tar.gz"
