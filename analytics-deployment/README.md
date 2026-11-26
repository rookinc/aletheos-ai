# Aletheos Google Analytics

The Aletheos GA4 web stream uses `G-3MHQ9Y1GJX`. The public homepage, Library, observatories, labs, Explorer and legacy research pages share the first-party adapter at `/assets/aletheos-analytics/analytics.js`. The adapter loads the Google tag after a visitor allows analytics. **Privacy choices** reopens the controls. Declining after an opt-in disables this stream, clears its first-party GA cookies and stops the tag in other open tabs on the same origin. The local preference uses the site's original key, `aletheos.analytics.consent.v1`, and expires after 180 days.

## Publish from Termux

Use the full SHA of the release on `rookinc/aletheos-ai`. The installer downloads the files from that revision and connects to Bluehost through the existing `gurtiamy` SSH alias.

```bash
rev=FULL_COMMIT_SHA
script=$(mktemp) &&
  curl -fsSL "https://raw.githubusercontent.com/rookinc/aletheos-ai/$rev/analytics-deployment/deploy.py" -o "$script" &&
  python "$script" "$rev"
```

The installer tests the host's HTML filter in an isolated directory, replaces the known legacy Google snippet and adds a delimited block to the existing Apache configuration. Public document navigations receive the consent adapter. Scientific HTML retrieved as a raw artifact retains its original bytes for replay and checksum verification. The installer checks the adapter, verifies both representations of the Loom and the directory and walks the public catalog and instrument registry. The terminal reports any failing route. A failed verification restores files changed by that run. The private backup path is printed in Termux.

## What the stream measures

Google's tag sends its default page view once on initial activation in each top-level document. The adapter supplies the page path without its query string or fragment. The existing stream also has Google's Enhanced Measurement configured, including site search. After consent, Google can record a search term separately from the page URL.

| Custom event | Visitor action | Parameters |
| --- | --- | --- |
| `observatory_open` | Follow an instrument link from the catalog or another non-instrument page | `observatory_id`, `placement` (`hero` or `catalog_link`) |
| `scope_first_interaction` | First use of a control or canvas in an observatory or lab document | `observatory_id` |
| `loom_control` | Use a recognized Loom control, including a completed slider change | `observatory_id`, `control_name` |
| `instrument_drawer_open` | Open a named Loom drawer or its guide | `observatory_id`, `drawer_name` |
| `research_resource_open` | Follow a Library record link or a PDF, ZIP, CSV or JSON link | `resource_type` |

Download events describe link activation. The new instrument events send control names and drawer names. Control values, simulator state and text entered into controls are excluded from these custom events.

## Verify

- Run `python analytics-deployment/check_coverage.py` for the public HTML audit. It checks exactly one matching first-party loader and looks for any direct Google tag that would bypass consent.
- Run `python analytics-deployment/test_analytics.py` with Python Playwright and Chromium installed for the offline browser checks. Use `--chromium PATH` for a system browser. Supply the stream's current downloaded `gtag.js` with `--google-tag PATH` to inspect collection requests. The test intercepts every request and leaves production reports untouched.
- For an account-side check after publishing, open the Observatory Library, allow analytics and launch the Loom from the hero. In the Aletheos GA4 property's Realtime report, look for `observatory_open` and a `loom_control` event after using a control.
