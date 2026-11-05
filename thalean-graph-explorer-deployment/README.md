# Thalean Graph Explorer v0.34

Water opens at the reference angle with its red X axis vertical. The Lasers pill beside the globe toggles all three beams. The startup hint includes camera gestures. The publisher and Rook Services credits have separate footer lines.

Fetch the release in Termux and install it using the existing `gurtiamy` SSH alias.

```bash
(
  cd ~/dev/cori/website/aletheos.ai || exit 1
  git fetch origin deploy/thalean-graph-explorer-v0.34 || exit 1
  release_dir=$(mktemp -d) || exit 1
  trap 'rm -rf -- "$release_dir"' EXIT
  git show FETCH_HEAD:thalean-graph-explorer-deployment/Thalean_Graph_Explorer_v0.34_Termux.zip > "$release_dir/release.zip" || exit 1
  unzip -q "$release_dir/release.zip" -d "$release_dir" || exit 1
  bash "$release_dir/Thalean_Graph_Explorer_v0.34/deploy.sh"
)
```

Upgrading the verified v0.33 page creates a rollback copy outside the public directory. The final HTTPS check compares the served HTML with the release.

https://aletheos.ai/observatories/thalean-graph-explorer/
