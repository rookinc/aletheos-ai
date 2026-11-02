# Deployment handoff and continuation

Status: implemented and source/math/DOM tested; **browser verification pending**.
Development deployment has not occurred. The live baseline is unchanged.

## Remaining engineering gate

1. Install development dependencies and Playwright Chromium on a host permitting
   browser sockets; serve `webroot` over localhost or HTTPS.
2. Run `npm run test:dom`, `npm test`, and `npm run test:browser`.
   The browser suite covers desktop 1440×1050 and touch-mobile 390×844,
   exact forward/reverse/5/20-step actions, representatives, zero harmonic sectors,
   receipt export, legacy controls, overflow and tampered-fixture rejection.
3. Inspect screenshots generated in `docs/screenshots/`; correct layout defects.
   Test Android Chrome on a real device separately; emulation is not device proof.
4. Verify the dev.rook.ca document root through existing host access.
   No authenticated SSH/SFTP/hosting session or key was available here.
5. Run `python3 tools/deploy.py --document-root /verified/dev/document/root
   --backup-dir /new/private/backup/path` for a dry run. It checks the exact old
   HTML hash, ordinary files, and absence of a conflicting native directory.
   Add `--apply` only after the browser gate passes.
6. The installer backs up old index/release outside the webroot, stages native
   assets and swaps the entrypoint last. Upload only `webroot` content, never
   research vendors, reports, ZIPs or backup files into the document root.
7. Verify HTTPS, source hashes, console and all five views. Roll back by restoring
   the two backed-up files; the new native assets become inert. Do not delete
   research or user data. Do not alter CSP, DNS, authentication or other services.

The local browser failure was `socket() failed: Operation not permitted`.
The cloud browser separately rejected `file:` URLs by its security policy.
No workaround to either restriction is used. DOM testing does not close this gate.

## Mathematical continuation

- Recover and pin the intended G900 adjacency rule before enabling transitions.
  Current diagonal V4 quotient SET and factor-distance observable are verified.
- Integrate Audit 065/066 executable normalization module with explicit edge/section
  coordinates. Preserve ambient exactness vs unresolved gauge-module exactness.
  A new admissible witness or obstruction is required to change the latter status.
- Construct the native pair perturbation domain, tensor response, propagation axis
  and independent equivariance law before enabling polarization actions.
- An explicit verified intertwiner is required to identify graph eigenmodes,
  registered frame harmonics or geometric tensor spaces.

No physical frequency, energy, gravity, Planck scale or chemical dynamics follows
from the finite return exponent or numerical character labels.
