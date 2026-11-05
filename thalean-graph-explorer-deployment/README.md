# Thalean Graph Explorer v0.33

Lattice and Data show PID gains and current RMS error with and without feedback. The Water stage has a globe button for the surface overlay. The copyright notice includes 2026.

Fetch the release in Termux and install it using the existing `gurtiamy` SSH alias.

```bash
(
  cd ~/dev/cori/website/aletheos.ai || exit 1
  git fetch origin deploy/thalean-graph-explorer-v0.33 || exit 1
  release_dir=$(mktemp -d) || exit 1
  trap 'rm -rf -- "$release_dir"' EXIT
  git show FETCH_HEAD:thalean-graph-explorer-deployment/Thalean_Graph_Explorer_v0.33_Termux.zip > "$release_dir/release.zip" || exit 1
  unzip -q "$release_dir/release.zip" -d "$release_dir" || exit 1
  bash "$release_dir/Thalean_Graph_Explorer_v0.33/deploy.sh"
)
```

Upgrading the verified v0.32 page creates a rollback copy outside the public directory. The final HTTPS check compares the served HTML with the release.

https://aletheos.ai/observatories/thalean-graph-explorer/
