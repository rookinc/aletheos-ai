# Clay reading guide

The public destination is /library/collections/#dodecahedral-transport-series. The six anchor IDs follow the manuscripts in 03_Clay. The existing Clay bibliography has a broader remit and remains alongside the series.

To stage an edition, add its PDF and normal catalog record through the library's publication workflow. Replace the corresponding entry in series.html with the record link and edition label. Link reproducible G60 checks and any executed Lean certificate from the record. Update the introductory release count when the first revision appears.

To install from a checkout of this revision on the production host, run:

    python3 clay-series/prepare.py ~/public_html/library/collections/index.html

The script inserts the fragment in the existing guide. Reapply it after a library rebuild if the generator replaces the collections page. The operation is idempotent. Verify the six entries at the public destination after installation.
