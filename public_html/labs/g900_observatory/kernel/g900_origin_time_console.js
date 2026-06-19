(function () {
  "use strict";

  const PANEL_ID = "g900-origin-time-console";
  const URL = "./time.php";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function isoDeviceNow() {
    return new Date().toISOString();
  }

  function boundaryOk(data) {
    const b = data && data.boundary;
    return !!(
      b &&
      b.mutates_body === false &&
      b.runtime_motion_authority === false &&
      b.opens_gates === false &&
      b.admits_channels === false &&
      b.lights_markers === false &&
      b.physics_claim === false &&
      b.force_claim === false
    );
  }

  function findAnchor() {
    return (
      document.getElementById("g900-runtime-oscillator-console") ||
      document.getElementById("g900-apparatus-profile-console") ||
      document.getElementById("download-state-json")
    );
  }

  function createPanel() {
    let panel = document.getElementById(PANEL_ID);
    if (panel) return panel;

    panel = document.createElement("details");
    panel.id = PANEL_ID;
    panel.className = "g900-origin-time-console g900-origin-time-collapsible";
    panel.innerHTML = [
      '<summary class="g900-origin-time-summary-row">',
      '  <span class="g900-origin-time-title">Origin time</span>',
      '  <span id="g900-origin-time-summary">checking...</span>',
      '</summary>',
      '<div class="g900-origin-time-body">',
      '  <dl class="g900-origin-time-grid">',
      '    <div><dt>Status</dt><dd id="g900-origin-time-status">checking...</dd></div>',
      '    <div><dt>Source</dt><dd id="g900-origin-time-source">checking...</dd></div>',
      '    <div><dt>ISO UTC</dt><dd id="g900-origin-time-iso">checking...</dd></div>',
      '    <div><dt>Fallback</dt><dd id="g900-origin-time-fallback">device time if origin unavailable</dd></div>',
      "  </dl>",
      '  <p class="g900-origin-time-chain">',
      "    Chain: HTTPS origin -> ISO timestamp -> live connection receipt -> device fallback if unavailable.",
      "  </p>",
      '  <p class="g900-origin-time-boundary">',
      "    Timestamp witness only. No gate authority. No channel admission. No marker lighting. No force or physics claim.",
      "  </p>",
      "</div>"
    ].join("");

    const anchor = findAnchor();
    if (anchor && anchor.parentElement) {
      anchor.insertAdjacentElement("afterend", panel);
    } else {
      document.body.appendChild(panel);
    }

    return panel;
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function setSummary(value) {
    setText("g900-origin-time-summary", value);
  }

  function publishOriginTimeSummary(summary) {
    window.__g900OriginTimeSummary = Object.assign({
      schema: "g900.viewer.origin_time_witness",
      version: "0.1",
      endpoint: URL,
      mutates_body: false,
      runtime_motion_authority: false,
      opens_gates: false,
      admits_channels: false,
      lights_markers: false,
      physics_claim: false,
      force_claim: false
    }, summary || {});
  }

  async function pollOriginTime() {
    createPanel();

    try {
      const response = await fetch(URL + "?t=" + encodeURIComponent(String(Date.now())), {
        cache: "no-store",
        credentials: "same-origin"
      });

      if (!response.ok) throw new Error("HTTP " + response.status);

      const data = await response.json();
      if (!boundaryOk(data)) throw new Error("origin time boundary check failed");

      const source = data.source || "origin_time_endpoint";
      const iso = data.iso_utc || "missing";

      setText("g900-origin-time-status", "live origin");
      setText("g900-origin-time-source", source);
      setText("g900-origin-time-iso", iso);
      setText("g900-origin-time-fallback", "not used");
      setSummary("live origin | " + source);

      publishOriginTimeSummary({
        status: "live_origin",
        source: source,
        host: data.host || window.location.host || "unknown",
        certificate_status: data.certificate_status || "unknown",
        iso_utc: data.iso_utc || null,
        unix_ms: data.unix_ms || null,
        fallback_used: false,
        polled_at_device_iso: isoDeviceNow()
      });
    } catch (error) {
      const fallbackIso = isoDeviceNow();

      setText("g900-origin-time-status", "device fallback");
      setText("g900-origin-time-source", "local device clock");
      setText("g900-origin-time-iso", fallbackIso);
      setText("g900-origin-time-fallback", "origin unavailable");
      setSummary("device fallback | origin unavailable");

      publishOriginTimeSummary({
        status: "device_fallback",
        source: "local_device_clock",
        host: window.location.host || "unknown",
        certificate_status: "unavailable",
        iso_utc: fallbackIso,
        unix_ms: Date.now(),
        fallback_used: true,
        error: error && error.message ? error.message : String(error)
      });

      console.warn("[G900 origin time]", error && error.message ? error.message : error);
    }
  }

  ready(function () {
    pollOriginTime();
    window.setInterval(pollOriginTime, 30000);
  });
}());
