(function () {
  "use strict";

  const PANEL_ID = "g900-apparatus-profile-console";

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

  function getViewport() {
    return window.innerWidth + " x " + window.innerHeight;
  }

  function getScreen() {
    if (!window.screen) return "not exposed";
    return window.screen.width + " x " + window.screen.height;
  }

  function collectProfile() {
    return {
      identity: "bounded browser/runtime apparatus profile",
      hardware_identifier: "not exposed",
      literal_quartz_identifier: "not exposed",
      runtime_witness: "performance.now()",
      render_witness: "requestAnimationFrame",
      platform_hint: getPlatformHint(),
      mobile_hint: getMobileHint(),
      language: valueOrUnknown(navigator.language),
      timezone: getTimezone(),
      viewport_css_px: getViewport(),
      screen_css_px: getScreen(),
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

  function row(label, value) {
    return "<div><dt>" + label + "</dt><dd>" + value + "</dd></div>";
  }

  function renderProfile(profile) {
    if (document.getElementById(PANEL_ID)) return;

    const panel = document.createElement("section");
    panel.id = PANEL_ID;
    panel.className = "g900-apparatus-profile-console";
    panel.innerHTML = [
      "<h3>Apparatus profile</h3>",
      '<p class="g900-apparatus-profile-note">',
      "  Browser JS cannot expose the private hardware identity. This is a bounded runtime environment receipt for the Scope.",
      "</p>",
      '<dl class="g900-apparatus-profile-grid">',
      row("Identity", profile.identity),
      row("Hardware ID", profile.hardware_identifier),
      row("Quartz ID", profile.literal_quartz_identifier),
      row("Runtime witness", profile.runtime_witness),
      row("Render witness", profile.render_witness),
      row("Platform hint", profile.platform_hint),
      row("Mobile hint", profile.mobile_hint),
      row("Language", profile.language),
      row("Timezone", profile.timezone),
      row("Viewport", profile.viewport_css_px),
      row("Screen", profile.screen_css_px),
      row("Pixel ratio", profile.pixel_ratio),
      row("Logical processors", profile.logical_processors),
      row("Approx memory", profile.approximate_memory_gb),
      row("Touch points", profile.touch_points),
      row("Online hint", profile.online_hint),
      "</dl>",
      '<p class="g900-apparatus-profile-chain">',
      "  Chain: device environment -&gt; runtime witness -&gt; apparatus profile -&gt; scaled oscillation -&gt; sheets/sec -&gt; grammar-earned sheets -&gt; visible trace -&gt; receipt.",
      "</p>",
      '<p class="g900-apparatus-profile-boundary">',
      "  Full-metal builds may identify deeper hardware layers. This JS Scope records only what the browser honestly exposes.",
      "</p>"
    ].join("");

    const oscillator = document.getElementById("g900-runtime-oscillator-console");
    if (oscillator) {
      oscillator.insertAdjacentElement("afterend", panel);
      return;
    }

    const download = document.getElementById("download-state-json");
    const rowAnchor = download ? download.closest("div") : null;
    if (rowAnchor) {
      rowAnchor.insertAdjacentElement("afterend", panel);
      return;
    }

    console.warn("[G900 apparatus profile] no console anchor found; panel not mounted.");
  }

  ready(function () {
    renderProfile(collectProfile());
  });
}());
