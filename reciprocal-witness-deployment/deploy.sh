#!/usr/bin/env bash
# Run from the existing Aletheos checkout or the complete release ZIP.
set -euo pipefail
root=$(cd -- "$(dirname -- "$0")/.." && pwd)
target=${WITNESS_SSH_TARGET:-gurtiamy}
cd -- "$root"
test -f public_html/observatories/reciprocal-witness/index.html
test -f public_html/observatories/reciprocal-witness/field-guide.html
tar -czf - \
    public_html/observatories/reciprocal-witness \
    public_html/observatories/registry.json \
    public_html/library/records/cori-0089 \
    reciprocal-witness-deployment/catalog.py \
    reciprocal-witness-deployment/catalog-inputs.json \
    reciprocal-witness-deployment/catalog-baseline.zip \
    reciprocal-witness-deployment/install.py \
    reciprocal-witness-deployment/orthogonal_menu.py \
    reciprocal-witness-deployment/orthogonal-menu.json \
    reciprocal-witness-deployment/update_sitters.py \
    reciprocal-witness-deployment/sitters-release.json |
ssh "$target" 'set -eu
umask 077
stage=$(mktemp -d)
trap '\''rm -rf -- "$stage"'\'' EXIT
tar -xzf - -C "$stage"
python3 -B "$stage/reciprocal-witness-deployment/install.py" --verify-https
python3 -B "$stage/reciprocal-witness-deployment/update_sitters.py" apply --receipt "$stage/install-result.json"
python3 -B "$stage/reciprocal-witness-deployment/update_sitters.py" verify --receipt "$stage/install-result.json"'
