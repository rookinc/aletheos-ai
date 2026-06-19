(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function valueOrUnknown(value) {
    if (value === undefined || value === null || value === "") return "not exposed";
    return String(value);
  }

  function getTimezone() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "not exposed";
    } catch (_) {
      return "not exposed";
    }
  }

  function getPlatformHint() {
    if (navigator.userAgentData && navigator.userAgentData.platform) {
      return navigator.userAgentData.platform;
    }
    return navigator.platform || "not exposed";
  }

  function getMobileHint() {
    if (navigator.userAgentData && typeof navigator.userAgentData.mobile === "boolean") {
      return navigator.userAgentData.mobile ? "mobile" : "not mobile";
    }
    return "not exposed";
  }

  function collectProfile() {
    return {
      schema: "g900.viewer.apparatus_profile",
      version: "0.1",
      identity: "bounded browser/runtime apparatus profile",
      hardware_identifier: "not exposed",
      literal_quartz_identifier: "not exposed",
      runtime_witness: "performance.now()",
      render_witness: "requestAnimationFrame",
      platform_hint: getPlatformHint(),
      mobile_hint: getMobileHint(),
      language: valueOrUnknown(navigator.language),
      timezone: getTimezone(),
      viewport_css_px: window.innerWidth + " x " + window.innerHeight,
      screen_css_px: window.screen ? window.screen.width + " x " + window.screen.height : "not exposed",
      pixel_ratio: valueOrUnknown(window.devicePixelRatio),
      logical_processors: valueOrUnknown(navigator.hardwareConcurrency),
      approximate_memory_gb: valueOrUnknown(navigator.deviceMemory),
      touch_points: valueOrUnknown(navigator.maxTouchPoints),
      online_hint: valueOrUnknown(navigator.onLine),
      boundary: {
        private_hardware_id: false,
        serial_number: false,
        imei: false,
        mac_address: false,
        literal_quartz_id: false,
        mutates_body: false,
        runtime_motion_authority: false,
        physics_claim: false,
        force_claim: false
      }
    };
  }

  ready(function () {
    window.__g900ApparatusProfileSummary = collectProfile();

    window.addEventListener("resize", function () {
      window.__g900ApparatusProfileSummary = collectProfile();
    });
  });
}());
