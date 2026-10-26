# Publish the CoRI public site revision

This publishes the 12 reviewed PHP files from content commit
`86ad2850a5ff117a76b8a2e4dc42c32fb69ff301` to **https://aletheos.ai/**.
It does not deploy the Native Terrain simulator at dev.rook.ca, change rook.ca,
or replace the whole hosting document root.

## Run on Bluehost

Run from an authenticated host session such as the existing `ssh gurtiamy`
session. This development executor has GitHub access but no Bluehost SSH
credentials or configured host alias. A GitHub push alone does not publish
this PHP site; there is no repository deployment workflow.

From a fresh checkout of `feature/aletheos-cori-mission-20261026`:

```bash
python3 scripts/deploy-cori-public.py --live "$HOME/www"
```

Python 3.9+, Git, curl and a PHP CLI are required. Standard cPanel PHP paths
are checked if `php` is not on PATH. The `~/www` path is a candidate based on
the owner's host listing, not an assumed domain mapping. A unique temporary
static marker must be retrieved from aletheos.ai before activation proceeds.
If the marker cannot be verified, the tool stops without replacing site files.
It does not weaken TLS or hosting security rules.

Use `--check-only` for preflight without activation. Preflight still briefly
places the unique domain marker, then removes it.

## Release scope and checks

- Four new pages: Philosophy, both philosophy essays, and the public memory
  experiment article.
- Eight updated files: Home, Findings, About, Mission, Glossary, the graph
  introduction, shared navigation, and shared footer.
- Existing assets, analytics, native geometry, labs, databases, and hosting
  configuration remain in place.
- Reviewed source bytes are checked against the pinned content commit.
- PHP lint and staged page execution must pass using the host's PHP runtime
  and existing shared head/analytics includes.
- Originals and absent-file records are saved outside the webroot before
  activation. The receipt identifies the backup and rollback command.
- New articles are installed before shared navigation. Each file replacement
  is atomic; the complete 12-file cutover is not one filesystem transaction.
- Served-page checks run after activation. A failed check triggers rollback.

The deployment tool's automated tests use temporary sites and simulated
PHP/network responses. They test file protection and recovery, not actual
Bluehost PHP execution or live publication.

Validation: seven tests passed on 26 October 2026:

```bash
python3 -m unittest discover -s tests -p 'test_cori_deployment.py' -v
```

## Rollback

Use the exact command and receipt path printed by the deployment tool:

```bash
python3 scripts/deploy-cori-public.py --rollback /absolute/path/to/receipt.json
```

Rollback restores the saved originals and removes only newly installed files
that still match this release. It refuses to overwrite unexpected subsequent
changes. Keep the source checkout and backup directory until the release has
been accepted.

## Browser acceptance

After successful host output, open:

- https://aletheos.ai/
- https://aletheos.ai/research.php
- https://aletheos.ai/philosophy.php
- https://aletheos.ai/philosophy/consciousness-and-relation.php
- https://aletheos.ai/philosophy/let-my-trace-not-be-cruelty.php
- https://aletheos.ai/research/memory-and-possibility.php

Confirm the new homepage and Philosophy navigation, follow both essay links,
check a narrow/mobile layout, and open an existing lab through the footer.
HTTP validation is not a claim that these browser checks have been performed.

## Current status

The content and host deployment tooling are prepared in the review branch.
Live publication is blocked until execution inside the authenticated hosting
session; no successful live deployment receipt has been obtained here.
