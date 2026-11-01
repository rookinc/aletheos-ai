# Water Observatory v32

Exact recovered `G9000_Water_Observatory_v32.html`, published without modification as `public_html/observatories/water/index.html`. All data and JavaScript are embedded; no external assets are needed.

Single tap toggles playback. In stage-only mode, double tap restores controls. Drag and pinch retain their v32 behavior.

From Termux:

```bash
cd ~/dev/cori/website/aletheos.ai || exit 1
git pull --ff-only origin main || exit 1
WATER_SSH_TARGET=gurtiamy bash water-observatory-deployment/deploy.sh
```

Requires Bash, OpenSSH, and sha256sum or shasum. The installer checks the release checksum locally and after upload, installs atomically at `~/www/observatories/water/index.html`, and preserves any previous regular index in a private `~/.water-observatory-backups` directory before replacement. It does not edit the homepage or other observatories. A repeat install is a no-op. Live URL: https://aletheos.ai/observatories/water/

The installer reports remote file installation separately from HTTP delivery. To check live delivery, download that URL with curl and compare its SHA-256 with `water-observatory-deployment/release.sha256`.

Local package check:

```bash
python3 water-observatory-deployment/tests/deploy-package.py
```
