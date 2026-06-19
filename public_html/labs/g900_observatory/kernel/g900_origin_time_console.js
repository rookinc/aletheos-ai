(function () {
  "use strict";

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
    try {
      const response = await fetch(URL + "?t=" + encodeURIComponent(String(Date.now())), {
        cache: "no-store",
        credentials: "same-origin"
      });

      if (!response.ok) throw new Error("HTTP " + response.status);

      const data = await response.json();
      if (!boundaryOk(data)) throw new Error("origin time boundary check failed");

      publishOriginTimeSummary({
        status: "live_origin",
        source: data.source || "origin_time_endpoint",
        host: data.host || window.location.host || "unknown",
        certificate_status: data.certificate_status || "unknown",
        iso_utc: data.iso_utc || null,
        unix_ms: data.unix_ms || null,
        fallback_used: false,
        polled_at_device_iso: isoDeviceNow()
      });
    } catch (error) {
      publishOriginTimeSummary({
        status: "device_fallback",
        source: "local_device_clock",
        host: window.location.host || "unknown",
        certificate_status: "unavailable",
        iso_utc: isoDeviceNow(),
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
