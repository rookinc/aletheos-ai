# Thalean Graph Explorer v0.32

The release moves Model information to the bottom right of each stage and Pulse to the top left of Crystal. The stage has a subtle dark blue gradient.

From Termux, fetch the release and install it using the existing `gurtiamy` SSH alias.

```bash
(
  cd ~/dev/cori/website/aletheos.ai || exit 1
  git fetch origin deploy/thalean-graph-explorer-v0.32 || exit 1
  release_dir=$(mktemp -d) || exit 1
  trap 'rm -rf -- "$release_dir"' EXIT
  git show FETCH_HEAD:thalean-graph-explorer-deployment/Thalean_Graph_Explorer_v0.32_Termux.zip > "$release_dir/release.zip" || exit 1
  unzip -q "$release_dir/release.zip" -d "$release_dir" || exit 1
  bash "$release_dir/Thalean_Graph_Explorer_v0.32/deploy.sh"
)
```

The installer accepts an empty destination, the verified v0.31 predecessor, or the identical v0.32 file. Upgrading v0.31 creates a verified rollback copy outside the public directory. The final HTTPS check compares the served HTML with the release.

https://aletheos.ai/observatories/thalean-graph-explorer/
