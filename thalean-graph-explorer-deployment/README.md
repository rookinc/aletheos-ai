# Thalean Graph Explorer v0.31

The archive contains the standalone HTML and the tested Termux installer. The installer uses the existing `gurtiamy` SSH alias and publishes to `~/www/observatories/thalean-graph-explorer/index.html`.

Run from Termux:

```bash
(
  cd ~/dev/cori/website/aletheos.ai || exit 1
  git fetch origin deploy/thalean-graph-explorer-v0.31 || exit 1
  release_dir=$(mktemp -d) || exit 1
  trap 'rm -rf -- "$release_dir"' EXIT
  git show FETCH_HEAD:thalean-graph-explorer-deployment/Thalean_Graph_Explorer_v0.31_Termux.zip > "$release_dir/release.zip" || exit 1
  unzip -q "$release_dir/release.zip" -d "$release_dir" || exit 1
  bash "$release_dir/Thalean_Graph_Explorer_v0.31/deploy.sh"
)
```

The installer checks the release and the HTTPS response byte for byte. It accepts a fresh destination or the same installed file and refuses to overwrite a different page.

Public URL: https://aletheos.ai/observatories/thalean-graph-explorer/

HTML SHA-256: `d0dc9e81a5a45096c2a1704d3d00816f9544e1de8dad8827d10729014ae16947`
